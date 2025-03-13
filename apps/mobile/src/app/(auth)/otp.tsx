import React, { useState } from 'react';
import { router } from 'expo-router';
import { OTPLoginScreen } from '@health-care-frontend/design-system';
import { authService } from '@health-care-frontend/shared-services';
import * as SecureStore from 'expo-secure-store';

export default function OTPLoginPage() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRequestOTP = async (email: string) => {
    try {
      setIsLoading(true);
      setError('');
      await authService.requestOTP(email);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to request OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async (data: { email: string; otp: string }) => {
    try {
      setIsLoading(true);
      setError('');

      const response = await authService.verifyOTP(data.email, data.otp);

      // Store tokens securely
      await SecureStore.setItemAsync('accessToken', response.accessToken);
      await SecureStore.setItemAsync('refreshToken', response.refreshToken);
      await SecureStore.setItemAsync('userRole', response.user.role);

      // Navigate to home screen
      router.replace('/(app)/home');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to verify OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    router.push('/(auth)/login');
  };

  return (
    <OTPLoginScreen
      onRequestOTP={handleRequestOTP}
      onVerifyOTP={handleVerifyOTP}
      onLogin={handleLogin}
      isLoading={isLoading}
      error={error}
      platform="mobile"
    />
  );
}
