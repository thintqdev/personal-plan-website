"use client";

import { useState, useEffect, ReactNode } from "react";
import {
  Camera,
  Home,
  Target,
  Wallet,
  BookOpen,
  Menu,
  X,
  Clock,
  Palette,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getUser, type User as UserType } from "@/lib/service";

interface UserLayoutProps {
  children: ReactNode;
  title: string;
  description: string;
  icon: ReactNode;
  coverImage?: string;
  onCoverImageChange?: () => void;
  showCoverImageButton?: boolean;
}

const navigationItems = [
  {
    name: "Trang chủ",
    href: "/",
    icon: Home,
    description: "Dashboard tổng quan",
  },
  {
    name: "Mục tiêu",
    href: "/goals",
    icon: Target,
    description: "Quản lý mục tiêu cá nhân",
  },
  {
    name: "Tài chính",
    href: "/finance",
    icon: Wallet,
    description: "Quản lý chi tiêu & tiết kiệm",
  },
  {
    name: "Ghi chú",
    href: "/notes",
    icon: BookOpen,
    description: "Ghi chú & tài liệu cá nhân",
  },
];

const colorThemes = [
  {
    name: "Blue",
    value: "blue",
    color: "bg-blue-600",
    gradient: "from-blue-600 to-blue-700",
    pageGradient: "from-blue-50 via-white to-blue-100",
    navBg: "bg-blue-50/80",
    navBorder: "border-blue-200",
    logoGradient: "from-blue-500 to-blue-600",
    activeNav: "bg-blue-100 text-blue-600",
    hoverNav: "hover:bg-blue-50",
    coverOverlay: "from-transparent via-blue-900/20 to-blue-900/40",
  },
  {
    name: "Green",
    value: "green",
    color: "bg-green-600",
    gradient: "from-green-600 to-green-700",
    pageGradient: "from-green-50 via-white to-green-100",
    navBg: "bg-green-50/80",
    navBorder: "border-green-200",
    logoGradient: "from-green-500 to-green-600",
    activeNav: "bg-green-100 text-green-600",
    hoverNav: "hover:bg-green-50",
    coverOverlay: "from-transparent via-green-900/20 to-green-900/40",
  },
  {
    name: "Purple",
    value: "purple",
    color: "bg-purple-600",
    gradient: "from-purple-600 to-purple-700",
    pageGradient: "from-purple-50 via-white to-purple-100",
    navBg: "bg-purple-50/80",
    navBorder: "border-purple-200",
    logoGradient: "from-purple-500 to-purple-600",
    activeNav: "bg-purple-100 text-purple-600",
    hoverNav: "hover:bg-purple-50",
    coverOverlay: "from-transparent via-purple-900/20 to-purple-900/40",
  },
];

