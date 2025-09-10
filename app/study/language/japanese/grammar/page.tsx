import Link from "next/link";
import { ArrowLeft, BookOpen, CheckCircle, ChevronRight } from "lucide-react";

export default function JapaneseGrammarPage() {
  const grammarCategories = [
    {
      id: 1,
      title: "Thời gian & Ngày tháng",
      progress: 85,
      completed: true,
      description: "Các cấu trúc liên quan đến thời gian, ngày tháng",
    },
    {
      id: 2,
      title: "Nơi chốn & Hướng",
      progress: 70,
      completed: false,
      description: "Ngữ pháp chỉ vị trí, hướng đi",
    },
    {
      id: 3,
      title: "Số lượng & Đo lường",
      progress: 60,
      completed: false,
      description: "Cách đếm và diễn đạt số lượng",
    },
    {
      id: 4,
      title: "Mối quan hệ & Thuộc về",
      progress: 45,
      completed: false,
      description: "Ngữ pháp thể hiện mối quan hệ, sở hữu",
    },
    {
      id: 5,
      title: "Hành động & Trạng thái",
      progress: 30,
      completed: false,
      description: "Các dạng động từ, tính từ",
    },
    {
      id: 6,
      title: "Tình huống & Điều kiện",
      progress: 15,
      completed: false,
      description: "Ngữ pháp cho tình huống phức tạp",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-blue-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Link
                href="/study/language/japanese"
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-900 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Quay lại</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        {/* Grammar Categories List */}
        <div className="divide-y divide-blue-200">
          {grammarCategories.map((category) => (
            <Link
              key={category.id}
              href={`/study/language/japanese/grammar/${category.id}`}
              className="block py-4 hover:bg-blue-50 transition-colors duration-150"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 flex-1">
                  <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-medium text-blue-600">
                      {category.id}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <h3 className="text-base font-semibold text-blue-900">
                        {category.title}
                      </h3>
                      {category.completed && (
                        <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-blue-600 mt-1">
                      {category.description}
                    </p>
                    <div className="mt-2">
                      <div className="flex items-center space-x-2">
                        <div className="text-xs text-blue-500">
                          Tiến độ: {category.progress}%
                        </div>
                        <div className="flex-1 bg-blue-100 rounded-full h-1 max-w-24">
                          <div
                            className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                            style={{ width: `${category.progress}%` }}
                          ></div>
                        </div>
                        <div className="text-xs text-blue-500">
                          {category.completed ? "Hoàn thành" : "Đang học"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                      category.completed
                        ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
                        : "bg-blue-900 text-white hover:bg-blue-800"
                    }`}
                  >
                    {category.completed ? "Ôn tập" : "Học"}
                  </button>
                  <ChevronRight className="w-4 h-4 text-blue-400" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Practice Section */}
        <div className="mt-8 border-t border-blue-200 pt-6">
          <h2 className="text-base font-semibold text-blue-900 mb-4">
            Luyện tập nhanh
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <button className="p-3 border border-blue-200 rounded hover:border-blue-300 hover:bg-blue-50 transition-colors text-left">
              <div className="font-medium text-blue-900 text-sm mb-1">
                Điền khuyết
              </div>
              <div className="text-xs text-blue-600">
                Luyện tập ngữ pháp cơ bản
              </div>
            </button>
            <button className="p-3 border border-blue-200 rounded hover:border-blue-300 hover:bg-blue-50 transition-colors text-left">
              <div className="font-medium text-blue-900 text-sm mb-1">
                Chọn đáp án
              </div>
              <div className="text-xs text-blue-600">Bài tập trắc nghiệm</div>
            </button>
            <button className="p-3 border border-blue-200 rounded hover:border-blue-300 hover:bg-blue-50 transition-colors text-left">
              <div className="font-medium text-blue-900 text-sm mb-1">
                Dịch câu
              </div>
              <div className="text-xs text-blue-600">Luyện tập dịch thuật</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
