import { API_URL } from "./types";

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

// Monthly Reports Types
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

// ==================== FINANCE JAR OPERATIONS ====================

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

// ==================== TRANSACTION OPERATIONS ====================

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

// ==================== MONTHLY REPORTS ====================

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

        const url = `${API_URL}/api/finance/reports${params.toString() ? `?${params.toString()}` : ""
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