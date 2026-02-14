import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access");

    if (!token) {
      navigate("/accounts/login");
      return;
    }

    fetch("http://localhost:8000/accounts/me/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        localStorage.clear();
        navigate("/accounts/login");
      });
  }, [navigate]);

  /* Loading Screen */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg font-medium">
        Loading your profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center px-4">

      {/* Main Card */}
      <div className="w-full max-w-md sm:max-w-lg bg-white rounded-2xl shadow-xl p-6 sm:p-8">

        {/* Header */}
        <div className="text-center mb-8">

          <div className="w-20 h-20 mx-auto bg-indigo-600 text-white flex items-center justify-center rounded-full text-3xl font-bold">
            {user.full_name?.charAt(0) || "U"}
          </div>

          <h1 className="text-xl sm:text-2xl font-bold mt-3">
            {user.full_name || "User"}
          </h1>

          <p className="text-gray-500 text-sm">
            {user.email}
          </p>

        </div>

        {/* Info Section */}
        <div className="space-y-4">

          <ProfileRow
            label="Primary Skill"
            value={user.primary_skill}
          />

          <ProfileRow
            label="Subscription Plan"
            value={user.plan}
          />

        </div>

        {/* Buttons */}
        <div className="mt-8 space-y-3">

          <button
            onClick={() => navigate("/profile/edit")}
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Edit Profile
          </button>

          <button
            onClick={() => {
              localStorage.clear();
              navigate("/accounts/login");
            }}
            className="w-full border border-red-500 text-red-500 py-2.5 rounded-lg font-semibold hover:bg-red-50 transition"
          >
            Logout
          </button>

        </div>

      </div>
    </div>
  );
}

/* Reusable Row */

function ProfileRow({ label, value }) {
  return (
    <div className="flex justify-between items-center border-b pb-2">

      <span className="text-gray-600 text-sm">
        {label}
      </span>

      <span className="font-medium text-gray-900 text-sm sm:text-base">
        {value || "Not set"}
      </span>

    </div>
  );
}
