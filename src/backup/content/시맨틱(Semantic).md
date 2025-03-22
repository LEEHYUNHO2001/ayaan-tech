---
title: "시맨틱(Semantic)"
description: "직역을 하자면 의미론적 HTML이다. 문서의 의미에 맞게, 어플리케이션의 의미에 맞게 HTML을 작성하는것을 의미한다."
date: 2021-08-25T08:55:07.387Z
tags: ["html"]
---
>## Semantic HTML이란?

직역을 하자면 **의미론적 HTML**이다. 문서의 의미에 맞게, 어플리케이션의 의미에 맞게 HTML을 작성하는것을 의미한다. semantic하게 코드를 설계하면 협업을하는 다른 개발자나 제 3자도 알아보기 쉬울것이다.

장점이 가독성만으로 끝나는것이 아니다. SEO(Search Engine Optimization)을 향상시킴으로써 웹 페이지의 방문자 수를 늘릴 수 있다. 또한 모바일 사용자나 장애가 있는 사용자의 접근성을 더 향상시켜주기도 한다.

<br />

<img src="https://codecademy-content.s3.amazonaws.com/courses/Semantic+HTML/SemanticVSNonSemantic-Diagram.svg" />

div나 span은 포함되는 내용에 대한 어떠한 정보도 제공하지 못한다. 왼쪽 그림과 같이 Non-Semantic하게 설계하면 기능적으로는 문제가 없지만 가독성이 떨어지게된다. 하지만 Semantic하게 구현한다면 한눈에봐도 대충은 의미를 파악할 수 있다.

<br /><br />

>## Semantic Tag

그렇다면 어떤 semantic tag들이 있는지 알아보자.

* **자주 사용하는 Semantic tag**
  * **header**
  페이지 상단에 사용한다.
  주로 로고나 네비게이션바를 포함한다. 보통 제목태그 h1~h6와 같이 사용한다.
  하나의 문서안에 여러개의 header tag가 올 수 있다.(문서 전체의 헤더일수도 있고, 특정 영역의 헤더일수도 있음)
  
  * **nav**
  네비게이션바. 사이트 전체 흐름을 제어하는 기능을 담당한다.
  페이지 이동등의 주요 메뉴가 배치된다.
  문서 안의 모든 링크가 nav영역안에 포함되는것은 아니다.
  
  * **main**
  문서의 주요 콘텐츠를 나타내고, 한번만 사용 가능하다.
  
  * **session**
  제목을 갖고 있으면서 문서 전체와 관련이 있는 콘텐츠의 집합이다.
  공지사항, 포스트, 댓글도 session이 될 수 있다.
  article 아래에도 올 수 있다.
  제목태그 h1~h6을 가져야 한다.
  
  * **article**
  문서 본문 중 독립된 콘텐츠이며, 개별뉴스 기사 또는 게시물이다.
  session이 여러개의 콘텐츠 묶음이라면, article은 그 자체로 독립적인 콘텐츠이다.
  
  * **footer**
  꼬리말 혹은 바닥글이다.
  article이나 session 내의 부가정보를 표기할 때도 사용할 수 있다.
  하나의 문서안에 여러개의 footer tag가 올 수 있다.
  주로 회사소개, 약관, 저작권, 제장 정보등을 표시하는데 사용된다.
  
  * **aside**
  사이드 바라고 불리며 사이드에 배치되는 경우가 많다. 아래에 올 수도 있다.
  css를 활용하여 스타일을 지정한다.
  광고 영역 등에 활용된다.

* 미디어를 삽입 Semantic tag
  * **video src=""**
  * **audio src=""**
  * **embed src=""**
  미디어링크를 걸거나 폴더 내 미디어를 청부할 경우 상대 경로를 적는다.
  video tag가 항상 보이지 않도록 설정하려면 video not supported를 태그 사이에 넣어준다.
  embed 태그는 어느 종류의 미디어라도 다 넣을 수 있다.
  
* 그 외 tag
  * figure
  이미지나 다이어그램, 코드 조각 같은 것을 담을때 사용한다.
  
  * figcatpion
  미디어에 대한 설명을 작성할 경우 사용한다.
  보통 figure 태그 안에 사용한다.
  
  * mark
  강조하는 부분에 사용한다.
  
  * detail
  사용자가 열고 닫을 수 있는 정보(위젯)다.
  별도 제목을 정할 수도 있다.
  
  * summary
  detail과 함께 쓰인다.
  
  * time
  날짜와 시간을 감싼다.
  
  
<br /><br /><br /><br /><br /><br />

  
[nonipc](https://nonipc.com/entry/%EC%8B%9C%EB%A7%A8%ED%8B%B1-%ED%83%9C%EA%B7%B8semantic-tag-%EC%82%AC%EC%9A%A9-%EB%B0%A9%EB%B2%95) [2srin](https://2srin.tistory.com/146)


