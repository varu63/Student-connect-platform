import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";

const API = "http://localhost:8000/";

export default function ProjectDetail() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ---------------- Load Project + Comments ---------------- */

  useEffect(() => {
    loadData();
  }, [id]);

  const loadData = async () => {
  try {
    setLoading(true);

    const projectRes = await fetch(`${API}/projects/${id}/`);
    if (!projectRes.ok) throw new Error("Project not found");
    const projectData = await projectRes.json();
    setProject(projectData);

    const commentRes = await fetch(`${API}/projects/comments/?project=${id}`);
    
    // ADD THIS CHECK:
    if (!commentRes.ok) {
      console.error("Comments endpoint failed:", commentRes.status);
      setComments([]); // Set to empty array so the UI doesn't crash
      return;
    }

    const commentData = await commentRes.json();
    setComments(commentData.results || commentData || []); // Handle different API shapes

  } catch (err) {
    console.error("Detailed Error:", err);
    setError("Failed to load project");
  } finally {
    setLoading(false);
  }
};

  /* ---------------- Add Comment ---------------- */

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!commentText.trim()) return;

    try {
      const res = await fetch(`${API}/projects/comments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project: id,
          user: "Varun",   // Later: from auth
          text: commentText,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        console.error(err);
        throw new Error("Save failed");
      }

      const newComment = await res.json();

      // Add new comment on top
      setComments([newComment, ...comments]);

      setCommentText("");

    } catch (err) {
      console.error("Comment error:", err);
      alert("Comment not saved");
    }
  };

  /* ---------------- Loading ---------------- */

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  /* ---------------- Error ---------------- */

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <p className="text-red-500">{error}</p>

        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  /* ---------------- UI ---------------- */

  return (
    <div className="min-h-screen bg-gray-50 pt-20 px-4">

      <div className="max-w-3xl mx-auto">

        {/* Back */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6"
        >
          <ArrowLeft size={20} /> Back
        </button>

        {/* Project */}
        <div className="bg-white p-8 rounded-xl border mb-8">

          <h1 className="text-3xl font-bold mb-3">
            {project.title}
          </h1>

          <p className="mb-5 text-gray-600">
            {project.description}
          </p>

          {/* Tech */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech?.map((t) => (
              <span
                key={t}
                className="bg-gray-100 px-3 py-1 rounded text-sm"
              >
                {t}
              </span>
            ))}
          </div>

          <p className="text-sm text-gray-500">
            Difficulty: {project.difficulty}
          </p>

        </div>

        {/* Comments */}
        <div className="bg-white p-8 rounded-xl border">

          <h3 className="text-xl font-bold mb-5">
            Discussion ({comments.length})
          </h3>

          {/* Add */}
          <form onSubmit={handleAddComment} className="mb-6">

            <div className="relative">

              <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full border rounded-xl p-4 pr-12"
                placeholder="Write comment..."
                rows="3"
              />

              <button
                type="submit"
                className="absolute bottom-3 right-3 bg-indigo-600 text-white p-2 rounded"
              >
                <Send size={18} />
              </button>

            </div>

          </form>

          {/* List */}
          <div className="space-y-4">

            {comments.length === 0 && (
              <p className="text-gray-400">
                No comments yet.
              </p>
            )}

            {comments.map((c) => (
              <div key={c.id} className="flex gap-3">

                <div className="w-8 h-8 bg-gray-200 rounded-full" />

                <div>

                  <div className="flex gap-2 items-center">
                    <span className="font-bold">
                      {c.user}
                    </span>

                    <span className="text-xs text-gray-400">
                      {new Date(c.created_at).toLocaleString()}
                    </span>
                  </div>

                  <p className="text-gray-600">
                    {c.text}
                  </p>

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
}
