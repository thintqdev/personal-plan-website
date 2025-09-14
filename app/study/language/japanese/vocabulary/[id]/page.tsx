"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Star,
  CheckCircle,
  Clock,
  RotateCcw,
  Play,
  Volume2,
} from "lucide-react";
import { useState } from "react";
import { useParams } from "next/navigation";
import LanguageLayout from "../../../layout";

export default function VocabularyLessonPage() {
  const params = useParams();
  const lessonId = parseInt(params.id as string);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);

  const lessons = [
    {
      id: 1,
      title: "Bài 1: Chào hỏi cơ bản",
      words: 15,
      difficulty: "Dễ",
      progress: 100,
      completed: true,
      description: "Học các từ vựng cơ bản để chào hỏi trong tiếng Nhật",
      vocabulary: [
        {
          japanese: "こんにちは",
          furigana: "こんにちは",
          kanji: "",
          meaning: "Xin chào (ban ngày)",
          example: "こんにちは、田中さん。",
          exampleMeaning: "Xin chào, anh Tanaka.",
          audio: "/audio/konnichiwa.mp3",
        },
        {
          japanese: "こんばんは",
          furigana: "こんばんは",
          kanji: "",
          meaning: "Xin chào (tối)",
          example: "こんばんは、おやすみなさい。",
          exampleMeaning: "Xin chào, chúc ngủ ngon.",
          audio: "/audio/konbanwa.mp3",
        },
        {
          japanese: "おはよう",
          furigana: "おはよう",
          kanji: "",
          meaning: "Chào buổi sáng",
          example: "おはようございます。",
          exampleMeaning: "Chào buổi sáng.",
          audio: "/audio/ohayou.mp3",
        },
        {
          japanese: "さようなら",
          furigana: "さようなら",
          kanji: "",
          meaning: "Tạm biệt",
          example: "さようなら、また明日。",
          exampleMeaning: "Tạm biệt, hẹn gặp lại ngày mai.",
          audio: "/audio/sayounara.mp3",
        },
        {
          japanese: "ありがとう",
          furigana: "ありがとう",
          kanji: "",
          meaning: "Cảm ơn",
          example: "プレゼント、ありがとうございます。",
          exampleMeaning: "Cảm ơn về món quà.",
          audio: "/audio/arigatou.mp3",
        },
      ],
    },
    {
      id: 2,
      title: "Bài 2: Gia đình và người thân",
      words: 20,
      difficulty: "Dễ",
      progress: 80,
      completed: false,
      description: "Từ vựng về các mối quan hệ gia đình và người thân",
      vocabulary: [
        {
          japanese: "家族",
          furigana: "かぞく",
          kanji: "家族",
          meaning: "Gia đình",
          example: "私の家族は4人です。",
          exampleMeaning: "Gia đình tôi có 4 người.",
          audio: "/audio/kazoku.mp3",
        },
        {
          japanese: "父",
          furigana: "ちち",
          kanji: "父",
          meaning: "Cha",
          example: "父は会社員です。",
          exampleMeaning: "Cha tôi là nhân viên công ty.",
          audio: "/audio/chichi.mp3",
        },
        {
          japanese: "母",
          furigana: "はは",
          kanji: "母",
          meaning: "Mẹ",
          example: "母は料理が上手です。",
          exampleMeaning: "Mẹ tôi nấu ăn giỏi.",
          audio: "/audio/haha.mp3",
        },
        {
          japanese: "兄",
          furigana: "あに",
          kanji: "兄",
          meaning: "Anh trai",
          example: "兄は大学生です。",
          exampleMeaning: "Anh trai tôi là sinh viên.",
          audio: "/audio/ani.mp3",
        },
        {
          japanese: "姉",
          furigana: "あね",
          kanji: "姉",
          meaning: "Chị gái",
          example: "姉は看護師です。",
          exampleMeaning: "Chị gái tôi là y tá.",
          audio: "/audio/ane.mp3",
        },
      ],
    },
    {
      id: 3,
      title: "Bài 3: Thực phẩm và đồ uống",
      words: 25,
      difficulty: "Trung bình",
      progress: 60,
      completed: false,
      description: "Học tên các loại thực phẩm và đồ uống phổ biến",
      vocabulary: [
        {
          japanese: "りんご",
          furigana: "りんご",
          kanji: "",
          meaning: "Quả táo",
          example: "赤いりんごが好きです。",
          exampleMeaning: "Tôi thích táo đỏ.",
          audio: "/audio/ringo.mp3",
        },
        {
          japanese: "みかん",
          furigana: "みかん",
          kanji: "",
          meaning: "Quả cam",
          example: "みかんを食べます。",
          exampleMeaning: "Tôi ăn cam.",
          audio: "/audio/mikan.mp3",
        },
        {
          japanese: "バナナ",
          furigana: "バナナ",
          kanji: "",
          meaning: "Quả chuối",
          example: "バナナは甘いです。",
          exampleMeaning: "Chuối ngọt.",
          audio: "/audio/banana.mp3",
        },
        {
          japanese: "水",
          furigana: "みず",
          kanji: "水",
          meaning: "Nước",
          example: "水を飲んでください。",
          exampleMeaning: "Hãy uống nước.",
          audio: "/audio/mizu.mp3",
        },
        {
          japanese: "お茶",
          furigana: "おちゃ",
          kanji: "茶",
          meaning: "Trà",
          example: "お茶を飲みます。",
          exampleMeaning: "Tôi uống trà.",
          audio: "/audio/ocha.mp3",
        },
      ],
    },
    {
      id: 4,
      title: "Bài 4: Thời gian và ngày tháng",
      words: 18,
      difficulty: "Trung bình",
      progress: 0,
      completed: false,
      description: "Từ vựng về thời gian, ngày tháng và các đơn vị thời gian",
      vocabulary: [
        {
          japanese: "今日",
          furigana: "きょう",
          kanji: "今日",
          meaning: "Hôm nay",
          example: "今日はいい天気です。",
          exampleMeaning: "Hôm nay thời tiết tốt.",
          audio: "/audio/kyou.mp3",
        },
        {
          japanese: "明日",
          furigana: "あした",
          kanji: "明日",
          meaning: "Ngày mai",
          example: "明日は学校があります。",
          exampleMeaning: "Ngày mai có trường.",
          audio: "/audio/ashita.mp3",
        },
        {
          japanese: "昨日",
          furigana: "きのう",
          kanji: "昨日",
          meaning: "Hôm qua",
          example: "昨日は雨でした。",
          exampleMeaning: "Hôm qua trời mưa.",
          audio: "/audio/kinou.mp3",
        },
        {
          japanese: "朝",
          furigana: "あさ",
          kanji: "朝",
          meaning: "Buổi sáng",
          example: "朝ご飯を食べます。",
          exampleMeaning: "Tôi ăn sáng.",
          audio: "/audio/asa.mp3",
        },
        {
          japanese: "夜",
          furigana: "よる",
          kanji: "夜",
          meaning: "Buổi tối",
          example: "夜は暗いです。",
          exampleMeaning: "Buổi tối tối.",
          audio: "/audio/yoru.mp3",
        },
      ],
    },
    {
      id: 5,
      title: "Bài 5: Đồ vật trong nhà",
      words: 22,
      difficulty: "Trung bình",
      progress: 0,
      completed: false,
      description: "Học tên các đồ vật thường thấy trong nhà",
      vocabulary: [
        {
          japanese: "テーブル",
          furigana: "テーブル",
          kanji: "",
          meaning: "Cái bàn",
          example: "テーブルに本があります。",
          exampleMeaning: "Có sách trên bàn.",
          audio: "/audio/table.mp3",
        },
        {
          japanese: "いす",
          furigana: "いす",
          kanji: "",
          meaning: "Cái ghế",
          example: "いすに座ってください。",
          exampleMeaning: "Hãy ngồi trên ghế.",
          audio: "/audio/isu.mp3",
        },
        {
          japanese: "ベッド",
          furigana: "ベッド",
          kanji: "",
          meaning: "Cái giường",
          example: "ベッドで寝ます。",
          exampleMeaning: "Tôi ngủ trên giường.",
          audio: "/audio/bed.mp3",
        },
        {
          japanese: "ドア",
          furigana: "ドア",
          kanji: "",
          meaning: "Cửa",
          example: "ドアを開けてください。",
          exampleMeaning: "Hãy mở cửa.",
          audio: "/audio/door.mp3",
        },
        {
          japanese: "窓",
          furigana: "まど",
          kanji: "窓",
          meaning: "Cửa sổ",
          example: "窓から見えます。",
          exampleMeaning: "Có thể nhìn thấy từ cửa sổ.",
          audio: "/audio/mado.mp3",
        },
      ],
    },
    {
      id: 6,
      title: "Bài 6: Nghề nghiệp và công việc",
      words: 30,
      difficulty: "Khó",
      progress: 0,
      completed: false,
      description: "Từ vựng về các loại nghề nghiệp và công việc",
      vocabulary: [
        {
          japanese: "先生",
          furigana: "せんせい",
          kanji: "先生",
          meaning: "Giáo viên",
          example: "先生は親切です。",
          exampleMeaning: "Giáo viên rất thân thiện.",
          audio: "/audio/sensei.mp3",
        },
        {
          japanese: "医者",
          furigana: "いしゃ",
          kanji: "医者",
          meaning: "Bác sĩ",
          example: "医者になりたいです。",
          exampleMeaning: "Tôi muốn trở thành bác sĩ.",
          audio: "/audio/isha.mp3",
        },
        {
          japanese: "会社員",
          furigana: "かいしゃいん",
          kanji: "会社員",
          meaning: "Nhân viên công ty",
          example: "会社員として働いています。",
          exampleMeaning: "Tôi làm việc như nhân viên công ty.",
          audio: "/audio/kaishain.mp3",
        },
        {
          japanese: "学生",
          furigana: "がくせい",
          kanji: "学生",
          meaning: "Sinh viên",
          example: "私は学生です。",
          exampleMeaning: "Tôi là sinh viên.",
          audio: "/audio/gakusei.mp3",
        },
        {
          japanese: "料理人",
          furigana: "りょうりにん",
          kanji: "料理人",
          meaning: "Đầu bếp",
          example: "料理人が作りました。",
          exampleMeaning: "Đầu bếp đã làm.",
          audio: "/audio/ryourinin.mp3",
        },
      ],
    },
  ];

  const currentLesson = lessons.find((lesson) => lesson.id === lessonId);
  const currentWord = currentLesson?.vocabulary[currentWordIndex];

  if (!currentLesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-red-800 mb-4">
            Không tìm thấy bài học
          </h1>
          <Link
            href="/study/language/japanese/vocabulary"
            className="text-red-600 hover:text-red-800"
          >
            Quay lại danh sách bài học
          </Link>
        </div>
      </div>
    );
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Dễ":
        return "text-green-600 bg-green-100";
      case "Trung bình":
        return "text-yellow-600 bg-yellow-100";
      case "Khó":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const playAudio = (audioSrc: string) => {
    const audio = new Audio(audioSrc);
    audio.play();
  };

  return (
    <LanguageLayout
      showBackButton={true}
      backButtonHref="/study/language/japanese"
      backButtonText="Quay lại"
    >
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-pink-50 to-rose-100">
        {/* Header */}

        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Progress and Actions */}
          <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center space-x-4">
              <div>
                <h1 className="text-2xl font-bold text-red-800">
                  {currentLesson.title}
                </h1>
                <p className="text-red-600">{currentLesson.description}</p>
              </div>
            </div>

            <div className="flex space-x-3">
              <Link
                href={`/study/language/japanese/vocabulary/${lessonId}/flashcard`}
                className="px-6 py-3 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors flex items-center space-x-2 font-medium"
              >
                <RotateCcw className="w-5 h-5" />
                <span>Flashcard</span>
              </Link>
            </div>
          </div>

          {/* Progress Bar */}
          {currentLesson.progress > 0 && (
            <div className="mb-8">
              <div className="flex items-center justify-between text-sm text-red-600 mb-2">
                <span>Tiến độ bài học</span>
                <span>{currentLesson.progress}%</span>
              </div>
              <div className="w-full bg-red-200 rounded-full h-3">
                <div
                  className="bg-red-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${currentLesson.progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Vocabulary List - Responsive Card View */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-xl font-bold text-red-800 mb-6">
              Danh sách từ vựng
            </h2>
            <div className="grid gap-4 md:hidden">
              {/* Mobile View - Cards */}
              {currentLesson.vocabulary.map((word, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                    index === currentWordIndex
                      ? "bg-red-50 border-red-300 shadow-md"
                      : "bg-gray-50 border-gray-200 hover:bg-red-50/30"
                  }`}
                  onClick={() => setCurrentWordIndex(index)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="text-lg font-bold text-red-800">
                        {word.japanese}
                      </div>
                      {word.kanji && word.kanji !== word.japanese && (
                        <div className="text-xs text-red-500">{word.kanji}</div>
                      )}
                      <div className="text-sm text-red-500">
                        {word.furigana}
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        playAudio(word.audio);
                      }}
                      className="p-1 text-red-400 hover:text-red-600 transition-colors"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-base font-medium text-red-600 mb-2">
                    {word.meaning}
                  </div>

                  <div className="text-sm text-red-700 mb-1">
                    {word.example}
                  </div>
                  <div className="text-xs text-red-500 italic">
                    {word.exampleMeaning}
                  </div>
                </div>
              ))}
            </div>

            <div className="hidden md:block overflow-x-auto">
              {/* Desktop View - Table */}
              <table className="w-full">
                <thead>
                  <tr className="border-b border-red-200">
                    <th className="text-left py-3 px-2 text-sm font-semibold text-red-700 w-16">
                      #
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-red-700">
                      Từ vựng
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-red-700">
                      Phiên âm
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-red-700">
                      Nghĩa
                    </th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-red-700">
                      Ví dụ
                    </th>
                    <th className="text-center py-3 px-2 text-sm font-semibold text-red-700 w-16">
                      Âm
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentLesson.vocabulary.map((word, index) => (
                    <tr
                      key={index}
                      className={`border-b border-red-100 transition-colors duration-200 cursor-pointer ${
                        index === currentWordIndex
                          ? "bg-red-50"
                          : "hover:bg-red-50/50"
                      }`}
                      onClick={() => setCurrentWordIndex(index)}
                    >
                      <td className="py-3 px-2 text-sm text-red-600 font-medium">
                        {index + 1}
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-lg font-bold text-red-800">
                          {word.japanese}
                        </div>
                        {word.kanji && word.kanji !== word.japanese && (
                          <div className="text-xs text-red-500 mt-1">
                            {word.kanji}
                          </div>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm text-red-500">
                          {word.furigana}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-base font-medium text-red-600">
                          {word.meaning}
                        </div>
                      </td>
                      <td className="py-3 px-4 max-w-xs">
                        <div className="text-sm text-red-700">
                          {word.example}
                        </div>
                        <div className="text-xs text-red-500 italic mt-1">
                          {word.exampleMeaning}
                        </div>
                      </td>
                      <td className="py-3 px-2 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            playAudio(word.audio);
                          }}
                          className="p-1 text-red-400 hover:text-red-600 transition-colors"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </LanguageLayout>
  );
}
