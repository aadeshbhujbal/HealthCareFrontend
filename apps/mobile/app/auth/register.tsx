import { useState } from 'react';
import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { Input } from '~/components/ui/input';
import { useAuth } from '~/providers/AuthProvider';
import { Form } from '~/components/ui/form';
import { LinearGradient } from 'expo-linear-gradient';

const registerSchema = z
  .object({
    firstName: z.string().min(2, 'First name must be at least 2 characters'),
    lastName: z.string().min(2, 'Last name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type RegisterForm = z.infer<typeof registerSchema>;

export default function RegisterScreen() {
  const router = useRouter();
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      setIsLoading(true);
      await register({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
      });
      router.replace('/auth/verify-otp');
    } catch (error: any) {
      form.setError('root', {
        type: 'manual',
        message: error.message || 'Failed to create account',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#3730A3', '#4F46E5', '#6366F1']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1"
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          className="p-6"
        >
          <Animated.View
            entering={FadeInDown.delay(200).springify()}
            className="flex-1 justify-center"
          >
            {/* Welcome Text */}
            <View className="space-y-4 mb-8">
              <Animated.View entering={FadeInDown.delay(300).springify()}>
                <Text className="text-4xl font-bold text-white">
                  Create Account
                </Text>
              </Animated.View>
              <Animated.View entering={FadeInDown.delay(400).springify()}>
                <Text className="text-lg text-white/80">
                  Please fill in your details to get started
                </Text>
              </Animated.View>
            </View>

            <Animated.View
              entering={FadeInUp.delay(500).springify()}
              className="bg-white/10 backdrop-blur-lg p-6 rounded-[32px] space-y-6 border border-white/20"
            >
              <Form form={form}>
                <View className="space-y-4">
                  <View className="flex-row space-x-4">
                    <View className="flex-1">
                      <Form.Field
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <Form.Item>
                            <Form.Label>
                              <Text className="text-white/90">First Name</Text>
                            </Form.Label>
                            <Form.Control>
                              <Input
                                placeholder="John"
                                autoCapitalize="words"
                                className="bg-white/20 border-white/20 text-white placeholder:text-white/50"
                                placeholderTextColor="rgba(255,255,255,0.5)"
                                {...field}
                              />
                            </Form.Control>
                            <Form.Message className="text-red-300" />
                          </Form.Item>
                        )}
                      />
                    </View>

                    <View className="flex-1">
                      <Form.Field
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <Form.Item>
                            <Form.Label>
                              <Text className="text-white/90">Last Name</Text>
                            </Form.Label>
                            <Form.Control>
                              <Input
                                placeholder="Doe"
                                autoCapitalize="words"
                                className="bg-white/20 border-white/20 text-white placeholder:text-white/50"
                                placeholderTextColor="rgba(255,255,255,0.5)"
                                {...field}
                              />
                            </Form.Control>
                            <Form.Message className="text-red-300" />
                          </Form.Item>
                        )}
                      />
                    </View>
                  </View>

                  <Form.Field
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <Form.Item>
                        <Form.Label>
                          <Text className="text-white/90">Email</Text>
                        </Form.Label>
                        <Form.Control>
                          <Input
                            placeholder="john.doe@example.com"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            className="bg-white/20 border-white/20 text-white placeholder:text-white/50"
                            placeholderTextColor="rgba(255,255,255,0.5)"
                            {...field}
                          />
                        </Form.Control>
                        <Form.Message className="text-red-300" />
                      </Form.Item>
                    )}
                  />

                  <Form.Field
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <Form.Item>
                        <Form.Label>
                          <Text className="text-white/90">Password</Text>
                        </Form.Label>
                        <Form.Control>
                          <Input
                            placeholder="Create a strong password"
                            secureTextEntry
                            className="bg-white/20 border-white/20 text-white placeholder:text-white/50"
                            placeholderTextColor="rgba(255,255,255,0.5)"
                            {...field}
                          />
                        </Form.Control>
                        <Form.Message className="text-red-300" />
                      </Form.Item>
                    )}
                  />

                  <Form.Field
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <Form.Item>
                        <Form.Label>
                          <Text className="text-white/90">
                            Confirm Password
                          </Text>
                        </Form.Label>
                        <Form.Control>
                          <Input
                            placeholder="Confirm your password"
                            secureTextEntry
                            className="bg-white/20 border-white/20 text-white placeholder:text-white/50"
                            placeholderTextColor="rgba(255,255,255,0.5)"
                            {...field}
                          />
                        </Form.Control>
                        <Form.Message className="text-red-300" />
                      </Form.Item>
                    )}
                  />

                  {form.formState.errors.root && (
                    <Animated.View
                      entering={FadeInUp.springify()}
                      className="bg-red-500/20 p-4 rounded-lg"
                    >
                      <Text className="text-white text-sm">
                        {form.formState.errors.root.message}
                      </Text>
                    </Animated.View>
                  )}

                  <Button
                    className="w-full h-14 bg-white shadow-xl rounded-[20px]"
                    size="lg"
                    onPress={form.handleSubmit(onSubmit)}
                    disabled={isLoading}
                  >
                    <Text className="text-primary text-lg font-bold">
                      {isLoading ? 'Creating Account...' : 'Create Account'}
                    </Text>
                  </Button>
                </View>
              </Form>
            </Animated.View>

            <View className="flex-row justify-center mt-6">
              <Text className="text-white/80">Already have an account? </Text>
              <Link href="/auth/login" asChild>
                <Button variant="link" className="p-0 h-auto">
                  <Text className="text-white font-bold">Sign In</Text>
                </Button>
              </Link>
            </View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
