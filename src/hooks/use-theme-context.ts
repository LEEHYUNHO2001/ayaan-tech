import { useContext } from "react";
import { ThemeContextType } from "@/providers/theme-provider";
import { ThemeContext } from "@/providers/theme-create-context";

export function useThemeContext(): ThemeContextType {
  const context: ThemeContextType | null = useContext(ThemeContext);
  if (!context) throw new Error("ThemeProvider Error");
  return context;
}
