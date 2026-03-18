export default function ResetPassword() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-3xl font-bold text-slate-800">Reset Password</h1>
        <p className="mt-2 text-slate-500">
          Enter your new password below.
        </p>

        <form className="mt-6 space-y-4">
          <input
            type="password"
            placeholder="New password"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />

          <input
            type="password"
            placeholder="Confirm new password"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />

          <button className="w-full rounded-xl bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700">
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
}