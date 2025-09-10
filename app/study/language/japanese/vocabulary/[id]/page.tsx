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
          meaning: "Xin chào (ban ngày)",
          example: "こんにちは、田中さん。",
          exampleMeaning: "Xin chào, anh Tanaka.",
          audio: "/audio/konnichiwa.mp3",
        },
        {
          japanese: "こんばんは",
          furigana: "こんばんは",
          meaning: "Xin chào (tối)",
          example: "こんばんは、おやすみなさい。",
          exampleMeaning: "Xin chào, chúc ngủ ngon.",
          audio: "/audio/konbanwa.mp3",
        },
        {
          japanese: "おはよう",
          furigana: "おはよう",
          meaning: "Chào buổi sáng",
          example: "おはようございます。",
          exampleMeaning: "Chào buổi sáng.",
          audio: "/audio/ohayou.mp3",
        },
        {
          japanese: "さようなら",
          furigana: "さようなら",
          meaning: "Tạm biệt",
          example: "さようなら、また明日。",
          exampleMeaning: "Tạm biệt, hẹn gặp lại ngày mai.",
          audio: "/audio/sayounara.mp3",
        },
        {
          japanese: "ありがとう",
          furigana: "ありがとう",
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
          meaning: "Gia đình",
          example: "私の家族は4人です。",
          exampleMeaning: "Gia đình tôi có 4 người.",
          audio: "/audio/kazoku.mp3",
        },
        {
          japanese: "父",
          furigana: "ちち",
          meaning: "Cha",
          example: "父は会社員です。",
          exampleMeaning: "Cha tôi là nhân viên công ty.",
          audio: "/audio/chichi.mp3",
        },
        {
          japanese: "母",
          furigana: "はは",
          meaning: "Mẹ",
          example: "母は料理が上手です。",
          exampleMeaning: "Mẹ tôi nấu ăn giỏi.",
          audio: "/audio/haha.mp3",
        },
        {
          japanese: "兄",
          furigana: "あに",
          meaning: "Anh trai",
          example: "兄は大学生です。",
          exampleMeaning: "Anh trai tôi là sinh viên.",
          audio: "/audio/ani.mp3",
        },
        {
          japanese: "姉",
          furigana: "あね",
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
          meaning: "Quả táo",
          example: "赤いりんごが好きです。",
          exampleMeaning: "Tôi thích táo đỏ.",
          audio: "/audio/ringo.mp3",
        },
        {
          japanese: "みかん",
          furigana: "みかん",
          meaning: "Quả cam",
          example: "みかんを食べます。",
          exampleMeaning: "Tôi ăn cam.",
          audio: "/audio/mikan.mp3",
        },
        {
          japanese: "バナナ",
          furigana: "バナナ",
          meaning: "Quả chuối",
          example: "バナナは甘いです。",
          exampleMeaning: "Chuối ngọt.",
          audio: "/audio/banana.mp3",
        },
        {
          japanese: "水",
          furigana: "みず",
          meaning: "Nước",
          example: "水を飲んでください。",
          exampleMeaning: "Hãy uống nước.",
          audio: "/audio/mizu.mp3",
        },
        {
          japanese: "お茶",
          furigana: "おちゃ",
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
          meaning: "Hôm nay",
          example: "今日はいい天気です。",
          exampleMeaning: "Hôm nay thời tiết tốt.",
          audio: "/audio/kyou.mp3",
        },
        {
          japanese: "明日",
          furigana: "あした",
          meaning: "Ngày mai",
          example: "明日は学校があります。",
          exampleMeaning: "Ngày mai có trường.",
          audio: "/audio/ashita.mp3",
        },
        {
          japanese: "昨日",
          furigana: "きのう",
          meaning: "Hôm qua",
          example: "昨日は雨でした。",
          exampleMeaning: "Hôm qua trời mưa.",
          audio: "/audio/kinou.mp3",
        },
        {
          japanese: "朝",
          furigana: "あさ",
          meaning: "Buổi sáng",
          example: "朝ご飯を食べます。",
          exampleMeaning: "Tôi ăn sáng.",
          audio: "/audio/asa.mp3",
        },
        {
          japanese: "夜",
          furigana: "よる",
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
          meaning: "Cái bàn",
          example: "テーブルに本があります。",
          exampleMeaning: "Có sách trên bàn.",
          audio: "/audio/table.mp3",
        },
        {
          japanese: "いす",
          furigana: "いす",
          meaning: "Cái ghế",
          example: "いすに座ってください。",
          exampleMeaning: "Hãy ngồi trên ghế.",
          audio: "/audio/isu.mp3",
        },
        {
          japanese: "ベッド",
          furigana: "ベッド",
          meaning: "Cái giường",
          example: "ベッドで寝ます。",
          exampleMeaning: "Tôi ngủ trên giường.",
          audio: "/audio/bed.mp3",
        },
        {
          japanese: "ドア",
          furigana: "ドア",
          meaning: "Cửa",
          example: "ドアを開けてください。",
          exampleMeaning: "Hãy mở cửa.",
          audio: "/audio/door.mp3",
        },
        {
          japanese: "窓",
          furigana: "まど",
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
          meaning: "Giáo viên",
          example: "先生は親切です。",
          exampleMeaning: "Giáo viên rất thân thiện.",
          audio: "/audio/sensei.mp3",
        },
        {
          japanese: "医者",
          furigana: "いしゃ",
          meaning: "Bác sĩ",
          example: "医者になりたいです。",
          exampleMeaning: "Tôi muốn trở thành bác sĩ.",
          audio: "/audio/isha.mp3",
        },
        {
          japanese: "会社員",
          furigana: "かいしゃいん",
          meaning: "Nhân viên công ty",
          example: "会社員として働いています。",
          exampleMeaning: "Tôi làm việc như nhân viên công ty.",
          audio: "/audio/kaishain.mp3",
        },
        {
          japanese: "学生",
          furigana: "がくせい",
          meaning: "Sinh viên",
          example: "私は学生です。",
          exampleMeaning: "Tôi là sinh viên.",
          audio: "/audio/gakusei.mp3",
        },
        {
          japanese: "料理人",
          furigana: "りょうりにん",
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                href="/study/language/japanese/vocabulary"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Quay lại</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">Từ vựng</div>
                <div className="text-lg font-semibold text-blue-600">
                  {currentLesson.vocabulary.length} từ
                </div>
              </div>
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Progress and Actions */}
        <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {currentLesson.title}
              </h1>
              <p className="text-gray-600">{currentLesson.description}</p>
            </div>
          </div>

          <div className="flex space-x-3">
            <Link
              href={`/study/language/japanese/vocabulary/${lessonId}/flashcard`}
              className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors flex items-center space-x-2 font-medium"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Flashcard</span>
            </Link>
            <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2 font-medium">
              <Play className="w-5 h-5" />
              <span>Bắt đầu học</span>
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        {currentLesson.progress > 0 && (
          <div className="mb-8">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Tiến độ bài học</span>
              <span>{currentLesson.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-blue-500 h-3 rounded-full transition-all duration-300"
                style={{ width: `${currentLesson.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Vocabulary List - Simple List View */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Danh sách từ vựng
          </h2>
          <div className="space-y-4">
            {currentLesson.vocabulary.map((word, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border transition-all duration-200 cursor-pointer ${
                  index === currentWordIndex
                    ? "bg-blue-50 border-blue-300 shadow-md"
                    : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                }`}
                onClick={() => setCurrentWordIndex(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl font-bold text-gray-900">
                        {word.japanese}
                      </div>
                      <div className="text-sm text-gray-500">
                        {word.furigana}
                      </div>
                      <div className="text-lg font-semibold text-blue-600">
                        {word.meaning}
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      <strong>Ví dụ:</strong> {word.example}
                    </div>
                    <div className="mt-1 text-sm text-gray-500 italic">
                      {word.exampleMeaning}
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      playAudio(word.audio);
                    }}
                    className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
                  >
                    <Volume2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
