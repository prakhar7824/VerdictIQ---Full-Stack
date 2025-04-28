import React, { useState } from 'react';

const FileUpload = ({ onUpload, acceptedFileTypes = '.pdf,.docx,.txt' }) => {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    validateAndSetFile(selectedFile);
  };

  const validateAndSetFile = (selectedFile) => {
    setError('');
    
    if (!selectedFile) return;
    
    // Check file type
    const fileExtension = '.' + selectedFile.name.split('.').pop().toLowerCase();
    const validExtensions = acceptedFileTypes.split(',');
    
    if (!validExtensions.includes(fileExtension)) {
      setError(`Invalid file type. Accepted types: ${acceptedFileTypes}`);
      return;
    }
    
    // Check file size (max 20MB)
    if (selectedFile.size > 20 * 1024 * 1024) {
      setError('File size exceeds 20MB limit');
      return;
    }
    
    setFile(selectedFile);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const droppedFile = e.dataTransfer.files[0];
    validateAndSetFile(droppedFile);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a file to upload');
      return;
    }
    
    setLoading(true);
    
    try {
      const formData = new FormData();
      formData.append('document', file);
      
      // Call parent component's onUpload handler with the file
      if (onUpload) {
        await onUpload(file);
      }
    } catch (err) {
      setError('Error uploading file. Please try again.');
      console.error('Upload error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="file-upload-container">
      <form onSubmit={handleSubmit}>
        <div 
          className={`upload-area ${isDragging ? 'dragging' : ''} ${error ? 'error' : ''}`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div className="upload-icon">
            {file ? '📄' : '📁'}
          </div>
          
          <p className="upload-text">
            {file 
              ? `Selected: ${file.name}`
              : 'Drag & drop your legal document or click to browse'
            }
          </p>
          
          <input 
            type="file" 
            onChange={handleFileChange}
            accept={acceptedFileTypes}
            className="file-input"
            id="file-input"
          />
          
          <label htmlFor="file-input" className="browse-button">
            Browse Files
          </label>
          
          {error && <p className="error-message">{error}</p>}
        </div>
        
        <div className="upload-actions">
          <button 
            type="submit" 
            className="upload-button"
            disabled={!file || loading}
          >
            {loading ? 'Uploading...' : 'Upload Document'}
          </button>
          
          {file && (
            <button 
              type="button" 
              className="cancel-button"
              onClick={() => setFile(null)}
            >
              Remove
            </button>
          )}
        </div>
      </form>
      
      <div className="file-types">
        <p>Accepted file types: {acceptedFileTypes}</p>
        <p>Maximum file size: 20MB</p>
      </div>
    </div>
  );
};

export default FileUpload; 