export default function UserLayout({
  children,
  title,
  description,
  icon,
  coverImage,
  onCoverImageChange,
  showCoverImageButton = true,
}: UserLayoutProps) {
  const pathname = usePathname();
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentTheme, setCurrentTheme] = useState(colorThemes[0]);
  const [currentCoverImage, setCurrentCoverImage] = useState(
    coverImage || "/mountain-peak-sunrise-motivation-success.png"
  );

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => clearInterval(timer);
  }, []);

  // Load user data
  useEffect(() => {
    const loadUser = async () => {
      try {
        setIsLoadingUser(true);
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error("Failed to load user:", error);
        // Set default user if API fails
        setUser({
          _id: "default",
          name: "Người dùng",
          role: "user",
          goal: "Phát triển bản thân",
          streak: 0,
          avatar: "/friendly-person-avatar.png",
          __v: 0,
        });
      } finally {
        setIsLoadingUser(false);
      }
    };

    loadUser();
  }, []);

  const defaultCoverImages = [
    "/mountain-peak-sunrise-motivation-success.png",
    "/person-climbing-stairs-to-success.png",
    "/runner-crossing-finish-line-victory.png",
    "/lighthouse-guiding-ships-motivation.png",
    "/eagle-soaring-high-mountains-freedom.png",
    "/peaceful-pink-sunset-landscape.png",
    "/soft-pink-abstract-pattern-for-personal-planning.png",
  ];

  const handleCoverImageChange = () => {
    if (onCoverImageChange) {
      onCoverImageChange();
    } else {
      const randomIndex = Math.floor(Math.random() * defaultCoverImages.length);
      setCurrentCoverImage(defaultCoverImages[randomIndex]);
    }
  };

  const displayCoverImage = coverImage || currentCoverImage;

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${currentTheme.pageGradient}`}
    >
      {/* Top Bar with Time */}
      <div
        className={`bg-gradient-to-r ${currentTheme.gradient} text-white py-2 px-4`}
      >
        <div className="container mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>
              {currentTime.toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}{" "}
              -{" "}
              {currentTime.toLocaleDateString("vi-VN", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          {/* Theme Selector */}
          <div className="flex items-center gap-2">
            <Palette className="w-4 h-4" />
            <div className="flex items-center gap-1">
              {colorThemes.map((theme) => (
                <button
                  key={theme.value}
                  onClick={() => setCurrentTheme(theme)}
                  className={`w-4 h-4 rounded-full border-2 transition-all ${
                    currentTheme.value === theme.value
                      ? "border-white scale-110"
                      : "border-white/50 hover:border-white/75"
                  } ${theme.color}`}
                  title={`Chủ đề ${theme.name}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav
        className={`${currentTheme.navBg} backdrop-blur-md border-b ${currentTheme.navBorder} sticky top-0 z-40`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div
                className={`w-8 h-8 bg-gradient-to-r ${currentTheme.logoGradient} rounded-lg flex items-center justify-center`}
              >
                <span className="text-white font-bold text-sm">TP</span>
              </div>
              <span className="font-bold text-gray-900 hidden sm:block">
                ThinPlan
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      isActive
                        ? currentTheme.activeNav
                        : `text-gray-600 hover:text-gray-900 ${currentTheme.hoverNav}`
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>

            {/* User Profile & Mobile Menu */}
            <div className="flex items-center gap-4">
              {/* User Avatar */}
              <div className="hidden sm:flex items-center gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={user?.avatar} alt={user?.name} />
                  <AvatarFallback>
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden lg:block">
                  <p className="text-sm font-medium text-gray-900">
                    {user?.name || "Đang tải..."}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user?.role || "user"}
                  </p>
                </div>
              </div>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div
              className={`md:hidden border-t ${currentTheme.navBorder} py-4`}
            >
              <div className="space-y-2">
                {navigationItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        isActive
                          ? currentTheme.activeNav
                          : `text-gray-600 hover:text-gray-900 ${currentTheme.hoverNav}`
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <Icon className="w-4 h-4" />
                      <div>
                        <div>{item.name}</div>
                        <div className="text-xs text-gray-500">
                          {item.description}
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>

              {/* Mobile User Info */}
              <div className={`border-t ${currentTheme.navBorder} mt-4 pt-4`}>
                <div className="flex items-center gap-3 px-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback>
                      {user?.name?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {user?.name || "Đang tải..."}
                    </p>
                    <p className="text-xs text-gray-500">
                      {user?.role || "user"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Cover Image Section */}
      <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden">
        <img
          src={displayCoverImage}
          alt="Cover"
          className="w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = "/mountain-peak-sunrise-motivation-success.png";
          }}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-b ${currentTheme.coverOverlay}`}
        />

        {showCoverImageButton && (
          <button
            className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-2 shadow-lg transition-all"
            onClick={handleCoverImageChange}
            title="Đổi ảnh bìa"
          >
            <Camera className="w-5 h-5" />
          </button>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <div className="container mx-auto">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                {icon}
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">
                  {title}
                </h1>
                <p className="text-white/90 text-lg drop-shadow">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">{children}</main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div
                className={`w-6 h-6 bg-gradient-to-r ${currentTheme.logoGradient} rounded-lg flex items-center justify-center`}
              >
                <span className="text-white font-bold text-xs">TP</span>
              </div>
              <span className="font-bold">ThinPlan</span>
            </div>
            <p className="text-sm">Ứng dụng lập kế hoạch cá nhân thông minh</p>
            <p className="text-xs mt-2">
              © 2024 ThinPlan. Phát triển với ❤️ cho mục tiêu cá nhân
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
