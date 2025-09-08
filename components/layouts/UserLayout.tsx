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
  PiggyBank,
  LogOut,
  Settings,
  LayoutDashboard,
  ChevronDown,
  User,
  Quote as QuoteIcon,
  BookA,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getUser, type User as UserType } from "@/lib/user-service";
import { useAuth } from "@/lib/auth-context";
import { getQuotes, type Quote } from "@/lib/user-service";

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
    name: "Kế hoạch tuần",
    href: "/weekly-plan",
    icon: Clock,
    description: "Lập kế hoạch hàng tuần",
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
    name: "Tiết kiệm",
    href: "/saving",
    icon: PiggyBank,
    description: "Theo dõi mục tiêu tiết kiệm",
  },
  {
    name: "Ghi chú",
    href: "/notes",
    icon: BookOpen,
    description: "Ghi chú & tài liệu cá nhân",
  },
  {
    name: "Nhật ký",
    href: "/dairy",
    icon: BookA,
    description: "Nhật ký",
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
  const router = useRouter();
  const { user: authUser, logout, isLoading } = useAuth();
  const [isClient, setIsClient] = useState(false);
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentTheme, setCurrentTheme] = useState(colorThemes[0]);
  const [currentCoverImage, setCurrentCoverImage] = useState("");
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  // Handle logout
  const handleLogout = async () => {
    await logout();
    router.push("/auth/login");
  };

  // Update time every second
  useEffect(() => {
    setIsClient(true);
    setCurrentCoverImage(
      coverImage ||
        localStorage.getItem("coverImage") ||
        "/mountain-peak-sunrise-motivation-success.png"
    );

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, [coverImage]);

  // Fetch quotes when component mounts and user is authenticated
  useEffect(() => {
    const fetchQuotes = async () => {
      if (!authUser) return; // Only fetch when user is authenticated

      try {
        const quotesData = await getQuotes();
        setQuotes(quotesData || []);
      } catch (error) {
        console.error("Error fetching quotes:", error);
        setQuotes([]); // Set empty array on error
      }
    };

    fetchQuotes();
  }, [authUser]);

  // Auto rotate quotes every 24 hours (daily quote)
  useEffect(() => {
    if (quotes.length === 0) return;

    // Get current date as string (YYYY-MM-DD)
    const today = new Date().toISOString().split("T")[0];

    // Use date as seed to consistently pick same quote for the day
    const dateHash = today
      .split("-")
      .reduce((acc, val) => acc + parseInt(val), 0);
    const todayQuoteIndex = dateHash % quotes.length;

    setCurrentQuoteIndex(todayQuoteIndex);

    // Check for date change every hour to update quote
    const checkDateTimer = setInterval(() => {
      const newToday = new Date().toISOString().split("T")[0];
      if (newToday !== today) {
        const newDateHash = newToday
          .split("-")
          .reduce((acc, val) => acc + parseInt(val), 0);
        const newQuoteIndex = newDateHash % quotes.length;
        setCurrentQuoteIndex(newQuoteIndex);
      }
    }, 60 * 60 * 1000); // Check every hour

    return () => clearInterval(checkDateTimer);
  }, [quotes.length]);

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

  const displayCoverImage = isClient
    ? coverImage ||
      currentCoverImage ||
      "/mountain-peak-sunrise-motivation-success.png"
    : "/mountain-peak-sunrise-motivation-success.png";

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
            {isClient && (
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
            )}
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

              {/* Admin link for desktop */}
              {authUser?.role === "admin" && (
                <Link
                  href="/admin"
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    pathname === "/admin"
                      ? currentTheme.activeNav
                      : `text-gray-600 hover:text-gray-900 ${currentTheme.hoverNav}`
                  }`}
                >
                  <Settings className="w-4 h-4" />
                  <span>Quản trị</span>
                </Link>
              )}
            </div>

            {/* User Profile & Mobile Menu */}
            <div className="flex items-center gap-4">
              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 p-2 hover:bg-gray-50 hover:text-gray-900 focus:bg-gray-50 focus:text-gray-900 data-[state=open]:bg-gray-50 data-[state=open]:text-gray-900"
                  >
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={user?.avatar} alt={user?.name} />
                      <AvatarFallback>
                        {user?.name?.charAt(0).toUpperCase() ||
                          authUser?.name?.charAt(0).toUpperCase() ||
                          "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div className="hidden lg:block text-left">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.name || authUser?.name || "Đang tải..."}
                      </p>
                      <p className="text-xs text-gray-500">
                        {user?.role || authUser?.role || "user"}
                      </p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-56 bg-white border border-gray-200 shadow-lg"
                >
                  <DropdownMenuLabel className="text-gray-900">
                    Tài khoản của tôi
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-gray-200" />
                  <DropdownMenuItem asChild>
                    <Link
                      href="/admin"
                      className="flex items-center gap-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:bg-gray-50 focus:text-gray-900"
                    >
                      <User className="w-4 h-4" />
                      Quản lý tài khoản
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/settings"
                      className="flex items-center gap-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:bg-gray-50 focus:text-gray-900"
                    >
                      <Settings className="w-4 h-4" />
                      Cài đặt
                    </Link>
                  </DropdownMenuItem>
                  {authUser?.role === "admin" && (
                    <>
                      <DropdownMenuSeparator className="bg-gray-200" />
                      <DropdownMenuItem asChild>
                        <Link
                          href="/admin"
                          className="flex items-center gap-2 text-gray-700 hover:bg-gray-50 hover:text-gray-900 focus:bg-gray-50 focus:text-gray-900"
                        >
                          <Settings className="w-4 h-4" />
                          Quản trị
                        </Link>
                      </DropdownMenuItem>
                    </>
                  )}
                  <DropdownMenuSeparator className="bg-gray-200" />
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center gap-2 text-red-600 hover:bg-red-50 hover:text-red-700 focus:bg-red-50 focus:text-red-700"
                  >
                    <LogOut className="w-4 h-4" />
                    Đăng xuất
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

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

                {/* Admin section for mobile */}
                {authUser?.role === "admin" && (
                  <Link
                    href="/admin"
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      pathname === "/admin"
                        ? currentTheme.activeNav
                        : `text-gray-600 hover:text-gray-900 ${currentTheme.hoverNav}`
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Settings className="w-4 h-4" />
                    <div>
                      <div>Quản trị</div>
                      <div className="text-xs text-gray-500">
                        Quản lý hệ thống
                      </div>
                    </div>
                  </Link>
                )}

                {/* Mobile Logout */}
                <button
                  onClick={handleLogout}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all text-red-600 hover:bg-red-50`}
                >
                  <LogOut className="w-4 h-4" />
                  <div>
                    <div>Đăng xuất</div>
                    <div className="text-xs text-red-500">
                      Thoát khỏi tài khoản
                    </div>
                  </div>
                </button>
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

      {/* Inspirational Quote Section */}
      {quotes.length > 0 && (
        <div className="bg-gradient-to-r from-white/60 to-white/40 backdrop-blur-sm border-b border-gray-200/50">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-center">
              <div className="flex items-center gap-3 text-center max-w-4xl">
                <QuoteIcon className="w-6 h-6 text-blue-600 flex-shrink-0 hidden sm:block" />
                <div className="relative">
                  <p
                    key={`quote-${currentQuoteIndex}`}
                    className="text-gray-700 font-medium text-base sm:text-lg italic animate-fade-in leading-relaxed"
                  >
                    "{quotes[currentQuoteIndex]?.text}"
                  </p>
                </div>
                <QuoteIcon className="w-6 h-6 text-blue-600 flex-shrink-0 transform rotate-180 hidden sm:block" />
              </div>
            </div>
            {quotes.length > 1 && (
              <div className="flex justify-center mt-3 gap-1.5">
                {quotes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentQuoteIndex(index)}
                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                      index === currentQuoteIndex
                        ? "bg-blue-600 scale-125"
                        : "bg-gray-300 hover:bg-gray-400 hover:scale-110"
                    }`}
                    aria-label={`Chuyển đến quote ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

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
