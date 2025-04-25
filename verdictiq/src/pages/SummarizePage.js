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

  // Mock data for demonstration
  const mockResult = {
    originalTitle: "Navtej Singh Johar & Ors. vs Union of India",
    originalLength: 487,
    summaryLength: 112,
    executiveSummary: "The Supreme Court of India ruled that Section 377 of the Indian Penal Code, which criminalized consensual sexual conduct between adults of the same sex, is unconstitutional. The Court found that the provision violated the constitutional rights to equality, non-discrimination, freedom of expression, and privacy. The judgment emphasized that sexual orientation is a natural and inherent element of identity that the Constitution protects.",
    keyPoints: [
      "Section 377 was declared unconstitutional to the extent it criminalized consensual sexual conduct between adults of the same sex",
      "The Court affirmed that sexual orientation is an intrinsic aspect of personal identity",
      "Constitutional morality must prevail over social morality",
      "LGBT individuals are entitled to full protection under the Constitution",
      "The right to privacy includes the right to sexual autonomy and choice of sexual partner"
    ],
    legalReasoning: "The Court applied the tests of reasonable classification under Article 14, finding that Section 377 created an unreasonable classification between individuals based on their sexual orientation. The Court also held that the provision violated the right to dignity and privacy established in previous judgments, including Puttaswamy v. Union of India. The judgment emphasized that constitutional morality must triumph over majoritarian views or popular morality.",
    significantQuotes: [
      "\"Sexual orientation is an essential attribute of privacy. Discrimination against an individual on the basis of sexual orientation is deeply offensive to the dignity and self-worth of the individual.\" - Justice Dipak Misra",
      "\"History owes an apology to the members of this community and their families... for the ignominy and ostracism that they have suffered through the centuries.\" - Justice Indu Malhotra"
    ],
    keyCitations: [
      { case: "National Legal Services Authority v. Union of India (2014)", relation: "Transgender rights recognition" },
      { case: "Justice K.S. Puttaswamy v. Union of India (2017)", relation: "Right to privacy" },
      { case: "Suresh Kumar Koushal v. Naz Foundation (2013)", relation: "Overruled by this judgment" }
    ],
    relevantStatutes: [
      { statute: "Constitution of India, Article 14", relevance: "Right to equality" },
      { statute: "Constitution of India, Article 15", relevance: "Prohibition of discrimination" },
      { statute: "Constitution of India, Article 19", relevance: "Freedom of expression" },
      { statute: "Constitution of India, Article 21", relevance: "Right to life and personal liberty" },
      { statute: "Indian Penal Code, Section 377", relevance: "Provision under challenge" }
    ]
  };

  const handleOptionChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCustomOptions({
      ...customOptions,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleUpload = (formData) => {
    // Reset states
    setError('');
    setIsProcessing(true);
    setResult(null);
    
    // Simulate API call with delay
    setTimeout(() => {
      try {
        // In a real app, we would send files and options to an API
        setResult(mockResult);
        setIsProcessing(false);
      } catch (err) {
        setError('Error processing document. Please try again.');
        setIsProcessing(false);
      }
    }, 3000); // Simulate 3 second processing time
  };

  return (
    <Layout>
      <div className="summarize-page">
        <div className="page-header">
          <h1>Legal Document Summarization</h1>
          <p>Generate concise summaries of legal documents with key insights</p>
        </div>

        {!result && (
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

            <div className="customize-section">
              <h2>Customize Summary</h2>
              <p>Adjust options to get the summary that meets your needs</p>
              
              <form className="options-form">
                <div className="form-group">
                  <label htmlFor="summaryLength">Summary Length</label>
                  <select 
                    id="summaryLength" 
                    name="summaryLength"
                    value={customOptions.summaryLength}
                    onChange={handleOptionChange}
                  >
                    <option value="brief">Brief (10-15% of original)</option>
                    <option value="medium">Medium (15-25% of original)</option>
                    <option value="detailed">Detailed (25-35% of original)</option>
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
                    Include Important Citations
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
        )}

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
              <div className="summary-title-area">
                <h2>{result.originalTitle}</h2>
                <div className="summary-stats">
                  <span>Original: {result.originalLength} pages</span>
                  <span>Summary: {result.summaryLength} pages</span>
                  <span>Reduction: {Math.round((1 - result.summaryLength/result.originalLength) * 100)}%</span>
                </div>
              </div>
              <button 
                className="reset-btn" 
                onClick={() => {
                  setResult(null);
                }}
              >
                New Summary
              </button>
            </div>

            <div className="summary-content">
              <section className="executive-summary">
                <h3>Executive Summary</h3>
                <p>{result.executiveSummary}</p>
              </section>

              {customOptions.includeKeyPoints && (
                <section className="key-points">
                  <h3>Key Points</h3>
                  <ul>
                    {result.keyPoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </section>
              )}

              <section className="legal-reasoning">
                <h3>Legal Reasoning</h3>
                <p>{result.legalReasoning}</p>
              </section>

              <section className="significant-quotes">
                <h3>Significant Quotes</h3>
                <div className="quotes-container">
                  {result.significantQuotes.map((quote, index) => (
                    <blockquote key={index}>
                      {quote}
                    </blockquote>
                  ))}
                </div>
              </section>

              {customOptions.includeCitations && (
                <section className="key-citations">
                  <h3>Key Citations</h3>
                  <ul className="citations-list">
                    {result.keyCitations.map((citation, index) => (
                      <li key={index} className="citation-item">
                        <span className="citation-case">{citation.case}</span>
                        <span className="citation-relation">{citation.relation}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {customOptions.includeStatutes && (
                <section className="relevant-statutes">
                  <h3>Relevant Statutes</h3>
                  <ul className="statutes-list">
                    {result.relevantStatutes.map((statute, index) => (
                      <li key={index} className="statute-item">
                        <span className="statute-name">{statute.statute}</span>
                        <span className="statute-relevance">{statute.relevance}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              )}
            </div>

            <div className="summary-actions">
              <button className="action-btn">
                <span className="action-icon">📥</span> Download as PDF
              </button>
              <button className="action-btn">
                <span className="action-icon">📋</span> Copy to Clipboard
              </button>
              <button className="action-btn">
                <span className="action-icon">📤</span> Share
              </button>
              <button className="action-btn">
                <span className="action-icon">🖨️</span> Print
              </button>
            </div>

            <div className="summary-disclaimer">
              <h4>AI Summary Disclaimer</h4>
              <p>
                This AI-generated summary is provided for informational purposes only and should not be 
                considered a substitute for reading the full legal document. While our AI strives for accuracy, 
                the nuances of legal language may not be fully captured. Always refer to the original document 
                for critical legal matters.
              </p>
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