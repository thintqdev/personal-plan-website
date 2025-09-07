"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AuthGuard from "@/components/AuthGuard";

export default function HomePage() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        // User is logged in, redirect to weekly plan
        router.replace("/weekly-plan");
      } else {
        // User is not logged in, redirect to login
        router.replace("/auth/login");
      }
    }
  }, [user, isLoading, router]);

  // Show loading while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
    </div>
  );
}
