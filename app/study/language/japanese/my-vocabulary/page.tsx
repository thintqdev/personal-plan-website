"use client";

import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Search,
  Edit,
  Trash2,
  Save,
  X,
  Eye,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function JapaneseAddVocabularyPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingWord, setIsAddingWord] = useState(false);
  const [editingWord, setEditingWord] = useState(null);
  const [weeklyCount, setWeeklyCount] = useState(0);

  const [newWord, setNewWord] = useState({
    japanese: "",
    furigana: "",
    meanings: [{ meaning: "", example: "", exampleMeaning: "" }],
    category: "general",
    level: "N5",
  });

  const [vocabularyList, setVocabularyList] = useState([
    {
      id: 1,
      japanese: "こんにちは",
      furigana: "こんにちは",
      meanings: [
        {
          meaning: "Xin chào (ban ngày)",
          example: "こんにちは、田中さん。",
          exampleMeaning: "Xin chào, anh Tanaka.",
        },
      ],
      category: "greetings",
      level: "N5",
      dateAdded: "2024-01-15",
      mastered: true,
    },
    {
      id: 2,
      japanese: "ありがとう",
      furigana: "ありがとう",
      meanings: [
        {
          meaning: "Cảm ơn",
          example: "プレゼント、ありがとうございます。",
          exampleMeaning: "Cảm ơn vì món quà.",
        },
      ],
      category: "greetings",
      level: "N5",
      dateAdded: "2024-01-14",
      mastered: false,
    },
    {
      id: 3,
      japanese: "すみません",
      furigana: "すみません",
      meanings: [
        {
          meaning: "Xin lỗi",
          example: "すみません、道を教えてください。",
          exampleMeaning: "Xin lỗi, chỉ đường cho tôi.",
        },
        {
          meaning: "Cảm ơn (khi nhận thứ gì đó)",
          example: "すみません、お釣り。",
          exampleMeaning: "Cảm ơn, tiền thối.",
        },
      ],
      category: "greetings",
      level: "N5",
      dateAdded: "2024-01-13",
      mastered: false,
    },
    {
      id: 4,
      japanese: "りんご",
      furigana: "りんご",
      meanings: [
        {
          meaning: "Quả táo",
          example: "赤いりんごが好きです。",
          exampleMeaning: "Tôi thích táo đỏ.",
        },
      ],
      category: "food",
      level: "N5",
      dateAdded: "2024-01-12",
      mastered: true,
    },
    {
      id: 6,
      japanese: "天気",
      furigana: "てんき",
      meanings: [
        {
          meaning: "Thời tiết",
          example: "今日はいい天気ですね。",
          exampleMeaning: "Hôm nay thời tiết tốt nhỉ.",
        },
      ],
      category: "general",
      level: "N5",
      dateAdded: "2024-01-10",
      mastered: false,
    },
    {
      id: 7,
      japanese: "学生",
      furigana: "がくせい",
      meanings: [
        {
          meaning: "Sinh viên",
          example: "私は大学学生です。",
          exampleMeaning: "Tôi là sinh viên đại học.",
        },
      ],
      category: "education",
      level: "N5",
      dateAdded: "2024-01-09",
      mastered: false,
    },
    {
      id: 9,
      japanese: "食べる",
      furigana: "たべる",
      meanings: [
        {
          meaning: "Ăn",
          example: "ご飯を食べます。",
          exampleMeaning: "Ăn cơm.",
        },
      ],
      category: "general",
      level: "N5",
      dateAdded: "2024-01-07",
      mastered: false,
    },
    {
      id: 10,
      japanese: "飲む",
      furigana: "のむ",
      meanings: [
        {
          meaning: "Uống",
          example: "お茶を飲みます。",
          exampleMeaning: "Uống trà.",
        },
      ],
      category: "general",
      level: "N5",
      dateAdded: "2024-01-06",
      mastered: false,
    },
  ]);

  const categories = [
    { value: "general", label: "Tổng quát", color: "gray" },
    { value: "greetings", label: "Chào hỏi", color: "blue" },
    { value: "food", label: "Đồ ăn", color: "green" },
    { value: "education", label: "Giáo dục", color: "purple" },
    { value: "family", label: "Gia đình", color: "pink" },
    { value: "work", label: "Công việc", color: "indigo" },
    { value: "travel", label: "Du lịch", color: "yellow" },
  ];

  const filteredVocabulary = vocabularyList.filter(
    (word) =>
      word.japanese.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.furigana.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.meanings.some((m) =>
        m.meaning.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  useEffect(() => {
    const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    const count = vocabularyList.filter(
      (w) => new Date(w.dateAdded) > oneWeekAgo
    ).length;
    setWeeklyCount(count);
  }, [vocabularyList]);

  const handleAddWord = () => {
    if (
      newWord.japanese &&
      newWord.meanings[0].meaning &&
      validateLevel(newWord.level)
    ) {
      const word = {
        id: Date.now(),
        ...newWord,
        dateAdded: new Date().toISOString().split("T")[0],
        mastered: false,
      };
      setVocabularyList([word, ...vocabularyList]);
      setNewWord({
        japanese: "",
        furigana: "",
        meanings: [{ meaning: "", example: "", exampleMeaning: "" }],
        category: "general",
        level: "N5",
      });
      setIsAddingWord(false);
    }
  };

  const handleDeleteWord = (id: number) => {
    setVocabularyList(vocabularyList.filter((word) => word.id !== id));
  };

  const handleEditWord = (word: any) => {
    setEditingWord(word.id);
    setNewWord({
      japanese: word.japanese,
      furigana: word.furigana,
      meanings: word.meanings,
      category: word.category,
      level: word.level,
    });
  };

  const handleSaveEdit = () => {
    if (
      newWord.japanese &&
      newWord.meanings[0].meaning &&
      validateLevel(newWord.level)
    ) {
      setVocabularyList(
        vocabularyList.map((word) =>
          word.id === editingWord ? { ...word, ...newWord } : word
        )
      );
      setEditingWord(null);
      setNewWord({
        japanese: "",
        furigana: "",
        meanings: [{ meaning: "", example: "", exampleMeaning: "" }],
        category: "general",
        level: "N5",
      });
    }
  };

  const getCategoryColor = (category: string) => {
    const cat = categories.find((c) => c.value === category);
    return cat
      ? `bg-${cat.color}-100 text-${cat.color}-700`
      : "bg-gray-100 text-gray-700";
  };

  const addMeaning = () => {
    setNewWord({
      ...newWord,
      meanings: [
        ...newWord.meanings,
        { meaning: "", example: "", exampleMeaning: "" },
      ],
    });
  };

  const updateMeaning = (index: number, field: string, value: string) => {
    const updatedMeanings = newWord.meanings.map((meaning, i) =>
      i === index ? { ...meaning, [field]: value } : meaning
    );
    setNewWord({ ...newWord, meanings: updatedMeanings });
  };

  const removeMeaning = (index: number) => {
    if (newWord.meanings.length > 1) {
      setNewWord({
        ...newWord,
        meanings: newWord.meanings.filter((_, i) => i !== index),
      });
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "N5":
        return "text-green-600 bg-green-100";
      case "N4":
        return "text-blue-600 bg-blue-100";
      case "N3":
        return "text-yellow-600 bg-yellow-100";
      case "N2":
        return "text-orange-600 bg-orange-100";
      case "N1":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const validateLevel = (level: string) => {
    const validLevels = ["N5", "N4", "N3", "N2", "N1"];
    return validLevels.includes(level);
  };

  const formatLevelDisplay = (level: string) => {
    return `${level}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-violet-50">
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
                  Thêm từ vựng tiếng Nhật
                </h1>
                <p className="text-gray-600">Quản lý và thêm từ vựng cá nhân</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">Tổng số từ</div>
                <div className="text-lg font-semibold text-purple-600">
                  {vocabularyList.length}
                </div>
              </div>
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
                <Plus className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Search and Add Button */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Tìm kiếm từ vựng..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          <button
            onClick={() => setIsAddingWord(!isAddingWord)}
            className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Thêm từ mới</span>
          </button>
        </div>

        {/* Add/Edit Form */}
        {(isAddingWord || editingWord) && (
          <div className="mb-6 bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {editingWord ? "Chỉnh sửa từ vựng" : "Thêm từ vựng mới"}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Từ tiếng Nhật *
                </label>
                <input
                  type="text"
                  value={newWord.japanese}
                  onChange={(e) =>
                    setNewWord({ ...newWord, japanese: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="例: こんにちは"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Furigana
                </label>
                <input
                  type="text"
                  value={newWord.furigana}
                  onChange={(e) =>
                    setNewWord({ ...newWord, furigana: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="konnichiwa"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Danh mục
                </label>
                <select
                  value={newWord.category}
                  onChange={(e) =>
                    setNewWord({ ...newWord, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Level
                </label>
                <select
                  value={newWord.level}
                  onChange={(e) =>
                    setNewWord({ ...newWord, level: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="N5">{formatLevelDisplay("N5")}</option>
                  <option value="N4">{formatLevelDisplay("N4")}</option>
                  <option value="N3">{formatLevelDisplay("N3")}</option>
                  <option value="N2">{formatLevelDisplay("N2")}</option>
                  <option value="N1">{formatLevelDisplay("N1")}</option>
                </select>
              </div>
            </div>

            {/* Meanings Section */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-medium text-gray-900">
                  Nghĩa và ví dụ
                </h4>
                <button
                  type="button"
                  onClick={addMeaning}
                  className="px-3 py-1 bg-purple-100 text-purple-600 rounded-lg hover:bg-purple-200 transition-colors text-sm flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>Thêm nghĩa</span>
                </button>
              </div>

              <div className="space-y-4">
                {newWord.meanings.map((meaning, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <div className="flex-1 space-y-3">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nghĩa tiếng Việt {index === 0 && "*"}
                          </label>
                          <input
                            type="text"
                            value={meaning.meaning}
                            onChange={(e) =>
                              updateMeaning(index, "meaning", e.target.value)
                            }
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                            placeholder="Xin chào"
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Ví dụ sử dụng
                            </label>
                            <input
                              type="text"
                              value={meaning.example}
                              onChange={(e) =>
                                updateMeaning(index, "example", e.target.value)
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="こんにちは、田中さん。"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Nghĩa của ví dụ
                            </label>
                            <input
                              type="text"
                              value={meaning.exampleMeaning}
                              onChange={(e) =>
                                updateMeaning(
                                  index,
                                  "exampleMeaning",
                                  e.target.value
                                )
                              }
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                              placeholder="Xin chào, anh Tanaka."
                            />
                          </div>
                        </div>
                      </div>
                      {newWord.meanings.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeMeaning(index)}
                          className="flex-shrink-0 p-1 text-red-400 hover:text-red-600 transition-colors"
                          title="Xóa nghĩa này"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => {
                  setIsAddingWord(false);
                  setEditingWord(null);
                  setNewWord({
                    japanese: "",
                    furigana: "",
                    meanings: [
                      { meaning: "", example: "", exampleMeaning: "" },
                    ],
                    category: "general",
                    level: "N5",
                  });
                }}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Hủy</span>
              </button>
              <button
                onClick={editingWord ? handleSaveEdit : handleAddWord}
                className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{editingWord ? "Lưu thay đổi" : "Thêm từ"}</span>
              </button>
            </div>
          </div>
        )}

        {/* Vocabulary List */}
        {searchTerm ? (
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <div className="px-6 py-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">
                Kết quả tra cứu ({filteredVocabulary.length})
              </h3>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredVocabulary.map((word) => (
                <div
                  key={word.id}
                  className="p-6 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="text-xl font-bold text-gray-900">
                          {word.japanese}
                        </h4>
                        <span className="text-sm text-gray-500">
                          ({word.furigana})
                        </span>
                        {word.mastered && (
                          <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                            Đã thành thạo
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 mb-2">
                        {word.meanings[0].meaning}
                        {word.meanings.length > 1 && (
                          <span className="text-sm text-purple-600 ml-2">
                            (+{word.meanings.length - 1} nghĩa khác)
                          </span>
                        )}
                      </p>
                      {word.meanings[0].example && (
                        <p className="text-sm text-gray-600 italic mb-3">
                          Ví dụ: {word.meanings[0].example}
                        </p>
                      )}
                      {word.meanings[0].exampleMeaning && (
                        <p className="text-sm text-gray-600 italic mb-3">
                          Nghĩa: {word.meanings[0].exampleMeaning}
                        </p>
                      )}
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                            word.category
                          )}`}
                        >
                          {
                            categories.find((c) => c.value === word.category)
                              ?.label
                          }
                        </span>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(
                            word.level
                          )}`}
                        >
                          {word.level}
                        </span>
                        <span className="text-xs text-gray-500">
                          Thêm: {word.dateAdded}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 ml-4">
                      <button
                        onClick={() => handleEditWord(word)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteWord(word.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border p-6 text-center">
            <p className="text-gray-600">Nhập từ khóa để tra cứu từ vựng</p>
          </div>
        )}

        {/* Statistics */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Thống kê từ vựng
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Plus className="w-6 h-6 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {vocabularyList.length}
              </div>
              <div className="text-sm text-gray-600">Tổng số từ</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Edit className="w-6 h-6 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {vocabularyList.filter((w) => w.mastered).length}
              </div>
              <div className="text-sm text-gray-600">Đã thành thạo</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Search className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {categories.length}
              </div>
              <div className="text-sm text-gray-600">Danh mục</div>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                <Save className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {weeklyCount}
              </div>
              <div className="text-sm text-gray-600">Thêm tuần này</div>
            </div>
          </div>
        </div>

        {/* Demo Text Section */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Demo: Bôi đen từ để xem tooltip
          </h2>
          <div className="text-gray-700 leading-relaxed">
            <p className="mb-4">
              Hãy thử bôi đen các từ tiếng Nhật sau đây để xem tooltip hoạt
              động:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg space-y-2">
              <p>こんにちは、今日はいい天気ですね。</p>
              <p>私は学生です。毎日勉強します。</p>
              <p>すみません、道を教えてください。</p>
              <p>りんごが好きです。赤いりんごを買いました。</p>
              <p>ありがとうございます。プレゼント、嬉しいです。</p>
              <p>ご飯を食べます。お茶を飲みます。</p>
              <p>天気がいいですね。勉強が好きです。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
