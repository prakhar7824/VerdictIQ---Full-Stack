import React, { useState } from 'react';
import PredictionOutcome from '../components/PredictionOutcome';
import { samplePredictionData } from '../data/samplePredictionData';

const PredictionPage = () => {
  const [predictionData, setPredictionData] = useState(samplePredictionData);

  return (
    <div className="document-analysis-page">
      <div className="document-analysis-header">
        <h1>Case Outcome Prediction</h1>
        <p>Analyze your case and get AI-powered predictions</p>
      </div>

      <div className="document-analysis-content">
        <PredictionOutcome predictionData={predictionData} />
      </div>
    </div>
  );
};

export default PredictionPage; 