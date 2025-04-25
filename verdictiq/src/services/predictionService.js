import axios from 'axios';

const API_BASE_URL = 'http://localhost:8001';

export const predictOutcome = async (caseDetails) => {
  try {
    const formData = new URLSearchParams();
    formData.append('case_description', caseDetails.text || caseDetails);

    const response = await axios.post(
      `${API_BASE_URL}/predict-outcome`,
      formData,
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );

    return {
      prediction: response.data.predicted_winner,
      confidence: response.data.confidence,
      status: response.data.status
    };
  } catch (error) {
    console.error('Prediction error:', error);
    if (error.response) {
      throw new Error(error.response.data.detail || 'Prediction failed');
    }
    throw new Error('Network error occurred while predicting case outcome');
  }
}; 