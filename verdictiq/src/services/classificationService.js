import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8002';

export const classifyCase = async (caseDetails) => {
  try {
    const formData = new FormData();
    formData.append('case_description', caseDetails.text || caseDetails);

    const response = await axios.post(
      `${API_BASE_URL}/classify-text`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return {
      primaryCategory: response.data.prediction,
      confidence: 1.0
    };
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.detail || 'Classification failed');
    }
    throw new Error('Network error occurred while classifying the case');
  }
}; 