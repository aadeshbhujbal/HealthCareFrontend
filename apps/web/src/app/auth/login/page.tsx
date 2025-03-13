'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoginScreen } from '@health-care-frontend/design-system';
import { authService } from '@health-care-frontend/shared-services';

export default function LoginPage() {
  const router = useRouter();
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

      // Store tokens in HTTP-only cookies for better security
      document.cookie = `accessToken=${response.accessToken}; path=/; secure; samesite=strict; max-age=3600`;
      document.cookie = `refreshToken=${response.refreshToken}; path=/; secure; samesite=strict; max-age=86400`;

      // Store user role in localStorage for UI purposes
      localStorage.setItem('userRole', response.user.role);

      // Redirect based on the response URL or user role
      router.push(response.redirectUrl || '/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to login');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestOTP = async () => {
    router.push('/auth/login/otp');
  };

  const handleForgotPassword = () => {
    router.push('/auth/forgot-password');
  };

  const handleRegister = () => {
    router.push('/auth/register');
  };

  return (
    <LoginScreen
      onLogin={handleLogin}
      onRequestOTP={handleRequestOTP}
      onForgotPassword={handleForgotPassword}
      onRegister={handleRegister}
      isLoading={isLoading}
      error={error}
      platform="web"
    />
  );
}
