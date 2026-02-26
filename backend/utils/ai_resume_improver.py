from openai import OpenAI
import os

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def improve_resume(resume_text: str, required_skills: list[str]):
    prompt = f"""
You are an ATS resume expert.

Resume:
{resume_text}

Required Skills:
{", ".join(required_skills)}

Tasks:
1. Suggest improvements to increase ATS score
2. Identify missing skills and how to add them
3. Improve wording using strong action verbs
4. Suggest quantified achievements
5. Keep suggestions concise and practical

Return bullet points only.
"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.4
    )

    return response.choices[0].message.content.split("\n")