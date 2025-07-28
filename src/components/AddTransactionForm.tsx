import React, { useState } from 'react';
import Button from './ui/Button';
import { transactionService } from '../services/transactionService';
import type { TransactionData } from '../types/finance';

interface AddTransactionFormProps {
  onSuccess: (transaction: TransactionData) => void;
  onCancel: () => void;
}

const AddTransactionForm: React.FC<AddTransactionFormProps> = ({ onSuccess, onCancel }) => {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [currency, setCurrency] = useState('INR');
  const [category, setCategory] = useState('');
  const [type, setType] = useState<'credit' | 'debit'>('debit');
  const [notes, setNotes] = useState('');
  const [transactionMethod, setTransactionMethod] = useState<TransactionData['transactionMethod']>('CREDIT_CARD');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const categories = [
    'Food & Drink', 'Groceries', 'Shopping', 'Entertainment', 'Transportation', 
    'Housing', 'Utilities', 'Healthcare', 'Personal Care', 'Education', 'Travel', 
    'Gifts', 'Investments', 'Income', 'Other'
  ];
  
  const transactionMethods = [
    { value: 'CASH', label: 'Cash' },
    { value: 'CREDIT_CARD', label: 'Credit Card' },
    { value: 'DEBIT_CARD', label: 'Debit Card' },
    { value: 'UPI', label: 'UPI' },
    { value: 'NET_BANKING', label: 'Net Banking' },
    { value: 'OTHER', label: 'Other' }
  ];

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
      
      const createdTransaction = await transactionService.createTransaction(transactionData);
      onSuccess(createdTransaction);
    } catch (error) {
      setError('Failed to create transaction. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const inputClass = "block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 focus:outline-none focus:ring-0 focus:border-green-500 peer";
  const labelClass = "absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] left-0 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6";
  
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 dark:text-white">Add New Transaction</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative z-0 w-full mb-6 group">
          <input
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={inputClass}
            placeholder=" "
            required
          />
          <label htmlFor="description" className={labelClass}>
            Description*
          </label>
        </div>
        
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <input
              type="number"
              step="0.01"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={inputClass}
              placeholder=" "
              required
            />
            <label htmlFor="amount" className={labelClass}>
              Amount*
            </label>
          </div>
          
          <div className="relative z-0 w-full mb-6 group">
            <select
              id="currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className={`${inputClass} cursor-pointer`}
              required
            >
              <option value="INR">Indian Rupee (₹)</option>
              <option value="USD">US Dollar ($)</option>
              <option value="EUR">Euro (€)</option>
              <option value="GBP">British Pound (£)</option>
            </select>
            <label htmlFor="currency" className={labelClass}>
              Currency
            </label>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="relative z-0 w-full mb-6 group">
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`${inputClass} cursor-pointer`}
              required
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <label htmlFor="category" className={labelClass}>
              Category*
            </label>
          </div>
          
          <div className="relative z-0 w-full mb-6 group">
            <select
              id="transactionMethod"
              value={transactionMethod}
              onChange={(e) => setTransactionMethod(e.target.value as TransactionData['transactionMethod'])}
              className={`${inputClass} cursor-pointer`}
              required
            >
              {transactionMethods.map((method) => (
                <option key={method.value} value={method.value}>
                  {method.label}
                </option>
              ))}
            </select>
            <label htmlFor="transactionMethod" className={labelClass}>
              Payment Method
            </label>
          </div>
        </div>
        
        <div className="mb-6">
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="type"
                value="debit"
                checked={type === 'debit'}
                onChange={() => setType('debit')}
                className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Expense</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="type"
                value="credit"
                checked={type === 'credit'}
                onChange={() => setType('credit')}
                className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
              />
              <span className="ml-2 text-gray-700 dark:text-gray-300">Income</span>
            </label>
          </div>
        </div>
        
        <div className="relative z-0 w-full mb-6 group">
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className={`${inputClass} resize-none`}
            placeholder=" "
            rows={3}
          ></textarea>
          <label htmlFor="notes" className={labelClass}>
            Notes (optional)
          </label>
        </div>
        
        <div className="flex space-x-4">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full"
          >
            {isLoading ? 'Creating...' : 'Create Transaction'}
          </Button>
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            className="w-full"
            disabled={isLoading}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTransactionForm;
