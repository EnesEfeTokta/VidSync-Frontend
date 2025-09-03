import React, { createContext, useState, useContext, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../types/User';
import type { LoginData } from '../types/LoginData';
import type { RegisterData } from '../types/RegisterData';
import { authService } from '../services/authService';

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    if (storedToken) {
      setToken(storedToken);
      // setUser(...) // Token'dan kullanıcı bilgisi çözümlenip veya API'den alınıp set edilebilir.
    }
  }, []);

  const login = async (data: LoginData) => {
    try {
      const response = await authService.login(data);
      setUser(response.user);
      setToken(response.token);
      localStorage.setItem('authToken', response.token);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (data: RegisterData) => {
    try {
      const response = await authService.register(data);
      setUser(response.user);
      setToken(response.token);
      localStorage.setItem('authToken', response.token);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('authToken');
  };
  
  const value: AuthContextType = {
    user,
    token,
    login,
    register,
    logout,
    isAuthenticated: !!token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};