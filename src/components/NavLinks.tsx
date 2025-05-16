import React from 'react';
// Import Link component for client-side navigation without full page reloads
import { Link } from 'react-router-dom';

// Define NavLinks as a functional component
const NavLinks: React.FC = () => {
  return (
    <div className="nav-container"> {/* Container for navigation links */}
      <div className="nav-links"> {/* Inner container for styling and grouping links */}
        {/* Each Link component navigates to a different route within the app */}
        <Link to="/help">Help</Link> |{" "}
        <Link to="/about">About</Link> |{" "}
        <Link to="/contact">Contact</Link>
      </div>
    </div>
  );
};

export default NavLinks; // Export NavLinks component for use in other parts of the app
