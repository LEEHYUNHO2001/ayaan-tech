import fs from "fs";
import path from "path";
import { remark } from "remark";
import html from "remark-html";
import { replace, map, pipe } from "ramda";
import dayjs, { Dayjs } from "dayjs";
import {
  extractFrontMatter,
  getMarkdownFrontMatterModel,
  MarkdownFrontMatterModel,
} from "@/helpers/markdown-matter-helper";

export interface BlogPostMeta extends MarkdownFrontMatterModel {
  name: string;
  dayjs: Dayjs;
}

// Velog 백업 파일이 있는 디렉터리
const getBlogDirectory = (): string =>
  path.join(process.cwd(), "src", "backup", "content");

const getBlogPostFullNameList = (): string[] =>
  fs.readdirSync(getBlogDirectory());

const removeMarkdownExtension = replace(/\.md$/, "");

const getBlogPostMetaData = (fileFullName: string): BlogPostMeta => {
  const filePath = path.join(getBlogDirectory(), fileFullName);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const frontMatter = extractFrontMatter(fileContent);

  if (!frontMatter) {
    throw new Error("FrontMatter Not Found");
  }

  const frontMatterModel: MarkdownFrontMatterModel =
    getMarkdownFrontMatterModel(frontMatter);

  return {
    name: removeMarkdownExtension(fileFullName),
    ...frontMatterModel,
    dayjs: dayjs(frontMatterModel.date),
  };
};

const sortPostsByDate = (postList: BlogPostMeta[]): BlogPostMeta[] =>
  postList.sort((a, b) => b.dayjs.valueOf() - a.dayjs.valueOf());

export const getBlogPostList = (): BlogPostMeta[] =>
  pipe(getBlogPostFullNameList, map(getBlogPostMetaData), sortPostsByDate)();

// 마크다운 파일을 읽어서 HTML로 변환
export const getMarkdownContent = async (fileName: string): Promise<string> => {
  const filePath = path.join(getBlogDirectory(), `${fileName}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const processedContent = await remark().use(html).process(fileContent);

  return processedContent.toString();
};
