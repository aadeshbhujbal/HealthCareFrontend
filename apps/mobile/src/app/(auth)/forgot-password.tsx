import React, { useState } from 'react';
import { router } from 'expo-router';
import { ForgotPasswordScreen } from '@health-care-frontend/design-system';
import { authService } from '@health-care-frontend/shared-services';

export default function ForgotPasswordPage() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleForgotPassword = async (data: { email: string }) => {
    try {
      setIsLoading(true);
      setError('');
      await authService.forgotPassword(data.email);
      // Show success message or navigate to reset password screen
      router.push('/(auth)/reset-password');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to process request'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    router.push('/(auth)/login');
  };

  return (
    <ForgotPasswordScreen
      onSubmit={handleForgotPassword}
      onLogin={handleLogin}
      isLoading={isLoading}
      error={error}
      platform="mobile"
    />
  );
}
