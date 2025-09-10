"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, Palette } from "lucide-react";

export default function StudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState(() => new Date());
  const [currentTheme, setCurrentTheme] = useState("blue");

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
    },
  ];

  const selectedTheme =
    colorThemes.find((t) => t.value === currentTheme) || colorThemes[0];

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div
      className={`min-h-screen bg-gradient-to-br ${selectedTheme.pageGradient}`}
    >
      {/* Top Bar with Time */}
      <div
        className={`bg-gradient-to-r ${selectedTheme.gradient} text-white py-2 px-4`}
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
                  onClick={() => setCurrentTheme(theme.value)}
                  className={`w-4 h-4 rounded-full border-2 transition-all ${
                    currentTheme === theme.value
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
      {/* Modern Navigation Header */}
      <nav
        className={`${selectedTheme.navBg} backdrop-blur-md border-b ${selectedTheme.navBorder} sticky top-0 z-40`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="flex items-center space-x-3">
                <div
                  className={`w-8 h-8 bg-gradient-to-r ${selectedTheme.logoGradient} rounded-lg flex items-center justify-center`}
                >
                  <span className="text-white font-bold text-sm">TP</span>
                </div>
                <div className="hidden sm:block">
                  <h1 className="text-xl font-bold text-gray-900">ThinPlan</h1>
                  <p className="text-xs text-gray-500">Study Platform</p>
                </div>
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-2">
              <Link
                href="/study"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  typeof window !== "undefined" &&
                  window.location?.pathname === "/study"
                    ? selectedTheme.activeNav
                    : `text-gray-600 hover:text-gray-900 ${selectedTheme.hoverNav}`
                }`}
              >
                <span className="flex items-center space-x-2">
                  <span className="text-lg">🏠</span>
                  <span>Study Hub</span>
                </span>
              </Link>
              <Link
                href="/study/language"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  typeof window !== "undefined" &&
                  window.location?.pathname === "/study/language"
                    ? selectedTheme.activeNav
                    : `text-gray-600 hover:text-gray-900 ${selectedTheme.hoverNav}`
                }`}
              >
                <span className="flex items-center space-x-2">
                  <span className="text-lg">🌍</span>
                  <span>Học Ngoại Ngữ</span>
                </span>
              </Link>
              <Link
                href="/study/tech"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  typeof window !== "undefined" &&
                  window.location?.pathname === "/study/tech"
                    ? selectedTheme.activeNav
                    : `text-gray-600 hover:text-gray-900 ${selectedTheme.hoverNav}`
                }`}
              >
                <span className="flex items-center space-x-2">
                  <span className="text-lg">⚡</span>
                  <span>Học Kỹ Thuật</span>
                </span>
              </Link>
              <Link
                href="/study/skills"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  typeof window !== "undefined" &&
                  window.location?.pathname === "/study/skills"
                    ? selectedTheme.activeNav
                    : `text-gray-600 hover:text-gray-900 ${selectedTheme.hoverNav}`
                }`}
              >
                <span className="flex items-center space-x-2">
                  <span className="text-lg">🎯</span>
                  <span>Học Kỹ Năng</span>
                </span>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                <svg
                  className="w-6 h-6 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>

            {/* User Info Section */}
            <div className="hidden md:flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <div className="hidden lg:block">
                  <p className="text-sm font-semibold text-gray-900">
                    Nguyễn Văn A
                  </p>
                  <p className="text-xs text-gray-500">Premium Member</p>
                </div>
              </div>
              <button className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                <svg
                  className="w-5 h-5 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className={`md:hidden border-t ${selectedTheme.navBorder} py-4`}>
            <div className="space-y-2">
              <Link
                href="/study"
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  typeof window !== "undefined" &&
                  window.location?.pathname === "/study"
                    ? selectedTheme.activeNav
                    : `text-gray-600 hover:text-gray-900 ${selectedTheme.hoverNav}`
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-lg">🏠</span>
                <span>Study Hub</span>
              </Link>
              <Link
                href="/study/language"
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  typeof window !== "undefined" &&
                  window.location?.pathname === "/study/language"
                    ? selectedTheme.activeNav
                    : `text-gray-600 hover:text-gray-900 ${selectedTheme.hoverNav}`
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-lg">🌍</span>
                <span>Học Ngoại Ngữ</span>
              </Link>
              <Link
                href="/study/tech"
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  typeof window !== "undefined" &&
                  window.location?.pathname === "/study/tech"
                    ? selectedTheme.activeNav
                    : `text-gray-600 hover:text-gray-900 ${selectedTheme.hoverNav}`
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-lg">⚡</span>
                <span>Học Kỹ Thuật</span>
              </Link>
              <Link
                href="/study/skills"
                className={`flex items-center space-x-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  typeof window !== "undefined" &&
                  window.location?.pathname === "/study/skills"
                    ? selectedTheme.activeNav
                    : `text-gray-600 hover:text-gray-900 ${selectedTheme.hoverNav}`
                }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="text-lg">�</span>
                <span>Học Kỹ Năng</span>
              </Link>
            </div>

            {/* Mobile User Info */}
            <div className={`border-t ${selectedTheme.navBorder} mt-4 pt-4`}>
              <div className="flex items-center gap-3 px-3">
                <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    Nguyễn Văn A
                  </p>
                  <p className="text-xs text-gray-500">Premium Member</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-gray-600">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div
                className={`w-6 h-6 bg-gradient-to-r ${selectedTheme.logoGradient} rounded-lg flex items-center justify-center`}
              >
                <span className="text-white font-bold text-xs">TP</span>
              </div>
              <span className="font-bold">ThinPlan Study</span>
            </div>
            <p className="text-sm">Nền tảng học tập thông minh</p>
            <p className="text-xs mt-2">
              © 2024 ThinPlan. Phát triển với ❤️ cho sự học tập
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
