import { StorageAdapter } from '../auth/auth.service';

export interface SessionInfo {
  id: string;
  device: string;
  lastActive: Date;
  createdAt: Date;
  expiresAt: Date;
  isCurrentSession: boolean;
}

export interface SessionState {
  currentSession: SessionInfo | null;
  activeSessions: SessionInfo[];
  loading: boolean;
  error: string | null;
}

export class SessionService {
  private static instance: SessionService;
  private storage: StorageAdapter;
  private state: SessionState = {
    currentSession: null,
    activeSessions: [],
    loading: false,
    error: null,
  };
  private listeners: ((state: SessionState) => void)[] = [];
  private heartbeatInterval: NodeJS.Timeout | null = null;
  private readonly HEARTBEAT_INTERVAL = 60000; // 1 minute

  private constructor(storage: StorageAdapter) {
    this.storage = storage;
    this.initializeSession();
  }

  public static getInstance(storage: StorageAdapter): SessionService {
    if (!SessionService.instance) {
      SessionService.instance = new SessionService(storage);
    }
    return SessionService.instance;
  }

  private async initializeSession(): Promise<void> {
    try {
      const sessionData = await this.storage.getItem('sessionInfo');
      if (sessionData) {
        const session = JSON.parse(sessionData);
        this.updateState({
          currentSession: {
            ...session,
            lastActive: new Date(session.lastActive),
            createdAt: new Date(session.createdAt),
            expiresAt: new Date(session.expiresAt),
          },
        });
        this.startHeartbeat();
      }
    } catch (error) {
      console.error('Failed to initialize session:', error);
    }
  }

  private updateState(newState: Partial<SessionState>): void {
    this.state = { ...this.state, ...newState };
    this.notifyListeners();
  }

  private notifyListeners(): void {
    this.listeners.forEach(listener => listener(this.state));
  }

  public subscribe(listener: (state: SessionState) => void): () => void {
    this.listeners.push(listener);
    listener(this.state);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  private startHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }

    this.heartbeatInterval = setInterval(async () => {
      await this.updateSessionActivity();
    }, this.HEARTBEAT_INTERVAL);
  }

  private stopHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }
  }

  public async createSession(sessionInfo: Omit<SessionInfo, 'isCurrentSession'>): Promise<void> {
    try {
      const currentSession = { ...sessionInfo, isCurrentSession: true };
      await this.storage.setItem('sessionInfo', JSON.stringify(currentSession));
      this.updateState({ currentSession });
      this.startHeartbeat();
    } catch (error) {
      console.error('Failed to create session:', error);
      throw error;
    }
  }

  public async updateSessionActivity(): Promise<void> {
    if (!this.state.currentSession) return;

    try {
      const updatedSession = {
        ...this.state.currentSession,
        lastActive: new Date(),
      };
      await this.storage.setItem('sessionInfo', JSON.stringify(updatedSession));
      this.updateState({ currentSession: updatedSession });
    } catch (error) {
      console.error('Failed to update session activity:', error);
    }
  }

  public async fetchActiveSessions(): Promise<void> {
    try {
      this.updateState({ loading: true });
      // This would be replaced with an actual API call to fetch sessions from Redis
      // For now, we'll just use the current session
      const activeSessions = this.state.currentSession 
        ? [this.state.currentSession]
        : [];
      this.updateState({ activeSessions, loading: false });
    } catch (error) {
      this.updateState({ 
        error: 'Failed to fetch active sessions',
        loading: false 
      });
    }
  }

  public async terminateSession(sessionId: string): Promise<void> {
    try {
      if (this.state.currentSession?.id === sessionId) {
        await this.clearSession();
      } else {
        // This would be replaced with an actual API call to terminate the session in Redis
        this.updateState({
          activeSessions: this.state.activeSessions.filter(
            session => session.id !== sessionId
          ),
        });
      }
    } catch (error) {
      console.error('Failed to terminate session:', error);
      throw error;
    }
  }

  public async terminateAllSessions(): Promise<void> {
    try {
      await this.clearSession();
      this.updateState({ activeSessions: [] });
    } catch (error) {
      console.error('Failed to terminate all sessions:', error);
      throw error;
    }
  }

  public async clearSession(): Promise<void> {
    try {
      await this.storage.removeItem('sessionInfo');
      this.stopHeartbeat();
      this.updateState({
        currentSession: null,
        activeSessions: [],
      });
    } catch (error) {
      console.error('Failed to clear session:', error);
      throw error;
    }
  }

  public getState(): SessionState {
    return this.state;
  }

  public getCurrentSession(): SessionInfo | null {
    return this.state.currentSession;
  }

  public getActiveSessions(): SessionInfo[] {
    return this.state.activeSessions;
  }
} 