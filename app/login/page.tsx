"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { Eye, EyeOff, Mail, Lock, ArrowLeft, Sparkles } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const response = await login(email, password);

      if (response.success) {
        // Redirect to dashboard or home page
        router.push("/admin");
      } else {
        setError(response.message || "Đăng nhập thất bại");
      }
    } catch (error: any) {
      setError(error.message || "Có lỗi xảy ra trong quá trình đăng nhập");
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Welcome Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-20">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.1) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          ></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-purple-300/20 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute top-1/2 left-16 w-16 h-16 bg-blue-300/20 rounded-full blur-xl animate-ping"></div>

        <div className="relative z-10 flex flex-col justify-center items-start p-16 text-white">
          <div className="mb-8">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">TP</span>
              </div>
              <span className="text-3xl font-bold">ThinPlan</span>
            </div>
          </div>

          <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            Chào mừng
            <br />
            trở lại! 👋
          </h1>

          <p className="text-xl text-blue-100 mb-8 leading-relaxed max-w-md">
            Tiếp tục hành trình quản lý cuộc sống thông minh cùng ThinPlan
          </p>

          <div className="space-y-4">
            <div className="flex items-center text-blue-100">
              <Sparkles className="w-5 h-5 mr-3 text-yellow-300" />
              <span>Quản lý mục tiêu hiệu quả</span>
            </div>
            <div className="flex items-center text-blue-100">
              <Sparkles className="w-5 h-5 mr-3 text-yellow-300" />
              <span>Theo dõi tiến độ realtime</span>
            </div>
            <div className="flex items-center text-blue-100">
              <Sparkles className="w-5 h-5 mr-3 text-yellow-300" />
              <span>Tích hợp AI thông minh</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Back to Landing */}
          <Link
            href="/landing"
            className="inline-flex items-center text-gray-600 hover:text-blue-600 mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Quay lại trang chủ
          </Link>

          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-8">
              <CardTitle className="text-3xl font-bold text-center text-gray-900">
                Đăng nhập
              </CardTitle>
              <CardDescription className="text-center text-gray-600 text-lg">
                Nhập thông tin để truy cập tài khoản của bạn
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="Nhập địa chỉ email của bạn"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-gray-700 font-medium"
                  >
                    Mật khẩu
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu của bạn"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-12 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500 transition-all"
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm animate-shake">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium transition-all transform hover:scale-[1.02] disabled:transform-none"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Đang đăng nhập...
                    </div>
                  ) : (
                    "Đăng nhập"
                  )}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 pt-6">
              <Link
                href="/forgot-password"
                className="text-blue-600 hover:text-blue-700 hover:underline transition-colors font-medium"
              >
                Quên mật khẩu?
              </Link>

              <div className="text-center text-gray-600">
                Chưa có tài khoản?{" "}
                <Link
                  href="/register"
                  className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors"
                >
                  Đăng ký ngay
                </Link>
              </div>
            </CardFooter>
          </Card>

          {/* Trust Indicators */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-4">
              Được tin tưởng bởi 1000+ người dùng
            </p>
            <div className="flex items-center justify-center space-x-6 opacity-60">
              <div className="flex items-center">
                <span className="text-green-500 mr-1">🔒</span>
                <span className="text-xs text-gray-600">Bảo mật SSL</span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-500 mr-1">⚡</span>
                <span className="text-xs text-gray-600">Tốc độ cao</span>
              </div>
              <div className="flex items-center">
                <span className="text-purple-500 mr-1">🛡️</span>
                <span className="text-xs text-gray-600">Riêng tư</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
