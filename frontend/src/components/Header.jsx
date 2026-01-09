import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Header({ onCreateClick }) {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-primary">
            Student Task Manager
          </h1>
          <p className="text-sm text-muted">
            Manage tasks. Stay productive.
          </p>
        </div>

        <div className="desktop-actions flex items-center gap-4">
          <span className="text-sm text-muted">
            Hi, <strong>{user?.name}</strong>
          </span>

          <button
            onClick={onCreateClick}
            className="px-4 py-2 rounded-xl bg-primary text-white font-medium shadow-soft hover:scale-[1.03] transition"
          >
            + Add Task
          </button>

          <button
            onClick={logout}
            className="px-4 py-2 rounded-xl border hover:bg-gray-100 transition"
          >
            Logout
          </button>
        </div>
        
        <button
          className="hamburger"
          onClick={() => setMenuOpen(true)}
        >
          ☰
        </button>
      </div>
      
      {menuOpen && (
        <div className="mobile-drawer">
          <p>Hi, {user?.name}</p>
          <button onClick={onCreateClick}>+ Add Task</button>
          <button onClick={logout}>Logout</button>
          <button className="close" onClick={() => setMenuOpen(false)}>✕</button>
        </div>
      )}
    </header>
  );
}