export default function VerifyEmail() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-8 text-center shadow-lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <span className="text-2xl text-green-600">✓</span>
        </div>

        <h1 className="mt-6 text-3xl font-bold text-slate-800">
          Verify Your Email
        </h1>

        <p className="mt-3 text-slate-500">
          Please verify your email address to activate your account.
        </p>

        <button className="mt-6 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700">
          Verify Email
        </button>

        <button className="mt-3 block w-full rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 hover:bg-slate-100">
          Resend Verification Link
        </button>
      </div>
    </div>
  );
}