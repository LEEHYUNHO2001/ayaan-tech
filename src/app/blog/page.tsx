import { BlogPostMeta, getBlogPostList } from "@/helpers/markdown-list-helper";

export default function BlogHomePage() {
  const blogPostList = getBlogPostList();
  const blogHomeTextModel = {
    title: "블로그 목록",
  };

  return (
    <section>
      <h1>{blogHomeTextModel.title}</h1>
      <ul>
        {blogPostList.map(({ name }: BlogPostMeta) => (
          <li key={name}>
            <a href={`/blog/${name}`}>{name}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}
