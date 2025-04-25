import React, { useState } from 'react';
import Layout from '../components/Layout';
import FileUpload from '../components/FileUpload';

const LanguagePage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [sourceLanguage, setSourceLanguage] = useState('hindi');
  const [targetLanguage, setTargetLanguage] = useState('english');
  const [textInput, setTextInput] = useState('');
  const [inputMethod, setInputMethod] = useState('text'); // 'text' or 'file'

  // Mock data for demonstration
  const mockResult = {
    originalLanguage: 'Hindi',
    translatedLanguage: 'English',
    originalText: "यह एक संपत्ति विवाद है जहां वादी पंजीकृत विलेख के आधार पर स्वामित्व का दावा करता है, जबकि प्रतिवादी पैतृक कब्जे के माध्यम से अधिकारों का दावा करता है। दस्तावेज़ में वादी के दावे का समर्थन करने वाले मजबूत साक्ष्य हैं, उचित पंजीकरण और दस्तावेज़ीकरण के साथ। ऐसी मामूली प्रक्रियात्मक असंगतियां हैं जो परिणाम को प्रभावित कर सकती हैं।",
    translatedText: "This is a property dispute where the plaintiff claims ownership based on a registered deed, while the defendant claims rights through ancestral possession. The document shows strong evidence supporting the plaintiff's claim with proper registration and documentation. There are minor procedural inconsistencies that may affect the outcome.",
    legalTerms: [
      { 
        original: "संपत्ति विवाद", 
        translated: "Property Dispute", 
        definition: "A legal conflict regarding the ownership, boundaries, or rights over real property."
      },
      { 
        original: "वादी", 
        translated: "Plaintiff", 
        definition: "The party who initiates a lawsuit by filing a complaint."
      },
      { 
        original: "प्रतिवादी", 
        translated: "Defendant", 
        definition: "The party against whom a lawsuit is filed."
      },
      { 
        original: "पंजीकृत विलेख", 
        translated: "Registered Deed", 
        definition: "A legally recognized document that has been recorded with the appropriate government authority."
      },
      { 
        original: "पैतृक कब्जे", 
        translated: "Ancestral Possession", 
        definition: "Occupation or control of property derived from or inherited from ancestors."
      }
    ],
    confidence: 92,
    legalAccuracy: 89
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

  const handleTextSubmit = (e) => {
    e.preventDefault();
    if (textInput.trim() === '') return;
    
    setIsProcessing(true);
    setResult(null);
    
    // Simulate API call
    setTimeout(() => {
      setResult(mockResult);
      setIsProcessing(false);
    }, 2000);
  };

  const availableLanguages = [
    { code: 'hindi', name: 'Hindi (हिन्दी)' },
    { code: 'tamil', name: 'Tamil (தமிழ்)' },
    { code: 'telugu', name: 'Telugu (తెలుగు)' },
    { code: 'bengali', name: 'Bengali (বাংলা)' },
    { code: 'marathi', name: 'Marathi (मराठी)' },
    { code: 'gujarati', name: 'Gujarati (ગુજરાતી)' },
    { code: 'kannada', name: 'Kannada (ಕನ್ನಡ)' },
    { code: 'malayalam', name: 'Malayalam (മലയാളം)' },
    { code: 'punjabi', name: 'Punjabi (ਪੰਜਾਬੀ)' },
    { code: 'odia', name: 'Odia (ଓଡ଼ିଆ)' },
    { code: 'urdu', name: 'Urdu (اردو)' },
    { code: 'english', name: 'English' }
  ];

  return (
    <Layout>
      <div className="language-page">
        <div className="page-header">
          <h1>Legal Language Support</h1>
          <p>Translate and understand legal documents in multiple Indian languages</p>
        </div>

        {!result && (
          <div className="language-container">
            <div className="language-selector">
              <h2>Language Selection</h2>
              <div className="language-form">
                <div className="form-group">
                  <label htmlFor="sourceLanguage">Source Language</label>
                  <select 
                    id="sourceLanguage" 
                    value={sourceLanguage}
                    onChange={(e) => setSourceLanguage(e.target.value)}
                  >
                    {availableLanguages.map(lang => (
                      <option key={lang.code} value={lang.code}>{lang.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="language-switcher">
                  <button 
                    className="switch-btn"
                    onClick={() => {
                      const temp = sourceLanguage;
                      setSourceLanguage(targetLanguage);
                      setTargetLanguage(temp);
                    }}
                  >
                    ⇄
                  </button>
                </div>
                
                <div className="form-group">
                  <label htmlFor="targetLanguage">Target Language</label>
                  <select 
                    id="targetLanguage" 
                    value={targetLanguage}
                    onChange={(e) => setTargetLanguage(e.target.value)}
                  >
                    {availableLanguages.map(lang => (
                      <option key={lang.code} value={lang.code}>{lang.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="input-method-selector">
              <div className="method-tabs">
                <button 
                  className={`method-tab ${inputMethod === 'text' ? 'active' : ''}`}
                  onClick={() => setInputMethod('text')}
                >
                  Paste Text
                </button>
                <button 
                  className={`method-tab ${inputMethod === 'file' ? 'active' : ''}`}
                  onClick={() => setInputMethod('file')}
                >
                  Upload Document
                </button>
              </div>

              {inputMethod === 'text' ? (
                <div className="text-input-container">
                  <form onSubmit={handleTextSubmit}>
                    <textarea 
                      className="legal-text-input"
                      placeholder={`Enter legal text in ${availableLanguages.find(l => l.code === sourceLanguage)?.name}...`}
                      rows="10"
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                    ></textarea>
                    <button type="submit" className="primary-btn" disabled={textInput.trim() === ''}>
                      Translate Text
                    </button>
                  </form>
                </div>
              ) : (
                <div className="file-input-container">
                  <p>Upload a document in {availableLanguages.find(l => l.code === sourceLanguage)?.name}</p>
                  <FileUpload onUpload={handleUpload} />
                  
                  <div className="supported-formats">
                    <h3>Supported Document Types</h3>
                    <ul>
                      <li>
                        <span className="format-icon">📄</span>
                        <span className="format-name">PDF</span>
                        <span className="format-desc">Scanned legal documents</span>
                      </li>
                      <li>
                        <span className="format-icon">📝</span>
                        <span className="format-name">DOCX</span>
                        <span className="format-desc">Word documents</span>
                      </li>
                      <li>
                        <span className="format-icon">📋</span>
                        <span className="format-name">TXT</span>
                        <span className="format-desc">Plain text documents</span>
                      </li>
                      <li>
                        <span className="format-icon">🖼️</span>
                        <span className="format-name">JPG/PNG</span>
                        <span className="format-desc">Scanned document images</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {isProcessing && (
          <div className="processing-container">
            <div className="spinner"></div>
            <h2>Processing Language</h2>
            <p>Analyzing and translating legal content</p>
            <div className="progress-steps">
              <div className="step completed">Text Extraction</div>
              <div className="step active">Processing Legal Terms</div>
              <div className="step">Context Analysis</div>
              <div className="step">Translation</div>
            </div>
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
          <div className="translation-results">
            <div className="results-header">
              <div className="language-details">
                <div className="language-badge">
                  <span className="language-label">From:</span>
                  <span className="language-name">{result.originalLanguage}</span>
                </div>
                <div className="arrow">→</div>
                <div className="language-badge">
                  <span className="language-label">To:</span>
                  <span className="language-name">{result.translatedLanguage}</span>
                </div>
              </div>
              <div className="accuracy-meter">
                <div className="accuracy-item">
                  <span className="accuracy-label">Translation Confidence:</span>
                  <div className="meter-bar">
                    <div className="meter-fill" style={{width: `${result.confidence}%`}}></div>
                  </div>
                  <span className="accuracy-value">{result.confidence}%</span>
                </div>
                <div className="accuracy-item">
                  <span className="accuracy-label">Legal Accuracy:</span>
                  <div className="meter-bar">
                    <div className="meter-fill" style={{width: `${result.legalAccuracy}%`}}></div>
                  </div>
                  <span className="accuracy-value">{result.legalAccuracy}%</span>
                </div>
              </div>
              <button 
                className="reset-btn" 
                onClick={() => {
                  setResult(null);
                  setTextInput('');
                }}
              >
                New Translation
              </button>
            </div>

            <div className="translation-content">
              <div className="original-text">
                <h3>Original Text</h3>
                <div className="text-content">{result.originalText}</div>
              </div>
              <div className="translated-text">
                <h3>Translated Text</h3>
                <div className="text-content">{result.translatedText}</div>
              </div>
            </div>

            <div className="legal-terms-glossary">
              <h3>Legal Terms Glossary</h3>
              <div className="terms-list">
                {result.legalTerms.map((term, index) => (
                  <div key={index} className="term-item">
                    <div className="term-original">{term.original}</div>
                    <div className="term-translated">{term.translated}</div>
                    <div className="term-definition">{term.definition}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="translation-actions">
              <button className="action-btn">
                <span className="action-icon">📥</span> Download Translation
              </button>
              <button className="action-btn">
                <span className="action-icon">📋</span> Copy to Clipboard
              </button>
              <button className="action-btn">
                <span className="action-icon">🖨️</span> Print
              </button>
              <button className="action-btn">
                <span className="action-icon">📤</span> Share
              </button>
            </div>

            <div className="translation-disclaimer">
              <h4>Translation Disclaimer</h4>
              <p>
                This AI-powered translation is provided for informational purposes only and should not be 
                considered a substitute for professional legal translation services. While our system is 
                designed to handle legal terminology accurately, nuances in legal language may not be fully 
                captured. Always consult with a qualified legal professional for critical legal matters.
              </p>
            </div>
          </div>
        )}

        {!isProcessing && !result && !error && (
          <div className="language-features">
            <h2>Indian Legal Language Support</h2>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon">🔤</div>
                <h3>Multilingual Support</h3>
                <p>Supporting 11 Indian languages plus English for comprehensive legal document processing</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">⚖️</div>
                <h3>Legal Terminology Focus</h3>
                <p>AI trained specifically on legal vocabulary across multiple Indian languages</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📝</div>
                <h3>Context-Aware Translation</h3>
                <p>Preserves legal meaning and nuance when translating between languages</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">🔍</div>
                <h3>Term Recognition</h3>
                <p>Identifies and explains specialized legal terminology in source language</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📊</div>
                <h3>Accuracy Metrics</h3>
                <p>Provides confidence scores for translation quality and legal precision</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon">📱</div>
                <h3>OCR Technology</h3>
                <p>Extract text from images and scanned documents in multiple Indian scripts</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default LanguagePage; 