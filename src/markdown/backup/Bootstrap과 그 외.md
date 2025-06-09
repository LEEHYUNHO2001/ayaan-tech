---
title: "Bootstrap과 그 외"
description: "Bootstrap 페이지에 설명되어 있듯이 세계에서 가장 인기 있는 Front-End 오픈 소스 툴킷이다. "
date: 2021-11-22T08:41:03.471Z
tags: ["CSS"]
---
>## Bootstrap

![](/images/82348596-2221-46c4-8a1c-6756dc180519-image.png)

[Bootstrap](https://getbootstrap.com/) 페이지에 설명되어 있듯이 세계에서 가장 인기 있는 Front-End 오픈 소스 툴킷이다. Bootstrap은 모바일 퍼스트가 되어있기 때문에 더욱 편리하게 사용할 수 있다.

~~커스텀이 힘들다는 단점이..~~

<br>

> 기초

![](/images/1a0066de-81c5-43a4-aa71-a5ef1ad019c2-image.png)

레이아웃이 12*12로 이루어져있다고 생각하면 된다. (grid 개념)

<br>

![](/images/cea3d17e-fd78-4e8a-b3d9-1a7f4e0c9909-image.png)

```html
    <div class="container">
        <div class="row">
            <div class="col-md-4 b">hello world</div>
            <div class="col-md-4 b">hello world</div>
            <div class="col-md-4 b">hello world</div>
        </div>
        <div class="row">
            <div class="col-md-3 b">hello world</div>
            <div class="col-md-3 b">hello world</div>
            <div class="col-md-3 b">hello world</div>
            <div class="col-md-3 b">hello world</div>
        </div>
    </div>
```

그렇다면 위의 레이아웃을 Bootstrap으로 구현해보자. div 3개의 class를 col-md-4으로 주면, 4칸을 차지하는 div 3개가 생기는 것이다.

검은색 부분과 핑크색 부분을 2개의 row(div)로 설계한것은 하나의 예시이다. 보통 디자인이 바뀌지 않는다면 하나의 row로, 바뀐다면 두개의 row로 설계한다.
(여기서 말하는 디자인은 메뉴바, 각각의 기능부분, 푸터 등)

<br>

![](/images/6d188515-5420-432f-8196-7ab2f8524277-sdf.gif)

class를 col-sm-4으로 주면 스크린이 줄어들었을 경우 6, 6, 4, 4, 4, 12 를 차지하는것이 보인다.

* col-xs : 항상 가로로 배치
* col-sm : 768px 이하에서 세로로 표시 시작
* col-md : 992px 이하에서 세로로 표시 시작
* col--lg : 1200px 이하에서 세로로 표시 시작

<br>

![](/images/225d3689-2f87-4fde-a2e7-eb004bf65e5b-image.png)

img-fluid는 부모의 크기를 넘지 않는다. rounded-circle와 같은 속성으로 모양을 바꿀 수도 있다.

<br>

![](/images/ba8f848e-6579-4fc4-9552-dadecfb1960c-%ED%85%8C%EC%9D%B4%EB%B8%94.gif)

class를 table table-hover으로 주게 되면, table 디자인이 되어있고 hover시 위와같이 동작한다.

<br>

이 외에도 **card, modal, alert** 등 더 있다. 궁금하면 [링크](https://getbootstrap.com/docs/5.1/layout/containers/)를 타고 가서 사용해보자.

<br>

> SweetAlert2

Alert를 쉽게 커스터마이징 할 수 있게 편리한 기능을 제공하는 JavaScript 라이브러리이다. 사용법이 쉬운만큼 바로 사용해보자.

![](/images/f32941ea-e932-446d-ab5e-590918dd965c-image.png)

[SweetAlert2](https://www.jsdelivr.com/package/npm/sweetalert2?path=dist)에서 스크립트를 복사하자.

[sweetalert2 github](https://sweetalert2.github.io/)에서 사용하고 싶은 alert를 복사하여 `button onclick=""`에 넣어 사용한다.

![](/images/34f33553-c9c3-4224-914a-f06369c89489-image.png)

괜찮은 디자인의 Alert가 나온것을 볼 수 있다.

<br>

> datepicker

![](/images/11a697c7-c620-4e83-9d34-229984a9bd23-image.png)

[datepicker](https://jqueryui.com/datepicker/)은 jQuery에서 제공하는 위젯 중 하나다. 날짜 선택 달력 기능을 도와준다. 호환성 때문에 많이 사용한다.

직접 기능을 구현하는것도 좋지만 '바퀴는 새로 만들지 말라' 라는 말처럼 잘 구현되어있는 기능을 사용하는것도 좋은 방법이다.

<br>

> TOAST UI Editor

![](/images/15f45fe6-ca2a-48b3-96a1-04bb8e738084-image.png)

문서 편집을 위한 JavaScript 라이브러리다. 마크다운(Markdown)과 위지윅(WYSIWYG) 2가지 모드의 에디터를 제공하여 사용자가 편의에 따라 자유롭게 에디터를 선택할 수 있도록 도와준다.

> Tailwindcss

<img src="https://media.vlpt.us/images/jwhan/post/d48bb9cd-04e4-4185-86ba-73cfbd99a247/tailwindcss.png" />

[tailwindcss](https://tailwindcss.com/)는 Utility-First 컨셉을 가진 CSS 프레임워크다. css를 건드리지 않고 여러가지 작업들을 할 수 있게 해준다.