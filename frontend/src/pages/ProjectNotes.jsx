import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function ProjectNotes() {
  const notes = [
    {
      id: 1,
      author: "Kavidu Dushmantha",
      content: "Create the dashboard UI first before connecting APIs.",
      date: "2026-03-18",
    },
    {
      id: 2,
      author: "Nimal Perera",
      content: "Need to improve task card design and spacing.",
      date: "2026-03-17",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <Navbar />

          <main className="p-6">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-slate-800">
                Project Notes
              </h1>
              <p className="mt-2 text-slate-500">
                Keep project-related notes and updates here.
              </p>
            </div>

            <div className="mb-6 rounded-2xl bg-white p-6 shadow-sm">
              <textarea
                placeholder="Write a new project note..."
                className="min-h-32 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              />
              <button className="mt-4 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700">
                Add Note
              </button>
            </div>

            <div className="space-y-4">
              {notes.map((note) => (
                <div key={note.id} className="rounded-2xl bg-white p-6 shadow-sm">
                  <div className="mb-3 flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-slate-800">
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