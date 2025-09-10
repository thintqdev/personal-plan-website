import Link from "next/link";
import {
  ArrowLeft,
  Lightbulb,
  Target,
  Clock,
  BookOpen,
  Users,
  Zap,
} from "lucide-react";

export default function JapaneseTipsPage() {
  const learningTips = [
    {
      id: 1,
      category: "Học từ vựng",
      icon: BookOpen,
      color: "blue",
      tips: [
        {
          title: "Học theo chủ đề",
          description:
            "Nhóm từ vựng theo chủ đề giúp ghi nhớ tốt hơn. Ví dụ: học tất cả từ về thực phẩm cùng lúc.",
          example: "りんご (táo), みかん (cam), バナナ (chuối)",
        },
        {
          title: "Sử dụng flashcards",
          description:
            "Tạo flashcards với từ vựng mới. Một mặt là từ tiếng Nhật, mặt kia là nghĩa tiếng Việt.",
          example: "Ôn tập hàng ngày, bắt đầu với 5-10 từ mới mỗi ngày",
        },
        {
          title: "Luyện phát âm",
          description:
            "Nghe và lặp lại phát âm chuẩn. Sử dụng ứng dụng như Duolingo hoặc Japanesepod101.",
          example: "Luyện tập với từ: こんにちは, ありがとう, すみません",
        },
      ],
    },
    {
      id: 2,
      category: "Học ngữ pháp",
      icon: Target,
      color: "green",
      tips: [
        {
          title: "Hiểu cấu trúc câu",
          description:
            "Nắm vững cấu trúc S + O + V trong tiếng Nhật. Chủ ngữ thường được bỏ qua.",
          example: "私はりんごを食べます (Tôi ăn táo) → りんごを食べます",
        },
        {
          title: "Thành thạo trợ từ",
          description:
            "Trợ từ (particles) rất quan trọng: は (chủ đề), が (chủ ngữ), を (tân ngữ), に (địa điểm/thời gian).",
          example: "東京に行きます (Đi Tokyo) - に chỉ địa điểm",
        },
        {
          title: "Luyện tập với ví dụ",
          description:
            "Không học lý thuyết suông. Tạo câu ví dụ cho mỗi quy tắc ngữ pháp.",
          example: "〜たい: 食べたい (muốn ăn), 見たい (muốn xem)",
        },
      ],
    },
    {
      id: 3,
      category: "Luyện nghe",
      icon: Users,
      color: "purple",
      tips: [
        {
          title: "Bắt đầu với tốc độ chậm",
          description:
            "Sử dụng video/âm thanh với tốc độ 0.75x hoặc 0.5x khi mới bắt đầu.",
          example: "Xem phim Nhật với phụ đề, dần chuyển sang không phụ đề",
        },
        {
          title: "Luyện nghe theo chủ đề",
          description:
            "Chọn chủ đề bạn quan tâm: thời tiết, thực phẩm, sở thích để tăng động lực.",
          example: "Nghe tin tức về thời tiết, dự báo thời tiết",
        },
        {
          title: "Lặp lại nhiều lần",
          description:
            "Nghe cùng một đoạn hội thoại nhiều lần. Lần đầu nghe hiểu nội dung, lần sau tập trung phát âm.",
          example: "Nghe đoạn đối thoại 5-10 lần trước khi chuyển đoạn mới",
        },
      ],
    },
    {
      id: 4,
      category: "Luyện nói",
      icon: Zap,
      color: "yellow",
      tips: [
        {
          title: "Tự nói to với bản thân",
          description:
            "Mô tả hoạt động hàng ngày của bạn bằng tiếng Nhật. Bắt đầu với câu đơn giản.",
          example: "今朝ご飯を食べました (Sáng nay tôi đã ăn sáng)",
        },
        {
          title: "Sử dụng ứng dụng ghi âm",
          description: "Ghi âm giọng nói của bạn và so sánh với phát âm chuẩn.",
          example: "Sử dụng app HiNative để nhận feedback",
        },
        {
          title: "Tham gia cộng đồng",
          description:
            "Tìm bạn học tiếng Nhật để thực hành hội thoại. Tham gia nhóm Discord hoặc Reddit.",
          example: "Discord: r/LearnJapanese, Reddit: r/japanese",
        },
      ],
    },
  ];

  const studySchedule = [
    {
      day: "Thứ Hai",
      focus: "Từ vựng",
      activities: ["Học 10 từ vựng mới", "Ôn tập flashcards", "Luyện phát âm"],
      duration: "30 phút",
    },
    {
      day: "Thứ Ba",
      focus: "Ngữ pháp",
      activities: [
        "Học 1-2 quy tắc ngữ pháp",
        "Làm bài tập thực hành",
        "Tạo câu ví dụ",
      ],
      duration: "45 phút",
    },
    {
      day: "Thứ Tư",
      focus: "Đọc hiểu",
      activities: ["Đọc bài viết N5", "Trả lời câu hỏi", "Ghi chú từ mới"],
      duration: "30 phút",
    },
    {
      day: "Thứ Năm",
      focus: "Luyện nghe",
      activities: ["Nghe podcast", "Xem video với phụ đề", "Lặp lại hội thoại"],
      duration: "30 phút",
    },
    {
      day: "Thứ Sáu",
      focus: "Luyện nói",
      activities: ["Tự nói to", "Ghi âm bản thân", "Thảo luận với bạn học"],
      duration: "30 phút",
    },
    {
      day: "Thứ Bảy",
      focus: "Ôn tập tổng hợp",
      activities: ["Ôn tập tuần", "Làm bài kiểm tra", "Xem phim Nhật"],
      duration: "60 phút",
    },
    {
      day: "Chủ Nhật",
      focus: "Nghỉ ngơi",
      activities: ["Xem anime", "Nghe nhạc Nhật", "Đọc manga"],
      duration: "Tự do",
    },
  ];

  const commonMistakes = [
    {
      mistake: "Confusing は and が",
      explanation:
        "は indicates topic, が indicates subject. Wrong usage changes meaning completely.",
      example: 'Wrong: 私は猫が好きです (I like cats - topic is "I")',
      correction: 'Correct: 猫が好きです (I like cats - topic is "cats")',
    },
    {
      mistake: "Wrong verb conjugation",
      explanation:
        "Japanese verbs change form based on tense, politeness, and type.",
      example: "Wrong: 食べます (present) vs 食べました (past)",
      correction: "Practice with Anki or similar apps for verb forms",
    },
    {
      mistake: "Incorrect particle usage",
      explanation: "Particles are crucial for correct sentence structure.",
      example: "Wrong: 学校で勉強します (study at school)",
      correction: "Correct: 学校で勉強します - で indicates location of action",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/study/language/japanese"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Quay lại</span>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Mẹo học tập tiếng Nhật
                </h1>
                <p className="text-gray-600">
                  Các phương pháp và chiến lược học hiệu quả
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">Mẹo hữu ích</div>
                <div className="text-lg font-semibold text-indigo-600">25+</div>
              </div>
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
                <Lightbulb className="w-8 h-8 text-indigo-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Learning Tips by Category */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Mẹo học theo kỹ năng
          </h2>
          <div className="space-y-8">
            {learningTips.map((category) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.id}
                  className="bg-white rounded-xl shadow-sm border p-6"
                >
                  <div className="flex items-center space-x-3 mb-6">
                    <div
                      className={`w-10 h-10 bg-${category.color}-100 rounded-full flex items-center justify-center`}
                    >
                      <IconComponent
                        className={`w-5 h-5 text-${category.color}-600`}
                      />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {category.category}
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {category.tips.map((tip, index) => (
                      <div
                        key={index}
                        className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                      >
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {tip.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-3">
                          {tip.description}
                        </p>
                        <div className="text-xs text-gray-500 bg-gray-100 p-2 rounded">
                          <strong>Ví dụ:</strong> {tip.example}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Study Schedule */}
        <div className="mb-12 bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Lịch học mẫu trong tuần
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {studySchedule.map((day, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{day.day}</h3>
                  <span className="text-sm text-indigo-600 font-medium">
                    {day.duration}
                  </span>
                </div>
                <div className="mb-3">
                  <span className="text-sm font-medium text-gray-700">
                    Tập trung:{" "}
                  </span>
                  <span className="text-sm text-indigo-600">{day.focus}</span>
                </div>
                <ul className="text-sm text-gray-600 space-y-1">
                  {day.activities.map((activity, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <span className="text-indigo-400 mt-1">•</span>
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Common Mistakes */}
        <div className="mb-12 bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Lỗi thường gặp và cách tránh
          </h2>
          <div className="space-y-6">
            {commonMistakes.map((mistake, index) => (
              <div
                key={index}
                className="border-l-4 border-red-400 bg-red-50 p-4"
              >
                <h3 className="font-semibold text-red-800 mb-2">
                  {mistake.mistake}
                </h3>
                <p className="text-sm text-red-700 mb-3">
                  {mistake.explanation}
                </p>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="font-medium text-red-600">Ví dụ sai:</span>
                    <div className="bg-white p-2 rounded mt-1 text-gray-800">
                      {mistake.example}
                    </div>
                  </div>
                  <div className="text-sm">
                    <span className="font-medium text-green-600">
                      Cách sửa:
                    </span>
                    <div className="bg-green-50 p-2 rounded mt-1 text-green-800">
                      {mistake.correction}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Motivation Section */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-8 text-white">
          <div className="text-center">
            <Lightbulb className="w-12 h-12 mx-auto mb-4 opacity-90" />
            <h2 className="text-2xl font-bold mb-4">Động lực học tập</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold mb-2">3</div>
                <div className="text-indigo-100">Tháng đầu tiên</div>
                <div className="text-sm text-indigo-100 mt-1">
                  Nắm vững cơ bản
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">6</div>
                <div className="text-indigo-100">Tháng tiếp theo</div>
                <div className="text-sm text-indigo-100 mt-1">
                  Trải nghiệm văn hóa
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold mb-2">12</div>
                <div className="text-indigo-100">Một năm</div>
                <div className="text-sm text-indigo-100 mt-1">
                  Giao tiếp tự tin
                </div>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-lg text-indigo-100">
                "Mỗi ngày học một chút sẽ tích lũy thành kiến thức vững chắc.
                Hãy kiên trì và tận hưởng quá trình học tập!"
              </p>
            </div>
          </div>
        </div>

        {/* Resources Section */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Tài nguyên học tập hữu ích
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Ứng dụng và Website
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  • <strong>Duolingo:</strong> Học cơ bản miễn phí
                </li>
                <li>
                  • <strong>Anki:</strong> Ôn tập flashcards thông minh
                </li>
                <li>
                  • <strong>NHK News Web Easy:</strong> Tin tức đơn giản
                </li>
                <li>
                  • <strong>JapanesePod101:</strong> Bài học có hệ thống
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Sách và Tài liệu
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  • <strong>Minna no Nihongo:</strong> Sách giáo khoa kinh điển
                </li>
                <li>
                  • <strong>Kanji Look and Learn:</strong> Học chữ Hán
                </li>
                <li>
                  • <strong>Remembering the Kanji:</strong> Hệ thống học Kanji
                </li>
                <li>
                  • <strong>Genki:</strong> Giáo trình tương tác
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Cộng đồng</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  • <strong>Reddit r/LearnJapanese:</strong> Cộng đồng lớn
                </li>
                <li>
                  • <strong>Discord servers:</strong> Thảo luận real-time
                </li>
                <li>
                  • <strong>HiNative:</strong> Hỏi đáp với native speakers
                </li>
                <li>
                  • <strong>iTalki:</strong> Tìm gia sư online
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Giải trí</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  • <strong>Netflix:</strong> Phim và series Nhật
                </li>
                <li>
                  • <strong>Crunchyroll:</strong> Anime với phụ đề
                </li>
                <li>
                  • <strong>Spotify:</strong> Nhạc và podcast Nhật
                </li>
                <li>
                  • <strong>BookWalker:</strong> Đọc manga online
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
