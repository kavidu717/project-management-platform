import { Link } from "react-router-dom";
import { FiMail, FiSend } from "react-icons/fi";
import { useState } from "react";
import { forgotPassword } from "../api/auth.api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setError("");
    setLoading(true);

    try {
      const res = await forgotPassword({ email });
      setMessage(res.data?.message || "Reset link sent successfully");
      setEmail("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset link");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 via-white to-amber-100 px-4 py-12">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl shadow-amber-200/50 ring-1 ring-amber-100">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-amber-900">
            Forgot Password
          </h1>
          <p className="mt-3 text-slate-500">
            Enter your email and we will send you a reset link
          </p>
        </div>

        <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Email Address
            </label>
            <div className="flex items-center rounded-2xl border border-amber-200 bg-amber-50 px-4 focus-within:border-amber-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-amber-500/10">
              <FiMail className="mr-3 text-lg text-amber-600" />
              <input
                type="email"
                placeholder="name@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent py-4 text-slate-900 placeholder-slate-400 outline-none"
              />
            </div>
          </div>

          {message && <p className="text-sm font-medium text-green-600">{message}</p>}
          {error && <p className="text-sm font-medium text-red-600">{error}</p>}

          <button
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-600 py-4 font-bold text-white hover:bg-amber-700 disabled:opacity-70"
          >
            <FiSend className="text-lg" />
            <span>{loading ? "Sending..." : "Send Reset Link"}</span>
          </button>
        </form>

        <p className="mt-8 text-center text-sm text-slate-600">
          Back to{" "}
          <Link
            to="/login"
            className="font-bold text-amber-700 hover:text-amber-800 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}