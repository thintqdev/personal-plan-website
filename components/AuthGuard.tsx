"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";

interface AuthGuardProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireUnauth?: boolean;
  redirectTo?: string;
}

const AuthGuard: React.FC<AuthGuardProps> = ({
  children,
  requireAuth = false,
  requireUnauth = false,
  redirectTo,
}) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return; // Wait for auth check to complete

    // If auth required but user not logged in
    if (requireAuth && !user) {
      const currentPath = window.location.pathname;
      router.replace(`/auth/login?redirect=${encodeURIComponent(currentPath)}`);
      return;
    }

    // If unauth required but user is logged in
    if (requireUnauth && user) {
      router.replace(redirectTo || "/");
      return;
    }
  }, [user, isLoading, requireAuth, requireUnauth, redirectTo, router]);

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Don't render children if auth requirements not met
  if (requireAuth && !user) {
    return null;
  }

  if (requireUnauth && user) {
    return null;
  }

  return <>{children}</>;
};

export default AuthGuard;
