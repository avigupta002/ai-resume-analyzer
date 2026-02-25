from PyPDF2 import PdfReader
import docx

def read_pdf(file):
    return " ".join(p.extract_text() or "" for p in PdfReader(file).pages)

def read_docx(file):
    doc = docx.Document(file)
    return " ".join(p.text for p in doc.paragraphs)