import React, { useState } from 'react';
import { View } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
import { Checkbox } from '~/components/ui/checkbox';
import { useAuth } from '~/providers/AuthProvider';
import { registerSchema } from '@healthcare/shared-services';

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
  age: number;
}

export default function RegisterScreen() {
  const router = useRouter();
  const { authService } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      phone: '',
      age: 1,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    if (!acceptTerms) {
      setMessage('Please accept the terms and conditions to continue.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await authService.register({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        name: `${data.firstName} ${data.lastName}`,
        phone: data.phone,
        age: data.age,
      });

      if (response && response.id) {
        setMessage('Registration successful! Redirecting to login...');
        setTimeout(() => {
          router.push('/auth/login?registered=true');
        }, 2000);
      }
    } catch (error: any) {
      setMessage(error.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center p-6 bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <Text className="text-2xl font-bold text-center">
            Create an account
          </Text>
          <Text className="text-sm text-muted-foreground text-center mt-2">
            Enter your information to create an account
          </Text>
        </CardHeader>

        <CardContent>
          <View className="space-y-4">
            <View className="flex-row space-x-2">
              <View className="flex-1">
                <Controller
                  control={form.control}
                  name="firstName"
                  render={({ field, fieldState }) => (
                    <View>
                      <Input
                        placeholder="First name"
                        value={field.value}
                        onChangeText={field.onChange}
                      />
                      {fieldState.error && (
                        <Text className="text-sm text-destructive mt-1">
                          {fieldState.error.message}
                        </Text>
                      )}
                    </View>
                  )}
                />
              </View>
              <View className="flex-1">
                <Controller
                  control={form.control}
                  name="lastName"
                  render={({ field, fieldState }) => (
                    <View>
                      <Input
                        placeholder="Last name"
                        value={field.value}
                        onChangeText={field.onChange}
                      />
                      {fieldState.error && (
                        <Text className="text-sm text-destructive mt-1">
                          {fieldState.error.message}
                        </Text>
                      )}
                    </View>
                  )}
                />
              </View>
            </View>

            {/* Add other form fields similarly */}
            {/* Email, Phone, Password, Confirm Password */}

            <View className="flex-row items-center space-x-2">
              <Checkbox
                checked={acceptTerms}
                onCheckedChange={(checked) => setAcceptTerms(!!checked)}
              />
              <Text className="text-sm text-muted-foreground">
                I accept the terms and conditions
              </Text>
            </View>

            <Button onPress={form.handleSubmit(onSubmit)} disabled={isLoading}>
              <Text className="text-primary-foreground">
                {isLoading ? 'Creating account...' : 'Create account'}
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
            Already have an account?{' '}
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
