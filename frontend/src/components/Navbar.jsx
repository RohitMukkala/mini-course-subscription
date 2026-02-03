import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold text-blue-600">
        MiniCourses
      </Link>

      <div className="flex gap-4 items-center">
        <Link to="/my-courses" className="text-gray-700 hover:text-blue-600">
          My Courses
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
