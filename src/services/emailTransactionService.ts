import api from './apiService';

export interface EmailEvaluationResult {
  success: boolean;
  message?: string;
  error?: string;
  processed?: number;
  added?: number;
  duplicates?: number;
  skipped?: number;
  processingTimeMs?: number;
  details?: string[];
  timestamp?: number;
}

export interface EmailEvaluationStatus {
  success: boolean;
  message: string;
  lastCheck: number;
}

export const emailTransactionService = {
  /**
   * Manually trigger email transaction evaluation (synchronous)
   * This will wait for the evaluation to complete before returning
   */
  async triggerEvaluation(): Promise<EmailEvaluationResult> {
    const { data } = await api.post<EmailEvaluationResult>('/email-transactions/evaluate');
    return data;
  },

  /**
   * Manually trigger email transaction evaluation (asynchronous)
   * This returns immediately while evaluation continues in background
   */
  async triggerEvaluationAsync(): Promise<EmailEvaluationResult> {
    const { data } = await api.post<EmailEvaluationResult>('/email-transactions/evaluate-async');
    return data;
  },

  /**
   * Get the current status of email transaction evaluation service
   */
  async getEvaluationStatus(): Promise<EmailEvaluationStatus> {
    const { data } = await api.get<EmailEvaluationStatus>('/email-transactions/status');
    return data;
  },

  /**
   * Trigger evaluation for a specific user (admin function)
   */
  async triggerEvaluationForUser(userId: string): Promise<EmailEvaluationResult> {
    const { data } = await api.post<EmailEvaluationResult>(`/email-transactions/evaluate/${userId}`);
    return data;
  }
};

export default emailTransactionService;
