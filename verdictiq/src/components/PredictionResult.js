import React from 'react';

const PredictionResult = ({ result, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="prediction-loading">
        <div className="loader"></div>
        <p>Analyzing document and generating predictions...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="prediction-error">
        <h3>Error</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!result) {
    return null;
  }

  const { 
    caseType, 
    outcomeProb, 
    relevantFactors, 
    precedents, 
    fairnessScore, 
    summary 
  } = result;

  // Function to determine color based on probability
  const getProbabilityColor = (prob) => {
    if (prob >= 75) return 'high-probability';
    if (prob >= 50) return 'medium-probability';
    return 'low-probability';
  };

  return (
    <div className="prediction-result">
      <div className="result-header">
        <h2>Case Analysis Results</h2>
        <p className="case-type">Case Type: <span>{caseType}</span></p>
      </div>

      <div className="result-summary">
        <h3>Document Summary</h3>
        <p>{summary}</p>
      </div>

      <div className="outcome-prediction">
        <h3>Outcome Prediction</h3>
        <div className={`probability-meter ${getProbabilityColor(outcomeProb)}`}>
          <div className="probability-bar" style={{ width: `${outcomeProb}%` }}>
            <span className="probability-value">{outcomeProb}%</span>
          </div>
        </div>
        <p className="probability-label">
          Probability of favorable outcome based on historical analysis
        </p>
      </div>

      <div className="key-factors">
        <h3>Key Legal Factors</h3>
        <ul>
          {relevantFactors.map((factor, index) => (
            <li key={index}>
              <span className="factor-strength" style={{ width: `${factor.weight}%` }}></span>
              <span className="factor-text">{factor.text}</span>
              <span className="factor-impact">{factor.impact}</span>
            </li>
          ))}
        </ul>
      </div>

      {precedents && precedents.length > 0 && (
        <div className="similar-precedents">
          <h3>Similar Legal Precedents</h3>
          <ul className="precedent-list">
            {precedents.map((precedent, index) => (
              <li key={index} className="precedent-item">
                <h4>{precedent.title}</h4>
                <p className="precedent-citation">{precedent.citation}</p>
                <p className="precedent-similarity">Similarity: {precedent.similarity}%</p>
                <p>{precedent.summary}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="fairness-score">
        <h3>AI Fairness Analysis</h3>
        <div className="fairness-meter">
          <div 
            className={`fairness-indicator ${fairnessScore >= 80 ? 'good' : fairnessScore >= 60 ? 'moderate' : 'poor'}`}
            style={{ width: `${fairnessScore}%` }}
          >
            <span>{fairnessScore}/100</span>
          </div>
        </div>
        <p className="fairness-explanation">
          This score indicates how fair and unbiased the AI analysis is based on demographic and procedural factors.
        </p>
      </div>

      <div className="result-disclaimer">
        <h4>Important Disclaimer</h4>
        <p>
          This AI prediction is based on historical case data and should not be considered legal advice. 
          Always consult with a qualified legal professional before making decisions.
        </p>
      </div>
    </div>
  );
};

export default PredictionResult; 