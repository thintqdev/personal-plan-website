"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { authService } from "@/lib/auth-service";
import {
  Mail,
  ArrowLeft,
  CheckCircle,
  RefreshCw,
  Sparkles,
} from "lucide-react";

export default function VerifyEmailPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [email, setEmail] = useState("");
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setMounted(true);
    const token = searchParams.get("token");
    const emailParam = searchParams.get("email");

    if (emailParam) {
      setEmail(emailParam);
    }

    if (token) {
      // Auto-verify if token is present in URL
      handleVerification(token);
    }
  }, [searchParams]);

  const handleVerification = async (token: string) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await authService.verifyEmail(token);

      if (response.success) {
        setIsVerified(true);
        setMessage(
          "Email đã được xác thực thành công! Bây giờ bạn có thể truy cập tất cả tính năng."
        );
      } else {
        setError(response.message || "Xác thực email thất bại");
      }
    } catch (error: any) {
      setError(error.message || "Có lỗi xảy ra trong quá trình xác thực email");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendVerification = async () => {
    if (!email) {
      setError("Địa chỉ email là bắt buộc để gửi lại xác thực");
      return;
    }

    setIsResending(true);
    setError("");
    setMessage("");

    try {
      const response = await authService.resendVerification({ email });

      if (response.success) {
        setMessage(
          "Email xác thực đã được gửi! Vui lòng kiểm tra hộp thư đến của bạn."
        );
      } else {
        setError(response.message || "Không thể gửi lại email xác thực");
      }
    } catch (error: any) {
      setError(error.message || "Có lỗi xảy ra khi gửi lại email xác thực");
    } finally {
      setIsResending(false);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Email Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-600 via-pink-600 to-rose-700 relative overflow-hidden">
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
        <div className="absolute top-1/2 left-16 w-16 h-16 bg-rose-300/20 rounded-full blur-xl animate-ping"></div>

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
            {isVerified ? (
              <>
                Xác thực
                <br />
                thành công! 🎉
              </>
            ) : (
              <>
                Xác thực
                <br />
                email của bạn 📬
              </>
            )}
          </h1>

          <p className="text-xl text-purple-100 mb-8 leading-relaxed max-w-md">
            {isVerified
              ? "Chúc mừng! Tài khoản của bạn đã được kích hoạt hoàn toàn và sẵn sàng sử dụng"
              : "Chúng tôi đã gửi email xác thực đến địa chỉ của bạn. Hãy kiểm tra và nhấp vào link"}
          </p>

          <div className="space-y-4">
            <div className="flex items-center text-purple-100">
              <Sparkles className="w-5 h-5 mr-3 text-yellow-300" />
              <span>Bảo mật cao với mã xác thực</span>
            </div>
            <div className="flex items-center text-purple-100">
              <Sparkles className="w-5 h-5 mr-3 text-yellow-300" />
              <span>Link chỉ có hiệu lực trong 24 giờ</span>
            </div>
            <div className="flex items-center text-purple-100">
              <Sparkles className="w-5 h-5 mr-3 text-yellow-300" />
              <span>Kích hoạt tất cả tính năng ngay</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Content */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Back to Login */}
          <Link
            href="/login"
            className="inline-flex items-center text-gray-600 hover:text-purple-600 mb-8 transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Quay lại đăng nhập
          </Link>

          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
            <CardHeader className="space-y-1 pb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                  {isVerified ? (
                    <CheckCircle className="w-8 h-8 text-white" />
                  ) : (
                    <Mail className="w-8 h-8 text-white" />
                  )}
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center text-gray-900">
                {isVerified ? "Email đã xác thực!" : "Xác thực email"}
              </CardTitle>
              <CardDescription className="text-center text-gray-600">
                {isVerified
                  ? "Tài khoản của bạn đã sẵn sàng sử dụng"
                  : "Kiểm tra email và nhấp vào link xác thực"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {isLoading && (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mb-4"></div>
                  <p className="text-gray-600 font-medium">
                    Đang xác thực email của bạn...
                  </p>
                </div>
              )}

              {isVerified && !isLoading && (
                <div className="text-center space-y-6">
                  <div className="text-green-700 bg-green-50 border border-green-200 p-4 rounded-lg">
                    <CheckCircle className="w-6 h-6 mx-auto mb-2 text-green-600" />
                    <p className="font-medium">Xác thực thành công!</p>
                    <p className="text-sm mt-1">{message}</p>
                  </div>
                  <Button
                    onClick={() => router.push("/admin")}
                    className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium"
                  >
                    Truy cập bảng điều khiển
                  </Button>
                </div>
              )}

              {!isVerified && !isLoading && (
                <div className="space-y-6">
                  {email && (
                    <div className="text-sm text-gray-700 bg-blue-50 border border-blue-200 p-4 rounded-lg">
                      <Mail className="w-5 h-5 inline mr-2 text-blue-600" />
                      Chúng tôi đã gửi email xác thực đến:{" "}
                      <strong className="text-blue-700">{email}</strong>
                    </div>
                  )}

                  <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg space-y-2">
                    <p className="font-medium mb-2">📌 Hướng dẫn xác thực:</p>
                    <ol className="list-decimal list-inside space-y-1 text-gray-600">
                      <li>Kiểm tra hộp thư đến trong email của bạn</li>
                      <li>Tìm email từ ThinPlan</li>
                      <li>Nhấp vào nút "Xác thực email"</li>
                      <li>Bạn sẽ được chuyển hướng tự động</li>
                    </ol>
                    <p className="text-xs text-gray-500 mt-3">
                      Nếu không thấy email, hãy kiểm tra thư mục spam hoặc thư
                      rác.
                    </p>
                  </div>

                  <Button
                    onClick={handleResendVerification}
                    variant="outline"
                    className="w-full h-12 border-purple-200 text-purple-600 hover:bg-purple-50"
                    disabled={isResending || !email}
                  >
                    {isResending ? (
                      <div className="flex items-center">
                        <div className="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin mr-2"></div>
                        Đang gửi...
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Gửi lại email xác thực
                      </div>
                    )}
                  </Button>
                </div>
              )}

              {message && !isVerified && (
                <div className="text-blue-700 bg-blue-50 border border-blue-200 p-3 rounded-lg text-center">
                  {message}
                </div>
              )}

              {error && (
                <div className="text-red-600 bg-red-50 border border-red-200 p-3 rounded-lg text-center">
                  {error}
                </div>
              )}

              <div className="text-center pt-4 border-t border-gray-100">
                <p className="text-sm text-gray-600 mb-2">Cần hỗ trợ?</p>
                <Link
                  href="/login"
                  className="text-purple-600 hover:text-purple-700 font-medium hover:underline"
                >
                  Liên hệ hỗ trợ
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
