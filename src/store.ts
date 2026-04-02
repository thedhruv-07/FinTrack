import { create } from 'zustand';

export type Transaction = {
  id: string;
  label: string;
  amount: number;
  type: 'income' | 'expense';
  cat: string;
  date: string;
  icon?: string;
};

interface FinanceState {
  isDark: boolean;
  role: 'admin' | 'viewer';
  view: 'dashboard' | 'history' | 'budget';
  timeRange: '1W' | '1M' | '1Y';
  transactions: Transaction[];
  toggleDark: () => void;
  setRole: (role: 'admin' | 'viewer') => void;
  setView: (view: 'dashboard' | 'history' | 'budget') => void;
  setTimeRange: (range: '1W' | '1M' | '1Y') => void;
  addTransaction: (tx: Omit<Transaction, 'id' | 'date'>) => void;
  getTotals: () => { income: number; expense: number; balance: number };
}

export const useFinanceStore = create<FinanceState>((set, get) => ({
  isDark: false, // Default to light mode for initial testing
  role: 'admin',
  view: 'dashboard',
  timeRange: '1W',
  transactions: [
    { id: '1', label: 'Cloud Services', amount: 85, type: 'expense', cat: 'Tech', date: 'Apr 04', icon: 'cloud' },
    { id: '2', label: 'Weekly Salary', amount: 1200, type: 'income', cat: 'Work', date: 'Apr 01', icon: 'zap' },
    { id: '3', label: 'Project Gain', amount: 450, type: 'income', cat: 'Gig', date: 'Apr 03', icon: 'trending-up' },
  ],
  toggleDark: () => set((state) => {
      const next = !Boolean(state.isDark);
      console.log('Switching isDark to:', next);
      return { isDark: next };
  }),
  setRole: (role) => set({ role }),
  setView: (view) => set({ view }),
  setTimeRange: (timeRange) => set({ timeRange }),
  addTransaction: (tx) => {
    const newTx: Transaction = {
      ...tx,
      id: Math.random().toString(36).substring(7),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit' }),
      icon: tx.type === 'income' ? 'arrow-down-left' : 'arrow-up-right',
    };
    set((state) => ({ transactions: [newTx, ...state.transactions] }));
  },
  getTotals: () => {
    const { transactions } = get();
    const income = transactions
      .filter((t) => t.type === 'income')
      .reduce((acc, t) => acc + Number(t.amount), 0);
    const expense = transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => acc + Number(t.amount), 0);
    return { income, expense, balance: income - expense };
  },
}));
