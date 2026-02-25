import { useState } from "react";
import data from "../data/data";


export default function SkillInput({ skills, setSkills }) {
  const [value, setValue] = useState("");

  function addSkill(skill) {
    const clean = skill.trim();
    if (!clean || skills.includes(clean)) return;
    setSkills([...skills, clean]);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill(value);
      setValue("");
    }
  }

  function removeSkill(skill) {
    setSkills(skills.filter(s => s !== skill));
  }

  function applyPreset(presetSkills) {
    const merged = [...new Set([...skills, ...presetSkills])];
    setSkills(merged);
  }

  const presets = data.skillPresets;

  return (
    <div className="mt-6">
      {/* Label */}
      <label className="block text-xs tracking-widest text-gray-500 mb-3">
        REQUIRED SKILLS <span className="text-red-500">*</span>
      </label>

      <div className="flex flex-wrap gap-2 mb-3">
        {skills.map(skill => (
          <span
            key={skill}
            className="flex items-center gap-2 bg-black text-white px-3 py-1 rounded text-sm"
          >
            {skill}
            <button
              onClick={() => removeSkill(skill)}
              className="text-gray-300 hover:text-white"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      {/* Input */}
      <input
        className="w-full border rounded px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-black"
        placeholder="Type a skill + Enter (e.g. React, Python, SQL...)"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      {/* Quick presets */}
      <div className="mt-4">
        <p className="text-xs tracking-widest text-gray-500 mb-2">
          QUICK PRESETS:
        </p>

        <div className="flex flex-wrap gap-2">
          {Object.entries(presets).map(([label, presetSkills]) => (
            <button
              key={label}
              onClick={() => applyPreset(presetSkills)}
              className="px-3 py-1 text-sm border rounded-full text-gray-600 hover:bg-gray-100"
            >
              {label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}