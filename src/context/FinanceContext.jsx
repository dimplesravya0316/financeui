import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialTransactions } from '../data/mockData';

const FinanceContext = createContext();

export const useFinance = () => {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider');
  }
  return context;
};

export const FinanceProvider = ({ children }) => {
  // Load from localStorage or use initial data
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : initialTransactions;
  });

  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Role state
  const [role, setRole] = useState('viewer');

  // Dark mode state
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  // Save to localStorage when transactions change
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Save dark mode preference
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Add new transaction
  const addTransaction = (transaction) => {
    const newTransaction = {
      ...transaction,
      id: Date.now(),
    };
    setTransactions([newTransaction, ...transactions]);
  };

  // Delete transaction
  const deleteTransaction = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  // Get filtered transactions
  const getFilteredTransactions = () => {
    return transactions.filter((transaction) => {
      // Search filter
      const matchesSearch = transaction.category
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      // Type filter
      const matchesType =
        typeFilter === 'all' || transaction.type === typeFilter;

      // Category filter
      const matchesCategory =
        categoryFilter === 'all' || transaction.category === categoryFilter;

      return matchesSearch && matchesType && matchesCategory;
    });
  };

  // Calculate totals
  const getTotals = () => {
    const totalIncome = transactions
      .filter((t) => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter((t) => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);

    const totalBalance = totalIncome - totalExpenses;

    return { totalBalance, totalIncome, totalExpenses };
  };

  // Get category-wise spending
  const getCategorySpending = () => {
    const spending = {};
    transactions
      .filter((t) => t.type === 'expense')
      .forEach((t) => {
        spending[t.category] = (spending[t.category] || 0) + t.amount;
      });
    return spending;
  };

  // Get monthly trend data
  const getMonthlyData = () => {
    const monthlyData = {};
    transactions.forEach((t) => {
      const month = t.date.substring(0, 7); // YYYY-MM
      if (!monthlyData[month]) {
        monthlyData[month] = { income: 0, expense: 0 };
      }
      if (t.type === 'income') {
        monthlyData[month].income += t.amount;
      } else {
        monthlyData[month].expense += t.amount;
      }
    });
    return monthlyData;
  };

  const value = {
    transactions,
    setTransactions,
    searchTerm,
    setSearchTerm,
    typeFilter,
    setTypeFilter,
    categoryFilter,
    setCategoryFilter,
    role,
    setRole,
    darkMode,
    setDarkMode,
    addTransaction,
    deleteTransaction,
    getFilteredTransactions,
    getTotals,
    getCategorySpending,
    getMonthlyData,
  };

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
};

export default FinanceContext;