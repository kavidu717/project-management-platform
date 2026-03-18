import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <Navbar />

          <main className="p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
              <p className="mt-2 text-slate-500">
                Welcome to your project management dashboard.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-700">
                  Total Projects
                </h2>
                <p className="mt-4 text-3xl font-bold text-blue-600">12</p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-700">
                  Total Tasks
                </h2>
                <p className="mt-4 text-3xl font-bold text-emerald-600">48</p>
              </div>

              <div className="rounded-2xl bg-white p-6 shadow-sm">
                <h2 className="text-lg font-semibold text-slate-700">
                  Team Members
                </h2>
                <p className="mt-4 text-3xl font-bold text-amber-600">7</p>
              </div>
            </div>

            <div className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-800">
                Recent Activity
              </h2>
              <ul className="mt-4 space-y-3 text-slate-600">
                <li>Created new project UI design</li>
                <li>Updated dashboard layout</li>
                <li>Added new task card component</li>
              </ul>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}