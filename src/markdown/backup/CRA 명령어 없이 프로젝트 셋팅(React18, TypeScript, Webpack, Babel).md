---
title: "CRA 명령어 없이 프로젝트 셋팅(React18, TypeScript, Webpack, Babel)"
description: "CRA없이 React18환경으로 프로젝트를 셋팅해보자. tsconfig와 webpack을 활용하여 절대 경로도 설정해줄 것이다."
date: 2022-04-29T02:31:19.305Z
tags: ["CSS","React","React18","typescript"]
---
# CRA, CNA

```bash
npx create-react-app [프로젝트 이름] --template typescript
yarn create next-app [프로젝트 이름] --typescript
```

보통 프로젝트를 시작하기 전에 CRA나 CNA를 통해 쉽게 셋팅할 수 있다. 알아서 구조를 다 잡아주기 때문에 바로 코드만 치면 설계가 가능하다.

하지만 webpack등 코어한 부분을 건드려야 할 경우 결국 eject를 해야하는데 이것도 쉽지 않다. (cra의 경우 eject라는 명령어가 있는데 이것을 한번 입력하면 돌이킬 수 없어진다.) eject를 사용하면 다른 패키지와의 의존성을 신경쓰게 되는데 이 경우 One Build Dependency의 장점을 잃게된다.

프로젝트 생성 명령어 없이 셋팅는 것은 정말 나에게 필요한 것들로만 구성한다는 점에서 매력적인것 같다.

이번 글에서는 CRA 없이 React18 프로젝트를 셋팅하는 방법을 알아보고, 다음에는 CNA없이 NEXT.js프로젝트를 셋팅해보려고 한다.

<br>

## 셋팅 후 디렉터리 구조 예상

```bash
config
├── webpack.common.js
├── webpack.dev.js
└── webpack.prod.js

public
└── index.html

src
├── App.tsx
├── index.tsx

.babelrc
.eslint.js
.prettierrc.js
package.json
tsconfig.extend.json
tsconfig.js
```

<br>

## init

```bash
yarn init -y
```

자동으로 package.json이 하나 생성된다. 만약에 name, version, main, license를 직접 넣으며 작업하고 싶다면 -y 빼고 입력하자.

<br>

## React

```bash
yarn add react react-dom 
yarn add -D @types/react @types/react-dom typescript

yarn add -D react-refresh @pmmmwh/react-refresh-webpack-plugin

yarn add @emotion/react @emotion/styled
```

React를 사용하기 위해 설치해주자. react-refresh는 유용한 플러그인으로, 코드를 고치고 새로고침이나 새로 빌드를 해주지 않더라도 변경된 사항이 자동으로 수정된다.

emotion을 사용하지 않는다면, 해당 부분은 빼도 좋다.

<br>

## Public

```jsx
//public/index.html
<!DOCTYPE html>
<html lang="ko">
  <meta charset="utf-8" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
  />
  <head>
    <title>React</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>

```

정적 파일을 넣을 public 디렉터리를 생성하고, 필수 요소인 index.html을 작성하자. index.html이 왜 필요한지 모른다면 React (SPA) 의 개념을 공부해보자.

<br>

## babel

```bash
yarn add -D @babel/cli @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript babel-loader @emotion/babel-plugin babel-plugin-styled-components
```
바벨은 JSX와 ES6+를 브라우저가 읽을 수 있도록 es5로 변환해주는 트랜스파일러이다. 프론트엔드 개발자에게 필수적으로 필요하다.

babel/core는 트랜스파일을 해주는 코어 기능만 있기 때문에 JSX를 위한 preset-react와 ES6+를 위한 preset-env를 설치하자.

@emotion/babel-plugin는 개발자도구에서 태그에 자동적으로 붙는 class값을 커스터마이징 하기 위해 사용한다. (협업과 개발자 도구 볼때 좋음. 밑에 설명 첨부.)

<br>

```jsx
//.babelrc
{
  "presets": [
    [
      "@babel/preset-react",
      { "runtime": "automatic", "importSource": "@emotion/react" }
    ],
    [
      "@babel/preset-env",
      { "modules": false, "useBuiltIns": "usage", "corejs": 3 }
    ],
    "@babel/preset-typescript"
  ],
  "plugins": [
    [
      "@emotion/babel-plugin",
      {
        "autoLabel": "dev-only",
        "labelFormat": "[dirname]-[filename]-[local]"
      }
    ]
  ]
}
```
위에서 설치한 preset을 .babelrc파일에 넣어주자. `runtime: "automatic"`은 React v17부터 설정해준다고 한다.

<br>

## src

```jsx
//src/index.tsx
import { createRoot } from 'react-dom/client';

import App from '@/App';

const container = document.getElementById('root');
const root = createRoot(container as Element);
root.render(<App />);
```

React18에 맞게 index 파일을 생성하자. 밑에서 나중에 tsconfig와 webpack을 사용하여 절대경로를 설정하는데, 참조를 `@/App`  와 같이 사용할 수 있다.

<br>

