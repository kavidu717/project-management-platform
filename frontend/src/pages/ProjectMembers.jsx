import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function ProjectMembers() {
  const members = [
    {
      id: 1,
      name: "Kavidu Dushmantha",
      username: "@kavidu",
      role: "Admin",
    },
    {
      id: 2,
      name: "Nimal Perera",
      username: "@nimal",
      role: "Member",
    },
    {
      id: 3,
      name: "Kasun Silva",
      username: "@kasun",
      role: "Member",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <Navbar />

          <main className="p-6">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-slate-800">
                  Project Members
                </h1>
                <p className="mt-2 text-slate-500">
                  Manage members and roles for this project.
                </p>
              </div>

              <button className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white hover:bg-blue-700">
                + Add Member
              </button>
            </div>

            <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <div className="grid grid-cols-4 border-b border-slate-200 bg-slate-50 px-6 py-4 text-sm font-semibold text-slate-600">
                <p>Name</p>
                <p>Username</p>
                <p>Role</p>
                <p>Action</p>
              </div>

              {members.map((member) => (
                <div
                  key={member.id}
                  className="grid grid-cols-4 items-center border-b border-slate-100 px-6 py-4 text-sm text-slate-700"
                >
                  <p>{member.name}</p>
                  <p>{member.username}</p>
                  <p>
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                      {member.role}
                    </span>
                  </p>
                  <div className="flex gap-2">
                    <button className="rounded-lg bg-amber-100 px-3 py-2 text-xs font-medium text-amber-700 hover:bg-amber-200">
                      Change Role
                    </button>
                    <button className="rounded-lg bg-red-100 px-3 py-2 text-xs font-medium text-red-700 hover:bg-red-200">
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}