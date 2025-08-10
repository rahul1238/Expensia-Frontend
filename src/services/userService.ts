import api from "./apiService";
import axios from "axios";
import type { AuthResponse, User } from "../types/auth";
import type { SignupDTO } from "../types/dto/dtos";

const networkError = (msg: string) => new Error(msg);
const extractMessage = (error: unknown, fallback: string) => {
  if (axios.isAxiosError(error)) {
    return (
      error.response?.data?.message ||
      (error.code === "ERR_NETWORK" ? "Network error. Please try again" : undefined) ||
      fallback
    );
  }
  return fallback;
};

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

  async loginWithGoogle(credential: string): Promise<AuthResponse> {
    try {
      if (!credential) {
        throw new Error("Missing Google credential");
      }

      const response = await api.post<AuthResponse>("/auth/google", { credential });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        throw networkError("Google authentication failed");
      }
      throw networkError(extractMessage(error, "Unable to sign in with Google"));
    }
  },

  async getGoogleAuthUrl(): Promise<string> {
    try {
      const response = await api.get<{ authUrl: string }>("/auth/google");
      return response.data?.authUrl;
    } catch (error) {
      throw new Error("Failed to fetch Google auth URL");
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
        const nameParts = signUpDTO.name.split(" ");
        requestData.firstName = requestData.firstName || nameParts[0];
        requestData.lastName =
          requestData.lastName ||
          nameParts.slice(1).join(" ") ||
          signUpDTO.firstName ||
          "";

        if (!requestData.username) {
          requestData.username = signUpDTO.email.split("@")[0];
        }
      }

      const response = await api.post<AuthResponse>(
        "/auth/register",
        requestData
      );
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
      const lastRefreshAttempt = sessionStorage.getItem("lastRefreshAttempt");
      const currentTime = Date.now();

      if (
        lastRefreshAttempt &&
        currentTime - parseInt(lastRefreshAttempt) < REFRESH_COOLDOWN_MS
      ) {
        return false;
      }

      sessionStorage.setItem("lastRefreshAttempt", currentTime.toString());

      const response = await axios.post(
        `${api.defaults.baseURL}/auth/refresh`,
        {},
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200) {
        sessionStorage.removeItem("lastRefreshAttempt");
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  },

  async updateProfile(profileData: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    age: number | undefined;
  }): Promise<User> {
    try {
      const response = await api.put("/user/profile", profileData);

      if (response.status === 200 && response.data) {
        return response.data;
      }

      throw new Error("Failed to update profile");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          throw new Error(
            error.response.data?.message || "Invalid profile data"
          );
        }
        if (error.response?.status === 409) {
          throw new Error("Email already exists");
        }
        if (error.response?.status === 401) {
          throw new Error("Please log in again");
        }
        throw new Error(
          error.response?.data?.message || "Failed to update profile"
        );
      }
      throw new Error("An unexpected error occurred while updating profile");
    }
  },

  async changePassword(
    currentPassword: string,
    newPassword: string
  ): Promise<void> {
    try {
      const response = await api.put("/user/change-password", {
        currentPassword,
        newPassword,
      });

      if (response.status === 200) {
        return;
      }

      throw new Error("Failed to change password");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 400) {
          throw new Error(
            error.response.data?.message || "Invalid password data"
          );
        }
        if (error.response?.status === 401) {
          throw new Error("Current password is incorrect");
        }
        if (error.response?.status === 403) {
          throw new Error("Please log in again");
        }
        throw new Error(
          error.response?.data?.message || "Failed to change password"
        );
      }
      throw new Error("An unexpected error occurred while changing password");
    }
  },
};
