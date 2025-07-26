export interface User {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  age?: number;
  phoneNumber?: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading?: boolean;
  error?: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken?: string;
}
