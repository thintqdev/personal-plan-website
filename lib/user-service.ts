import { API_URL, Quote, CreateQuoteRequest, User, UpdateUserRequest, UpdateUserIncomeRequest, UserPreferences, Statistics } from "./types";

// Re-export types for convenience
export type { Quote, CreateQuoteRequest, User, UpdateUserRequest, UpdateUserIncomeRequest, UserPreferences, Statistics };

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