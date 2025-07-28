import api from "./apiService";
import axios from "axios";
import type { AuthResponse } from "../types/auth";
import type { SignupDTO } from "../types/dto/dtos";

export const userService = {
  async login(
    email: string,
    password: string,
    rememberMe = false
  ): Promise<AuthResponse> {
    try {
      if (!email || !email.trim()) {
        throw new Error("Email is required");
      }
      
      if (!password) {
        throw new Error("Password is required");
      }

      const response = await api.post<AuthResponse>("/auth/login", {
        email: email.trim(),
        password,
        rememberMe,
      });
      
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          throw new Error("Invalid email or password");
        } else if (error.response?.status === 429) {
          throw new Error("Too many login attempts. Please try again later");
        } else if (error.response?.data?.message) {
          throw new Error(error.response.data.message);
        } else if (error.code === "ERR_NETWORK") {
          throw new Error("Network error. Please check your connection");
        }
      }

      throw new Error("An unexpected error occurred. Please try again later");
    }
  },

  async getCurrentUser(): Promise<AuthResponse["user"]> {
    try {
      const response = await api.get<AuthResponse>("/auth/me");

      if (!response.data || !response.data.user) {
        throw new Error("Invalid user data");
      }

      return response.data.user;
    } catch (error) {
      throw new Error("User not authenticated");
    }
  },

  async logout(): Promise<void> {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      // Silent failure is acceptable for logout
    }
  },

  async signup(signUpDTO: SignupDTO): Promise<AuthResponse> {
    try {
      const rememberMeEl = document.getElementById(
        "remember-me"
      ) as HTMLInputElement;
      const rememberMe = rememberMeEl?.checked || false;
      
      const requestData = { ...signUpDTO, rememberMe };
      
      if (signUpDTO.name && (!signUpDTO.firstName || !signUpDTO.lastName)) {
        const nameParts = signUpDTO.name.split(' ');
        requestData.firstName = requestData.firstName || nameParts[0];
        requestData.lastName = requestData.lastName || 
          nameParts.slice(1).join(' ') || 
          signUpDTO.firstName || 
          '';
        
        if (!requestData.username) {
          requestData.username = signUpDTO.email.split('@')[0];
        }
      }

      const response = await api.post<AuthResponse>("/auth/register", requestData);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          throw new Error("Invalid signup data");
        } else if (error.response?.data?.message) {
          throw new Error(error.response.data.message);
        } else if (error.code === "ERR_NETWORK") {
          throw new Error("Network error. Please check your connection");
        }
      }

      throw new Error("An unexpected error occurred during signup");
    }
  },

  async checkCookieStatus(): Promise<boolean> {
    try {
      const response = await api.get("/auth/cookie-check", {
        validateStatus: () => true,
      });
      return response.status === 200;
    } catch (error) {
      return false;
    }
  },
  
  async refreshToken(): Promise<boolean> {
    try {
      const REFRESH_COOLDOWN_MS = 5000;
      const lastRefreshAttempt = sessionStorage.getItem('lastRefreshAttempt');
      const currentTime = Date.now();
      
      if (lastRefreshAttempt && currentTime - parseInt(lastRefreshAttempt) < REFRESH_COOLDOWN_MS) {
        return false;
      }
      
      sessionStorage.setItem('lastRefreshAttempt', currentTime.toString());
      
      const response = await axios.post(
        `${api.defaults.baseURL}/auth/refresh`,
        {},
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      
      if (response.status === 200) {
        sessionStorage.removeItem('lastRefreshAttempt');
        return true;
      }
      
      return false;
    } catch (error) {
      return false;
    }
  },
};
