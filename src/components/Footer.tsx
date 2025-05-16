import React from 'react';
// Import useNavigate hook to enable programmatic route navigation
import { useNavigate } from 'react-router-dom';

// Define a functional React component named Footer
const Footer: React.FC = () => {
  // Initialize the navigate function to change routes
  const navigate = useNavigate();

  return (
    <div className="footer"> {/* Footer container with a CSS class for styling */}
      {/* Button that navigates to the '/results' page when clicked */}
      <button onClick={() => navigate('/results')}>Go to Results</button>
    </div>
  );
};

// Export the Footer component so it can be used in other files
export default Footer;
