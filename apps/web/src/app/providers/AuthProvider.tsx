'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { AuthService, AuthState } from '@healthcare/shared-services';
import { WebStorageAdapter } from '@healthcare/shared-services';

// Create auth context with extended functionality
const AuthContext = createContext<{
  authService: AuthService;
  state: AuthState;
  rememberMe: boolean;
  setRememberMe: (value: boolean) => void;
  resetInactivityTimer: () => void;
}>({
  authService: null!,
  state: {
    isAuthenticated: false,
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: true,
    error: null,
  },
  rememberMe: false,
  setRememberMe: () => {},
  resetInactivityTimer: () => {},
});

const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes

// Create auth provider props interface
interface AuthProviderProps {
  children: React.ReactNode;
}

// Create auth provider component
export function AuthProvider({ children }: AuthProviderProps) {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: true,
    error: null,
  });

  const [rememberMe, setRememberMe] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('rememberMe') === 'true';
    }
    return false;
  });

  const [inactivityTimer, setInactivityTimer] = useState<NodeJS.Timeout | null>(
    null
  );

  // Initialize auth service
  const [authService] = useState(() =>
    AuthService.getInstance({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8088',
      storage: new WebStorageAdapter(),
    })
  );

  const handleInactivityTimeout = useCallback(async () => {
    if (state.isAuthenticated && !rememberMe) {
      try {
        await authService.logout();
        console.log('Logged out due to inactivity');
      } catch (error) {
        console.error('Auto-logout failed:', error);
      }
    }
  }, [authService, state.isAuthenticated, rememberMe]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer) {
      clearTimeout(inactivityTimer);
    }
    if (state.isAuthenticated && !rememberMe) {
      setInactivityTimer(
        setTimeout(handleInactivityTimeout, INACTIVITY_TIMEOUT)
      );
    }
  }, [
    handleInactivityTimeout,
    inactivityTimer,
    state.isAuthenticated,
    rememberMe,
  ]);

  // Effect for remember me persistence
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('rememberMe', rememberMe.toString());
    }
  }, [rememberMe]);

  // Effect for activity monitoring
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleActivity = () => {
      resetInactivityTimer();
    };

    // Monitor user activity
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);
    window.addEventListener('click', handleActivity);
    window.addEventListener('scroll', handleActivity);
    window.addEventListener('touchstart', handleActivity);

    // Initial timer setup
    resetInactivityTimer();

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      window.removeEventListener('touchstart', handleActivity);
      if (inactivityTimer) {
        clearTimeout(inactivityTimer);
      }
    };
  }, [resetInactivityTimer, inactivityTimer]);

  // Effect for auth state subscription
  useEffect(() => {
    const unsubscribe = authService.subscribe((newState: AuthState) => {
      setState((prevState) => {
        // Deep comparison of objects
        if (
          prevState.isAuthenticated === newState.isAuthenticated &&
          prevState.user?.id === newState.user?.id &&
          prevState.accessToken === newState.accessToken &&
          prevState.refreshToken === newState.refreshToken &&
          prevState.loading === newState.loading &&
          prevState.error === newState.error
        ) {
          return prevState;
        }
        return newState;
      });
    });

    return () => {
      unsubscribe();
    };
  }, [authService]);

  // Separate effect for inactivity timer reset on auth state change
  useEffect(() => {
    if (state.isAuthenticated && !rememberMe) {
      resetInactivityTimer();
    } else if (inactivityTimer) {
      clearTimeout(inactivityTimer);
      setInactivityTimer(null);
    }
  }, [state.isAuthenticated, rememberMe]);

  return (
    <AuthContext.Provider
      value={{
        authService,
        state,
        rememberMe,
        setRememberMe,
        resetInactivityTimer,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Create hook for using auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
