"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, User, Save, Upload } from "lucide-react";
import Link from "next/link";
import { getUser, updateUser, type User as UserType } from "@/lib/user-service";

export default function ProfileAdminPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [profile, setProfile] = useState<UserType | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [showAvatarInput, setShowAvatarInput] = useState(false);
  const [tempAvatarUrl, setTempAvatarUrl] = useState("");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load profile data from API
  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoadingProfile(true);
        const userData = await getUser();
        setProfile(userData);
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setIsLoadingProfile(false);
      }
    };

    if (isMounted) {
      loadProfile();
    }
  }, [isMounted]);

  const handleProfileUpdate = (field: string, value: string) => {
    if (profile) {
      setProfile((prev: UserType | null) =>
        prev
          ? {
              ...prev,
              [field]: field === "streak" ? parseInt(value) || 0 : value,
            }
          : null
      );
    }
  };

  const handleSaveProfile = async () => {
    if (!profile) return;

    try {
      setIsSavingProfile(true);
      const updatedProfile = await updateUser({
        name: profile.name,
        role: profile.role,
        goal: profile.goal,
        streak: profile.streak,
        avatar: profile.avatar,
      });
      setProfile(updatedProfile);
      alert("Thông tin đã được cập nhật thành công!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      alert("Có lỗi xảy ra khi cập nhật thông tin!");
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleShowAvatarInput = () => {
    setTempAvatarUrl(profile?.avatar || "");
    setShowAvatarInput(true);
  };

  const handleSaveAvatar = () => {
    if (profile) {
      setProfile({ ...profile, avatar: tempAvatarUrl });
      setShowAvatarInput(false);
    }
  };

  const handleCancelAvatar = () => {
    setTempAvatarUrl("");
    setShowAvatarInput(false);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin" className="inline-block mb-6">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Quay lại Dashboard
            </Button>
          </Link>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Quản lý thông tin cá nhân
                </h1>
                <p className="text-gray-600 mt-1">
                  Cập nhật thông tin profile và avatar của bạn
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Management */}
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-1"></div>
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-800">
                <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                  <User className="w-5 h-5 text-white" />
                </div>
                Thông tin cá nhân
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {isLoadingProfile ? (
                <div className="text-center py-12">
                  <div className="w-8 h-8 border-2 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600">Đang tải thông tin...</p>
                </div>
              ) : profile ? (
                <>
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="w-24 h-24 border-4 border-indigo-200 shadow-lg">
                      <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-2xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                        TP
                      </AvatarFallback>
                    </Avatar>

                    {showAvatarInput ? (
                      <div className="w-full max-w-md space-y-3">
                        <Label htmlFor="avatarUrl" className="text-gray-700">
                          URL Avatar
                        </Label>
                        <Input
                          id="avatarUrl"
                          placeholder="Nhập URL hình ảnh..."
                          value={tempAvatarUrl}
                          onChange={(e) => setTempAvatarUrl(e.target.value)}
                          className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-200"
                        />
                        <div className="flex gap-2">
                          <Button
                            onClick={handleSaveAvatar}
                            className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            Lưu
                          </Button>
                          <Button
                            onClick={handleCancelAvatar}
                            variant="outline"
                            className="flex-1 border-gray-200 text-gray-600 hover:bg-gray-50"
                          >
                            Hủy
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={handleShowAvatarInput}
                        className="border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-200"
                      >
                        <Upload className="w-4 h-4 mr-2" />
                        Đổi avatar
                      </Button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-gray-700">
                        Họ và tên
                      </Label>
                      <Input
                        id="name"
                        placeholder="Nhập họ và tên"
                        value={profile.name}
                        onChange={(e) =>
                          handleProfileUpdate("name", e.target.value)
                        }
                        className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-200 transition-all duration-200"
                      />
                    </div>

                    <div>
                      <Label htmlFor="role" className="text-gray-700">
                        Vai trò / Nghề nghiệp
                      </Label>
                      <Input
                        id="role"
                        placeholder="Ví dụ: Lập trình viên"
                        value={profile.role}
                        onChange={(e) =>
                          handleProfileUpdate("role", e.target.value)
                        }
                        className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-200 transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="goal" className="text-gray-700">
                        Mục tiêu hiện tại
                      </Label>
                      <Input
                        id="goal"
                        placeholder="Ví dụ: JLPT N3"
                        value={profile.goal}
                        onChange={(e) =>
                          handleProfileUpdate("goal", e.target.value)
                        }
                        className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-200 transition-all duration-200"
                      />
                    </div>

                    <div>
                      <Label htmlFor="streak" className="text-gray-700">
                        Streak (số ngày liên tiếp)
                      </Label>
                      <Input
                        id="streak"
                        type="number"
                        placeholder="0"
                        value={profile.streak.toString()}
                        onChange={(e) =>
                          handleProfileUpdate("streak", e.target.value)
                        }
                        className="border-indigo-200 focus:border-indigo-400 focus:ring-indigo-200 transition-all duration-200"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-indigo-200">
                    <Button
                      onClick={handleSaveProfile}
                      disabled={isSavingProfile}
                      className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {isSavingProfile ? "Đang lưu..." : "Lưu thông tin"}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">
                    Không thể tải thông tin profile
                  </p>
                  <p className="text-gray-400">Vui lòng thử lại sau</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
