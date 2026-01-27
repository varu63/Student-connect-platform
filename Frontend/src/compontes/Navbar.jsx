import React, { useState } from 'react';
import { Menu, X, Rocket } from 'lucide-react';
import { Link } from "react-router-dom";


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Rocket className="text-indigo-600" size={28} />
            <span className="text-xl font-bold tracking-tight">StudentHub</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/projects" className="block text-gray-600 font-medium hover:text-blue-600">
              Projects
            </Link>
            <Link to="/discuss" className="text-gray-600 hover:text-indigo-600 font-medium">Discussions</Link>
            <Link to="/signup" className="bg-indigo-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-indigo-700 transition">
              Get Started
            </Link>
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
        <div className="md:hidden bg-white border-b border-gray-100 p-4 space-y-4 shadow-lg">
          <Link to="/projects" className="block text-gray-600 font-medium hover:text-blue-600">
            Projects
          </Link>
          <Link to="/discuss" className="block text-gray-600 font-medium">Discussions</Link>
          <Link to="/signup" className="w-full bg-indigo-600 text-white px-5 py-3 rounded-xl font-semibold">
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;