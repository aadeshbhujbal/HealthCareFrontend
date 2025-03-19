'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/app/providers/AuthProvider';

export default function DashboardPage() {
  const router = useRouter();
  const { state } = useAuth();
  const { user } = state;

  useEffect(() => {
    if (user?.role) {
      const roleBasedPath = getRoleBasedPath(user.role);
      router.replace(roleBasedPath);
    }
  }, [user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
    </div>
  );
}

function getRoleBasedPath(role: string): string {
  switch (role) {
    case 'SUPER_ADMIN':
      return '/admin/dashboard';
    case 'DOCTOR':
      return '/doctor/dashboard';
    case 'PATIENT':
      return '/patient/dashboard';
    case 'CLINIC_ADMIN':
      return '/clinic/dashboard';
    case 'RECEPTIONIST':
      return '/reception/dashboard';
    default:
      return '/dashboard';
  }
}
