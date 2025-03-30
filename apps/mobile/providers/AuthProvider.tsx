import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthService, AuthState } from '@healthcare/shared-services';
import { MobileStorageAdapter } from '../adapters/mobile-storage.adapter';

interface AuthContextType {
  authService: AuthService;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  setRememberMe: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: true,
    error: null,
  });

  const authService = AuthService.getInstance({
    storage: new MobileStorageAdapter(),
    baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api',
  });

  useEffect(() => {
    const unsubscribe = authService.subscribe((newState) => {
      setState(newState);
    });

    return () => unsubscribe();
  }, []);

  const setRememberMe = (value: boolean) => {
    // Implement remember me functionality
  };

  return (
    <AuthContext.Provider
      value={{
        authService,
        isAuthenticated: state.isAuthenticated,
        isLoading: state.loading,
        error: state.error,
        setRememberMe,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
