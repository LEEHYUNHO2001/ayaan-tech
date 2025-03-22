---
title: "TypeScript 기반 Next App 설정"
description: "Next, TypeScript, styled-components, prettier 앱을 생성해보자."
date: 2021-12-14T03:06:47.801Z
tags: ["React","next"]
---
![](/images/513a3f62-8673-4ddc-88ad-190efd99259f-image.png)

[SPACE_DEV_CLUB](https://velog.io/@leehyunho2001/SPACEDEVCLUB-%EC%A4%80%EB%B9%84) 프로젝트에서 Front Stack이 위와 같다. 그래서 먼저 간단한 프로젝트를 설계하며 해당 스택들을 사용해보기로 했다.

<br>

> TypeScript 기반 Next App 생성

```
yarn global add create-next-app
create-next-app project-name
```

![](/images/ceac52a9-5951-47ed-9564-105da8573054-image.png)

next 앱을 설치하고 typescript를 추가하려고 했는데 명령어가 동작하지 않았다.

그래서 `yarn create next-app --typescript`으로 typescript를 기반의 next앱을 설치했다. 설치가 완료되면 프로젝트 이름을 결정해주면 된다.

![](/images/bc35f589-0cea-41cb-a07b-21a93ecce8aa-image.png)

package.json을 보면 eslint까지 적용 되어있다.

<br>

> styled-components 추가

```
yarn add styled-components @types/styled-components
yarn add -D babel-plugin-styled-components
```

![](/images/bb0dcee2-ceb2-46aa-ab21-953c163b0ff9-image.png)

이제 styled-components도 추가 되었다.

<br>

* styled-components 테스트

```jsx
// H1 생성
  const H1 = styled.h1`
    color: red;
  `;
```

```jsx
// return 안에 h1태그 작업
<H1>
  Welcome to <a href="https://nextjs.org">Next.js!</a>
</H1>
```

![](/images/6f1e15a5-a76f-48b5-a8ae-c6ffb8fac3eb-image.png)

이제 styled-components를 사용할 수 있다.

<br>

> Prettier

```
yarn add --dev --exact prettier
yarn prettier --write .
```

팀 프로젝트를 진행하므로 프리티어도 설치해주자.

![](/images/766dcbf4-0f5c-4e90-acb7-ddaf9cf758cd-image.png)

![](/images/4c03ace0-b90c-41ee-b799-deb27ffc3f03-image.png)

![](/images/d3b33e46-5f04-4e98-a7b4-9e6134277616-image.png)

위의 사진처럼 VScode에서 설정들을 해주자.

```js
{
  "printWidth": 80,
  "singleQuote": false,
  "semi": true,
  "tabWidth": 2,
  "trailingComma": "all"
}

```

.prettierrc.json 파일에는 위의 코드를 붙여넣자.

![](/images/c1a315f0-e333-45b9-93a0-32863ea2b7fc-image.png)

이제 `yarn dev` 해보면 정상적으로 동작하는것을 볼 수 있다.