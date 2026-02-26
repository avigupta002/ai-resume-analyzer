import os
from openai import OpenAI

def get_hf_client():
    token = os.getenv("HF_API_KEY")
    if not token:
        return None

    return OpenAI(
        base_url="https://router.huggingface.co/v1",
        api_key=token,
    )

def improve_resume(resume_text: str, missing_skills: list[str]) -> list[str]:
    client = get_hf_client()
    if not client:
        return ["AI suggestions unavailable (HF token not set)."]

    prompt = f"""
You are an ATS resume expert.

Resume:
{resume_text}

Missing skills:
{', '.join(missing_skills)}

Give 6–8 specific, actionable resume improvement suggestions.
Use bullet points only.
Focus on increasing ATS score.
"""

    try:
        response = client.chat.completions.create(
            model="zai-org/GLM-5:novita",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.4,
            max_tokens=300,
        )
    except Exception as e:
        return ["AI suggestion service unavailable."]

    text = response.choices[0].message.content

    return [
        line.strip("-• ")
        for line in text.split("\n")
        if line.strip()
    ]