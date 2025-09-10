import React from "react";
import Link from "next/link";

export default function StudyDashboard() {
  return (
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
                <p className="text-2xl font-bold text-orange-500">🔥 7 ngày</p>
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
                <p className="text-sm text-gray-600">Thời gian học hôm nay</p>
                <p className="text-2xl font-bold text-gray-900">2h 30m</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">⏱️</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Khóa học đang học</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">📚</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Bài học hoàn thành</p>
                <p className="text-2xl font-bold text-gray-900">24</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Điểm trung bình</p>
                <p className="text-2xl font-bold text-gray-900">8.5</p>
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
  );
}
