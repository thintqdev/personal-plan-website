export interface SavingsGoal {
    _id: string;
    name: string;
    description: string;
    targetAmount: number;
    currentAmount: number;
    deadline?: string;
    category: string;
    color: string;
    icon: string;
    priority: "High" | "Medium" | "Low";
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    transactions: SavingsTransaction[];
}

export interface SavingsTransaction {
    _id: string;
    goalId: string;
    type: "deposit" | "withdraw";
    amount: number;
    description?: string;
    date: string;
}

export interface CreateSavingsGoalRequest {
    name: string;
    description: string;
    targetAmount: number;
    deadline?: string;
    category: string;
    color: string;
    icon: string;
    priority: "High" | "Medium" | "Low";
}

export interface UpdateSavingsGoalRequest {
    name?: string;
    description?: string;
    targetAmount?: number;
    deadline?: string;
    category?: string;
    color?: string;
    icon?: string;
    priority?: "High" | "Medium" | "Low";
    isActive?: boolean;
}

export interface AddMoneyRequest {
    amount: number;
    description?: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

// Get all savings goals
export async function getSavingsGoals(): Promise<SavingsGoal[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/savings-goals`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('Error fetching savings goals:', error);
        throw error;
    }
}// Create a new savings goal
export async function createSavingsGoal(goal: CreateSavingsGoalRequest): Promise<SavingsGoal> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/savings-goals`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(goal),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error creating savings goal:', error);
        throw error;
    }
}

// Update a savings goal
export async function updateSavingsGoal(id: string, updates: UpdateSavingsGoalRequest): Promise<SavingsGoal> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/savings-goals/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updates),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error updating savings goal:', error);
        throw error;
    }
}

// Delete a savings goal
export async function deleteSavingsGoal(id: string): Promise<void> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/savings-goals/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error deleting savings goal:', error);
        throw error;
    }
}

// Add money to a savings goal
export async function addMoneyToGoal(id: string, request: AddMoneyRequest): Promise<SavingsGoal> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/savings-goals/${id}/add-money`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error adding money to goal:', error);
        throw error;
    }
}

// Withdraw money from a savings goal
export async function withdrawMoneyFromGoal(id: string, request: AddMoneyRequest): Promise<SavingsGoal> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/savings-goals/${id}/withdraw-money`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error withdrawing money from goal:', error);
        throw error;
    }
}

// Get transactions for a savings goal
export async function getSavingsGoalTransactions(id: string): Promise<SavingsTransaction[]> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/savings-goals/${id}/transactions`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.data || [];
    } catch (error) {
        console.error('Error fetching savings goal transactions:', error);
        return [];
    }
}
