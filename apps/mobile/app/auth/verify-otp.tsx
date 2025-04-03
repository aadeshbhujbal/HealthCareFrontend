import React, { useState } from 'react';
import { View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from '~/components/ui/card';
import { useAuth } from '~/providers/AuthProvider';

interface VerifyOTPFormData {
  otp: string;
}

export default function VerifyOTPScreen() {
  const router = useRouter();
  const { email } = useLocalSearchParams<{ email: string }>();
  const { authService } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const form = useForm<VerifyOTPFormData>({
    defaultValues: {
      otp: '',
    },
  });

  const handleVerifyOTP = async (data: VerifyOTPFormData) => {
    setIsLoading(true);
    setMessage('');

    try {
      await authService.verifyOTP(email, data.otp);
      setMessage('Email verified successfully! Redirecting to login...');
      setTimeout(() => {
        router.push('/auth/login?verified=true');
      }, 2000);
    } catch (error: any) {
      setMessage(error.message || 'Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    setMessage('');

    try {
      await authService.requestOTP({
        identifier: email,
        deliveryMethod: 'email',
      });
      setMessage('New OTP has been sent to your email.');
    } catch (error: any) {
      setMessage(error.message || 'Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center p-6 bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <Text className="text-2xl font-bold text-center">Verify Email</Text>
          <Text className="text-sm text-muted-foreground text-center mt-2">
            Enter the verification code sent to your email
          </Text>
        </CardHeader>

        <CardContent>
          <View className="space-y-4">
            <Controller
              control={form.control}
              name="otp"
              rules={{ required: true, pattern: /^[0-9]{6}$/ }}
              render={({ field, fieldState }) => (
                <View>
                  <Input
                    placeholder="Enter OTP"
                    keyboardType="number-pad"
                    maxLength={6}
                    value={field.value}
                    onChangeText={field.onChange}
                  />
                  {fieldState.error && (
                    <Text className="text-sm text-destructive mt-1">
                      Invalid OTP
                    </Text>
                  )}
                </View>
              )}
            />

            <Button
              onPress={form.handleSubmit(handleVerifyOTP)}
              disabled={isLoading}
            >
              <Text className="text-primary-foreground">
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </Text>
            </Button>

            <Button
              variant="outline"
              onPress={handleResendOTP}
              disabled={isLoading}
            >
              <Text>Resend OTP</Text>
            </Button>

            {message && (
              <View
                className={`p-3 rounded-md ${
                  message.includes('successful')
                    ? 'bg-green-50'
                    : 'bg-destructive/10'
                }`}
              >
                <Text
                  className={
                    message.includes('successful')
                      ? 'text-green-700'
                      : 'text-destructive'
                  }
                >
                  {message}
                </Text>
              </View>
            )}
          </View>
        </CardContent>

        <CardFooter>
          <Text className="text-sm text-muted-foreground text-center">
            Didn't receive the code?{' '}
            <Text
              className="text-primary font-medium"
              onPress={handleResendOTP}
            >
              Resend
            </Text>
          </Text>
        </CardFooter>
      </Card>
    </View>
  );
}
