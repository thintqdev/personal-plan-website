import { API_URL } from "./types";
import { authService } from "./auth-service";

/**
 * Get authenticated headers for API calls
 */
function getAuthHeaders(): HeadersInit {
    const headers: HeadersInit = {
        "Content-Type": "application/json",
    };

    const token = authService.getToken();
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    return headers;
}

// Goal-specific types
export interface SubGoal {
    _id?: string;
    title: string;
    description: string;
    status: "Not Started" | "In Progress" | "Completed" | "On Hold";
    targetDate?: string;
    completedAt?: string;
}

export interface Goal {
    _id: string;
    title: string;
    description: string;
    category: string;
    priority: "Low" | "Medium" | "High";
    status: "Not Started" | "In Progress" | "Completed" | "On Hold";
    targetDate?: string;
    subGoals?: SubGoal[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface CreateGoalRequest {
    title: string;
    description: string;
    category: string;
    priority: "Low" | "Medium" | "High";
    status: "Not Started" | "In Progress" | "Completed" | "On Hold";
    targetDate?: string;
    subGoals?: SubGoal[];
}

export interface UpdateGoalRequest {
    title?: string;
    description?: string;
    category?: string;
    priority?: "Low" | "Medium" | "High";
    status?: "Not Started" | "In Progress" | "Completed" | "On Hold";
    targetDate?: string;
    subGoals?: SubGoal[];
}

/**
 * Get all goals from the API
 */
export async function getGoals(): Promise<Goal[]> {
    try {
        const response = await fetch(`${API_URL}/api/goals`, {
            method: "GET",
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error(
                `Failed to fetch goals: ${response.status} ${response.statusText}`
            );
        }

        const data = await response.json();

        // Handle different response formats
        if (Array.isArray(data)) {
            return data;
        } else if (data && Array.isArray(data.goals)) {
            return data.goals;
        } else {
            console.warn("Unexpected API response format:", data);
            return [];
        }
    } catch (error) {
        console.error("Error fetching goals:", error);
        throw error;
    }
}

/**
 * Create a new goal
 */
export async function createGoal(goal: CreateGoalRequest): Promise<Goal> {
    try {
        const response = await fetch(`${API_URL}/api/goals`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(goal),
        });

        if (!response.ok) {
            throw new Error(
                `Failed to create goal: ${response.status} ${response.statusText}`
            );
        }

        const newGoal = await response.json();
        return newGoal;
    } catch (error) {
        console.error("Error creating goal:", error);
        throw error;
    }
}

/**
 * Update a goal
 */
export async function updateGoal(
    goalId: string,
    updates: UpdateGoalRequest
): Promise<Goal> {
    try {
        const response = await fetch(`${API_URL}/api/goals/${goalId}`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(updates),
        });

        if (!response.ok) {
            throw new Error(
                `Failed to update goal: ${response.status} ${response.statusText}`
            );
        }

        const updatedGoal = await response.json();
        return updatedGoal;
    } catch (error) {
        console.error("Error updating goal:", error);
        throw error;
    }
}

/**
 * Delete a goal
 */
export async function deleteGoal(goalId: string): Promise<void> {
    try {
        const response = await fetch(`${API_URL}/api/goals/${goalId}`, {
            method: "DELETE",
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error(
                `Failed to delete goal: ${response.status} ${response.statusText}`
            );
        }
    } catch (error) {
        console.error("Error deleting goal:", error);
        throw error;
    }
}

/**
 * Get a single goal by ID
 */
export async function getGoal(goalId: string): Promise<Goal> {
    try {
        const response = await fetch(`${API_URL}/api/goals/${goalId}`, {
            method: "GET",
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error(
                `Failed to fetch goal: ${response.status} ${response.statusText}`
            );
        }

        const goal = await response.json();
        return goal;
    } catch (error) {
        console.error("Error fetching goal:", error);
        throw error;
    }
}