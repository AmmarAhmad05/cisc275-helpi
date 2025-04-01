import React from 'react';
import Header from '../components/Header';

const Basic: React.FC = () => {
  return (    
    <div className="page">
      <Header />
      <h2>Basic Questions</h2>
      <p>Answer a few questions to receive quick career suggestions.</p>
    </div>
  );
};

export default Basic;
