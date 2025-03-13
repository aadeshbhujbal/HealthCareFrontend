import React, { useState } from 'react';
import { router } from 'expo-router';
import { RegisterScreen } from '@health-care-frontend/design-system';
import { authService } from '@health-care-frontend/shared-services';
import * as SecureStore from 'expo-secure-store';

export default function RegisterPage() {
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

      // Store tokens securely
      if (response.accessToken) {
        await SecureStore.setItemAsync('accessToken', response.accessToken);
      }
      if (response.refreshToken) {
        await SecureStore.setItemAsync('refreshToken', response.refreshToken);
      }

      // Show success message
      setSuccess('Registration successful! Redirecting...');

      // Navigate after a short delay
      setTimeout(() => {
        router.replace('/(app)/home');
      }, 1500);
    } catch (err) {
      console.error('Registration error:', err);
      setError(err instanceof Error ? err.message : 'Failed to register');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    router.push('/(auth)/login');
  };

  return (
    <RegisterScreen
      onRegister={handleRegister}
      onLogin={handleLogin}
      isLoading={isLoading}
      error={error}
      success={success}
      platform="mobile"
    />
  );
}
