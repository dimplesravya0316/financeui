import React from 'react';
import { useFinance } from '../context/FinanceContext.jsx';
import './Header.css';

const Header = () => {
  const { role, setRole, darkMode, setDarkMode } = useFinance();

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">Finance Dashboard</h1>
      </div>
      <div className="header-right">
        <div className="role-switcher">
          <label htmlFor="role-select">Role:</label>
          <select
            id="role-select"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button
          className="dark-mode-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </header>
  );
};

export default Header;