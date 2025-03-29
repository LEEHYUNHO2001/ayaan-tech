import type { Metadata } from "next";
import { JSX } from "react";
import { notFound } from "next/navigation";
import { getMarkdownContent } from "@/helpers/markdown-detail-helper";

type BlogPostPageProps = {
  params: Promise<{ post: string }>;
};

export async function generateMetadata(
  { params }: BlogPostPageProps
  // parent: ResolvingMetadata
): Promise<Metadata> {
  const { post } = await params;
  const decodedPost: string = decodeURIComponent(post);
  // const previousImages = (await parent).openGraph?.images || [];

  return {
    title: decodedPost,
    description: `블로그 글 - ${decodedPost}`,
    // openGraph: {
    //   images: ["/some-specific-page-image.jpg", ...previousImages],
    // },
  };
}

export default async function BlogPostPage({
  params,
}: BlogPostPageProps): Promise<JSX.Element> {
  const { post } = await params;
  const decodedPost = decodeURIComponent(post);
  const { content } = await getMarkdownContent(decodedPost);

  if (!content) {
    notFound();
  }

  return (
    <article>
      <h1>{decodedPost}</h1>
      <div
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </article>
  );
}
