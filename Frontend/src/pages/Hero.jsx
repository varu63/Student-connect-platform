import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  CheckCircle,
  Users,
  MessageSquare,
  Rocket,
  Zap,
} from "lucide-react";

import Navbar from "../compontes/Navbar.jsx";
import Footer from "../compontes/Footer.jsx";
import StudentImg from "../assets/std2.jpg";
// change name if needed

// Animation
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function LandingPage() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  // Check login status
  const isLoggedIn = () => {
    return !!localStorage.getItem("access");
  };

  // Simulate backend check (optional)
  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="bg-white text-gray-900 overflow-x-hidden">
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 to-white px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          variants={fadeIn}
          className="text-center max-w-4xl"
        >
          <h1 className="text-5xl md:text-7xl font-black mb-6">
            Build Projects with{" "}
            <span className="text-indigo-600">Impact.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 mb-10">
            Find teammates, collaborate, and build real products.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* MAIN CTA */}
            <button
              onClick={() => {
                if (isLoggedIn()) {
                  navigate("/premium");
                } else {
                  navigate("/accounts/signup");
                }
              }}
              className="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold hover:bg-indigo-700 transition shadow"
            >
              {isLoggedIn() ? "Go to Premium" : "Get Started"}
            </button>

            <button
              onClick={() => navigate("/projects")}
              className="border border-gray-300 px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition"
            >
              View Projects
            </button>

            <button
              onClick={() => navigate("/mentors")}
              className="border border-gray-300 px-8 py-4 rounded-full font-bold hover:bg-gray-50 transition"
            >
              Find Mentors
            </button>
          </div>
        </motion.div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            variants={fadeIn}
          >
            <h2 className="text-4xl font-bold mb-6">
              Why StudentConnect?
            </h2>

            <p className="text-lg text-gray-600 mb-6">
              We help students find serious teammates — not time
              wasters.
            </p>

            <ul className="space-y-4">
              {[
                "Verified Profiles",
                "Real-time Discussions",
                "Skill Matching",
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 font-medium"
                >
                  <CheckCircle className="text-green-500" />
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-3xl shadow-2xl p-6 flex items-center justify-center"
    >
      <img
        src={StudentImg}   // <-- Put your image path here
        alt="Students Working"
        className="w-full h-80 object-cover rounded-2xl"
      />
    </motion.div>
        </div>
      </section>

      {/* ================= PROJECTS ================= */}
      <section className="py-24 bg-gray-900 text-white px-6">
        <div className="max-w-7xl mx-auto">

          <div className="mb-16 text-center md:text-left">
            <h2 className="text-4xl font-bold mb-4">
              Trending Projects
            </h2>
            <p className="text-gray-400">
              Join active teams today.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">

            {[1, 2, 3].map((item) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: item * 0.2 }}
                className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-indigo-500 transition cursor-pointer"
              >
                <div className="bg-indigo-600 w-12 h-12 rounded-lg mb-6 flex items-center justify-center">
                  <Rocket size={24} />
                </div>

                <h3 className="text-xl font-bold mb-3">
                  AI Study Planner
                </h3>

                <p className="text-gray-400 mb-6">
                  Need React + Python developers for smart
                  scheduling.
                </p>

                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center gap-2">
                    <MessageSquare size={16} /> 12 Replies
                  </span>

                  <span className="text-indigo-400 font-bold">
                    Join →
                  </span>
                </div>
              </motion.div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">

          <h2 className="text-4xl font-bold mb-4">
            Premium Plans
          </h2>

          <p className="text-gray-600 mb-16">
            Upgrade for serious builders.
          </p>

          <div className="grid md:grid-cols-2 gap-8">

            {/* FREE */}
            <div className="p-10 border rounded-3xl hover:shadow transition">

              <h3 className="text-2xl font-bold mb-2">
                Student
              </h3>

              <div className="text-4xl font-black mb-6">
                ₹0
                <span className="text-lg text-gray-500">
                  /mo
                </span>
              </div>

              <ul className="text-left space-y-4 mb-10">
                <li className="flex gap-2 text-gray-600">
                  <CheckCircle size={18} />
                  Unlimited Projects
                </li>

                <li className="flex gap-2 text-gray-600">
                  <CheckCircle size={18} />
                  Discussions
                </li>
              </ul>

              <button className="w-full py-3 border border-indigo-600 text-indigo-600 font-bold rounded-xl">
                Current Plan
              </button>
            </div>

            {/* PRO */}
            <motion.div
              whileHover={{ y: -10 }}
              className="p-10 bg-indigo-600 text-white rounded-3xl shadow-xl relative"
            >
              <div className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full flex gap-1">
                <Zap size={12} /> POPULAR
              </div>

              <h3 className="text-2xl font-bold mb-2">
                Pro Builder
              </h3>

              <div className="text-4xl font-black mb-6">
                ₹299
                <span className="text-lg opacity-70">
                  /mo
                </span>
              </div>

              <ul className="text-left space-y-4 mb-10">
                <li className="flex gap-2">
                  <CheckCircle size={18} />
                  Featured Projects
                </li>

                <li className="flex gap-2">
                  <CheckCircle size={18} />
                  Priority Match
                </li>

                <li className="flex gap-2">
                  <CheckCircle size={18} />
                  Portfolio Domain
                </li>
              </ul>

              <button className="w-full py-3 bg-white text-indigo-600 font-bold rounded-xl">
                Upgrade
              </button>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
