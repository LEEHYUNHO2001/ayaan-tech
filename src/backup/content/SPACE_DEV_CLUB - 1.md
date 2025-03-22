---
title: "SPACE_DEV_CLUB - 1"
description: "Velog와 유사한 웹 사이트 설계 프로젝트를 6명의 팀원과 진행하게 되었다."
date: 2021-12-13T00:10:50.640Z
tags: ["React","next","typescript"]
---
Velog와 유사한 웹 사이트 설계 프로젝트를 6명의 팀원과 진행하게 되었다.

여러가지 Stack들 중에서 어떤 것을 사용할지 회의 끝에 결정했다.

### Stack
* Front
  *  React Hooks
  *  Next.js(SSR)
  *  styled-component
  *  TypeScript
  
* Back
  * Express
  * Axios
  * DB 미정(Mysql or MongoDB)
  * 배포 미정(AWS or Netilfy)

* 협업 툴
  *  Slcak
  *  Notion
  *  GitHub

<br>

### GitHub 초대
![](/images/edcd9efa-927b-44ff-86c5-80295fdadb28-image.png)

팀원들과 회의하며 초기셋팅을 하고 푸시된 GitHub 레파지토리를 나의 로컬에 clone했다. 우리는 속도적인 측면을 위해 **`yarn`** 을 사용하기로 하여 `yarn install` 으로 모듈들을 설치해주었고,  초기 셋팅에 맞게 `yarn dev` 로 실행시켰다.

하지만 `Failed to load next.config.js`가 나타났다. 삽질을 하던 도중 무의식적으로 나는 `node -v`를 입력했고 노드 버전이 매우 낮은것을 알게되었다. 그래서 [윈도우 노드 최신 버전 설치](https://nodejs.org/en/download/) 에서 최신 버전을 설치해주었다. 그리고 다시한번 버전을 확인해주니 최신 버전으로 올라갔다.

`yarn dev`로 다시 프로젝트를 실행해주어 정상적으로 초기 셋팅이 된 페이지가 동작했다.

나를 포함한 팀원들이 TypeScript를 사용해본 경험이 없었다. 그래서 다음주까지 [게임 만들기 Velog](https://velog.io/@teo/2021-%EC%9B%B9-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EA%B3%B5%EB%B6%80%EB%B2%95-%EC%9E%85%EB%AC%B8%EC%9E%90%ED%8E%B8-%EC%BB%A4%EB%A6%AC%ED%81%98%EB%9F%BC)에 있는 다른 글자 찾기 게임을 Next와 TypeScript로 설계하며 학습해오기로 했다.