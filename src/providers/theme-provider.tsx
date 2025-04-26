"use client";

import { createContext, useContext } from "react";
import { useTheme } from "@/hooks/use-theme";
import { ThemeType } from "@/helpers/theme-helper";

type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useTheme();

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("ThemeProvider Error");
  return context;
}
