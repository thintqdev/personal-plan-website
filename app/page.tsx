"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
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
} from "lucide-react"
import Link from "next/link"

const colorThemes = [
  {
    name: "Tím Violet",
    value: "violet",
    gradient: "from-violet-50 via-purple-50 to-indigo-50",
    primary: "violet",
    cardBg: "bg-white/80 backdrop-blur-sm border-violet-200",
    text: "text-violet-900",
    textSecondary: "text-violet-700",
    textMuted: "text-violet-600",
    button: "bg-transparent border-violet-300 text-violet-700 hover:bg-violet-50",
    accent: "text-violet-500",
    clockBg: "from-violet-900 to-purple-900",
  },
  {
    name: "Hồng Pink",
    value: "pink",
    gradient: "from-pink-50 via-rose-50 to-red-50",
    primary: "pink",
    cardBg: "bg-white/80 backdrop-blur-sm border-pink-200",
    text: "text-pink-900",
    textSecondary: "text-pink-700",
    textMuted: "text-pink-600",
    button: "bg-transparent border-pink-300 text-pink-700 hover:bg-pink-50",
    accent: "text-pink-500",
    clockBg: "from-pink-900 to-rose-900",
  },
  {
    name: "Xanh Blue",
    value: "blue",
    gradient: "from-blue-50 via-sky-50 to-cyan-50",
    primary: "blue",
    cardBg: "bg-white/80 backdrop-blur-sm border-blue-200",
    text: "text-blue-900",
    textSecondary: "text-blue-700",
    textMuted: "text-blue-600",
    button: "bg-transparent border-blue-300 text-blue-700 hover:bg-blue-50",
    accent: "text-blue-500",
    clockBg: "from-blue-900 to-sky-900",
  },
  {
    name: "Xanh lá Green",
    value: "green",
    gradient: "from-green-50 via-emerald-50 to-teal-50",
    primary: "green",
    cardBg: "bg-white/80 backdrop-blur-sm border-green-200",
    text: "text-green-900",
    textSecondary: "text-green-700",
    textMuted: "text-green-600",
    button: "bg-transparent border-green-300 text-green-700 hover:bg-green-50",
    accent: "text-green-500",
    clockBg: "from-green-900 to-emerald-900",
  },
  {
    name: "Cam Orange",
    value: "orange",
    gradient: "from-orange-50 via-amber-50 to-yellow-50",
    primary: "orange",
    cardBg: "bg-white/80 backdrop-blur-sm border-orange-200",
    text: "text-orange-900",
    textSecondary: "text-orange-700",
    textMuted: "text-orange-600",
    button: "bg-transparent border-orange-300 text-orange-700 hover:bg-orange-50",
    accent: "text-orange-500",
    clockBg: "from-orange-900 to-amber-900",
  },
]

