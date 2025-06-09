"use client";

import { FC, JSX, useEffect, useMemo, useState } from "react";
import { PostCardModel } from "@/components/PostCard/postCard.type";
import PostCard from "@/components/PostCard/PostCard";
import Pagination from "@/components/Pagination/Pagination";

interface PostListProps {
  postList: PostCardModel[];
}

const PostList: FC<PostListProps> = ({
  postList,
}: PostListProps): JSX.Element => {
  const POSTS_PER_PAGE = 10;
  const totalPages = Math.ceil(postList.length / POSTS_PER_PAGE);

  const [currentPage, setCurrentPage] = useState(1);

  const currentPosts = useMemo(() => {
    const startIdx = (currentPage - 1) * POSTS_PER_PAGE;
    return postList.slice(startIdx, startIdx + POSTS_PER_PAGE);
  }, [currentPage, postList]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <>
      <ul className="flex flex-col gap-2.5">
        {currentPosts.map((post: PostCardModel) => (
          <li key={post.name}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>

      <Pagination
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </>
  );
};

export default PostList;
