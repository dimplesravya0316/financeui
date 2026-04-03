# Finance Dashboard

A simple finance tracking dashboard built with React. This is a student project for learning React fundamentals.

**Live Demo:** [https://financeui-phi.vercel.app](https://financeui-phi.vercel.app)

## Features

* **Dashboard Overview:** View total balance, income, and expenses with visual charts.
* **Transactions:** Add, search, filter, and sort financial transactions.
* **Role-based Access:** Switch between Viewer (read-only) and Admin (can add transactions).
* **Insights:** View financial analytics and trends.
* **Dark Mode:** Toggle between light and dark themes.
* **Local Storage:** Data persists between sessions.

## Project Structure

```text
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
How It Works
1. State Management (Context API)
The app uses React's Context API to manage global state:

Transactions: All financial data stored here.

Filters: Search term, type filter, category filter.

Role: Current user role (viewer or admin).

Theme: Dark mode toggle state.

The FinanceProvider component wraps the entire app and provides these values to all child components.

2. Components Overview
Header: Displays app title, Role dropdown (Viewer/Admin), and Dark mode toggle button.

Dashboard: Three summary cards showing Balance, Income, Expenses. Includes a monthly trend bar chart (SVG-based) and category spending pie chart (SVG-based).

Transactions: Table displaying all transactions. Features include search by category, filter by type (income/expense), filter by category, and sort by date, amount, or category. Admins can add and delete new transactions.

Insights: Shows financial analytics including highest spending category, month-over-month comparison, average daily spending, and savings rate calculation.

3. Data Flow
App loads → FinanceProvider initializes with data from localStorage or mock data.

User interactions trigger state updates in context.

Components re-render with new data.

Changes are automatically saved to localStorage.

How to Run
Install dependencies:

Bash
npm install
Start the development server:

Bash
npm start
Open http://localhost:3000 in your browser.

Technologies Used
React 18 (Functional components + Hooks)

CSS (Plain CSS, no frameworks)

Context API for state management

SVG for custom charts (no external chart library needed)

Notes
This is a student-built project designed to practice React fundamentals.

Data is stored locally in the browser's localStorage.

There is no backend—all data is mock/static.

Charts are built with raw SVG for a beginner-friendly, dependency-free approach.
