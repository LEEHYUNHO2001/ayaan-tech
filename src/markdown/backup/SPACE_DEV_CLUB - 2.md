---
title: "SPACE_DEV_CLUB - 2"
description: "Stack 선정한것 업데이트, 역할 분담"
date: 2022-01-03T04:06:40.438Z
tags: ["React","next","typescript"]
---
### Stack

* Front
  *  React
      * Hooks
      * ContextAPI
  *  Next.js
  *  ~~styled-components~~ -> Emotion(styled)
  *  TypeScript
  *  API
      * SWR
      * Axios
  
* Back
  * strapi
  * 배포 미정(AWS or Netilfy)

* 협업 툴
  *  Slcak
  *  Notion
  *  GitHub
  
회의를 거친 결과 styled-components는 babel과 같은 작업들을 직접 해주는 과정이 필요하여 emotion을 사용하기로 했다.

상태관리는 이 프로젝트에서 Redux의 필요성을 느끼지 못해 ContextAPI로 결정했다.

관리자 페이지를 통해 컨텐츠를 관리 및 모델링과 쉽게 백엔드를 구축하기 위해 strapi를 사용한다.

<br>

### 데이터 구조

![](/images/73765d50-ff63-4d09-9a52-ac0811edba3f-image.png)

데이터 구조부터 모델링 해보았다.

먼저 웹 사이트에 로그인 및 로그아웃 기능이 있어야한다. 유저의 정보를 저장할 User 테이블이 필요하다. 블로그에 글을 작성하기 위해서는 Post 테이블도 필요할 것이다.

포스트에 '좋아요' 기능을 수행하기위한 Likepost, 댓글 기능에 사용될 Comment 테이블 등 기능에 따른 테이블의 구조를 정의해주었다.

<br>

### 역할 분담

![](/images/7d45f74f-2499-4905-81ec-fbb194684d58-image.png)

프로젝트의 구조를 메인페이지, 마이페이지, 상세페이지 및 에디터로 크게 3가지로 분류하고, 세부적으로 기능들을 분류했다. 그 후 역할 분담이 이루어졌다.

![](/images/5d1e6772-3512-41b5-ba7b-0b3c83973e16-image.png)

공식적인 회의는 노션에 기록하고 있다. 공식적인 회의 외에도 Discord나 Slack에 자주 모여서 의사소통 하며 프로젝트를 설계하고 있다.

브랜치는 main과 develop이 있고, 기능 및 페이지에 따라 develop 에서 새로운 브랜치를 생성하고 merge시키는 방향으로 결정했다. develop브랜치에서 bug없이 정상적으로 동작하면 추후에 main 브랜치에 merge하는 것이다.

<br>

> 마무리

![](/images/72f2f86e-8b22-4eb8-b98d-509dca153c80-image.png)

이상적인 프로젝트 구조를 뇌에서 미리 설계하고 코드를 짤 수 있는 수준이 아니여서 먼저 하드코딩 후 추상화를 할 것이다.