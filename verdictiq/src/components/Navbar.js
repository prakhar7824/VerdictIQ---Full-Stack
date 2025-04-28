import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header>
      <div className="navbar">
        <div className="navbar-header">
          <h1>VerdictIQ</h1>
          <p>Your AI-Powered Legal Assistance Platform</p>
        </div>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/features">Features</Link>
          <Link to="/upload">Upload</Link>
          <Link to="/precedents">Precedents</Link>
          <Link to="/#contact">Contact</Link>
          <Link to="/#about">About Us</Link>
        </nav>
        <div className="auth-buttons">
          <Link to="/login" className="login-btn">Login</Link>
          <Link to="/signup" className="signup-btn">Sign Up</Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar; 