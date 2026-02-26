import os
import requests

HF_API_URL = "https://api-inference.huggingface.co/models/google/flan-t5-large"

def improve_resume(resume_text: str, missing_skills: list[str]) -> list[str]:
    api_key = os.getenv("HF_API_KEY")
    if not api_key:
        return ["AI suggestions unavailable (API key not set)."]

    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }

    prompt = f"""
You are an ATS resume expert.

Resume:
{resume_text}

Missing skills:
{', '.join(missing_skills)}

Give 5–7 clear, actionable resume improvement suggestions.
Use bullet points.
"""

    payload = {
        "inputs": prompt,
        "parameters": {
            "max_new_tokens": 200,
            "temperature": 0.4,
        },
    }

    try:
        response = requests.post(
            HF_API_URL,
            headers=headers,
            json=payload,
            timeout=30,
        )
        response.raise_for_status()
        data = response.json()
    except Exception as e:
        return [f"AI suggestion service unavailable: {str(e)}"]

    # Handle HF response safely
    if isinstance(data, list) and "generated_text" in data[0]:
        text = data[0]["generated_text"]
    elif isinstance(data, dict) and "generated_text" in data:
        text = data["generated_text"]
    else:
        return ["AI could not generate suggestions at this time."]

    return [
        line.strip("-• ")
        for line in text.split("\n")
        if line.strip()
    ]