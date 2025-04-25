import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>VerdictIQ</h3>
          <p>AI-Powered Legal Assistance Platform for case analysis, prediction, and ensuring fairness in AI-driven legal decisions.</p>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/features">Features</Link></li>
            <li><Link to="/upload">Upload Document</Link></li>
            <li><Link to="/precedents">Precedent Finder</Link></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Legal Resources</h3>
          <ul>
            <li><Link to="/resources/case-laws">Case Laws</Link></li>
            <li><Link to="/resources/statutes">Statutes</Link></li>
            <li><Link to="/resources/legal-ai">Legal AI Research</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Email: contact@verdictiq.com</p>
          <p>Phone: +91 123-456-7890</p>
          <div className="social-icons">
            <a href="#" aria-label="Twitter">Twitter</a>
            <a href="#" aria-label="LinkedIn">LinkedIn</a>
            <a href="#" aria-label="Facebook">Facebook</a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} VerdictIQ. All rights reserved.</p>
        <p><Link to="/privacy">Privacy Policy</Link> | <Link to="/terms">Terms of Service</Link></p>
      </div>
    </footer>
  );
};

export default Footer; 