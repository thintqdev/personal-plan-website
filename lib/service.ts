const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3003";

export interface Quote {
  _id: string;
  text: string;
  __v: number;
}

export interface CreateQuoteRequest {
  text: string;
}

export interface User {
  _id: string;
  name: string;
  role: string;
  goal: string;
  streak: number;
  avatar: string;
  __v: number;
}

export interface UpdateUserRequest {
  name?: string;
  role?: string;
  goal?: string;
  streak?: number;
  avatar?: string;
}

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

export interface Statistics {
  todayProgress: string;
  weekProgress: number;
  currentStreak: number;
  totalTasks: number;
  completedTasks: number;
}

export interface UserPreferences {
  theme: string;
  coverImage: string;
  notifications: boolean;
  language: string;
}

/**
 * Get all quotes from the API
 */
export async function getQuotes(): Promise<Quote[]> {
  try {
    const response = await fetch(`${API_URL}/api/quotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch quotes: ${response.status} ${response.statusText}`
      );
    }

    const quotes = await response.json();
    return quotes;
  } catch (error) {
    console.error("Error fetching quotes:", error);
    throw error;
  }
}

/**
 * Add a new quote to the API
 */
export async function addQuote(quoteData: CreateQuoteRequest): Promise<Quote> {
  try {
    const response = await fetch(`${API_URL}/api/quotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quoteData),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to add quote: ${response.status} ${response.statusText}`
      );
    }

    const newQuote = await response.json();
    return newQuote;
  } catch (error) {
    console.error("Error adding quote:", error);
    throw error;
  }
}

/**
 * Delete a quote by ID
 */
export async function deleteQuote(quoteId: string): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/api/quotes/${quoteId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to delete quote: ${response.status} ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Error deleting quote:", error);
    throw error;
  }
}

/**
 * Get user information from the API
 */
export async function getUser(): Promise<User> {
  try {
    const response = await fetch(`${API_URL}/api/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch user: ${response.status} ${response.statusText}`
      );
    }

    const user = await response.json();
    return user;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
}

/**
 * Update user information
 */
export async function updateUser(userData: UpdateUserRequest): Promise<User> {
  try {
    const response = await fetch(`${API_URL}/api/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to update user: ${response.status} ${response.statusText}`
      );
    }

    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
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
        headers: {
          "Content-Type": "application/json",
        },
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
      headers: {
        "Content-Type": "application/json",
      },
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
      headers: {
        "Content-Type": "application/json",
      },
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
      headers: {
        "Content-Type": "application/json",
      },
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
      headers: {
        "Content-Type": "application/json",
      },
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
      headers: {
        "Content-Type": "application/json",
      },
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
      headers: {
        "Content-Type": "application/json",
      },
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
 * Get statistics
 */
export async function getStatistics(): Promise<Statistics> {
  try {
    const response = await fetch(`${API_URL}/api/stats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch statistics: ${response.status} ${response.statusText}`
      );
    }

    const stats = await response.json();
    return stats;
  } catch (error) {
    console.error("Error fetching statistics:", error);
    throw error;
  }
}

/**
 * Get today's statistics
 */
export async function getTodayStatistics(): Promise<Statistics> {
  try {
    const response = await fetch(`${API_URL}/api/stats/today`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch today statistics: ${response.status} ${response.statusText}`
      );
    }

    const stats = await response.json();
    return stats;
  } catch (error) {
    console.error("Error fetching today statistics:", error);
    throw error;
  }
}

/**
 * Get week's statistics
 */
export async function getWeekStatistics(): Promise<Statistics> {
  try {
    const response = await fetch(`${API_URL}/api/stats/week`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch week statistics: ${response.status} ${response.statusText}`
      );
    }

    const stats = await response.json();
    return stats;
  } catch (error) {
    console.error("Error fetching week statistics:", error);
    throw error;
  }
}

/**
 * Get user preferences
 */
export async function getUserPreferences(): Promise<UserPreferences> {
  try {
    const response = await fetch(`${API_URL}/api/user/preferences`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch user preferences: ${response.status} ${response.statusText}`
      );
    }

    const preferences = await response.json();
    return preferences;
  } catch (error) {
    console.error("Error fetching user preferences:", error);
    throw error;
  }
}

/**
 * Update user preferences
 */
export async function updateUserPreferences(
  preferences: Partial<UserPreferences>
): Promise<UserPreferences> {
  try {
    const response = await fetch(`${API_URL}/api/user/preferences`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preferences),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to update user preferences: ${response.status} ${response.statusText}`
      );
    }

    const updatedPreferences = await response.json();
    return updatedPreferences;
  } catch (error) {
    console.error("Error updating user preferences:", error);
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
