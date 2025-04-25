from predict_outcome import predict_case_outcome

def get_user_input():
    print("\nWelcome to Legal Case Outcome Predictor!")
    print("Please provide the case description:\n")
    
    # Get case description
    print("Case Description:")
    print("(Describe the case in detail, including the parties involved and the nature of the dispute)")
    case_description = input("> ")
    
    return case_description

def main():
    try:
        # Get user input
        case_description = get_user_input()
        
        # Make prediction
        predicted_outcome, confidence = predict_case_outcome(case_description)
        
        # Display results
        print("\nPrediction Results:")
        print("-" * 50)
        print(f"Predicted Winner: {predicted_outcome}")
        print(f"Confidence Level: {confidence:.2%}")
        print("-" * 50)
        
        # Display disclaimer
        print("\nNote: This prediction is based on machine learning analysis and should be used")
        print("as supplementary information only. Always consult with legal professionals for")
        print("actual legal advice and case assessment.")
        
    except Exception as e:
        print(f"\nError: {str(e)}")
        print("Please make sure the model is trained before making predictions.")
        print("Run 'python train_model.py' to train the model first.")

if __name__ == "__main__":
    main() 