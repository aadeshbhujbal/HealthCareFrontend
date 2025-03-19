'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/providers/AuthProvider';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { authService } = useAuth();

  useEffect(() => {
    // Check if user is authenticated
    if (!authService.isAuthenticated()) {
      router.push('/auth/login');
    }
  }, [router, authService]);

  // If authenticated, render children
  if (authService.isAuthenticated()) {
    return <>{children}</>;
  }

  // Return null while checking authentication or redirecting
  return null;
}
