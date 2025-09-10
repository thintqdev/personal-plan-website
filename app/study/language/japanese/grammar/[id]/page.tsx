"use client";

import Link from "next/link";
import { use } from "react";
import {
  ArrowLeft,
  BookOpen,
  CheckCircle,
  ChevronRight,
  Play,
  Star,
  Target,
  Lightbulb,
  MessageSquare,
  Trophy,
  Sparkles,
} from "lucide-react";

export default function GrammarDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const grammarId = parseInt(resolvedParams.id);

  // Mock data for grammar lessons - in real app this would come from API/database
  const grammarLessons = {
    1: {
      id: 1,
      title: "〜ている (Đang làm gì)",
      description: "Diễn đạt hành động đang diễn ra hoặc trạng thái liên tục",
      progress: 85,
      completed: true,
      content: {
        introduction:
          "〜ている là cấu trúc ngữ pháp quan trọng trong tiếng Nhật N3, dùng để diễn đạt hành động đang diễn ra hoặc trạng thái liên tục.",
        structure: "Động từ thể て + いる",
        examples: [
          {
            japanese: "今、勉強しています。",
            vietnamese: "Bây giờ tôi đang học.",
          },
          {
            japanese: "雨が降っています。",
            vietnamese: "Mưa đang rơi.",
          },
          {
            japanese: "結婚しています。",
            vietnamese: "Đã kết hôn. (trạng thái)",
          },
        ],
        grammarPoints: [
          {
            title: "Hành động đang diễn ra",
            usage: "Diễn đạt hành động đang xảy ra tại thời điểm nói",
            meaning: "Chỉ hành động đang tiếp tục diễn ra",
            examples: [
              { jp: "食べています", vn: "đang ăn" },
              { jp: "話しています", vn: "đang nói" },
              { jp: "走っています", vn: "đang chạy" },
            ],
          },
          {
            title: "Trạng thái liên tục",
            usage: "Diễn đạt trạng thái đang tồn tại",
            meaning: "Chỉ tình trạng đang tiếp diễn",
            examples: [
              { jp: "病気です", vn: "đang ốm" },
              { jp: "結婚しています", vn: "đã kết hôn" },
              { jp: "住んでいます", vn: "đang sống" },
            ],
          },
          {
            title: "Kết hợp với thời gian",
            usage: "〜ている + 時間/日/年",
            meaning: "Diễn đạt khoảng thời gian đã trôi qua",
            examples: [
              { jp: "3時間待っています", vn: "đã đợi 3 tiếng" },
              { jp: "5年住んでいます", vn: "đã sống 5 năm" },
            ],
          },
        ],
      },
    },
    2: {
      id: 2,
      title: "〜たい (Muốn làm gì)",
      description: "Diễn đạt mong muốn, nguyện vọng cá nhân",
      progress: 70,
      completed: false,
      content: {
        introduction:
          "〜たい dùng để diễn đạt mong muốn, nguyện vọng của bản thân. Chỉ có thể dùng với chủ ngữ là người thứ nhất (tôi).",
        structure: "Động từ thể ます (bỏ ます) + たい",
        examples: [
          {
            japanese: "日本へ行きたいです。",
            vietnamese: "Tôi muốn đi Nhật Bản.",
          },
          {
            japanese: "寿司を食べたい。",
            vietnamese: "Tôi muốn ăn sushi.",
          },
          {
            japanese: "早く寝たいです。",
            vietnamese: "Tôi muốn ngủ sớm.",
          },
        ],
        grammarPoints: [
          {
            title: "Mong muốn hiện tại",
            usage: "Diễn đạt mong muốn tại thời điểm nói",
            meaning: "Thể hiện nguyện vọng, ham muốn",
            examples: [
              { jp: "見たい", vn: "muốn xem" },
              { jp: "買いたい", vn: "muốn mua" },
              { jp: "会いたい", vn: "muốn gặp" },
            ],
          },
          {
            title: "Kết hợp với 〜と思います",
            usage: "〜たいと思います",
            meaning: "Diễn đạt suy nghĩ về mong muốn của người khác",
            examples: [
              { jp: "食べたいと思います", vn: "có lẽ muốn ăn" },
              { jp: "行きたいと思います", vn: "có lẽ muốn đi" },
            ],
          },
          {
            title: "Phủ định với 〜くない",
            usage: "〜たくない",
            meaning: "Không muốn làm gì",
            examples: [
              { jp: "行きたくない", vn: "không muốn đi" },
              { jp: "食べたくない", vn: "không muốn ăn" },
            ],
          },
        ],
      },
    },
    3: {
      id: 3,
      title: "〜ことができる (Có thể làm gì)",
      description: "Diễn đạt khả năng, kỹ năng hoặc khả năng thực hiện",
      progress: 60,
      completed: false,
      content: {
        introduction:
          "〜ことができる diễn đạt khả năng làm được điều gì đó, có kỹ năng hoặc có khả năng thực hiện hành động.",
        structure: "Động từ thể た (bỏ た) + ことができる",
        examples: [
          {
            japanese: "日本語を話すことができます。",
            vietnamese: "Tôi có thể nói tiếng Nhật.",
          },
          {
            japanese: "ピアノを弾くことができます。",
            vietnamese: "Tôi có thể chơi piano.",
          },
          {
            japanese: "明日来ることができます。",
            vietnamese: "Tôi có thể đến vào ngày mai.",
          },
        ],
        grammarPoints: [
          {
            title: "Khả năng kỹ năng",
            usage: "Diễn đạt kỹ năng, khả năng đã học được",
            meaning: "Có thể làm được nhờ đã học hoặc rèn luyện",
            examples: [
              { jp: "泳ぐことができます", vn: "có thể bơi" },
              { jp: "運転することができます", vn: "có thể lái xe" },
            ],
          },
          {
            title: "Khả năng tình huống",
            usage: "Diễn đạt khả năng trong tình huống cụ thể",
            meaning: "Có thể thực hiện được trong hoàn cảnh hiện tại",
            examples: [
              { jp: "手伝うことができます", vn: "có thể giúp đỡ" },
              { jp: "参加することができます", vn: "có thể tham gia" },
            ],
          },
          {
            title: "Phủ định 〜ことができない",
            usage: "Không thể làm gì",
            meaning: "Không có khả năng hoặc không được phép",
            examples: [
              { jp: "見ることができません", vn: "không thể xem" },
              { jp: "行くことができません", vn: "không thể đi" },
            ],
          },
        ],
      },
    },
    4: {
      id: 4,
      title: "〜なければならない (Phải làm gì)",
      description: "Diễn đạt nghĩa vụ, bổn phận phải thực hiện",
      progress: 45,
      completed: false,
      content: {
        introduction:
          "〜なければならない diễn đạt nghĩa vụ, bổn phận phải làm gì đó. Thường dùng trong tình huống trang trọng hoặc có tính bắt buộc.",
        structure: "Động từ thể た (bỏ た) + なければならない",
        examples: [
          {
            japanese: "宿題をしなければなりません。",
            vietnamese: "Tôi phải làm bài tập về nhà.",
          },
          {
            japanese: "医者に行かなければなりません。",
            vietnamese: "Tôi phải đi gặp bác sĩ.",
          },
          {
            japanese: "早く寝なければなりません。",
            vietnamese: "Tôi phải ngủ sớm.",
          },
        ],
        grammarPoints: [
          {
            title: "Nghĩa vụ bắt buộc",
            usage: "Diễn đạt bổn phận, trách nhiệm phải thực hiện",
            meaning: "Phải làm theo quy định, luật lệ hoặc đạo đức",
            examples: [
              { jp: "勉強しなければなりません", vn: "phải học" },
              { jp: "働かなければなりません", vn: "phải làm việc" },
            ],
          },
          {
            title: "Nghĩa vụ tình huống",
            usage: "Diễn đạt cần thiết trong tình huống cụ thể",
            meaning: "Phải làm để đạt được mục đích",
            examples: [
              { jp: "急がなければなりません", vn: "phải vội" },
              { jp: "連絡しなければなりません", vn: "phải liên lạc" },
            ],
          },
          {
            title: "Dạng rút gọn 〜なきゃ",
            usage: "〜なきゃいけない (khẩu ngữ)",
            meaning: "Cách nói thân mật của 〜なければならない",
            examples: [
              { jp: "行かなきゃ", vn: "phải đi" },
              { jp: "食べなきゃ", vn: "phải ăn" },
            ],
          },
        ],
      },
    },
    5: {
      id: 5,
      title: "〜てはいけない (Không được làm gì)",
      description: "Diễn đạt cấm đoán, không được phép làm gì",
      progress: 30,
      completed: false,
      content: {
        introduction:
          "〜てはいけない diễn đạt sự cấm đoán, không được phép làm gì đó. Thường dùng trong quy tắc, luật lệ hoặc lời khuyên nghiêm túc.",
        structure: "Động từ thể て + はいけない",
        examples: [
          {
            japanese: "ここでタバコを吸ってはいけません。",
            vietnamese: "Không được hút thuốc ở đây.",
          },
          {
            japanese: "遅れてはいけません。",
            vietnamese: "Không được đến muộn.",
          },
          {
            japanese: "触ってはいけません。",
            vietnamese: "Không được chạm vào.",
          },
        ],
        grammarPoints: [
          {
            title: "Cấm đoán tuyệt đối",
            usage: "Diễn đạt luật lệ, quy định nghiêm cấm",
            meaning: "Hoàn toàn không được phép",
            examples: [
              { jp: "入ってはいけません", vn: "không được vào" },
              { jp: "話してはいけません", vn: "không được nói" },
            ],
          },
          {
            title: "Lời khuyên nghiêm túc",
            usage: "Diễn đạt lời khuyên mạnh mẽ",
            meaning: "Không nên làm vì có hậu quả xấu",
            examples: [
              { jp: "食べ過ぎてはいけません", vn: "không được ăn quá nhiều" },
              { jp: "無理をしてはいけません", vn: "không được cố sức quá" },
            ],
          },
          {
            title: "Dạng lịch sự 〜てはいけません",
            usage: "Dùng trong văn cảnh trang trọng",
            meaning: "Cách nói lịch sự của 〜てはいけない",
            examples: [
              { jp: "飲んではいけません", vn: "không được uống" },
              { jp: "使ってはいけません", vn: "không được dùng" },
            ],
          },
        ],
      },
    },
    6: {
      id: 6,
      title: "〜てもいい (Được phép làm gì)",
      description: "Diễn đạt sự cho phép, được phép làm gì",
      progress: 15,
      completed: false,
      content: {
        introduction:
          "〜てもいい diễn đạt sự cho phép, được phép làm gì đó. Là dạng trái nghĩa với 〜てはいけない.",
        structure: "Động từ thể て + もいい",
        examples: [
          {
            japanese: "ここで写真を撮ってもいいですか。",
            vietnamese: "Tôi có thể chụp ảnh ở đây không?",
          },
          {
            japanese: "食べてもいいですよ。",
            vietnamese: "Bạn có thể ăn được đấy.",
          },
          {
            japanese: "休んでもいいです。",
            vietnamese: "Bạn có thể nghỉ ngơi.",
          },
        ],
        grammarPoints: [
          {
            title: "Xin phép lịch sự",
            usage: "〜てもいいですか？",
            meaning: "Xin phép làm gì đó một cách lịch sự",
            examples: [
              { jp: "座ってもいいですか", vn: "tôi có thể ngồi không?" },
              { jp: "使ってもいいですか", vn: "tôi có thể dùng không?" },
            ],
          },
          {
            title: "Cho phép",
            usage: "〜てもいいよ/〜てもいいですよ",
            meaning: "Cho phép người khác làm gì đó",
            examples: [
              { jp: "行ってもいいよ", vn: "có thể đi được" },
              { jp: "飲んでもいいですよ", vn: "có thể uống được" },
            ],
          },
          {
            title: "Không nhất thiết phải",
            usage: "〜なくてもいい",
            meaning: "Không nhất thiết phải làm gì",
            examples: [
              { jp: "来なくてもいい", vn: "không nhất thiết phải đến" },
              { jp: "勉強しなくてもいい", vn: "không nhất thiết phải học" },
            ],
          },
        ],
      },
    },
  };

  const lesson = grammarLessons[grammarId as keyof typeof grammarLessons];

  if (!lesson) {
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
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-900 to-indigo-900 bg-clip-text text-transparent">
                  {lesson.title}
                </h1>
                <p className="text-blue-600 text-sm">{lesson.description}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <div className="text-sm text-blue-600">Tiến độ</div>
                <div className="text-lg font-bold text-blue-900">
                  {lesson.progress}%
                </div>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center shadow-sm">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Progress Bar */}
        <div className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-blue-100">
          <div className="flex items-center space-x-2 mb-3">
            <Target className="w-5 h-5 text-blue-600" />
            <div className="text-sm text-blue-600 font-medium">
              Tiến độ bài học
            </div>
            <div className="text-sm text-blue-900 font-bold">
              {lesson.progress}%
            </div>
          </div>
          <div className="w-full bg-blue-100 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-500 to-indigo-600 h-3 rounded-full transition-all duration-500 ease-out shadow-sm"
              style={{ width: `${lesson.progress}%` }}
            ></div>
          </div>
        </div>

        {/* Introduction */}
        <div className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-blue-100">
          <div className="flex items-center space-x-2 mb-4">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <h2 className="text-lg font-semibold text-blue-900">Giới thiệu</h2>
          </div>
          <p className="text-blue-700 leading-relaxed text-base mb-4">
            {lesson.content.introduction}
          </p>
          {lesson.content.structure && (
            <div className="bg-amber-50 rounded-lg p-4 border-l-4 border-amber-400">
              <div className="flex items-center space-x-2 mb-2">
                <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
                <span className="text-sm font-medium text-amber-800">
                  Cấu trúc
                </span>
              </div>
              <p className="text-amber-700 font-medium text-base">
                {lesson.content.structure}
              </p>
            </div>
          )}
        </div>

        {/* Grammar Points */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <Sparkles className="w-5 h-5 text-purple-500" />
            <h2 className="text-lg font-semibold text-blue-900">
              Điểm ngữ pháp chính
            </h2>
          </div>
          <div className="grid gap-6">
            {lesson.content.grammarPoints.map((point, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm border border-blue-100 hover:shadow-lg transition-all duration-200 hover:scale-[1.01]"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-purple-600">
                      {index + 1}
                    </span>
                  </div>
                  <div className="flex-1 space-y-4">
                    <h3 className="font-semibold text-blue-900 text-lg mb-4">
                      {point.title}
                    </h3>

                    {/* Cách dùng */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border-l-4 border-blue-400">
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                        <span className="text-sm font-semibold text-blue-800 uppercase tracking-wide">
                          Cách dùng
                        </span>
                      </div>
                      <p className="text-blue-700 text-base leading-relaxed font-medium">
                        {point.usage}
                      </p>
                    </div>

                    {/* Ý nghĩa */}
                    {"meaning" in point && (
                      <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border-l-4 border-purple-400">
                        <div className="flex items-center space-x-2 mb-3">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span className="text-sm font-semibold text-purple-800 uppercase tracking-wide">
                            Ý nghĩa
                          </span>
                        </div>
                        <p className="text-purple-700 text-base leading-relaxed">
                          {point.meaning}
                        </p>
                      </div>
                    )}

                    {/* Ví dụ */}
                    {"examples" in point && (
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border-l-4 border-green-400">
                        <div className="flex items-center space-x-2 mb-4">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-sm font-semibold text-green-800 uppercase tracking-wide">
                            Ví dụ
                          </span>
                        </div>
                        <div className="grid gap-3">
                          {point.examples.map((example, exIndex) => (
                            <div
                              key={exIndex}
                              className="bg-white rounded-lg p-4 border border-green-200 shadow-sm hover:shadow-md transition-shadow duration-200"
                            >
                              <div className="space-y-2">
                                <div className="font-semibold text-blue-900 text-lg leading-relaxed">
                                  {example.jp}
                                </div>
                                <div className="text-sm text-blue-700 italic">
                                  {example.vn}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Examples */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <MessageSquare className="w-5 h-5 text-green-500" />
            <h2 className="text-lg font-semibold text-blue-900">Ví dụ</h2>
          </div>
          <div className="grid gap-4">
            {lesson.content.examples.map((example, index) => (
              <div
                key={index}
                className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-5 border border-green-200 hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-white">
                        {index + 1}
                      </span>
                    </div>
                    <div className="font-semibold text-blue-900 text-lg leading-relaxed">
                      {example.japanese}
                    </div>
                  </div>
                  <div className="ml-11">
                    <div className="text-sm text-blue-700 italic bg-white/70 rounded-lg px-4 py-2 border border-green-200">
                      {example.vietnamese}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Practice Section */}
        <div className="mb-8">
          <div className="flex items-center space-x-2 mb-6">
            <Trophy className="w-5 h-5 text-orange-500" />
            <h2 className="text-lg font-semibold text-blue-900">Luyện tập</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <button className="group bg-white rounded-xl p-6 shadow-sm border border-blue-100 hover:shadow-lg transition-all duration-200 hover:scale-[1.02] text-left">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Play className="w-6 h-6 text-blue-600" />
                </div>
                <div className="font-semibold text-blue-900 text-lg">
                  Bài tập điền khuyết
                </div>
              </div>
              <div className="text-sm text-blue-600 ml-15 leading-relaxed">
                Luyện tập ngữ pháp với bài tập tương tác
              </div>
            </button>
            <button className="group bg-white rounded-xl p-6 shadow-sm border border-blue-100 hover:shadow-lg transition-all duration-200 hover:scale-[1.02] text-left">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <div className="font-semibold text-blue-900 text-lg">
                  Flashcard
                </div>
              </div>
              <div className="text-sm text-blue-600 ml-15 leading-relaxed">
                Ôn tập từ vựng và cấu trúc
              </div>
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center pt-6 border-t border-blue-200/50">
          <Link
            href={`/study/language/japanese/grammar/${grammarId - 1}`}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 ${
              grammarId > 1
                ? "text-blue-600 hover:text-blue-900 hover:bg-blue-50 hover:shadow-md hover:scale-105"
                : "text-blue-300 cursor-not-allowed"
            }`}
            onClick={(e) => grammarId <= 1 && e.preventDefault()}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Bài trước</span>
          </Link>

          <div className="flex items-center space-x-4 bg-white rounded-xl px-4 py-2 shadow-sm border border-blue-100">
            <span className="text-sm text-blue-600 font-medium">
              Bài {grammarId} / 6
            </span>
            {lesson.completed && (
              <CheckCircle className="w-5 h-5 text-green-600" />
            )}
          </div>

          <Link
            href={`/study/language/japanese/grammar/${grammarId + 1}`}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200 ${
              grammarId < 6
                ? "text-blue-600 hover:text-blue-900 hover:bg-blue-50 hover:shadow-md hover:scale-105"
                : "text-blue-300 cursor-not-allowed"
            }`}
            onClick={(e) => grammarId >= 6 && e.preventDefault()}
          >
            <span className="font-medium">Bài tiếp</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
