import React from 'react';
import Button from './ui/Button';
import type { TransactionListProps } from '../types/components';

const TransactionList: React.FC<TransactionListProps> = ({ 
  transactions, 
  onEdit, 
  onDelete, 
  isLoading = false 
}) => {
  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-400">Loading transactions...</p>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="text-gray-400 dark:text-gray-500">
          <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          No transactions found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Try adjusting your filters or add a new transaction to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">
      {/* Header */}
      <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-b border-gray-200 dark:border-gray-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-2 rounded-xl">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Transaction History
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {transactions.length} transaction{transactions.length !== 1 ? 's' : ''} found
              </p>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-600">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              Total: {transactions.length}
            </span>
          </div>
        </div>
      </div>

      {/* Transactions Grid */}
      <div className="p-6">
        <div className="grid gap-4">
          {transactions.map((transaction) => (
            <div 
              key={transaction.id} 
              className="group bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-lg border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:scale-[1.01] overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-start space-x-4">
                      {/* Transaction Type Icon */}
                      <div className={`p-3 rounded-xl ${
                        transaction.type === 'credit' 
                          ? 'bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30' 
                          : 'bg-gradient-to-r from-red-100 to-pink-100 dark:from-red-900/30 dark:to-pink-900/30'
                      }`}>
                        {transaction.type === 'credit' ? (
                          <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
                          </svg>
                        ) : (
                          <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
                          </svg>
                        )}
                      </div>
                      
                      {/* Transaction Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white truncate">
                            {transaction.description}
                          </h4>
                          <span className={`text-xl font-bold ${
                            transaction.type === 'credit' 
                              ? 'text-green-600 dark:text-green-400' 
                              : 'text-red-600 dark:text-red-400'
                          }`}>
                            {transaction.type === 'credit' ? '+' : '-'}
                            {new Intl.NumberFormat('en-IN', {
                              style: 'currency',
                              currency: 'INR'
                            }).format(transaction.amount)}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                            </svg>
                            <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-lg font-medium">
                              {transaction.category}
                            </span>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            <span>{transaction.transactionMethod}</span>
                          </div>
                          
                          <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>
                              {transaction.date ? new Date(transaction.date).toLocaleDateString('en-IN', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              }) : 'No date'}
                            </span>
                          </div>
                        </div>
                        
                        {transaction.notes && (
                          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 italic">
                            "{transaction.notes}"
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex items-center space-x-2 ml-6 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Button
                      variant="ghost"
                      onClick={() => onEdit(transaction)}
                      className="p-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors"
                      title="Edit transaction"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </Button>
                    
                    <Button
                      variant="ghost"
                      onClick={() => transaction.id && onDelete(transaction.id)}
                      className="p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                      title="Delete transaction"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
