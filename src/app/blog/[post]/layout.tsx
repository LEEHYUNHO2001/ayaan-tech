import { ReactNode } from "react";
import "@/styles/markdown.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <section>{children}</section>;
}
