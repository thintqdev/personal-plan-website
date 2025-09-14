"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  Book,
  Eye,
  MessageSquare,
  Clock,
  Star,
  ChevronRight,
  Play,
  RotateCcw,
} from "lucide-react";
import LanguageLayout from "../../layout";

export default function JapaneseReadingPage() {
  const readingMaterials = [
    {
      id: 1,
      title: "Bài đọc 1",
      level: "N5",
      type: "Bài viết",
      difficulty: "Dễ",
    },
    {
      id: 2,
      title: "Bài đọc 2",
      level: "N5",
      type: "Bài viết",
      difficulty: "Dễ",
    },
    {
      id: 3,
      title: "Bài đọc 3",
      level: "N4",
      type: "Bài viết",
      difficulty: "Trung bình",
    },
    {
      id: 4,
      title: "Bài đọc 4",
      level: "N4",
      type: "Bài viết",
      difficulty: "Trung bình",
    },
    {
      id: 5,
      title: "Bài đọc 5",
      level: "N3",
      type: "Bài viết",
      difficulty: "Khó",
    },
    {
      id: 6,
      title: "Bài đọc 6",
      level: "N3",
      type: "Bài báo",
      difficulty: "Khó",
    },
  ];

  const comprehensionQuestions = [
    {
      id: 1,
      question: "Hiểu nội dung chính",
      description: "Đọc và trả lời câu hỏi về nội dung chính của bài viết",
      icon: Eye,
      color: "red",
    },
    {
      id: 2,
      question: "Từ vựng trong ngữ cảnh",
      description: "Tìm hiểu nghĩa của từ dựa trên ngữ cảnh sử dụng",
      icon: Book,
      color: "red",
    },
    {
      id: 3,
      question: "Suy luận và kết nối",
      description: "Kết nối thông tin và suy luận ý nghĩa ẩn",
      icon: MessageSquare,
      color: "red",
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Dễ":
        return "text-green-600 bg-green-100";
      case "Trung bình":
        return "text-yellow-600 bg-yellow-100";
      case "Khó":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Bài viết":
        return "text-green-600 bg-green-100";
      case "Bài báo":
        return "text-purple-600 bg-purple-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <LanguageLayout
      showBackButton={true}
      backButtonHref="/study/language/japanese"
    >
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-rose-50">
        {/* Header */}
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Reading Materials */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Bài đọc
            </h2>
            <div className="space-y-3">
              {readingMaterials.map((material) => (
                <Link
                  key={material.id}
                  href={`/study/language/japanese/reading/${material.id}`}
                  className="block bg-white rounded-xl shadow-sm border border-red-100 overflow-hidden hover:shadow-md hover:border-red-200 transition-all duration-200"
                >
                  <div className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                            <Book className="w-5 h-5 text-red-600" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900 truncate">
                              {material.title}
                            </h3>
                            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                              {material.level}
                            </span>
                            <span
                              className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(
                                material.type
                              )}`}
                            >
                              {material.type}
                            </span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                                material.difficulty
                              )}`}
                            >
                              {material.difficulty}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            <Play className="w-4 h-4 text-red-600" />
                            <span className="text-sm text-red-600 font-medium">
                              Bắt đầu đọc
                            </span>
                          </div>
                          <ChevronRight className="w-5 h-5 text-red-400" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Comprehension Practice */}
          <div className="mb-12 bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Luyện tập đọc hiểu
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {comprehensionQuestions.map((question) => {
                const IconComponent = question.icon;
                return (
                  <div
                    key={question.id}
                    className={`text-center p-6 border rounded-lg hover:bg-${question.color}-50 transition-colors cursor-pointer`}
                  >
                    <div
                      className={`w-12 h-12 bg-${question.color}-100 rounded-full flex items-center justify-center mx-auto mb-3`}
                    >
                      <IconComponent
                        className={`w-6 h-6 text-${question.color}-600`}
                      />
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      {question.question}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {question.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reading Tips */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Mẹo đọc hiểu hiệu quả
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Trước khi đọc
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Xem tiêu đề và đoán nội dung</li>
                  <li>• Tìm hiểu từ vựng khó trước</li>
                  <li>• Đọc lướt để nắm cấu trúc</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Trong khi đọc
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Gạch dưới thông tin quan trọng</li>
                  <li>• Dự đoán nội dung tiếp theo</li>
                  <li>• Chú ý cấu trúc câu phức</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Sau khi đọc
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Tóm tắt nội dung chính</li>
                  <li>• Trả lời câu hỏi đọc hiểu</li>
                  <li>• Ôn lại từ vựng mới</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">
                  Luyện tập thường xuyên
                </h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Đọc nhiều thể loại khác nhau</li>
                  <li>• Ghi chép từ vựng mới</li>
                  <li>• Thảo luận với người học khác</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Statistics Section */}
          <div className="mt-8 bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Thống kê đọc hiểu
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Book className="w-6 h-6 text-red-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">2</div>
                <div className="text-sm text-gray-600">Bài đã đọc</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Eye className="w-6 h-6 text-red-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">165</div>
                <div className="text-sm text-gray-600">Từ đã học</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <MessageSquare className="w-6 h-6 text-red-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">82%</div>
                <div className="text-sm text-gray-600">Độ chính xác</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-6 h-6 text-red-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">11</div>
                <div className="text-sm text-gray-600">Phút đọc/ngày</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LanguageLayout>
  );
}
