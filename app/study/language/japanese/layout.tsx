"use client";

import { useState, useEffect } from "react";
import { X, Plus, Save, Edit, Eye } from "lucide-react";

export default function JapaneseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [tooltipData, setTooltipData] = useState<{
    text: string;
    position: { x: number; y: number };
    existingWord?: any;
  } | null>(null);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);
  const [isQuickAddModalOpen, setIsQuickAddModalOpen] = useState(false);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedWord, setSelectedWord] = useState<any>(null);
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

  // useEffect để lắng nghe sự kiện selection
  useEffect(() => {
    let selectionTimeout: NodeJS.Timeout;
    let isClickingInsideTooltip = false;

    const handleMouseUp = () => {
      // Clear timeout cũ
      if (selectionTimeout) {
        clearTimeout(selectionTimeout);
      }

      // Debounce 300ms để đảm bảo selection đã hoàn thành
      selectionTimeout = setTimeout(() => {
        handleTextSelection();
      }, 300);
    };

    const handleMouseDown = (e: MouseEvent) => {
      // Kiểm tra xem có đang click bên trong tooltip không
      isClickingInsideTooltip = !!(e.target as Element).closest(
        ".vocabulary-tooltip"
      );

      // Ẩn tooltip khi bắt đầu bôi đen text mới và không đang click trong tooltip
      if (
        !window.getSelection()?.toString().trim() &&
        !isClickingInsideTooltip
      ) {
        setIsTooltipVisible(false);
        setTooltipData(null);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      // Chỉ ẩn tooltip khi click bên ngoài và không phải đang bôi đen
      if (
        !isClickingInsideTooltip &&
        !window.getSelection()?.toString().trim()
      ) {
        setIsTooltipVisible(false);
        setTooltipData(null);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Đóng tooltip khi nhấn Escape
      if (e.key === "Escape" && isTooltipVisible) {
        setIsTooltipVisible(false);
        setTooltipData(null);
      }
    };

    // Lắng nghe mouseup thay vì selectionchange
    document.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
      if (selectionTimeout) {
        clearTimeout(selectionTimeout);
      }
    };
  }, [vocabularyList, isTooltipVisible]);

  // Hàm kiểm tra xem text có phải là tiếng Nhật không
  const isJapaneseText = (text: string) => {
    const japaneseRegex =
      /[\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf\u3400-\u4dbf]/;
    return japaneseRegex.test(text.trim());
  };

  // Hàm tìm từ vựng trong danh sách
  const findVocabularyWord = (text: string) => {
    return vocabularyList.find(
      (word) => word.japanese === text.trim() || word.furigana === text.trim()
    );
  };

  // Hàm xử lý khi người dùng bôi đen text
  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const selectedText = selection.toString().trim();

    // Kiểm tra điều kiện để hiển thị tooltip
    if (
      !selectedText ||
      selectedText.length < 1 ||
      selectedText.length > 20 ||
      !isJapaneseText(selectedText)
    ) {
      return; // Không ẩn tooltip, chỉ return
    }

    // Kiểm tra xem có phải là single word không (không có khoảng trắng)
    if (selectedText.includes(" ")) {
      return; // Không ẩn tooltip, chỉ return
    }

    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();

    // Kiểm tra xem selection có visible không
    if (rect.width === 0 || rect.height === 0) {
      return; // Không ẩn tooltip, chỉ return
    }

    const existingWord = findVocabularyWord(selectedText);

    setTooltipData({
      text: selectedText,
      position: {
        x: rect.left + rect.width / 2,
        y: rect.top - 10,
      },
      existingWord,
    });
    setIsTooltipVisible(true);
  };

  // Hàm mở modal thêm từ nhanh từ tooltip
  const handleOpenQuickAddModal = (japanese: string) => {
    // Điền sẵn thông tin cơ bản
    setNewWord({
      japanese,
      furigana: japanese, // Tạm thời dùng japanese làm furigana
      meanings: [{ meaning: "", example: "", exampleMeaning: "" }],
      category: "general",
      level: "N5",
    });
    setIsQuickAddModalOpen(true);
    setIsTooltipVisible(false);
    setTooltipData(null);
  };

  // Hàm thêm từ từ modal nhanh
  const handleQuickAddFromModal = () => {
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
      setIsQuickAddModalOpen(false);
      setNewWord({
        japanese: "",
        furigana: "",
        meanings: [{ meaning: "", example: "", exampleMeaning: "" }],
        category: "general",
        level: "N5",
      });
    }
  };

  const validateLevel = (level: string) => {
    const validLevels = ["N5", "N4", "N3", "N2", "N1"];
    return validLevels.includes(level);
  };

  const getCategoryColor = (category: string) => {
    const cat = categories.find((c) => c.value === category);
    return cat
      ? `bg-${cat.color}-100 text-${cat.color}-700`
      : "bg-gray-100 text-gray-700";
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

  // Hàm xem chi tiết từ vựng
  const handleViewWordDetail = (word: any) => {
    setSelectedWord(word);
    setIsDetailModalOpen(true);
    setIsTooltipVisible(false);
    setTooltipData(null);
  };

  const formatLevelDisplay = (level: string) => {
    return `${level}`;
  };

  return (
    <>
      {children}

      {/* Vocabulary Tooltip */}
      {isTooltipVisible && tooltipData && (
        <VocabularyTooltip
          data={tooltipData}
          onAddWord={handleOpenQuickAddModal}
          onViewDetail={handleViewWordDetail}
          onClose={() => {
            setIsTooltipVisible(false);
            setTooltipData(null);
          }}
        />
      )}

      {/* Quick Add Modal */}
      {isQuickAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Thêm từ vựng mới
                </h2>
                <button
                  onClick={() => {
                    setIsQuickAddModalOpen(false);
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
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
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
              <div className="mb-6">
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
                                  updateMeaning(
                                    index,
                                    "example",
                                    e.target.value
                                  )
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

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  onClick={() => {
                    setIsQuickAddModalOpen(false);
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
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleQuickAddFromModal}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Thêm từ</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {isDetailModalOpen && selectedWord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Chi tiết từ vựng
                </h2>
                <button
                  onClick={() => {
                    setIsDetailModalOpen(false);
                    setSelectedWord(null);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Word Header */}
              <div className="mb-6">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-3xl font-bold text-gray-900">
                    {selectedWord.japanese}
                  </h3>
                  <span className="text-lg text-gray-500">
                    ({selectedWord.furigana})
                  </span>
                  {selectedWord.mastered && (
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                      Đã thành thạo
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(
                      selectedWord.category
                    )}`}
                  >
                    {
                      categories.find((c) => c.value === selectedWord.category)
                        ?.label
                    }
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(
                      selectedWord.level
                    )}`}
                  >
                    {selectedWord.level}
                  </span>
                  <span className="text-xs text-gray-500">
                    Thêm: {selectedWord.dateAdded}
                  </span>
                </div>
              </div>

              {/* Meanings */}
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-3">
                  Nghĩa
                </h4>
                <div className="space-y-4">
                  {selectedWord.meanings.map((meaning: any, index: number) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <span className="flex-shrink-0 w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-medium">
                          {index + 1}
                        </span>
                        <div className="flex-1">
                          <p className="text-gray-900 font-medium mb-2">
                            {meaning.meaning}
                          </p>
                          {meaning.example && (
                            <div className="mb-2">
                              <p className="text-sm text-gray-600 italic">
                                Ví dụ: {meaning.example}
                              </p>
                            </div>
                          )}
                          {meaning.exampleMeaning && (
                            <p className="text-sm text-gray-600 italic">
                              Nghĩa: {meaning.exampleMeaning}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  onClick={() => {
                    setIsDetailModalOpen(false);
                    setSelectedWord(null);
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Đóng
                </button>
                <button
                  onClick={() => {
                    // Có thể thêm logic để edit từ này
                    setIsDetailModalOpen(false);
                    setSelectedWord(null);
                  }}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center space-x-2"
                >
                  <Edit className="w-4 h-4" />
                  <span>Chỉnh sửa</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Component Vocabulary Tooltip
const VocabularyTooltip = ({
  data,
  onAddWord,
  onViewDetail,
  onClose,
}: {
  data: {
    text: string;
    position: { x: number; y: number };
    existingWord?: any;
  };
  onAddWord: (japanese: string) => void;
  onViewDetail: (word: any) => void;
  onClose: () => void;
}) => {
  // Tính toán vị trí tooltip để tránh overflow
  const getTooltipPosition = () => {
    const tooltipWidth = 320; // min-w-80 = 320px
    const tooltipHeight = 200; // Ước tính chiều cao
    const margin = 10;

    let x = data.position.x;
    let y = data.position.y;

    // Tránh overflow bên phải
    if (x + tooltipWidth / 2 > window.innerWidth - margin) {
      x = window.innerWidth - margin - tooltipWidth / 2;
    }

    // Tránh overflow bên trái
    if (x - tooltipWidth / 2 < margin) {
      x = margin + tooltipWidth / 2;
    }

    // Tránh overflow phía trên
    if (y - tooltipHeight < margin) {
      y = data.position.y + 20; // Hiển thị bên dưới thay vì bên trên
    }

    return { x, y };
  };

  const position = getTooltipPosition();

  return (
    <div
      className="vocabulary-tooltip fixed z-50 bg-white rounded-lg shadow-lg border border-gray-200 p-4 min-w-80 max-w-sm"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform:
          position.y > data.position.y
            ? "translate(-50%, 0)"
            : "translate(-50%, -100%)",
        marginTop: position.y > data.position.y ? "8px" : "-8px",
      }}
    >
      {/* Arrow */}
      <div
        className={`absolute w-0 h-0 border-l-4 border-r-4 border-transparent ${
          position.y > data.position.y
            ? "top-0 border-b-4 border-b-white"
            : "bottom-0 border-t-4 border-t-white"
        }`}
        style={{
          left: "50%",
          transform: "translateX(-50%)",
          marginTop: position.y > data.position.y ? "-4px" : "0",
          marginBottom: position.y > data.position.y ? "0" : "-4px",
        }}
      ></div>

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
      >
        <X className="w-4 h-4" />
      </button>

      {/* Content */}
      <div className="space-y-3 pr-6">
        {/* Selected Text */}
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900 mb-1">
            {data.text}
          </div>
          {data.existingWord ? (
            <div className="text-sm text-green-600 font-medium">
              ✓ Đã có trong từ điển
            </div>
          ) : (
            <div className="text-sm text-orange-600 font-medium">
              ➕ Chưa có trong từ điển
            </div>
          )}
        </div>

        {/* Existing Word Info */}
        {data.existingWord && (
          <div className="bg-gray-50 rounded p-3">
            <div className="text-sm font-medium text-gray-900 mb-1">Nghĩa:</div>
            <div className="text-sm text-gray-700">
              {data.existingWord.meanings[0].meaning}
            </div>
            {data.existingWord.meanings.length > 1 && (
              <div className="text-xs text-purple-600 mt-1">
                +{data.existingWord.meanings.length - 1} nghĩa khác
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex space-x-2">
          {!data.existingWord && (
            <button
              onClick={() => {
                onAddWord(data.text);
                onClose();
              }}
              className="flex-1 px-3 py-2 bg-purple-500 text-white text-sm rounded hover:bg-purple-600 transition-colors"
            >
              Thêm từ mới
            </button>
          )}
          {data.existingWord && (
            <button
              onClick={() => {
                onViewDetail(data.existingWord);
                onClose();
              }}
              className="flex-1 px-3 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
            >
              Xem chi tiết
            </button>
          )}
          <button
            onClick={onClose}
            className="px-3 py-2 text-gray-600 text-sm hover:text-gray-800 transition-colors"
          >
            Đóng
          </button>
        </div>

        <div className="text-xs text-gray-500 text-center">
          Nhấn Escape để đóng
        </div>
      </div>
    </div>
  );
};
