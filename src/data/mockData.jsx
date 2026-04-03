// Mock transaction data
// This is sample data for the finance dashboard
export const initialTransactions = [
  { id: 1, date: '2026-04-01', amount: 5000, category: 'Salary', type: 'income' },
  { id: 2, date: '2026-04-02', amount: 250, category: 'Food', type: 'expense' },
  { id: 3, date: '2026-04-03', amount: 1500, category: 'Freelance', type: 'income' },
  { id: 4, date: '2026-04-03', amount: 80, category: 'Transport', type: 'expense' },
  { id: 5, date: '2026-04-04', amount: 200, category: 'Utilities', type: 'expense' },
  { id: 6, date: '2026-04-05', amount: 300, category: 'Shopping', type: 'expense' },
  { id: 7, date: '2026-04-06', amount: 1000, category: 'Investment', type: 'income' },
  { id: 8, date: '2026-04-07', amount: 450, category: 'Food', type: 'expense' },
  { id: 9, date: '2026-04-08', amount: 120, category: 'Entertainment', type: 'expense' },
  { id: 10, date: '2026-04-09', amount: 2500, category: 'Salary', type: 'income' },
  { id: 11, date: '2026-04-10', amount: 350, category: 'Healthcare', type: 'expense' },
  { id: 12, date: '2026-04-11', amount: 90, category: 'Transport', type: 'expense' },
  { id: 13, date: '2026-04-12', amount: 180, category: 'Food', type: 'expense' },
  { id: 14, date: '2026-04-13', amount: 800, category: 'Freelance', type: 'income' },
  { id: 15, date: '2026-04-14', amount: 220, category: 'Utilities', type: 'expense' },
];

// Last month data for comparison
export const lastMonthData = {
  totalExpenses: 3200,
  totalIncome: 8000,
};

// Category colors for charts
export const categoryColors = {
  Food: '#FF6384',
  Transport: '#36A2EB',
  Utilities: '#FFCE56',
  Shopping: '#4BC0C0',
  Entertainment: '#9966FF',
  Healthcare: '#FF9F40',
  Salary: '#4CAF50',
  Freelance: '#2196F3',
  Investment: '#9C27B0',
};

// Category list
export const categories = [
  'Food',
  'Transport',
  'Utilities',
  'Shopping',
  'Entertainment',
  'Healthcare',
  'Salary',
  'Freelance',
  'Investment',
];