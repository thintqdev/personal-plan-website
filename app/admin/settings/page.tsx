"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Settings,
  Shield,
  Bell,
  Palette,
  Lock,
  User,
  Save,
  AlertTriangle,
  CheckCircle,
  Eye,
  EyeOff,
  Key,
  Mail,
  Globe,
  FileText,
  Info,
  HelpCircle,
  BookOpen,
  Users,
  Phone,
  Mail as MailIcon,
} from "lucide-react";
import Link from "next/link";

export default function SettingsAdminPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("general");

  // General settings
  const [generalSettings, setGeneralSettings] = useState({
    appName: "ThinPlan",
    appDescription: "Ứng dụng quản lý kế hoạch cá nhân",
    language: "vi",
    timezone: "Asia/Ho_Chi_Minh",
  });

  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    passwordMinLength: 8,
    passwordRequireUppercase: true,
    passwordRequireNumber: true,
    passwordRequireSpecialChar: true,
    twoFactorAuth: false,
    sessionTimeout: 30,
  });

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    dailyReminders: true,
    weeklyReports: true,
    goalReminders: true,
  });

  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: "private",
    dataCollection: true,
    analytics: true,
  });

  // Regulations
  const [regulations, setRegulations] = useState({
    termsOfService: "",
    privacyPolicy: "",
    communityGuidelines: "",
  });

  // Help & Support
  const [helpSupport, setHelpSupport] = useState({
    userGuide: "",
    faq: "",
    contactEmail: "",
    contactPhone: "",
    supportHours: "",
  });

  // Loading and saving states
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{
    type: string;
    message: string;
  } | null>(null);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Load settings from API (simulated)
  useEffect(() => {
    const loadSettings = async () => {
      if (!isMounted) return;

      try {
        setIsLoading(true);
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 500));

        // In a real app, you would fetch actual settings from the backend
        // const response = await fetch('/api/settings');
        // const data = await response.json();
        // setGeneralSettings(data.general);
        // setSecuritySettings(data.security);
        // etc.
      } catch (error) {
        console.error("Failed to load settings:", error);
        setSaveStatus({
          type: "error",
          message: "Không thể tải cài đặt. Vui lòng thử lại sau.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadSettings();
  }, [isMounted]);

  const handleSaveSettings = async () => {
    try {
      setIsSaving(true);
      setSaveStatus(null);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 800));

      // In a real app, you would send the settings to the backend
      // await fetch('/api/settings', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     general: generalSettings,
      //     security: securitySettings,
      //     notifications: notificationSettings,
      //     privacy: privacySettings,
      //     regulations,
      //     helpSupport
      //   })
      // });

      setSaveStatus({
        type: "success",
        message: "Cài đặt đã được lưu thành công!",
      });

      // Clear status after 3 seconds
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (error) {
      console.error("Failed to save settings:", error);
      setSaveStatus({
        type: "error",
        message: "Không thể lưu cài đặt. Vui lòng thử lại sau.",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleResetSettings = () => {
    if (confirm("Bạn có chắc chắn muốn đặt lại tất cả cài đặt về mặc định?")) {
      // Reset to default values
      setGeneralSettings({
        appName: "ThinPlan",
        appDescription: "Ứng dụng quản lý kế hoạch cá nhân",
        language: "vi",
        timezone: "Asia/Ho_Chi_Minh",
      });

      setSecuritySettings({
        passwordMinLength: 8,
        passwordRequireUppercase: true,
        passwordRequireNumber: true,
        passwordRequireSpecialChar: true,
        twoFactorAuth: false,
        sessionTimeout: 30,
      });

      setNotificationSettings({
        emailNotifications: true,
        pushNotifications: true,
        dailyReminders: true,
        weeklyReports: true,
        goalReminders: true,
      });

      setPrivacySettings({
        profileVisibility: "private",
        dataCollection: true,
        analytics: true,
      });

      setRegulations({
        termsOfService: "",
        privacyPolicy: "",
        communityGuidelines: "",
      });

      setHelpSupport({
        userGuide: "",
        faq: "",
        contactEmail: "",
        contactPhone: "",
        supportHours: "",
      });

      setSaveStatus({
        type: "info",
        message: "Cài đặt đã được đặt lại về mặc định",
      });

      setTimeout(() => setSaveStatus(null), 3000);
    }
  };

  if (!isMounted) {
    return null;
  }

  const sections = [
    { id: "general", label: "Cài đặt chung", icon: Settings },
    { id: "security", label: "Bảo mật", icon: Shield },
    { id: "notifications", label: "Thông báo", icon: Bell },
    { id: "privacy", label: "Quyền riêng tư", icon: Lock },
    { id: "regulations", label: "Quy định", icon: FileText },
    { id: "help", label: "Trợ giúp & Hỗ trợ", icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
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
                <Settings className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Cài đặt hệ thống
                </h1>
                <p className="text-gray-600 mt-1">
                  Quản lý cài đặt chung, bảo mật và quy định
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleResetSettings}
                className="border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300"
              >
                <AlertTriangle className="w-4 h-4 mr-2" />
                Đặt lại
              </Button>
              <Button
                onClick={handleSaveSettings}
                disabled={isSaving}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Đang lưu...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Lưu cài đặt
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {saveStatus && (
          <div
            className={`mb-6 p-4 rounded-xl ${
              saveStatus.type === "success"
                ? "bg-green-50 border border-green-200 text-green-700"
                : saveStatus.type === "error"
                ? "bg-red-50 border border-red-200 text-red-700"
                : "bg-blue-50 border border-blue-200 text-blue-700"
            }`}
          >
            <div className="flex items-center">
              {saveStatus.type === "success" ? (
                <CheckCircle className="w-5 h-5 mr-2" />
              ) : saveStatus.type === "error" ? (
                <AlertTriangle className="w-5 h-5 mr-2" />
              ) : (
                <Info className="w-5 h-5 mr-2" />
              )}
              <span className="font-medium">{saveStatus.message}</span>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:w-1/4">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-1"></div>
              <CardContent className="p-6">
                <nav className="space-y-2">
                  {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                          activeSection === section.id
                            ? "bg-indigo-100 text-indigo-700 font-medium"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span>{section.label}</span>
                      </button>
                    );
                  })}
                </nav>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:w-3/4">
            {isLoading ? (
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-1"></div>
                <CardContent className="p-12 text-center">
                  <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-gray-600 font-medium">
                    Đang tải cài đặt...
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* General Settings */}
                {activeSection === "general" && (
                  <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-1"></div>
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-800">
                        <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                          <Settings className="w-5 h-5 text-white" />
                        </div>
                        Cài đặt chung
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label
                            htmlFor="appName"
                            className="text-gray-700 font-medium mb-2 block"
                          >
                            Tên ứng dụng
                          </Label>
                          <Input
                            id="appName"
                            value={generalSettings.appName}
                            onChange={(e) =>
                              setGeneralSettings({
                                ...generalSettings,
                                appName: e.target.value,
                              })
                            }
                            className="border-gray-200 focus:border-indigo-400 focus:ring-indigo-400 rounded-xl h-12"
                          />
                        </div>

                        <div>
                          <Label
                            htmlFor="language"
                            className="text-gray-700 font-medium mb-2 block"
                          >
                            Ngôn ngữ
                          </Label>
                          <Select
                            value={generalSettings.language}
                            onValueChange={(value) =>
                              setGeneralSettings({
                                ...generalSettings,
                                language: value,
                              })
                            }
                          >
                            <SelectTrigger className="border-gray-200 focus:border-indigo-400 rounded-xl h-12 bg-white">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-white border-gray-200 rounded-xl shadow-lg">
                              <SelectItem value="vi">Tiếng Việt</SelectItem>
                              <SelectItem value="en">English</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label
                          htmlFor="appDescription"
                          className="text-gray-700 font-medium mb-2 block"
                        >
                          Mô tả ứng dụng
                        </Label>
                        <Textarea
                          id="appDescription"
                          value={generalSettings.appDescription}
                          onChange={(e) =>
                            setGeneralSettings({
                              ...generalSettings,
                              appDescription: e.target.value,
                            })
                          }
                          className="border-gray-200 focus:border-indigo-400 focus:ring-indigo-400 rounded-xl"
                          rows={3}
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="timezone"
                          className="text-gray-700 font-medium mb-2 block"
                        >
                          Múi giờ
                        </Label>
                        <Select
                          value={generalSettings.timezone}
                          onValueChange={(value) =>
                            setGeneralSettings({
                              ...generalSettings,
                              timezone: value,
                            })
                          }
                        >
                          <SelectTrigger className="border-gray-200 focus:border-indigo-400 rounded-xl h-12 bg-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-gray-200 rounded-xl shadow-lg">
                            <SelectItem value="Asia/Ho_Chi_Minh">
                              Giờ Việt Nam (UTC+7)
                            </SelectItem>
                            <SelectItem value="Asia/Tokyo">
                              Giờ Nhật Bản (UTC+9)
                            </SelectItem>
                            <SelectItem value="America/New_York">
                              Giờ New York (UTC-5)
                            </SelectItem>
                            <SelectItem value="Europe/London">
                              Giờ London (UTC+0)
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Security Settings */}
                {activeSection === "security" && (
                  <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-1"></div>
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-800">
                        <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                          <Shield className="w-5 h-5 text-white" />
                        </div>
                        Cài đặt bảo mật
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label
                            htmlFor="passwordMinLength"
                            className="text-gray-700 font-medium mb-2 block"
                          >
                            Độ dài mật khẩu tối thiểu
                          </Label>
                          <Input
                            id="passwordMinLength"
                            type="number"
                            min="6"
                            max="50"
                            value={securitySettings.passwordMinLength}
                            onChange={(e) =>
                              setSecuritySettings({
                                ...securitySettings,
                                passwordMinLength:
                                  parseInt(e.target.value) || 8,
                              })
                            }
                            className="border-gray-200 focus:border-indigo-400 focus:ring-indigo-400 rounded-xl h-12"
                          />
                        </div>

                        <div>
                          <Label
                            htmlFor="sessionTimeout"
                            className="text-gray-700 font-medium mb-2 block"
                          >
                            Thời gian hết hạn phiên (phút)
                          </Label>
                          <Input
                            id="sessionTimeout"
                            type="number"
                            min="1"
                            max="1440"
                            value={securitySettings.sessionTimeout}
                            onChange={(e) =>
                              setSecuritySettings({
                                ...securitySettings,
                                sessionTimeout: parseInt(e.target.value) || 30,
                              })
                            }
                            className="border-gray-200 focus:border-indigo-400 focus:ring-indigo-400 rounded-xl h-12"
                          />
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div>
                            <h3 className="font-medium text-gray-800">
                              Yêu cầu chữ hoa trong mật khẩu
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              Mật khẩu phải chứa ít nhất một chữ cái viết hoa
                            </p>
                          </div>
                          <Button
                            variant={
                              securitySettings.passwordRequireUppercase
                                ? "default"
                                : "outline"
                            }
                            onClick={() =>
                              setSecuritySettings({
                                ...securitySettings,
                                passwordRequireUppercase:
                                  !securitySettings.passwordRequireUppercase,
                              })
                            }
                            className={
                              securitySettings.passwordRequireUppercase
                                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                                : "border-gray-200 text-gray-600 hover:bg-gray-50"
                            }
                          >
                            {securitySettings.passwordRequireUppercase
                              ? "Bật"
                              : "Tắt"}
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div>
                            <h3 className="font-medium text-gray-800">
                              Yêu cầu số trong mật khẩu
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              Mật khẩu phải chứa ít nhất một chữ số
                            </p>
                          </div>
                          <Button
                            variant={
                              securitySettings.passwordRequireNumber
                                ? "default"
                                : "outline"
                            }
                            onClick={() =>
                              setSecuritySettings({
                                ...securitySettings,
                                passwordRequireNumber:
                                  !securitySettings.passwordRequireNumber,
                              })
                            }
                            className={
                              securitySettings.passwordRequireNumber
                                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                                : "border-gray-200 text-gray-600 hover:bg-gray-50"
                            }
                          >
                            {securitySettings.passwordRequireNumber
                              ? "Bật"
                              : "Tắt"}
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div>
                            <h3 className="font-medium text-gray-800">
                              Yêu cầu ký tự đặc biệt trong mật khẩu
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              Mật khẩu phải chứa ít nhất một ký tự đặc biệt
                            </p>
                          </div>
                          <Button
                            variant={
                              securitySettings.passwordRequireSpecialChar
                                ? "default"
                                : "outline"
                            }
                            onClick={() =>
                              setSecuritySettings({
                                ...securitySettings,
                                passwordRequireSpecialChar:
                                  !securitySettings.passwordRequireSpecialChar,
                              })
                            }
                            className={
                              securitySettings.passwordRequireSpecialChar
                                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                                : "border-gray-200 text-gray-600 hover:bg-gray-50"
                            }
                          >
                            {securitySettings.passwordRequireSpecialChar
                              ? "Bật"
                              : "Tắt"}
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div>
                            <h3 className="font-medium text-gray-800">
                              Xác thực hai yếu tố (2FA)
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              Yêu cầu xác thực bổ sung khi đăng nhập
                            </p>
                          </div>
                          <Button
                            variant={
                              securitySettings.twoFactorAuth
                                ? "default"
                                : "outline"
                            }
                            onClick={() =>
                              setSecuritySettings({
                                ...securitySettings,
                                twoFactorAuth: !securitySettings.twoFactorAuth,
                              })
                            }
                            className={
                              securitySettings.twoFactorAuth
                                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                                : "border-gray-200 text-gray-600 hover:bg-gray-50"
                            }
                          >
                            {securitySettings.twoFactorAuth ? "Bật" : "Tắt"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Notification Settings */}
                {activeSection === "notifications" && (
                  <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-1"></div>
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-800">
                        <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                          <Bell className="w-5 h-5 text-white" />
                        </div>
                        Cài đặt thông báo
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <h3 className="font-medium text-gray-800">
                            Thông báo qua email
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Nhận thông báo quan trọng qua email
                          </p>
                        </div>
                        <Button
                          variant={
                            notificationSettings.emailNotifications
                              ? "default"
                              : "outline"
                          }
                          onClick={() =>
                            setNotificationSettings({
                              ...notificationSettings,
                              emailNotifications:
                                !notificationSettings.emailNotifications,
                            })
                          }
                          className={
                            notificationSettings.emailNotifications
                              ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                              : "border-gray-200 text-gray-600 hover:bg-gray-50"
                          }
                        >
                          {notificationSettings.emailNotifications
                            ? "Bật"
                            : "Tắt"}
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <h3 className="font-medium text-gray-800">
                            Thông báo đẩy
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Nhận thông báo trên thiết bị di động
                          </p>
                        </div>
                        <Button
                          variant={
                            notificationSettings.pushNotifications
                              ? "default"
                              : "outline"
                          }
                          onClick={() =>
                            setNotificationSettings({
                              ...notificationSettings,
                              pushNotifications:
                                !notificationSettings.pushNotifications,
                            })
                          }
                          className={
                            notificationSettings.pushNotifications
                              ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                              : "border-gray-200 text-gray-600 hover:bg-gray-50"
                          }
                        >
                          {notificationSettings.pushNotifications
                            ? "Bật"
                            : "Tắt"}
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <h3 className="font-medium text-gray-800">
                            Nhắc nhở hàng ngày
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Nhận nhắc nhở về các nhiệm vụ hàng ngày
                          </p>
                        </div>
                        <Button
                          variant={
                            notificationSettings.dailyReminders
                              ? "default"
                              : "outline"
                          }
                          onClick={() =>
                            setNotificationSettings({
                              ...notificationSettings,
                              dailyReminders:
                                !notificationSettings.dailyReminders,
                            })
                          }
                          className={
                            notificationSettings.dailyReminders
                              ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                              : "border-gray-200 text-gray-600 hover:bg-gray-50"
                          }
                        >
                          {notificationSettings.dailyReminders ? "Bật" : "Tắt"}
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <h3 className="font-medium text-gray-800">
                            Báo cáo hàng tuần
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Nhận báo cáo tổng kết hàng tuần
                          </p>
                        </div>
                        <Button
                          variant={
                            notificationSettings.weeklyReports
                              ? "default"
                              : "outline"
                          }
                          onClick={() =>
                            setNotificationSettings({
                              ...notificationSettings,
                              weeklyReports:
                                !notificationSettings.weeklyReports,
                            })
                          }
                          className={
                            notificationSettings.weeklyReports
                              ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                              : "border-gray-200 text-gray-600 hover:bg-gray-50"
                          }
                        >
                          {notificationSettings.weeklyReports ? "Bật" : "Tắt"}
                        </Button>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <h3 className="font-medium text-gray-800">
                            Nhắc nhở mục tiêu
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">
                            Nhận nhắc nhở về tiến độ mục tiêu
                          </p>
                        </div>
                        <Button
                          variant={
                            notificationSettings.goalReminders
                              ? "default"
                              : "outline"
                          }
                          onClick={() =>
                            setNotificationSettings({
                              ...notificationSettings,
                              goalReminders:
                                !notificationSettings.goalReminders,
                            })
                          }
                          className={
                            notificationSettings.goalReminders
                              ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                              : "border-gray-200 text-gray-600 hover:bg-gray-50"
                          }
                        >
                          {notificationSettings.goalReminders ? "Bật" : "Tắt"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Privacy Settings */}
                {activeSection === "privacy" && (
                  <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-1"></div>
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-800">
                        <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                          <Lock className="w-5 h-5 text-white" />
                        </div>
                        Quyền riêng tư
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <Label className="text-gray-700 font-medium mb-2 block">
                          Hiển thị hồ sơ
                        </Label>
                        <Select
                          value={privacySettings.profileVisibility}
                          onValueChange={(value) =>
                            setPrivacySettings({
                              ...privacySettings,
                              profileVisibility: value,
                            })
                          }
                        >
                          <SelectTrigger className="border-gray-200 focus:border-indigo-400 rounded-xl h-12 bg-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="bg-white border-gray-200 rounded-xl shadow-lg">
                            <SelectItem value="private">
                              Riêng tư - Chỉ mình tôi
                            </SelectItem>
                            <SelectItem value="friends">
                              Bạn bè - Chỉ bạn bè
                            </SelectItem>
                            <SelectItem value="public">
                              Công khai - Tất cả mọi người
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div>
                            <h3 className="font-medium text-gray-800">
                              Thu thập dữ liệu
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              Cho phép thu thập dữ liệu để cải thiện trải nghiệm
                            </p>
                          </div>
                          <Button
                            variant={
                              privacySettings.dataCollection
                                ? "default"
                                : "outline"
                            }
                            onClick={() =>
                              setPrivacySettings({
                                ...privacySettings,
                                dataCollection: !privacySettings.dataCollection,
                              })
                            }
                            className={
                              privacySettings.dataCollection
                                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                                : "border-gray-200 text-gray-600 hover:bg-gray-50"
                            }
                          >
                            {privacySettings.dataCollection ? "Bật" : "Tắt"}
                          </Button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                          <div>
                            <h3 className="font-medium text-gray-800">
                              Phân tích sử dụng
                            </h3>
                            <p className="text-sm text-gray-600 mt-1">
                              Cho phép phân tích hành vi sử dụng để cải thiện
                              ứng dụng
                            </p>
                          </div>
                          <Button
                            variant={
                              privacySettings.analytics ? "default" : "outline"
                            }
                            onClick={() =>
                              setPrivacySettings({
                                ...privacySettings,
                                analytics: !privacySettings.analytics,
                              })
                            }
                            className={
                              privacySettings.analytics
                                ? "bg-indigo-600 hover:bg-indigo-700 text-white"
                                : "border-gray-200 text-gray-600 hover:bg-gray-50"
                            }
                          >
                            {privacySettings.analytics ? "Bật" : "Tắt"}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Regulations */}
                {activeSection === "regulations" && (
                  <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-1"></div>
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-800">
                        <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        Quy định và Điều khoản
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <Label
                          htmlFor="termsOfService"
                          className="text-gray-700 font-medium mb-2 block"
                        >
                          Điều khoản dịch vụ
                        </Label>
                        <Textarea
                          id="termsOfService"
                          value={regulations.termsOfService}
                          onChange={(e) =>
                            setRegulations({
                              ...regulations,
                              termsOfService: e.target.value,
                            })
                          }
                          className="border-gray-200 focus:border-indigo-400 focus:ring-indigo-400 rounded-xl"
                          rows={6}
                          placeholder="Nhập điều khoản dịch vụ..."
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="privacyPolicy"
                          className="text-gray-700 font-medium mb-2 block"
                        >
                          Chính sách bảo mật
                        </Label>
                        <Textarea
                          id="privacyPolicy"
                          value={regulations.privacyPolicy}
                          onChange={(e) =>
                            setRegulations({
                              ...regulations,
                              privacyPolicy: e.target.value,
                            })
                          }
                          className="border-gray-200 focus:border-indigo-400 focus:ring-indigo-400 rounded-xl"
                          rows={6}
                          placeholder="Nhập chính sách bảo mật..."
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="communityGuidelines"
                          className="text-gray-700 font-medium mb-2 block"
                        >
                          Hướng dẫn cộng đồng
                        </Label>
                        <Textarea
                          id="communityGuidelines"
                          value={regulations.communityGuidelines}
                          onChange={(e) =>
                            setRegulations({
                              ...regulations,
                              communityGuidelines: e.target.value,
                            })
                          }
                          className="border-gray-200 focus:border-indigo-400 focus:ring-indigo-400 rounded-xl"
                          rows={6}
                          placeholder="Nhập hướng dẫn cộng đồng..."
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Help & Support */}
                {activeSection === "help" && (
                  <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl overflow-hidden">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-1"></div>
                    <CardHeader className="pb-4">
                      <CardTitle className="flex items-center gap-3 text-xl font-semibold text-gray-800">
                        <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg">
                          <HelpCircle className="w-5 h-5 text-white" />
                        </div>
                        Trợ giúp & Hỗ trợ
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                      <div>
                        <Label
                          htmlFor="userGuide"
                          className="text-gray-700 font-medium mb-2 block"
                        >
                          Hướng dẫn sử dụng
                        </Label>
                        <Textarea
                          id="userGuide"
                          value={helpSupport.userGuide}
                          onChange={(e) =>
                            setHelpSupport({
                              ...helpSupport,
                              userGuide: e.target.value,
                            })
                          }
                          className="border-gray-200 focus:border-indigo-400 focus:ring-indigo-400 rounded-xl"
                          rows={6}
                          placeholder="Nhập hướng dẫn sử dụng..."
                        />
                      </div>

                      <div>
                        <Label
                          htmlFor="faq"
                          className="text-gray-700 font-medium mb-2 block"
                        >
                          Câu hỏi thường gặp (FAQ)
                        </Label>
                        <Textarea
                          id="faq"
                          value={helpSupport.faq}
                          onChange={(e) =>
                            setHelpSupport({
                              ...helpSupport,
                              faq: e.target.value,
                            })
                          }
                          className="border-gray-200 focus:border-indigo-400 focus:ring-indigo-400 rounded-xl"
                          rows={6}
                          placeholder="Nhập câu hỏi thường gặp..."
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <Label
                            htmlFor="contactEmail"
                            className="text-gray-700 font-medium mb-2 block"
                          >
                            Email hỗ trợ
                          </Label>
                          <div className="relative">
                            <MailIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              id="contactEmail"
                              value={helpSupport.contactEmail}
                              onChange={(e) =>
                                setHelpSupport({
                                  ...helpSupport,
                                  contactEmail: e.target.value,
                                })
                              }
                              className="border-gray-200 focus:border-indigo-400 focus:ring-indigo-400 rounded-xl h-12 pl-10"
                              placeholder="support@example.com"
                            />
                          </div>
                        </div>

                        <div>
                          <Label
                            htmlFor="contactPhone"
                            className="text-gray-700 font-medium mb-2 block"
                          >
                            Số điện thoại hỗ trợ
                          </Label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <Input
                              id="contactPhone"
                              value={helpSupport.contactPhone}
                              onChange={(e) =>
                                setHelpSupport({
                                  ...helpSupport,
                                  contactPhone: e.target.value,
                                })
                              }
                              className="border-gray-200 focus:border-indigo-400 focus:ring-indigo-400 rounded-xl h-12 pl-10"
                              placeholder="+84 123 456 789"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <Label
                          htmlFor="supportHours"
                          className="text-gray-700 font-medium mb-2 block"
                        >
                          Thời gian hỗ trợ
                        </Label>
                        <Input
                          id="supportHours"
                          value={helpSupport.supportHours}
                          onChange={(e) =>
                            setHelpSupport({
                              ...helpSupport,
                              supportHours: e.target.value,
                            })
                          }
                          className="border-gray-200 focus:border-indigo-400 focus:ring-indigo-400 rounded-xl h-12"
                          placeholder="Thứ Hai - Thứ Sáu: 8:00 - 17:00"
                        />
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
