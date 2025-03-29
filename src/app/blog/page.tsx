import {
  BlogPostMeta,
  getBlogBackupPostList,
} from "@/helpers/backup-markdown-list-helper";

export default function BlogHomePage() {
  const blogBackupPostList = getBlogBackupPostList();
  const blogHomeTextModel = {
    title: "블로그 목록",
  };

  return (
    <section>
      <h1>{blogHomeTextModel.title}</h1>
      <ul>
        {blogBackupPostList.map(({ name }: BlogPostMeta) => (
          <li key={name}>
            <a href={`/blog/${name}`}>{name}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}
