"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Globe,
  Plus,
  Search,
  BookOpen,
  Users,
  Target,
  TrendingUp,
  FileText,
  PenTool,
  Brain,
  Languages,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

export default function LanguageAdminPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("japanese");
  const [expandedSections, setExpandedSections] = useState({
    japanese: true,
    english: false,
  });

  const toggleSection = (language: "japanese" | "english") => {
    setExpandedSections((prev) => ({
      ...prev,
      [language]: !prev[language],
    }));
  };

  const languageStats = [
    {
      label: "Từ vựng",
      value: "1,247",
      icon: <Brain className="w-5 h-5" />,
      color: "text-green-600",
    },
    {
      label: "Ngữ pháp",
      value: "89",
      icon: <PenTool className="w-5 h-5" />,
      color: "text-purple-600",
    },
    {
      label: "Đọc hiểu",
      value: "156",
      icon: <BookOpen className="w-5 h-5" />,
      color: "text-blue-600",
    },
    {
      label: "Luyện tập",
      value: "234",
      icon: <Target className="w-5 h-5" />,
      color: "text-orange-600",
    },
  ];

  const japaneseContent = {
    contentTypes: [
      {
        type: "vocabulary",
        name: "Từ vựng",
        icon: <Brain className="w-5 h-5 text-green-600" />,
        count: 456,
        lastUpdated: "2 ngày trước",
        description: "Từ vựng JLPT và từ vựng hàng ngày",
      },
      {
        type: "grammar",
        name: "Ngữ pháp",
        icon: <PenTool className="w-5 h-5 text-purple-600" />,
        count: 89,
        lastUpdated: "1 tuần trước",
        description: "Cấu trúc ngữ pháp và cách sử dụng",
      },
      {
        type: "reading",
        name: "Đọc hiểu",
        icon: <BookOpen className="w-5 h-5 text-blue-600" />,
        count: 67,
        lastUpdated: "3 ngày trước",
        description: "Bài đọc và bài tập đọc hiểu",
      },
      {
        type: "practice",
        name: "Luyện tập",
        icon: <Target className="w-5 h-5 text-orange-600" />,
        count: 123,
        lastUpdated: "1 ngày trước",
        description: "Bài tập tổng hợp và ôn tập",
      },
    ],
    categories: [
      { name: "Từ vựng N5", count: 156, lastUpdated: "2 ngày trước" },
      { name: "Ngữ pháp N4", count: 89, lastUpdated: "1 tuần trước" },
      { name: "Đọc hiểu JLPT", count: 203, lastUpdated: "3 ngày trước" },
      { name: "Luyện tập Kanji", count: 67, lastUpdated: "5 ngày trước" },
    ],
  };

  const englishContent = {
    contentTypes: [
      {
        type: "vocabulary",
        name: "Từ vựng",
        icon: <Brain className="w-5 h-5 text-green-600" />,
        count: 791,
        lastUpdated: "1 ngày trước",
        description: "Từ vựng cơ bản và nâng cao",
      },
      {
        type: "grammar",
        name: "Ngữ pháp",
        icon: <PenTool className="w-5 h-5 text-purple-600" />,
        count: 55,
        lastUpdated: "4 ngày trước",
        description: "Thì động từ và cấu trúc câu",
      },
      {
        type: "reading",
        name: "Đọc hiểu",
        icon: <BookOpen className="w-5 h-5 text-blue-600" />,
        count: 89,
        lastUpdated: "2 ngày trước",
        description: "Bài đọc và comprehension",
      },
      {
        type: "practice",
        name: "Luyện tập",
        icon: <Target className="w-5 h-5 text-orange-600" />,
        count: 111,
        lastUpdated: "3 ngày trước",
        description: "Bài tập thực hành và test",
      },
    ],
    categories: [
      { name: "Business Vocabulary", count: 134, lastUpdated: "1 ngày trước" },
      { name: "Grammar Exercises", count: 78, lastUpdated: "4 ngày trước" },
      { name: "Reading Comprehension", count: 92, lastUpdated: "2 ngày trước" },
      { name: "Practice Tests", count: 156, lastUpdated: "1 tuần trước" },
    ],
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Tạo Nội dung Học tập
          </h1>
          <p className="text-gray-600">
            Tạo và quản lý nội dung học tập theo loại: Từ vựng, Ngữ pháp, Đọc
            hiểu, Luyện tập
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/study/admin/language/new">
            <button className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              Tạo bài học mới
            </button>
          </Link>
          <Link href="/study/admin/language/import">
            <button className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-6 py-3 rounded-xl font-medium hover:shadow-lg transition-all duration-200 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Import dữ liệu
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {languageStats.map((stat, index) => (
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

      {/* Language Content Sections */}
      <div className="space-y-6">
        {/* Japanese Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 overflow-hidden">
          <div
            className="p-6 border-b border-gray-100 cursor-pointer hover:bg-gray-50/50 transition-colors"
            onClick={() => toggleSection("japanese")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">日</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Tiếng Nhật (日本語)
                  </h2>
                  <p className="text-gray-600">
                    Nội dung học tập tiếng Nhật theo loại: Từ vựng, Ngữ pháp,
                    Đọc hiểu, Luyện tập
                  </p>
                </div>
              </div>
              {expandedSections.japanese ? (
                <ChevronDown className="w-6 h-6 text-gray-400" />
              ) : (
                <ChevronRight className="w-6 h-6 text-gray-400" />
              )}
            </div>
          </div>

          {expandedSections.japanese && (
            <div className="p-6">
              {/* Content Types */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Các loại nội dung học tập
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {japaneseContent.contentTypes.map((contentType, index) => (
                    <Link
                      key={index}
                      href={`/study/admin/language/${contentType.type}`}
                    >
                      <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-4 border border-red-100 cursor-pointer hover:shadow-md hover:bg-gradient-to-r hover:from-red-100 hover:to-pink-100 transition-all duration-200">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {contentType.icon}
                            <h4 className="font-bold text-red-800">
                              {contentType.name}
                            </h4>
                          </div>
                          <Plus className="w-5 h-5 text-red-600" />
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {contentType.description}
                        </p>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">
                            {contentType.count} mục
                          </span>
                          <span className="text-gray-500">
                            Cập nhật {contentType.lastUpdated}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Content Categories */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Danh mục
                  </h3>
                  <Link href="/study/admin/language/categories/new">
                    <button className="text-red-600 hover:text-red-800 p-1">
                      <Plus className="w-5 h-5" />
                    </button>
                  </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {japaneseContent.categories.map((category, index) => (
                    <Link
                      key={index}
                      href={`/study/admin/language/${category.name
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 hover:shadow-md transition-all duration-200">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 text-sm truncate">
                            {category.name}
                          </h4>
                          <p className="text-xs text-gray-600">
                            {category.count} mục
                          </p>
                        </div>
                        <PenTool className="w-4 h-4 text-red-600 flex-shrink-0 ml-2" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* English Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 overflow-hidden">
          <div
            className="p-6 border-b border-gray-100 cursor-pointer hover:bg-gray-50/50 transition-colors"
            onClick={() => toggleSection("english")}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">EN</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">Tiếng Anh</h2>
                  <p className="text-gray-600">
                    Nội dung học tập tiếng Anh theo loại: Từ vựng, Ngữ pháp, Đọc
                    hiểu, Luyện tập
                  </p>
                </div>
              </div>
              {expandedSections.english ? (
                <ChevronDown className="w-6 h-6 text-gray-400" />
              ) : (
                <ChevronRight className="w-6 h-6 text-gray-400" />
              )}
            </div>
          </div>

          {expandedSections.english && (
            <div className="p-6">
              {/* Content Types */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Các loại nội dung học tập
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {englishContent.contentTypes.map((contentType, index) => (
                    <Link
                      key={index}
                      href={`/study/admin/language/${contentType.type}`}
                    >
                      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-100 cursor-pointer hover:shadow-md hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 transition-all duration-200">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            {contentType.icon}
                            <h4 className="font-bold text-blue-800">
                              {contentType.name}
                            </h4>
                          </div>
                          <Plus className="w-5 h-5 text-blue-600" />
                        </div>
                        <p className="text-sm text-gray-600 mb-2">
                          {contentType.description}
                        </p>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-gray-600">
                            {contentType.count} mục
                          </span>
                          <span className="text-gray-500">
                            Cập nhật {contentType.lastUpdated}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Content Categories */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Danh mục
                  </h3>
                  <Link href="/study/admin/language/categories/new">
                    <button className="text-blue-600 hover:text-blue-800 p-1">
                      <Plus className="w-5 h-5" />
                    </button>
                  </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {englishContent.categories.map((category, index) => (
                    <Link
                      key={index}
                      href={`/study/admin/language/${category.name
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(/[^a-z0-9-]/g, "")}`}
                    >
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 hover:shadow-md transition-all duration-200">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 text-sm truncate">
                            {category.name}
                          </h4>
                          <p className="text-xs text-gray-600">
                            {category.count} mục
                          </p>
                        </div>
                        <PenTool className="w-4 h-4 text-blue-600 flex-shrink-0 ml-2" />
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl p-6 text-white">
        <h3 className="text-xl font-bold mb-4">Công cụ tạo nội dung</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Link href="/study/admin/language/vocabulary">
            <button className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors text-left w-full">
              <div className="flex items-center gap-3 mb-2">
                <Brain className="w-6 h-6" />
                <span className="font-semibold">Từ vựng</span>
              </div>
              <p className="text-sm opacity-90">Thêm và quản lý từ vựng</p>
            </button>
          </Link>
          <Link href="/study/admin/language/grammar">
            <button className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors text-left w-full">
              <div className="flex items-center gap-3 mb-2">
                <PenTool className="w-6 h-6" />
                <span className="font-semibold">Ngữ pháp</span>
              </div>
              <p className="text-sm opacity-90">Tạo bài tập ngữ pháp</p>
            </button>
          </Link>
          <Link href="/study/admin/language/reading">
            <button className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors text-left w-full">
              <div className="flex items-center gap-3 mb-2">
                <BookOpen className="w-6 h-6" />
                <span className="font-semibold">Đọc hiểu</span>
              </div>
              <p className="text-sm opacity-90">Tạo bài đọc và comprehension</p>
            </button>
          </Link>
          <Link href="/study/admin/language/practice">
            <button className="bg-white/20 backdrop-blur-sm rounded-lg p-4 hover:bg-white/30 transition-colors text-left w-full">
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-6 h-6" />
                <span className="font-semibold">Luyện tập</span>
              </div>
              <p className="text-sm opacity-90">Tạo bài tập thực hành</p>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
