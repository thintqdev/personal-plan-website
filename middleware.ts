import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Routes that require authentication
const protectedRoutes = [
    '/finance',
    '/goals',
    '/notes',
    '/saving',
    '/weekly-plan',
    '/admin'
];

// Routes that redirect to home if already authenticated
const authRoutes = [
    '/auth/login',
    '/auth/register',
    '/auth/forgot-password',
    '/auth/reset-password'
];

// Public routes that don't require authentication
const publicRoutes = [
    '/auth/register-success',
    '/verify-email'
];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;
    const token = request.cookies.get('auth_token')?.value;
    const isAuthenticated = !!token;

    // Handle root route separately
    if (pathname === '/') {
        if (!isAuthenticated) {
            const loginUrl = new URL('/auth/login', request.url);
            loginUrl.searchParams.set('redirect', pathname);
            return NextResponse.redirect(loginUrl);
        }
        // If authenticated, redirect to weekly-plan (or wherever you want)
        return NextResponse.redirect(new URL('/weekly-plan', request.url));
    }

    // Check if route requires authentication
    const isProtectedRoute = protectedRoutes.some(route =>
        pathname.startsWith(route)
    );

    // Check if route is auth-related
    const isAuthRoute = authRoutes.some(route =>
        pathname.startsWith(route)
    );

    // Check if route is public
    const isPublicRoute = publicRoutes.some(route =>
        pathname === route || pathname.startsWith(route)
    );

    // Redirect authenticated users away from auth pages
    if (isAuthenticated && isAuthRoute) {
        return NextResponse.redirect(new URL('/weekly-plan', request.url));
    }

    // Redirect unauthenticated users from protected routes to login
    if (!isAuthenticated && isProtectedRoute) {
        const loginUrl = new URL('/auth/login', request.url);
        loginUrl.searchParams.set('redirect', pathname);
        return NextResponse.redirect(loginUrl);
    }

    return NextResponse.next();
}

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
