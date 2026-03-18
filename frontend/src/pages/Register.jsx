import { Link, useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiUserPlus } from "react-icons/fi";
import { useState } from "react";
import { useAuth } from "../auth/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await register(formData);
      setSuccess("Account created successfully. Please verify your email.");
      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Register failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 via-white to-amber-100 px-4 py-12">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 shadow-2xl shadow-amber-200/50 ring-1 ring-amber-100">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-amber-900">
            Create account
          </h1>
          <p className="mt-3 text-slate-500">
            Join your project management platform
          </p>
        </div>

        <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Username
            </label>
            <div className="flex items-center rounded-2xl border border-amber-200 bg-amber-50 px-4 focus-within:border-amber-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-amber-500/10">
              <FiUser className="mr-3 text-lg text-amber-600" />
              <input
                name="username"
                type="text"
                placeholder="Enter your username"
                value={formData.username}
                onChange={handleChange}
                className="w-full bg-transparent py-4 text-slate-900 placeholder-slate-400 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email Address
            </label>
            <div className="flex items-center rounded-2xl border border-amber-200 bg-amber-50 px-4 focus-within:border-amber-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-amber-500/10">
              <FiMail className="mr-3 text-lg text-amber-600" />
              <input
                name="email"
                type="email"
                placeholder="name@company.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-transparent py-4 text-slate-900 placeholder-slate-400 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Password
            </label>
            <div className="flex items-center rounded-2xl border border-amber-200 bg-amber-50 px-4 focus-within:border-amber-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-amber-500/10">
              <FiLock className="mr-3 text-lg text-amber-600" />
              <input
                name="password"
                type="password"
                placeholder="Create password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-transparent py-4 text-slate-900 placeholder-slate-400 outline-none"
              />
            </div>
          </div>

          {error && <p className="text-sm font-medium text-red-600">{error}</p>}
          {success && (
            <p className="text-sm font-medium text-green-600">{success}</p>
          )}

          <button
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-600 py-4 font-bold text-white transition hover:bg-amber-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <FiUserPlus className="text-lg" />
            <span>{loading ? "Creating..." : "Create Account"}</span>
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-bold text-amber-700 hover:text-amber-800 hover:underline"
          >
            Sign in here
          </Link>
        </p>
      </div>
    </div>
  );
}