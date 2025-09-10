import React from "react";
import Link from "next/link";

export default function JapanesePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/study/language"
                className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
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
              <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">🇯🇵</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Tiếng Nhật</h1>
                <p className="text-sm text-gray-600">N4 Level</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Streak</p>
                <p className="text-xl font-bold text-orange-500">🔥 8 ngày</p>
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
                <p className="text-sm text-gray-600">Kanji đã học</p>
                <p className="text-2xl font-bold text-gray-900">203</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">漢</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Bài học hoàn thành</p>
                <p className="text-2xl font-bold text-gray-900">67</p>
              </div>
              <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Thời gian học</p>
                <p className="text-2xl font-bold text-gray-900">32h</p>
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
                <p className="text-2xl font-bold text-gray-900">8.2</p>
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
                  href="/study/language/japanese/kanji"
                  className="group block p-6 border border-gray-200 rounded-xl hover:border-red-300 hover:bg-red-50 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center group-hover:bg-red-200 transition-colors">
                        <span className="text-xl">漢</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          Kanji - N4 Level
                        </p>
                        <p className="text-sm text-gray-600">
                          Bài 15: 仕事 (Công việc)
                        </p>
                        <p className="text-xs text-red-600 mt-1">
                          Tiếp tục học →
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Tiến độ</p>
                      <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-red-500 h-2 rounded-full"
                          style={{ width: "70%" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/study/language/japanese/grammar"
                  className="group block p-6 border border-gray-200 rounded-xl hover:border-pink-300 hover:bg-pink-50 transition-all duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center group-hover:bg-pink-200 transition-colors">
                        <span className="text-xl">🎌</span>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          Ngữ Pháp - 〜ている
                        </p>
                        <p className="text-sm text-gray-600">
                          Bài 9: Hành động đang diễn ra
                        </p>
                        <p className="text-xs text-pink-600 mt-1">
                          Tiếp tục học →
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Tiến độ</p>
                      <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className="bg-pink-500 h-2 rounded-full"
                          style={{ width: "55%" }}
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
                  href="/study/language/japanese/hiragana"
                  className="group p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">あ</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Hiragana</h3>
                      <p className="text-sm text-gray-600">Hoàn thành</p>
                    </div>
                  </div>
                  <div className="w-full bg-white rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </Link>

                <Link
                  href="/study/language/japanese/katakana"
                  className="group p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">カ</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Katakana</h3>
                      <p className="text-sm text-gray-600">Hoàn thành</p>
                    </div>
                  </div>
                  <div className="w-full bg-white rounded-full h-2">
                    <div
                      className="bg-pink-500 h-2 rounded-full"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </Link>

                <Link
                  href="/study/language/japanese/kanji"
                  className="group p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">漢</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Kanji</h3>
                      <p className="text-sm text-gray-600">203/300 từ</p>
                    </div>
                  </div>
                  <div className="w-full bg-white rounded-full h-2">
                    <div
                      className="bg-purple-500 h-2 rounded-full"
                      style={{ width: "68%" }}
                    ></div>
                  </div>
                </Link>

                <Link
                  href="/study/language/japanese/conversation"
                  className="group p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">💬</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Hội Thoại</h3>
                      <p className="text-sm text-gray-600">25 bài tập</p>
                    </div>
                  </div>
                  <div className="w-full bg-white rounded-full h-2">
                    <div
                      className="bg-orange-500 h-2 rounded-full"
                      style={{ width: "50%" }}
                    ></div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Quick Learning Actions */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Học Tập Nhanh
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Link
                  href="/study/language/japanese/vocabulary"
                  className="group p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border border-blue-200"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">📚</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Từ Vựng</h3>
                      <p className="text-sm text-gray-600">Học theo bài</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">4 bài học có sẵn</p>
                </Link>

                <Link
                  href="/study/language/japanese/grammar"
                  className="group p-4 bg-gradient-to-r from-pink-50 to-pink-100 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border border-pink-200"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-pink-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">📝</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Ngữ Pháp</h3>
                      <p className="text-sm text-gray-600">Bài tập thực hành</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">15 bài ngữ pháp</p>
                </Link>

                <Link
                  href="/study/language/japanese/reading"
                  className="group p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border border-green-200"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">📖</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Đọc Hiểu</h3>
                      <p className="text-sm text-gray-600">
                        Bài đọc và câu hỏi
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">20 bài đọc</p>
                </Link>

                <Link
                  href="/study/language/japanese/vocabulary"
                  className="group p-4 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border border-yellow-200"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">🔄</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Từ Vựng</h3>
                      <p className="text-sm text-gray-600">
                        Học theo bài + Flashcard
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">
                    6 bài học + chế độ ôn tập
                  </p>
                </Link>

                <Link
                  href="/study/language/japanese/my-vocabulary"
                  className="group p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border border-purple-200"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">➕</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Thêm Từ Vựng
                      </h3>
                      <p className="text-sm text-gray-600">Tự thêm từ mới</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">Tùy chỉnh từ điển</p>
                </Link>

                <Link
                  href="/study/language/japanese/tips"
                  className="group p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-xl hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1 border border-indigo-200"
                >
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-10 h-10 bg-indigo-500 rounded-lg flex items-center justify-center">
                      <span className="text-white text-lg">💡</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        Mẹo Học Tập
                      </h3>
                      <p className="text-sm text-gray-600">
                        Tips và chiến lược
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">4 mẹo hữu ích</p>
                </Link>
              </div>
            </div>

            {/* JLPT Progress */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Tiến Độ JLPT N4
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <span className="text-white text-xl">漢</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Kanji</h3>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div
                      className="bg-red-500 h-3 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">225/300</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <span className="text-white text-xl">🎌</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Ngữ Pháp</h3>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div
                      className="bg-pink-500 h-3 rounded-full"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">18/30</p>
                </div>

                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <span className="text-white text-xl">📖</span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Từ Vựng</h3>
                  <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                    <div
                      className="bg-purple-500 h-3 rounded-full"
                      style={{ width: "80%" }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600">480/600</p>
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                Hoạt Động Gần Đây
              </h2>

              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">漢</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      Học được{" "}
                      <span className="font-semibold">5 Kanji mới</span> về công
                      việc
                    </p>
                    <p className="text-xs text-gray-500">3 giờ trước</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">🎌</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      Hoàn thành bài ngữ pháp{" "}
                      <span className="font-semibold">"〜ている"</span>
                    </p>
                    <p className="text-xs text-gray-500">Hôm qua</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm">💬</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">
                      Luyện hội thoại{" "}
                      <span className="font-semibold">"Ở nhà hàng"</span>
                    </p>
                    <p className="text-xs text-gray-500">2 ngày trước</p>
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
                  <span className="text-sm text-gray-600">Học Kanji</span>
                  <span className="text-sm font-semibold text-green-600">
                    ✓ 5/5
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Luyện ngữ pháp</span>
                  <span className="text-sm font-semibold text-red-600">
                    3/5
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Luyện hội thoại</span>
                  <span className="text-sm font-semibold text-gray-600">
                    0/15 phút
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex justify-between text-sm text-gray-600 mb-2">
                  <span>Tổng tiến độ</span>
                  <span>55%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-red-500 to-pink-500 h-3 rounded-full"
                    style={{ width: "55%" }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Japanese Culture */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                Văn Hóa Nhật Bản
              </h3>

              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">🎌</span>
                    <h4 className="font-semibold text-gray-900">
                      Tết Truyền Thống
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Học về các lễ hội và truyền thống Nhật Bản
                  </p>
                </div>

                <div className="p-4 bg-gradient-to-r from-pink-50 to-rose-50 rounded-xl">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-2xl">🍱</span>
                    <h4 className="font-semibold text-gray-900">
                      Ẩm Thực Nhật
                    </h4>
                  </div>
                  <p className="text-sm text-gray-600">
                    Khám phá văn hóa ẩm thực và từ vựng liên quan
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
                <Link
                  href="/study/language/japanese/vocabulary"
                  className="flex items-center justify-between p-3 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-900">
                    Học từ vựng
                  </span>
                  <span className="text-blue-600">→</span>
                </Link>
                <Link
                  href="/study/language/japanese/grammar"
                  className="flex items-center justify-between p-3 bg-pink-50 rounded-lg hover:bg-pink-100 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-900">
                    Học ngữ pháp
                  </span>
                  <span className="text-pink-600">→</span>
                </Link>
                <Link
                  href="/study/language/japanese/reading"
                  className="flex items-center justify-between p-3 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-900">
                    Đọc hiểu
                  </span>
                  <span className="text-green-600">→</span>
                </Link>
                <Link
                  href="/study/language/japanese/vocabulary"
                  className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-900">
                    Từ vựng + Flashcard
                  </span>
                  <span className="text-yellow-600">→</span>
                </Link>
                <Link
                  href="/study/language/japanese/my-vocabulary"
                  className="flex items-center justify-between p-3 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-900">
                    Thêm từ vựng
                  </span>
                  <span className="text-purple-600">→</span>
                </Link>
                <Link
                  href="/study/language/japanese/tips"
                  className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-900">
                    Mẹo học tập
                  </span>
                  <span className="text-indigo-600">→</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
