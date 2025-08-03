import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Section from '../components/ui/Section';
import StatBox from '../components/ui/StatBox';
import Transaction from '../components/Transaction';
import Modal from '../components/Modal';
import AddTransactionForm from '../components/AddTransactionForm';
import transactionService from '../services/transactionService';
import type { TransactionData } from '../types/finance';

const Dashboard: React.FC = () => {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpenses: 0,
    netBalance: 0,
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR'
    }).format(amount);
  };

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await transactionService.getAllTransactions();

      // Ensure we have transactions array, default to empty array if undefined
      const transactions = response.transactions || [];
      setTransactions(transactions);

      console.log('Received transactions:', transactions);

      // Calculate summary from transactions data
      const totalIncome = transactions
        .filter(t => t.type === 'credit')
        .reduce((sum, t) => sum + t.amount, 0);

      const totalExpenses = transactions
        .filter(t => t.type === 'debit')
        .reduce((sum, t) => sum + t.amount, 0);

      setSummary({
        totalIncome,
        totalExpenses,
        netBalance: totalIncome - totalExpenses
      });
    } catch (err) {
      setError('Failed to load transactions');
      console.error('Error fetching transactions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleAddTransaction = (transaction: TransactionData) => {
    console.log('New transaction created:', transaction);

    // Add an id if it doesn't exist
    if (!transaction.id) {
      transaction.id = `temp-${Date.now()}`;
    }

    // Add a date if it doesn't exist
    if (!transaction.date) {
      transaction.date = new Date().toISOString();
    }

    // Add the new transaction to the list
    setTransactions(prev => [transaction, ...prev]);

    // Update summary with the new transaction
    setSummary(prev => {
      // Default to debit if type is not specified
      const isCredit = transaction.type === 'credit';

      if (isCredit) {
        return {
          totalIncome: prev.totalIncome + transaction.amount,
          totalExpenses: prev.totalExpenses,
          netBalance: prev.netBalance + transaction.amount
        };
      } else {
        return {
          totalIncome: prev.totalIncome,
          totalExpenses: prev.totalExpenses + transaction.amount,
          netBalance: prev.netBalance - transaction.amount
        };
      }
    });

    setShowAddModal(false);

    // Optionally refresh transactions from server
    // fetchTransactions();
  };

  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="flex flex-wrap items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <div className="flex space-x-3">
          <Button onClick={() => setShowAddModal(true)}>Add Transaction</Button>
          <Link to="/transactions">
            <Button variant="outline">Manage Transactions</Button>
          </Link>
        </div>
      </div>

      <Section className="py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatBox
            value={formatCurrency(summary.totalIncome)}
            label="Total Income"
          />
          <StatBox
            value={formatCurrency(summary.totalExpenses)}
            label="Total Expenses"
          />
          <StatBox
            value={formatCurrency(summary.netBalance)}
            label="Net Balance"
          />
        </div>
      </Section>

      <Section className="py-6">
        <Card>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Recent Transactions</h2>
            <Link
              to="/transactions"
              className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 font-medium transition-colors"
            >
              View All Transactions →
            </Link>
          </div>

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
              <p>{error}</p>
            </div>
          )}

          {isLoading ? (
            <div className="text-center py-8">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
              </div>
              <p className="mt-2 text-gray-600 dark:text-gray-300">Loading transactions...</p>
            </div>
          ) : transactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {transactions.slice(0, 5).map(transaction => (
                    <Transaction key={transaction.id} transaction={transaction} />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 dark:text-gray-300">No transactions found.</p>
              <Button
                className="mt-4"
                onClick={() => setShowAddModal(true)}
                variant="outline"
              >
                Add Your First Transaction
              </Button>
            </div>
          )}
        </Card>
      </Section>

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add Transaction"
      >
        <AddTransactionForm
          onSuccess={handleAddTransaction}
          onCancel={() => setShowAddModal(false)}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;
