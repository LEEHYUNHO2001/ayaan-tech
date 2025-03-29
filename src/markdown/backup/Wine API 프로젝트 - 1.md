---
title: "Wine API 프로젝트 - 1"
description: "샘플 API에서 와인 데이터를 이용한 프로젝트"
date: 2021-12-21T13:13:35.136Z
tags: ["React","next","typescript"]
---
샘플 API에서 와인에 대한 데이터를 가져와 읽고, CRUD를 하는 프로젝트를 설계하게 되었다.

- Front-End Stack
   - React Hooks
   - Next
   - TypeScript
   - styled-components
   - Emotion

`yarn create next-app wine.likelion.com --typescript` 으로 Next 개발 환경을 세팅해주고, 타입스크립트를 추가해주었다.

src 디렉터리를 생성해서 그 안에 pages 디렉터리를 옮겨주었다. 나중에 styled-components를 사용할 것이므로 styles 디렉터리는 삭제해 줄 것이다.

![](/images/cb423b44-7e59-4ba2-b72b-06794961c51b-image.png)

`pages` 폴더에서 특정한 폴더나 파일을 만들면 해당 폴더나 파일이 Route 역할을 한다.

이제 `/wines` 경로로 가면 `wines` 디렉터리의 `index.tsx`가 실행되는 것이다. (`/wines/whites`는 `wines` 디렉터리의 `whites.tsx`)

![](/images/3d6277c7-7a01-4ea9-ae5a-bbbf81d0bff9-image.png)

당장 사용할 페이지들을 생성했다. 그리고 간단하게 [Vercel 로 배포](https://vercel.com/)해주었다. 내가 원하던 동작과 일치하는 것을 볼 수 있다.

간단하게 페이지들을 생성해주었으니 다음에는 데이터를 불러와서 사용해보자.