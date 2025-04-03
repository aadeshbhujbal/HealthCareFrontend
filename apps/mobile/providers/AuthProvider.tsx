import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter, useSegments } from 'expo-router';
import { AuthAPI, AuthService } from '@healthcare/shared-services';
import { User } from '@healthcare/shared-services';
import { MobileStorageAdapter } from '~/adapters/mobile-storage.adapter';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  authService: AuthService;
  signOut: () => Promise<void>;
  signIn: (credentials: { email: string; password: string }) => Promise<void>;
  register: (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => Promise<void>;
  requestPasswordReset: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

// This hook can be used to access the user info.
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// This hook will protect the route access based on user authentication.
function useProtectedRoute(user: User | null) {
  const segments = useSegments();
  const router = useRouter();
  useEffect(() => {
    const inAuthGroup = segments[0] === 'auth';
    const inDashboardGroup = segments[0] === 'dashboard';
    const isLandingPage = segments[0] === undefined;

    if (!user && inDashboardGroup) {
      // Redirect to the sign-in page if trying to access dashboard without auth
      router.replace('/auth/login');
    } else if (user && inAuthGroup) {
      // Redirect away from auth pages if already authenticated
      router.replace('/');
    }
  }, [user, segments]);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useProtectedRoute(user);

  // Initialize auth service with mobile storage adapter
  const storageAdapter = new MobileStorageAdapter();
  const authService = AuthService.getInstance({
    storage: storageAdapter,
    baseURL: process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api',
  });

  useEffect(() => {
    // Check for existing session
    checkSession();
  }, []);

  const checkSession = async () => {
    try {
      const state = authService.getState();
      if (state.user) {
        setUser(state.user);
      }
    } catch (error) {
      console.error('Session check failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await authService.logout();
      setUser(null);
      router.replace('/auth/login');
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  const signIn = async (credentials: { email: string; password: string }) => {
    // Implementation of signIn method
  };

  const register = async (data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    // Implementation of register method
  };

  const requestPasswordReset = async (email: string) => {
    // Implementation of requestPasswordReset method
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        authService,
        signOut,
        signIn,
        register,
        requestPasswordReset,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
