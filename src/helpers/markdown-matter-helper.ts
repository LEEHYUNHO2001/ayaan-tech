import { REGEX_FIRST_THREE_DASH_BLOCK } from "@/helpers/markdown-common-helper";

export interface MarkdownFrontMatterModel {
  title: string;
  description: string;
  tagList: string[];
  date: string;
}

const REGEX_DATE = /date:\s*([^\n]+)/;
const REGEX_TAG_LIST = /tags:\s*\[(.+?)\]/;

// 백업한 md 파일에서, 첫번째의 ---로 감싸진 블럭 찾기
export const extractFrontMatter = (content: string): string | null => {
  const match = content.match(REGEX_FIRST_THREE_DASH_BLOCK);
  return match ? match[1] : null;
};

// 특정 필드 값 추출하는 함수
const extractValue =
  (key: string) =>
  (str: string): string | null =>
    str.match(new RegExp(`${key}:\\s*"?([^"]+)"?`))?.[1] ?? null;

// date가 정확하게 한 줄로 존재하도록 처리한 람다 함수
const extractDate = (str: string): string | null =>
  str.match(REGEX_DATE)?.[1] ?? null;

// 태그 배열 추출 함수
const extractTagList = (frontMatter: string): string[] | null => {
  const match = frontMatter.match(REGEX_TAG_LIST);
  return match
    ? match[1].split(",").map((tag) => tag.trim().replace(/["']/g, ""))
    : null;
};

export const getMarkdownFrontMatterModel = (
  frontMatter: string
): MarkdownFrontMatterModel => ({
  title: extractValue("title")(frontMatter) ?? "",
  description: extractValue("description")(frontMatter) ?? "",
  date: extractDate(frontMatter) ?? "",
  tagList: extractTagList(frontMatter) ?? [],
});
