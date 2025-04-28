import React, { useState } from 'react';
import Layout from '../components/Layout';
import FileUpload from '../components/FileUpload';
import '../styles/PredictionPage.css';

const UploadPage = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const handleUpload = async (file) => {
    try {
      setIsAnalyzing(true);
      setError('');
      setResult(null);

      const formData = new FormData();
      formData.append('document', file);

      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to analyze document');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Error analyzing document. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <Layout>
      <div className="upload-page">
        <div className="page-header">
          <h1>Upload Legal Document</h1>
          <p>Upload your legal document for AI-powered analysis</p>
        </div>

        <div className="upload-container">
          <div className="upload-area">
            <FileUpload onUpload={handleUpload} />
          </div>

          {isAnalyzing && (
            <div className="analyzing-container">
              <div className="spinner"></div>
              <h2>Analyzing Document</h2>
              <p>Our AI is processing your document</p>
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
              <div className="prediction-header">
                <h2>Document Analysis Results</h2>
                <p>Analysis completed at {new Date(result.timestamp).toLocaleString()}</p>
              </div>

              <div className="prediction-visualization">
                <div className="analysis-section">
                  <h3>Summary</h3>
                  <p>{result.summary}</p>
                </div>

                <div className="analysis-section">
                  <h3>Key Entities</h3>
                  <ul>
                    {result.analysis.entities.map((entity, index) => (
                      <li key={index}>
                        <strong>{entity.text}</strong> ({entity.label})
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="analysis-section">
                  <h3>Important Dates</h3>
                  <ul>
                    {result.analysis.dates.map((date, index) => (
                      <li key={index}>{date}</li>
                    ))}
                  </ul>
                </div>

                <div className="analysis-section">
                  <h3>Organizations</h3>
                  <ul>
                    {result.analysis.organizations.map((org, index) => (
                      <li key={index}>{org}</li>
                    ))}
                  </ul>
                </div>

                <div className="analysis-section">
                  <h3>Key Phrases</h3>
                  <ul>
                    {result.analysis.key_phrases.map((phrase, index) => (
                      <li key={index}>{phrase}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default UploadPage; 