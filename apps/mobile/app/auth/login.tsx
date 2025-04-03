import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Link, useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Button } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { Input } from '~/components/ui/input';
import { useAuth } from '~/providers/AuthProvider';
import { Form } from '~/components/ui/form';
import { useState } from 'react';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginScreen() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginForm) => {
    try {
      setIsLoading(true);
      await signIn(data);
      router.replace('/dashboard');
    } catch (error: any) {
      form.setError('root', {
        type: 'manual',
        message: error.message || 'Failed to sign in',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background"
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        className="p-6"
      >
        <Animated.View
          entering={FadeInDown.delay(200).springify()}
          className="flex-1 justify-center space-y-6"
        >
          {/* Welcome Text */}
          <View className="space-y-2 mb-6">
            <Text className="text-3xl font-bold text-primary">
              Welcome back!
            </Text>
            <Text className="text-base text-muted-foreground">
              Please sign in to your account
            </Text>
          </View>

          <Form form={form}>
            <View className="space-y-4">
              <Form.Field
                control={form.control}
                name="email"
                render={({ field }) => (
                  <Form.Item>
                    <Form.Label>Email</Form.Label>
                    <Form.Control>
                      <Input
                        placeholder="Enter your email"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        {...field}
                      />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                )}
              />

              <Form.Field
                control={form.control}
                name="password"
                render={({ field }) => (
                  <Form.Item>
                    <Form.Label>Password</Form.Label>
                    <Form.Control>
                      <Input
                        placeholder="Enter your password"
                        secureTextEntry
                        {...field}
                      />
                    </Form.Control>
                    <Form.Message />
                  </Form.Item>
                )}
              />

              {form.formState.errors.root && (
                <Text className="text-destructive text-sm">
                  {form.formState.errors.root.message}
                </Text>
              )}

              <Link href="/auth/forgot-password" asChild>
                <Button variant="link" className="p-0 h-auto">
                  <Text className="text-sm text-primary">Forgot password?</Text>
                </Button>
              </Link>

              <Button
                className="w-full h-14"
                size="lg"
                onPress={form.handleSubmit(onSubmit)}
                disabled={isLoading}
              >
                <Text className="text-primary-foreground text-lg font-semibold">
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Text>
              </Button>
            </View>
          </Form>

          <View className="mt-6">
            <View className="flex-row items-center space-x-2 mb-6">
              <View className="flex-1 h-[1px] bg-border" />
              <Text className="text-muted-foreground">or continue with</Text>
              <View className="flex-1 h-[1px] bg-border" />
            </View>

            <View className="space-y-4">
              <Button
                variant="outline"
                className="w-full h-14"
                onPress={() => {}}
              >
                <Text className="text-lg font-semibold">Google</Text>
              </Button>

              <Button
                variant="outline"
                className="w-full h-14"
                onPress={() => {}}
              >
                <Text className="text-lg font-semibold">Apple</Text>
              </Button>
            </View>
          </View>

          <View className="flex-row justify-center mt-6">
            <Text className="text-muted-foreground">
              Don't have an account?{' '}
            </Text>
            <Link href="/auth/register" asChild>
              <Button variant="link" className="p-0 h-auto">
                <Text className="text-primary">Create Account</Text>
              </Button>
            </Link>
          </View>
        </Animated.View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
