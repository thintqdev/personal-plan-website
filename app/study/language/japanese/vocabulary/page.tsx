"use client";

import Link from "next/link";
import { useState } from "react";
import {
  BookOpen,
  Star,
  CheckCircle,
  Clock,
  RotateCcw,
  Flame,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import LanguageLayout from "../../layout";

export default function JapaneseVocabularyPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const topics = [
    {
      id: 1,
      title: "Chào hỏi",
      words: 15,
      difficulty: "Dễ",
      progress: 100,
      completed: true,
      description: "Các từ vựng cơ bản để chào hỏi trong tiếng Nhật",
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
      title: "Gia đình",
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
      title: "Thực phẩm",
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
      title: "Thời gian",
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
      title: "Đồ vật trong nhà",
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
      title: "Nghề nghiệp",
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

  // Calculate pagination
  const totalPages = Math.ceil(topics.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTopics = topics.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <LanguageLayout
      showBackButton={true}
      backButtonHref="/study/language/japanese"
      backButtonText="Quay lại"
    >
      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xl font-bold text-red-800">127</div>
              <div className="text-xs text-red-600">Từ đã học</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xl font-bold text-red-800">1</div>
              <div className="text-xs text-red-600">Bài hoàn thành</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-700 rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xl font-bold text-red-800">85%</div>
              <div className="text-xs text-red-600">Độ chính xác</div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-800 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-xl font-bold text-red-800">24</div>
              <div className="text-xs text-red-600">Giờ học</div>
            </div>
          </div>
        </div>
      </div>

      {/* Topics List */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <h2 className="text-xl font-bold text-red-800 mb-6">
          Danh sách chủ đề
        </h2>
        <div className="space-y-4">
          {currentTopics.map((topic) => (
            <div
              key={topic.id}
              className="p-4 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50/30 transition-all duration-200 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      topic.completed
                        ? "bg-red-600"
                        : topic.progress > 0
                        ? "bg-red-400"
                        : "bg-red-500"
                    }`}
                  >
                    {topic.completed ? (
                      <CheckCircle className="w-6 h-6 text-white" />
                    ) : (
                      <span className="text-white font-bold text-sm">
                        {topic.id}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-red-800">
                      {topic.title}
                    </h3>
                    <p className="text-sm text-red-600">{topic.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    <BookOpen className="w-4 h-4 text-red-400" />
                    <span className="text-sm text-red-600">
                      {topic.words} từ
                    </span>
                  </div>
                  <div
                    className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      topic.difficulty === "Dễ"
                        ? "text-green-700 bg-green-100"
                        : topic.difficulty === "Trung bình"
                        ? "text-yellow-700 bg-yellow-100"
                        : "text-red-700 bg-red-100"
                    }`}
                  >
                    {topic.difficulty}
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between text-sm text-red-600 mb-2">
                  <span>Tiến độ</span>
                  <span>{topic.progress}%</span>
                </div>
                <div className="w-full bg-red-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      topic.completed ? "bg-red-600" : "bg-red-500"
                    }`}
                    style={{ width: `${topic.progress}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/study/language/japanese/vocabulary/${topic.id}`}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    topic.completed
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-red-500 text-white hover:bg-red-600"
                  }`}
                >
                  {topic.completed ? "Ôn tập" : "Học"}
                </Link>

                <Link
                  href={`/study/language/japanese/vocabulary/${topic.id}/flashcard`}
                  className="px-4 py-2 bg-red-700 text-white rounded-lg hover:bg-red-800 transition-colors flex items-center text-sm font-medium"
                >
                  <RotateCcw className="w-4 h-4 mr-1" />
                  Flashcard
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-8">
          <div className="text-sm text-red-600">
            Hiển thị {startIndex + 1}-{Math.min(endIndex, topics.length)} của{" "}
            {topics.length} chủ đề
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-red-700 bg-white border border-red-300 rounded-lg hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Trước
            </button>

            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      page === currentPage
                        ? "bg-red-500 text-white"
                        : "text-red-700 bg-white border border-red-300 hover:bg-red-50"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-red-700 bg-white border border-red-300 rounded-lg hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Sau
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </LanguageLayout>
  );
}
