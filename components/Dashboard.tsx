"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Calendar,
  Target,
  Wallet,
  BookOpen,
  Plus,
  TrendingUp,
  CheckCircle,
  Clock,
  LogOut,
  Bell,
  Search,
  BarChart3,
  User,
  Heart
} from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export function Dashboard() {
  const { user, logout } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const greeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Chào buổi sáng";
    if (hour < 18) return "Chào buổi chiều";
    return "Chào buổi tối";
  };

  const getMotivationalMessage = () => {
    const messages = [
      "Hãy bắt đầu một ngày tuyệt vời! 🌟",
      "Mỗi bước nhỏ đều dẫn đến thành công lớn! 🚀",
      "Hôm nay là ngày hoàn hảo để đạt được mục tiêu! 🎯",
      "Bạn có thể làm được điều này! 💪",
      "Hành trình ngàn dặm bắt đầu từ một bước chân! 👣"
    ];
    
    const today = new Date();
    const dayIndex = today.getDate() % messages.length;
    return messages[dayIndex];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <Target className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">
                ThinPlan
              </span>
            </div>
            
            <div className="flex items-center space-x-6">
              <Button variant="ghost" size="icon" className="relative text-gray-600 hover:text-gray-900">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full"></span>
              </Button>
              
              <Button variant="ghost" size="icon" className="text-gray-600 hover:text-gray-900">
                <Search className="h-5 w-5" />
              </Button>
              
              <div className="flex items-center space-x-3 border-l border-gray-200 pl-6">
                <Avatar className="h-10 w-10 ring-2 ring-gray-200">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-blue-600 text-white font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                
                <div className="hidden md:block">
                  <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                  <p className="text-xs text-gray-500">Người dùng</p>
                </div>
                
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={logout}
                  className="text-gray-500 hover:text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h1 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
                  {greeting()}, {user?.name}! 
                  <span className="ml-2 inline-block animate-bounce">👋</span>
                </h1>
                <p className="text-gray-600 text-lg mb-4">
                  {currentTime.toLocaleDateString('vi-VN', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                <div className="flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2 w-fit">
                  <Heart className="h-4 w-4 text-blue-600" />
                  <p className="text-sm font-medium text-blue-700">{getMotivationalMessage()}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {currentTime.toLocaleTimeString('vi-VN', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                  <div className="text-gray-500 text-sm">Hiện tại</div>
                </div>
                
                <Avatar className="h-20 w-20 ring-4 ring-gray-200">
                  <AvatarImage src={user?.avatar} />
                  <AvatarFallback className="bg-blue-600 text-white text-2xl font-bold">
                    {user?.name?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border border-gray-200 hover:shadow-md transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Nhiệm vụ hôm nay</CardTitle>
              <div className="p-2 bg-blue-100 rounded-full">
                <CheckCircle className="h-4 w-4 text-blue-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">0</div>
              <p className="text-xs text-gray-500 mt-1">
                Chưa có nhiệm vụ nào
              </p>
              <div className="mt-3 h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-blue-600 rounded-full" style={{ width: "0%" }}></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 hover:shadow-md transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Mục tiêu</CardTitle>
              <div className="p-2 bg-green-100 rounded-full">
                <Target className="h-4 w-4 text-green-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">0</div>
              <p className="text-xs text-gray-500 mt-1">
                Chưa có mục tiêu nào
              </p>
              <div className="mt-3 h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-green-600 rounded-full" style={{ width: "0%" }}></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 hover:shadow-md transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Tiết kiệm</CardTitle>
              <div className="p-2 bg-purple-100 rounded-full">
                <TrendingUp className="h-4 w-4 text-purple-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">0đ</div>
              <p className="text-xs text-gray-500 mt-1">
                Chưa có dữ liệu
              </p>
              <div className="mt-3 h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-purple-600 rounded-full" style={{ width: "0%" }}></div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 hover:shadow-md transition-all duration-200">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-700">Ghi chú</CardTitle>
              <div className="p-2 bg-orange-100 rounded-full">
                <BookOpen className="h-4 w-4 text-orange-600" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-900">0</div>
              <p className="text-xs text-gray-500 mt-1">
                Chưa có ghi chú nào
              </p>
              <div className="mt-3 h-2 bg-gray-200 rounded-full">
                <div className="h-2 bg-orange-600 rounded-full" style={{ width: "0%" }}></div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Thao tác nhanh
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link href="/weekly-plan">
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 bg-white hover:bg-blue-50">
                <CardHeader className="text-center pb-6">
                  <div className="mx-auto mb-4 p-4 bg-blue-100 rounded-full group-hover:bg-blue-200 transition-colors">
                    <Calendar className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg text-gray-900">Kế hoạch tuần</CardTitle>
                  <p className="text-gray-600 text-sm">
                    Lập kế hoạch chi tiết cho tuần
                  </p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/goals">
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 bg-white hover:bg-green-50">
                <CardHeader className="text-center pb-6">
                  <div className="mx-auto mb-4 p-4 bg-green-100 rounded-full group-hover:bg-green-200 transition-colors">
                    <Target className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-lg text-gray-900">Mục tiêu</CardTitle>
                  <p className="text-gray-600 text-sm">
                    Đặt và theo dõi mục tiêu
                  </p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/finance">
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 bg-white hover:bg-purple-50">
                <CardHeader className="text-center pb-6">
                  <div className="mx-auto mb-4 p-4 bg-purple-100 rounded-full group-hover:bg-purple-200 transition-colors">
                    <Wallet className="h-8 w-8 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg text-gray-900">Tài chính</CardTitle>
                  <p className="text-gray-600 text-sm">
                    Quản lý thu chi và tiết kiệm
                  </p>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/notes">
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border border-gray-200 bg-white hover:bg-orange-50">
                <CardHeader className="text-center pb-6">
                  <div className="mx-auto mb-4 p-4 bg-orange-100 rounded-full group-hover:bg-orange-200 transition-colors">
                    <BookOpen className="h-8 w-8 text-orange-600" />
                  </div>
                  <CardTitle className="text-lg text-gray-900">Ghi chú</CardTitle>
                  <p className="text-gray-600 text-sm">
                    Lưu trữ ý tưởng và kế hoạch
                  </p>
                </CardHeader>
              </Card>
            </Link>
          </div>
        </div>

        {/* Today's Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Today's Schedule */}
          <div className="lg:col-span-2">
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl text-gray-900">
                  <Clock className="h-6 w-6 text-blue-600" />
                  Lịch trình hôm nay
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <div className="mx-auto mb-6 p-6 bg-gray-100 rounded-full w-fit">
                    <Calendar className="h-16 w-16 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    Chưa có lịch trình nào
                  </h3>
                  <p className="text-gray-500 mb-6 max-w-sm mx-auto">
                    Hãy bắt đầu ngày mới bằng việc thêm những kế hoạch và mục tiêu cho hôm nay
                  </p>
                  <Link href="/weekly-plan">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm kế hoạch
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Stats & Analytics */}
          <div className="space-y-6">
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-gray-900">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  Thống kê tuần
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Nhiệm vụ hoàn thành</span>
                  <span className="font-semibold text-gray-900">0/0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Mục tiêu đạt được</span>
                  <span className="font-semibold text-gray-900">0/0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">Tỷ lệ hoàn thành</span>
                  <span className="font-semibold text-green-600">0%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div 
                    className="bg-green-600 h-3 rounded-full transition-all duration-500" 
                    style={{ width: "0%" }}
                  ></div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border border-blue-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-blue-900 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-blue-600" />
                  Động lực hôm nay
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-blue-800 font-medium leading-relaxed">
                  "Thành công không phải là điểm đến, mà là hành trình. Hãy tận hưởng từng bước đi!"
                </p>
                <div className="mt-4 text-center">
                  <span className="text-xs text-blue-600">💪 Bạn làm được điều này!</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
