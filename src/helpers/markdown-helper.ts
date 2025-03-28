import fs from "fs";
import path from "path";
import { remark } from "remark";
import html from "remark-html";

// Velog 백업 파일이 있는 디렉터리
function getBlogDirectory(): string {
  return path.join(process.cwd(), "src", "backup", "content");
}

function getBlogPostPullNameList(): string[] {
  return fs.readdirSync(getBlogDirectory());
}

export function getBlogPostNameList(): string[] {
  return getBlogPostPullNameList().map((fileName: string): string => {
    return fileName.replace(/\.md$/, "");
  });
}

// 마크다운 파일을 읽어서 HTML로 변환
export async function getMarkdownContent(fileName: string): Promise<string> {
  const filePath = path.join(getBlogDirectory(), `${fileName}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const processedContent = await remark().use(html).process(fileContent);

  return processedContent.toString();
}
