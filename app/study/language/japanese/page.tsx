import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Target,
  Flame,
  FileText,
  Book,
  Headphones,
  Lightbulb,
  Plus,
  Play,
} from "lucide-react";
import LanguageLayout from "../layout";

export default function JapanesePage() {
  const learningSections = [
    {
      title: "Từ Vựng",
      description: "Học từ vựng cơ bản và nâng cao",
      icon: Book,
      href: "/study/language/japanese/vocabulary",
      color: "from-red-400 to-pink-400",
      bgColor: "bg-red-50/30",
      features: ["Từ vựng theo chủ đề", "Flashcard", "Ôn tập thông minh"],
    },
    {
      title: "Ngữ Pháp",
      description: "Nắm vững cấu trúc câu và ngữ pháp",
      icon: FileText,
      href: "/study/language/japanese/grammar",
      color: "from-pink-400 to-rose-400",
      bgColor: "bg-pink-50/30",
      features: ["Bài giảng lý thuyết", "Bài tập thực hành", "Ví dụ minh họa"],
    },
    {
      title: "Luyện Tập",
      description: "Thực hành kỹ năng nghe nói đọc viết",
      icon: Target,
      href: "/study/language/japanese/practice",
      color: "from-rose-400 to-red-400",
      bgColor: "bg-rose-50/30",
      features: ["Bài tập tương tác", "Luyện phát âm", "Đánh giá tiến độ"],
    },
    {
      title: "Đọc Hiểu",
      description: "Cải thiện kỹ năng đọc và hiểu văn bản",
      icon: BookOpen,
      href: "/study/language/japanese/reading",
      color: "from-red-400 to-pink-400",
      bgColor: "bg-red-50/30",
      features: [
        "Bài đọc đa dạng",
        "Câu hỏi trắc nghiệm",
        "Giải thích chi tiết",
      ],
    },
    {
      title: "Từ Điển",
      description: "Tra cứu và thêm từ vựng mới",
      icon: Plus,
      href: "/study/language/japanese/dictionary",
      color: "from-pink-400 to-rose-400",
      bgColor: "bg-pink-50/30",
      features: ["Tra cứu nhanh", "Thêm từ tùy chỉnh", "Lưu từ vựng"],
    },
    {
      title: "Mẹo Học",
      description: "Tips và chiến lược học hiệu quả",
      icon: Lightbulb,
      href: "/study/language/japanese/tips",
      color: "from-rose-400 to-red-400",
      bgColor: "bg-rose-50/30",
      features: ["Phương pháp học", "Mẹo ghi nhớ", "Tài liệu bổ sung"],
    },
  ];

  return (
    <LanguageLayout showBackButton={true}>
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-3xl">🇯🇵</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tiếng Nhật</h1>
              <p className="text-lg text-gray-600">Học tập toàn diện</p>
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 text-orange-500 mb-1">
              <Flame className="w-5 h-5" />
              <span className="text-sm font-medium">Streak</span>
            </div>
            <p className="text-2xl font-bold text-orange-500">8 ngày</p>
          </div>
        </div>
      </div>

      {/* Learning Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {learningSections.map((section, index) => {
          const IconComponent = section.icon;
          return (
            <Card
              key={index}
              className={`group ${section.bgColor} border border-red-100 shadow-sm hover:shadow-md transition-all duration-200 hover:-translate-y-0.5`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center gap-4 mb-3">
                  <div
                    className={`w-12 h-12 bg-gradient-to-r ${section.color} rounded-xl flex items-center justify-center shadow-sm`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold text-gray-900">
                      {section.title}
                    </CardTitle>
                    <p className="text-sm text-gray-600 mt-1">
                      {section.description}
                    </p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                {/* Features */}
                <div className="space-y-2 mb-6">
                  {section.features.map((feature, featureIndex) => (
                    <div
                      key={featureIndex}
                      className="flex items-center gap-3 text-sm"
                    >
                      <div
                        className={`w-2 h-2 bg-gradient-to-r ${section.color} rounded-full`}
                      ></div>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <Link href={section.href} className="block">
                  <Button
                    className={`w-full bg-gradient-to-r ${section.color} hover:opacity-90 text-white font-semibold py-3 px-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-200`}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Bắt Đầu Học
                  </Button>
                </Link>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Additional Info */}
      <Card className="bg-white/60 backdrop-blur-sm border border-red-100 shadow-sm mt-8">
        <CardContent className="p-6 sm:p-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <Headphones className="w-5 h-5 text-red-500" />
            <span className="text-sm font-medium text-gray-700">
              Học mọi lúc mọi nơi
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
            Phương Pháp Học Cá Nhân Hóa
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-sm">
            <div className="flex flex-col items-center p-4 bg-red-50/50 rounded-xl border border-red-100">
              <div className="w-8 h-8 bg-gradient-to-r from-red-400 to-pink-400 rounded-lg flex items-center justify-center mb-2">
                <span className="text-white text-xs">🎯</span>
              </div>
              <span className="font-medium text-gray-900">
                Lộ trình linh hoạt
              </span>
              <span className="text-gray-600 text-xs mt-1">
                Học theo tốc độ của bạn
              </span>
            </div>

            <div className="flex flex-col items-center p-4 bg-pink-50/50 rounded-xl border border-pink-100">
              <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-rose-400 rounded-lg flex items-center justify-center mb-2">
                <span className="text-white text-xs">⚡</span>
              </div>
              <span className="font-medium text-gray-900">
                Ôn tập thông minh
              </span>
              <span className="text-gray-600 text-xs mt-1">
                Spaced repetition
              </span>
            </div>

            <div className="flex flex-col items-center p-4 bg-rose-50/50 rounded-xl border border-rose-100">
              <div className="w-8 h-8 bg-gradient-to-r from-rose-400 to-red-400 rounded-lg flex items-center justify-center mb-2">
                <span className="text-white text-xs">🎮</span>
              </div>
              <span className="font-medium text-gray-900">Thú vị</span>
              <span className="text-gray-600 text-xs mt-1">
                Học qua tương tác
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </LanguageLayout>
  );
}
