import path from "path";

export const REGEX_FIRST_THREE_DASH_BLOCK = /^---\s*([\s\S]+?)\s*---/;

// Velog 백업 파일이 있는 디렉터리
export const getBlogDirectory = (): string =>
  path.join(process.cwd(), "src", "backup", "content");
