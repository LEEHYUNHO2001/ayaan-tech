import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tailwindcss from "eslint-plugin-tailwindcss";
import prettier from "eslint-plugin-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // 기존 설정 복사
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:prettier/recommended"
  ),
  // ESLint 규칙 추가
  {
    plugins: { tailwindcss, prettier },
    rules: {
      // Tailwind 관련 설정
      "tailwindcss/classnames-order": "warn", // Tailwind 클래스 정렬
      "tailwindcss/no-custom-classname": "off", // 사용자 지정 클래스 허용
      "react/no-unescaped-entities": "off", // JSX에서 ' 사용 가능

      // Prettier 관련 설정
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto", // 운영체제에 맞는 endOfLine 설정
        },
      ], // Prettier 규칙 위반 시 ESLint 에러로 표시
    },
  },
];

export default eslintConfig;
