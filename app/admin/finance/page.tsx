"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Plus,
  Edit2,
  Trash2,
  Wallet,
  TrendingUp,
  TrendingDown,
  DollarSign,
  PiggyBank,
  Target,
  Home,
  Car,
  ShoppingCart,
  Coffee,
  Book,
  Heart,
  Gift,
  Plane,
  Settings,
  ArrowLeft,
  Save,
  X,
  Users,
  FileText,
} from "lucide-react";
import Link from "next/link";
import {
  FinanceJar,
  CreateFinanceJarRequest,
  UpdateFinanceJarRequest,
  FinanceOverview,
  getFinanceJars,
  createFinanceJar,
  updateFinanceJar,
  deleteFinanceJar,
  getFinanceOverview,
} from "@/lib/finance-service";
import { getUser, updateUserIncome } from "@/lib/user-service";
import { FINANCE_CATEGORIES } from "./financeCategories";

// Predefined jar templates
const jarTemplates = [
  {
    name: "Cần thiết",
    description: "Chi phí sinh hoạt hàng ngày (ăn uống, nhà ở, di chuyển)",
    percentage: 55,
    color: "blue",
    icon: "Home",
    category: "Essential",
    priority: "High" as const,
  },
  {
    name: "Giải trí",
    description: "Vui chơi, giải trí, ăn uống ngoài",
    percentage: 10,
    color: "purple",
    icon: "Coffee",
    category: "Entertainment",
    priority: "Medium" as const,
  },
  {
    name: "Tiết kiệm & Đầu tư",
    description: "Dành riêng để tiết kiệm và đầu tư cho tương lai",
    percentage: 10,
    color: "green",
    icon: "PiggyBank",
    category: "Savings",
    priority: "High" as const,
  },
  {
    name: "Giáo dục",
    description: "Học tập, phát triển bản thân, sách vở",
    percentage: 10,
    color: "orange",
    icon: "Book",
    category: "Education",
    priority: "Medium" as const,
  },
  {
    name: "Cho đi",
    description: "Từ thiện, quà cáp, giúp đỡ người khác",
    percentage: 5,
    color: "pink",
    icon: "Heart",
    category: "Charity",
    priority: "Low" as const,
  },
  {
    name: "Mục tiêu lớn",
    description: "Mua nhà, xe, du lịch lớn",
    percentage: 10,
    color: "indigo",
    icon: "Target",
    category: "Goals",
    priority: "Medium" as const,
  },
];

const iconMap = {
  Home,
  Car,
  ShoppingCart,
  Coffee,
  Book,
  Heart,
  Gift,
  Plane,
  PiggyBank,
  Target,
  DollarSign,
  Wallet,
};

const colorOptions = [
  { value: "blue", label: "Xanh dương", class: "bg-blue-500" },
  { value: "green", label: "Xanh lá", class: "bg-green-500" },
  { value: "purple", label: "Tím", class: "bg-purple-500" },
  { value: "orange", label: "Cam", class: "bg-orange-500" },
  { value: "pink", label: "Hồng", class: "bg-pink-500" },
  { value: "indigo", label: "Chàm", class: "bg-indigo-500" },
];

const iconOptions = [
  { value: "Home", label: "Nhà", icon: Home },
  { value: "Car", label: "Xe", icon: Car },
  { value: "ShoppingCart", label: "Mua sắm", icon: ShoppingCart },
  { value: "Coffee", label: "Giải trí", icon: Coffee },
  { value: "Book", label: "Giáo dục", icon: Book },
  { value: "Heart", label: "Từ thiện", icon: Heart },
  { value: "Gift", label: "Quà tặng", icon: Gift },
  { value: "Plane", label: "Du lịch", icon: Plane },
  { value: "PiggyBank", label: "Tiết kiệm", icon: PiggyBank },
  { value: "Target", label: "Mục tiêu", icon: Target },
  { value: "DollarSign", label: "Tiền", icon: DollarSign },
  { value: "Wallet", label: "Ví", icon: Wallet },
];

