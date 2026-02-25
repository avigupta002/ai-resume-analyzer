import re

def match_skills(resume_text: str, required_skills: list):
    tokens = set(re.findall(r"[a-zA-Z+#.]+", resume_text.lower()))
    required = [s.lower() for s in required_skills]

    matched = [s for s in required if s in tokens]
    missing = [s for s in required if s not in tokens]

    score = (len(matched) / len(required)) * 100 if required else 0

    return {
        "matched_skills": matched,
        "missing_skills": missing,
        "match_percentage": round(score, 2)
    }