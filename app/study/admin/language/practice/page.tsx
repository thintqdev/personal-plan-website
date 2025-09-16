"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Search,
  Target,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  Clock,
  Users,
} from "lucide-react";

export default function PracticeAdminPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const practiceItems = [
    {
      id: 1,
      title: "Bài tập tổng hợp JLPT N5",
      level: "N5",
      type: "Tổng hợp",
      questions: 50,
      duration: "45 phút",
      attempts: 234,
      lastUpdated: "1 ngày trước",
    },
    {
      id: 2,
      title: "Luyện tập ngữ pháp N4",
      level: "N4",
      type: "Ngữ pháp",
      questions: 30,
      duration: "30 phút",
      attempts: 189,
      lastUpdated: "2 ngày trước",
    },
    {
      id: 3,
      title: "Bài tập từ vựng nâng cao",
      level: "N3",
      type: "Từ vựng",
      questions: 40,
      duration: "35 phút",
      attempts: 156,
      lastUpdated: "3 ngày trước",
    },
    {
      id: 4,
      title: "Đọc hiểu và ngữ pháp N4",
      level: "N4",
      type: "Đọc hiểu",
      questions: 25,
      duration: "40 phút",
      attempts: 201,
      lastUpdated: "1 tuần trước",
    },
  ];

  const practiceTypes = [
    { name: "Tổng hợp", count: 25, color: "bg-blue-100 text-blue-800" },
    { name: "Ngữ pháp", count: 18, color: "bg-green-100 text-green-800" },
    { name: "Từ vựng", count: 22, color: "bg-purple-100 text-purple-800" },
    { name: "Đọc hiểu", count: 15, color: "bg-orange-100 text-orange-800" },
    { name: "Nghe hiểu", count: 12, color: "bg-red-100 text-red-800" },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/study/admin/language"
          className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Quản lý Bài tập
          </h1>
          <p className="text-gray-600">
            Tạo và quản lý các bài tập luyện thi JLPT
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Tổng bài tập</p>
              <p className="text-2xl font-bold text-gray-900">92</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
              <Target className="w-5 h-5" />
            </div>
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Lượt làm bài</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
            </div>
            <div className="p-3 rounded-lg bg-green-50 text-green-600">
              <Users className="w-5 h-5" />
            </div>
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Độ khó trung bình</p>
              <p className="text-2xl font-bold text-gray-900">N4</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
              <CheckCircle className="w-5 h-5" />
            </div>
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Thời gian trung bình</p>
              <p className="text-2xl font-bold text-gray-900">38m</p>
            </div>
            <div className="p-3 rounded-lg bg-orange-50 text-orange-600">
              <Clock className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm bài tập..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <Link href="/study/admin/language/practice/new">
          <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Tạo bài tập
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Practice Types */}
        <div className="lg:col-span-1">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Loại bài tập
            </h3>
            <div className="space-y-3">
              {practiceTypes.map((type, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  <div>
                    <span className="font-medium text-gray-900">
                      {type.name}
                    </span>
                    <span className="text-sm text-gray-600 ml-2">
                      ({type.count})
                    </span>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${type.color}`}
                  >
                    {type.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Practice Tests List */}
        <div className="lg:col-span-2">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                Danh sách bài tập
              </h3>
            </div>
            <div className="divide-y divide-gray-100">
              {practiceItems.map((item) => (
                <div
                  key={item.id}
                  className="p-6 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="text-xl font-bold text-gray-900">
                          {item.title}
                        </div>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {item.level}
                        </span>
                        <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-xs font-medium">
                          {item.type}
                        </span>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <span>{item.questions} câu hỏi</span>
                        <span>{item.duration}</span>
                        <span>{item.attempts} lượt làm</span>
                        <span>Cập nhật: {item.lastUpdated}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <Link
                        href={`/study/admin/language/practice/${item.id}/edit`}
                      >
                        <button className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                      </Link>
                      <button className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
