"use client";

import { useState, useEffect } from "react";
import UserLayout from "@/components/layouts/UserLayout";
import CoverManager from "@/components/CoverManager";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Settings, Image, User, Bell, Save, Upload, Lock } from "lucide-react";
import { updateUser, type User as UserType } from "@/lib/user-service";
import { authService } from "@/lib/auth-service";
import { useAuth } from "@/lib/auth-context";

// Type for auth service user
interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar?: string;
  goal?: string;
  streak?: number;
}

export default function SettingsPage() {
  const { refreshUser } = useAuth();
  const [activeTab, setActiveTab] = useState("cover");
  const [profile, setProfile] = useState<UserType | null>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [showAvatarInput, setShowAvatarInput] = useState(false);
  const [tempAvatarUrl, setTempAvatarUrl] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Map auth user to User type
  const mapAuthUserToUser = (authUser: AuthUser): UserType => {
    return {
      _id: authUser._id,
      name: authUser.name,
      role: authUser.role,
      goal: authUser?.goal || "", // Will be loaded from user-service updateUser
      streak: authUser?.streak || 0, // Will be loaded from user-service updateUser
      avatar: authUser?.avatar || "",
      income: undefined, // Will be loaded from user-service updateUser
      __v: 0,
    };
  };

  useEffect(() => {
    const loadProfile = async () => {
      try {
        setIsLoadingProfile(true);
        const userData = await authService.getCurrentUser();
        const mappedUser = mapAuthUserToUser(userData);
        setProfile(mappedUser);
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setIsLoadingProfile(false);
      }
    };

    loadProfile();
  }, []);

  const handleProfileUpdate = (field: string, value: string) => {
    if (profile) {
      setProfile((prev: UserType | null) =>
        prev
          ? {
              ...prev,
              [field]:
                field === "streak" || field === "income"
                  ? parseInt(value) || 0
                  : value,
            }
          : null
      );
    }
  };

  const handleSaveProfile = async () => {
    if (!profile) return;

    try {
      setIsSavingProfile(true);
      const updateData: any = {
        name: profile.name,
        role: profile.role,
        goal: profile.goal,
        streak: profile.streak,
        avatar: profile.avatar,
      };

      if (profile.income !== undefined) {
        updateData.income = profile.income;
      }

      console.log("Sending update data:", updateData);

      const updatedProfile = await updateUser(updateData);
      console.log("Update response:", updatedProfile);

      // Refresh data from auth service after successful update
      const refreshedUserData = await authService.getCurrentUser();
      const refreshedMappedUser = mapAuthUserToUser(refreshedUserData);

      // Merge the updated data with refreshed auth data
      const finalProfile = {
        ...refreshedMappedUser,
        name: updatedProfile.name || refreshedMappedUser.name,
        role: updatedProfile.role || refreshedMappedUser.role,
        goal: updatedProfile.goal || refreshedMappedUser.goal,
        streak: updatedProfile.streak || refreshedMappedUser.streak,
        avatar: updatedProfile.avatar || refreshedMappedUser.avatar,
        income:
          updatedProfile.income !== undefined
            ? updatedProfile.income
            : refreshedMappedUser.income,
      };

      setProfile(finalProfile);

      // Refresh auth context to update header
      await refreshUser();

      alert("Thông tin đã được cập nhật thành công!");
    } catch (error) {
      console.error("Failed to update profile:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Vui lòng thử lại sau";
      alert(`Có lỗi xảy ra khi cập nhật thông tin: ${errorMessage}`);
    } finally {
      setIsSavingProfile(false);
    }
  };

  const handleShowAvatarInput = () => {
    setTempAvatarUrl(profile?.avatar || "");
    setAvatarPreview(profile?.avatar || "");
    setShowAvatarInput(true);
  };

  const handleAvatarUrlChange = (value: string) => {
    setTempAvatarUrl(value);
    setAvatarPreview(value);
  };

  const handleSaveAvatar = () => {
    if (profile) {
      setProfile({ ...profile, avatar: tempAvatarUrl });
      setShowAvatarInput(false);
      setAvatarPreview("");
    }
  };

  const handleCancelAvatar = () => {
    setTempAvatarUrl("");
    setAvatarPreview("");
    setShowAvatarInput(false);
  };

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert("Mật khẩu mới và xác nhận mật khẩu không khớp!");
      return;
    }

    if (newPassword.length < 8) {
      alert("Mật khẩu mới phải có ít nhất 8 ký tự!");
      return;
    }

    try {
      setIsChangingPassword(true);
      await authService.changePassword(currentPassword, newPassword);
      alert("Đổi mật khẩu thành công!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      console.error("Failed to change password:", error);
      alert("Có lỗi xảy ra khi đổi mật khẩu!");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const tabs = [
    { id: "cover", label: "Ảnh bìa", icon: Image },
    { id: "profile", label: "Hồ sơ", icon: User },
    { id: "notifications", label: "Thông báo", icon: Bell },
    { id: "preferences", label: "Tùy chỉnh", icon: Settings },
  ];

  return (
    <UserLayout
      title="Cài đặt"
      description="Quản lý tài khoản và tùy chỉnh ứng dụng"
      icon={<Settings className="w-8 h-8 text-white" />}
    >
      <div className="max-w-4xl mx-auto">
        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 pb-4">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <Button
                key={tab.id}
                variant={activeTab === tab.id ? "default" : "outline"}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2"
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </Button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "cover" && <CoverManager />}

          {activeTab === "profile" && (
            <div className="space-y-8">
              {/* Profile Information */}
              <Card className="bg-gradient-to-br from-white to-indigo-50/30 border-0 shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-1"></div>
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-800">
                    <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    Thông tin cá nhân
                  </CardTitle>
                  <p className="text-gray-600 mt-2">
                    Cập nhật thông tin profile và avatar của bạn
                  </p>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  {isLoadingProfile ? (
                    <div className="text-center py-16">
                      <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-6"></div>
                      <p className="text-lg text-gray-600 font-medium">
                        Đang tải thông tin...
                      </p>
                      <p className="text-gray-500 mt-2">
                        Vui lòng đợi trong giây lát
                      </p>
                    </div>
                  ) : profile ? (
                    <div className="space-y-8">
                      {/* Avatar Section */}
                      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-indigo-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                          <Upload className="w-5 h-5 text-indigo-600" />
                          Ảnh đại diện
                        </h3>
                        <div className="flex flex-col items-center gap-6">
                          <Avatar className="w-32 h-32 border-4 border-indigo-200 shadow-2xl ring-4 ring-indigo-100">
                            <AvatarImage
                              src={profile.avatar || "/placeholder.svg"}
                              className="object-cover"
                            />
                            <AvatarFallback className="text-3xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold">
                              {profile.name?.charAt(0)?.toUpperCase() || "U"}
                            </AvatarFallback>
                          </Avatar>

                          {showAvatarInput ? (
                            <div className="w-full max-w-lg space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-200">
                              <div className="flex items-center gap-4">
                                <div className="flex-shrink-0">
                                  <Avatar className="w-16 h-16 border-2 border-gray-300">
                                    <AvatarImage
                                      src={avatarPreview || "/placeholder.svg"}
                                    />
                                    <AvatarFallback className="bg-gray-300 text-gray-600">
                                      Preview
                                    </AvatarFallback>
                                  </Avatar>
                                </div>
                                <div className="flex-1">
                                  <Label
                                    htmlFor="avatarUrl"
                                    className="text-gray-700 font-medium text-base"
                                  >
                                    URL hình ảnh mới
                                  </Label>
                                  <Input
                                    id="avatarUrl"
                                    placeholder="https://example.com/avatar.jpg"
                                    value={tempAvatarUrl}
                                    onChange={(e) =>
                                      handleAvatarUrlChange(e.target.value)
                                    }
                                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 text-base py-3 mt-1"
                                  />
                                </div>
                              </div>
                              <div className="flex gap-3 pt-2">
                                <Button
                                  onClick={handleSaveAvatar}
                                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 py-3"
                                >
                                  <Save className="w-5 h-5 mr-2" />
                                  Lưu thay đổi
                                </Button>
                                <Button
                                  onClick={handleCancelAvatar}
                                  variant="outline"
                                  className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50 py-3"
                                >
                                  Hủy bỏ
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <Button
                              variant="outline"
                              onClick={handleShowAvatarInput}
                              className="border-indigo-300 text-indigo-700 hover:bg-indigo-50 hover:border-indigo-400 transition-all duration-200 px-6 py-3"
                            >
                              <Upload className="w-5 h-5 mr-2" />
                              Thay đổi ảnh đại diện
                            </Button>
                          )}
                        </div>
                      </div>

                      {/* Personal Information */}
                      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-indigo-100">
                        <h3 className="text-lg font-semibold text-gray-800 mb-6 flex items-center gap-2">
                          <User className="w-5 h-5 text-indigo-600" />
                          Thông tin cá nhân
                        </h3>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label
                              htmlFor="name"
                              className="text-gray-700 font-medium text-sm"
                            >
                              Họ và tên đầy đủ
                            </Label>
                            <Input
                              id="name"
                              placeholder="Ví dụ: Nguyễn Văn A"
                              value={profile.name || ""}
                              onChange={(e) =>
                                handleProfileUpdate("name", e.target.value)
                              }
                              className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 text-base py-3"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label
                              htmlFor="role"
                              className="text-gray-700 font-medium text-sm"
                            >
                              Nghề nghiệp / Vai trò
                            </Label>
                            <Input
                              id="role"
                              placeholder="Ví dụ: Lập trình viên Frontend"
                              value={profile.role || ""}
                              onChange={(e) =>
                                handleProfileUpdate("role", e.target.value)
                              }
                              className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 text-base py-3"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label
                              htmlFor="goal"
                              className="text-gray-700 font-medium text-sm"
                            >
                              Mục tiêu hiện tại
                            </Label>
                            <Input
                              id="goal"
                              placeholder="Ví dụ: Học JLPT N3, Phát triển kỹ năng React"
                              value={profile.goal || ""}
                              onChange={(e) =>
                                handleProfileUpdate("goal", e.target.value)
                              }
                              className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 text-base py-3"
                            />
                          </div>

                          <div className="space-y-2">
                            <Label
                              htmlFor="streak"
                              className="text-gray-700 font-medium text-sm"
                            >
                              Số ngày liên tiếp học tập
                            </Label>
                            <Input
                              id="streak"
                              type="number"
                              placeholder="0"
                              value={profile.streak?.toString() || "0"}
                              onChange={(e) =>
                                handleProfileUpdate("streak", e.target.value)
                              }
                              className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 text-base py-3"
                            />
                          </div>

                          {profile.income !== undefined && (
                            <div className="space-y-2 lg:col-span-2">
                              <Label
                                htmlFor="income"
                                className="text-gray-700 font-medium text-sm"
                              >
                                Thu nhập hàng tháng (VNĐ)
                              </Label>
                              <Input
                                id="income"
                                type="number"
                                placeholder="Ví dụ: 15000000"
                                value={profile.income?.toString() || ""}
                                onChange={(e) =>
                                  handleProfileUpdate("income", e.target.value)
                                }
                                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-200 text-base py-3"
                              />
                            </div>
                          )}
                        </div>

                        <div className="pt-6 border-t border-gray-200 mt-6">
                          <Button
                            onClick={handleSaveProfile}
                            disabled={isSavingProfile}
                            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 py-4 text-lg font-semibold"
                          >
                            <Save className="w-5 h-5 mr-2" />
                            {isSavingProfile
                              ? "Đang lưu thay đổi..."
                              : "Lưu thông tin cá nhân"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <User className="w-8 h-8 text-red-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        Không thể tải thông tin
                      </h3>
                      <p className="text-gray-600 mb-6">
                        Có lỗi xảy ra khi tải thông tin profile của bạn
                      </p>
                      <Button
                        onClick={() => window.location.reload()}
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white"
                      >
                        Thử lại
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Change Password */}
              <Card className="bg-gradient-to-br from-white to-red-50/30 border-0 shadow-xl overflow-hidden">
                <div className="bg-gradient-to-r from-red-500 to-pink-600 h-1"></div>
                <CardHeader className="pb-6">
                  <CardTitle className="flex items-center gap-3 text-2xl font-bold text-gray-800">
                    <div className="p-3 bg-gradient-to-r from-red-500 to-pink-600 rounded-xl shadow-lg">
                      <Lock className="w-6 h-6 text-white" />
                    </div>
                    Bảo mật tài khoản
                  </CardTitle>
                  <p className="text-gray-600 mt-2">
                    Thay đổi mật khẩu để bảo vệ tài khoản của bạn
                  </p>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-red-100">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <Label
                          htmlFor="currentPassword"
                          className="text-gray-700 font-medium text-sm flex items-center gap-2"
                        >
                          <Lock className="w-4 h-4 text-red-600" />
                          Mật khẩu hiện tại
                        </Label>
                        <Input
                          id="currentPassword"
                          type="password"
                          placeholder="Nhập mật khẩu hiện tại của bạn"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="border-gray-300 focus:border-red-500 focus:ring-red-200 text-base py-3"
                        />
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label
                            htmlFor="newPassword"
                            className="text-gray-700 font-medium text-sm"
                          >
                            Mật khẩu mới
                          </Label>
                          <Input
                            id="newPassword"
                            type="password"
                            placeholder="Tối thiểu 8 ký tự"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="border-gray-300 focus:border-red-500 focus:ring-red-200 text-base py-3"
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="confirmPassword"
                            className="text-gray-700 font-medium text-sm"
                          >
                            Xác nhận mật khẩu mới
                          </Label>
                          <Input
                            id="confirmPassword"
                            type="password"
                            placeholder="Nhập lại mật khẩu mới"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="border-gray-300 focus:border-red-500 focus:ring-red-200 text-base py-3"
                          />
                        </div>
                      </div>

                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center mt-0.5">
                            <span className="text-white text-xs font-bold">
                              !
                            </span>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-yellow-800 mb-1">
                              Lưu ý về mật khẩu
                            </h4>
                            <ul className="text-sm text-yellow-700 space-y-1">
                              <li>• Mật khẩu phải có ít nhất 8 ký tự</li>
                              <li>• Bao gồm chữ hoa, chữ thường và số</li>
                              <li>• Không sử dụng thông tin cá nhân dễ đoán</li>
                            </ul>
                          </div>
                        </div>
                      </div>

                      <Button
                        onClick={handleChangePassword}
                        disabled={
                          isChangingPassword ||
                          !currentPassword ||
                          !newPassword ||
                          !confirmPassword
                        }
                        className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Lock className="w-5 h-5 mr-2" />
                        {isChangingPassword
                          ? "Đang cập nhật mật khẩu..."
                          : "Cập nhật mật khẩu"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Cài đặt thông báo
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Tính năng đang phát triển
                  </h3>
                  <p className="text-gray-600">
                    Cài đặt thông báo sẽ được cập nhật trong phiên bản tiếp theo
                  </p>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "preferences" && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Tùy chỉnh ứng dụng
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Tính năng đang phát triển
                  </h3>
                  <p className="text-gray-600">
                    Tùy chỉnh ứng dụng sẽ được cập nhật trong phiên bản tiếp
                    theo
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </UserLayout>
  );
}
