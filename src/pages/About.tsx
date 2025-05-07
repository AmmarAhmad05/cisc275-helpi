import React from 'react';
import Header from '../components/Header';
import '../styles/shared.css';

const About: React.FC = () => {
  return (
    <div className="career-helpi-app">
      <Header />
      <div className="page-container">
        <h2>About Career Helpi</h2>
        <div className="card">
          <h3>Our Mission</h3>
          <p>Career Helpi is dedicated to helping individuals find their ideal career path through personalized assessments and AI-powered insights. We believe that everyone deserves to find a career that aligns with their skills, interests, and values.</p>
        </div>
        
        <div className="card">
          <h3>How It Works</h3>
          <p>Our platform uses advanced AI technology to analyze your responses to our comprehensive assessments. We consider your personality traits, skills, work preferences, and experience to provide tailored career suggestions that match your unique profile.</p>
        </div>
        
        <div className="card">
          <h3>Our Approach</h3>
          <p>We combine traditional career assessment methods with cutting-edge AI to provide you with the most accurate and personalized career guidance. Our detailed analysis helps you understand your strengths and potential career paths that would be a great fit for you.</p>
        </div>
      </div>
    </div>
  );
};

export default About;
