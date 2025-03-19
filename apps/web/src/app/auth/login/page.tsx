'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from '@/components/ui/card';
import { useAuth } from '@/app/providers/AuthProvider';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

interface PasswordLoginForm {
  email: string;
  password: string;
}

interface OTPLoginForm {
  email: string;
  otp: string;
}

export default function LoginPage() {
  const router = useRouter();
  const { authService } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [activeTab, setActiveTab] = useState<'password' | 'otp'>('password');

  const passwordForm = useForm<PasswordLoginForm>();
  const otpForm = useForm<OTPLoginForm>();

  const handlePasswordLogin = async (data: PasswordLoginForm) => {
    setIsLoading(true);
    setMessage('');

    try {
      await authService.login({
        email: data.email,
        password: data.password,
      });
      // Successful login will be handled by AuthProvider's redirect
    } catch (error: any) {
      // Handle authentication errors
      let errorMessage = '';

      if (error.response?.status === 401) {
        errorMessage = 'Invalid email or password. Please try again.';
      } else if (error.response?.data?.message) {
        errorMessage = Array.isArray(error.response.data.message)
          ? error.response.data.message.join(', ')
          : error.response.data.message;
      } else {
        errorMessage = 'Login failed. Please try again.';
      }

      setMessage(errorMessage);
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'apple') => {
    setIsLoading(true);
    setMessage('');

    try {
      await authService.socialLogin({
        provider,
        token: `${provider.toUpperCase()}_TOKEN`, // This should be replaced with actual OAuth token
      });
      // Successful login will be handled by AuthProvider's redirect
    } catch (error: any) {
      setMessage(
        error.message || `${provider} login failed. Please try again.`
      );
      console.error(`${provider} login failed:`, error);
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
      console.error('OTP request failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOTPLogin = async (data: OTPLoginForm) => {
    setIsLoading(true);
    setMessage('');

    try {
      console.log('Attempting OTP login with:', {
        email: data.email,
        otp: data.otp,
      });

      const response = await authService.verifyOTP(data.email, data.otp);

      if (response && response.access_token) {
        // Successful login
        setMessage('Login successful! Redirecting...');
        setTimeout(() => {
          router.push('/patient/dashboard');
        }, 2000);
      } else {
        setMessage('Login failed. Please try again.');
      }
    } catch (error: any) {
      console.error('OTP verification failed:', error);

      let errorMessage = 'Invalid OTP. Please try again.';
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }

      setMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <h2 className="text-2xl font-bold text-center">Welcome back</h2>
        <p className="text-sm text-gray-600 text-center mt-2">
          Sign in to access your account
        </p>
        <div className="flex space-x-2 mt-6">
          <Button
            type="button"
            variant={activeTab === 'password' ? 'default' : 'outline'}
            className="flex-1"
            onClick={() => {
              setActiveTab('password');
              setMessage('');
            }}
          >
            Password
          </Button>
          <Button
            type="button"
            variant={activeTab === 'otp' ? 'default' : 'outline'}
            className="flex-1"
            onClick={() => {
              setActiveTab('otp');
              setMessage('');
              setShowOTPInput(false);
            }}
          >
            OTP
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {activeTab === 'password' ? (
          <form
            onSubmit={passwordForm.handleSubmit(handlePasswordLogin)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                {...passwordForm.register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
              {passwordForm.formState.errors.email && (
                <p className="text-sm text-red-500">
                  {passwordForm.formState.errors.email.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Password"
                {...passwordForm.register('password', {
                  required: 'Password is required',
                })}
              />
              {passwordForm.formState.errors.password && (
                <p className="text-sm text-red-500">
                  {passwordForm.formState.errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center justify-end">
              <Link
                href="/auth/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            {message && (
              <div className="p-3 rounded-md bg-red-50 text-red-700 border border-red-200">
                {message}
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2" />
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => handleSocialLogin('google')}
                disabled={isLoading}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </Button>
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => handleSocialLogin('apple')}
                disabled={isLoading}
              >
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
                    fill="currentColor"
                  />
                </svg>
                Apple
              </Button>
            </div>
          </form>
        ) : (
          <form
            onSubmit={otpForm.handleSubmit(handleOTPLogin)}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Email"
                {...otpForm.register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
              />
              {otpForm.formState.errors.email && (
                <p className="text-sm text-red-500">
                  {otpForm.formState.errors.email.message}
                </p>
              )}
            </div>

            {!showOTPInput ? (
              <Button
                type="button"
                className="w-full"
                disabled={isLoading}
                onClick={() => {
                  const email = otpForm.getValues('email');
                  if (email) {
                    handleRequestOTP(email);
                  } else {
                    setMessage('Please enter your email address');
                  }
                }}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2" />
                    Sending OTP...
                  </div>
                ) : (
                  'Get OTP'
                )}
              </Button>
            ) : (
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Enter OTP"
                  maxLength={6}
                  {...otpForm.register('otp', {
                    required: 'OTP is required',
                    pattern: {
                      value: /^[0-9]{6}$/,
                      message: 'OTP must be 6 digits',
                    },
                  })}
                />
                {otpForm.formState.errors.otp && (
                  <p className="text-sm text-red-500">
                    {otpForm.formState.errors.otp.message}
                  </p>
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2" />
                      Verifying...
                    </div>
                  ) : (
                    'Verify OTP'
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    const email = otpForm.getValues('email');
                    if (email) {
                      handleRequestOTP(email);
                    }
                  }}
                  disabled={isLoading}
                >
                  Resend OTP
                </Button>
              </div>
            )}
          </form>
        )}

        {message && (
          <div
            className={`mt-4 p-3 rounded-md ${
              message.toLowerCase().includes('success')
                ? 'bg-green-50 text-green-700'
                : 'bg-red-50 text-red-700'
            }`}
          >
            {message}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="w-full text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link href="/auth/register" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
