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
      <div className="max-w-6xl mx-auto p-6">
        {/* Header - Không cần nữa vì UserLayout đã có */}

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Tổng đã tiết kiệm
                </p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(getTotalSavings())}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Tổng mục tiêu
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatCurrency(getTotalTarget())}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">
                  Tiến độ tổng thể
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {getOverallProgress().toFixed(1)}%
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">
              Tiến độ tổng thể
            </h2>
            <span className="text-lg font-semibold text-purple-600">
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
        </div>

        {/* Savings Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => {
            const progress = (goal.currentAmount / goal.targetAmount) * 100;
            const daysLeft = getDaysUntilDeadline(goal.deadline);

            return (
              <div
                key={goal._id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                    style={{ backgroundColor: goal.color + "20" }}
                  >
                    {goal.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
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

                <p className="text-gray-600 text-sm mb-4">{goal.description}</p>

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
                  <div className="flex items-center justify-between text-xs">
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
                  <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-2">
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
              </div>
            );
          })}
        </div>

        {goals.length === 0 && (
          <div className="text-center py-12">
            <PiggyBank className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Chưa có mục tiêu tiết kiệm
            </h3>
            <p className="text-gray-500 mb-4">
              Bạn chưa có mục tiêu tiết kiệm nào đang hoạt động
            </p>
          </div>
        )}
      </div>
    </UserLayout>
  );
}
