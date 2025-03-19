import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define public routes that don't require authentication
const publicRoutes = [
  '/',
  '/auth/login',
  '/auth/register',
  '/auth/verify-otp',
  '/auth/forgot-password',
  '/auth/reset-password',
];

// Helper function to check if a route is public
const isPublicRoute = (path: string) => {
  return publicRoutes.some(route => path.startsWith(route));
};

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get('access_token')?.value;
  const isAuthPage = path.startsWith('/auth');

  // If user is authenticated and trying to access auth pages, redirect to dashboard
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Allow access to public routes without token
  if (isPublicRoute(path)) {
    return NextResponse.next();
  }

  // Check for authentication on protected routes
  if (!token) {
    // Redirect to login without callback to prevent circular redirects
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // User is authenticated, allow access to protected routes
  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}; 