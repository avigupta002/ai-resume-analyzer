import pandas as pd
import joblib
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline

df = pd.read_csv("data/resume_dataset.csv")

X = df["text"]
y = df["label"]

pipeline = Pipeline([
    ("tfidf", TfidfVectorizer(stop_words="english")),
    ("clf", LogisticRegression(max_iter=1000))
])

pipeline.fit(df["text"], df["label"])

joblib.dump(pipeline, "model/resume_classifier.pkl")
print("Model trained and saved")