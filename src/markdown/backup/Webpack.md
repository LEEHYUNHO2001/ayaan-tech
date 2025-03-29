---
title: "Webpack"
description: "여러가지 파일을 하나의 파일로 합쳐주는 번들러의 기능을 하는 웹팩"
date: 2022-01-18T03:23:31.505Z
tags: ["CS","JavaScript","React"]
---
# Webpack이란 ?

![](/images/e6540166-5007-4350-8b19-65206f6a44da-image.png)

모던 자바스크립트 애플리케이션을 위한 모듈 번들러이다. 모듈 번들러란 웹 애플리케이션을 구성하는 HTML, CSS, JavaScript 등을 모두 각각의 모듈로 보고 이들을 조합하여 하나의 결과물로 만든다.

하나의 결과물로 만드는 작업은 왜 필요할까?

브라우저의 성능이 높아지고 자바스크립트 어플리케이션이 점점 고도화되면서 유지보수의 난이도가 높아졌다. 이를 해결하기 위해 자바스크립트를 기능 단위로 분리하여 사용하는 코드의 모듈화가 필요해졌다. 자바스크립트 모듈시스템의 등장 이전에 모듈패턴이 있었고 ES6 이후 정식 지원하게 된 모듈 시스템이 있었지만 IE계열 브라우저는 지원하지 않았다. **모든 브라우저 환경에서 이런 모듈 시스템을 사용할 수 있도록 만들어진 도구가 웹팩이다.**

여러가지 파일을 하나의 파일(번들)로 합쳐주는 번들러의 기능을 하는 웹팩은 FrontEnd 개발자라면 알아야 한다.

웹팩에서 우리가 주의깊게 봐야 할 개념은 **Entry, Output, Loaders, Plugins** 이다.

```bash
//웹팩 설치
npm install -D webpack webpack-cli
```

<br>

## 잠깐 npm에 대해..

### npm의 버전 관리

```bash
npm install react
```

보통 우리는 이렇게 라이브러리를 간단하게 설치한다. package.json을 확인해보면 버전이 x.y.z 형식으로 나타난다. 앞에서부터 순서대로 메이저, 마이너, 패치라고 부른다.

* 메이저 : 기존 버전과 호환되지 않게 api 가 바뀌는 경우
* 마이너 : 기존 버전과 호환되면서 새로운 기능이 추가된 경우
* 패치 : 기존 버전과 호환되면서 버그를 수정한 경우

### 범위 명시 법

1. 틸더(tilde) : ~ 기호로 표시한다. 마이너 버전이 명시가 되어있다면 패치버전을 갱신하고, 마이너 버전이 명시가 안되어 있다면 마이너 버전을 갱신한다.

2. 캐럿(Caret) : ^ 기호로 표시한다. 마이너와 패치 버전을 갱신한다. 정식버전이 0이라면 패치만 갱신한다.

![](/images/3704830c-bcf0-40ab-a2e1-bd37cf5397a1-image.png)

npm은 캐럿을 사용한다.

메이저 업데이트를 해버리면 현재 프로젝트에서 예상치 못한 에러가 나타날 수 있다. 그래서 react의 최신 버전을 갱신하고 싶어서 `npm install react`를 하면 마이너와 패치 버전이 갱신되는 것이다.

![](/images/3602d946-25e4-4c99-9205-1094b06787d0-image.png)

틸더는 ~ 를 사용하는것을 볼 수 있다. 이 상태에서 `npm install react`을 하면 16.3.2 버전이 된다.

<br>

## 모듈

먼저 모듈에 대해서 간단하게 다루어보자.

<br>

### 원시적인 번들링

* 구조
  * index.html
  * app.js
  * plus.js
  
```js
//plus.js
function plus(a, b) {
  return a + b;
}
```

```js
//app.js
console.log(plus(1, 2));
```

```html
    <!-- HTML -->
    <script src="plus.js"></script>
    <script src="app.js"></script>
```

![](/images/3ec61a8f-5a48-4e77-8d21-b4d634379ea8-image.png)

크롬 개발자 도구에서 console창을 열어보자. 외부에서 plus함수가 접근 가능하다. 모듈화가 되지 않은 것이다. 전역환경이 오염되었다고도 말한다.

