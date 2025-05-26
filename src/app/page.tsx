import {
  BlogPostMeta,
  getBlogBackupSpecificPostList,
  transformPostList,
} from "@/helpers/backup-markdown-list-helper";
import PostCard from "@/components/PostCard/PostCard";
import { PostCardModel } from "@/components/PostCard/postCard.type";
import { memoirFileNameList, recommendFileNameList } from "@/constants/post";
import dayjs from "dayjs";

export default function HomePage() {
  const EXPERIENCE_START_DATE = "2022-04-01";
  const blogMemoirPostList: BlogPostMeta[] =
    getBlogBackupSpecificPostList(memoirFileNameList);
  const blogRecommendPostList: BlogPostMeta[] = getBlogBackupSpecificPostList(
    recommendFileNameList
  );
  const transformedMemoirPostList = transformPostList(blogMemoirPostList);
  const transformedRecommendPostList = transformPostList(blogRecommendPostList);

  const getDiffYear = (): number => dayjs().diff(EXPERIENCE_START_DATE, "M");
  const getExperienceYear = (): number => Math.round(getDiffYear() / 12);
  const blogHomeTextModel = {
    title: "소개",
    description: `
      안녕하세요, 프론트엔드 개발자 아얀입니다. 경력은 어느덧 ${getExperienceYear()}년 차가 되었네요.
      저는 평소에 중요하다고 느끼는 내용들을 정리하며 기록하는 습관이 있습니다. 이 기록들을 혼자만 보기 아깝다는 생각에, 블로그를 시작하게 되었습니다.
      개발자가 되기 전부터 기술 블로그를 작성해왔으며, 현재는 실무에서의 경험을 바탕으로 실제로 고민했던 문제들과 그 해결 과정을 중심으로 글을 쓰고 있습니다.
    `,
  };

  return (
    <section className="py-10">
      <h1 className="mb-5 text-4xl font-bold">{blogHomeTextModel.title}</h1>

      <div className="mb-10 flex flex-col border-b pb-5">
        <div className="flex">
          <ul className="flex-1 text-lg leading-7">
            <li className="flex gap-2">
              <span>이메일 :</span>
              <a href="mailto:dlgusgh200240@gmail.com">
                dlgusgh200240@gmail.com
              </a>
            </li>

            <li className="flex gap-2">
              <span>기술 블로그 :</span>
              <a
                href="https://velog.io/@leehyunho2001/posts"
                target="_blank"
                className="hover:underline"
              >
                Velog
              </a>
            </li>

            <li className="flex gap-2">
              <span>깃 허브 :</span>
              <a
                href="https://github.com/LEEHYUNHO2001"
                target="_blank"
                className="hover:underline"
              >
                LEEHYUNHO2001
              </a>
            </li>
          </ul>

          <p className="flex-1 whitespace-pre-line text-lg leading-7">
            {/*{blogHomeTextModel.description}*/}
          </p>
        </div>

        <p className="pt-10 text-lg">{blogHomeTextModel.description}</p>
      </div>

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
    </section>
  );
}
