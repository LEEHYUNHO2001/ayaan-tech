import type { Metadata } from "next";
import { JSX } from "react";
import { notFound } from "next/navigation";
import { getBackupMarkdownContentWithoutMatter } from "@/helpers/backup-markdown-detail-helper";

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
  const { content } = await getBackupMarkdownContentWithoutMatter(decodedPost);

  if (!content) {
    notFound();
  }

  return (
    <article className="py-10">
      <h1 className="mb-10 border-b pb-5 text-4xl font-bold">{decodedPost}</h1>
      <div
        className="blog-post__contents"
        dangerouslySetInnerHTML={{
          __html: content,
        }}
      />
    </article>
  );
}
