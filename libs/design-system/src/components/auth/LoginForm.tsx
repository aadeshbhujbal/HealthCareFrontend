import React, { useState, useCallback } from 'react';
import { YStack, Text, Input, Button, Card, XStack, Spinner } from 'tamagui';

export type LoginFormProps = {
  onSubmit: (data: { email: string; password: string }) => Promise<void>;
  onRequestOTP?: () => Promise<void>;
  onForgotPassword?: () => void;
  onRegister?: () => void;
  isLoading?: boolean;
  error?: string;
};

export const LoginForm = ({
  onSubmit,
  onRequestOTP,
  onForgotPassword,
  onRegister,
  isLoading = false,
  error,
}: LoginFormProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validationError, setValidationError] = useState('');

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = useCallback(async () => {
    try {
      setValidationError('');

      if (!email || !password) {
        setValidationError('Please fill in all fields');
        return;
      }

      if (!validateEmail(email)) {
        setValidationError('Please enter a valid email address');
        return;
      }

      if (password.length < 8) {
        setValidationError('Password must be at least 8 characters long');
        return;
      }

      await onSubmit({ email, password });
    } catch (err: unknown) {
      console.error('Login error:', err);
      setValidationError(
        err instanceof Error ? err.message : 'An error occurred'
      );
    }
  }, [email, password, onSubmit]);

  return (
    <Card
      backgroundColor="white"
      padding="$lg"
      borderRadius="$lg"
      elevation={4}
      enterStyle={{ scale: 0.9, opacity: 0 }}
      exitStyle={{ scale: 0.9, opacity: 0 }}
      width="100%"
      maxWidth={400}
      alignSelf="center"
    >
      <YStack space="$md">
        <YStack space="$sm" alignItems="center">
          <Text fontSize="$5" fontWeight="bold" color="$primary600">
            Welcome Back
          </Text>

          <Text fontSize="$5" color="$gray600">
            Sign in to your account
          </Text>
        </YStack>

        {(error || validationError) && (
          <Text color="$red500" fontSize="$5" textAlign="center">
            {error || validationError}
          </Text>
        )}

        <YStack space="$md">
          <Input
            placeholder="Email"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setValidationError('');
            }}
            inputMode="email"
            autoCapitalize="none"
            autoComplete="email"
            size="$lg"
            readOnly={isLoading}
            borderColor="$gray300"
            focusStyle={{ borderColor: '$primary600' }}
          />

          <Input
            placeholder="Password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setValidationError('');
            }}
            secureTextEntry
            size="$lg"
            readOnly={isLoading}
            borderColor="$gray300"
            focusStyle={{ borderColor: '$primary600' }}
          />
        </YStack>

        <XStack
          justifyContent="space-between"
          alignItems="center"
          flexWrap="wrap"
        >
          {onForgotPassword && (
            <Button
              variant="outlined"
              onPress={onForgotPassword}
              color="$primary600"
              disabled={isLoading}
              marginVertical="$1"
            >
              Forgot Password?
            </Button>
          )}

          {onRequestOTP && (
            <Button
              variant="outlined"
              onPress={onRequestOTP}
              color="$primary600"
              disabled={isLoading}
              marginVertical="$1"
            >
              Login with OTP
            </Button>
          )}
        </XStack>

        <Button
          backgroundColor="$primary600"
          color="white"
          size="$lg"
          onPress={handleSubmit}
          disabled={isLoading}
          pressStyle={{ opacity: 0.9 }}
          marginTop="$2"
        >
          {isLoading ? <Spinner color="white" /> : 'Sign In'}
        </Button>

        {onRegister && (
          <XStack justifyContent="center" marginTop="$2">
            <Text color="$gray600">Don't have an account? </Text>
            <Button
              variant="outlined"
              onPress={onRegister}
              color="$primary600"
              disabled={isLoading}
            >
              Sign Up
            </Button>
          </XStack>
        )}
      </YStack>
    </Card>
  );
};
