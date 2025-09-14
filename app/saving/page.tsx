"use client";
import { useState, useEffect } from "react";
import {
  PiggyBank,
  Target,
  TrendingUp,
  Calendar,
  DollarSign,
} from "lucide-react";
import { SavingsGoal, getSavingsGoals } from "@/lib/savings-service";
import UserLayout from "@/components/layouts/UserLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SavingDisplayPage() {
  const [goals, setGoals] = useState<SavingsGoal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      setLoading(true);
      const response = await getSavingsGoals();
      // Chỉ hiển thị các mục tiêu đang hoạt động
      setGoals(response.filter((goal) => goal.isActive));
    } catch (error) {
      console.error("Error fetching goals:", error);
    } finally {
      setLoading(false);
    }
  };

  // Tính tổng tiền đã tiết kiệm
  const getTotalSavings = () => {
    return goals.reduce((total, goal) => total + goal.currentAmount, 0);
  };

  // Tính tổng mục tiêu
  const getTotalTarget = () => {
    return goals.reduce((total, goal) => total + goal.targetAmount, 0);
  };

  // Tính phần trăm hoàn thành tổng thể
  const getOverallProgress = () => {
    const total = getTotalTarget();
    if (total === 0) return 0;
    return (getTotalSavings() / total) * 100;
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "Không giới hạn";
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  const getDaysUntilDeadline = (deadline?: string) => {
    if (!deadline) return null;
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <UserLayout
        title="Mục tiêu Tiết kiệm"
        description="Theo dõi và quản lý các mục tiêu tiết kiệm của bạn"
        icon={<PiggyBank className="w-6 h-6" />}
      >
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout
      title="Mục tiêu Tiết kiệm"
      description="Theo dõi và quản lý các mục tiêu tiết kiệm của bạn"
      icon={<PiggyBank className="w-6 h-6" />}
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8">
          {/* Header - Không cần nữa vì UserLayout đã có */}

          {/* Overview Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8">
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-3 sm:p-4 lg:p-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-lg">
                    <DollarSign className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-green-800 mb-1">
                    {formatCurrency(getTotalSavings())}
                  </div>
                  <div className="text-xs sm:text-sm text-green-600 font-medium">
                    Tổng đã tiết kiệm
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-3 sm:p-4 lg:p-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-lg">
                    <Target className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-800 mb-1">
                    {formatCurrency(getTotalTarget())}
                  </div>
                  <div className="text-xs sm:text-sm text-blue-600 font-medium">
                    Tổng mục tiêu
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-3 sm:p-4 lg:p-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-lg">
                    <TrendingUp className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-800 mb-1">
                    {getOverallProgress().toFixed(1)}%
                  </div>
                  <div className="text-xs sm:text-sm text-purple-600 font-medium">
                    Tiến độ tổng thể
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Overall Progress Bar */}
          <Card className="bg-white border border-gray-200 shadow-lg mb-6 sm:mb-8 border-none">
            <CardHeader className="p-3 sm:p-4 lg:p-6">
              <CardTitle className="flex items-center space-x-2 text-sm sm:text-base lg:text-lg">
                <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                <span>Tiến độ tổng thể</span>
              </CardTitle>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Theo dõi tiến độ tiết kiệm tổng thể của tất cả mục tiêu
              </p>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 lg:p-6 pt-0">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                  Tiến độ tiết kiệm
                </h2>
                <span className="text-base sm:text-lg font-semibold text-purple-600">
                  {getOverallProgress().toFixed(1)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4">
                <div
                  className="bg-gradient-to-r from-purple-500 to-indigo-600 h-4 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(getOverallProgress(), 100)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-gray-500 mt-2">
                <span>{formatCurrency(getTotalSavings())}</span>
                <span>{formatCurrency(getTotalTarget())}</span>
              </div>
            </CardContent>
          </Card>

          {/* Savings Goals Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {goals.map((goal) => {
              const progress = (goal.currentAmount / goal.targetAmount) * 100;
              const daysLeft = getDaysUntilDeadline(goal.deadline);

              return (
                <Card
                  key={goal._id}
                  className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300 group border-none"
                >
                  <CardContent className="p-4 sm:p-5 lg:p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl shadow-md"
                        style={{ backgroundColor: goal.color + "20" }}
                      >
                        {goal.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-800 transition-colors">
                          {goal.name}
                        </h3>
                        <p className="text-sm text-gray-500">{goal.category}</p>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          goal.priority === "High"
                            ? "bg-red-100 text-red-800"
                            : goal.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {goal.priority === "High"
                          ? "Cao"
                          : goal.priority === "Medium"
                          ? "TB"
                          : "Thấp"}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-4">
                      {goal.description}
                    </p>

                    {/* Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-600 mb-2">
                        <span>Tiến độ</span>
                        <span>{progress.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="h-2 rounded-full transition-all duration-300"
                          style={{
                            backgroundColor: goal.color,
                            width: `${Math.min(progress, 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>

                    {/* Amount */}
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Hiện tại</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {formatCurrency(goal.currentAmount)}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">Mục tiêu</p>
                        <p className="text-sm font-semibold text-gray-900">
                          {formatCurrency(goal.targetAmount)}
                        </p>
                      </div>
                    </div>

                    {/* Deadline */}
                    {goal.deadline && (
                      <div className="flex items-center justify-between text-xs mb-3">
                        <div className="flex items-center gap-1 text-gray-500">
                          <Calendar className="w-3 h-3" />
                          <span>{formatDate(goal.deadline)}</span>
                        </div>
                        {daysLeft !== null && (
                          <span
                            className={`font-medium ${
                              daysLeft > 30
                                ? "text-green-600"
                                : daysLeft > 7
                                ? "text-yellow-600"
                                : "text-red-600"
                            }`}
                          >
                            {daysLeft > 0 ? `${daysLeft} ngày` : "Quá hạn"}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Completion indicator */}
                    {progress >= 100 && (
                      <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-green-700">
                          <div className="w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                            <svg
                              className="w-2 h-2 text-white"
                              fill="currentColor"
                              viewBox="0 0 8 8"
                            >
                              <path d="M6.564.75l-3.59 3.612-1.538-1.55L0 4.26l2.974 2.99L8 2.193z" />
                            </svg>
                          </div>
                          <span className="text-xs font-medium">
                            Đã hoàn thành!
                          </span>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {goals.length === 0 && (
            <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200/50 shadow-lg border-none">
              <CardContent className="p-8 sm:p-10 lg:p-12 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg">
                  <PiggyBank className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2 sm:mb-3">
                  Chưa có mục tiêu tiết kiệm
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 max-w-md mx-auto">
                  Bạn chưa có mục tiêu tiết kiệm nào đang hoạt động. Hãy tạo mục
                  tiêu đầu tiên để bắt đầu hành trình tiết kiệm của mình!
                </p>
                <div className="animate-pulse">
                  <div className="w-3 h-3 bg-purple-400 rounded-full mx-auto"></div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </UserLayout>
  );
}