```jsx
//src/App.tsx
import styled from '@emotion/styled';

const App = () => <Container>Hello HyunHo</Container>;
const Container = styled.div`
  background-color: red;
`;

export default App;
```

위에 바벨 설정에서 emotion 플러그인 부분에 대해 설명하기 위해 Container라는 emotion 컴포넌트를 하나 생성했다.

<br>

![](/images/a4b26406-8b17-4402-8a8f-74f381dc13cd-image.png)

개발자 도구를 확인해보면 plugins 덕분에 class값이 커스텀한대로 적용되었다. (아직 webpack 설정 등 아무것도 안해서 위에서부터 보고 따라하신 분은 프로젝트 실행을 할 수 없다.)

<br>

## TypeScript

```bash
npm install typescript -g
tsc --init
```

이 명령어를 입력하면 tsconfig.json 파일이 만들어진다. 입맛에 맞게 설정하자. (tsc 명령어를 못찾는다면 글로벌로 한번 설치한 후에 해보자.)

```js
{
  "extends": "./tsconfig.extend.json",
  "compilerOptions": {
    "outDir": "./dist",
    "target": "es5",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noImplicitAny": true,
    "jsx": "react-jsx"
  },
  "include": ["src"]
}
```

tsconfig.json파일을 설정해주었다. 추가하고싶은 설정은 추가하고, 나에게 필요없는 설정이 있다면 개발자 입맛에 맞게 끄면 된다.

<br>

```js
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

tsconfig.json에서 extends할 tsconfig.extend.json파일을 생성하고, 절대경로 설정을 해주자.

가끔 정상적으로 설정해도 빨간불이 안사라지는 경우가 있는데 src 경로에 index.tsx하나 생성해보고 그래도 에러인경우 VSCode를 껏다 켜보자.

<br>

```jsx
  resolve: {
    alias: { "@": path.resolve(__dirname, "../src") },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
  },
```

webpack을 사용하는 경우에 절대 경로를 사용하기 위해서는 webpack에서도 alias를 설정해줘야 한다. (webpack 부분에서 절대 경로 부분이 추가된 코드가 첨부되어 있다. 미리 언급 한번 한 것이다.)

<br>

## Webpack

### webpack 기본 모듈 설치

```bash
yarn add -D webpack webpack-bundle-analyzer webpack-cli webpack-dev-server webpack-merge
```

webpack을 사용하기 위한 모듈들도 설치해주자. develop와 production에 대한 설정을 나누어서 할 수 있도록 webpack-merge도 설치했다. config파일에 이렇게 webpack 파일 3개를 놓는다면 가독성이 훨씬 증가할 것이다.

webpack-dev-server는 proxy를 이용하여 localhost 환경에서 개발할때 cors 문제를 해결하기 좋다. 또한, 변경에 따라 새로고침되는 개발 서버를 띄우기 위해 필요하고, 디스크에 저장되지 않는 메모리 컴파일을 사용하여 컴파일 속도도 빠르다.

> webpack 동작 순서
1. 서버 실행 시 소스 파일들을 번들링하여 메모리에 저장소스 파일을 감시
2. 소스 파일이 변경되면 변경된 모듈만 새로 번들링
3. 변경된 모듈 정보를 브라우저에 전송
4. 브라우저는 변경을 인지하고 새로고침되어 변경사항이 반영된 페이지를 로드

<br>

### webpack 플러그인 및 로더 설치

```bash
yarn add -D babel-loader style-loader css-loader file-loader core-js css-minimizer-webpack-plugin html-webpack-plugin mini-css-extract-plugin terser-webpack-plugin
```

웹팩은 JavaScript 코드만 읽기때문에 HTML, CSS 등을 위한 로더들을 설치해주자.

> babel-loader : JSX 및 ES6+ 문법을 트랜스파일링
css-loader : CSS 파일을 자바스크립트가 이해할 수 있도록 변환
style-loader : CSS Loader를 통해 가져온 CSS 내용을 style 태그를 생성해서 head 태그 안에 주입
file-loader : 모듈 내에서 import 또는 require 키워드를 통해 사용하고자 하는 파일들을 모듈로 읽어 들일 수 있게 해주는 로더



개발시에는 style-loader를 사용하고, 배포할 경우 mini-css-extract-plugin을 사용한다.

mini-css-extract-plugin 으로 JS와 분리시킨 CSS 정적 파일은 압축이나 불필요한 코드가 포함되어 있는 등 최적화가 되지 않아서 css-minimizer-webpack-plugin로 최적화 해준다.

CSS 압축을 위해서 css-minimizer-webpack-plugin을 사용하였더니, 기존에 잘 압축되었던 JS 파일의 최적화가 되지 않는 문제가 발생하여 terser-webpack-plugin를 사용한다.


> [참고자료](https://intrepidgeeks.com/tutorial/module-system-and-webpack-2)
  
<br>

> html-webpack-plugin : HTML 파일에 번들링된 자바스크립트 파일을 삽입해주고 번들링된 결과가 저장되는 폴더에 옮겨줌
@pmmmwh/react-refresh-webpack-plugin - 좀 더 우수한 핫 리로드 패키지인 react-refresh 사용
clean-webpack-plugin : 번들링을 할 때마다 이전 번들링 결과를 제거함 (위에선 설치 안함)

<br>

### webpack 셋팅

#### webpack.common.js

```jsx
//webpack.common.js
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
// const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

