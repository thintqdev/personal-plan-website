import { API_URL } from "./types";
import { getAuthHeaders } from "./utils";

export interface Asset {
  _id: string;
  type: string;
  code: string;
  name: string;
  currency: string;
  unit: string;
  provider?: string;
  exchange?: string;
  metadata?: any;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAssetRequest {
  type: string;
  code: string;
  name: string;
  currency: string;
  unit: string;
  provider?: string;
  exchange?: string;
  metadata?: any;
}

export interface UpdateAssetRequest {
  type?: string;
  code?: string;
  name?: string;
  currency?: string;
  unit?: string;
  provider?: string;
  exchange?: string;
  metadata?: any;
}

// Get all assets
export const getAllAssets = async (): Promise<Asset[]> => {
  const response = await fetch(`${API_URL}/api/assets`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch assets: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
};

// Get asset by ID
export const getAssetById = async (id: string): Promise<Asset> => {
  const response = await fetch(`${API_URL}/api/assets/${id}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch asset: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
};

// Create a new asset
export const createAsset = async (
  asset: CreateAssetRequest
): Promise<Asset> => {
  const response = await fetch(`${API_URL}/api/assets`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(asset),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to create asset: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
};

// Update an asset
export const updateAsset = async (
  id: string,
  asset: UpdateAssetRequest
): Promise<Asset> => {
  const response = await fetch(`${API_URL}/api/assets/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(asset),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to update asset: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
};

// Delete an asset
export const deleteAsset = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/api/assets/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to delete asset: ${response.status} ${response.statusText}`
    );
  }
};
