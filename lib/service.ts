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
  income?: number;
  __v: number;
}

export interface UpdateUserRequest {
  name?: string;
  role?: string;
  goal?: string;
  streak?: number;
  avatar?: string;
  income?: number;
}

export interface UpdateUserIncomeRequest {
  income: number;
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

// Finance Management Types
export interface FinanceJar {
  _id: string;
  name: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  percentage: number;
  color: string;
  icon: string;
  priority: "High" | "Medium" | "Low";
  category: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface Transaction {
  _id: string;
  jarId:
    | string
    | {
        _id: string;
        name: string;
        color: string;
        icon: string;
      };
  amount: number;
  type: "income" | "expense";
  description: string;
  date: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface CreateFinanceJarRequest {
  name: string;
  description: string;
  targetAmount: number;
  percentage: number;
  color: string;
  icon: string;
  priority: "High" | "Medium" | "Low";
  category: string;
}

export interface UpdateFinanceJarRequest {
  name?: string;
  description?: string;
  targetAmount?: number;
  percentage?: number;
  color?: string;
  icon?: string;
  priority?: "High" | "Medium" | "Low";
  category?: string;
  isActive?: boolean;
}

export interface CreateTransactionRequest {
  jarId: string;
  amount: number;
  type: "income" | "expense";
  description: string;
  category: string;
  date?: string;
}

export interface FinanceOverview {
  totalIncome: number;
  totalExpenses: number;
  totalSavings: number;
  jarsCount: number;
  activeJarsCount: number;
  totalAllocated: number;
  remainingPercentage: number;
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

/**
 * Get all goals from the API
 */
export async function getGoals(): Promise<Goal[]> {
  try {
    const response = await fetch(`${API_URL}/api/goals`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
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
      headers: {
        "Content-Type": "application/json",
      },
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
      headers: {
        "Content-Type": "application/json",
      },
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
      headers: {
        "Content-Type": "application/json",
      },
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
      headers: {
        "Content-Type": "application/json",
      },
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

// Finance Management API Functions

/**
 * Get all finance jars
 */
export async function getFinanceJars(): Promise<FinanceJar[]> {
  try {
    const response = await fetch(`${API_URL}/api/finance/jars`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch finance jars: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return Array.isArray(data) ? data : data.jars || [];
  } catch (error) {
    console.error("Error fetching finance jars:", error);
    throw error;
  }
}

/**
 * Get a single finance jar by ID
 */
export async function getFinanceJar(jarId: string): Promise<FinanceJar> {
  try {
    const response = await fetch(`${API_URL}/api/finance/jars/${jarId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch finance jar: ${response.status} ${response.statusText}`
      );
    }

    const jar = await response.json();
    return jar;
  } catch (error) {
    console.error("Error fetching finance jar:", error);
    throw error;
  }
}

/**
 * Create a new finance jar
 */
export async function createFinanceJar(
  jarData: CreateFinanceJarRequest
): Promise<FinanceJar> {
  try {
    const response = await fetch(`${API_URL}/api/finance/jars`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jarData),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to create finance jar: ${response.status} ${response.statusText}`
      );
    }

    const newJar = await response.json();
    return newJar;
  } catch (error) {
    console.error("Error creating finance jar:", error);
    throw error;
  }
}

/**
 * Update a finance jar
 */
export async function updateFinanceJar(
  jarId: string,
  updates: UpdateFinanceJarRequest
): Promise<FinanceJar> {
  try {
    const response = await fetch(`${API_URL}/api/finance/jars/${jarId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to update finance jar: ${response.status} ${response.statusText}`
      );
    }

    const updatedJar = await response.json();
    return updatedJar;
  } catch (error) {
    console.error("Error updating finance jar:", error);
    throw error;
  }
}

/**
 * Delete a finance jar
 */
export async function deleteFinanceJar(jarId: string): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/api/finance/jars/${jarId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to delete finance jar: ${response.status} ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Error deleting finance jar:", error);
    throw error;
  }
}

/**
 * Get all transactions
 */
export async function getTransactions(jarId?: string): Promise<Transaction[]> {
  try {
    const url = jarId
      ? `${API_URL}/api/finance/transactions?jarId=${jarId}`
      : `${API_URL}/api/finance/transactions`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch transactions: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return Array.isArray(data) ? data : data.transactions || [];
  } catch (error) {
    console.error("Error fetching transactions:", error);
    throw error;
  }
}

/**
 * Get a single transaction by ID
 */
export async function getTransaction(
  transactionId: string
): Promise<Transaction> {
  try {
    const response = await fetch(
      `${API_URL}/api/finance/transactions/${transactionId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch transaction: ${response.status} ${response.statusText}`
      );
    }

    const transaction = await response.json();
    return transaction;
  } catch (error) {
    console.error("Error fetching transaction:", error);
    throw error;
  }
}

/**
 * Update a transaction
 */
export async function updateTransaction(
  transactionId: string,
  updates: Partial<CreateTransactionRequest>
): Promise<Transaction> {
  try {
    const response = await fetch(
      `${API_URL}/api/finance/transactions/${transactionId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updates),
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to update transaction: ${response.status} ${response.statusText}`
      );
    }

    const updatedTransaction = await response.json();
    return updatedTransaction;
  } catch (error) {
    console.error("Error updating transaction:", error);
    throw error;
  }
}

/**
 * Get transactions by jar ID
 */
export async function getTransactionsByJar(
  jarId: string
): Promise<Transaction[]> {
  try {
    const response = await fetch(
      `${API_URL}/api/finance/jars/${jarId}/transactions`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch jar transactions: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return Array.isArray(data) ? data : data.transactions || [];
  } catch (error) {
    console.error("Error fetching jar transactions:", error);
    throw error;
  }
}

/**
 * Get transaction statistics
 */
export async function getTransactionStats(): Promise<any> {
  try {
    const response = await fetch(`${API_URL}/api/finance/transactions/stats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch transaction stats: ${response.status} ${response.statusText}`
      );
    }

    const stats = await response.json();
    return stats;
  } catch (error) {
    console.error("Error fetching transaction stats:", error);
    throw error;
  }
}

/**
 * Create a new transaction
 */
export async function createTransaction(
  transactionData: CreateTransactionRequest
): Promise<Transaction> {
  try {
    const response = await fetch(`${API_URL}/api/finance/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transactionData),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to create transaction: ${response.status} ${response.statusText}`
      );
    }

    const newTransaction = await response.json();
    return newTransaction;
  } catch (error) {
    console.error("Error creating transaction:", error);
    throw error;
  }
}

/**
 * Delete a transaction
 */
export async function deleteTransaction(transactionId: string): Promise<void> {
  try {
    const response = await fetch(
      `${API_URL}/api/finance/transactions/${transactionId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to delete transaction: ${response.status} ${response.statusText}`
      );
    }
  } catch (error) {
    console.error("Error deleting transaction:", error);
    throw error;
  }
}

/**
 * Get finance overview statistics
 */
export async function getFinanceOverview(): Promise<FinanceOverview> {
  try {
    const response = await fetch(`${API_URL}/api/finance/overview`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch finance overview: ${response.status} ${response.statusText}`
      );
    }

    const overview = await response.json();
    return overview;
  } catch (error) {
    console.error("Error fetching finance overview:", error);
    throw error;
  }
}

/**
 * Update user monthly income
 */
export async function updateUserIncome(income: number): Promise<User> {
  try {
    const response = await fetch(`${API_URL}/api/user/income`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ income }),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to update user income: ${response.status} ${response.statusText}`
      );
    }

    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    console.error("Error updating user income:", error);
    throw error;
  }
}

// Monthly Reports API Functions

export interface MonthlyReport {
  _id: string;
  userId: string;
  month: number;
  year: number;
  userIncome: number;
  totalAllocated: number;
  totalSpent: number;
  totalSavings: number;
  carryOverFromPreviousMonth: number;
  carryOverToNextMonth: number;
  isFinalized: boolean;
  finalizedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface JarReport {
  jarId: string;
  jarName: string;
  jarCategory: string;
  allocatedAmount: number;
  actualSpent: number;
  actualIncome: number;
  savings: number;
  percentage: number;
  savingsPercentage: string;
  transactions: ReportTransaction[];
  jarInfo: {
    name: string;
    color: string;
    icon: string;
    category: string;
  };
}

export interface ReportTransaction {
  transactionId: string;
  amount: number;
  type: "income" | "expense";
  description: string;
  category: string;
  date: string;
}

export interface MonthlyReportDetail extends MonthlyReport {
  jarsReport: JarReport[];
}

export interface PDFReportData {
  reportInfo: {
    year: number;
    month: number;
    createdAt: string;
    isFinalized: boolean;
    finalizedAt?: string;
  };
  user: {
    name: string;
    email: string;
    income: number;
  };
  summary: {
    userIncome: number;
    totalAllocated: number;
    totalSpent: number;
    totalSavings: number;
    carryOverFromPreviousMonth: number;
    carryOverToNextMonth: number;
  };
  jarsReport: JarReport[];
  categorySpending: {
    category: string;
    amount: number;
    percentage: string;
  }[];
  formatted: {
    userIncome: string;
    totalAllocated: string;
    totalSpent: string;
    totalSavings: string;
    carryOverFromPreviousMonth: string;
    carryOverToNextMonth: string;
    jars: any[];
    categories: any[];
  };
  colors: {
    primary: string;
    secondary: string;
    success: string;
    danger: string;
    warning: string;
    info: string;
    dark: string;
    muted: string;
    light: string;
  };
}

export interface GenerateReportRequest {
  year?: number;
  month?: number;
}

/**
 * Get all monthly reports with optional filters
 */
export async function getMonthlyReports(
  year?: number,
  month?: number,
  limit?: number
): Promise<MonthlyReport[]> {
  try {
    const params = new URLSearchParams();
    if (year) params.append("year", year.toString());
    if (month) params.append("month", month.toString());
    if (limit) params.append("limit", limit.toString());

    const url = `${API_URL}/api/finance/reports${
      params.toString() ? `?${params.toString()}` : ""
    }`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch monthly reports: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching monthly reports:", error);
    throw error;
  }
}

/**
 * Get specific monthly report by year and month
 */
export async function getMonthlyReport(
  year: number,
  month: number
): Promise<MonthlyReportDetail> {
  try {
    const response = await fetch(
      `${API_URL}/api/finance/reports/${year}/${month}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch monthly report: ${response.status} ${response.statusText}`
      );
    }

    const report = await response.json();
    return report;
  } catch (error) {
    console.error("Error fetching monthly report:", error);
    throw error;
  }
}

/**
 * Generate monthly report for specified year and month
 */
export async function generateMonthlyReport(
  requestData: GenerateReportRequest = {}
): Promise<MonthlyReportDetail> {
  try {
    const response = await fetch(`${API_URL}/api/finance/reports/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to generate monthly report: ${response.status} ${response.statusText}`
      );
    }

    const newReport = await response.json();
    return newReport;
  } catch (error) {
    console.error("Error generating monthly report:", error);
    throw error;
  }
}

/**
 * Finalize monthly report (lock it from further edits)
 */
export async function finalizeMonthlyReport(
  year: number,
  month: number
): Promise<{ message: string; report: MonthlyReport }> {
  try {
    const response = await fetch(
      `${API_URL}/api/finance/reports/${year}/${month}/finalize`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to finalize monthly report: ${response.status} ${response.statusText}`
      );
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error finalizing monthly report:", error);
    throw error;
  }
}

/**
 * Get PDF report data for frontend PDF generation
 */
export async function getMonthlyReportPDFData(
  year: number,
  month: number
): Promise<PDFReportData> {
  try {
    const response = await fetch(
      `${API_URL}/api/finance/reports/${year}/${month}/pdf`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(
        `Failed to fetch PDF report data: ${response.status} ${response.statusText}`
      );
    }

    const pdfData = await response.json();
    return pdfData;
  } catch (error) {
    console.error("Error fetching PDF report data:", error);
    throw error;
  }
}
