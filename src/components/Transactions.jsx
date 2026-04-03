import React, { useState } from 'react';
import { useFinance } from '../context/FinanceContext.jsx';
import { categories } from '../data/mockData.jsx';
import './Transactions.css';

const Transactions = () => {
  const {
    getFilteredTransactions,
    searchTerm,
    setSearchTerm,
    typeFilter,
    setTypeFilter,
    categoryFilter,
    setCategoryFilter,
    role,
    addTransaction,
    deleteTransaction,
  } = useFinance();

  // Sorting state
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');

  // Form state for new transaction
  const [showForm, setShowForm] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    date: '',
    amount: '',
    category: categories[0],
    type: 'expense',
  });

  const filteredTransactions = getFilteredTransactions();

  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    let comparison = 0;
    if (sortField === 'date') {
      comparison = new Date(a.date) - new Date(b.date);
    } else if (sortField === 'amount') {
      comparison = a.amount - b.amount;
    } else if (sortField === 'category') {
      comparison = a.category.localeCompare(b.category);
    }
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const handleAddTransaction = (e) => {
    e.preventDefault();
    if (!newTransaction.date || !newTransaction.amount) {
      alert('Please fill in all required fields');
      return;
    }
    addTransaction({
      ...newTransaction,
      amount: parseFloat(newTransaction.amount),
    });
    setNewTransaction({
      date: '',
      amount: '',
      category: categories[0],
      type: 'expense',
    });
    setShowForm(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id);
    }
  };

  const getSortIndicator = (field) => {
    if (sortField !== field) return '';
    return sortDirection === 'asc' ? ' ▲' : ' ▼';
  };

  return (
    <div className="transactions">
      <div className="transactions-header">
        <h2 className="transactions-title">Transactions</h2>
        {role === 'admin' && (
          <button
            className="add-btn"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? '✕ Cancel' : '+ Add Transaction'}
          </button>
        )}
      </div>

      {/* Add Transaction Form */}
      {showForm && role === 'admin' && (
        <form className="transaction-form" onSubmit={handleAddTransaction}>
          <div className="form-row">
            <div className="form-group">
              <label>Date *</label>
              <input
                type="date"
                value={newTransaction.date}
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, date: e.target.value })
                }
                required
              />
            </div>
            <div className="form-group">
              <label>Amount *</label>
              <input
                type="number"
                value={newTransaction.amount}
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, amount: e.target.value })
                }
                placeholder="0.00"
                min="0"
                step="0.01"
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Category</label>
              <select
                value={newTransaction.category}
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, category: e.target.value })
                }
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Type</label>
              <select
                value={newTransaction.type}
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, type: e.target.value })
                }
              >
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>
          </div>
          <button type="submit" className="submit-btn">
            Add Transaction
          </button>
        </form>
      )}

      {/* Filters */}
      <div className="filters">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Search by category..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <div className="filter-group">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="filter-group">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      {sortedTransactions.length === 0 ? (
        <div className="empty-state">
          <p>No transactions found.</p>
        </div>
      ) : (
        <table className="transactions-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('date')}>
                Date{getSortIndicator('date')}
              </th>
              <th onClick={() => handleSort('amount')}>
                Amount{getSortIndicator('amount')}
              </th>
              <th onClick={() => handleSort('category')}>
                Category{getSortIndicator('category')}
              </th>
              <th>Type</th>
              {role === 'admin' && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.date}</td>
                <td className={`amount-cell ${transaction.type}`}>
                  {transaction.type === 'income' ? '+' : '-'}$
                  {transaction.amount.toLocaleString()}
                </td>
                <td>{transaction.category}</td>
                <td>
                  <span className={`type-badge ${transaction.type}`}>
                    {transaction.type}
                  </span>
                </td>
                {role === 'admin' && (
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(transaction.id)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Transactions;