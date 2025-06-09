import type { Metadata } from "next";
import { JSX } from "react";
import { notFound } from "next/navigation";
import fs from "fs";
import path from "path";
import { getBackupMarkdownContentWithoutMatter } from "@/helpers/backup-markdown-detail-helper";
import PostDetail from "@/components/PostDetail/PostDetail";

type BlogPostPageProps = {
  params: Promise<{ post: string }>;
};

export async function generateStaticParams() {
  const posts = fs.readdirSync(path.join(process.cwd(), "src/markdown/backup"));
  return posts.map((post) => ({
    post: post.replace(".md", ""),
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  try {
    const { post } = await params;
    const decodedPost: string = decodeURIComponent(post);

    return {
      title: decodedPost,
      description: `블로그 글 - ${decodedPost}`,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Blog Post",
      description: "Blog post page",
    };
  }
}

export default async function BlogPostPage({
  params,
}: BlogPostPageProps): Promise<JSX.Element> {
  try {
    const { post } = await params;
    const decodedPost = decodeURIComponent(post);
    const { content } =
      await getBackupMarkdownContentWithoutMatter(decodedPost);

    if (!content) {
      notFound();
    }

    return (
      <article className="py-10">
        <h1 className="mb-10 border-b pb-5 text-4xl font-bold">
          {decodedPost}
        </h1>
        <PostDetail content={content} />
      </article>
    );
  } catch (error) {
    console.error("Error rendering blog post:", error);
    notFound();
  }
}
