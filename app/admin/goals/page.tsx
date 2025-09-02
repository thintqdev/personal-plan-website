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

export default function GoalsAdminPage() {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAddingGoal, setIsAddingGoal] = useState(false);
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
    if (!newGoal.title.trim() || !newGoal.description.trim()) {
      alert("Vui lòng nhập tiêu đề và mô tả mục tiêu");
      return;
    }

    try {
      setIsAddingGoal(true);
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
    } catch (error) {
      console.error("Failed to add goal:", error);
      alert("Không thể thêm mục tiêu");
    } finally {
      setIsAddingGoal(false);
    }
  };

  const handleEditGoal = async (goalId: string) => {
    if (!editGoal.title?.trim() && !editGoal.description?.trim()) {
      alert("Vui lòng nhập ít nhất tiêu đề hoặc mô tả");
      return;
    }

    try {
      const updatedGoal = await updateGoal(goalId, editGoal);
      setGoals((prev) =>
        prev.map((goal) => (goal._id === goalId ? updatedGoal : goal))
      );
      setEditingGoalId(null);
      setEditGoal({});
    } catch (error) {
      console.error("Failed to update goal:", error);
      alert("Không thể cập nhật mục tiêu");
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
    if (!newSubGoal.title.trim()) return;

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
    if (!newSubGoal.title.trim()) return;

    const goal = goals.find((g) => g._id === goalId);
    if (!goal) return;

    try {
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
    } catch (error) {
      console.error("Failed to add sub-goal:", error);
      alert("Không thể thêm mục tiêu con");
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

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800 border-green-200";
      case "In Progress":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "On Hold":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Not Started":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const priorityOptions = [
    { value: "Low", label: "Thấp", icon: "🟢" },
    { value: "Medium", label: "Trung bình", icon: "🟡" },
    { value: "High", label: "Cao", icon: "🔴" },
  ];

  const statusOptions = [
    { value: "Not Started", label: "Chưa bắt đầu", icon: "⏸️" },
    { value: "In Progress", label: "Đang thực hiện", icon: "▶️" },
    { value: "On Hold", label: "Tạm dừng", icon: "⏸️" },
    { value: "Completed", label: "Hoàn thành", icon: "✅" },
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
              <Target className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Quay lại Dashboard
            </Button>
          </Link>

          <div className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Quản lý mục tiêu
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Tạo, chỉnh sửa và theo dõi các mục tiêu của bạn
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Add New Goal Form */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
          <CardHeader className="bg-indigo-600 text-white">
            <CardTitle className="flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Thêm mục tiêu mới
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label
                  htmlFor="title"
                  className="text-gray-700 font-medium mb-2 block"
                >
                  Tiêu đề mục tiêu *
                </Label>
                <Input
                  id="title"
                  placeholder="Ví dụ: Học tiếng Nhật N3"
                  value={newGoal.title}
                  onChange={(e) =>
                    setNewGoal((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="border-gray-200 focus:border-indigo-400 focus:ring-indigo-400 rounded-xl h-12"
                />
              </div>
              <div>
                <Label
                  htmlFor="category"
                  className="text-gray-700 font-medium mb-2 block"
                >
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
                  className="border-gray-200 focus:border-indigo-400 focus:ring-indigo-400 rounded-xl h-12"
                />
              </div>
            </div>

            <div>
              <Label
                htmlFor="description"
                className="text-gray-700 font-medium mb-2 block"
              >
                Mô tả mục tiêu *
              </Label>
              <Textarea
                id="description"
                placeholder="Mô tả chi tiết về mục tiêu này..."
                value={newGoal.description}
                onChange={(e) =>
                  setNewGoal((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                className="border-gray-200 focus:border-indigo-400 focus:ring-indigo-400 rounded-xl resize-none"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label className="text-gray-700 font-medium mb-2 block">
                  Độ ưu tiên
                </Label>
                <Select
                  value={newGoal.priority}
                  onValueChange={(value: any) =>
                    setNewGoal((prev) => ({ ...prev, priority: value }))
                  }
                >
                  <SelectTrigger className="border-gray-200 focus:border-indigo-400 rounded-xl h-12 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 rounded-xl shadow-lg">
                    {priorityOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.icon} {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-gray-700 font-medium mb-2 block">
                  Trạng thái
                </Label>
                <Select
                  value={newGoal.status}
                  onValueChange={(value: any) =>
                    setNewGoal((prev) => ({ ...prev, status: value }))
                  }
                >
                  <SelectTrigger className="border-gray-200 focus:border-indigo-400 rounded-xl h-12 bg-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 rounded-xl shadow-lg">
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.icon} {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label
                  htmlFor="targetDate"
                  className="text-gray-700 font-medium mb-2 block"
                >
                  Ngày mục tiêu
                </Label>
                <Input
                  id="targetDate"
                  type="date"
                  value={newGoal.targetDate}
                  onChange={(e) =>
                    setNewGoal((prev) => ({
                      ...prev,
                      targetDate: e.target.value,
                    }))
                  }
                  className="border-gray-200 focus:border-indigo-400 focus:ring-indigo-400 rounded-xl h-12"
                />
              </div>
            </div>

            {/* Sub-goals section for new goal */}
            <div>
              <Label className="text-gray-700 font-medium mb-3 block">
                Mục tiêu con
              </Label>

              {/* Display existing sub-goals */}
              {newGoal.subGoals && newGoal.subGoals.length > 0 && (
                <div className="space-y-3 mb-4 p-4 bg-indigo-50 rounded-xl">
                  {newGoal.subGoals.map((subGoal, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-200 shadow-sm"
                    >
                      <div className="flex-1">
                        <span className="font-medium text-sm text-gray-900">
                          {subGoal.title}
                        </span>
                        {subGoal.description && (
                          <p className="text-xs text-gray-600 mt-1">
                            {subGoal.description}
                          </p>
                        )}
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSubGoalFromNewGoal(index)}
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Add new sub-goal form */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <Input
                  placeholder="Tiêu đề mục tiêu con"
                  value={newSubGoal.title}
                  onChange={(e) =>
                    setNewSubGoal((prev) => ({
                      ...prev,
                      title: e.target.value,
                    }))
                  }
                  className="border-gray-200 focus:border-indigo-400 rounded-xl h-10"
                />
                <Input
                  placeholder="Mô tả (tùy chọn)"
                  value={newSubGoal.description}
                  onChange={(e) =>
                    setNewSubGoal((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  className="border-blue-200"
                />
                <Input
                  type="date"
                  value={newSubGoal.targetDate}
                  onChange={(e) =>
                    setNewSubGoal((prev) => ({
                      ...prev,
                      targetDate: e.target.value,
                    }))
                  }
                  className="border-blue-200"
                />
                <Button
                  type="button"
                  onClick={addSubGoalToNewGoal}
                  variant="outline"
                  className="border-blue-300 text-blue-600 hover:bg-blue-50"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Thêm
                </Button>
              </div>
            </div>

            <Button
              onClick={handleAddGoal}
              disabled={isAddingGoal}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              {isAddingGoal ? "Đang thêm..." : "Thêm mục tiêu"}
            </Button>
          </CardContent>
        </Card>

        {/* Goals List */}
        <Card className="bg-white/80 backdrop-blur-sm border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800">
              <BookOpen className="w-5 h-5" />
              Danh sách mục tiêu ({goals.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
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
              <div className="text-center py-12">
                <Target className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Chưa có mục tiêu nào</p>
                <p className="text-gray-400">
                  Hãy thêm mục tiêu đầu tiên của bạn!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {goals.map((goal) => (
                  <div
                    key={goal._id}
                    className="p-4 bg-white rounded-xl border border-blue-100 shadow-sm hover:shadow-md transition-shadow"
                  >
                    {editingGoalId === goal._id ? (
                      // Edit Mode
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-gray-700">Tiêu đề</Label>
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
                            <Label className="text-gray-700">Danh mục</Label>
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
                            <Label className="text-gray-700">Độ ưu tiên</Label>
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
                            <Label className="text-gray-700">Trạng thái</Label>
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
                            <Input
                              type="date"
                              value={editGoal.targetDate || ""}
                              onChange={(e) =>
                                setEditGoal((prev) => ({
                                  ...prev,
                                  targetDate: e.target.value,
                                }))
                              }
                              className="border-blue-200"
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
                                {editGoal.subGoals.map((subGoal, index) => (
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
                                            ...(editGoal.subGoals || []),
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
                                            ...(editGoal.subGoals || []),
                                          ];
                                          updatedSubGoals[index] = {
                                            ...subGoal,
                                            description: e.target.value,
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
                                          onValueChange={(value: any) => {
                                            const updatedSubGoals = [
                                              ...(editGoal.subGoals || []),
                                            ];
                                            updatedSubGoals[index] = {
                                              ...subGoal,
                                              status: value,
                                            };
                                            setEditGoal((prev) => ({
                                              ...prev,
                                              subGoals: updatedSubGoals,
                                            }));
                                          }}
                                        >
                                          <SelectTrigger className="border-blue-200 text-sm">
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
                                        <Button
                                          type="button"
                                          variant="outline"
                                          size="sm"
                                          onClick={() => {
                                            const updatedSubGoals = (
                                              editGoal.subGoals || []
                                            ).filter((_, i) => i !== index);
                                            setEditGoal((prev) => ({
                                              ...prev,
                                              subGoals: updatedSubGoals,
                                            }));
                                          }}
                                          className="text-red-600 border-red-300 hover:bg-red-50"
                                        >
                                          <Minus className="w-3 h-3" />
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                ))}
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
                            <Input
                              type="date"
                              value={newSubGoal.targetDate}
                              onChange={(e) =>
                                setNewSubGoal((prev) => ({
                                  ...prev,
                                  targetDate: e.target.value,
                                }))
                              }
                              className="border-blue-200"
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
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            Lưu
                          </Button>
                          <Button
                            onClick={cancelEditing}
                            variant="outline"
                            className="border-gray-300"
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
                              {goal.subGoals && goal.subGoals.length > 0 && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleGoalExpansion(goal._id)}
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
                            {goal.subGoals && goal.subGoals.length > 0 && (
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
                                        (sg) => sg.status === "Completed"
                                      ).length
                                    }
                                    /{goal.subGoals.length})
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div
                                    className="bg-blue-600 h-2 rounded-full transition-all"
                                    style={{
                                      width: `${getGoalProgress(goal)}%`,
                                    }}
                                  ></div>
                                </div>
                              </div>
                            )}
                          </div>
                          <div className="flex gap-2 ml-4">
                            {goal.subGoals && goal.subGoals.length > 0 && (
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
                                className="text-green-600 border-green-300 hover:bg-green-50"
                              >
                                <Plus className="w-4 h-4" />
                              </Button>
                            )}
                            <Button
                              onClick={() => startEditing(goal)}
                              variant="outline"
                              size="sm"
                              className="text-blue-600 border-blue-300 hover:bg-blue-50"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              onClick={() => handleDeleteGoal(goal._id)}
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-300 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                          <Badge className={getPriorityColor(goal.priority)}>
                            <Flag className="w-3 h-3 mr-1" />
                            {priorityOptions.find(
                              (p) => p.value === goal.priority
                            )?.label || goal.priority}
                          </Badge>
                          <Badge className={getStatusColor(goal.status)}>
                            {
                              statusOptions.find((s) => s.value === goal.status)
                                ?.icon
                            }{" "}
                            {statusOptions.find((s) => s.value === goal.status)
                              ?.label || goal.status}
                          </Badge>
                          {goal.targetDate && (
                            <Badge
                              variant="outline"
                              className="border-gray-300"
                            >
                              <Calendar className="w-3 h-3 mr-1" />
                              {new Date(goal.targetDate).toLocaleDateString(
                                "vi-VN"
                              )}
                            </Badge>
                          )}
                        </div>

                        {/* Sub-goals section */}
                        {expandedGoals.has(goal._id) && goal.subGoals && (
                          <div className="mt-4 ml-6 space-y-2">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">
                              Mục tiêu con:
                            </h4>
                            {goal.subGoals.map((subGoal, index) => (
                              <div
                                key={index}
                                className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
                              >
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    updateSubGoal(goal._id, index, {
                                      ...subGoal,
                                      status:
                                        subGoal.status === "Completed"
                                          ? "Not Started"
                                          : "Completed",
                                    })
                                  }
                                  className="p-0 h-auto"
                                >
                                  {subGoal.status === "Completed" ? (
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                  ) : (
                                    <Circle className="w-4 h-4 text-gray-400" />
                                  )}
                                </Button>
                                <div className="flex-1">
                                  <span
                                    className={`text-sm font-medium ${
                                      subGoal.status === "Completed"
                                        ? "line-through text-gray-500"
                                        : "text-gray-900"
                                    }`}
                                  >
                                    {subGoal.title}
                                  </span>
                                  {subGoal.description && (
                                    <p className="text-xs text-gray-600 mt-1">
                                      {subGoal.description}
                                    </p>
                                  )}
                                  {subGoal.targetDate && (
                                    <p className="text-xs text-gray-500 mt-1">
                                      Hạn:{" "}
                                      {new Date(
                                        subGoal.targetDate
                                      ).toLocaleDateString("vi-VN")}
                                    </p>
                                  )}
                                </div>
                                <Badge
                                  className={getStatusColor(subGoal.status)}
                                >
                                  {
                                    statusOptions.find(
                                      (s) => s.value === subGoal.status
                                    )?.icon
                                  }
                                </Badge>
                                <Button
                                  onClick={() => deleteSubGoal(goal._id, index)}
                                  variant="ghost"
                                  size="sm"
                                  className="text-red-600 hover:bg-red-50 p-1"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Add sub-goal form */}
                        {addingSubGoalTo === goal._id && (
                          <div className="mt-4 ml-6 p-3 bg-green-50 rounded-lg">
                            <h4 className="text-sm font-medium text-gray-700 mb-2">
                              Thêm mục tiêu con:
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                              <Input
                                placeholder="Tiêu đề"
                                value={newSubGoal.title}
                                onChange={(e) =>
                                  setNewSubGoal((prev) => ({
                                    ...prev,
                                    title: e.target.value,
                                  }))
                                }
                                className="border-green-200"
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
                                className="border-green-200"
                              />
                              <Input
                                type="date"
                                value={newSubGoal.targetDate}
                                onChange={(e) =>
                                  setNewSubGoal((prev) => ({
                                    ...prev,
                                    targetDate: e.target.value,
                                  }))
                                }
                                className="border-green-200"
                              />
                              <div className="flex gap-1">
                                <Button
                                  onClick={() => addSubGoalToExisting(goal._id)}
                                  size="sm"
                                  className="bg-green-600 hover:bg-green-700 text-white flex-1"
                                >
                                  <Plus className="w-3 h-3 mr-1" />
                                  Thêm
                                </Button>
                                <Button
                                  onClick={() => setAddingSubGoalTo(null)}
                                  variant="outline"
                                  size="sm"
                                  className="border-gray-300"
                                >
                                  <X className="w-3 h-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="text-xs text-gray-500">
                          Tạo:{" "}
                          {new Date(goal.createdAt).toLocaleDateString("vi-VN")}{" "}
                          | Cập nhật:{" "}
                          {new Date(goal.updatedAt).toLocaleDateString("vi-VN")}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
