import { useState } from "react";
import SkillInput from "./SkillInput";
import Loader from "./Loader";
import Results from "./Results";
import { analyzeResume } from "../../api/analyze";

export default function ResumeUpload() {
  const [skills, setSkills] = useState([]);
  const [resumeText, setResumeText] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async () => {
    if (!file) {
      alert("Please upload or paste  a resume file");
      return;
    }

    if (!skills.length) {
      alert("Please add required skills");
      return;
    }
    try {
      setLoading(true);

      const skillsArray = skills;

      const data = await analyzeResume({
        file,
        resume_text: resumeText,
        required_skills: skillsArray,
      });

      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Analysis failed");
    } finally {
      setLoading(false);
    }
  };
  if (result) {
    return <Results data={result} onReset={() => setResult(null)} />;
  }

  // async function submit() {
  //   if (!file && !resumeText) return alert("Upload file or paste text");
  //   if (!skills.length) return alert("Add skills");

  //   setLoading(true);
  //   const res = await analyzeResume({
  //     file,
  //     resume_text: resumeText,
  //     required_skills: skills
  //   });
  //   setResult(res);
  //   setLoading(false);
  // }

  if (loading) return <Loader />;
  if (result) return <Results data={result} onReset={() => setResult(null)} />;

  return (
    <section id="resume" className="py-20">
      <div className="max-w-[900px] mx-auto bg-white border rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Upload Resume</h2>
        <div className="mb-6">
          <label className="block text-xs tracking-widest text-gray-500 mb-2">
            RESUME UPLOAD
          </label>

          <label
            className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-6 cursor-pointer transition
            ${file ? "border-black bg-gray-50" : "border-gray-300 hover:border-black"}
          `}
          >
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              className="hidden"
              onChange={e => {
                setFile(e.target.files[0]);
                setResumeText("");
              }}
            />

            {!file ? (
              <>
                <p className="text-sm font-medium text-gray-700">
                  Click to upload or drag & drop
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  PDF, DOCX, or TXT
                </p>
              </>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium">{file.name}</span>
                <button
                  onClick={e => {
                    e.preventDefault();
                    setFile(null);
                  }}
                  className="text-xs text-red-500 underline"
                >
                  Remove
                </button>
              </div>
            )}
          </label>
        </div>

        <div className="flex items-center my-6">
          <div className="flex-grow border-t" />
          <span className="mx-3 text-xs text-gray-400 tracking-widest">
            OR
          </span>
          <div className="flex-grow border-t" />
        </div>
        <textarea
          className="w-full border rounded p-3 my-4"
          rows="6"
          placeholder="Or paste resume text"
          value={resumeText}
          onChange={e => setResumeText(e.target.value)}
        />

        <SkillInput skills={skills} setSkills={setSkills} />

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="mt-6 w-full bg-black text-white py-2 rounded"
        >
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </div>
    </section>
  );
}