![](/images/2c239bcf-efa0-4e79-9005-973897058e99-image.png)

외부에서 접근이 가능하면 이와 같은 현상이 발생할 수 있다.

<br>

### 모듈화 예제 1

```js
//plus.js
const myObj = {};

(function () {
  function plus(a, b) {
    return a + b;
  }
  myObj.plus = plus;
})();

```

```js
//app.js
console.log(myObj.plus(1, 2));
```

![](/images/f7920b99-7852-44a2-96eb-568353bd29dd-image.png)

이 함수는 더이상 전역에 존재하는것이 아니기 때문에 외부에서 접근할 수 없다. 클로저를 이용하여 모듈화한 예제이다.

<br>

### 모듈화 예제 2

```js
//plus.js
export function plus(a, b) {
  return a + b;
}
```

```js
//app.js
import { plus } from "./plus.js";

console.log(plus(1, 2));
```

```html
    <!-- HTML -->
    <!-- <script src="plus.js"></script> -->
    <script type="module" src="app.js"></script>
```

![](/images/8329ae0f-6917-45b8-ba5e-46a3ffb32794-image.png)

이 방법도 외부에서 plus에 접근하지 못하게 하는 비교적 최신 모듈링 방식이다.

웹팩은 이 두개의 모듈화 예제 사이에서 나타난 라이브러리라고 보면 된다.

<br>

### 웹팩을 이용한 번들링

웹팩으로 번들링 하기 위해서는 **entry, output, mode** 옵션을 설정해야 한다.

npx webpack —help 로 옵션을 확인해보자.

>- -entry <value...> : 모듈의 시작점을 설정합니다. webpack이 내부의 디펜던시 그래프를 생성하기 위해 사용해야 하는 모듈입니다. 엔트리 포인트가 직간접적으로 의존하는 다른 모듈과 라이브러리를 찾아냅니다.
- -o, --output-path <value> : 웹팩으로 생성되는 파일의 위치를 설정합니다.
- —mode : 번들링 모드를 결정합니다. Development 모드와 production 모드가 있으며 Production 모드의 경우 코드를 최적화하여 용량을 줄입니다. 

먼저 src 디렉터리에 app.js와 plus.js를 넣어주었다.

<br>

```bash
npx webpack --mode development --entry ./src/app.js -o ./dist
```

![](/images/5aeb284e-8034-4721-b216-cf98f6b3077d-image.png)

dist 디렉터리와 그 안에 main.js가 생성되었다.

```html
  <!-- <script src="plus.js"></script> -->
  <!-- <script type="module" src="./src/app.js"></script> -->
  <script src="dist/main.js"></script>
```

이제 index.html에서 dist 디렉터리의 main.js를 불러오면 된다. 우리가 위에서 입력한 명령어 덕분에 웹팩이 app.js와 연관된 것들을 번들링 하여 main.js를 생성한 것이기 때문이다.

<br>

### webpack.config.js

하지만 app.js 파일이 변경될 때마다 위의 명령어를 입력해주어야 한다. 이 작업을 피하기 위해서는 웹팩 설정 파일을 생성하면 된다.

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
};

```

node.js 문법인 module.export, path 등을 사용한다. 운영체제별로 경로의 표현이 다르다. path는 이런 경로를 운영체제에 맞게 변환해주는 것이다.

entry의 main 부분이 name에 들어가게 된다. 그래서 main.js가 생성되는 것이다.

<br>

![](/images/6a1467cf-4069-40bb-b2cd-2bd575e0ef56-image.png)

webpack.config.js 파일을 작성 후 package.json 파일을 수정하자. ("build": "webpack")

이제 npm run build 를 실행하면 npm 이 자동으로 webpack의 webpack.config.js 파일을 참고하여 코드를 실행시킨다.

```js
//app.js
import { plus } from "./plus.js";

console.log(plus(1, 5));
```

```bash
npm run build
```

![](/images/6ef1d05d-5af1-4d7c-b728-761a28f4019a-image.png)

index.html에는 dist의 main.js를 스크립트로 가져오고 있다. app.js의 코드를 수정하고 터미널에서 위의 간단한 명령어로 이제 번들링 할 수 있다. 결과도 확인해보니 1 + 5의 합인 6으로 잘 나오는것을 볼 수 있다.