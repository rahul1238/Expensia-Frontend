// Financial data type definitions

export interface Transaction {
  id: string | number;
  title: string;
  amount: number;
  date: string;
  category: string;
  type?: 'income' | 'expense';
  notes?: string;
  tags?: string[];
}

export interface TransactionData {
  id?: string;
  userId?: string;
  description: string;
  amount: number;
  currency?: string;
  date?: string;
  category?: string;
  type?: 'credit' | 'debit';
  notes?: string;
  transactionMethod?: 'CASH' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'UPI' | 'NET_BANKING' | 'OTHER';
}

export interface Category {
  id: string | number;
  name: string;
  color?: string;
  icon?: string;
}

export interface Budget {
  id: string | number;
  category: string;
  amount: number;
  spent?: number;
  period: 'daily' | 'weekly' | 'monthly' | 'yearly';
  startDate?: string;
  endDate?: string;
}

export interface FinancialSummary {
  totalBalance: number;
  income: number;
  expenses: number;
  savings?: number;
  savingsRate?: number;
}
