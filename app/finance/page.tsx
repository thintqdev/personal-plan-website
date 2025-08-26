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
  TrendingDown,
  DollarSign,
  PiggyBank,
  ArrowLeft,
  Save,
  X,
  Filter,
  Search,
  Eye,
  Edit2,
  Trash2,
  Clock,
  CalendarDays,
  Camera,
  Target,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  FinanceJar,
  Transaction,
  CreateTransactionRequest,
  User,
  getFinanceJars,
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
  getUser,
} from "@/lib/service";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";
import { ConfirmDialog } from "@/components/ConfirmDialog";

// Icon mapping cho các jars
const iconMap = {
  Home: () => <span>🏠</span>,
  Car: () => <span>🚗</span>,
  ShoppingCart: () => <span>🛒</span>,
  Coffee: () => <span>☕</span>,
  Book: () => <span>📚</span>,
  Heart: () => <span>❤️</span>,
  Gift: () => <span>🎁</span>,
  Plane: () => <span>✈️</span>,
  PiggyBank: () => <span>🐷</span>,
  Target: () => <span>🎯</span>,
  DollarSign: () => <span>💰</span>,
  Wallet: () => <span>👛</span>,
};

export default function FinancePage() {
  const [isMounted, setIsMounted] = useState(false);
  const [jars, setJars] = useState<FinanceJar[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);
  const [selectedJarFilter, setSelectedJarFilter] = useState<string>("all");
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().toISOString().slice(0, 7)
  ); // YYYY-MM format

  // Cover image and user states
  const [coverImage, setCoverImage] = useState<string>(
    "/soft-pink-abstract-pattern-for-personal-planning.png"
  );
  const [user, setUser] = useState<User | null>(null);

  // Dialog hook for beautiful alerts
  const { isOpen, config, showConfirm, handleConfirm, handleCancel } =
    useConfirmDialog();

  // Form states
  const [formData, setFormData] = useState({
    jarId: "",
    amount: "",
    description: "",
    category: "",
  });

  useEffect(() => {
    setIsMounted(true);
    loadData();
  }, []);

  useEffect(() => {
    if (isMounted) {
      loadTransactions();
    }
  }, [selectedJarFilter, selectedMonth, isMounted]);

  // Cover image options
  const coverImages = [
    "/soft-pink-abstract-pattern-for-personal-planning.png",
    "/mountain-peak-sunrise-motivation-success.png",
    "/person-climbing-stairs-to-success.png",
    "/runner-crossing-finish-line-victory.png",
    "/lighthouse-guiding-ships-motivation.png",
    "/eagle-soaring-high-mountains-freedom.png",
    "/peaceful-pink-sunset-landscape.png",
  ];

  const changeCoverImage = () => {
    const randomIndex = Math.floor(Math.random() * coverImages.length);
    const newImage = coverImages[randomIndex];
    setCoverImage(newImage);
  };

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [jarsData, userData] = await Promise.all([
        getFinanceJars(),
        getUser(),
      ]);
      setJars(jarsData.filter((jar) => jar.isActive !== false));
      setUser(userData);

      // Load transactions with current filters
      await loadTransactions();
    } catch (error) {
      console.error("Error loading data:", error);
      setJars([]);
      setTransactions([]);
      // Set default user if API fails
      setUser({
        _id: "default",
        name: "Người dùng",
        role: "user",
        goal: "",
        streak: 0,
        avatar: "/friendly-person-avatar.png",
        __v: 0,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const reloadAll = async () => {
    // Reload jars first, then transactions with filters
    try {
      const jarsData = await getFinanceJars();
      setJars(jarsData.filter((jar) => jar.isActive !== false));
      await loadTransactions();
    } catch (error) {
      console.error("Error reloading data:", error);
    }
  };

  const loadTransactions = async () => {
    try {
      const jarId = selectedJarFilter === "all" ? undefined : selectedJarFilter;
      const data = await getTransactions(jarId);

      // Filter by month
      const filteredData = data.filter((transaction) => {
        const transactionMonth = new Date(transaction.date)
          .toISOString()
          .slice(0, 7);
        return transactionMonth === selectedMonth;
      });

      setTransactions(filteredData);
    } catch (error) {
      console.error("Error loading transactions:", error);
      setTransactions([]);
    }
  };

  const handleAddTransaction = async () => {
    try {
      if (!formData.jarId || !formData.amount || !formData.description) {
        await showConfirm({
          title: "Thông tin chưa đầy đủ",
          description: "Vui lòng điền đầy đủ thông tin!",
          confirmText: "OK",
          variant: "warning",
        });
        return;
      }

      // Kiểm tra cảnh báo vượt ngân sách
      const selectedJar = jars.find((jar) => jar._id === formData.jarId);
      if (selectedJar) {
        const currentSpent = Math.abs(selectedJar.currentAmount);
        const newAmount = parseFloat(formData.amount);
        const totalAfterSpending = currentSpent + newAmount;
        const percentage =
          (totalAfterSpending / selectedJar.targetAmount) * 100;

        if (percentage >= 90) {
          const title =
            percentage >= 100 ? "⚠️ Vượt ngân sách!" : "⚠️ Sắp hết ngân sách!";
          const description =
            percentage >= 100
              ? `Hủ "${selectedJar.name}" sẽ vượt ${formatCurrency(
                  totalAfterSpending - selectedJar.targetAmount
                )} so với ngân sách ${formatCurrency(
                  selectedJar.targetAmount
                )}.\n\nBạn có chắc chắn muốn tiếp tục?`
              : `Hủ "${selectedJar.name}" sẽ sử dụng ${Math.round(
                  percentage
                )}% ngân sách (${formatCurrency(
                  totalAfterSpending
                )}/${formatCurrency(
                  selectedJar.targetAmount
                )}).\n\nBạn có muốn tiếp tục?`;

          const shouldContinue = await showConfirm({
            title,
            description,
            confirmText: "Tiếp tục",
            cancelText: "Hủy bỏ",
            variant: percentage >= 100 ? "destructive" : "warning",
          });

          if (!shouldContinue) {
            return;
          }
        }
      }

      const newTransaction: CreateTransactionRequest = {
        jarId: formData.jarId,
        amount: parseFloat(formData.amount),
        type: "expense",
        description: formData.description,
        category: formData.category || "General",
        date: new Date().toISOString(),
      };

      await createTransaction(newTransaction);
      await reloadAll(); // Reload cả jars và transactions

      // Reset form
      setFormData({
        jarId: "",
        amount: "",
        description: "",
        category: "",
      });
      setShowAddForm(false);
    } catch (error) {
      console.error("Error adding transaction:", error);
      alert("Có lỗi khi thêm giao dịch. Vui lòng thử lại.");
    }
  };

  const handleUpdateTransaction = async () => {
    try {
      if (!editingTransaction || !formData.amount || !formData.description) {
        await showConfirm({
          title: "Thông tin chưa đầy đủ",
          description: "Vui lòng điền đầy đủ thông tin!",
          confirmText: "OK",
          variant: "warning",
        });
        return;
      }

      // Kiểm tra cảnh báo vượt ngân sách khi update
      const jarIdValue =
        typeof editingTransaction.jarId === "string"
          ? editingTransaction.jarId
          : editingTransaction.jarId._id;

      const selectedJar = jars.find((jar) => jar._id === jarIdValue);
      if (selectedJar) {
        const currentSpent = Math.abs(selectedJar.currentAmount);
        const oldAmount = editingTransaction.amount;
        const newAmount = parseFloat(formData.amount);
        const difference = newAmount - oldAmount;
        const totalAfterUpdate = currentSpent + difference;
        const percentage = (totalAfterUpdate / selectedJar.targetAmount) * 100;

        if (percentage >= 90 && difference > 0) {
          const title =
            percentage >= 100 ? "⚠️ Vượt ngân sách!" : "⚠️ Sắp hết ngân sách!";
          const description =
            percentage >= 100
              ? `Sau cập nhật, hủ "${
                  selectedJar.name
                }" sẽ vượt ${formatCurrency(
                  totalAfterUpdate - selectedJar.targetAmount
                )} so với ngân sách.\n\nTừ ${formatCurrency(
                  oldAmount
                )} → ${formatCurrency(
                  newAmount
                )}\n\nBạn có chắc chắn muốn cập nhật?`
              : `Sau cập nhật, hủ "${selectedJar.name}" sẽ sử dụng ${Math.round(
                  percentage
                )}% ngân sách.\n\nTừ ${formatCurrency(
                  oldAmount
                )} → ${formatCurrency(newAmount)}\n\nBạn có muốn cập nhật?`;

          const shouldContinue = await showConfirm({
            title,
            description,
            confirmText: "Cập nhật",
            cancelText: "Hủy bỏ",
            variant: percentage >= 100 ? "destructive" : "warning",
          });

          if (!shouldContinue) {
            return;
          }
        }
      }

      await updateTransaction(editingTransaction._id, {
        amount: parseFloat(formData.amount),
        description: formData.description,
        category: formData.category || "General",
      });

      await reloadAll(); // Reload cả jars và transactions
      setEditingTransaction(null);
      setShowAddForm(false);
    } catch (error) {
      console.error("Error updating transaction:", error);
      alert("Có lỗi khi cập nhật giao dịch. Vui lòng thử lại.");
    }
  };

  const handleDeleteTransaction = async (transactionId: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa giao dịch này?")) return;

    try {
      await deleteTransaction(transactionId);
      await reloadAll(); // Reload cả jars và transactions
    } catch (error) {
      console.error("Error deleting transaction:", error);
      alert("Có lỗi khi xóa giao dịch. Vui lòng thử lại.");
    }
  };

  const startEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    // Handle both string and object jarId
    const jarIdValue =
      typeof transaction.jarId === "string"
        ? transaction.jarId
        : transaction.jarId._id;

    setFormData({
      jarId: jarIdValue,
      amount: transaction.amount.toString(),
      description: transaction.description,
      category: transaction.category,
    });
    setShowAddForm(true);
  };

  const getJarInfo = (transaction: Transaction) => {
    // If jarId is an object (populated), use it directly
    if (typeof transaction.jarId === "object") {
      return {
        _id: transaction.jarId._id,
        name: transaction.jarId.name,
        color: transaction.jarId.color,
        icon: transaction.jarId.icon,
      };
    }

    // If jarId is a string, find the jar in our jars array
    const jar = jars.find((jar) => jar._id === transaction.jarId);
    return jar
      ? {
          _id: jar._id,
          name: jar.name,
          color: jar.color,
          icon: jar.icon,
        }
      : null;
  };

  const getJarById = (jarId: string) => {
    return jars.find((jar) => jar._id === jarId);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const renderIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap];
    return IconComponent ? IconComponent() : <span>💰</span>;
  };

  const getTotalExpenses = () => {
    return transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getMonthOptions = () => {
    const options = [];
    const currentDate = new Date();

    for (let i = 0; i < 12; i++) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i,
        1
      );
      const value = date.toISOString().slice(0, 7);
      const label = date.toLocaleDateString("vi-VN", {
        month: "long",
        year: "numeric",
      });
      options.push({ value, label });
    }

    return options;
  };

  const getOverspentJarsCount = () => {
    return jars.filter((jar) => {
      const spent = Math.abs(jar.currentAmount);
      return spent > jar.targetAmount;
    }).length;
  };

  const getJarStatus = (jar: FinanceJar) => {
    const spent = Math.abs(jar.currentAmount); // Giá trị tuyệt đối của currentAmount
    const remaining = jar.targetAmount - spent;

    if (spent > jar.targetAmount) {
      // Vượt chi: đã chi > ngân sách
      const overspent = spent - jar.targetAmount;
      return {
        status: "overspent",
        message: `Vượt chi ${formatCurrency(overspent)}`,
        color: "red",
        spentAmount: spent,
        remainingAmount: remaining,
      };
    } else if (spent === jar.targetAmount) {
      // Đã hết ngân sách
      return {
        status: "empty",
        message: "Đã hết ngân sách",
        color: "orange",
        spentAmount: spent,
        remainingAmount: remaining,
      };
    } else {
      // Còn ngân sách
      return {
        status: "good",
        message: `Còn lại ${formatCurrency(remaining)}`,
        color: "green",
        spentAmount: spent,
        remainingAmount: remaining,
      };
    }
  };

  if (!isMounted) {
    return <div>Loading...</div>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Cover Image Section */}
      <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden">
        <img
          src={coverImage || "/placeholder.svg"}
          alt="Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40" />

        <Button
          variant="secondary"
          size="sm"
          className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
          onClick={changeCoverImage}
        >
          <Camera className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">Đổi ảnh bìa</span>
          <span className="sm:hidden">Đổi ảnh</span>
        </Button>

        {/* Cover Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-lg">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-lg">
                    Quản Lý Chi Tiêu
                  </h1>
                  <p className="text-white/90 text-lg drop-shadow">
                    Theo dõi và kiểm soát ngân sách cá nhân
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Link href="/admin">
                  <Button className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">Quay lại</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6 space-y-6">
        {/* Quick Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-900 mb-1">
                {jars.length}
              </div>
              <div className="text-sm text-gray-600">Tổng số hủ</div>
            </CardContent>
          </Card>
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {
                  jars.filter((jar) => {
                    const spent = Math.abs(jar.currentAmount);
                    const percentage = (spent / jar.targetAmount) * 100;
                    return percentage < 90;
                  }).length
                }
              </div>
              <div className="text-sm text-gray-600">An toàn</div>
            </CardContent>
          </Card>
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600 mb-1">
                {
                  jars.filter((jar) => {
                    const spent = Math.abs(jar.currentAmount);
                    const percentage = (spent / jar.targetAmount) * 100;
                    return percentage >= 90 && percentage < 100;
                  }).length
                }
              </div>
              <div className="text-sm text-gray-600">Cảnh báo</div>
            </CardContent>
          </Card>
          <Card className="bg-white border border-gray-200">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-red-600 mb-1">
                {
                  jars.filter((jar) => {
                    const spent = Math.abs(jar.currentAmount);
                    const percentage = (spent / jar.targetAmount) * 100;
                    return percentage >= 100;
                  }).length
                }
              </div>
              <div className="text-sm text-gray-600">Vượt ngân sách</div>
            </CardContent>
          </Card>
        </div>

        {/* User Profile Card */}
        <Card className="bg-white border border-gray-200">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Avatar className="w-16 h-16">
                <AvatarImage
                  src={user?.avatar || "/friendly-person-avatar.png"}
                  alt={user?.name || "User"}
                />
                <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900">
                  {user?.name || "Người dùng"}
                </h3>
                <p className="text-gray-600">{user?.role || "Người dùng"}</p>
                <div className="flex items-center gap-2 mt-2">
                  <Badge
                    variant="outline"
                    className="text-blue-600 border-blue-200"
                  >
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date().toLocaleDateString("vi-VN", {
                      month: "long",
                      year: "numeric",
                    })}
                  </Badge>
                  <Badge
                    variant="outline"
                    className="text-green-600 border-green-200"
                  >
                    <PiggyBank className="w-3 h-3 mr-1" />
                    {transactions.length} giao dịch
                  </Badge>
                </div>
              </div>
              <Button
                onClick={() => {
                  setShowAddForm(true);
                  setEditingTransaction(null);
                  setFormData({
                    jarId: "",
                    amount: "",
                    description: "",
                    category: "",
                  });
                }}
                className="bg-purple-600 hover:bg-purple-700 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Thêm chi tiêu
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-red-500 rounded-lg">
                  <TrendingDown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-red-700 font-medium">
                    Chi tiêu tháng này
                  </p>
                  <p className="text-xl font-bold text-red-800">
                    {formatCurrency(getTotalExpenses())}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-500 rounded-lg">
                  <PiggyBank className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-blue-700 font-medium">
                    Số hủ đang sử dụng
                  </p>
                  <p className="text-xl font-bold text-blue-800">
                    {jars.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-purple-500 rounded-lg">
                  <CalendarDays className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-purple-700 font-medium">
                    Giao dịch tháng này
                  </p>
                  <p className="text-xl font-bold text-purple-800">
                    {transactions.length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card
            className={`bg-gradient-to-br ${
              getOverspentJarsCount() > 0
                ? "from-orange-50 to-orange-100 border-orange-200"
                : "from-green-50 to-green-100 border-green-200"
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div
                  className={`p-2 rounded-lg ${
                    getOverspentJarsCount() > 0
                      ? "bg-orange-500"
                      : "bg-green-500"
                  }`}
                >
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p
                    className={`text-sm font-medium ${
                      getOverspentJarsCount() > 0
                        ? "text-orange-700"
                        : "text-green-700"
                    }`}
                  >
                    {getOverspentJarsCount() > 0 ? "Hủ vượt chi" : "Tình trạng"}
                  </p>
                  <p
                    className={`text-xl font-bold ${
                      getOverspentJarsCount() > 0
                        ? "text-orange-800"
                        : "text-green-800"
                    }`}
                  >
                    {getOverspentJarsCount() > 0
                      ? `${getOverspentJarsCount()} hủ`
                      : "Ổn định"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Jar Status Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PiggyBank className="w-5 h-5" />
              <span>Tình trạng các Hủ Chi tiêu</span>
            </CardTitle>
            <p className="text-sm text-gray-600 mt-1">
              Theo dõi ngân sách và chi tiêu thực tế của từng hủ trong tháng
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {jars.map((jar) => {
                const status = getJarStatus(jar);
                return (
                  <div
                    key={jar._id}
                    className={`p-4 rounded-lg border-2 transition-all hover:shadow-md ${
                      status.color === "red"
                        ? "border-red-200 bg-red-50"
                        : status.color === "orange"
                        ? "border-orange-200 bg-orange-50"
                        : "border-green-200 bg-green-50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className={`p-2 rounded-lg bg-${jar.color}-100`}>
                          {renderIcon(jar.icon)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">
                            {jar.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {jar.percentage}% ngân sách
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Ngân sách:</span>
                        <span className="font-medium">
                          {formatCurrency(jar.targetAmount)}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Đã chi:</span>
                        <span className="font-medium text-red-600">
                          {formatCurrency(status.spentAmount)}
                        </span>
                      </div>

                      <div
                        className={`flex justify-between text-sm font-semibold ${
                          status.color === "red"
                            ? "text-red-600"
                            : status.color === "orange"
                            ? "text-orange-600"
                            : "text-green-600"
                        }`}
                      >
                        <span>Tình trạng:</span>
                        <span>{status.message}</span>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all ${
                              status.color === "red"
                                ? "bg-red-500"
                                : status.color === "orange"
                                ? "bg-orange-500"
                                : "bg-green-500"
                            }`}
                            style={{
                              width: `${Math.min(
                                100,
                                Math.max(
                                  0,
                                  (status.spentAmount / jar.targetAmount) * 100
                                )
                              )}%`,
                            }}
                          ></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 text-center">
                          {Math.round(
                            (status.spentAmount / jar.targetAmount) * 100
                          )}
                          % đã sử dụng
                          {status.spentAmount > jar.targetAmount && (
                            <span className="text-red-500 font-semibold">
                              {" "}
                              (Vượt{" "}
                              {Math.round(
                                ((status.spentAmount - jar.targetAmount) /
                                  jar.targetAmount) *
                                  100
                              )}
                              %)
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Transactions List */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Lịch sử Chi tiêu</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 ? (
              <div className="text-center py-8">
                <PiggyBank className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500">
                  Chưa có giao dịch nào trong tháng này
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {transactions.map((transaction) => {
                  const jarInfo = getJarInfo(transaction);
                  return (
                    <div
                      key={transaction._id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex items-center space-x-4">
                        <div
                          className={`p-2 rounded-lg bg-${
                            jarInfo?.color || "gray"
                          }-100`}
                        >
                          {jarInfo ? renderIcon(jarInfo.icon) : <span>💰</span>}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium text-gray-900">
                              {transaction.description}
                            </h3>
                            <Badge variant="secondary" className="text-xs">
                              {jarInfo?.name || "Unknown Jar"}
                            </Badge>
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                            <span>{transaction.category}</span>
                            <span>•</span>
                            <span>{formatDate(transaction.date)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-semibold text-red-600">
                            -{formatCurrency(transaction.amount)}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => startEdit(transaction)}
                            className="h-8 w-8 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-100"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                              handleDeleteTransaction(transaction._id)
                            }
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-800 hover:bg-red-100"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Add/Edit Transaction Modal */}
        {showAddForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md bg-white">
              <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl">
                      {editingTransaction
                        ? "✏️ Sửa Chi tiêu"
                        : "💰 Thêm Chi tiêu"}
                    </CardTitle>
                    <p className="text-purple-100 text-sm mt-1">
                      {editingTransaction
                        ? "Cập nhật thông tin chi tiêu"
                        : "Ghi lại khoản chi tiêu mới"}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingTransaction(null);
                    }}
                    className="text-white hover:bg-purple-600"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div>
                  <Label htmlFor="jar-select">Chọn hủ chi tiêu *</Label>
                  <Select
                    value={formData.jarId}
                    onValueChange={(value) =>
                      setFormData((prev) => ({ ...prev, jarId: value }))
                    }
                    disabled={!!editingTransaction}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn hủ để chi tiêu" />
                    </SelectTrigger>
                    <SelectContent>
                      {jars.map((jar) => (
                        <SelectItem key={jar._id} value={jar._id}>
                          <div className="flex items-center space-x-2">
                            {renderIcon(jar.icon)}
                            <span>{jar.name}</span>
                            <Badge variant="outline" className="ml-2">
                              {jar.percentage}%
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="amount">Số tiền *</Label>
                  <Input
                    id="amount"
                    type="number"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        amount: e.target.value,
                      }))
                    }
                    placeholder="Nhập số tiền đã chi"
                    className="text-lg"
                  />
                </div>

                <div>
                  <Label htmlFor="description">Mục đích chi tiêu *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Mô tả chi tiết về khoản chi tiêu này..."
                    rows={3}
                    className="resize-none"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Danh mục</Label>
                  <Input
                    id="category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    placeholder="Ví dụ: Ăn uống, Đi lại, Giải trí..."
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    onClick={
                      editingTransaction
                        ? handleUpdateTransaction
                        : handleAddTransaction
                    }
                    className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {editingTransaction ? "Cập nhật" : "Thêm Chi tiêu"}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowAddForm(false);
                      setEditingTransaction(null);
                    }}
                    className="flex-1"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Hủy
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Beautiful confirmation dialog */}
      <ConfirmDialog
        open={isOpen}
        config={config}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
}
