import type { Config } from "tailwindcss";
// import daisyui from "daisyui";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
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
      },
      fontFamily: {
        main: ["Pretendard", "Roboto", "Noto Sans KR", "sans-serif"],
        other: ["Roboto", "Noto Sans KR", "sans-serif"],
      },
      // 새로운 폰트 사이즈 추가
      fontSize: {
        "2rem": "2rem",
        "2.5rem": "2.5rem",
      },
    },
  },
  // plugins: [daisyui],
} satisfies Config;
