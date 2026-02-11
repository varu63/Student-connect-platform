import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
  });

  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Load existing data
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
      .then((res) => res.json())
      .then((data) => {
        setForm({
          first_name: data.first_name || "",
          last_name: data.last_name || "",
          email: data.email || "",
        });

        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("access");

    const res = await fetch(
      "http://localhost:8000/accounts/update/",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      }
    );

    if (res.ok) {
      alert("Profile Updated");
      navigate("/profile");
    } else {
      alert("Update Failed");
    }
  };

  if (loading) {
    return <div className="pt-24 text-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 px-4">

      <form
        onSubmit={handleSubmit}
        className="max-w-xl mx-auto bg-white p-8 rounded-xl shadow space-y-4"
      >

        <h1 className="text-2xl font-bold text-center mb-4">
          Edit Profile
        </h1>

        <Input
          label="First Name"
          name="first_name"
          value={form.first_name}
          onChange={handleChange}
        />

        <Input
          label="Last Name"
          name="last_name"
          value={form.last_name}
          onChange={handleChange}
        />

        <Input
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700"
        >
          Save Changes
        </button>

      </form>
    </div>
  );
}

function Input({ label, ...props }) {
  return (
    <div>
      <label className="text-sm text-gray-600">{label}</label>
      <input
        {...props}
        className="w-full border px-3 py-2 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
}
