"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { authService } from "@/lib/auth-service";

export default function VerifyEmailPage() {
  const router = useRouter();
  const params = useParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const token = params.token as string;

        if (!token) {
          setStatus("error");
          setMessage("Token xác thực không hợp lệ");
          return;
        }

        const data = await authService.verifyEmail(token);
        setStatus("success");
        setMessage(data.message || "Email đã được xác thực thành công!");
      } catch (error: any) {
        setStatus("error");
        setMessage(error.message || "Có lỗi xảy ra khi xác thực email");
      }
    };

    verifyEmail();
  }, [params.token]);

  const handleGoToLogin = () => {
    router.push("/auth/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-gray-900">
            Xác thực Email
          </CardTitle>
          <CardDescription>Đang xác thực tài khoản của bạn...</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            {status === "loading" && (
              <div className="flex flex-col items-center space-y-3">
                <Loader2 className="h-16 w-16 text-blue-600 animate-spin" />
                <p className="text-gray-600">Đang xác thực email...</p>
              </div>
            )}

            {status === "success" && (
              <div className="flex flex-col items-center space-y-3">
                <CheckCircle className="h-16 w-16 text-green-600" />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-green-600">
                    Xác thực thành công!
                  </h3>
                  <p className="text-gray-600">{message}</p>
                  <p className="text-sm text-gray-500">
                    Bạn có thể đăng nhập ngay bây giờ.
                  </p>
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="flex flex-col items-center space-y-3">
                <XCircle className="h-16 w-16 text-red-600" />
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-red-600">
                    Xác thực thất bại
                  </h3>
                  <p className="text-gray-600">{message}</p>
                  <p className="text-sm text-gray-500">
                    Vui lòng kiểm tra lại link hoặc liên hệ hỗ trợ.
                  </p>
                </div>
              </div>
            )}
          </div>

          {(status === "success" || status === "error") && (
            <div className="space-y-3">
              <Button
                onClick={handleGoToLogin}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Đến trang đăng nhập
              </Button>

              {status === "error" && (
                <Button
                  variant="outline"
                  onClick={() => router.push("/auth/register")}
                  className="w-full"
                >
                  Đăng ký lại
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
