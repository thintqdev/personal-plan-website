"use client";

import { useState } from "react";
import UserLayout from "@/components/layouts/UserLayout";
import CoverManager from "@/components/CoverManager";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Settings, Image, User, Bell } from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("cover");

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
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Thông tin hồ sơ
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Tính năng đang phát triển
                  </h3>
                  <p className="text-gray-600">
                    Quản lý thông tin hồ sơ sẽ được cập nhật trong phiên bản
                    tiếp theo
                  </p>
                </div>
              </CardContent>
            </Card>
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
