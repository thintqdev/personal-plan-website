"use client";
import React from "react";
import UserLayout from "@/components/layouts/UserLayout";
import { useEffect, useState } from "react";
import {
  BookOpen,
  PlusCircle,
  Smile,
  Frown,
  Meh,
  Angry,
  Zap,
  Coffee,
  MoreVertical,
  Edit2,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  fetchDairies,
  createDairy,
  updateDairy,
  deleteDairy,
} from "@/lib/dairy-service";
import { MOOD_LIST, EMOJI_SUGGESTIONS, SWIPE_CONFIG } from "@/constants";
import "./diary.css";

// Icon mapping for mood list
const iconMap = {
  Meh,
  Smile,
  Frown,
  Angry,
  Zap,
  Coffee,
  MoreVertical,
};

// Transform mood list to include React components
const moodList = MOOD_LIST.map((mood) => ({
  ...mood,
  icon: React.createElement(iconMap[mood.icon as keyof typeof iconMap], {
    className: mood.color,
  }),
}));

export default function DairyPage() {
  const [dairies, setDairies] = useState<any[]>([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", content: "", mood: 0 });
  const [editing, setEditing] = useState<any>(null);
  const [userId, setUserId] = useState<string>("");
  const [mounted, setMounted] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [flipDirection, setFlipDirection] = useState<"next" | "prev">("next");

  // Touch/swipe handling
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  useEffect(() => {
    setMounted(true);
    const id = localStorage.getItem("userId") || "60d5ecb74be2d54e5b8b5555";
    setUserId(id);
  }, []);

  useEffect(() => {
    if (mounted && userId) {
      fetchDairies(userId).then(setDairies);
    }
  }, [userId, mounted]);

  // Auto-resize textarea effect
  useEffect(() => {
    const textarea = document.querySelector(
      ".auto-resize-textarea"
    ) as HTMLTextAreaElement;
    if (textarea && form.content) {
      textarea.style.height = "auto";
      textarea.style.height = Math.min(textarea.scrollHeight, 300) + "px";
    }
  }, [form.content]);

  const handleSubmit = async () => {
    if (!form.title || !form.content || !userId) return;
    if (editing) {
      await updateDairy(editing._id, { ...form, userId });
    } else {
      await createDairy({ ...form, userId });
    }
    setOpen(false);
    setEditing(null);
    setForm({ title: "", content: "", mood: 0 });
    fetchDairies(userId).then(setDairies);
  };

  const handleEdit = (item: any) => {
    setEditing(item);
    setForm({ title: item.title, content: item.content, mood: item.mood });
    setOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!userId) return;
    if (window.confirm("Bạn chắc chắn muốn xoá nhật ký này?")) {
      await deleteDairy(id, userId);
      fetchDairies(userId).then(setDairies);
    }
  };

  const handlePageFlip = async (direction: "next" | "prev") => {
    if (isFlipping) return;

    setIsFlipping(true);
    setFlipDirection(direction);

    // Simulate page flip animation
    setTimeout(() => {
      if (direction === "next" && currentPage < dairies.length - 1) {
        setCurrentPage((prev) => prev + 1);
      } else if (direction === "prev" && currentPage > 0) {
        setCurrentPage((prev) => prev - 1);
      }

      setTimeout(() => {
        setIsFlipping(false);
      }, SWIPE_CONFIG.ANIMATION_DURATION);
    }, SWIPE_CONFIG.ANIMATION_DURATION);
  };

  // Swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > SWIPE_CONFIG.THRESHOLD;
    const isRightSwipe = distance < -SWIPE_CONFIG.THRESHOLD;

    if (isLeftSwipe && currentPage < dairies.length - 1) {
      handlePageFlip("next");
    }
    if (isRightSwipe && currentPage > 0) {
      handlePageFlip("prev");
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && currentPage > 0) {
        handlePageFlip("prev");
      } else if (e.key === "ArrowRight" && currentPage < dairies.length - 1) {
        handlePageFlip("next");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, dairies.length]);

  const addEmojiToContent = (emoji: string) => {
    setForm((f) => ({
      ...f,
      content: f.content + emoji,
    }));
  };

  if (!mounted) {
    return <div>Loading...</div>;
  }

  return (
    <UserLayout
      title="Nhật ký cá nhân"
      description="Ghi lại cảm xúc, suy nghĩ và hành trình mỗi ngày của bạn."
      icon={<BookOpen className="w-8 h-8 text-blue-600" />}
    >
      {/* Header with diary book style */}
      <div className="mb-4 md:mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 md:mb-6 gap-4">
          <div className="flex items-center gap-2 md:gap-3">
            <BookOpen className="w-6 h-6 md:w-8 md:h-8 text-amber-700" />
            <h1 className="text-xl md:text-3xl font-bold text-amber-800 font-serif">
              Nhật ký của tôi
            </h1>
          </div>
          <Button
            onClick={() => {
              setOpen(true);
              setEditing(null);
              setForm({ title: "", content: "", mood: 0 });
            }}
            className="bg-amber-600 hover:bg-amber-700 text-white font-medium w-full sm:w-auto"
          >
            <PlusCircle className="w-4 h-4 md:w-5 md:h-5 mr-2" />
            <span className="hidden sm:inline">Viết nhật ký mới</span>
            <span className="sm:hidden">Viết mới</span>
          </Button>
        </div>
      </div>

      {/* Diary book container */}
      <div className="max-w-4xl mx-auto px-2 md:px-0">
        {/* Book cover/binding */}
        <div className="relative">
          {/* Left binding holes - Hidden on mobile */}
          <div className="hidden md:block absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-amber-800 to-amber-700 rounded-l-lg">
            <div className="flex flex-col justify-center h-full space-y-6 items-center">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="w-3 h-3 bg-amber-900 rounded-full shadow-inner"
                />
              ))}
            </div>
          </div>

          {/* Main diary pages */}
          <div className="md:ml-8 bg-gradient-to-br from-yellow-50 to-amber-50 rounded-lg md:rounded-r-lg shadow-xl md:shadow-2xl border border-amber-200">
            {/* Spiral binding effect - Simplified on mobile */}
            <div className="relative">
              <div className="hidden md:block absolute -left-4 top-0 bottom-0 w-8 bg-gradient-to-r from-gray-400 to-gray-500 rounded-l-lg">
                <div className="flex flex-col justify-center h-full space-y-8 items-center">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-8 bg-gray-600 rounded-full shadow-md"
                    />
                  ))}
                </div>
              </div>

              {/* Mobile spiral binding */}
              <div className="md:hidden absolute top-0 left-0 right-0 h-4 bg-gradient-to-r from-gray-400 to-gray-500 rounded-t-lg">
                <div className="flex justify-center items-center h-full space-x-4">
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-gray-600 rounded-full shadow-sm"
                    />
                  ))}
                </div>
              </div>

              {/* Pages content */}
              <div className="pl-3 pr-4 py-4 md:pl-6 md:pr-8 md:py-8 pt-6 md:pt-8">
                {dairies.length === 0 ? (
                  <div className="text-center py-8 md:py-16">
                    <BookOpen className="w-12 h-12 md:w-16 md:h-16 text-amber-400 mx-auto mb-4" />
                    <p className="text-amber-700 text-base md:text-lg font-serif italic">
                      Chưa có trang nào được viết...
                    </p>
                    <p className="text-amber-600 text-sm mt-2">
                      Hãy bắt đầu viết nhật ký đầu tiên của bạn!
                    </p>
                  </div>
                ) : (
                  <div className="relative min-h-[400px] md:min-h-[600px] page-flip-container">
                    {/* Single page view with flip effect and swipe support */}
                    <div
                      className={`page-flip diary-page transition-all duration-600 cursor-grab active:cursor-grabbing ${
                        isFlipping
                          ? flipDirection === "next"
                            ? "animate-flip-next"
                            : "animate-flip-prev"
                          : ""
                      }`}
                      onTouchStart={onTouchStart}
                      onTouchMove={onTouchMove}
                      onTouchEnd={onTouchEnd}
                    >
                      {dairies[currentPage] &&
                        (() => {
                          const item = dairies[currentPage];
                          const mood =
                            moodList.find((m) => m.value === item.mood) ||
                            moodList[0];

                          return (
                            <div className="relative group">
                              {/* Page */}
                              <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg border border-amber-200 p-4 md:p-8 relative min-h-[350px] md:min-h-[500px]">
                                {/* Lined paper effect */}
                                <div className="absolute inset-0 opacity-10">
                                  {[...Array(12)].map((_, i) => (
                                    <div
                                      key={i}
                                      className="border-b border-blue-300 h-6 md:h-8"
                                      style={{ top: `${40 + i * 24}px` }}
                                    />
                                  ))}
                                </div>

                                {/* Page content */}
                                <div className="relative z-10">
                                  {/* Date and mood header */}
                                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 gap-3">
                                    <div className="flex items-center gap-2 md:gap-3">
                                      <div className="w-10 h-10 md:w-12 md:h-12 bg-amber-100 rounded-full flex items-center justify-center border-2 border-amber-300">
                                        {mood.icon}
                                      </div>
                                      <div>
                                        <div className="text-xs text-amber-600 font-medium">
                                          {new Date(
                                            item.createdAt
                                          ).toLocaleDateString("vi-VN", {
                                            weekday: "long",
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                          })}
                                        </div>
                                        <div className="text-xs text-amber-500">
                                          {mood.label}
                                        </div>
                                      </div>
                                    </div>

                                    {/* Action buttons */}
                                    <div className="flex gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleEdit(item)}
                                        className="text-amber-600 hover:text-amber-700 hover:bg-amber-50 p-2"
                                      >
                                        <Edit2 className="w-3 h-3 md:w-4 md:h-4" />
                                      </Button>
                                      <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => handleDelete(item._id)}
                                        className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2"
                                      >
                                        <Trash2 className="w-3 h-3 md:w-4 md:h-4" />
                                      </Button>
                                    </div>
                                  </div>

                                  {/* Title */}
                                  <h3 className="text-lg md:text-xl font-bold text-amber-900 mb-3 md:mb-4 font-serif border-b border-amber-200 pb-2">
                                    {item.title}
                                  </h3>

                                  {/* Content */}
                                  <div className="text-gray-700 whitespace-pre-line leading-6 md:leading-8 font-serif text-sm md:text-base pb-8">
                                    {item.content}
                                  </div>
                                </div>

                                {/* Page number - Always at bottom */}
                                <div className="absolute bottom-2 md:bottom-4 right-2 md:right-4 text-xs text-amber-500 font-medium bg-white/80 px-2 py-1 rounded">
                                  {currentPage + 1} / {dairies.length}
                                </div>
                              </div>

                              {/* Page shadow */}
                              <div className="absolute inset-0 bg-amber-800/10 rounded-lg transform translate-x-1 translate-y-1 -z-10" />
                            </div>
                          );
                        })()}
                    </div>

                    {/* Simple page indicator - Clean and minimal */}
                    <div className="absolute -bottom-4 left-0 right-0 flex justify-center">
                      <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-amber-200/50">
                        {/* Page number */}
                        <div className="text-sm font-medium text-amber-800 font-serif">
                          {currentPage + 1} / {dairies.length}
                        </div>

                        {/* Progress dots - max 10 dots */}
                        <div className="flex gap-1 ml-2">
                          {dairies
                            .slice(
                              0,
                              Math.min(dairies.length, SWIPE_CONFIG.MAX_DOTS)
                            )
                            .map((_, index) => (
                              <div
                                key={index}
                                className={`transition-all duration-300 cursor-pointer ${
                                  index === currentPage
                                    ? "w-3 h-3 bg-amber-600 rounded-full shadow-lg"
                                    : index < currentPage
                                    ? "w-2 h-2 bg-amber-400 rounded-full"
                                    : "w-2 h-2 bg-amber-200 rounded-full hover:bg-amber-300"
                                }`}
                                onClick={() => {
                                  if (index !== currentPage) {
                                    const direction =
                                      index > currentPage ? "next" : "prev";
                                    setCurrentPage(index);
                                    setIsFlipping(true);
                                    setFlipDirection(direction);
                                    setTimeout(
                                      () => setIsFlipping(false),
                                      SWIPE_CONFIG.ANIMATION_DURATION
                                    );
                                  }
                                }}
                              />
                            ))}
                          {dairies.length > SWIPE_CONFIG.MAX_DOTS && (
                            <div className="text-xs text-amber-500 ml-1">
                              +{dairies.length - SWIPE_CONFIG.MAX_DOTS}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dialog tạo/sửa nhật ký */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-lg md:text-xl font-serif text-amber-800">
              {editing ? "Chỉnh sửa nhật ký" : "Viết nhật ký mới"}
            </DialogTitle>
            <DialogDescription className="text-sm text-amber-600 font-serif">
              {editing
                ? "Cập nhật nội dung và tâm trạng của bạn trong nhật ký này."
                : "Ghi lại những suy nghĩ và cảm xúc của bạn ngày hôm nay."}
            </DialogDescription>
          </DialogHeader>

          {/* Dialog styled like a diary page */}
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-4 md:p-6 rounded-lg border border-amber-200 relative">
            {/* Lined paper effect - Fewer lines on mobile */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="border-b border-blue-300 h-6 md:h-8"
                  style={{ top: `${60 + i * 24}px` }}
                />
              ))}
            </div>

            {/* Red margin line */}
            <div className="absolute left-8 md:left-12 top-0 bottom-0 w-px bg-red-300 opacity-30" />

            <div className="space-y-4 md:space-y-6 relative z-10">
              {/* Date display */}
              <div className="text-sm text-amber-600 font-medium mb-3 md:mb-4 font-serif">
                {new Date().toLocaleDateString("vi-VN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </div>

              <div className="space-y-3 md:space-y-4">
                <div>
                  <label className="block text-sm font-medium text-amber-700 mb-2 font-serif">
                    Tiêu đề:
                  </label>
                  <Input
                    placeholder="Viết tiêu đề cho ngày hôm nay..."
                    value={form.title}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, title: e.target.value }))
                    }
                    className="bg-white/80 border-amber-300 focus:border-amber-500 font-serif text-sm md:text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-700 mb-2 font-serif">
                    Tâm trạng hôm nay:
                  </label>
                  <div className="grid grid-cols-2 sm:flex gap-2 flex-wrap">
                    {moodList.map((m) => (
                      <Button
                        key={m.value}
                        type="button"
                        variant={form.mood === m.value ? "default" : "outline"}
                        onClick={() =>
                          setForm((f) => ({ ...f, mood: m.value }))
                        }
                        className={`flex items-center justify-center gap-1 md:gap-2 px-2 md:px-3 py-2 text-xs md:text-sm font-medium ${
                          form.mood === m.value
                            ? "bg-amber-600 hover:bg-amber-700 text-white"
                            : "border-amber-300 text-amber-700 hover:bg-amber-50"
                        }`}
                      >
                        <span className="text-base md:text-lg">{m.icon}</span>
                        <span className="hidden sm:inline">{m.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-amber-700 mb-2 font-serif">
                    Nội dung nhật ký:
                  </label>
                  <Textarea
                    placeholder="Hôm nay của tôi..."
                    value={form.content}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, content: e.target.value }))
                    }
                    className="auto-resize-textarea bg-white/80 border-amber-300 focus:border-amber-500 font-serif leading-6 md:leading-7 resize-none min-h-[100px] md:min-h-[120px] w-full text-sm md:text-base"
                    style={{
                      height: "auto",
                      minHeight: "100px",
                      maxHeight: "250px",
                    }}
                    onInput={(e) => {
                      const target = e.target as HTMLTextAreaElement;
                      target.style.height = "auto";
                      target.style.height =
                        Math.min(target.scrollHeight, 250) + "px";
                    }}
                  />
                </div>

                {/* Emoji Picker */}
                <div>
                  <label className="block text-sm font-medium text-amber-700 mb-2 font-serif">
                    Thêm emoji:
                  </label>
                  <div className="bg-white/80 border border-amber-300 rounded-lg p-2 md:p-3 max-h-24 md:max-h-32 overflow-y-auto">
                    <div className="grid grid-cols-6 sm:grid-cols-8 gap-1 md:gap-2">
                      {EMOJI_SUGGESTIONS.map((emoji, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => addEmojiToContent(emoji)}
                          className="emoji-button text-base md:text-lg hover:bg-amber-100 p-1 rounded transition-colors"
                          title={`Thêm ${emoji}`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="mt-4 md:mt-6">
            <Button
              onClick={handleSubmit}
              className="bg-amber-600 hover:bg-amber-700 text-white px-6 md:px-8 font-medium w-full sm:w-auto"
            >
              {editing ? "Cập nhật nhật ký" : "Lưu nhật ký"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </UserLayout>
  );
}
