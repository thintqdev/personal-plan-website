"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  Clock,
  Target,
  Settings,
  Camera,
  ChevronLeft,
  ChevronRight,
  Check,
  Timer,
  Sun,
  Moon,
  Palette,
  Goal,
  Wallet,
} from "lucide-react";
import Link from "next/link";
import {
  getQuotes,
  getUser,
  type Quote,
  type User,
  getTasksByDay,
  toggleTaskCompletion as apiToggleTaskCompletion,
  getStatistics,
  getTodayStatistics,
  getUserPreferences,
  updateUserPreferences,
  type DayTasks,
  type Task,
  type Statistics,
  type UserPreferences,
  getDayNameFromIndex,
  getCurrentDayIndex,
} from "@/lib/service";

const colorThemes = [
  {
    name: "Blue",
    value: "blue",
    gradient: "from-gray-50 to-blue-50",
    primary: "blue",
    cardBg: "bg-white border border-gray-200",
    text: "text-gray-900",
    textSecondary: "text-gray-600",
    textMuted: "text-gray-500",
    button: "bg-blue-600 text-white hover:bg-blue-700",
    accent: "text-blue-600",
    progressBg: "bg-blue-600",
  },
  {
    name: "Green",
    value: "green",
    gradient: "from-gray-50 to-green-50",
    primary: "green",
    cardBg: "bg-white border border-gray-200",
    text: "text-gray-900",
    textSecondary: "text-gray-600",
    textMuted: "text-gray-500",
    button: "bg-green-600 text-white hover:bg-green-700",
    accent: "text-green-600",
    progressBg: "bg-green-600",
  },
  {
    name: "Purple",
    value: "purple",
    gradient: "from-gray-50 to-purple-50",
    primary: "purple",
    cardBg: "bg-white border border-gray-200",
    text: "text-gray-900",
    textSecondary: "text-gray-600",
    textMuted: "text-gray-500",
    button: "bg-purple-600 text-white hover:bg-purple-700",
    accent: "text-purple-600",
    progressBg: "bg-purple-600",
  },
];

