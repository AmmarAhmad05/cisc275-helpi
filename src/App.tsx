import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

import Home from './pages/Home';
import Results from './pages/Results';
import Help from './pages/Help';
import About from './pages/About';
import Settings from './pages/Settings';
import Contact from './pages/Contact';
import Basic from './pages/Basic';
import Detailed from './pages/Detailed';

import { ThemeProvider } from './context/ThemeContext'; // 🔹 import your provider

const App: React.FC = () => {
  return (
    <ThemeProvider> {/* 🔹 wrap the whole app */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/results" element={<Results />} />
          <Route path="/help" element={<Help />} />
          <Route path="/about" element={<About />} />
          <Route path="/setting" element={<Settings />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/basic" element={<Basic />} />
          <Route path="/detailed" element={<Detailed />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
