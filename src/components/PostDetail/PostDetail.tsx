"use client";

import { FC, JSX, useEffect } from "react";
import { useThemeContext } from "@/hooks/use-theme-context";

interface PostDetailProps {
  content: string;
}

const PostDetail: FC<PostDetailProps> = ({ content }): JSX.Element => {
  const { theme } = useThemeContext();
  const isDark = theme === "dark";

  useEffect(() => {
    try {
      const style = document.createElement("link");
      style.rel = "stylesheet";
      style.href = isDark
        ? "https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/night-owl.min.css"
        : "https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/github.min.css";

      document.head.appendChild(style);

      return () => {
        document.head.removeChild(style);
      };
    } catch (error) {
      console.error("Error loading highlight.js styles:", error);
    }
  }, [isDark]);

  if (!content) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="blog-post__contents"
      dangerouslySetInnerHTML={{
        __html: content,
      }}
    />
  );
};

export default PostDetail;
