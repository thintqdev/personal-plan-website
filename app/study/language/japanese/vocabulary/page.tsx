"use client";

import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  Star,
  CheckCircle,
  Clock,
  RotateCcw,
} from "lucide-react";

export default function JapaneseVocabularyPage() {
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
          meaning: "Xin chào (ban ngày)",
          example: "こんにちは、田中さん。",
        },
        {
          japanese: "こんばんは",
          meaning: "Xin chào (tối)",
          example: "こんばんは、おやすみなさい。",
        },
        {
          japanese: "おはよう",
          meaning: "Chào buổi sáng",
          example: "おはようございます。",
        },
        {
          japanese: "さようなら",
          meaning: "Tạm biệt",
          example: "さようなら、また明日。",
        },
        {
          japanese: "ありがとう",
          meaning: "Cảm ơn",
          example: "プレゼント、ありがとうございます。",
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
          meaning: "Gia đình",
          example: "私の家族は4人です。",
        },
        {
          japanese: "父",
          meaning: "Cha",
          example: "父は会社員です。",
        },
        {
          japanese: "母",
          meaning: "Mẹ",
          example: "母は料理が上手です。",
        },
        {
          japanese: "兄",
          meaning: "Anh trai",
          example: "兄は大学生です。",
        },
        {
          japanese: "姉",
          meaning: "Chị gái",
          example: "姉は看護師です。",
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
          meaning: "Quả táo",
          example: "赤いりんごが好きです。",
        },
        {
          japanese: "みかん",
          meaning: "Quả cam",
          example: "みかんを食べます。",
        },
        {
          japanese: "バナナ",
          meaning: "Quả chuối",
          example: "バナナは甘いです。",
        },
        {
          japanese: "水",
          meaning: "Nước",
          example: "水を飲んでください。",
        },
        {
          japanese: "お茶",
          meaning: "Trà",
          example: "お茶を飲みます。",
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
          meaning: "Hôm nay",
          example: "今日はいい天気です。",
        },
        {
          japanese: "明日",
          meaning: "Ngày mai",
          example: "明日は学校があります。",
        },
        {
          japanese: "昨日",
          meaning: "Hôm qua",
          example: "昨日は雨でした。",
        },
        {
          japanese: "朝",
          meaning: "Buổi sáng",
          example: "朝ご飯を食べます。",
        },
        {
          japanese: "夜",
          meaning: "Buổi tối",
          example: "夜は暗いです。",
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
          meaning: "Cái bàn",
          example: "テーブルに本があります。",
        },
        {
          japanese: "いす",
          meaning: "Cái ghế",
          example: "いすに座ってください。",
        },
        {
          japanese: "ベッド",
          meaning: "Cái giường",
          example: "ベッドで寝ます。",
        },
        {
          japanese: "ドア",
          meaning: "Cửa",
          example: "ドアを開けてください。",
        },
        {
          japanese: "窓",
          meaning: "Cửa sổ",
          example: "窓から見えます。",
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
          meaning: "Giáo viên",
          example: "先生は親切です。",
        },
        {
          japanese: "医者",
          meaning: "Bác sĩ",
          example: "医者になりたいです。",
        },
        {
          japanese: "会社員",
          meaning: "Nhân viên công ty",
          example: "会社員として働いています。",
        },
        {
          japanese: "学生",
          meaning: "Sinh viên",
          example: "私は学生です。",
        },
        {
          japanese: "料理人",
          meaning: "Đầu bếp",
          example: "料理人が作りました。",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
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
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lessons.map((lesson) => (
            <div
              key={lesson.id}
              className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow duration-200 flex flex-col"
            >
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {lesson.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {lesson.description}
                    </p>
                  </div>
                  {lesson.completed && (
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  )}
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <BookOpen className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {lesson.words} từ
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
                    <span>Tiến độ</span>
                    <span>{lesson.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${lesson.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div className="flex space-x-2 mt-auto">
                  <Link
                    href={`/study/language/japanese/vocabulary/${lesson.id}`}
                    className={`flex-1 py-2 px-3 rounded-md text-sm font-medium text-center transition-all duration-200 shadow-sm hover:shadow-md ${
                      lesson.completed
                        ? "bg-green-500 text-white hover:bg-green-600"
                        : "bg-blue-500 text-white hover:bg-blue-600"
                    }`}
                  >
                    {lesson.completed ? "Ôn tập" : "Học"}
                  </Link>

                  <Link
                    href={`/study/language/japanese/vocabulary/${lesson.id}/flashcard`}
                    className="flex-1 py-2 px-3 bg-purple-500 text-white rounded-md hover:bg-purple-600 transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center text-sm font-medium"
                  >
                    <RotateCcw className="w-3 h-3 mr-1" />
                    <span>Flashcard</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Page Title and Progress Section */}

        <div className="mt-12 bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Thống kê học tập
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">127</div>
              <div className="text-sm text-gray-600">Từ đã học</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">1</div>
              <div className="text-sm text-gray-600">Bài hoàn thành</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">85%</div>
              <div className="text-sm text-gray-600">Độ chính xác</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">24</div>
              <div className="text-sm text-gray-600">Giờ học</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
