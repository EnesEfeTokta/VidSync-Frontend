import axios from "axios";
import type { AuthResponse } from "../types/AuthResponse";
import type { LoginData } from "../types/LoginData";
import type { RegisterData } from "../types/RegisterData";
import type { User } from "../types/User";

const API_URL = `${import.meta.env.VITE_API_URL}/api/auth`;

const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/login`, data);
  return response.data;
};

const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/register`, data);
  return response.data;
};

const me = async (): Promise<User> => {
  const response = await axios.get<User>(`${API_URL}/me`);
  return response.data;
};

export const authService = {
  login,
  register,
  me,
};