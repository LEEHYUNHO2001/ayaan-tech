import fs from "fs";
import path from "path";
import { remark } from "remark";
import html from "remark-html";

// 마크다운 파일을 읽어서 HTML로 변환
export async function getMarkdownContent(fileName: string): Promise<string> {
  const filePath = path.join(
    process.cwd(),
    "src",
    "backup",
    "content",
    `${fileName}.md`
  );
  const fileContent = fs.readFileSync(filePath, "utf-8");

  const processedContent = await remark().use(html).process(fileContent);
  return processedContent.toString();
}
