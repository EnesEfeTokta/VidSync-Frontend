import type { User } from './User';
import type { LoginData } from './LoginData';
import type { RegisterData } from './RegisterData';

export interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (data: LoginData) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading?: boolean;
}