const categoryIconMap: any = {
  Essential: Home,
  Entertainment: Coffee,
  Savings: PiggyBank,
  Education: Book,
  Charity: Heart,
  Goals: Target,
};
const categoryColorMap: any = {
  Essential: "bg-blue-100 text-blue-700",
  Entertainment: "bg-purple-100 text-purple-700",
  Savings: "bg-green-100 text-green-700",
  Education: "bg-orange-100 text-orange-700",
  Charity: "bg-pink-100 text-pink-700",
  Goals: "bg-indigo-100 text-indigo-700",
};

export default function AdminFinancePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [jars, setJars] = useState<FinanceJar[]>([]);
  const [overview, setOverview] = useState<FinanceOverview | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingJar, setEditingJar] = useState<FinanceJar | null>(null);
  const [useTemplate, setUseTemplate] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [monthlyIncome, setMonthlyIncome] = useState<number>(20000000); // Default 20M VND
  const [isEditingIncome, setIsEditingIncome] = useState(false);
  const [tempIncome, setTempIncome] = useState<number>(20000000);
  const [isUpdatingIncome, setIsUpdatingIncome] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    targetAmount: "",
    percentage: "",
    color: "blue",
    icon: "PiggyBank",
    priority: "Medium" as "High" | "Medium" | "Low",
    category: "",
  });

  useEffect(() => {
    setIsMounted(true);
    loadFinanceData();
  }, []);

  const loadFinanceData = async () => {
    try {
      setIsLoading(true);

      // Load jars, overview, and user data from API
      const [jarsData, overviewData, userData] = await Promise.all([
        getFinanceJars(),
        getFinanceOverview(),
        getUser(),
      ]);

      setJars(jarsData);
      setOverview(overviewData);

      // Set monthly income from user data
      if (userData.income) {
        setMonthlyIncome(userData.income);
        setTempIncome(userData.income);
      }
    } catch (error) {
      console.error("Error loading finance data:", error);
      // Fallback to empty data if API fails
      setJars([]);
      setOverview({
        totalIncome: 0,
        totalExpenses: 0,
        totalSavings: 0,
        jarsCount: 0,
        activeJarsCount: 0,
        totalAllocated: 0,
        remainingPercentage: 100,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateJar = async () => {
    try {
      // Calculate targetAmount based on monthly income and percentage
      const calculatedTargetAmount =
        monthlyIncome * (parseFloat(formData.percentage) / 100);

      const newJarData: CreateFinanceJarRequest = {
        name: formData.name,
        description: formData.description,
        targetAmount: calculatedTargetAmount,
        percentage: parseFloat(formData.percentage),
        color: formData.color,
        icon: formData.icon,
        priority: formData.priority,
        category: formData.category,
      };

      await createFinanceJar(newJarData);
      await loadFinanceData(); // Reload data after creation

      // Reset form
      setFormData({
        name: "",
        description: "",
        targetAmount: "",
        percentage: "",
        color: "blue",
        icon: "PiggyBank",
        priority: "Medium",
        category: "",
      });
      setShowCreateForm(false);
      setUseTemplate(false);
      setSelectedTemplate("");
    } catch (error) {
      console.error("Error creating jar:", error);
      alert("Có lỗi khi tạo hủ chi tiêu. Vui lòng thử lại.");
    }
  };

  const handleUpdateJar = async () => {
    if (!editingJar) return;

    try {
      // Calculate targetAmount based on monthly income and percentage
      const calculatedTargetAmount =
        monthlyIncome * (parseFloat(formData.percentage) / 100);

      const updateData: UpdateFinanceJarRequest = {
        name: formData.name,
        description: formData.description,
        targetAmount: calculatedTargetAmount,
        percentage: parseFloat(formData.percentage),
        color: formData.color,
        icon: formData.icon,
        priority: formData.priority,
        category: formData.category,
      };

      await updateFinanceJar(editingJar._id, updateData);
      await loadFinanceData(); // Reload data after update

      setEditingJar(null);
      setFormData({
        name: "",
        description: "",
        targetAmount: "",
        percentage: "",
        color: "blue",
        icon: "PiggyBank",
        priority: "Medium",
        category: "",
      });
    } catch (error) {
      console.error("Error updating jar:", error);
      alert("Có lỗi khi cập nhật hủ chi tiêu. Vui lòng thử lại.");
    }
  };

  const handleDeleteJar = async (jarId: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa hủ chi tiêu này?")) return;

    try {
      await deleteFinanceJar(jarId);
      await loadFinanceData(); // Reload data after deletion
    } catch (error) {
      console.error("Error deleting jar:", error);
      alert("Có lỗi khi xóa hủ chi tiêu. Vui lòng thử lại.");
    }
  };

  const handleTemplateSelect = (templateIndex: string) => {
    const template = jarTemplates[parseInt(templateIndex)];
    if (template) {
      const calculatedTargetAmount =
        monthlyIncome * (template.percentage / 100);
      setFormData({
        name: template.name,
        description: template.description,
        targetAmount: calculatedTargetAmount.toString(),
        percentage: template.percentage.toString(),
        color: template.color,
        icon: template.icon,
        priority: template.priority,
        category: template.category,
      });
      setSelectedTemplate(templateIndex);
    }
  };

  const calculateTargetAmount = (percentage: string) => {
    if (!percentage) return 0;
    return monthlyIncome * (parseFloat(percentage) / 100);
  };

  const handlePercentageChange = (percentage: string) => {
    const calculatedTargetAmount = calculateTargetAmount(percentage);
    setFormData((prev) => ({
      ...prev,
      percentage,
      targetAmount: calculatedTargetAmount.toString(),
    }));
  };

  const getTotalPercentage = () => {
    return jars.reduce((total, jar) => total + jar.percentage, 0);
  };

  const getRemainingPercentage = () => {
    const currentTotal = getTotalPercentage();
    const currentJarPercentage = editingJar ? editingJar.percentage : 0;
    return 100 - currentTotal + currentJarPercentage;
  };

  const isPercentageValid = (newPercentage: number) => {
    const currentTotal = getTotalPercentage();
    const currentJarPercentage = editingJar ? editingJar.percentage : 0;
    const remainingAfterUpdate =
      100 - currentTotal + currentJarPercentage - newPercentage;
    return remainingAfterUpdate >= 0;
  };

  const handleCreateFromTemplate = async () => {
    try {
      // Create all template jars with calculated targetAmount
      const promises = jarTemplates.map((template) =>
        createFinanceJar({
          name: template.name,
          description: template.description,
          targetAmount: monthlyIncome * (template.percentage / 100),
          percentage: template.percentage,
          color: template.color,
          icon: template.icon,
          priority: template.priority,
          category: template.category,
        })
      );

      await Promise.all(promises);
      await loadFinanceData(); // Reload data after creation

      alert("Đã tạo thành công các hủ chi tiêu từ template!");
    } catch (error) {
      console.error("Error creating jars from template:", error);
      alert("Có lỗi khi tạo hủ chi tiêu từ template. Vui lòng thử lại.");
    }
  };

  const handleUpdateIncome = async () => {
    try {
      setIsUpdatingIncome(true);
      await updateUserIncome(tempIncome);
      setMonthlyIncome(tempIncome);
      setIsEditingIncome(false);
    } catch (error) {
      console.error("Error updating income:", error);
      alert("Có lỗi khi cập nhật lương tháng. Vui lòng thử lại.");
    } finally {
      setIsUpdatingIncome(false);
    }
  };

  const handleCancelEditIncome = () => {
    setTempIncome(monthlyIncome);
    setIsEditingIncome(false);
  };

  const startEdit = (jar: FinanceJar) => {
    setEditingJar(jar);
    setFormData({
      name: jar.name,
      description: jar.description,
      targetAmount: jar.targetAmount.toString(),
      percentage: jar.percentage.toString(),
      color: jar.color,
      icon: jar.icon,
      priority: jar.priority,
      category: jar.category,
    });
  };

  const renderIcon = (iconName: string, className: string = "w-5 h-5") => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap];
    return IconComponent ? (
      <IconComponent className={className} />
    ) : (
      <PiggyBank className={className} />
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="h-32 bg-white/80 rounded-xl shadow-lg"
                ></div>
              ))}
            </div>
            <div className="h-96 bg-white/80 rounded-2xl shadow-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-lg rounded-2xl">
            <CardContent className="p-12 text-center">
              <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">
                Đang tải dữ liệu tài chính...
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
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

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Wallet className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Quản lý Tài chính
                </h1>
                <p className="text-gray-600 mt-1">
                  Quản lý các hủ chi tiêu và ngân sách tháng
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/admin/finance/report">
                <Button
                  variant="outline"
                  className="bg-purple-600 hover:bg-purple-700 text-white border-purple-600 px-4 py-2 rounded-xl"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Báo cáo
                </Button>
              </Link>
              <Button
                onClick={handleCreateFromTemplate}
                variant="outline"
                className="bg-green-600 hover:bg-green-700 text-white border-green-600 px-4 py-2 rounded-xl"
              >
                <Settings className="w-4 h-4 mr-2" />
                Template
              </Button>
              <Button
                onClick={() => setShowCreateForm(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                <Plus className="w-4 h-4 mr-2" />
                Thêm Hủ
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        {overview && (
          <div className="mb-8">
            {/* Main Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Monthly Income Card - Enhanced with Edit Feature */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-1"></div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center">
                        <DollarSign className="w-7 h-7 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                          Thu nhập tháng
                        </p>
                      </div>
                    </div>
                    {!isEditingIncome && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsEditingIncome(true)}
                        className="h-9 w-9 p-0 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-xl"
                      >
                        <Edit2 className="w-4 h-4" />
                      </Button>
                    )}
                  </div>

                  {!isEditingIncome ? (
                    <div>
                      <p className="text-3xl font-bold text-gray-900 mb-2">
                        {formatCurrency(monthlyIncome)}
                      </p>
                      <p className="text-sm text-gray-500 font-medium">
                        Nhấn biểu tượng để chỉnh sửa
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Input
                        type="number"
                        value={tempIncome}
                        onChange={(e) =>
                          setTempIncome(parseFloat(e.target.value) || 0)
                        }
                        className="w-full border-gray-200 focus:border-green-400 rounded-xl h-12"
                        placeholder="20,000,000"
                      />
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={handleUpdateIncome}
                          disabled={isUpdatingIncome}
                          className="flex-1 h-9 bg-green-600 hover:bg-green-700 text-white rounded-xl"
                        >
                          {isUpdatingIncome ? (
                            <>
                              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin mr-1" />
                              Lưu...
                            </>
                          ) : (
                            <>
                              <Save className="w-3 h-3 mr-1" />
                              Lưu
                            </>
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleCancelEditIncome}
                          disabled={isUpdatingIncome}
                          className="h-9 px-3 border-gray-200 hover:bg-gray-50 rounded-xl"
                        >
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Total Expenses */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-red-500 to-rose-600 h-1"></div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 bg-red-100 rounded-2xl flex items-center justify-center">
                      <TrendingDown className="w-7 h-7 text-red-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                        Tổng chi tiêu
                      </p>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-2">
                    {formatCurrency(overview.totalExpenses)}
                  </p>
                  <p className="text-sm text-red-600 font-medium">
                    {overview.totalExpenses > 0 && monthlyIncome > 0
                      ? `${(
                          (overview.totalExpenses / monthlyIncome) *
                          100
                        ).toFixed(1)}% thu nhập`
                      : "Chưa có chi tiêu"}
                  </p>
                </CardContent>
              </Card>

              {/* Total Savings */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-600 h-1"></div>
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                      <TrendingUp className="w-7 h-7 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                        Tổng tiết kiệm
                      </p>
                    </div>
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-2">
                    {formatCurrency(overview.totalSavings)}
                  </p>
                  <p className="text-sm text-blue-600 font-medium">
                    {overview.totalSavings > 0 && monthlyIncome > 0
                      ? `${(
                          (overview.totalSavings / monthlyIncome) *
                          100
                        ).toFixed(1)}% thu nhập`
                      : "Chưa có tiết kiệm"}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Secondary Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Jar Count & Allocation Status */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-purple-500 to-violet-600 h-1"></div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center">
                        <PiggyBank className="w-7 h-7 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">
                          Quản lý hũ
                        </p>
                        <p className="text-3xl font-bold text-gray-900">
                          {jars.length}
                        </p>
                        <p className="text-sm text-purple-600 font-medium">
                          {jars.filter((jar) => jar.isActive).length} đang hoạt
                          động
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Allocation Percentage */}
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl overflow-hidden">
                <div
                  className={`h-1 ${
                    getTotalPercentage() > 100
                      ? "bg-gradient-to-r from-red-500 to-rose-600"
                      : getTotalPercentage() === 100
                      ? "bg-gradient-to-r from-green-500 to-emerald-600"
                      : "bg-gradient-to-r from-orange-500 to-amber-600"
                  }`}
                ></div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center ${
                          getTotalPercentage() > 100
                            ? "bg-red-100"
                            : getTotalPercentage() === 100
                            ? "bg-green-100"
                            : "bg-orange-100"
                        }`}
                      >
                        <Target
                          className={`w-7 h-7 ${
                            getTotalPercentage() > 100
                              ? "text-red-600"
                              : getTotalPercentage() === 100
                              ? "text-green-600"
                              : "text-orange-600"
                          }`}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide mb-1">
                          Phân bổ ngân sách
                        </p>
                        <p
                          className={`text-3xl font-bold ${
                            getTotalPercentage() === 100
                              ? "text-green-600"
                              : getTotalPercentage() > 100
                              ? "text-red-600"
                              : "text-orange-600"
                          }`}
                        >
                          {getTotalPercentage()}%
                        </p>
                        <p
                          className={`text-sm font-medium ${
                            getTotalPercentage() > 100
                              ? "text-red-600"
                              : getTotalPercentage() === 100
                              ? "text-green-600"
                              : "text-orange-600"
                          }`}
                        >
                          {getTotalPercentage() > 100
                            ? `Vượt mức ${getTotalPercentage() - 100}%`
                            : getTotalPercentage() === 100
                            ? "Phân bổ hoàn hảo!"
                            : `Còn lại ${100 - getTotalPercentage()}%`}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Jars List */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl rounded-2xl overflow-hidden">
          <CardHeader className="bg-indigo-600 text-white">
            <CardTitle className="flex items-center gap-2 text-xl py-1">
              <Wallet className="w-6 h-6" />
              <span>Danh sách Hủ Chi tiêu</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            {jars.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <PiggyBank className="w-10 h-10 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Chưa có hủ chi tiêu nào
                </h3>
                <p className="text-gray-600 mb-6">
                  Tạo hủ đầu tiên để bắt đầu quản lý tài chính
                </p>
                <Button
                  onClick={() => setShowCreateForm(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tạo Hủ Đầu tiên
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jars.map((jar) => {
                  // Map color to Tailwind color classes
                  const colorMap: Record<string, string> = {
                    blue: "bg-blue-600 bg-blue-100 text-blue-700",
                    green: "bg-green-600 bg-green-100 text-green-700",
                    purple: "bg-purple-600 bg-purple-100 text-purple-700",
                    orange: "bg-orange-600 bg-orange-100 text-orange-700",
                    pink: "bg-pink-600 bg-pink-100 text-pink-700",
                    indigo: "bg-indigo-600 bg-indigo-100 text-indigo-700",
                    default: "bg-gray-600 bg-gray-100 text-gray-700",
                  };
                  const colors = colorMap[jar.color] || colorMap.default;
                  const [solidColor, bgColor, textColor] = colors.split(" ");

                  return (
                    <Card
                      key={jar._id}
                      className="bg-white/80 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl overflow-hidden group"
                    >
                      <div className={`w-full h-1 ${solidColor}`}></div>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`p-3 ${bgColor} rounded-xl`}>
                            {renderIcon(jar.icon, `w-6 h-6 ${textColor}`)}
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg font-bold text-gray-900 mb-1">
                              {jar.name}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {jar.description}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 mb-4">
                          <Badge
                            variant={
                              jar.priority === "High"
                                ? "destructive"
                                : jar.priority === "Medium"
                                ? "default"
                                : "secondary"
                            }
                            className="text-xs"
                          >
                            {jar.priority === "High"
                              ? "Ưu tiên cao"
                              : jar.priority === "Medium"
                              ? "Ưu tiên vừa"
                              : "Ưu tiên thấp"}
                          </Badge>
                          <Badge
                            className={`text-xs ${bgColor} ${textColor} border-0`}
                          >
                            {jar.percentage}%
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {jar.category}
                          </span>
                        </div>

                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Đã tiêu dùng</span>
                            <span className="text-gray-600">Ngân sách</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="font-semibold text-gray-900">
                              {formatCurrency(jar.currentAmount)}
                            </span>
                            <span className="font-semibold text-gray-900">
                              {formatCurrency(jar.targetAmount)}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                            <div
                              className={`${solidColor} h-3 rounded-full transition-all duration-500 ease-out`}
                              style={{
                                width:
                                  jar.targetAmount > 0
                                    ? `${Math.min(
                                        (jar.currentAmount / jar.targetAmount) *
                                          100,
                                        100
                                      )}%`
                                    : "0%",
                              }}
                            ></div>
                          </div>
                          <div className="flex justify-between text-xs text-gray-500">
                            <span>
                              {jar.targetAmount > 0
                                ? `${Math.round(
                                    (-jar.currentAmount / jar.targetAmount) *
                                      100
                                  )}%`
                                : "0%"}{" "}
                              đã dùng
                            </span>
                            <span>
                              {jar.targetAmount > 0
                                ? `${formatCurrency(
                                    Math.max(
                                      0,
                                      jar.targetAmount + jar.currentAmount
                                    )
                                  )} còn lại`
                                : ""}
                            </span>
                          </div>
                        </div>

                        <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                          <Badge
                            variant={jar.isActive ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {jar.isActive ? "🟢 Hoạt động" : "⏸️ Tạm dừng"}
                          </Badge>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => startEdit(jar)}
                              className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
                              title="Chỉnh sửa"
                            >
                              <Edit2 className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteJar(jar._id)}
                              className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600"
                              title="Xóa"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Create/Edit Modal */}
        {(showCreateForm || editingJar) && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white/90 backdrop-blur-sm border-0 shadow-2xl rounded-2xl">
              <CardHeader className="bg-indigo-600 text-white rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold">
                      {editingJar ? "✏️ Chỉnh sửa Hủ" : "🆕 Tạo Hủ Chi tiêu"}
                    </CardTitle>
                    <p className="text-indigo-100 text-sm mt-1">
                      {editingJar
                        ? "Cập nhật thông tin hủ chi tiêu"
                        : "Thêm hủ chi tiêu mới vào danh sách"}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowCreateForm(false);
                      setEditingJar(null);
                      setUseTemplate(false);
                      setSelectedTemplate("");
                      setFormData({
                        name: "",
                        description: "",
                        targetAmount: "",
                        percentage: "",
                        color: "blue",
                        icon: "PiggyBank",
                        priority: "Medium",
                        category: "",
                      });
                    }}
                    className="text-white hover:bg-white hover:bg-opacity-20 rounded-xl"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-6 bg-white">
                {/* Percentage Warning */}
                {getTotalPercentage() > 85 && (
                  <div
                    className={`p-4 rounded-lg border-l-4 ${
                      getTotalPercentage() > 100
                        ? "bg-red-50 border-red-400"
                        : "bg-yellow-50 border-yellow-400"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">
                        {getTotalPercentage() > 100 ? "⚠️" : "⚡"}
                      </span>
                      <div>
                        <p
                          className={`font-medium ${
                            getTotalPercentage() > 100
                              ? "text-red-800"
                              : "text-yellow-800"
                          }`}
                        >
                          {getTotalPercentage() > 100
                            ? "Vượt quá giới hạn!"
                            : "Gần đạt giới hạn"}
                        </p>
                        <p
                          className={`text-sm ${
                            getTotalPercentage() > 100
                              ? "text-red-600"
                              : "text-yellow-600"
                          }`}
                        >
                          Tổng phần trăm hiện tại: {getTotalPercentage()}% - Còn
                          lại: {Math.max(0, getRemainingPercentage())}%
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {!editingJar && (
                  <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                    <Label className="text-lg font-semibold text-gray-800 mb-4 block">
                      🎯 Sử dụng Template
                    </Label>
                    <div className="flex items-center space-x-3 mb-4">
                      <input
                        type="checkbox"
                        checked={useTemplate}
                        onChange={(e) => setUseTemplate(e.target.checked)}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded"
                      />
                      <span className="text-gray-700">
                        Chọn từ các template có sẵn để tạo nhanh
                      </span>
                    </div>
                    {useTemplate && (
                      <Select
                        value={selectedTemplate}
                        onValueChange={handleTemplateSelect}
                      >
                        <SelectTrigger className="w-full bg-white border-gray-200 rounded-xl shadow-lg">
                          <SelectValue placeholder="🔽 Chọn template phù hợp" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200 rounded-xl shadow-lg">
                          {jarTemplates.map((template, index) => (
                            <SelectItem key={index} value={index.toString()}>
                              <div className="flex items-center space-x-3 py-2">
                                {renderIcon(template.icon, "w-5 h-5")}
                                <div>
                                  <p className="font-medium">{template.name}</p>
                                  <p className="text-sm text-gray-500">
                                    {template.percentage}% -{" "}
                                    {template.description}
                                  </p>
                                </div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                )}

                {/* Basic Info */}
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <Label className="text-lg font-semibold text-gray-800 mb-4 block">
                    📝 Thông tin cơ bản
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label
                        htmlFor="name"
                        className="font-medium text-gray-700"
                      >
                        Tên Hủ *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
                        placeholder="Ví dụ: Chi tiêu cần thiết"
                        className="h-12"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label
                        htmlFor="category"
                        className="font-medium text-gray-700"
                      >
                        Loại hũ
                      </Label>
                      <Select
                        value={formData.category}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, category: value }))
                        }
                      >
                        <SelectTrigger className="h-12 bg-white border-gray-200 rounded-xl shadow-lg">
                          <SelectValue placeholder="Chọn loại hũ" />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200 rounded-xl shadow-lg">
                          {FINANCE_CATEGORIES.map((cat) => {
                            const Icon = categoryIconMap[cat.value];
                            const colorClass = categoryColorMap[cat.value];
                            return (
                              <SelectItem key={cat.value} value={cat.value}>
                                <div
                                  className={`flex items-center space-x-3 py-2 px-2 rounded ${colorClass}`}
                                >
                                  <Icon className="w-5 h-5" />
                                  <span className="font-semibold">
                                    {cat.label}
                                  </span>
                                </div>
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3 mt-6">
                    <Label
                      htmlFor="description"
                      className="font-medium text-gray-700"
                    >
                      Mô tả chi tiết
                    </Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Mô tả chi tiết về hủ chi tiêu này..."
                      rows={4}
                      className="resize-none"
                    />
                  </div>
                </div>

                {/* Money & Percentage */}
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <Label className="text-lg font-semibold text-gray-800 mb-4 block">
                    💰 Phân bổ tài chính
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label
                        htmlFor="percentage"
                        className="font-medium text-gray-700"
                      >
                        Phần trăm (%) *
                      </Label>
                      <Input
                        id="percentage"
                        type="number"
                        value={formData.percentage}
                        onChange={(e) => {
                          const newPercentage = parseFloat(e.target.value) || 0;
                          if (isPercentageValid(newPercentage)) {
                            handlePercentageChange(e.target.value);
                          }
                        }}
                        placeholder="10"
                        min="0"
                        max={
                          getRemainingPercentage() +
                          (editingJar ? editingJar.percentage : 0)
                        }
                        className={`h-12 ${
                          !isPercentageValid(
                            parseFloat(formData.percentage) || 0
                          )
                            ? "border-red-500 bg-red-50"
                            : ""
                        }`}
                      />
                      <p className="text-sm text-gray-500">
                        Tối đa:{" "}
                        {getRemainingPercentage() +
                          (editingJar ? editingJar.percentage : 0)}
                        %
                      </p>
                    </div>

                    <div className="space-y-3">
                      <Label
                        htmlFor="targetAmount"
                        className="font-medium text-gray-700"
                      >
                        Mục tiêu (VND)
                      </Label>
                      <Input
                        id="targetAmount"
                        type="text"
                        value={
                          formData.targetAmount
                            ? formatCurrency(parseFloat(formData.targetAmount))
                            : ""
                        }
                        disabled
                        className="h-12 bg-gray-100 text-gray-600"
                      />
                      <p className="text-sm text-gray-500">
                        = {formatCurrency(monthlyIncome)} ×{" "}
                        {formData.percentage || 0}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Visual & Priority */}
                <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
                  <Label className="text-lg font-semibold text-gray-800 mb-4 block">
                    🎨 Giao diện & Ưu tiên
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <Label className="font-medium text-gray-700">
                        Màu sắc
                      </Label>
                      <Select
                        value={formData.color}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, color: value }))
                        }
                      >
                        <SelectTrigger className="h-12 bg-white border-gray-200 rounded-xl shadow-lg">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200 rounded-xl shadow-lg">
                          {colorOptions.map((color) => (
                            <SelectItem key={color.value} value={color.value}>
                              <div className="flex items-center space-x-3">
                                <div
                                  className={`w-6 h-6 rounded-full ${color.class} border-2 border-gray-300`}
                                ></div>
                                <span>{color.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label className="font-medium text-gray-700">
                        Biểu tượng
                      </Label>
                      <Select
                        value={formData.icon}
                        onValueChange={(value) =>
                          setFormData((prev) => ({ ...prev, icon: value }))
                        }
                      >
                        <SelectTrigger className="h-12 bg-white border-gray-200 rounded-xl shadow-lg">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200 rounded-xl shadow-lg">
                          {iconOptions.map((icon) => (
                            <SelectItem key={icon.value} value={icon.value}>
                              <div className="flex items-center space-x-3">
                                <icon.icon className="w-5 h-5" />
                                <span>{icon.label}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-3">
                      <Label className="font-medium text-gray-700">
                        Độ ưu tiên
                      </Label>
                      <Select
                        value={formData.priority}
                        onValueChange={(value: "High" | "Medium" | "Low") =>
                          setFormData((prev) => ({ ...prev, priority: value }))
                        }
                      >
                        <SelectTrigger className="h-12 bg-white border-gray-200 rounded-xl shadow-lg">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-white border-gray-200 rounded-xl shadow-lg">
                          <SelectItem value="High">🔴 Cao</SelectItem>
                          <SelectItem value="Medium">🟡 Trung bình</SelectItem>
                          <SelectItem value="Low">🟢 Thấp</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowCreateForm(false);
                      setEditingJar(null);
                      setUseTemplate(false);
                      setSelectedTemplate("");
                      setFormData({
                        name: "",
                        description: "",
                        targetAmount: "",
                        percentage: "",
                        color: "blue",
                        icon: "PiggyBank",
                        priority: "Medium",
                        category: "",
                      });
                    }}
                    className="px-8 py-3 rounded-xl border-gray-200 hover:bg-gray-50"
                  >
                    ❌ Hủy bỏ
                  </Button>
                  <Button
                    onClick={editingJar ? handleUpdateJar : handleCreateJar}
                    disabled={
                      !formData.name ||
                      !formData.description ||
                      !formData.percentage ||
                      !isPercentageValid(parseFloat(formData.percentage) || 0)
                    }
                    className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
                  >
                    <Save className="w-5 h-5 mr-2" />
                    {editingJar ? "💾 Cập nhật" : "✨ Tạo mới"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
