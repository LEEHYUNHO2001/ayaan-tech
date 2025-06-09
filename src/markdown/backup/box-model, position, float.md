---
title: "box-model, position, float"
description: "CSS 설계시 필요한 개념들"
date: 2021-11-04T11:53:35.049Z
tags: ["CSS"]
---
>## box-model

box-model에 대해 [정리해두었던 글](https://velog.io/@leehyunho2001/CSS-%EA%B8%B0%EC%B4%88-box-model)을 조금 더 보완했다. 개념이 헷갈린다면 먼저 보고오자.

<br>

>## position

* static

```html
  <div class="box1">box1</div>
  <div class="box2">box2</div>
```

```css
  .box1{
    position:static;
    background-color: red;
    color:white;
    width: 100px;
    height: 100px;
  }
  .box2{
    position:static;
    background-color: blue;
    color:white;
    width: 100px;
    height: 100px;
  }
  ```

![](/images/ef537732-6b6d-44c4-b359-8271dbbdba65-image.png)

모든 태그는 기본적으로 position이 static으로 되어있다. div로 box1, box2를 만들었을 때, box1 밑에 box2가 위치되는것이 static이다.

보통 부모 객체에 position값이 있을 경우 이를 무시하기 위해 사용된다.

<br>

* relative


```html
  <div class="box1">box1</div>
  <div class="box2">box2</div>
```

```css
    .box1{
        position: static;
        background-color: green;
        color: white;
        width: 100px;
        height: 100px;
    }
    
    .box2{
        position: relative;
        left: 40px;
        top: 30px;
        background-color: red;
        color: white;
        width: 100px;
        height: 100px;
    }
```

![](/images/0aa25334-3877-47e9-9289-ebd70fb174ce-image.png)

relative는 자신의 자리로 부터 위치를 변경시킬 경우 사용한다. box1 밑에 box2가 있는데, box2는 현재 box1밑의 자리를 기억하고 있는 것이다.

이와같이 위치를 기억시키면 left: 20px와 같은 효과를 주면 현재 자리에서 20만큼 이동하는 것이다.

position이 relative가 아니라면 left값을 주어도 이동하지 않는다.

<br>

* absolute

```html
  <div class="box1">box1</div>
  <div class="box2">
    box2
    <div class="box3">box3</div>
  </div>
```

```css
    .box1{
        position: static;
        background-color: red;
        color: white;
        width: 100px;
        height: 100px;
    }

    .box2{
        position: relative;
        left: 40px;
        top: 30px;
        background-color: blue;
        color: white;
        width: 100px;
        height: 100px;
    }
    
    .box3{
        position: absolute;
        left: 100px;
        top: 100px;
        background-color: blue;
        color: white;
        width: 100px;
        height: 100px;
    }
```

![](/images/098f956a-dae4-472f-a78b-9df619e3612d-image.png)

relative, absolute, fixed 같은 position 속성이 부모에 놓여있다면, absolute는 position 속성을 가진 가장 가까운 부모의 박스 내를 기준으로 한다. 부모나 그 위에도 아무 속성도 없을 경우 body가 기준점이 된다.

HTML을 보면 box2는 부모이고 box3는 자식이다. box2가 relative이므로, box3는 box2의 위치부터 자신의 위치이다. left와 top을 100px씩 주었으니 box2의 오른쪽 아래 모서리 부분으로 옮겨진 것이다.
~~absolute는 따로 위치를 지정해주지 않으면 자신 위치에 있음~~

<br>

```html
  <div class="box1">box1</div>
  <div class="box2">box2</div>
  <div class="box3">box3</div>
```

![](/images/4d53a470-37e6-4c43-ae1c-6f1aa9d94b96-image.png)

만약에 CSS는 방금 예시와 같고 ,위의 HTML 처럼 부모 자식이 없을경우 body가 기준점이 되어 box3는 box1의 왼쪽 위 모서리부터 시작점이 된다. 그래서 left와 top에 100px씩 주면 box1의 오른쪽 아래 모서리쪽으로 box3가 이동 한 것이다.

<br>

```html
    <div class="box1">box1</div>

    <div class="기준">
        <div class="box2">box2</div>
        <div class="box3">box3</div>
    </div>
```

```css
    .box1{
        position: static;
        background-color: red;
        color: white;
        width: 100px;
        height: 100px;
    }

    .기준 {
        position: relative;
    }
    
    .box2{
        position: absolute;
        left: 40px;
        top: 30px;
        background-color: blue;
        color: white;
        width: 100px;
        height: 100px;
    }

    .box3{
        position: absolute;
        left: 50px;
        top: 50px;
        background-color: green;
        color: white;
        width: 100px;
        height: 100px;
    }
```

![](/images/ae01526a-236c-4a8e-b9be-ac1b8f09a74d-image.png)



기준점 class가 relative이고, box2와 box3가 absolute이므로, 빨간 박스 밑에가 시작점이다.

z-index로 앞에 보여질 box를 설정할 수도 있다.

<br>


* fixed

![](/images/48130ff3-b955-494b-8773-011cec97599b-image.png)

스크롤을 올리거나 내릴 때, 특정 박스가 고정되어 움직이지 않았으면 할 경우 사용한다. 구글 검색 창이나 웹 사이트들의 메뉴바 같은것을 생각하면 된다.


<br>
<br>

>## float

![](/images/8274a753-3d60-4162-a50f-438902190262-image.png)

[float MDN](https://developer.mozilla.org/ko/docs/Web/CSS/float)에서 float 동작을 쉽게 볼 수 있으니 먼저 링크를 타고가서 사용해보길 권장한다.

float를 사용하기 위해서는 position이 absolute가 되면 안된다. 더 궁금하면 clear도 알아보자.

[overflow MDN](https://developer.mozilla.org/ko/docs/Web/CSS/overflow)을 가볍게 한번 보는것도 추천한다.

<br>

> 새로 알게된 사실

코딩을 하면서 자연스럽게 요소가 쌓이는 흐름을 전문용어로
normal-flow 라고 한다. 그런데 absolute, float를 적용하면 그 흐름에서 벗어나게 된다.


> 마무리

강사님이 svg같은 배우지 않은 스킬을 사용하지 않고 CSS로 간단하게 자신만의 캐릭터를 만들어보라는 과제를 내주셨다. 너무 독보적인 캐릭터를 생각하다보니 귀엽게 만들지는 못한거 같다.
~~귀여운거 만들껄..~~

![](/images/74ea2f9e-a5b2-4116-b31f-48ac8178ccd0-React_man.jpg)
~~리액트맨ㅋㅋㅋㅋㅋㅋㅋ~~


다음에는 [라이언 그리기](https://zinee-world.tistory.com/426)를 혼자 해봐야겠다.