export default function ThinPlanPage() {
  const coverImages = [
    "/mountain-peak-sunrise-motivation-success.png",
    "/person-climbing-stairs-to-success.png",
    "/runner-crossing-finish-line-victory.png",
    "/lighthouse-guiding-ships-motivation.png",
    "/eagle-soaring-high-mountains-freedom.png",
  ];

  const [coverImage, setCoverImage] = useState(coverImages[0]);
  const [currentDayIndex, setCurrentDayIndex] = useState(0);
  const [completedTasks, setCompletedTasks] = useState<{
    [key: string]: boolean;
  }>({});
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDaytime, setIsDaytime] = useState(true);
  const [currentTheme, setCurrentTheme] = useState(colorThemes[0]);

  // API state
  const [isMounted, setIsMounted] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [currentDayTasks, setCurrentDayTasks] = useState<DayTasks | null>(null);
  const [statistics, setStatistics] = useState<Statistics | null>(null);
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingQuotes, setIsLoadingQuotes] = useState(true);
  const [isLoadingTasks, setIsLoadingTasks] = useState(true);
  const [isLoadingStats, setIsLoadingStats] = useState(true);

  const motivationalQuotes = [
    "Thành công là tổng của những nỗ lực nhỏ lặp đi lặp lại mỗi ngày",
    "Hành trình ngàn dặm bắt đầu từ một bước chân",
    "Không có gì là không thể, chỉ có điều bạn chưa thử đủ lâu",
    "Mỗi ngày là một cơ hội mới để trở thành phiên bản tốt hơn của chính mình",
    "Kỷ luật là cầu nối giữa mục tiêu và thành tựu",
  ];

  const getDayData = (dayIndex: number) => {
    const today = new Date();
    const currentDayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const mondayOffset = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek; // Calculate offset to Monday

    const monday = new Date(today);
    monday.setDate(today.getDate() + mondayOffset);

    const targetDate = new Date(monday);
    targetDate.setDate(monday.getDate() + dayIndex);

    const dayNames = [
      "Thứ Hai",
      "Thứ Ba",
      "Thứ Tư",
      "Thứ Năm",
      "Thứ Sáu",
      "Thứ Bảy",
      "Chủ Nhật",
    ];
    const dayName = dayNames[dayIndex];
    const dateString = targetDate.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    return { dayName, dateString, date: targetDate };
  };

  const dailyPlans = [
    {
      day: getDayData(0).dayName, // Monday
      date: getDayData(0).dateString,
      tasks: [
        {
          id: "mon-1",
          time: "06:30 - 07:30",
          task: "Thói quen buổi sáng + Nghe Podcast tiếng Nhật 🇯🇵",
          type: "Học tập",
          color: "bg-blue-100 text-blue-800",
        },
        {
          id: "mon-2",
          time: "08:00 - 18:00",
          task: "Làm việc (tập trung 3 nhiệm vụ chính)",
          type: "Công việc",
          color: "bg-green-100 text-green-800",
        },
        {
          id: "mon-3",
          time: "18:15 - 19:30",
          task: "Tập gym (Ngực & Tay) 💪",
          type: "Thể dục",
          color: "bg-orange-100 text-orange-800",
        },
        {
          id: "mon-4",
          time: "20:00 - 21:30",
          task: "Học tiếng Nhật (20 từ mới + kanji) 📚",
          type: "Học tập",
          color: "bg-blue-100 text-blue-800",
        },
        {
          id: "mon-5",
          time: "21:30 - 22:00",
          task: "Viết nhật ký + Suy ngẫm ✍️",
          type: "Thư giãn",
          color: "bg-purple-100 text-purple-800",
        },
        {
          id: "mon-6",
          time: "22:00 - 23:00",
          task: "Đọc sách / Nghe nhạc 🎶",
          type: "Thư giãn",
          color: "bg-purple-100 text-purple-800",
        },
      ],
    },
    {
      day: getDayData(1).dayName, // Tuesday
      date: getDayData(1).dateString,
      tasks: [
        {
          id: "tue-1",
          time: "06:30 - 07:30",
          task: "Ôn từ vựng (10 từ mới) 🇯🇵",
          type: "Học tập",
          color: "bg-blue-100 text-blue-800",
        },
        {
          id: "tue-2",
          time: "08:00 - 18:00",
          task: "Làm việc",
          type: "Công việc",
          color: "bg-green-100 text-green-800",
        },
        {
          id: "tue-3",
          time: "18:00 - 20:00",
          task: "Lớp học tiếng Nhật tại trung tâm 🇯🇵",
          type: "Học tập",
          color: "bg-blue-100 text-blue-800",
        },
        {
          id: "tue-4",
          time: "20:30 - 21:30",
          task: "Ôn bài + Nghe NHK Easy",
          type: "Học tập",
          color: "bg-blue-100 text-blue-800",
        },
        {
          id: "tue-5",
          time: "21:30 - 22:30",
          task: "Thư giãn (đi bộ, cà phê, phim) 🎬",
          type: "Thư giãn",
          color: "bg-purple-100 text-purple-800",
        },
        {
          id: "tue-6",
          time: "22:30 - 23:00",
          task: "Suy ngẫm",
          type: "Thư giãn",
          color: "bg-purple-100 text-purple-800",
        },
      ],
    },
    {
      day: getDayData(2).dayName, // Wednesday
      date: getDayData(2).dateString,
      tasks: [
        {
          id: "wed-1",
          time: "06:30 - 07:30",
          task: "Chạy bộ + Ăn sáng 🏃",
          type: "Thể dục",
          color: "bg-orange-100 text-orange-800",
        },
        {
          id: "wed-2",
          time: "08:00 - 18:00",
          task: "Làm việc",
          type: "Công việc",
          color: "bg-green-100 text-green-800",
        },
        {
          id: "wed-3",
          time: "18:15 - 19:30",
          task: "Tập gym (Lưng & Vai) 💪",
          type: "Thể dục",
          color: "bg-orange-100 text-orange-800",
        },
        {
          id: "wed-4",
          time: "20:00 - 21:30",
          task: "Dự án cá nhân (Blog/Code) 👨‍💻",
          type: "Công việc",
          color: "bg-green-100 text-green-800",
        },
        {
          id: "wed-5",
          time: "21:30 - 22:30",
          task: "Đọc sách tài chính 📖",
          type: "Học tập",
          color: "bg-blue-100 text-blue-800",
        },
        {
          id: "wed-6",
          time: "22:30 - 23:00",
          task: "Ghi chú tài chính + Nhật ký",
          type: "Học tập",
          color: "bg-blue-100 text-blue-800",
        },
      ],
    },
    {
      day: getDayData(3).dayName, // Thursday
      date: getDayData(3).dateString,
      tasks: [
        {
          id: "thu-1",
          time: "06:30 - 07:30",
          task: "Luyện ngữ pháp + dịch thuật 🇯🇵",
          type: "Học tập",
          color: "bg-blue-100 text-blue-800",
        },
        {
          id: "thu-2",
          time: "08:00 - 18:00",
          task: "Làm việc",
          type: "Công việc",
          color: "bg-green-100 text-green-800",
        },
        {
          id: "thu-3",
          time: "18:00 - 20:00",
          task: "Lớp học tiếng Nhật tại trung tâm 🇯🇵",
          type: "Học tập",
          color: "bg-blue-100 text-blue-800",
        },
        {
          id: "thu-4",
          time: "20:30 - 21:30",
          task: "Ôn bài + Luyện đề JLPT (10 câu)",
          type: "Học tập",
          color: "bg-blue-100 text-blue-800",
        },
        {
          id: "thu-5",
          time: "21:30 - 22:30",
          task: "Chơi game / Xem phim 🎮",
          type: "Thư giãn",
          color: "bg-purple-100 text-purple-800",
        },
        {
          id: "thu-6",
          time: "22:30 - 23:00",
          task: "Chuẩn bị ngày mai",
          type: "Thư giãn",
          color: "bg-purple-100 text-purple-800",
        },
      ],
    },
    {
      day: getDayData(4).dayName, // Friday
      date: getDayData(4).dateString,
      tasks: [
        {
          id: "fri-1",
          time: "06:30 - 07:30",
          task: "Thiền + Ăn sáng 🧘",
          type: "Thư giãn",
          color: "bg-purple-100 text-purple-800",
        },
        {
          id: "fri-2",
          time: "08:00 - 18:00",
          task: "Làm việc",
          type: "Công việc",
          color: "bg-green-100 text-green-800",
        },
        {
          id: "fri-3",
          time: "18:15 - 19:30",
          task: "Tập gym (Chân & Vai) 💪",
          type: "Thể dục",
          color: "bg-orange-100 text-orange-800",
        },
        {
          id: "fri-4",
          time: "20:00 - 22:00",
          task: "Thư giãn (bạn bè, phim, cà phê) 🎉",
          type: "Xã hội",
          color: "bg-pink-100 text-pink-800",
        },
        {
          id: "fri-5",
          time: "22:00 - 23:00",
          task: "Tổng kết công việc tuần",
          type: "Công việc",
          color: "bg-green-100 text-green-800",
        },
      ],
    },
    {
      day: getDayData(5).dayName, // Saturday
      date: getDayData(5).dateString,
      tasks: [
        {
          id: "sat-1",
          time: "07:30 - 08:30",
          task: "Tập nhẹ + Ăn sáng",
          type: "Thể dục",
          color: "bg-orange-100 text-orange-800",
        },
        {
          id: "sat-2",
          time: "09:00 - 11:00",
          task: "Thi thử JLPT (Đọc/Nghe) 🇯🇵",
          type: "Học tập",
          color: "bg-blue-100 text-blue-800",
        },
        {
          id: "sat-3",
          time: "13:00 - 16:00",
          task: "Dự án cá nhân (Blog/Code) 👨‍💻",
          type: "Công việc",
          color: "bg-green-100 text-green-800",
        },
        {
          id: "sat-4",
          time: "16:00 - 18:00",
          task: "Nhóm học tại quán cà phê ☕",
          type: "Xã hội",
          color: "bg-pink-100 text-pink-800",
        },
        {
          id: "sat-5",
          time: "19:00 - 22:00",
          task: "Bạn bè / Giải trí 🎬",
          type: "Xã hội",
          color: "bg-pink-100 text-pink-800",
        },
        {
          id: "sat-6",
          time: "22:30 - 23:00",
          task: "Viết nhật ký",
          type: "Thư giãn",
          color: "bg-purple-100 text-purple-800",
        },
      ],
    },
    {
      day: getDayData(6).dayName, // Sunday
      date: getDayData(6).dateString,
      tasks: [
        {
          id: "sun-1",
          time: "07:30 - 09:30",
          task: "Thử thách lập trình / Kỹ năng IT 📊",
          type: "Học tập",
          color: "bg-blue-100 text-blue-800",
        },
        {
          id: "sun-2",
          time: "10:00 - 12:00",
          task: "Tiếng Nhật (Kanji + Nghe) 🇯🇵",
          type: "Học tập",
          color: "bg-blue-100 text-blue-800",
        },
        {
          id: "sun-3",
          time: "14:00 - 16:00",
          task: "Tổng kết tuần + Lập kế hoạch tuần sau 📝",
          type: "Công việc",
          color: "bg-green-100 text-green-800",
        },
        {
          id: "sun-4",
          time: "16:00 - 18:00",
          task: "Đi bộ / Hoạt động xã hội",
          type: "Xã hội",
          color: "bg-pink-100 text-pink-800",
        },
        {
          id: "sun-5",
          time: "19:00 - 21:00",
          task: "Đọc sách (Phát triển bản thân/Tài chính) 📖",
          type: "Học tập",
          color: "bg-blue-100 text-blue-800",
        },
        {
          id: "sun-6",
          time: "21:00 - 22:00",
          task: "Thư giãn (nhạc, thiền) 🎶",
          type: "Thư giãn",
          color: "bg-purple-100 text-purple-800",
        },
        {
          id: "sun-7",
          time: "22:00 - 23:00",
          task: "Chuẩn bị cho ngày mai",
          type: "Thư giãn",
          color: "bg-purple-100 text-purple-800",
        },
      ],
    },
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load user data from API
  useEffect(() => {
    const loadUser = async () => {
      try {
        setIsLoadingUser(true);
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error("Failed to load user:", error);
        // Fallback to default data
        setUser({
          _id: "",
          name: "Nguyễn Văn A",
          role: "Lập trình viên & Học viên tiếng Nhật",
          goal: "JLPT N3",
          streak: 45,
          avatar: "/friendly-person-avatar.png",
          __v: 0,
        });
      } finally {
        setIsLoadingUser(false);
      }
    };

    if (isMounted) {
      loadUser();
    }
  }, [isMounted]);

  // Load quotes from API
  useEffect(() => {
    const loadQuotes = async () => {
      try {
        setIsLoadingQuotes(true);
        const quotesData = await getQuotes();
        setQuotes(quotesData);
      } catch (error) {
        console.error("Failed to load quotes:", error);
        // Keep fallback quotes
      } finally {
        setIsLoadingQuotes(false);
      }
    };

    if (isMounted) {
      loadQuotes();
    }
  }, [isMounted]);

  // Load statistics from API
  useEffect(() => {
    const loadStatistics = async () => {
      try {
        setIsLoadingStats(true);
        const statsData = await getTodayStatistics();
        setStatistics(statsData);
      } catch (error) {
        console.error("Failed to load statistics:", error);
      } finally {
        setIsLoadingStats(false);
      }
    };

    if (isMounted) {
      loadStatistics();
    }
  }, [isMounted]);

  // Load user preferences
  useEffect(() => {
    const loadPreferences = async () => {
      try {
        const prefsData = await getUserPreferences();
        setPreferences(prefsData);
        // Apply theme from preferences
        if (prefsData.theme) {
          const themeIndex = colorThemes.findIndex(
            (t) => t.value === prefsData.theme
          );
          if (themeIndex >= 0) {
            setCurrentTheme(colorThemes[themeIndex]);
          }
        }
        // Apply cover image from preferences
        if (prefsData.coverImage) {
          setCoverImage(prefsData.coverImage);
        }
      } catch (error) {
        console.error("Failed to load preferences:", error);
      }
    };

    if (isMounted) {
      loadPreferences();
    }
  }, [isMounted]);

  useEffect(() => {
    const today = new Date();
    const currentIndex = getCurrentDayIndex();
    setCurrentDayIndex(currentIndex);

    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      setIsDaytime(now.getHours() >= 6 && now.getHours() < 18);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Load tasks from API when component mounts or day changes
  useEffect(() => {
    const loadTasks = async () => {
      if (!isMounted) return;

      try {
        setIsLoadingTasks(true);
        const dayName = getDayNameFromIndex(currentDayIndex);
        const tasksData = await getTasksByDay(dayName);
        setCurrentDayTasks(tasksData);
      } catch (error) {
        console.error("Failed to load tasks:", error);
      } finally {
        setIsLoadingTasks(false);
      }
    };

    loadTasks();
  }, [isMounted, currentDayIndex]);

  const changeCoverImage = async () => {
    const randomIndex = Math.floor(Math.random() * coverImages.length);
    const newImage = coverImages[randomIndex];
    setCoverImage(newImage);

    // Save to preferences
    try {
      await updateUserPreferences({ coverImage: newImage });
    } catch (error) {
      console.error("Failed to save cover image preference:", error);
    }
  };

  const toggleTaskCompletion = async (taskId: string) => {
    // Find the task to get current completion state
    const task = currentDay?.tasks.find((t: any) => getTaskId(t) === taskId);
    const isCurrentlyCompleted = task ? isTaskCompleted(task) : false;
    const newCompletedState = !isCurrentlyCompleted;

    try {
      await apiToggleTaskCompletion(taskId, newCompletedState);

      // Update the task in current day tasks
      if (currentDayTasks) {
        const updatedTasks = currentDayTasks.tasks.map((t: any) =>
          getTaskId(t) === taskId ? { ...t, completed: newCompletedState } : t
        );

        setCurrentDayTasks({
          ...currentDayTasks,
          tasks: updatedTasks,
        });
      }

      // Also update local state for fallback tasks
      setCompletedTasks((prev) => ({
        ...prev,
        [taskId]: newCompletedState,
      }));

      // Reload statistics after task completion change
      const statsData = await getTodayStatistics();
      setStatistics(statsData);
    } catch (error) {
      console.error("Failed to toggle task completion:", error);
    }
  };

  const goToPreviousDay = async () => {
    if (currentDayIndex > 0) {
      setCurrentDayIndex(currentDayIndex - 1);
      // Tasks will be loaded automatically by the useEffect hook
    }
  };

  const goToNextDay = async () => {
    if (currentDayIndex < 6) {
      setCurrentDayIndex(currentDayIndex + 1);
      // Tasks will be loaded automatically by the useEffect hook
    }
  };

  const currentDay = currentDayTasks || {
    day: getDayNameFromIndex(currentDayIndex),
    tasks: dailyPlans[currentDayIndex]?.tasks || [],
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Get quotes text for marquee
  const displayQuotes =
    quotes.length > 0 ? quotes.map((q) => q.text) : motivationalQuotes;

  // Helper function to get task color based on type
  const getTaskColor = (type: string) => {
    const colorMap: { [key: string]: string } = {
      Study: "bg-blue-100 text-blue-800",
      "Học tập": "bg-blue-100 text-blue-800",
      Work: "bg-green-100 text-green-800",
      "Công việc": "bg-green-100 text-green-800",
      Gym: "bg-orange-100 text-orange-800",
      "Thể dục": "bg-orange-100 text-orange-800",
      Relax: "bg-purple-100 text-purple-800",
      "Thư giãn": "bg-purple-100 text-purple-800",
      Social: "bg-pink-100 text-pink-800",
      "Xã hội": "bg-pink-100 text-pink-800",
    };
    return colorMap[type] || "bg-gray-100 text-gray-800";
  };

  // Helper function to get task ID (handle both API and fallback data)
  const getTaskId = (task: any) => {
    return task._id || task.id;
  };

  // Helper function to check if task is completed
  const isTaskCompleted = (task: any) => {
    if (task.completed !== undefined) {
      return task.completed; // From API
    }
    return completedTasks[getTaskId(task)] || false; // From local state
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!isMounted) {
    return null;
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.gradient}`}>
      {/* Cover Image Section */}
      <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden">
        <img
          src={coverImage || "/placeholder.svg"}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />

        <Button
          variant="secondary"
          size="sm"
          className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
          onClick={changeCoverImage}
        >
          <Camera className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Đổi ảnh bìa</span>
          <span className="sm:hidden">Đổi ảnh</span>
        </Button>

        {/* Cover Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">
                    ThinPlan
                  </h1>
                  <p className="text-white/90 text-lg drop-shadow">
                    Kế hoạch thông minh, cuộc sống ý nghĩa
                  </p>
                </div>
              </div>
              <Link href="/admin">
                <Button className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30">
                  <Settings className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">Quản lý</span>
                  <span className="sm:hidden">Admin</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Motivational Quotes Section */}
            <Card className={`${currentTheme.cardBg} mb-8`}>
              <CardContent className="p-6 text-center">
                <div className="text-lg text-gray-700 italic">
                  "
                  {
                    displayQuotes[
                      Math.floor(Math.random() * displayQuotes.length)
                    ]
                  }
                  "
                </div>
              </CardContent>
            </Card>

            {/* Daily Plan Card */}
            <Card className={`${currentTheme.cardBg} shadow-lg`}>
              <CardHeader className="pb-6">
                <div className="flex items-center justify-between">
                  <CardTitle
                    className={`flex items-center gap-2 text-xl ${currentTheme.text}`}
                  >
                    <Calendar className={`w-5 h-5 ${currentTheme.accent}`} />
                    <span>Kế hoạch hôm nay</span>
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToPreviousDay}
                      disabled={currentDayIndex === 0}
                      className={`h-9 w-9 p-0 ${
                        currentDayIndex === 0
                          ? "opacity-50 cursor-not-allowed"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <div className="text-center px-4">
                      <div
                        className={`text-sm font-medium ${currentTheme.text}`}
                      >
                        {currentDay?.day}
                      </div>
                      <div className={`text-xs ${currentTheme.textMuted}`}>
                        {getDayData(currentDayIndex).dateString}
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToNextDay}
                      disabled={currentDayIndex === 6}
                      className={`h-9 w-9 p-0 ${
                        currentDayIndex === 6
                          ? "opacity-50 cursor-not-allowed"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isLoadingTasks ? (
                  <div className="space-y-3">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-4 bg-gray-100 rounded-xl animate-pulse"
                      >
                        <div className="w-6 h-6 bg-gray-200 rounded-full" />
                        <div className="h-4 bg-gray-200 rounded w-20" />
                        <div className="h-4 bg-gray-200 rounded flex-1" />
                        <div className="h-6 bg-gray-200 rounded w-16" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-3">
                    {currentDay?.tasks.map((task: any, taskIndex: number) => {
                      const taskId = getTaskId(task);
                      const completed = isTaskCompleted(task);
                      const taskColor = getTaskColor(task.type);

                      return (
                        <div
                          key={taskId}
                          onClick={() => toggleTaskCompletion(taskId)}
                          className={`cursor-pointer flex items-center gap-4 p-4 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 ${
                            completed
                              ? `opacity-60 line-through bg-gray-50`
                              : ""
                          }`}
                        >
                          <div
                            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                              completed
                                ? `bg-green-500 border-green-500 text-white`
                                : `border-gray-300 hover:border-green-400`
                            }`}
                          >
                            {completed && <Check className="w-4 h-4" />}
                          </div>
                          <div
                            className={`text-sm font-mono ${currentTheme.textMuted} font-medium bg-gray-50 px-3 py-1 rounded-lg border border-gray-200 flex-shrink-0`}
                          >
                            {task.time}
                          </div>
                          <div className="flex items-center justify-between flex-1">
                            <span
                              className={`text-base font-medium break-words ${currentTheme.text}`}
                            >
                              {task.task}
                            </span>
                            <Badge
                              variant="secondary"
                              className={`${taskColor} text-xs flex-shrink-0 rounded-full px-3 py-1 ml-4`}
                            >
                              {task.type}
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8 space-y-6">
              {/* User Profile Card */}
              <Card className={currentTheme.cardBg}>
                <CardContent className="p-6">
                  {isLoadingUser ? (
                    <div className="text-center">
                      <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-32 mx-auto mb-2 animate-pulse"></div>
                      <div className="h-3 bg-gray-200 rounded w-24 mx-auto animate-pulse"></div>
                    </div>
                  ) : user ? (
                    <div className="text-center">
                      <Avatar className="w-16 h-16 mx-auto mb-4">
                        <AvatarImage
                          src={user.avatar || "/friendly-person-avatar.png"}
                        />
                        <AvatarFallback className="text-lg bg-blue-500 text-white">
                          {user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <h2 className="text-lg font-semibold text-gray-900 mb-1">
                        {user.name}
                      </h2>
                      <p className="text-sm text-gray-600 mb-4">{user.role}</p>

                      <div className="space-y-3 mb-6">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>Tham gia: 25/08/2025</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Clock className="w-4 h-4" />
                          <span>Streak: {user.streak} ngày</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Link href="/goals" className="block">
                          <Button variant="outline" className="w-full">
                            <Goal className="w-4 h-4 mr-2" />
                            Mục tiêu
                          </Button>
                        </Link>
                        <Link href="/finance" className="block">
                          <Button variant="outline" className="w-full">
                            <Wallet className="w-4 h-4 mr-2" />
                            Tài chính
                          </Button>
                        </Link>
                        <Link href="/admin" className="block">
                          <Button className={`w-full ${currentTheme.button}`}>
                            <Settings className="w-4 h-4 mr-2" />
                            Quản lý
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500">
                      Không thể tải thông tin người dùng
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Theme Selector */}
              <Card className={currentTheme.cardBg}>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-gray-900">
                    <Palette className="w-5 h-5 mr-2 inline" />
                    Chủ đề
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-3">
                    {colorThemes.map((theme) => (
                      <button
                        key={theme.value}
                        onClick={async () => {
                          setCurrentTheme(theme);
                          try {
                            await updateUserPreferences({ theme: theme.value });
                          } catch (error) {
                            console.error(
                              "Failed to save theme preference:",
                              error
                            );
                          }
                        }}
                        className={`w-full h-10 rounded-lg border-2 transition-all ${
                          currentTheme.value === theme.value
                            ? "border-gray-900 scale-105"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                        style={{
                          background:
                            theme.value === "blue"
                              ? "#3b82f6"
                              : theme.value === "green"
                              ? "#10b981"
                              : "#8b5cf6",
                        }}
                        title={theme.name}
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-3 text-center">
                    Hiện tại: {currentTheme.name}
                  </p>
                </CardContent>
              </Card>

              {/* Digital Clock */}
              <Card className={currentTheme.cardBg}>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-gray-900">
                    <Timer className="w-5 h-5 mr-2 inline" />
                    Thời gian
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-2xl font-mono font-bold text-gray-900 mb-2">
                      {formatTime(currentTime)}
                    </div>
                    <div className="text-sm text-gray-600 mb-3">
                      {formatDate(currentTime)}
                    </div>
                    <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                      {isDaytime ? (
                        <>
                          <Sun className="w-4 h-4" />
                          <span>Ban ngày</span>
                        </>
                      ) : (
                        <>
                          <Moon className="w-4 h-4" />
                          <span>Ban đêm</span>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats Card */}
              <Card className={currentTheme.cardBg}>
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg text-gray-900">
                    Thống kê nhanh
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {isLoadingStats ? (
                    <div className="space-y-3">
                      {[...Array(3)].map((_, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-center"
                        >
                          <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                          <div className="h-6 bg-gray-200 rounded w-16 animate-pulse" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          Hoàn thành hôm nay
                        </span>
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800 rounded-full"
                        >
                          {statistics?.todayProgress ||
                            `${
                              Object.values(completedTasks).filter(Boolean)
                                .length
                            }/${currentDay?.tasks.length || 0}`}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          Tiến độ tuần
                        </span>
                        <Badge
                          variant="secondary"
                          className="bg-blue-100 text-blue-800 rounded-full"
                        >
                          {statistics?.weekProgress || 75}%
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">
                          Streak hiện tại
                        </span>
                        <Badge
                          variant="secondary"
                          className="bg-orange-100 text-orange-800 rounded-full"
                        >
                          {statistics?.currentStreak || user?.streak || 45} ngày
                        </Badge>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
