import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import transactionService from '../../services/transactionService';
import type { TransactionsState, TransactionFilters, TransactionData } from '../../types';

const initialState: TransactionsState = {
  items: [],
  status: 'idle',
  error: null,
  filter: {
    type: 'all',
    category: null,
    startDate: null,
    endDate: null,
    searchTerm: '',
  },
};

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async (filters: TransactionFilters | undefined, { rejectWithValue, getState }) => {
    try {
      if (!filters) {
        const state = getState() as { transactions: TransactionsState };
        const { filter } = state.transactions;
        
        filters = {
          type: filter.type,
          category: filter.category,
          startDate: filter.startDate,
          endDate: filter.endDate,
          description: filter.searchTerm || undefined
        };
      }
      
      const response = await transactionService.getAllTransactions(filters);
      return response.transactions || [];
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch transactions');
    }
  }
);

export const createTransaction = createAsyncThunk(
  'transactions/createTransaction',
  async (transactionData: Omit<TransactionData, 'id' | 'userId' | 'date'>, { rejectWithValue }) => {
    try {
      const response = await transactionService.createTransaction(transactionData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to create transaction');
    }
  }
);

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<TransactionsState['filter']>>) => {
      state.filter = { ...state.filter, ...action.payload };
    },
    clearFilters: (state) => {
      state.filter = initialState.filter;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
        state.error = null;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
      });
  },
});

export const { setFilter, clearFilters } = transactionsSlice.actions;

export default transactionsSlice.reducer;
