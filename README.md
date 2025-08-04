# 📘 VerdictIQ – Legal Case Analysis System

**VerdictIQ** is a full-stack legal tech platform designed to make legal analysis faster, fairer, and more accessible, particularly for the Indian justice system. It leverages **machine learning**, **NLP**, and **XAI techniques** (like SHAP/LIME) to classify legal cases, predict case outcomes, summarize legal documents, and suggest legal strategies via an interactive web interface.

---

## 🚀 Key Features

- ⚖️ ML-based Legal Case Classification (e.g., civil, criminal, family, corporate)
- 📊 Outcome Prediction using court, city, year, and case description with visual probabilities
- 📚 Legal Strategy Advisor based on past precedent analysis
- 📄 Legal Document Summarization & Extraction via Hugging Face NLP models
- 🔍 Precedent Search & Comparison with filters for Indian jurisdictions
- 🌐 Multilingual Document Support for regional legal texts
- 🛡️ Fairness Monitoring (bias detection & explainability with SHAP/LIME)
- 🎯 For Students, Lawyers, Judges, and Citizens to democratize legal access

---

## 🛠️ Prerequisites

Ensure the following are installed:

- Node.js (v14+)
- Python (v3.8+)
- pip
- Git

Recommended Specs:  
Minimum 4GB RAM, and open ports: 3000, 8001, 8002.

---

## 🔧 Step-by-Step Setup Guide

### 1. Clone the Repository

```
git clone <repository-url>
cd <repository-folder>
```

---

### 2. Setup Frontend (React)

```
cd verdictiq
npm install
```

---

### 3. Setup Backend ML Services

⚠️ Repeat the below steps separately for both `myModel-classification` and `myModel-Prediction`

#### A. For Classification Model (Port 8002)

```
cd ../myModel-classification
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

#### B. For Outcome Prediction Model (Port 8001)

```
cd ../myModel-Prediction
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

---

## ▶️ Running the Project (Development Mode)

### 1. Start Backend Services

#### Classification API (Port 8002)

```
cd myModel-classification
source venv/bin/activate
python app.py
```

#### Prediction API (Port 8001)

```
cd ../myModel-Prediction
source venv/bin/activate
python app.py
```

Verify Servers:

- http://localhost:8001 → Outcome Prediction
- http://localhost:8002 → Case Classification

---

### 2. Start Frontend (Port 3000)

```
cd ../verdictiq
npm start
```

Visit the app: http://localhost:3000

---

## 📚 Backend Dependencies

Installed via `pip install -r requirements.txt`:

- fastapi
- uvicorn
- scikit-learn
- pandas
- numpy
- joblib
- transformers
- shap, lime
- others as needed

---

## 🚀 Build for Production

### 1. Build Frontend

```
cd verdictiq
npm run build
```

### 2. Deploy Backend ML Services

Recommended:

- Use Gunicorn or Uvicorn with ASGI
- Set up Nginx or Apache as reverse proxy
- Add SSL Certificates (Let's Encrypt)
- Define secure .env variables for configs
- Use PM2 or Docker for process management

---

## 🛡️ Troubleshooting

| Issue | Solution |
|-------|----------|
| Port already in use | Kill the process or change the port |
| Model not loading | Ensure `model.pkl` and `vectorizer.pkl` exist |
| API not connecting | Ensure the backend servers are running |
| Frontend not displaying | Check browser console and verify backend connectivity |

---

## 👥 Target Audience

- Law Students & Researchers
- Lawyers & Legal Analysts
- Judges & Court Assistants
- Citizens seeking fair legal insights

---

## 🧪 Technologies Used

- Frontend: React.js, Tailwind CSS, Vite
- Backend: Python, FastAPI, scikit-learn, Hugging Face Transformers
- ML/NLP: BERT, SHAP, LIME, TF-IDF, Logistic Regression
- Infra: MongoDB, GitHub, REST APIs

---

## 📦 Planned Enhancements

- Public Deployment (Vercel, Render, or Railway)
- Expanded Indian legal datasets (Indian Kanoon, Supreme Court)
- Paid tier for legal professionals
- In-app Legal Chatbot (RAG + PDF memory)
- Better Precedent Filtering and PDF Export Tools

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request for:

- Bug fixes
- Feature requests
- Model improvements
- Language support additions

---

## 📄 License

This project is open-source under the MIT License.
