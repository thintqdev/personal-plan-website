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
  Home,
  BookOpen,
} from "lucide-react";
import Link from "next/link";
import UserLayout from "@/components/layouts/UserLayout";
import {
  getQuotes,
  getUser,
  type Quote,
  type User,
  getTodayStatistics,
  getUserPreferences,
  updateUserPreferences,
  type Statistics,
  type UserPreferences,
} from "@/lib/user-service";
import {
  getTasksByDay,
  toggleTaskCompletion as apiToggleTaskCompletion,
  type DayTasks,
  getDayNameFromIndex,
  getCurrentDayIndex,
} from "@/lib/task-service";
import { COLOR_THEME, DAY_OF_WEEK } from "@/constants";

const colorThemes = COLOR_THEME;

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

    const dayNames = DAY_OF_WEEK;
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
  // const displayQuotes =
  //   quotes.length > 0 ? quotes.map((q) => q.text) : motivationalQuotes;

  // Get a single quote for the day based on date
  const getDailyQuote = () => {
    const today = new Date();
    const startOfDay = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );
    const dayIndex =
      Math.floor(startOfDay.getTime() / (1000 * 60 * 60 * 24)) %
      (quotes.length > 0 ? quotes.length : motivationalQuotes.length);
    return quotes.length > 0
      ? quotes[dayIndex].text
      : motivationalQuotes[dayIndex];
  };

  const dailyQuote = getDailyQuote();

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
    <UserLayout
      title="Kế hoạch trong tuần"
      description="Lên kế hoạch trong tuần hiệu quả"
      icon={<Home className="w-8 h-8 text-white" />}
      coverImage={coverImage}
      onCoverImageChange={changeCoverImage}
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {/* Motivational Quotes Section */}
          <Card className={`${currentTheme.cardBg} mb-8`}>
            <CardContent className="p-6 text-center">
              <div className="text-lg text-gray-700 italic">"{dailyQuote}"</div>
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
                  <span>Kế hoạch</span>
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
                    <div className={`text-sm font-medium ${currentTheme.text}`}>
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
                        className={`cursor-pointer flex items-start gap-3 p-4 rounded-xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all duration-200 ${
                          completed ? `opacity-60 line-through bg-gray-50` : ""
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 ${
                            completed
                              ? `bg-green-500 border-green-500 text-white`
                              : `border-gray-300 hover:border-green-400`
                          }`}
                        >
                          {completed && <Check className="w-4 h-4" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div
                            className={`text-sm font-mono ${currentTheme.textMuted} font-medium bg-gray-50 px-2 py-1 rounded-lg border border-gray-200 inline-block mb-2`}
                          >
                            {task.time}
                          </div>
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span
                              className={`text-base font-medium break-words ${currentTheme.text} flex-1 min-w-0`}
                            >
                              {task.task}
                            </span>
                            <Badge
                              variant="secondary"
                              className={`${taskColor} text-xs flex-shrink-0 rounded-full px-2.5 py-0.5 whitespace-nowrap`}
                            >
                              {task.type}
                            </Badge>
                          </div>
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
          <div className="lg:sticky lg:top-8 space-y-6"></div>
        </div>
      </div>
    </UserLayout>
  );
}
