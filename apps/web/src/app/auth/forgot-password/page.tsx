'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  Text,
  YStack,
  Input,
  Button,
  Spinner,
} from '@health-care-frontend/design-system';
import { authService } from '@health-care-frontend/shared-services';

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState<'request' | 'reset'>('request');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleForgotPassword = async () => {
    if (!email) {
      setError('Please enter your email');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      const response = await authService.forgotPassword(email);
      setSuccessMessage(
        response.message || 'Reset instructions sent to your email'
      );
      setStep('reset');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Failed to process request'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    if (!resetCode || !newPassword || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (newPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      await authService.resetPassword({
        email,
        resetCode,
        newPassword,
      });

      setSuccessMessage('Password reset successful');

      // Navigate back to login after a short delay
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to reset password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card
          backgroundColor="white"
          padding="$lg"
          borderRadius="$lg"
          elevation={2}
        >
          <YStack space="$md">
            <Text
              fontSize="$2xl"
              fontWeight="bold"
              color="$primary600"
              textAlign="center"
            >
              {step === 'request' ? 'Forgot Password' : 'Reset Password'}
            </Text>

            <Text fontSize="$md" color="$gray600" textAlign="center">
              {step === 'request'
                ? 'Enter your email to receive password reset instructions'
                : 'Enter the reset code and your new password'}
            </Text>

            {error && (
              <Text color="$red500" fontSize="$sm" textAlign="center">
                {error}
              </Text>
            )}

            {successMessage && (
              <Text color="$green500" fontSize="$sm" textAlign="center">
                {successMessage}
              </Text>
            )}

            {step === 'request' ? (
              <YStack space="$md">
                <Input
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  inputMode="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  size="$lg"
                  readOnly={isLoading}
                />
                <Button
                  backgroundColor="$primary600"
                  color="white"
                  size="$lg"
                  onPress={handleForgotPassword}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Spinner color="white" />
                  ) : (
                    'Send Reset Instructions'
                  )}
                </Button>
              </YStack>
            ) : (
              <YStack space="$md">
                <Input
                  placeholder="Reset Code"
                  value={resetCode}
                  onChangeText={setResetCode}
                  size="$lg"
                  readOnly={isLoading}
                />
                <Input
                  placeholder="New Password"
                  value={newPassword}
                  onChangeText={setNewPassword}
                  secureTextEntry
                  size="$lg"
                  readOnly={isLoading}
                />
                <Input
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  size="$lg"
                  readOnly={isLoading}
                />
                <Button
                  backgroundColor="$primary600"
                  color="white"
                  size="$lg"
                  onPress={handleResetPassword}
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner color="white" /> : 'Reset Password'}
                </Button>
              </YStack>
            )}

            <Button
              variant="outlined"
              onPress={() => router.push('/auth/login')}
              color="$primary600"
              disabled={isLoading}
            >
              Back to Login
            </Button>
          </YStack>
        </Card>
      </div>
    </main>
  );
}
