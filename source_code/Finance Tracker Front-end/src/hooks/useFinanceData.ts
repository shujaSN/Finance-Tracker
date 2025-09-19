import { useState, useCallback } from 'react';
import { toast } from '@/hooks/use-toast';

export interface Transaction {
  id: number;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  date: string;
  category: string;
  account: string;
}

export interface Budget {
  id: number;
  category: string;
  budgeted: number;
  spent: number;
  period: 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  color: string;
  status: 'on-track' | 'over-budget' | 'under-budget';
}

export interface Category {
  id: number;
  name: string;
  type: 'income' | 'expense';
  color: string;
  totalAmount: number;
  transactionCount: number;
  avgTransaction: number;
  trend: 'up' | 'down' | 'stable';
}

// Initial mock data
const initialTransactions: Transaction[] = [
  { id: 1, description: "Monthly Salary", amount: 4000, type: "income", date: "2024-01-15", category: "Salary", account: "Checking" },
  { id: 2, description: "Whole Foods", amount: -120, type: "expense", date: "2024-01-14", category: "Groceries", account: "Credit Card" },
  { id: 3, description: "Shell Gas Station", amount: -60, type: "expense", date: "2024-01-13", category: "Transportation", account: "Debit Card" },
  { id: 4, description: "Freelance Project", amount: 500, type: "income", date: "2024-01-12", category: "Freelance", account: "Checking" },
  { id: 5, description: "Netflix Subscription", amount: -15, type: "expense", date: "2024-01-11", category: "Entertainment", account: "Credit Card" },
];

const initialBudgets: Budget[] = [
  { id: 1, category: "Groceries", budgeted: 400, spent: 320, period: "monthly", color: "#22c55e", status: "on-track" },
  { id: 2, category: "Transportation", budgeted: 200, spent: 180, period: "monthly", color: "#3b82f6", status: "on-track" },
  { id: 3, category: "Entertainment", budgeted: 150, spent: 175, period: "monthly", color: "#f59e0b", status: "over-budget" },
  { id: 4, category: "Shopping", budgeted: 300, spent: 450, period: "monthly", color: "#ef4444", status: "over-budget" },
];

const initialCategories: Category[] = [
  { id: 1, name: "Salary", type: "income", color: "#22c55e", totalAmount: 4500, transactionCount: 2, avgTransaction: 2250, trend: "up" },
  { id: 2, name: "Freelance", type: "income", color: "#10b981", totalAmount: 1200, transactionCount: 3, avgTransaction: 400, trend: "up" },
  { id: 3, name: "Groceries", type: "expense", color: "#3b82f6", totalAmount: 450, transactionCount: 8, avgTransaction: 56, trend: "stable" },
  { id: 4, name: "Transportation", type: "expense", color: "#8b5cf6", totalAmount: 320, transactionCount: 12, avgTransaction: 27, trend: "down" },
];

export function useFinanceData() {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [budgets, setBudgets] = useState<Budget[]>(initialBudgets);
  const [categories, setCategories] = useState<Category[]>(initialCategories);

  // Transaction functions
  const addTransaction = useCallback((transactionData: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: Math.max(...transactions.map(t => t.id), 0) + 1,
      amount: transactionData.type === 'expense' ? -Math.abs(transactionData.amount) : Math.abs(transactionData.amount)
    };
    
    setTransactions(prev => [newTransaction, ...prev]);
    
    // Update budget spent amount if it's an expense
    if (transactionData.type === 'expense') {
      setBudgets(prev => prev.map(budget => {
        if (budget.category === transactionData.category) {
          const newSpent = budget.spent + Math.abs(transactionData.amount);
          const newStatus = newSpent > budget.budgeted ? 'over-budget' : 
                           newSpent < budget.budgeted * 0.8 ? 'under-budget' : 'on-track';
          return { ...budget, spent: newSpent, status: newStatus };
        }
        return budget;
      }));
    }
    
    toast({
      title: "Transaction Added",
      description: `${transactionData.type === 'income' ? 'Income' : 'Expense'} of $${Math.abs(transactionData.amount)} added successfully.`,
    });
  }, [transactions]);

  const updateTransaction = useCallback((id: number, transactionData: Partial<Transaction>) => {
    setTransactions(prev => prev.map(t => t.id === id ? { ...t, ...transactionData } : t));
    toast({
      title: "Transaction Updated",
      description: "Transaction has been updated successfully.",
    });
  }, []);

  const deleteTransaction = useCallback((id: number) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
    toast({
      title: "Transaction Deleted",
      description: "Transaction has been deleted successfully.",
    });
  }, []);

  // Budget functions
  const addBudget = useCallback((budgetData: Omit<Budget, 'id' | 'spent' | 'status'>) => {
    const newBudget: Budget = {
      ...budgetData,
      id: Math.max(...budgets.map(b => b.id), 0) + 1,
      spent: 0,
      status: 'under-budget'
    };
    
    setBudgets(prev => [...prev, newBudget]);
    toast({
      title: "Budget Created",
      description: `Budget for ${budgetData.category} has been created successfully.`,
    });
  }, [budgets]);

  const updateBudget = useCallback((id: number, budgetData: Partial<Budget>) => {
    setBudgets(prev => prev.map(b => b.id === id ? { ...b, ...budgetData } : b));
    toast({
      title: "Budget Updated", 
      description: "Budget has been updated successfully.",
    });
  }, []);

  const deleteBudget = useCallback((id: number) => {
    setBudgets(prev => prev.filter(b => b.id !== id));
    toast({
      title: "Budget Deleted",
      description: "Budget has been deleted successfully.",
    });
  }, []);

  // Category functions
  const addCategory = useCallback((categoryData: Omit<Category, 'id' | 'totalAmount' | 'transactionCount' | 'avgTransaction' | 'trend'>) => {
    const newCategory: Category = {
      ...categoryData,
      id: Math.max(...categories.map(c => c.id), 0) + 1,
      totalAmount: 0,
      transactionCount: 0,
      avgTransaction: 0,
      trend: 'stable'
    };
    
    setCategories(prev => [...prev, newCategory]);
    toast({
      title: "Category Created",
      description: `Category "${categoryData.name}" has been created successfully.`,
    });
  }, [categories]);

  const updateCategory = useCallback((id: number, categoryData: Partial<Category>) => {
    setCategories(prev => prev.map(c => c.id === id ? { ...c, ...categoryData } : c));
    toast({
      title: "Category Updated",
      description: "Category has been updated successfully.",
    });
  }, []);

  const deleteCategory = useCallback((id: number) => {
    setCategories(prev => prev.filter(c => c.id !== id));
    toast({
      title: "Category Deleted",
      description: "Category has been deleted successfully.",
    });
  }, []);

  // Export function
  const exportData = useCallback((type: string, format: string, dateRange: string) => {
    // Simulate export process
    toast({
      title: "Export Started",
      description: `Exporting ${type} data in ${format} format for ${dateRange}...`,
    });
    
    setTimeout(() => {
      toast({
        title: "Export Complete",
        description: "Your data has been exported successfully. Download should start shortly.",
      });
    }, 2000);
  }, []);

  return {
    transactions,
    budgets,
    categories,
    addTransaction,
    updateTransaction,
    deleteTransaction,
    addBudget,
    updateBudget,
    deleteBudget,
    addCategory,
    updateCategory,
    deleteCategory,
    exportData
  };
}