"use client";

import { useEffect, useState } from "react";
import { pipe, tap } from "ramda";
import {
  applyThemeClass,
  getLocalStorageTheme,
  initializedTheme,
  setLocalStorageTheme,
  ThemeType,
} from "@/helpers/theme-helper";

interface UseThemeModel {
  theme: ThemeType;
  toggleTheme: () => void;
}

export function useTheme(): UseThemeModel {
  const [theme, setTheme] = useState<ThemeType>("light");

  const toggleTheme = (): void => {
    setTheme((prev: ThemeType) => {
      return pipe(
        (): ThemeType => (prev === "light" ? "dark" : "light"),
        tap(setLocalStorageTheme),
        tap(applyThemeClass)
      )();
    });
  };

  useEffect(() => {
    pipe(
      getLocalStorageTheme,
      initializedTheme,
      tap(applyThemeClass),
      tap(setTheme)
    )();
  }, []);

  return { theme, toggleTheme };
}
