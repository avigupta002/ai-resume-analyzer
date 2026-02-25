import joblib
from ml.skill_matcher import match_skills

model = joblib.load("model/resume_classifier.pkl")

def analyze_resume(text: str, skills: list):
    role = model.predict([text])[0]
    confidence = max(model.predict_proba([text])[0]) * 100

    skill_result = match_skills(text, skills)

    final_score = (skill_result["match_percentage"] * 0.7) + (confidence * 0.3)

    return {
        "predicted_role": role,
        "ml_confidence": round(confidence, 2),
        "skill_match": skill_result,
        "final_score": round(final_score, 2),
        "status": "PASS" if final_score >= 60 else "REJECT"
    }