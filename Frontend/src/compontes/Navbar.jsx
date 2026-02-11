import React, { useState, useEffect } from "react";
import { Menu, X, Rocket, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  // Check auth status
  const checkAuth = () => {
    const token = localStorage.getItem("access");
    setIsLoggedIn(!!token);
  };

  useEffect(() => {
    checkAuth();

    // Listen for login/logout in other tabs
    window.addEventListener("storage", checkAuth);

    return () => {
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");

    setIsLoggedIn(false);

    navigate("/accounts/login");
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex justify-between h-16 items-center">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2">
            <Rocket className="text-indigo-600" size={28} />
            <span className="text-xl font-bold">
              StudentHub
            </span>
          </Link>

          {/* DESKTOP */}
          <div className="hidden md:flex items-center gap-8">

            <Link to="/" className="nav-link">Home</Link>
            <Link to="/projects" className="nav-link">Projects</Link>
            <Link to="/mentors" className="nav-link">Mentors</Link>
            <Link to="/premium" className="nav-link">Premium</Link>

            {isLoggedIn ? (

              <div className="flex items-center gap-4">

                <Link
                  to="/profile"
                  className="flex items-center gap-1 text-gray-600 hover:text-indigo-600"
                >
                  <User size={18} />
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-full font-semibold hover:bg-red-100"
                >
                  <LogOut size={18} />
                  Logout
                </button>

              </div>

            ) : (

              <Link
                to="/accounts/signup"
                className="bg-indigo-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-indigo-700 shadow"
              >
                Get Started
              </Link>

            )}

          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-600"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (

        <div className="md:hidden bg-white border-t p-4 space-y-4 shadow-lg">

          <Link to="/" className="mobile-link">Home</Link>
          <Link to="/projects" className="mobile-link">Projects</Link>
          <Link to="/mentors" className="mobile-link">Mentors</Link>
          <Link to="/premium" className="mobile-link">Premium</Link>

          {isLoggedIn ? (

            <>
              <Link to="/profile" className="mobile-link">
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="w-full text-left text-red-600 font-bold"
              >
                Logout
              </button>
            </>

          ) : (

            <Link
              to="/accounts/signup"
              className="block w-full bg-indigo-600 text-white py-3 rounded-xl text-center font-semibold"
            >
              Get Started
            </Link>

          )}

        </div>

      )}

    </nav>
  );
};

export default Navbar;
