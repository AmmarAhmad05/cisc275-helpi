// src/pages/Settings.tsx
import React, { useState } from 'react';
import Header from '../components/Header';
import '../styles/shared.css';

const Settings: React.FC = () => {
  const [settings, setSettings] = useState({
    darkMode: false,
    notifications: true,
    saveHistory: true,
    apiKey: localStorage.getItem('MYKEY') || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save API key to localStorage
    if (settings.apiKey) {
      localStorage.setItem('MYKEY', settings.apiKey);
    }
    // Apply other settings
    if (settings.darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  };

  return (
    <div className="career-helpi-app">
      <Header />
      <div className="page-container">
        <h2>Settings</h2>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="darkMode"
                  checked={settings.darkMode}
                  onChange={handleChange}
                />
                Dark Mode
              </label>
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="notifications"
                  checked={settings.notifications}
                  onChange={handleChange}
                />
                Enable Notifications
              </label>
            </div>

            <div className="form-group">
              <label>
                <input
                  type="checkbox"
                  name="saveHistory"
                  checked={settings.saveHistory}
                  onChange={handleChange}
                />
                Save Assessment History
              </label>
            </div>

            <div className="form-group">
              <label htmlFor="apiKey">OpenAI API Key</label>
              <input
                type="password"
                id="apiKey"
                name="apiKey"
                value={settings.apiKey}
                onChange={handleChange}
                placeholder="Enter your OpenAI API key"
              />
            </div>

            <button type="submit" className="button button-primary">
              Save Settings
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
