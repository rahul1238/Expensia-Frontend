import React, { useState } from 'react';
import Button from './ui/Button';
import { transactionService } from '../services/transactionService';
import type { TransactionData } from '../types/finance';
import type { AddTransactionFormProps } from '../types/components';
import { TRANSACTION_CATEGORIES, TRANSACTION_METHODS, CURRENCIES, type CurrencyValue, type TransactionCategory } from '../constants';

const AddTransactionForm: React.FC<AddTransactionFormProps> = ({ onSuccess, onCancel, initialData }) => {
  const [description, setDescription] = useState(initialData?.description || '');
  const [amount, setAmount] = useState(initialData?.amount?.toString() || '');
  const [currency, setCurrency] = useState<CurrencyValue>(initialData?.currency || 'INR');
  const [category, setCategory] = useState<TransactionCategory | ''>(initialData?.category || '');
  const [type, setType] = useState<'credit' | 'debit'>(initialData?.type || 'debit');
  const [notes, setNotes] = useState(initialData?.notes || '');
  const [transactionMethod, setTransactionMethod] = useState<TransactionData['transactionMethod']>(initialData?.transactionMethod || 'CREDIT_CARD');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!description || !amount || !category) {
      setError('Please fill in all required fields');
      return;
    }

    try {
      setIsLoading(true);
      setError(null);

      const amountValue = parseFloat(amount);
      if (isNaN(amountValue) || amountValue <= 0) {
        setError('Please enter a valid amount');
        setIsLoading(false);
        return;
      }

      const transactionData = {
        description,
        amount: amountValue,
        currency,
        category,
        type,
        notes: notes || undefined,
        transactionMethod
      };

      let result;
      if (initialData?.id) {
        // Update existing transaction
        result = await transactionService.updateTransaction(initialData.id, transactionData);
      } else {
        // Create new transaction
        result = await transactionService.createTransaction(transactionData);
      }

      onSuccess(result);
    } catch (error) {
      setError(initialData?.id ? 'Failed to update transaction. Please try again.' : 'Failed to create transaction. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = "w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200";
  const selectClass = "w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200 cursor-pointer";
  const textareaClass = "w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white transition-colors duration-200 resize-none";
  const labelClass = "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2";

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-2xl mx-auto">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
          {initialData ? 'Edit Transaction' : 'Add New Transaction'}
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {initialData ? 'Update your transaction details below' : 'Enter the details for your new transaction'}
        </p>
      </div>

      {/* Form Content */}
      <div className="p-6">
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Description */}
          <div>
            <label htmlFor="description" className={labelClass}>
              Description *
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={inputClass}
              placeholder="Enter transaction description"
              required
            />
          </div>

          {/* Amount and Currency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="amount" className={labelClass}>
                Amount *
              </label>
              <input
                type="number"
                step="0.01"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className={inputClass}
                placeholder="0.00"
                required
              />
            </div>
            <div>
              <label htmlFor="currency" className={labelClass}>
                Currency
              </label>
              <select
                id="currency"
                value={currency}
                onChange={(e) => setCurrency(e.target.value as CurrencyValue)}
                className={selectClass}
                required
              >
                {CURRENCIES.map((currency) => (
                  <option key={currency.value} value={currency.value}>
                    {currency.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category and Payment Method */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="category" className={labelClass}>
                Category *
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value as TransactionCategory | '')}
                className={selectClass}
                required
              >
                <option value="">Select category</option>
                {TRANSACTION_CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="transactionMethod" className={labelClass}>
                Payment Method
              </label>
              <select
                id="transactionMethod"
                value={transactionMethod}
                onChange={(e) => setTransactionMethod(e.target.value as TransactionData['transactionMethod'])}
                className={selectClass}
                required
              >
                {TRANSACTION_METHODS.map((method) => (
                  <option key={method.value} value={method.value}>
                    {method.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Transaction Type */}
          <div>
            <label className={labelClass}>
              Transaction Type *
            </label>
            <div className="flex gap-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="debit"
                  checked={type === 'debit'}
                  onChange={() => setType('debit')}
                  className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">💸 Expense</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="type"
                  value="credit"
                  checked={type === 'credit'}
                  onChange={() => setType('credit')}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">💰 Income</span>
              </label>
            </div>
          </div>

          {/* Notes */}
          <div>
            <label htmlFor="notes" className={labelClass}>
              Notes (optional)
            </label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={textareaClass}
              placeholder="Add any additional notes..."
              rows={3}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {initialData ? 'Updating...' : 'Creating...'}
                </span>
              ) : (
                initialData ? 'Update Transaction' : 'Create Transaction'
              )}
            </Button>

            <Button
              type="button"
              onClick={onCancel}
              variant="outline"
              className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700 font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTransactionForm;
