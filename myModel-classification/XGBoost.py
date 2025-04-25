import pandas as pd
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.metrics import classification_report
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.preprocessing import LabelEncoder

# Load data
df = pd.read_csv('legal_case_data.csv')

# Strip spaces from case types
df['case_type'] = df['case_type'].str.strip()

# Split data into X (features) and y (labels)
X = df['case_description']
y = df['case_type']

# Encode the case_type labels as numbers
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

# Text vectorization
vectorizer = TfidfVectorizer(stop_words='english')
X_vec = vectorizer.fit_transform(X)

# Split data into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X_vec, y_encoded, test_size=0.2, random_state=42)

# Initialize and train XGBoost model without scale_pos_weight
model = xgb.XGBClassifier(objective='multi:softmax', num_class=6)  # Adjust num_class based on unique labels
model.fit(X_train, y_train)

# Predict on the test set
y_pred = model.predict(X_test)

# Print classification report
print("XGBoost Classification Report:")
print(classification_report(y_test, y_pred, target_names=label_encoder.classes_, zero_division=1))
