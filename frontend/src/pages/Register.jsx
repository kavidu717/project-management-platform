import { Link } from "react-router-dom";
import { FiUser, FiMail, FiLock, FiUserPlus } from "react-icons/fi";

export default function Register() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 via-white to-amber-100 px-4 py-12">
      <div className="w-full max-w-lg transform transition-all duration-300 hover:scale-[1.01]">
        <div className="rounded-3xl bg-white p-8 shadow-2xl shadow-amber-200/50 ring-1 ring-amber-100">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-amber-900">
              Create account
            </h1>
            <p className="mt-3 text-slate-500">
              Join your project management platform and start organizing your work
            </p>
          </div>

          <form
            className="mt-10 space-y-5"
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Full Name
              </label>
              <div className="flex items-center rounded-2xl border border-amber-200 bg-amber-50 px-4 transition-all duration-200 focus-within:border-amber-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-amber-500/10">
                <FiUser className="mr-3 text-lg text-amber-600" />
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full bg-transparent py-4 text-slate-900 placeholder-slate-400 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Email Address
              </label>
              <div className="flex items-center rounded-2xl border border-amber-200 bg-amber-50 px-4 transition-all duration-200 focus-within:border-amber-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-amber-500/10">
                <FiMail className="mr-3 text-lg text-amber-600" />
                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full bg-transparent py-4 text-slate-900 placeholder-slate-400 outline-none"
                />
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Password
                </label>
                <div className="flex items-center rounded-2xl border border-amber-200 bg-amber-50 px-4 transition-all duration-200 focus-within:border-amber-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-amber-500/10">
                  <FiLock className="mr-3 text-lg text-amber-600" />
                  <input
                    type="password"
                    placeholder="Create password"
                    className="w-full bg-transparent py-4 text-slate-900 placeholder-slate-400 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Confirm Password
                </label>
                <div className="flex items-center rounded-2xl border border-amber-200 bg-amber-50 px-4 transition-all duration-200 focus-within:border-amber-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-amber-500/10">
                  <FiLock className="mr-3 text-lg text-amber-600" />
                  <input
                    type="password"
                    placeholder="Confirm password"
                    className="w-full bg-transparent py-4 text-slate-900 placeholder-slate-400 outline-none"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-amber-50 p-4 text-sm text-slate-600">
              <p className="font-medium text-amber-800">Password tips</p>
              <p className="mt-1">
                Use at least 8 characters with letters, numbers, and a strong combination.
              </p>
            </div>

            <label className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-white p-4 text-sm text-slate-600">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 rounded border-amber-300 text-amber-600 focus:ring-amber-500"
              />
              <span>
                I agree to the{" "}
                <span className="font-semibold text-amber-700">Terms of Service</span>{" "}
                and{" "}
                <span className="font-semibold text-amber-700">Privacy Policy</span>.
              </span>
            </label>

            <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-600 py-4 font-bold text-white transition-all duration-200 hover:bg-amber-700 hover:shadow-lg active:scale-[0.98]">
              <FiUserPlus className="text-lg" />
              <span>Create Account</span>
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center space-x-2">
            <span className="h-[1px] w-full bg-amber-200"></span>
            <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Or
            </span>
            <span className="h-[1px] w-full bg-amber-200"></span>
          </div>

          <p className="mt-8 text-center text-sm text-slate-600">
            Already have an account?{" "}
            <Link
              to="/"
              className="font-bold text-amber-700 transition-colors hover:text-amber-800 hover:underline"
            >
              Sign in here
            </Link>
          </p>
        </div>

        <p className="mt-8 text-center text-xs text-slate-400">
          &copy; 2026 YourBrand Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
}