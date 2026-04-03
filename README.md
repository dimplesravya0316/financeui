# Finance Dashboard

A simple finance tracking dashboard built with React. This is a student project for learning React fundamentals.

## Features

- **Dashboard Overview**: View total balance, income, and expenses with visual charts
- **Transactions**: Add, search, filter, and sort financial transactions
- **Role-based Access**: Switch between Viewer (read-only) and Admin (can add transactions)
- **Insights**: View financial analytics and trends
- **Dark Mode**: Toggle between light and dark themes
- **Local Storage**: Data persists between sessions

## Project Structure

```
finance-dashboard/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Header.js        # Top navigation with role switcher
│   │   ├── Header.css
│   │   ├── Dashboard.js     # Summary cards and charts
│   │   ├── Dashboard.css
│   │   ├── Transactions.js  # Transaction table with filters
│   │   ├── Transactions.css
│   │   ├── Insights.js      # Financial analytics
│   │   └── Insights.css
│   ├── context/
│   │   └── FinanceContext.js  # Global state management
│   ├── data/
│   │   └── mockData.js      # Sample transaction data
│   ├── App.js               # Main application component
│   ├── App.css              # Global styles
│   └── index.js             # Application entry point
├── package.json
└── README.md
```

## How It Works

### 1. State Management (Context API)
The app uses React's Context API to manage global state:
- **Transactions**: All financial data stored here
- **Filters**: Search term, type filter, category filter
- **Role**: Current user role (viewer or admin)
- **Theme**: Dark mode toggle state

The `FinanceProvider` component wraps the entire app and provides these values to all child components.

### 2. Components Overview

**Header**
- Displays app title
- Role dropdown (Viewer/Admin)
- Dark mode toggle button

**Dashboard**
- Three summary cards showing Balance, Income, Expenses
- Monthly trend bar chart (SVG-based)
- Category spending pie chart (SVG-based)

**Transactions**
- Table displaying all transactions
- Search by category
- Filter by type (income/expense)
- Filter by category
- Sort by date, amount, or category
- Admin can add new transactions
- Admin can delete transactions

**Insights**
- Shows financial analytics
- Highest spending category
- Month-over-month comparison
- Average daily spending
- Savings rate calculation

### 3. Data Flow

1. App loads → FinanceProvider initializes with data from localStorage or mock data
2. User interactions trigger state updates in context
3. Components re-render with new data
4. Changes are saved to localStorage

## How to Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Open http://localhost:3000 in your browser

## Technologies Used

- React 18 (Functional components + Hooks)
- CSS (Plain CSS, no frameworks)
- Context API for state management
- SVG for custom charts (no external chart library needed)

## Notes

- This is a student-built project - keep expectations reasonable
- Data is stored in browser's localStorage
- No backend - all data is mock/static
- Charts are built with raw SVG (beginner-friendly approach)