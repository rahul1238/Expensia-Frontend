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
    const { data } = await api.post('/gmail/sync');
    return data;
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
