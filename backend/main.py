from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from ml.skill_matcher import match_skills
from utils.file_reader import read_pdf, read_docx
import json

app = FastAPI()

# Enable CORS
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

    # Format response for frontend
    return {
        "score": result["match_percentage"],
        "decision": "PASS" if result["match_percentage"] >= 60 else "reject",
        "skillMatches": [
            {"skill": s, "status": "Matched"} for s in result["matched_skills"]
        ] + [
            {"skill": s, "status": "Missing"} for s in result["missing_skills"]
        ],
        "suggestions": [
            f"Add experience related to {s}" for s in result["missing_skills"]
        ]
    }