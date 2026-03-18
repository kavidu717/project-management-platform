import { FiLock, FiSave } from "react-icons/fi";
import { useState } from "react";
import { changeCurrentPassword } from "../api/auth.api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    oldPassword: "",
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
      const res = await changeCurrentPassword({
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
      });

      setMessage(res.data?.message || "Password changed successfully");
      setFormData({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(err.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <Navbar />

          <main className="p-6">
            <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 shadow-sm ring-1 ring-amber-100">
              <h1 className="text-3xl font-bold text-amber-900">
                Change Password
              </h1>
              <p className="mt-2 text-slate-500">
                Update your current account password
              </p>

              <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Current Password
                  </label>
                  <div className="flex items-center rounded-2xl border border-amber-200 bg-amber-50 px-4">
                    <FiLock className="mr-3 text-lg text-amber-600" />
                    <input
                      name="oldPassword"
                      type="password"
                      value={formData.oldPassword}
                      onChange={handleChange}
                      placeholder="Enter current password"
                      className="w-full bg-transparent py-4 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    New Password
                  </label>
                  <div className="flex items-center rounded-2xl border border-amber-200 bg-amber-50 px-4">
                    <FiLock className="mr-3 text-lg text-amber-600" />
                    <input
                      name="newPassword"
                      type="password"
                      value={formData.newPassword}
                      onChange={handleChange}
                      placeholder="Enter new password"
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
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm new password"
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
                  <FiSave className="text-lg" />
                  <span>{loading ? "Updating..." : "Update Password"}</span>
                </button>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}