"use client";

import { FC, JSX } from "react";
import { useRouter } from "next/navigation";
import { PostCardModel } from "@/components/PostCard/postCard.type";
import Tag from "@/components/Tag/Tag";

interface PostCardProps {
  post: PostCardModel;
  hideTag?: boolean;
  hideDate?: boolean;
}

const PostCard: FC<PostCardProps> = ({
  post,
  hideTag,
  hideDate,
}): JSX.Element => {
  const router = useRouter();

  const handleOnClickPost = (): void => {
    router.push(`/blog/${post.name}`);
  };

  return (
    <div
      className="dark: flex cursor-pointer items-start justify-between rounded-2xl border border-primary bg-primaryLight px-6 py-4 dark:border-greyLight dark:bg-grey"
      onClick={handleOnClickPost}
    >
      <div className={`flex flex-col gap-2 ${hideDate ? "w-full" : "w-3/4"}`}>
        <span className="text-xl font-bold">{post.name}</span>
        <p className="text-sm text-secondary dark:text-greyLight">
          {post.description}
        </p>
        {!hideTag && (
          <ul className="flex gap-2">
            {post.tagList.map((tag) => (
              <li key={tag}>
                <Tag label={tag} bg={"dark:bg-greyDark bg-primary"} />
              </li>
            ))}
          </ul>
        )}
      </div>
      {!hideDate && (
        <span className="text-sm text-secondary dark:text-greyLight">
          {post.date}
        </span>
      )}
    </div>
  );
};

export default PostCard;
