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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <User className="w-8 h-8 text-green-600" />
            <h1 className="text-3xl font-bold text-gray-900">
              Quản lý thông tin cá nhân
            </h1>
          </div>
          <p className="text-gray-600">
            Cập nhật thông tin profile và avatar của bạn
          </p>
          <Link href="/admin" className="inline-block mt-4">
            <Button
              variant="outline"
              className="text-green-600 border-green-300 hover:bg-green-50"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Quay lại Admin
            </Button>
          </Link>
        </div>

        {/* Profile Management */}
        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/80 backdrop-blur-sm border-green-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-800">
                <User className="w-5 h-5" />
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
                    <Avatar className="w-24 h-24 border-4 border-green-500">
                      <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="text-2xl bg-green-500 text-white">
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
                          className="border-green-200 focus:border-green-400"
                        />
                        <div className="flex gap-2">
                          <Button
                            onClick={handleSaveAvatar}
                            className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                          >
                            <Save className="w-4 h-4 mr-2" />
                            Lưu
                          </Button>
                          <Button
                            onClick={handleCancelAvatar}
                            variant="outline"
                            className="flex-1 border-gray-300"
                          >
                            Hủy
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        variant="outline"
                        onClick={handleShowAvatarInput}
                        className="border-green-300 text-green-700 hover:bg-green-50"
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
                        className="border-green-200 focus:border-green-400"
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
                        className="border-green-200 focus:border-green-400"
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
                        className="border-green-200 focus:border-green-400"
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
                        className="border-green-200 focus:border-green-400"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-green-200">
                    <Button
                      onClick={handleSaveProfile}
                      disabled={isSavingProfile}
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
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
