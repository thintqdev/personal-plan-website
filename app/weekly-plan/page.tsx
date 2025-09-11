"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  ChevronLeft,
  ChevronRight,
  Check,
  Plus,
  Home,
  BarChart3,
  Target,
  TrendingUp,
} from "lucide-react";
import UserLayout from "@/components/layouts/UserLayout";
import AuthGuard from "@/components/AuthGuard";
import { useAuth } from "@/lib/auth-context";
import {
  getTasks,
  Task,
  toggleTaskCompletion as apiToggleTaskCompletion,
  getWeeklyStats,
  WeeklyStats,
} from "@/lib/task-service";

export default function WeeklyPlanPage() {
  const { user } = useAuth();
  const [isMounted, setIsMounted] = useState(false);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [completedTasks, setCompletedTasks] = useState<{
    [key: string]: boolean;
  }>({});
  const [weeklyTasks, setWeeklyTasks] = useState<Task[]>([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(false);
  const [weeklyStats, setWeeklyStats] = useState<WeeklyStats | null>(null);
  const [isLoadingStats, setIsLoadingStats] = useState(false);

  const getCurrentDayIndex = () => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
    return dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Convert to Monday=0, Sunday=6
  };

  const getDayNameFromIndex = (index: number) => {
    const dayNames = [
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
      "Thứ Sáu",
      "Thứ Bảy",
      "Chủ Nhật",
    ];
    return dayNames[index];
  };

  const getDayData = (dayOffset: number) => {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1); // Get Monday of current week

    const targetDate = new Date(monday);
    targetDate.setDate(monday.getDate() + dayOffset);

    const dayNames = [
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
      "Thứ Sáu",
      "Thứ Bảy",
      "Chủ Nhật",
    ];

    const dayName = dayNames[dayOffset];
    const dateString = targetDate.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return { dayName, dateString, date: targetDate };
  };

  // Fetch weekly tasks từ API
  const fetchWeeklyTasks = async () => {
    if (!user) return;

    setIsLoadingTasks(true);
    try {
      const tasks = await getTasks();
      setWeeklyTasks(tasks);
    } catch (error) {
      console.error("Error fetching weekly tasks:", error);
      setWeeklyTasks([]);
    } finally {
      setIsLoadingTasks(false);
    }
  };

  // Fetch weekly statistics
  const fetchWeeklyStats = async () => {
    if (!user) return;

    setIsLoadingStats(true);
    try {
      const stats = await getWeeklyStats();
      setWeeklyStats(stats);
    } catch (error) {
      console.error("Error fetching weekly stats:", error);
      setWeeklyStats(null);
    } finally {
      setIsLoadingStats(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    const currentIndex = getCurrentDayIndex();
    setCurrentDayIndex(currentIndex);

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Fetch weekly tasks và stats khi user đã có
  useEffect(() => {
    if (user) {
      fetchWeeklyTasks();
      fetchWeeklyStats();
    }
  }, [user]);

  const goToPreviousDay = () => {
    if (currentDayIndex > 0) {
      setCurrentDayIndex(currentDayIndex - 1);
    }
  };

  const goToNextDay = () => {
    if (currentDayIndex < 6) {
      setCurrentDayIndex(currentDayIndex + 1);
    }
  };

  const toggleTaskCompletion = async (taskId: string) => {
    const currentCompleted = completedTasks[taskId] || false;

    // Optimistic update
    setCompletedTasks((prev) => ({
      ...prev,
      [taskId]: !currentCompleted,
    }));

    try {
      await apiToggleTaskCompletion(taskId, !currentCompleted);
      // Refresh tasks để cập nhật UI
      await fetchWeeklyTasks();
      // Refresh stats để cập nhật thống kê
      await fetchWeeklyStats();
    } catch (error) {
      console.error("Error toggling task completion:", error);
      // Revert optimistic update
      setCompletedTasks((prev) => ({
        ...prev,
        [taskId]: currentCompleted,
      }));
    }
  };

  const getCurrentDayTasks = () => {
    if (!weeklyTasks.length) return [];

    const currentDayName = getDayNameFromIndex(currentDayIndex);

    return weeklyTasks.filter((task) => {
      return task.day === currentDayName;
    });
  };

  const currentDay = {
    day: getDayNameFromIndex(currentDayIndex),
    ...getDayData(currentDayIndex),
  };

  if (!isMounted) {
    return null;
  }

  return (
    <AuthGuard>
      <UserLayout
        title="Kế hoạch tuần"
        description="Quản lý và theo dõi nhiệm vụ hàng tuần"
        icon={<Calendar className="h-6 w-6" />}
      >
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header với thống kê tuần */}
            <div className="mb-8 grid grid-cols-1 xl:grid-cols-1 gap-8">
              <div className="xl:col-span-1">
                <Card className="bg-white/90 backdrop-blur-sm border-pink-200/50 shadow-lg pt-6">
                  <CardHeader className="pb-6">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-3 text-xl">
                        <div className="p-2 bg-pink-100 rounded-lg">
                          <Calendar className="h-6 w-6 text-pink-600" />
                        </div>
                        Kế hoạch tuần
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
                        <Clock className="h-4 w-4" />
                        {currentTime.toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>

                    {/* Navigation ngày */}
                    <div className="flex items-center justify-between mt-6 bg-gray-50 p-4 rounded-lg">
                      <Button
                        variant="default"
                        size="sm"
                        onClick={goToPreviousDay}
                        disabled={currentDayIndex === 0}
                        className="flex items-center gap-2 transition-colors"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Trước
                      </Button>

                      <div className="text-center">
                        <h3 className="text-2xl font-bold text-gray-800 mb-1">
                          {currentDay.dayName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {currentDay.dateString}
                        </p>
                      </div>

                      <Button
                        variant="default"
                        size="sm"
                        onClick={goToNextDay}
                        disabled={currentDayIndex === 6}
                        className="flex items-center gap-2  transition-colors"
                      >
                        Sau
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Day indicator */}
                    <div className="flex justify-center gap-3 mt-6">
                      {Array.from({ length: 7 }, (_, i) => (
                        <div
                          key={i}
                          className={`w-4 h-4 rounded-full transition-all duration-300 ${
                            i === currentDayIndex
                              ? "bg-gradient-to-r from-pink-500 to-purple-500 scale-125 shadow-lg"
                              : "bg-gray-200 hover:bg-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </CardHeader>

                  <CardContent className="px-6 pb-6">
                    {isLoadingTasks ? (
                      <div className="text-center py-12">
                        <div className="w-8 h-8 border-4 border-pink-200 border-t-pink-500 rounded-full animate-spin mx-auto mb-4"></div>
                        <div className="text-gray-500 font-medium">
                          Đang tải nhiệm vụ...
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {getCurrentDayTasks().length > 0 ? (
                          getCurrentDayTasks().map((task) => (
                            <div
                              key={task._id}
                              className={`
                                group flex items-start gap-4 p-5 rounded-xl border transition-all duration-300 hover:shadow-md
                                ${
                                  task.completed
                                    ? "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 opacity-90"
                                    : "bg-white border-gray-200 hover:border-pink-300 hover:bg-gradient-to-r hover:from-pink-50 hover:to-purple-50"
                                }
                              `}
                            >
                              <button
                                onClick={() => toggleTaskCompletion(task._id)}
                                className={`
                                  flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 group-hover:scale-110
                                  ${
                                    task.completed
                                      ? "bg-green-500 border-green-500 text-white shadow-lg"
                                      : "border-gray-300 hover:border-pink-500 group-hover:shadow-md"
                                  }
                                `}
                              >
                                {task.completed && (
                                  <Check className="h-3 w-3" />
                                )}
                              </button>

                              <div className="flex-1 min-w-0">
                                <h4
                                  className={`
                                    font-semibold mb-2 text-lg transition-all duration-300
                                    ${
                                      task.completed
                                        ? "line-through text-gray-500"
                                        : "text-gray-800 group-hover:text-pink-700"
                                    }
                                  `}
                                >
                                  {task.task}
                                </h4>
                                <div className="flex items-center gap-3">
                                  <Badge
                                    variant="secondary"
                                    className={`text-xs px-3 py-1 ${
                                      task.type === "Công việc"
                                        ? "bg-blue-100 text-blue-700"
                                        : task.type === "Học tập"
                                        ? "bg-purple-100 text-purple-700"
                                        : task.type === "Sức khỏe"
                                        ? "bg-green-100 text-green-700"
                                        : "bg-gray-100 text-gray-700"
                                    }`}
                                  >
                                    {task.type}
                                  </Badge>
                                  <span className="text-sm text-gray-500 flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {task.time}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-16">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                              <Calendar className="h-8 w-8 text-gray-400" />
                            </div>
                            <div className="text-gray-500 font-medium mb-2">
                              Chưa có nhiệm vụ nào cho {currentDay.dayName}
                            </div>
                            <p className="text-sm text-gray-400 mb-6">
                              Hãy thêm nhiệm vụ để bắt đầu kế hoạch của bạn
                            </p>
                            <Button
                              variant="outline"
                              className="flex items-center gap-2 border-pink-200 text-pink-600 hover:bg-pink-50"
                            >
                              <Plus className="h-4 w-4" />
                              Thêm nhiệm vụ
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="xl:col-span-1">
                <Card className="bg-white/90 backdrop-blur-sm border-pink-200/50 shadow-lg pt-6 h-fit">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-lg">
                      <div className="p-2 bg-pink-100 rounded-lg">
                        <BarChart3 className="h-5 w-5 text-pink-600" />
                      </div>
                      Thống kê tuần
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    {isLoadingStats ? (
                      <div className="text-center py-8">
                        <div className="text-gray-500 flex items-center justify-center gap-2">
                          <div className="w-4 h-4 border-2 border-pink-200 border-t-pink-500 rounded-full animate-spin"></div>
                          Đang tải...
                        </div>
                      </div>
                    ) : weeklyStats ? (
                      <div className="space-y-4">
                        <div className="bg-gradient-to-r from-pink-50 to-purple-50 p-4 rounded-lg border border-pink-100">
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-700">
                              Nhiệm vụ hoàn thành
                            </span>
                            <span className="text-lg font-bold text-pink-600">
                              {weeklyStats.completedTasks}/
                              {weeklyStats.totalTasks}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                              style={{
                                width: `${weeklyStats.completionRate}%`,
                              }}
                            ></div>
                          </div>
                          <div className="text-right mt-1">
                            <span className="text-xs text-gray-600">
                              {weeklyStats.completionRate}% hoàn thành
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 rounded-lg border border-blue-200">
                            <div className="text-xs text-blue-700 font-medium mb-1">
                              Streak hiện tại
                            </div>
                            <div className="text-lg font-bold text-blue-800">
                              {weeklyStats.currentStreak}
                            </div>
                            <div className="text-xs text-blue-600">ngày</div>
                          </div>

                          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 rounded-lg border border-purple-200">
                            <div className="text-xs text-purple-700 font-medium mb-1">
                              Streak tốt nhất
                            </div>
                            <div className="text-lg font-bold text-purple-800">
                              {weeklyStats.longestStreak}
                            </div>
                            <div className="text-xs text-purple-600">ngày</div>
                          </div>
                        </div>

                        {weeklyStats.summary && (
                          <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
                            <div className="text-xs text-green-700 font-medium mb-2">
                              Tóm tắt tuần
                            </div>
                            <div className="space-y-1 text-sm">
                              <div className="flex justify-between">
                                <span className="text-green-700">
                                  Ngày tốt nhất:
                                </span>
                                <span className="font-medium text-green-800">
                                  {weeklyStats.summary.bestDay.day}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-green-700">
                                  Ngày hoạt động:
                                </span>
                                <span className="font-medium text-green-800">
                                  {weeklyStats.summary.activeDays}/7
                                </span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="text-gray-500">
                          <BarChart3 className="h-8 w-8 mx-auto mb-2 opacity-50" />
                          Chưa có dữ liệu thống kê
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </UserLayout>
    </AuthGuard>
  );
}
