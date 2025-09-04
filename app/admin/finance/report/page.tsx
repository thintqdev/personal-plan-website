"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  FileText,
  Download,
  Lock,
  Unlock,
  Eye,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  DollarSign,
  BarChart3,
  Filter,
  RefreshCw,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar as CalendarIcon,
  Target,
  Wallet,
  ArrowLeft,
  Save,
  X,
} from "lucide-react";
import Link from "next/link";
import { useConfirmDialog } from "@/hooks/useConfirmDialog";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import {
  MonthlyReport,
  MonthlyReportDetail,
  JarReport,
  ReportTransaction,
  PDFReportData,
  getMonthlyReports,
  getMonthlyReport,
  generateMonthlyReport,
  finalizeMonthlyReport,
  getMonthlyReportPDFData,
} from "@/lib/finance-service";

export default function MonthlyReportPage() {
  const [reports, setReports] = useState<MonthlyReport[]>([]);
  const [selectedReport, setSelectedReport] =
    useState<MonthlyReportDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [filterYear, setFilterYear] = useState<string>(
    new Date().getFullYear().toString()
  );
  const [filterMonth, setFilterMonth] = useState<string>("all");

  // Form states for generating new report
  const [generateYear, setGenerateYear] = useState<number>(
    new Date().getFullYear()
  );
  const [generateMonth, setGenerateMonth] = useState<number>(
    new Date().getMonth() + 1
  );
  const [showGenerateForm, setShowGenerateForm] = useState(false);

  // Dialog hook
  const { isOpen, config, showConfirm, handleConfirm, handleCancel } =
    useConfirmDialog();

  useEffect(() => {
    loadReports();
  }, [filterYear, filterMonth]);

  const loadReports = async () => {
    try {
      setIsLoading(true);
      const year =
        filterYear && filterYear !== "all" ? parseInt(filterYear) : undefined;
      const month =
        filterMonth && filterMonth !== "all"
          ? parseInt(filterMonth)
          : undefined;

      const data = await getMonthlyReports(year, month);
      setReports(data);
    } catch (error) {
      console.error("Error loading reports:", error);
      setReports([]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateReport = async () => {
    try {
      setIsGenerating(true);
      const newReport = await generateMonthlyReport({
        year: generateYear,
        month: generateMonth,
      });

      await showConfirm({
        title: "✅ Tạo báo cáo thành công!",
        description: `Báo cáo tháng ${generateMonth}/${generateYear} đã được tạo thành công.`,
        confirmText: "OK",
        variant: "default",
      });

      setShowGenerateForm(false);
      await loadReports();
    } catch (error) {
      console.error("Error generating report:", error);
      await showConfirm({
        title: "❌ Lỗi tạo báo cáo",
        description: "Có lỗi xảy ra khi tạo báo cáo. Vui lòng thử lại.",
        confirmText: "OK",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const viewReportDetail = async (year: number, month: number) => {
    try {
      setIsLoading(true);
      const detail = await getMonthlyReport(year, month);
      setSelectedReport(detail);
      setShowDetail(true);
    } catch (error) {
      console.error("Error loading report detail:", error);
      await showConfirm({
        title: "❌ Lỗi tải báo cáo",
        description: "Không thể tải chi tiết báo cáo. Vui lòng thử lại.",
        confirmText: "OK",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const finalizeReport = async (year: number, month: number) => {
    const shouldFinalize = await showConfirm({
      title: "🔒 Khóa báo cáo",
      description: `Bạn có chắc chắn muốn khóa báo cáo tháng ${month}/${year}? Sau khi khóa, báo cáo sẽ không thể chỉnh sửa được nữa.`,
      confirmText: "Khóa báo cáo",
      cancelText: "Hủy",
      variant: "warning",
    });

    if (!shouldFinalize) return;

    try {
      await finalizeMonthlyReport(year, month);

      await showConfirm({
        title: "✅ Khóa báo cáo thành công!",
        description: `Báo cáo tháng ${month}/${year} đã được khóa.`,
        confirmText: "OK",
        variant: "default",
      });

      await loadReports();
    } catch (error) {
      console.error("Error finalizing report:", error);
      await showConfirm({
        title: "❌ Lỗi khóa báo cáo",
        description: "Có lỗi xảy ra khi khóa báo cáo. Vui lòng thử lại.",
        confirmText: "OK",
        variant: "destructive",
      });
    }
  };

  const downloadPDF = async (year: number, month: number) => {
    try {
      const pdfData: PDFReportData = await getMonthlyReportPDFData(year, month);

      // Here you would integrate with a PDF library like jsPDF
      // For now, we'll just log the data and show a success message
      console.log("PDF Data for generation:", pdfData);

      await showConfirm({
        title: "📄 Tải PDF",
        description: `Dữ liệu báo cáo tháng ${month}/${year} đã được chuẩn bị. Tính năng tạo PDF sẽ được triển khai sớm.`,
        confirmText: "OK",
        variant: "default",
      });
    } catch (error) {
      console.error("Error downloading PDF:", error);
      await showConfirm({
        title: "❌ Lỗi tải PDF",
        description: "Có lỗi xảy ra khi tải PDF. Vui lòng thử lại.",
        confirmText: "OK",
        variant: "destructive",
      });
    }
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

  const getMonthName = (month: number) => {
    const months = [
      "Tháng 1",
      "Tháng 2",
      "Tháng 3",
      "Tháng 4",
      "Tháng 5",
      "Tháng 6",
      "Tháng 7",
      "Tháng 8",
      "Tháng 9",
      "Tháng 10",
      "Tháng 11",
      "Tháng 12",
    ];
    return months[month - 1] || "Unknown";
  };

  const getYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear; i >= currentYear - 5; i--) {
      years.push(i.toString());
    }
    return years;
  };

  const renderIcon = (iconName: string) => {
    const iconMap: Record<string, string> = {
      Home: "🏠",
      PiggyBank: "🐷",
      Coffee: "☕",
      Book: "📚",
      Target: "🎯",
      Heart: "❤️",
      Wallet: "👛",
      ShoppingBag: "🛍️",
      Car: "🚗",
      Plane: "✈️",
      Medical: "🏥",
      Fitness: "💪",
      // Add more icon mappings as needed
    };

    return <span className="text-lg">{iconMap[iconName] || "💰"}</span>;
  };

  const getStringId = (
    id: any,
    fallback: string | number = "unknown"
  ): string => {
    if (typeof id === "string") return id;
    if (typeof id === "object" && id?._id) return id._id;
    return String(fallback);
  };

  const safeJarData = (jar: JarReport) => {
    // Extract data from jarId object if it exists
    const jarInfo = jar.jarId || jar.jarInfo || {};
    const jarData = jarInfo as any; // Type cast for safe access
    return {
      ...jar,
      allocatedAmount: jar.allocatedAmount || 0,
      actualSpent: jar.actualSpent || 0,
      actualIncome: jar.actualIncome || 0,
      savings: jar.savings || 0,
      percentage: jar.percentage || 0,
      savingsPercentage: jar.savingsPercentage || "0",
      jarInfo: {
        name: jarData.name || jar.jarName || "Unknown",
        color: jarData.color || "#6B7280",
        icon: jarData.icon || "💰",
        category: jarData.category || jar.jarCategory || "General",
      },
    };
  };

  if (showDetail && selectedReport) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header Section */}
          <div className="mb-8">
            <Link href="/admin/finance/report" className="inline-block mb-6">
              <Button
                variant="ghost"
                className="text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Quay lại Báo cáo
              </Button>
            </Link>

            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    Chi tiết báo cáo tháng {selectedReport.month}/
                    {selectedReport.year}
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Báo cáo tài chính chi tiết và phân tích theo từng jar
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <Button
                  onClick={() =>
                    downloadPDF(selectedReport.year, selectedReport.month)
                  }
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Tải PDF
                </Button>
              </div>
            </div>
          </div>

          {/* Report Status */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-1"></div>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-xl ${
                      selectedReport.isFinalized
                        ? "bg-green-100"
                        : "bg-orange-100"
                    }`}
                  >
                    {selectedReport.isFinalized ? (
                      <Lock className="w-6 h-6 text-green-600" />
                    ) : (
                      <Unlock className="w-6 h-6 text-orange-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">
                      Trạng thái:{" "}
                      {selectedReport.isFinalized ? "Đã khóa" : "Chưa khóa"}
                    </h3>
                    <p className="text-gray-600">
                      {selectedReport.isFinalized && selectedReport.finalizedAt
                        ? `Khóa vào: ${formatDate(selectedReport.finalizedAt)}`
                        : "Báo cáo có thể chỉnh sửa"}
                    </p>
                  </div>
                </div>
                {!selectedReport.isFinalized && (
                  <Button
                    onClick={() =>
                      finalizeReport(selectedReport.year, selectedReport.month)
                    }
                    className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-xl"
                  >
                    <Lock className="w-4 h-4 mr-2" />
                    Khóa báo cáo
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-green-500 to-emerald-600 h-1"></div>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <DollarSign className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">
                      Thu nhập tháng
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      {formatCurrency(selectedReport.userIncome)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-600 h-1"></div>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <Target className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">
                      Tổng phân bổ
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      {formatCurrency(selectedReport.totalAllocated)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-red-500 to-rose-600 h-1"></div>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-red-100 rounded-xl">
                    <TrendingDown className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">
                      Tổng chi tiêu
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      {formatCurrency(selectedReport.totalSpent)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-purple-500 to-violet-600 h-1"></div>
              <CardContent className="p-6">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <PiggyBank className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-medium">
                      Tổng tiết kiệm
                    </p>
                    <p className="text-xl font-bold text-gray-900">
                      {formatCurrency(selectedReport.totalSavings)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Carry Over Information */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-1"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-800">
                <Calendar className="w-5 h-5" />
                Thông tin chuyển tháng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl">
                  <span className="font-medium text-blue-800">
                    Từ tháng trước:
                  </span>
                  <span className="text-xl font-bold text-blue-600">
                    {formatCurrency(selectedReport.carryOverFromPreviousMonth)}
                  </span>
                </div>
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl">
                  <span className="font-medium text-green-800">
                    Chuyển tháng sau:
                  </span>
                  <span className="text-xl font-bold text-green-600">
                    {formatCurrency(selectedReport.carryOverToNextMonth)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Jars Report */}
          <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-1"></div>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-800">
                <BarChart3 className="w-5 h-5" />
                Chi tiết theo hũ ({selectedReport.jarsReport.length} hũ)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedReport.jarsReport.map(
                  (jar: JarReport, index: number) => {
                    const safeJar = safeJarData(jar);
                    return (
                      <div
                        key={`jar-${getStringId(
                          jar.jarId,
                          jar.jarName || index
                        )}`}
                        className="border rounded-xl p-4 hover:shadow-md transition-shadow bg-white"
                      >
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="p-2 rounded-lg"
                              style={{
                                backgroundColor:
                                  (safeJar.jarInfo.color || "#6B7280") + "20",
                              }}
                            >
                              {renderIcon(safeJar.jarInfo.icon || "💰")}
                            </div>
                            <div>
                              <h4 className="font-semibold text-lg">
                                {safeJar.jarInfo.name}
                              </h4>
                              <p className="text-gray-600">
                                {safeJar.jarInfo.category}
                              </p>
                              <Badge variant="outline">
                                {safeJar.percentage}% ngân sách
                              </Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm text-gray-600">
                              Tỷ lệ tiết kiệm
                            </p>
                            <p
                              className={`text-2xl font-bold ${
                                parseFloat(safeJar.savingsPercentage || "0") >=
                                80
                                  ? "text-green-600"
                                  : parseFloat(
                                      safeJar.savingsPercentage || "0"
                                    ) >= 50
                                  ? "text-orange-600"
                                  : "text-red-600"
                              }`}
                            >
                              {safeJar.savingsPercentage || "0"}%
                            </p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                          <div className="text-center p-3 bg-blue-50 rounded-xl">
                            <p className="text-sm text-gray-600">Phân bổ</p>
                            <p className="font-semibold text-blue-600">
                              {formatCurrency(jar.allocatedAmount || 0)}
                            </p>
                          </div>
                          <div className="text-center p-3 bg-red-50 rounded-xl">
                            <p className="text-sm text-gray-600">Chi tiêu</p>
                            <p className="font-semibold text-red-600">
                              {formatCurrency(jar.actualSpent || 0)}
                            </p>
                          </div>
                          <div className="text-center p-3 bg-green-50 rounded-xl">
                            <p className="text-sm text-gray-600">Thu nhập</p>
                            <p className="font-semibold text-green-600">
                              {formatCurrency(jar.actualIncome || 0)}
                            </p>
                          </div>
                          <div className="text-center p-3 bg-purple-50 rounded-xl">
                            <p className="text-sm text-gray-600">Tiết kiệm</p>
                            <p
                              className={`font-semibold ${
                                (jar.savings || 0) >= 0
                                  ? "text-purple-600"
                                  : "text-red-600"
                              }`}
                            >
                              {formatCurrency(jar.savings || 0)}
                            </p>
                          </div>
                        </div>

                        {/* Progress bar */}
                        <div className="mb-4">
                          <div className="flex justify-between text-sm text-gray-600 mb-1">
                            <span>Sử dụng ngân sách</span>
                            <span>
                              {(jar.allocatedAmount || 0) > 0
                                ? (
                                    ((jar.actualSpent || 0) /
                                      (jar.allocatedAmount || 1)) *
                                    100
                                  ).toFixed(1)
                                : "0"}
                              %
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all ${
                                (jar.allocatedAmount || 0) > 0 &&
                                (jar.actualSpent || 0) /
                                  (jar.allocatedAmount || 1) >
                                  1
                                  ? "bg-red-500"
                                  : (jar.allocatedAmount || 0) > 0 &&
                                    (jar.actualSpent || 0) /
                                      (jar.allocatedAmount || 1) >
                                      0.8
                                  ? "bg-orange-500"
                                  : "bg-green-500"
                              }`}
                              style={{
                                width: `${Math.min(
                                  100,
                                  (jar.allocatedAmount || 0) > 0
                                    ? ((jar.actualSpent || 0) /
                                        (jar.allocatedAmount || 1)) *
                                        100
                                    : 0
                                )}%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        {/* Transactions */}
                        {jar.transactions && jar.transactions.length > 0 && (
                          <div>
                            <h5 className="font-medium mb-2">
                              Giao dịch trong tháng ({jar.transactions.length})
                            </h5>
                            <div className="max-h-40 overflow-y-auto space-y-2">
                              {jar.transactions.map(
                                (
                                  transaction: ReportTransaction,
                                  txIndex: number
                                ) => (
                                  <div
                                    key={`transaction-${
                                      transaction.transactionId || txIndex
                                    }-${getStringId(jar.jarId, index)}`}
                                    className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm"
                                  >
                                    <div>
                                      <p className="font-medium">
                                        {transaction.description}
                                      </p>
                                      <p className="text-gray-600">
                                        {transaction.category}
                                      </p>
                                    </div>
                                    <div className="text-right">
                                      <p
                                        className={`font-semibold ${
                                          transaction.type === "expense"
                                            ? "text-red-600"
                                            : "text-green-600"
                                        }`}
                                      >
                                        {transaction.type === "expense"
                                          ? "-"
                                          : "+"}
                                        {formatCurrency(transaction.amount)}
                                      </p>
                                      <p className="text-gray-500 text-xs">
                                        {formatDate(transaction.date)}
                                      </p>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <ConfirmDialog
          open={isOpen}
          config={config}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header Section */}
        <div className="mb-8">
          <Link href="/admin/finance" className="inline-block mb-6">
            <Button
              variant="ghost"
              className="text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Quay lại Tài chính
            </Button>
          </Link>

          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  Báo cáo tài chính hàng tháng
                </h1>
                <p className="text-gray-600 mt-1">
                  Quản lý và theo dõi báo cáo tài chính chi tiết theo từng tháng
                </p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                onClick={() => setShowGenerateForm(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
              >
                <Plus className="w-4 h-4 mr-2" />
                Tạo báo cáo mới
              </Button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl overflow-hidden mb-8">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-1"></div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-800">
              <Filter className="w-5 h-5" />
              Bộ lọc
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 items-end">
              <div className="flex-1">
                <Label htmlFor="filter-year">Năm</Label>
                <Select value={filterYear} onValueChange={setFilterYear}>
                  <SelectTrigger className="h-12 bg-white border-gray-200 rounded-xl shadow-lg">
                    <SelectValue placeholder="Chọn năm" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 rounded-xl shadow-lg">
                    <SelectItem value="all">Tất cả năm</SelectItem>
                    {getYearOptions().map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <Label htmlFor="filter-month">Tháng</Label>
                <Select value={filterMonth} onValueChange={setFilterMonth}>
                  <SelectTrigger className="h-12 bg-white border-gray-200 rounded-xl shadow-lg">
                    <SelectValue placeholder="Chọn tháng" />
                  </SelectTrigger>
                  <SelectContent className="bg-white border-gray-200 rounded-xl shadow-lg">
                    <SelectItem value="all">Tất cả tháng</SelectItem>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map(
                      (month) => (
                        <SelectItem
                          key={`filter-month-${month}`}
                          value={month.toString()}
                        >
                          {getMonthName(month)}
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={loadReports}
                variant="outline"
                className="h-12 px-6 bg-white border-gray-200 hover:bg-gray-50 rounded-xl"
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Làm mới
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Reports List */}
        <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-lg hover:shadow-xl transition-all duration-200 rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-1"></div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-800">
              <FileText className="w-5 h-5" />
              Danh sách báo cáo ({reports.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-12">
                <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-600 font-medium">Đang tải báo cáo...</p>
              </div>
            ) : reports.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-500 text-lg mb-2">
                  Không có báo cáo nào
                </p>
                <p className="text-gray-400 mb-6">
                  Hãy tạo báo cáo đầu tiên để bắt đầu theo dõi tài chính
                </p>
                <Button
                  onClick={() => setShowGenerateForm(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Tạo báo cáo mới
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {reports.map((report) => (
                  <div
                    key={report._id}
                    className="border rounded-xl p-6 hover:shadow-md transition-all bg-white"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`p-3 rounded-xl ${
                            report.isFinalized
                              ? "bg-green-100"
                              : "bg-orange-100"
                          }`}
                        >
                          {report.isFinalized ? (
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          ) : (
                            <Clock className="w-6 h-6 text-orange-600" />
                          )}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900">
                            Báo cáo {getMonthName(report.month)} {report.year}
                          </h3>
                          <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                            <span>Tạo: {formatDate(report.createdAt)}</span>
                            <Badge
                              variant={
                                report.isFinalized ? "default" : "secondary"
                              }
                            >
                              {report.isFinalized ? "Đã khóa" : "Chưa khóa"}
                            </Badge>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            viewReportDetail(report.year, report.month)
                          }
                          className="border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-xl"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Xem chi tiết
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => downloadPDF(report.year, report.month)}
                          className="border-gray-200 hover:bg-gray-50 px-4 py-2 rounded-xl"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          PDF
                        </Button>
                        {!report.isFinalized && (
                          <Button
                            size="sm"
                            onClick={() =>
                              finalizeReport(report.year, report.month)
                            }
                            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-xl"
                          >
                            <Lock className="w-4 h-4 mr-2" />
                            Khóa
                          </Button>
                        )}
                      </div>
                    </div>

                    {/* Quick Stats */}
                    <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-xl">
                        <p className="text-sm text-gray-600">Thu nhập</p>
                        <p className="font-semibold text-blue-600">
                          {formatCurrency(report.userIncome)}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-red-50 rounded-xl">
                        <p className="text-sm text-gray-600">Chi tiêu</p>
                        <p className="font-semibold text-red-600">
                          {formatCurrency(report.totalSpent)}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-xl">
                        <p className="text-sm text-gray-600">Tiết kiệm</p>
                        <p className="font-semibold text-green-600">
                          {formatCurrency(report.totalSavings)}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-purple-50 rounded-xl">
                        <p className="text-sm text-gray-600">Tỷ lệ tiết kiệm</p>
                        <p className="font-semibold text-purple-600">
                          {(
                            (report.totalSavings / report.userIncome) *
                            100
                          ).toFixed(1)}
                          %
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Generate Report Modal */}
        {showGenerateForm && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h3 className="text-xl font-bold text-gray-800">
                  Tạo báo cáo mới
                </h3>
                <button
                  onClick={() => setShowGenerateForm(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <Label className="font-medium text-gray-700 mb-2 block">
                    Năm
                  </Label>
                  <Select
                    value={generateYear.toString()}
                    onValueChange={(value) => setGenerateYear(parseInt(value))}
                  >
                    <SelectTrigger className="h-12 bg-white border-gray-200 rounded-xl shadow-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200 rounded-xl shadow-lg">
                      {getYearOptions().map((year) => (
                        <SelectItem key={year} value={year}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="font-medium text-gray-700 mb-2 block">
                    Tháng
                  </Label>
                  <Select
                    value={generateMonth.toString()}
                    onValueChange={(value) => setGenerateMonth(parseInt(value))}
                  >
                    <SelectTrigger className="h-12 bg-white border-gray-200 rounded-xl shadow-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-white border-gray-200 rounded-xl shadow-lg">
                      {Array.from({ length: 12 }, (_, i) => i + 1).map(
                        (month) => (
                          <SelectItem key={month} value={month.toString()}>
                            {getMonthName(month)}
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end gap-3 p-6 border-t border-gray-200 bg-gray-50">
                <Button
                  onClick={() => setShowGenerateForm(false)}
                  variant="outline"
                  className="px-6 py-2 rounded-xl border-gray-200 hover:bg-gray-50"
                >
                  Hủy
                </Button>
                <Button
                  onClick={generateReport}
                  disabled={isGenerating}
                  className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl"
                >
                  {isGenerating ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Đang tạo...
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4 mr-2" />
                      Tạo báo cáo
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <ConfirmDialog
        open={isOpen}
        config={config}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
}
