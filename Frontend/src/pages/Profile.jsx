import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access");

    // If no token → kick out
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
        if (!res.ok) {
          throw new Error("Unauthorized");
        }
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
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-xl shadow p-8">

        <h1 className="text-2xl font-bold mb-6 text-center">
          My Profile
        </h1>

        <div className="space-y-4">

          <Info label="Username" value={user.username} />
          <Info label="Email" value={user.email} />
          <Info label="First Name" value={user.first_name} />
          <Info label="Last Name" value={user.last_name} />

        </div>

        <button
          onClick={() => navigate("/profile/edit")}
          className="mt-6 w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700"
        >
          Edit Profile
        </button>

      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="font-medium">{value || "-"}</p>
    </div>
  );
}
