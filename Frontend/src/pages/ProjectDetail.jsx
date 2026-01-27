import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Send, Users, Code } from "lucide-react";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // In a real app, you'd fetch this from an API using the ID
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState([
    { id: 1, user: "Sarah", text: "This looks awesome! Do you need a designer?", date: "2h ago" },
    { id: 2, user: "Mike", text: "I have experience with Python/Django, would love to help.", date: "1h ago" },
  ]);

  // Mock data - usually fetched based on 'id'
  const project = {
    id: id,
    title: id === "1" ? "AI Resume Analyzer" : id === "2" ? "Campus Event Platform" : "Study Group Matcher",
    description: "Building an AI tool that reviews resumes and suggests improvements using NLP and modern web frameworks.",
    owner: "Alex",
    tech: ["Python", "Django", "React"],
  };

  const handleAddComment = (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    
    const newComment = {
      id: comments.length + 1,
      user: "You", // Mocking current user
      text: commentText,
      date: "Just now"
    };
    
    setComments([...comments, newComment]);
    setCommentText("");
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 mb-6 transition"
        >
          <ArrowLeft size={20} /> Back to Projects
        </button>

        {/* Project Details */}
        <div className="bg-white rounded-2xl border shadow-sm p-8 mb-8">
          <div className="flex justify-between items-start mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
            <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
              Active
            </span>
          </div>

          <p className="text-gray-600 text-lg mb-6 leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-3 mb-8">
            {project.tech.map((t) => (
              <span key={t} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-md text-sm font-semibold">
                {t}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
            <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center text-white font-bold">
              {project.owner[0]}
            </div>
            <div>
              <p className="text-sm font-bold text-gray-900">{project.owner}</p>
              <p className="text-xs text-gray-500">Project Lead</p>
            </div>
          </div>
        </div>

        {/* Discussion Section */}
        <div className="bg-white rounded-2xl border shadow-sm p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Discussion ({comments.length})</h3>
          
          {/* Comment Input */}
          <form onSubmit={handleAddComment} className="mb-8">
            <div className="relative">
              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                placeholder="Ask a question or offer to help..."
                className="w-full border rounded-xl p-4 pr-12 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition"
                rows="3"
              />
              <button 
                type="submit"
                className="absolute bottom-4 right-4 bg-indigo-600 text-white p-2 rounded-lg hover:bg-indigo-700 transition"
              >
                <Send size={18} />
              </button>
            </div>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {comments.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex-shrink-0" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">{comment.user}</span>
                    <span className="text-xs text-gray-400">{comment.date}</span>
                  </div>
                  <p className="text-gray-600 mt-1">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;