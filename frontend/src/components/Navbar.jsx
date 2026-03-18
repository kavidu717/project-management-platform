
export default function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">
      <div>
        <h1 className="text-xl font-bold text-slate-800">
          Project Management Platform
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <button className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200">
          Notifications
        </button>
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 font-semibold text-white">
          U
        </div>
      </div>
    </header>
  );
}