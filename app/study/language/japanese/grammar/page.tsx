import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  ChevronRight,
  Target,
  Sparkles,
} from "lucide-react";

export default function JapaneseGrammarPage() {
  const grammarData = {
    parts: [
      {
        name: "Phần I: Ngữ pháp trong câu",
        topics: [
          {
            title: "Liên kết câu",
            grammarPoints: [
              {
                structure: "～うちに",
                combinations: [
                  "Nの + うちに",
                  "Vる + うちに",
                  "Vている + うちに",
                  "Aい + うちに",
                  "Aな + うちに",
                ],
                usages: [
                  {
                    meaning:
                      "Trong khi còn (trạng thái/khoảng thời gian) thì làm ~ trước khi thay đổi.",
                    examples: [
                      {
                        jp: "日本にいるうちに、一度富士山に登りたい。",
                        vi: "Trong khi còn ở Nhật, tôi muốn leo núi Phú Sĩ một lần.",
                      },
                      {
                        jp: "若いうちに勉強しておいたほうがいい。",
                        vi: "Trong khi còn trẻ nên học trước thì tốt hơn.",
                      },
                    ],
                  },
                  {
                    meaning:
                      "Trong khi đang ~ thì (tự nhiên) xảy ra sự thay đổi.",
                    examples: [
                      {
                        jp: "話しているうちに、時間があっという間に過ぎた。",
                        vi: "Trong lúc đang nói chuyện thì thời gian trôi qua lúc nào không hay.",
                      },
                    ],
                  },
                ],
              },
              {
                structure: "～間に",
                combinations: ["Nの + 間に", "Vている + 間に"],
                usages: [
                  {
                    meaning:
                      "Trong khoảng (kéo dài), một hành động ngắn xảy ra.",
                    examples: [
                      {
                        jp: "お母さんが昼寝している間に、子どもたちは外で遊んだ。",
                        vi: "Trong lúc mẹ ngủ trưa, bọn trẻ chơi ở ngoài.",
                      },
                    ],
                  },
                ],
              },
              {
                structure: "～ながら",
                combinations: ["Vている + ながら"],
                usages: [
                  {
                    meaning: "Trong khi ~ (đồng thời)",
                    examples: [
                      {
                        jp: "音楽を聞きながら、勉強する。",
                        vi: "Học trong khi nghe nhạc.",
                      },
                      {
                        jp: "歩きながら、電話をする。",
                        vi: "Đi bộ trong khi nói điện thoại.",
                      },
                      {
                        jp: "コーヒーを飲みながら、話す。",
                        vi: "Nói chuyện trong khi uống cà phê.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            title: "Nguyên nhân và kết quả",
            grammarPoints: [
              {
                structure: "～ので",
                combinations: [
                  "Vる/ない + ので",
                  "Aい/くない + ので",
                  "Aな/ではない + ので",
                  "N/ではない + ので",
                ],
                usages: [
                  {
                    meaning: "Vì ~ nên... (lý do khách quan)",
                    examples: [
                      {
                        jp: "雨が降っているので、傘を持って行きます。",
                        vi: "Vì trời mưa nên tôi sẽ mang ô.",
                      },
                      {
                        jp: "時間がなかったので、行きませんでした。",
                        vi: "Vì không có thời gian nên tôi không đi.",
                      },
                    ],
                  },
                ],
              },
              {
                structure: "～から",
                combinations: [
                  "Vる/ない + から",
                  "Aい/くない + から",
                  "Aな/ではない + から",
                  "N/ではない + から",
                ],
                usages: [
                  {
                    meaning: "Vì ~ nên... (lý do trực tiếp)",
                    examples: [
                      {
                        jp: "明日テストがあるから、勉強します。",
                        vi: "Vì ngày mai có bài kiểm tra nên tôi học bài.",
                      },
                      {
                        jp: "お腹が空いたから、食べます。",
                        vi: "Vì đói bụng nên tôi ăn.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Phần II: Cách tổ chức câu",
        topics: [
          {
            title: "Liên từ bổ sung",
            grammarPoints: [
              {
                structure: "それに",
                combinations: ["S1。それに、S2。"],
                usages: [
                  {
                    meaning:
                      "Thêm nữa / hơn nữa (bổ sung thông tin tích cực cùng hướng).",
                    examples: [
                      {
                        jp: "この店は安い。それに、サービスもいい。",
                        vi: "Cửa hàng này rẻ. Hơn nữa, dịch vụ cũng tốt.",
                      },
                    ],
                  },
                ],
              },
              {
                structure: "それから",
                combinations: ["S1。それから、S2。"],
                usages: [
                  {
                    meaning: "Sau đó, tiếp theo",
                    examples: [
                      {
                        jp: "朝ごはんを食べます。それから、学校へ行きます。",
                        vi: "Ăn sáng. Sau đó đi học.",
                      },
                    ],
                  },
                ],
              },
              {
                structure: "そして",
                combinations: ["S1。そして、S2。"],
                usages: [
                  {
                    meaning: "Và rồi, sau đó",
                    examples: [
                      {
                        jp: "友達に会いました。そして、一緒に映画を見ました。",
                        vi: "Gặp bạn bè. Và rồi cùng xem phim.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            title: "Liên từ đối lập",
            grammarPoints: [
              {
                structure: "でも",
                combinations: ["S1。でも、S2。"],
                usages: [
                  {
                    meaning: "Nhưng, tuy nhiên",
                    examples: [
                      {
                        jp: "雨が降っています。でも、出かけます。",
                        vi: "Trời đang mưa. Nhưng tôi vẫn đi ra ngoài.",
                      },
                    ],
                  },
                ],
              },
              {
                structure: "しかし",
                combinations: ["S1。しかし、S2。"],
                usages: [
                  {
                    meaning: "Tuy nhiên (lịch sự hơn)",
                    examples: [
                      {
                        jp: "勉強しました。しかし、テストで失敗しました。",
                        vi: "Tôi đã học. Tuy nhiên, tôi thi trượt.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        name: "Phần III: Ứng dụng thực tế",
        topics: [
          {
            title: "Khẩu ngữ",
            grammarPoints: [
              {
                structure: "～ちゃう（＝～てしまう）",
                combinations: [
                  "Vて + しまう → Vちゃう",
                  "Vで + しまう → Vじゃう",
                  "ちゃった（過去形）",
                  "ちゃって（て形）",
                ],
                usages: [
                  {
                    meaning: "Lỡ ~ mất / làm xong hết ~ (khẩu ngữ).",
                    examples: [
                      {
                        jp: "宿題を忘れちゃった。",
                        vi: "Tớ lỡ quên mất bài tập rồi.",
                      },
                      {
                        jp: "ケーキを全部食べちゃった。",
                        vi: "Tớ ăn hết bánh mất rồi.",
                      },
                    ],
                  },
                ],
              },
              {
                structure: "～つもり",
                combinations: ["Vる + つもり", "Vない + つもりはない"],
                usages: [
                  {
                    meaning: "Có ý định ~",
                    examples: [
                      {
                        jp: "明日、勉強するつもりです。",
                        vi: "Ngày mai tôi có ý định học bài.",
                      },
                      {
                        jp: "日本に行くつもりはありません。",
                        vi: "Tôi không có ý định đi Nhật.",
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            title: "Thể lịch sự",
            grammarPoints: [
              {
                structure: "～ます",
                combinations: [
                  "Vます（現在形）",
                  "Vました（過去形）",
                  "Vません（否定形）",
                  "Vましょう（意志形）",
                ],
                usages: [
                  {
                    meaning: "Thể lịch sự",
                    examples: [
                      {
                        jp: "食べます (食べる)",
                        vi: "Ăn (thể lịch sự)",
                      },
                      {
                        jp: "行きます (行く)",
                        vi: "Đi (thể lịch sự)",
                      },
                    ],
                  },
                ],
              },
              {
                structure: "～ませんか",
                combinations: ["Vませんか"],
                usages: [
                  {
                    meaning: "Mời ~ không?",
                    examples: [
                      {
                        jp: "一緒に食べませんか。",
                        vi: "Cùng ăn không?",
                      },
                      {
                        jp: "映画を見ませんか。",
                        vi: "Xem phim không?",
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="border-b border-blue-200/50 bg-white/80 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link
                href="/study/language/japanese"
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-900 transition-all duration-200 hover:scale-105"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Quay lại</span>
              </Link>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-900 to-indigo-900 bg-clip-text text-transparent">
                  Ngữ Pháp Tiếng Nhật
                </h1>
                <p className="text-blue-600 text-sm">
                  Học ngữ pháp theo từng phần và chủ đề
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-sm text-blue-600">Tổng tiến độ</div>
                <div className="text-lg font-bold text-blue-900">35%</div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center shadow-sm">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Progress Overview */}
        <div className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-blue-100">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-blue-900">
              Tiến độ học tập
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-900">3</div>
              <div className="text-sm text-blue-600">Phần đã học</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">12</div>
              <div className="text-sm text-blue-600">Điểm ngữ pháp</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">85%</div>
              <div className="text-sm text-blue-600">Độ chính xác</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">4.2</div>
              <div className="text-sm text-blue-600">Điểm trung bình</div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-blue-100">
            <div className="flex items-center justify-between text-sm">
              <span className="text-blue-600">Mục tiêu tháng này:</span>
              <span className="font-semibold text-blue-900">
                Hoàn thành 5 phần
              </span>
            </div>
            <div className="mt-2 bg-blue-100 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full w-3/5"></div>
            </div>
          </div>
        </div>

        {/* Grammar Parts */}
        <div className="space-y-8">
          {grammarData.parts.map((part, partIndex) => (
            <div
              key={partIndex}
              className="bg-white rounded-xl shadow-sm border border-blue-100 overflow-hidden"
            >
              {/* Part Header */}
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold">{partIndex + 1}</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{part.name}</h2>
                    <p className="text-blue-100 text-sm">
                      {part.topics.length} chủ đề
                    </p>
                  </div>
                </div>
              </div>

              {/* Topics */}
              <div className="divide-y divide-blue-100">
                {part.topics.map((topic, topicIndex) => (
                  <div
                    key={topicIndex}
                    className="p-6 hover:bg-blue-50/50 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                          <span className="text-xs font-bold text-blue-600">
                            {topicIndex + 1}
                          </span>
                        </div>
                        <h3 className="text-lg font-semibold text-blue-900">
                          {topic.title}
                        </h3>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-blue-600">
                          {topic.grammarPoints.length} điểm ngữ pháp
                        </span>
                        <ChevronRight className="w-4 h-4 text-blue-400" />
                      </div>
                    </div>

                    {/* Grammar Points Preview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {topic.grammarPoints.map((point, pointIndex) => (
                        <Link
                          key={pointIndex}
                          href={`/study/language/japanese/grammar/${
                            partIndex + 1
                          }-${topicIndex + 1}-${pointIndex + 1}`}
                          className="group bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
                        >
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                              <Sparkles className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <div className="font-semibold text-blue-900 text-sm mb-1">
                                {point.structure}
                              </div>
                              <div className="text-xs text-blue-700 leading-relaxed">
                                {point.usages[0]?.meaning}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="text-xs text-blue-600">
                              {point.usages[0]?.examples.length} ví dụ
                            </div>
                            <div className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                              N
                              {partIndex === 0
                                ? "3"
                                : partIndex === 1
                                ? "4"
                                : "5"}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Practice Section */}
        <div className="mt-8 bg-white rounded-xl p-6 shadow-sm border border-blue-100">
          <div className="flex items-center space-x-2 mb-6">
            <Target className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg font-semibold text-blue-900">
              Luyện tập nhanh
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="group p-4 border border-blue-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 hover:scale-[1.02] text-left">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                </div>
                <div className="font-semibold text-blue-900">Điền khuyết</div>
              </div>
              <div className="text-sm text-blue-600 leading-relaxed">
                Luyện tập ngữ pháp cơ bản với bài tập tương tác
              </div>
            </button>
            <button className="group p-4 border border-blue-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 hover:scale-[1.02] text-left">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-emerald-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div className="font-semibold text-blue-900">Trắc nghiệm</div>
              </div>
              <div className="text-sm text-blue-600 leading-relaxed">
                Bài tập trắc nghiệm để kiểm tra kiến thức
              </div>
            </button>
            <button className="group p-4 border border-blue-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 hover:scale-[1.02] text-left">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                </div>
                <div className="font-semibold text-blue-900">Flashcard</div>
              </div>
              <div className="text-sm text-blue-600 leading-relaxed">
                Ôn tập từ vựng và cấu trúc ngữ pháp
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
