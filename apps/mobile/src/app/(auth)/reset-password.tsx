import React, { useState } from 'react';
import { router } from 'expo-router';
import { ResetPasswordScreen } from '@health-care-frontend/design-system';
import { authService } from '@health-care-frontend/shared-services';

export default function ResetPasswordPage() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleResetPassword = async (data: {
    email: string;
    token: string;
    newPassword: string;
    confirmPassword: string;
  }) => {
    try {
      setIsLoading(true);
      setError('');

      if (data.newPassword !== data.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      await authService.resetPassword({
        email: data.email,
        resetCode: data.token,
        newPassword: data.newPassword,
      });

      // Navigate to login page after successful password reset
      router.replace('/login');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    router.push('/login');
  };

  return (
    <ResetPasswordScreen
      onSubmit={handleResetPassword}
      onLogin={handleLogin}
      isLoading={isLoading}
      error={error}
      platform="mobile"
    />
  );
}
