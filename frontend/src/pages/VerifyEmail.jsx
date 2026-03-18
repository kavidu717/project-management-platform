import { Link } from "react-router-dom";
import { FiCheckCircle, FiSend } from "react-icons/fi";

export default function VerifyEmail() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-amber-50 via-white to-amber-100 px-4 py-12">
      <div className="w-full max-w-lg rounded-3xl bg-white p-8 text-center shadow-2xl shadow-amber-200/50 ring-1 ring-amber-100">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-amber-100">
          <FiCheckCircle className="text-4xl text-amber-600" />
        </div>

        <h1 className="mt-6 text-4xl font-extrabold text-amber-900">
          Verify Your Email
        </h1>

        <p className="mt-3 text-slate-500">
          Please verify your email address to activate your account
        </p>

        <div className="mt-8 space-y-3">
          <button className="w-full rounded-2xl bg-amber-600 py-4 font-bold text-white hover:bg-amber-700">
            Verify Email
          </button>

          <button className="flex w-full items-center justify-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 py-4 font-semibold text-amber-800 hover:bg-amber-100">
            <FiSend className="text-lg" />
            Resend Verification Link
          </button>
        </div>

        <p className="mt-8 text-sm text-slate-600">
          Back to{" "}
          <Link
            to="/"
            className="font-bold text-amber-700 hover:text-amber-800 hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}