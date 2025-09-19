import React, { createContext, useContext } from 'react';
import { useFinanceData } from '@/hooks/useFinanceData';
import type { Transaction, Budget, Category } from '@/hooks/useFinanceData';

interface FinanceContextType {
  transactions: Transaction[];
  budgets: Budget[];
  categories: Category[];
  addTransaction: (transactionData: Omit<Transaction, 'id'>) => void;
  updateTransaction: (id: number, transactionData: Partial<Transaction>) => void;
  deleteTransaction: (id: number) => void;
  addBudget: (budgetData: Omit<Budget, 'id' | 'spent' | 'status'>) => void;
  updateBudget: (id: number, budgetData: Partial<Budget>) => void;
  deleteBudget: (id: number) => void;
  addCategory: (categoryData: Omit<Category, 'id' | 'totalAmount' | 'transactionCount' | 'avgTransaction' | 'trend'>) => void;
  updateCategory: (id: number, categoryData: Partial<Category>) => void;
  deleteCategory: (id: number) => void;
  exportData: (type: string, format: string, dateRange: string) => void;
}

const FinanceContext = createContext<FinanceContextType | undefined>(undefined);

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const financeData = useFinanceData();

  return (
    <FinanceContext.Provider value={financeData}>
      {children}
    </FinanceContext.Provider>
  );
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (context === undefined) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
}