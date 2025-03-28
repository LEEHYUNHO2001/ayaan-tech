import { getBlogPostNameList } from "@/helpers/markdown-helper";

export default function BlogHomePage() {
  const blogPostNameList = getBlogPostNameList(); // 서버에서 실행됨
  const blogHomeTextModel = {
    title: "블로그 목록",
  };

  return (
    <section>
      <h1>{blogHomeTextModel.title}</h1>
      <ul>
        {blogPostNameList.map((postName: string) => (
          <li key={postName}>
            <a href={`/blog/${postName}`}>{postName}</a>
          </li>
        ))}
      </ul>
    </section>
  );
}
