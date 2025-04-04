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
import { Link, useRouter } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '~/providers/AuthProvider';

const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const { requestPasswordReset } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('email'); // 'email' or 'otp'

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
            <Text style={styles.title}>Reset your password</Text>
            <Text style={styles.subtitle}>
              Choose how you want to reset your password
            </Text>
          </View>

          <View style={styles.tabs}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'email' && styles.activeTab]}
              onPress={() => setActiveTab('email')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'email' && styles.activeTabText,
                ]}
              >
                Reset via Email
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'otp' && styles.activeTab]}
              onPress={() => setActiveTab('otp')}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === 'otp' && styles.activeTabText,
                ]}
              >
                Reset via OTP
              </Text>
            </TouchableOpacity>
          </View>

          {activeTab === 'email' ? (
            <View style={styles.form}>
              <Controller
                control={form.control}
                name="email"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <View style={styles.inputContainer}>
                    <TextInput
                      placeholder="Enter your email address"
                      value={value}
                      onChangeText={onChange}
                      style={styles.input}
                      placeholderTextColor="#6B7280"
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                    {error && (
                      <Text style={styles.errorText}>{error.message}</Text>
                    )}
                  </View>
                )}
              />

              {form.formState.errors.root && (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorText}>
                    {form.formState.errors.root.message}
                  </Text>
                </View>
              )}

              {success && (
                <View style={styles.successContainer}>
                  <Text style={styles.successText}>
                    Reset instructions sent! Redirecting to verification...
                  </Text>
                </View>
              )}

              <TouchableOpacity
                style={styles.resetButton}
                onPress={form.handleSubmit(onSubmit)}
                disabled={isLoading || success}
              >
                <Text style={styles.resetButtonText}>
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.form}>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder="Enter your email address"
                  style={styles.input}
                  placeholderTextColor="#6B7280"
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <TouchableOpacity style={styles.resetButton}>
                <Text style={styles.resetButtonText}>Send OTP</Text>
              </TouchableOpacity>
            </View>
          )}

          <Link href="/auth/login" asChild>
            <TouchableOpacity>
              <Text style={styles.backLink}>Back to Login</Text>
            </TouchableOpacity>
          </Link>
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
  tabs: {
    flexDirection: 'row',
    marginBottom: 24,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  activeTab: {
    backgroundColor: '#111827',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
  },
  activeTabText: {
    color: '#FFFFFF',
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
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: '#111827',
    borderRadius: 8,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  resetButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  backLink: {
    color: '#3B82F6',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
  },
});
