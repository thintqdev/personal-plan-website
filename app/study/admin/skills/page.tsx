"use client";
import { useState } from "react";
import {
  Lightbulb,
  Plus,
  Search,
  Filter,
  Award,
  Users,
  Target,
  TrendingUp,
} from "lucide-react";

export default function SkillsAdminPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const skillsStats = [
    {
      label: "Tổng khóa học",
      value: "15",
      icon: <Award className="w-5 h-5" />,
      color: "text-yellow-600",
    },
    {
      label: "Học viên đang học",
      value: "98",
      icon: <Users className="w-5 h-5" />,
      color: "text-purple-600",
    },
    {
      label: "Hoàn thành tuần",
      value: "81%",
      icon: <Target className="w-5 h-5" />,
      color: "text-blue-600",
    },
    {
      label: "Tăng trưởng",
      value: "+18%",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-orange-600",
    },
  ];

  const courses = [
    {
      id: 1,
      name: "Quản lý thời gian",
      level: "Beginner",
      students: 76,
      progress: 89,
      status: "active",
    },
    {
      id: 2,
      name: "Giao tiếp hiệu quả",
      level: "Intermediate",
      students: 54,
      progress: 76,
      status: "active",
    },
    {
      id: 3,
      name: "Lãnh đạo & Động lực",
      level: "Advanced",
      students: 42,
      progress: 83,
      status: "active",
    },
    {
      id: 4,
      name: "Tài chính cá nhân",
      level: "Beginner",
      students: 68,
      progress: 94,
      status: "completed",
    },
    {
      id: 5,
      name: "Thiết kế sáng tạo",
      level: "Intermediate",
      students: 39,
      progress: 71,
      status: "active",
    },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Quản lý Kĩ năng
          </h1>
          <p className="text-gray-600">
            Quản lý các khóa học phát triển kỹ năng mềm và cá nhân
          </p>
        </div>
        <button className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Tạo khóa học mới
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {skillsStats.map((stat, index) => (
          <div
            key={index}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-lg bg-gray-50 ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20 mb-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm khóa học..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-5 h-5" />
            Lọc
          </button>
        </div>
      </div>

      {/* Courses List */}
      <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900">
            Danh sách khóa học
          </h2>
        </div>

        <div className="divide-y divide-gray-100">
          {courses.map((course) => (
            <div
              key={course.id}
              className="p-6 hover:bg-gray-50/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <Lightbulb className="w-5 h-5 text-yellow-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {course.name}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        course.level === "Beginner"
                          ? "bg-green-100 text-green-800"
                          : course.level === "Intermediate"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {course.level}
                    </span>
                  </div>
                  <div className="flex items-center gap-6 text-sm text-gray-600">
                    <span>{course.students} học viên</span>
                    <span>Tiến độ: {course.progress}%</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <button className="text-yellow-600 hover:text-yellow-800 font-medium">
                    Chi tiết
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
