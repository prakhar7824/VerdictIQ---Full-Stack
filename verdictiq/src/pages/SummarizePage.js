import React, { useState } from 'react';
import Layout from '../components/Layout';
import FileUpload from '../components/FileUpload';

const SummarizePage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [customOptions, setCustomOptions] = useState({
    summaryLength: 'medium',
    includeKeyPoints: true,
    includeCitations: true,
    includeStatutes: true,
    formatType: 'structured'
  });

  const handleOptionChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCustomOptions({
      ...customOptions,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleUpload = async (file) => {
    try {
      setIsProcessing(true);
      setError('');
      setResult(null);

      const formData = new FormData();
      formData.append('document', file);

      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to summarize document');
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError('Error processing document. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Layout>
      <div className="summarize-page">
        <div className="page-header">
          <h1>Legal Document Summarization</h1>
          <p>Generate concise summaries of legal documents with key insights</p>
        </div>

        <div className="upload-container">
          <div className="upload-section">
            <h2>Upload Legal Document</h2>
            <p>Upload judgments, legal opinions, or case documents for AI summarization</p>
            <FileUpload onUpload={handleUpload} />
            
            <div className="supported-formats">
              <h3>Supported Document Types</h3>
              <ul>
                <li>
                  <span className="format-icon">📄</span>
                  <span className="format-name">PDF</span>
                  <span className="format-desc">Scanned judgments or legal documents</span>
                </li>
                <li>
                  <span className="format-icon">📝</span>
                  <span className="format-name">DOCX</span>
                  <span className="format-desc">Word documents with legal text</span>
                </li>
                <li>
                  <span className="format-icon">📋</span>
                  <span className="format-name">TXT</span>
                  <span className="format-desc">Plain text legal documents</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="options-section">
            <h2>Summary Options</h2>
            <form className="options-form">
              <div className="form-group">
                <label htmlFor="summaryLength">Summary Length</label>
                <select 
                  id="summaryLength" 
                  name="summaryLength"
                  value={customOptions.summaryLength}
                  onChange={handleOptionChange}
                >
                  <option value="short">Short (1-2 paragraphs)</option>
                  <option value="medium">Medium (3-4 paragraphs)</option>
                  <option value="long">Long (5+ paragraphs)</option>
                </select>
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input 
                    type="checkbox" 
                    name="includeKeyPoints"
                    checked={customOptions.includeKeyPoints}
                    onChange={handleOptionChange}
                  />
                  Include Key Points
                </label>
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input 
                    type="checkbox" 
                    name="includeCitations"
                    checked={customOptions.includeCitations}
                    onChange={handleOptionChange}
                  />
                  Include Citations
                </label>
              </div>

              <div className="form-group checkbox-group">
                <label>
                  <input 
                    type="checkbox" 
                    name="includeStatutes"
                    checked={customOptions.includeStatutes}
                    onChange={handleOptionChange}
                  />
                  Include Relevant Statutes
                </label>
              </div>

              <div className="form-group">
                <label htmlFor="formatType">Format Type</label>
                <select 
                  id="formatType" 
                  name="formatType"
                  value={customOptions.formatType}
                  onChange={handleOptionChange}
                >
                  <option value="structured">Structured (with sections)</option>
                  <option value="narrative">Narrative (continuous text)</option>
                  <option value="bullet">Bullet Points Only</option>
                </select>
              </div>
            </form>
          </div>
        </div>

        {isProcessing && (
          <div className="processing-container">
            <div className="spinner"></div>
            <h2>Analyzing Document</h2>
            <p>Our AI is parsing and analyzing your legal document</p>
            <div className="progress-bar">
              <div className="progress" style={{width: '65%'}}></div>
            </div>
            <p className="progress-text">Extracting key legal concepts...</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <h2>Processing Error</h2>
            <p className="error-message">{error}</p>
            <button className="primary-btn" onClick={() => setError('')}>Try Again</button>
          </div>
        )}

        {result && (
          <div className="summary-results">
            <div className="summary-header">
              <h2>Document Summary</h2>
              <p>Generated at {new Date(result.timestamp).toLocaleString()}</p>
            </div>

            <div className="summary-content">
              <div className="summary-section">
                <h3>Executive Summary</h3>
                <p>{result.summary}</p>
              </div>

              {customOptions.includeKeyPoints && (
                <div className="summary-section">
                  <h3>Key Points</h3>
                  <ul>
                    {result.analysis.key_phrases.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              )}

              {customOptions.includeCitations && (
                <div className="summary-section">
                  <h3>Citations</h3>
                  <ul>
                    {result.analysis.entities
                      .filter(entity => entity.label === 'LAW')
                      .map((citation, index) => (
                        <li key={index}>{citation.text}</li>
                      ))}
                  </ul>
                </div>
              )}

              {customOptions.includeStatutes && (
                <div className="summary-section">
                  <h3>Relevant Statutes</h3>
                  <ul>
                    {result.analysis.entities
                      .filter(entity => entity.label === 'LAW')
                      .map((statute, index) => (
                        <li key={index}>{statute.text}</li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        )}

        {!isProcessing && !result && !error && (
          <div className="features-overview">
            <h2>How Our Legal Document Summarization Works</h2>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">📊</div>
                <h3>Contextual Understanding</h3>
                <p>Our AI is trained on millions of legal documents to understand complex legal language and context</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🔍</div>
                <h3>Key Point Extraction</h3>
                <p>AI identifies the most important arguments, holdings, and reasoning in the document</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">⚖️</div>
                <h3>Citation Analysis</h3>
                <p>Automatically identifies and explains the relevance of legal precedents cited in the document</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📝</div>
                <h3>Customizable Output</h3>
                <p>Adjust summary length and format based on your specific needs</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SummarizePage; 