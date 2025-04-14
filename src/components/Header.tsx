import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const Header: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="speech-container">
      <div className="speech-bubble">Career Helpi</div>
      <Toaster/>
      <nav className="header-nav">
        <button onClick={() => navigate('/')} className="header-link">Home</button>
      </nav>
    </div>
  );
};

export default Header;
