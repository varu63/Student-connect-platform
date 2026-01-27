import  { useState } from "react";
import { Users, MessageCircle, Code } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Footer from "../compontes/Footer";
import Navbar from "../compontes/Navbar";

const ProjectsDiscuss = () => {
  const navigate = useNavigate();

  const [projects] = useState([
    {
      id: 1,
      title: "AI Resume Analyzer",
      description:
        "Building an AI tool that reviews resumes and suggests improvements.",
      tech: ["Python", "Django", "React"],
      owner: "Alex",
      interested: 5,
      comments: 3,
    },
    {
      id: 2,
      title: "Campus Event Platform",
      description:
        "A platform for students to discover and organize college events.",
      tech: ["Next.js", "Node.js", "MongoDB"],
      owner: "Sam",
      interested: 8,
      comments: 6,
    },
    {
      id: 3,
      title: "Study Group Matcher",
      description:
        "Match students with similar subjects and availability.",
      tech: ["React", "Firebase"],
      owner: "Varun",
      interested: 12,
      comments: 9,
    },
  ]);

  return (

    <div className="min-h-screen bg-gray-50 pt-20 px-4">
      <Navbar/>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Project Discussions
          </h1>
          <p className="text-gray-500">
            Share your project idea and find collaborators.
          </p>
        </div>

        {/* Project Cards */}
        <div className="space-y-5">
          {projects.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-xl border shadow-sm p-6 hover:shadow transition"
            >
              <h2 className="text-xl font-semibold text-gray-900">
                {p.title}
              </h2>

              <p className="text-gray-600 mt-2">
                {p.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-3">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="bg-indigo-100 text-indigo-600 px-2 py-1 rounded text-xs font-semibold"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="flex justify-between items-center mt-4">
                <div className="flex gap-6 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Users size={16} /> {p.interested} interested
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle size={16} /> {p.comments} comments
                  </span>
                  <span className="flex items-center gap-1">
                    <Code size={16} /> by {p.owner}
                  </span>
                </div>

                <button
                  onClick={() => navigate(`/discuss/${p.id}`)}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700"
                >
                  Join Discussion
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
      <Footer/>
    </div>
  );
};

export default ProjectsDiscuss;
