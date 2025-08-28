"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authService } from "@/lib/auth-service";
import {
  Eye,
  EyeOff,
  Lock,
  ArrowLeft,
  CheckCircle,
  X,
  Shield,
} from "lucide-react";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
  });

  const router = useRouter();
  const params = useParams();
  const token = params?.token as string;

  useEffect(() => {
    setMounted(true);
    if (!token) {
      setError("Token đặt lại mật khẩu không hợp lệ");
    }
  }, [token]);

  useEffect(() => {
    setPasswordChecks({
      length: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
    });
  }, [password]);

  const validateForm = () => {
    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp nhau");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    if (!token) {
      setError("Token đặt lại mật khẩu không hợp lệ");
      return;
    }

    setIsLoading(true);

    try {
      const response = await authService.resetPassword(token, { password });

      if (response.success) {
        setIsSuccess(true);
      } else {
        setError(response.message || "Không thể đặt lại mật khẩu");
      }
    } catch (error: any) {
      setError(error.message || "Có lỗi xảy ra khi đặt lại mật khẩu");
    } finally {
      setIsLoading(false);
    }
  };

  const PasswordCheck = ({
    isValid,
    text,
  }: {
    isValid: boolean;
    text: string;
  }) => (
    <div
      className={`flex items-center text-sm ${
        isValid ? "text-green-600" : "text-gray-400"
      } transition-colors`}
    >
      {isValid ? (
        <CheckCircle className="w-4 h-4 mr-2" />
      ) : (
        <X className="w-4 h-4 mr-2" />
      )}
      {text}
    </div>
  );

  if (!mounted) {
    return null;
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex">
        {/* Left Side - Success Celebration */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-green-600 via-emerald-600 to-teal-700 relative overflow-hidden">
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
          <div className="absolute bottom-32 right-16 w-32 h-32 bg-emerald-300/20 rounded-full blur-2xl animate-bounce"></div>
          <div className="absolute top-1/2 left-16 w-16 h-16 bg-teal-300/20 rounded-full blur-xl animate-ping"></div>

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
              Hoàn tất!
              <br />
              Thành công! 🎉
            </h1>

            <p className="text-xl text-green-100 mb-8 leading-relaxed max-w-md">
              Mật khẩu của bạn đã được đặt lại thành công. Bây giờ bạn có thể
              đăng nhập với mật khẩu mới
            </p>

            <div className="space-y-4">
              <div className="flex items-center text-green-100">
                <CheckCircle className="w-5 h-5 mr-3 text-yellow-300" />
                <span>Mật khẩu đã được mã hóa an toàn</span>
              </div>
              <div className="flex items-center text-green-100">
                <CheckCircle className="w-5 h-5 mr-3 text-yellow-300" />
                <span>Tài khoản của bạn hoàn toàn bảo mật</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Success Form */}
        <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
          <div className="w-full max-w-md">
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
              <CardHeader className="space-y-1 pb-8">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <CheckCircle className="w-8 h-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-center text-gray-900">
                  Đặt lại thành công
                </CardTitle>
                <CardDescription className="text-center text-gray-600">
                  Mật khẩu của bạn đã được cập nhật
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-green-700 bg-green-50 border border-green-200 p-4 rounded-lg text-center">
                  <p className="font-medium">
                    ✅ Mật khẩu đã được đặt lại thành công!
                  </p>
                  <p className="text-sm mt-1">
                    Bây giờ bạn có thể đăng nhập với mật khẩu mới
                  </p>
                </div>
                <Button
                  onClick={() => router.push("/login")}
                  className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium"
                >
                  Đăng nhập ngay
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Security Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700 relative overflow-hidden">
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
        <div className="absolute top-1/2 left-16 w-16 h-16 bg-indigo-300/20 rounded-full blur-xl animate-ping"></div>

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
            Tạo mật khẩu
            <br />
            mới an toàn 🔒
          </h1>

          <p className="text-xl text-indigo-100 mb-8 leading-relaxed max-w-md">
            Đặt mật khẩu mạnh để bảo vệ tài khoản của bạn với các tiêu chuẩn bảo
            mật cao nhất
          </p>

          <div className="space-y-4">
            <div className="flex items-center text-indigo-100">
              <Shield className="w-5 h-5 mr-3 text-yellow-300" />
              <span>Mã hóa AES-256 bit</span>
            </div>
            <div className="flex items-center text-indigo-100">
              <Shield className="w-5 h-5 mr-3 text-yellow-300" />
              <span>Kiểm tra bảo mật tự động</span>
            </div>
            <div className="flex items-center text-indigo-100">
              <Shield className="w-5 h-5 mr-3 text-yellow-300" />
              <span>Đồng bộ trên mọi thiết bị</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Back to Login */}
          <Link
            href="/login"
            className="inline-flex items-center text-gray-600 hover:text-indigo-600 mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Quay lại đăng nhập
          </Link>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
            <CardHeader className="space-y-1 pb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Lock className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center text-gray-900">
                Đặt lại mật khẩu
              </CardTitle>
              <CardDescription className="text-center text-gray-600">
                Nhập mật khẩu mới an toàn dưới đây
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-gray-700 font-medium"
                  >
                    Mật khẩu mới
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu mới (ít nhất 6 ký tự)"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      className="pl-10 pr-10 h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
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

                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-gray-700 font-medium"
                  >
                    Xác nhận mật khẩu mới
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Nhập lại mật khẩu mới"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      disabled={isLoading}
                      className="pl-10 pr-10 h-12 border-gray-200 focus:border-indigo-500 focus:ring-indigo-500"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Password Strength Checker */}
                {password && (
                  <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">
                      Yêu cầu mật khẩu:
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      <PasswordCheck
                        isValid={passwordChecks.length}
                        text="Ít nhất 6 ký tự"
                      />
                      <PasswordCheck
                        isValid={passwordChecks.uppercase}
                        text="Chữ hoa (A-Z)"
                      />
                      <PasswordCheck
                        isValid={passwordChecks.lowercase}
                        text="Chữ thường (a-z)"
                      />
                      <PasswordCheck
                        isValid={passwordChecks.number}
                        text="Số (0-9)"
                      />
                    </div>
                  </div>
                )}

                {error && (
                  <div className="text-red-600 text-sm bg-red-50 border border-red-200 p-3 rounded-lg">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-medium"
                  disabled={isLoading || !token}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Đang đặt lại...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <Shield className="w-4 h-4 mr-2" />
                      Đặt lại mật khẩu
                    </div>
                  )}
                </Button>
              </form>

              <div className="text-center pt-4 border-t border-gray-100">
                <Link
                  href="/login"
                  className="text-indigo-600 hover:text-indigo-700 font-medium hover:underline"
                >
                  Quay lại đăng nhập
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
