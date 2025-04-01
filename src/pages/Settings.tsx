import React from 'react';
import Header from '../components/Header';

const Settings: React.FC = () => {
  return (
    <div className="page">
      <Header />
      <h2>Settings</h2>
      <p>Manage preferences, API keys, or interface customization here.</p>
    </div>
  );
};

export default Settings;
