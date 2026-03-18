import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { FiEdit3, FiSend } from "react-icons/fi";

export default function ProjectNotes() {
  const notes = [
    {
      id: 1,
      author: "Kavidu Dushmantha",
      content: "Finish dashboard UI before connecting the backend.",
      date: "2026-03-18",
    },
    {
      id: 2,
      author: "Nimal Perera",
      content: "Need a better task details card layout.",
      date: "2026-03-17",
    },
  ];

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />

          <main className="p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-amber-900">
                Project Notes
              </h1>
              <p className="mt-2 text-slate-500">
                Store project updates and important notes
              </p>
            </div>

            <div className="mb-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-amber-100">
              <label className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-700">
                <FiEdit3 className="text-amber-600" />
                New Note
              </label>
              <textarea
                placeholder="Write your project note here..."
                className="min-h-32 w-full rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 outline-none focus:border-amber-500"
              />
              <button className="mt-4 flex items-center gap-2 rounded-2xl bg-amber-600 px-5 py-3 font-semibold text-white hover:bg-amber-700">
                <FiSend />
                Add Note
              </button>
            </div>

            <div className="space-y-4">
              {notes.map((note) => (
                <div
                  key={note.id}
                  className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-amber-100"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-amber-900">
                      {note.author}
                    </h2>
                    <span className="text-sm text-slate-400">{note.date}</span>
                  </div>
                  <p className="text-slate-600">{note.content}</p>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}