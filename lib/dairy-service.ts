import { getAuthHeaders } from "./utils";

export interface Dairy {
  _id?: string;
  userId: string;
  title: string;
  content: string;
  mood: number;
  tags?: string[];
  isPublic?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export const fetchDairies = async (userId: string): Promise<Dairy[]> => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/dairies?userId=${userId}`,
    { method: "GET", headers: getAuthHeaders() }
  );
  const data = await res.json();
  // Controller mới trả về array trực tiếp, không wrap trong data
  return Array.isArray(data) ? data : data.data || [];
};

export const createDairy = async (payload: Partial<Dairy>) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dairies`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...getAuthHeaders() },
    body: JSON.stringify(payload),
  });
  return res.json();
};

export const updateDairy = async (id: string, payload: Partial<Dairy>) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/dairies/${id}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json", ...getAuthHeaders() },
      body: JSON.stringify(payload),
    }
  );
  return res.json();
};

export const deleteDairy = async (id: string, userId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/dairies/${id}?userId=${userId}`,
    {
      method: "DELETE",
      headers: getAuthHeaders(),
    }
  );
  return res.json();
};
