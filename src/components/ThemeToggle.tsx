import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../feature/theme/themeSlice";
import type { RootState } from "../app/store";
import type { ThemeMode } from "../types/theme";

const ThemeToggle: React.FC = () => {
  const dispatch = useDispatch();
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const isDarkMode = themeMode === "dark" as ThemeMode;

  useEffect(() => {
    localStorage.setItem("theme", themeMode);
  }, [themeMode]);

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <button
      onClick={handleToggleTheme}
      className="p-2 rounded-full bg-blue-100 dark:bg-slate-700 text-blue-600 dark:text-yellow-300 hover:bg-blue-200 dark:hover:bg-slate-600 transition-colors"
      aria-label="Toggle dark mode"
    >
      {isDarkMode ? (
        // Sun icon for light mode
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      ) : (
        // Moon icon for dark mode
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
