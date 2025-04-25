import pandas as pd
import re
import pickle
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.metrics import accuracy_score, classification_report
from sklearn.pipeline import Pipeline
from sklearn.model_selection import cross_val_score

# Load dataset
df = pd.read_csv("legal_cases_dataset.csv")

# Combine relevant text fields for better feature extraction
df["combined_text"] = df["case_description"] + " " + df["judgements_given"]

# Function to clean text
def clean_text(text):
    text = str(text).lower()  # Convert to lowercase
    text = re.sub(r'\W', ' ', text)  # Remove special characters
    text = re.sub(r'\s+', ' ', text)  # Remove extra spaces
    return text.strip()

# Apply text cleaning
df["cleaned_text"] = df["combined_text"].apply(clean_text)

# Encode outcomes (Plaintiff = 1, Defendant = 0)
outcome_mapping = {"Plaintiff": 1, "Defendant": 0}
df["outcome_encoded"] = df["winner_party"].map(outcome_mapping)

# Create a pipeline for the model
pipeline = Pipeline([
    ('tfidf', TfidfVectorizer(max_features=5000, ngram_range=(1, 2))),
    ('clf', MultinomialNB(alpha=0.1))
])

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    df["cleaned_text"], 
    df["outcome_encoded"], 
    test_size=0.2, 
    random_state=42,
    stratify=df["outcome_encoded"]
)

# Train the model
pipeline.fit(X_train, y_train)

# Evaluate model
y_pred = pipeline.predict(X_test)
print("\nModel Performance:")
print("Accuracy:", accuracy_score(y_test, y_pred))
print("\nClassification Report:\n", classification_report(y_test, y_pred))

# Cross-validation
cv_scores = cross_val_score(pipeline, df["cleaned_text"], df["outcome_encoded"], cv=5)
print("\nCross-validation scores:", cv_scores)
print("Mean CV score:", cv_scores.mean())

# Save model components
with open("model.pkl", "wb") as model_file:
    pickle.dump(pipeline, model_file)

with open("outcome_mapping.pkl", "wb") as outcome_mapping_file:
    pickle.dump(outcome_mapping, outcome_mapping_file)

print("\n✅ Model trained and files saved successfully!")
