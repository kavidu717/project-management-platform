import { Link } from "react-router-dom";
import { FiMail, FiLock, FiLogIn } from "react-icons/fi";

export default function Login() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 via-white to-amber-100 px-4 py-12">
      <div className="w-full max-w-md transform transition-all duration-300 hover:scale-[1.01]">
        <div className="rounded-3xl bg-white p-8 shadow-2xl shadow-amber-200/50 ring-1 ring-amber-100">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-amber-900">
              Welcome back
            </h1>
            <p className="mt-3 text-slate-500">
              Enter your credentials to access your account
            </p>
          </div>

          <form className="mt-10 space-y-5" onSubmit={(e) => e.preventDefault()}>
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

            <div>
              <div className="flex items-center justify-between">
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-sm font-semibold text-amber-700 hover:text-amber-800"
                >
                  Forgot?
                </Link>
              </div>

              <div className="flex items-center rounded-2xl border border-amber-200 bg-amber-50 px-4 transition-all duration-200 focus-within:border-amber-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-amber-500/10">
                <FiLock className="mr-3 text-lg text-amber-600" />
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full bg-transparent py-4 text-slate-900 placeholder-slate-400 outline-none"
                />
              </div>
            </div>

            <button className="flex w-full items-center justify-center gap-2 rounded-2xl bg-amber-600 py-4 font-bold text-white transition-all duration-200 hover:bg-amber-700 hover:shadow-lg active:scale-[0.98]">
              <FiLogIn className="text-lg" />
              <span>Sign In</span>
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
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="font-bold text-amber-700 transition-colors hover:text-amber-800 hover:underline"
            >
              Create one now
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