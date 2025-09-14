"use client";
import Link from "next/link";
import { ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  ArrowLeft,
  BookOpen,
  Brain,
  Target,
  Users,
  Settings,
  LogOut,
  BarChart3,
  FileText,
  UserCheck,
  Cog,
  Globe,
  Cpu,
  Lightbulb,
} from "lucide-react";

const studyAdminNav = [
  {
    href: "/study/admin",
    label: "Tổng quan",
    icon: <BarChart3 className="w-5 h-5" />,
    description: "Dashboard quản lý học tập",
  },
  {
    href: "/study/admin/language",
    label: "Ngoại ngữ",
    icon: <Globe className="w-5 h-5" />,
    description: "Quản lý học ngoại ngữ",
  },
  {
    href: "/study/admin/tech",
    label: "Kỹ thuật",
    icon: <Cpu className="w-5 h-5" />,
    description: "Quản lý học kỹ thuật",
  },
  {
    href: "/study/admin/skills",
    label: "Kĩ năng",
    icon: <Lightbulb className="w-5 h-5" />,
    description: "Quản lý phát triển kĩ năng",
  },
  {
    href: "/study/admin/users",
    label: "Quản lý học viên",
    icon: <UserCheck className="w-5 h-5" />,
    description: "Xem và quản lý người học",
  },
  {
    href: "/study/admin/settings",
    label: "Cài đặt",
    icon: <Cog className="w-5 h-5" />,
    description: "Cấu hình hệ thống học tập",
  },
];

export default function StudyAdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
              <h2 className="text-lg font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Brain className="w-5 h-5 text-indigo-600" />
                Menu
              </h2>

              <nav className="space-y-2">
                {studyAdminNav.map((item) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block p-4 rounded-xl transition-all duration-200 ${
                        isActive
                          ? "bg-indigo-100 border-2 border-indigo-200 shadow-sm"
                          : "hover:bg-white/50 border-2 border-transparent hover:border-indigo-100"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-2 rounded-lg ${
                            isActive
                              ? "bg-indigo-500 text-white"
                              : "bg-indigo-100 text-indigo-600"
                          }`}
                        >
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <p
                            className={`font-medium ${
                              isActive ? "text-indigo-900" : "text-gray-900"
                            }`}
                          >
                            {item.label}
                          </p>
                          <p className="text-sm text-gray-600 mt-1">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 min-h-[600px]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
