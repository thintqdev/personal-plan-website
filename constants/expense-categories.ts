// Expense categories for finance management
export const EXPENSE_CATEGORIES = [
  // Food & Dining
  { value: "Ăn uống", label: "🍽️ Ăn uống", group: "Food & Dining" },
  { value: "Ăn vặt", label: "🍿 Ăn vặt", group: "Food & Dining" },
  { value: "Ăn uống ngoài", label: "🍽️ Ăn uống ngoài", group: "Food & Dining" },
  { value: "Đồ uống", label: "🥤 Đồ uống", group: "Food & Dining" },

  // Transportation
  { value: "Đi lại", label: "🚗 Đi lại", group: "Transportation" },
  { value: "Xăng xe", label: "⛽ Xăng xe", group: "Transportation" },
  { value: "Gửi xe", label: "🅿️ Gửi xe", group: "Transportation" },
  { value: "Taxi/Grab", label: "🚕 Taxi/Grab", group: "Transportation" },
  {
    value: "Phương tiện công cộng",
    label: "🚌 Phương tiện công cộng",
    group: "Transportation",
  },

  // Shopping
  { value: "Mua sắm", label: "🛒 Mua sắm", group: "Shopping" },
  { value: "Quần áo", label: "👕 Quần áo", group: "Shopping" },
  { value: "Giày dép", label: "👟 Giày dép", group: "Shopping" },
  { value: "Phụ kiện", label: "👜 Phụ kiện", group: "Shopping" },
  { value: "Đồ điện tử", label: "📱 Đồ điện tử", group: "Shopping" },

  // Entertainment
  { value: "Giải trí", label: "🎬 Giải trí", group: "Entertainment" },
  { value: "Phim ảnh", label: "🎭 Phim ảnh", group: "Entertainment" },
  { value: "Âm nhạc", label: "🎵 Âm nhạc", group: "Entertainment" },
  { value: "Sách báo", label: "📚 Sách báo", group: "Entertainment" },
  { value: "Game", label: "🎮 Game", group: "Entertainment" },
  { value: "Du lịch", label: "✈️ Du lịch", group: "Entertainment" },

  // Health & Beauty
  { value: "Sức khỏe", label: "🏥 Sức khỏe", group: "Health & Beauty" },
  { value: "Mỹ phẩm", label: "💄 Mỹ phẩm", group: "Health & Beauty" },
  {
    value: "Chăm sóc cá nhân",
    label: "🧴 Chăm sóc cá nhân",
    group: "Health & Beauty",
  },
  { value: "Thuốc men", label: "💊 Thuốc men", group: "Health & Beauty" },
  {
    value: "Khám chữa bệnh",
    label: "🩺 Khám chữa bệnh",
    group: "Health & Beauty",
  },

  // Education
  { value: "Giáo dục", label: "🎓 Giáo dục", group: "Education" },
  { value: "Khóa học", label: "📖 Khóa học", group: "Education" },
  { value: "Sách vở", label: "📝 Sách vở", group: "Education" },
  { value: "Học phí", label: "💰 Học phí", group: "Education" },
  { value: "Thi cử", label: "📋 Thi cử", group: "Education" },

  // Home & Living
  { value: "Nhà cửa", label: "🏠 Nhà cửa", group: "Home & Living" },
  { value: "Đồ gia dụng", label: "🏡 Đồ gia dụng", group: "Home & Living" },
  { value: "Sửa chữa", label: "🔧 Sửa chữa", group: "Home & Living" },
  { value: "Điện nước", label: "⚡ Điện nước", group: "Home & Living" },


  // Bills & Utilities
  { value: "Tiền điện", label: "⚡ Tiền điện", group: "Bills & Utilities" },
  { value: "Tiền nước", label: "💧 Tiền nước", group: "Bills & Utilities" },
  { value: "Tiền gas", label: "🔥 Tiền gas", group: "Bills & Utilities" },
  { value: "Điện thoại", label: "📱 Điện thoại", group: "Bills & Utilities" },
  { value: "Internet/Wifi", label: "🌐 Internet/Wifi", group: "Bills & Utilities" },

  // Personal & Family
  { value: "Gia đình", label: "👨‍👩‍👧‍👦 Gia đình", group: "Personal & Family" },
  { value: "Bạn bè", label: "👥 Bạn bè", group: "Personal & Family" },
  { value: "Quà tặng", label: "🎁 Quà tặng", group: "Personal & Family" },
  { value: "Từ thiện", label: "❤️ Từ thiện", group: "Personal & Family" },

  // Work & Business
  { value: "Công việc", label: "💼 Công việc", group: "Work & Business" },
  {
    value: "Công cụ làm việc",
    label: "🛠️ Công cụ làm việc",
    group: "Work & Business",
  },
  { value: "Đào tạo", label: "📈 Đào tạo", group: "Work & Business" },

  // Other
  { value: "Khác", label: "📦 Khác", group: "Other" },
  { value: "Bất ngờ", label: "❓ Bất ngờ", group: "Other" },
  { value: "Đầu tư", label: "📊 Đầu tư", group: "Other" },
  { value: "Tiết kiệm", label: "💰 Tiết kiệm", group: "Other" },
];

// Group categories by their group
export const getCategoriesByGroup = () => {
  const grouped: Record<string, typeof EXPENSE_CATEGORIES> = {};
  EXPENSE_CATEGORIES.forEach((category) => {
    if (!grouped[category.group]) {
      grouped[category.group] = [];
    }
    grouped[category.group].push(category);
  });
  return grouped;
};

// Get all category values for validation
export const getCategoryValues = () => {
  return EXPENSE_CATEGORIES.map((cat) => cat.value);
};

// Get category label by value
export const getCategoryLabel = (value: string) => {
  const category = EXPENSE_CATEGORIES.find((cat) => cat.value === value);
  return category ? category.label : value;
};

// Get category group by value
export const getCategoryGroup = (value: string) => {
  const category = EXPENSE_CATEGORIES.find((cat) => cat.value === value);
  return category ? category.group : "Other";
};
