import React from 'react';
import Header from '../components/Header';
import '../styles/shared.css';

const Help: React.FC = () => {
  return (
    <div className="career-helpi-app">
      <Header />
      <div className="page-container">
        <h2>Help & Support</h2>
        
        <div className="card">
          <h3>Getting Started</h3>
          <p>To begin your career assessment journey, follow these simple steps:</p>
          <ol>
            <li>Choose between Basic or Detailed assessment</li>
            <li>Answer all questions honestly</li>
            <li>Review your personalized career suggestions</li>
            <li>Explore the recommended career paths</li>
          </ol>
        </div>

        <div className="card">
          <h3>Assessment Types</h3>
          <p><strong>Basic Assessment:</strong> A quick 10-question assessment that provides general career direction based on your interests and preferences.</p>
          <p><strong>Detailed Assessment:</strong> A comprehensive evaluation that considers your personality traits, skills, work preferences, and experience for more tailored career suggestions.</p>
        </div>

        <div className="card">
          <h3>Frequently Asked Questions</h3>
          <div className="faq-item">
            <h4>How accurate are the career suggestions?</h4>
            <p>Our suggestions are based on your responses and analyzed using advanced AI technology. The more detailed and honest your responses, the more accurate the suggestions will be.</p>
          </div>
          <div className="faq-item">
            <h4>Can I retake the assessment?</h4>
            <p>Yes, you can retake either assessment at any time. Your previous results will be saved for comparison.</p>
          </div>
          <div className="faq-item">
            <h4>How do I interpret my results?</h4>
            <p>Your results will show career paths that match your profile, along with detailed explanations of why these careers might be a good fit for you.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
