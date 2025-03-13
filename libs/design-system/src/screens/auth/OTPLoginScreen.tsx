import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Input, Text } from 'tamagui';
import { AuthLayout } from '../../layouts/AuthLayout';

interface OTPLoginScreenProps {
  onRequestOTP: (email: string) => Promise<void>;
  onVerifyOTP: (data: { email: string; otp: string }) => Promise<void>;
  onLogin: () => void;
  isLoading: boolean;
  error?: string;
  platform: 'web' | 'mobile';
}

export function OTPLoginScreen({
  onRequestOTP,
  onVerifyOTP,
  onLogin,
  isLoading,
  error,
  platform,
}: OTPLoginScreenProps) {
  const [email, setEmail] = useState('');
  const [otp, setOTP] = useState('');
  const [step, setStep] = useState<'request' | 'verify'>('request');

  const handleRequestOTP = async () => {
    try {
      await onRequestOTP(email);
      setStep('verify');
    } catch (err) {
      // Error will be handled by parent component
    }
  };

  const handleVerifyOTP = async () => {
    try {
      await onVerifyOTP({ email, otp });
    } catch (err) {
      // Error will be handled by parent component
    }
  };

  return (
    <AuthLayout
      title={step === 'request' ? 'Request OTP' : 'Verify OTP'}
      subtitle={
        step === 'request'
          ? 'Enter your email to receive an OTP'
          : 'Enter the OTP sent to your email'
      }
      platform={platform}
    >
      <View style={styles.container}>
        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          editable={!isLoading && step === 'request'}
        />

        {step === 'verify' && (
          <Input
            value={otp}
            onChangeText={setOTP}
            placeholder="Enter OTP"
            keyboardType="number-pad"
            editable={!isLoading}
            style={styles.input}
          />
        )}

        {error && <Text color="$red10">{error}</Text>}

        <Button
          onPress={step === 'request' ? handleRequestOTP : handleVerifyOTP}
          disabled={isLoading || !email || (step === 'verify' && !otp)}
          style={styles.button}
        >
          {isLoading
            ? 'Loading...'
            : step === 'request'
            ? 'Request OTP'
            : 'Verify OTP'}
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
