import os
from openai import OpenAI

def improve_resume(resume_text: str, missing_skills: list[str]) -> list[str]:
    api_key = os.getenv("OPENAI_API_KEY")

    if not api_key:
        raise ValueError("OPENAI_API_KEY is not set")

    client = OpenAI(api_key=api_key)

    prompt = f"""
You are an expert ATS resume reviewer.

Resume:
{resume_text}

Missing skills:
{', '.join(missing_skills)}

Give clear, actionable resume improvement suggestions
to increase ATS score and recruiter approval.
Return bullet points only.
"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.4,
    )

    suggestions = response.choices[0].message.content.split("\n")
    return [s.strip("-• ") for s in suggestions if s.strip()]