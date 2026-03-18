import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import { FiUserPlus, FiEdit2, FiTrash2 } from "react-icons/fi";

export default function ProjectMembers() {
  const members = [
    { id: 1, name: "Kavidu Dushmantha", username: "@kavidu", role: "Admin" },
    { id: 2, name: "Nimal Perera", username: "@nimal", role: "Member" },
    { id: 3, name: "Kasun Silva", username: "@kasun", role: "Member" },
  ];

  return (
    <div className="min-h-screen bg-amber-50">
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />

          <main className="p-6">
            <div className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-amber-900">
                  Project Members
                </h1>
                <p className="mt-2 text-slate-500">
                  Manage project members and roles
                </p>
              </div>

              <button className="flex items-center gap-2 rounded-2xl bg-amber-600 px-5 py-3 font-semibold text-white hover:bg-amber-700">
                <FiUserPlus />
                Add Member
              </button>
            </div>

            <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-amber-100">
              <div className="grid grid-cols-4 bg-amber-50 px-6 py-4 font-semibold text-slate-700">
                <p>Name</p>
                <p>Username</p>
                <p>Role</p>
                <p>Actions</p>
              </div>

              {members.map((member) => (
                <div
                  key={member.id}
                  className="grid grid-cols-4 items-center border-t border-amber-100 px-6 py-4"
                >
                  <p>{member.name}</p>
                  <p>{member.username}</p>
                  <p>
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-medium text-amber-800">
                      {member.role}
                    </span>
                  </p>
                  <div className="flex gap-2">
                    <button className="rounded-xl bg-amber-100 p-3 text-amber-700 hover:bg-amber-200">
                      <FiEdit2 />
                    </button>
                    <button className="rounded-xl bg-red-100 p-3 text-red-600 hover:bg-red-200">
                      <FiTrash2 />
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