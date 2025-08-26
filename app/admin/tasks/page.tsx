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
  Edit,
  Check,
  X,
  Clock,
  Target,
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
} from "@/lib/service";

export default function AdminTasksPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newTask, setNewTask] = useState<CreateTaskRequest>({
    day: "Monday",
    time: "09:00",
    task: "",
    type: "personal",
  });
  const [editTask, setEditTask] = useState<UpdateTaskRequest>({
    day: "Monday",
    time: "09:00",
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
    if (!newTask.task.trim()) return;

    try {
      const created = await addTask(newTask);
      setTasks([...tasks, created]);
      setNewTask({
        day: "Monday",
        time: "09:00",
        task: "",
        type: "personal",
      });
      setIsAdding(false);
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  };

  // Start editing task
  const startEdit = (task: Task) => {
    setEditTask({
      day: task.day || "Monday",
      time: task.time,
      task: task.task,
      type: task.type,
    });
    setEditingId(task._id);
  };

  // Save edited task
  const handleEditTask = async () => {
    if (!editTask.task?.trim() || !editingId) return;

    try {
      const updated = await updateTask(editingId, editTask);
      setTasks(tasks.map((task) => (task._id === editingId ? updated : task)));
      setEditingId(null);
    } catch (error) {
      console.error("Failed to update task:", error);
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
    if (!confirm("Bạn có chắc chắn muốn xóa task này?")) return;

    try {
      await deleteTask(id);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const dayOptions = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const typeOptions = [
    { value: "personal", label: "Cá nhân" },
    { value: "work", label: "Công việc" },
    { value: "health", label: "Sức khỏe" },
    { value: "study", label: "Học tập" },
    { value: "hobby", label: "Sở thích" },
  ];

  const getDayDisplay = (day?: string) => {
    const dayMap: { [key: string]: string } = {
      Monday: "Thứ hai",
      Tuesday: "Thứ ba",
      Wednesday: "Thứ tư",
      Thursday: "Thứ năm",
      Friday: "Thứ sáu",
      Saturday: "Thứ bảy",
      Sunday: "Chủ nhật",
    };
    return dayMap[day || ""] || day || "Không xác định";
  };

  const getTypeDisplay = (type: string) => {
    const typeMap: { [key: string]: string } = {
      personal: "Cá nhân",
      work: "Công việc",
      health: "Sức khỏe",
      study: "Học tập",
      hobby: "Sở thích",
    };
    return typeMap[type] || type;
  };

  const getStatusBadge = (completed: boolean) => {
    return completed ? (
      <Badge className="bg-green-100 text-green-800 border-green-300">
        <Check className="w-3 h-3 mr-1" />
        Hoàn thành
      </Badge>
    ) : (
      <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
        <Clock className="w-3 h-3 mr-1" />
        Chưa hoàn thành
      </Badge>
    );
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-orange-50 to-red-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-8 h-8 text-orange-600" />
            <h1 className="text-3xl font-bold text-gray-900">Quản lý Tasks</h1>
          </div>
          <p className="text-gray-600">
            Tạo và quản lý kế hoạch hàng ngày theo từng ngày trong tuần
          </p>
          <Link href="/admin" className="inline-block mt-4">
            <Button
              variant="outline"
              className="text-orange-600 border-orange-300 hover:bg-orange-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại Dashboard
            </Button>
          </Link>
        </div>

        {/* Add Task Form */}
        <Card className="mb-8 bg-white/80 backdrop-blur-sm border-orange-200">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="text-orange-800">Thêm Task Mới</span>
              <Button
                onClick={() => setIsAdding(!isAdding)}
                className="bg-orange-600 hover:bg-orange-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                {isAdding ? "Hủy" : "Thêm Task"}
              </Button>
            </CardTitle>
          </CardHeader>
          {isAdding && (
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="task" className="text-orange-800">
                  Nội dung task
                </Label>
                <Input
                  id="task"
                  value={newTask.task}
                  onChange={(e) =>
                    setNewTask({ ...newTask, task: e.target.value })
                  }
                  placeholder="Nhập nội dung task..."
                  className="border-orange-200 focus:border-orange-400"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="text-orange-800">Ngày trong tuần</Label>
                  <Select
                    value={newTask.day}
                    onValueChange={(value) =>
                      setNewTask({ ...newTask, day: value })
                    }
                  >
                    <SelectTrigger className="border-orange-200 focus:border-orange-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {dayOptions.map((day) => (
                        <SelectItem key={day} value={day}>
                          {getDayDisplay(day)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="time" className="text-orange-800">
                    Thời gian
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    value={newTask.time}
                    onChange={(e) =>
                      setNewTask({ ...newTask, time: e.target.value })
                    }
                    className="border-orange-200 focus:border-orange-400"
                  />
                </div>
                <div>
                  <Label className="text-orange-800">Loại task</Label>
                  <Select
                    value={newTask.type}
                    onValueChange={(value) =>
                      setNewTask({ ...newTask, type: value })
                    }
                  >
                    <SelectTrigger className="border-orange-200 focus:border-orange-400">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {typeOptions.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button
                onClick={handleAddTask}
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tạo Task
              </Button>
            </CardContent>
          )}
        </Card>

        {/* Tasks List */}
        <div className="space-y-4">
          {isLoading ? (
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Đang tải tasks...</p>
              </CardContent>
            </Card>
          ) : tasks.length === 0 ? (
            <Card className="bg-white/80 backdrop-blur-sm border-orange-200">
              <CardContent className="p-8 text-center">
                <Target className="w-12 h-12 text-orange-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-orange-800 mb-2">
                  Chưa có task nào
                </h3>
                <p className="text-orange-600">
                  Hãy tạo task đầu tiên để bắt đầu lập kế hoạch!
                </p>
              </CardContent>
            </Card>
          ) : (
            tasks.map((task) => (
              <Card
                key={task._id}
                className="bg-white/80 backdrop-blur-sm border-orange-200 hover:border-orange-300 transition-colors"
              >
                <CardContent className="p-6">
                  {editingId === task._id ? (
                    // Edit Mode
                    <div className="space-y-4">
                      <div>
                        <Label className="text-orange-800">Nội dung task</Label>
                        <Input
                          value={editTask.task}
                          onChange={(e) =>
                            setEditTask({ ...editTask, task: e.target.value })
                          }
                          className="border-orange-200 focus:border-orange-400"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label className="text-orange-800">
                            Ngày trong tuần
                          </Label>
                          <Select
                            value={editTask.day}
                            onValueChange={(value) =>
                              setEditTask({ ...editTask, day: value })
                            }
                          >
                            <SelectTrigger className="border-orange-200 focus:border-orange-400">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {dayOptions.map((day) => (
                                <SelectItem key={day} value={day}>
                                  {getDayDisplay(day)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-orange-800">Thời gian</Label>
                          <Input
                            type="time"
                            value={editTask.time}
                            onChange={(e) =>
                              setEditTask({ ...editTask, time: e.target.value })
                            }
                            className="border-orange-200 focus:border-orange-400"
                          />
                        </div>
                        <div>
                          <Label className="text-orange-800">Loại task</Label>
                          <Select
                            value={editTask.type}
                            onValueChange={(value) =>
                              setEditTask({ ...editTask, type: value })
                            }
                          >
                            <SelectTrigger className="border-orange-200 focus:border-orange-400">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {typeOptions.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={handleEditTask}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Lưu
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setEditingId(null)}
                        >
                          <X className="w-4 h-4 mr-2" />
                          Hủy
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <div>
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-orange-900 mb-2">
                            {task.task}
                          </h3>
                          <div className="flex flex-wrap gap-3 text-sm text-orange-600">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {getDayDisplay(task.day)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {task.time}
                            </span>
                            <span className="flex items-center gap-1">
                              <Target className="w-4 h-4" />
                              {getTypeDisplay(task.type)}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(task.completed)}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleComplete(task)}
                          className={`${
                            task.completed
                              ? "text-yellow-600 border-yellow-300 hover:bg-yellow-50"
                              : "text-green-600 border-green-300 hover:bg-green-50"
                          }`}
                        >
                          {task.completed ? (
                            <>
                              <X className="w-4 h-4 mr-2" />
                              Đánh dấu chưa xong
                            </>
                          ) : (
                            <>
                              <Check className="w-4 h-4 mr-2" />
                              Đánh dấu hoàn thành
                            </>
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => startEdit(task)}
                          className="text-blue-600 border-blue-300 hover:bg-blue-50"
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Chỉnh sửa
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteTask(task._id)}
                          className="text-red-600 border-red-300 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Xóa
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
