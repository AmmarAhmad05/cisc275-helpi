import React from 'react';
// Import useNavigate for programmatic navigation between routes
import { useNavigate } from 'react-router-dom';
// Import Toaster component to display toast notifications
import { Toaster } from 'react-hot-toast';

// Define the Header component
const Header: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigation function

  return (
    <div className="speech-container"> {/* Container for header with custom styling */}
      <div className="speech-bubble">Career Helpi</div> {/* Stylized title or logo area */}
      
      {/* Renders a container for toast notifications (e.g., success messages, alerts) */}
      <Toaster/>

      <nav className="header-nav"> {/* Navigation section */}
        {/* Button navigates to the homepage when clicked */}
        <button onClick={() => navigate('/')} className="header-link">Home</button>
      </nav>
    </div>
  );
};

export default Header; // Export Header component for use in the app
