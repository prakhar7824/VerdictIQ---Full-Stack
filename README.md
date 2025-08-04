LegalTech AI Platform – Data-Driven Legal Analytics & Consulting for India

A comprehensive AI-powered legal platform designed to make legal analysis faster, fairer, and more accessible, especially for the Indian justice system. The platform integrates advanced machine learning and NLP models to classify court cases (civil, criminal, family, corporate, etc.), predict case outcomes, provide legal advice, and extract insights from legal documents. Users can upload case descriptions or legal PDFs (in various Indian languages) and receive case classifications, summary extraction, precedent recommendations, probability/confidence charts for case outcomes, and AI-driven legal strategy suggestions. Features include historical precedent search, document comparison, and fairness monitoring. Designed for law students, lawyers, judges, and the general public to support legal research, study, and informed decision making—all through an intuitive, visually rich web interface. Future plans include subscription tiers for legal professionals and expanded data coverage.

Key Features:

-ML-based case classification (civil/criminal/family/etc.)

-Outcome prediction using city, court, year, and case data (with visual probability and confidence scores)

-Legal advice and strategy recommendations based on case description and past precedent analysis

-Automated legal PDF/text extraction and summarization using HuggingFace API and NLP models

-Robust search and filtering of precedent cases, multilingual document support

-Fairness monitoring to ensure unbiased AI predictions

-For students, lawyers, judges, and the public—reducing time, cost, and complexity of legal research in India

-Built with Python, Scikit-Learn, Hugging Face, React, MongoDB, SHAP/LIME, and major Indian legal datasets (Kaggle, Indian Kanoon, Supreme/High Court sources).

-(Full-stack project; currently not hosted. Planned enhancements: public deployment, richer data, and paid features for professionals and organizations.)

-Recommended: 4GB+ RAM, available ports: 3000, 8001, 8002

🔧 Step-by-Step Setup Guide
1. Clone the Repository
bash
git clone <repository-url>
cd <repository-folder>
2. Setup Frontend
bash
cd verdictiq
npm install
3. Setup Backend ML Services
For Classification Model:
bash
cd ../myModel-classification
python -m venv venv
# Activate the environment
source venv/bin/activate     # On Windows: venv\Scripts\activate
pip install -r requirements.txt
For Prediction Model:
bash
cd ../myModel-Prediction
python -m venv venv
# Activate the environment
source venv/bin/activate     # On Windows: venv\Scripts\activate
pip install -r requirements.txt
▶️ Running the Project (Development Mode)
1. Start Backend ML Services
Classification Model API (Port 8002)
bash
cd myModel-classification
source venv/bin/activate     # On Windows: venv\Scripts\activate
python app.py
Outcome Prediction API (Port 8001)
bash
cd ../myModel-Prediction
source venv/bin/activate     # On Windows: venv\Scripts\activate
python app.py
Check both FastAPI servers are running at:

http://localhost:8001 (Prediction)

http://localhost:8002 (Classification)

2. Start the Frontend (React, Port 3000)
bash
cd ../verdictiq
npm start
Visit your app: http://localhost:3000

📚 Dependencies Overview
Python (Backend)
Required libraries are specified in each requirements.txt file.

🚀 Build for Production
1. Build Frontend
bash
cd verdictiq
npm run build
2. Deploy ML Services (Recommended for Production)
Use WSGI servers like Gunicorn

Configure Nginx or Apache as a reverse proxy

Add SSL certificates (Let's Encrypt or custom)

Define .env variables and secure keys

🛡️ Troubleshooting
Issue	Solution
Port already in use	Kill process or use alternate port
Model not loading	Ensure model.pkl and vectorizer.pkl exist
API not connecting	Check if backend servers are running
Frontend not displaying	Check console logs and API endpoints
For questions or contributions, please open an issue or submit a pull request!
