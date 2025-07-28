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
   * Retrieves all transactions for the current user
   * @returns Promise resolving to an object containing transactions array
   */
  async getAllTransactions(): Promise<TransactionsResponse> {
    try {
      // Set up request headers with CSRF token
      let headers = {};
      try {
        const token = await this.getCsrfToken();
        headers = { 'X-XSRF-TOKEN': token };
      } catch (err) {
        // Proceed without token if retrieval fails
      }
      
      const response = await api.get('/transactions', { headers });
      
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
