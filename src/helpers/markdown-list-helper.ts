import fs from "fs";
import path from "path";
import { replace, map, pipe } from "ramda";
import dayjs, { Dayjs } from "dayjs";
import {
  extractFrontMatter,
  getMarkdownFrontMatterModel,
  MarkdownFrontMatterModel,
} from "@/helpers/markdown-matter-helper";
import { getBlogBackupDirectory } from "@/helpers/markdown-common-helper";

export interface BlogPostMeta extends MarkdownFrontMatterModel {
  name: string;
  dayjs: Dayjs;
}

const getBlogPostFullNameList = (): string[] =>
  fs.readdirSync(getBlogBackupDirectory());

const removeMarkdownExtension = replace(/\.md$/, "");

const getBlogPostMetaData = (fileFullName: string): BlogPostMeta => {
  const filePath = path.join(getBlogBackupDirectory(), fileFullName);
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
