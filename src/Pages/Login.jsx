

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../service/api";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "employee",
  });

  const [status, setStatus] = useState({
    type: "",
    message: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setStatus({ type: "", message: "" });
    setIsLoading(true);

    try {
      const res = await api.post("/user/login", formData);

      const user = res.data.user;

      // Role validation
      if (user.role !== formData.role) {
        setStatus({
          type: "error",
          message: "Selected role is incorrect",
        });
        setIsLoading(false);
        return;
      }

      // localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", user.role);

      setStatus({
        type: "success",
        message: "Login successful! Redirecting...",
      });

      setTimeout(() => {
        if (user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/layout/desboards");
        }
      }, 500);

    } catch (error) {
      setStatus({
        type: "error",
        message:
          error.response?.data?.message ||
          "Invalid email or password",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-sky-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6">

        <div className="text-center">
          <h1 className="text-3xl font-bold text-sky-950">
            Welcome Back
          </h1>
          <p className="text-gray-500 text-sm mt-2">
            Login to continue
          </p>
        </div>

        {status.message && (
          <div
            className={`p-3 text-sm rounded-lg text-center font-medium ${status.type === "error"
              ? "bg-red-50 text-red-600"
              : "bg-green-50 text-green-600"
              }`}
          >
            {status.message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <div>
            <label className="block text-sm font-semibold mb-1">
              Email
            </label>
            <input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border p-3 rounded pr-16"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600 hover:text-blue-800"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          {/* Role Select */}
          <div>
            <label className="block text-sm font-semibold mb-1">
              Role
            </label>

            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg"
            >
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

        </form>

        <p className="text-center text-sm">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/")}
            className="text-sky-600 cursor-pointer font-medium"
          >
            Signup
          </span>
        </p>

      </div>
    </div>
  );
};

export default Login;