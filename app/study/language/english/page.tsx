import React from "react";
import Link from "next/link";

export default function EnglishPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/study/language"
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                <span className="text-sm font-medium">Quay lại</span>
              </Link>
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">🇺🇸</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Tiếng Anh</h1>
                <p className="text-sm text-gray-600">Intermediate Level</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Streak</p>
                <p className="text-xl font-bold text-orange-500">🔥 12 ngày</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Tổng từ vựng</p>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📚</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Bài học hoàn thành</p>
                <p className="text-2xl font-bold text-gray-900">89</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Thời gian học</p>
                <p className="text-2xl font-bold text-gray-900">45h</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">⏱️</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Điểm số</p>
                <p className="text-2xl font-bold text-gray-900">8.7</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">⭐</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Learning */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Tiếp Tục Học
              </h2>

              <div className="space-y-4">
                <Link
                  href="/study/language/english/vocabulary"
                  className="group block p-6 border border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                        <span className="text-xl">📖</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          Từ Vựng - Business English
                        </p>
                        <p className="text-sm text-gray-600">
                          Bài 12: Corporate Communication
                        </p>
                        <p className="text-xs text-blue-600 mt-1">
                          Tiếp tục học →
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Tiến độ</p>
                      <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: "65%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/study/language/english/grammar"
                  className="group block p-6 border border-gray-200 rounded-xl hover:border-green-300 hover:bg-green-50 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center group-hover:bg-green-200 transition-colors">
                        <span className="text-xl">🎯</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          Ngữ Pháp - Perfect Tenses
                        </p>
                        <p className="text-sm text-gray-600">
                          Bài 8: Present Perfect Continuous
                        </p>
                        <p className="text-xs text-green-600 mt-1">
                          Tiếp tục học →
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Tiến độ</p>
                      <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{ width: "40%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Learning Modules */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Các Module Học Tập
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Link
                  href="/study/language/english/vocabulary"
                  className="group p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">📖</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Từ Vựng</h3>
                      <p className="text-sm text-gray-600">1200+ từ vựng</p>
                    </div>
                  </div>
                  <div className="w-full bg-white rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                </Link>

                <Link
                  href="/study/language/english/grammar"
                  className="group p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">🎯</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Ngữ Pháp</h3>
                      <p className="text-sm text-gray-600">25 chủ đề</p>
                    </div>
                  </div>
                  <div className="w-full bg-white rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "70%" }}
                    ></div>
                  </div>
                </Link>

                <Link
                  href="/study/language/english/listening"
                  className="group p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">🎧</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Luyện Nghe
                      </h3>
                      <p className="text-sm text-gray-600">60 bài tập</p>
                    </div>
                  </div>
                  <div className="w-full bg-white rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                </Link>

                <Link
                  href="/study/language/english/speaking"
                  className="group p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">🗣️</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Luyện Nói</h3>
                      <p className="text-sm text-gray-600">40 bài tập</p>
                    </div>
                  </div>
                  <div className="w-full bg-white rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: "45%" }}
                    ></div>
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
                      Học được{" "}
                      <span className="font-semibold">15 từ vựng mới</span> về
                      kinh doanh
                    </p>
                    <p className="text-xs text-gray-500">2 giờ trước</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">🎯</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      Hoàn thành bài học{" "}
                      <span className="font-semibold">"Present Perfect"</span>
                    </p>
                    <p className="text-xs text-gray-500">Hôm qua</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">🎧</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      Luyện nghe podcast{" "}
                      <span className="font-semibold">"Business English"</span>
                    </p>
                    <p className="text-xs text-gray-500">3 ngày trước</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Daily Goal */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Mục Tiêu Hôm Nay
              </h3>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Học từ vựng</span>
                  <span className="text-sm font-semibold text-green-600">
                    ✓ 10/10
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Luyện ngữ pháp</span>
                  <span className="text-sm font-semibold text-blue-600">
                    8/10
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Luyện nghe</span>
                  <span className="text-sm font-semibold text-gray-600">
                    0/15 phút
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Tổng tiến độ</span>
                  <span>60%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full"
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Thành Tựu
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-yellow-50 rounded-xl">
                  <div className="text-2xl mb-2">🔥</div>
                  <p className="text-xs text-gray-600">12 ngày liên tiếp</p>
                </div>
                <div className="text-center p-3 bg-blue-50 rounded-xl">
                  <div className="text-2xl mb-2">📚</div>
                  <p className="text-xs text-gray-600">1000 từ vựng</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-xl">
                  <div className="text-2xl mb-2">🎯</div>
                  <p className="text-xs text-gray-600">Ngữ pháp hoàn hảo</p>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-xl">
                  <div className="text-2xl mb-2">🎧</div>
                  <p className="text-xs text-gray-600">
                    Luyện nghe chuyên nghiệp
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Quick Actions
              </h3>

              <div className="space-y-3">
                <button className="w-full flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                  <span className="text-sm font-medium text-gray-900">
                    Ôn tập từ vựng
                  </span>
                  <span className="text-blue-600">→</span>
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                  <span className="text-sm font-medium text-gray-900">
                    Bài tập ngữ pháp
                  </span>
                  <span className="text-green-600">→</span>
                </button>
                <button className="w-full flex items-center justify-between p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                  <span className="text-sm font-medium text-gray-900">
                    Luyện nghe
                  </span>
                  <span className="text-purple-600">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
