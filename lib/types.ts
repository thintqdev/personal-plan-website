// Shared types and configuration for all services
export const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

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
    email: string;
    goal: string;
    streak: number;
    avatar: string;
    income?: number;
    isEmailVerified: boolean;
    isActive: boolean;
    lastLogin?: string;
    preferences: UserPreferences;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface UpdateUserRequest {
    name?: string;
    goal?: string;
    streak?: number;
    avatar?: string;
    income?: number;
    preferences?: Partial<UserPreferences>;
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

// Authentication Types
export interface LoginRequest {
    email: string;
    password: string;
}

export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    success: boolean;
    message: string;
    token?: string;
    user?: {
        id: string;
        name: string;
        email: string;
        isEmailVerified: boolean;
        lastLogin?: string;
    };
    emailVerificationToken?: string;
    passwordResetToken?: string;
}

export interface ForgotPasswordRequest {
    email: string;
}

export interface ResetPasswordRequest {
    password: string;
}

export interface ChangePasswordRequest {
    currentPassword: string;
    newPassword: string;
}

export interface ResendVerificationRequest {
    email: string;
}

export interface AuthUser {
    id: string;
    name: string;
    email: string;
    isEmailVerified: boolean;
    lastLogin?: string;
}

export interface AuthContextType {
    user: AuthUser | null;
    token: string | null;
    login: (email: string, password: string) => Promise<AuthResponse>;
    register: (name: string, email: string, password: string) => Promise<AuthResponse>;
    logout: () => void;
    isLoading: boolean;
    isAuthenticated: boolean;
}