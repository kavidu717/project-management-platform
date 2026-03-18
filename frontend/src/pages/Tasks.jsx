import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import TaskCard from "../components/TaskCard";

export default function Tasks() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <Navbar />

          <main className="p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-800">Tasks</h1>
              <p className="mt-2 text-slate-500">
                Track all tasks and their progress.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              <TaskCard
                title="Build login page"
                priority="High"
                status="In Progress"
              />
              <TaskCard
                title="Create project page"
                priority="Medium"
                status="Todo"
              />
              <TaskCard
                title="Design task details page"
                priority="Low"
                status="Completed"
              />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}