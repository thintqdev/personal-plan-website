"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, XCircle, BookOpen, Brain, Target } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

interface Vocabulary {
  word: string;
  meaning: string;
  reading: string;
}

interface Grammar {
  [key: string]: string[];
}

interface StudyData {
  questions: Question[];
  grammar: Grammar;
  vocabulary: {
    N5: Vocabulary[];
    N4: Vocabulary[];
    N3: Vocabulary[];
    N2: Vocabulary[];
    N1: Vocabulary[];
  };
}

export default function DailyStudyPage() {
  const [studyData, setStudyData] = useState<StudyData | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentView, setCurrentView] = useState<
    "questions" | "grammar" | "vocabulary"
  >("questions");

  // Mock data - trong thực tế sẽ fetch từ API hoặc localStorage
  useEffect(() => {
    // Giả lập data từ admin
    const mockData: StudyData = {
      questions: [
        {
          question: "学校は何時から始まりますか？",
          options: ["8時", "9時", "10時", "7時"],
          correctIndex: 1,
          explanation: "学校は通常9時から始まります。",
        },
        {
          question: "この本は誰のですか？",
          options: ["私", "あなた", "彼", "彼女"],
          correctIndex: 0,
          explanation:
            "「この本は誰のですか？」は「この本は誰のものですか？」という意味です。",
        },
      ],
      grammar: {
        N5: ["は (wa) - topic marker", "が (ga) - subject marker"],
        N4: ["ても - even if"],
        N3: [],
        N2: [],
        N1: [],
      },
      vocabulary: {
        N5: [
          { word: "学校", meaning: "trường học", reading: "がっこう" },
          { word: "学生", meaning: "sinh viên", reading: "がくせい" },
        ],
        N4: [{ word: "大学", meaning: "đại học", reading: "だいがく" }],
        N3: [],
        N2: [],
        N1: [],
      },
    };

    setStudyData(mockData);
    setAnswers(new Array(mockData.questions.length).fill(null));
  }, []);

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answerIndex);
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answerIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < (studyData?.questions.length || 0) - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(answers[currentQuestionIndex + 1]);
      setShowExplanation(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleShowExplanation = () => {
    setShowExplanation(true);
  };

  const calculateScore = () => {
    if (!studyData) return 0;
    const correct = answers.filter(
      (answer, index) => answer === studyData.questions[index].correctIndex
    ).length;
    return Math.round((correct / studyData.questions.length) * 100);
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "N5":
        return "bg-green-100 text-green-800";
      case "N4":
        return "bg-blue-100 text-blue-800";
      case "N3":
        return "bg-yellow-100 text-yellow-800";
      case "N2":
        return "bg-orange-100 text-orange-800";
      case "N1":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!studyData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Đang tải nội dung học tập...
          </h2>
          <p className="text-gray-600">Vui lòng chờ trong giây lát</p>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    const score = calculateScore();
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-6">
        <div className="max-w-2xl mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>
              <CardTitle className="text-2xl">Hoàn thành bài học!</CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {score}%
                </div>
                <Progress value={score} className="w-full" />
              </div>
              <p className="text-gray-600">
                Bạn đã trả lời đúng{" "}
                {
                  answers.filter(
                    (answer, index) =>
                      answer === studyData.questions[index].correctIndex
                  ).length
                }{" "}
                trên {studyData.questions.length} câu hỏi.
              </p>
              <div className="flex gap-4 justify-center">
                <Button onClick={() => window.location.reload()}>
                  Làm lại
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setCurrentView("grammar")}
                >
                  Ôn tập ngữ pháp
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQuestion = studyData.questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Học JLPT Hàng Ngày
              </h1>
              <p className="text-gray-600 mt-1">
                Nâng cao kỹ năng tiếng Nhật của bạn
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-500">Tiến độ</p>
                <p className="text-2xl font-bold text-blue-500">
                  {currentQuestionIndex + 1}/{studyData.questions.length}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">日</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-4 mb-8">
          <Button
            variant={currentView === "questions" ? "default" : "outline"}
            onClick={() => setCurrentView("questions")}
          >
            <Target className="w-4 h-4 mr-2" />
            Câu hỏi
          </Button>
          <Button
            variant={currentView === "grammar" ? "default" : "outline"}
            onClick={() => setCurrentView("grammar")}
          >
            <Brain className="w-4 h-4 mr-2" />
            Ngữ pháp
          </Button>
          <Button
            variant={currentView === "vocabulary" ? "default" : "outline"}
            onClick={() => setCurrentView("vocabulary")}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Từ vựng
          </Button>
        </div>

        {currentView === "questions" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="w-5 h-5" />
                Câu hỏi {currentQuestionIndex + 1}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-xl font-semibold text-center p-6 bg-blue-50 rounded-lg">
                {currentQuestion.question}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={selectedAnswer !== null}
                    className={`p-4 text-left border-2 rounded-lg transition-all ${
                      selectedAnswer === null
                        ? "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                        : selectedAnswer === index
                        ? index === currentQuestion.correctIndex
                          ? "border-green-500 bg-green-50"
                          : "border-red-500 bg-red-50"
                        : index === currentQuestion.correctIndex
                        ? "border-green-500 bg-green-50"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-lg">
                        {String.fromCharCode(65 + index)}.
                      </span>
                      <span>{option}</span>
                      {selectedAnswer !== null &&
                        index === currentQuestion.correctIndex && (
                          <CheckCircle className="w-5 h-5 text-green-600 ml-auto" />
                        )}
                      {selectedAnswer !== null &&
                        selectedAnswer === index &&
                        index !== currentQuestion.correctIndex && (
                          <XCircle className="w-5 h-5 text-red-600 ml-auto" />
                        )}
                    </div>
                  </button>
                ))}
              </div>

              {selectedAnswer !== null && !showExplanation && (
                <div className="text-center">
                  <Button onClick={handleShowExplanation}>
                    Xem giải thích
                  </Button>
                </div>
              )}

              {showExplanation && (
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-blue-800">
                    <strong>Giải thích:</strong> {currentQuestion.explanation}
                  </p>
                </div>
              )}

              {selectedAnswer !== null && (
                <div className="text-center">
                  <Button onClick={handleNext} size="lg">
                    {currentQuestionIndex < studyData.questions.length - 1
                      ? "Câu tiếp theo"
                      : "Hoàn thành"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {currentView === "grammar" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="w-5 h-5" />
                  Ngữ pháp theo level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {Object.entries(studyData.grammar).map(
                    ([level, grammars]) => (
                      <div key={level} className="border rounded-lg p-4">
                        <Badge className={getLevelColor(level)}>{level}</Badge>
                        <ul className="mt-2 space-y-1">
                          {grammars.map((grammar, idx) => (
                            <li key={idx} className="text-sm">
                              • {grammar}
                            </li>
                          ))}
                          {grammars.length === 0 && (
                            <li className="text-sm text-gray-500">
                              Không có ngữ pháp
                            </li>
                          )}
                        </ul>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {currentView === "vocabulary" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Từ vựng theo level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.entries(studyData.vocabulary).map(
                    ([level, words]) => (
                      <div key={level}>
                        <Badge className={`${getLevelColor(level)} mb-3`}>
                          {level}
                        </Badge>
                        {words.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                            {words.map((word, idx) => (
                              <div
                                key={idx}
                                className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                              >
                                <p className="font-semibold text-xl text-center mb-2">
                                  {word.word}
                                </p>
                                <p className="text-sm text-gray-600 text-center mb-1">
                                  {word.reading}
                                </p>
                                <p className="text-sm text-blue-600 text-center">
                                  {word.meaning}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">
                            Không có từ vựng
                          </p>
                        )}
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
