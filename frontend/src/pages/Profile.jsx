import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function Profile() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex">
        <Sidebar />

        <div className="flex-1">
          <Navbar />

          <main className="p-6">
            <div className="rounded-2xl bg-white p-8 shadow-sm">
              <h1 className="text-3xl font-bold text-slate-800">Profile</h1>
              <p className="mt-2 text-slate-500">
                Manage your account details here.
              </p>

              <div className="mt-8 grid gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value="Kavidu Dushmantha"
                    readOnly
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value="kavidu@example.com"
                    readOnly
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}