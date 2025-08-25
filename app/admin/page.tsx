"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, User, Calendar, Plus, Trash2, Save, Upload, Quote, Filter } from "lucide-react"
import Link from "next/link"

export default function AdminPage() {
  const [profile, setProfile] = useState({
    name: "Nguyễn Văn A",
    role: "Lập trình viên & Học viên tiếng Nhật",
    joinDate: "15/01/2024",
    goal: "JLPT N3",
    streak: 45,
    avatar: "/friendly-person-avatar.png",
  })

  const [quotes, setQuotes] = useState([
    "Thành công không phải là chìa khóa của hạnh phúc. Hạnh phúc là chìa khóa của thành công.",
    "Đừng chờ đợi cơ hội, hãy tạo ra nó.",
    "Mỗi ngày là một cơ hội mới để trở thành phiên bản tốt hơn của chính mình.",
    "Kỷ luật là cầu nối giữa mục tiêu và thành tựu.",
    "Hành trình ngàn dặm bắt đầu từ một bước chân.",
  ])

  const [newQuote, setNewQuote] = useState("")

  const [selectedDayFilter, setSelectedDayFilter] = useState("Tất cả")

  const [newTask, setNewTask] = useState({
    time: "",
    task: "",
    type: "Study",
    day: "Thứ Hai",
  })

  const [tasks, setTasks] = useState([
    {
      id: "1",
      day: "Thứ Hai",
      time: "06:30 - 07:30",
      task: "Thói quen buổi sáng + Podcast 🇯🇵",
      type: "Study",
    },
    {
      id: "2",
      day: "Thứ Hai",
      time: "08:00 - 18:00",
      task: "Làm việc (tập trung 3 nhiệm vụ chính)",
      type: "Work",
    },
    {
      id: "3",
      day: "Thứ Ba",
      time: "07:00 - 08:00",
      task: "Tập thể dục buổi sáng",
      type: "Gym",
    },
    {
      id: "4",
      day: "Thứ Tư",
      time: "19:00 - 20:00",
      task: "Học tiếng Nhật - Kanji",
      type: "Study",
    },
  ])

  const taskTypes = ["Study", "Work", "Gym", "Relax", "Social"]
  const days = ["Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy", "Chủ Nhật"]
  const dayFilterOptions = ["Tất cả", ...days]

  const handleProfileUpdate = (field: string, value: string) => {
    setProfile((prev) => ({ ...prev, [field]: value }))
  }

  const handleAddQuote = () => {
    if (newQuote.trim()) {
      setQuotes((prev) => [...prev, newQuote.trim()])
      setNewQuote("")
    }
  }

  const handleDeleteQuote = (index: number) => {
    setQuotes((prev) => prev.filter((_, i) => i !== index))
  }

  const handleAddTask = () => {
    if (newTask.time && newTask.task) {
      const task = {
        id: Date.now().toString(),
        ...newTask,
      }
      setTasks((prev) => [...prev, task])
      setNewTask({ time: "", task: "", type: "Study", day: "Thứ Hai" })
    }
  }

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  const filteredTasks = selectedDayFilter === "Tất cả" ? tasks : tasks.filter((task) => task.day === selectedDayFilter)

  const getTypeColor = (type: string) => {
    const colors = {
      Study: "bg-blue-100 text-blue-800",
      Work: "bg-green-100 text-green-800",
      Gym: "bg-orange-100 text-orange-800",
      Relax: "bg-purple-100 text-purple-800",
      Social: "bg-pink-100 text-pink-800",
    }
    return colors[type as keyof typeof colors] || "bg-gray-100 text-gray-800"
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6 sm:mb-8">
          <Link href="/">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại
            </Button>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold font-serif">Admin - Quản lý ThinPlan</h1>
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
              <div className="flex flex-col items-center gap-4">
                <Avatar className="w-20 h-20 sm:w-24 sm:h-24 border-4 border-primary">
                  <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                  <AvatarFallback className="text-xl sm:text-2xl bg-primary text-primary-foreground">TP</AvatarFallback>
                </Avatar>
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-2" />
                  Đổi avatar
                </Button>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="text-sm font-medium">
                    Họ tên
                  </Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => handleProfileUpdate("name", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="role" className="text-sm font-medium">
                    Vai trò
                  </Label>
                  <Input
                    id="role"
                    value={profile.role}
                    onChange={(e) => handleProfileUpdate("role", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="goal" className="text-sm font-medium">
                    Mục tiêu
                  </Label>
                  <Input
                    id="goal"
                    value={profile.goal}
                    onChange={(e) => handleProfileUpdate("goal", e.target.value)}
                    className="mt-1"
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
                    onChange={(e) => handleProfileUpdate("streak", e.target.value)}
                    className="mt-1"
                  />
                </div>

                <Button className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Lưu thông tin
                </Button>
              </div>
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
                <h3 className="font-semibold text-sm sm:text-base">Thêm câu châm ngôn mới</h3>

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

                <Button onClick={handleAddQuote} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm câu châm ngôn
                </Button>
              </div>

              {/* Quotes List */}
              <div className="space-y-3">
                <h3 className="font-semibold text-sm sm:text-base">Danh sách câu châm ngôn</h3>
                <div className="max-h-96 overflow-y-auto space-y-2">
                  {quotes.map((quote, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-card rounded-lg border">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm italic break-words">"{quote}"</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteQuote(index)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
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
                <h3 className="font-semibold text-sm sm:text-base">Thêm công việc mới</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="day" className="text-sm">
                      Ngày
                    </Label>
                    <Select
                      value={newTask.day}
                      onValueChange={(value) => setNewTask((prev) => ({ ...prev, day: value }))}
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
                      onValueChange={(value) => setNewTask((prev) => ({ ...prev, type: value }))}
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

                <div>
                  <Label htmlFor="time" className="text-sm">
                    Thời gian
                  </Label>
                  <Input
                    id="time"
                    placeholder="VD: 08:00 - 09:00"
                    value={newTask.time}
                    onChange={(e) => setNewTask((prev) => ({ ...prev, time: e.target.value }))}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="task" className="text-sm">
                    Công việc
                  </Label>
                  <Textarea
                    id="task"
                    placeholder="Mô tả công việc..."
                    value={newTask.task}
                    onChange={(e) => setNewTask((prev) => ({ ...prev, task: e.target.value }))}
                    className="mt-1"
                    rows={2}
                  />
                </div>

                <Button onClick={handleAddTask} className="w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm công việc
                </Button>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-sm sm:text-base">Danh sách công việc</h3>
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-muted-foreground" />
                    <Select value={selectedDayFilter} onValueChange={setSelectedDayFilter}>
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
                  {filteredTasks.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Calendar className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">Không có công việc nào</p>
                    </div>
                  ) : (
                    filteredTasks.map((task) => (
                      <div key={task.id} className="flex items-center gap-3 p-3 bg-card rounded-lg border">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <Badge variant="outline" className="text-xs">
                              {task.day}
                            </Badge>
                            <Badge variant="secondary" className={`${getTypeColor(task.type)} text-xs`}>
                              {task.type}
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground font-mono mb-1">{task.time}</div>
                          <div className="text-sm font-medium break-words">{task.task}</div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-red-600 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
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
  )
}
