// Redux State Types
import type { TransactionData } from './finance';

export interface TransactionsState {
  items: TransactionData[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
  filter: TransactionFilter;
}

export interface TransactionFilter {
  type: 'all' | 'credit' | 'debit';
  category: string | null;
  startDate: string | null;
  endDate: string | null;
  searchTerm: string;
}

export interface TransactionFilters {
  type?: 'all' | 'credit' | 'debit';
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
}
