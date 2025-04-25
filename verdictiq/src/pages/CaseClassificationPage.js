import React, { useState } from 'react';
import { classifyCase } from '../services/classificationService';
import '../styles/CaseClassificationPage.css';

const CaseClassificationPage = () => {
  const [caseDetails, setCaseDetails] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [classificationResults, setClassificationResults] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsAnalyzing(true);

    try {
      const results = await classifyCase({ text: caseDetails });
      setClassificationResults(results);
    } catch (err) {
      setError(err.message || 'An error occurred during classification');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="case-classification-page">
      <div className="page-header">
        <h1>Case Classification</h1>
        <p className="subtitle">Enter case details to get classification and relevant precedents</p>
      </div>

      <form onSubmit={handleSubmit} className="classification-form">
        <div className="form-group">
          <label htmlFor="caseDetails">Case Details</label>
          <textarea
            id="caseDetails"
            value={caseDetails}
            onChange={(e) => setCaseDetails(e.target.value)}
            placeholder="Enter the case details here..."
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <button 
          type="submit" 
          className="analyze-button"
          disabled={isAnalyzing || !caseDetails.trim()}
        >
          {isAnalyzing ? 'Analyzing...' : 'Analyze Case'}
        </button>
      </form>

      {classificationResults && (
        <div className="classification-results">
          <div className="result-card primary-category">
            <h3>Primary Category</h3>
            <div className="category-badge">
              {classificationResults.primaryCategory}
              <span className="confidence">
                Confidence: {(classificationResults.confidence * 100).toFixed(1)}%
              </span>
            </div>
          </div>

          {classificationResults.secondaryCategories && (
            <div className="result-card">
              <h3>Secondary Categories</h3>
              <div className="category-list">
                {classificationResults.secondaryCategories.map((category, index) => (
                  <span key={index} className="category-tag">
                    {category}
                  </span>
                ))}
              </div>
            </div>
          )}

          {classificationResults.keyPoints && (
            <div className="result-card key-points">
              <h3>Key Points</h3>
              <ul>
                {classificationResults.keyPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {classificationResults.suggestedPrecedents && (
            <div className="result-card">
              <h3>Suggested Precedents</h3>
              <div className="precedents-list">
                {classificationResults.suggestedPrecedents.map((precedent, index) => (
                  <div key={index} className="precedent-item">
                    <div className="precedent-title">{precedent.title}</div>
                    <div className="precedent-citation">{precedent.citation}</div>
                    <div className="precedent-relevance">
                      Relevance: {(precedent.relevance * 100).toFixed(1)}%
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CaseClassificationPage; 