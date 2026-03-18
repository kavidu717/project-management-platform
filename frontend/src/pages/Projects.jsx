import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <Navbar />

          <main className="p-6">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-800">Projects</h1>
                <p className="mt-2 text-slate-500">
                  Manage all your projects here.
                </p>
              </div>

              <button className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700">
                + New Project
              </button>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <ProjectCard
                title="Project Alpha"
                description="Frontend design for dashboard and authentication pages."
                status="Active"
              />
              <ProjectCard
                title="Project Beta"
                description="Task management UI and reusable card components."
                status="Pending"
              />
              <ProjectCard
                title="Project Gamma"
                description="Notes and project details layout design."
                status="Completed"
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}