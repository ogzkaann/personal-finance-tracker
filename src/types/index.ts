export type TransactionType = 'income' | 'expense';
export type RecurrenceType = 'none' | 'daily' | 'weekly' | 'monthly' | 'yearly';

export interface Transaction {
  id: string;
  amount: number;
  type: TransactionType;
  category: string;
  description: string;
  date: string;
  createdAt: string;
  updatedAt: string;
  recurrence?: {
    type: RecurrenceType;
    startDate: string;
    endDate?: string;
    lastProcessed?: string;
  };
  isRecurring?: boolean;
  parentTransactionId?: string;
  deleted?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  type: TransactionType;
  color: string;
}

export interface DashboardSummary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  recentTransactions: Transaction[];
  categoryTotals: {
    [key: string]: number;
  };
}

export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
} 