import type { CurrencyValue, TransactionMethodValue, TransactionCategory } from '../constants';

export interface EmailTransaction {
  id: string;
  userId: string;
  // Common with Transaction
  description?: string;
  amount: number;
  currency?: CurrencyValue;
  date?: string; // ISO yyyy-MM-dd
  category?: TransactionCategory;
  type?: 'credit' | 'debit';
  notes?: string;
  transactionMethod?: TransactionMethodValue;
  // Email-specific
  merchant?: string;
  sourceEmail?: string;
  messageId: string;
}
