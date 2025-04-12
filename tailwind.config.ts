import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        sm: "640px",
        md: "768px",
        lg: "900px",
        xl: "900px", // ✅ `1280px` → `900px` 변경
        "2xl": "900px", // ✅ 1536px 이상도 900px 고정
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          sm: "640px",
          md: "768px",
          lg: "900px", // Tablet. 1024px -> 900px.
          xl: "900px", // Desktop. 1280px -> 900px.
          "2xl": "900px", // 1536px 이상도 900px 고정.
        },
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        black: "var(--black)",
        grey: "var(--grey)",
        greyDark: "var(--grey-dark)",
        greyLight: "var(--grey-light)",
        secondary: "var(--secondary)",
        primary: "var(--primary)",
        primaryActive: "var(--primary-active)",
        primaryLight: "var(--primary-light)",
        sky: "var(--sky)",
        skyLight: "var(--sky-light)",
        yellow: "var(--yellow)",
        yellowLight: "var(--yellow-light)",
      },
      // fontFamily: {
      //   main: ["Pretendard", "Roboto", "Noto Sans KR", "sans-serif"],
      //   other: ["Roboto", "Noto Sans KR", "sans-serif"],
      // },
    },
  },
} satisfies Config;
