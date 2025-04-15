import path from "path";
import fs from "fs";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeHighlight from "rehype-highlight";
import rehypeStringify from "rehype-stringify";
import { pipe, replace, trim } from "ramda";
import {
  extractFrontMatter,
  getMarkdownFrontMatterModel,
  MarkdownFrontMatterModel,
  REGEX_FIRST_THREE_DASH_BLOCK,
} from "@/helpers/backup-markdown-matter-helper";
import { getBlogBackupDirectory } from "@/helpers/markdown-common-helper";

export interface MarkdownContentModel extends MarkdownFrontMatterModel {
  content: string;
}

const removeMatter: (fileContent: string) => string = replace(
  REGEX_FIRST_THREE_DASH_BLOCK,
  ""
);

// 마크다운 파일을 읽어서 HTML로 변환
export const getBackupMarkdownContentWithoutMatter = async (
  fileName: string
): Promise<MarkdownContentModel> => {
  const filePath = path.join(getBlogBackupDirectory(), `${fileName}.md`);

  if (!fs.existsSync(filePath)) {
    throw new Error("FilePath Not Found");
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const frontMatter = extractFrontMatter(fileContent);

  if (!frontMatter) {
    throw new Error("FrontMatter Not Found");
  }

  const frontMatterModel = getMarkdownFrontMatterModel(frontMatter);

  const markdownBody = pipe(removeMatter, trim)(fileContent);
  const processedContent = await remark()
    .use(remarkGfm) // GitHub Flavored Markdown 지원
    .use(remarkRehype) // 마크다운을 rehype로 변환
    .use(rehypeHighlight) // 코드 하이라이팅
    .use(rehypeStringify) // HTML로 변환
    .process(markdownBody);

  return {
    ...frontMatterModel,
    content: processedContent.toString(),
  };
};
