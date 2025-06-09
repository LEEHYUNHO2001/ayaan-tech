import { Context, createContext } from "react";
import { ThemeContextType } from "@/providers/theme-provider";

export const ThemeContext: Context<ThemeContextType | null> =
  createContext<ThemeContextType | null>(null);
