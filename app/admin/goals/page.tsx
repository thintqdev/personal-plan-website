"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Target,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Calendar,
  Flag,
  BookOpen,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  Circle,
  Minus,
  ArrowLeft,
  TrendingUp,
  Award,
  Clock,
  CheckCircle2,
  AlertCircle,
  Users,
  PlusCircle,
  BarChart3,
  Settings,
} from "lucide-react";
import Link from "next/link";
import {
  getGoals,
  createGoal,
  updateGoal,
  deleteGoal,
  type Goal,
  type SubGoal,
  type CreateGoalRequest,
  type UpdateGoalRequest,
} from "@/lib/goal-service";
import { EnhancedDatePicker } from "@/components/ui/date-picker";

export default function GoalsAdminPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Form state for new goal
  const [newGoal, setNewGoal] = useState<CreateGoalRequest>({
    title: "",
    description: "",
    category: "",
    priority: "Medium",
    status: "Not Started",
    targetDate: "",
    subGoals: [],
  });

  // Form state for editing goal
  const [editGoal, setEditGoal] = useState<UpdateGoalRequest>({});

  // State for managing sub-goals
  const [expandedGoals, setExpandedGoals] = useState<Set<string>>(new Set());
  const [newSubGoal, setNewSubGoal] = useState<SubGoal>({
    title: "",
    description: "",
    status: "Not Started",
    targetDate: "",
  });
  const [addingSubGoalTo, setAddingSubGoalTo] = useState<string | null>(null);
  const [editingSubGoal, setEditingSubGoal] = useState<{
    goalId: string;
    index: number;
  } | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load goals from API
  useEffect(() => {
    const loadGoals = async () => {
      try {
        setIsLoading(true);
        const goalsData = await getGoals();
        setGoals(goalsData);
      } catch (error) {
        console.error("Failed to load goals:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isMounted) {
      loadGoals();
    }
  }, [isMounted]);

  const handleAddGoal = async () => {
    // Validate required fields
    if (!newGoal.title.trim()) {
      alert("Vui lòng nhập tiêu đề mục tiêu");
      return;
    }

    if (!newGoal.description.trim()) {
      alert("Vui lòng nhập mô tả mục tiêu");
      return;
    }

    // Validate title length
    if (newGoal.title.trim().length < 3) {
      alert("Tiêu đề mục tiêu phải có ít nhất 3 ký tự");
      return;
    }

    if (newGoal.title.trim().length > 100) {
      alert("Tiêu đề mục tiêu không được vượt quá 100 ký tự");
      return;
    }

    // Validate description length
    if (newGoal.description.trim().length < 10) {
      alert("Mô tả mục tiêu phải có ít nhất 10 ký tự");
      return;
    }

    if (newGoal.description.trim().length > 500) {
      alert("Mô tả mục tiêu không được vượt quá 500 ký tự");
      return;
    }

    // Validate target date
    if (newGoal.targetDate) {
      const targetDate = new Date(newGoal.targetDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (targetDate < today) {
        alert("Ngày mục tiêu không thể là ngày trong quá khứ");
        return;
      }
    }

    // Validate category length if provided
    if (newGoal.category && newGoal.category.trim().length > 50) {
      alert("Danh mục không được vượt quá 50 ký tự");
      return;
    }

    try {
      setIsSubmitting(true);
      const createdGoal = await createGoal(newGoal);
      setGoals((prev) => [createdGoal, ...prev]);
      setNewGoal({
        title: "",
        description: "",
        category: "",
        priority: "Medium",
        status: "Not Started",
        targetDate: "",
        subGoals: [],
      });
      setIsAddingGoal(false); // Close the form after successful addition
      alert("Thêm mục tiêu thành công!");
    } catch (error) {
      console.error("Failed to add goal:", error);
      alert("Không thể thêm mục tiêu. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditGoal = async (goalId: string) => {
    // Validate required fields
    if (!editGoal.title?.trim() && !editGoal.description?.trim()) {
      alert("Vui lòng nhập ít nhất tiêu đề hoặc mô tả");
      return;
    }

    // Validate title if provided
    if (editGoal.title && editGoal.title.trim().length < 3) {
      alert("Tiêu đề mục tiêu phải có ít nhất 3 ký tự");
      return;
    }

    if (editGoal.title && editGoal.title.trim().length > 100) {
      alert("Tiêu đề mục tiêu không được vượt quá 100 ký tự");
      return;
    }

    // Validate description if provided
    if (editGoal.description && editGoal.description.trim().length < 10) {
      alert("Mô tả mục tiêu phải có ít nhất 10 ký tự");
      return;
    }

    if (editGoal.description && editGoal.description.trim().length > 500) {
      alert("Mô tả mục tiêu không được vượt quá 500 ký tự");
      return;
    }

    // Validate target date
    if (editGoal.targetDate) {
      const targetDate = new Date(editGoal.targetDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (targetDate < today) {
        alert("Ngày mục tiêu không thể là ngày trong quá khứ");
        return;
      }
    }

    // Validate category length if provided
    if (editGoal.category && editGoal.category.trim().length > 50) {
      alert("Danh mục không được vượt quá 50 ký tự");
      return;
    }

    try {
      setIsSubmitting(true);
      const updatedGoal = await updateGoal(goalId, editGoal);
      setGoals((prev) =>
        prev.map((goal) => (goal._id === goalId ? updatedGoal : goal))
      );
      setEditingGoalId(null);
      setEditGoal({});
      alert("Cập nhật mục tiêu thành công!");
    } catch (error) {
      console.error("Failed to update goal:", error);
      alert("Không thể cập nhật mục tiêu. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteGoal = async (goalId: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa mục tiêu này?")) {
      return;
    }

    try {
      await deleteGoal(goalId);
      setGoals((prev) => prev.filter((goal) => goal._id !== goalId));
    } catch (error) {
      console.error("Failed to delete goal:", error);
      alert("Không thể xóa mục tiêu");
    }
  };

  const startEditing = (goal: Goal) => {
    setEditingGoalId(goal._id);
    setEditGoal({
      title: goal.title,
      description: goal.description,
      category: goal.category,
      priority: goal.priority,
      status: goal.status,
      targetDate: goal.targetDate || "",
      subGoals: goal.subGoals || [],
    });
  };

  const cancelEditing = () => {
    setEditingGoalId(null);
    setEditGoal({});
  };

  // Sub-goal management functions
  const toggleGoalExpansion = (goalId: string) => {
    const newExpanded = new Set(expandedGoals);
    if (newExpanded.has(goalId)) {
      newExpanded.delete(goalId);
    } else {
      newExpanded.add(goalId);
    }
    setExpandedGoals(newExpanded);
  };

  const addSubGoalToNewGoal = () => {
    if (!newSubGoal.title.trim()) {
      alert("Vui lòng nhập tiêu đề mục tiêu con");
      return;
    }

    if (newSubGoal.title.trim().length < 3) {
      alert("Tiêu đề mục tiêu con phải có ít nhất 3 ký tự");
      return;
    }

    if (newSubGoal.title.trim().length > 80) {
      alert("Tiêu đề mục tiêu con không được vượt quá 80 ký tự");
      return;
    }

    if (newSubGoal.description && newSubGoal.description.trim().length > 200) {
      alert("Mô tả mục tiêu con không được vượt quá 200 ký tự");
      return;
    }

    // Validate target date
    if (newSubGoal.targetDate) {
      const targetDate = new Date(newSubGoal.targetDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (targetDate < today) {
        alert("Ngày mục tiêu không thể là ngày trong quá khứ");
        return;
      }
    }

    setNewGoal((prev) => ({
      ...prev,
      subGoals: [...(prev.subGoals || []), { ...newSubGoal }],
    }));

    setNewSubGoal({
      title: "",
      description: "",
      status: "Not Started",
      targetDate: "",
    });
  };

  const removeSubGoalFromNewGoal = (index: number) => {
    setNewGoal((prev) => ({
      ...prev,
      subGoals: (prev.subGoals || []).filter((_, i) => i !== index),
    }));
  };

  const addSubGoalToExisting = async (goalId: string) => {
    if (!newSubGoal.title.trim()) {
      alert("Vui lòng nhập tiêu đề mục tiêu con");
      return;
    }

    if (newSubGoal.title.trim().length < 3) {
      alert("Tiêu đề mục tiêu con phải có ít nhất 3 ký tự");
      return;
    }

    if (newSubGoal.title.trim().length > 80) {
      alert("Tiêu đề mục tiêu con không được vượt quá 80 ký tự");
      return;
    }

    if (newSubGoal.description && newSubGoal.description.trim().length > 200) {
      alert("Mô tả mục tiêu con không được vượt quá 200 ký tự");
      return;
    }

    // Validate target date
    if (newSubGoal.targetDate) {
      const targetDate = new Date(newSubGoal.targetDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (targetDate < today) {
        alert("Ngày mục tiêu không thể là ngày trong quá khứ");
        return;
      }
    }

    const goal = goals.find((g) => g._id === goalId);
    if (!goal) return;

    try {
      setIsSubmitting(true);
      const updatedGoal = await updateGoal(goalId, {
        subGoals: [...(goal.subGoals || []), { ...newSubGoal }],
      });

      setGoals((prev) => prev.map((g) => (g._id === goalId ? updatedGoal : g)));
      setNewSubGoal({
        title: "",
        description: "",
        status: "Not Started",
        targetDate: "",
      });
      setAddingSubGoalTo(null);
      alert("Thêm mục tiêu con thành công!");
    } catch (error) {
      console.error("Failed to add sub-goal:", error);
      alert("Không thể thêm mục tiêu con. Vui lòng thử lại!");
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateSubGoal = async (
    goalId: string,
    subGoalIndex: number,
    updatedSubGoal: SubGoal
  ) => {
    const goal = goals.find((g) => g._id === goalId);
    if (!goal) return;

    try {
      const updatedSubGoals = [...(goal.subGoals || [])];
      updatedSubGoals[subGoalIndex] = updatedSubGoal;

      const updatedGoal = await updateGoal(goalId, {
        subGoals: updatedSubGoals,
      });

      setGoals((prev) => prev.map((g) => (g._id === goalId ? updatedGoal : g)));
    } catch (error) {
      console.error("Failed to update sub-goal:", error);
      alert("Không thể cập nhật mục tiêu con");
    }
  };

  const deleteSubGoal = async (goalId: string, subGoalIndex: number) => {
    if (!confirm("Bạn có chắc chắn muốn xóa mục tiêu con này?")) return;

    const goal = goals.find((g) => g._id === goalId);
    if (!goal) return;

    try {
      const updatedSubGoals = (goal.subGoals || []).filter(
        (_, i) => i !== subGoalIndex
      );

      const updatedGoal = await updateGoal(goalId, {
        subGoals: updatedSubGoals,
      });

      setGoals((prev) => prev.map((g) => (g._id === goalId ? updatedGoal : g)));
    } catch (error) {
      console.error("Failed to delete sub-goal:", error);
      alert("Không thể xóa mục tiêu con");
    }
  };

  const getGoalProgress = (goal: Goal) => {
    if (!goal.subGoals || goal.subGoals.length === 0) return 0;
    const completed = goal.subGoals.filter(
      (sg) => sg.status === "Completed"
    ).length;
    return Math.round((completed / goal.subGoals.length) * 100);
  };

  const getGoalStats = () => {
    const total = goals.length;
    const completed = goals.filter((g) => g.status === "Completed").length;
    const inProgress = goals.filter((g) => g.status === "In Progress").length;
    const notStarted = goals.filter((g) => g.status === "Not Started").length;
    const onHold = goals.filter((g) => g.status === "On Hold").length;

    return { total, completed, inProgress, notStarted, onHold };
  };

  const stats = getGoalStats();

  const getPriorityColor = (priority: string) => {
    const option = priorityOptions.find((p) => p.value === priority);
    return option?.color || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getStatusColor = (status: string) => {
    const option = statusOptions.find((s) => s.value === status);
    return option?.color || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const priorityOptions = [
    {
      value: "Low",
      label: "Thấp",
      icon: "🟢",
      color: "bg-green-100 text-green-800 border-green-200",
    },
    {
      value: "Medium",
      label: "Trung bình",
      icon: "🟡",
      color: "bg-yellow-100 text-yellow-800 border-yellow-200",
    },
    {
      value: "High",
      label: "Cao",
      icon: "🔴",
      color: "bg-red-100 text-red-800 border-red-200",
    },
  ];

  const statusOptions = [
    {
      value: "Not Started",
      label: "Chưa bắt đầu",
      icon: "⏸️",
      color: "bg-gray-100 text-gray-800 border-gray-200",
    },
    {
      value: "In Progress",
      label: "Đang thực hiện",
      icon: "▶️",
      color: "bg-blue-100 text-blue-800 border-blue-200",
    },
    {
      value: "On Hold",
      label: "Tạm dừng",
      icon: "⏸️",
      color: "bg-orange-100 text-orange-800 border-orange-200",
    },
    {
      value: "Completed",
      label: "Hoàn thành",
      icon: "✅",
      color: "bg-green-100 text-green-800 border-green-200",
    },
  ];

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="mb-8">
          <Link href="/admin" className="inline-block mb-6">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Quay lại Dashboard
            </Button>
          </Link>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Quản lý Mục tiêu
                </h1>
                <p className="text-gray-600 mt-1">
                  Tạo, theo dõi và quản lý các mục tiêu cá nhân
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                className="bg-purple-600 hover:bg-purple-700 text-white border-purple-600 px-4 py-2 rounded-xl"
              >
                <BarChart3 className="w-4 h-4 mr-2" />
                Thống kê
              </Button>
              <Button
                onClick={() => setIsAddingGoal(!isAddingGoal)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                <Plus className="w-4 h-4 mr-2" />
                Thêm Mục tiêu
              </Button>
            </div>
          </div>
        </div>
        {/* Stats Overview */}
        <div className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Total Goals */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-1"></div>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-indigo-100 rounded-2xl flex items-center justify-center">
                    <Target className="w-7 h-7 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Tổng mục tiêu
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stats.total}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Completed Goals */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-1"></div>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center">
                    <CheckCircle2 className="w-7 h-7 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Hoàn thành
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stats.completed}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* In Progress Goals */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 h-1"></div>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                    <TrendingUp className="w-7 h-7 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Đang thực hiện
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stats.inProgress}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Success Rate */}
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-red-600 h-1"></div>
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center">
                    <Award className="w-7 h-7 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Tỉ lệ thành công
                    </p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stats.total > 0
                        ? Math.round((stats.completed / stats.total) * 100)
                        : 0}
                      %
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        {/* Add New Goal Form */}
        {isAddingGoal && (
          <Card className="mb-8 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
            <div className="p-1">
              <div className="bg-white rounded-2xl">
                <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-2xl">
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                        <Plus className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900">
                          Tạo mục tiêu mới
                        </h2>
                        <p className="text-gray-600 mt-1">
                          Bắt đầu hành trình chinh phục ước mơ
                        </p>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsAddingGoal(false)}
                      className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-xl p-2"
                    >
                      <X className="w-5 h-5" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-8 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label
                        htmlFor="title"
                        className="text-gray-700 font-semibold text-sm flex items-center gap-2"
                      >
                        <Target className="w-4 h-4 text-indigo-500" />
                        Tiêu đề mục tiêu *
                      </Label>
                      <Input
                        id="title"
                        placeholder="Ví dụ: Học tiếng Nhật N3 trong 6 tháng"
                        value={newGoal.title}
                        onChange={(e) =>
                          setNewGoal((prev) => ({
                            ...prev,
                            title: e.target.value,
                          }))
                        }
                        className="border-gray-200 focus:border-indigo-400 focus:ring-indigo-400 rounded-xl h-12 bg-gray-50/50 text-gray-900"
                        maxLength={100}
                      />
                      <div className="text-xs text-gray-500 flex justify-between">
                        <span>Tiêu đề hấp dẫn thu hút sự chú ý</span>
                        <span>{newGoal.title.length}/100</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <Label
                        htmlFor="category"
                        className="text-gray-700 font-semibold text-sm flex items-center gap-2"
                      >
                        <BookOpen className="w-4 h-4 text-purple-500" />
                        Danh mục
                      </Label>
                      <Input
                        id="category"
                        placeholder="Ví dụ: Học tập, Sức khỏe, Công việc"
                        value={newGoal.category}
                        onChange={(e) =>
                          setNewGoal((prev) => ({
                            ...prev,
                            category: e.target.value,
                          }))
                        }
                        className="border-gray-200 focus:border-purple-400 focus:ring-purple-400 rounded-xl h-12 bg-gray-50/50"
                        maxLength={50}
                      />
                      <div className="text-xs text-gray-500 flex justify-between">
                        <span>Phân loại mục tiêu dễ dàng</span>
                        <span>{newGoal.category.length}/50</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="description"
                      className="text-gray-700 font-semibold text-sm flex items-center gap-2"
                    >
                      <AlertCircle className="w-4 h-4 text-green-500" />
                      Mô tả mục tiêu *
                    </Label>
                    <Textarea
                      id="description"
                      placeholder="Mô tả chi tiết về mục tiêu này, tại sao nó quan trọng với bạn..."
                      value={newGoal.description}
                      onChange={(e) =>
                        setNewGoal((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      className="border-gray-200 focus:border-green-400 focus:ring-green-400 rounded-xl resize-none bg-gray-50/50 text-gray-900"
                      rows={4}
                      maxLength={500}
                    />
                    <div className="text-xs text-gray-500 flex justify-between">
                      <span>Mô tả chi tiết giúp bạn có động lực hơn</span>
                      <span>{newGoal.description.length}/500</span>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-6 border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-r from-gray-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Settings className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          Cài đặt mục tiêu
                        </h3>
                        <p className="text-sm text-gray-600">
                          Tùy chỉnh độ ưu tiên và thời hạn
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <Label className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                          <Flag className="w-4 h-4 text-red-500" />
                          Độ ưu tiên
                        </Label>
                        <Select
                          value={newGoal.priority}
                          onValueChange={(value: any) =>
                            setNewGoal((prev) => ({ ...prev, priority: value }))
                          }
                        >
                          <SelectTrigger className="border-gray-200 focus:border-red-400 rounded-xl h-12 bg-white shadow-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-gray-200 rounded-xl shadow-lg">
                            {priorityOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                <div className="flex items-center gap-2">
                                  <span>{option.icon}</span>
                                  <span>{option.label}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-blue-500" />
                          Trạng thái
                        </Label>
                        <Select
                          value={newGoal.status}
                          onValueChange={(value: any) =>
                            setNewGoal((prev) => ({ ...prev, status: value }))
                          }
                        >
                          <SelectTrigger className="border-gray-200 focus:border-blue-400 rounded-xl h-12 bg-white shadow-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-gray-200 rounded-xl shadow-lg">
                            {statusOptions.map((option) => (
                              <SelectItem
                                key={option.value}
                                value={option.value}
                              >
                                <div className="flex items-center gap-2">
                                  <span>{option.icon}</span>
                                  <span>{option.label}</span>
                                </div>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-3">
                        <Label className="text-gray-700 font-semibold text-sm flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-green-500" />
                          Ngày mục tiêu
                        </Label>
                        <EnhancedDatePicker
                          date={
                            newGoal.targetDate
                              ? new Date(newGoal.targetDate)
                              : undefined
                          }
                          onDateChange={(date) =>
                            setNewGoal((prev) => ({
                              ...prev,
                              targetDate: date
                                ? date.toISOString().split("T")[0]
                                : "",
                            }))
                          }
                          placeholder="Chọn ngày hoàn thành"
                          className="border-gray-200 focus:border-green-400 focus:ring-green-400 rounded-xl h-12 bg-white shadow-sm"
                          minDate={new Date()}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Sub-goals section for new goal */}
                  <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-2xl p-6 border border-blue-100">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Target className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">
                          Mục tiêu con
                        </h3>
                        <p className="text-sm text-gray-600">
                          Phân chia mục tiêu lớn thành các bước nhỏ
                        </p>
                      </div>
                    </div>

                    {/* Display existing sub-goals */}
                    {newGoal.subGoals && newGoal.subGoals.length > 0 && (
                      <div className="space-y-4 mb-6">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-gray-700">
                            Đã thêm ({newGoal.subGoals.length})
                          </span>
                          <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                            {newGoal.subGoals.length} mục tiêu
                          </Badge>
                        </div>
                        <div className="grid gap-3">
                          {newGoal.subGoals.map((subGoal, index) => (
                            <div
                              key={index}
                              className="group relative bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-3 mb-2">
                                    <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center shadow-sm">
                                      <CheckCircle2 className="w-4 h-4 text-white" />
                                    </div>
                                    <h4 className="font-semibold text-gray-900 truncate">
                                      {subGoal.title}
                                    </h4>
                                  </div>
                                  {subGoal.description && (
                                    <p className="text-sm text-gray-600 ml-11 line-clamp-2">
                                      {subGoal.description}
                                    </p>
                                  )}
                                  {subGoal.targetDate && (
                                    <div className="flex items-center gap-2 mt-2 ml-11">
                                      <Calendar className="w-4 h-4 text-blue-500" />
                                      <span className="text-xs text-blue-600 font-medium">
                                        {new Date(
                                          subGoal.targetDate
                                        ).toLocaleDateString("vi-VN")}
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    removeSubGoalFromNewGoal(index)
                                  }
                                  className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg p-2 transition-all duration-200"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Add new sub-goal form */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                          <Plus className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold text-gray-900">
                          Thêm mục tiêu con mới
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <Target className="w-4 h-4 text-blue-500" />
                            Tiêu đề mục tiêu con *
                          </Label>
                          <Input
                            placeholder="Ví dụ: Học 10 từ vựng mới mỗi ngày"
                            value={newSubGoal.title}
                            onChange={(e) =>
                              setNewSubGoal((prev) => ({
                                ...prev,
                                title: e.target.value,
                              }))
                            }
                            className="border-gray-200 focus:border-blue-400 focus:ring-blue-400 rounded-xl h-12 bg-gray-50/50"
                            maxLength={80}
                          />
                          <div className="text-xs text-gray-500">
                            {newSubGoal.title.length}/80 ký tự
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-green-500" />
                            Ngày hoàn thành
                          </Label>
                          <EnhancedDatePicker
                            date={
                              newSubGoal.targetDate
                                ? new Date(newSubGoal.targetDate)
                                : undefined
                            }
                            onDateChange={(date) =>
                              setNewSubGoal((prev) => ({
                                ...prev,
                                targetDate: date
                                  ? date.toISOString().split("T")[0]
                                  : "",
                              }))
                            }
                            placeholder="Chọn ngày mục tiêu"
                            className="border-gray-200 focus:border-green-400 focus:ring-green-400 rounded-xl h-12 bg-gray-50/50"
                            minDate={new Date()}
                          />
                        </div>
                      </div>

                      <div className="space-y-2 mb-6">
                        <Label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-purple-500" />
                          Mô tả chi tiết (tùy chọn)
                        </Label>
                        <Textarea
                          placeholder="Mô tả chi tiết về mục tiêu con này để dễ theo dõi hơn..."
                          value={newSubGoal.description}
                          onChange={(e) =>
                            setNewSubGoal((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                          className="border-gray-200 focus:border-purple-400 focus:ring-purple-400 rounded-xl resize-none bg-gray-50/50"
                          rows={3}
                          maxLength={200}
                        />
                        <div className="text-xs text-gray-500">
                          {newSubGoal.description.length}/200 ký tự
                        </div>
                      </div>

                      <Button
                        type="button"
                        onClick={addSubGoalToNewGoal}
                        disabled={!newSubGoal.title.trim()}
                        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02]"
                      >
                        <Plus className="w-5 h-5 mr-2" />
                        Thêm mục tiêu con
                      </Button>
                    </div>
                  </div>

                  <Button
                    onClick={handleAddGoal}
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] text-lg"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    {isSubmitting ? "Đang tạo mục tiêu..." : "Tạo mục tiêu mới"}
                  </Button>
                </CardContent>
              </div>
            </div>
          </Card>
        )}{" "}
        {/* Goals List */}
        <Card className="bg-gradient-to-br from-white via-blue-50/20 to-purple-50/20 backdrop-blur-sm border-0 shadow-2xl rounded-3xl overflow-hidden">
          <div className="bg-white rounded-2xl">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-t-2xl">
              <CardTitle className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Danh sách mục tiêu
                  </h2>
                  <p className="text-gray-600 mt-1">
                    Theo dõi và quản lý tất cả mục tiêu của bạn
                  </p>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8">
              {isLoading ? (
                <div className="space-y-4">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="p-4 bg-gray-100 rounded-lg animate-pulse"
                    >
                      <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-2/3 mb-2"></div>
                      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : goals.length === 0 ? (
                <div className="text-center py-20">
                  <div className="relative mb-8">
                    <div className="w-32 h-32 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-full flex items-center justify-center mx-auto shadow-lg">
                      <Target className="w-16 h-16 text-indigo-500" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                      <Plus className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Chưa có mục tiêu nào
                  </h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
                    Hãy bắt đầu hành trình phát triển bản thân bằng cách tạo mục
                    tiêu đầu tiên. Mỗi mục tiêu lớn đều bắt đầu từ những bước đi
                    nhỏ.
                  </p>
                  <Button
                    onClick={() => setIsAddingGoal(true)}
                    className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105 text-lg font-semibold"
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Tạo mục tiêu đầu tiên
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {goals.map((goal) => (
                    <Card
                      key={goal._id}
                      className="bg-gradient-to-br from-white to-blue-50/30 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02] group"
                    >
                      <div className="bg-gradient-to-r from-transparent via-blue-500/5 to-purple-500/5 p-1">
                        <div className="bg-white rounded-xl">
                          <CardContent className="p-6">
                            {editingGoalId === goal._id ? (
                              // Edit Mode
                              <div className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                  <div>
                                    <Label className="text-gray-700">
                                      Tiêu đề
                                    </Label>
                                    <Input
                                      value={editGoal.title || ""}
                                      onChange={(e) =>
                                        setEditGoal((prev) => ({
                                          ...prev,
                                          title: e.target.value,
                                        }))
                                      }
                                      className="border-blue-200"
                                    />
                                  </div>
                                  <div>
                                    <Label className="text-gray-700">
                                      Danh mục
                                    </Label>
                                    <Input
                                      value={editGoal.category || ""}
                                      onChange={(e) =>
                                        setEditGoal((prev) => ({
                                          ...prev,
                                          category: e.target.value,
                                        }))
                                      }
                                      className="border-blue-200"
                                    />
                                  </div>
                                </div>

                                <div>
                                  <Label className="text-gray-700">Mô tả</Label>
                                  <Textarea
                                    value={editGoal.description || ""}
                                    onChange={(e) =>
                                      setEditGoal((prev) => ({
                                        ...prev,
                                        description: e.target.value,
                                      }))
                                    }
                                    className="border-blue-200"
                                    rows={2}
                                  />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                  <div>
                                    <Label className="text-gray-700">
                                      Độ ưu tiên
                                    </Label>
                                    <Select
                                      value={editGoal.priority || goal.priority}
                                      onValueChange={(value: any) =>
                                        setEditGoal((prev) => ({
                                          ...prev,
                                          priority: value,
                                        }))
                                      }
                                    >
                                      <SelectTrigger className="border-blue-200">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {priorityOptions.map((option) => (
                                          <SelectItem
                                            key={option.value}
                                            value={option.value}
                                          >
                                            {option.icon} {option.label}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  <div>
                                    <Label className="text-gray-700">
                                      Trạng thái
                                    </Label>
                                    <Select
                                      value={editGoal.status || goal.status}
                                      onValueChange={(value: any) =>
                                        setEditGoal((prev) => ({
                                          ...prev,
                                          status: value,
                                        }))
                                      }
                                    >
                                      <SelectTrigger className="border-blue-200">
                                        <SelectValue />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {statusOptions.map((option) => (
                                          <SelectItem
                                            key={option.value}
                                            value={option.value}
                                          >
                                            {option.icon} {option.label}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>

                                  <div>
                                    <Label className="text-gray-700">
                                      Ngày mục tiêu
                                    </Label>
                                    <EnhancedDatePicker
                                      date={
                                        editGoal.targetDate
                                          ? new Date(editGoal.targetDate)
                                          : undefined
                                      }
                                      onDateChange={(date) =>
                                        setEditGoal((prev) => ({
                                          ...prev,
                                          targetDate: date
                                            ? date.toISOString().split("T")[0]
                                            : "",
                                        }))
                                      }
                                      placeholder="Chọn ngày mục tiêu"
                                      className="border-blue-200 rounded-xl"
                                      minDate={new Date()}
                                    />
                                  </div>
                                </div>

                                {/* Sub-goals editing section */}
                                <div className="mb-4">
                                  <Label className="text-gray-700 mb-2 block">
                                    Mục tiêu con
                                  </Label>

                                  {/* Display existing sub-goals in edit mode */}
                                  {editGoal.subGoals &&
                                    editGoal.subGoals.length > 0 && (
                                      <div className="space-y-2 mb-4 p-3 bg-blue-50 rounded-lg">
                                        {editGoal.subGoals.map(
                                          (subGoal, index) => (
                                            <div
                                              key={index}
                                              className="flex items-center gap-2 p-2 bg-white rounded border"
                                            >
                                              <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
                                                <Input
                                                  placeholder="Tiêu đề"
                                                  value={subGoal.title}
                                                  onChange={(e) => {
                                                    const updatedSubGoals = [
                                                      ...(editGoal.subGoals ||
                                                        []),
                                                    ];
                                                    updatedSubGoals[index] = {
                                                      ...subGoal,
                                                      title: e.target.value,
                                                    };
                                                    setEditGoal((prev) => ({
                                                      ...prev,
                                                      subGoals: updatedSubGoals,
                                                    }));
                                                  }}
                                                  className="border-blue-200 text-sm"
                                                />
                                                <Input
                                                  placeholder="Mô tả"
                                                  value={subGoal.description}
                                                  onChange={(e) => {
                                                    const updatedSubGoals = [
                                                      ...(editGoal.subGoals ||
                                                        []),
                                                    ];
                                                    updatedSubGoals[index] = {
                                                      ...subGoal,
                                                      description:
                                                        e.target.value,
                                                    };
                                                    setEditGoal((prev) => ({
                                                      ...prev,
                                                      subGoals: updatedSubGoals,
                                                    }));
                                                  }}
                                                  className="border-blue-200 text-sm"
                                                />
                                                <div className="flex gap-1">
                                                  <Select
                                                    value={subGoal.status}
                                                    onValueChange={(
                                                      value: any
                                                    ) => {
                                                      const updatedSubGoals = [
                                                        ...(editGoal.subGoals ||
                                                          []),
                                                      ];
                                                      updatedSubGoals[index] = {
                                                        ...subGoal,
                                                        status: value,
                                                      };
                                                      setEditGoal((prev) => ({
                                                        ...prev,
                                                        subGoals:
                                                          updatedSubGoals,
                                                      }));
                                                    }}
                                                  >
                                                    <SelectTrigger className="border-blue-200 text-sm">
                                                      <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                      {statusOptions.map(
                                                        (option) => (
                                                          <SelectItem
                                                            key={option.value}
                                                            value={option.value}
                                                          >
                                                            {option.icon}{" "}
                                                            {option.label}
                                                          </SelectItem>
                                                        )
                                                      )}
                                                    </SelectContent>
                                                  </Select>
                                                  <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() => {
                                                      const updatedSubGoals = (
                                                        editGoal.subGoals || []
                                                      ).filter(
                                                        (_, i) => i !== index
                                                      );
                                                      setEditGoal((prev) => ({
                                                        ...prev,
                                                        subGoals:
                                                          updatedSubGoals,
                                                      }));
                                                    }}
                                                    className="text-red-600 border-red-300 hover:bg-red-50"
                                                  >
                                                    <Minus className="w-3 h-3" />
                                                  </Button>
                                                </div>
                                              </div>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    )}

                                  {/* Add new sub-goal to edit */}
                                  <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                                    <Input
                                      placeholder="Tiêu đề mục tiêu con"
                                      value={newSubGoal.title}
                                      onChange={(e) =>
                                        setNewSubGoal((prev) => ({
                                          ...prev,
                                          title: e.target.value,
                                        }))
                                      }
                                      className="border-blue-200"
                                    />
                                    <Input
                                      placeholder="Mô tả"
                                      value={newSubGoal.description}
                                      onChange={(e) =>
                                        setNewSubGoal((prev) => ({
                                          ...prev,
                                          description: e.target.value,
                                        }))
                                      }
                                      className="border-blue-200"
                                    />
                                    <EnhancedDatePicker
                                      date={
                                        newSubGoal.targetDate
                                          ? new Date(newSubGoal.targetDate)
                                          : undefined
                                      }
                                      onDateChange={(date) =>
                                        setNewSubGoal((prev) => ({
                                          ...prev,
                                          targetDate: date
                                            ? date.toISOString().split("T")[0]
                                            : "",
                                        }))
                                      }
                                      placeholder="Ngày hoàn thành"
                                      className="border-blue-200 rounded-xl"
                                      minDate={new Date()}
                                    />
                                    <Button
                                      type="button"
                                      onClick={() => {
                                        if (!newSubGoal.title.trim()) return;
                                        setEditGoal((prev) => ({
                                          ...prev,
                                          subGoals: [
                                            ...(prev.subGoals || []),
                                            { ...newSubGoal },
                                          ],
                                        }));
                                        setNewSubGoal({
                                          title: "",
                                          description: "",
                                          status: "Not Started",
                                          targetDate: "",
                                        });
                                      }}
                                      variant="outline"
                                      className="border-blue-300 text-blue-600 hover:bg-blue-50"
                                    >
                                      <Plus className="w-4 h-4 mr-1" />
                                      Thêm
                                    </Button>
                                  </div>
                                </div>

                                <div className="flex gap-2">
                                  <Button
                                    onClick={() => handleEditGoal(goal._id)}
                                    disabled={isSubmitting}
                                    className="bg-green-600 hover:bg-green-700 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                  >
                                    <Save className="w-4 h-4 mr-2" />
                                    {isSubmitting ? "Đang lưu..." : "Lưu"}
                                  </Button>
                                  <Button
                                    onClick={cancelEditing}
                                    variant="outline"
                                    className="border-gray-300"
                                    disabled={isSubmitting}
                                  >
                                    <X className="w-4 h-4 mr-2" />
                                    Hủy
                                  </Button>
                                </div>
                              </div>
                            ) : (
                              // View Mode
                              <div>
                                <div className="flex justify-between items-start mb-3">
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                      {goal.subGoals &&
                                        goal.subGoals.length > 0 && (
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={() =>
                                              toggleGoalExpansion(goal._id)
                                            }
                                            className="p-0 h-auto"
                                          >
                                            {expandedGoals.has(goal._id) ? (
                                              <ChevronDown className="w-4 h-4 text-gray-500" />
                                            ) : (
                                              <ChevronRight className="w-4 h-4 text-gray-500" />
                                            )}
                                          </Button>
                                        )}
                                      <h3 className="text-lg font-semibold text-gray-900">
                                        {goal.title}
                                      </h3>
                                    </div>
                                    <p className="text-gray-600 mb-2">
                                      {goal.description}
                                    </p>
                                    {goal.category && (
                                      <span className="text-sm text-blue-600 bg-blue-50 px-2 py-1 rounded">
                                        {goal.category}
                                      </span>
                                    )}

                                    {/* Progress bar for goals with sub-goals */}
                                    {goal.subGoals &&
                                      goal.subGoals.length > 0 && (
                                        <div className="mt-3">
                                          <div className="flex items-center gap-2 mb-1">
                                            <span className="text-sm text-gray-600">
                                              Tiến độ:
                                            </span>
                                            <span className="text-sm font-medium text-blue-600">
                                              {getGoalProgress(goal)}%
                                            </span>
                                            <span className="text-xs text-gray-500">
                                              (
                                              {
                                                goal.subGoals.filter(
                                                  (sg) =>
                                                    sg.status === "Completed"
                                                ).length
                                              }
                                              /{goal.subGoals.length})
                                            </span>
                                          </div>
                                          <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                              className="bg-blue-600 h-2 rounded-full transition-all"
                                              style={{
                                                width: `${getGoalProgress(
                                                  goal
                                                )}%`,
                                              }}
                                            ></div>
                                          </div>
                                        </div>
                                      )}
                                  </div>
                                  <div className="flex gap-2 ml-4">
                                    <Button
                                      onClick={() =>
                                        setAddingSubGoalTo(
                                          addingSubGoalTo === goal._id
                                            ? null
                                            : goal._id
                                        )
                                      }
                                      variant="outline"
                                      size="sm"
                                      className="text-green-600 border-green-300 hover:bg-green-50 rounded-xl"
                                    >
                                      <PlusCircle className="w-4 h-4 mr-1" />
                                      Sub-goal
                                    </Button>
                                    <Button
                                      onClick={() => startEditing(goal)}
                                      variant="outline"
                                      size="sm"
                                      className="text-blue-600 border-blue-300 hover:bg-blue-50 rounded-xl"
                                    >
                                      <Edit2 className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      onClick={() => handleDeleteGoal(goal._id)}
                                      variant="outline"
                                      size="sm"
                                      className="text-red-600 border-red-300 hover:bg-red-50 rounded-xl"
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>

                                <div className="flex flex-wrap gap-3 mb-4">
                                  <Badge
                                    className={`${getPriorityColor(
                                      goal.priority
                                    )} px-3 py-1 rounded-full font-medium`}
                                  >
                                    <Flag className="w-3 h-3 mr-1" />
                                    {priorityOptions.find(
                                      (p) => p.value === goal.priority
                                    )?.label || goal.priority}
                                  </Badge>
                                  <Badge
                                    className={`${getStatusColor(
                                      goal.status
                                    )} px-3 py-1 rounded-full font-medium`}
                                  >
                                    {
                                      statusOptions.find(
                                        (s) => s.value === goal.status
                                      )?.icon
                                    }{" "}
                                    {statusOptions.find(
                                      (s) => s.value === goal.status
                                    )?.label || goal.status}
                                  </Badge>
                                  {goal.targetDate && (
                                    <Badge
                                      variant="outline"
                                      className="border-gray-300 px-3 py-1 rounded-full bg-gray-50"
                                    >
                                      <Calendar className="w-3 h-3 mr-1" />
                                      {new Date(
                                        goal.targetDate
                                      ).toLocaleDateString("vi-VN")}
                                    </Badge>
                                  )}
                                </div>

                                {/* Sub-goals section */}
                                {expandedGoals.has(goal._id) &&
                                  goal.subGoals && (
                                    <div className="mt-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
                                      <div className="flex items-center justify-between mb-4">
                                        <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                                          <Users className="w-4 h-4" />
                                          Mục tiêu con ({goal.subGoals.length})
                                        </h4>
                                        <Button
                                          onClick={() =>
                                            setAddingSubGoalTo(
                                              addingSubGoalTo === goal._id
                                                ? null
                                                : goal._id
                                            )
                                          }
                                          variant="outline"
                                          size="sm"
                                          className="text-indigo-600 border-indigo-300 hover:bg-indigo-50 rounded-xl"
                                        >
                                          <PlusCircle className="w-3 h-3 mr-1" />
                                          Thêm
                                        </Button>
                                      </div>
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {goal.subGoals.map((subGoal, index) => (
                                          <div
                                            key={index}
                                            className="flex items-start gap-3 p-4 bg-white rounded-xl border border-gray-100 shadow-sm transition-all"
                                          >
                                            <Button
                                              variant="link"
                                              size="sm"
                                              onClick={() =>
                                                updateSubGoal(goal._id, index, {
                                                  ...subGoal,
                                                  status:
                                                    subGoal.status ===
                                                    "Completed"
                                                      ? "Not Started"
                                                      : "Completed",
                                                })
                                              }
                                              className="p-0 h-auto mt-1"
                                            >
                                              {subGoal.status ===
                                              "Completed" ? (
                                                <CheckCircle className="w-5 h-5 text-green-600" />
                                              ) : (
                                                <Circle className="w-5 h-5 text-gray-400" />
                                              )}
                                            </Button>
                                            <div className="flex-1 min-w-0">
                                              <h5
                                                className={`text-sm font-medium ${
                                                  subGoal.status === "Completed"
                                                    ? "line-through text-gray-500"
                                                    : "text-gray-900"
                                                }`}
                                              >
                                                {subGoal.title}
                                              </h5>
                                              {subGoal.description && (
                                                <p className="text-xs text-gray-600 mt-1 line-clamp-2">
                                                  {subGoal.description}
                                                </p>
                                              )}
                                              {subGoal.targetDate && (
                                                <div className="flex items-center gap-1 mt-2">
                                                  <Clock className="w-3 h-3 text-gray-400" />
                                                  <span className="text-xs text-gray-500">
                                                    {new Date(
                                                      subGoal.targetDate
                                                    ).toLocaleDateString(
                                                      "vi-VN"
                                                    )}
                                                  </span>
                                                </div>
                                              )}
                                            </div>
                                            <div className="flex flex-col gap-1">
                                              <Badge
                                                className={`${getStatusColor(
                                                  subGoal.status
                                                )} text-xs px-2 py-1`}
                                              >
                                                {
                                                  statusOptions.find(
                                                    (s) =>
                                                      s.value === subGoal.status
                                                  )?.icon
                                                }
                                              </Badge>
                                              <Button
                                                onClick={() =>
                                                  deleteSubGoal(goal._id, index)
                                                }
                                                variant="ghost"
                                                size="sm"
                                                className="text-red-600 hover:bg-red-50 p-1 h-6 w-6 rounded"
                                              >
                                                <Trash2 className="w-3 h-3" />
                                              </Button>
                                            </div>
                                          </div>
                                        ))}
                                      </div>
                                    </div>
                                  )}

                                {/* Add sub-goal form */}
                                {addingSubGoalTo === goal._id && (
                                  <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200">
                                    <div className="flex items-center justify-between mb-4">
                                      <h4 className="text-sm font-semibold text-green-800 flex items-center gap-2">
                                        <PlusCircle className="w-4 h-4" />
                                        Thêm mục tiêu con mới
                                      </h4>
                                      <Button
                                        onClick={() => setAddingSubGoalTo(null)}
                                        variant="ghost"
                                        size="sm"
                                        className="text-gray-500 hover:text-gray-700 h-6 w-6 p-0 rounded"
                                      >
                                        <X className="w-3 h-3" />
                                      </Button>
                                    </div>
                                    <div className="space-y-4">
                                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                          <Label className="text-green-700 font-medium text-xs">
                                            Tiêu đề *
                                          </Label>
                                          <Input
                                            placeholder="Tên mục tiêu con"
                                            value={newSubGoal.title}
                                            onChange={(e) =>
                                              setNewSubGoal((prev) => ({
                                                ...prev,
                                                title: e.target.value,
                                              }))
                                            }
                                            className="border-green-200 focus:border-green-400 rounded-xl mt-1"
                                          />
                                        </div>
                                        <div>
                                          <Label className="text-green-700 font-medium text-xs">
                                            Ngày mục tiêu
                                          </Label>
                                          <EnhancedDatePicker
                                            date={
                                              newSubGoal.targetDate
                                                ? new Date(
                                                    newSubGoal.targetDate
                                                  )
                                                : undefined
                                            }
                                            onDateChange={(date) =>
                                              setNewSubGoal((prev) => ({
                                                ...prev,
                                                targetDate: date
                                                  ? date
                                                      .toISOString()
                                                      .split("T")[0]
                                                  : "",
                                              }))
                                            }
                                            placeholder="Chọn ngày hoàn thành"
                                            className="border-green-200 focus:border-green-400 rounded-xl mt-1"
                                            minDate={new Date()}
                                          />
                                        </div>
                                      </div>
                                      <div>
                                        <Label className="text-green-700 font-medium text-xs">
                                          Mô tả (tùy chọn)
                                        </Label>
                                        <Textarea
                                          placeholder="Mô tả chi tiết về mục tiêu con này..."
                                          value={newSubGoal.description}
                                          onChange={(e) =>
                                            setNewSubGoal((prev) => ({
                                              ...prev,
                                              description: e.target.value,
                                            }))
                                          }
                                          className="border-green-200 focus:border-green-400 rounded-xl mt-1 resize-none"
                                          rows={2}
                                        />
                                      </div>
                                      <div className="flex justify-end gap-2">
                                        <Button
                                          onClick={() =>
                                            setAddingSubGoalTo(null)
                                          }
                                          variant="outline"
                                          size="sm"
                                          className="border-gray-300 text-gray-600 hover:bg-gray-50 rounded-xl"
                                        >
                                          Hủy
                                        </Button>
                                        <Button
                                          onClick={() =>
                                            addSubGoalToExisting(goal._id)
                                          }
                                          size="sm"
                                          className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-4 disabled:opacity-50 disabled:cursor-not-allowed"
                                          disabled={
                                            !newSubGoal.title.trim() ||
                                            isSubmitting
                                          }
                                        >
                                          <Plus className="w-3 h-3 mr-1" />
                                          {isSubmitting
                                            ? "Đang thêm..."
                                            : "Thêm mục tiêu con"}
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                )}

                                <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
                                  <div className="flex items-center gap-4 text-xs text-gray-500">
                                    <div className="flex items-center gap-1">
                                      <Calendar className="w-3 h-3" />
                                      <span>
                                        Tạo:{" "}
                                        {new Date(
                                          goal.createdAt
                                        ).toLocaleDateString("vi-VN")}
                                      </span>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <Clock className="w-3 h-3" />
                                      <span>
                                        Cập nhật:{" "}
                                        {new Date(
                                          goal.updatedAt
                                        ).toLocaleDateString("vi-VN")}
                                      </span>
                                    </div>
                                  </div>
                                  {goal.subGoals &&
                                    goal.subGoals.length > 0 && (
                                      <Button
                                        onClick={() =>
                                          toggleGoalExpansion(goal._id)
                                        }
                                        variant="ghost"
                                        size="sm"
                                        className="text-indigo-600 hover:bg-indigo-50 rounded-xl px-3 py-1"
                                      >
                                        {expandedGoals.has(goal._id) ? (
                                          <>
                                            <ChevronDown className="w-4 h-4 mr-1" />
                                            Thu gọn
                                          </>
                                        ) : (
                                          <>
                                            <ChevronRight className="w-4 h-4 mr-1" />
                                            Xem chi tiết
                                          </>
                                        )}
                                      </Button>
                                    )}
                                </div>
                              </div>
                            )}
                          </CardContent>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </CardContent>
          </div>
        </Card>
      </div>
    </div>
  );
}
