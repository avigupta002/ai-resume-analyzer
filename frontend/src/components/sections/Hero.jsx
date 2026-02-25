import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="pt-32 pb-28 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="max-w-6xl mx-auto px-6 text-center">

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
        >
          AI-Powered Resume Screening <br className="hidden md:block" />
          for Faster Hiring
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-gray-600 max-w-2xl mx-auto text-lg mb-10"
        >
          Instantly analyze resumes, match required skills, and identify top
          candidates with intelligent AI insights.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="flex flex-col sm:flex-row justify-center gap-4"
        >
          <a
            href="#resume"
            className="bg-black text-white px-8 py-3 rounded-md font-medium hover:bg-gray-800 transition"
          >
            Upload Resume
          </a>

          <a
            href="#features"
            className="border border-gray-300 px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition"
          >
            See Features
          </a>
        </motion.div>

        {/* Trust indicators */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-10 text-sm text-gray-500"
        >
          Trusted by hiring teams • Reduce screening time by up to 60%
        </motion.p>
      </div>
    </section>
  );
}