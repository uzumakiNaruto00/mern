import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-700 text-white px-4 py-3 flex justify-between items-center shadow">
      <div className="font-bold text-lg">
        <Link to="/dashboard" className="hover:underline">LAVINIA TSS</Link>
      </div>
      <div className="flex gap-4">
        <Link to="/dashboard" className="hover:underline">Dashboard</Link>
        <Link to="/trainees" className="hover:underline">Trainees</Link>
        <Link to="/parents" className="hover:underline">Parents</Link>
        <Link to="/trades" className="hover:underline">Trades</Link>
        <Link to="/report" className="hover:underline">Report</Link>
        <button
          onClick={handleLogout}
          className="bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 ml-4"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
