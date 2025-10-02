import api from './apiService';
import type { EmailTransaction } from '../types/email';

export interface GmailSyncResponse {
  synced: number;
  processed: number;
  skipped: number;
  duplicates: number;
  message: string;
}

export interface DisconnectResponse {
  message: string;
}

export const gmailService = {
  async getConnectUrl(): Promise<string> {
    const { data } = await api.get('/gmail/connect');
    return data.authUrl;
  },

  async triggerSync(): Promise<GmailSyncResponse> {
    try {
      const { data } = await api.post('/gmail/sync');
      return data;
    } catch (error: any) {
      // Handle authentication expired error
      if (error.response?.status === 401 && error.response?.data?.code === 'AUTH_EXPIRED') {
        // Clear auth data and redirect to login
        document.cookie = "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie = "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        localStorage.clear();
        sessionStorage.clear();
        
        if (!window.location.pathname.includes('/login')) {
          window.location.href = '/login?expired=true&reason=jwt_changed';
        }
        
        throw new Error('Session expired due to system update. Please log in again.');
      }
      throw error;
    }
  },

  async syncCurrentMonth(): Promise<GmailSyncResponse> {
    const { data } = await api.post('/gmail/sync-current-month');
    return data;
  },

  async listTransactions(): Promise<EmailTransaction[]> {
  const { data } = await api.get<EmailTransaction[]>('/gmail/transactions');
    return data;
  },

  async disconnect(): Promise<DisconnectResponse> {
    const { data } = await api.delete('/gmail/disconnect');
    return data;
  }
}

export default gmailService;
