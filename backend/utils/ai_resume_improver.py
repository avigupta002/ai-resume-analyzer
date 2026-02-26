import os
import requests

HF_API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2"

def improve_resume(resume_text: str, missing_skills: list[str]) -> list[str]:
    api_key = os.getenv("HF_API_KEY")
    if not api_key:
        raise ValueError("HF_API_KEY not set")

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
            "max_new_tokens": 250,
            "temperature": 0.4,
        },
    }

    response = requests.post(HF_API_URL, headers=headers, json=payload, timeout=60)

    if response.status_code != 200:
        raise RuntimeError(f"Hugging Face error: {response.text}")

    data = response.json()

    # HF returns generated_text
    text = data[0]["generated_text"]

    return [
        line.strip("-• ")
        for line in text.split("\n")
        if line.strip()
    ]