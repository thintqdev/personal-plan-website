"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

export default function HomePage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  // Redirect based on authentication status
  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        // Redirect authenticated users to admin dashboard
        router.push("/admin");
      } else {
        // Redirect non-authenticated users to landing page
        router.push("/landing");
      }
    }
  }, [isLoading, isAuthenticated, router]);

  // Show loading state while checking authentication
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <span className="text-white font-bold text-2xl">TP</span>
        </div>
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mb-4"></div>
        <p className="text-gray-600">Đang tải...</p>
      </div>
    </div>
  );
}
