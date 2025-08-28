"use client";

import { useState, useEffect } from "react";
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
import { Mail, ArrowLeft, Send, CheckCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      const response = await authService.forgotPassword({ email });

      if (response.success) {
        setMessage(response.message);
        setIsSubmitted(true);
      } else {
        setError(response.message || "Không thể gửi email đặt lại mật khẩu");
      }
    } catch (error: any) {
      setError(error.message || "Có lỗi xảy ra khi gửi email đặt lại mật khẩu");
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Decorative Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-600 via-red-600 to-pink-700 relative overflow-hidden">
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
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-pink-300/20 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute top-1/2 left-16 w-16 h-16 bg-red-300/20 rounded-full blur-xl animate-ping"></div>

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
            Quên mật khẩu?
            <br />
            Đừng lo! 🔐
          </h1>

          <p className="text-xl text-orange-100 mb-8 leading-relaxed max-w-md">
            Chúng tôi sẽ gửi link đặt lại mật khẩu đến email của bạn một cách
            nhanh chóng và an toàn
          </p>

          <div className="space-y-4">
            <div className="flex items-center text-orange-100">
              <CheckCircle className="w-5 h-5 mr-3 text-yellow-300" />
              <span>Bảo mật cao với mã hóa end-to-end</span>
            </div>
            <div className="flex items-center text-orange-100">
              <CheckCircle className="w-5 h-5 mr-3 text-yellow-300" />
              <span>Link chỉ có hiệu lực trong 15 phút</span>
            </div>
            <div className="flex items-center text-orange-100">
              <CheckCircle className="w-5 h-5 mr-3 text-yellow-300" />
              <span>Hỗ trợ 24/7 nếu cần thiết</span>
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
            className="inline-flex items-center text-gray-600 hover:text-orange-600 mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Quay lại đăng nhập
          </Link>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
            <CardHeader className="space-y-1 pb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-600 to-red-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Mail className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center text-gray-900">
                {isSubmitted ? "Kiểm tra email" : "Quên mật khẩu"}
              </CardTitle>
              <CardDescription className="text-center text-gray-600">
                {isSubmitted
                  ? "Chúng tôi đã gửi link đặt lại mật khẩu"
                  : "Nhập email để nhận link đặt lại mật khẩu"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-gray-700 font-medium"
                    >
                      Địa chỉ email
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Nhập địa chỉ email của bạn"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={isLoading}
                        className="pl-10 h-12 border-gray-200 focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="text-red-600 text-sm bg-red-50 border border-red-200 p-3 rounded-lg">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-medium"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Đang gửi...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Send className="w-4 h-4 mr-2" />
                        Gửi link đặt lại
                      </div>
                    )}
                  </Button>
                </form>
              ) : (
                <div className="space-y-6">
                  <div className="text-green-700 bg-green-50 border border-green-200 p-4 rounded-lg text-center">
                    <CheckCircle className="w-6 h-6 mx-auto mb-2 text-green-600" />
                    <p className="font-medium">Email đã được gửi!</p>
                    <p className="text-sm mt-1">{message}</p>
                  </div>

                  <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                    <p className="mb-2">
                      Kiểm tra email của bạn để tìm link đặt lại mật khẩu.
                    </p>
                    <p>
                      Nếu không thấy email, hãy kiểm tra thư mục spam hoặc thư
                      rác.
                    </p>
                  </div>

                  <Button
                    onClick={() => {
                      setIsSubmitted(false);
                      setEmail("");
                      setMessage("");
                      setError("");
                    }}
                    variant="outline"
                    className="w-full h-12 border-orange-200 text-orange-600 hover:bg-orange-50"
                  >
                    Gửi lại email khác
                  </Button>
                </div>
              )}

              <div className="text-center pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-600 mb-4">
                  Nhớ ra mật khẩu rồi?
                </p>
                <Link
                  href="/login"
                  className="text-orange-600 hover:text-orange-700 font-medium hover:underline"
                >
                  Đăng nhập ngay
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
