from predict_outcome import predict_case_outcome

def test_model():
    # Test Case 1: Workplace Discrimination
    case1_desc = "Sarah Johnson filed a case against ABC Corp for workplace discrimination, citing unfair treatment and denial of promotion."
    case1_judge = "The court found evidence of discriminatory practices and ordered ABC Corp to compensate Sarah Johnson and implement fair workplace policies."
    print("\nTest Case 1 - Workplace Discrimination:")
    print("Description:", case1_desc)
    print("Judgement:", case1_judge)
    outcome, confidence = predict_case_outcome(case1_desc, case1_judge)
    if outcome:
        print(f"Predicted winner: {outcome}")
        print(f"Confidence: {confidence:.2%}")

    # Test Case 2: Property Theft
    case2_desc = "Mr. Smith filed a case against his neighbor Mr. Jones for theft of valuable items from his home."
    case2_judge = "Based on CCTV evidence and witness testimonies, the court found Mr. Jones guilty of theft and ordered him to return the stolen items and pay compensation."
    print("\nTest Case 2 - Property Theft:")
    print("Description:", case2_desc)
    print("Judgement:", case2_judge)
    outcome, confidence = predict_case_outcome(case2_desc, case2_judge)
    if outcome:
        print(f"Predicted winner: {outcome}")
        print(f"Confidence: {confidence:.2%}")

    # Test Case 3: Contract Dispute
    case3_desc = "Tech Solutions Inc. filed a lawsuit against DataCorp for breach of software development contract and non-payment of dues."
    case3_judge = "After reviewing the evidence, the court dismissed the claims of Tech Solutions Inc., finding that they had failed to deliver the software as per specifications."
    print("\nTest Case 3 - Contract Dispute:")
    print("Description:", case3_desc)
    print("Judgement:", case3_judge)
    outcome, confidence = predict_case_outcome(case3_desc, case3_judge)
    if outcome:
        print(f"Predicted winner: {outcome}")
        print(f"Confidence: {confidence:.2%}")

if __name__ == "__main__":
    print("Testing Legal Case Prediction Model...")
    test_model() 