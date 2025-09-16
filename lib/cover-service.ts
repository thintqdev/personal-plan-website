import { API_URL } from "./types";
import { getAuthHeaders } from "./utils";

export interface Cover {
  _id: string;
  userId: string;
  imageUrl: string;
  title: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCoverRequest {
  imageUrl: string;
  title?: string;
  description?: string;
}

export interface CoverSuggestion {
  id: string;
  imageUrl: string;
  title: string;
  description: string;
}

// Lấy tất cả covers của user
export const getUserCovers = async (): Promise<Cover[]> => {
  try {
    const response = await fetch(`${API_URL}/api/covers`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch user covers: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.data || []; // Return empty array if no data
  } catch (error) {
    console.error("Error fetching user covers:", error);
    return []; // Return empty array on error to prevent UI crashes
  }
};

// Lấy cover đang active của user
export const getActiveCover = async (): Promise<Cover | null> => {
  try {
    const response = await fetch(`${API_URL}/api/covers/active`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      if (response.status === 404) {
        // Return null instead of throwing error when no active cover exists
        return null;
      }
      throw new Error(
        `Failed to fetch active cover: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching active cover:", error);
    // Return null for any other errors to prevent UI crashes
    return null;
  }
};

// Đặt cover làm active
export const setActiveCover = async (coverId: string): Promise<Cover> => {
  try {
    const response = await fetch(`${API_URL}/api/covers/${coverId}/active`, {
      method: "PATCH",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to set active cover: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error setting active cover:", error);
    throw error;
  }
};

// Tạo cover mới
export const createCover = async (
  coverData: CreateCoverRequest
): Promise<Cover> => {
  try {
    const response = await fetch(`${API_URL}/api/covers`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify(coverData),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to create cover: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error creating cover:", error);
    throw error;
  }
};

// Cập nhật cover cụ thể
export const updateCover = async (
  coverId: string,
  coverData: Partial<CreateCoverRequest>
): Promise<Cover> => {
  try {
    const response = await fetch(`${API_URL}/api/covers/${coverId}`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify(coverData),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to update cover: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error updating cover:", error);
    throw error;
  }
};

// Xóa cover cụ thể
export const deleteCover = async (coverId: string): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/api/covers/${coverId}`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to delete cover: ${response.status} ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Error deleting cover:", error);
    throw error;
  }
};

// Lấy danh sách gợi ý cover
export const getCoverSuggestions = async (): Promise<CoverSuggestion[]> => {
  try {
    const response = await fetch(`${API_URL}/api/covers/suggestions`, {
      method: "GET",
      headers: getAuthHeaders(),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch cover suggestions: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return data.data || []; // Return empty array if no data
  } catch (error) {
    console.error("Error fetching cover suggestions:", error);
    return []; // Return empty array on error to prevent UI crashes
  }
};
