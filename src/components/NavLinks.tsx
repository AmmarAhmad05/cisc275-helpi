import React from 'react';
import { Link } from 'react-router-dom';

const NavLinks: React.FC = () => {
  return (
    <div className="nav-container">
      <div className="nav-links">
        <Link to="/help">Help</Link> |{" "}
        <Link to="/about">About</Link> |{" "}
        <Link to="/setting">Settings</Link> |{" "}
        <Link to="/contact">Contact</Link>
      </div>
    </div>
  );
};

export default NavLinks;
