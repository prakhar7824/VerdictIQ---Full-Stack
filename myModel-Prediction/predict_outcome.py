import re
import pickle
import numpy as np

def clean_text(text):
    text = str(text).lower()
    text = re.sub(r'\W', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def predict_case_outcome(case_description):
    """
    Predicts the outcome of a legal case based on the case description.
    
    Args:
        case_description (str): The description of the legal case
        
    Returns:
        tuple: (predicted_outcome, confidence_score)
            - predicted_outcome (str): "Plaintiff" or "Defendant"
            - confidence_score (float): Confidence level of the prediction
    """
    try:
        # Load the trained pipeline and mappings
        with open("model.pkl", "rb") as model_file:
            pipeline = pickle.load(model_file)
            
        with open("outcome_mapping.pkl", "rb") as outcome_mapping_file:
            outcome_mapping = pickle.load(outcome_mapping_file)
        
        # Clean the case description
        cleaned_text = clean_text(case_description)
        
        # Make prediction using the pipeline
        prediction = pipeline.predict([cleaned_text])[0]
        confidence = np.max(pipeline.predict_proba([cleaned_text])[0])
        
        # Map prediction to outcome
        reverse_mapping = {v: k for k, v in outcome_mapping.items()}
        predicted_outcome = reverse_mapping[prediction]
        
        return predicted_outcome, confidence
        
    except FileNotFoundError as e:
        raise Exception("Model files not found. Please train the model first by running 'python train_model.py'")
    except Exception as e:
        raise Exception(f"Error making prediction: {str(e)}")

if __name__ == "__main__":
    # Example usage
    case_description = "John Doe filed a lawsuit against XYZ Pvt Ltd for breach of contract regarding non-payment of dues for services rendered."
    
    predicted_outcome, confidence = predict_case_outcome(case_description)
    if predicted_outcome:
        print(f"Predicted outcome: {predicted_outcome}")
        print(f"Confidence: {confidence:.2%}")
