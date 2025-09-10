"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  User,
  Calendar,
  Quote,
  Target,
  BarChart3,
  Settings,
  Wallet,
  BookOpen,
  HelpCircle,
  FileText,
  Shield,
} from "lucide-react";
import Link from "next/link";
import { getUser, getQuotes, type User as UserType } from "@/lib/user-service";
import { getTasks, type Task as TaskType } from "@/lib/task-service";
import { getGoals } from "@/lib/goal-service";

export default function AdminDashboardPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [stats, setStats] = useState({
    totalQuotes: 0,
    totalTasks: 0,
    totalGoals: 0,
    completedTasks: 0,
  });
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load dashboard data
  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        setIsLoading(true);

        const [userData, quotesData, tasksData, goalsData] = await Promise.all([
          getUser().catch(() => null),
          getQuotes().catch(() => []),
          getTasks().catch(() => []),
          getGoals().catch(() => []),
        ]);

        setUser(userData);

        const completedTasksCount = Array.isArray(tasksData)
          ? tasksData.filter((task: TaskType) => task.completed).length
          : 0;

        setStats({
          totalQuotes: Array.isArray(quotesData) ? quotesData.length : 0,
          totalTasks: Array.isArray(tasksData) ? tasksData.length : 0,
          totalGoals: Array.isArray(goalsData) ? goalsData.length : 0,
          completedTasks: completedTasksCount,
        });
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isMounted) {
      loadDashboardData();
    }
  }, [isMounted]);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="mb-8">
          <Link href="/" className="inline-block mb-6">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Trang chủ
            </Button>
          </Link>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  ThinPlan Admin Dashboard
                </h1>
                <p className="text-gray-600 mt-1">
                  Tổng quan và quản lý toàn bộ hệ thống
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Overview */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 h-1"></div>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <Target className="w-7 h-7 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Tổng mục tiêu
                    </p>
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  {stats.totalGoals}
                </p>
                <p className="text-sm text-blue-600 font-medium">
                  Đang theo dõi
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-1"></div>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center">
                    <Calendar className="w-7 h-7 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Tổng nhiệm vụ
                    </p>
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  {stats.totalTasks}
                </p>
                <p className="text-sm text-green-600 font-medium">
                  {stats.completedTasks} hoàn thành
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-violet-600 h-1"></div>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center">
                    <Quote className="w-7 h-7 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Quotes động lực
                    </p>
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  {stats.totalQuotes}
                </p>
                <p className="text-sm text-purple-600 font-medium">
                  Cảm hứng mỗi ngày
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-amber-600 h-1"></div>
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center">
                    <BarChart3 className="w-7 h-7 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Tỷ lệ hoàn thành
                    </p>
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900 mb-2">
                  {stats.totalTasks > 0
                    ? Math.round(
                        (stats.completedTasks / stats.totalTasks) * 100
                      )
                    : 0}
                  %
                </p>
                <p className="text-sm text-orange-600 font-medium">
                  Hiệu suất làm việc
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <Card className="mb-8 bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
          <CardHeader className="bg-indigo-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Truy cập nhanh
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              <Link href="/admin/goals">
                <Card className="bg-white hover:bg-gray-50 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-200 cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-3 transition-colors duration-200">
                      <Target className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors duration-200" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      Quản lý mục tiêu
                    </h3>
                    <p className="text-sm text-gray-600">
                      Tạo và theo dõi mục tiêu cá nhân
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/admin/finance">
                <Card className="bg-white hover:bg-gray-50 border border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-200 cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-emerald-100 group-hover:bg-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 transition-colors duration-200">
                      <Wallet className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors duration-200" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors">
                      Quản lý tài chính
                    </h3>
                    <p className="text-sm text-gray-600">
                      Hệ thống hũ chi tiêu thông minh
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/admin/profile">
                <Card className="bg-white hover:bg-gray-50 border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all duration-200 cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-green-100 group-hover:bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-3 transition-colors duration-200">
                      <User className="w-6 h-6 text-green-600 group-hover:text-white transition-colors duration-200" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      Thông tin cá nhân
                    </h3>
                    <p className="text-sm text-gray-600">
                      Cập nhật profile và avatar
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/admin/quotes">
                <Card className="bg-white hover:bg-gray-50 border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-200 cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-purple-100 group-hover:bg-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-3 transition-colors duration-200">
                      <Quote className="w-6 h-6 text-purple-600 group-hover:text-white transition-colors duration-200" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                      Quote động lực
                    </h3>
                    <p className="text-sm text-gray-600">
                      Quản lý câu trích dẫn
                    </p>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/admin/tasks">
                <Card className="bg-white hover:bg-gray-50 border border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all duration-200 cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-orange-100 group-hover:bg-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-3 transition-colors duration-200">
                      <Calendar className="w-6 h-6 text-orange-600 group-hover:text-white transition-colors duration-200" />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                      Quản lý tasks
                    </h3>
                    <p className="text-sm text-gray-600">
                      Thêm và chỉnh sửa kế hoạch
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* User Info Quick View */}
        {user && (
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
            <CardHeader className="bg-indigo-600 text-white">
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Thông tin nhanh
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-gray-600 text-sm font-medium mb-2">Tên</p>
                  <p className="font-bold text-gray-900 text-lg">{user.name}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-gray-600 text-sm font-medium mb-2">
                    Vai trò
                  </p>
                  <p className="font-bold text-gray-900 text-lg">{user.role}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-gray-600 text-sm font-medium mb-2">
                    Mục tiêu
                  </p>
                  <p className="font-bold text-gray-900 text-lg">{user.goal}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl border border-gray-200">
                  <p className="text-gray-600 text-sm font-medium mb-2">
                    Streak
                  </p>
                  <p className="font-bold text-gray-900 text-lg">
                    {user.streak} ngày
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
