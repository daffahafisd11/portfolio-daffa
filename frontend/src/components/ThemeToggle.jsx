import React from 'react';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-200 dark:bg-blue-800 hover:bg-blue-300 dark:hover:bg-blue-700 transition-all duration-300 border border-blue-300 dark:border-blue-700"
    >
      <span className="text-xl">{isDark ? '🌙' : '☀️'}</span>
      <span className="text-sm font-medium text-blue-800 dark:text-blue-200">
        {isDark ? 'Dark' : 'Light'}
      </span>
    </button>
  );
};

export default ThemeToggle;