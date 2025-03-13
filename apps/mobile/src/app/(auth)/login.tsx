import React, { useState } from 'react';
import { router } from 'expo-router';
import { LoginScreen } from '@health-care-frontend/design-system';
import { authService } from '@health-care-frontend/shared-services';
import * as SecureStore from 'expo-secure-store';

export default function LoginPage() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (credentials: {
    email: string;
    password: string;
  }) => {
    try {
      setIsLoading(true);
      setError('');

      const response = await authService.login(credentials);

      // Store tokens securely
      await SecureStore.setItemAsync('accessToken', response.accessToken);
      await SecureStore.setItemAsync('refreshToken', response.refreshToken);
      await SecureStore.setItemAsync('userRole', response.user.role);

      // Navigate based on user role
      const route = response.redirectUrl?.split('/').pop() || '/(app)/home';
      router.replace(route);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestOTP = () => {
    router.push('/otp');
  };

  const handleForgotPassword = () => {
    router.push('/forgot-password');
  };

  const handleRegister = () => {
    router.push('/register');
  };

  return (
    <LoginScreen
      onLogin={handleLogin}
      onRequestOTP={handleRequestOTP}
      onForgotPassword={handleForgotPassword}
      onRegister={handleRegister}
      isLoading={isLoading}
      error={error}
      platform="mobile"
    />
  );
}
