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

interface ResetPasswordFormData {
  newPassword: string;
  confirmPassword: string;
}

export default function ResetPasswordScreen() {
  const router = useRouter();
  const { token } = useLocalSearchParams<{ token: string }>();
  const { authService } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const form = useForm<ResetPasswordFormData>({
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const handleResetPassword = async (data: ResetPasswordFormData) => {
    if (data.newPassword !== data.confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      await authService.resetPassword({
        token,
        newPassword: data.newPassword,
      });
      setMessage('Password reset successful! Redirecting to login...');
      setTimeout(() => {
        router.push('/auth/login?reset=true');
      }, 2000);
    } catch (error: any) {
      setMessage(
        error.message || 'Failed to reset password. Please try again.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center p-6 bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <Text className="text-2xl font-bold text-center">Reset Password</Text>
          <Text className="text-sm text-muted-foreground text-center mt-2">
            Set your new password
          </Text>
        </CardHeader>

        <CardContent>
          <View className="space-y-4">
            <Controller
              control={form.control}
              name="newPassword"
              rules={{ required: true, minLength: 8 }}
              render={({ field, fieldState }) => (
                <View>
                  <Input
                    placeholder="New Password"
                    secureTextEntry
                    value={field.value}
                    onChangeText={field.onChange}
                  />
                  {fieldState.error && (
                    <Text className="text-sm text-destructive mt-1">
                      Password must be at least 8 characters
                    </Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={form.control}
              name="confirmPassword"
              rules={{ required: true }}
              render={({ field, fieldState }) => (
                <View>
                  <Input
                    placeholder="Confirm New Password"
                    secureTextEntry
                    value={field.value}
                    onChangeText={field.onChange}
                  />
                  {fieldState.error && (
                    <Text className="text-sm text-destructive mt-1">
                      Please confirm your password
                    </Text>
                  )}
                </View>
              )}
            />

            <Button
              onPress={form.handleSubmit(handleResetPassword)}
              disabled={isLoading}
            >
              <Text className="text-primary-foreground">
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </Text>
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
            Remember your password?{' '}
            <Text
              className="text-primary font-medium"
              onPress={() => router.push('/auth/login')}
            >
              Sign in
            </Text>
          </Text>
        </CardFooter>
      </Card>
    </View>
  );
}
