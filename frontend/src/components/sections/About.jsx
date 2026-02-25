import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="py-28 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid gap-16 md:grid-cols-2 items-center">

        {/* Left: Content */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="inline-block mb-4 text-sm font-semibold tracking-widest text-gray-500">
            ABOUT TALENTSCAN
          </span>

          <h2 className="text-4xl font-bold leading-tight mb-6">
            Smarter Resume Screening with AI
          </h2>

          <p className="text-gray-600 mb-6 leading-relaxed">
            TalentScan is an AI-powered resume screening platform designed to
            help hiring teams identify the best candidates faster. By analyzing
            resumes against required skills, we eliminate manual screening,
            reduce bias, and improve hiring accuracy.
          </p>

          <p className="text-gray-600 leading-relaxed">
            Whether you are hiring for technical or non-technical roles,
            TalentScan provides clear insights, skill match scores, and
            actionable recommendations — all in seconds.
          </p>
        </motion.div>

        {/* Right: Feature highlights */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="grid gap-6"
        >
          {[
            {
              title: "Skill-Based Analysis",
              text: "Evaluate candidates purely on skills, not keywords or formatting."
            },
            {
              title: "Bias Reduction",
              text: "Standardized scoring helps minimize unconscious hiring bias."
            },
            {
              title: "Time Efficiency",
              text: "Screen hundreds of resumes in minutes instead of hours."
            }
          ].map((item, i) => (
            <div
              key={i}
              className="bg-gray-50 border rounded-xl p-6 shadow-sm"
            >
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.text}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}