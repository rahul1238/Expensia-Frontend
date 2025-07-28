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
  transactionMethod?: TransactionMethodType;
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

// Predefined list of transaction categories
export const TRANSACTION_CATEGORIES = [
  'Food & Drink', 
  'Groceries', 
  'Shopping', 
  'Entertainment', 
  'Transportation', 
  'Housing', 
  'Utilities', 
  'Healthcare', 
  'Personal Care', 
  'Education', 
  'Travel', 
  'Gifts', 
  'Investments', 
  'Income', 
  'Other'
];

// Define transaction method types with display labels
export type TransactionMethodType = 'CASH' | 'CREDIT_CARD' | 'DEBIT_CARD' | 'UPI' | 'NET_BANKING' | 'OTHER';

export interface TransactionMethodOption {
  value: TransactionMethodType;
  label: string;
}

export const TRANSACTION_METHODS: TransactionMethodOption[] = [
  { value: 'CASH', label: 'Cash' },
  { value: 'CREDIT_CARD', label: 'Credit Card' },
  { value: 'DEBIT_CARD', label: 'Debit Card' },
  { value: 'UPI', label: 'UPI' },
  { value: 'NET_BANKING', label: 'Net Banking' },
  { value: 'OTHER', label: 'Other' }
];
