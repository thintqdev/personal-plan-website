"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import UserLayout from "@/components/layouts/UserLayout";
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
  Wallet,
  Bot,
  Sparkles,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  FinanceJar,
  Transaction,
  CreateTransactionRequest,
  TransactionFilters,
  TransactionResponse,
  PaginationInfo,
  getFinanceJars,
  getTransactionsWithPagination,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "@/lib/finance-service";
import { User, getUser } from "@/lib/user-service";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import AIExpenseChat from "@/components/AIExpenseChat";
import { AIExpenseParseResult } from "@/lib/ai-expense-service";
import {
  EXPENSE_CATEGORIES,
  getCategoriesByGroup,
  getCategoryLabel,
} from "@/constants/expense-categories";

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
  const [monthlyStats, setMonthlyStats] = useState({
    totalExpenses: 0,
    totalTransactions: 0,
  });
  const [paginationInfo, setPaginationInfo] = useState<PaginationInfo>({
    currentPage: 1,
    totalPages: 1,
    totalCount: 0,
    limit: 10,
    hasNextPage: false,
    hasPrevPage: false,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTransaction, setEditingTransaction] =
    useState<Transaction | null>(null);
  const [selectedJarFilter, setSelectedJarFilter] = useState<string>("all");
  const [selectedMonth, setSelectedMonth] = useState<string>(
    new Date().toISOString().slice(0, 7)
  ); // YYYY-MM format
  const [showAIChat, setShowAIChat] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Pagination and filtering states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [dateFilter, setDateFilter] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

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
      Promise.all([loadTransactions(), loadMonthlyStats()]);
      setCurrentPage(1); // Reset page when filters change
    }
  }, [
    selectedJarFilter,
    selectedMonth,
    dateFilter,
    searchTerm,
    selectedCategory,
    isMounted,
  ]);

  useEffect(() => {
    if (isMounted) {
      loadTransactions();
    }
  }, [currentPage, isMounted]);

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
      setJars(jarsData.filter((jar) => jar.isActive));
      setUser(userData);

      // Load transactions and monthly stats
      await Promise.all([loadTransactions(), loadMonthlyStats()]);
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

  const loadMonthlyStats = async () => {
    try {
      // Get all transactions for the selected month to calculate stats
      const monthStart = selectedMonth + "-01";
      const monthEnd = new Date(
        new Date(monthStart).getFullYear(),
        new Date(monthStart).getMonth() + 1,
        0
      )
        .toISOString()
        .slice(0, 10);

      const response = await getTransactionsWithPagination({
        month: selectedMonth,
        limit: 1000, // Get all for stats calculation
      });

      const totalExpenses = response.transactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);

      setMonthlyStats({
        totalExpenses,
        totalTransactions: response.pagination.totalCount,
      });
    } catch (error) {
      console.error("Error loading monthly stats:", error);
      setMonthlyStats({
        totalExpenses: 0,
        totalTransactions: 0,
      });
    }
  };

  const reloadAll = async () => {
    // Reload jars first, then transactions with filters
    try {
      const jarsData = await getFinanceJars();
      setJars(jarsData.filter((jar) => jar.isActive !== false));
      await Promise.all([loadTransactions(), loadMonthlyStats()]);
    } catch (error) {
      console.error("Error reloading data:", error);
    }
  };

  const loadTransactions = async () => {
    try {
      const filters: TransactionFilters = {
        page: currentPage,
        limit: itemsPerPage,
        month: selectedMonth,
        sortBy: "date",
        sortOrder: "desc",
      };

      // Add optional filters
      if (selectedJarFilter && selectedJarFilter !== "all") {
        filters.jarId = selectedJarFilter;
      }

      if (dateFilter) {
        filters.dateFilter = dateFilter;
      }

      if (searchTerm.trim()) {
        filters.search = searchTerm.trim();
      }

      if (selectedCategory && selectedCategory !== "all") {
        filters.category = selectedCategory;
      }

      const response: TransactionResponse = await getTransactionsWithPagination(
        filters
      );
      setTransactions(response.transactions);
      setPaginationInfo(response.pagination);
    } catch (error) {
      console.error("Error loading transactions:", error);
      setTransactions([]);
      setPaginationInfo({
        currentPage: 1,
        totalPages: 1,
        totalCount: 0,
        limit: itemsPerPage,
        hasNextPage: false,
        hasPrevPage: false,
      });
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

  const renderCategoryOptions = () => {
    const groupedCategories = getCategoriesByGroup();
    const elements: React.ReactElement[] = [];

    Object.keys(groupedCategories).forEach((groupName) => {
      // Add group header
      elements.push(
        <div
          key={`group-${groupName}`}
          className="px-2 py-1.5 text-xs font-semibold text-gray-500 bg-gray-50 border-b"
        >
          {groupName}
        </div>
      );

      // Add category options
      groupedCategories[groupName].forEach((category) => {
        elements.push(
          <SelectItem key={category.value} value={category.value}>
            {category.label}
          </SelectItem>
        );
      });
    });

    return elements;
  };

  const getTotalExpenses = () => {
    return monthlyStats.totalExpenses;
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
        message: `Ngân sách ổn định`,
        color: "green",
        spentAmount: spent,
        remainingAmount: remaining,
      };
    }
  };

  // Handle AI expense result
  const handleAIExpenseResult = (result: AIExpenseParseResult) => {
    setFormData({
      jarId: result.jarId || "",
      amount: result.amount?.toString() || "",
      description: result.description || "",
      category: result.category || "",
    });

    setShowAIChat(false);
    setShowAddForm(true);
    setEditingTransaction(null);
  };

  const clearFilters = () => {
    setDateFilter("");
    setSearchTerm("");
    setSelectedJarFilter("all");
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
    <UserLayout
      title="Quản Lý Chi Tiêu"
      description="Theo dõi và kiểm soát ngân sách cá nhân"
      icon={<Wallet className="w-8 h-8 text-white" />}
      coverImage={coverImage}
      onCoverImageChange={changeCoverImage}
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-3 sm:p-4 lg:p-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-lg">
                    <TrendingDown className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-red-800 mb-1">
                    {formatCurrency(getTotalExpenses())}
                  </div>
                  <div className="text-xs sm:text-sm text-red-600 font-medium">
                    Chi tiêu tháng này
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-3 sm:p-4 lg:p-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-lg">
                    <PiggyBank className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-blue-800 mb-1">
                    {jars.length}
                  </div>
                  <div className="text-xs sm:text-sm text-blue-600 font-medium">
                    Số hủ đang sử dụng
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-3 sm:p-4 lg:p-6 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-lg">
                    <Clock className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-purple-800 mb-1">
                    {monthlyStats.totalTransactions}
                  </div>
                  <div className="text-xs sm:text-sm text-purple-600 font-medium">
                    Giao dịch tháng này
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card
              className={`bg-gradient-to-br ${
                getOverspentJarsCount() > 0
                  ? "from-orange-50 to-orange-100 border-orange-200/50"
                  : "from-green-50 to-green-100 border-green-200/50"
              } shadow-lg hover:shadow-xl transition-all duration-300 group`}
            >
              <CardContent className="p-3 sm:p-4 lg:p-6 text-center relative overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${
                    getOverspentJarsCount() > 0
                      ? "from-orange-400/10"
                      : "from-green-400/10"
                  } to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>
                <div className="relative z-10">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br rounded-full flex items-center justify-center mx-auto mb-2 sm:mb-3 shadow-lg ${
                      getOverspentJarsCount() > 0
                        ? "from-orange-500 to-orange-600"
                        : "from-green-500 to-green-600"
                    }`}
                  >
                    <DollarSign className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div
                    className={`text-xl sm:text-2xl lg:text-3xl font-bold mb-1 ${
                      getOverspentJarsCount() > 0
                        ? "text-orange-800"
                        : "text-green-800"
                    }`}
                  >
                    {getOverspentJarsCount() > 0
                      ? `${getOverspentJarsCount()} hủ`
                      : "Ổn định"}
                  </div>
                  <div
                    className={`text-xs sm:text-sm font-medium ${
                      getOverspentJarsCount() > 0
                        ? "text-orange-600"
                        : "text-green-600"
                    }`}
                  >
                    {getOverspentJarsCount() > 0 ? "Hủ vượt chi" : "Tình trạng"}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Jar Status Overview */}
          <Card className="bg-white border border-gray-200 mt-4 sm:mt-6 shadow border-none">
            <CardHeader className="p-3 sm:p-4 lg:p-6">
              <CardTitle className="flex items-center space-x-2 text-sm sm:text-base lg:text-lg">
                <PiggyBank className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                <span>Tình trạng các Hủ Chi tiêu</span>
              </CardTitle>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Theo dõi ngân sách và chi tiêu thực tế của từng hủ trong tháng
              </p>
            </CardHeader>
            <CardContent className="p-3 sm:p-4 lg:p-6 pt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-4">
                {jars.map((jar) => {
                  const status = getJarStatus(jar);
                  const usedPercent = Math.round(
                    Math.min(
                      100,
                      Math.max(0, (status.spentAmount / jar.targetAmount) * 100)
                    )
                  );

                  return (
                    <Card
                      key={jar._id}
                      className="bg-white border border-gray-200 hover:shadow-md transition-shadow"
                    >
                      <CardContent className="p-3 sm:p-4">
                        {/* Header with icon and percentage */}
                        <div className="flex items-center justify-between mb-2 sm:mb-3">
                          <div className="flex items-center gap-2 sm:gap-3">
                            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-50 border flex items-center justify-center">
                              <span className="text-sm sm:text-lg">
                                {renderIcon(jar.icon)}
                              </span>
                            </div>
                            <div>
                              <h3 className="font-semibold text-gray-900 text-xs sm:text-sm truncate max-w-24 sm:max-w-32">
                                {jar.name}
                              </h3>
                              <Badge variant="outline" className="text-xs mt-1">
                                {jar.percentage}%
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-gray-500">
                              Mục tiêu
                            </div>
                            <div className="font-semibold text-gray-900 text-xs sm:text-sm">
                              {formatCurrency(jar.targetAmount)}
                            </div>
                          </div>
                        </div>

                        {/* Progress bar */}
                        <div className="mb-2 sm:mb-3">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-gray-600">
                              Tiến độ
                            </span>
                            <span
                              className={`text-xs font-semibold ${
                                status.color === "red"
                                  ? "text-red-600"
                                  : status.color === "orange"
                                  ? "text-orange-600"
                                  : "text-green-600"
                              }`}
                            >
                              {usedPercent}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${
                                status.color === "red"
                                  ? "bg-red-500"
                                  : status.color === "orange"
                                  ? "bg-orange-500"
                                  : "bg-green-500"
                              }`}
                              style={{ width: `${usedPercent}%` }}
                            />
                          </div>
                        </div>

                        {/* Amount details */}
                        <div className="grid grid-cols-2 gap-2 sm:gap-3 text-xs">
                          <div>
                            <div className="text-gray-500 mb-1">Đã chi</div>
                            <div
                              className={`font-semibold ${
                                status.color === "red"
                                  ? "text-red-600"
                                  : status.color === "orange"
                                  ? "text-orange-600"
                                  : "text-green-600"
                              }`}
                            >
                              {formatCurrency(status.spentAmount)}
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-500 mb-1">Còn lại</div>
                            <div className="font-semibold text-green-600">
                              {formatCurrency(status.remainingAmount)}
                            </div>
                          </div>
                        </div>

                        {/* Status message */}
                        <div className="mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-gray-100">
                          <div
                            className={`text-xs ${
                              status.color === "red"
                                ? "text-red-600"
                                : status.color === "orange"
                                ? "text-orange-600"
                                : "text-green-600"
                            }`}
                          >
                            {status.message}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Transactions List */}
          <Card className="bg-white border border-gray-200 mt-6 shadow border-none">
            <CardHeader className="p-3 sm:p-4 lg:p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <div className="flex-1 text-center sm:text-left">
                  <div>
                    <CardTitle className="flex items-center justify-center sm:justify-start space-x-2 text-sm sm:text-base lg:text-lg">
                      <Clock className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                      <span>Lịch sử Chi tiêu</span>
                      <Badge variant="outline" className="text-xs">
                        {paginationInfo.totalCount} giao dịch
                      </Badge>
                    </CardTitle>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1">
                      Theo dõi và quản lý các khoản chi tiêu của bạn
                    </p>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 lg:space-x-3 w-full sm:w-auto">
                  <Button
                    onClick={() => setShowAIChat(true)}
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-xs sm:text-sm px-2 sm:px-3 py-2"
                  >
                    <Bot className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">AI Trợ lý</span>
                    <span className="sm:hidden">AI</span>
                  </Button>
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
                    className="bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm px-2 sm:px-3 py-2"
                  >
                    <Plus className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                    <span className="hidden sm:inline">Thêm chi tiêu</span>
                    <span className="sm:hidden">Thêm</span>
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-2 lg:gap-3 text-sm mt-4 lg:mt-6">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative w-full sm:w-1/3">
                    <Search className="absolute left-3 sm:left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5" />
                    <Input
                      placeholder="Tìm kiếm..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 sm:pl-12 w-full text-sm sm:text-base h-11 sm:h-12 border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                    />
                  </div>
                  <Input
                    type="date"
                    value={dateFilter}
                    onChange={(e) => setDateFilter(e.target.value)}
                    className="w-full sm:w-1/3 text-xs sm:text-sm"
                  />
                  <Select
                    value={selectedJarFilter}
                    onValueChange={setSelectedJarFilter}
                  >
                    <SelectTrigger className="w-full sm:w-1/3 text-xs sm:text-sm bg-white border-gray-300">
                      <SelectValue placeholder="Hủ" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-300">
                      <SelectItem value="all">Tất cả hủ</SelectItem>
                      {jars.map((jar) => (
                        <SelectItem key={jar._id} value={jar._id}>
                          <div className="flex items-center space-x-1">
                            {renderIcon(jar.icon)}
                            <span>{jar.name}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {(dateFilter ||
                    searchTerm ||
                    selectedJarFilter !== "all" ||
                    selectedCategory !== "all") && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearFilters}
                      className="text-xs px-2 whitespace-nowrap bg-white border-gray-300 hover:bg-gray-50"
                    >
                      <X className="w-3 h-3 mr-1" />
                      Xóa lọc
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>

            {/* Clean Category Filter */}
            <div className="px-3 sm:px-4 lg:px-6 pb-3 sm:pb-4">
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                <Button
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory("all")}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full transition-all duration-200 ${
                    selectedCategory === "all"
                      ? "bg-purple-600 hover:bg-purple-700 text-white hover:text-white shadow-sm"
                      : "border-gray-200 hover:bg-gray-50 text-gray-700 hover:border-purple-300"
                  }`}
                >
                  Tất cả
                </Button>

                {EXPENSE_CATEGORIES.slice(0, 8).map((category) => (
                  <Button
                    key={category.value}
                    variant={
                      selectedCategory === category.value
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedCategory(category.value)}
                    className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm rounded-full transition-all duration-200 ${
                      selectedCategory === category.value
                        ? "bg-purple-600 hover:bg-purple-700 text-white hover:text-white shadow-sm"
                        : "border-gray-200 hover:bg-gray-50 text-gray-700 hover:border-purple-300"
                    }`}
                  >
                    <span className="hidden sm:inline">{category.label}</span>
                    <span className="sm:hidden">
                      {category.label.split(" ")[0]}
                    </span>
                  </Button>
                ))}
              </div>
            </div>

            <CardContent className="p-3 sm:p-4 lg:p-6 pt-0">
              {paginationInfo.totalCount === 0 ? (
                <div className="text-center py-6 sm:py-8">
                  <PiggyBank className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-3 sm:mb-4" />
                  <p className="text-gray-500 text-sm sm:text-base">
                    {dateFilter ||
                    searchTerm ||
                    selectedJarFilter !== "all" ||
                    selectedCategory !== "all"
                      ? "Không tìm thấy giao dịch nào phù hợp với bộ lọc"
                      : "Chưa có giao dịch nào trong tháng này"}
                  </p>
                  {(dateFilter ||
                    searchTerm ||
                    selectedJarFilter !== "all" ||
                    selectedCategory !== "all") && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearFilters}
                      className="mt-3 text-xs"
                    >
                      <X className="w-3 h-3 mr-1" />
                      Xóa bộ lọc
                    </Button>
                  )}
                </div>
              ) : (
                <>
                  <div className="space-y-4 sm:space-y-4">
                    {transactions.map((transaction) => {
                      const jarInfo = getJarInfo(transaction);
                      return (
                        <Card
                          key={transaction._id}
                          className="bg-gradient-to-br from-white via-gray-50/30 to-purple-50/20 border border-gray-100/80 hover:border-purple-200/60 hover:shadow-xl hover:shadow-purple-100/50 transition-all duration-500 rounded-2xl overflow-hidden backdrop-blur-sm group mx-auto max-w-full sm:max-w-none"
                        >
                          <CardContent className="p-4 sm:p-5 lg:p-6 relative">
                            {/* Subtle background pattern */}
                            <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-50/10 to-blue-50/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-5 relative z-10">
                              <div className="flex items-center space-x-4 min-w-0 flex-1">
                                {/* Premium jar icon */}
                                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-100 via-blue-50 to-indigo-100 rounded-2xl flex items-center justify-center border border-purple-200/40 flex-shrink-0 shadow-lg shadow-purple-100/50 group-hover:shadow-purple-200/60 transition-all duration-300">
                                  {jarInfo ? (
                                    <span className="text-xl sm:text-xl drop-shadow-sm">
                                      {renderIcon(jarInfo.icon)}
                                    </span>
                                  ) : (
                                    <span className="text-xl sm:text-xl drop-shadow-sm">
                                      💰
                                    </span>
                                  )}
                                </div>

                                <div className="flex-1 min-w-0">
                                  <h3 className="font-bold text-gray-900 text-base sm:text-lg mb-2 leading-tight group-hover:text-purple-900 transition-colors duration-300">
                                    {transaction.description}
                                  </h3>
                                  <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-sm text-gray-600">
                                    <Badge
                                      variant="outline"
                                      className="text-xs px-2 py-1 bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200/60 shadow-sm"
                                    >
                                      {jarInfo?.name || "Unknown Jar"}
                                    </Badge>
                                    <span className="hidden sm:inline text-gray-400/60">
                                      •
                                    </span>
                                    <span className="truncate text-gray-700 font-medium">
                                      {getCategoryLabel(transaction.category)}
                                    </span>
                                    <span className="hidden sm:inline text-gray-400/60">
                                      •
                                    </span>
                                    <span className="text-sm text-gray-500 font-medium">
                                      {formatDate(transaction.date)}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {/* Premium mobile layout */}
                              <div className="flex items-center justify-between w-full sm:w-auto sm:flex-col sm:items-end sm:justify-end gap-4 sm:gap-4">
                                <div className="text-right">
                                  <p className="font-black text-red-600 text-xl sm:text-2xl drop-shadow-sm group-hover:scale-105 transition-transform duration-300">
                                    -{formatCurrency(transaction.amount)}
                                  </p>
                                </div>
                                <div className="flex space-x-2 sm:space-x-3">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => startEdit(transaction)}
                                    className="h-9 w-9 sm:h-10 sm:w-10 p-0 text-gray-500 hover:text-blue-600 hover:bg-blue-50/80 rounded-xl transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md"
                                  >
                                    <Edit2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      handleDeleteTransaction(transaction._id)
                                    }
                                    className="h-9 w-9 sm:h-10 sm:w-10 p-0 text-gray-500 hover:text-red-600 hover:bg-red-50/80 rounded-xl transition-all duration-300 hover:scale-110 shadow-sm hover:shadow-md"
                                  >
                                    <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>

                  {/* Clean Pagination */}
                  {paginationInfo.totalPages > 1 && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100">
                      <div className="text-xs sm:text-sm text-gray-600">
                        {paginationInfo.currentPage} /{" "}
                        {paginationInfo.totalPages} trang
                      </div>

                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handlePageChange(paginationInfo.currentPage - 1)
                          }
                          disabled={!paginationInfo.hasPrevPage}
                          className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border-gray-200 hover:bg-gray-50"
                        >
                          <span className="hidden sm:inline">Trước</span>
                          <span className="sm:hidden">←</span>
                        </Button>

                        <div className="flex space-x-0.5 sm:space-x-1">
                          {Array.from(
                            { length: paginationInfo.totalPages },
                            (_, i) => i + 1
                          )
                            .filter((page) => {
                              return (
                                page === 1 ||
                                page === paginationInfo.totalPages ||
                                Math.abs(page - paginationInfo.currentPage) <= 1
                              );
                            })
                            .map((page, index, array) => {
                              const shouldShowEllipsis =
                                index > 0 && page - array[index - 1] > 1;

                              return (
                                <div
                                  key={page}
                                  className="flex items-center space-x-0.5 sm:space-x-1"
                                >
                                  {shouldShowEllipsis && (
                                    <span className="px-1 sm:px-2 py-1 text-gray-400 text-xs sm:text-sm">
                                      ...
                                    </span>
                                  )}
                                  <Button
                                    variant={
                                      paginationInfo.currentPage === page
                                        ? "default"
                                        : "outline"
                                    }
                                    size="sm"
                                    onClick={() => handlePageChange(page)}
                                    className={`px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm min-w-[32px] sm:min-w-[40px] ${
                                      paginationInfo.currentPage === page
                                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                                        : "border-gray-200 hover:bg-gray-50 text-gray-700"
                                    }`}
                                  >
                                    {page}
                                  </Button>
                                </div>
                              );
                            })}
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handlePageChange(paginationInfo.currentPage + 1)
                          }
                          disabled={!paginationInfo.hasNextPage}
                          className="px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm border-gray-200 hover:bg-gray-50"
                        >
                          <span className="hidden sm:inline">Sau</span>
                          <span className="sm:hidden">→</span>
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>

          {/* Add/Edit Transaction Modal */}
          {showAddForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-3 lg:p-4 z-50">
              <Card className="w-full max-w-sm sm:max-w-md bg-white max-h-[90vh] overflow-y-auto">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-t-lg p-3 sm:p-4 lg:p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-base sm:text-lg lg:text-xl">
                        {editingTransaction
                          ? "✏️ Sửa Chi tiêu"
                          : "💰 Thêm Chi tiêu"}
                      </CardTitle>
                      <p className="text-purple-100 text-xs sm:text-sm mt-1">
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
                      className="text-white hover:bg-purple-600 h-7 w-7 sm:h-8 sm:w-8 p-0"
                    >
                      <X className="w-3 h-3 sm:w-4 sm:h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 lg:p-6 space-y-3 sm:space-y-4">
                  <div>
                    <Label
                      htmlFor="jar-select"
                      className="text-xs sm:text-sm lg:text-base"
                    >
                      Chọn hủ chi tiêu *
                    </Label>
                    <Select
                      value={formData.jarId}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, jarId: value }))
                      }
                      disabled={!!editingTransaction}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Chọn hủ để chi tiêu" />
                      </SelectTrigger>
                      <SelectContent>
                        {jars.map((jar) => (
                          <SelectItem key={jar._id} value={jar._id}>
                            <div className="flex items-center space-x-1">
                              {renderIcon(jar.icon)}
                              <span className="text-xs sm:text-sm lg:text-base">
                                {jar.name}
                              </span>
                              <Badge
                                variant="outline"
                                className="ml-1 sm:ml-2 text-xs"
                              >
                                {jar.percentage}%
                              </Badge>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label
                      htmlFor="amount"
                      className="text-xs sm:text-sm lg:text-base"
                    >
                      Số tiền *
                    </Label>
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
                      className="text-sm sm:text-base lg:text-lg mt-1"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="description"
                      className="text-xs sm:text-sm lg:text-base"
                    >
                      Mục đích chi tiêu *
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
                      placeholder="Mô tả chi tiết về khoản chi tiêu này..."
                      rows={3}
                      className="resize-none mt-1 text-xs sm:text-sm lg:text-base"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="category"
                      className="text-xs sm:text-sm lg:text-base"
                    >
                      Danh mục
                    </Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          category: value,
                        }))
                      }
                    >
                      <SelectTrigger id="category" className="mt-1">
                        <SelectValue placeholder="Chọn danh mục chi tiêu" />
                      </SelectTrigger>
                      <SelectContent className="max-h-60">
                        {renderCategoryOptions()}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 pt-3 sm:pt-4">
                    <Button
                      onClick={
                        editingTransaction
                          ? handleUpdateTransaction
                          : handleAddTransaction
                      }
                      className="flex-1 bg-purple-600 hover:bg-purple-700 text-white text-xs sm:text-sm lg:text-base"
                    >
                      <Save className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      {editingTransaction ? "Cập nhật" : "Thêm Chi tiêu"}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowAddForm(false);
                        setEditingTransaction(null);
                      }}
                      className="flex-1 text-xs sm:text-sm lg:text-base"
                    >
                      <X className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                      Hủy
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Beautiful confirmation dialog */}
          <ConfirmDialog
            open={isOpen}
            config={config}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
          />

          {/* AI Expense Chat */}
          <AIExpenseChat
            isOpen={showAIChat}
            onClose={() => setShowAIChat(false)}
            onExpenseParsed={handleAIExpenseResult}
            jars={jars}
          />
        </div>
      </div>
    </UserLayout>
  );
}
