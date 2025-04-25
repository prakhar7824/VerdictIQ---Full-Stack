# VerdictIQ - Legal Case Analysis System

VerdictIQ is an advanced legal case analysis system that combines machine learning with legal expertise to provide case classification and outcome prediction services.

## Features

- **Case Classification**: Automatically classify legal cases into appropriate categories
- **Outcome Prediction**: Predict potential case outcomes based on historical data
- **Document Analysis**: Process and analyze legal documents
- **User-Friendly Interface**: Modern web interface for easy interaction
- **Secure Authentication**: User registration and login system

## Project Structure

```
verdictiq/              # Frontend React application
myModel-classification/ # Classification model backend
myModel-Prediction/    # Prediction model backend
```

## Prerequisites

- Node.js (v14 or higher)
- Python (v3.8 or higher)
- npm or yarn
- Git

## Quick Start

1. **Clone the repository**
   ```bash
   git clone [repository-url]
   cd [repository-name]
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd verdictiq
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd ../myModel-classification
   pip install -r requirements.txt
   
   cd ../myModel-Prediction
   pip install -r requirements.txt
   ```

4. **Start the Application**
   - Start the frontend:
     ```bash
     cd verdictiq
     npm start
     ```
   - Start the classification backend:
     ```bash
     cd myModel-classification
     python app.py
     ```
   - Start the prediction backend:
     ```bash
     cd myModel-Prediction
     python app.py
     ```

5. **Access the Application**
   - Frontend: http://localhost:3000
   - Classification API: http://localhost:8000
   - Prediction API: http://localhost:8001

## API Endpoints

### Classification Service
- `POST /classify`: Classify legal cases
  - Input: Case details in JSON format
  - Output: Classification results

### Prediction Service
- `POST /predict`: Predict case outcomes
  - Input: Case details in JSON format
  - Output: Prediction results

## Documentation

For detailed documentation, please refer to:
- `2-description.txt`: Comprehensive project documentation
- `.gitignore`: List of files to be ignored by version control

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

For any queries or support, please contact the project maintainers. 