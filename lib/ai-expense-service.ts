const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export interface AIExpenseParseResult {
    amount: number | null;
    description: string;
    jarName: string | null;
    jarId: string | null;
    category: string | null;
    confidence: number;
    suggestions: string[];
}

export interface AIExpenseSuggestions {
    suggestions: string[];
    recentCount: number;
    jarsCount: number;
    fallback?: boolean;
}

export interface CreateExpenseFromAIRequest {
    text: string;
    override?: {
        amount?: number;
        jarId?: string;
        category?: string;
        description?: string;
    };
}

// Parse expense text using AI
export async function parseExpenseWithAI(text: string): Promise<AIExpenseParseResult> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/ai-expense/parse`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to parse expense');
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error parsing expense with AI:', error);
        throw error;
    }
}

// Get expense suggestions based on history
export async function getExpenseSuggestions(): Promise<AIExpenseSuggestions> {
    try {
        const response = await fetch(`${API_BASE_URL}/api/ai-expense/suggestions`);

        if (!response.ok) {
            throw new Error('Failed to get suggestions');
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error getting expense suggestions:', error);
        // Return fallback suggestions
        return {
            suggestions: [
                "Ăn sáng 30k",
                "Đổ xăng 100k",
                "Mua cà phê 45k",
                "Đi siêu thị 200k",
                "Ăn trưa 80k"
            ],
            recentCount: 0,
            jarsCount: 0,
            fallback: true
        };
    }
}

// Create expense directly from AI parsing
export async function createExpenseFromAI(request: CreateExpenseFromAIRequest) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/ai-expense/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create expense');
        }

        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error creating expense from AI:', error);
        throw error;
    }
}
