"use client";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
// Icons as SVG components
const StickyNote = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);

const Folder = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
    />
  </svg>
);

const BookOpen = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    />
  </svg>
);

const Layers = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <polygon
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      points="12,2 2,7 12,12 22,7 12,2"
    />
    <polyline
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      points="2,17 12,22 22,17"
    />
    <polyline
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      points="2,12 12,17 22,12"
    />
  </svg>
);

const FileText = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    />
  </svg>
);

const Plus = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <line
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x1="12"
      y1="5"
      x2="12"
      y2="19"
    />
    <line
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x1="5"
      y1="12"
      x2="19"
      y2="12"
    />
  </svg>
);

const Camera = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
    />
    <circle
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      cx="12"
      cy="13"
      r="3"
    />
  </svg>
);

const Edit = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    />
  </svg>
);

const Trash2 = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <polyline
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      points="3,6 5,6 21,6"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m19,6v14a2,2 0 0,1-2,2H7a2,2 0 0,1-2-2V6m3,0V4a2,2 0 0,1,2-2h4a2,2 0 0,1,2,2v2"
    />
    <line
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x1="10"
      y1="11"
      x2="10"
      y2="17"
    />
    <line
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x1="14"
      y1="11"
      x2="14"
      y2="17"
    />
  </svg>
);

const X = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <line
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x1="18"
      y1="6"
      x2="6"
      y2="18"
    />
    <line
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x1="6"
      y1="6"
      x2="18"
      y2="18"
    />
  </svg>
);

const Save = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a.997.997 0 01-1.414 0l-7-7A1.997 1.997 0 013 12V7a4 4 0 014-4z"
    />
  </svg>
);

const FolderPlus = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
    />
    <line
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x1="12"
      y1="10"
      x2="12"
      y2="16"
    />
    <line
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x1="9"
      y1="13"
      x2="15"
      y2="13"
    />
  </svg>
);

const Search = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <circle
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      cx="11"
      cy="11"
      r="8"
    />
    <line
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x1="21"
      y1="21"
      x2="16.65"
      y2="16.65"
    />
  </svg>
);

const Calendar = ({ className = "w-4 h-4" }) => (
  <svg
    className={className}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <rect
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x="3"
      y="4"
      width="18"
      height="18"
      rx="2"
      ry="2"
    />
    <line
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x1="16"
      y1="2"
      x2="16"
      y2="6"
    />
    <line
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x1="8"
      y1="2"
      x2="8"
      y2="6"
    />
    <line
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      x1="3"
      y1="10"
      x2="21"
      y2="10"
    />
  </svg>
);

const initialNotesTree = [
  {
    id: "folder-1",
    label: "Tài chính",
    children: [
      {
        id: "1",
        title: "Báo cáo chi tiêu tháng 8",
        content: `### Bảng tổng hợp chi tiêu\n\n| Hạng mục   | Số tiền     |\n|------------|-------------|\n| Ăn uống    | 3.000.000đ  |\n| Giải trí   | 1.200.000đ  |\n| Di chuyển  | 800.000đ    |\n\n- Tiết kiệm: 2.000.000đ\n- Đầu tư: 1.000.000đ`,
        createdAt: "2025-08-10T09:00:00Z",
      },
      {
        id: "2",
        title: "Kế hoạch tiết kiệm",
        content: `1. Đặt mục tiêu tiết kiệm 20% thu nhập mỗi tháng\n2. Chia khoản tiết kiệm thành các mục tiêu nhỏ\n3. Theo dõi tiến độ hàng tuần`,
        createdAt: "2025-08-12T10:00:00Z",
      },
    ],
  },
  {
    id: "folder-2",
    label: "Cá nhân",
    children: [
      {
        id: "3",
        title: "Danh sách việc cần làm",
        content: `- Đọc sách mỗi ngày\n- Tập thể dục 30 phút\n- Viết nhật ký`,
        createdAt: "2025-08-15T14:30:00Z",
      },
      {
        id: "4",
        title: "Ghi chú meeting",
        content: `#### Buổi họp ngày 20/8\n- Thảo luận về dự án mới\n- Phân công nhiệm vụ\n- Thống nhất deadline`,
        createdAt: "2025-08-20T18:45:00Z",
      },
    ],
  },
];