export default function ThinPlanPage() {
  const coverImages = [
    "/mountain-peak-sunrise-motivation-success.png",
    "/person-climbing-stairs-to-success.png",
    "/runner-crossing-finish-line-victory.png",
    "/lighthouse-guiding-ships-motivation.png",
    "/eagle-soaring-high-mountains-freedom.png",
  ]

  const [coverImage, setCoverImage] = useState(coverImages[0])
  const [currentDayIndex, setCurrentDayIndex] = useState(0)
  const [completedTasks, setCompletedTasks] = useState<{ [key: string]: boolean }>({})
  const [currentTime, setCurrentTime] = useState(new Date())
  const [isDaytime, setIsDaytime] = useState(true)
  const [currentTheme, setCurrentTheme] = useState(colorThemes[0])

  const motivationalQuotes = [
    "Thành công là tổng của những nỗ lực nhỏ lặp đi lặp lại mỗi ngày",
    "Hành trình ngàn dặm bắt đầu từ một bước chân",
    "Không có gì là không thể, chỉ có điều bạn chưa thử đủ lâu",
    "Mỗi ngày là một cơ hội mới để trở thành phiên bản tốt hơn của chính mình",
    "Kỷ luật là cầu nối giữa mục tiêu và thành tựu",
  ]

  const getDayData = (dayIndex: number) => {
    const today = new Date()
    const currentDayOfWeek = today.getDay() // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const mondayOffset = currentDayOfWeek === 0 ? -6 : 1 - currentDayOfWeek // Calculate offset to Monday

    const monday = new Date(today)
    monday.setDate(today.getDate() + mondayOffset)

    const targetDate = new Date(monday)
    targetDate.setDate(monday.getDate() + dayIndex)

    const dayNames = ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy", "Chủ Nhật"]
    const dayName = dayNames[dayIndex]
    const dateString = targetDate.toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })

    return { dayName, dateString, date: targetDate }
  }

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
  ]

  useEffect(() => {
    const today = new Date()
    const currentDayOfWeek = today.getDay() // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    const currentIndex = currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1 // Convert to our 0-6 index (Mon-Sun)
    setCurrentDayIndex(currentIndex)

    const timer = setInterval(() => {
      const now = new Date()
      setCurrentTime(now)
      setIsDaytime(now.getHours() >= 6 && now.getHours() < 18)
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const changeCoverImage = () => {
    const randomIndex = Math.floor(Math.random() * coverImages.length)
    setCoverImage(coverImages[randomIndex])
  }

  const toggleTaskCompletion = (taskId: string) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }))
  }

  const goToPreviousDay = () => {
    if (currentDayIndex > 0) {
      setCurrentDayIndex(currentDayIndex - 1)
    }
  }

  const goToNextDay = () => {
    if (currentDayIndex < 6) {
      setCurrentDayIndex(currentDayIndex + 1)
    }
  }

  const currentDay = dailyPlans[currentDayIndex]

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("vi-VN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${currentTheme.gradient}`}>
      {/* Cover Image Section */}
      <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden">
        <img src={coverImage || "/placeholder.svg"} alt="Cover" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
        <Button
          variant="secondary"
          size="sm"
          className="absolute top-2 right-2 sm:top-4 sm:right-4 text-xs sm:text-sm bg-white/90 hover:bg-white"
          onClick={changeCoverImage}
        >
          <Camera className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
          <span className="hidden sm:inline">Đổi ảnh bìa</span>
          <span className="sm:hidden">Đổi ảnh</span>
        </Button>

        {/* Logo/Title Overlay */}
        <div className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg font-serif">ThinPlan</h1>
          <p className="text-white/90 text-sm sm:text-base md:text-lg drop-shadow">
            Kế hoạch thông minh, cuộc sống ý nghĩa
          </p>
        </div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          {/* Left Sidebar - Profile */}
          <div className="lg:col-span-1 order-2 lg:order-1">
            <Card className={`lg:sticky lg:top-8 ${currentTheme.cardBg}`}>
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar
                    className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 mb-3 sm:mb-4 border-2 sm:border-4 border-${currentTheme.primary}-400`}
                  >
                    <AvatarImage src="/friendly-person-avatar.png" />
                    <AvatarFallback
                      className={`text-lg sm:text-xl lg:text-2xl bg-${currentTheme.primary}-500 text-white`}
                    >
                      TP
                    </AvatarFallback>
                  </Avatar>
                  <h2 className={`text-lg sm:text-xl font-semibold mb-2 ${currentTheme.text}`}>Nguyễn Văn A</h2>
                  <p className={`text-sm ${currentTheme.textMuted} mb-3 sm:mb-4`}>
                    Lập trình viên & Học viên tiếng Nhật
                  </p>

                  <div className="w-full space-y-2 sm:space-y-3">
                    <div className={`flex items-center gap-2 text-xs sm:text-sm ${currentTheme.textSecondary}`}>
                      <Calendar className={`w-3 h-3 sm:w-4 sm:h-4 ${currentTheme.accent}`} />
                      <span>Tham gia: 15/01/2024</span>
                    </div>
                    <div className={`flex items-center gap-2 text-xs sm:text-sm ${currentTheme.textSecondary}`}>
                      <Target className={`w-3 h-3 sm:w-4 sm:h-4 ${currentTheme.accent}`} />
                      <span>Mục tiêu: JLPT N3</span>
                    </div>
                    <div className={`flex items-center gap-2 text-xs sm:text-sm ${currentTheme.textSecondary}`}>
                      <Clock className={`w-3 h-3 sm:w-4 sm:h-4 ${currentTheme.accent}`} />
                      <span>Streak: 45 ngày</span>
                    </div>
                  </div>

                  <Link href="/admin" className="w-full">
                    <Button
                      variant="outline"
                      className={`w-full mt-3 sm:mt-4 ${currentTheme.button} text-xs sm:text-sm`}
                    >
                      <Settings className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Admin
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-4 sm:space-y-6 lg:space-y-8 order-1 lg:order-2">
            {/* Motivational Quotes Marquee */}
            <Card className={`overflow-hidden ${currentTheme.cardBg} shadow-lg`}>
              <CardContent className="p-0">
                <div
                  className={`relative bg-gradient-to-r from-${currentTheme.primary}-500 via-${currentTheme.primary}-400 to-${currentTheme.primary}-500 py-4 sm:py-5 lg:py-6 overflow-hidden`}
                >
                  {/* Background decorative elements */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-2 left-10 w-8 h-8 bg-white rounded-full animate-pulse"></div>
                    <div className="absolute bottom-3 right-20 w-6 h-6 bg-white rounded-full animate-pulse delay-1000"></div>
                    <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-white rounded-full animate-pulse delay-500"></div>
                    <div className="absolute top-1/4 right-1/3 w-5 h-5 bg-white rounded-full animate-pulse delay-700"></div>
                  </div>

                  {/* Gradient overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20"></div>

                  {/* Main marquee content */}
                  <div className="relative z-10">
                    <div className="animate-marquee whitespace-nowrap">
                      <span className="text-white font-semibold text-base sm:text-lg lg:text-xl mx-6 sm:mx-8 lg:mx-12 drop-shadow-lg">
                        ✨ {motivationalQuotes.join(" ✨ • ✨ ")} ✨
                      </span>
                    </div>
                  </div>

                  {/* Bottom accent line */}
                  <div
                    className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent`}
                  ></div>
                </div>
              </CardContent>
            </Card>

            <Card className={`${currentTheme.cardBg}`}>
              <CardHeader className="pb-3 sm:pb-6">
                <div className="flex items-center justify-between">
                  <CardTitle className={`flex items-center gap-2 text-lg sm:text-xl ${currentTheme.text}`}>
                    <Calendar className={`w-4 h-4 sm:w-5 sm:h-5 ${currentTheme.accent}`} />
                    <span className="hidden sm:inline">Kế hoạch hôm nay</span>
                    <span className="sm:hidden">Hôm nay</span>
                  </CardTitle>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToPreviousDay}
                      disabled={currentDayIndex === 0}
                      className={`h-8 w-8 sm:h-9 sm:w-9 p-0 ${currentTheme.button} ${
                        currentDayIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                    <div className="text-center px-2 sm:px-4">
                      <div className={`text-xs sm:text-sm font-medium ${currentTheme.text}`}>{currentDay?.day}</div>
                      <div className={`text-xs ${currentTheme.textMuted} hidden sm:block`}>{currentDay?.date}</div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={goToNextDay}
                      disabled={currentDayIndex === 6}
                      className={`h-8 w-8 sm:h-9 sm:w-9 p-0 ${currentTheme.button} ${
                        currentDayIndex === 6 ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 sm:space-y-3">
                  {currentDay?.tasks.map((task, taskIndex) => (
                    <div
                      key={taskIndex}
                      className={`group flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl bg-white/70 hover:bg-white/90 transition-all duration-300 border border-${currentTheme.primary}-100 shadow-sm hover:shadow-lg hover:scale-[1.02] ${
                        completedTasks[task.id] ? `opacity-60 line-through bg-${currentTheme.primary}-50/50` : ""
                      }`}
                    >
                      <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
                        <button
                          onClick={() => toggleTaskCompletion(task.id)}
                          className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 flex-shrink-0 ${
                            completedTasks[task.id]
                              ? `bg-${currentTheme.primary}-500 border-${currentTheme.primary}-500 text-white shadow-lg scale-110`
                              : `border-${currentTheme.primary}-300 hover:border-${currentTheme.primary}-500 hover:bg-${currentTheme.primary}-50 group-hover:scale-110`
                          }`}
                        >
                          {completedTasks[task.id] && <Check className="w-3 h-3 sm:w-4 sm:h-4" />}
                        </button>
                        <div
                          className={`text-xs sm:text-sm font-mono ${currentTheme.textMuted} font-medium bg-${currentTheme.primary}-50 px-2 py-1 rounded-lg border border-${currentTheme.primary}-200 flex-shrink-0`}
                        >
                          {task.time}
                        </div>
                        <Badge
                          variant="secondary"
                          className={`${task.color} text-xs flex-shrink-0 rounded-full px-2 py-1 sm:hidden`}
                        >
                          {task.type}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between w-full sm:flex-1">
                        <span className={`text-sm sm:text-base font-medium break-words ${currentTheme.text} flex-1`}>
                          {task.task}
                        </span>
                        <Badge
                          variant="secondary"
                          className={`${task.color} text-xs flex-shrink-0 rounded-full px-3 py-1 ml-2 hidden sm:inline-flex`}
                        >
                          {task.type}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar with Digital Clock and Color Picker */}
          <div className="lg:col-span-1 order-3 lg:order-3">
            <div className="lg:sticky lg:top-8 space-y-4">
              <Card className={`${currentTheme.cardBg}`}>
                <CardHeader className="pb-3">
                  <CardTitle className={`flex items-center gap-2 text-lg ${currentTheme.text}`}>
                    <Palette className={`w-5 h-5 ${currentTheme.accent}`} />
                    Chọn màu
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-3 gap-2">
                    {colorThemes.map((theme) => (
                      <button
                        key={theme.value}
                        onClick={() => setCurrentTheme(theme)}
                        className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                          currentTheme.value === theme.value
                            ? `border-${theme.primary}-600 scale-110 shadow-lg`
                            : `border-${theme.primary}-300 hover:scale-105`
                        } bg-gradient-to-br from-${theme.primary}-400 to-${theme.primary}-600`}
                        title={theme.name}
                      />
                    ))}
                  </div>
                  <p className={`text-xs ${currentTheme.textMuted} mt-2 text-center`}>Hiện tại: {currentTheme.name}</p>
                </CardContent>
              </Card>

              <Card className={`${currentTheme.cardBg}`}>
                <CardHeader className="pb-3">
                  <CardTitle className={`flex items-center gap-2 text-lg ${currentTheme.text}`}>
                    <Timer className={`w-5 h-5 ${currentTheme.accent}`} />
                    Đồng hồ điện tử
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <div
                    className={`bg-black text-green-400 p-4 rounded-xl mb-4 shadow-2xl border-2 border-gray-800 font-mono relative overflow-hidden`}
                  >
                    {/* LED-style background pattern */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black opacity-90"></div>
                    <div className="relative z-10">
                      <div className="text-2xl sm:text-3xl font-bold mb-2 tracking-wider filter drop-shadow-[0_0_10px_currentColor]">
                        {formatTime(currentTime)}
                      </div>
                      <div className="text-sm opacity-80 tracking-wide">{formatDate(currentTime)}</div>
                    </div>
                    {/* Subtle scan line effect */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-green-400/5 to-transparent animate-pulse"></div>
                  </div>

                  <div className={`flex items-center justify-center gap-2 text-sm ${currentTheme.textSecondary}`}>
                    {isDaytime ? (
                      <>
                        <Sun className="w-4 h-4 text-yellow-500" />
                        <span>Ban ngày</span>
                      </>
                    ) : (
                      <>
                        <Moon className="w-4 h-4 text-blue-400" />
                        <span>Ban đêm</span>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Quick Stats Card */}
              <Card className={`${currentTheme.cardBg}`}>
                <CardHeader className="pb-3">
                  <CardTitle className={`text-lg ${currentTheme.text}`}>Thống kê nhanh</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${currentTheme.textSecondary}`}>Hoàn thành hôm nay</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800 rounded-full">
                      {Object.values(completedTasks).filter(Boolean).length}/{currentDay?.tasks.length || 0}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${currentTheme.textSecondary}`}>Tiến độ tuần</span>
                    <Badge variant="secondary" className="bg-blue-100 text-blue-800 rounded-full">
                      75%
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-sm ${currentTheme.textSecondary}`}>Streak hiện tại</span>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800 rounded-full">
                      45 ngày
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translate3d(100%, 0, 0); }
          100% { transform: translate3d(-100%, 0, 0); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </div>
  )
}
