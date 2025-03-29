---
title: "Browserslist 에러를 해결하는김에 알아보자"
description: "오랜만에 실행한 프로젝트에서 Browserslist 에러 발생"
date: 2022-08-12T00:57:07.936Z
tags: ["React","next"]
---
# Warning 발생

![](/images/6667b6e9-e947-4345-b24d-feaa4920ff92-image.png)

> Browserslist: caniuse-lite is outdated.
Please run: npx browserslist@latest --update-db
Why you should do it regularly: https://github.com/browserslist/browserslist#browsers-data-updating


몇 개월전에 설계했던 프로젝트에 추가할 페이지가 있어 먼저 dev로 실행시켰다. 그런데 터미널을 확인해보니 예전에는 없었던 `browserslist`에 관한 경고문을 띄어주고 있었다. 동작하는데 아무 이상이 없었고, 실제로 배포된 도메인도 정상적으로 돌아가고 있었다. 이 경고문에 대해 찾아보니 처음엔 warning으로 시작하지만 나중에는 fail이 되어 동작을 멈출 수 있다고 한다.

<br>

## 해결

```bash
npx browserslist@latest --update-db
```

경고문에서 알려주는 방법을 그대로 터미널에 입력했다. 뭐 대충 browserslist를 업데이트 하라는 의미인 것 같다. [browserslist issues](https://github.com/browserslist/browserslist/issues/492)를 확인해보면 이에 대한 언급들이 있다. [Stackoverflow](https://stackoverflow.com/questions/55271798/browserslist-caniuse-lite-is-outdated-please-run-next-command-npm-update-cani)에도 역시나 이에 대한 설명이 있었다.

<br>

## browserslist

### browserslist를 알아보는 이유

에러는 해결했다. 처음에 나는 나도 모르게 browserslist라는 라이브러리를 사용하고 있는 줄 알았다. 하지만 package.json을 살펴본 결과 설치한 흔적조차 없었다. 나는 사용하지도 않는데 왜 에러가 발생한지에 대해 궁금증도 생기고, 내가 설계한 프로젝트에서 내가 모르는 부분의 에러가 나오는 것은 용납할 수 없었기 때문에  browserslist에 대해 알아보려고 한다.

<br>

### 설명

프로젝트를 설계하다보면 구현한 기능이나 UI가 브라우저마다 다르게 동작하는 것을 볼 수 있다. 우리는 이것을 해결하기 위해 브라우저마다 테스트를 해보며 직접 대응을 한다.

browserslist는 위와 같은 경우와는 조금 다른 대응을 위해 등장했다. **브라우저마다의 환경을 쿼리 문법으로 쉽게 정의**할 수 있다. 예를 들면, `ie 7-10`을 입력함으로써 인터넷익스플로러를 7에서 10버전만 지원한다는 식의 환경을 만들어줄 수 있다. 

![](/images/cbd51184-1d82-4d5c-bdcd-511bfbe05262-image.png)

즉, browserslist를 사용하여  FrontEnd 프로젝트가 여러 브라우저에서 정상적으로 동작할 수 있도록 환경을 만들어 **크로스 브라우저**를 해결할 수 있는 것이다.

<br>

### 어디선가 본 기억이..

어? 생각해보니 이런 설정 어디선가 해본적이 있다. 바로 `.babelrc` 에서 해봤다. 또는 **Webpack에서 bable** 설정할 경우에 사용했다.

```jsx
    {
      "presets": [
        ["env", {
          "targets": {
            "chrome": 52
          }
        }]
      ]
    }
```

이와 같이 브라우저의 특정 버전을 지원, 전 세계 점유율 n% 이상의 브라우저만 지원, 국가 지원 등등 여러가지 설정을 하곤 했다. 그리고 복잡한 관계인 경우 `.browserslistrc` 파일을 따로 생성할 수 도 있었다.

바벨은 브라우저에 따라 사용해야 하는 폴리필의 내용이나 빌드 결과가 달라진다. 이를 판별하기 위해 바벨은 browserslist를 사용하기로 결정했고, 그렇기 때문에 바벨에서 browserslist 설정을 할 수 있는 것이다.

browserslist라는 용어를 몰랐을 뿐.. 나는 Next.js에서 바벨을 사용하고 있으므로 browserslist도 사용하고 있던 것이다.

<br>

## 마무리

예상치 못한 부분의 에러가 발생해서 새로운 지식을 용어(?)를 얻게 되었다. 무언가 사용해보는것도 좋지만 용어를 익혀놓는 것도 중요하다는 것을 알게 된 하루였다..