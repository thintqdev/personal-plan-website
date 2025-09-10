"use client";
import { useState, useEffect, useRef } from "react";
import {
  Plus,
  Edit,
  Trash2,
  Coins,
  DollarSign,
  Calendar,
  Package,
  Tag,
  Briefcase,
  Globe,
  BarChart,
  Search,
} from "lucide-react";
import {
  Asset,
  CreateAssetRequest,
  UpdateAssetRequest,
  getAllAssets,
  createAsset,
  updateAsset,
  deleteAsset,
} from "@/lib/asset-service";
import {
  Investment,
  CreateInvestmentRequest,
  UpdateInvestmentRequest,
  getInvestments,
  createInvestment,
  updateInvestment,
  deleteInvestment,
} from "@/lib/investment-service";
import { getCurrentUser } from "@/lib/utils";

export default function InvestmentPage() {
  // Investment states
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isInvestmentModalOpen, setIsInvestmentModalOpen] = useState(false);
  const [editingInvestment, setEditingInvestment] = useState<Investment | null>(
    null
  );
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [investmentFormData, setInvestmentFormData] =
    useState<CreateInvestmentRequest>({
      assetId: "",
      amount: 0,
      date: new Date().toISOString().slice(0, 10),
      description: "",
      userId: "",
    });
  const [investmentErrors, setInvestmentErrors] = useState<{
    [key: string]: string;
  }>({});

  // Asset states
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isAssetModalOpen, setIsAssetModalOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);
  const [assetFormData, setAssetFormData] = useState<CreateAssetRequest>({
    type: "mutual_fund",
    code: "",
    name: "",
    currency: "VND",
    unit: "unit",
    provider: "",
    exchange: "",
  });
  const [assetErrors, setAssetErrors] = useState<{ [key: string]: string }>({});

  // Filter and sort states
  const [investmentSearchQuery, setInvestmentSearchQuery] = useState("");
  const [assetSearchInSelect, setAssetSearchInSelect] = useState("");
  const [assetSearchQuery, setAssetSearchQuery] = useState(""); // Added for asset search in asset list
  const [selectedAssetType, setSelectedAssetType] = useState<string | null>(
    null
  ); // Asset type filter

  // History modal states
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const [selectedAssetForHistory, setSelectedAssetForHistory] =
    useState<Asset | null>(null);

  useEffect(() => {
    // Get current user from localStorage
    const user = getCurrentUser();
    setCurrentUser(user);

    fetchAssets();
    fetchInvestments();

    // Update the investment form with user ID
    if (user && user._id) {
      setInvestmentFormData((prev) => ({
        ...prev,
        userId: user._id,
      }));
    }
  }, []);

  const fetchAssets = async () => {
    try {
      const response = await getAllAssets();
      setAssets(response);
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };

  const fetchInvestments = async () => {
    try {
      setLoading(true);
      const response = await getInvestments();
      setInvestments(response);
    } catch (error) {
      console.error("Error fetching investments:", error);
    } finally {
      setLoading(false);
    }
  };

  // Investment form validation
  const validateInvestmentForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!investmentFormData.assetId) {
      newErrors.assetId = "Tài sản không được để trống";
    }

    if (investmentFormData.amount <= 0) {
      newErrors.amount = "Số tiền phải lớn hơn 0";
    }

    if (!investmentFormData.date) {
      newErrors.date = "Ngày không được để trống";
    }

    if (!investmentFormData.userId) {
      newErrors.userId =
        "Người dùng không được để trống. Vui lòng đăng nhập lại";
    }

    setInvestmentErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Asset form validation
  const validateAssetForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!assetFormData.type) {
      newErrors.type = "Loại tài sản không được để trống";
    }

    if (!assetFormData.code) {
      newErrors.code = "Mã tài sản không được để trống";
    }

    if (!assetFormData.name) {
      newErrors.name = "Tên tài sản không được để trống";
    }

    if (!assetFormData.currency) {
      newErrors.currency = "Tiền tệ không được để trống";
    }

    if (!assetFormData.unit) {
      newErrors.unit = "Đơn vị không được để trống";
    }

    setAssetErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Investment form submission
  const handleInvestmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInvestmentForm()) {
      return;
    }

    // Check if user is authenticated
    if (!investmentFormData.userId) {
      alert("Bạn cần đăng nhập để thực hiện chức năng này.");
      return;
    }

    try {
      if (editingInvestment) {
        await updateInvestment(
          editingInvestment._id,
          investmentFormData as UpdateInvestmentRequest
        );
      } else {
        await createInvestment(investmentFormData);
      }
      await fetchInvestments();
      resetInvestmentForm();
    } catch (error: any) {
      console.error("Error saving investment:", error);
      const errorMessage =
        error.message || "Có lỗi xảy ra khi lưu khoản đầu tư";
      alert(`Lỗi: ${errorMessage}`);
    }
  };

  // Handle Asset form submission
  const handleAssetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateAssetForm()) {
      return;
    }

    try {
      if (editingAsset) {
        await updateAsset(
          editingAsset._id,
          assetFormData as UpdateAssetRequest
        );
      } else {
        await createAsset(assetFormData);
      }
      await fetchAssets();
      resetAssetForm();
    } catch (error) {
      console.error("Error saving asset:", error);
    }
  };

  // Edit Investment
  const handleEditInvestment = (investment: Investment) => {
    setEditingInvestment(investment);
    setInvestmentFormData({
      assetId: investment.assetId._id,
      amount: investment.amount,
      date: new Date(investment.date).toISOString().slice(0, 10),
      description: investment.description || "",
      userId: investment.userId || currentUser?._id || "",
    });
    setIsInvestmentModalOpen(true);
  };

  // Delete Investment
  const handleDeleteInvestment = async (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa khoản đầu tư này?")) {
      try {
        await deleteInvestment(id);
        await fetchInvestments();
      } catch (error) {
        console.error("Error deleting investment:", error);
      }
    }
  };

  // Edit Asset
  const handleEditAsset = (asset: Asset) => {
    setEditingAsset(asset);
    setAssetFormData({
      type: asset.type,
      code: asset.code,
      name: asset.name,
      currency: asset.currency,
      unit: asset.unit,
      provider: asset.provider || "",
      exchange: asset.exchange || "",
      metadata: asset.metadata,
    });
    setIsAssetModalOpen(true);
  };

  // Delete Asset
  const handleDeleteAsset = async (id: string) => {
    // Check if asset is used in any investment
    const assetInUse = investments.some((inv) => inv.assetId._id === id);

    if (assetInUse) {
      alert(
        "Không thể xóa tài sản này vì đang được sử dụng trong các khoản đầu tư."
      );
      return;
    }

    if (confirm("Bạn có chắc chắn muốn xóa tài sản này?")) {
      try {
        await deleteAsset(id);
        await fetchAssets();
      } catch (error) {
        console.error("Error deleting asset:", error);
      }
    }
  };

  // Reset Investment form
  const resetInvestmentForm = () => {
    setInvestmentFormData({
      assetId: "",
      amount: 0,
      date: new Date().toISOString().slice(0, 10),
      description: "",
      userId: currentUser?._id || "",
    });
    setEditingInvestment(null);
    setIsInvestmentModalOpen(false);
    setInvestmentErrors({});
    setAssetSearchInSelect("");
  };

  // Reset Asset form
  const resetAssetForm = () => {
    setAssetFormData({
      type: "mutual_fund",
      code: "",
      name: "",
      currency: "VND",
      unit: "unit",
      provider: "",
      exchange: "",
    });
    setEditingAsset(null);
    setIsAssetModalOpen(false);
    setAssetErrors({});
    // Refresh assets after adding new asset
    fetchAssets();
  };

  // Format currency
  const formatCurrency = (amount: number, currency: string = "VND") => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: currency,
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN");
  };

  // Asset type options
  const assetTypeOptions = [
    {
      value: "mutual_fund",
      label: "Quỹ đầu tư",
      icon: <Briefcase className="w-5 h-5" />,
    },
    {
      value: "stock",
      label: "Cổ phiếu",
      icon: <BarChart className="w-5 h-5" />,
    },
    {
      value: "crypto",
      label: "Tiền điện tử",
      icon: <Coins className="w-5 h-5" />,
    },
    { value: "gold", label: "Vàng", icon: <DollarSign className="w-5 h-5" /> },
    { value: "other", label: "Khác", icon: <Package className="w-5 h-5" /> },
  ];

  // Get aggregated investments by asset
  const getAggregatedInvestments = () => {
    const aggregated = new Map();

    investments.forEach((investment) => {
      const assetId = investment.assetId._id;
      if (aggregated.has(assetId)) {
        const existing = aggregated.get(assetId);
        existing.totalAmount += investment.amount;
        existing.transactions.push(investment);
      } else {
        aggregated.set(assetId, {
          asset: investment.assetId,
          totalAmount: investment.amount,
          transactions: [investment],
        });
      }
    });

    return Array.from(aggregated.values());
  };

  // Filter assets by search and type
  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(assetSearchQuery.toLowerCase()) ||
      asset.code.toLowerCase().includes(assetSearchQuery.toLowerCase());
    const matchesType = selectedAssetType
      ? asset.type === selectedAssetType
      : true;
    return matchesSearch && matchesType;
  });

  // Filter aggregated investments by search
  const filteredAggregatedInvestments = getAggregatedInvestments().filter(
    (aggregatedInv) => {
      const assetName = aggregatedInv.asset.name.toLowerCase();
      const assetCode = aggregatedInv.asset.code.toLowerCase();
      const searchLower = investmentSearchQuery.toLowerCase();

      return assetName.includes(searchLower) || assetCode.includes(searchLower);
    }
  );

  // Get total investment amount
  const getTotalInvestment = () => {
    return investments.reduce((total, investment) => {
      if (investment.assetId.currency === "VND") {
        return total + investment.amount;
      }
      // For simplicity, we're not converting other currencies
      return total;
    }, 0);
  };

  // Get investment history for specific asset
  const getInvestmentHistory = (assetId: string) => {
    return investments
      .filter((inv) => inv.assetId._id === assetId)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  };

  // Get icon for asset type
  const getAssetTypeIcon = (type: string) => {
    const assetType = assetTypeOptions.find((option) => option.value === type);
    return assetType ? assetType.icon : <Package className="w-5 h-5" />;
  };

  // Get label for asset type
  const getAssetTypeLabel = (type: string) => {
    const assetType = assetTypeOptions.find((option) => option.value === type);
    return assetType ? assetType.label : "Khác";
  };

  // Create investment from asset
  const handleCreateInvestmentFromAsset = (asset: Asset) => {
    setInvestmentFormData({
      assetId: asset._id,
      amount: 0,
      date: new Date().toISOString().slice(0, 10),
      description: `Đầu tư vào ${asset.name} (${asset.code})`,
      userId: currentUser?._id || "",
    });
    setIsInvestmentModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Check if user is authenticated
  if (!currentUser || !currentUser._id) {
    return (
      <div className="min-h-screen p-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center">
            <div className="text-red-500 text-5xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Bạn chưa đăng nhập
            </h1>
            <p className="text-gray-600 mb-6">
              Vui lòng đăng nhập để sử dụng chức năng quản lý đầu tư.
            </p>
            <a
              href="/login"
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg inline-block"
            >
              Đăng nhập
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Quản lý Đầu tư
          </h1>
          <p className="text-gray-600">
            Theo dõi và quản lý danh mục đầu tư của bạn
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                Tổng đầu tư
              </h2>
              <DollarSign className="h-6 w-6 text-indigo-600" />
            </div>
            <p className="text-2xl font-bold text-indigo-600 mt-2">
              {formatCurrency(getTotalInvestment())}
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                Số lượng tài sản
              </h2>
              <Package className="h-6 w-6 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600 mt-2">
              {assets.length} tài sản
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">
                Số giao dịch
              </h2>
              <Calendar className="h-6 w-6 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-blue-600 mt-2">
              {investments.length} giao dịch
            </p>
          </div>
        </div>

        {/* Investments Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Danh mục đầu tư cá nhân
              </h2>
              <p className="text-gray-600 mt-1">Giao dịch đầu tư của bạn</p>
            </div>
            <button
              onClick={() => setIsInvestmentModalOpen(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              disabled={assets.length === 0}
            >
              <Plus className="w-4 h-4" />
              Thêm khoản đầu tư
            </button>
          </div>

          {/* Investment Filters */}
          <div className="mb-4">
            <div className="relative">
              <input
                type="text"
                value={investmentSearchQuery}
                onChange={(e) => setInvestmentSearchQuery(e.target.value)}
                placeholder="Tìm kiếm khoản đầu tư..."
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Investment Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredAggregatedInvestments.map((aggregatedInv) => (
              <div
                key={aggregatedInv.asset._id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="bg-indigo-50 px-4 py-3 border-b flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    {getAssetTypeIcon(aggregatedInv.asset.type)}
                    <span className="font-medium text-gray-800">
                      {aggregatedInv.asset.code}
                    </span>
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => {
                        setSelectedAssetForHistory(aggregatedInv.asset);
                        setIsHistoryModalOpen(true);
                      }}
                      className="p-1.5 rounded-full hover:bg-indigo-100 text-green-600"
                      title="Xem lịch sử"
                    >
                      📊
                    </button>
                    <button
                      onClick={() =>
                        handleCreateInvestmentFromAsset(aggregatedInv.asset)
                      }
                      className="p-1.5 rounded-full hover:bg-indigo-100 text-blue-600"
                      title="Thêm giao dịch"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <div className="mb-3">
                    <div className="text-sm text-gray-600 truncate">
                      {aggregatedInv.asset.name}
                    </div>
                    <div className="text-lg font-semibold text-gray-900 mt-1">
                      {formatCurrency(
                        aggregatedInv.totalAmount,
                        aggregatedInv.asset.currency
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">
                        {aggregatedInv.transactions.length} giao dịch
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-gray-500" />
                      <span className="text-xs">
                        Gần nhất:{" "}
                        {formatDate(
                          aggregatedInv.transactions.sort(
                            (a: any, b: any) =>
                              new Date(b.date).getTime() -
                              new Date(a.date).getTime()
                          )[0]?.date || ""
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      {getAssetTypeLabel(aggregatedInv.asset.type)}
                    </div>
                    <div className="text-xs text-gray-500">
                      {aggregatedInv.asset.unit} •{" "}
                      {aggregatedInv.asset.currency}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredAggregatedInvestments.length === 0 && (
            <div className="text-center py-8 bg-white rounded-xl shadow-lg mt-4">
              <Coins className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                Không có khoản đầu tư nào
              </h3>
              <p className="text-gray-500 mb-4">
                {investmentSearchQuery
                  ? "Không tìm thấy khoản đầu tư phù hợp"
                  : "Bạn chưa thêm khoản đầu tư nào"}
              </p>
              {!investmentSearchQuery && assets.length > 0 && (
                <button
                  onClick={() => setIsInvestmentModalOpen(true)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg"
                >
                  Thêm khoản đầu tư
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Investment Modal */}
      {isInvestmentModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {editingInvestment
                  ? "Chỉnh sửa khoản đầu tư"
                  : "Thêm khoản đầu tư mới"}
              </h2>

              <form onSubmit={handleInvestmentSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tài sản
                  </label>

                  <select
                    value={investmentFormData.assetId}
                    onChange={(e) => {
                      if (e.target.value === "ADD_NEW") {
                        setIsAssetModalOpen(true);
                      } else {
                        setInvestmentFormData({
                          ...investmentFormData,
                          assetId: e.target.value,
                        });
                      }
                    }}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      investmentErrors.assetId
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                    required
                  >
                    <option value="">-- Chọn tài sản --</option>
                    {assets
                      .filter(
                        (asset) =>
                          assetSearchInSelect === "" ||
                          asset.name
                            .toLowerCase()
                            .includes(assetSearchInSelect.toLowerCase()) ||
                          asset.code
                            .toLowerCase()
                            .includes(assetSearchInSelect.toLowerCase())
                      )
                      .map((asset) => (
                        <option key={asset._id} value={asset._id}>
                          {asset.code} - {asset.name}
                        </option>
                      ))}
                    <option
                      value="ADD_NEW"
                      className="bg-indigo-50 font-medium"
                    >
                      ➕ Thêm tài sản mới
                    </option>
                  </select>

                  {/* Asset management buttons */}
                  {investmentFormData.assetId &&
                    investmentFormData.assetId !== "ADD_NEW" && (
                      <div className="flex gap-2 mt-2">
                        <button
                          type="button"
                          onClick={() => {
                            const asset = assets.find(
                              (a) => a._id === investmentFormData.assetId
                            );
                            if (asset) handleEditAsset(asset);
                          }}
                          className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 py-1.5 px-3 rounded text-sm flex items-center justify-center gap-1"
                        >
                          <Edit className="w-3 h-3" />
                          Sửa tài sản
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const asset = assets.find(
                              (a) => a._id === investmentFormData.assetId
                            );
                            if (asset) {
                              setSelectedAssetForHistory(asset);
                              setIsHistoryModalOpen(true);
                            }
                          }}
                          className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 py-1.5 px-3 rounded text-sm flex items-center justify-center gap-1"
                        >
                          📊 Lịch sử
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (investmentFormData.assetId)
                              handleDeleteAsset(investmentFormData.assetId);
                          }}
                          className="bg-red-100 hover:bg-red-200 text-red-700 py-1.5 px-3 rounded text-sm flex items-center justify-center"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}

                  {investmentErrors.assetId && (
                    <p className="text-red-500 text-xs mt-1">
                      {investmentErrors.assetId}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Số tiền
                  </label>
                  <input
                    type="number"
                    value={investmentFormData.amount}
                    onChange={(e) =>
                      setInvestmentFormData({
                        ...investmentFormData,
                        amount: Number(e.target.value),
                      })
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      investmentErrors.amount
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                    required
                    min="0"
                  />
                  {investmentErrors.amount && (
                    <p className="text-red-500 text-xs mt-1">
                      {investmentErrors.amount}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ngày đầu tư
                  </label>
                  <input
                    type="date"
                    value={investmentFormData.date}
                    onChange={(e) =>
                      setInvestmentFormData({
                        ...investmentFormData,
                        date: e.target.value,
                      })
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      investmentErrors.date
                        ? "border-red-300"
                        : "border-gray-300"
                    }`}
                    required
                  />
                  {investmentErrors.date && (
                    <p className="text-red-500 text-xs mt-1">
                      {investmentErrors.date}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mô tả (tùy chọn)
                  </label>
                  <textarea
                    value={investmentFormData.description}
                    onChange={(e) =>
                      setInvestmentFormData({
                        ...investmentFormData,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    rows={3}
                    placeholder="Ghi chú về khoản đầu tư..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    {editingInvestment ? "Cập nhật" : "Thêm khoản đầu tư"}
                  </button>
                  <button
                    type="button"
                    onClick={resetInvestmentForm}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Asset Modal */}
      {isAssetModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {editingAsset ? "Chỉnh sửa tài sản" : "Thêm tài sản mới"}
              </h2>
              <p className="text-gray-500 text-sm mb-4">
                Tài sản là dữ liệu chung, sẽ được chia sẻ cho tất cả người dùng
              </p>

              <form onSubmit={handleAssetSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Loại tài sản
                  </label>
                  <select
                    value={assetFormData.type}
                    onChange={(e) =>
                      setAssetFormData({
                        ...assetFormData,
                        type: e.target.value,
                      })
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      assetErrors.type ? "border-red-300" : "border-gray-300"
                    }`}
                    required
                  >
                    {assetTypeOptions.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  {assetErrors.type && (
                    <p className="text-red-500 text-xs mt-1">
                      {assetErrors.type}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mã tài sản
                  </label>
                  <input
                    type="text"
                    value={assetFormData.code}
                    onChange={(e) =>
                      setAssetFormData({
                        ...assetFormData,
                        code: e.target.value.toUpperCase(),
                      })
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      assetErrors.code ? "border-red-300" : "border-gray-300"
                    }`}
                    required
                    disabled={!!editingAsset} // Can't edit code of existing asset
                  />
                  {assetErrors.code && (
                    <p className="text-red-500 text-xs mt-1">
                      {assetErrors.code}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tên tài sản
                  </label>
                  <input
                    type="text"
                    value={assetFormData.name}
                    onChange={(e) =>
                      setAssetFormData({
                        ...assetFormData,
                        name: e.target.value,
                      })
                    }
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                      assetErrors.name ? "border-red-300" : "border-gray-300"
                    }`}
                    required
                  />
                  {assetErrors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {assetErrors.name}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Đơn vị
                    </label>
                    <input
                      type="text"
                      value={assetFormData.unit}
                      onChange={(e) =>
                        setAssetFormData({
                          ...assetFormData,
                          unit: e.target.value,
                        })
                      }
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        assetErrors.unit ? "border-red-300" : "border-gray-300"
                      }`}
                      required
                      placeholder="CCQ, cổ phiếu, oz, coin..."
                    />
                    {assetErrors.unit && (
                      <p className="text-red-500 text-xs mt-1">
                        {assetErrors.unit}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Tiền tệ
                    </label>
                    <select
                      value={assetFormData.currency}
                      onChange={(e) =>
                        setAssetFormData({
                          ...assetFormData,
                          currency: e.target.value,
                        })
                      }
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                        assetErrors.currency
                          ? "border-red-300"
                          : "border-gray-300"
                      }`}
                      required
                    >
                      <option value="VND">VND</option>
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                    </select>
                    {assetErrors.currency && (
                      <p className="text-red-500 text-xs mt-1">
                        {assetErrors.currency}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nhà cung cấp (tùy chọn)
                  </label>
                  <input
                    type="text"
                    value={assetFormData.provider || ""}
                    onChange={(e) =>
                      setAssetFormData({
                        ...assetFormData,
                        provider: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Công ty quản lý quỹ, công ty..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Sàn giao dịch (tùy chọn)
                  </label>
                  <input
                    type="text"
                    value={assetFormData.exchange || ""}
                    onChange={(e) =>
                      setAssetFormData({
                        ...assetFormData,
                        exchange: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="HOSE, NYSE, Binance..."
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition-colors"
                  >
                    {editingAsset ? "Cập nhật" : "Thêm tài sản"}
                  </button>
                  <button
                    type="button"
                    onClick={resetAssetForm}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg transition-colors"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Investment History Modal */}
      {isHistoryModalOpen && selectedAssetForHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Lịch sử giao dịch - {selectedAssetForHistory.code}
                  </h2>
                  <p className="text-gray-600 mt-1">
                    {selectedAssetForHistory.name}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsHistoryModalOpen(false);
                    setSelectedAssetForHistory(null);
                  }}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {/* Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <div className="text-sm text-indigo-600 font-medium">
                    Tổng đầu tư
                  </div>
                  <div className="text-xl font-bold text-indigo-900">
                    {formatCurrency(
                      getInvestmentHistory(selectedAssetForHistory._id).reduce(
                        (sum, inv) => sum + inv.amount,
                        0
                      ),
                      selectedAssetForHistory.currency
                    )}
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="text-sm text-green-600 font-medium">
                    Số giao dịch
                  </div>
                  <div className="text-xl font-bold text-green-900">
                    {getInvestmentHistory(selectedAssetForHistory._id).length}
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-sm text-blue-600 font-medium">
                    Trung bình
                  </div>
                  <div className="text-xl font-bold text-blue-900">
                    {formatCurrency(
                      getInvestmentHistory(selectedAssetForHistory._id).reduce(
                        (sum, inv) => sum + inv.amount,
                        0
                      ) /
                        Math.max(
                          getInvestmentHistory(selectedAssetForHistory._id)
                            .length,
                          1
                        ),
                      selectedAssetForHistory.currency
                    )}
                  </div>
                </div>
              </div>

              {/* Transaction List */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Chi tiết giao dịch
                </h3>
                {getInvestmentHistory(selectedAssetForHistory._id).map(
                  (investment) => (
                    <div
                      key={investment._id}
                      className="bg-white border border-gray-200 rounded-lg p-4"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="text-lg font-semibold text-gray-900">
                              {formatCurrency(
                                investment.amount,
                                selectedAssetForHistory.currency
                              )}
                            </div>
                            <div className="text-sm text-gray-500">
                              {formatDate(investment.date)}
                            </div>
                          </div>
                          {investment.description && (
                            <div className="text-sm text-gray-600 mb-2">
                              {investment.description}
                            </div>
                          )}
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => {
                              handleEditInvestment(investment);
                              setIsHistoryModalOpen(false);
                            }}
                            className="p-1.5 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700"
                            title="Chỉnh sửa"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              if (
                                confirm(
                                  "Bạn có chắc chắn muốn xóa giao dịch này?"
                                )
                              ) {
                                handleDeleteInvestment(investment._id);
                                if (
                                  getInvestmentHistory(
                                    selectedAssetForHistory._id
                                  ).length <= 1
                                ) {
                                  setIsHistoryModalOpen(false);
                                }
                              }
                            }}
                            className="p-1.5 rounded-lg bg-red-100 hover:bg-red-200 text-red-700"
                            title="Xóa"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  )
                )}

                {getInvestmentHistory(selectedAssetForHistory._id).length ===
                  0 && (
                  <div className="text-center py-8 text-gray-500">
                    Chưa có giao dịch nào cho tài sản này
                  </div>
                )}
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => {
                    handleCreateInvestmentFromAsset(selectedAssetForHistory);
                    setIsHistoryModalOpen(false);
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Thêm giao dịch mới
                </button>
                <button
                  onClick={() => {
                    setIsHistoryModalOpen(false);
                    setSelectedAssetForHistory(null);
                  }}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded-lg"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
