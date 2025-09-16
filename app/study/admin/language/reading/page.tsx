"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Search,
  BookOpen,
  Edit,
  Trash2,
  Eye,
  FileText,
} from "lucide-react";

export default function ReadingAdminPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const readingItems = [
    {
      id: 1,
      title: "Giới thiệu về văn hóa Nhật Bản",
      level: "N5",
      type: "Đọc hiểu",
      questions: 8,
      wordCount: 250,
      lastUpdated: "2 ngày trước",
    },
    {
      id: 2,
      title: "Mô tả gia đình và công việc",
      level: "N4",
      type: "Đọc hiểu",
      questions: 10,
      wordCount: 320,
      lastUpdated: "1 ngày trước",
    },
    {
      id: 3,
      title: "Bài báo về công nghệ tương lai",
      level: "N3",
      type: "Đọc hiểu nâng cao",
      questions: 12,
      wordCount: 450,
      lastUpdated: "3 ngày trước",
    },
    {
      id: 4,
      title: "Truyện ngắn: Một ngày ở Tokyo",
      level: "N4",
      type: "Truyện kể",
      questions: 15,
      wordCount: 380,
      lastUpdated: "1 tuần trước",
    },
  ];

  const readingTypes = [
    { name: "Đọc hiểu cơ bản", count: 20, color: "bg-blue-100 text-blue-800" },
    {
      name: "Đọc hiểu nâng cao",
      count: 15,
      color: "bg-green-100 text-green-800",
    },
    { name: "Truyện kể", count: 12, color: "bg-purple-100 text-purple-800" },
    { name: "Bài báo", count: 8, color: "bg-orange-100 text-orange-800" },
    { name: "Thư từ", count: 6, color: "bg-red-100 text-red-800" },
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
            Quản lý Đọc hiểu
          </h1>
          <p className="text-gray-600">
            Tạo và quản lý bài đọc và bài tập đọc hiểu
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Tổng bài đọc</p>
              <p className="text-2xl font-bold text-gray-900">156</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">JLPT N5</p>
              <p className="text-2xl font-bold text-gray-900">67</p>
            </div>
            <div className="p-3 rounded-lg bg-green-50 text-green-600">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">JLPT N4</p>
              <p className="text-2xl font-bold text-gray-900">89</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Loại bài đọc</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
            <div className="p-3 rounded-lg bg-orange-50 text-orange-600">
              <FileText className="w-5 h-5" />
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
            placeholder="Tìm kiếm bài đọc..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <Link href="/study/admin/language/reading/new">
          <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 flex items-center gap-2">
            <Plus className="w-5 h-5" />
            Tạo bài đọc
          </button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Reading Types */}
        <div className="lg:col-span-1">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Loại bài đọc
            </h3>
            <div className="space-y-3">
              {readingTypes.map((type, index) => (
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

        {/* Reading Materials List */}
        <div className="lg:col-span-2">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                Danh sách bài đọc
              </h3>
            </div>
            <div className="divide-y divide-gray-100">
              {readingItems.map((item) => (
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
                        <span>{item.wordCount} từ</span>
                        <span>Cập nhật: {item.lastUpdated}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                      <Link
                        href={`/study/admin/language/reading/${item.id}/edit`}
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
