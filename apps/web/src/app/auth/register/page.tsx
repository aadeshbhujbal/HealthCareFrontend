'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { registerSchema } from '@healthcare/shared-services';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/providers/AuthProvider';
import { Separator } from '@/components/ui/separator';
import { PasswordStrength } from '@/components/ui/password-strength';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
  age: number;
}

export default function RegisterPage() {
  const router = useRouter();
  const { authService, setRememberMe } = useAuth();
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
    mode: 'onChange',
  });

  const onSubmit = async (data: RegisterFormData) => {
    console.log('Form submitted with data:', {
      ...data,
      password: '[REDACTED]',
      confirmPassword: '[REDACTED]',
    });

    if (!acceptTerms) {
      setMessage('Please accept the terms and conditions to continue.');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      // Log the exact data being sent to the API
      const requestData = {
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        name: `${data.firstName} ${data.lastName}`, // Combine first and last name
        phone: data.phone,
        age: data.age,
      };

      console.log('Sending registration request with data:', {
        ...requestData,
        password: '[REDACTED]',
      });

      const response = await authService.register(requestData);

      console.log('Registration response:', response);

      // Check if we received a valid user object
      if (response && response.id) {
        setMessage('Registration successful! Redirecting to login...');

        // Wait for 3 seconds before redirecting
        setTimeout(() => {
          setRememberMe(true);
          router.push('/auth/login?registered=true');
        }, 3000);
      } else {
        setMessage('Registration failed. Please try again.');
        setIsLoading(false);
      }
    } catch (error: any) {
      // Reset loading state immediately when there's an error
      setIsLoading(false);

      // Detailed error logging
      console.error('Registration error:', {
        name: error.name,
        message: error.message,
        stack: error.stack,
        response: {
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
          headers: error.response?.headers,
        },
      });

      let errorMessage = '';

      // Handle different types of error responses
      if (error.response?.data) {
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data.message) {
          if (Array.isArray(error.response.data.message)) {
            // Check for password-related errors
            const passwordErrors = error.response.data.message.filter(
              (msg: string) => msg.toLowerCase().includes('password')
            );
            if (passwordErrors.length > 0) {
              errorMessage = passwordErrors.join(', ');
            } else {
              errorMessage = error.response.data.message.join(', ');
            }
          } else {
            errorMessage = error.response.data.message;
          }
        } else if (error.response.data.error) {
          errorMessage = error.response.data.error;
        } else if (Array.isArray(error.response.data)) {
          // Handle validation errors array
          const errors = error.response.data.map(
            (err: any) => err.message || err
          );
          const passwordErrors = errors.filter((msg: string) =>
            msg.toLowerCase().includes('password')
          );
          errorMessage =
            passwordErrors.length > 0
              ? passwordErrors.join(', ')
              : errors.join(', ');
        } else {
          errorMessage = JSON.stringify(error.response.data);
        }
      }

      // If no specific error message was found, check if it's a password error
      if (!errorMessage && error.message?.toLowerCase().includes('password')) {
        errorMessage = error.message;
      } else if (!errorMessage) {
        errorMessage = 'Registration failed. Please try again.';
      }

      console.log('Final error message:', errorMessage);
      setMessage(errorMessage);
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

  // Add debug log for form errors
  console.log('Form errors:', form.formState.errors);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="space-y-1">
        <h2 className="text-2xl font-bold text-center">Create an account</h2>
        <p className="text-sm text-gray-500 text-center">
          Enter your information to create an account
        </p>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
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

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <Separator className="w-full" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-gray-500">
              Or continue with email
            </span>
          </div>
        </div>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 mt-6"
          noValidate
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Input
                id="firstName"
                placeholder="First name"
                {...form.register('firstName')}
              />
              {form.formState.errors.firstName && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.firstName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Input
                id="lastName"
                placeholder="Last name"
                {...form.register('lastName')}
              />
              {form.formState.errors.lastName && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              {...form.register('email')}
            />
            {form.formState.errors.email && (
              <p className="text-sm text-red-500">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              id="phone"
              type="tel"
              placeholder="Phone number"
              {...form.register('phone')}
            />
            {form.formState.errors.phone && (
              <p className="text-sm text-red-500">
                {form.formState.errors.phone.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              id="password"
              placeholder="Create a password"
              type="password"
              {...form.register('password')}
            />
            <PasswordStrength password={form.watch('password')} />
            {form.formState.errors.password && (
              <p className="text-sm text-red-500">
                {form.formState.errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Input
              id="confirmPassword"
              placeholder="Confirm your password"
              type="password"
              {...form.register('confirmPassword')}
            />
            {form.formState.errors.confirmPassword && (
              <p className="text-sm text-red-500">
                {form.formState.errors.confirmPassword.message}
              </p>
            )}
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) =>
                  setAcceptTerms(checked as boolean)
                }
              />
              <Label htmlFor="terms" className="text-sm text-gray-600">
                I accept the{' '}
                <Link href="/terms" className="text-blue-600 hover:underline">
                  terms and conditions
                </Link>
              </Label>
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2" />
                  Creating account...
                </div>
              ) : (
                'Create account'
              )}
            </Button>
          </div>
        </form>

        {message && (
          <div
            className={`mt-4 p-3 rounded-md ${
              message.includes('successful')
                ? 'bg-green-50 text-green-700 border border-green-200'
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}
          >
            {message}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <div className="w-full text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-blue-600 hover:underline">
            Sign in
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
