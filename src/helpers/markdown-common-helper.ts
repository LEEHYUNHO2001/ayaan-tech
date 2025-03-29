import path from "path";

// Velog 백업 파일이 있는 디렉터리
export const getBlogBackupDirectory = (): string =>
  path.join(process.cwd(), "src", "markdown", "backup");
