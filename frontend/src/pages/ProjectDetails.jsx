import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function ProjectDetails() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <Navbar />

          <main className="p-6">
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h1 className="text-3xl font-bold text-slate-800">
                Project Details
              </h1>
              <p className="mt-2 text-slate-500">
                View project information, members, notes, and tasks.
              </p>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div className="rounded-xl bg-slate-50 p-5">
                  <h2 className="text-lg font-semibold text-slate-700">
                    Project Name
                  </h2>
                  <p className="mt-2 text-slate-600">Website Redesign</p>
                </div>

                <div className="rounded-xl bg-slate-50 p-5">
                  <h2 className="text-lg font-semibold text-slate-700">
                    Status
                  </h2>
                  <p className="mt-2 text-slate-600">Active</p>
                </div>

                <div className="rounded-xl bg-slate-50 p-5 md:col-span-2">
                  <h2 className="text-lg font-semibold text-slate-700">
                    Description
                  </h2>
                  <p className="mt-2 text-slate-600">
                    This project focuses on building a modern project management
                    platform frontend.
                  </p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}