"use client";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  Users,
  BookOpen,
  Target,
  TrendingUp,
  Activity,
  FileText,
  Settings,
  Plus,
  ArrowRight,
  Globe,
  Cpu,
  Lightbulb,
} from "lucide-react";

export default function StudyAdminDashboardPage() {
  // Mock data - trong thực tế sẽ fetch từ API
  const stats = {
    totalUsers: 156,
    activeUsers: 89,
    totalLessons: 24,
    totalQuestions: 342,
    completionRate: 75,
    averageScore: 82,
  };

  const recentActivities = [
    { action: "Tạo bài học JLPT N4", time: "2 phút trước", type: "content" },
    {
      action: "Học viên Nguyễn Văn A hoàn thành bài học",
      time: "5 phút trước",
      type: "user",
    },
    {
      action: "Cập nhật cài đặt email",
      time: "10 phút trước",
      type: "settings",
    },
    { action: "Thêm 15 câu hỏi mới", time: "15 phút trước", type: "content" },
  ];

  return (
    <div className="p-8 space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center">
          <BarChart3 className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Study Admin Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Tổng quan hệ thống học tập - Ngoại ngữ, Kỹ thuật & Kĩ năng
          </p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng học viên</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.totalUsers}
                </p>
                <p className="text-xs text-green-600 mt-1 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +12% so với tháng trước
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Bài học đã tạo</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.totalLessons}
                </p>
                <p className="text-xs text-blue-600 mt-1">
                  {stats.totalQuestions} câu hỏi
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tỷ lệ hoàn thành</p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.completionRate}%
                </p>
                <p className="text-xs text-purple-600 mt-1">
                  Điểm trung bình: {stats.averageScore}%
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Link href="/study/admin/language">
          <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-all duration-200 cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Ngoại ngữ</h3>
              <p className="text-sm text-gray-600">
                Quản lý khóa học ngoại ngữ
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/study/admin/tech">
          <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-all duration-200 cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-white" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Kỹ thuật</h3>
              <p className="text-sm text-gray-600">Quản lý khóa học kỹ thuật</p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/study/admin/skills">
          <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-all duration-200 cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Kĩ năng</h3>
              <p className="text-sm text-gray-600">
                Quản lý phát triển kỹ năng
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/study/admin/users">
          <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl hover:shadow-2xl transition-all duration-200 cursor-pointer group">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-indigo-600 transition-colors" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Quản lý học viên
              </h3>
              <p className="text-sm text-gray-600">Xem và quản lý người dùng</p>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Recent Activities */}
      <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-xl">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Activity className="w-5 h-5 text-white" />
            </div>
            Hoạt động gần đây
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 border-2 border-indigo-100 rounded-xl bg-gradient-to-r from-indigo-50/30 to-purple-50/30"
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      activity.type === "content"
                        ? "bg-blue-500"
                        : activity.type === "user"
                        ? "bg-green-500"
                        : activity.type === "settings"
                        ? "bg-purple-500"
                        : "bg-gray-500"
                    }`}
                  ></div>
                  <span className="text-gray-900">{activity.action}</span>
                </div>
                <span className="text-sm text-gray-600">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Create */}
      <Card className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white border-white/20 shadow-xl">
        <CardContent className="p-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-2">Tạo nội dung mới</h3>
              <p className="text-indigo-100">
                Bắt đầu tạo khóa học cho Ngoại ngữ, Kỹ thuật hoặc Kĩ năng
              </p>
            </div>
            <Link href="/study/admin/language">
              <Button className="bg-white text-indigo-600 hover:bg-indigo-50">
                <Plus className="w-5 h-5 mr-2" />
                Tạo ngay
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
