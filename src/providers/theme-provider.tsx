"use client";

import { JSX, ReactNode } from "react";
import { useTheme, UseThemeModel } from "@/hooks/use-theme";
import { ThemeType } from "@/helpers/theme-helper";
import { ThemeContext } from "@/providers/theme-create-context";

export type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
};

export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const theme: UseThemeModel = useTheme();

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}
