"use client";
import { useState, useEffect } from "react";
import {
  Plus,
  Target,
  DollarSign,
  TrendingUp,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  PiggyBank,
  Wallet,
  Calendar,
  ArrowUp,
  ArrowDown,
} from "lucide-react";
import {
  SavingsGoal,
  CreateSavingsGoalRequest,
  UpdateSavingsGoalRequest,
  AddMoneyRequest,
  getSavingsGoals,
  createSavingsGoal,
  updateSavingsGoal,
  deleteSavingsGoal,
  addMoneyToGoal,
  withdrawMoneyFromGoal,
} from "@/lib/savings-service";

export default function SavingPage() {
  const [goals, setGoals] = useState<SavingsGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState<SavingsGoal | null>(null);
  const [moneyModalOpen, setMoneyModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<SavingsGoal | null>(null);
  const [moneyAction, setMoneyAction] = useState<"add" | "withdraw">("add");
  const [moneyAmount, setMoneyAmount] = useState("");
  const [moneyDescription, setMoneyDescription] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [formData, setFormData] = useState<CreateSavingsGoalRequest>({
    name: "",
    description: "",
    targetAmount: 0,
    deadline: "",
    color: "#3B82F6",
    icon: "💰",
    priority: "Medium",
    category: "Tiết kiệm",
  });

  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      setLoading(true);
      const response = await getSavingsGoals();
      setGoals(response);
    } catch (error) {
      console.error("Error fetching goals:", error);
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      newErrors.name = "Tên mục tiêu không được để trống";
    }

    if (formData.targetAmount <= 0) {
      newErrors.targetAmount = "Số tiền mục tiêu phải lớn hơn 0";
    }

    if (formData.targetAmount > 1000000000000) {
      newErrors.targetAmount = "Số tiền mục tiêu quá lớn";
    }

    if (formData.deadline) {
      const deadlineDate = new Date(formData.deadline);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (deadlineDate < today) {
        newErrors.deadline = "Hạn hoàn thành không thể là ngày trong quá khứ";
      }
    }

    if (!formData.category.trim()) {
      newErrors.category = "Danh mục không được để trống";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (editingGoal) {
        await updateSavingsGoal(
          editingGoal._id,
          formData as UpdateSavingsGoalRequest
        );
      } else {
        await createSavingsGoal(formData);
      }
      await fetchGoals();
      resetForm();
    } catch (error) {
      console.error("Error saving goal:", error);
    }
  };

  const handleEdit = (goal: SavingsGoal) => {
    setEditingGoal(goal);
    setFormData({
      name: goal.name,
      description: goal.description,
      targetAmount: goal.targetAmount,
      deadline: goal.deadline,
      color: goal.color,
      icon: goal.icon,
      priority: goal.priority,
      category: goal.category,
    });
    setIsModalOpen(true);
  };

  const openMoneyModal = (goal: SavingsGoal, action: "add" | "withdraw") => {
    setSelectedGoal(goal);
    setMoneyAction(action);
    setMoneyAmount("");
    setMoneyDescription("");
    setMoneyModalOpen(true);
  };

  const handleMoneyAction = async () => {
    if (!selectedGoal || !moneyAmount) return;

    const amount = Number(moneyAmount);
    if (amount <= 0) {
      alert("Số tiền phải lớn hơn 0");
      return;
    }

    if (moneyAction === "withdraw" && amount > selectedGoal.currentAmount) {
      alert("Số tiền rút không thể lớn hơn số dư hiện tại");
      return;
    }

    try {
      const request: AddMoneyRequest = {
        amount,
        description: moneyDescription,
      };

      if (moneyAction === "add") {
        await addMoneyToGoal(selectedGoal._id, request);
      } else {
        await withdrawMoneyFromGoal(selectedGoal._id, request);
      }

      await fetchGoals();
      setMoneyModalOpen(false);
      setMoneyAmount("");
      setMoneyDescription("");
    } catch (error) {
      console.error(`Error ${moneyAction}ing money:`, error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa mục tiêu tiết kiệm này?")) {
      try {
        await deleteSavingsGoal(id);
        await fetchGoals();
      } catch (error) {
        console.error("Error deleting goal:", error);
      }
    }
  };

  const toggleActive = async (goal: SavingsGoal) => {
    try {
      await updateSavingsGoal(goal._id, { isActive: !goal.isActive });
      await fetchGoals();
    } catch (error) {
      console.error("Error toggling goal status:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      targetAmount: 0,
      deadline: "",
      color: "#3B82F6",
      icon: "💰",
      priority: "Medium",
      category: "Tiết kiệm",
    });
    setEditingGoal(null);
    setIsModalOpen(false);
    setErrors({});
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

  const iconOptions = [
    "💰",
    "🏠",
    "🚗",
    "✈️",
    "🎓",
    "💍",
    "🎯",
    "🌟",
    "💎",
    "🏆",
  ];
  const colorOptions = [
    "#3B82F6",
    "#EF4444",
    "#10B981",
    "#F59E0B",
    "#8B5CF6",
    "#EC4899",
    "#06B6D4",
    "#84CC16",
    "#F97316",
    "#6B7280",
  ];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Quản lý Tiết kiệm
          </h1>
          <p className="text-gray-600">
            Tạo và quản lý các mục tiêu tiết kiệm của bạn
          </p>
        </div>

        {/* Add New Button */}
        <div className="mb-6">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg flex items-center gap-2 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Thêm mục tiêu tiết kiệm
          </button>
        </div>

        {/* Savings Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {goals.map((goal) => (
            <div
              key={goal._id}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                    style={{ backgroundColor: goal.color + "20" }}
                  >
                    {goal.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {goal.name}
                    </h3>
                    <p className="text-sm text-gray-500">{goal.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => openMoneyModal(goal, "add")}
                    className="p-2 rounded-lg text-green-600 hover:bg-green-50"
                    title="Thêm tiền"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => openMoneyModal(goal, "withdraw")}
                    className="p-2 rounded-lg text-orange-600 hover:bg-orange-50"
                    title="Rút tiền"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => toggleActive(goal)}
                    className={`p-2 rounded-lg ${
                      goal.isActive
                        ? "text-green-600 hover:bg-green-50"
                        : "text-gray-400 hover:bg-gray-50"
                    }`}
                  >
                    {goal.isActive ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleEdit(goal)}
                    className="p-2 rounded-lg text-blue-600 hover:bg-blue-50"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(goal._id)}
                    className="p-2 rounded-lg text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <p className="text-gray-600 text-sm mb-4">{goal.description}</p>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Tiến độ</span>
                  <span>
                    {((goal.currentAmount / goal.targetAmount) * 100).toFixed(
                      1
                    )}
                    %
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="h-2 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: goal.color,
                      width: `${Math.min(
                        (goal.currentAmount / goal.targetAmount) * 100,
                        100
                      )}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Amount */}
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-sm text-gray-500">Hiện tại</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatCurrency(goal.currentAmount)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Mục tiêu</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {formatCurrency(goal.targetAmount)}
                  </p>
                </div>
              </div>

              {/* Deadline */}
              {goal.deadline && (
                <div className="mb-4">
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-gray-500">Hạn hoàn thành</p>
                    <p className="text-sm text-gray-900">
                      {formatDate(goal.deadline)}
                    </p>
                  </div>
                  {getDaysUntilDeadline(goal.deadline) !== null && (
                    <p
                      className={`text-xs mt-1 ${
                        getDaysUntilDeadline(goal.deadline)! > 30
                          ? "text-green-600"
                          : getDaysUntilDeadline(goal.deadline)! > 7
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {getDaysUntilDeadline(goal.deadline)! > 0
                        ? `Còn ${getDaysUntilDeadline(goal.deadline)} ngày`
                        : "Đã quá hạn"}
                    </p>
                  )}
                </div>
              )}

              {/* Priority and Status */}
              <div className="flex items-center justify-between">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
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
                    ? "Trung bình"
                    : "Thấp"}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    goal.isActive
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {goal.isActive ? "Đang hoạt động" : "Tạm dừng"}
                </span>
              </div>
            </div>
          ))}
        </div>

        {goals.length === 0 && (
          <div className="text-center py-12">
            <PiggyBank className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Chưa có mục tiêu tiết kiệm
            </h3>
            <p className="text-gray-500 mb-4">
              Hãy tạo mục tiêu tiết kiệm đầu tiên của bạn
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg"
            >
              Tạo mục tiêu tiết kiệm
            </button>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {editingGoal ? "Chỉnh sửa mục tiêu" : "Thêm mục tiêu tiết kiệm"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên mục tiêu
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors.name ? "border-red-300" : "border-gray-300"
                    }`}
                    required
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mô tả
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số tiền mục tiêu (VND)
                  </label>
                  <input
                    type="number"
                    value={formData.targetAmount}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        targetAmount: Number(e.target.value),
                      })
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors.targetAmount ? "border-red-300" : "border-gray-300"
                    }`}
                    required
                    min="0"
                  />
                  {errors.targetAmount && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.targetAmount}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Hạn hoàn thành (tùy chọn)
                  </label>
                  <input
                    type="date"
                    value={formData.deadline}
                    onChange={(e) =>
                      setFormData({ ...formData, deadline: e.target.value })
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors.deadline ? "border-red-300" : "border-gray-300"
                    }`}
                  />
                  {errors.deadline && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.deadline}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Icon
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {iconOptions.map((icon) => (
                      <button
                        key={icon}
                        type="button"
                        onClick={() => setFormData({ ...formData, icon })}
                        className={`p-3 text-2xl rounded-lg border ${
                          formData.icon === icon
                            ? "border-indigo-500 bg-indigo-50"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        {icon}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Màu sắc
                  </label>
                  <div className="grid grid-cols-5 gap-2">
                    {colorOptions.map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setFormData({ ...formData, color })}
                        className={`w-10 h-10 rounded-lg border-2 ${
                          formData.color === color
                            ? "border-gray-900"
                            : "border-gray-300"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Độ ưu tiên
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        priority: e.target.value as "High" | "Medium" | "Low",
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="High">Cao</option>
                    <option value="Medium">Trung bình</option>
                    <option value="Low">Thấp</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Danh mục
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      errors.category ? "border-red-300" : "border-gray-300"
                    }`}
                  />
                  {errors.category && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.category}
                    </p>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    {editingGoal ? "Cập nhật" : "Tạo mục tiêu"}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Money Modal */}
      {moneyModalOpen && selectedGoal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {moneyAction === "add" ? "Thêm tiền" : "Rút tiền"} -{" "}
                {selectedGoal.name}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số tiền (VND)
                  </label>
                  <input
                    type="number"
                    value={moneyAmount}
                    onChange={(e) => setMoneyAmount(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Nhập số tiền"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mô tả (tùy chọn)
                  </label>
                  <textarea
                    value={moneyDescription}
                    onChange={(e) => setMoneyDescription(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="Ghi chú về giao dịch..."
                  />
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span>Số dư hiện tại:</span>
                    <span className="font-semibold">
                      {formatCurrency(selectedGoal.currentAmount)}
                    </span>
                  </div>
                  {moneyAction === "add" && moneyAmount && (
                    <div className="flex justify-between text-sm text-green-600">
                      <span>Sau khi thêm:</span>
                      <span className="font-semibold">
                        {formatCurrency(
                          selectedGoal.currentAmount + Number(moneyAmount || 0)
                        )}
                      </span>
                    </div>
                  )}
                  {moneyAction === "withdraw" && moneyAmount && (
                    <div className="flex justify-between text-sm text-orange-600">
                      <span>Sau khi rút:</span>
                      <span className="font-semibold">
                        {formatCurrency(
                          Math.max(
                            0,
                            selectedGoal.currentAmount -
                              Number(moneyAmount || 0)
                          )
                        )}
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleMoneyAction}
                    disabled={!moneyAmount || Number(moneyAmount) <= 0}
                    className={`flex-1 py-2 px-4 rounded-lg transition-colors ${
                      moneyAction === "add"
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-orange-600 hover:bg-orange-700 text-white"
                    } disabled:bg-gray-300 disabled:cursor-not-allowed`}
                  >
                    {moneyAction === "add" ? "Thêm tiền" : "Rút tiền"}
                  </button>
                  <button
                    onClick={() => setMoneyModalOpen(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                  >
                    Hủy
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
