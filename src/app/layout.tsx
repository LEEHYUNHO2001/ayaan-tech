import type { Metadata } from "next";
import { ReactNode } from "react";
import { Noto_Sans } from "next/font/google";
import { ThemeProvider } from "@/providers/theme-provider";
import Header from "@/components/Header/Header";
import "@/styles/global.css";
import "@/styles/markdown.css";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"], // 필요 시 조정
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ayaan Tech",
  description: "프론트엔드 기술 블로그",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`container relative bg-background pt-[72px] text-foreground ${notoSans.variable}`}
      >
        <Header />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
