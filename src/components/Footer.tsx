import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="footer">
      <button onClick={() => navigate('/results')}>Go to Results</button>
    </div>
  );
};

export default Footer;
