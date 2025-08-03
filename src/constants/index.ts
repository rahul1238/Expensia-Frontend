// Application constants and static data

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
] as const;

export const TRANSACTION_METHODS = [
  { value: 'CASH', label: 'Cash' },
  { value: 'CREDIT_CARD', label: 'Credit Card' },
  { value: 'DEBIT_CARD', label: 'Debit Card' },
  { value: 'UPI', label: 'UPI' },
  { value: 'NET_BANKING', label: 'Net Banking' },
  { value: 'OTHER', label: 'Other' }
] as const;

export const CURRENCIES = [
  { value: 'INR', label: 'Indian Rupee (₹)' },
  { value: 'USD', label: 'US Dollar ($)' },
  { value: 'EUR', label: 'Euro (€)' },
  { value: 'GBP', label: 'British Pound (£)' }
] as const;

// Type definitions derived from constants
export type TransactionCategory = typeof TRANSACTION_CATEGORIES[number];
export type TransactionMethodValue = typeof TRANSACTION_METHODS[number]['value'];
export type CurrencyValue = typeof CURRENCIES[number]['value'];
