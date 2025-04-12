"use client";

import { FC, JSX } from "react";
import { useRouter } from "next/navigation";
import { PostCardModel } from "@/components/PostCard/postCard.type";
import Tag from "@/components/Tag/Tag";

interface PostCardProps {
  post: PostCardModel;
}

const PostCard: FC<PostCardProps> = ({ post }): JSX.Element => {
  const router = useRouter();

  const handleOnClickPost = (): void => {
    router.push(`/blog/${post.name}`);
  };

  return (
    <div
      className="flex cursor-pointer items-start justify-between"
      onClick={handleOnClickPost}
    >
      <div className="flex w-3/4 flex-col gap-2">
        <span className="text-xl font-bold">{post.name}</span>
        <p className="text-sm text-greyLight">{post.description}</p>
        <ul className="flex gap-2">
          {post.tagList.map((tag) => (
            <li key={tag}>
              <Tag label={tag} bg={"bg-greyDark"} />
            </li>
          ))}
        </ul>
      </div>
      <span className="text-sm text-greyLight">{post.date}</span>
    </div>
  );
};

export default PostCard;
