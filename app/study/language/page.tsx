import React from "react";
import Link from "next/link";

export default function LanguagePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-cyan-600 to-indigo-600">
        {/* Animated Background Shapes */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-bounce delay-100"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-white/10 rounded-full animate-bounce delay-300"></div>
          <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-white/10 rounded-full animate-bounce delay-500"></div>
          <div className="absolute bottom-10 right-10 w-28 h-28 bg-white/10 rounded-full animate-bounce delay-700"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center text-white">
            <div className="mb-8">
              <h1 className="text-5xl md:text-6xl font-black mb-4 animate-pulse">
                🌍 Học Ngoại Ngữ
                <span className="block text-3xl md:text-4xl font-normal text-blue-100 mt-2">
                  Tiếng Anh & Tiếng Nhật
                </span>
              </h1>
              <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full"></div>
            </div>

            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed mb-12 font-light">
              Khám phá thế giới ngôn ngữ với lộ trình học tập cá nhân hóa, từ cơ
              bản đến thành thạo với phương pháp học hiện đại.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="#english"
                className="group relative px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl shadow-2xl hover:shadow-white/25 transform hover:scale-105 transition-all duration-300"
              >
                <span className="relative z-10">🇺🇸 Học Tiếng Anh</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link
                href="#japanese"
                className="group relative px-8 py-4 bg-white text-red-600 font-bold rounded-2xl shadow-2xl hover:shadow-white/25 transform hover:scale-105 transition-all duration-300"
              >
                <span className="relative z-10">🇯🇵 Học Tiếng Nhật</span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
          </div>
        </div>

        {/* Wave Separator */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-20">
            <path
              fill="#ffffff"
              d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            ></path>
          </svg>
        </div>
      </div>

      {/* Language Selection */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Chọn Ngôn Ngữ Của Bạn
            </h2>
            <p className="text-xl text-gray-600">
              Bắt đầu hành trình chinh phục ngôn ngữ mới
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* English Section */}
            <div id="english" className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-xl">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <span className="text-4xl">🇺🇸</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Tiếng Anh
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Học tiếng Anh toàn diện với phương pháp hiện đại, từ giao
                    tiếp hàng ngày đến tiếng Anh chuyên ngành.
                  </p>

                  {/* Progress */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Tiến độ học tập</span>
                      <span>75%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-cyan-500 h-3 rounded-full"
                        style={{ width: "75%" }}
                      ></div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="text-center p-4 bg-blue-50 rounded-xl">
                      <div className="text-2xl mb-2">📖</div>
                      <div className="text-sm font-semibold text-gray-900">
                        Từ Vựng
                      </div>
                      <div className="text-xs text-gray-600">1200 từ</div>
                    </div>
                    <div className="text-center p-4 bg-cyan-50 rounded-xl">
                      <div className="text-2xl mb-2">🎯</div>
                      <div className="text-sm font-semibold text-gray-900">
                        Ngữ Pháp
                      </div>
                      <div className="text-xs text-gray-600">15 chủ đề</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-xl">
                      <div className="text-2xl mb-2">🎧</div>
                      <div className="text-sm font-semibold text-gray-900">
                        Luyện Nghe
                      </div>
                      <div className="text-xs text-gray-600">50 bài</div>
                    </div>
                    <div className="text-center p-4 bg-cyan-50 rounded-xl">
                      <div className="text-2xl mb-2">🗣️</div>
                      <div className="text-sm font-semibold text-gray-900">
                        Luyện Nói
                      </div>
                      <div className="text-xs text-gray-600">30 bài</div>
                    </div>
                  </div>

                  <Link
                    href="/study/language/english"
                    className="block w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-2xl text-center hover:from-blue-600 hover:to-cyan-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    Bắt Đầu Học Tiếng Anh
                  </Link>
                </div>
              </div>
            </div>

            {/* Japanese Section */}
            <div id="japanese" className="group relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-pink-600 rounded-3xl blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-xl">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <span className="text-4xl">🇯🇵</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    Tiếng Nhật
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    Khám phá văn hóa Nhật Bản qua ngôn ngữ, từ Hiragana/Katakana
                    đến Kanji và hội thoại thực tế.
                  </p>

                  {/* Progress */}
                  <div className="mb-6">
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>Tiến độ học tập</span>
                      <span>60%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-red-500 to-pink-500 h-3 rounded-full"
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="text-center p-4 bg-red-50 rounded-xl">
                      <div className="text-2xl mb-2">あ</div>
                      <div className="text-sm font-semibold text-gray-900">
                        Hiragana
                      </div>
                      <div className="text-xs text-gray-600">Hoàn thành</div>
                    </div>
                    <div className="text-center p-4 bg-pink-50 rounded-xl">
                      <div className="text-2xl mb-2">カ</div>
                      <div className="text-sm font-semibold text-gray-900">
                        Katakana
                      </div>
                      <div className="text-xs text-gray-600">Hoàn thành</div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-xl">
                      <div className="text-2xl mb-2">漢</div>
                      <div className="text-sm font-semibold text-gray-900">
                        Kanji
                      </div>
                      <div className="text-xs text-gray-600">200 từ</div>
                    </div>
                    <div className="text-center p-4 bg-pink-50 rounded-xl">
                      <div className="text-2xl mb-2">💬</div>
                      <div className="text-sm font-semibold text-gray-900">
                        Hội Thoại
                      </div>
                      <div className="text-xs text-gray-600">25 bài</div>
                    </div>
                  </div>

                  <Link
                    href="/study/language/japanese"
                    className="block w-full py-4 bg-gradient-to-r from-red-500 to-pink-500 text-white font-semibold rounded-2xl text-center hover:from-red-600 hover:to-pink-600 transform hover:scale-105 transition-all duration-200 shadow-lg"
                  >
                    Bắt Đầu Học Tiếng Nhật
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Learning Features */}
      <div className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Phương Pháp Học
              <span className="block text-2xl md:text-3xl font-normal text-gray-600 mt-2">
                Hiện đại & Hiệu quả
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Học Tập Cá Nhân Hóa
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Lộ trình học tập được điều chỉnh theo trình độ và mục tiêu của
                từng học viên với AI hỗ trợ.
              </p>
            </div>

            <div className="group text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Học Nhanh & Nhớ Lâu
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Kết hợp phương pháp học tập hiện đại với spaced repetition để
                ghi nhớ kiến thức hiệu quả.
              </p>
            </div>

            <div className="group text-center p-8 bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                <span className="text-2xl">🎮</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Trải Nghiệm Thú Vị
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Học tập trở nên thú vị với game hóa, achievement system và giao
                diện người dùng thân thiện.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Goals */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Mục Tiêu Hàng Ngày
            </h2>
            <p className="text-xl text-gray-600">
              Duy trì thói quen học tập đều đặn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-3xl shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  🇺🇸 Tiếng Anh
                </h3>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Hôm nay</p>
                  <p className="text-2xl font-bold text-blue-600">2/3</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-sm">📖</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      Học 10 từ vựng mới
                    </span>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    ✓ Hoàn thành
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-sm">🎧</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      Luyện nghe 15 phút
                    </span>
                  </div>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    ✓ Hoàn thành
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm">🗣️</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    Luyện nói 10 phút
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-pink-50 p-8 rounded-3xl shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">
                  🇯🇵 Tiếng Nhật
                </h3>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Hôm nay</p>
                  <p className="text-2xl font-bold text-red-600">1/2</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm">漢</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    Học 5 Kanji mới
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-sm">
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                    <span className="text-sm">💬</span>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    Luyện hội thoại 20 phút
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-24 bg-gradient-to-r from-blue-600 via-cyan-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Sẵn Sàng Bắt Đầu?
          </h2>
          <p className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto">
            Chọn ngôn ngữ bạn muốn học và bắt đầu hành trình chinh phục thế giới
            ngôn ngữ ngay hôm nay!
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link
              href="/study/language/english"
              className="px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              🇺🇸 Học Tiếng Anh
            </Link>
            <Link
              href="/study/language/japanese"
              className="px-8 py-4 bg-white text-red-600 font-bold rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              🇯🇵 Học Tiếng Nhật
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
