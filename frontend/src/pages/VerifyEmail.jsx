import { Link, useParams } from "react-router-dom";
import { FiCheckCircle, FiSend } from "react-icons/fi";
import { useEffect, useState } from "react";
import { verifyEmail, resendVerificationEmail } from "../api/auth.api";

export default function VerifyEmail() {
  const { token } = useParams();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [resendLoading, setResendLoading] = useState(false);

  useEffect(() => {
    async function handleVerify() {
      try {
        const res = await verifyEmail(token);
        setMessage(res.data?.message || "Email verified successfully");
      } catch (err) {
        setError(err.response?.data?.message || "Email verification failed");
      } finally {
        setLoading(false);
      }
    }

    if (token) {
      handleVerify();
    } else {
      setLoading(false);
      setError("Verification token is missing");
    }
  }, [token]);

  async function handleResend() {
    setResendLoading(true);
    setError("");
    setMessage("");

    try {
      const res = await resendVerificationEmail();
      setMessage(res.data?.message || "Verification email sent again");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to resend verification email");
    } finally {
      setResendLoading(false);
    }
  }

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

        <div className="mt-6">
          {loading && <p className="text-slate-500">Verifying...</p>}
          {message && <p className="text-sm font-medium text-green-600">{message}</p>}
          {error && <p className="text-sm font-medium text-red-600">{error}</p>}
        </div>

        <button
          onClick={handleResend}
          disabled={resendLoading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl border border-amber-200 bg-amber-50 py-4 font-semibold text-amber-800 hover:bg-amber-100 disabled:opacity-70"
        >
          <FiSend className="text-lg" />
          {resendLoading ? "Sending..." : "Resend Verification Link"}
        </button>

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