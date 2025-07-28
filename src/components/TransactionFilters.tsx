import React, { useState } from 'react';
import Button from './ui/Button';
import type { TransactionFilter } from '../types';

interface TransactionFiltersProps {
  onApplyFilters: (filters: TransactionFilter) => void;
  initialFilters: TransactionFilter;
  categories: string[];
}

const TransactionFilters: React.FC<TransactionFiltersProps> = ({
  onApplyFilters,
  initialFilters,
  categories
}) => {
  const [filters, setFilters] = useState<TransactionFilter>(initialFilters);
  const [isExpanded, setIsExpanded] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    setFilters((prev: TransactionFilter) => ({
      ...prev,
      [name]: value === '' ? null : value
    }));
  };

  const handleTypeChange = (type: 'all' | 'credit' | 'debit') => {
    setFilters((prev: TransactionFilter) => ({
      ...prev,
      type
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onApplyFilters(filters);
  };

  const handleReset = () => {
    const resetFilters: TransactionFilter = {
      type: 'all',
      category: null,
      startDate: null,
      endDate: null,
      searchTerm: ''
    };
    
    setFilters(resetFilters);
    onApplyFilters(resetFilters);
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-4 mb-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Filters</h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
        >
          {isExpanded ? 'Hide filters' : 'Show filters'}
        </button>
      </div>
      
      <div className="flex items-center mb-4">
        <input
          type="text"
          name="searchTerm"
          placeholder="Search transactions..."
          value={filters.searchTerm}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg text-gray-700 dark:text-gray-200 dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      {isExpanded && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Transaction Type
              </label>
              <div className="flex rounded-md shadow-sm">
                <button
                  type="button"
                  onClick={() => handleTypeChange('all')}
                  className={`px-4 py-2 text-sm font-medium border ${
                    filters.type === 'all'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 dark:bg-slate-700 dark:text-gray-200 dark:border-slate-600'
                  } rounded-l-md focus:outline-none`}
                >
                  All
                </button>
                <button
                  type="button"
                  onClick={() => handleTypeChange('credit')}
                  className={`px-4 py-2 text-sm font-medium border-t border-b ${
                    filters.type === 'credit'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 dark:bg-slate-700 dark:text-gray-200 dark:border-slate-600'
                  } focus:outline-none`}
                >
                  Income
                </button>
                <button
                  type="button"
                  onClick={() => handleTypeChange('debit')}
                  className={`px-4 py-2 text-sm font-medium border ${
                    filters.type === 'debit'
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-700 border-gray-300 dark:bg-slate-700 dark:text-gray-200 dark:border-slate-600'
                  } rounded-r-md focus:outline-none`}
                >
                  Expense
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <select
                name="category"
                value={filters.category || ''}
                onChange={handleChange}
                aria-label="Category filter"
                title="Select a category to filter transactions"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 dark:text-gray-200 dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  From Date
                </label>
                <input
                  type="date"
                  name="startDate"
                  value={filters.startDate || ''}
                  onChange={handleChange}
                  aria-label="Start date"
                  title="Start date filter"
                  className="w-full px-4 py-2 border rounded-lg text-gray-700 dark:text-gray-200 dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  To Date
                </label>
                <input
                  type="date"
                  name="endDate"
                  value={filters.endDate || ''}
                  onChange={handleChange}
                  aria-label="End date"
                  title="End date filter"
                  className="w-full px-4 py-2 border rounded-lg text-gray-700 dark:text-gray-200 dark:bg-slate-700 dark:border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              onClick={handleReset}
              variant="outline"
            >
              Reset
            </Button>
            <Button type="submit" variant="primary">
              Apply Filters
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TransactionFilters;
