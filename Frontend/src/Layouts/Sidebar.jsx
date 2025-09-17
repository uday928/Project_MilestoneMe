import React from 'react';
import { NavLink } from 'react-router-dom';
import { BarChart3, Users, Settings } from 'lucide-react';

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-green-900 transition-colors ${
      isActive ? 'bg-blue-100 dark:bg-green-800 text-blue-700 dark:text-green-100 font-semibold' : 'text-gray-700 dark:text-white'
    }`;

  return (
    <aside className="w-64 bg-white dark:bg-black border-r border-gray-200 dark:border-green-800 p-4 space-y-4">
      <img src='./MM_Logo.png' />

      <nav className="flex flex-col space-y-2">
        <NavLink to="/" className={linkClass}>
          <BarChart3 size={20} />
          Dashboard
        </NavLink>
        <NavLink to="/students" className={linkClass}>
          <Users size={20} />
          Students
        </NavLink>
        <NavLink to="/settings" className={linkClass}>
          <Settings size={20} />
          Settings
        </NavLink>
      </nav>
    </aside>
  );
}
