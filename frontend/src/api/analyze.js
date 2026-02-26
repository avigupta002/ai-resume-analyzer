export async function analyzeResume({ file, resume_text, required_skills }) {
  const formData = new FormData();

  if (file) {
    formData.append("file", file);
  }

  formData.append("file", file)
  formData.append("resume_text", resume_text || "");
  formData.append("required_skills", JSON.stringify(required_skills));

  const res = await fetch("https://ai-resume-analyzer-1-ow4o.onrender.com/analyze", {
    method: "POST",
    body: formData, 
  });

  if (!res.ok) {
    throw new Error("Analysis failed");
  }

  return res.json();
}