import React from 'react';
import { FinanceProvider, useFinance } from './context/FinanceContext.jsx';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import Transactions from './components/Transactions';
import Insights from './components/Insights';
import './App.css';

// Main App component that uses the context
const AppContent = () => {
  const { darkMode } = useFinance();

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <Header />
      <main className="main-content">
        <Dashboard />
        <Transactions />
        <Insights />
      </main>
      <footer className="footer">
        <p>Finance Dashboard - Built with React</p>
      </footer>
    </div>
  );
};

// App component with Provider
function App() {
  return (
    <FinanceProvider>
      <AppContent />
    </FinanceProvider>
  );
}

export default App;