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

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { requestPasswordReset } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const form = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = async (data: ForgotPasswordForm) => {
    try {
      setIsLoading(true);
      await requestPasswordReset(data.email);
      setSuccess(true);
      setTimeout(() => {
        router.push('/auth/verify-otp');
      }, 2000);
    } catch (error: any) {
      form.setError('root', {
        type: 'manual',
        message: error.message || 'Failed to send reset instructions',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={['#1e40af', '#3b82f6', '#60a5fa']}
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
            {/* Header */}
            <View className="space-y-2 mb-8">
              <Animated.View entering={FadeInDown.delay(300).springify()}>
                <Text className="text-4xl font-bold text-white">
                  Reset Password
                </Text>
              </Animated.View>
              <Animated.View entering={FadeInDown.delay(400).springify()}>
                <Text className="text-lg text-white/80">
                  Don't worry! It happens. Please enter your email address and
                  we'll send you instructions.
                </Text>
              </Animated.View>
            </View>

            <Animated.View
              entering={FadeInUp.delay(500).springify()}
              className="bg-white/10 backdrop-blur-lg p-6 rounded-3xl space-y-6"
            >
              <Form form={form}>
                <View className="space-y-4">
                  <Form.Field
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <Form.Item>
                        <Form.Label>
                          <Text className="text-white/90">Email Address</Text>
                        </Form.Label>
                        <Form.Control>
                          <Input
                            placeholder="Enter your email"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            className="bg-white/20 border-white/20 text-white placeholder:text-white/50"
                            placeholderTextColor="rgba(255,255,255,0.5)"
                            {...field}
                          />
                        </Form.Control>
                        <Form.Message />
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

                  {success && (
                    <Animated.View
                      entering={FadeInUp.springify()}
                      className="bg-green-500/20 p-4 rounded-lg"
                    >
                      <Text className="text-white text-sm">
                        Reset instructions sent! Redirecting to verification...
                      </Text>
                    </Animated.View>
                  )}

                  <Button
                    className="w-full h-14 bg-white"
                    size="lg"
                    onPress={form.handleSubmit(onSubmit)}
                    disabled={isLoading || success}
                  >
                    <Text className="text-primary text-lg font-semibold">
                      {isLoading
                        ? 'Sending Instructions...'
                        : 'Send Instructions'}
                    </Text>
                  </Button>

                  <Link href="/auth/login" asChild>
                    <Button
                      variant="ghost"
                      className="w-full border border-white/20"
                    >
                      <Text className="text-white">Back to Sign In</Text>
                    </Button>
                  </Link>
                </View>
              </Form>
            </Animated.View>
          </Animated.View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}
