import { Link } from "react-router-dom";
import { FiArrowLeftCircle } from "react-icons/fi";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-amber-50 via-white to-amber-100 px-4 text-center">
      <h1 className="text-7xl font-extrabold text-amber-900">404</h1>
      <p className="mt-4 text-lg text-slate-500">Page not found</p>

      <Link
        to="/"
        className="mt-6 flex items-center gap-2 rounded-2xl bg-amber-600 px-6 py-3 font-semibold text-white hover:bg-amber-700"
      >
        <FiArrowLeftCircle />
        Go Home
      </Link>
    </div>
  );
}