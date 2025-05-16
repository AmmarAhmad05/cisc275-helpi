import React from 'react';
// Hook to navigate between pages programmatically
import { useNavigate } from 'react-router-dom';
// Import shared styles (assumed to include button/card classes)
import '../styles/shared.css';

// Define the QuestionButtons component
const QuestionButtons: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigation function

  return (
    // Outer card container with inline styles for layout and design
    <div
      className="card"
      style={{
        width: '100%',
        maxWidth: 420,
        margin: '0 auto',
        background: '#fff',
        border: '1px solid #e5e7eb',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        borderRadius: 18,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 24,
        padding: '40px 32px',
      }}
    >
      {/* Title for the assessment section */}
      <h2
        style={{
          fontSize: '1.45rem',
          fontWeight: 600,
          color: '#222',
          marginBottom: 6,
          textAlign: 'center',
          letterSpacing: '-0.5px',
        }}
      >
        Start Your Assessment
      </h2>

      {/* Subtext providing more context to the user */}
      <p
        style={{
          color: '#888',
          fontSize: '1.05rem',
          marginBottom: 24,
          textAlign: 'center',
          fontWeight: 400,
          lineHeight: 1.6,
        }}
      >
        Choose a quick or detailed assessment to get personalized career insights.
      </p>

      {/* Button container for layout */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 18,
          width: '100%',
        }}
      >
        {/* Button that navigates to the basic questions form */}
        <button
          onClick={() => navigate('/basic')}
          className="button"
          style={{
            width: '100%',
            fontSize: '1.08rem',
            padding: '15px 0',
            borderRadius: 12,
            fontWeight: 500,
            background: '#f7f7f7',
            color: '#222',
            border: '1px solid #e5e7eb',
            boxShadow: 'none',
            transition: 'background 0.18s, border 0.18s',
          }}
          onMouseOver={e => (e.currentTarget.style.background = '#f1f1f1')}
          onMouseOut={e => (e.currentTarget.style.background = '#f7f7f7')}
        >
          Basic Questions
        </button>

        {/* Button that navigates to the detailed questions form */}
        <button
          onClick={() => navigate('/detailed')}
          className="button"
          style={{
            width: '100%',
            fontSize: '1.08rem',
            padding: '15px 0',
            borderRadius: 12,
            fontWeight: 500,
            background: '#f7f7f7',
            color: '#222',
            border: '1px solid #e5e7eb',
            boxShadow: 'none',
            transition: 'background 0.18s, border 0.18s',
          }}
          onMouseOver={e => (e.currentTarget.style.background = '#f1f1f1')}
          onMouseOut={e => (e.currentTarget.style.background = '#f7f7f7')}
        >
          Detailed Questions
        </button>
      </div>
    </div>
  );
};

export default QuestionButtons; // Export the component for use in other files
