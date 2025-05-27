from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
import PyPDF2
import docx
from datetime import datetime
import re
import logging

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# Configure upload folder
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def extract_text_from_pdf(file_path):
    text = ""
    with open(file_path, 'rb') as file:
        pdf_reader = PyPDF2.PdfReader(file)
        for page in pdf_reader.pages:
            text += page.extract_text()
    return text

def extract_text_from_docx(file_path):
    doc = docx.Document(file_path)
    text = ""
    for paragraph in doc.paragraphs:
        text += paragraph.text + "\n"
    return text

def extract_text_from_txt(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()

def analyze_document(text):
    # Extract dates using regex
    date_pattern = r'\b\d{1,2}[-/]\d{1,2}[-/]\d{2,4}\b|\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]* \d{1,2},? \d{4}\b'
    dates = re.findall(date_pattern, text)
    
    # Extract organizations (simple implementation)
    org_pattern = r'\b(?:Inc\.|LLC|Ltd\.|Corp\.|Company|Corporation)\b'
    organizations = re.findall(org_pattern, text)
    
    # Extract key phrases (simple implementation)
    sentences = text.split('.')
    key_phrases = []
    for sent in sentences[:5]:  # Take first 5 sentences as key phrases
        if len(sent.split()) > 5:  # Only consider sentences with more than 5 words
            key_phrases.append(sent.strip())
    
    # Extract entities (simple implementation)
    entities = []
    # Look for common legal terms
    legal_terms = ['plaintiff', 'defendant', 'court', 'judge', 'case', 'law', 'statute', 'regulation']
    for term in legal_terms:
        matches = re.finditer(r'\b' + term + r'\b', text, re.IGNORECASE)
        for match in matches:
            entities.append({
                'text': match.group(),
                'label': 'LEGAL_TERM',
                'start': match.start(),
                'end': match.end()
            })
    
    return {
        'entities': entities,
        'dates': dates,
        'organizations': organizations,
        'key_phrases': key_phrases
    }

def summarize_document(text, max_length=150, min_length=50):
    # Simple extractive summarization
    sentences = text.split('.')
    # Take first few sentences that are not too short
    summary_sentences = []
    for sent in sentences:
        if len(sent.split()) > 5 and len(summary_sentences) < 3:
            summary_sentences.append(sent.strip())
    
    return '. '.join(summary_sentences) + '.'

@app.route('/api/upload', methods=['POST'])
def upload_file():
    try:
        logger.debug("Received upload request")
        logger.debug(f"Request files: {request.files}")
        logger.debug(f"Request form: {request.form}")
        
        if 'document' not in request.files:
            logger.error("No file part in request")
            return jsonify({'error': 'No file part'}), 400
            
        file = request.files['document']
        if file.filename == '':
            logger.error("No selected file")
            return jsonify({'error': 'No selected file'}), 400
            
        filename = secure_filename(file.filename)
        logger.debug(f"Processing file: {filename}")
        
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        logger.debug(f"File saved to: {file_path}")
        
        # Extract text based on file type
        file_ext = os.path.splitext(filename)[1].lower()
        logger.debug(f"File extension: {file_ext}")
        
        if file_ext == '.pdf':
            text = extract_text_from_pdf(file_path)
        elif file_ext == '.docx':
            text = extract_text_from_docx(file_path)
        elif file_ext == '.txt':
            text = extract_text_from_txt(file_path)
        else:
            logger.error(f"Unsupported file type: {file_ext}")
            return jsonify({'error': 'Unsupported file type'}), 400
        
        logger.debug(f"Extracted text length: {len(text)}")
        
        # Analyze document
        analysis = analyze_document(text)
        logger.debug("Document analysis completed")
        
        # Generate summary
        summary = summarize_document(text)
        logger.debug("Summary generated")
        
        # Clean up
        os.remove(file_path)
        logger.debug("Temporary file removed")
        
        return jsonify({
            'analysis': analysis,
            'summary': summary,
            'timestamp': datetime.now().isoformat()
        })
        
    except Exception as e:
        logger.error(f"Error processing file: {str(e)}", exc_info=True)
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000) 