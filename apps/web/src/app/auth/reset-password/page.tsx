'use client';

import { useState, useEffect, Suspense } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useAuth } from '@/app/providers/AuthProvider';

interface ResetPasswordForm {
  password: string;
  confirmPassword: string;
}

function ResetPasswordContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { authService } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [token, setToken] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordForm>();
  const password = watch('password');

  useEffect(() => {
    const tokenParam = searchParams.get('token');
    if (!tokenParam) {
      router.push('/auth/forgot-password');
      return;
    }
    setToken(tokenParam);
  }, [searchParams, router]);

  const onSubmit = async (data: ResetPasswordForm) => {
    if (!token) {
      setMessage('Invalid reset token');
      return;
    }

    if (data.password !== data.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      await authService.resetPassword({
        token,
        newPassword: data.password,
      });

      setMessage('Password has been reset successfully');
      setTimeout(() => {
        router.push('/auth/login');
      }, 2000);
    } catch (error: any) {
      setMessage(
        error.message || 'Failed to reset password. Please try again.'
      );
      console.error('Password reset failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-bold text-center">Reset Password</h2>
        <p className="text-sm text-gray-600 text-center mt-2">
          Enter your new password
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="New Password"
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    'Password must contain at least one uppercase letter, one lowercase letter, one number and one special character',
                },
              })}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Confirm Password"
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: (value) =>
                  value === password || 'The passwords do not match',
              })}
            />
            {errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          {message && (
            <div
              className={`p-3 rounded-md ${
                message.toLowerCase().includes('success')
                  ? 'bg-green-50 text-green-700'
                  : 'bg-red-50 text-red-700'
              }`}
            >
              {message}
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2" />
                Resetting Password...
              </div>
            ) : (
              'Reset Password'
            )}
          </Button>

          <Button
            type="button"
            variant="link"
            className="w-full"
            onClick={() => router.push('/auth/login')}
          >
            Back to Login
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense
      fallback={
        <Card>
          <CardHeader>
            <h2 className="text-2xl font-bold text-center">Loading...</h2>
          </CardHeader>
        </Card>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
