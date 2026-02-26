import os
from openai import OpenAI


def get_hf_client():
    token = os.getenv("HF_API_KEY")
    if not token:
        print("HF_API_KEY not found")
        return None

    return OpenAI(
        base_url="https://router.huggingface.co/v1",
        api_key=token,
    )


def improve_resume(resume_text: str, missing_skills: list[str]) -> list[str]:
    client = get_hf_client()

    # Fallback if token missing
    if not client:
        return ["AI suggestions unavailable (HF token not set)."]

    # Fallback if no missing skills
    if not missing_skills:
        return ["Resume matches most required skills. Add measurable achievements to strengthen impact."]

    prompt = f"""
You are an ATS resume expert.

Resume:
{resume_text}

Missing skills:
{', '.join(missing_skills)}

Give 6-8 specific, actionable resume improvement suggestions.
Return each suggestion on a new line.
Do NOT return paragraph text.
"""

    try:
        response = client.chat.completions.create(
            model="zai-org/GLM-5:novita",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.4,
            max_tokens=300,
        )

        # Safely extract content
        text = response.choices[0].message.content if response.choices else ""

        if not text:
            return [
                f"Add experience with {skill}."
                for skill in missing_skills
            ]

        # Convert response into clean list
        lines = [
            line.strip().lstrip("-• ").strip()
            for line in text.split("\n")
            if line.strip()
        ]

        # If model returned paragraph instead of bullets
        if len(lines) == 1:
            lines = [
                f"Add experience with {skill}."
                for skill in missing_skills
            ]

        return lines

    except Exception as e:
        print("AI ERROR:", e)

        return [
            f"Add experience with {skill}."
            for skill in missing_skills
        ]