export default function ForgotPassword() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-slate-800">Forgot Password</h1>
        <p className="mt-2 text-slate-500">
          Enter your email to receive a reset link.
        </p>

        <form className="mt-6 space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />

          <button className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700">
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
}