"use client";

import Link from "next/link";
import { use } from "react";
import { ArrowLeft, ChevronRight, Sparkles } from "lucide-react";

export default function GrammarDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const grammarId = resolvedParams.id; // Format: "part-topic-point" like "1-1-1"

  // Parse the ID to get part, topic, and point indices
  const [partIndex, topicIndex, pointIndex] = grammarId
    .split("-")
    .map((id) => parseInt(id) - 1);

  // Mock data for grammar lessons - in real app this would come from API/database
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

  // Get the current grammar point
  const currentPart = grammarData.parts[partIndex];
  const currentTopic = currentPart?.topics[topicIndex];
  const currentPoint = currentTopic?.grammarPoints[pointIndex];

  if (!currentPart || !currentTopic || !currentPoint) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center">
        <div className="text-center bg-white rounded-xl p-8 shadow-sm border border-blue-100">
          <h1 className="text-2xl font-bold text-blue-900 mb-4">
            Không tìm thấy bài học
          </h1>
          <Link
            href="/study/language/japanese/grammar"
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-900 transition-all duration-200 hover:scale-105 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại trang ngữ pháp</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Header */}
      <div className="border-b border-blue-200/50 bg-white/80 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link
                href="/study/language/japanese/grammar"
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-900 transition-all duration-200 hover:scale-105"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Quay lại</span>
              </Link>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-sm text-blue-600">
                  Phần {partIndex + 1}
                </div>
                <div className="text-lg font-bold text-blue-900">
                  {currentPart.name.split(":")[0]}
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center shadow-sm">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Header với thông tin cơ bản */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
          <div className="text-center">
            {/* Cấu trúc ngữ pháp chính */}
            <div className="mb-4">
              <div className="text-4xl font-bold text-blue-600 mb-2 font-mono">
                {currentPoint.structure}
              </div>
              <div className="text-lg text-gray-600">{currentTopic.title}</div>
            </div>

            {/* Thông tin cơ bản */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">MỨC ĐỘ</div>
                <div className="text-lg font-bold text-gray-900">
                  N{partIndex === 0 ? "3" : partIndex === 1 ? "4" : "5"}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">PHẦN</div>
                <div className="text-lg font-bold text-gray-900">
                  {partIndex + 1}
                </div>
                <div className="text-xs text-gray-600">
                  {currentPart.name.split(":")[0]}
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">CÁCH DÙNG</div>
                <div className="text-lg font-bold text-gray-900">
                  {currentPoint.usages.length}
                </div>
                <div className="text-xs text-gray-600">cách</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Phần 1: Cách kết hợp */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-blue-600 font-bold text-sm">組</span>
              </div>
              Cách kết hợp
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentPoint.combinations?.map((combination, index) => (
                <div
                  key={index}
                  className="bg-blue-50 border border-blue-200 rounded-lg p-3 hover:bg-blue-100 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-xs bg-blue-500 text-white rounded-full w-5 h-5 flex items-center justify-center font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <div className="font-mono text-blue-900 font-semibold text-sm flex-1 min-w-0">
                      <span className="break-all">{combination}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Usage Examples */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-green-600 font-bold text-sm">例</span>
              </div>
              Cách sử dụng
            </h2>

            <div className="space-y-4">
              {currentPoint.usages.map((usage, usageIndex) => (
                <div
                  key={usageIndex}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-start space-x-3 mb-3">
                    <span className="text-sm bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center font-bold flex-shrink-0 mt-0.5">
                      {usageIndex + 1}
                    </span>
                    <div className="text-gray-900 font-medium leading-relaxed">
                      {usage.meaning}
                    </div>
                  </div>

                  <div className="ml-9 space-y-3">
                    {usage.examples.slice(0, 2).map((example, exIndex) => (
                      <div
                        key={exIndex}
                        className="bg-gray-50 border border-gray-200 rounded-lg p-3"
                      >
                        <div className="font-mono text-gray-900 font-medium mb-1">
                          {example.jp}
                        </div>
                        <div className="text-sm text-gray-600 italic">
                          {example.vi}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Practice */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-purple-600 font-bold text-sm">練</span>
              </div>
              Bài tập luyện tập
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg p-4 text-left transition-colors">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">穴</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Điền khuyết</div>
                    <div className="text-xs text-gray-600">10 câu • Dễ</div>
                  </div>
                </div>
              </button>

              <button className="bg-green-50 hover:bg-green-100 border border-green-200 rounded-lg p-4 text-left transition-colors">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">卡</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Flashcard</div>
                    <div className="text-xs text-gray-600">15 thẻ • Ôn tập</div>
                  </div>
                </div>
              </button>

              <button className="bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg p-4 text-left transition-colors">
                <div className="flex items-center space-x-3 mb-2">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-sm">試</span>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Trắc nghiệm</div>
                    <div className="text-xs text-gray-600">
                      20 câu • Trung bình
                    </div>
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <div className="w-8 h-8 bg-yellow-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-yellow-600 font-bold text-sm">注</span>
              </div>
              Lưu ý quan trọng
            </h2>

            <div className="space-y-3">
              <div className="flex items-start space-x-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                <span className="text-yellow-600 mt-0.5">⚠️</span>
                <div>
                  <div className="font-medium text-gray-900 mb-1">
                    Sai lầm thường gặp
                  </div>
                  <div className="text-sm text-gray-700">
                    Không nhầm lẫn với cấu trúc tương tự có nghĩa khác
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <span className="text-blue-600 mt-0.5">💡</span>
                <div>
                  <div className="font-medium text-gray-900 mb-1">
                    Mẹo ghi nhớ
                  </div>
                  <div className="text-sm text-gray-700">
                    Liên tưởng với tình huống thực tế để dễ nhớ
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                <span className="text-green-600 mt-0.5">✓</span>
                <div>
                  <div className="font-medium text-gray-900 mb-1">
                    Ứng dụng thực tế
                  </div>
                  <div className="text-sm text-gray-700">
                    Thường dùng trong hội thoại hàng ngày
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
          <Link
            href={`/study/language/japanese/grammar/${Math.max(
              1,
              parseInt(grammarId.split("-")[0]) - 1
            )}-${Math.max(1, parseInt(grammarId.split("-")[1]))}-${Math.max(
              1,
              parseInt(grammarId.split("-")[2])
            )}`}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
              parseInt(grammarId.split("-")[0]) > 1
                ? "text-blue-600 border-blue-200 hover:bg-blue-50"
                : "text-gray-400 border-gray-200 cursor-not-allowed"
            }`}
            onClick={(e) =>
              parseInt(grammarId.split("-")[0]) <= 1 && e.preventDefault()
            }
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Bài trước</span>
          </Link>

          <Link
            href="/study/language/japanese/grammar"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Quay lại danh sách
          </Link>

          <Link
            href={`/study/language/japanese/grammar/${Math.min(
              grammarData.parts.length,
              parseInt(grammarId.split("-")[0]) + 1
            )}-${Math.min(
              grammarData.parts[parseInt(grammarId.split("-")[0])]?.topics
                .length || 1,
              parseInt(grammarId.split("-")[1])
            )}-${Math.min(
              grammarData.parts[parseInt(grammarId.split("-")[0])]?.topics[
                parseInt(grammarId.split("-")[1]) - 1
              ]?.grammarPoints.length || 1,
              parseInt(grammarId.split("-")[2])
            )}`}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
              parseInt(grammarId.split("-")[0]) < grammarData.parts.length
                ? "text-blue-600 border-blue-200 hover:bg-blue-50"
                : "text-gray-400 border-gray-200 cursor-not-allowed"
            }`}
            onClick={(e) =>
              parseInt(grammarId.split("-")[0]) >= grammarData.parts.length &&
              e.preventDefault()
            }
          >
            <span className="font-medium">Bài tiếp</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
