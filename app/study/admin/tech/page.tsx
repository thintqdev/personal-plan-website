"use client";
import { useState } from "react";
import {
  Cpu,
  Plus,
  Search,
  Filter,
  Code,
  Users,
  Target,
  TrendingUp,
} from "lucide-react";

export default function TechAdminPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const techStats = [
    {
      label: "Tổng khóa học",
      value: "18",
      icon: <Code className="w-5 h-5" />,
      color: "text-green-600",
    },
    {
      label: "Học viên đang học",
      value: "124",
      icon: <Users className="w-5 h-5" />,
      color: "text-blue-600",
    },
    {
      label: "Hoàn thành tuần",
      value: "72%",
      icon: <Target className="w-5 h-5" />,
      color: "text-purple-600",
    },
    {
      label: "Tăng trưởng",
      value: "+22%",
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-orange-600",
    },
  ];

  const courses = [
    {
      id: 1,
      name: "React & Next.js",
      level: "Intermediate",
      students: 67,
      progress: 85,
      status: "active",
    },
    {
      id: 2,
      name: "Node.js Backend",
      level: "Advanced",
      students: 43,
      progress: 78,
      status: "active",
    },
    {
      id: 3,
      name: "Python Data Science",
      level: "Beginner",
      students: 89,
      progress: 92,
      status: "active",
    },
    {
      id: 4,
      name: "DevOps & Cloud",
      level: "Advanced",
      students: 34,
      progress: 69,
      status: "active",
    },
    {
      id: 5,
      name: "Mobile Development",
      level: "Intermediate",
      students: 56,
      progress: 88,
      status: "completed",
    },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Quản lý Kỹ thuật
          </h1>
          <p className="text-gray-600">
            Quản lý các khóa học kỹ thuật và phát triển kỹ năng lập trình
          </p>
        </div>
        <button className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Tạo khóa học mới
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {techStats.map((stat, index) => (
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
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
                    <Cpu className="w-5 h-5 text-green-600" />
                    <h3 className="text-lg font-semibold text-gray-900">
                      {course.name}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        course.level === "Beginner"
                          ? "bg-green-100 text-green-800"
                          : course.level === "Intermediate"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
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
                      className="bg-gradient-to-r from-green-500 to-teal-500 h-2 rounded-full"
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <button className="text-green-600 hover:text-green-800 font-medium">
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
