import { FiBell, FiLogOut } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed");
    }
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-amber-200 bg-white px-6 shadow-sm">
      <div>
        <h1 className="text-xl font-bold text-amber-700">
          Project Management Platform
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <button className="flex items-center gap-2 rounded-lg bg-amber-100 px-4 py-2 text-sm font-medium text-amber-800 hover:bg-amber-200">
          <FiBell className="text-lg" />
          Notifications
        </button>

        <div className="flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2 text-amber-700">
          <FaUserCircle className="text-2xl" />
          <span className="text-sm font-medium">
            {user?.username || "User"}
          </span>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"
        >
          <FiLogOut className="text-lg" />
          Logout
        </button>
      </div>
    </header>
  );
}