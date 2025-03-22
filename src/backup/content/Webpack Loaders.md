---
title: "Webpack Loaders"
description: "웹팩은 자바스크립트로 만든 모듈 뿐 아니라 css, html, 이미지 리소스 등등 모든것을 로더를 사용하여 모듈처럼 다룰 수 있다."
date: 2022-01-18T14:33:04.171Z
tags: ["CS","JavaScript","React"]
---
[웹팩에 대한 이전 글](https://velog.io/@leehyunho2001/Webpack)이 있으므로 먼저 보고 온다면 좋을 것이다.

* 현재 디렉터리 구조
  * src
    * app.js
    * plus.js
  * index.html
  * myLoader.js
  * webpack.config.js

## Loader

### Custom Loader

```js
//myLoader.js
module.exports = function myLoader(item) {
  console.log("hello my loader");
  return item.replace("console.log(", "alert(");
};

```

app.js에서 콘솔 찍는 부분을 alert로 바꿔보려고 한다.

```js
//webpack.config.js
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    main: path.resolve("./src/app.js"),
  },
  output: {
    filename: "[name].js",
    path: path.resolve("./dist"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [path.resolve("./myLoader.js")],
      },
    ],
  },
};

```

module 부분이 추가되었다. 여기에 로더에 대한 설정을 해주면 된다.

로더가 처리할 파일의 패턴을 test에 넣어주자. 정규표현식을 사용했는데, .js로 끝나는 모든 문자를 가져오고 있다.

use는 로더를 등록하는 곳이다.

![](/images/9617c7a3-102c-4110-aefe-58c1e39b5706-image.png)

이제 alert로 나타나는 것을 볼 수 있다.

<br>

### Loader들..

우리는 로더를 만들어서 사용해보았다. 앞으로 로더는 누군가 만들어둔 것을 사용할 확률이 매우 높다. 다양한 로더 중에 몇 가지 알아보고 어떻게 사용하는지 알아보자.

#### css-loader & style-loader

css-loader는 자바스크립트 파일에 css 를 불러와서 사용할 수 있게 한다. 우리는 웹팩으로 css 를 모듈처럼 사용해보자.

```css
body{
	background-color: black;
}
```
style.css에서 바디에 백그라운드 컬러를 검정으로 주고있다.

```js
//js 파일에서 css파일 import 하는중..
import "./style.css";
```

![](/images/0f8b551a-795c-4948-b2d9-80be55961802-image.png)

원래는 자바스크립트 파일에서 css를 import로 불러올 수 없다. 하지만 css-loader라는 로더가 있다면 불러올 수 있다.

```bash
npm install css-loader
```

css-loader 을 설치하자.

![](/images/2a4cf2da-b625-4d5d-aef2-ece60de2cd7b-image.png)

css-loader을 설치해주면 package.json에도 잘 들어간 것을 볼 수 있다.

```js
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: [path.resolve("./myLoader.js")],
      // },
      {
        test: /\.css$/,
        use: ["css-loader"],
      },
    ],
  },
```

이제 css-loader을 로더로 사용하기 위해 wepack.config.js에 로더를 추가해주면 된다. test에는 .css파일을 가져오기 위한 정규표현식을 적어주고, use에는 우리가 설치한 css-loader을 넣어주면 된다.

<br>

이제 import로 css를 불러올 수 있고, main.js 에는 css 파일이 문자열로 변환 된다.

하지만 배경색이 검정색이 아니다. 아직 css가 html에 나타나고 있지 않는 것이다. 

자바스크립트에 들어있는 css 코드가 html에 없기 때문이다. html에 자바스크립트에 있는 css를 넣어주기 위해 사용하는것이 바로 style-loader이다.

```bash
npm install style-loader
```

style-loader도 설치하자.

```js

use: ["style-loader", "css-loader"],
```

wepack.config.js의 use에 style-loader도 넣어주자. 뒤에있는 로더부터 실행되기 때문에 style-loader은 css-loader 앞에 넣어주자.

![](/images/f30ebb12-dabf-483a-9a8b-f7bb2573d443-image.png)

이제 검은색 배경이 적용되었다.

<br>

#### File-loader

File-loader는 이미지 파일을 모듈처럼 사용할 수 있다.

이미지 파일을 모듈에서 불러오게 되면 이미지의 이름이 해시 값으로 바뀌어 있는 것을 확인할 수 있다. 

이는 이미지가 갱신되었을 때 파일명이 기존과 동일할 경우 브라우저가 여전히 이전 이미지를 보여주는 경우를 막기 위해서 이다. 캐시값이 기존의 이미지를 저장하고 다시 부르게 되는 경우에 이미지가 업데이트 되는 것을 방지한다.

[https://v4.webpack.js.org/loaders/file-loader/](https://v4.webpack.js.org/loaders/file-loader/)

원래 웹팩5 이전까지는 파일을 모듈링 하기 위해서는 file-loader 라는 로더를 따로 설치해야 했지만 웹팩5로 오면서 더 이상 필요하지 않게 되었다.

<br>

#### Base64 포멧으로 이미지 불러오기

간단한 이미지의 경우 다운로드하여 사용하지 않고 문자열로 그려내는 방법이 있다.

마치 svg 이미지를 xml코드로 그려낼 수 있는 것 처럼, 일반적인 이미지 파일도 base64문자열 포멧으로 만들 수 있다.

```js
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: [path.resolve("./myLoader.js")],
      // },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        type: "asset/inline",
      },
    ],
  },
```

png, jpg, gif, svg에 대해서 [asset/inline](https://webpack.kr/guides/asset-modules/) 로더를 넣어주고 있다.(따로 설치할 필요는 없다.) 웹팩5 이전에는 [url-loader](https://v4.webpack.js.org/loaders/url-loader/) 를 따로 설치했어야 하지만 이제는 사용하지 않는다. 

이렇게 문자열로 표현된 이미지는 다운로드를 하는것이 아니기 때문에 로딩 속도가 빠르다. 하지만 너무 복잡한 이미지를 base64로 만들게 되면 오히려 코드가 너무 길어저 로딩이 느려질 수 있다.

```jsx
type: 'asset',
parser: {
	dataUrlCondition: {
	maxSize: 20 * 1024 // 20kb
	}
},
```

만약 변경하고 싶은 이미지의 크기에 제한을 두고 싶다면 type을 ‘asset’ 으로 변경하고 이 코드를 추가한다.

<br>

> 마무리

#### Plugins

로더는 어떤 파일을 대상으로 어떤 일을 처리하기 위해 사용했다. Plugins은 번들링한 결과물을 컨트롤하기 위해 사용한다. 예를들어 자바스크립트 난독화, CSS나 HTML을 minify 하여 용량을 줄이는 등의 역할을 할 수 있다.

다음에는 플러그인에 대해서 알아볼 예정이다.
