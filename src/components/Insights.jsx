import React from 'react';
import { useFinance } from '../context/FinanceContext.jsx';
import { lastMonthData } from '../data/mockData.jsx';
import './Insights.css';

const Insights = () => {
  const { getTotals, getCategorySpending, transactions } = useFinance();

  const totals = getTotals();
  const categorySpending = getCategorySpending();

  // Find highest spending category
  const categories = Object.keys(categorySpending);
  const highestCategory = categories.length > 0
    ? categories.reduce((a, b) => categorySpending[a] > categorySpending[b] ? a : b)
    : null;

  const highestSpending = highestCategory ? categorySpending[highestCategory] : 0;

  // Calculate this month's expenses
  const currentMonth = new Date().toISOString().substring(0, 7); // YYYY-MM
  const thisMonthExpenses = transactions
    .filter(t => t.type === 'expense' && t.date.substring(0, 7) === currentMonth)
    .reduce((sum, t) => sum + t.amount, 0);

  // Calculate last month's expenses from mock data
  const lastMonthExpenses = lastMonthData.totalExpenses;

  // Calculate percentage change
  const expenseChange = lastMonthExpenses > 0
    ? ((thisMonthExpenses - lastMonthExpenses) / lastMonthExpenses * 100).toFixed(1)
    : 0;

  // Calculate average daily spending (assuming 30 days)
  const daysInMonth = 30;
  const avgDailySpending = thisMonthExpenses / daysInMonth;

  // Find most common category
  const categoryCount = {};
  transactions
    .filter(t => t.type === 'expense')
    .forEach(t => {
      categoryCount[t.category] = (categoryCount[t.category] || 0) + 1;
    });

  const mostFrequentCategory = categories.length > 0
    ? Object.keys(categoryCount).reduce((a, b) => categoryCount[a] > categoryCount[b] ? a : b)
    : null;

  // Calculate savings rate
  const savingsRate = totals.totalIncome > 0
    ? ((totals.totalIncome - totals.totalExpenses) / totals.totalIncome * 100).toFixed(1)
    : 0;

  return (
    <div className="insights">
      <h2 className="insights-title">Financial Insights</h2>

      <div className="insights-grid">
        {/* Highest Spending Category */}
        <div className="insight-card">
          <h3>🏆 Highest Spending Category</h3>
          {highestCategory ? (
            <>
              <p className="insight-value">{highestCategory}</p>
              <p className="insight-detail">Total: ${highestSpending.toLocaleString()}</p>
            </>
          ) : (
            <p className="insight-value">No data</p>
          )}
        </div>

        {/* Month over Month Comparison */}
        <div className="insight-card">
          <h3>📊 Expenses This Month vs Last Month</h3>
          <p className="insight-value">${thisMonthExpenses.toLocaleString()}</p>
          <p className={`insight-detail ${expenseChange > 0 ? 'negative' : 'positive'}`}>
            {expenseChange > 0 
              ? `↑ ${expenseChange}% more than last month`
              : `↓ ${Math.abs(expenseChange)}% less than last month`
            }
          </p>
        </div>

        {/* Average Daily Spending */}
        <div className="insight-card">
          <h3>📅 Average Daily Spending</h3>
          <p className="insight-value">${avgDailySpending.toFixed(2)}</p>
          <p className="insight-detail">per day this month</p>
        </div>

        {/* Savings Rate */}
        <div className="insight-card">
          <h3>💰 Savings Rate</h3>
          <p className={`insight-value ${savingsRate > 0 ? 'positive' : 'negative'}`}>
            {savingsRate}%
          </p>
          <p className="insight-detail">
            {savingsRate > 0 
              ? 'You are saving money!' 
              : 'Spending more than income'
            }
          </p>
        </div>

        {/* Most Frequent Expense Category */}
        <div className="insight-card">
          <h3>🔄 Most Frequent Expense</h3>
          {mostFrequentCategory ? (
            <>
              <p className="insight-value">{mostFrequentCategory}</p>
              <p className="insight-detail">
                {categoryCount[mostFrequentCategory]} transactions
              </p>
            </>
          ) : (
            <p className="insight-value">No data</p>
          )}
        </div>

        {/* Total Income vs Expenses */}
        <div className="insight-card">
          <h3>📈 Income vs Expenses</h3>
          <p className="insight-value">
            ${totals.totalIncome.toLocaleString()}
          </p>
          <p className="insight-detail">
            vs ${totals.totalExpenses.toLocaleString()} expenses
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="insights-summary">
        <h3>💡 Summary</h3>
        <ul>
          {highestCategory && (
            <li>
              Your highest spending category is <strong>{highestCategory}</strong> 
              (${highestSpending.toLocaleString()})
            </li>
          )}
          {expenseChange !== 0 && (
            <li>
              {expenseChange > 0 
                ? `Your expenses increased by ${expenseChange}% compared to last month.`
                : `Great job! Your expenses decreased by ${Math.abs(expenseChange)}% compared to last month.`
              }
            </li>
          )}
          {savingsRate > 0 && (
            <li>
              You're maintaining a {savingsRate}% savings rate. Keep it up!
            </li>
          )}
          {savingsRate <= 0 && (
            <li>
              Your expenses exceed your income. Consider reducing spending.
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Insights;