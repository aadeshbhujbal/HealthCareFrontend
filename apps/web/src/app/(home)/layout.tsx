'use client';

import { useRouter, usePathname } from 'next/navigation';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { useAuth } from '../providers/AuthProvider';

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { state, authService } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const { user } = state;

  const getNavLinks = () => {
    if (user?.role === 'PATIENT') {
      return [
        { href: '/patient/dashboard', label: 'Dashboard' },
        { href: '/patient/appointments', label: 'Appointments' },
        { href: '/patient/medical-records', label: 'Medical Records' },
        { href: '/patient/prescriptions', label: 'Prescriptions' },
      ];
    }
    // Add other role-based navigation links here
    return [];
  };

  const navLinks = getNavLinks();

  const handleLogout = async () => {
    try {
      await authService.logout();
      router.replace('/auth');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100">
        {/* Navigation */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <h1 className="text-xl font-bold text-indigo-600">
                    Healthcare App
                  </h1>
                </div>
                {/* Navigation Links */}
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  {navLinks.map((link) => (
                    <button
                      key={link.href}
                      onClick={() => router.push(link.href)}
                      className={`${
                        pathname === link.href
                          ? 'border-indigo-500 text-gray-900'
                          : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                      } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium`}
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>
              {/* Profile and Logout */}
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-700">
                  Welcome, {user?.firstName || 'User'}
                </span>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Page Content */}
        <main className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
