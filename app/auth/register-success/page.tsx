"use client";

import { Suspense, useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Clock, RefreshCw } from "lucide-react";
import { authService } from "@/lib/auth-service";

export default function RegisterSuccessPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterSuccessPageContent />
    </Suspense>
  );
}

function RegisterSuccessPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(decodeURIComponent(emailParam));
    }
  }, [searchParams]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResendEmail = async () => {
    if (!email) return;

    try {
      // Dùng auth service thay vì gọi trực tiếp API
      await authService.resendVerificationEmail(email);
      setCountdown(60);
      setCanResend(false);
    } catch (error: any) {
      console.error("Error resending email:", error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Mail className="h-8 w-8 text-blue-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">
            Kiểm tra email của bạn
          </CardTitle>
          <CardDescription>
            Chúng tôi đã gửi link xác thực đến email của bạn
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-3">
            <p className="text-gray-600">
              Chúng tôi đã gửi email xác thực đến:
            </p>
            <p className="font-semibold text-gray-900 bg-gray-50 p-3 rounded-md">
              {email || "email của bạn"}
            </p>
            <p className="text-sm text-gray-500">
              Vui lòng kiểm tra hộp thư và click vào link để kích hoạt tài
              khoản.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="text-sm">
                <p className="text-blue-800 font-medium">
                  Không nhận được email?
                </p>
                <ul className="mt-2 text-blue-700 space-y-1">
                  <li>• Kiểm tra thư mục spam/junk</li>
                  <li>• Đảm bảo email đã nhập đúng</li>
                  <li>• Đợi vài phút để email đến</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              onClick={handleResendEmail}
              disabled={!canResend}
              variant={canResend ? "default" : "secondary"}
              className="w-full"
            >
              {canResend ? (
                <div className="flex items-center space-x-2">
                  <RefreshCw className="h-4 w-4" />
                  <span>Gửi lại email</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4" />
                  <span>Gửi lại sau {countdown}s</span>
                </div>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={() => router.push("/auth/login")}
              className="w-full"
            >
              Quay lại đăng nhập
            </Button>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Cần hỗ trợ?{" "}
              <a
                href="mailto:support@thinplan.com"
                className="text-blue-600 hover:text-blue-500"
              >
                Liên hệ với chúng tôi
              </a>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
