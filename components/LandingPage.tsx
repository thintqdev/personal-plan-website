"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Target, 
  Calendar, 
  Wallet, 
  BookOpen, 
  Shield, 
  Zap,
  ArrowRight,
  TrendingUp,
  Users,
  CheckCircle,
  Star,
  Heart,
  Lightbulb
} from "lucide-react";
import Link from "next/link";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Target className="h-10 w-10 text-blue-600" />
            <span className="text-3xl font-bold text-gray-900">
              ThinPlan
            </span>
          </div>
          <div className="space-x-4">
            <Link href="/auth/login">
              <Button variant="ghost" className="text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                Đăng nhập
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Đăng ký miễn phí
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 px-4 py-2 rounded-full mb-8">
            <CheckCircle className="h-4 w-4 text-blue-600" />
            <span className="text-blue-700 text-sm font-medium">
              Miễn phí 100% - Không giới hạn tính năng
            </span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Quản lý cuộc sống
            <br />
            <span className="text-blue-600">thông minh</span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            ThinPlan giúp bạn lập kế hoạch, theo dõi mục tiêu và quản lý tài chính một cách hiệu quả. 
            Bắt đầu hành trình thay đổi cuộc sống của bạn ngay hôm nay.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/register">
              <Button size="lg" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-lg shadow-lg hover:shadow-xl transition-all duration-200">
                Bắt đầu miễn phí
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Button variant="outline" size="lg" className="px-8 py-4 border-gray-300 text-gray-700 hover:bg-gray-50 text-lg">
              Xem demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Mọi thứ bạn cần để thành công
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Từ lập kế hoạch hàng ngày đến quản lý mục tiêu dài hạn, ThinPlan là công cụ toàn diện cho cuộc sống hiện đại.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-200 hover:scale-105">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-blue-100 rounded-full w-fit">
                  <Calendar className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Lập kế hoạch</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">
                  Tổ chức công việc và cuộc sống với các công cụ lập kế hoạch thông minh
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-200 hover:scale-105">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-green-100 rounded-full w-fit">
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Theo dõi mục tiêu</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">
                  Đặt và theo dõi tiến độ của các mục tiêu cá nhân và nghề nghiệp
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-200 hover:scale-105">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-purple-100 rounded-full w-fit">
                  <Wallet className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Quản lý tài chính</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">
                  Theo dõi thu chi, lập ngân sách và xây dựng thói quen tiết kiệm
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-200 hover:scale-105">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-orange-100 rounded-full w-fit">
                  <BookOpen className="h-8 w-8 text-orange-600" />
                </div>
                <CardTitle className="text-xl text-gray-900">Ghi chú & Ý tưởng</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-center">
                  Lưu trữ ý tưởng, ghi chú quan trọng và kế hoạch tương lai
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Tại sao chọn <span className="text-blue-600">ThinPlan?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Bảo mật tuyệt đối</h3>
                  <p className="text-gray-600">Dữ liệu của bạn được mã hóa và bảo vệ với tiêu chuẩn ngân hàng</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Đồng bộ mọi thiết bị</h3>
                  <p className="text-gray-600">Truy cập kế hoạch của bạn mọi lúc, mọi nơi trên điện thoại, máy tính</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Cộng đồng hỗ trợ</h3>
                  <p className="text-gray-600">Tham gia cộng đồng người dùng tích cực và nhận hỗ trợ 24/7</p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-6 p-4 bg-blue-100 rounded-full w-fit">
                <Heart className="h-16 w-16 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Được tin tưởng bởi hàng nghìn người
              </h3>
              <p className="text-gray-600 mb-8">
                Hơn 10,000+ người đã thay đổi cuộc sống với ThinPlan
              </p>
              <div className="flex justify-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-500 text-sm">4.9/5 từ 2,500+ đánh giá</p>
            </div>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Lightbulb className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Gợi ý thông minh</h3>
                  <p className="text-gray-600">AI tích hợp giúp đưa ra gợi ý tối ưu cho kế hoạch của bạn</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Theo dõi tiến độ</h3>
                  <p className="text-gray-600">Xem báo cáo chi tiết về tiến độ và thành tựu của bạn</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Hoàn toàn miễn phí</h3>
                  <p className="text-gray-600">Tất cả tính năng cơ bản miễn phí, không có phí ẩn nào</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Sẵn sàng thay đổi cuộc sống?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Hàng nghìn người đã bắt đầu hành trình thay đổi với ThinPlan. 
            Bạn sẽ là người tiếp theo?
          </p>
          <Link href="/auth/register">
            <Button size="lg" className="px-12 py-4 bg-white text-blue-600 hover:bg-gray-100 font-semibold text-xl rounded-lg shadow-xl hover:shadow-2xl transition-all duration-200">
              Bắt đầu miễn phí ngay
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <Target className="h-6 w-6 text-blue-400" />
            <span className="text-2xl font-bold">ThinPlan</span>
          </div>
          <p className="text-gray-400 mb-6">
            Quản lý cuộc sống thông minh, kiến tạo tương lai rực rỡ
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-400">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Chính sách bảo mật
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Điều khoản sử dụng
            </Link>
            <Link href="/contact" className="hover:text-white transition-colors">
              Liên hệ
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
