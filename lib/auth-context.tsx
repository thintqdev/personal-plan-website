"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { authService } from "./auth-service";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
  verifyEmail: (token: string) => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Chỉ chạy trên client-side
    if (typeof window === "undefined") return;

    // Nếu đã có user trong localStorage thì không cần gọi API nữa
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const userData = JSON.parse(userStr);
        setUser(userData);
        setIsLoading(false);
        return;
      } catch (error) {
        localStorage.removeItem("user");
      }
    }

    const checkAuthStatus = async () => {
      try {
        const token = localStorage.getItem("token") || getCookie("auth_token");
        if (token) {
          const userData = await authService.getCurrentUser();
          setUser(userData);
          localStorage.setItem("user", JSON.stringify(userData));
        }
      } catch (error) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        deleteCookie("auth_token");
      } finally {
        setIsLoading(false);
      }
    };
    checkAuthStatus();
  }, []);

  const getCookie = (name: string) => {
    if (typeof document === "undefined") return null;
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(";").shift();
    return null;
  };

  const setCookie = (name: string, value: string, days = 7) => {
    if (typeof document === "undefined") return;
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/; SameSite=Lax`;
  };

  const deleteCookie = (name: string) => {
    if (typeof document === "undefined") return;
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  const login = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password);
      if (typeof window !== "undefined") {
        localStorage.setItem("token", response.token);
        setCookie("auth_token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
      }
      setUser(response.user);
    } catch (error) {
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      await authService.register(name, email, password);
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      deleteCookie("auth_token");
    }
    setUser(null);
  };

  const forgotPassword = async (email: string) => {
    try {
      await authService.forgotPassword(email);
    } catch (error) {
      throw error;
    }
  };

  const resetPassword = async (token: string, password: string) => {
    try {
      await authService.resetPassword(token, password);
    } catch (error) {
      throw error;
    }
  };

  const verifyEmail = async (token: string) => {
    try {
      await authService.verifyEmail(token);
    } catch (error) {
      throw error;
    }
  };

  const refreshUser = async () => {
    try {
      const token = localStorage.getItem("token") || getCookie("auth_token");
      if (token) {
        const userData = await authService.getCurrentUser();
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
      }
    } catch (error) {
      console.error("Failed to refresh user:", error);
      // Don't logout on refresh failure, just log error
    }
  };

  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    verifyEmail,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
