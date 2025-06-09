import { CareersHomeTextModel } from "@/app/careers/careers.type";
import CareerCard from "@/components/CareerCard/CareerCard";
import FlipHintArrow from "@/components/FlipHintArrow/FlipHintArrow";

export default function CareersHomePage() {
  const careersHomeTextModel: CareersHomeTextModel = {
    title: "경력 소개",
    subTitle: "교육",
    careerList: [
      {
        label: "IGAWORKS",
        description:
          "국내 유일의 종합 데이터 테크 SaaS 기업 아이지에이웍스에서 프론트엔드 개발자로 근무하며, 다양한 직군과 협업해 서비스 개발과 유지보수를 담당하고 있습니다.",
        mainRole: "FrontEnd Developer",
        // subRole: "Web SDK Developer",
        stackList: ["Vue3", "Vue2", "Next.js", "JavaScript", "TypeScript"],
        period: ["2022.11", "현재"],
        experienceList: [
          "마이크로 프론트엔드 아키텍쳐",
          "디자인 토큰 기반 디자인 시스템",
          "API 모델 기반, 프론트 모델 자동 생성",
          "MSW 및 스토리북을 통한 DX 향상",
        ],
        serviceList: [
          "디파이너리1.0",
          "디파이너리2.0",
          "애드브릭스2.0",
          "Web SDK",
        ],
      },
      {
        label: "Togi",
        description:
          "스타트업 환경에서 빠르게 변화하는 요구사항에 대응하며, 사용자 중심의 UI/UX와 다양한 인터랙션 요소를 통해 고객의 시선을 사로잡는 데 기여했습니다.",
        mainRole: "FrontEnd Developer",
        stackList: ["Next.js", "JavaScript", "TypeScript"],
        period: ["2022.03", "2022.09"],
        experienceList: [
          "화려한 인터렉션 구현",
          "최적화를 위한 관심사 분리",
          "방능형 웹 설계 및 모바일 대응",
        ],
        serviceList: [
          "Togi / Togivision 홈페이지",
          "모바일 쿠폰 웹 페이지",
          "내부 크롬 익스텐션",
        ],
      },
      {
        label: "네이버 시스템",
        description:
          "영상플랫폼 팀에서 과제를 통해 백엔드와 프론트엔드 개발을 경험했습니다. 프론트엔드 개발자의 길을 걷기로 결심하는 계기가 되었습니다.",
        mainRole: "SW Engineer (인턴)",
        stackList: ["JavaScript", "TypeScript"],
        period: ["2021.03", "2021.06"],
        experienceList: [
          "웹 풀스택 개발 입문",
          "CRUD 게시판",
          "ffmpeg 기반 플레이어",
          "프론트엔드 개발자가 되기 위한 준비",
        ],
        serviceList: [],
      },
    ],
    educationList: [
      {
        label: "멋쟁이 사자처럼",
        description:
          "인턴 이후에 독학을 하던 중, 체계적인 학습의 필요성을 느껴 '멋쟁이 사자처럼'에 참여했습니다. 기초를 탄탄하게 다지며, 개발자가 되기 위한 역량을 쌓았습니다.",
        period: ["2021.10", "2022.01"],
      },
      {
        label: "명지대학교",
        description:
          "정보통신공학과를 전공했으며, 4학년 2학기에는 웹 개발 인턴을 통해, 현장에서 실무자들의 업무를 확인해보는 경험을 했습니다.",
        period: ["2015.03", "2021.08"],
      },
    ],
  };

  return (
    <section className="py-10">
      <h1 className="mb-10 border-b pb-5 text-center text-4xl font-bold">
        {careersHomeTextModel.title}
      </h1>
      <article className="relative">
        <ul className="flex flex-col items-center gap-10">
          {careersHomeTextModel.careerList.map((career) => (
            <CareerCard
              key={career.label}
              mainRole={career.mainRole}
              subRole={career.subRole}
              stackList={career.stackList}
              label={career.label}
              description={career.description}
              period={career.period}
              experienceList={career.experienceList}
              serviceList={career.serviceList}
            />
          ))}
        </ul>

        <FlipHintArrow className="absolute right-20 top-4 animate-bounce" />
      </article>

      {/*<article className="pt-20">*/}
      {/*  <h2 className="mb-10 border-b pb-5 text-center text-3xl font-bold">*/}
      {/*    {careersHomeTextModel.subTitle}*/}
      {/*  </h2>*/}

      {/*  <ul className="flex justify-center gap-10">*/}
      {/*    {careersHomeTextModel.educationList.map((education) => (*/}
      {/*      <EducationCard*/}
      {/*        key={education.label}*/}
      {/*        label={education.label}*/}
      {/*        description={education.description}*/}
      {/*        period={education.period}*/}
      {/*      />*/}
      {/*    ))}*/}
      {/*  </ul>*/}
      {/*</article>*/}
    </section>
  );
}
