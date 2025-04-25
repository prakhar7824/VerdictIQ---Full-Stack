from fastapi import FastAPI, HTTPException, Form, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from predict_outcome import predict_case_outcome
import uvicorn
import os

app = FastAPI()

# Enable CORS with more specific configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins in development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Set up templates
templates = Jinja2Templates(directory="templates")

@app.get("/")
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})

@app.post("/predict-outcome")
async def predict_outcome(case_description: str = Form(...)):
    try:
        # Print received data for debugging
        print(f"Received case description: {case_description}")
        
        # Make prediction
        predicted_outcome, confidence = predict_case_outcome(case_description)
        
        # Print prediction results for debugging
        print(f"Prediction: {predicted_outcome}, Confidence: {confidence}")
        
        return {
            "predicted_winner": predicted_outcome,
            "confidence": float(confidence),  # Convert numpy float to Python float
            "status": "success"
        }
        
    except Exception as e:
        print(f"Error in prediction: {str(e)}")  # Debug log
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    # Create templates directory if it doesn't exist
    os.makedirs("templates", exist_ok=True)
    uvicorn.run(app, host="0.0.0.0", port=8001) 