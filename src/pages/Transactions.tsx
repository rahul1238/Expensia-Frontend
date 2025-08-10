import React, { useState, useEffect, useRef } from 'react';
import Button from '../components/ui/Button';
import Modal from '../components/Modal';
import AddTransactionForm from '../components/AddTransactionForm';
import { transactionService, type TransactionFilters } from '../services/transactionService';
import type { TransactionData } from '../types/finance';

const Transactions: React.FC = () => {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<TransactionData | null>(null);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<TransactionFilters>({});
  const [activeFilters, setActiveFilters] = useState<TransactionFilters>({});
  const filterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadTransactions();
  }, [activeFilters]);

  // Close filter dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilters(false);
      }
    };

    if (showFilters) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showFilters]);

  const loadTransactions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await transactionService.getTransactions(activeFilters);
      setTransactions(response.transactions);
      setTotalCount(response.totalCount || response.transactions.length);
    } catch (err) {
      setError('Failed to load transactions. Please try again.');
      console.error('Error loading transactions:', err);
    } finally {
      setIsLoading(false);
    }
  };


  const handleAddTransaction = (createdTransaction: TransactionData) => {
    setTransactions(prev => [createdTransaction, ...prev]);
    setIsAddModalOpen(false);
    setTotalCount(prev => prev + 1);
  };

  const handleEditTransaction = (updatedTransaction: TransactionData) => {
    setTransactions(prev =>
      prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t)
    );
    setEditingTransaction(null);
  };

  const handleDeleteTransaction = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this transaction?')) {
      return;
    }

    try {
      await transactionService.deleteTransaction(id);
      setTransactions(prev => prev.filter(t => t.id !== id));
      setTotalCount(prev => prev - 1);
    } catch (err) {
      setError('Failed to delete transaction. Please try again.');
      console.error('Error deleting transaction:', err);
    }
  };

  const openEditModal = (transaction: TransactionData) => {
    setEditingTransaction(transaction);
  };

  const closeEditModal = () => {
    setEditingTransaction(null);
  };

  const handleApplyFilters = () => {
    setActiveFilters(filters);
    setShowFilters(false);
  };

  const handleClearFilters = () => {
    setFilters({});
    setActiveFilters({});
    setShowFilters(false);
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).filter(value => 
      value !== undefined && value !== '' && value !== null
    ).length;
  };

  // Filter transactions based on search term
  const filteredTransactions = transactions.filter(transaction =>
    transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (transaction.category && transaction.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalTransactions = totalCount;
  const totalIncome = transactions
    .filter(t => t.type === 'credit')
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter(t => t.type === 'debit')
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-6 py-8 pt-28">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Payment</h1>
          <div className="relative">
            <Button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center"
            >
              Create Transaction
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Transaction */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex flex-col space-y-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Total Transaction</span>
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                ₹{totalTransactions.toLocaleString()}
              </span>
              <div className="flex items-center text-sm">
                <span className="text-green-500 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                  </svg>
                  3.8%
                </span>
                <span className="text-gray-500 ml-2">Last month</span>
              </div>
            </div>
          </div>

          {/* Total Sales */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex flex-col space-y-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Total Income</span>
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                ₹{totalIncome.toLocaleString()}
              </span>
              <div className="flex items-center text-sm">
                <span className="text-green-500 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                  </svg>
                  2.1%
                </span>
                <span className="text-gray-500 ml-2">Last month</span>
              </div>
            </div>
          </div>

          {/* Total Payment */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <div className="flex flex-col space-y-2">
              <span className="text-sm text-gray-500 dark:text-gray-400">Total Expense</span>
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                ₹{totalExpenses.toLocaleString()}
              </span>
              <div className="flex items-center text-sm">
                <span className="text-red-500 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                  </svg>
                  1.9%
                </span>
                <span className="text-gray-500 ml-2">Last month</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-visible">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-white">All Transactions</h2>
                  <div className="flex items-center space-x-4 relative">
                    <div className="relative">
                      <svg className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                      <input
                        type="text"
                        placeholder="Search transactions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      />
                    </div>
                    
                    {/* Filter Button */}
                    <div className="relative" ref={filterRef}>
                      <Button
                        onClick={() => setShowFilters(!showFilters)}
                        className={`border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center ${showFilters ? 'bg-gray-100 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'}`}
                      >
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        Filter
                        {getActiveFilterCount() > 0 && (
                          <span className="ml-2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                            {getActiveFilterCount()}
                          </span>
                        )}
                      </Button>

                      {/* Filter Dropdown */}
                      {showFilters && (
                        <div className="absolute top-full right-0 sm:left-auto sm:right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto transform -translate-x-full sm:translate-x-0">
                          <div className="p-4">
                            <div className="flex items-center justify-between mb-4">
                              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filters</h3>
                              <button
                                onClick={() => setShowFilters(false)}
                                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                title="Close filters"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>

                            <div className="space-y-4">
                              {/* Transaction Type Filter */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  Transaction Type
                                </label>
                                <select
                                  value={filters.type || ''}
                                  onChange={(e) => setFilters(prev => ({ ...prev, type: e.target.value as 'credit' | 'debit' | undefined }))}
                                  title="Select transaction type"
                                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                >
                                  <option value="">All Types</option>
                                  <option value="credit">Credit</option>
                                  <option value="debit">Debit</option>
                                </select>
                              </div>

                              {/* Amount Range */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  Amount Range
                                </label>
                                <div className="flex space-x-2">
                                  <input
                                    type="number"
                                    placeholder="Min amount"
                                    value={filters.minAmount || ''}
                                    onChange={(e) => setFilters(prev => ({ ...prev, minAmount: e.target.value ? parseFloat(e.target.value) : undefined }))}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                  />
                                  <input
                                    type="number"
                                    placeholder="Max amount"
                                    value={filters.maxAmount || ''}
                                    onChange={(e) => setFilters(prev => ({ ...prev, maxAmount: e.target.value ? parseFloat(e.target.value) : undefined }))}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                  />
                                </div>
                              </div>

                              {/* Category Filter */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  Category
                                </label>
                                <input
                                  type="text"
                                  placeholder="Enter category"
                                  value={filters.category || ''}
                                  onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value || undefined }))}
                                  className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                />
                              </div>

                              {/* Date Range */}
                              <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                  Date Range
                                </label>
                                <div className="flex space-x-2">
                                  <input
                                    type="date"
                                    placeholder="Start date"
                                    value={filters.startDate || ''}
                                    onChange={(e) => setFilters(prev => ({ ...prev, startDate: e.target.value || undefined }))}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                  />
                                  <input
                                    type="date"
                                    placeholder="End date"
                                    value={filters.endDate || ''}
                                    onChange={(e) => setFilters(prev => ({ ...prev, endDate: e.target.value || undefined }))}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                                  />
                                </div>
                              </div>
                            </div>

                            {/* Filter Actions */}
                            <div className="flex justify-between pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                              <Button
                                onClick={handleClearFilters}
                                className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 text-sm"
                              >
                                Clear All
                              </Button>
                              <Button
                                onClick={handleApplyFilters}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                              >
                                Apply Filters
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <Button
                      onClick={() => setIsAddModalOpen(true)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium"
                    >
                      + Add Transaction
                    </Button>
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 border-l-4 border-red-500 dark:bg-red-900/20">
                  <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
                </div>
              )}

              {isLoading ? (
                <div className="p-8 text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                  <p className="mt-2 text-gray-500 dark:text-gray-400">Loading transactions...</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Value</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                      {filteredTransactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8">
                                <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center">
                                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                                    {transaction.description.charAt(0).toUpperCase()}
                                  </span>
                                </div>
                              </div>
                              <div className="ml-3">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                  {transaction.description}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {transaction.category ? transaction.category : 'general'}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${transaction.type === 'credit'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                                : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                              }`}>
                              {transaction.type === 'credit' ? 'credit' : 'debit'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            ₹{transaction.amount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            <div className="flex space-x-2">
                              <button
                                onClick={() => openEditModal(transaction)}
                                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => transaction.id && handleDeleteTransaction(transaction.id)}
                                className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {filteredTransactions.length === 0 && (
                        <tr>
                          <td colSpan={5} className="px-6 py-8 text-center text-gray-500 dark:text-gray-400">
                            {transactions.length === 0 ? 'No transactions found' : 'No transactions match your search criteria'}
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Monthly Transaction</h3>
                <select
                  title="Select time period"
                  className="text-sm border border-gray-200 rounded-lg px-3 py-1 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                  <option>Monthly</option>
                  <option>Weekly</option>
                  <option>Daily</option>
                </select>
              </div>

              <div className="flex space-x-1 mb-6 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
                <button className="flex-1 py-2 px-3 bg-gray-900 text-white text-sm rounded-md font-medium">
                  Total Transaction
                </button>
                <button className="flex-1 py-2 px-3 text-gray-600 dark:text-gray-400 text-sm rounded-md">
                  Total Income
                </button>
                <button className="flex-1 py-2 px-3 text-gray-600 dark:text-gray-400 text-sm rounded-md">
                  Total Expense
                </button>
              </div>

              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  ₹{totalTransactions.toLocaleString()}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  This month day sale volume is 4.6% large than last month
                </div>
              </div>

              {/* Simple Chart Visualization */}
              <div className="mb-6">
                <div className="flex items-end justify-between h-32 space-x-1">
                  {[40, 65, 45, 80, 60, 75, 85, 70, 90, 65, 75, 95].map((height, index) => (
                    <div
                      key={index}
                      className={`bg-red-200 dark:bg-red-900/30 rounded-t-sm flex-1 h-${Math.round(height * 32 / 100)}`}
                    />
                  ))}
                </div>
                <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                  <span>01 May</span>
                  <span>31 May</span>
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white">Transaction View</h4>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">₹{totalTransactions.toLocaleString()}</span>
                </div>

                {/* Donut Chart Placeholder */}
                <div className="relative w-32 h-32 mx-auto mb-4">
                  <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 via-green-500 to-orange-500 relative">
                    <div className="absolute inset-4 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-lg font-bold text-gray-900 dark:text-white">₹{totalTransactions.toLocaleString()}</div>
                        <div className="text-xs text-green-500">Up 4.6% Growth</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Legend */}
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Transaction</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Income</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-orange-500 mr-2"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">Expense</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Transaction"
        >
          <AddTransactionForm
            onSuccess={handleAddTransaction}
            onCancel={() => setIsAddModalOpen(false)}
          />
        </Modal>

        {/* Edit Transaction Modal */}
        <Modal
          isOpen={!!editingTransaction}
          onClose={closeEditModal}
          title="Edit Transaction"
        >
          {editingTransaction && (
            <AddTransactionForm
              onSuccess={handleEditTransaction}
              onCancel={closeEditModal}
              initialData={editingTransaction}
            />
          )}
        </Modal>
      </div>
    </div>
  );
};

export default Transactions;
