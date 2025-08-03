import api from "./apiService";
import axios from "axios";
import type { TransactionData } from "../types/finance";

interface TransactionsResponse {
  transactions: TransactionData[];
  totalCount?: number;
}

export interface TransactionFilters {
  category?: string;
  minAmount?: number;
  maxAmount?: number;
  type?: "credit" | "debit";
  transactionMethod?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

let csrfToken: string | null = null;

export const transactionService = {
  /**
   * Retrieves CSRF token for secure API operations
   * @returns Promise resolving to the CSRF token string
   */
  async getCsrfToken(): Promise<string> {
    try {
      if (csrfToken) {
        return csrfToken;
      }

      const response = await api.get<{ token: string }>("/auth/csrf-token", {
        withCredentials: true,
      });

      if (!response.data?.token) {
        throw new Error("Invalid CSRF token response");
      }

      csrfToken = response.data.token;
      return csrfToken;
    } catch (error) {
      throw new Error("Failed to fetch CSRF token");
    }
  },

  /**
   * Retrieves all transactions for the current user
   * @returns Promise resolving to an object containing transactions array
   */
  async getAllTransactions(): Promise<TransactionsResponse> {
    try {
      let headers = {};
      try {
        const token = await this.getCsrfToken();
        headers = { "X-XSRF-TOKEN": token };
      } catch (err) {}

      const response = await api.get("/transactions", { headers });

      if (Array.isArray(response.data)) {
        return { transactions: response.data };
      }

      if (
        response.data?.transactions &&
        Array.isArray(response.data.transactions)
      ) {
        return response.data;
      }

      if (typeof response.data === "object") {
        for (const key in response.data) {
          if (Array.isArray(response.data[key])) {
            return { transactions: response.data[key] };
          }
        }
      }
      return { transactions: [] };
    } catch (error) {
      throw new Error("Failed to fetch transactions");
    }
  },

  /**
   * Creates a new financial transaction
   * @param transactionData Transaction data without id, userId, and date
   * @returns Promise resolving to the created transaction data
   */
  async createTransaction(
    transactionData: Omit<TransactionData, "id" | "userId" | "date">
  ): Promise<TransactionData> {
    try {
      let token;
      try {
        token = await this.getCsrfToken();
      } catch (err) {
        const { userService } = await import("./userService");
        await userService.refreshToken();
        token = await this.getCsrfToken();
      }

      const response = await api.post("/transactions/create", transactionData, {
        withCredentials: true,
        headers: {
          "X-XSRF-TOKEN": token,
          "X-CSRF-TOKEN": token,
        },
      });

      if (response.data?.transaction) {
        return response.data.transaction;
      }

      if (
        response.data &&
        typeof response.data === "object" &&
        !Array.isArray(response.data)
      ) {
        const transaction = response.data;
        transaction.date = transaction.date || new Date().toISOString();
        transaction.id = transaction.id || `temp-${Date.now()}`;
        transaction.userId = transaction.userId || "current-user";
        return transaction as TransactionData;
      }

      throw new Error("Invalid response format");
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const { status } = error.response;

        if (status === 403) {
          throw new Error("Authentication error: CSRF validation failed");
        } else if (status === 401) {
          throw new Error("Authentication error: Please log in again");
        } else if (error.response.data?.message) {
          throw new Error(`Transaction error: ${error.response.data.message}`);
        }
      }

      throw new Error("Failed to create transaction");
    }
  },

  /**
   * Gets transactions with optional filtering
   * @param filters Optional filters for transactions
   * @returns Promise resolving to filtered transactions
   */
  async getTransactions(
    filters?: TransactionFilters
  ): Promise<TransactionsResponse> {
    try {
      let headers = {};
      try {
        const token = await this.getCsrfToken();
        headers = { "X-XSRF-TOKEN": token };
      } catch (err) {
      }

      const queryParams = new URLSearchParams();
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            queryParams.append(key, value.toString());
          }
        });
      }

      const queryString = queryParams.toString();
      const url = queryString
        ? `/transactions?${queryString}`
        : "/transactions";

      const response = await api.get(url, { headers });
      if (Array.isArray(response.data)) {
        return { transactions: response.data };
      }

      if (
        response.data?.transactions &&
        Array.isArray(response.data.transactions)
      ) {
        return response.data;
      }

      if (typeof response.data === "object") {
        // Extract first array found in response
        for (const key in response.data) {
          if (Array.isArray(response.data[key])) {
            return { transactions: response.data[key] };
          }
        }
      }
      return { transactions: [] };
    } catch (error) {
      throw new Error("Failed to fetch transactions");
    }
  },

  /**
   * Updates an existing transaction
   * @param id Transaction ID
   * @param transactionData Updated transaction data
   * @returns Promise resolving to the updated transaction
   */
  async updateTransaction(
    id: string,
    transactionData: Partial<Omit<TransactionData, "id" | "userId">>
  ): Promise<TransactionData> {
    try {
      let token;
      try {
        token = await this.getCsrfToken();
      } catch (err) {
        const { userService } = await import("./userService");
        await userService.refreshToken();
        token = await this.getCsrfToken();
      }

      const response = await api.put(`/transactions/${id}`, transactionData, {
        withCredentials: true,
        headers: {
          "X-XSRF-TOKEN": token,
          "X-CSRF-TOKEN": token,
        },
      });

      if (response.data?.transaction) {
        return response.data.transaction;
      }

      if (
        response.data &&
        typeof response.data === "object" &&
        !Array.isArray(response.data)
      ) {
        return response.data as TransactionData;
      }

      throw new Error("Invalid response format");
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const { status } = error.response;

        if (status === 403) {
          throw new Error("Authentication error: CSRF validation failed");
        } else if (status === 401) {
          throw new Error("Authentication error: Please log in again");
        } else if (status === 404) {
          throw new Error("Transaction not found");
        } else if (error.response.data?.message) {
          throw new Error(`Update error: ${error.response.data.message}`);
        }
      }

      throw new Error("Failed to update transaction");
    }
  },

  /**
   * Deletes a transaction
   * @param id Transaction ID
   * @returns Promise resolving when transaction is deleted
   */
  async deleteTransaction(id: string): Promise<void> {
    try {
      let token;
      try {
        token = await this.getCsrfToken();
      } catch (err) {
        const { userService } = await import("./userService");
        await userService.refreshToken();
        token = await this.getCsrfToken();
      }

      await api.delete(`/transactions/${id}`, {
        withCredentials: true,
        headers: {
          "X-XSRF-TOKEN": token,
          "X-CSRF-TOKEN": token,
        },
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response) {
        const { status } = error.response;

        if (status === 403) {
          throw new Error("Authentication error: CSRF validation failed");
        } else if (status === 401) {
          throw new Error("Authentication error: Please log in again");
        } else if (status === 404) {
          throw new Error("Transaction not found");
        } else if (error.response.data?.message) {
          throw new Error(`Delete error: ${error.response.data.message}`);
        }
      }

      throw new Error("Failed to delete transaction");
    }
  },
};

export default transactionService;
