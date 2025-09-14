import React from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Languages, Sparkles } from "lucide-react";
import LanguageLayout from "./layout";

export default function LanguagePage() {
  const languages = [
    {
      id: "english",
      name: "Tiếng Anh",
      flag: "🇺🇸",
      description: "Ngôn ngữ quốc tế với phương pháp học hiện đại",
      gradient: "from-blue-50 to-cyan-50",
      cardGradient: "from-blue-500 to-cyan-500",
      textColor: "text-blue-600",
      progress: 75,
      features: ["1200+ từ vựng", "Ngữ pháp đầy đủ", "Luyện nghe/speaking"],
      href: "/study/language/english",
    },
    {
      id: "japanese",
      name: "Tiếng Nhật",
      flag: "🇯🇵",
      description: "Khám phá văn hóa Nhật Bản qua ngôn ngữ",
      gradient: "from-red-50 to-pink-50",
      cardGradient: "from-red-500 to-pink-500",
      textColor: "text-red-600",
      progress: 60,
      features: ["Hiragana/Katakana", "200+ Kanji", "Hội thoại thực tế"],
      href: "/study/language/japanese",
    },
  ];

  return (
    <LanguageLayout backgroundGradient="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12 lg:mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm mb-6">
          <Languages className="w-5 h-5 text-indigo-600" />
          <span className="text-sm font-medium text-gray-700">
            Học Ngoại Ngữ
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          Chọn Ngôn Ngữ
          <span className="block text-lg sm:text-xl lg:text-2xl font-normal text-gray-600 mt-2">
            Bắt đầu hành trình học tập của bạn
          </span>
        </h1>

        <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Khám phá thế giới ngôn ngữ với phương pháp học cá nhân hóa, từ cơ bản
          đến thành thạo với trải nghiệm học tập thú vị.
        </p>
      </div>

      {/* Language Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 mb-8 sm:mb-12">
        {languages.map((language) => (
          <Card
            key={language.id}
            className={`group relative bg-gradient-to-br ${language.gradient} border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
          >
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

            <CardHeader className="relative pb-4">
              <div className="flex items-center gap-4 mb-3">
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${language.cardGradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                >
                  <span className="text-2xl">{language.flag}</span>
                </div>
                <div>
                  <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900">
                    {language.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    {language.description}
                  </p>
                </div>
              </div>

              {/* Progress */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tiến độ học tập</span>
                  <span className={`font-semibold ${language.textColor}`}>
                    {language.progress}%
                  </span>
                </div>
                <div className="w-full bg-white/60 rounded-full h-2 overflow-hidden">
                  <div
                    className={`bg-gradient-to-r ${language.cardGradient} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${language.progress}%` }}
                  ></div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="relative pt-0">
              {/* Features */}
              <div className="grid grid-cols-1 gap-2 mb-6">
                {language.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm">
                    <div
                      className={`w-2 h-2 bg-gradient-to-r ${language.cardGradient} rounded-full`}
                    ></div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Link href={language.href} className="block">
                <Button
                  className={`w-full bg-gradient-to-r ${language.cardGradient} hover:opacity-90 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105`}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  Bắt Đầu Học {language.name}
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Additional Info */}
      <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg">
        <CardContent className="p-6 sm:p-8 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <span className="text-sm font-medium text-gray-700">
              Tính năng nổi bật
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-4">
            Phương Pháp Học Hiện Đại
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 text-sm">
            <div className="flex flex-col items-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-2">
                <span className="text-white text-xs">🎯</span>
              </div>
              <span className="font-medium text-gray-900">Cá nhân hóa</span>
              <span className="text-gray-600 text-xs mt-1">
                Lộ trình theo trình độ
              </span>
            </div>

            <div className="flex flex-col items-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl">
              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-2">
                <span className="text-white text-xs">⚡</span>
              </div>
              <span className="font-medium text-gray-900">Học nhanh</span>
              <span className="text-gray-600 text-xs mt-1">
                Spaced repetition
              </span>
            </div>

            <div className="flex flex-col items-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-2">
                <span className="text-white text-xs">🎮</span>
              </div>
              <span className="font-medium text-gray-900">Thú vị</span>
              <span className="text-gray-600 text-xs mt-1">
                Game hóa học tập
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </LanguageLayout>
  );
}
