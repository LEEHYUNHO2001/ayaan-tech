import { useContext } from "react";
import { ThemeContext } from "@/providers/theme-provider";

export function useThemeContext() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("ThemeProvider Error");
  return context;
}
