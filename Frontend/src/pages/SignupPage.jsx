import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { User, Mail, Lock, Code, ArrowRight, Check } from 'lucide-react';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    major: '',
    primary_skill: ''
  });

const handleSubmit = async (e) => {
  e.preventDefault();

  // Ensure keys match exactly what the RegisterSerializer expects
  const signupData = {
    full_name: formData.full_name,
    email: formData.email,
    password: formData.password,
    primary_skill: formData.primary_skill,
  };

  try {
    const response = await fetch(
      "http://localhost:8000/accounts/signup/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      }
    );

    if (response.ok) {
      // SUCCESS: Status 201 Created
      console.log("Signup successful!");
      alert("Account created! Redirecting to login...");
      navigate("/accounts/login"); // This sends the user back to login
    } else {
      // FAILURE: Status 400 or other
      const errorData = await response.json();
      console.error("Signup failed:", errorData);
      alert("Error: " + JSON.stringify(errorData));
    }
  } catch (error) {
    console.error("Network error:", error);
    alert("Could not connect to the server.");
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-lg w-full bg-white rounded-3xl shadow-xl shadow-indigo-100 border border-gray-100 p-8"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-gray-900">Create Account</h2>
          <p className="text-gray-500 mt-2">Join thousands of students building together.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
                placeholder="John Doe"
                onChange={(e) => setFormData({...formData, full_name: e.target.value})}
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">University Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="email" 
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
                placeholder="john@university.edu"
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Primary Skill */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Primary Skill</label>
              <div className="relative">
                <Code className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <select 
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none appearance-none"
                  onChange={(e) => setFormData({...formData, primary_skill: e.target.value})}
                >
                  <option value="React">React</option>
                  <option value="Python">Python</option>
                  <option value="Java">Java</option>
                  <option value="C++">C++</option>
                </select>
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="password" 
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition"
                  placeholder="••••••••"
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start gap-3 mt-4">
            <div className="flex items-center h-5">
              <input type="checkbox" required className="w-4 h-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500" />
            </div>
            <label className="text-xs text-gray-500 leading-normal">
              I agree to the <span className="text-indigo-600 font-bold">Terms of Service</span> and <span className="text-indigo-600 font-bold">Privacy Policy</span>.
            </label>
          </div>

          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 active:scale-95"
          >
            Create Account <ArrowRight size={18} />
          </button>
        </form>

        <p className="text-center mt-8 text-sm text-gray-500">
          Already have an account? <button onClick={() => navigate("/accounts/login")} className="text-indigo-600 font-bold hover:underline">Log in</button>
        </p>
      </motion.div>
    </div>
  );
};

export default SignupPage;