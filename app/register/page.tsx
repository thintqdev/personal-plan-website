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
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  ArrowLeft,
  CheckCircle,
  X,
} from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
  });

  const { register } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setPasswordChecks({
      length: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
    });
  }, [password]);

  const validateForm = () => {
    if (!name.trim()) {
      setError("Tên là bắt buộc");
      return false;
    }
    if (!email.trim()) {
      setError("Email là bắt buộc");
      return false;
    }
    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Mật khẩu không khớp");
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

    setIsLoading(true);

    try {
      const response = await register(name.trim(), email.trim(), password);

      if (response.success) {
        // Redirect to email verification or dashboard
        if (response.user && !response.user.isEmailVerified) {
          router.push("/verify-email?email=" + encodeURIComponent(email));
        } else {
          router.push("/admin");
        }
      } else {
        setError(response.message || "Đăng ký thất bại");
      }
    } catch (error: any) {
      setError(error.message || "Có lỗi xảy ra trong quá trình đăng ký");
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

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Welcome Section */}
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
        <div className="absolute top-16 right-20 w-24 h-24 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-40 left-16 w-28 h-28 bg-emerald-300/20 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-teal-300/20 rounded-full blur-xl animate-ping"></div>

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
            Bắt đầu
            <br />
            hành trình! 🚀
          </h1>

          <p className="text-xl text-green-100 mb-8 leading-relaxed max-w-md">
            Tham gia cùng hàng nghìn người đã chọn ThinPlan để quản lý cuộc sống
            thông minh hơn
          </p>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold mb-2">1000+</div>
              <div className="text-green-100 text-sm">Người dùng</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold mb-2">4.8★</div>
              <div className="text-green-100 text-sm">Đánh giá</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center text-green-100">
              <CheckCircle className="w-5 h-5 mr-3 text-green-300" />
              <span>Miễn phí sử dụng</span>
            </div>
            <div className="flex items-center text-green-100">
              <CheckCircle className="w-5 h-5 mr-3 text-green-300" />
              <span>Không quảng cáo</span>
            </div>
            <div className="flex items-center text-green-100">
              <CheckCircle className="w-5 h-5 mr-3 text-green-300" />
              <span>Bảo mật tối đa</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Register Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Back to Landing */}
          <Link
            href="/landing"
            className="inline-flex items-center text-gray-600 hover:text-green-600 mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Quay lại trang chủ
          </Link>

          <Card className="border-0 shadow-2xl bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-3xl font-bold text-center text-gray-900">
                Tạo tài khoản
              </CardTitle>
              <CardDescription className="text-center text-gray-600 text-lg">
                Điền thông tin để bắt đầu sử dụng ThinPlan
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 font-medium">
                    Họ và tên
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="name"
                      type="text"
                      placeholder="Nhập họ và tên của bạn"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-10 h-12 border-gray-200 focus:border-green-500 focus:ring-green-500 transition-all"
                      required
                      disabled={isLoading}
                    />
                  </div>
                </div>

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
                      className="pl-10 h-12 border-gray-200 focus:border-green-500 focus:ring-green-500 transition-all"
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
                      placeholder="Tạo mật khẩu mạnh"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-12 h-12 border-gray-200 focus:border-green-500 focus:ring-green-500 transition-all"
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

                  {/* Password Strength Indicator */}
                  {password && (
                    <div className="bg-gray-50 rounded-lg p-3 space-y-2 mt-2">
                      <div className="text-sm font-medium text-gray-700 mb-2">
                        Yêu cầu mật khẩu:
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <PasswordCheck
                          isValid={passwordChecks.length}
                          text="Ít nhất 6 ký tự"
                        />
                        <PasswordCheck
                          isValid={passwordChecks.number}
                          text="Có số"
                        />
                        <PasswordCheck
                          isValid={passwordChecks.lowercase}
                          text="Chữ thường"
                        />
                        <PasswordCheck
                          isValid={passwordChecks.uppercase}
                          text="Chữ hoa"
                        />
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-gray-700 font-medium"
                  >
                    Xác nhận mật khẩu
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Nhập lại mật khẩu"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`pl-10 pr-12 h-12 border-gray-200 focus:border-green-500 focus:ring-green-500 transition-all ${
                        confirmPassword && password !== confirmPassword
                          ? "border-red-300 focus:border-red-500"
                          : ""
                      }`}
                      required
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                      disabled={isLoading}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {confirmPassword && password !== confirmPassword && (
                    <div className="text-red-600 text-sm flex items-center mt-1">
                      <X className="w-4 h-4 mr-1" />
                      Mật khẩu không khớp
                    </div>
                  )}
                  {confirmPassword && password === confirmPassword && (
                    <div className="text-green-600 text-sm flex items-center mt-1">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      Mật khẩu khớp
                    </div>
                  )}
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm animate-shake">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium transition-all transform hover:scale-[1.02] disabled:transform-none"
                  disabled={
                    isLoading ||
                    !passwordChecks.length ||
                    password !== confirmPassword
                  }
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Đang tạo tài khoản...
                    </div>
                  ) : (
                    "Tạo tài khoản"
                  )}
                </Button>
              </form>
            </CardContent>

            <CardFooter className="flex flex-col space-y-4 pt-6">
              <div className="text-sm text-center text-gray-500">
                Bằng cách đăng ký, bạn đồng ý với{" "}
                <a href="#" className="text-green-600 hover:underline">
                  Điều khoản Dịch vụ
                </a>{" "}
                và{" "}
                <a href="#" className="text-green-600 hover:underline">
                  Chính sách Bảo mật
                </a>
              </div>

              <div className="text-center text-gray-600">
                Đã có tài khoản?{" "}
                <Link
                  href="/login"
                  className="text-green-600 hover:text-green-700 font-medium hover:underline transition-colors"
                >
                  Đăng nhập ngay
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
