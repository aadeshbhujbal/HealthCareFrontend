import React, { useState } from 'react';
import { LoginForm } from '../../components/auth/LoginForm';
import { AuthLayout } from '../../layouts/AuthLayout';

export interface LoginScreenProps {
  onLogin: (credentials: { email: string; password: string }) => Promise<void>;
  onRequestOTP?: () => void;
  onForgotPassword?: () => void;
  onRegister?: () => void;
  isLoading?: boolean;
  error?: string;
  platform: 'web' | 'mobile';
}

export const LoginScreen = ({
  onLogin,
  onRequestOTP,
  onForgotPassword,
  onRegister,
  isLoading = false,
  error,
  platform,
}: LoginScreenProps) => {
  const [internalError, setInternalError] = useState('');

  const handleLogin = async (credentials: {
    email: string;
    password: string;
  }) => {
    try {
      setInternalError('');
      await onLogin(credentials);
    } catch (err) {
      setInternalError(err instanceof Error ? err.message : 'Failed to login');
    }
  };

  return (
    <AuthLayout
      platform={platform}
      title="HealthCare App"
      subtitle="Your health, our priority"
    >
      <LoginForm
        onSubmit={handleLogin}
        onRequestOTP={onRequestOTP}
        onForgotPassword={onForgotPassword}
        onRegister={onRegister}
        isLoading={isLoading}
        error={error || internalError}
      />
    </AuthLayout>
  );
};
