import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Check if it's an admin route
  const isAdminRoute = path.startsWith('/admin');
  const isLoginPage = path === '/admin/login';

  // Get the token from cookies
  const token = request.cookies.get('adminToken');

  // If it's an admin route but not the login page, check for authentication
  if (isAdminRoute && !isLoginPage) {
    if (!token) {
      const loginUrl = new URL('/admin/login', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If we're on the login page and have a token, redirect to admin dashboard
  if (isLoginPage && token) {
    const adminUrl = new URL('/admin', request.url);
    return NextResponse.redirect(adminUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
