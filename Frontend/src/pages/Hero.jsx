import { useEffect, useState } from "react";
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { CheckCircle, Users, MessageSquare, Rocket, Zap } from 'lucide-react';
import Footer from"../compontes/Footer.jsx";
import Navbar from"../compontes/Navbar.jsx";

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};


const LandingPage = () => {
  const navigate = useNavigate();
  
   const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8000/discuss/home/")
      .then((res) => {
        if (!res.ok) throw new Error("Backend failed");
        return res.json();
      })
      .then((data) => setData(data))
      .catch((err) => setError(err.message));
  }, []);

  if (error) {
    return <p className="text-red-500">Backend error: {error}</p>;
  }

  if (!data) {
    return <p className="text-gray-500">Loading..</p>;
  }

  return (
    <div className="bg-white text-gray-900 overflow-x-hidden">
        <Navbar/>
      
      {/* --- HERO SECTION --- */}
      <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-indigo-50 to-white px-6">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="text-center max-w-4xl"
        >
          <h1 className="text-6xl md:text-7xl font-black mb-6 tracking-tight">
            Build Projects with <span className="text-indigo-600">Impact.</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10">
            The #1 platform for students to find teammates, discuss ideas, and launch real-world applications.
          </p>
          <div className="flex gap-4 justify-center">
            <button onClick = {() => navigate("/signup")} className="bg-indigo-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-indigo-700 transition shadow-xl">Get Started</button>
            <button className="bg-white border border-gray-200 px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-50 transition">View Projects</button>
          </div>
        </motion.div>
      </section>

      {/* --- ABOUT SECTION --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial="hidden" whileInView="visible" variants={fadeIn}>
            <h2 className="text-4xl font-bold mb-6">Why StudentConnect?</h2>
            <p className="text-lg text-gray-600 mb-6">
              Finding reliable teammates is the hardest part of any project. We built a space where skills meet passion.
            </p>
            <ul className="space-y-4">
              {[ "Verified Student Profiles", "Real-time Discussion Hubs", "Skill-based Matchmaking"].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-medium">
                  <CheckCircle className="text-green-500" /> {item}
                </li>
              ))}
            </ul>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="bg-indigo-100 h-80 rounded-3xl flex items-center justify-center"
          >
             <Users size={80} className="text-indigo-600 opacity-50" />
          </motion.div>
        </div>
      </section>

      {/* --- PROJECTS SHOWCASE --- */}
      <section className="py-24 bg-gray-900 text-white px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-4">Trending Projects</h2>
            <p className="text-gray-400">Join these active discussions today.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <motion.div 
                key={item}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 50 }}
                transition={{ delay: item * 0.2 }}
                className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-indigo-500 transition cursor-pointer"
              >
                <div className="bg-indigo-600 w-12 h-12 rounded-lg mb-6 flex items-center justify-center">
                  <Rocket size={24} />
                </div>
                <h3 className="text-2xl font-bold mb-3">AI Study Planner</h3>
                <p className="text-gray-400 mb-6">Looking for 2 React devs and a Python expert to help build a smart schedule generator.</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="flex items-center gap-2"><MessageSquare size={16}/> 12 Replies</span>
                  <span className="text-indigo-400 font-bold">Join →</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Premium Plans</h2>
          <p className="text-gray-600 mb-16">Supercharge your project recruitment.</p>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Free Plan */}
            <div className="p-10 border border-gray-200 rounded-3xl hover:shadow-lg transition">
              <h3 className="text-2xl font-bold mb-2">Student</h3>
              <div className="text-4xl font-black mb-6">$0<span className="text-lg text-gray-500 font-normal">/mo</span></div>
              <ul className="text-left space-y-4 mb-10">
                <li className="flex items-center gap-2 text-gray-600"><CheckCircle size={18}/> Join Unlimited Projects</li>
                <li className="flex items-center gap-2 text-gray-600"><CheckCircle size={18}/> Discussion Access</li>
              </ul>
              <button className="w-full py-3 border border-indigo-600 text-indigo-600 font-bold rounded-xl">Current Plan</button>
            </div>

            {/* Pro Plan */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="p-10 bg-indigo-600 text-white rounded-3xl shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-4 right-4 bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                <Zap size={12} fill="black"/> POPULAR
              </div>
              <h3 className="text-2xl font-bold mb-2 text-white">Pro Builder</h3>
              <div className="text-4xl font-black mb-6 text-white">$9<span className="text-lg opacity-70 font-normal">/mo</span></div>
              <ul className="text-left space-y-4 mb-10">
                <li className="flex items-center gap-2"><CheckCircle size={18}/> Featured Project Listing</li>
                <li className="flex items-center gap-2"><CheckCircle size={18}/> Priority in Matchmaking</li>
                <li className="flex items-center gap-2"><CheckCircle size={18}/> Custom Domain for Portfolio</li>
              </ul>
              <button className="w-full py-3 bg-white text-indigo-600 font-bold rounded-xl">Upgrade to Pro</button>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />

      </div>
  );
};

export default LandingPage;