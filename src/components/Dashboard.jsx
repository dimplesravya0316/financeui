import React from 'react';
import { useFinance } from '../context/FinanceContext.jsx';
import { categoryColors } from '../data/mockData.jsx';
import './Dashboard.css';

const Dashboard = () => {
  const { getTotals, getCategorySpending, getMonthlyData } = useFinance();

  const totals = getTotals();
  const categorySpending = getCategorySpending();
  const monthlyData = getMonthlyData();

  // Prepare data for category chart
  const categories = Object.keys(categorySpending);
  const categoryValues = Object.values(categorySpending);
  const categoryChartData = {
    labels: categories,
    datasets: [{
      data: categoryValues,
      backgroundColor: categories.map(cat => categoryColors[cat] || '#999'),
      borderWidth: 0,
    }],
  };

  // Prepare data for monthly chart
  const months = Object.keys(monthlyData).sort();
  const incomeData = months.map(m => monthlyData[m].income);
  const expenseData = months.map(m => monthlyData[m].expense);

  // Find highest spending category
  const highestCategory = categories.length > 0
    ? categories.reduce((a, b) => categorySpending[a] > categorySpending[b] ? a : b)
    : 'N/A';

  const highestSpending = categories.length > 0
    ? categorySpending[highestCategory]
    : 0;

  // Calculate chart dimensions
  const chartWidth = 300;
  const chartHeight = 200;
  const centerX = chartWidth / 2;
  const centerY = chartHeight / 2;
  const radius = Math.min(centerX, centerY) - 20;

  // Calculate pie slices
  const totalSpending = categoryValues.reduce((a, b) => a + b, 0);
  let currentAngle = -90;

  const renderPieChart = () => {
    if (totalSpending === 0) return <text x="50%" y="50%" textAnchor="middle" fill="#666">No data</text>;

    let slices = [];
    let angle = -90;

    categoryValues.forEach((value, index) => {
      const sliceAngle = (value / totalSpending) * 360;
      const startAngle = angle;
      const endAngle = angle + sliceAngle;
      
      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;
      
      const x1 = centerX + radius * Math.cos(startRad);
      const y1 = centerY + radius * Math.sin(startRad);
      const x2 = centerX + radius * Math.cos(endRad);
      const y2 = centerY + radius * Math.sin(endRad);
      
      const largeArc = sliceAngle > 180 ? 1 : 0;
      
      const pathD = `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
      
      slices.push(
        <path
          key={index}
          d={pathD}
          fill={categories[index] ? categoryColors[categories[index]] : '#999'}
          stroke="#fff"
          strokeWidth="2"
        />
      );
      
      angle += sliceAngle;
    });

    return slices;
  };

  // Simple bar chart for monthly trend
  const maxValue = Math.max(...incomeData, ...expenseData, 1);
  const barWidth = 40;
  const chartAreaWidth = months.length * barWidth * 2 + 40;

  const renderBarChart = () => {
    if (months.length === 0) return <text x="50%" y="50%" textAnchor="middle" fill="#666">No data</text>;

    return months.map((month, index) => {
      const incomeHeight = (incomeData[index] / maxValue) * 150;
      const expenseHeight = (expenseData[index] / maxValue) * 150;
      const x = 30 + index * (barWidth * 2 + 10);

      return (
        <g key={month}>
          <rect
            x={x}
            y={180 - incomeHeight}
            width={barWidth}
            height={incomeHeight}
            fill="#4CAF50"
          />
          <rect
            x={x + barWidth + 5}
            y={180 - expenseHeight}
            width={barWidth}
            height={expenseHeight}
            fill="#FF6384"
          />
          <text x={x + barWidth / 2} y="195" fontSize="10" textAnchor="middle" fill="#666">
            {month.substring(5)}
          </text>
        </g>
      );
    });
  };

  return (
    <div className="dashboard">
      <h2 className="dashboard-title">Dashboard Overview</h2>
      
      {/* Summary Cards */}
      <div className="summary-cards">
        <div className="card balance-card">
          <h3>Total Balance</h3>
          <p className="amount">${totals.totalBalance.toLocaleString()}</p>
        </div>
        <div className="card income-card">
          <h3>Total Income</h3>
          <p className="amount">${totals.totalIncome.toLocaleString()}</p>
        </div>
        <div className="card expense-card">
          <h3>Total Expenses</h3>
          <p className="amount">${totals.totalExpenses.toLocaleString()}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="charts-container">
        {/* Monthly Trend Chart */}
        <div className="chart-box">
          <h3>Monthly Trend</h3>
          <div className="chart-legend">
            <span className="legend-item income">● Income</span>
            <span className="legend-item expense">● Expenses</span>
          </div>
          <svg width={chartAreaWidth} height="220" className="bar-chart">
            {renderBarChart()}
          </svg>
        </div>

        {/* Category Spending Chart */}
        <div className="chart-box">
          <h3>Spending by Category</h3>
          <div className="pie-container">
            <svg width={chartWidth} height={chartHeight} className="pie-chart">
              {renderPieChart()}
            </svg>
          </div>
          <div className="category-legend">
            {categories.map((cat) => (
              <div key={cat} className="legend-item">
                <span 
                  className="color-dot" 
                  style={{ backgroundColor: categoryColors[cat] }}
                />
                <span>{cat}: ${categorySpending[cat]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;