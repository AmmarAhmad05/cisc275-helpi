// src/pages/Settings.tsx
import React from 'react';
import { useTheme } from '../context/ThemeContext';
import Header from '../components/Header';

const Settings = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="page">
      <Header />
      <h1>Settings</h1>

      <div className="theme-toggle">
        <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
        <label className="switch">
          <input type="checkbox" checked={theme === 'dark'} onChange={toggleTheme} />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
};

export default Settings;
