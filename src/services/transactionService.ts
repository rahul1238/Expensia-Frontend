import api from './apiService';
import axios from 'axios';
import type { TransactionData } from '../types/finance';

interface TransactionsResponse {
  transactions: TransactionData[];
  totalCount?: number;
}

// Cache the CSRF token to avoid redundant requests
let csrfToken: string | null = null;

export const transactionService = {
  /**
   * Retrieves CSRF token for secure API operations
   * @returns Promise resolving to the CSRF token string
   */
  async getCsrfToken(): Promise<string> {
    try {
      // Use cached token when available
      if (csrfToken) {
        return csrfToken;
      }

      const response = await api.get<{ token: string }>('/auth/csrf-token', {
        withCredentials: true
      });

      if (!response.data?.token) {
        throw new Error('Invalid CSRF token response');
      }

      csrfToken = response.data.token;
      return csrfToken;
    } catch (error) {
      throw new Error('Failed to fetch CSRF token');
    }
  },

  /**
   * Retrieves transactions for the current user with optional filters
   * @param filters Optional filters to apply to the transactions query
   * @returns Promise resolving to an object containing transactions array and total count
   */
  async getAllTransactions(filters?: {
    type?: 'credit' | 'debit' | 'all';
    category?: string | null;
    currency?: string | null;
    transactionMethod?: string | null;
    minAmount?: number | null;
    maxAmount?: number | null;
    startDate?: string | null;
    endDate?: string | null;
    description?: string | null;
    page?: number;
    limit?: number;
  }): Promise<TransactionsResponse> {
    try {
      // Set up request headers with CSRF token
      let headers = {};
      try {
        const token = await this.getCsrfToken();
        headers = { 'X-XSRF-TOKEN': token };
      } catch (err) {
        // Proceed without token if retrieval fails
      }
      
      // Build query parameters from filters
      let queryParams = '';
      if (filters) {
        const params = new URLSearchParams();
        
        if (filters.type && filters.type !== 'all') {
          params.append('type', filters.type);
        }
        
        if (filters.category) {
          params.append('category', filters.category);
        }
        
        if (filters.currency) {
          params.append('currency', filters.currency);
        }
        
        if (filters.transactionMethod) {
          params.append('transactionMethod', filters.transactionMethod);
        }
        
        if (filters.minAmount !== undefined && filters.minAmount !== null) {
          params.append('minAmount', filters.minAmount.toString());
        }
        
        if (filters.maxAmount !== undefined && filters.maxAmount !== null) {
          params.append('maxAmount', filters.maxAmount.toString());
        }
        
        if (filters.startDate) {
          params.append('startDate', filters.startDate);
        }
        
        if (filters.endDate) {
          params.append('endDate', filters.endDate);
        }
        
        if (filters.description) {
          params.append('description', filters.description);
        }
        
        if (filters.page !== undefined) {
          params.append('page', filters.page.toString());
        }
        
        if (filters.limit !== undefined) {
          params.append('limit', filters.limit.toString());
        }
        
        const paramsString = params.toString();
        if (paramsString) {
          queryParams = `?${paramsString}`;
        }
      }
      
      const response = await api.get(`/transactions${queryParams}`, { headers });
      
      // Handle different API response formats
      if (Array.isArray(response.data)) {
        return { transactions: response.data };
      } 
      
      if (response.data?.transactions && Array.isArray(response.data.transactions)) {
        return response.data;
      } 
      
      if (typeof response.data === 'object') {
        // Extract first array found in response
        for (const key in response.data) {
          if (Array.isArray(response.data[key])) {
            return { transactions: response.data[key] };
          }
        }
      }
      
      // Default to empty array if no transactions found
      return { transactions: [] };
    } catch (error) {
      throw new Error('Failed to fetch transactions');
    }
  },

  /**
   * Creates a new financial transaction
   * @param transactionData Transaction data without id, userId, and date
   * @returns Promise resolving to the created transaction data
   */
  async createTransaction(transactionData: Omit<TransactionData, 'id' | 'userId' | 'date'>): Promise<TransactionData> {
    try {
      // Get CSRF token with token refresh fallback
      let token;
      try {
        token = await this.getCsrfToken();
      } catch (err) {
        // If token retrieval fails, try refreshing auth and retry
        const { userService } = await import('./userService');
        await userService.refreshToken();
        token = await this.getCsrfToken();
      }
      
      // Send request with multiple CSRF header variations for compatibility
      const response = await api.post('/transactions/create', transactionData, {
        withCredentials: true,
        headers: {
          'X-XSRF-TOKEN': token,
          'X-CSRF-TOKEN': token
        }
      });
      
      // Handle response based on format
      if (response.data?.transaction) {
        return response.data.transaction;
      }
      
      if (response.data && typeof response.data === 'object' && !Array.isArray(response.data)) {
        // Normalize response to ensure required fields
        const transaction = response.data;
        transaction.date = transaction.date || new Date().toISOString();
        transaction.id = transaction.id || `temp-${Date.now()}`;
        transaction.userId = transaction.userId || 'current-user';
        return transaction as TransactionData;
      }
      
      throw new Error('Invalid response format');
    } catch (error: unknown) {
      // Provide specific error messages based on error type
      if (axios.isAxiosError(error) && error.response) {
        const { status } = error.response;
        
        if (status === 403) {
          throw new Error('Authentication error: CSRF validation failed');
        } else if (status === 401) {
          throw new Error('Authentication error: Please log in again');
        } else if (error.response.data?.message) {
          throw new Error(`Transaction error: ${error.response.data.message}`);
        }
      }
      
      throw new Error('Failed to create transaction');
    }
  }
};

export default transactionService;
