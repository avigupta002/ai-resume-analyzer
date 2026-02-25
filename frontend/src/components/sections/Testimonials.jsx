import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    quote: "TalentScan reduced our hiring time by over 60% and improved candidate quality.",
    name: "Sarah Williams",
    role: "Head of Talent, FinTech Co"
  },
  {
    quote: "The AI skill-matching is incredibly accurate. We no longer screen resumes manually.",
    name: "Daniel Rodriguez",
    role: "Engineering Manager, SaaS Startup"
  },
  {
    quote: "Simple, fast, and effective. TalentScan is now core to our hiring workflow.",
    name: "Priya Sharma",
    role: "HR Lead, Enterprise Tech"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Section header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Trusted by Hiring Teams
          </h2>
          <p className="text-gray-600">
            Companies across industries rely on TalentScan to hire faster and smarter.
          </p>
        </div>

        {/* Testimonials grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <motion.blockquote
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-gray-50 border rounded-xl p-6 shadow-sm"
            >
              <p className="text-gray-700 italic mb-6">
                “{t.quote}”
              </p>

              <div className="text-sm">
                <p className="font-semibold">{t.name}</p>
                <p className="text-gray-500">{t.role}</p>
              </div>
            </motion.blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}