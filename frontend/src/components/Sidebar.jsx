import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div>
     
    
      <h3>Menu</h3>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "20px" }}>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/projects">Projects</Link>
        <Link to="/tasks">Tasks</Link>
        <Link to="/profile">Profile</Link>
      </div>
    </div>
  );
}