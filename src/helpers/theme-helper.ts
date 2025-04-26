export type ThemeType = "light" | "dark";

export type StoredThemeType = ThemeType | null;

const THEME_KEY = "theme" as const;

export const getLocalStorageTheme = (): StoredThemeType =>
  localStorage.getItem(THEME_KEY) as StoredThemeType;

export const setLocalStorageTheme = (theme: ThemeType): void => {
  localStorage.setItem(THEME_KEY, theme);
};

export const applyThemeClass = (theme: ThemeType): void => {
  document.documentElement.classList.toggle("dark", theme === "dark");
};

export const isPrefersDark = (): boolean =>
  window.matchMedia("(prefers-color-scheme: dark)").matches;

export const initializedTheme = (storedTheme: StoredThemeType): ThemeType =>
  storedTheme || (isPrefersDark() ? "dark" : "light");
