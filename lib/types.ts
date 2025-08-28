// Shared types and configuration for all services
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3003";

// Base interfaces
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

export interface UserPreferences {
    theme: string;
    coverImage: string;
    notifications: boolean;
    language: string;
}

export interface Statistics {
    todayProgress: string;
    weekProgress: number;
    currentStreak: number;
    totalTasks: number;
    completedTasks: number;
}