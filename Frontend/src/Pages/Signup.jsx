

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../service/api.js";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Employee",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending:", formData);

      const res = await api.post("/user/signup", formData);
      console.log("Response:", res.data);
      alert(res.data.message);

      navigate("/login");
    } catch (error) {
      // console.log("Full Error:", error);
      // console.log("Response:", error.response);

      setStatus({
        type: "error",
        message: error.response?.data?.message || "Server Error",
      });
    }
    try {
      const res = await api.post("/user/signup", formData);

      console.log(res)

      setStatus({
        type: "success",
        message: res.data.message,
      });

      alert(res.data.message);

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "Employee",
      });

      navigate("/login");
    } catch (error) {
      setStatus({
        type: "error",
        message: error.response?.data?.message || "Server Error",
      });
    }
  };

  return (
    <div className="w-full min-h-screen bg-sky-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">
          Create Account
        </h1>

        {status.message && (
          <div
            className={`p-3 mb-4 rounded ${status.type === "error"
              ? "bg-red-100 text-red-600"
              : "bg-green-100 text-green-600"
              }`}
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 rounded"
            required
          />

          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          >
            <option value="employee">Employee</option>
            <option value="admin">Admin</option>
          </select>



          <button
            type="submit"
            className="w-full bg-sky-600 text-white py-3 rounded hover:bg-sky-700"
          >
            Sign Up
          </button>

          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-sky-600 hover:underline cursor-pointer font-medium"
            >
              Log in
            </span>
          </p>

        </form>

      </div>
    </div>
  );
};

export default Signup;