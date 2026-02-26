from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import json
import os
from dotenv import load_dotenv

from ml.skill_matcher import match_skills
from utils.file_reader import read_pdf, read_docx
from utils.ai_resume_improver import improve_resume

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY is not set")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze(
    file: UploadFile = File(None),
    resume_text: str = Form(""),
    required_skills: str = Form(...)
):
    skills = json.loads(required_skills)

    # Extract resume text
    if file:
        if file.filename.endswith(".pdf"):
            resume_text = read_pdf(file.file)
        elif file.filename.endswith(".docx"):
            resume_text = read_docx(file.file)
        else:
            resume_text = (await file.read()).decode()

    result = match_skills(resume_text, skills)

    
    ai_suggestions = improve_resume(
        resume_text=resume_text,
        missing_skills=result["missing_skills"]
    )

    return {
        "score": result["match_percentage"],
        "decision": "PASS" if result["match_percentage"] >= 60 else "REJECT",
        "skillMatches": (
            [{"skill": s, "status": "Matched"} for s in result["matched_skills"]] +
            [{"skill": s, "status": "Missing"} for s in result["missing_skills"]]
        ),
        "suggestions": ai_suggestions
    }