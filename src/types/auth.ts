export interface User {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  username?: string;
  age?: number;
  phoneNumber?: string;
  avatarUrl?: string;
  role?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading?: boolean;
  error?: string | null;
  lastAuthCheck: number | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  phoneNumber?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken?: string;
  expiresIn?: number;
  tokenType?: string;
}
