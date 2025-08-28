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

// Task-specific types
export interface Task {
    _id: string;
    day?: string; // Optional for legacy tasks
    time: string;
    task: string;
    type: string;
    completed: boolean;
    completedAt?: string;
    __v: number;
}

export interface CreateTaskRequest {
    day: string;
    time: string;
    task: string;
    type: string;
}

export interface UpdateTaskRequest {
    day?: string;
    time?: string;
    task?: string;
    type?: string;
}

export interface DayTasks {
    day: string;
    tasks: Task[];
}

export interface TaskCompletion {
    completed: boolean;
}

/**
 * Get tasks by day from the API (Main API endpoint)
 */
export async function getTasksByDay(day: string): Promise<DayTasks> {
    try {
        const response = await fetch(
            `${API_URL}/api/tasks?day=${encodeURIComponent(day)}`,
            {
                method: "GET",
                headers: getAuthHeaders(),
            }
        );

        if (!response.ok) {
            throw new Error(
                `Failed to fetch tasks: ${response.status} ${response.statusText}`
            );
        }

        const dayTasks = await response.json();
        return dayTasks;
    } catch (error) {
        console.error("Error fetching tasks by day:", error);
        throw error;
    }
}

/**
 * Get all tasks from the API (for admin page)
 */
export async function getTasks(day?: string): Promise<Task[]> {
    try {
        // Build URL with day parameter if provided
        const url = day
            ? `${API_URL}/api/tasks?day=${encodeURIComponent(day)}`
            : `${API_URL}/api/tasks`;

        const response = await fetch(url, {
            method: "GET",
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error(
                `Failed to fetch tasks: ${response.status} ${response.statusText}`
            );
        }

        const data = await response.json();
        console.log("Raw API response from /api/tasks:", data);

        // Handle different response formats
        let tasks: Task[];
        if (Array.isArray(data)) {
            tasks = data;
        } else if (data && Array.isArray(data.tasks)) {
            tasks = data.tasks;
        } else {
            console.warn("Unexpected API response format:", data);
            return [];
        }

        return tasks;
    } catch (error) {
        console.error("Error fetching tasks:", error);
        throw error;
    }
}

/**
 * Add a new task to the API
 */
export async function addTask(taskData: CreateTaskRequest): Promise<Task> {
    try {
        const response = await fetch(`${API_URL}/api/tasks`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(taskData),
        });

        if (!response.ok) {
            throw new Error(
                `Failed to add task: ${response.status} ${response.statusText}`
            );
        }

        const newTask = await response.json();
        return newTask;
    } catch (error) {
        console.error("Error adding task:", error);
        throw error;
    }
}

/**
 * Update a task by ID
 */
export async function updateTask(
    taskId: string,
    taskData: UpdateTaskRequest
): Promise<Task> {
    try {
        const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(taskData),
        });

        if (!response.ok) {
            throw new Error(
                `Failed to update task: ${response.status} ${response.statusText}`
            );
        }

        const updatedTask = await response.json();
        return updatedTask;
    } catch (error) {
        console.error("Error updating task:", error);
        throw error;
    }
}

/**
 * Delete a task by ID
 */
export async function deleteTask(taskId: string): Promise<void> {
    try {
        const response = await fetch(`${API_URL}/api/tasks/${taskId}`, {
            method: "DELETE",
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error(
                `Failed to delete task: ${response.status} ${response.statusText}`
            );
        }
    } catch (error) {
        console.error("Error deleting task:", error);
        throw error;
    }
}

/**
 * Toggle task completion status
 */
export async function toggleTaskCompletion(
    taskId: string,
    completed: boolean
): Promise<Task> {
    try {
        const response = await fetch(`${API_URL}/api/tasks/${taskId}/complete`, {
            method: "PATCH",
            headers: getAuthHeaders(),
            body: JSON.stringify({ completed }),
        });

        if (!response.ok) {
            throw new Error(
                `Failed to update task completion: ${response.status} ${response.statusText}`
            );
        }

        const updatedTask = await response.json();
        return updatedTask;
    } catch (error) {
        console.error("Error updating task completion:", error);
        throw error;
    }
}

/**
 * Get task completion status
 */
export async function getTaskStatus(taskId: string): Promise<Task> {
    try {
        const response = await fetch(`${API_URL}/api/tasks/${taskId}/status`, {
            method: "GET",
            headers: getAuthHeaders(),
        });

        if (!response.ok) {
            throw new Error(
                `Failed to fetch task status: ${response.status} ${response.statusText}`
            );
        }

        const taskStatus = await response.json();
        return taskStatus;
    } catch (error) {
        console.error("Error fetching task status:", error);
        throw error;
    }
}

/**
 * Get today's tasks based on current day of week
 */
export async function getTodayTasks(): Promise<DayTasks> {
    const today = new Date();
    const dayNames = [
        "Chủ Nhật",
        "Thứ Hai",
        "Thứ Ba",
        "Thứ Tư",
        "Thứ Năm",
        "Thứ Sáu",
        "Thứ Bảy",
    ];
    const currentDay = dayNames[today.getDay()];

    return getTasksByDay(currentDay);
}

/**
 * Helper function to get day name from day index (0 = Monday, 6 = Sunday)
 */
export function getDayNameFromIndex(dayIndex: number): string {
    const dayNames = [
        "Thứ Hai",
        "Thứ Ba",
        "Thứ Tư",
        "Thứ Năm",
        "Thứ Sáu",
        "Thứ Bảy",
        "Chủ Nhật",
    ];
    return dayNames[dayIndex] || "Thứ Hai";
}

/**
 * Helper function to get current day index (0 = Monday, 6 = Sunday)
 */
export function getCurrentDayIndex(): number {
    const today = new Date();
    const currentDayOfWeek = today.getDay(); // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
    return currentDayOfWeek === 0 ? 6 : currentDayOfWeek - 1; // Convert to our 0-6 index (Mon-Sun)
}