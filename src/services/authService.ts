import axios from "axios";
import type { AuthResponse } from "../types/AuthResponse";
import type { LoginData } from "../types/LoginData";
import type { RegisterData } from "../types/RegisterData";

const API_URL = "http://localhost:5166/api/auth";

const login = async (data: LoginData): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/login`, data);
  return response.data;
};

const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await axios.post(`${API_URL}/register`, data);
  return response.data;
};

export const authService = {
  login,
  register,
};