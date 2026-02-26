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


def improve_resume(
    resume_text: str,
    missing_skills: list[str],
    job_description: str
) -> list[str]:

    client = get_hf_client()

    if not client:
        return ["AI suggestions unavailable (HF token not set)."]

    if not resume_text.strip():
        return ["Resume text is empty. Please upload a valid resume."]

    prompt = f"""
You are a professional ATS resume optimization expert.

Analyze the resume against the job description and required skills.

Resume:
{resume_text}

Job Description:
{job_description}

Missing Required Skills:
{', '.join(missing_skills) if missing_skills else "None"}

Instructions:
- Provide 6 to 8 specific, actionable suggestions.
- Align suggestions with the job description.
- Suggest how to naturally include missing skills.
- Improve ATS keyword alignment.
- Improve structure, clarity, and measurable achievements.
- Write each suggestion on a new line.
- Do NOT write paragraphs.
- Do NOT add numbering.
"""

    try:
        response = client.chat.completions.create(
            model="zai-org/GLM-5:novita",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.3,
            max_tokens=500,
        )

        content = response.choices[0].message.content if response.choices else ""

        if not content:
            raise ValueError("Empty AI response")

        # Clean output
        suggestions = [
            line.strip().lstrip("-• ").strip()
            for line in content.split("\n")
            if line.strip()
        ]

        if len(suggestions) < 3:
            raise ValueError("Low quality AI output")

        return suggestions

    except Exception as e:
        print("AI ERROR:", e)

        # Smart fallback suggestions
        fallback = []

        for skill in missing_skills:
            fallback.append(
                f"Include hands-on experience with {skill} in your projects and describe measurable results."
            )

        fallback.append(
            "Align resume keywords more closely with the job description to improve ATS matching."
        )

        fallback.append(
            "Rewrite bullet points using action verbs and quantify achievements where possible."
        )

        return fallback[:8]