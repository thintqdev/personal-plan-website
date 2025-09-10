"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import UserLayout from "@/components/layouts/UserLayout";
import { BookOpen, Plus } from "lucide-react";

export default function StudyDashboard() {
  const [vocabulary, setVocabulary] = useState<VocabularyWord[]>([]);
  const [categories, setCategories] = useState<VocabularyCategory[]>([]);
  const [stats, setStats] = useState<VocabularyStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadStudyData();
  }, []);

  const loadStudyData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [vocabResponse, categoriesResponse, statsResponse] =
        await Promise.all([
          getUserVocabulary({ limit: 5 }), // Get recent 5 words
          getVocabularyCategories(),
          getVocabularyStats(),
        ]);

      if (vocabResponse.success) {
        setVocabulary(vocabResponse.data);
      }

      if (categoriesResponse.success) {
        setCategories(categoriesResponse.data);
      }

      if (statsResponse.success) {
        setStats(statsResponse.data);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load study data"
      );
    } finally {
      setLoading(false);
    }
  };

  const getCategoryName = (categorySlug: string) => {
    const category = categories.find((cat) => cat.slug === categorySlug);
    return category?.name || "Unknown";
  };

  const getCategoryColor = (categorySlug: string) => {
    const category = categories.find((cat) => cat.slug === categorySlug);
    const colors = [
      "bg-blue-100 text-blue-800",
      "bg-green-100 text-green-800",
      "bg-purple-100 text-purple-800",
    ];
    return colors[category?.color || 0] || "bg-gray-100 text-gray-800";
  };

  if (loading) {
    return (
      <UserLayout
        title="Study Dashboard"
        description="Tổng quan về quá trình học tập"
        icon={<BookOpen className="w-8 h-8 text-white" />}
      >
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </UserLayout>
    );
  }

  return (
    <UserLayout
      title="Study Dashboard"
      description="Tổng quan về quá trình học tập của bạn"
      icon={<BookOpen className="w-8 h-8 text-white" />}
    >
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        {/* Welcome Header */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Study Dashboard
                </h1>
                <p className="text-gray-600 mt-1">
                  Chào mừng trở lại! Hôm nay bạn học gì nào?
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-500">Study Streak</p>
                  <p className="text-2xl font-bold text-orange-500">
                    🔥 7 ngày
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">T</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tổng từ vựng</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats?.totalWords || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">📚</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Đã thành thạo</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats?.masteredWords || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">✅</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Tổng reviews</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats?.totalReviews || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">🔄</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Độ chính xác</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Math.round(stats?.averageAccuracy || 0)}%
                  </p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <span className="text-2xl">⭐</span>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Vocabulary Section */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                Từ Vựng Gần Đây
              </h2>
              <Link
                href="/study/vocabulary"
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Xem tất cả →
              </Link>
            </div>

            {vocabulary.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {vocabulary.map((word) => (
                  <div
                    key={word._id}
                    className="p-4 border border-gray-200 rounded-xl hover:border-blue-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {word.japanese}
                        </h3>
                        {word.furigana && (
                          <p className="text-sm text-gray-600">
                            /{word.furigana}/
                          </p>
                        )}
                      </div>
                      <Badge className={getCategoryColor(word.category)}>
                        {getCategoryName(word.category)}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      {word.meanings && word.meanings.length > 0
                        ? word.meanings[0].meaning
                        : "No meaning"}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Level: {word.level}</span>
                      <span>
                        Mastery:{" "}
                        {word.reviewCount > 0
                          ? Math.round(
                              (word.correctCount / word.reviewCount) * 100
                            )
                          : 0}
                        %
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">Chưa có từ vựng nào</p>
                <Link
                  href="/study/vocabulary"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Thêm từ vựng đầu tiên
                </Link>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Current Learning Goals */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900">
                    Mục Tiêu Học Tập
                  </h2>
                  <Link
                    href="/study/goals"
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    Xem tất cả →
                  </Link>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-white">🌍</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          Học tiếng Anh giao tiếp
                        </p>
                        <p className="text-sm text-gray-600">
                          Mục tiêu: 30 bài học/tháng
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Tiến độ</p>
                      <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: "75%" }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">22/30</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                        <span className="text-white">⚡</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          Học React.js
                        </p>
                        <p className="text-sm text-gray-600">
                          Mục tiêu: 20 bài học/tháng
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Tiến độ</p>
                      <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: "60%" }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">12/20</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-xl">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                        <span className="text-white">🎯</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          Phát triển kỹ năng mềm
                        </p>
                        <p className="text-sm text-gray-600">
                          Mục tiêu: 15 bài học/tháng
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Tiến độ</p>
                      <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-purple-500 h-2 rounded-full"
                          style={{ width: "40%" }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">6/15</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Continue Learning */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Tiếp Tục Học
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link
                    href="/study/language"
                    className="group p-4 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <span className="text-xl">🌍</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          Tiếng Anh Cơ Bản
                        </p>
                        <p className="text-sm text-gray-600">
                          Bài 5: Thì Hiện Tại Đơn
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                          Tiếp tục học →
                        </p>
                      </div>
                    </div>
                  </Link>

                  <Link
                    href="/study/tech"
                    className="group p-4 border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                        <span className="text-xl">⚡</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          React.js Fundamentals
                        </p>
                        <p className="text-sm text-gray-600">
                          Bài 8: Components & Props
                        </p>
                        <p className="text-xs text-green-600 mt-1">
                          Tiếp tục học →
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Recent Activities */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h2 className="text-xl font-bold text-gray-900 mb-6">
                  Hoạt Động Gần Đây
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">📖</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        Hoàn thành bài học{" "}
                        <span className="font-semibold">
                          "Present Simple Tense"
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">
                        2 giờ trước • Học Ngoại Ngữ
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">🎯</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        Đạt mục tiêu học tập hàng ngày{" "}
                        <span className="font-semibold">2 giờ</span>
                      </p>
                      <p className="text-xs text-gray-500">
                        Hôm qua • Học Kỹ Thuật
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm">🏆</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-900">
                        Nhận huy hiệu{" "}
                        <span className="font-semibold">
                          "Consistent Learner"
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">
                        3 ngày trước • Học Kỹ Năng
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Study Schedule */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Lịch Học Hôm Nay
                </h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                        <span className="text-xs text-white">🌍</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          Tiếng Anh
                        </p>
                        <p className="text-xs text-gray-600">9:00 - 10:00</p>
                      </div>
                    </div>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      Sắp tới
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-400 rounded-lg flex items-center justify-center">
                        <span className="text-xs text-white">⚡</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          React.js
                        </p>
                        <p className="text-xs text-gray-600">14:00 - 15:30</p>
                      </div>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      Chưa học
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gray-400 rounded-lg flex items-center justify-center">
                        <span className="text-xs text-white">🎯</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          Kỹ năng mềm
                        </p>
                        <p className="text-xs text-gray-600">19:00 - 20:00</p>
                      </div>
                    </div>
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      Chưa học
                    </span>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Thành Tựu
                </h3>

                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <span className="text-lg">🔥</span>
                    </div>
                    <p className="text-xs text-gray-600">7 ngày liên tiếp</p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <span className="text-lg">📚</span>
                    </div>
                    <p className="text-xs text-gray-600">50 bài học</p>
                  </div>

                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <span className="text-lg">⭐</span>
                    </div>
                    <p className="text-xs text-gray-600">Điểm cao</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 mb-4">
                  Quick Actions
                </h3>

                <div className="space-y-3">
                  <Link
                    href="/study/language"
                    className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-900">
                      Học Ngoại Ngữ
                    </span>
                    <span className="text-blue-600">→</span>
                  </Link>

                  <Link
                    href="/study/tech"
                    className="flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-900">
                      Học Kỹ Thuật
                    </span>
                    <span className="text-green-600">→</span>
                  </Link>

                  <Link
                    href="/study/skills"
                    className="flex items-center justify-between p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                  >
                    <span className="text-sm font-medium text-gray-900">
                      Học Kỹ Năng
                    </span>
                    <span className="text-purple-600">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}
