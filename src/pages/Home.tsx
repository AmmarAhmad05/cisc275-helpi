import React, { useState } from 'react'; // Import React and useState hook
import Header from '../components/Header'; // Page header
import NavLinks from '../components/NavLinks'; // Navigation links
import QuestionButtons from '../components/QuestionButtons'; // Assessment choice buttons
import Footer from '../components/Footer'; // Page footer
import '../styles/shared.css'; // Shared styles

// Load stored API key from local storage if it exists
let keyData = '';
const saveKeyData = 'MYKEY';
const prevKey = localStorage.getItem(saveKeyData);

if (prevKey !== null) {
  keyData = JSON.parse(prevKey); // Retrieve and parse key from storage
}

const Home: React.FC = () => {
  const [key, setKey] = useState<string>(keyData); // Store API key in state

  // Save key to local storage and reload page
  const handleSubmit = () => {
    localStorage.setItem(saveKeyData, JSON.stringify(key));
    window.location.reload();
  };

  // Handle input change for API key
  const changeKey = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKey(event.target.value);
  };

  return (
    <div
      className="career-helpi-app"
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(120deg, #e0e7ff 0%, #f5f7fa 60%, #c2e9fb 100%)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header /> {/* App header */}
      
      <div
        style={{
          maxWidth: 1300,
          margin: '0 auto',
          padding: '48px 24px 0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 48,
          flexWrap: 'wrap',
        }}
      >
        {/* Hero Section */}
        <section
          style={{
            flex: 1,
            minWidth: 320,
            maxWidth: 540,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            zIndex: 2,
          }}
        >
          <div style={{ marginBottom: 32 }}>
            <span
              style={{
                display: 'inline-block',
                background: 'linear-gradient(90deg, #6366f1 0%, #38bdf8 100%)',
                color: '#fff',
                fontWeight: 700,
                fontSize: 18,
                borderRadius: 16,
                padding: '6px 18px',
                marginBottom: 18,
                letterSpacing: 1,
                boxShadow: '0 2px 8px rgba(99,102,241,0.08)',
              }}
            >
              AI-Powered Career Discovery
            </span>
            <h1
              style={{
                fontSize: '2.8rem',
                fontWeight: 800,
                margin: '18px 0 12px 0',
                color: '#1e293b',
                lineHeight: 1.1,
                letterSpacing: '-1px',
              }}
            >
              Unlock Your <span style={{ color: '#6366f1' }}>Potential</span>.<br /> Find Your <span style={{ color: '#38bdf8' }}>Dream Career</span>.
            </h1>
            <p
              style={{
                color: '#334155',
                fontSize: '1.25rem',
                marginBottom: 32,
                maxWidth: 420,
                lineHeight: 1.5,
              }}
            >
              Take a personalized assessment and get expert AI guidance to discover the best career path for you.
            </p>
          </div>

          {/* Hero Illustration */}
          <div style={{ width: 120, height: 120, marginTop: 12, marginBottom: 12 }}>
            <svg width="100%" height="100%" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="60" cy="60" r="60" fill="#6366f1" fillOpacity="0.12" />
              <path d="M60 30L70 60H50L60 30Z" fill="#6366f1" />
              <circle cx="60" cy="80" r="10" fill="#38bdf8" />
            </svg>
          </div>
        </section>

        {/* Main Card with buttons and API key form */}
        <div
          className="card"
          style={{
            minWidth: 340,
            maxWidth: 600,
            width: '100%',
            margin: '0 auto',
            background: 'rgba(255,255,255,0.85)',
            boxShadow: '0 8px 32px rgba(99,102,241,0.10)',
            backdropFilter: 'blur(8px)',
            border: '1.5px solid #e0e7ff',
            borderRadius: 24,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 32,
            animation: 'fadeInUp 1s cubic-bezier(.23,1.01,.32,1) 0.1s both',
          }}
        >
          <QuestionButtons /> {/* Component with Basic/Detailed buttons */}

          {/* API Key Input Form */}
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSubmit();
            }}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 8, flexWrap: 'wrap' }}
          >
            <label htmlFor="api-key" style={{ fontWeight: 500, color: '#2c3e50' }}>API Key:</label>
            <input
              id="api-key"
              type="password"
              placeholder="Insert API Key Here"
              value={key}
              onChange={changeKey}
              className="form-input"
              style={{ minWidth: 180 }}
            />
            <button type="submit" className="button button-primary">
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Navigation and Footer */}
      <div style={{ marginTop: 8 }}>
        <NavLinks />
        <Footer />
      </div>

      {/* Animation style */}
      <style>{`
        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default Home; // Export the Home component
