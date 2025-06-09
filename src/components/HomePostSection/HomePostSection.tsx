import { PostCardModel } from "@/components/PostCard/postCard.type";
import PostCard from "@/components/PostCard/PostCard";
import { FC, JSX } from "react";
import {
  BlogPostMeta,
  getBlogBackupSpecificPostList,
  transformPostList,
} from "@/helpers/backup-markdown-list-helper";
import { memoirFileNameList, recommendFileNameList } from "@/constants/post";

const HomePostSection: FC = (): JSX.Element => {
  const blogMemoirPostList: BlogPostMeta[] =
    getBlogBackupSpecificPostList(memoirFileNameList);
  const blogRecommendPostList: BlogPostMeta[] = getBlogBackupSpecificPostList(
    recommendFileNameList
  );
  const transformedMemoirPostList = transformPostList(blogMemoirPostList);
  const transformedRecommendPostList = transformPostList(blogRecommendPostList);

  return (
    <article className="flex gap-4">
      <div className="flex-1">
        <h2 className="mb-4 text-lg font-bold">회고글</h2>
        <ul className="flex flex-col gap-2.5">
          {transformedMemoirPostList.map((post: PostCardModel) => (
            <li key={post.name}>
              <PostCard post={post} hideTag={true} hideDate={true} />
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1">
        <h2 className="mb-4 text-lg font-bold">추천글</h2>
        <ul className="flex flex-col gap-2.5">
          {transformedRecommendPostList.map((post: PostCardModel) => (
            <li key={post.name}>
              <PostCard post={post} hideTag={true} hideDate={true} />
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

export default HomePostSection;
