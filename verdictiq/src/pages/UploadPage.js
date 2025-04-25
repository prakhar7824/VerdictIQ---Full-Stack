import React, { useState } from 'react';
import Layout from '../components/Layout';
import FileUpload from '../components/FileUpload';
import PredictionResult from '../components/PredictionResult';
import '../styles/PredictionPage.css';

const UploadPage = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  // Mock data for demonstration purposes
  const mockResult = {
    caseType: 'Civil Dispute - Property',
    outcomeProb: 72,
    relevantFactors: [
      { text: 'Prior Agreement Validity', weight: 85, impact: 'Positive' },
      { text: 'Procedural Compliance', weight: 65, impact: 'Positive' },
      { text: 'Evidence Strength', weight: 78, impact: 'Positive' },
      { text: 'Statutory Interpretation', weight: 45, impact: 'Negative' },
      { text: 'Precedent Alignment', weight: 72, impact: 'Positive' },
    ],
    precedents: [
      {
        title: 'Singh vs. Kumar Property Dispute',
        citation: 'AIR 2019 SC 1234',
        similarity: 87,
        summary: 'Supreme Court ruled in favor of the plaintiff based on the validity of prior written agreement and established property boundaries.'
      },
      {
        title: 'Mehta vs. State Property Rights',
        citation: 'AIR 2018 HC 4567',
        similarity: 73,
        summary: 'High Court established that procedural compliance in property registration supersedes verbal agreements.'
      },
      {
        title: 'Desai Property Holdings Case',
        citation: '(2020) 5 SCC 789',
        similarity: 68,
        summary: 'Supreme Court upheld the rights of the original owner based on documented evidence despite procedural delays.'
      }
    ],
    fairnessScore: 86,
    summary: "This case involves a property dispute where the plaintiff claims ownership based on a registered deed, while the defendant claims rights through ancestral possession. The document shows strong evidence supporting the plaintiff's claim with proper registration and documentation. There are minor procedural inconsistencies that may affect the outcome."
  };

  const handleUpload = (formData) => {
    // Reset states
    setError('');
    setIsAnalyzing(true);
    setResult(null);
    
    // Simulate API call with delay
    setTimeout(() => {
      try {
        // In a real app, we would send formData to an API
        // For now, we'll just use mock data
        setResult(mockResult);
        setIsAnalyzing(false);
      } catch (err) {
        setError('Error analyzing document. Please try again.');
        setIsAnalyzing(false);
      }
    }, 3000); // Simulate 3 second processing time
  };

  return (
    <Layout>
      <div className="prediction-page">
        <div className="page-header">
          <h1>PRIVACY & SECURITY</h1>
          <p>Your data is secure with our advanced encryption and privacy measures</p>
        </div>

        <div className="features-overview">
          <h2>LEGAL ANALYSIS FEATURES</h2>
          <div className="features-grid">
            <div className="feature-item">
              <h3>CASE TYPE IDENTIFICATION</h3>
              <p>AI automatically identifies case types (civil, criminal, corporate law, etc.)</p>
            </div>
            <div className="feature-item">
              <h3>OUTCOME PREDICTION</h3>
              <p>Get probability scores for case outcomes based on legal precedents</p>
            </div>
            <div className="feature-item">
              <h3>DOCUMENT SUMMARIZATION</h3>
              <p>AI generates concise summaries of lengthy legal documents</p>
            </div>
            <div className="feature-item">
              <h3>PRECEDENT MATCHING</h3>
              <p>Finds similar past cases and relevant judgments</p>
            </div>
            <div className="feature-item">
              <h3>BIAS DETECTION</h3>
              <p>Ensures AI predictions are fair and unbiased</p>
            </div>
            <div className="feature-item">
              <h3>KEY FACTOR ANALYSIS</h3>
              <p>Identifies strongest and weakest aspects of your case</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UploadPage; 