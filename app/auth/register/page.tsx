"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import AuthGuard from "@/components/AuthGuard";
import {
  Eye,
  EyeOff,
  Target,
  Shield,
  Users,
  TrendingUp,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    if (password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    setIsLoading(true);

    try {
      await register(name, email, password);
      setSuccess(
        "Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản."
      );
      setTimeout(() => {
        router.push(
          `/auth/register-success?email=${encodeURIComponent(email)}`
        );
      }, 2000);
    } catch (err: any) {
      setError(err.message || "Đăng ký thất bại");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthGuard requireUnauth={true}>
      <div className="min-h-screen bg-white">
        <div className="min-h-screen flex">
          {/* Left side - Branding */}
          <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 bg-gray-50">
            <div className="max-w-md text-center">
              <div className="flex items-center justify-center mb-8">
                <Target className="h-16 w-16 text-blue-600" />
              </div>

              <h1 className="text-5xl font-bold mb-6 text-gray-900">
                Bắt đầu hành trình
              </h1>

              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Tham gia cùng hàng nghìn người đã thay đổi cuộc sống với
                ThinPlan
              </p>

              <div className="space-y-6">
                <div className="flex items-center space-x-4 text-gray-700">
                  <div className="p-3 bg-blue-600 rounded-full">
                    <CheckCircle className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">Hoàn toàn miễn phí</p>
                    <p className="text-sm text-gray-600">
                      Không phí ẩn, không giới hạn
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-gray-700">
                  <div className="p-3 bg-blue-600 rounded-full">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">Cộng đồng hỗ trợ</p>
                    <p className="text-sm text-gray-600">
                      Kết nối với những người cùng chí hướng
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-gray-700">
                  <div className="p-3 bg-blue-600 rounded-full">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold">Phát triển bản thân</p>
                    <p className="text-sm text-gray-600">
                      Theo dõi tiến trình một cách khoa học
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Register form */}
          <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
            <div className="w-full max-w-md">
              {/* Mobile logo */}
              <div className="lg:hidden text-center mb-8">
                <Link
                  href="/"
                  className="inline-flex items-center space-x-2 text-gray-900"
                >
                  <Target className="h-8 w-8 text-blue-600" />
                  <span className="text-2xl font-bold">ThinPlan</span>
                </Link>
              </div>

              <Card className="bg-white border border-gray-200 shadow-lg pt-6">
                <CardHeader className="text-center pb-8">
                  <CardTitle className="text-3xl font-bold text-gray-900 mb-2">
                    Tạo tài khoản mới ✨
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-lg">
                    Hãy bắt đầu hành trình thay đổi cuộc sống của bạn
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {error && (
                    <Alert
                      variant="destructive"
                      className="bg-red-50 border-red-200 text-red-800"
                    >
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}

                  {success && (
                    <Alert className="bg-green-50 border-green-200 text-green-800">
                      <AlertDescription>{success}</AlertDescription>
                    </Alert>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="name"
                        className="text-gray-700 font-medium"
                      >
                        Họ và tên
                      </Label>
                      <Input
                        id="name"
                        type="text"
                        placeholder="Nguyễn Văn A"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="bg-white border border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500/20 h-12"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="email"
                        className="text-gray-700 font-medium"
                      >
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-white border border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500/20 h-12"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="password"
                        className="text-gray-700 font-medium"
                      >
                        Mật khẩu
                      </Label>
                      <div className="relative">
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Ít nhất 6 ký tự"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          className="bg-white border border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500/20 h-12 pr-12"
                          required
                        />
                        <Button
                          type="button"
                          variant="link"
                          size="icon"
                          className="absolute right-0 top-0 h-12 w-12 text-gray-500 hover:text-gray-700"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label
                        htmlFor="confirmPassword"
                        className="text-gray-700 font-medium"
                      >
                        Xác nhận mật khẩu
                      </Label>
                      <div className="relative">
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Nhập lại mật khẩu"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="bg-white border border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-blue-500 focus:ring-blue-500/20 h-12 pr-12"
                          required
                        />
                        <Button
                          type="button"
                          variant="link"
                          size="icon"
                          className="absolute right-0 top-0 h-12 w-12 text-gray-500 hover:text-gray-700"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 mt-6"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Đang tạo tài khoản...</span>
                        </div>
                      ) : (
                        <span>Tạo tài khoản</span>
                      )}
                    </Button>
                  </form>

                  <div className="mt-8 text-center">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-200"></div>
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-4 bg-white text-gray-500">
                          hoặc
                        </span>
                      </div>
                    </div>

                    <p className="mt-6 text-gray-600">
                      Đã có tài khoản?{" "}
                      <Link href="/auth/login">
                        <span className="text-blue-600 hover:text-blue-700 font-semibold cursor-pointer transition-colors">
                          Đăng nhập ngay
                        </span>
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
