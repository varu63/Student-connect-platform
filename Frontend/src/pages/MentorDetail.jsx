import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import {
  CheckCircle,
  Star,
  ArrowLeft,
  Briefcase,
  Globe,
  Award,
} from "lucide-react";

import Navbar from "../compontes/Navbar.jsx";
import Footer from "../compontes/Footer.jsx";

const Mentorsdetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/mentors/${id}/`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Mentor not found");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Mentor Detail:", data);
        setMentor(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load mentor");
        setLoading(false);
      });
  }, [id]);

  /* ---------------- LOADING ---------------- */

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl font-bold">
        Loading...
      </div>
    );
  }

  /* ---------------- ERROR ---------------- */

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">

        <p className="text-red-600 font-bold">
          {error}
        </p>

        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg"
        >
          Go Back
        </button>

      </div>
    );
  }

  if (!mentor) return null;

  return (
    <div className="bg-gray-50 min-h-screen">

      <Navbar />

      <main className="pt-28 pb-20 px-6 max-w-6xl mx-auto">

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-8"
        >
          <ArrowLeft size={20} /> Back
        </button>

        <div className="grid lg:grid-cols-3 gap-12">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">

            {/* PROFILE */}
            <section className="bg-white p-8 rounded-3xl border shadow-sm">

              <div className="flex gap-6 items-start">

                <div className="w-24 h-24 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 font-bold text-3xl">
                  {mentor.name?.charAt(0)}
                </div>

                <div>

                  <h1 className="text-4xl font-black mb-2">
                    {mentor.name}
                  </h1>

                  <p className="text-xl text-gray-600 mb-4">
                    {mentor.role}
                  </p>

                  <div className="flex gap-4 text-sm">

                    <span className="flex items-center gap-1 bg-yellow-50 text-yellow-700 px-3 py-1 rounded-full border">
                      <Star size={14} fill="currentColor" />
                      {mentor.rating || "N/A"}
                    </span>

                    <span className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full border">
                      <Briefcase size={14} />
                      {mentor.experience || "N/A"}
                    </span>

                  </div>

                </div>

              </div>

              <p className="mt-8 text-gray-600 text-lg">
                {mentor.bio || "No bio available."}
              </p>

            </section>

            {/* TECH */}
            <section>

              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Award className="text-indigo-600" />
                Tech Stack
              </h3>

              <div className="flex flex-wrap gap-3">

                {mentor.techStack?.map((tech) => (
                  <span
                    key={tech}
                    className="bg-white border px-4 py-2 rounded-xl"
                  >
                    {tech}
                  </span>
                ))}

              </div>

            </section>

            {/* PROJECTS */}
            <section>

              <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Globe className="text-indigo-600" />
                Projects
              </h3>

              <div className="grid md:grid-cols-2 gap-4">

                {mentor.pastProjects?.map((p, i) => (

                  <div
                    key={i}
                    className="bg-white p-6 rounded-2xl border shadow-sm"
                  >

                    <h4 className="font-bold mb-1">
                      {p.title}
                    </h4>

                    <p className="text-sm text-gray-500 mb-2">
                      {p.description}
                    </p>

                  </div>

                ))}

              </div>

            </section>

          </div>

          {/* RIGHT */}
          <div className="space-y-6">

            <h3 className="text-2xl font-bold mb-4">
              Plans
            </h3>

            {mentor.pricing?.map((plan, i) => (

              <motion.div
                whileHover={{ y: -5 }}
                key={i}
                className="p-6 rounded-3xl border bg-white shadow-lg"
              >

                <div className="flex justify-between mb-3">

                  <span className="font-bold text-gray-500 text-xs">
                    {plan.title}
                  </span>

                  <span className="font-black text-indigo-600 text-xl">
                    {plan.price}
                  </span>

                </div>

                <ul className="space-y-2 mb-6">

                  {plan.features?.map((f, j) => (

                    <li
                      key={j}
                      className="flex gap-2 text-sm"
                    >
                      <CheckCircle
                        size={14}
                        className="text-green-500"
                      />
                      {f}
                    </li>

                  ))}

                </ul>

                <button className="w-full py-3 bg-indigo-600 text-white rounded-xl">
                  Book
                </button>

              </motion.div>

            ))}

          </div>

        </div>
      </main>

      <Footer />

    </div>
  );
};

export default Mentorsdetails;
