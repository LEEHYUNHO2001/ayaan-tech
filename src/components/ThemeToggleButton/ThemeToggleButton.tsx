"use client";

import { useThemeContext } from "@/hooks/use-theme-context";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useThemeContext();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="테마 토글"
      className="relative inline-flex h-8 w-16 items-center rounded-full bg-primary px-1 transition-colors dark:bg-primaryLight"
    >
      <span
        className={`flex h-6 w-6 transform items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 ${
          isDark ? "translate-x-8" : "translate-x-0"
        }`}
      >
        {isDark ? "🌙" : "☀️"}
      </span>
    </button>
  );
}
