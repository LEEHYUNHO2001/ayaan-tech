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
        lg: "992px",
        xl: "1200px", // ✅ `1280px` → `1200px` 변경
        "2xl": "1200px", // ✅ 1536px 이상도 1200px 고정
      },
      container: {
        center: true,
        padding: "1rem",
        screens: {
          sm: "640px",
          md: "768px",
          lg: "992px", // Tablet. 1024px -> 992px.
          xl: "1200px", // Desktop. 1280px -> 1200px.
          "2xl": "1200px", // 1536px 이상도 1200px 고정.
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
