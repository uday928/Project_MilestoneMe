import React from 'react';
import { Sun, Moon } from 'lucide-react';

export default function Navbar() {
  // const toggleDarkMode = () => {
  //   document.documentElement.classList.toggle('dark');
  // };

  return (
    <header className="bg-white dark:bg-black border-b border-gray-200 dark:border-green-800 px-6 py-4 flex items-center justify-between">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Dashboard</h2>

      {/* <button
        onClick={toggleDarkMode}
        className="p-2 rounded-md hover:bg-blue-50 dark:hover:bg-green-900 text-blue-600 dark:text-green-400 transition-colors"
      >
        <Sun className="h-5 w-5 dark:hidden" />
        <Moon className="h-5 w-5 hidden dark:block" />
      </button> */}
    </header>
  );
}
