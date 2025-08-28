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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Settings className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              ThinPlan Admin Dashboard
            </h1>
          </div>
          <p className="text-gray-600">Tổng quan và quản lý toàn bộ hệ thống</p>
          <Link href="/" className="inline-block mt-4">
            <Button
              variant="outline"
              className="text-blue-600 border-blue-300 hover:bg-blue-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại trang chính
            </Button>
          </Link>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">Tổng số mục tiêu</p>
                  <p className="text-3xl font-bold">{stats.totalGoals}</p>
                </div>
                <Target className="w-8 h-8 text-blue-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm">Tổng số tasks</p>
                  <p className="text-3xl font-bold">{stats.totalTasks}</p>
                </div>
                <Calendar className="w-8 h-8 text-green-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm">Tổng số quotes</p>
                  <p className="text-3xl font-bold">{stats.totalQuotes}</p>
                </div>
                <Quote className="w-8 h-8 text-purple-200" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-100 text-sm">Tasks hoàn thành</p>
                  <p className="text-3xl font-bold">{stats.completedTasks}</p>
                </div>
                <BarChart3 className="w-8 h-8 text-orange-200" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <Link href="/admin/goals">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-white/80 backdrop-blur-sm border-blue-200 hover:border-blue-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-blue-900 mb-2">
                  Quản lý mục tiêu
                </h3>
                <p className="text-sm text-blue-700">
                  Tạo và theo dõi mục tiêu cá nhân
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/finance">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-white/80 backdrop-blur-sm border-emerald-200 hover:border-emerald-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-emerald-900 mb-2">
                  Quản lý tài chính
                </h3>
                <p className="text-sm text-emerald-700">
                  Hệ thống hũ chi tiêu thông minh
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/profile">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-white/80 backdrop-blur-sm border-green-200 hover:border-green-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <User className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-green-900 mb-2">
                  Thông tin cá nhân
                </h3>
                <p className="text-sm text-green-700">
                  Cập nhật profile và avatar
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/quotes">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-white/80 backdrop-blur-sm border-purple-200 hover:border-purple-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Quote className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-purple-900 mb-2">
                  Quote động lực
                </h3>
                <p className="text-sm text-purple-700">Quản lý câu trích dẫn</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/admin/tasks">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer bg-white/80 backdrop-blur-sm border-orange-200 hover:border-orange-300">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-orange-900 mb-2">
                  Quản lý tasks
                </h3>
                <p className="text-sm text-orange-700">
                  Thêm và chỉnh sửa kế hoạch
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* User Info Quick View */}
        {user && (
          <Card className="bg-white/80 backdrop-blur-sm border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-800">
                <User className="w-5 h-5" />
                Thông tin nhanh
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-sm">Tên</p>
                  <p className="font-semibold text-gray-900">{user.name}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-sm">Vai trò</p>
                  <p className="font-semibold text-gray-900">{user.role}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-sm">Mục tiêu</p>
                  <p className="font-semibold text-gray-900">{user.goal}</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <p className="text-gray-600 text-sm">Streak</p>
                  <p className="font-semibold text-gray-900">
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
