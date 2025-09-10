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
          <div className="max-w-6xl mx-auto px-4 py-8">
            {/* Header với thống kê tuần */}
            <div className="mb-8 grid grid-cols-1 lg:grid-cols-4 gap-6">
              <div className="lg:col-span-1">
                <Card className="bg-white/80 backdrop-blur-sm border-pink-200">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <BarChart3 className="h-5 w-5 text-pink-600" />
                      Thống kê tuần
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {isLoadingStats ? (
                      <div className="text-center text-gray-500">
                        Đang tải...
                      </div>
                    ) : weeklyStats ? (
                      <>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Nhiệm vụ:
                          </span>
                          <span className="font-semibold">
                            {weeklyStats.completedTasks}/
                            {weeklyStats.totalTasks}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Hoàn thành:
                          </span>
                          <span className="font-semibold text-green-600">
                            {weeklyStats.completionRate}%
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Streak hiện tại:
                          </span>
                          <span className="font-semibold text-blue-600">
                            {weeklyStats.currentStreak} ngày
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">
                            Streak tốt nhất:
                          </span>
                          <span className="font-semibold text-purple-600">
                            {weeklyStats.longestStreak} ngày
                          </span>
                        </div>
                        {weeklyStats.summary && (
                          <div className="pt-2 border-t border-gray-200">
                            <div className="text-xs text-gray-500 mb-1">
                              Ngày tốt nhất: {weeklyStats.summary.bestDay.day}
                            </div>
                            <div className="text-xs text-gray-500">
                              Ngày hoạt động: {weeklyStats.summary.activeDays}/7
                            </div>
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-center text-gray-500">
                        Chưa có dữ liệu
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              <div className="lg:col-span-3">
                <Card className="bg-white/80 backdrop-blur-sm border-pink-200">
                  <CardHeader className="pb-6">
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2 text-xl">
                        <Calendar className="h-6 w-6 text-pink-600" />
                        Kế hoạch tuần
                      </CardTitle>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        {currentTime.toLocaleTimeString("vi-VN", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>

                    {/* Navigation ngày */}
                    <div className="flex items-center justify-between mt-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={goToPreviousDay}
                        disabled={currentDayIndex === 0}
                        className="flex items-center gap-1"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Trước
                      </Button>

                      <div className="text-center">
                        <h3 className="text-lg font-semibold text-gray-800">
                          {currentDay.dayName}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {currentDay.dateString}
                        </p>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={goToNextDay}
                        disabled={currentDayIndex === 6}
                        className="flex items-center gap-1"
                      >
                        Sau
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Day indicator */}
                    <div className="flex justify-center gap-2 mt-4">
                      {Array.from({ length: 7 }, (_, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 rounded-full ${
                            i === currentDayIndex
                              ? "bg-pink-500"
                              : "bg-gray-200"
                          } transition-colors`}
                        />
                      ))}
                    </div>
                  </CardHeader>

                  <CardContent>
                    {isLoadingTasks ? (
                      <div className="text-center py-8">
                        <div className="text-gray-500">
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
                                flex items-start gap-3 p-4 rounded-lg border transition-all
                                ${
                                  task.completed
                                    ? "bg-green-50 border-green-200 opacity-75"
                                    : "bg-white border-gray-200 hover:border-pink-300"
                                }
                              `}
                            >
                              <button
                                onClick={() => toggleTaskCompletion(task._id)}
                                className={`
                                  flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all
                                  ${
                                    task.completed
                                      ? "bg-green-500 border-green-500 text-white"
                                      : "border-gray-300 hover:border-pink-500"
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
                                    font-medium mb-1 transition-all
                                    ${
                                      task.completed
                                        ? "line-through text-gray-500"
                                        : "text-gray-800"
                                    }
                                  `}
                                >
                                  {task.task}
                                </h4>
                                <div className="flex items-center gap-2 mt-2">
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    {task.type}
                                  </Badge>
                                  <span className="text-xs text-gray-500">
                                    {task.time}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-8">
                            <div className="text-gray-500 mb-4">
                              Chưa có nhiệm vụ nào cho {currentDay.dayName}
                            </div>
                            <Button
                              variant="outline"
                              className="flex items-center gap-2"
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
            </div>
          </div>
        </div>
      </UserLayout>
    </AuthGuard>
  );
}
