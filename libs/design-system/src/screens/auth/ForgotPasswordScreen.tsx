import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input, Text } from 'tamagui';
import { AuthLayout } from '../../layouts/AuthLayout';

interface ForgotPasswordScreenProps {
  onSubmit: (data: { email: string }) => Promise<void>;
  onLogin: () => void;
  isLoading: boolean;
  error?: string;
  platform: 'web' | 'mobile';
}

export function ForgotPasswordScreen({
  onSubmit,
  onLogin,
  isLoading,
  error,
  platform,
}: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    try {
      await onSubmit({ email });
    } catch (err) {
      // Error will be handled by parent component
    }
  };

  return (
    <AuthLayout
      title="Forgot Password"
      subtitle="Enter your email to reset your password"
      platform={platform}
    >
      <View style={styles.container}>
        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!isLoading}
        />

        {error && <Text color="$red10">{error}</Text>}

        <Button
          onPress={handleSubmit}
          disabled={isLoading || !email}
          style={styles.button}
        >
          {isLoading ? 'Loading...' : 'Reset Password'}
        </Button>

        <Button
          variant="outlined"
          onPress={onLogin}
          disabled={isLoading}
          style={styles.button}
        >
          Back to Login
        </Button>
      </View>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 16,
  },
  button: {
    marginTop: 16,
  },
});
