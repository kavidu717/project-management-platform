import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { FiUser, FiMail, FiPhone, FiEdit } from "react-icons/fi";

export default function Profile() {
  return (
    <div className="min-h-screen bg-amber-50">
      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <Navbar />

          <main className="p-6">
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-amber-100">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <h1 className="text-3xl font-bold text-amber-900">Profile</h1>
                  <p className="mt-2 text-slate-500">
                    Manage your account details here
                  </p>
                </div>

                <button className="flex items-center gap-2 rounded-2xl bg-amber-600 px-5 py-3 font-semibold text-white hover:bg-amber-700">
                  <FiEdit />
                  Edit Profile
                </button>
              </div>

              <div className="mb-6">
                <Link
                  to="/change-password"
                  className="inline-flex items-center rounded-2xl bg-amber-600 px-5 py-3 font-semibold text-white hover:bg-amber-700"
                >
                  Change Password
                </Link>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Full Name
                  </label>
                  <div className="flex items-center rounded-2xl border border-amber-200 bg-amber-50 px-4">
                    <FiUser className="mr-3 text-amber-600" />
                    <input
                      type="text"
                      value="Kavidu Dushmantha"
                      readOnly
                      className="w-full bg-transparent py-4 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <div className="flex items-center rounded-2xl border border-amber-200 bg-amber-50 px-4">
                    <FiMail className="mr-3 text-amber-600" />
                    <input
                      type="email"
                      value="kavidu@example.com"
                      readOnly
                      className="w-full bg-transparent py-4 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Phone
                  </label>
                  <div className="flex items-center rounded-2xl border border-amber-200 bg-amber-50 px-4">
                    <FiPhone className="mr-3 text-amber-600" />
                    <input
                      type="text"
                      value="+94 77 123 4567"
                      readOnly
                      className="w-full bg-transparent py-4 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Role
                  </label>
                  <input
                    type="text"
                    value="Project Admin"
                    readOnly
                    className="w-full rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 outline-none"
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}