import { useEffect } from "react";

export default function NotesPage() {
  const coverImages = [
    "/peaceful-pink-sunset-landscape.png",
    "/soft-pink-abstract-pattern-for-personal-planning.png",
    "/lighthouse-guiding-ships-motivation.png",
    "/mountain-peak-sunrise-motivation-success.png",
    "/eagle-soaring-high-mountains-freedom.png",
  ];

  // Use deterministic initial state for SSR
  const [coverImage, setCoverImage] = useState(coverImages[0]);
  const [notesTree, setNotesTree] = useState(initialNotesTree);
  const [selectedNote, setSelectedNote] = useState<any>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  type EditingNote = {
    id?: string;
    title: string;
    content: string;
    folderId: string;
  };
  const [editingNote, setEditingNote] = useState<EditingNote>({
    id: undefined,
    title: "",
    content: "",
    folderId: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [showAddFolderModal, setShowAddFolderModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  // Hydration fix: move all random/date logic to useEffect or event handlers
  useEffect(() => {
    // On mount, pick a random cover image (client only)
    setCoverImage(coverImages[Math.floor(Math.random() * coverImages.length)]);
  }, []);

  // Stats
  const totalFolders = notesTree.length;
  const totalNotes = notesTree.reduce((sum, f) => sum + f.children.length, 0);

  // Flat notes with search
  const allNotes = notesTree
    .flatMap((folder) =>
      folder.children.map((note) => ({
        ...note,
        folder: folder.label,
        folderId: folder.id,
      }))
    )
    .filter(
      (note) =>
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.folder.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const changeCoverImage = () => {
    // Only runs on client
    const idx = Math.floor(Math.random() * coverImages.length);
    setCoverImage(coverImages[idx]);
  };

  const deleteNote = (noteId: string) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa ghi chú này?")) {
      setNotesTree((prev) =>
        prev.map((folder) => ({
          ...folder,
          children: folder.children.filter((note) => note.id !== noteId),
        }))
      );
      if (selectedNote?.id === noteId) {
        setSelectedNote(null);
      }
    }
  };

  const editNote = (note: any) => {
    setEditingNote({
      id: note.id,
      title: note.title,
      content: note.content,
      folderId: note.folderId,
    });
    setIsEditMode(true);
  };

  const saveNote = () => {
    if (editingNote.id) {
      // Update existing note
      setNotesTree((prev) =>
        prev.map((folder) => ({
          ...folder,
          children: folder.children.map((note) =>
            note.id === editingNote.id
              ? {
                  ...note,
                  title: editingNote.title,
                  content: editingNote.content,
                }
              : note
          ),
        }))
      );
    } else {
      // Add new note (generate id and createdAt on client only)
      const newNote = {
        id: `${Date.now()}-${Math.floor(Math.random() * 100000)}`,
        title: editingNote.title,
        content: editingNote.content,
        createdAt: new Date().toISOString(),
      };
      setNotesTree((prev) =>
        prev.map((folder) =>
          folder.id === editingNote.folderId
            ? { ...folder, children: [...folder.children, newNote] }
            : folder
        )
      );
    }
    setIsEditMode(false);
    setShowAddModal(false);
    setEditingNote({ id: undefined, title: "", content: "", folderId: "" });
  };

  const addNewNote = (folderId: string) => {
    setEditingNote({ id: undefined, title: "", content: "", folderId });
    setIsEditMode(true);
    setShowAddModal(true);
  };

  const addNewFolder = () => {
    if (newFolderName.trim()) {
      // Generate id on client only
      const newFolder = {
        id: `folder-${Date.now()}-${Math.floor(Math.random() * 100000)}`,
        label: newFolderName,
        children: [],
      };
      setNotesTree((prev) => [...prev, newFolder]);
      setNewFolderName("");
      setShowAddFolderModal(false);
    }
  };

  const viewNoteDetail = (note: any) => {
    setSelectedNote(note);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-pink-50">
      {/* Cover Image Section */}
      <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden">
        <img
          src={coverImage || "/placeholder.svg"}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40" />
        <button
          className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white rounded-full p-2 shadow-lg transition-all"
          onClick={changeCoverImage}
          title="Đổi ảnh bìa"
        >
          <Camera className="w-5 h-5" />
        </button>
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <div className="container mx-auto">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl border border-white/30">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">
                  Ghi chú cá nhân
                </h1>
                <p className="text-white/90 text-lg drop-shadow">
                  Lưu trữ, tổ chức và quản lý ghi chú thông minh
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Tìm kiếm ghi chú..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => setShowAddFolderModal(true)}
              className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <FolderPlus className="w-4 h-4" />
              <span className="hidden sm:inline">Thêm thư mục</span>
            </button>
            <button
              onClick={() => addNewNote(notesTree[0]?.id)}
              className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Thêm ghi chú</span>
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-white to-pink-50 border border-pink-100 shadow-lg rounded-lg p-6 text-center">
            <Folder className="w-8 h-8 text-pink-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-800 mb-1">
              {totalFolders}
            </div>
            <div className="text-sm text-gray-600">Thư mục</div>
          </div>
          <div className="bg-gradient-to-br from-white to-blue-50 border border-blue-100 shadow-lg rounded-lg p-6 text-center">
            <StickyNote className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-800 mb-1">
              {totalNotes}
            </div>
            <div className="text-sm text-gray-600">Ghi chú</div>
          </div>
          <div className="bg-gradient-to-br from-white to-green-50 border border-green-100 shadow-lg rounded-lg p-6 text-center">
            <Calendar className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-800 mb-1">
              {notesTree[0]?.children.length || 0}
            </div>
            <div className="text-sm text-gray-600">Tài chính</div>
          </div>
          <div className="bg-gradient-to-br from-white to-purple-50 border border-purple-100 shadow-lg rounded-lg p-6 text-center">
            <FileText className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <div className="text-3xl font-bold text-gray-800 mb-1">
              {notesTree[1]?.children.length || 0}
            </div>
            <div className="text-sm text-gray-600">Cá nhân</div>
          </div>
        </div>

        {/* Folders and Notes */}
        <div className="space-y-8">
          {notesTree.map((folder) => (
            <div key={folder.id} className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg">
                    <Folder className="w-5 h-5 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    {folder.label}
                  </h2>
                  <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                    {folder.children.length} ghi chú
                  </span>
                </div>
                <button
                  onClick={() => addNewNote(folder.id)}
                  className="flex items-center gap-1 text-pink-600 hover:text-pink-700 text-sm font-medium px-3 py-1 hover:bg-pink-50 rounded-lg transition-all"
                >
                  <Plus className="w-4 h-4" />
                  Thêm ghi chú
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {folder.children
                  .filter(
                    (note) =>
                      note.title
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase()) ||
                      note.content
                        .toLowerCase()
                        .includes(searchTerm.toLowerCase())
                  )
                  .map((note) => (
                    <div
                      key={note.id}
                      className="bg-white border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group rounded-lg overflow-hidden"
                    >
                      <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <StickyNote className="w-5 h-5 text-pink-400" />
                            <h3 className="text-lg font-bold text-gray-900 truncate">
                              {note.title}
                            </h3>
                          </div>
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() =>
                                editNote({ ...note, folderId: folder.id })
                              }
                              className="p-1 text-blue-500 hover:bg-blue-50 rounded transition-all"
                              title="Chỉnh sửa"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteNote(note.id)}
                              className="p-1 text-red-500 hover:bg-red-50 rounded transition-all"
                              title="Xóa"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="px-6 py-4 flex flex-col">
                        <div className="text-xs text-pink-500 mb-3 font-semibold uppercase tracking-wide flex items-center gap-1">
                          <Layers className="w-3 h-3" />
                          {folder.label}
                        </div>
                        <div className="text-gray-700 text-sm mb-4 min-h-[80px] line-clamp-4">
                          <ReactMarkdown>
                            {note.content.length > 150
                              ? note.content.slice(0, 150) + "..."
                              : note.content}
                          </ReactMarkdown>
                        </div>
                        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                          <span className="text-xs text-gray-400 flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(note.createdAt).toLocaleDateString(
                              "vi-VN"
                            )}
                          </span>
                          <button
                            onClick={() =>
                              viewNoteDetail({ ...note, folder: folder.label })
                            }
                            className="flex items-center gap-1 text-pink-600 hover:text-pink-700 text-xs font-medium px-2 py-1 hover:bg-pink-50 rounded transition-all"
                          >
                            <FileText className="w-3 h-3" />
                            Xem chi tiết
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {allNotes.length === 0 && searchTerm && (
          <div className="text-center py-16">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">
              Không tìm thấy kết quả
            </h3>
            <p className="text-gray-500">Thử tìm kiếm với từ khóa khác</p>
          </div>
        )}
      </div>

      {/* Edit/Add Note Modal */}
      {(isEditMode || showAddModal) && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-pink-50 to-purple-50">
              <h3 className="text-xl font-bold text-gray-800">
                {editingNote.id ? "Chỉnh sửa ghi chú" : "Thêm ghi chú mới"}
              </h3>
              <button
                onClick={() => {
                  setIsEditMode(false);
                  setShowAddModal(false);
                  setEditingNote({ title: "", content: "", folderId: "" });
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tiêu đề
                </label>
                <input
                  type="text"
                  value={editingNote.title}
                  onChange={(e) =>
                    setEditingNote({ ...editingNote, title: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="Nhập tiêu đề ghi chú..."
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Thư mục
                </label>
                <select
                  value={editingNote.folderId}
                  onChange={(e) =>
                    setEditingNote({ ...editingNote, folderId: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  {notesTree.map((folder) => (
                    <option key={folder.id} value={folder.id}>
                      {folder.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nội dung
                </label>
                <textarea
                  value={editingNote.content}
                  onChange={(e) =>
                    setEditingNote({ ...editingNote, content: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent h-48"
                  placeholder="Nhập nội dung ghi chú..."
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => {
                  setIsEditMode(false);
                  setShowAddModal(false);
                  setEditingNote({ title: "", content: "", folderId: "" });
                }}
                className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
              >
                Hủy
              </button>
              <button
                onClick={saveNote}
                disabled={
                  !editingNote.title.trim() || !editingNote.content.trim()
                }
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                {editingNote.id ? "Cập nhật" : "Thêm mới"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Folder Modal */}
      {showAddFolderModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-bold text-gray-800">
                Thêm thư mục mới
              </h3>
              <button
                onClick={() => {
                  setShowAddFolderModal(false);
                  setNewFolderName("");
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6">
              <input
                type="text"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Nhập tên thư mục..."
                onKeyPress={(e) => e.key === "Enter" && addNewFolder()}
              />
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => {
                  setShowAddFolderModal(false);
                  setNewFolderName("");
                }}
                className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-all"
              >
                Hủy
              </button>
              <button
                onClick={addNewFolder}
                disabled={!newFolderName.trim()}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50"
              >
                <FolderPlus className="w-4 h-4" />
                Thêm thư mục
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Note Detail Modal */}
      {selectedNote && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-pink-50 to-purple-50">
              <div className="flex items-center gap-3">
                <StickyNote className="w-6 h-6 text-pink-500" />
                <h3 className="text-xl font-bold text-gray-800">
                  {selectedNote.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedNote(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 max-h-96 overflow-y-auto">
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Layers className="w-4 h-4" />
                <span>{selectedNote.folder}</span>
                <span>•</span>
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(selectedNote.createdAt).toLocaleDateString("vi-VN")}
                </span>
              </div>
              <div className="text-gray-800 leading-relaxed">
                <ReactMarkdown>{selectedNote.content}</ReactMarkdown>
              </div>
            </div>
            <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
              <button
                onClick={() => {
                  editNote({
                    ...selectedNote,
                    folderId: selectedNote.folderId,
                  });
                  setSelectedNote(null);
                }}
                className="flex items-center gap-2 px-6 py-2 text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-all"
              >
                <Edit className="w-4 h-4" />
                Chỉnh sửa
              </button>
              <button
                onClick={() => setSelectedNote(null)}
                className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg hover:shadow-lg transition-all"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
