import {
  BlogPostMeta,
  getBlogBackupPostList,
  transformPostList,
} from "@/helpers/backup-markdown-list-helper";
import { PostCardModel } from "@/components/PostCard/postCard.type";
import PostList from "@/components/PostList/PostList";

export default function BlogHomePage() {
  const blogBackupPostList: BlogPostMeta[] = getBlogBackupPostList();
  const transformedPostList: PostCardModel[] =
    transformPostList(blogBackupPostList);
  const blogHomeTextModel = {
    title: "블로그 목록",
  };

  return (
    <section className="py-10">
      <h1 className="mb-10 border-b pb-5 text-4xl font-bold">
        {blogHomeTextModel.title}
      </h1>

      <PostList postList={transformedPostList} />
    </section>
  );
}
