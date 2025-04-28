import React, { useState } from 'react';
import Layout from '../components/Layout';
import { predictOutcome } from '../services/predictionService';
import '../styles/PredictionPage.css';

const PredictionPage = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [formData, setFormData] = useState({
    caseType: '',
    jurisdiction: '',
    caseYear: '',
    additionalFacts: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setIsAnalyzing(true);
      setResult(null);
      
      // Combine all form data into a text description
      const caseDescription = `Case Type: ${formData.caseType}\nJurisdiction: ${formData.jurisdiction}\nYear: ${formData.caseYear}\nFacts: ${formData.additionalFacts}`;
      
      const predictionResult = await predictOutcome(caseDescription);
      setResult(predictionResult);
    } catch (err) {
      setError('Error analyzing case data. Please try again.');
      console.error('Prediction error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Layout>
      <div className="prediction-page">
        <div className="page-header">
          <h1>CASE OUTCOME PREDICTION</h1>
          <p>Get AI-powered predictions on legal case outcomes</p>
        </div>

        <div className="input-container">
          <div className="case-details-form">
            <h2>Case Details</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="caseType">Case Type</label>
                <select 
                  id="caseType" 
                  name="caseType" 
                  value={formData.caseType}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Case Type</option>
                  <option value="civil">Civil Dispute</option>
                  <option value="criminal">Criminal Case</option>
                  <option value="family">Family Law</option>
                  <option value="property">Property Dispute</option>
                  <option value="corporate">Corporate/Commercial</option>
                  <option value="constitutional">Constitutional Law</option>
                  <option value="labor">Labor Law</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="jurisdiction">Jurisdiction</label>
                <select 
                  id="jurisdiction" 
                  name="jurisdiction" 
                  value={formData.jurisdiction}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Jurisdiction</option>
                  <option value="supreme">Supreme Court</option>
                  <option value="high">High Court</option>
                  <option value="district">District Court</option>
                  <option value="tribunal">Special Tribunal</option>
                </select>
              </div>
              
              <div className="form-group">
                <label htmlFor="caseYear">Case Year</label>
                <input 
                  type="number" 
                  id="caseYear" 
                  name="caseYear" 
                  placeholder="e.g. 2024"
                  min="1950" 
                  max={new Date().getFullYear()}
                  value={formData.caseYear}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="additionalFacts">Key Case Facts</label>
                <textarea 
                  id="additionalFacts" 
                  name="additionalFacts" 
                  rows="4"
                  placeholder="Enter the key facts and details about the case"
                  value={formData.additionalFacts}
                  onChange={handleInputChange}
                  required
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="primary-btn"
                disabled={isAnalyzing}
              >
                {isAnalyzing ? 'Analyzing...' : 'Generate Prediction'}
              </button>
            </form>
          </div>
        </div>

        {isAnalyzing && (
          <div className="analyzing-container">
            <div className="spinner"></div>
            <h2>Analyzing Your Case</h2>
            <p>Our AI is reviewing your case details and generating predictions</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <h2>Analysis Error</h2>
            <p className="error-message">{error}</p>
            <button className="primary-btn" onClick={() => setError('')}>Try Again</button>
          </div>
        )}

        {result && (
          <div className="prediction-results">
            <div className="results-header">
              <h2>PREDICTED OUTCOME</h2>
              <button 
                className="reset-btn" 
                onClick={() => {
                  setResult(null);
                  setFormData({
                    caseType: '',
                    jurisdiction: '',
                    caseYear: '',
                    additionalFacts: ''
                  });
                }}
              >
                New Prediction
              </button>
            </div>

            <div className="results-grid">
              <div className="outcome-prediction card">
                <h3>Predicted Winner</h3>
                <div className="prediction-details">
                  <p className="prediction">{result.prediction}</p>
                  <p className="confidence">Confidence: {(result.confidence * 100).toFixed(1)}%</p>
                </div>
              </div>
            </div>

            <div className="disclaimer">
              <h4>AI Prediction Disclaimer</h4>
              <p>
                This prediction is based on AI analysis of historical data and should be used as a reference only.
                The actual outcome of legal proceedings depends on various factors including case specifics, 
                court discretion, and evolving legal interpretations. Always consult with a qualified legal professional.
              </p>
            </div>
          </div>
        )}

        {!isAnalyzing && !result && !error && (
          <div className="explainer-section">
            <h2>How Our Case Prediction Works</h2>
            <div className="explainer-grid">
              <div className="explainer-item">
                <div className="explainer-icon">🔍</div>
                <h3>Data Analysis</h3>
                <p>Our AI analyzes thousands of similar cases from Indian courts to identify patterns and factors that influenced outcomes.</p>
              </div>
              <div className="explainer-item">
                <div className="explainer-icon">⚖️</div>
                <h3>Precedent Matching</h3>
                <p>The system identifies relevant legal precedents that match your case characteristics and jurisdictional tendencies.</p>
              </div>
              <div className="explainer-item">
                <div className="explainer-icon">📊</div>
                <h3>Probability Calculation</h3>
                <p>Advanced statistical models calculate outcome probabilities based on multiple factors and historical case data.</p>
              </div>
              <div className="explainer-item">
                <div className="explainer-icon">🧠</div>
                <h3>Strategic Insights</h3>
                <p>Beyond predictions, our AI provides actionable insights to help strengthen your legal approach.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default PredictionPage; 