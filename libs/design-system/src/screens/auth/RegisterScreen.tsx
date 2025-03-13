import React, { useState } from 'react';
import { RegistrationForm } from '../../components/auth/RegistrationForm';
import { AuthLayout } from '../../layouts/AuthLayout';

export interface RegisterScreenProps {
  onRegister: (data: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => Promise<void>;
  onLogin?: () => void;
  isLoading?: boolean;
  error?: string;
  platform: 'web' | 'mobile';
}

export const RegisterScreen = ({
  onRegister,
  onLogin,
  isLoading = false,
  error,
  platform,
}: RegisterScreenProps) => {
  const [internalError, setInternalError] = useState('');

  const handleRegister = async (data: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) => {
    try {
      setInternalError('');
      await onRegister(data);
    } catch (err) {
      setInternalError(
        err instanceof Error ? err.message : 'Failed to register'
      );
    }
  };

  return (
    <AuthLayout
      platform={platform}
      title="HealthCare App"
      subtitle="Create your account"
    >
      <RegistrationForm
        onSubmit={handleRegister}
        onLogin={onLogin}
        isLoading={isLoading}
        error={error || internalError}
      />
    </AuthLayout>
  );
};
