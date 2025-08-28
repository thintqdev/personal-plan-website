"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Target,
  Calendar,
  Wallet,
  BookOpen,
  CheckCircle,
  Star,
  Users,
  TrendingUp,
  Shield,
  Zap,
  ArrowRight,
  Play,
  ChevronDown,
} from "lucide-react";

export default function LandingPage() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const features = [
    {
      icon: Target,
      title: "Quản lý Mục tiêu",
      description:
        "Thiết lập và theo dõi các mục tiêu cá nhân với hệ thống phân chia chi tiết và timeline rõ ràng.",
      color: "from-blue-500 to-indigo-600",
    },
    {
      icon: Calendar,
      title: "Lập kế hoạch Hàng ngày",
      description:
        "Tổ chức công việc theo từng ngày trong tuần với hệ thống nhắc nhở thông minh.",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: Wallet,
      title: "Quản lý Tài chính",
      description:
        "Hệ thống hũ chi tiêu thông minh giúp bạn kiểm soát ngân sách và tiết kiệm hiệu quả.",
      color: "from-purple-500 to-violet-600",
    },
    {
      icon: BookOpen,
      title: "Ghi chú & Tài liệu",
      description:
        "Lưu trữ và tổ chức ghi chú, ý tưởng, và tài liệu quan trọng một cách khoa học.",
      color: "from-orange-500 to-red-600",
    },
  ];

  const testimonials = [
    {
      name: "Nguyễn Văn A",
      role: "Lập trình viên",
      content:
        "ThinPlan đã giúp tôi tổ chức cuộc sống tốt hơn. Tôi đã đạt được mục tiêu JLPT N3 chỉ sau 6 tháng sử dụng!",
      avatar: "🧑‍💻",
    },
    {
      name: "Trần Thị B",
      role: "Marketing Manager",
      content:
        "Hệ thống quản lý tài chính của ThinPlan rất tuyệt vời. Tôi đã tiết kiệm được 30% thu nhập hàng tháng.",
      avatar: "👩‍💼",
    },
    {
      name: "Lê Văn C",
      role: "Sinh viên",
      content:
        "Giao diện đẹp, dễ sử dụng và rất hiệu quả. ThinPlan là người bạn đồng hành lý tưởng trong việc học tập.",
      avatar: "🎓",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrollY > 50
            ? "bg-white/95 backdrop-blur-sm shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">TP</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                ThinPlan
              </span>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Tính năng
              </a>
              <a
                href="#testimonials"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Đánh giá
              </a>
              <a
                href="#pricing"
                className="text-gray-600 hover:text-blue-600 transition-colors"
              >
                Giá cả
              </a>
            </nav>

            <div className="flex items-center space-x-4">
              <Link href="/login">
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                >
                  Đăng nhập
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white">
                  Bắt đầu ngay
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Quản lý cuộc sống{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                thông minh
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
              ThinPlan giúp bạn tổ chức mục tiêu, quản lý thời gian, kiểm soát
              tài chính và ghi chú mọi thứ quan trọng trong một ứng dụng duy
              nhất.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link href="/register">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg px-8 py-4 text-white"
                >
                  Dùng thử miễn phí
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-4 group"
              >
                <Play className="mr-2 w-5 h-5 group-hover:text-blue-600" />
                Xem demo
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">
                  1000+
                </div>
                <div className="text-gray-600">Người dùng hài lòng</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  95%
                </div>
                <div className="text-gray-600">Đánh giá tích cực</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">
                  4.8★
                </div>
                <div className="text-gray-600">Điểm đánh giá trung bình</div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="text-center mt-16">
          <ChevronDown className="w-8 h-8 text-blue-600 mx-auto animate-bounce" />
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Tính năng nổi bật
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Khám phá những tính năng mạnh mẽ giúp bạn quản lý cuộc sống hiệu
              quả hơn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-none bg-gradient-to-br from-white to-gray-50"
                >
                  <CardContent className="p-8 text-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Feature highlight */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl md:text-4xl font-bold mb-6">
                  Hệ thống thông minh với AI
                </h3>
                <p className="text-lg mb-6 opacity-90">
                  ThinPlan sử dụng AI để phân tích thói quen của bạn và đưa ra
                  những gợi ý thông minh giúp bạn đạt được mục tiêu nhanh hơn.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center">
                    <CheckCircle className="w-6 h-6 mr-3 text-green-300" />
                    Gợi ý lịch trình tối ưu
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-6 h-6 mr-3 text-green-300" />
                    Phân tích chi tiêu thông minh
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-6 h-6 mr-3 text-green-300" />
                    Nhắc nhở tự động
                  </li>
                </ul>
              </div>
              <div className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                  <Zap className="w-20 h-20 text-yellow-300 mx-auto mb-4" />
                  <div className="text-2xl font-bold mb-2">
                    Trí tuệ nhân tạo
                  </div>
                  <div className="opacity-90">Tích hợp AI để hỗ trợ tối đa</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Người dùng nói gì về chúng tôi
            </h2>
            <p className="text-xl text-gray-600">
              Hàng nghìn người đã tin tựa ThinPlan để quản lý cuộc sống
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="bg-white border-none shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="text-4xl mr-4">{testimonial.avatar}</div>
                    <div>
                      <div className="font-bold text-gray-900">
                        {testimonial.name}
                      </div>
                      <div className="text-gray-600">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-gray-700 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 text-yellow-400 fill-current"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Sẵn sàng thay đổi cuộc sống?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Tham gia cùng hàng nghìn người đã chọn ThinPlan để quản lý cuộc sống
            thông minh hơn
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-4"
              >
                Bắt đầu miễn phí ngay
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link href="/login">
              <Button
                variant="outline"
                size="lg"
                className="border-white text-purple hover:bg-white/10 text-lg px-8 py-4"
              >
                Đã có tài khoản? Đăng nhập
              </Button>
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center space-x-8 text-blue-100">
            <div className="flex items-center">
              <Shield className="w-6 h-6 mr-2" />
              <span>Bảo mật tuyệt đối</span>
            </div>
            <div className="flex items-center">
              <Users className="w-6 h-6 mr-2" />
              <span>Cộng đồng 1000+</span>
            </div>
            <div className="flex items-center">
              <TrendingUp className="w-6 h-6 mr-2" />
              <span>Hiệu quả đã chứng minh</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">TP</span>
                </div>
                <span className="text-2xl font-bold">ThinPlan</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Ứng dụng quản lý cuộc sống thông minh, giúp bạn đạt được mục
                tiêu và sống tốt hơn mỗi ngày.
              </p>
            </div>

            <div>
              <h4 className="font-bold mb-4">Sản phẩm</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Quản lý mục tiêu
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Lập kế hoạch
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Quản lý tài chính
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Ghi chú
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Hỗ trợ</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Trung tâm trợ giúp
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Liên hệ
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Báo lỗi
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Cộng đồng
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-4">Pháp lý</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Điều khoản sử dụng
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Chính sách bảo mật
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Cookie
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ThinPlan. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
