import React, { useEffect, useState } from 'react';
import gmailService from '../services/gmailService';
import emailTransactionService from '../services/emailTransactionService';
import type { GmailSyncResponse } from '../services/gmailService';
import type { EmailTransaction } from '../types/email';
import type { EmailEvaluationResult } from '../services/emailTransactionService';

const GmailConnect: React.FC = () => {
  const [connecting, setConnecting] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [syncingCurrentMonth, setSyncingCurrentMonth] = useState(false);
  const [evaluating, setEvaluating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSyncResult, setLastSyncResult] = useState<GmailSyncResponse | null>(null);
  const [lastEvaluationResult, setLastEvaluationResult] = useState<EmailEvaluationResult | null>(null);
  const [transactions, setTransactions] = useState<EmailTransaction[]>([]);

  const connect = async () => {
    try {
      setConnecting(true);
      setError(null);
      const url = await gmailService.getConnectUrl();
      window.location.href = url;
    } catch (e: any) {
      setError(e?.message || 'Failed to start Gmail connect');
    } finally {
      setConnecting(false);
    }
  };

  const sync = async () => {
    try {
      setSyncing(true);
      setError(null);
      const syncResult = await gmailService.triggerSync();
      setLastSyncResult(syncResult);
      const data = await gmailService.listTransactions();
      setTransactions(data);
    } catch (e: any) {
      setError(e?.message || 'Sync failed');
      setLastSyncResult(null);
    } finally {
      setSyncing(false);
    }
  };

  const syncCurrentMonth = async () => {
    try {
      setSyncingCurrentMonth(true);
      setError(null);
      const syncResult = await gmailService.syncCurrentMonth();
      setLastSyncResult(syncResult);
      const data = await gmailService.listTransactions();
      setTransactions(data);
    } catch (e: any) {
      setError(e?.message || 'Current month sync failed');
      setLastSyncResult(null);
    } finally {
      setSyncingCurrentMonth(false);
    }
  };

  const triggerEvaluation = async () => {
    try {
      setEvaluating(true);
      setError(null);
      const evaluationResult = await emailTransactionService.triggerEvaluation();
      setLastEvaluationResult(evaluationResult);
      
      // Refresh transaction list after evaluation
      const data = await gmailService.listTransactions();
      setTransactions(data);
    } catch (e: any) {
      setError(e?.message || 'Email evaluation failed');
      setLastEvaluationResult(null);
    } finally {
      setEvaluating(false);
    }
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await gmailService.listTransactions();
        if (mounted) setTransactions(data);
      } catch (e: any) {
        console.error('Failed to load Gmail transactions:', e);
        if (mounted) setError(e?.message || 'Failed to load Gmail transactions');
      }
    })();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Gmail Transactions</h3>
        <div className="space-x-2 flex flex-wrap gap-2">
          <button onClick={connect} disabled={connecting} className="px-4 py-2 bg-red-500 text-white rounded disabled:opacity-60">
            {connecting ? 'Redirecting…' : 'Connect Gmail'}
          </button>
          <button onClick={sync} disabled={syncing} className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-60">
            {syncing ? 'Syncing…' : 'Sync Now'}
          </button>
          <button onClick={syncCurrentMonth} disabled={syncingCurrentMonth} className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-60">
            {syncingCurrentMonth ? 'Syncing…' : 'Sync This Month'}
          </button>
          <button onClick={triggerEvaluation} disabled={evaluating} className="px-4 py-2 bg-purple-600 text-white rounded disabled:opacity-60">
            {evaluating ? 'Evaluating…' : 'Process to Transactions'}
          </button>
        </div>
      </div>

      {error && <div className="mt-3 text-sm text-red-600">{error}</div>}

      {/* Sync Results Display */}
      {lastSyncResult && (
        <div className="mt-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700 rounded">
          <div className="text-sm text-green-800 dark:text-green-200">
            <strong>Sync Completed:</strong> {lastSyncResult.synced} new email transactions added
          </div>
        </div>
      )}

      {/* Evaluation Results Display */}
      {lastEvaluationResult && (
        <div className="mt-3 p-3 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-700 rounded">
          <div className="text-sm text-purple-800 dark:text-purple-200">
            <strong>Evaluation Completed:</strong>
            <div className="mt-1">
              Processed: {lastEvaluationResult.processed} | 
              Added: {lastEvaluationResult.added} | 
              Duplicates: {lastEvaluationResult.duplicates} | 
              Skipped: {lastEvaluationResult.skipped}
            </div>
            {lastEvaluationResult.processingTimeMs && (
              <div className="text-xs mt-1">
                Completed in {lastEvaluationResult.processingTimeMs}ms
              </div>
            )}
          </div>
        </div>
      )}

      <div className="mt-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Merchant</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">From</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-3 text-gray-500">No email transactions yet.</td>
              </tr>
            ) : (
              transactions.map((tx: EmailTransaction) => (
                <tr key={tx.id}>
                  <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">{tx.date ? new Date(tx.date).toLocaleString() : '—'}</td>
                  <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">{tx.merchant || 'N/A'}</td>
                  <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">{typeof tx.amount === 'number' ? tx.amount.toFixed(2) : '0.00'}</td>
                  <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100">{tx.sourceEmail || 'N/A'}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GmailConnect;
