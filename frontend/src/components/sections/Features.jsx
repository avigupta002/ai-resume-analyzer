import { motion } from "framer-motion";

const FEATURES = [
  {
    title: "AI Skill Matching",
    description:
      "Automatically match candidate skills against job requirements with high accuracy."
  },
  {
    title: "Resume Upload",
    description:
      "Upload PDF, DOCX, or paste resume text for instant analysis."
  },
  {
    title: "Smart Scoring",
    description:
      "Get a clear match score and skill breakdown in seconds."
  },
  {
    title: "Fast & Secure",
    description:
      "Optimized for speed with secure data handling."
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Powerful Features
          </h2>
          <p className="text-gray-600">
            Everything you need to screen resumes faster and smarter.
          </p>
        </div>

        {/* Feature cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition"
            >
              <div className="mb-4 text-xl font-bold text-black">
                {feature.title}
              </div>

              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}