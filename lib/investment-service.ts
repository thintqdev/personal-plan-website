import { API_URL } from "./types";
import { Asset } from "./asset-service";
import { getAuthHeaders } from "./utils";

export interface Investment {
  _id: string;
  userId: string;
  assetId: Asset;
  amount: number;
  date: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateInvestmentRequest {
  assetId: string;
  amount: number;
  date: string;
  description?: string;
  userId: string;
}

export interface UpdateInvestmentRequest {
  assetId?: string;
  amount?: number;
  date?: string;
  description?: string;
}

// Get all investments
export const getInvestments = async (): Promise<Investment[]> => {
  const response = await fetch(`${API_URL}/api/investments`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch investments: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
};

// Get investment by ID
export const getInvestmentById = async (id: string): Promise<Investment> => {
  const response = await fetch(`${API_URL}/api/investments/${id}`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch investment: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
};

// Create a new investment
export const createInvestment = async (
  investment: CreateInvestmentRequest
): Promise<Investment> => {
  const response = await fetch(`${API_URL}/api/investments`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(investment),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to create investment: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
};

// Update an investment
export const updateInvestment = async (
  id: string,
  investment: UpdateInvestmentRequest
): Promise<Investment> => {
  const response = await fetch(`${API_URL}/api/investments/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(investment),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to update investment: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
};

// Delete an investment
export const deleteInvestment = async (id: string): Promise<void> => {
  const response = await fetch(`${API_URL}/api/investments/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to delete investment: ${response.status} ${response.statusText}`
    );
  }
};
