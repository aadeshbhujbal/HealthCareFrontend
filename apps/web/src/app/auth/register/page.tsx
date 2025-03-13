'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { RegisterScreen } from '@health-care-frontend/design-system';
import { authService } from '@health-care-frontend/shared-services';

export default function RegisterPage() {
  const router = useRouter();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (data: {
    email: string;
    name: string;
    age: number;
    firstName: string;
    lastName: string;
    phone: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      setIsLoading(true);
      setError('');
      setSuccess('');

      const response = await authService.register({
        email: data.email,
        name: data.name,
        age: data.age,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
        password: data.password,
        role: 'PATIENT', // Default role for registration
      });

      // Store tokens in HTTP-only cookies
      if (response.accessToken) {
        document.cookie = `accessToken=${response.accessToken}; path=/; secure; samesite=strict; max-age=3600`;
      }
      if (response.refreshToken) {
        document.cookie = `refreshToken=${response.refreshToken}; path=/; secure; samesite=strict; max-age=86400`;
      }

      // Show success message
      setSuccess('Registration successful! Redirecting to dashboard...');

      // Redirect after a short delay
      setTimeout(() => {
        router.push('/dashboard');
      }, 1500);
    } catch (err) {
      console.error('Registration error:', err);
      setError(err instanceof Error ? err.message : 'Failed to register');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    router.push('/auth/login');
  };

  return (
    <RegisterScreen
      onRegister={handleRegister}
      onLogin={handleLogin}
      isLoading={isLoading}
      error={error}
      success={success}
      platform="web"
    />
  );
}
