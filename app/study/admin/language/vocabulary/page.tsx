"use client";
import { useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Plus,
  Search,
  Brain,
  Edit,
  Trash2,
  Eye,
  X,
  Save,
} from "lucide-react";
import Pagination from "../../components/Pagination";

type VocabularyItem = {
  id: number;
  japanese: string;
  furigana: string;
  meanings: Array<{
    meaning: string;
    example: string;
    exampleMeaning: string;
  }>;
  category: string;
  level: string;
};

type CategoryItem = {
  name: string;
  displayName: string;
  count: number;
  color: string;
};

type ModalType =
  | "add"
  | "view"
  | "edit"
  | "delete"
  | "addCategory"
  | "editCategory"
  | "deleteCategory"
  | null;

export default function VocabularyAdminPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [selectedItem, setSelectedItem] = useState<VocabularyItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryItem | null>(
    null
  );
  const [formData, setFormData] = useState<Partial<VocabularyItem>>({
    japanese: "",
    furigana: "",
    meanings: [{ meaning: "", example: "", exampleMeaning: "" }],
    category: "",
    level: "N5",
  });
  const [categoryFormData, setCategoryFormData] = useState<
    Partial<CategoryItem>
  >({
    name: "",
    displayName: "",
    count: 0,
    color: "bg-gray-100 text-gray-800",
  });
  const itemsPerPage = 2;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const openModal = (
    type: ModalType,
    item?: VocabularyItem,
    category?: CategoryItem
  ) => {
    setModalType(type);
    if (item) {
      setSelectedItem(item);
      if (type === "edit") {
        setFormData(item);
      }
    } else if (category) {
      setSelectedCategory(category);
      if (type === "editCategory") {
        setCategoryFormData(category);
      }
    } else {
      setSelectedItem(null);
      setSelectedCategory(null);
      setFormData({
        japanese: "",
        furigana: "",
        meanings: [{ meaning: "", example: "", exampleMeaning: "" }],
        category: "",
        level: "N5",
      });
      setCategoryFormData({
        name: "",
        displayName: "",
        count: 0,
        color: "bg-gray-100 text-gray-800",
      });
    }
  };

  const closeModal = () => {
    setModalType(null);
    setSelectedItem(null);
    setSelectedCategory(null);
    setFormData({
      japanese: "",
      furigana: "",
      meanings: [{ meaning: "", example: "", exampleMeaning: "" }],
      category: "",
      level: "N5",
    });
    setCategoryFormData({
      name: "",
      displayName: "",
      count: 0,
      color: "bg-gray-100 text-gray-800",
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleMeaningChange = (index: number, field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      meanings: prev.meanings?.map((meaning, i) =>
        i === index ? { ...meaning, [field]: value } : meaning
      ),
    }));
  };

  const addMeaning = () => {
    setFormData((prev) => ({
      ...prev,
      meanings: [
        ...(prev.meanings || []),
        { meaning: "", example: "", exampleMeaning: "" },
      ],
    }));
  };

  const removeMeaning = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      meanings: prev.meanings?.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = () => {
    // Handle form submission here
    console.log("Submitting:", formData);
    closeModal();
  };

  const handleDelete = () => {
    // Handle delete here
    console.log("Deleting:", selectedItem);
    closeModal();
  };

  const handleCategoryInputChange = (field: string, value: any) => {
    setCategoryFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleCategorySubmit = () => {
    // Handle category form submission here
    console.log("Submitting category:", categoryFormData);
    closeModal();
  };

  const handleCategoryDelete = () => {
    // Handle category delete here
    console.log("Deleting category:", selectedCategory);
    closeModal();
  };

  const getCategoryDisplayName = (categoryName: string) => {
    const categoryMap: { [key: string]: string } = {
      greetings: "Lời chào",
      politeness: "Lịch sự",
      places: "Địa điểm",
      family: "Gia đình",
      time: "Thời gian",
    };
    return categoryMap[categoryName] || categoryName;
  };

  const vocabularyItems = [
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
    },
    {
      id: 2,
      japanese: "ありがとう",
      furigana: "ありがとう",
      meanings: [
        {
          meaning: "Cảm ơn",
          example: "ありがとうございます。",
          exampleMeaning: "Cảm ơn rất nhiều.",
        },
      ],
      category: "politeness",
      level: "N5",
    },
    {
      id: 3,
      japanese: "すみません",
      furigana: "すみません",
      meanings: [
        {
          meaning: "Xin lỗi",
          example: "すみません、遅れました。",
          exampleMeaning: "Xin lỗi, tôi đã đến muộn.",
        },
        {
          meaning: "Cảm ơn (khi nhận đồ)",
          example: "すみません。",
          exampleMeaning: "Cảm ơn (khi nhận đồ).",
        },
      ],
      category: "politeness",
      level: "N5",
    },
    {
      id: 4,
      japanese: "学校",
      furigana: "がっこう",
      meanings: [
        {
          meaning: "Trường học",
          example: "学校に行きます。",
          exampleMeaning: "Đi học.",
        },
      ],
      category: "places",
      level: "N5",
    },
  ];

  const totalPages = Math.ceil(vocabularyItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = vocabularyItems.slice(startIndex, endIndex);

  const categories = [
    {
      name: "greetings",
      displayName: "Lời chào",
      count: 15,
      color: "bg-blue-100 text-blue-800",
    },
    {
      name: "politeness",
      displayName: "Lịch sự",
      count: 23,
      color: "bg-green-100 text-green-800",
    },
    {
      name: "places",
      displayName: "Địa điểm",
      count: 18,
      color: "bg-purple-100 text-purple-800",
    },
    {
      name: "family",
      displayName: "Gia đình",
      count: 12,
      color: "bg-orange-100 text-orange-800",
    },
    {
      name: "time",
      displayName: "Thời gian",
      count: 20,
      color: "bg-red-100 text-red-800",
    },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link
          href="/study/admin/language"
          className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Quản lý Từ vựng
          </h1>
          <p className="text-gray-600">
            Thêm, sửa, xóa và quản lý từ vựng học tập
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Tổng từ vựng</p>
              <p className="text-2xl font-bold text-gray-900">1,247</p>
            </div>
            <div className="p-3 rounded-lg bg-green-50 text-green-600">
              <Brain className="w-5 h-5" />
            </div>
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">JLPT N5</p>
              <p className="text-2xl font-bold text-gray-900">456</p>
            </div>
            <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
              <Brain className="w-5 h-5" />
            </div>
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">JLPT N4</p>
              <p className="text-2xl font-bold text-gray-900">345</p>
            </div>
            <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
              <Brain className="w-5 h-5" />
            </div>
          </div>
        </div>
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-white/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Danh mục</p>
              <p className="text-2xl font-bold text-gray-900">5</p>
            </div>
            <div className="p-3 rounded-lg bg-orange-50 text-orange-600">
              <Brain className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm từ vựng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
        <button
          onClick={() => openModal("add")}
          className="bg-green-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-green-600 transition-all duration-200 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Thêm từ vựng
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Categories */}
        <div className="lg:col-span-1">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Danh mục</h3>
              <button
                onClick={() => openModal("addCategory")}
                className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-3">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="group flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer relative"
                >
                  <div className="flex-1">
                    <span className="font-medium text-gray-900">
                      {category.displayName}
                    </span>
                    <span className="text-sm text-gray-600 ml-2">
                      ({category.count})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
                      <button
                        onClick={() => openModal("view", undefined, category)}
                        className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded transition-colors"
                        title="Xem chi tiết"
                      >
                        <Eye className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() =>
                          openModal("editCategory", undefined, category)
                        }
                        className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded transition-colors"
                        title="Chỉnh sửa"
                      >
                        <Edit className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() =>
                          openModal("deleteCategory", undefined, category)
                        }
                        className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded transition-colors"
                        title="Xóa"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                      {category.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vocabulary List */}
        <div className="lg:col-span-2">
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-sm border border-white/20 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900">
                Danh sách từ vựng
              </h3>
            </div>
            <div className="divide-y divide-gray-100">
              {currentItems.map((item) => (
                <div
                  key={item.id}
                  className="p-6 hover:bg-gray-50/50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-2">
                        <div className="text-2xl font-bold text-gray-900">
                          {item.japanese}
                        </div>
                        <div className="text-lg text-gray-600">
                          ({item.furigana})
                        </div>
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                          {item.level}
                        </span>
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <span>Ý nghĩa: {item.meanings[0]?.meaning}</span>
                        <span>
                          Danh mục: {getCategoryDisplayName(item.category)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openModal("view", item)}
                        className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openModal("edit", item)}
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => openModal("delete", item)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>

      {/* Modals */}
      {modalType === "add" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Thêm từ vựng mới
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Từ tiếng Nhật
                  </label>
                  <input
                    type="text"
                    value={formData.japanese}
                    onChange={(e) =>
                      handleInputChange("japanese", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="例: こんにちは"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Furigana
                  </label>
                  <input
                    type="text"
                    value={formData.furigana}
                    onChange={(e) =>
                      handleInputChange("furigana", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="例: こんにちは"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Danh mục
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      handleInputChange("category", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Chọn danh mục</option>
                    {categories.map((cat) => (
                      <option key={cat.name} value={cat.name}>
                        {cat.displayName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cấp độ JLPT
                  </label>
                  <select
                    value={formData.level}
                    onChange={(e) => handleInputChange("level", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="N5">N5</option>
                    <option value="N4">N4</option>
                    <option value="N3">N3</option>
                    <option value="N2">N2</option>
                    <option value="N1">N1</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Ý nghĩa và ví dụ
                  </label>
                  <button
                    onClick={addMeaning}
                    className="text-green-600 hover:text-green-800 text-sm font-medium"
                  >
                    + Thêm ý nghĩa
                  </button>
                </div>
                <div className="space-y-4">
                  {formData.meanings?.map((meaning, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-sm font-medium text-gray-700">
                          Ý nghĩa {index + 1}
                        </span>
                        {formData.meanings && formData.meanings.length > 1 && (
                          <button
                            onClick={() => removeMeaning(index)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Xóa
                          </button>
                        )}
                      </div>
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={meaning.meaning}
                          onChange={(e) =>
                            handleMeaningChange(
                              index,
                              "meaning",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Ý nghĩa"
                        />
                        <input
                          type="text"
                          value={meaning.example}
                          onChange={(e) =>
                            handleMeaningChange(
                              index,
                              "example",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Ví dụ (tiếng Nhật)"
                        />
                        <input
                          type="text"
                          value={meaning.exampleMeaning}
                          onChange={(e) =>
                            handleMeaningChange(
                              index,
                              "exampleMeaning",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Dịch ví dụ"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={closeModal}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Lưu
              </button>
            </div>
          </div>
        </div>
      )}

      {modalType === "view" && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Chi tiết từ vựng
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  {selectedItem.japanese}
                </div>
                <div className="text-xl text-gray-600">
                  ({selectedItem.furigana})
                </div>
                <div className="flex justify-center gap-2 mt-3">
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    {selectedItem.level}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm font-medium">
                    {getCategoryDisplayName(selectedItem.category)}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Ý nghĩa
                </h3>
                <div className="space-y-4">
                  {selectedItem.meanings.map((meaning, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="font-medium text-gray-900 mb-2">
                        {meaning.meaning}
                      </div>
                      <div className="text-gray-600 mb-2">
                        <strong>Ví dụ:</strong> {meaning.example}
                      </div>
                      <div className="text-gray-600">
                        <strong>Dịch:</strong> {meaning.exampleMeaning}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {modalType === "edit" && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Chỉnh sửa từ vựng
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Từ tiếng Nhật
                  </label>
                  <input
                    type="text"
                    value={formData.japanese}
                    onChange={(e) =>
                      handleInputChange("japanese", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Furigana
                  </label>
                  <input
                    type="text"
                    value={formData.furigana}
                    onChange={(e) =>
                      handleInputChange("furigana", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Danh mục
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      handleInputChange("category", e.target.value)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="">Chọn danh mục</option>
                    {categories.map((cat) => (
                      <option key={cat.name} value={cat.name}>
                        {cat.displayName}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cấp độ JLPT
                  </label>
                  <select
                    value={formData.level}
                    onChange={(e) => handleInputChange("level", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="N5">N5</option>
                    <option value="N4">N4</option>
                    <option value="N3">N3</option>
                    <option value="N2">N2</option>
                    <option value="N1">N1</option>
                  </select>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Ý nghĩa và ví dụ
                  </label>
                  <button
                    onClick={addMeaning}
                    className="text-green-600 hover:text-green-800 text-sm font-medium"
                  >
                    + Thêm ý nghĩa
                  </button>
                </div>
                <div className="space-y-4">
                  {formData.meanings?.map((meaning, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <span className="text-sm font-medium text-gray-700">
                          Ý nghĩa {index + 1}
                        </span>
                        {formData.meanings && formData.meanings.length > 1 && (
                          <button
                            onClick={() => removeMeaning(index)}
                            className="text-red-500 hover:text-red-700 text-sm"
                          >
                            Xóa
                          </button>
                        )}
                      </div>
                      <div className="space-y-3">
                        <input
                          type="text"
                          value={meaning.meaning}
                          onChange={(e) =>
                            handleMeaningChange(
                              index,
                              "meaning",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Ý nghĩa"
                        />
                        <input
                          type="text"
                          value={meaning.example}
                          onChange={(e) =>
                            handleMeaningChange(
                              index,
                              "example",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Ví dụ (tiếng Nhật)"
                        />
                        <input
                          type="text"
                          value={meaning.exampleMeaning}
                          onChange={(e) =>
                            handleMeaningChange(
                              index,
                              "exampleMeaning",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Dịch ví dụ"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={closeModal}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}

      {modalType === "delete" && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Xác nhận xóa từ vựng
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Bạn có chắc chắn muốn xóa từ vựng "{selectedItem.japanese}"
                không? Hành động này không thể hoàn tác.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Category Modals */}
      {modalType === "addCategory" && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Thêm danh mục mới
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên danh mục (English)
                </label>
                <input
                  type="text"
                  value={categoryFormData.name}
                  onChange={(e) =>
                    handleCategoryInputChange("name", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ví dụ: greetings"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên hiển thị
                </label>
                <input
                  type="text"
                  value={categoryFormData.displayName}
                  onChange={(e) =>
                    handleCategoryInputChange("displayName", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Ví dụ: Lời chào"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Màu sắc
                </label>
                <select
                  value={categoryFormData.color}
                  onChange={(e) =>
                    handleCategoryInputChange("color", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="bg-blue-100 text-blue-800">Xanh dương</option>
                  <option value="bg-green-100 text-green-800">Xanh lá</option>
                  <option value="bg-purple-100 text-purple-800">Tím</option>
                  <option value="bg-orange-100 text-orange-800">Cam</option>
                  <option value="bg-red-100 text-red-800">Đỏ</option>
                  <option value="bg-gray-100 text-gray-800">Xám</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={closeModal}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleCategorySubmit}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}

      {modalType === "view" && selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Chi tiết danh mục
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên danh mục
                </label>
                <div className="text-lg font-medium text-gray-900">
                  {selectedCategory.displayName}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên tiếng Anh
                </label>
                <div className="text-gray-600">{selectedCategory.name}</div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Số lượng từ vựng
                </label>
                <div className="text-2xl font-bold text-gray-900">
                  {selectedCategory.count}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Màu sắc
                </label>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${selectedCategory.color}`}
                >
                  {selectedCategory.displayName}
                </span>
              </div>
            </div>

            <div className="flex justify-end mt-8">
              <button
                onClick={closeModal}
                className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {modalType === "editCategory" && selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                Chỉnh sửa danh mục
              </h2>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên danh mục (English)
                </label>
                <input
                  type="text"
                  value={categoryFormData.name}
                  onChange={(e) =>
                    handleCategoryInputChange("name", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tên hiển thị
                </label>
                <input
                  type="text"
                  value={categoryFormData.displayName}
                  onChange={(e) =>
                    handleCategoryInputChange("displayName", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Màu sắc
                </label>
                <select
                  value={categoryFormData.color}
                  onChange={(e) =>
                    handleCategoryInputChange("color", e.target.value)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="bg-blue-100 text-blue-800">Xanh dương</option>
                  <option value="bg-green-100 text-green-800">Xanh lá</option>
                  <option value="bg-purple-100 text-purple-800">Tím</option>
                  <option value="bg-orange-100 text-orange-800">Cam</option>
                  <option value="bg-red-100 text-red-800">Đỏ</option>
                  <option value="bg-gray-100 text-gray-800">Xám</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                onClick={closeModal}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleCategorySubmit}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Cập nhật
              </button>
            </div>
          </div>
        </div>
      )}

      {modalType === "deleteCategory" && selectedCategory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
                <Trash2 className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Xác nhận xóa danh mục
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Bạn có chắc chắn muốn xóa danh mục "
                {selectedCategory.displayName}" không? Tất cả từ vựng trong danh
                mục này sẽ bị ảnh hưởng.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  Hủy
                </button>
                <button
                  onClick={handleCategoryDelete}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                >
                  Xóa
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
