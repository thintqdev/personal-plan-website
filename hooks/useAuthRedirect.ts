"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-context';

export const useAuthRedirect = () => {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading) {
            if (user) {
                // User is logged in, redirect to home if on auth pages
                const currentPath = window.location.pathname;
                const authPaths = ['/auth/login', '/auth/register', '/auth/forgot-password'];

                if (authPaths.some(path => currentPath.startsWith(path)) || currentPath === '/') {
                    router.replace('/');
                }
            } else {
                // User is not logged in, redirect to login if on protected pages
                const currentPath = window.location.pathname;
                const protectedPaths = ['/', '/finance', '/goals', '/notes', '/saving', '/weekly-plan', '/admin'];

                if (protectedPaths.some(path => currentPath.startsWith(path))) {
                    router.replace(`/auth/login?redirect=${encodeURIComponent(currentPath)}`);
                }
            }
        }
    }, [user, isLoading, router]);

    return { user, isLoading };
};

export default useAuthRedirect;
