import axios from 'axios';
import {
  AuthResponse,
  LoginCredentials,
  RegisterData,
  SocialLoginData,
  OTPRequest,
  PasswordReset,
  User
} from '../types/auth.types';

export class AuthAPI {
  private static instance: AuthAPI;
  private api: any;

  private constructor(baseURL: string) {
    this.api = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000, // 10 second timeout
      validateStatus: (status) => status >= 200 && status < 500, // Don't reject if status < 500
    });

    // Add request interceptor for logging
    this.api.interceptors.request.use(
      (config: any) => {
        console.log(`Making ${config.method?.toUpperCase()} request to ${config.url}`);
        // Add authorization header if token exists
        const token = localStorage.getItem('accessToken');
        if (token && config.headers) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error: any) => {
        console.error('Request setup error:', error);
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response: any) => response,
      async (error: any) => {
        console.error('API Error:', {
          status: error.response?.status,
          data: error.response?.data,
          message: error.message
        });
        return Promise.reject(error);
      }
    );
  }

  public static getInstance(baseURL: string): AuthAPI {
    if (!AuthAPI.instance) {
      AuthAPI.instance = new AuthAPI(baseURL);
    }
    return AuthAPI.instance;
  }

  public setAuthToken(token: string | null): void {
    if (token) {
      this.api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete this.api.defaults.headers.common['Authorization'];
    }
  }

  // Authentication methods
  public async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await this.api.post('/auth/login', credentials);
    return response.data;
  }

  public async register(data: RegisterData): Promise<User> {
    const response = await this.api.post('/auth/register', data);
    return response.data;
  }

  public async registerWithClinic(data: RegisterData, appName: string): Promise<User> {
    const response = await this.api.post('/auth/register-with-clinic', { ...data, appName });
    return response.data;
  }

  public async logout(sessionId?: string, allDevices: boolean = false): Promise<void> {
    await this.api.post('/auth/logout', { sessionId, allDevices });
  }

  public async refreshToken(refreshToken: string): Promise<AuthResponse> {
    const response = await this.api.post('/auth/refresh', { refreshToken });
    return response.data;
  }

  public async verifyToken(): Promise<{ isValid: boolean; user: User }> {
    const response = await this.api.get('/auth/verify');
    return response.data;
  }

  // Password reset methods
  public async forgotPassword(email: string): Promise<{ message: string }> {
    const response = await this.api.post('/auth/forgot-password', { email });
    return response.data;
  }

  public async resetPassword(data: PasswordReset): Promise<{ message: string }> {
    const response = await this.api.post('/auth/reset-password', data);
    return response.data;
  }

  // OTP methods
  public async requestOTP(data: OTPRequest): Promise<{ success: boolean; message: string }> {
    const response = await this.api.post('/auth/request-otp', data);
    return response.data;
  }

  public async verifyOTP(email: string, otp: string): Promise<AuthResponse> {
    try {
      console.log('Sending OTP verification request:', { email, otp: '******' });
      
      const response = await this.api.post('/auth/verify-otp', { 
        email, 
        otp,
        type: 'login' // Specify that this is a login OTP verification
      });

      // Log the response for debugging
      console.log('OTP verification response:', {
        status: response.status,
        data: {
          ...response.data,
          access_token: response.data?.access_token ? '[REDACTED]' : undefined,
          refresh_token: response.data?.refresh_token ? '[REDACTED]' : undefined,
        }
      });

      // Check for error status codes
      if (response.status === 401) {
        throw new Error('Invalid OTP. Please try again.');
      }
      if (response.status !== 200 && response.status !== 201) {
        throw new Error('OTP verification failed');
      }

      // Validate response data
      if (!response.data || !response.data.access_token) {
        throw new Error('Invalid response from server');
      }

      // Store the tokens
      if (response.data.access_token) {
        localStorage.setItem('accessToken', response.data.access_token);
      }
      if (response.data.refresh_token) {
        localStorage.setItem('refreshToken', response.data.refresh_token);
      }

      return response.data;
    } catch (error: any) {
      console.error('OTP Verification Error:', {
        name: error.name,
        message: error.message,
        response: {
          status: error.response?.status,
          data: error.response?.data
        }
      });

      // Handle specific error cases
      if (error.response?.status === 401) {
        throw new Error('Invalid OTP. Please try again.');
      }
      if (error.response?.data?.message) {
        throw new Error(error.response.data.message);
      }
      
      throw error;
    }
  }

  public async checkOTPStatus(email: string): Promise<{ hasActiveOTP: boolean }> {
    const response = await this.api.post('/auth/check-otp-status', { email });
    return response.data;
  }

  public async invalidateOTP(email: string): Promise<{ message: string }> {
    const response = await this.api.post('/auth/invalidate-otp', { email });
    return response.data;
  }

  // Magic link methods
  public async requestMagicLink(email: string): Promise<{ message: string }> {
    const response = await this.api.post('/auth/magic-link', { email });
    return response.data;
  }

  public async verifyMagicLink(token: string): Promise<AuthResponse> {
    const response = await this.api.post('/auth/verify-magic-link', { token });
    return response.data;
  }

  // Social login methods
  public async socialLogin(data: SocialLoginData): Promise<AuthResponse> {
    const response = await this.api.post(`/auth/social/${data.provider}`, data);
    return response.data;
  }
} 