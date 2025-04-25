from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from werkzeug.utils import secure_filename
import numpy as np
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)

# Configure upload folder
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Load your ML model
# model = joblib.load('path_to_your_model.pkl')

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        # Process the input data
        case_data = {
            'case_type': data.get('caseType'),
            'jurisdiction': data.get('jurisdiction'),
            'case_year': int(data.get('caseYear')),
            'additional_facts': data.get('additionalFacts')
        }
        
        # TODO: Preprocess the data and make prediction using your ML model
        # prediction = model.predict(preprocessed_data)
        
        # Mock prediction for now
        prediction = {
            'outcomeProb': 67,
            'favorableOutcome': 'Plaintiff',
            'confidenceScore': 78,
            'timeEstimate': '6-8 months',
            'keyFactors': [
                {'factor': 'Evidence Quality', 'impact': 'positive', 'strength': 85},
                {'factor': 'Procedural Compliance', 'impact': 'positive', 'strength': 72},
                {'factor': 'Precedent Alignment', 'impact': 'negative', 'strength': 45},
                {'factor': 'Statutory Interpretation', 'impact': 'positive', 'strength': 68},
                {'factor': 'Jurisdiction Tendencies', 'impact': 'neutral', 'strength': 50}
            ],
            'similarCases': [
                {
                    'title': 'Mehta vs State of Maharashtra',
                    'citation': '2022 SCC 456',
                    'similarity': 84,
                    'outcome': 'Favorable'
                }
            ],
            'recommendations': [
                'Strengthen evidence documentation',
                'Address procedural challenges',
                'Focus on distinguishing precedents'
            ]
        }
        
        return jsonify(prediction)
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/upload', methods=['POST'])
def upload_file():
    try:
        if 'documents' not in request.files:
            return jsonify({'error': 'No file part'}), 400
            
        files = request.files.getlist('documents')
        document_ids = []
        
        for file in files:
            if file.filename == '':
                continue
                
            filename = secure_filename(file.filename)
            file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(file_path)
            document_ids.append(filename)
            
        return jsonify({'documentIds': document_ids})
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000) 