import { motion } from "framer-motion";

export default function Results({ data, onReset }) {
  if (!data) return null;

  const pass = data.decision === "PASS";

  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-2xl mx-auto bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-gray-200"
    >
      {/* Score Section */}
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between"
      >
        <div>
          <motion.h2
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-4xl font-bold text-gray-800"
          >
            {data.score}
            <span className="text-lg font-medium text-gray-500"> /100</span>
          </motion.h2>

          <p className="text-sm text-gray-500 mt-1">
            Overall Match Score
          </p>
        </div>

        <span
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            pass
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {data.decision}
        </span>
      </motion.div>

      {/* Skill Match */}
      <motion.div variants={itemVariants} className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Skill Match
        </h3>

        <div className="space-y-2">
          {data.skillMatches?.map((s) => (
            <motion.div
              key={s.skill}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-lg border"
            >
              <span className="font-medium text-gray-700">
                {s.skill}
              </span>

              <span
                className={`text-sm font-semibold ${
                  s.status === "Matched"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {s.status}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Suggestions */}
      <motion.div variants={itemVariants} className="mt-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Resume Improvement Suggestions
        </h3>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <ul className="space-y-2 text-gray-700 text-sm">
            {data.suggestions?.map((s, i) => (
              <motion.li
                key={i}
                variants={itemVariants}
                className="flex items-start gap-2"
              >
                <span className="text-blue-600 font-bold">•</span>
                <span>{s}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>

      {/* Button */}
      <motion.button
        onClick={onReset}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="mt-8 w-full bg-black text-white py-3 rounded-xl font-semibold transition"
      >
        Analyze Another Resume
      </motion.button>
    </motion.div>
  );
}