import dayjs from "dayjs";
import {
  BlogPostMeta,
  getBlogBackupPostList,
} from "@/helpers/backup-markdown-list-helper";
import BlogChart from "@/components/BlogChart/BlogChart";
import HomePostSection from "@/components/HomePostSection/HomePostSection";

export default function HomePage() {
  const EXPERIENCE_START_DATE = "2022-04-01";
  const blogBackupPostList: BlogPostMeta[] = getBlogBackupPostList();
  const blogPostDateList: string[] = blogBackupPostList.map(
    (blogBackupPost: BlogPostMeta) => blogBackupPost.dayjs.format("YYYY-MM")
  );
  const blogBackupPostLength = blogBackupPostList.length;

  const getDiffYear = (): number => dayjs().diff(EXPERIENCE_START_DATE, "M");
  const getExperienceYear = (): number => Math.round(getDiffYear() / 12);
  const blogHomeTextModel = {
    title: "소개",
    description: `안녕하세요, 프론트엔드 개발자 아얀입니다.
      어느덧 경력 ${getExperienceYear()}년 차가 되었네요.
      
      저는 평소 중요하다고 느낀 내용을 정리하고 기록하는 습관이 있습니다. 이 기록들이 단지 저만 보기엔 아깝다는 생각이 들어 블로그를 시작하게 되었습니다.
      
      개발자가 되기 전부터 기술 블로그를 작성해왔기 때문에, 예전 글을 보면 당연한 내용을 적어두거나 잘못된 정보도 있을 수 있습니다. 하지만 그 모든 기록이 저의 성장 과정이라 생각하기에 소중히 간직하고 있습니다.
      
      현재는 실무에서 실제로 겪은 문제들과 그에 대한 고민, 해결 과정을 중심으로 조금 더 깊이 있는 글을 쓰고자 노력하고 있습니다.
    `,
  };

  return (
    <section className="py-10">
      <article className="mb-10 flex gap-6 border-b pb-5">
        <div className="flex flex-1 flex-col">
          <h1 className="mb-5 text-3xl font-bold">{blogHomeTextModel.title}</h1>

          <p className="whitespace-pre-line">{blogHomeTextModel.description}</p>
        </div>

        <div className="flex-1">
          <div className="mb-8 pl-8">
            <h3 className="mb-2 text-xl font-bold">요약</h3>

            <ul className="text-sm text-gray-600 dark:text-gray-300">
              <li>📚 총 포스트 수: {blogBackupPostLength}개</li>
              <li>📝 주요 주제: 프론트엔드, 실무 회고, 커리어</li>
              <li>🎯 목표: 경험 공유를 통한 성장</li>
            </ul>
          </div>
          <BlogChart postDateList={blogPostDateList} />
        </div>
      </article>

      <HomePostSection />
    </section>
  );
}
