import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'lawyer',
    agreeTerms: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validate inputs
      if (!formData.fullName || !formData.email || !formData.password || !formData.confirmPassword) {
        throw new Error('All fields are required');
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Password length validation
      if (formData.password.length < 8) {
        throw new Error('Password must be at least 8 characters long');
      }

      // Password match validation
      if (formData.password !== formData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Terms agreement validation
      if (!formData.agreeTerms) {
        throw new Error('You must agree to the terms and conditions');
      }

      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real app, we would call an API endpoint here
      // For demo purposes, we'll just log the registration
      console.log('Registering user:', formData.email, 'as', formData.userType);
      
      // Redirect to login page or dashboard
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="auth-page register-page">
        <div className="auth-container">
          <div className="auth-form-container">
            <h1>Create an Account</h1>
            <p>Join VerdictIQ to harness the power of AI for legal analysis</p>

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password (min. 8 characters)"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm your password"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="userType">I am a:</label>
                <select
                  id="userType"
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                  required
                >
                  <option value="lawyer">Lawyer</option>
                  <option value="judge">Judge</option>
                  <option value="researcher">Legal Researcher</option>
                  <option value="student">Law Student</option>
                  <option value="public">General Public</option>
                </select>
              </div>

              <div className="form-group checkbox-group">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  required
                />
                <label htmlFor="agreeTerms">
                  I agree to the <Link to="/terms">Terms of Service</Link> and <Link to="/privacy">Privacy Policy</Link>
                </label>
              </div>

              <button
                type="submit"
                className="auth-button"
                disabled={loading}
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <div className="auth-separator">
              <span>OR</span>
            </div>

            <div className="social-login">
              <button className="social-button google">
                Sign up with Google
              </button>
              <button className="social-button linkedin">
                Sign up with LinkedIn
              </button>
            </div>

            <div className="auth-redirect">
              <p>
                Already have an account? <Link to="/login">Login</Link>
              </p>
            </div>
          </div>

          <div className="auth-info">
            <div className="auth-info-content">
              <h2>Why Join VerdictIQ?</h2>
              <ul>
                <li>Get AI-powered legal case predictions</li>
                <li>Access document analysis and summarization</li>
                <li>Find relevant legal precedents</li>
                <li>Save time on case research</li>
                <li>Make data-driven legal decisions</li>
              </ul>
              <div className="auth-testimonial">
                <p>"VerdictIQ has revolutionized how our firm handles case analysis and prediction."</p>
                <div className="testimonial-author">
                  <span>- Adv. Rajesh Mehta, Sr. Partner</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register; 