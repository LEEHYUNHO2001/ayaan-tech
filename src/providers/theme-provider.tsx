"use client";

import { createContext, ReactNode } from "react";
import { useTheme } from "@/hooks/use-theme";
import { ThemeType } from "@/helpers/theme-helper";

type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const theme = useTheme();

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}
