"use client";

import { useEffect, useState } from "react";

export type ThemeType = "light" | "dark";
type StoredThemeType = ThemeType | null;
interface UseThemeModel {
  theme: ThemeType;
  toggleTheme: () => void;
}

export function useTheme(): UseThemeModel {
  const [theme, setTheme] = useState<ThemeType>("light");

  const isPrefersDark = (): boolean => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  };

  const setLocalStorage = (theme: ThemeType): void => {
    localStorage.setItem("theme", theme);
  };

  const getLocalStorageTheme = (): StoredThemeType => {
    return localStorage.getItem("theme") as StoredThemeType;
  };

  const setToggleClassTheme = (isDarkTheme: boolean): void => {
    document.documentElement.classList.toggle("dark", isDarkTheme);
  };

  const toggleTheme = (): void => {
    setTheme((prev: ThemeType) => {
      const newTheme = prev === "light" ? "dark" : "light";
      setLocalStorage(newTheme);
      setToggleClassTheme(newTheme === "dark");
      return newTheme;
    });
  };

  useEffect(() => {
    const storedTheme = getLocalStorageTheme();
    const initialTheme = storedTheme || (isPrefersDark() ? "dark" : "light");
    setTheme(initialTheme);
    setToggleClassTheme(initialTheme === "dark");
  }, []);

  return { theme, toggleTheme };
}
