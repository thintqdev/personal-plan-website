"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { DatePicker } from "@/components/ui/date-picker";
import { TimePicker } from "@/components/ui/time-picker";
import {
  ArrowLeft,
  User,
  Calendar,
  Plus,
  Trash2,
  Save,
  Upload,
  Quote,
  Filter,
} from "lucide-react";
import Link from "next/link";
import {
  getQuotes,
  addQuote,
  deleteQuote,
  type Quote as QuoteType,
  getUser,
  updateUser,
  type User as UserType,
  getTasks,
  addTask,
  updateTask,
  deleteTask,
  type Task as TaskType,
} from "@/lib/service";

export default function AdminPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [profile, setProfile] = useState<UserType | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [showAvatarInput, setShowAvatarInput] = useState(false);
  const [tempAvatarUrl, setTempAvatarUrl] = useState("");

  const [quotes, setQuotes] = useState<QuoteType[]>([]);
  const [isLoadingQuotes, setIsLoadingQuotes] = useState(true);
  const [newQuote, setNewQuote] = useState("");
  const [isAddingQuote, setIsAddingQuote] = useState(false);

  const [selectedDayFilter, setSelectedDayFilter] = useState("Tất cả");

  const [newTask, setNewTask] = useState({
    day: "Thứ Hai",
    time: "",
    task: "",
    type: "Study",
  });

  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const [isAddingTask, setIsAddingTask] = useState(false);

  const taskTypes = ["Study", "Work", "Gym", "Relax", "Social"];
  const days = [
    "Thứ Hai",
    "Thứ Ba",
    "Thứ Tư",
    "Thứ Năm",
    "Thứ Sáu",
    "Thứ Bảy",
    "Chủ Nhật",
  ];
  const dayFilterOptions = ["Tất cả", ...days];

  // Handle client-side mounting to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load user data from API
  useEffect(() => {
    const loadUser = async () => {
      try {
        setIsLoadingProfile(true);
        const userData = await getUser();
        setProfile(userData);
      } catch (error) {
        console.error("Failed to load user:", error);
        // Fallback to default data if API fails
        setProfile({
          _id: "",
          name: "Nguyễn Văn A",
          role: "Lập trình viên & Học viên tiếng Nhật",
          goal: "JLPT N3",
          streak: 45,
          avatar: "/friendly-person-avatar.png",
          __v: 0,
        });
      } finally {
        setIsLoadingProfile(false);
      }
    };

    if (isMounted) {
      loadUser();
    }
  }, [isMounted]);

  // Load quotes from API on component mount
  useEffect(() => {
    const loadQuotes = async () => {
      try {
        setIsLoadingQuotes(true);
        const quotesData = await getQuotes();
        setQuotes(quotesData);
      } catch (error) {
        console.error("Failed to load quotes:", error);
        // You can add toast notification here
      } finally {
        setIsLoadingQuotes(false);
      }
    };

    if (isMounted) {
      loadQuotes();
    }
  }, [isMounted]);

  // Load tasks from API on component mount and when filter changes
  useEffect(() => {
    const loadTasks = async () => {
      try {
        setIsLoadingTasks(true);

        // Determine if we need to pass day parameter
        const dayParam =
          selectedDayFilter === "Tất cả" ? undefined : selectedDayFilter;
        const tasksData = await getTasks(dayParam);

        console.log("Received tasks data:", tasksData);
        console.log("Is array:", Array.isArray(tasksData));

        // Ensure we always set an array
        if (Array.isArray(tasksData)) {
          setTasks(tasksData);
        } else {
          console.warn("Tasks data is not an array:", typeof tasksData);
          setTasks([]);
        }
      } catch (error) {
        console.error("Failed to load tasks:", error);
        setTasks([]); // Set empty array on error
      } finally {
        setIsLoadingTasks(false);
      }
    };

    if (isMounted) {
      loadTasks();
    }
  }, [isMounted, selectedDayFilter]); // Add selectedDayFilter as dependency

  const handleProfileUpdate = (field: string, value: string) => {
    if (profile) {
      setProfile((prev: UserType | null) =>
        prev
          ? {
              ...prev,
              [field]: field === "streak" ? parseInt(value) || 0 : value,
            }
          : null
      );
    }
  };

  const handleSaveProfile = async () => {
    if (!profile || isSavingProfile) return;

    try {
      setIsSavingProfile(true);
      const updatedUser = await updateUser({
        name: profile.name,
        role: profile.role,
        goal: profile.goal,
        streak: profile.streak,
        avatar: profile.avatar,
      });
      setProfile(updatedUser);
      // You can add success toast notification here
    } catch (error) {
      console.error("Failed to save profile:", error);
      // You can add error toast notification here
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleShowAvatarInput = () => {
    if (profile) {
      setTempAvatarUrl(profile.avatar);
      setShowAvatarInput(true);
    }
  };

  const handleSaveAvatar = () => {
    if (profile && tempAvatarUrl.trim()) {
      handleProfileUpdate("avatar", tempAvatarUrl.trim());
      setShowAvatarInput(false);
      setTempAvatarUrl("");
    }
  };

  const handleCancelAvatar = () => {
    setShowAvatarInput(false);
    setTempAvatarUrl("");
  };

  const handleAddQuote = async () => {
    if (newQuote.trim() && !isAddingQuote) {
      try {
        setIsAddingQuote(true);
        const newQuoteData = await addQuote({ text: newQuote.trim() });
        setQuotes((prev) => [...prev, newQuoteData]);
        setNewQuote("");
      } catch (error) {
        console.error("Failed to add quote:", error);
        // You can add toast notification here
      } finally {
        setIsAddingQuote(false);
      }
    }
  };

  const handleDeleteQuote = async (quoteId: string) => {
    try {
      await deleteQuote(quoteId);
      setQuotes((prev) => prev.filter((quote) => quote._id !== quoteId));
    } catch (error) {
      console.error("Failed to delete quote:", error);
      // You can add toast notification here
    }
  };

  const handleAddTask = async () => {
    if (newTask.time && newTask.task && !isAddingTask) {
      try {
        setIsAddingTask(true);
        const taskData = await addTask({
          day: newTask.day,
          time: newTask.time,
          task: newTask.task,
          type: newTask.type,
        });
        setTasks((prev) => [...prev, taskData]);
        setNewTask({
          day: "Thứ Hai",
          time: "",
          task: "",
          type: "Study",
        });
      } catch (error) {
        console.error("Failed to add task:", error);
        // You can add toast notification here
      } finally {
        setIsAddingTask(false);
      }
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    try {
      await deleteTask(taskId);
      setTasks((prev) => prev.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Failed to delete task:", error);
      // You can add toast notification here
    }
  };

  // Since API already filters by day, we just use all tasks from the response
  const filteredTasks = Array.isArray(tasks) ? tasks : [];

  const getTypeColor = (type: string) => {
    const colors = {
      Study: "bg-blue-100 text-blue-800",
      Work: "bg-green-100 text-green-800",
      Gym: "bg-orange-100 text-orange-800",
      Relax: "bg-purple-100 text-purple-800",
      Social: "bg-pink-100 text-pink-800",
    };
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6 sm:mb-8">
          <Link href="/">
            <Button variant="outline" size="sm" suppressHydrationWarning>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại
            </Button>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif">
            Admin - Quản lý ThinPlan
          </h1>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
          {/* Profile Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-primary" />
                Quản lý thông tin cá nhân
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              {isLoadingProfile ? (
                <div className="text-center py-8 text-muted-foreground">
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                  <p className="text-sm">Đang tải thông tin...</p>
                </div>
              ) : profile ? (
                <>
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-primary">
                      <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-xl sm:text-2xl bg-primary text-primary-foreground">
                        TP
                      </AvatarFallback>
                    </Avatar>

                    {showAvatarInput ? (
                      <div className="w-full space-y-2">
                        <Label
                          htmlFor="avatarUrl"
                          className="text-sm font-medium"
                        >
                          URL Avatar
                        </Label>
                        <Input
                          id="avatarUrl"
                          placeholder="Nhập URL hình ảnh..."
                          value={tempAvatarUrl}
                          onChange={(e) => setTempAvatarUrl(e.target.value)}
                          className="w-full"
                          suppressHydrationWarning
                        />
                        <div className="flex gap-2">
                          <Button
                            onClick={handleSaveAvatar}
                            size="sm"
                            className="flex-1"
                            suppressHydrationWarning
                          >
                            <Save className="w-4 h-4 mr-2" />
                            Lưu
                          </Button>
                          <Button
                            onClick={handleCancelAvatar}
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            suppressHydrationWarning
                          >
                            Hủy
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleShowAvatarInput}
                        suppressHydrationWarning
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Đổi avatar
                      </Button>
                    )}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium">
                        Họ tên
                      </Label>
                      <Input
                        id="name"
                        value={profile.name}
                        onChange={(e) =>
                          handleProfileUpdate("name", e.target.value)
                        }
                        className="mt-1"
                        suppressHydrationWarning
                      />
                    </div>

                    <div>
                      <Label htmlFor="role" className="text-sm font-medium">
                        Vai trò
                      </Label>
                      <Input
                        id="role"
                        value={profile.role}
                        onChange={(e) =>
                          handleProfileUpdate("role", e.target.value)
                        }
                        className="mt-1"
                        suppressHydrationWarning
                      />
                    </div>

                    <div>
                      <Label htmlFor="goal" className="text-sm font-medium">
                        Mục tiêu
                      </Label>
                      <Input
                        id="goal"
                        value={profile.goal}
                        onChange={(e) =>
                          handleProfileUpdate("goal", e.target.value)
                        }
                        className="mt-1"
                        suppressHydrationWarning
                      />
                    </div>

                    <div>
                      <Label htmlFor="streak" className="text-sm font-medium">
                        Streak (ngày)
                      </Label>
                      <Input
                        id="streak"
                        type="number"
                        value={profile.streak}
                        onChange={(e) =>
                          handleProfileUpdate("streak", e.target.value)
                        }
                        className="mt-1"
                        suppressHydrationWarning
                      />
                    </div>

                    <Button
                      onClick={handleSaveProfile}
                      className="w-full"
                      disabled={isSavingProfile}
                      suppressHydrationWarning
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {isSavingProfile ? "Đang lưu..." : "Lưu thông tin"}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <User className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Không thể tải thông tin người dùng</p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Quote className="w-5 h-5 text-primary" />
                Quản lý câu tạo động lực
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              {/* Add New Quote */}
              <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                <h3 className="font-semibold text-sm sm:text-base">
                  Thêm câu châm ngôn mới
                </h3>

                <div>
                  <Label htmlFor="newQuote" className="text-sm">
                    Câu châm ngôn
                  </Label>
                  <Textarea
                    id="newQuote"
                    placeholder="Nhập câu tạo động lực..."
                    value={newQuote}
                    onChange={(e) => setNewQuote(e.target.value)}
                    className="mt-1"
                    rows={3}
                  />
                </div>

                <Button
                  onClick={handleAddQuote}
                  className="w-full"
                  disabled={isAddingQuote}
                  suppressHydrationWarning
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {isAddingQuote ? "Đang thêm..." : "Thêm câu châm ngôn"}
                </Button>
              </div>

              {/* Quotes List */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm sm:text-base">
                  Danh sách câu châm ngôn
                </h3>
                <div className="max-h-96 overflow-y-auto space-y-2">
                  {isLoadingQuotes ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                      <p className="text-sm">Đang tải câu châm ngôn...</p>
                    </div>
                  ) : quotes.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Quote className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Chưa có câu châm ngôn nào</p>
                    </div>
                  ) : (
                    quotes.map((quote) => (
                      <div
                        key={quote._id}
                        className="flex items-start gap-3 p-3 bg-card rounded-lg border"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm italic break-words">
                            "{quote.text}"
                          </p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteQuote(quote._id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                          suppressHydrationWarning
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Plan Management */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                Quản lý kế hoạch
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 sm:space-y-6">
              {/* Add New Task */}
              <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
                <h3 className="font-semibold text-sm sm:text-base">
                  Thêm công việc mới
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="day" className="text-sm">
                      Ngày trong tuần
                    </Label>
                    <Select
                      value={newTask.day}
                      onValueChange={(value) =>
                        setNewTask((prev) => ({ ...prev, day: value }))
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {days.map((day) => (
                          <SelectItem key={day} value={day}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="type" className="text-sm">
                      Loại
                    </Label>
                    <Select
                      value={newTask.type}
                      onValueChange={(value) =>
                        setNewTask((prev) => ({ ...prev, type: value }))
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {taskTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  <div>
                    <Label htmlFor="time" className="text-sm">
                      Thời gian
                    </Label>
                    <div className="mt-1">
                      <TimePicker
                        time={newTask.time}
                        onTimeChange={(time) =>
                          setNewTask((prev) => ({ ...prev, time: time || "" }))
                        }
                        placeholder="Chọn giờ"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="task" className="text-sm">
                    Công việc
                  </Label>
                  <Textarea
                    id="task"
                    placeholder="Mô tả công việc..."
                    value={newTask.task}
                    onChange={(e) =>
                      setNewTask((prev) => ({ ...prev, task: e.target.value }))
                    }
                    className="mt-1"
                    rows={2}
                  />
                </div>

                <Button
                  onClick={handleAddTask}
                  className="w-full"
                  disabled={isAddingTask}
                  suppressHydrationWarning
                >
                  <Plus className="w-4 h-4 mr-2" />
                  {isAddingTask ? "Đang thêm..." : "Thêm công việc"}
                </Button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm sm:text-base">
                    Danh sách công việc
                  </h3>
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <Select
                      value={selectedDayFilter}
                      onValueChange={setSelectedDayFilter}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {dayFilterOptions.map((day) => (
                          <SelectItem key={day} value={day}>
                            {day}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="max-h-96 overflow-y-auto space-y-2">
                  {isLoadingTasks ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                      <p className="text-sm">Đang tải công việc...</p>
                    </div>
                  ) : filteredTasks.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Không có công việc nào</p>
                    </div>
                  ) : (
                    filteredTasks.map((task) => (
                      <div
                        key={task._id}
                        className="flex items-center gap-3 p-3 bg-card rounded-lg border"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1 flex-wrap">
                            <Badge variant="outline" className="text-xs">
                              {task.day || "Chưa phân loại"}
                            </Badge>
                            <Badge
                              variant="secondary"
                              className={`${getTypeColor(task.type)} text-xs`}
                            >
                              {task.type}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground font-mono mb-1">
                            {task.time}
                          </div>
                          <div className="text-sm font-medium break-words">
                            {task.task}
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteTask(task._id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                          suppressHydrationWarning
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
