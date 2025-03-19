'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useAuth } from '@/app/providers/AuthProvider';

interface ForgotPasswordForm {
  email: string;
}

export default function ForgotPasswordPage() {
  const router = useRouter();
  const { authService } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [method, setMethod] = useState<'email' | 'otp'>('email');
  const [message, setMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordForm>();

  const onSubmit = async (data: ForgotPasswordForm) => {
    setIsLoading(true);
    setMessage('');

    try {
      if (method === 'email') {
        const response = await authService.forgotPassword(data.email);
        setMessage(response.message);
      } else {
        const response = await authService.requestOTP({
          identifier: data.email,
          deliveryMethod: 'email',
        });
        if (response.success) {
          router.push(
            `/auth/verify-otp?email=${encodeURIComponent(data.email)}`
          );
        } else {
          setMessage(response.message);
        }
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.');
      console.error('Password reset request failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <h2 className="text-2xl font-bold text-center">Reset your password</h2>
        <p className="text-sm text-gray-600 text-center mt-2">
          Choose how you want to reset your password
        </p>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex space-x-4 mb-6">
            <Button
              type="button"
              variant={method === 'email' ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => setMethod('email')}
            >
              Reset via Email
            </Button>
            <Button
              type="button"
              variant={method === 'otp' ? 'default' : 'outline'}
              className="flex-1"
              onClick={() => setMethod('otp')}
            >
              Reset via OTP
            </Button>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Input
                id="email"
                type="email"
                placeholder="Enter your email address"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            {message && (
              <div
                className={`p-3 rounded-md ${
                  message.toLowerCase().includes('error')
                    ? 'bg-red-50 text-red-700'
                    : 'bg-green-50 text-green-700'
                }`}
              >
                {message}
              </div>
            )}

            <div className="space-y-4">
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2" />
                    Processing...
                  </div>
                ) : method === 'email' ? (
                  'Send Reset Link'
                ) : (
                  'Send OTP'
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
            </div>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
