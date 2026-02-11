import { motion } from "framer-motion";
import { Users, Star, MessageSquare, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Navbar from "../compontes/Navbar.jsx";
import Footer from "../compontes/Footer.jsx";
import { useState, useEffect } from "react";

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const MentorsPage = () => {
  const navigate = useNavigate();

  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/mentors/")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch mentors");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Mentors List:", data);
        setMentors(data.results || data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

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
          <h1 className="text-6xl font-black mb-6">
            Learn from <span className="text-indigo-600">Real Mentors.</span>
          </h1>
          <p className="text-xl text-gray-600">Connect with experienced professionals in your field</p>
        </motion.div>
      </section>

      {/* GRID */}
      <section className="py-24 bg-gray-900 text-white px-6">
        <div className="max-w-7xl mx-auto">

          <h2 className="text-4xl font-bold mb-12">Top Mentors</h2>

          {loading && <p>Loading mentors...</p>}

          <div className="grid md:grid-cols-3 gap-8">

            {mentors.map((mentor) => (

              <motion.div
                key={mentor.id} // REAL ID
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-indigo-500 transition"
              >

                <h3 className="text-2xl font-bold mb-2">
                  {mentor.name}
                </h3>

                <p className="text-indigo-400 mb-2">
                  {mentor.role}
                </p>

                <p className="text-gray-400 mb-4">
                  {mentor.skills}
                </p>

                <div className="flex justify-between items-center text-sm">

                  <span className="flex items-center gap-1">
                    <Star size={14} /> {mentor.rating}
                  </span>

                  {/* CORRECT NAVIGATION */}
                  <span
                    onClick={() =>
                      navigate(`/mentor/${mentor.id}`)
                    }
                    className="text-indigo-400 font-bold cursor-pointer hover:underline"
                  >
                    View Profile →
                  </span>

                </div>

              </motion.div>

            ))}

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MentorsPage;
