import React, { useState, useEffect } from 'react';
import { Menu, X, Rocket, LogOut, User } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login status on component load
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user'); // Clear user data
    localStorage.removeItem('access'); // Clear tokens if using JWT
    setIsLoggedIn(false);
    navigate('/login'); // Redirect to login
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <Rocket className="text-indigo-600" size={28} />
            <span className="text-xl font-bold tracking-tight">StudentHub</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-600 font-medium hover:text-indigo-600 transition">Home</Link>
            <Link to="/projects" className="text-gray-600 font-medium hover:text-indigo-600 transition">Projects</Link>
            <Link to="/discuss" className="text-gray-600 font-medium hover:text-indigo-600 transition">Discussions</Link>

            {/* CONDITIONAL RENDERING STARTS HERE */}
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link to="/profile" className="flex items-center gap-1 text-gray-600 font-medium hover:text-indigo-600">
                  <User size={18} /> Profile
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full font-semibold hover:bg-red-100 transition"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            ) : (
              <Link to="/accounts/signup" className="bg-indigo-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-indigo-700 transition shadow-lg shadow-indigo-100">
                Get Started
              </Link>
            )}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 p-4 space-y-4 shadow-xl">
          <Link to="/projects" className="block text-gray-600 font-medium">Projects</Link>
          <Link to="/discuss" className="block text-gray-600 font-medium">Discussions</Link>
          
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="block text-gray-600 font-medium">Profile</Link>
              <button onClick={handleLogout} className="w-full text-left text-red-600 font-bold">Logout</button>
            </>
          ) : (
            <Link to="/accounts/signup" className="block w-full bg-indigo-600 text-white px-5 py-3 rounded-xl text-center font-semibold">
              Get Started
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;