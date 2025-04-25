import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
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
      if (!formData.email || !formData.password) {
        throw new Error('All fields are required');
      }

      // Email format validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        throw new Error('Please enter a valid email address');
      }

      // Simulate API call with delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real app, we would call an API endpoint here
      // For demo purposes, we'll just log the user in
      console.log('Logging in with:', formData.email);
      
      // Redirect to dashboard or home page
      navigate('/upload');
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="auth-page login-page">
        <div className="auth-container">
          <div className="auth-form-container">
            <h1>Login to VerdictIQ</h1>
            <p>Access your account to use AI-powered legal analytics</p>

            {error && (
              <div className="auth-error">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="auth-form">
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
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="form-options">
                <div className="remember-me">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                  />
                  <label htmlFor="rememberMe">Remember me</label>
                </div>
                <Link to="/forgot-password" className="forgot-password">
                  Forgot Password?
                </Link>
              </div>

              <button
                type="submit"
                className="auth-button"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </form>

            <div className="auth-separator">
              <span>OR</span>
            </div>

            <div className="social-login">
              <button className="social-button google">
                Login with Google
              </button>
              <button className="social-button linkedin">
                Login with LinkedIn
              </button>
            </div>

            <div className="auth-redirect">
              <p>
                Don't have an account? <Link to="/register">Sign up</Link>
              </p>
            </div>
          </div>

          <div className="auth-info">
            <div className="auth-info-content">
              <h2>Benefits of VerdictIQ</h2>
              <ul>
                <li>Analyze legal documents with AI</li>
                <li>Predict case outcomes with high accuracy</li>
                <li>Find relevant legal precedents</li>
                <li>Access multilingual document support</li>
                <li>Ensure fair and unbiased legal analysis</li>
              </ul>
              <div className="auth-testimonial">
                <p>"VerdictIQ transformed how I prepare for cases. The insights are invaluable."</p>
                <div className="testimonial-author">
                  <span>- Advocate Priya Sharma, Supreme Court</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login; 