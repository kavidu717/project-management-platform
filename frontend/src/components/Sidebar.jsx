import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="min-h-screen w-64 bg-slate-900 px-6 py-8 text-white">
      <h2 className="mb-8 text-2xl font-bold">Menu</h2>

      <nav className="flex flex-col gap-3">
        <Link
          to="/dashboard"
          className="rounded-lg px-4 py-3 text-slate-200 transition hover:bg-slate-800 hover:text-white"
        >
          Dashboard
        </Link>

        <Link
          to="/projects"
          className="rounded-lg px-4 py-3 text-slate-200 transition hover:bg-slate-800 hover:text-white"
        >
          Projects
        </Link>

        <Link
          to="/tasks"
          className="rounded-lg px-4 py-3 text-slate-200 transition hover:bg-slate-800 hover:text-white"
        >
          Tasks
        </Link>

        <Link
          to="/profile"
          className="rounded-lg px-4 py-3 text-slate-200 transition hover:bg-slate-800 hover:text-white"
        >
          Profile
        </Link>
      </nav>
    </aside>
  );
}