import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { FiCheckCircle, FiClock, FiFlag } from "react-icons/fi";

export default function TaskDetails() {
  const subtasks = [
    { id: 1, title: "Design login page", completed: true },
    { id: 2, title: "Create register form", completed: false },
    { id: 3, title: "Connect auth API later", completed: false },
  ];

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />

          <main className="p-6">
            <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-amber-100">
              <div className="mb-8">
                <h1 className="text-3xl font-bold text-amber-900">
                  Task Details
                </h1>
                <p className="mt-2 text-slate-500">
                  View task information and subtasks
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl bg-amber-50 p-5">
                  <h2 className="text-lg font-semibold text-slate-700">Title</h2>
                  <p className="mt-2 text-slate-600">Build Authentication UI</p>
                </div>

                <div className="rounded-2xl bg-amber-50 p-5">
                  <h2 className="text-lg font-semibold text-slate-700">Status</h2>
                  <div className="mt-2 flex items-center gap-2 text-slate-600">
                    <FiClock className="text-amber-600" />
                    In Progress
                  </div>
                </div>

                <div className="rounded-2xl bg-amber-50 p-5">
                  <h2 className="text-lg font-semibold text-slate-700">Assigned To</h2>
                  <p className="mt-2 text-slate-600">Kavidu Dushmantha</p>
                </div>

                <div className="rounded-2xl bg-amber-50 p-5">
                  <h2 className="text-lg font-semibold text-slate-700">Priority</h2>
                  <div className="mt-2 flex items-center gap-2 text-slate-600">
                    <FiFlag className="text-amber-600" />
                    High
                  </div>
                </div>

                <div className="rounded-2xl bg-amber-50 p-5 md:col-span-2">
                  <h2 className="text-lg font-semibold text-slate-700">
                    Description
                  </h2>
                  <p className="mt-2 text-slate-600">
                    Build authentication-related frontend pages first and connect
                    the backend later.
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <h2 className="mb-4 text-2xl font-bold text-amber-900">
                  Subtasks
                </h2>

                <div className="space-y-3">
                  {subtasks.map((subtask) => (
                    <div
                      key={subtask.id}
                      className="flex items-center justify-between rounded-2xl border border-amber-200 bg-amber-50 p-4"
                    >
                      <p className="text-slate-700">{subtask.title}</p>
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          subtask.completed
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-200 text-amber-800"
                        }`}
                      >
                        {subtask.completed ? "Completed" : "Pending"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}