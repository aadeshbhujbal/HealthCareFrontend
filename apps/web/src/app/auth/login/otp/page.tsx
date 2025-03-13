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

export default function OTPLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [step, setStep] = useState<'request' | 'verify'>('request');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRequestOTP = async () => {
    if (!email) {
      setError('Please enter your email');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      await authService.requestOTP(email);
      setStep('verify');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      setError('Please enter the OTP');
      return;
    }

    try {
      setIsLoading(true);
      setError('');

      const response = await authService.verifyOTP(email, otp);

      // Store tokens in HTTP-only cookies
      document.cookie = `accessToken=${response.accessToken}; path=/; secure; samesite=strict; max-age=3600`;
      document.cookie = `refreshToken=${response.refreshToken}; path=/; secure; samesite=strict; max-age=86400`;

      // Store user role in localStorage for UI purposes
      localStorage.setItem('userRole', response.user.role);

      // Redirect based on the response URL or user role
      router.push(response.redirectUrl || '/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid OTP');
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
              {step === 'request' ? 'Login with OTP' : 'Verify OTP'}
            </Text>

            <Text fontSize="$md" color="$gray600" textAlign="center">
              {step === 'request'
                ? 'Enter your email to receive a one-time password'
                : 'Enter the OTP sent to your email'}
            </Text>

            {error && (
              <Text color="$red500" fontSize="$sm" textAlign="center">
                {error}
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
                  onPress={handleRequestOTP}
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner color="white" /> : 'Send OTP'}
                </Button>
              </YStack>
            ) : (
              <YStack space="$md">
                <Input
                  placeholder="Enter OTP"
                  value={otp}
                  onChangeText={setOTP}
                  inputMode="numeric"
                  size="$lg"
                  readOnly={isLoading}
                />
                <Button
                  backgroundColor="$primary600"
                  color="white"
                  size="$lg"
                  onPress={handleVerifyOTP}
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner color="white" /> : 'Verify OTP'}
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
