"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Calendar,
  Plus,
  Trash2,
  Edit3,
  CheckCircle2,
  Clock,
  Target,
  ListTodo,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import {
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  type Task,
  type CreateTaskRequest,
  type UpdateTaskRequest,
} from "@/lib/task-service";

export default function AdminTasksPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTask, setNewTask] = useState<CreateTaskRequest>({
    day: "Thứ Hai",
    time: "08:00 – 09:00",
    task: "",
    type: "personal",
  });
  // Time validation helper functions
  const parseTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(":").map(Number);
    return hours * 60 + minutes; // Convert to minutes for easier comparison
  };

  const parseTimeRange = (timeRange: string) => {
    const [startTime, endTime] = timeRange.split(" – ");
    return {
      start: parseTime(startTime.trim()),
      end: parseTime(endTime.trim()),
    };
  };

  const checkTimeConflict = (
    newTimeRange: string,
    newDay: string,
    excludeTaskId?: string
  ) => {
    const newRange = parseTimeRange(newTimeRange);

    // Find tasks for the same day
    const sameDayTasks = tasks.filter(
      (task) => task.day === newDay && task._id !== excludeTaskId
    );

    for (const existingTask of sameDayTasks) {
      const existingRange = parseTimeRange(existingTask.time);

      // Check for overlap: new task starts before existing ends AND new task ends after existing starts
      if (
        newRange.start < existingRange.end &&
        newRange.end > existingRange.start
      ) {
        return {
          hasConflict: true,
          conflictingTask: existingTask,
        };
      }
    }

    return { hasConflict: false };
  };

  const validateTimeRange = (timeRange: string) => {
    if (!timeRange.includes(" – ")) {
      return "Vui lòng nhập đầy đủ thời gian bắt đầu và kết thúc";
    }

    const range = parseTimeRange(timeRange);
    if (range.start >= range.end) {
      return "Thời gian kết thúc phải sau thời gian bắt đầu";
    }

    return null;
  };

  const validateTaskContent = (content: string) => {
    if (!content.trim()) {
      return "Nội dung nhiệm vụ không được để trống";
    }

    if (content.length > 255) {
      return "Nội dung nhiệm vụ không được vượt quá 255 ký tự";
    }

    return null;
  };

  const getCharacterCountColor = (length: number) => {
    if (length > 255) return "text-red-600";
    if (length > 240) return "text-amber-600";
    return "text-gray-500";
  };

  const [validationError, setValidationError] = useState<string>("");
  const [editTask, setEditTask] = useState<UpdateTaskRequest>({
    day: "Thứ Hai",
    time: "08:00 – 09:00",
    task: "",
    type: "personal",
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load tasks
  useEffect(() => {
    const loadTasks = async () => {
      if (!isMounted) return;

      try {
        setIsLoading(true);
        const data = await getTasks();
        setTasks(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to load tasks:", error);
        setTasks([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadTasks();
  }, [isMounted]);

  // Add new task
  const handleAddTask = async () => {
    // Validate task content
    const contentError = validateTaskContent(newTask.task);
    if (contentError) {
      setValidationError(contentError);
      return;
    }

    // Validate time range
    const timeError = validateTimeRange(newTask.time);
    if (timeError) {
      setValidationError(timeError);
      return;
    }

    // Check for time conflicts
    const conflict = checkTimeConflict(newTask.time, newTask.day);
    if (conflict.hasConflict) {
      setValidationError(
        `Thời gian bị trùng với nhiệm vụ: "${conflict.conflictingTask?.task}" (${conflict.conflictingTask?.time})`
      );
      return;
    }

    setValidationError("");

    try {
      const created = await addTask(newTask);
      setTasks([...tasks, created]);
      setNewTask({
        day: "Thứ Hai",
        time: "08:00 – 09:00",
        task: "",
        type: "personal",
      });
      setIsAdding(false);
    } catch (error) {
      console.error("Failed to create task:", error);
      setValidationError("Không thể tạo nhiệm vụ. Vui lòng thử lại.");
    }
  };

  // Start editing task
  const startEdit = (task: Task) => {
    setEditTask({
      day: task.day || "Thứ Hai",
      time: task.time,
      task: task.task,
      type: task.type,
    });
    setEditingId(task._id);
    setValidationError(""); // Clear any previous errors
  };

  // Save edited task
  const handleEditTask = async () => {
    if (!editingId) return;

    // Validate task content
    const contentError = validateTaskContent(editTask.task || "");
    if (contentError) {
      setValidationError(contentError);
      return;
    }

    // Validate time range
    const timeError = validateTimeRange(editTask.time || "");
    if (timeError) {
      setValidationError(timeError);
      return;
    }

    // Check for time conflicts (exclude current task being edited)
    const conflict = checkTimeConflict(
      editTask.time!,
      editTask.day!,
      editingId
    );
    if (conflict.hasConflict) {
      setValidationError(
        `Thời gian bị trùng với nhiệm vụ: "${conflict.conflictingTask?.task}" (${conflict.conflictingTask?.time})`
      );
      return;
    }

    setValidationError("");

    try {
      const updated = await updateTask(editingId, editTask);
      setTasks(tasks.map((task) => (task._id === editingId ? updated : task)));
      setEditingId(null);
    } catch (error) {
      console.error("Failed to update task:", error);
      setValidationError("Không thể cập nhật nhiệm vụ. Vui lòng thử lại.");
    }
  };

  // Toggle task completion
  const toggleComplete = async (task: Task) => {
    try {
      const updated = await updateTask(task._id, {
        day: task.day,
        time: task.time,
        task: task.task,
        type: task.type,
        completed: !task.completed,
      } as any);
      setTasks(tasks.map((t) => (t._id === task._id ? updated : t)));
    } catch (error) {
      console.error("Failed to toggle task:", error);
    }
  };

  // Delete task
  const handleDeleteTask = async (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa nhiệm vụ này không?")) return;

    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const dayOptions = [
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
    "Chủ Nhật",
  ];

  const typeOptions = [
    { value: "personal", label: "Cá nhân", color: "bg-blue-600" },
    {
      value: "work",
      label: "Công việc",
      color: "bg-purple-600",
    },
    {
      value: "health",
      label: "Sức khỏe",
      color: "bg-green-600",
    },
    {
      value: "study",
      label: "Học tập",
      color: "bg-orange-600",
    },
    { value: "hobby", label: "Sở thích", color: "bg-pink-600" },
  ];

  const getDayDisplay = (day?: string) => {
    return day || "Không xác định";
  };

  const getTypeConfig = (type: string) => {
    const typeOption = typeOptions.find((option) => option.value === type);
    return typeOption || typeOptions[0];
  };

  const getCompletedTasksCount = () => {
    return tasks.filter((task) => task.completed).length;
  };

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

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <ListTodo className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Nhiệm vụ hàng ngày
                </h1>
                <p className="text-gray-600 mt-1">
                  Tổ chức và quản lý các nhiệm vụ theo thời gian
                </p>
              </div>
            </div>

            <Button
              onClick={() => {
                setIsAdding(!isAdding);
                setValidationError(""); // Clear any previous errors
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              <Plus className="w-4 h-4 mr-2" />
              Thêm nhiệm vụ
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-1"></div>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-1"></div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Tổng nhiệm vụ
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        {tasks.length}
                      </p>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl">
                      <ListTodo className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-1"></div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Đã hoàn thành
                      </p>
                      <p className="text-3xl font-bold text-green-600">
                        {getCompletedTasksCount()}
                      </p>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-amber-500 to-orange-600 h-1"></div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">
                        Tỷ lệ hoàn thành
                      </p>
                      <p className="text-3xl font-bold text-amber-600">
                        {tasks.length > 0
                          ? Math.round(
                              (getCompletedTasksCount() / tasks.length) * 100
                            )
                          : 0}
                        %
                      </p>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* Add Task Form */}
        {isAdding && (
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-1"></div>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-800">
                <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                Tạo nhiệm vụ mới
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {validationError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                  <p className="text-sm font-medium">{validationError}</p>
                </div>
              )}
              <div>
                <Label
                  htmlFor="task"
                  className="text-gray-700 font-medium mb-2 block"
                >
                  Nội dung nhiệm vụ
                </Label>
                <Input
                  id="task"
                  value={newTask.task}
                  onChange={(e) =>
                    setNewTask({ ...newTask, task: e.target.value })
                  }
                  onFocus={() => setValidationError("")} // Clear errors when user starts typing
                  placeholder="Nhập nội dung nhiệm vụ..."
                  className="border-gray-200 focus:border-indigo-400 focus:ring-indigo-400 rounded-xl h-12"
                  maxLength={255}
                />
                <div className="flex justify-between items-center mt-1">
                  <span className="text-xs text-gray-500">
                    Tối đa 255 ký tự
                  </span>
                  <span
                    className={`text-xs ${getCharacterCountColor(
                      newTask.task.length
                    )}`}
                  >
                    {newTask.task.length}/255
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <Label className="text-gray-700 font-medium mb-2 block">
                    Ngày trong tuần
                  </Label>
                  <Select
                    value={newTask.day}
                    onValueChange={(value) => {
                      setNewTask({ ...newTask, day: value });
                      setValidationError(""); // Clear errors on day change
                    }}
                  >
                    <SelectTrigger className="border-gray-200 focus:border-indigo-400 rounded-xl h-12 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200 rounded-xl shadow-lg">
                      {dayOptions.map((day) => (
                        <SelectItem key={day} value={day}>
                          {getDayDisplay(day)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label
                    htmlFor="time"
                    className="text-gray-700 font-medium mb-2 block"
                  >
                    Thời gian (Từ - Đến)
                  </Label>
                  <div className="flex gap-2 items-center">
                    <Input
                      type="time"
                      value={newTask.time.split(" – ")[0] || "08:00"}
                      onChange={(e) => {
                        const fromTime = e.target.value;
                        const toTime = newTask.time.split(" – ")[1] || "09:00";
                        setNewTask({
                          ...newTask,
                          time: `${fromTime} – ${toTime}`,
                        });
                        setValidationError(""); // Clear errors on time change
                      }}
                      className="border-gray-200 focus:border-indigo-400 focus:ring-indigo-400 rounded-xl h-12 flex-1"
                    />
                    <span className="text-gray-500 font-medium">–</span>
                    <Input
                      type="time"
                      value={newTask.time.split(" – ")[1] || "09:00"}
                      onChange={(e) => {
                        const fromTime =
                          newTask.time.split(" – ")[0] || "08:00";
                        const toTime = e.target.value;
                        setNewTask({
                          ...newTask,
                          time: `${fromTime} – ${toTime}`,
                        });
                        setValidationError(""); // Clear errors on time change
                      }}
                      className="border-gray-200 focus:border-indigo-400 focus:ring-indigo-400 rounded-xl h-12 flex-1"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-gray-700 font-medium mb-2 block">
                    Loại nhiệm vụ
                  </Label>
                  <Select
                    value={newTask.type}
                    onValueChange={(value) =>
                      setNewTask({ ...newTask, type: value })
                    }
                  >
                    <SelectTrigger className="border-gray-200 focus:border-indigo-400 rounded-xl h-12 bg-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200 rounded-xl shadow-lg">
                      {typeOptions.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handleAddTask}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-3 rounded-xl flex-1 shadow-lg hover:shadow-xl transition-all duration-200"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tạo nhiệm vụ
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsAdding(false);
                    setValidationError(""); // Clear errors when canceling
                  }}
                  className="px-6 py-3 rounded-xl border-gray-200 hover:bg-gray-50"
                >
                  Hủy
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tasks List */}
        <div className="space-y-4">
          {isLoading ? (
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
              <CardContent className="p-12 text-center">
                <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 font-medium">
                  Đang tải nhiệm vụ...
                </p>
              </CardContent>
            </Card>
          ) : tasks.length === 0 ? (
            <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
              <CardContent className="p-12 text-center">
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ListTodo className="w-10 h-10 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Chưa có nhiệm vụ nào
                </h3>
                <p className="text-gray-600 mb-6">
                  Hãy tạo nhiệm vụ đầu tiên để bắt đầu lập kế hoạch!
                </p>
                <Button
                  onClick={() => setIsAdding(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tạo nhiệm vụ đầu tiên
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {tasks.map((task) => (
                <Card
                  key={task._id}
                  className={`bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl overflow-hidden ${
                    task.completed ? "opacity-75" : ""
                  }`}
                >
                  <CardContent className="p-0">
                    {editingId === task._id ? (
                      // Edit Mode
                      <div className="p-6 space-y-6">
                        {validationError && (
                          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                            <p className="text-sm font-medium">
                              {validationError}
                            </p>
                          </div>
                        )}
                        <div>
                          <Label className="text-gray-700 font-medium mb-2 block">
                            Nội dung nhiệm vụ
                          </Label>
                          <Input
                            value={editTask.task}
                            onChange={(e) => {
                              setEditTask({
                                ...editTask,
                                task: e.target.value,
                              });
                              setValidationError(""); // Clear errors on input change
                            }}
                            className="border-gray-200 focus:border-indigo-400 focus:ring-indigo-400 rounded-xl h-12"
                            maxLength={255}
                          />
                          <div className="flex justify-between items-center mt-1">
                            <span className="text-xs text-gray-500">
                              Tối đa 255 ký tự
                            </span>
                            <span
                              className={`text-xs ${getCharacterCountColor(
                                editTask.task?.length || 0
                              )}`}
                            >
                              {editTask.task?.length || 0}/255
                            </span>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div>
                            <Label className="text-gray-700 font-medium mb-2 block">
                              Ngày trong tuần
                            </Label>
                            <Select
                              value={editTask.day}
                              onValueChange={(value) => {
                                setEditTask({ ...editTask, day: value });
                                setValidationError(""); // Clear errors on day change
                              }}
                            >
                              <SelectTrigger className="border-gray-200 focus:border-indigo-400 rounded-xl h-12 bg-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-white border-gray-200 rounded-xl shadow-lg">
                                {dayOptions.map((day) => (
                                  <SelectItem key={day} value={day}>
                                    {getDayDisplay(day)}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <Label className="text-gray-700 font-medium mb-2 block">
                              Thời gian (Từ - Đến)
                            </Label>
                            <div className="flex gap-2 items-center">
                              <Input
                                type="time"
                                value={
                                  editTask.time?.split(" – ")[0] || "08:00"
                                }
                                onChange={(e) => {
                                  const fromTime = e.target.value;
                                  const toTime =
                                    editTask.time?.split(" – ")[1] || "09:00";
                                  setEditTask({
                                    ...editTask,
                                    time: `${fromTime} – ${toTime}`,
                                  });
                                  setValidationError(""); // Clear errors on time change
                                }}
                                className="border-gray-200 focus:border-indigo-400 focus:ring-indigo-400 rounded-xl h-12 flex-1"
                              />
                              <span className="text-gray-500 font-medium">
                                –
                              </span>
                              <Input
                                type="time"
                                value={
                                  editTask.time?.split(" – ")[1] || "09:00"
                                }
                                onChange={(e) => {
                                  const fromTime =
                                    editTask.time?.split(" – ")[0] || "08:00";
                                  const toTime = e.target.value;
                                  setEditTask({
                                    ...editTask,
                                    time: `${fromTime} – ${toTime}`,
                                  });
                                  setValidationError(""); // Clear errors on time change
                                }}
                                className="border-gray-200 focus:border-indigo-400 focus:ring-indigo-400 rounded-xl h-12 flex-1"
                              />
                            </div>
                          </div>
                          <div>
                            <Label className="text-gray-700 font-medium mb-2 block">
                              Loại nhiệm vụ
                            </Label>
                            <Select
                              value={editTask.type}
                              onValueChange={(value) =>
                                setEditTask({ ...editTask, type: value })
                              }
                            >
                              <SelectTrigger className="border-gray-200 focus:border-indigo-400 rounded-xl h-12 bg-white">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent className="bg-white border-gray-200 rounded-xl shadow-lg">
                                {typeOptions.map((type) => (
                                  <SelectItem
                                    key={type.value}
                                    value={type.value}
                                  >
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="flex gap-3">
                          <Button
                            onClick={handleEditTask}
                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl flex-1"
                          >
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Lưu thay đổi
                          </Button>
                          <Button
                            variant="outline"
                            onClick={() => {
                              setEditingId(null);
                              setValidationError(""); // Clear errors when canceling
                            }}
                            className="px-6 py-3 rounded-xl border-gray-200 hover:bg-gray-50"
                          >
                            Hủy
                          </Button>
                        </div>
                      </div>
                    ) : (
                      // View Mode
                      <div className="flex">
                        {/* Task Type Color Bar */}
                        <div
                          className={`w-2 ${getTypeConfig(task.type).color}`}
                        ></div>

                        <div className="flex-1 p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-3">
                                <h3
                                  className={`text-lg font-semibold ${
                                    task.completed
                                      ? "text-gray-500 line-through"
                                      : "text-gray-900"
                                  }`}
                                >
                                  {task.task}
                                </h3>
                                {task.completed && (
                                  <Badge className="bg-green-100 text-green-700 border-green-200 px-3 py-1 rounded-full text-xs font-medium">
                                    <CheckCircle2 className="w-3 h-3 mr-1" />
                                    Hoàn thành
                                  </Badge>
                                )}
                              </div>
                              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                                  <Calendar className="w-4 h-4" />
                                  {getDayDisplay(task.day)}
                                </span>
                                <span className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
                                  <Clock className="w-4 h-4" />
                                  {task.time}
                                </span>
                                <span
                                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-white ${
                                    getTypeConfig(task.type).color
                                  }`}
                                >
                                  <Target className="w-4 h-4" />
                                  {getTypeConfig(task.type).label}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              onClick={() => toggleComplete(task)}
                              className={`px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                                task.completed
                                  ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                                  : "bg-green-500 hover:bg-green-600 text-white"
                              }`}
                            >
                              {task.completed ? (
                                <>
                                  <Clock className="w-4 h-4 mr-2" />
                                  Đánh dấu chưa xong
                                </>
                              ) : (
                                <>
                                  <CheckCircle2 className="w-4 h-4 mr-2" />
                                  Hoàn thành
                                </>
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => startEdit(task)}
                              className="px-4 py-2 rounded-xl border-gray-200 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-200"
                            >
                              <Edit3 className="w-4 h-4 mr-2" />
                              Chỉnh sửa
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleDeleteTask(task._id)}
                              className="px-4 py-2 rounded-xl border-gray-200 hover:bg-red-50 hover:border-red-300 hover:text-red-600 transition-all duration-200"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Xóa
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
