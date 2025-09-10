"use client";

import Link from "next/link";
import { ArrowLeft, RotateCcw, Volume2, Eye, EyeOff } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function VocabularyFlashcardPage() {
  const params = useParams();
  const lessonId = params?.id ? parseInt(params.id as string) : 1;
  const [currentCard, setCurrentCard] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showFurigana, setShowFurigana] = useState(true);
  const [knownCards, setKnownCards] = useState<Set<number>>(new Set());
  const [studyMode, setStudyMode] = useState<"practice" | "review">("practice");
  const [isClient, setIsClient] = useState(false);

  const lessons = [
    {
      id: 1,
      title: "Bài 1: Chào hỏi cơ bản",
      vocabulary: [
        {
          japanese: "こんにちは",
          furigana: "こんにちは",
          meaning: "Xin chào (ban ngày)",
          example: "こんにちは、田中さん。",
          exampleMeaning: "Xin chào, anh Tanaka.",
          audio: "/audio/konnichiwa.mp3",
          difficulty: "easy",
        },
        {
          japanese: "こんばんは",
          furigana: "こんばんは",
          meaning: "Xin chào (tối)",
          example: "こんばんは、おやすみなさい。",
          exampleMeaning: "Xin chào, chúc ngủ ngon.",
          audio: "/audio/konbanwa.mp3",
          difficulty: "easy",
        },
        {
          japanese: "おはよう",
          furigana: "おはよう",
          meaning: "Chào buổi sáng",
          example: "おはようございます。",
          exampleMeaning: "Chào buổi sáng.",
          audio: "/audio/ohayou.mp3",
          difficulty: "easy",
        },
        {
          japanese: "さようなら",
          furigana: "さようなら",
          meaning: "Tạm biệt",
          example: "さようなら、また明日。",
          exampleMeaning: "Tạm biệt, hẹn gặp lại ngày mai.",
          audio: "/audio/sayounara.mp3",
          difficulty: "easy",
        },
        {
          japanese: "ありがとう",
          furigana: "ありがとう",
          meaning: "Cảm ơn",
          example: "プレゼント、ありがとうございます。",
          exampleMeaning: "Cảm ơn về món quà.",
          audio: "/audio/arigatou.mp3",
          difficulty: "easy",
        },
      ],
    },
    {
      id: 2,
      title: "Bài 2: Gia đình và người thân",
      vocabulary: [
        {
          japanese: "家族",
          furigana: "かぞく",
          meaning: "Gia đình",
          example: "私の家族は4人です。",
          exampleMeaning: "Gia đình tôi có 4 người.",
          audio: "/audio/kazoku.mp3",
          difficulty: "easy",
        },
        {
          japanese: "父",
          furigana: "ちち",
          meaning: "Cha",
          example: "父は会社員です。",
          exampleMeaning: "Cha tôi là nhân viên công ty.",
          audio: "/audio/chichi.mp3",
          difficulty: "easy",
        },
        {
          japanese: "母",
          furigana: "はは",
          meaning: "Mẹ",
          example: "母は料理が上手です。",
          exampleMeaning: "Mẹ tôi nấu ăn giỏi.",
          audio: "/audio/haha.mp3",
          difficulty: "easy",
        },
        {
          japanese: "兄",
          furigana: "あに",
          meaning: "Anh trai",
          example: "兄は大学生です。",
          exampleMeaning: "Anh trai tôi là sinh viên.",
          audio: "/audio/ani.mp3",
          difficulty: "medium",
        },
        {
          japanese: "姉",
          furigana: "あね",
          meaning: "Chị gái",
          example: "姉は看護師です。",
          exampleMeaning: "Chị gái tôi là y tá.",
          audio: "/audio/ane.mp3",
          difficulty: "medium",
        },
      ],
    },
    {
      id: 3,
      title: "Bài 3: Thực phẩm và đồ uống",
      vocabulary: [
        {
          japanese: "りんご",
          furigana: "りんご",
          meaning: "Quả táo",
          example: "赤いりんごが好きです。",
          exampleMeaning: "Tôi thích táo đỏ.",
          audio: "/audio/ringo.mp3",
          difficulty: "easy",
        },
        {
          japanese: "みかん",
          furigana: "みかん",
          meaning: "Quả cam",
          example: "みかんを食べます。",
          exampleMeaning: "Tôi ăn cam.",
          audio: "/audio/mikan.mp3",
          difficulty: "easy",
        },
        {
          japanese: "バナナ",
          furigana: "バナナ",
          meaning: "Quả chuối",
          example: "バナナは甘いです。",
          exampleMeaning: "Chuối ngọt.",
          audio: "/audio/banana.mp3",
          difficulty: "easy",
        },
        {
          japanese: "水",
          furigana: "みず",
          meaning: "Nước",
          example: "水を飲んでください。",
          exampleMeaning: "Hãy uống nước.",
          audio: "/audio/mizu.mp3",
          difficulty: "easy",
        },
        {
          japanese: "お茶",
          furigana: "おちゃ",
          meaning: "Trà",
          example: "お茶を飲みます。",
          exampleMeaning: "Tôi uống trà.",
          audio: "/audio/ocha.mp3",
          difficulty: "easy",
        },
      ],
    },
    {
      id: 4,
      title: "Bài 4: Thời gian và ngày tháng",
      vocabulary: [
        {
          japanese: "今日",
          furigana: "きょう",
          meaning: "Hôm nay",
          example: "今日はいい天気です。",
          exampleMeaning: "Hôm nay thời tiết tốt.",
          audio: "/audio/kyou.mp3",
          difficulty: "easy",
        },
        {
          japanese: "明日",
          furigana: "あした",
          meaning: "Ngày mai",
          example: "明日は学校があります。",
          exampleMeaning: "Ngày mai có trường.",
          audio: "/audio/ashita.mp3",
          difficulty: "easy",
        },
        {
          japanese: "昨日",
          furigana: "きのう",
          meaning: "Hôm qua",
          example: "昨日は雨でした。",
          exampleMeaning: "Hôm qua trời mưa.",
          audio: "/audio/kinou.mp3",
          difficulty: "easy",
        },
        {
          japanese: "朝",
          furigana: "あさ",
          meaning: "Buổi sáng",
          example: "朝ご飯を食べます。",
          exampleMeaning: "Tôi ăn sáng.",
          audio: "/audio/asa.mp3",
          difficulty: "easy",
        },
        {
          japanese: "夜",
          furigana: "よる",
          meaning: "Buổi tối",
          example: "夜は暗いです。",
          exampleMeaning: "Buổi tối tối.",
          audio: "/audio/yoru.mp3",
          difficulty: "easy",
        },
      ],
    },
    {
      id: 5,
      title: "Bài 5: Đồ vật trong nhà",
      vocabulary: [
        {
          japanese: "テーブル",
          furigana: "テーブル",
          meaning: "Cái bàn",
          example: "テーブルに本があります。",
          exampleMeaning: "Có sách trên bàn.",
          audio: "/audio/table.mp3",
          difficulty: "easy",
        },
        {
          japanese: "いす",
          furigana: "いす",
          meaning: "Cái ghế",
          example: "いすに座ってください。",
          exampleMeaning: "Hãy ngồi trên ghế.",
          audio: "/audio/isu.mp3",
          difficulty: "easy",
        },
        {
          japanese: "ベッド",
          furigana: "ベッド",
          meaning: "Cái giường",
          example: "ベッドで寝ます。",
          exampleMeaning: "Tôi ngủ trên giường.",
          audio: "/audio/bed.mp3",
          difficulty: "easy",
        },
        {
          japanese: "ドア",
          furigana: "ドア",
          meaning: "Cửa",
          example: "ドアを開けてください。",
          exampleMeaning: "Hãy mở cửa.",
          audio: "/audio/door.mp3",
          difficulty: "easy",
        },
        {
          japanese: "窓",
          furigana: "まど",
          meaning: "Cửa sổ",
          example: "窓から見えます。",
          exampleMeaning: "Có thể nhìn thấy từ cửa sổ.",
          audio: "/audio/mado.mp3",
          difficulty: "easy",
        },
      ],
    },
    {
      id: 6,
      title: "Bài 6: Nghề nghiệp và công việc",
      vocabulary: [
        {
          japanese: "先生",
          furigana: "せんせい",
          meaning: "Giáo viên",
          example: "先生は親切です。",
          exampleMeaning: "Giáo viên rất thân thiện.",
          audio: "/audio/sensei.mp3",
          difficulty: "medium",
        },
        {
          japanese: "医者",
          furigana: "いしゃ",
          meaning: "Bác sĩ",
          example: "医者になりたいです。",
          exampleMeaning: "Tôi muốn trở thành bác sĩ.",
          audio: "/audio/isha.mp3",
          difficulty: "medium",
        },
        {
          japanese: "会社員",
          furigana: "かいしゃいん",
          meaning: "Nhân viên công ty",
          example: "会社員として働いています。",
          exampleMeaning: "Tôi làm việc như nhân viên công ty.",
          audio: "/audio/kaishain.mp3",
          difficulty: "hard",
        },
        {
          japanese: "学生",
          furigana: "がくせい",
          meaning: "Sinh viên",
          example: "私は学生です。",
          exampleMeaning: "Tôi là sinh viên.",
          audio: "/audio/gakusei.mp3",
          difficulty: "easy",
        },
        {
          japanese: "料理人",
          furigana: "りょうりにん",
          meaning: "Đầu bếp",
          example: "料理人が作りました。",
          exampleMeaning: "Đầu bếp đã làm.",
          audio: "/audio/ryourinin.mp3",
          difficulty: "hard",
        },
      ],
    },
  ];

  const currentLesson = lessons.find((lesson) => lesson.id === lessonId);
  const currentFlashcard = currentLesson?.vocabulary[currentCard];

  // Handle hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (!currentLesson || !currentFlashcard) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Không tìm thấy bài học
          </h1>
          <Link
            href="/study/language/japanese/vocabulary"
            className="text-blue-600 hover:text-blue-800"
          >
            Quay lại danh sách bài học
          </Link>
        </div>
      </div>
    );
  }

  const handleNext = () => {
    setIsFlipped(false);
    if (currentCard < currentLesson.vocabulary.length - 1) {
      setCurrentCard(currentCard + 1);
    } else {
      // Reset to beginning when reaching the end
      setCurrentCard(0);
    }
  };

  const handlePrevious = () => {
    setIsFlipped(false);
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
    }
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleKnown = () => {
    setKnownCards((prev) => new Set([...prev, currentCard]));
    handleNext();
  };

  const handleUnknown = () => {
    handleNext();
  };

  const playAudio = (audioSrc: string) => {
    const audio = new Audio(audioSrc);
    audio.play();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href={`/study/language/japanese/vocabulary/${lessonId}`}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Quay lại bài học</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">Tiến độ</div>
                <div className="text-lg font-semibold text-blue-600">
                  {currentCard + 1}/{currentLesson.vocabulary.length}
                </div>
              </div>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <RotateCcw className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Settings */}
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Flashcard: {currentLesson.title}
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Ôn tập từ vựng theo thẻ ghi nhớ
          </p>
        </div>
        <div className="mb-6 flex justify-center space-x-4">
          <button
            onClick={() => setShowFurigana(!showFurigana)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              showFurigana
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {showFurigana ? (
              <Eye className="w-4 h-4 inline mr-2" />
            ) : (
              <EyeOff className="w-4 h-4 inline mr-2" />
            )}
            Furigana
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-500 h-3 rounded-full transition-all duration-300"
              style={{
                width: `${
                  ((currentCard + 1) / currentLesson.vocabulary.length) * 100
                }%`,
              }}
            ></div>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>
              Thẻ {currentCard + 1} / {currentLesson.vocabulary.length}
            </span>
            <span>Đã biết: {knownCards.size}</span>
          </div>
        </div>

        {/* Flashcard */}
        <div className="flex justify-center mb-8">
          <div
            className="w-full max-w-lg h-96 cursor-pointer perspective-1000"
            onClick={handleFlip}
          >
            <div
              className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d ${
                isFlipped ? "rotate-y-180" : ""
              }`}
            >
              {/* Front of card */}
              <div className="absolute inset-0 w-full h-full backface-hidden">
                <div className="w-full h-full bg-white rounded-3xl shadow-xl border-2 border-gray-200 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 hover:shadow-2xl transition-all duration-300">
                  <div className="text-center">
                    {/* Japanese Character */}
                    <div className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4 sm:mb-6">
                      {currentFlashcard.japanese}
                    </div>

                    {/* Furigana */}
                    {showFurigana && (
                      <div className="text-base sm:text-lg md:text-xl text-gray-600 mb-4 sm:mb-6 font-medium">
                        {currentFlashcard.furigana}
                      </div>
                    )}

                    {/* Audio Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playAudio(currentFlashcard.audio);
                      }}
                      className="inline-flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 sm:px-4 py-2 rounded-full transition-all duration-200"
                    >
                      <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-xs sm:text-sm font-medium">
                        Phát âm
                      </span>
                    </button>

                    {/* Hint */}
                    <div className="mt-6 sm:mt-8 text-gray-500 text-xs sm:text-sm">
                      Nhấp để xem nghĩa và ví dụ
                    </div>
                  </div>
                </div>
              </div>

              {/* Back of card */}
              <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180">
                <div className="w-full h-full bg-white rounded-3xl shadow-xl border-2 border-gray-200 flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
                  <div className="text-center max-w-sm">
                    {/* Meaning */}
                    <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6">
                      {currentFlashcard.meaning}
                    </div>

                    {/* Furigana */}
                    {showFurigana && (
                      <div className="text-base sm:text-lg text-gray-600 mb-3 sm:mb-4 font-medium">
                        {currentFlashcard.furigana}
                      </div>
                    )}

                    {/* Example Section */}
                    <div className="bg-gray-50 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
                      <div className="text-xs sm:text-sm text-gray-600 mb-2 font-medium">
                        Ví dụ thực tế:
                      </div>
                      <div className="text-base sm:text-lg font-semibold text-gray-900 mb-2">
                        {currentFlashcard.example}
                      </div>
                      <div className="text-xs sm:text-sm text-gray-600 italic">
                        {currentFlashcard.exampleMeaning}
                      </div>
                    </div>

                    {/* Audio Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playAudio(currentFlashcard.audio);
                      }}
                      className="inline-flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 sm:px-4 py-2 rounded-full transition-all duration-200 mb-3 sm:mb-4"
                    >
                      <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="text-xs sm:text-sm font-medium">
                        Nghe lại
                      </span>
                    </button>

                    {/* Hint */}
                    <div className="text-gray-500 text-xs sm:text-sm">
                      Nhấp để lật lại
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <div className="flex justify-center space-x-4 sm:space-x-6 mb-8">
          <button
            onClick={handlePrevious}
            disabled={currentCard === 0}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-medium shadow-md hover:shadow-lg text-sm sm:text-base"
          >
            ← Trước
          </button>

          <button
            onClick={handleFlip}
            className="px-6 sm:px-8 py-2 sm:py-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg text-sm sm:text-base"
          >
            {isFlipped ? "Lật Lại" : "Xem Nghĩa"}
          </button>

          <button
            onClick={handleNext}
            className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-200 text-gray-700 rounded-xl hover:bg-gray-300 transition-all duration-200 font-medium shadow-md hover:shadow-lg text-sm sm:text-base"
          >
            Tiếp →
          </button>
        </div>

        {/* Action Buttons */}
        {isFlipped && (
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-8">
            <button
              onClick={handleUnknown}
              className="px-8 sm:px-10 py-3 sm:py-4 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105 text-sm sm:text-base"
            >
              ❌ Chưa biết
            </button>
            <button
              onClick={handleKnown}
              className="px-8 sm:px-10 py-3 sm:py-4 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-all duration-200 font-medium shadow-md hover:shadow-lg transform hover:scale-105 text-sm sm:text-base"
            >
              ✅ Đã biết
            </button>
          </div>
        )}

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-gray-200 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-blue-500 mb-2">
              {knownCards.size}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Đã biết</div>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-gray-200 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-gray-500 mb-2">
              {currentLesson.vocabulary.length - knownCards.size}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Cần ôn tập</div>
          </div>

          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-gray-200 text-center">
            <div className="text-2xl sm:text-3xl font-bold text-green-500 mb-2">
              {knownCards.size > 0
                ? Math.round(
                    (knownCards.size / currentLesson.vocabulary.length) * 100
                  )
                : 0}
              %
            </div>
            <div className="text-xs sm:text-sm text-gray-600">
              Tỷ lệ chính xác
            </div>
          </div>
        </div>

        {/* Tips */}
        <div className="bg-blue-50 rounded-2xl p-4 sm:p-6 border border-blue-200">
          <h3 className="text-base sm:text-lg font-bold text-blue-900 mb-4 flex items-center">
            💡 Mẹo sử dụng Flashcard hiệu quả
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 text-xs sm:text-sm text-blue-800">
            <div className="flex items-start space-x-2">
              <span className="text-blue-500 font-bold">1.</span>
              <span>Xem mặt trước, cố gắng nhớ nghĩa trước khi lật thẻ</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-500 font-bold">2.</span>
              <span>Nghe phát âm để ghi nhớ cách đọc chính xác</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-500 font-bold">3.</span>
              <span>Học ví dụ để hiểu cách sử dụng trong ngữ cảnh</span>
            </div>
            <div className="flex items-start space-x-2">
              <span className="text-blue-500 font-bold">4.</span>
              <span>Ôn tập thường xuyên để ghi nhớ lâu dài</span>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
      `}</style>
    </div>
  );
}
