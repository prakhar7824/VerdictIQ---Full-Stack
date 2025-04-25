import pandas as pd
from sklearn.svm import SVC
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from sklearn.feature_extraction.text import TfidfVectorizer

# Load data
df = pd.read_csv('legal_case_data.csv')

# Split data into X (features) and y (labels)
X = df['case_description']
y = df['case_type']

# Text vectorization
vectorizer = TfidfVectorizer(stop_words='english')
X_vec = vectorizer.fit_transform(X)

# Split data into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X_vec, y, test_size=0.2, random_state=42)

# Initialize and train Support Vector Machine model
model = SVC(kernel='linear', class_weight='balanced')  # Handles class imbalance
model.fit(X_train, y_train)

# Predict on the test set
y_pred = model.predict(X_test)

# Print classification report
print("Support Vector Machine Classification Report:")
print(classification_report(y_test, y_pred, zero_division=1))
