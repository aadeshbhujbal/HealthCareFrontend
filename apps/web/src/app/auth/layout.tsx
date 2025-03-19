'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../providers/AuthProvider';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { state } = useAuth();
  const { isAuthenticated, user } = state;

  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect based on user role
      switch (user.role) {
        case 'PATIENT':
          router.push('/patient/dashboard');
          break;
        case 'DOCTOR':
          router.push('/doctor/dashboard');
          break;
        case 'CLINIC_ADMIN':
        case 'SUPER_ADMIN':
          router.push('/admin/dashboard');
          break;
        case 'RECEPTIONIST':
          router.push('/receptionist/dashboard');
          break;
        default:
          router.push('/dashboard');
      }
    }
  }, [isAuthenticated, user, router]);

  return (
    <div className="min-h-screen flex">
      {/* Left side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-indigo-600 to-blue-500">
        <div className="absolute inset-0 bg-black opacity-10" />
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <h1 className="text-4xl font-bold mb-6">Welcome to HealthCare App</h1>
          <p className="text-xl">
            Your comprehensive healthcare management solution. Connect with
            doctors, manage appointments, and access your medical records
            securely.
          </p>
          {/* Add decorative elements or testimonials here */}
          <div className="mt-12 space-y-8">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                  {/* Icon */}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Secure & Private</h3>
                <p className="text-white text-opacity-80">
                  Your data is protected with industry-standard encryption
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                  {/* Icon */}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold">24/7 Access</h3>
                <p className="text-white text-opacity-80">
                  Access your healthcare information anytime, anywhere
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
                  {/* Icon */}
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Easy Management</h3>
                <p className="text-white text-opacity-80">
                  Manage appointments and prescriptions with ease
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg
            className="h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <pattern
              id="pattern-circles"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="10" cy="10" r="2" fill="currentColor" />
            </pattern>
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#pattern-circles)"
            />
          </svg>
        </div>
      </div>

      {/* Right side - Auth forms */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gray-50">
        <div className="w-full max-w-md space-y-8">{children}</div>
      </div>
    </div>
  );
}
