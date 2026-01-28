import { motion } from "framer-motion";
import { Users, Star, MessageSquare, ArrowRight } from "lucide-react";
import Navbar from "../compontes/Navbar.jsx";
import Footer from "../compontes/Footer.jsx";

// Reuse same animation logic (consistency matters)
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const mentors = [
  {
    name: "Ananya Sharma",
    role: "Senior Frontend Engineer",
    skills: "React, Tailwind, UX",
    rating: "4.9",
  },
  {
    name: "Rahul Verma",
    role: "Backend Architect",
    skills: "Django, PostgreSQL",
    rating: "4.8",
  },
  {
    name: "Kunal Mehta",
    role: "AI Engineer",
    skills: "Python, ML, NLP",
    rating: "4.7",
  },
];

const MentorsPage = () => {
  return (
    <div className="bg-white text-gray-900 overflow-x-hidden">
      <Navbar />

      {/* HERO */}
      <section className="h-[80vh] flex items-center justify-center bg-gradient-to-b from-indigo-50 to-white px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-center max-w-4xl"
        >
          <h1 className="text-6xl md:text-7xl font-black mb-6">
            Learn from <span className="text-indigo-600">Real Mentors.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10">
            Get guidance from industry professionals who’ve already built what
            you’re trying to build.
          </p>
        </motion.div>
      </section>

      {/* WHY MENTORS */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible">
            <h2 className="text-4xl font-bold mb-6">
              Why Mentorship Matters
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Tutorials don’t build judgment. Mentors do. Avoid mistakes, get
              clarity, and ship faster.
            </p>
            <ul className="space-y-4 font-medium">
              <li className="flex items-center gap-3">
                <Users className="text-indigo-600" />
                One-on-one guidance
              </li>
              <li className="flex items-center gap-3">
                <Star className="text-indigo-600" />
                Industry-verified experts
              </li>
              <li className="flex items-center gap-3">
                <MessageSquare className="text-indigo-600" />
                Direct feedback on your projects
              </li>
            </ul>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-indigo-100 h-80 rounded-3xl flex items-center justify-center"
          >
            <Users size={90} className="text-indigo-600 opacity-50" />
          </motion.div>
        </div>
      </section>

      {/* MENTORS GRID */}
      <section className="py-24 bg-gray-900 text-white px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12">Top Mentors</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {mentors.map((mentor, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.15 }}
                className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-indigo-500 transition"
              >
                <h3 className="text-2xl font-bold mb-2">{mentor.name}</h3>
                <p className="text-indigo-400 mb-2">{mentor.role}</p>
                <p className="text-gray-400 mb-4">{mentor.skills}</p>

                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center gap-1">
                    <Star size={14} /> {mentor.rating}
                  </span>
                  <span className="text-indigo-400 font-bold cursor-pointer">
                    View Profile →
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 text-center">
        <motion.div
          variants={fadeIn}
          initial="hidden"
          whileInView="visible"
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-6">
            Ready to Level Up Faster?
          </h2>
          <p className="text-gray-600 mb-10">
            Stop guessing. Start building with expert feedback.
          </p>
          <button className="bg-indigo-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 transition shadow-xl inline-flex items-center gap-2">
            Find a Mentor <ArrowRight />
          </button>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
};

export default MentorsPage;
