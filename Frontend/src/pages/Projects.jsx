import React, { useState } from 'react';
import { Search, BookOpen, Code, BarChart } from 'lucide-react';
import Navbar from '../compontes/Navbar';
import Footer from '../compontes/Footer';



const ALL_PROJECTS = [
  { id: 1, title: "AI Study Assistant", tech: "Python", difficulty: "Hard", description: "A machine learning tool to summarize lecture notes." },
  { id: 2, title: "Portfolio Builder", tech: "React", difficulty: "Easy", description: "Drag-and-drop website builder for students." },
  { id: 3, title: "Banking System", tech: "Java", difficulty: "Medium", description: "Secure backend for managing student transactions." },
  { id: 4, title: "Game Engine", tech: "C++", difficulty: "Hard", description: "Physics-based 2D engine for indie developers." },
  { id: 5, title: "Task Manager", tech: "React", difficulty: "Medium", description: "Real-time collaborative task board." },
];

const Projects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTech, setActiveTech] = useState("All");

  const technologies = ["All", "React", "Python", "Java", "C++"];

  const filteredProjects = ALL_PROJECTS.filter(project => {
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTech = activeTech === "All" || project.tech === activeTech;
    return matchesSearch && matchesTech;
  });

  // Difficulty Color Helper
  const getDifficultyColor = (level) => {
    if (level === "Easy") return "bg-green-100 text-green-700";
    if (level === "Medium") return "bg-yellow-100 text-yellow-700";
    return "bg-red-100 text-red-700";
  };

  return (
    <section className="py-20 px-6 bg-gray-50 min-h-screen">
      <Navbar/>
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
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
            {technologies.map(tech => (
              <button
                key={tech}
                onClick={() => setActiveTech(tech)}
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

        {/* --- Project Grid (The "Books") --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProjects.map(project => (
            <div 
              key={project.id}
              className="group bg-white rounded-2xl p-6 border-b-8 border-indigo-600 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
            >
              {/* Book Icon/Visual */}
              <div className="w-12 h-16 bg-indigo-50 rounded-r-lg border-l-4 border-indigo-600 mb-6 flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                <BookOpen size={24} className="text-indigo-600 group-hover:text-white" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h3>
              <p className="text-gray-500 text-sm mb-6 line-clamp-2">{project.description}</p>

              {/* Tags */}
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
            
              className="w-full mt-8 py-3 bg-gray-900 text-white rounded-xl font-bold text-sm hover:bg-indigo-600 transition">
                Read Discussion
              </button>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            No projects found matching your filters.
          </div>
        )}
      </div>
      <Footer/>
    </section>
  );
};

export default Projects;