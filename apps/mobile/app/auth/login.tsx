import React, { useState } from 'react';
import { View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from 'expo-router';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from '~/components/ui/card';
import { Separator } from '~/components/ui/separator';
import { useAuth } from '~/providers/AuthProvider';
import { TabGroup } from '~/components/ui/tab-group';

interface LoginFormData {
  email: string;
  password: string;
}

interface OTPFormData {
  email: string;
  otp: string;
}

export default function LoginScreen() {
  const router = useRouter();
  const { authService } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [activeTab, setActiveTab] = useState<'password' | 'otp'>('password');

  const passwordForm = useForm<LoginFormData>();
  const otpForm = useForm<OTPFormData>();

  const handlePasswordLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    setMessage('');

    try {
      await authService.login({
        email: data.email,
        password: data.password,
      });
      // Successful login will be handled by AuthProvider's redirect
    } catch (error: any) {
      setMessage(error.message || 'Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestOTP = async (email: string) => {
    setIsLoading(true);
    setMessage('');

    try {
      await authService.requestOTP({
        identifier: email,
        deliveryMethod: 'email',
      });
      setShowOTPInput(true);
      setMessage('OTP has been sent to your email.');
    } catch (error: any) {
      setMessage(error.message || 'Failed to send OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPLogin = async (data: OTPFormData) => {
    setIsLoading(true);
    setMessage('');

    try {
      await authService.verifyOTP(data.email, data.otp);
      // Successful login will be handled by AuthProvider's redirect
    } catch (error: any) {
      setMessage(error.message || 'Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center p-6 bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <Text className="text-2xl font-bold text-center">Welcome back</Text>
          <Text className="text-sm text-muted-foreground text-center mt-2">
            Sign in to access your account
          </Text>
          <TabGroup
            value={activeTab}
            onValueChange={(value) => {
              setActiveTab(value as 'password' | 'otp');
              setMessage('');
              setShowOTPInput(false);
            }}
            items={[
              { value: 'password', label: 'Password' },
              { value: 'otp', label: 'OTP' },
            ]}
          />
        </CardHeader>

        <CardContent>
          {activeTab === 'password' ? (
            <View className="space-y-4">
              <Controller
                control={passwordForm.control}
                name="email"
                rules={{
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                }}
                render={({ field, fieldState }) => (
                  <View>
                    <Input
                      placeholder="Email"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={field.value}
                      onChangeText={field.onChange}
                    />
                    {fieldState.error && (
                      <Text className="text-sm text-destructive mt-1">
                        Invalid email address
                      </Text>
                    )}
                  </View>
                )}
              />

              <Controller
                control={passwordForm.control}
                name="password"
                rules={{ required: true }}
                render={({ field, fieldState }) => (
                  <View>
                    <Input
                      placeholder="Password"
                      secureTextEntry
                      value={field.value}
                      onChangeText={field.onChange}
                    />
                    {fieldState.error && (
                      <Text className="text-sm text-destructive mt-1">
                        Password is required
                      </Text>
                    )}
                  </View>
                )}
              />

              <Button
                onPress={passwordForm.handleSubmit(handlePasswordLogin)}
                disabled={isLoading}
              >
                <Text className="text-primary-foreground">
                  {isLoading ? 'Signing in...' : 'Sign in'}
                </Text>
              </Button>
            </View>
          ) : (
            <View className="space-y-4">
              {/* OTP Form */}
              <Controller
                control={otpForm.control}
                name="email"
                rules={{
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                }}
                render={({ field, fieldState }) => (
                  <View>
                    <Input
                      placeholder="Email"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={field.value}
                      onChangeText={field.onChange}
                    />
                    {fieldState.error && (
                      <Text className="text-sm text-destructive mt-1">
                        Invalid email address
                      </Text>
                    )}
                  </View>
                )}
              />

              {showOTPInput ? (
                <View className="space-y-4">
                  <Controller
                    control={otpForm.control}
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
                    onPress={otpForm.handleSubmit(handleOTPLogin)}
                    disabled={isLoading}
                  >
                    <Text className="text-primary-foreground">
                      {isLoading ? 'Verifying...' : 'Verify OTP'}
                    </Text>
                  </Button>

                  <Button
                    variant="outline"
                    onPress={() => handleRequestOTP(otpForm.getValues('email'))}
                    disabled={isLoading}
                  >
                    <Text>Resend OTP</Text>
                  </Button>
                </View>
              ) : (
                <Button
                  onPress={() => handleRequestOTP(otpForm.getValues('email'))}
                  disabled={isLoading}
                >
                  <Text className="text-primary-foreground">
                    {isLoading ? 'Sending OTP...' : 'Get OTP'}
                  </Text>
                </Button>
              )}
            </View>
          )}

          {message && (
            <View
              className={`mt-4 p-3 rounded-md ${
                message.toLowerCase().includes('success')
                  ? 'bg-green-50'
                  : 'bg-destructive/10'
              }`}
            >
              <Text
                className={
                  message.toLowerCase().includes('success')
                    ? 'text-green-700'
                    : 'text-destructive'
                }
              >
                {message}
              </Text>
            </View>
          )}
        </CardContent>

        <CardFooter>
          <Text className="text-sm text-muted-foreground text-center">
            Don't have an account?{' '}
            <Text
              className="text-primary font-medium"
              onPress={() => router.push('/auth/register')}
            >
              Sign up
            </Text>
          </Text>
        </CardFooter>
      </Card>
    </View>
  );
}
