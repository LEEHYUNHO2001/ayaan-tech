import fs from "fs";
import path from "path";
import { map, pipe, filter } from "ramda";
import dayjs, { Dayjs } from "dayjs";
import {
  extractFrontMatter,
  getMarkdownFrontMatterModel,
  MarkdownFrontMatterModel,
} from "@/helpers/backup-markdown-matter-helper";
import {
  getBlogDirectory,
  getBlogPostFullNameList,
  removeMarkdownExtension,
} from "@/helpers/markdown-common-helper";
import { PostCardModel } from "@/components/PostCard/postCard.type";

export interface BlogPostMeta extends MarkdownFrontMatterModel {
  name: string;
  dayjs: Dayjs;
}

export const getBlogBackupDirectory = () =>
  getBlogDirectory(["src", "markdown", "backup"]);

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

export const getBlogBackupPostList = (): BlogPostMeta[] =>
  pipe(
    getBlogBackupDirectory,
    getBlogPostFullNameList,
    map(getBlogPostMetaData),
    sortPostsByDate
  )();

export function transformPostList(postList: BlogPostMeta[]): PostCardModel[] {
  return postList.map((item: BlogPostMeta) => ({
    name: item.name,
    description: item.description,
    date: item.dayjs.format("YYYY-MM-DD"),
    tagList: item.tagList,
  }));
}

const isIncludedIn = (list: string[]) => (item: string) => list.includes(item);
const filterByNameList = (nameList: string[]) => filter(isIncludedIn(nameList));

export const getBlogBackupSpecificPostList = (
  specificFileNameList: string[]
): BlogPostMeta[] =>
  pipe(
    getBlogBackupDirectory,
    getBlogPostFullNameList,
    filterByNameList(specificFileNameList),
    map(getBlogPostMetaData),
    sortPostsByDate
  )();
