"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Camera,
  Plus,
  Edit2,
  Trash2,
  Image as ImageIcon,
  Check,
  X,
} from "lucide-react";
import {
  getUserCovers,
  getActiveCover,
  setActiveCover as setActiveCoverApi,
  createCover,
  updateCover,
  deleteCover,
  getCoverSuggestions,
  type Cover,
  type CoverSuggestion,
  type CreateCoverRequest,
} from "@/lib/cover-service";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";
import { ConfirmDialog } from "@/components/ConfirmDialog";

export default function CoverManager() {
  const [userCovers, setUserCovers] = useState<Cover[]>([]);
  const [activeCover, setActiveCover] = useState<Cover | null>(null);
  const [suggestions, setSuggestions] = useState<CoverSuggestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingCover, setEditingCover] = useState<Cover | null>(null);

  // Form states
  const [formData, setFormData] = useState({
    imageUrl: "",
    title: "",
    description: "",
  });

  const { isOpen, config, showConfirm, handleConfirm, handleCancel } =
    useConfirmDialog();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [coversData, activeCoverData, suggestionsData] = await Promise.all([
        getUserCovers(),
        getActiveCover(),
        getCoverSuggestions(),
      ]);

      setUserCovers(coversData);
      setActiveCover(activeCoverData);
      setSuggestions(suggestionsData);
    } catch (error) {
      console.error("Error loading cover data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateCover = async () => {
    if (!formData.imageUrl.trim()) {
      await showConfirm({
        title: "Thiếu thông tin",
        description: "Vui lòng nhập URL ảnh bìa",
        confirmText: "OK",
        variant: "warning",
      });
      return;
    }

    try {
      setIsSaving(true);
      const coverData: CreateCoverRequest = {
        imageUrl: formData.imageUrl.trim(),
        title: formData.title.trim() || undefined,
        description: formData.description.trim() || undefined,
      };

      if (editingCover) {
        // Update existing cover
        const updatedCover = await updateCover(editingCover._id, coverData);
        setUserCovers((prev) =>
          prev.map((cover) =>
            cover._id === editingCover._id ? updatedCover : cover
          )
        );

        // Update active cover if it's the one being edited
        if (activeCover?._id === editingCover._id) {
          setActiveCover(updatedCover);
        }

        await showConfirm({
          title: "Thành công",
          description: "Ảnh bìa đã được cập nhật thành công!",
          confirmText: "OK",
        });
      } else {
        // Create new cover
        const newCover = await createCover(coverData);
        setUserCovers((prev) => [newCover, ...prev]);

        await showConfirm({
          title: "Thành công",
          description: "Ảnh bìa đã được tạo thành công!",
          confirmText: "OK",
        });
      }

      setShowCreateDialog(false);
      resetForm();
    } catch (error) {
      console.error("Error creating/updating cover:", error);
      await showConfirm({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi lưu ảnh bìa. Vui lòng thử lại.",
        confirmText: "OK",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteCover = async (coverId: string) => {
    const shouldDelete = await showConfirm({
      title: "Xác nhận xóa",
      description:
        "Bạn có chắc chắn muốn xóa ảnh bìa này? Hành động này không thể hoàn tác.",
      confirmText: "Xóa",
      cancelText: "Hủy",
      variant: "destructive",
    });

    if (!shouldDelete) return;

    try {
      setIsSaving(true);
      await deleteCover(coverId);
      setUserCovers((prev) => prev.filter((cover) => cover._id !== coverId));

      // If the deleted cover was active, clear active cover
      if (activeCover?._id === coverId) {
        setActiveCover(null);
      }

      await showConfirm({
        title: "Thành công",
        description: "Ảnh bìa đã được xóa thành công!",
        confirmText: "OK",
      });
    } catch (error) {
      console.error("Error deleting cover:", error);
      await showConfirm({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi xóa ảnh bìa. Vui lòng thử lại.",
        confirmText: "OK",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleSetActiveCover = async (coverId: string) => {
    try {
      setIsSaving(true);
      const updatedCover = await setActiveCoverApi(coverId);
      setActiveCover(updatedCover);

      // Update the cover in the list
      setUserCovers((prev) =>
        prev.map((cover) =>
          cover._id === coverId
            ? { ...cover, isActive: true }
            : { ...cover, isActive: false }
        )
      );

      await showConfirm({
        title: "Thành công",
        description: "Ảnh bìa đã được đặt làm active!",
        confirmText: "OK",
      });
    } catch (error) {
      console.error("Error setting active cover:", error);
      await showConfirm({
        title: "Lỗi",
        description: "Có lỗi xảy ra khi đặt ảnh bìa active. Vui lòng thử lại.",
        confirmText: "OK",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const resetForm = () => {
    setFormData({
      imageUrl: "",
      title: "",
      description: "",
    });
    setEditingCover(null);
  };

  const handleEditCover = (cover: Cover) => {
    setFormData({
      imageUrl: cover.imageUrl,
      title: cover.title,
      description: cover.description,
    });
    setEditingCover(cover);
    setShowCreateDialog(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-gray-600">Đang tải...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Active Cover */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="w-5 h-5" />
            Ảnh bìa đang active
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeCover ? (
            <div className="space-y-4">
              <div className="relative h-48 rounded-lg overflow-hidden">
                <img
                  src={activeCover.imageUrl}
                  alt={activeCover.title || "Cover image"}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src =
                      "/mountain-peak-sunrise-motivation-success.png";
                  }}
                />
                <div className="absolute inset-0 bg-black/20" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-lg">
                    {activeCover.title || "Ảnh bìa"}
                  </h3>
                  {activeCover.description && (
                    <p className="text-white/90 text-sm mt-1">
                      {activeCover.description}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => handleEditCover(activeCover)}
                  variant="outline"
                  className="flex-1"
                >
                  <Edit2 className="w-4 h-4 mr-2" />
                  Chỉnh sửa
                </Button>
                <Button
                  onClick={() => handleDeleteCover(activeCover._id)}
                  variant="destructive"
                  className="flex-1"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Xóa
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Chưa có ảnh bìa active
              </h3>
              <p className="text-gray-600 mb-4">
                Chọn một ảnh bìa từ danh sách bên dưới để đặt làm active
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* All User Covers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Tất cả ảnh bìa của bạn ({userCovers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {userCovers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {userCovers.map((cover) => (
                <div
                  key={cover._id}
                  className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                    cover.isActive
                      ? "border-blue-500 ring-2 ring-blue-200"
                      : "border-gray-200 hover:border-blue-300"
                  }`}
                >
                  <div className="aspect-video">
                    <img
                      src={cover.imageUrl}
                      alt={cover.title || "Cover image"}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src =
                          "/mountain-peak-sunrise-motivation-success.png";
                      }}
                    />
                  </div>
                  <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="text-center text-white">
                      <div className="flex gap-2 mb-2">
                        {!cover.isActive && (
                          <Button
                            size="sm"
                            onClick={() => handleSetActiveCover(cover._id)}
                            disabled={isSaving}
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleEditCover(cover)}
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleDeleteCover(cover._id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      {cover.isActive && (
                        <Badge
                          variant="secondary"
                          className="bg-blue-500 text-white"
                        >
                          Đang active
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                    <h4 className="text-white font-medium text-sm">
                      {cover.title || "Ảnh bìa"}
                    </h4>
                    {cover.description && (
                      <p className="text-white/80 text-xs mt-1">
                        {cover.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Chưa có ảnh bìa nào
              </h3>
              <p className="text-gray-600 mb-4">Tạo ảnh bìa đầu tiên của bạn</p>
            </div>
          )}

          <div className="mt-6 flex justify-center">
            <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Tạo ảnh bìa mới
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>
                    {editingCover ? "Chỉnh sửa ảnh bìa" : "Tạo ảnh bìa mới"}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="imageUrl">URL ảnh *</Label>
                    <Input
                      id="imageUrl"
                      value={formData.imageUrl}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          imageUrl: e.target.value,
                        }))
                      }
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div>
                    <Label htmlFor="title">Tiêu đề</Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      placeholder="Tên ảnh bìa"
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Mô tả</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Mô tả về ảnh bìa"
                      rows={3}
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleCreateCover}
                      disabled={isSaving}
                      className="flex-1"
                    >
                      {isSaving ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Đang lưu...
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4 mr-2" />
                          {editingCover ? "Cập nhật" : "Tạo"}
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowCreateDialog(false);
                        resetForm();
                      }}
                      className="flex-1"
                    >
                      <X className="w-4 h-4 mr-2" />
                      Hủy
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Cover Suggestions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            Gợi ý ảnh bìa
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="relative group cursor-pointer rounded-lg overflow-hidden border border-gray-200 hover:border-blue-300 transition-all"
                onClick={() => {
                  setFormData({
                    imageUrl: suggestion.imageUrl,
                    title: suggestion.title,
                    description: suggestion.description,
                  });
                  setShowCreateDialog(true);
                }}
              >
                <div className="aspect-video">
                  <img
                    src={suggestion.imageUrl}
                    alt={suggestion.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src =
                        "/mountain-peak-sunrise-motivation-success.png";
                    }}
                  />
                </div>
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="text-center text-white">
                    <Plus className="w-8 h-8 mx-auto mb-2" />
                    <p className="text-sm font-medium">Chọn ảnh này</p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                  <h4 className="text-white font-medium text-sm">
                    {suggestion.title}
                  </h4>
                  <p className="text-white/80 text-xs mt-1">
                    {suggestion.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        open={isOpen}
        config={config}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
}
