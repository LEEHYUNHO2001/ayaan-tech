import fs from "fs";
import path from "path";
import { remark } from "remark";
import html from "remark-html";

// Velog 백업 파일이 있는 디렉터리
const getBlogDirectory = (): string =>
  path.join(process.cwd(), "src", "backup", "content");

const getBlogPostPullNameList = (): string[] =>
  fs.readdirSync(getBlogDirectory());

const removeMarkdownExtension = (fileName: string): string =>
  fileName.replace(/\.md$/, "");

export const getBlogPostNameList = (): string[] => {
  const fileNameList = getBlogPostPullNameList();
  return fileNameList.map(removeMarkdownExtension);
};

// 마크다운 파일을 읽어서 HTML로 변환
export const getMarkdownContent = async (fileName: string): Promise<string> => {
  const filePath = path.join(getBlogDirectory(), `${fileName}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const processedContent = await remark().use(html).process(fileContent);

  return processedContent.toString();
};
