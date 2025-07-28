import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Section from '../components/ui/Section';
import Transaction from '../components/Transaction';
import TransactionFilters from '../components/TransactionFilters';
import Modal from '../components/Modal';
import AddTransactionForm from '../forms/AddTransactionForm';
import { fetchTransactions, setFilter, clearFilters } from '../feature/transactions/transactionsSlice';
import { TRANSACTION_CATEGORIES } from '../types/finance';
import type { TransactionFilters as TFilters } from '../types';

import type { RootState, AppDispatch } from '../app/store';
import Heading from '../components/ui/Heading';

const TransactionsPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items, status, error, filter } = useSelector((state: RootState) => state.transactions);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [transactionsPerPage] = useState(10);

  const categories = TRANSACTION_CATEGORIES;

  const fetchFilteredTransactions = () => {
    const apiFilters: TFilters = {
      type: filter.type,
      category: filter.category || undefined,
      startDate: filter.startDate || undefined,
      endDate: filter.endDate || undefined,
      description: filter.searchTerm || undefined,
      page: currentPage,
      limit: transactionsPerPage
    };
    
    dispatch(fetchTransactions(apiFilters));
  };

  useEffect(() => {
    fetchFilteredTransactions();
  }, [currentPage, dispatch]);
  
  useEffect(() => {
    if (currentPage === 1) {
      fetchFilteredTransactions();
    } else {
      setCurrentPage(1);
    }
  }, [filter]);
  
  const currentTransactions = items;
  const totalPages = Math.ceil(items.length / transactionsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleApplyFilters = (newFilters: typeof filter) => {
    dispatch(setFilter(newFilters));
    setCurrentPage(1);
  };

  const handleAddTransaction = () => {
    setShowAddModal(false);
  };

  const handleEditTransaction = (id: string | undefined) => {
    if (!id) return;
  };

  const handleDeleteTransaction = (id: string | undefined) => {
    if (!id) return;
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-center mt-6">
        <nav>
          <ul className="flex items-center space-x-1">
            <li>
              <button
                onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md ${
                  currentPage === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-slate-700'
                }`}
              >
                &laquo;
              </button>
            </li>
            
            {[...Array(totalPages)].map((_, index) => (
              <li key={index}>
                <button
                  onClick={() => handlePageChange(index + 1)}
                  className={`px-3 py-1 rounded-md ${
                    currentPage === index + 1
                      ? 'bg-blue-600 text-white'
                      : 'text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-slate-700'
                  }`}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            
            <li>
              <button
                onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md ${
                  currentPage === totalPages
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-blue-600 hover:bg-blue-100 dark:text-blue-400 dark:hover:bg-slate-700'
                }`}
              >
                &raquo;
              </button>
            </li>
          </ul>
        </nav>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Section>
        <div className="flex justify-between items-center mb-6">
          <Heading>Transactions</Heading>
          <Button
            onClick={() => setShowAddModal(true)}
            className="flex items-center"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-5 w-5 mr-2" 
              viewBox="0 0 20 20" 
              fill="currentColor"
            >
              <path 
                fillRule="evenodd" 
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" 
                clipRule="evenodd" 
              />
            </svg>
            Add Transaction
          </Button>
        </div>

        <TransactionFilters
          onApplyFilters={handleApplyFilters}
          initialFilters={filter}
          categories={categories}
        />

        {status === 'loading' && (
          <div className="text-center py-8">
            <div className="spinner"></div>
            <p className="mt-2 text-gray-600 dark:text-gray-400">Loading transactions...</p>
          </div>
        )}

        {status === 'failed' && (
          <Card className="border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800">
            <div className="text-center p-4">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-10 w-10 mx-auto text-red-500 mb-2" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
                  clipRule="evenodd" 
                />
              </svg>
              <p className="text-red-700 dark:text-red-400">
                Failed to load transactions: {error}
              </p>
            </div>
          </Card>
        )}

        {status === 'succeeded' && (
          <>
            {items.length === 0 ? (
              <Card className="text-center p-8">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-12 w-12 mx-auto text-gray-400 mb-4" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  No Transactions Found
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {filter.type !== 'all' || filter.category || filter.startDate || filter.endDate || filter.searchTerm
                    ? "No transactions match your current filters. Try adjusting your filters or clearing them."
                    : "You don't have any transactions yet. Add your first transaction to get started."}
                </p>
                {(filter.type !== 'all' || filter.category || filter.startDate || filter.endDate || filter.searchTerm) && (
                  <Button
                    variant="outline"
                    onClick={() => dispatch(clearFilters())}
                  >
                    Clear All Filters
                  </Button>
                )}
              </Card>
            ) : (
              <div className="space-y-4">
                {currentTransactions.map((transaction) => (
                  <Card key={transaction.id || `temp-${transaction.description}`} className="relative">
                    <Transaction transaction={transaction} />
                    
                    <div className="absolute top-4 right-4 flex space-x-2">
                      <button
                        onClick={() => handleEditTransaction(transaction.id)}
                        className="p-1 text-gray-400 hover:text-blue-500 transition-colors"
                        aria-label="Edit transaction"
                        title="Edit transaction"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDeleteTransaction(transaction.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Delete transaction"
                        title="Delete transaction"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
            
            {renderPagination()}
          </>
        )}
      </Section>

      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add Transaction">
        <AddTransactionForm
          onSuccess={handleAddTransaction}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>
    </div>
  );
};

export default TransactionsPage;
