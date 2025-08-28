"use client";
import Link from "next/link";
import { ReactNode, useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Menu, Notebook, Settings } from "lucide-react";
import {
  PiggyBank,
  BarChart3,
  Target,
  User,
  Quote,
  ListChecks,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const adminNav = [
  {
    href: "/admin",
    label: "Tổng quan",
    icon: <BarChart3 className="w-4 h-4" />,
  },
  {
    href: "/admin/finance",
    label: "Quản lý chi tiêu",
    icon: <PiggyBank className="w-4 h-4" />,
  },
  {
    href: "/admin/goals",
    label: "Mục tiêu",
    icon: <Target className="w-4 h-4" />,
  },
  {
    href: "/admin/tasks",
    label: "Nhiệm vụ",
    icon: <ListChecks className="w-4 h-4" />,
  },
  {
    href: "/admin/profile",
    label: "Hồ sơ",
    icon: <User className="w-4 h-4" />,
  },
  {
    href: "/admin/quotes",
    label: "Quotes",
    icon: <Quote className="w-4 h-4" />,
  },
  {
    href: "/admin/notes",
    label: "Ghi chú",
    icon: <Notebook className="w-4 h-4" />,
  },
  {
    href: "/admin/settings",
    label: "Cài đặt",
    icon: <Settings className="w-4 h-4" />,
  },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout, isLoading, isAuthenticated } = useAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isLoading, isAuthenticated, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render content if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex">
      {/* Sidebar */}
      <aside
        className={`bg-white/90 border-r border-gray-200 flex flex-col gap-6 transition-all duration-200 ${
          sidebarOpen ? "w-64 p-6" : "w-16 p-2"
        }`}
      >
        <div className="flex items-center gap-2 mb-8">
          <button
            className="p-2 rounded hover:bg-indigo-100 text-indigo-700 focus:outline-none"
            onClick={() => setSidebarOpen((v) => !v)}
            aria-label="Toggle sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>
          {sidebarOpen && (
            <span className="text-2xl font-bold text-indigo-700 ml-2">
              ThinPlan Admin
            </span>
          )}
        </div>
        <nav className="flex flex-col gap-2">
          {adminNav.map((item) => {
            const isActive = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 ${
                  isActive ? "bg-indigo-100 text-indigo-700 font-semibold" : ""
                }`}
                title={item.label}
              >
                {item.icon}
                {sidebarOpen && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>
        
        {/* User Info */}
        {sidebarOpen && user && (
          <div className="bg-indigo-50 rounded-lg p-3 text-sm">
            <div className="font-medium text-indigo-700">{user.name}</div>
            <div className="text-indigo-600">{user.email}</div>
            {!user.isEmailVerified && (
              <div className="text-orange-600 text-xs mt-1">
                <Link href="/verify-email" className="hover:underline">
                  ⚠️ Email not verified
                </Link>
              </div>
            )}
          </div>
        )}
        <div className="mt-auto flex flex-col gap-2 pt-8">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            {sidebarOpen && <span>Đăng xuất</span>}
          </button>
          <div
            className={`text-xs text-gray-400 ${sidebarOpen ? "pt-4" : "pt-0"}`}
          >
            © {new Date().getFullYear()} ThinPlan
          </div>
        </div>
      </aside>
      {/* Main content */}
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
