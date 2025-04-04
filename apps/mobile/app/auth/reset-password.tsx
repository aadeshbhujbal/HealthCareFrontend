import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '~/providers/AuthProvider';

const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordScreen() {
  const router = useRouter();
  const { token } = useLocalSearchParams<{ token: string }>();
  const { authService } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: '',
      confirmPassword: '',
    },
  });

  const handleResetPassword = async (data: ResetPasswordForm) => {
    setIsLoading(true);
    setMessage('');

    try {
      await authService.resetPassword({
        token,
        newPassword: data.newPassword,
      });
      setIsSuccess(true);
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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Reset Password</Text>
            <Text style={styles.subtitle}>Set your new password</Text>
          </View>

          <View style={styles.form}>
            <Controller
              control={form.control}
              name="newPassword"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="New Password"
                    value={value}
                    onChangeText={onChange}
                    style={styles.input}
                    placeholderTextColor="#6B7280"
                    secureTextEntry
                  />
                  {error && (
                    <Text style={styles.errorText}>{error.message}</Text>
                  )}
                </View>
              )}
            />

            <Controller
              control={form.control}
              name="confirmPassword"
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Confirm New Password"
                    value={value}
                    onChangeText={onChange}
                    style={styles.input}
                    placeholderTextColor="#6B7280"
                    secureTextEntry
                  />
                  {error && (
                    <Text style={styles.errorText}>{error.message}</Text>
                  )}
                </View>
              )}
            />

            {message && (
              <View
                style={
                  isSuccess ? styles.successContainer : styles.errorContainer
                }
              >
                <Text style={isSuccess ? styles.successText : styles.errorText}>
                  {message}
                </Text>
              </View>
            )}

            <TouchableOpacity
              style={styles.resetButton}
              onPress={form.handleSubmit(handleResetPassword)}
              disabled={isLoading}
            >
              <Text style={styles.resetButtonText}>
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.backToLoginLink}
            onPress={() => router.push('/auth/login')}
          >
            <Text style={styles.backToLoginText}>
              Remember your password?{' '}
              <Text style={styles.signInLink}>Sign in</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FA',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  form: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#F9FAFB',
    color: '#111827',
  },
  errorContainer: {
    backgroundColor: '#FEE2E2',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  successContainer: {
    backgroundColor: '#DCFCE7',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
  },
  successText: {
    color: '#10B981',
    fontSize: 14,
  },
  resetButton: {
    backgroundColor: '#111827',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  backToLoginLink: {
    alignItems: 'center',
  },
  backToLoginText: {
    color: '#6B7280',
    fontSize: 16,
  },
  signInLink: {
    color: '#3B82F6',
    fontWeight: '500',
  },
});
