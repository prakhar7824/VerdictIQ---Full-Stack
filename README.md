📘 VerdictIQ - Legal Case Analysis System

VerdictIQ is a legal tech platform that utilizes machine learning to classify cases and predict outcomes through an interactive frontend and FastAPI-based backends.


🛠️ Prerequisites

Install the following dependencies **before setup**:

- [Node.js (v14+)](https://nodejs.org/)
- [Python (v3.8+)](https://www.python.org/)
- [pip](https://pip.pypa.io/)
- [Git](https://git-scm.com/)
- Recommended: 4GB+ RAM, available ports: `3000`, `8001`, `8002`

---

🔧 Step-by-Step Setup Guide

1. Clone the Repository

```bash
git clone <repository-url>
cd <repository-folder>

2. Setup Frontend 

cd verdictiq
npm install

3. Setup Backend ML Services

⚠️ Repeat these steps for both myModel-classification and myModel-Prediction

for classification model -- 
cd ../myModel-classification
python -m venv venv
# Activate the environment
source venv/bin/activate     # On Windows: venv\Scripts\activate
pip install -r requirements.txt


for prediction model -- 
cd ../myModel-Prediction
python -m venv venv
# Activate the environment
source venv/bin/activate     # On Windows: venv\Scripts\activate
pip install -r requirements.txt


▶️ Running the Project (Development Mode)
1. Start Backend ML Services
🔹 Classification Model API (Port 8002)
bash
Copy
Edit
cd myModel-classification
source venv/bin/activate     # On Windows: venv\Scripts\activate
python app.py
🔹 Outcome Prediction API (Port 8001)
bash
Copy
Edit
cd ../myModel-Prediction
source venv/bin/activate     # On Windows: venv\Scripts\activate
python app.py
🔄 Confirm both FastAPI servers are running on:

http://localhost:8001 (Prediction)

http://localhost:8002 (Classification)

2. Start the Frontend (React) (Port 3000)
bash
Copy
Edit
cd ../verdictiq
npm start
💻 Visit your app: http://localhost:3000

📚 Dependencies Overview
Python (Backend)
Installed via pip install -r requirements.txt:


🚀 Build for Production
1. Build Frontend
bash
Copy
Edit
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
Frontend not displaying data	Check console logs and API endpoints