module.exports = {
  entry: `${path.resolve(__dirname, "../src")}/index.tsx`,
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${path.resolve(__dirname, "../public")}/index.html`,
    }),
    new webpack.ProvidePlugin({ React: "react" }),
    new ReactRefreshWebpackPlugin(),
    // new BundleAnalyzerPlugin(),
  ],
  resolve: {
    alias: { "@": path.resolve(__dirname, "../src") },
    extensions: [".js", ".ts", ".jsx", ".tsx", ".css", ".json"],
  },
};
```

HtmlWebpackPlugin을 사용하면 html 파일을 자동으로 생성해 주기 때문에 output을 입력하지 않아도 번들 파일이 dist에 생성된다.

<br>

#### webpack.dev.js

```jsx
//webpack.dev.js
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    open: false,
    hot: true,
    compress: true,
    port: 3000,
    historyApiFallback: true,
    liveReload: true,
  },
  output: {
    filename: "[name].[contenthash].js",
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: ["style-loader", "css-loader", "file-loader"],
      },
    ],
  },
});
```

#### webpack.prod.js

```jsx
//webpack.prod.js
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
module.exports = merge(common, {
  mode: "production",
  devtool: "cheap-module-source-map",
  output: {
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "../dist"),
    publicPath: "/",
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [new MiniCssExtractPlugin()],
  optimization: {
    usedExports: true,
    minimize: true,
    minimizer: [
      new TerserPlugin({ terserOptions: { compress: { drop_console: true } } }),
      new CssMinimizerPlugin(),
    ],
    splitChunks: { chunks: "all" },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});
```

현재 개발모드와 배포모드에서 devtools가 다른데, 궁금하다면 [devtool 참고](https://perfectacle.github.io/2016/11/14/Webpack-devtool-option-Performance/) 해보자.

빌드시 filename이 신기하게 되어있다. 이것은 [zerocho](https://www.zerocho.com/category/Webpack/post/58aa916d745ca90018e5301d) 님의 글을 보았다.

> [hash]는 매번 웹팩 컴파일 시 랜덤한 문자열을 붙여준다. [hash]가 컴파일할 때마다 랜덤 문자열을 붙여준다면 [chunkhash]는 파일이 달라질 때에만 랜덤 값이 바뀐다. 이것을 사용하면 변경되지 않은 파일들은 계속 캐싱하고 변경된 파일만 새로 불러올 수 있다. 

사실 path와 publciPath에 대한 글도 많이 찾아보았는데, 아직 정확히 어떻게 설정하면 좋은 것인지 모르겠다..

<br>

## eslint

```bash
yarn add eslint eslint-config-airbnb eslint-config-next eslint-config-prettier eslint-import-resolver-typescript eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-simple-import-sort eslint-plugin-testing-library prettier --dev

yarn add @typescript-eslint/parser @typescript-eslint/eslint-plugin --dev
```

eslint 설정을 위한 것들을 설치해준다. (위의 설정은 내가 쓰는것들이므로 사용하고 싶은 것을 사용하면 된다.)

<br>

```js
  "scripts": {
    "dev": "webpack-dev-server --config config/webpack.dev.js",
    "prod": "webpack-dev-server --config config/webpack.prod.js",
    "build:dev": "webpack --config config/webpack.dev.js",
    "build:prod": "webpack --config config/webpack.prod.js",
    "lint": "npx eslint --init"
  }
```

이제 package.json에서 명령어 설정을 해준다. 그 후 eslint설정을 위해 yarn lint를 입력한다. (나의 설정을 추가하기엔 너무 길어서 패스했다.)

<br>

```jsx
//.prettierrc.js
module.exports = {
  $schema: "http://json.schemastore.org/prettierrc",
  arrowParens: "avoid",
  bracketSpacing: true,
  jsxSingleQuote: false,
  printWidth: 100,
  proseWrap: "always",
  quoteProps: "as-needed",
  semi: true,
  singleQuote: true,
  tabWidth: 2,
  trailingComma: "es5",
  useTabs: false,
};
```

이제 프리티어까지 설정해주면, 코드의 가독성 및 협업을 위한 셋팅까지 한 것이다.

<br>

## 마무리

사실 이 글을 작성하는데 꽤 오래걸렸다. 셋팅하면서 오류나는것도 많았고, React18로 오면서 생기는 문제인지 아닌지에 대한 고민도 많이 해서 그런것 같다.

CNA없이 NEXT.js프로젝트를 셋팅도 해보고 글을 작성해봐야겠다.

<br>



> [path와 publicPath](https://intrepidgeeks.com/tutorial/detailed-description-of-publicpath-path-problem-in-webpack), [webpack 참고](https://blog.joyfui.com/1243), [React18 셋팅](https://ryuhojin.tistory.com/19), [SWC](https://github.com/emotion-js/emotion/issues/1897)