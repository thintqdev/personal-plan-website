import Link from "next/link";
import { ArrowLeft, Book, Eye, MessageSquare, Clock, Star } from "lucide-react";

export default function JapaneseReadingPage() {
  const readingMaterials = [
    {
      id: 1,
      title: "Chào hỏi hàng ngày",
      level: "N5",
      type: "Đối thoại",
      wordCount: 45,
      readTime: "3 phút",
      difficulty: "Dễ",
      completed: true,
      description: "Đọc hiểu đoạn đối thoại về việc chào hỏi trong công việc",
    },
    {
      id: 2,
      title: "Mô tả gia đình",
      level: "N5",
      type: "Bài viết",
      wordCount: 120,
      readTime: "8 phút",
      difficulty: "Dễ",
      completed: true,
      description: "Bài viết về cách mô tả thành viên trong gia đình",
    },
    {
      id: 3,
      title: "Kế hoạch cuối tuần",
      level: "N4",
      type: "Đối thoại",
      wordCount: 85,
      readTime: "6 phút",
      difficulty: "Trung bình",
      completed: false,
      description: "Đối thoại về các hoạt động và kế hoạch cuối tuần",
    },
    {
      id: 4,
      title: "Công việc mơ ước",
      level: "N4",
      type: "Bài viết",
      wordCount: 150,
      readTime: "10 phút",
      difficulty: "Trung bình",
      completed: false,
      description: "Bài viết về nghề nghiệp và công việc mong muốn",
    },
    {
      id: 5,
      title: "Du lịch Nhật Bản",
      level: "N3",
      type: "Bài viết",
      wordCount: 200,
      readTime: "15 phút",
      difficulty: "Khó",
      completed: false,
      description: "Bài viết về các điểm du lịch nổi tiếng ở Nhật Bản",
    },
    {
      id: 6,
      title: "Công nghệ tương lai",
      level: "N3",
      type: "Bài báo",
      wordCount: 180,
      readTime: "12 phút",
      difficulty: "Khó",
      completed: false,
      description: "Bài báo về sự phát triển của công nghệ trong tương lai",
    },
  ];

  const comprehensionQuestions = [
    {
      id: 1,
      question: "Hiểu nội dung chính",
      description: "Đọc và trả lời câu hỏi về nội dung chính của bài viết",
      icon: Eye,
      color: "blue",
    },
    {
      id: 2,
      question: "Từ vựng trong ngữ cảnh",
      description: "Tìm hiểu nghĩa của từ dựa trên ngữ cảnh sử dụng",
      icon: Book,
      color: "green",
    },
    {
      id: 3,
      question: "Suy luận và kết nối",
      description: "Kết nối thông tin và suy luận ý nghĩa ẩn",
      icon: MessageSquare,
      color: "purple",
    },
  ];

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

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Đối thoại":
        return "text-blue-600 bg-blue-100";
      case "Bài viết":
        return "text-green-600 bg-green-100";
      case "Bài báo":
        return "text-purple-600 bg-purple-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
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
                  Đọc hiểu tiếng Nhật
                </h1>
                <p className="text-gray-600">
                  Cải thiện kỹ năng đọc hiểu qua các bài đọc đa dạng
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">Tiến độ tổng thể</div>
                <div className="text-lg font-semibold text-green-600">35%</div>
              </div>
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                <Book className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Reading Materials */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Bài đọc</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {readingMaterials.map((material) => (
              <div
                key={material.id}
                className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow duration-200"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {material.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-3">
                        {material.description}
                      </p>
                    </div>
                    {material.completed && (
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <Star className="w-4 h-4 text-green-600" />
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                        {material.level}
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${getTypeColor(
                          material.type
                        )}`}
                      >
                        {material.type}
                      </span>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(
                        material.difficulty
                      )}`}
                    >
                      {material.difficulty}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <Book className="w-4 h-4" />
                      <span>{material.wordCount} từ</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{material.readTime}</span>
                    </div>
                  </div>

                  <button
                    className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
                      material.completed
                        ? "bg-green-100 text-green-700 hover:bg-green-200"
                        : "bg-green-500 text-white hover:bg-green-600"
                    }`}
                  >
                    {material.completed ? "Đọc lại" : "Bắt đầu đọc"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Comprehension Practice */}
        <div className="mb-12 bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Luyện tập đọc hiểu
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {comprehensionQuestions.map((question) => {
              const IconComponent = question.icon;
              return (
                <div
                  key={question.id}
                  className={`text-center p-6 border rounded-lg hover:bg-${question.color}-50 transition-colors cursor-pointer`}
                >
                  <div
                    className={`w-12 h-12 bg-${question.color}-100 rounded-full flex items-center justify-center mx-auto mb-3`}
                  >
                    <IconComponent
                      className={`w-6 h-6 text-${question.color}-600`}
                    />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {question.question}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {question.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reading Tips */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Mẹo đọc hiểu hiệu quả
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Trước khi đọc
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Xem tiêu đề và đoán nội dung</li>
                <li>• Tìm hiểu từ vựng khó trước</li>
                <li>• Đọc lướt để nắm cấu trúc</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Trong khi đọc
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Gạch dưới thông tin quan trọng</li>
                <li>• Dự đoán nội dung tiếp theo</li>
                <li>• Chú ý cấu trúc câu phức</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Sau khi đọc</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Tóm tắt nội dung chính</li>
                <li>• Trả lời câu hỏi đọc hiểu</li>
                <li>• Ôn lại từ vựng mới</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">
                Luyện tập thường xuyên
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>• Đọc nhiều thể loại khác nhau</li>
                <li>• Ghi chép từ vựng mới</li>
                <li>• Thảo luận với người học khác</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Statistics Section */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Thống kê đọc hiểu
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Book className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">2</div>
              <div className="text-sm text-gray-600">Bài đã đọc</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Eye className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">165</div>
              <div className="text-sm text-gray-600">Từ đã học</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <MessageSquare className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">82%</div>
              <div className="text-sm text-gray-600">Độ chính xác</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">11</div>
              <div className="text-sm text-gray-600">Phút đọc/ngày</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
