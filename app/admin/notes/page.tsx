"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StickyNote, ChevronRight, PlusCircle, Trash2 } from "lucide-react";
import {
  getNotesTree,
  createNoteFolder,
  deleteNoteFolder,
  type NotesTree,
  type CreateNoteFolderRequest,
} from "@/lib/note-service";

export default function AdminNotesPage() {
  const [notesTree, setNotesTree] = useState<NotesTree[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [showAddFolder, setShowAddFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [showDeleteFolder, setShowDeleteFolder] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Flatten all notes for quick lookup
  const allNotes = notesTree.flatMap((folder) => folder.children);
  const note = allNotes.find((n) => n.id === selected);

  // Load notes tree from API
  useEffect(() => {
    const loadNotesTree = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getNotesTree();
        setNotesTree(data);
      } catch (err) {
        console.error("Failed to load notes tree:", err);
        setError("Failed to load notes. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    loadNotesTree();
  }, []);

  // Thêm folder mới
  const handleAddFolder = async () => {
    if (!newFolderName.trim()) return;

    try {
      const folderData: CreateNoteFolderRequest = {
        label: newFolderName.trim(),
        color: "#6B7280",
        icon: "folder",
      };

      const newFolder = await createNoteFolder(folderData);

      // Add to local state
      const newTreeFolder: NotesTree = {
        id: newFolder._id,
        label: newFolder.label,
        color: newFolder.color,
        icon: newFolder.icon,
        isDefault: newFolder.isDefault,
        sortOrder: newFolder.sortOrder,
        createdAt: newFolder.createdAt,
        updatedAt: newFolder.updatedAt,
        children: [],
      };

      setNotesTree([newTreeFolder, ...notesTree]);
      setShowAddFolder(false);
      setNewFolderName("");
    } catch (err) {
      console.error("Failed to create folder:", err);
      setError("Failed to create folder. Please try again.");
    }
  };

  // Xoá folder theo id
  const handleDeleteFolder = async (folderId: string) => {
    try {
      await deleteNoteFolder(folderId);

      // Remove from local state
      setNotesTree(notesTree.filter((f) => f.id !== folderId));
      setShowDeleteFolder(null);

      // Nếu đang chọn note trong folder bị xoá thì bỏ chọn
      if (
        selected &&
        notesTree
          .find((f) => f.id === folderId)
          ?.children.some((n) => n.id === selected)
      ) {
        setSelected(null);
      }
    } catch (err) {
      console.error("Failed to delete folder:", err);
      setError("Failed to delete folder. Please try again.");
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center w-full h-full min-h-[320px]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-400 mx-auto mb-4"></div>
            <div className="text-orange-400 font-medium">Loading notes...</div>
          </div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center w-full h-full min-h-[320px]">
          <div className="text-center">
            <div className="text-red-500 font-medium mb-2">{error}</div>
            <Button
              onClick={() => window.location.reload()}
              variant="outline"
              className="border-orange-200 text-orange-600 hover:bg-orange-50"
            >
              Retry
            </Button>
          </div>
        </div>
      );
    }

    if (selected && note) {
      return (
        <Card className="w-full h-full bg-white border border-orange-100 shadow-xl p-0 overflow-hidden animate-fade-in flex flex-col min-h-screen">
          <CardHeader className="bg-gradient-to-r from-orange-50 to-white px-8 py-6 border-b border-orange-100">
            <div className="flex items-center gap-3 mb-2">
              <StickyNote className="w-7 h-7 text-orange-400" />
              <CardTitle className="text-2xl font-bold text-gray-900">
                {note.title}
              </CardTitle>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span>Ngày tạo:</span>
              <span>{new Date(note.createdAt).toLocaleString("vi-VN")}</span>
            </div>
          </CardHeader>
          <CardContent className="px-8 py-8 flex-1 flex flex-col">
            <div className="prose max-w-none text-base text-gray-800 min-h-[120px]">
              <div dangerouslySetInnerHTML={{ __html: note.content }} />
            </div>
          </CardContent>
        </Card>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center w-full h-full min-h-[320px] opacity-80 select-none">
        {/* Illustration placeholder */}
        <div className="mb-6">
          <svg
            width="120"
            height="90"
            viewBox="0 0 120 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="10"
              y="20"
              width="100"
              height="60"
              rx="12"
              fill="#FFF7ED"
            />
            <rect x="25" y="35" width="70" height="10" rx="3" fill="#FED7AA" />
            <rect x="25" y="50" width="40" height="8" rx="3" fill="#FCD34D" />
            <rect x="70" y="50" width="25" height="8" rx="3" fill="#FDBA74" />
          </svg>
        </div>
        <div className="text-xl text-orange-400 font-semibold mb-2">
          Chọn một ghi chú để xem chi tiết
        </div>
        <div className="text-sm text-gray-400">
          Danh sách ghi chú ở bên trái
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex">
      {/* Sidebar Notes List */}
      <aside className="basis-1/4 min-w-[220px] max-w-[340px]flex flex-col top-0 left-0 z-10 border-r border-orange-100 bg-white/90">
        <Card className="rounded-none border-0 shadow-none flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="flex items-center gap-2">
              <StickyNote className="w-6 h-6 text-orange-400" />
              <CardTitle className="text-xl font-bold text-orange-700">
                Ghi chú
              </CardTitle>
            </div>
            <Button
              size="icon"
              variant="link"
              aria-label="Thêm folder"
              onClick={() => setShowAddFolder(true)}
            >
              <PlusCircle className="w-6 h-6 text-orange-400" />
            </Button>
          </CardHeader>
          <CardContent className="pt-0 flex-1 overflow-y-auto">
            {(() => {
              if (isLoading) {
                return (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-400"></div>
                  </div>
                );
              }

              if (error) {
                return (
                  <div className="text-center py-8 text-red-500">
                    <div className="mb-2">Failed to load</div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => window.location.reload()}
                    >
                      Retry
                    </Button>
                  </div>
                );
              }

              return (
                <nav className="flex flex-col gap-3 mt-2">
                  {notesTree.map((folder) => (
                    <div key={folder.id} className="mb-2 group/folder relative">
                      <div className="font-semibold text-orange-700 text-xs mb-1 pl-2 uppercase tracking-wide flex items-center justify-between">
                        <span>{folder.label}</span>
                        <button
                          className="ml-2 p-1 rounded hover:bg-orange-50 text-orange-300 opacity-0 group-hover/folder:opacity-100 group-focus-within/folder:opacity-100 transition"
                          title="Xoá folder"
                          onClick={() => setShowDeleteFolder(folder.id)}
                          tabIndex={-1}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex flex-col gap-1 ml-2">
                        {folder.children.map((note) => (
                          <button
                            key={`${folder.id}-note-${note.id}`}
                            className={`group text-left rounded-lg px-4 py-3 transition flex items-center gap-3 border border-transparent hover:border-orange-200 hover:bg-orange-50 focus:outline-none focus:ring-2 focus:ring-orange-200 ${
                              selected === note.id
                                ? "bg-orange-100 border-orange-300 shadow"
                                : ""
                            }`}
                            onClick={() => setSelected(note.id)}
                          >
                            <StickyNote className="w-5 h-5 text-orange-300 shrink-0" />
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-gray-900 truncate">
                                {note.title}
                              </div>
                              <div className="text-xs text-gray-400 truncate">
                                {new Date(note.createdAt).toLocaleDateString(
                                  "vi-VN"
                                )}
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-orange-200 opacity-0 group-hover:opacity-100 transition" />
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </nav>
              );
            })()}
          </CardContent>
        </Card>

        {/* Modal thêm folder */}
        {showAddFolder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-lg shadow-lg p-6 min-w-[320px] flex flex-col gap-4">
              <div className="text-lg font-semibold text-orange-700 mb-2">
                Thêm Folder mới
              </div>
              <input
                className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-200"
                placeholder="Tên folder"
                value={newFolderName}
                onChange={(e) => setNewFolderName(e.target.value)}
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAddFolder();
                }}
              />
              <div className="flex gap-2 justify-end mt-2">
                <Button
                  variant="outline"
                  onClick={() => setShowAddFolder(false)}
                >
                  Hủy
                </Button>
                <Button
                  onClick={handleAddFolder}
                  disabled={!newFolderName.trim()}
                >
                  Thêm
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Modal xác nhận xoá folder */}
        {showDeleteFolder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
            <div className="bg-white rounded-lg shadow-lg p-6 min-w-[320px] flex flex-col gap-4">
              <div className="text-lg font-semibold text-red-700 mb-2">
                Xác nhận xoá folder?
              </div>
              <div className="text-gray-600 mb-2">
                Bạn có chắc chắn muốn xoá folder này? Tất cả ghi chú bên trong
                sẽ bị xoá.
              </div>
              <div className="flex gap-2 justify-end mt-2">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteFolder(null)}
                >
                  Huỷ
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDeleteFolder(showDeleteFolder)}
                >
                  Xoá
                </Button>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Detail Area */}
      <main className="basis-3/4 flex flex-col px-0 max-w-full min-h-screen h-full">
        {renderContent()}
      </main>
    </div>
  );
}
