'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AuthContextType, AuthUser, AuthResponse } from '@/lib/types';
import { authService } from '@/lib/auth-service';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check authentication status on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const storedToken = authService.getToken();
        if (storedToken) {
          setToken(storedToken);
          // Try to get user profile
          try {
            const profileResponse = await authService.getProfile();
            if (profileResponse.success && profileResponse.user) {
              setUser({
                id: profileResponse.user._id,
                name: profileResponse.user.name,
                email: profileResponse.user.email,
                isEmailVerified: profileResponse.user.isEmailVerified,
                lastLogin: profileResponse.user.lastLogin,
              });
            } else {
              // Invalid token, remove it
              authService.removeToken();
              setToken(null);
            }
          } catch (error) {
            console.error('Failed to get user profile:', error);
            authService.removeToken();
            setToken(null);
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      setIsLoading(true);
      const response = await authService.login({ email, password });
      
      if (response.success && response.token && response.user) {
        setToken(response.token);
        setUser({
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          isEmailVerified: response.user.isEmailVerified,
          lastLogin: response.user.lastLogin,
        });
      }
      
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string): Promise<AuthResponse> => {
    try {
      setIsLoading(true);
      const response = await authService.register({ name, email, password });
      
      if (response.success && response.token && response.user) {
        setToken(response.token);
        setUser({
          id: response.user.id,
          name: response.user.name,
          email: response.user.email,
          isEmailVerified: response.user.isEmailVerified,
          lastLogin: response.user.lastLogin,
        });
      }
      
      return response;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
  };

  const isAuthenticated = !!user && !!token;

  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    isLoading,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;