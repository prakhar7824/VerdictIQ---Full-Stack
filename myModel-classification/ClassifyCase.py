import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score, classification_report
import os

# Check if the file exists
if not os.path.exists('legal_case_data.csv'):
    print("Error: The file 'legal_case_data.csv' was not found in the current directory.")
    exit()

# Load the dataset
df = pd.read_csv('legal_case_data.csv')

# Check if the CSV file has the required columns
if 'case_description' not in df.columns or 'case_type' not in df.columns:
    print("Error: The CSV file must have 'case_description' and 'case_type' columns.")
    exit()

# Split the data into features (X) and target labels (y)
X = df['case_description']
y = df['case_type']

# Split the data into training and testing sets (80% training, 20% testing)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Initialize the TF-IDF vectorizer
tfidf_vectorizer = TfidfVectorizer(stop_words='english')

# Fit and transform the training data
X_train_tfidf = tfidf_vectorizer.fit_transform(X_train)

# Transform the test data
X_test_tfidf = tfidf_vectorizer.transform(X_test)

# Initialize the Naive Bayes classifier
nb_classifier = MultinomialNB()

# Train the classifier with the training data
nb_classifier.fit(X_train_tfidf, y_train)

# Predict the labels for the test set
y_pred = nb_classifier.predict(X_test_tfidf)

# Evaluate the model's performance
print(f"Accuracy: {accuracy_score(y_test, y_pred)}")
print("Classification Report:")
print(classification_report(y_test, y_pred))

# Function to predict the type of a new case
def predict_case_type(new_case_description):
    # Transform the new case description
    new_case_tfidf = tfidf_vectorizer.transform([new_case_description])
    
    # Predict the case type
    predicted_case_type = nb_classifier.predict(new_case_tfidf)
    
    return predicted_case_type[0]

# Example usage: Predict a new case type
if __name__ == "__main__":
    new_case = input("Enter the description of a new legal case: ")
    predicted_type = predict_case_type(new_case)
    print(f"The predicted case type for the new case is: {predicted_type}")
