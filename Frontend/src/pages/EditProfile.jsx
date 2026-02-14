import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditProfile() {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    primary_skill: "",
  });

  /* Skill Options */
  const SKILLS = [
    "",
    "React",
    "Django",
    "Python",
    "Java",
    "JavaScript",
    "Node.js",
    "Full Stack",
    "Data Science",
    "Machine Learning",
    "DevOps",
    "UI/UX",
  ];

  /* Load Profile */
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
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((data) => {

        setForm({
          full_name: data.full_name || "",
          email: data.email || "",
          primary_skill: data.primary_skill || "",
        });

        setLoading(false);
      })
      .catch(() => {
        localStorage.clear();
        navigate("/accounts/login");
      });

  }, [navigate]);

  /* Handle Input */
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* Submit */
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

  /* Loading */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center px-4">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md sm:max-w-lg bg-white p-6 sm:p-8 rounded-2xl shadow-xl space-y-5"
      >

        {/* Header */}
        <div className="text-center mb-3">
          <h1 className="text-xl sm:text-2xl font-bold">
            Edit Profile
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Update your details
          </p>
        </div>

        {/* Full Name */}
        <Input
          label="Full Name"
          name="full_name"
          value={form.full_name}
          onChange={handleChange}
        />

        {/* Email (Read Only) */}
        <Input
          label="Email"
          name="email"
          value={form.email}
          disabled
        />

        {/* Primary Skill Dropdown */}
        <Select
          label="Primary Skill"
          name="primary_skill"
          value={form.primary_skill}
          onChange={handleChange}
          options={SKILLS}
        />

        {/* Buttons */}
        <div className="pt-3 space-y-3">

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-semibold hover:bg-indigo-700 transition"
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="w-full border border-gray-400 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-50 transition"
          >
            Cancel
          </button>

        </div>

      </form>
    </div>
  );
}

/* Text Input */

function Input({ label, ...props }) {
  return (
    <div>

      <label className="text-sm font-medium text-gray-600">
        {label}
      </label>

      <input
        {...props}
        className="w-full border px-3 py-2.5 rounded-lg mt-1
        focus:outline-none focus:ring-2 focus:ring-indigo-500
        text-sm sm:text-base"
      />

    </div>
  );
}

/* Select Dropdown */

function Select({ label, options, ...props }) {
  return (
    <div>

      <label className="text-sm font-medium text-gray-600">
        {label}
      </label>

      <select
        {...props}
        className="w-full border px-3 py-2.5 rounded-lg mt-1
        bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500
        text-sm sm:text-base"
      >

        <option value="">
          Select your skill
        </option>

        {options.map((skill, index) => (
          skill && (
            <option key={index} value={skill}>
              {skill}
            </option>
          )
        ))}

      </select>

    </div>
  );
}
