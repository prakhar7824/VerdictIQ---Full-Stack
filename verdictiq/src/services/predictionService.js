import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_PREDICTION_API_URL || 'http://localhost:8001';

export const predictOutcome = async (caseDetails) => {
  try {
    const formData = new FormData();
    formData.append('case_description', caseDetails.text || caseDetails);

    const response = await axios.post(
      `${API_BASE_URL}/predict-outcome`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return {
      prediction: response.data.predicted_winner,
      confidence: response.data.confidence
    };
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.detail || 'Prediction failed');
    }
    throw new Error('Network error occurred while predicting case outcome');
  }
}; 