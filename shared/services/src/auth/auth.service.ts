import { AuthAPI } from '../api/auth.api';
import {
  AuthResponse,
  LoginCredentials,
  RegisterData,
  SocialLoginData,
  OTPRequest,
  PasswordReset,
  User,
  AuthState
} from '../types/auth.types';
import { SessionService } from '../session/session.service';

export interface StorageAdapter {
  getItem(key: string): Promise<string | null>;
  setItem(key: string, value: string): Promise<void>;
  removeItem(key: string): Promise<void>;
}

export interface PlatformConfig {
  storage: StorageAdapter;
  baseURL: string;
}

export class AuthService {
  private static instance: AuthService;
  private api: AuthAPI;
  private storage: StorageAdapter;
  public readonly sessionService: SessionService;
  private state: AuthState = {
    isAuthenticated: false,
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null
  };
  private listeners: ((state: AuthState) => void)[] = [];

  private constructor(config: PlatformConfig) {
    this.api = AuthAPI.getInstance(config.baseURL);
    this.storage = config.storage;
    this.sessionService = SessionService.getInstance(config.storage);
    this.initializeFromStorage();
  }

  public static getInstance(config: PlatformConfig): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService(config);
    }
    return AuthService.instance;
  }

  private async initializeFromStorage(): Promise<void> {
    try {
      const storedData = await this.storage.getItem('auth');
      if (!storedData) {
        console.log('No stored auth data found');
        return;
      }

      try {
        const parsedData = JSON.parse(storedData);
        if (parsedData && typeof parsedData === 'object') {
          this.updateState(parsedData);
        }
      } catch (parseError) {
        console.error('Failed to parse stored auth data:', parseError);
        // Clear invalid data
        await this.storage.removeItem('auth');
      }
    } catch (error) {
      console.error('Failed to initialize from storage:', error);
    }
  }

  private updateState(newState: Partial<AuthState>): void {
    this.state = { ...this.state, ...newState };
    this.notifyListeners();
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.state));
  }

  public subscribe(listener: (state: AuthState) => void): () => void {
    this.listeners.push(listener);
    listener(this.state); // Initial state
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private async persistAuthData(response: AuthResponse): Promise<void> {
    await Promise.all([
      this.storage.setItem('accessToken', response.access_token),
      this.storage.setItem('refreshToken', response.refresh_token),
      this.storage.setItem('user', JSON.stringify(response.user))
    ]);
    this.api.setAuthToken(response.access_token);

    // Create new session on successful auth
    await this.sessionService.createSession({
      id: crypto.randomUUID(),
      device: navigator.userAgent,
      lastActive: new Date(),
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    });
  }

  private async clearAuthData(): Promise<void> {
    await Promise.all([
      this.storage.removeItem('accessToken'),
      this.storage.removeItem('refreshToken'),
      this.storage.removeItem('user'),
      this.sessionService.clearSession()
    ]);
    this.api.setAuthToken(null);
  }

  private handleError(error: unknown): never {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    this.updateState({ loading: false, error: errorMessage });
    throw error;
  }

  // Auth methods
  public async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      this.updateState({ loading: true, error: null });
      const response = await this.api.login(credentials);
      await this.persistAuthData(response);
      this.updateState({
        isAuthenticated: true,
        user: response.user,
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
        loading: false
      });
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async register(data: RegisterData): Promise<User> {
    try {
      this.updateState({ loading: true, error: null });
      const user = await this.api.register(data);
      this.updateState({ loading: false });
      return user;
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async logout(allDevices: boolean = false): Promise<void> {
    try {
      this.updateState({ loading: true, error: null });
      const currentSession = this.sessionService.getCurrentSession();
      
      if (allDevices) {
        await this.sessionService.terminateAllSessions();
      } else if (currentSession) {
        await this.sessionService.terminateSession(currentSession.id);
      }
      
      await this.api.logout(currentSession?.id, allDevices);
      await this.clearAuthData();
      this.updateState({
        isAuthenticated: false,
        user: null,
        accessToken: null,
        refreshToken: null,
        loading: false
      });
    } catch (error) {
      // Even if the API call fails, we should clear local data
      await this.clearAuthData();
      this.updateState({
        isAuthenticated: false,
        user: null,
        accessToken: null,
        refreshToken: null,
        loading: false
      });
      console.error('Logout error:', error);
    }
  }

  public async refreshToken(): Promise<void> {
    try {
      const refreshToken = await this.storage.getItem('refreshToken');
      if (!refreshToken) throw new Error('No refresh token available');

      const response = await this.api.refreshToken(refreshToken);
      await this.persistAuthData(response);
      this.updateState({
        accessToken: response.access_token,
        refreshToken: response.refresh_token
      });
    } catch (error) {
      await this.clearAuthData();
      return this.handleError(error);
    }
  }

  // OTP methods
  public async requestOTP(data: OTPRequest): Promise<{ success: boolean; message: string }> {
    try {
      this.updateState({ loading: true, error: null });
      const response = await this.api.requestOTP(data);
      this.updateState({ loading: false });
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async verifyOTP(email: string, otp: string): Promise<AuthResponse> {
    try {
      this.updateState({ loading: true, error: null });
      
      // Log the verification attempt
      console.log('Attempting OTP verification:', { email, otp: '******' });
      
      const response = await this.api.verifyOTP(email, otp);
      
      // Validate the response
      if (!response || !response.access_token) {
        throw new Error('Invalid response from server');
      }

      // Store auth data
      await this.persistAuthData(response);
      
      // Update state with user info
      this.updateState({
        isAuthenticated: true,
        user: response.user,
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
        loading: false,
        error: null
      });

      return response;
    } catch (error: any) {
      // Reset loading state and set error
      this.updateState({ 
        loading: false,
        error: error.message || 'OTP verification failed'
      });
      
      // Clear any existing auth data on failure
      await this.clearAuthData();
      
      throw error;
    }
  }

  // Password reset methods
  public async forgotPassword(email: string): Promise<{ message: string }> {
    try {
      this.updateState({ loading: true, error: null });
      const response = await this.api.forgotPassword(email);
      this.updateState({ loading: false });
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async resetPassword(data: PasswordReset): Promise<{ message: string }> {
    try {
      this.updateState({ loading: true, error: null });
      const response = await this.api.resetPassword(data);
      this.updateState({ loading: false });
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Magic link methods
  public async requestMagicLink(email: string): Promise<{ message: string }> {
    try {
      this.updateState({ loading: true, error: null });
      const response = await this.api.requestMagicLink(email);
      this.updateState({ loading: false });
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  public async verifyMagicLink(token: string): Promise<AuthResponse> {
    try {
      this.updateState({ loading: true, error: null });
      const response = await this.api.verifyMagicLink(token);
      await this.persistAuthData(response);
      this.updateState({
        isAuthenticated: true,
        user: response.user,
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
        loading: false
      });
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Social login methods
  public async socialLogin(data: SocialLoginData): Promise<AuthResponse> {
    try {
      this.updateState({ loading: true, error: null });
      const response = await this.api.socialLogin(data);
      await this.persistAuthData(response);
      this.updateState({
        isAuthenticated: true,
        user: response.user,
        accessToken: response.access_token,
        refreshToken: response.refresh_token,
        loading: false
      });
      return response;
    } catch (error) {
      return this.handleError(error);
    }
  }

  // Utility methods
  public getState(): AuthState {
    return this.state;
  }

  public isAuthenticated(): boolean {
    return this.state.isAuthenticated;
  }

  public getUser(): User | null {
    return this.state.user;
  }

  public getAccessToken(): string | null {
    return this.state.accessToken;
  }

  public async getActiveSessions(): Promise<void> {
    await this.sessionService.fetchActiveSessions();
  }

  public async terminateSession(sessionId: string): Promise<void> {
    await this.sessionService.terminateSession(sessionId);
  }

  public async terminateAllSessions(): Promise<void> {
    await this.logout(true);
  }
} 