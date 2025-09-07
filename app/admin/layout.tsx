"use client";
import Link from "next/link";
import { ReactNode, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  LogOut,
  Menu,
  Notebook,
  Settings,
  HelpCircle,
  FileText,
  Shield,
} from "lucide-react";
import {
  PiggyBank,
  BarChart3,
  Target,
  User,
  Quote,
  ListChecks,
  Wallet,
} from "lucide-react";

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
    href: "/admin/saving",
    label: "Tiết kiệm",
    icon: <Wallet className="w-4 h-4" />,
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

  const handleLogout = () => {
    // Xử lý logout thực tế ở đây nếu có auth, ví dụ clear token, call API, ...
    // Ở đây chỉ redirect về trang chủ
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex">
      {/* Sidebar */}
      <aside
        className={`bg-white/95 backdrop-blur-sm border-r border-gray-200 shadow-xl flex flex-col transition-all duration-300 ease-in-out ${
          sidebarOpen ? "w-72" : "w-20"
        }`}
      >
        {/* Header Section */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <button
              className="p-2.5 rounded-xl hover:bg-indigo-50 text-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 group"
              onClick={() => setSidebarOpen((v) => !v)}
              aria-label="Toggle sidebar"
            >
              <Menu className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            {sidebarOpen && (
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">TP</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">ThinPlan</h1>
                  <p className="text-xs text-gray-500 font-medium">
                    Admin Panel
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Section */}
        <nav className="flex-1 px-4 py-6">
          <div className="space-y-2">
            {adminNav.map((item) => {
              const isActive =
                item.href === "/admin"
                  ? pathname === "/admin"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/25"
                      : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                  }`}
                  title={item.label}
                >
                  <div
                    className={`flex-shrink-0 ${
                      isActive
                        ? "text-white"
                        : "text-gray-500 group-hover:text-indigo-600"
                    }`}
                  >
                    {item.icon}
                  </div>
                  {sidebarOpen && (
                    <span
                      className={`font-medium transition-colors ${
                        isActive
                          ? "text-white"
                          : "text-gray-700 group-hover:text-indigo-600"
                      }`}
                    >
                      {item.label}
                    </span>
                  )}
                  {isActive && sidebarOpen && (
                    <div className="ml-auto w-2 h-2 bg-white rounded-full shadow-sm"></div>
                  )}
                </Link>
              );
            })}
          </div>
        </nav>

        {/* Footer Section */}
        <div className="p-4 border-t border-gray-100 space-y-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 hover:scale-[1.02] group"
          >
            <LogOut className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
            {sidebarOpen && <span className="font-medium">Đăng xuất</span>}
          </button>
          {sidebarOpen && (
            <div className="px-4 py-2">
              <div className="text-xs text-gray-400 text-center">
                © {new Date().getFullYear()} ThinPlan
              </div>
              <div className="text-xs text-gray-400 text-center mt-1">
                v1.0.0
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-hidden">{children}</main>
    </div>
  );
}
