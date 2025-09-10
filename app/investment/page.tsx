"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  TrendingUp,
  DollarSign,
  Package,
  PieChart,
  Eye,
  Search,
  Filter,
  BarChart3,
  Target,
  Wallet,
  Coins,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Activity,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Asset, getAllAssets } from "@/lib/asset-service";
import { Investment, getInvestments } from "@/lib/investment-service";
import { User, getUser } from "@/lib/user-service";

// Asset type icon mapping
const assetTypeIcons = {
  mutual_fund: { icon: "🏛️", label: "Quỹ đầu tư", color: "blue" },
  stock: { icon: "📈", label: "Cổ phiếu", color: "green" },
  crypto: { icon: "₿", label: "Tiền điện tử", color: "orange" },
  gold: { icon: "🥇", label: "Vàng", color: "yellow" },
  real_estate: { icon: "🏠", label: "Bất động sản", color: "purple" },
  other: { icon: "💼", label: "Khác", color: "gray" },
};

interface AggregatedInvestment {
  asset: Asset;
  totalAmount: number;
  transactions: Investment[];
  firstInvestmentDate: string;
  lastInvestmentDate: string;
  averageAmount: number;
  profit?: number;
  profitPercentage?: number;
}

export default function InvestmentPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAssetType, setSelectedAssetType] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("amount");

  // Cover image state
  const coverImages = [
    "/mountain-peak-sunrise-motivation-success.png",
    "/person-climbing-stairs-to-success.png",
    "/runner-crossing-finish-line-victory.png",
    "/lighthouse-guiding-ships-motivation.png",
    "/eagle-soaring-high-mountains-freedom.png",
    "/peaceful-pink-sunset-landscape.png",
  ];
  const [coverImage, setCoverImage] = useState(coverImages[0]);

  useEffect(() => {
    setIsMounted(true);
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const [assetsData, investmentsData, userData] = await Promise.all([
        getAllAssets(),
        getInvestments(),
        getUser(),
      ]);

      setAssets(assetsData);
      setInvestments(investmentsData);
      setUser(userData);
    } catch (error) {
      console.error("Error loading investment data:", error);
      setAssets([]);
      setInvestments([]);
      setUser({
        _id: "default",
        name: "Nhà đầu tư",
        role: "user",
        goal: "Tự do tài chính",
        streak: 0,
        avatar: "/friendly-person-avatar.png",
        __v: 0,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const changeCoverImage = () => {
    const randomIndex = Math.floor(Math.random() * coverImages.length);
    const newImage = coverImages[randomIndex];
    setCoverImage(newImage);
  };

  // Get aggregated investments by asset
  const getAggregatedInvestments = (): AggregatedInvestment[] => {
    const aggregated = new Map<string, AggregatedInvestment>();

    investments.forEach((investment) => {
      const assetId = investment.assetId._id;
      if (aggregated.has(assetId)) {
        const existing = aggregated.get(assetId)!;
        existing.totalAmount += investment.amount;
        existing.transactions.push(investment);
        existing.transactions.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        existing.firstInvestmentDate =
          existing.transactions[existing.transactions.length - 1].date;
        existing.lastInvestmentDate = existing.transactions[0].date;
        existing.averageAmount =
          existing.totalAmount / existing.transactions.length;
      } else {
        aggregated.set(assetId, {
          asset: investment.assetId,
          totalAmount: investment.amount,
          transactions: [investment],
          firstInvestmentDate: investment.date,
          lastInvestmentDate: investment.date,
          averageAmount: investment.amount,
          profit: 0, // Mock data - would come from real-time prices
          profitPercentage: 0,
        });
      }
    });

    return Array.from(aggregated.values());
  };

  // Filter and sort aggregated investments
  const getFilteredAndSortedInvestments = () => {
    let filtered = getAggregatedInvestments();

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (inv) =>
          inv.asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          inv.asset.code.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by asset type
    if (selectedAssetType !== "all") {
      filtered = filtered.filter((inv) => inv.asset.type === selectedAssetType);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "amount":
          return b.totalAmount - a.totalAmount;
        case "transactions":
          return b.transactions.length - a.transactions.length;
        case "recent":
          return (
            new Date(b.lastInvestmentDate).getTime() -
            new Date(a.lastInvestmentDate).getTime()
          );
        case "name":
          return a.asset.name.localeCompare(b.asset.name);
        default:
          return 0;
      }
    });

    return filtered;
  };

  // Calculate portfolio statistics
  const getPortfolioStats = () => {
    const aggregated = getAggregatedInvestments();
    const totalInvestment = aggregated.reduce(
      (sum, inv) => sum + inv.totalAmount,
      0
    );
    const totalAssets = aggregated.length;
    const totalTransactions = investments.length;

    // Calculate asset type distribution
    const assetTypeDistribution = aggregated.reduce((dist, inv) => {
      const type = inv.asset.type;
      if (!dist[type]) {
        dist[type] = { amount: 0, count: 0 };
      }
      dist[type].amount += inv.totalAmount;
      dist[type].count += 1;
      return dist;
    }, {} as Record<string, { amount: number; count: number }>);

    // Find top investment
    const topInvestment = aggregated.sort(
      (a, b) => b.totalAmount - a.totalAmount
    )[0];

    return {
      totalInvestment,
      totalAssets,
      totalTransactions,
      assetTypeDistribution,
      topInvestment,
      averageInvestment: totalAssets > 0 ? totalInvestment / totalAssets : 0,
    };
  };

  const formatCurrency = (amount: number, currency: string = "VND") => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getAssetTypeInfo = (type: string) => {
    return (
      assetTypeIcons[type as keyof typeof assetTypeIcons] ||
      assetTypeIcons.other
    );
  };

  const getAssetTypeOptions = () => {
    const types = [...new Set(assets.map((asset) => asset.type))];
    return types.map((type) => ({
      value: type,
      ...getAssetTypeInfo(type),
    }));
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedAssetType("all");
    setSortBy("amount");
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
            <p className="mt-4 text-gray-600">Đang tải dữ liệu đầu tư...</p>
          </div>
        </div>
      </div>
    );
  }

  const portfolioStats = getPortfolioStats();
  const filteredInvestments = getFilteredAndSortedInvestments();

  return (
    <UserLayout
      title="Danh Mục Đầu Tư"
      description="Theo dõi và quản lý danh mục đầu tư cá nhân"
      icon={<TrendingUp className="w-8 h-8 text-white" />}
      coverImage={coverImage}
      onCoverImageChange={changeCoverImage}
    >
      {/* User Profile & Quick Actions */}
      <Card className="bg-white border border-gray-200">
        <CardContent className="p-4 lg:p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Avatar className="w-12 h-12 lg:w-16 lg:h-16 mx-auto sm:mx-0">
              <AvatarImage
                src={user?.avatar || "/friendly-person-avatar.png"}
                alt={user?.name || "User"}
              />
              <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-lg lg:text-xl font-semibold text-gray-900">
                {user?.name || "Nhà đầu tư"}
              </h3>
              <p className="text-sm lg:text-base text-gray-600">
                Mục tiêu: {user?.goal || "Tự do tài chính"}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2">
                <Badge
                  variant="outline"
                  className="text-blue-600 border-blue-200 text-xs"
                >
                  <Calendar className="w-3 h-3 mr-1" />
                  {new Date().toLocaleDateString("vi-VN", {
                    month: "long",
                    year: "numeric",
                  })}
                </Badge>
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-200 text-xs"
                >
                  <Package className="w-3 h-3 mr-1" />
                  {portfolioStats.totalAssets} tài sản
                </Badge>
                <Badge
                  variant="outline"
                  className="text-purple-600 border-purple-200 text-xs"
                >
                  <Activity className="w-3 h-3 mr-1" />
                  {portfolioStats.totalTransactions} giao dịch
                </Badge>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto">
              <Link href="/admin/investment">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-3 py-2 w-full sm:w-auto">
                  <Plus className="w-4 h-4 mr-2" />
                  Quản lý đầu tư
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Portfolio Overview Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-3 lg:p-4 text-center">
            <div className="flex items-center space-x-2 lg:space-x-3 justify-center mb-1">
              <div className="p-1.5 lg:p-2 bg-blue-500 rounded-lg flex-shrink-0">
                <Wallet className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-sm lg:text-base font-bold text-blue-800">
                  {formatCurrency(portfolioStats.totalInvestment)}
                </div>
                <div className="text-xs lg:text-sm text-blue-700">
                  Tổng đầu tư
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-3 lg:p-4 text-center">
            <div className="flex items-center space-x-2 lg:space-x-3 justify-center mb-1">
              <div className="p-1.5 lg:p-2 bg-green-500 rounded-lg flex-shrink-0">
                <Package className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-sm lg:text-base font-bold text-green-800">
                  {portfolioStats.totalAssets}
                </div>
                <div className="text-xs lg:text-sm text-green-700">Tài sản</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-3 lg:p-4 text-center">
            <div className="flex items-center space-x-2 lg:space-x-3 justify-center mb-1">
              <div className="p-1.5 lg:p-2 bg-purple-500 rounded-lg flex-shrink-0">
                <Activity className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-sm lg:text-base font-bold text-purple-800">
                  {portfolioStats.totalTransactions}
                </div>
                <div className="text-xs lg:text-sm text-purple-700">
                  Giao dịch
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
          <CardContent className="p-3 lg:p-4 text-center">
            <div className="flex items-center space-x-2 lg:space-x-3 justify-center mb-1">
              <div className="p-1.5 lg:p-2 bg-orange-500 rounded-lg flex-shrink-0">
                <Target className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
              </div>
              <div className="text-left">
                <div className="text-sm lg:text-base font-bold text-orange-800">
                  {formatCurrency(portfolioStats.averageInvestment)}
                </div>
                <div className="text-xs lg:text-sm text-orange-700">
                  TB/Tài sản
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Asset Type Distribution */}
      <Card className="bg-white border border-gray-200">
        <CardHeader className="p-4 lg:p-6">
          <CardTitle className="flex items-center space-x-2 text-base lg:text-lg">
            <PieChart className="w-4 h-4 lg:w-5 lg:h-5" />
            <span>Phân bổ danh mục theo loại tài sản</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 lg:p-6 pt-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 lg:gap-4">
            {Object.entries(portfolioStats.assetTypeDistribution).map(
              ([type, data]) => {
                const typeInfo = getAssetTypeInfo(type);
                const percentage =
                  (data.amount / portfolioStats.totalInvestment) * 100;

                return (
                  <div
                    key={type}
                    className={`p-3 lg:p-4 rounded-lg border-2 bg-${typeInfo.color}-50 border-${typeInfo.color}-200`}
                  >
                    <div className="text-center">
                      <div className="text-2xl mb-2">{typeInfo.icon}</div>
                      <div className="text-sm font-medium text-gray-900 mb-1">
                        {typeInfo.label}
                      </div>
                      <div className="text-xs text-gray-600 mb-2">
                        {data.count} tài sản
                      </div>
                      <div className="font-bold text-gray-900 text-sm">
                        {percentage.toFixed(1)}%
                      </div>
                      <div className="text-xs text-gray-600">
                        {formatCurrency(data.amount)}
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </CardContent>
      </Card>

      {/* Investment Portfolio */}
      <Card className="bg-white border border-gray-200">
        <CardHeader className="p-4 lg:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <CardTitle className="flex items-center space-x-2 text-base lg:text-lg">
                <BarChart3 className="w-4 h-4 lg:w-5 lg:h-5" />
                <span>Danh mục đầu tư</span>
                <Badge variant="outline" className="text-xs">
                  {filteredInvestments.length} tài sản
                </Badge>
              </CardTitle>
              <p className="text-xs lg:text-sm text-gray-600 mt-1">
                Tổng quan các khoản đầu tư của bạn
              </p>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-2 lg:gap-3">
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Tìm kiếm tài sản..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 w-full sm:w-40 text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-2">
                <Select
                  value={selectedAssetType}
                  onValueChange={setSelectedAssetType}
                >
                  <SelectTrigger className="w-full sm:w-32 text-sm">
                    <SelectValue placeholder="Loại tài sản" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tất cả</SelectItem>
                    {getAssetTypeOptions().map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div className="flex items-center space-x-1">
                          <span>{type.icon}</span>
                          <span className="truncate">{type.label}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-28 text-sm">
                    <SelectValue placeholder="Sắp xếp" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="amount">Số tiền</SelectItem>
                    <SelectItem value="transactions">Giao dịch</SelectItem>
                    <SelectItem value="recent">Gần đây</SelectItem>
                    <SelectItem value="name">Tên A-Z</SelectItem>
                  </SelectContent>
                </Select>

                {(searchTerm ||
                  selectedAssetType !== "all" ||
                  sortBy !== "amount") && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="text-xs px-2"
                  >
                    <Filter className="w-3 h-3 mr-1" />
                    Xóa lọc
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-4 lg:p-6 pt-0">
          {filteredInvestments.length === 0 ? (
            <div className="text-center py-8">
              <div className="w-24 h-24 mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-12 h-12 text-gray-400" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <Plus className="w-4 h-4 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {searchTerm || selectedAssetType !== "all"
                  ? "Không tìm thấy tài sản phù hợp"
                  : "Chưa có khoản đầu tư nào"}
              </h3>
              <p className="text-gray-500 mb-6">
                {searchTerm || selectedAssetType !== "all"
                  ? "Thử thay đổi bộ lọc để xem thêm tài sản"
                  : "Bắt đầu xây dựng danh mục đầu tư của bạn ngay hôm nay!"}
              </p>
              {searchTerm || selectedAssetType !== "all" ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="text-sm"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Xóa bộ lọc
                </Button>
              ) : (
                <Link href="/admin/investment">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Thêm khoản đầu tư đầu tiên
                  </Button>
                </Link>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
              {filteredInvestments.map((investment) => {
                const typeInfo = getAssetTypeInfo(investment.asset.type);

                return (
                  <Card
                    key={investment.asset._id}
                    className="bg-white border border-gray-200 hover:shadow-lg transition-all duration-200"
                  >
                    <CardContent className="p-4 lg:p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`p-2 lg:p-3 bg-${typeInfo.color}-100 rounded-lg`}
                          >
                            <span className="text-lg lg:text-xl">
                              {typeInfo.icon}
                            </span>
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="font-semibold text-gray-900 text-sm lg:text-base truncate">
                              {investment.asset.code}
                            </div>
                            <div className="text-xs lg:text-sm text-gray-500 truncate">
                              {investment.asset.name}
                            </div>
                          </div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {typeInfo.label}
                        </Badge>
                      </div>

                      <div className="space-y-3 lg:space-y-4">
                        {/* Total Investment */}
                        <div>
                          <div className="text-xs lg:text-sm text-gray-600 mb-1">
                            Tổng đầu tư
                          </div>
                          <div className="text-lg lg:text-xl font-bold text-gray-900">
                            {formatCurrency(
                              investment.totalAmount,
                              investment.asset.currency
                            )}
                          </div>
                        </div>

                        {/* Statistics Grid */}
                        <div className="grid grid-cols-2 gap-3 lg:gap-4">
                          <div className="text-center p-2 lg:p-3 bg-blue-50 rounded-lg">
                            <div className="text-xs lg:text-sm text-blue-600 font-medium mb-1">
                              Giao dịch
                            </div>
                            <div className="text-sm lg:text-base font-bold text-blue-800">
                              {investment.transactions.length}
                            </div>
                          </div>
                          <div className="text-center p-2 lg:p-3 bg-green-50 rounded-lg">
                            <div className="text-xs lg:text-sm text-green-600 font-medium mb-1">
                              Trung bình
                            </div>
                            <div className="text-sm lg:text-base font-bold text-green-800">
                              {formatCurrency(
                                investment.averageAmount,
                                investment.asset.currency
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Investment Period */}
                        <div className="text-xs lg:text-sm text-gray-600 space-y-1">
                          <div className="flex justify-between">
                            <span>Đầu tư đầu tiên:</span>
                            <span className="font-medium">
                              {formatDate(investment.firstInvestmentDate)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span>Giao dịch gần nhất:</span>
                            <span className="font-medium">
                              {formatDate(investment.lastInvestmentDate)}
                            </span>
                          </div>
                        </div>

                        {/* Asset Details */}
                        <div className="pt-3 border-t border-gray-100">
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div className="flex items-center gap-1">
                              <Coins className="w-3 h-3 text-gray-400" />
                              <span className="text-gray-600">
                                {investment.asset.unit}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-3 h-3 text-gray-400" />
                              <span className="text-gray-600">
                                {investment.asset.currency}
                              </span>
                            </div>
                            {investment.asset.provider && (
                              <div className="col-span-2 flex items-center gap-1">
                                <Package className="w-3 h-3 text-gray-400" />
                                <span className="text-gray-600 truncate">
                                  {investment.asset.provider}
                                </span>
                              </div>
                            )}
                          </div>
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
    </UserLayout>
  );
}
