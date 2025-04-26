import {
  BlogPostMeta,
  getBlogBackupPostList,
} from "@/helpers/backup-markdown-list-helper";
import PostCard from "@/components/PostCard/PostCard";
import { PostCardModel } from "@/components/PostCard/postCard.type";

export default function BlogHomePage() {
  const blogBackupPostList: BlogPostMeta[] = getBlogBackupPostList();
  const transformedPostList = transformPostList(blogBackupPostList);
  const blogHomeTextModel = {
    title: "블로그 목록",
  };

  function transformPostList(postList: BlogPostMeta[]): PostCardModel[] {
    return postList.map((item) => ({
      name: item.name,
      description: item.description,
      date: item.dayjs.format("YYYY-MM-DD"),
      tagList: item.tagList,
    }));
  }

  return (
    <section className="py-5">
      <h1 className="mb-10 border-b pb-5 text-4xl font-bold">
        {blogHomeTextModel.title}
      </h1>
      <ul className="flex flex-col gap-2.5">
        {transformedPostList.map((post: PostCardModel) => (
          <li key={post.name}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </section>
  );
}
