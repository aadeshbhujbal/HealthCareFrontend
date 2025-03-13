import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input, Text } from 'tamagui';
import { AuthLayout } from '../../layouts/AuthLayout';

interface ResetPasswordScreenProps {
  onSubmit: (data: {
    email: string;
    token: string;
    newPassword: string;
    confirmPassword: string;
  }) => Promise<void>;
  onLogin: () => void;
  isLoading: boolean;
  error?: string;
  platform: 'web' | 'mobile';
}

export function ResetPasswordScreen({
  onSubmit,
  onLogin,
  isLoading,
  error,
  platform,
}: ResetPasswordScreenProps) {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = async () => {
    try {
      await onSubmit({
        email,
        token,
        newPassword,
        confirmPassword,
      });
    } catch (err) {
      // Error will be handled by parent component
    }
  };

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter your new password"
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

        <Input
          value={token}
          onChangeText={setToken}
          placeholder="Reset Token"
          editable={!isLoading}
          style={styles.input}
        />

        <Input
          value={newPassword}
          onChangeText={setNewPassword}
          placeholder="New Password"
          secureTextEntry
          editable={!isLoading}
          style={styles.input}
        />

        <Input
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          placeholder="Confirm Password"
          secureTextEntry
          editable={!isLoading}
          style={styles.input}
        />

        {error && <Text color="$red10">{error}</Text>}

        <Button
          onPress={handleSubmit}
          disabled={
            isLoading ||
            !email ||
            !token ||
            !newPassword ||
            !confirmPassword ||
            newPassword !== confirmPassword
          }
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
  input: {
    marginTop: 16,
  },
  button: {
    marginTop: 16,
  },
});
