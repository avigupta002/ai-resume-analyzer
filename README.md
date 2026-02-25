AI Resume Analyzer

An AI-powered Resume Screening and Skill Matching System built with:

Frontend: React + Axios + Tailwind CSS

Backend: FastAPI (Python)

Machine Learning: NLP-based skill matching

Dataset: Resume dataset + job skill dataset


Live Architecture
Frontend (React)
        ↓
Axios API Request
        ↓
FastAPI Backend
        ↓
NLP Skill Matching Model
        ↓
Match Score + Skill Gap Analysis


Features

Upload resume (PDF, DOCX, TXT)

Paste resume text manually

Add required job skills

AI-based skill matching

Match score percentage

Missing skill suggestions

Clean, modern Tailwind UI

REST API backend

Ready for deployment (Vercel + Render)

Project structue 

resume-project/
│
├── frontend/                 # React Application
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── backend/                  # FastAPI Backend
│   ├── main.py
│   ├── skill_matcher.py
│   ├── model.py
│   └── requirements.txt
│
└── README.md



Install Dependencies

Create requirements.txt:

fastapi
uvicorn
python-multipart
scikit-learn
pandas
numpy
nltk


pip install -r requirements.txt