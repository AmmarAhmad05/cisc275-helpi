import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/shared.css';

const QuestionButtons: React.FC = () => {
  const navigate = useNavigate();

  return (
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
      <h2 style={{ fontSize: '1.45rem', fontWeight: 600, color: '#222', marginBottom: 6, textAlign: 'center', letterSpacing: '-0.5px' }}>
        Start Your Assessment
      </h2>
      <p style={{ color: '#888', fontSize: '1.05rem', marginBottom: 24, textAlign: 'center', fontWeight: 400, lineHeight: 1.6 }}>
        Choose a quick or detailed assessment to get personalized career insights.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, width: '100%' }}>
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

export default QuestionButtons;
