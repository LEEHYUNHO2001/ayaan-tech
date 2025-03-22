---
title: "CSS 설계 기법, CSS 난독화, 컨벤션"
description: "Bem과 CSS 난독화 개념을 배워보고, 컨벤션을 읽어보자."
date: 2021-11-10T02:29:53.494Z
tags: ["CSS"]
---
>## CSS 설계 기법
( Block Element Modifier )

* **Bem**

<img src="https://media.vlpt.us/images/bjw1622/post/dee75c1c-f01b-4864-9f99-ef6d04ded760/image.png" />

* Block : 독립적으로 존재하고 재사용 가능한 요소

* Element :  블록 내에서 실제 기능을 담당하는 요소

* Modifier는 element의 기능이나 속성을 의미

<br>

기본적으로는 OOCSS 와 같은 모듈 기반의 방법을 뿌리로 한다.

header태그 안에서 검색창을 만든다고 가정하자.
.header__search-form 의 형태로  css에서 form을 꾸며주는 것이다.

>Bem에 대한 더 자세한 것은 [jaiyah](https://webclub.tistory.com/263) 글을 참고하자.

<br>

* **OOCSS**

레고처럼 여러가지 모듈을 만들어서 조합하도록 하는 방법론이다.

```css
.btn{
            width: 200px;
            height: 80px;
            font-size: 30px;
            font-weight: bold;
        }
        .btn-close{
            background: black;
            color: white;
            border: 3px dotted white;
        } 
```

![](/images/7de14795-4429-4a7c-a595-e890e10e06aa-image.png)

기본 버튼의 모양을 만들어 놓고, 스킨을 붙이는 식이다. 

컨테이너와 콘텐츠의 분리도 해야한다. 컨텐츠의 스타일 선택자에 컨테이너의 클래스를 배제한다.

<br>

* **SMACSS**

css 코드를 역할에 따라 분리한다. 역할에는 베이스, 레이아웃, 모듈, 스테이트, 테마가 있다.

<img src="https://64.media.tumblr.com/84f3bc9b0c17a1cba8ed2384bd8055bd/04b9185ca98a3a84-37/s540x810/3f2b2c9edb6f34e78df94ed601a9b906634c0b98.png" />

1. **베이스**
프로젝트의 표준 스타일을 정의
전체적으로 사용되는 폰트 패밀리,  폰트 사이즈, reset 스타일, `<img>` 공통 스타일 등이 포함

2. **레이아웃**
헤더, 메인영역, 푸터, 사이드 바와 같은 웹사이트에서 큰 틀을 구성하는 모듈에 관한 규칙
대부분 페이지에 몇개 존재하지 않기 때문에 ID 선택자를 사용

3. **모듈**
레이아웃안에 배치되는 모든 요소를 의미
반복되는 요소들이기 때문에 ID 선택자를 사용하지 않으며, 요소 선택자의 사용을 최소화
(자식 요소에만 적용)
비슷한 모듈안에서도 모양이 조금씩 다를 경우 서브클래스를 만듬 (btn-small, btn-long 등등)

4. **스테이트**
기존 스타일을 덮어쓰거나 확장하는데 사용하는 스타일
서브클래스와 다른 점은 레이아웃이나 모듈에 둘 다 적용가능하며, 서브클래스가 한번 적용되면 바뀌지 않는 속성임에 비해 스테이트는 자바스크립트로 필요할때 넣었다 뺐다 할 수 있다는 점이다.
클래스 이름은 앞에 is 라는 접두사를 사용 (is-hidden, is-active … )

5. **테마**
사용자에게 사이트의 느낌을 전달하는 이미지(background-image), 색상(background-color, color … ) 등을 의미

<br>

>## CSS 난독화

![](/images/84cb9f68-006d-4ae5-bd92-cfc712e0de40-image.png)

커다란 기업들은 보통 class명이 위와 같이 되어있다. 도통 알아볼수가 없다. 크롤링을 방어하기 위해 CSS 난독화를 하는 것이다.

<br>

<img src="https://khs9628.github.io/img/Django/logo/crawling.PNG" />

<br>

크롤링은 데이터를 수집하고 분류하는 것을 의미하며, 주로 인터넷 상의 웹페이지(html, 문서 등)를 수집해서 분류하고 저장하는 것을 뜻한다.

즉, 웹에 있는 정보를 나의 컴퓨터로 가져오는 것이다. 업무 자동화를 이용하여 수많은 정보들을 가져올 수 있다. 

<br>

<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--2xWAX-T4--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/i/esponpfday5909dv6kfi.png" />

<br>

class명이 고정되어있으면(ex - class="menu") 잡아서 긁어온다. 이러한 크롤링은 서비스 부하를 일으킨다. CSS 난독화는 서비스 부하를 방지하기 위함이라고 보면 된다.

API Server는 편의를 위한 서버이기도 하지만, 서비스 부하를 줄이고자 따로 만드는 서버이다. 확장성을 고려하여 항상 API Server도 염두해두고 서비스를 개발하면 미래에 도움이 될 것이다.

<br>

> ## 컨벤션

개발자들에게 **컨벤션**의 의미는 **개발자 사이의 규칙**이다.

코딩 규칙을 지키면 다른 개발자가 그 소스 코드를 처음 보았을 때, 이해하기 용이하다. 가독성이 올라가는 것이다.

<br>

<img src="https://t1.daumcdn.net/cfile/tistory/262E854955C2D8A40B" />

<br>

소프트웨어를 개발하는 일련의 모든 과정에 들어가는 비용 중 80%가 유지보수에 쓰여지는 만큼 컨벤션은 매우 중요하다.

[구글 컨벤션](https://google.github.io/styleguide/htmlcssguide.html)과 [NHN 컨벤션](https://nuli.navercorp.com/data/convention/NHN_Coding_Conventions_for_Markup_Languages.pdf)을 빠르게 읽어보았다. 기업의 스타일들이 잘 드러나있었는데, 훑어보는 것만으로도 충분히 공부가 되었다.

컨벤션마다 차이가 많이 나지만, 개발자들이 협업을 위해 어떤식으로 코딩을 하는지 경험해 볼 수 있었다.