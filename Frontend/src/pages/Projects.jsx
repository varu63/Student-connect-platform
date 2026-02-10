
import React, { useState, useEffect } from 'react';
import { Search, BookOpen, Code, BarChart, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '../compontes/Navbar';
import Footer from '../compontes/Footer';
import { useNavigate } from "react-router-dom";


const Projects = () => {
  const navigate = useNavigate();
  // State for Data
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // State for Pagination & Filtering
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrev, setHasPrev] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTech, setActiveTech] = useState("All");

  const technologies = ["All", "React", "Python", "Java", "C++"];

  // Fetch data whenever page, tech, or search changes
  useEffect(() => {
    fetchProjects();
  }, [currentPage, activeTech, searchTerm]);

  const fetchProjects = async () => {
    setLoading(true);
    try {
      // Build URL with query params for DRF
      let url = `http://localhost:8000/projects/?page=${currentPage}`;
      
      if (activeTech !== "All") {
        url += `&tech=${activeTech}`;
      }
      if (searchTerm) {
        url += `&search=${searchTerm}`;
      }

      const response = await fetch(url);
      const data = await response.json();

      // Django Rest Framework pagination returns an object with 'results'
      setProjects(data.results || []);
      setHasNext(!!data.next);
      setHasPrev(!!data.previous);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  // Difficulty Color Helper
  const getDifficultyColor = (level) => {
    if (level === "Easy") return "bg-green-100 text-green-700";
    if (level === "Medium") return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <>
    <Navbar />
    <section className="py-20 px-6 bg-gray-50 min-h-screen">
      
      <div className="max-w-7xl mx-auto">
        
        {/* --- Heading --- */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">
            Explore Project <span className="text-indigo-600">Library</span>
          </h2>
          <p className="text-gray-600 text-lg">Browse through books of innovation and find your next team.</p>
        </div>

        {/* --- Search & Filters --- */}
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center mb-12">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text"
              placeholder="Search project names..."
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition"
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to page 1 on search
              }}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
            {technologies.map(tech => (
              <button
                key={tech}
                onClick={() => {
                  setActiveTech(tech);
                  setCurrentPage(1); // Reset to page 1 on filter change
                }}
                className={`px-6 py-2 rounded-full font-semibold text-sm transition-all ${
                  activeTech === tech 
                  ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200" 
                  : "bg-white text-gray-600 border border-gray-200 hover:border-indigo-300"
                }`}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        {/* --- Project Grid --- */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {projects.map(project => (
                <div 
                  key={project.id}
                  className="group bg-white rounded-2xl p-6 border-b-8 border-indigo-600 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="w-12 h-16 bg-indigo-50 rounded-r-lg border-l-4 border-indigo-600 mb-6 flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                    <BookOpen size={24} className="text-indigo-600 group-hover:text-white" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-500 text-sm mb-6 line-clamp-2">{project.description}</p>

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-xs font-bold text-gray-400 uppercase">
                        <Code size={14} /> Tech
                      </span>
                      <span className="text-xs font-bold text-indigo-600">{project.tech}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-xs font-bold text-gray-400 uppercase">
                        <BarChart size={14} /> Difficulty
                      </span>
                      <span className={`text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider ${getDifficultyColor(project.difficulty)}`}>
                        {project.difficulty}
                      </span>
                    </div>
                  </div>

                  <button 
                    onClick={() => navigate(`/projects/${project.id}`)}
                    className="w-full mt-8 py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-indigo-600 transition">
                    Read Discussion
                  </button>
                </div>
              ))}
            </div>

            {/* --- Pagination UI --- */}
            {projects.length > 0 && (
              <div className="flex justify-center items-center gap-6 mt-16">
                <button 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={!hasPrev}
                  className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-30 transition"
                >
                  <ChevronLeft size={24} />
                </button>
                
                <span className="font-bold text-gray-700">Page {currentPage}</span>

                <button 
                  onClick={() => setCurrentPage(prev => prev + 1)}
                  disabled={!hasNext}
                  className="p-2 rounded-full border border-gray-200 bg-white hover:bg-gray-100 disabled:opacity-30 transition"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            )}
          </>
        )}

        {!loading && projects.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            No projects found matching your filters.
          </div>
        )}
      </div>
    
    </section>
      <Footer />
    </>
  );
};

export default Projects;