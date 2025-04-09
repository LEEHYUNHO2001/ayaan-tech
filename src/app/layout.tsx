import type { Metadata } from "next";
import { ReactNode } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/global.css";
import { ThemeProvider } from "@/providers/theme-provider"; // ✅ 추가
import Header from "@/components/Header/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ayaan Tech",
  description: "프론트엔드 기술 블로그",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`container relative bg-background pt-[72px] text-foreground ${geistSans.variable} ${geistMono.variable}`}
      >
        <Header />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
