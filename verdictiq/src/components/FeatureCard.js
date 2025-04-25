import React from 'react';
import { Link } from 'react-router-dom';

const FeatureCard = ({ title, description, link, linkText, icon }) => {
  return (
    <div className="feature-card">
      {icon && <div className="feature-icon">{icon}</div>}
      <h3>{title}</h3>
      <p>{description}</p>
      {link && (
        <Link to={link} className="feature-link">
          {linkText || 'Learn More'}
        </Link>
      )}
    </div>
  );
};

export default FeatureCard; 