import { Link, useParams, useNavigate } from "react-router-dom";
import { FiLock, FiRefreshCw } from "react-icons/fi";
import { useState } from "react";
import { resetPassword } from "../api/auth.api";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");
    setError("");

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const res = await resetPassword(token, {
        newPassword: formData.newPassword,
      });
      setMessage(res.data?.message || "Password reset successful");

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to reset password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 via-white to-amber-100 px-4 py-12">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl shadow-amber-200/50 ring-1 ring-amber-100">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-amber-900">
            Reset Password
          </h1>
          <p className="mt-3 text-slate-500">
            Create a new password for your account
          </p>
        </div>

        <form className="mt-10 space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              New Password
            </label>
            <div className="flex items-center rounded-2xl border border-amber-200 bg-amber-50 px-4">
              <FiLock className="mr-3 text-lg text-amber-600" />
              <input
                name="newPassword"
                type="password"
                placeholder="Enter new password"
                value={formData.newPassword}
                onChange={handleChange}
                className="w-full bg-transparent py-4 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Confirm Password
            </label>
            <div className="flex items-center rounded-2xl border border-amber-200 bg-amber-50 px-4">
              <FiLock className="mr-3 text-lg text-amber-600" />
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full bg-transparent py-4 outline-none"
              />
            </div>
          </div>

          {message && <p className="text-sm font-medium text-green-600">{message}</p>}
          {error && <p className="text-sm font-medium text-red-600">{error}</p>}

          <button
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-600 py-4 font-bold text-white hover:bg-amber-700 disabled:opacity-70"
          >
            <FiRefreshCw className="text-lg" />
            <span>{loading ? "Resetting..." : "Reset Password"}</span>
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