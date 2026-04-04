import path from "path";
import fs from "fs";
import { replace } from "ramda";

// Velog 백업 파일이 있는 디렉터리
export const getBlogDirectory = (pathList: string[]): string =>
  path.join(process.cwd(), ...pathList);

export const getBlogPostFullNameList = (directory: string): string[] =>
  fs.readdirSync(directory).filter((file) => file.endsWith(".md"));

export const removeMarkdownExtension = replace(/\.md$/, "");
