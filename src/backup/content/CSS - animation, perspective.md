---
title: "CSS - animation, perspective"
description: "css가 재밌으면서 어려워지는.. "
date: 2021-11-09T12:04:49.523Z
tags: ["CSS"]
---
> keyframes

keyframes은 animation이 만들어지는 부분이다. from ~ to 를 이용한 방식과 0% ~ 100% 와 같이 퍼센트를 이용한 방식이 있다.

<br>

```css
@keyframes turn {
  0% {
    background-color: red;
    transform: translate(0, 0);
  }

  100% {
    background-color: blue;
    transform: translate(300px, 0) rotate(360deg) scale(2);
  }
}
```

keyframes의 이름은 숫자, 영어 대문자로 시작할 수 없고, 특수문자를 사용할 수 없다. 위의 예시에서는 turn으로 생성했다.

0%에서 red이고, 100%에서 blue이므로 빨간색에서 파란색으로 변하면서 끝날 것이다. 위치는 300px만큼 x축 방향으로 움직일 것이며, scale(2)를 주었으므로 크기가 커지고, rotate(360deg) 으로 인해 빙글빙글 돌 것이다.

<br>

```css
div {
  margin: 200px;
  width: 100px;
  height: 100px;
  background-color: red;
animation: turn 2s;
}
```

위에서 만든 keyframes를 div에 animation: turn 2s을 사용하여 적용시켰다. 2초 동안 animation은 완료된다.

![](/images/23e904dd-1ada-491d-a790-87a14c86cf70-image.png)

최종으로는 위 사진의 파란 상자와 같이 될 것이다.
(infinite을 주면 animation을 반복시킬 수 있다.)

<br>

**그 외 animation의 속성**

![](/images/c76ee937-fc77-4833-a8b5-3cb47e584208-image.png)

* **[animation-timing-function](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function)**: 애니메이션 속도 조절
linear | ease | ease-in | ease-out | ease-in-out | cubic-bezier 

* **animation-delay**: 애니메이션이 시작하기 전 지연시간

* **animation-iteration-count**: 반복 횟수

* **animation-direction**: 루프 (loop) 방향. 정방향으로 반복, 역방향으로 반복, 번갈아가며 반복 등을 설정

* **animation-fill-mode**: 애니메이션 시작/끝 상태 제어
none | forwards | backwards | both


<br>

> 스타벅스 빌딩

undefined

현재 위의 사진에서는 완성된 스타벅스 빌딩이 보인다. Animation을 이용하여 이 건물이 점점 쌓여서 완성되는 모습을 표현할 수 있다.

![](/images/2e5b163e-5bbc-42d4-ac9a-97f216fe6d79-image.png)

스타벅스 건물이 있는 부분을 빨간색 사각형이라고 보자. 우리에게 보이는 곳이다. 그리고 파란색 끈에 스타벅스 빌딩이 조금씩 지어지는 것을 쭉 그려준다. 이제 이 파란색 끈을 왼쪽으로 당겨보자.

스타벅스 빌딩 그림이 빠르게 지나가면서 결국 완성될 것이다. 하지만 이 경우에는 우리가 원하는 결과가 아니다. 쌓이는 모습만 보고싶지 지나가는 모습은 보고싶지 않다. 이 부분을 steps으로 처리해 준 것이다.

건물이 완성되고, 그 모습을 유지하기 위해서 fill-mode를 이용해주었다.

> 글자 슬라이드

```html
    <div class="name">
        오늘 저녁
        <div class="name-job">
            <ul class="name-job-list">
                <li>김치찌개</li>
                <li>갈비찜</li>
                <li>라면</li>
                <li>치킨</li>
                <li>김치찌개</li>
            </ul>
        </div>
        <h2 class="name-title">먹자</h2>
    </div>
```

HTML 구조는 위와 같다. 

```css
        .name-job-list {
            animation: ani 4s infinite reverse;
        }
```
animation을 keyframes으로 생성해주고, name-job-list에서 infinite하게 실행해준다. 

```css
        .name-job {
            overflow: hidden;
        }
```

name-job에서 `overflow: hidden;` 옵션을 준다.

undefined

hidden 속성을 부여하지 않으면, 위와 같이 동작한다.

undefined

전체 코드는 [GitHub](https://github.com/LEEHYUNHO2001/likelion/blob/master/html_study/082_%EA%B8%80%EC%9E%90%EC%8A%AC%EB%9D%BC%EC%9D%B4%EB%93%9C.html)를 참고하자.

<br>

>## perspective

```html
    <div class="original">
        <div class="box"></div>
    </div>
```

```css
        .original {
            width: 200px;
            height: 200px;
            border: 1px solid black;
            margin: 100px auto;
            perspective: 400px;
        }

        .box {
            width: 200px;
            height: 200px;
            background: red;
        }
```

![](/images/2ec619f6-4051-4503-998c-50ea75f17592-image.png)

현재 위와같이 box가 하나 있다. perspective는 원근감을 주기 위한 값이다. 밑에 예제에서 더 알아보자.

<br>

![](/images/4037de7d-6bd9-42f9-9b33-7f5a2a8ecec7-image.png)

`transform: rotateX(45deg);`을 box에 넣어주자.
살짝 기울어진 것 같은 느낌이 든다.

<br>

![](/images/0389a57a-7a0f-4d56-ae71-5ab69eb56d06-image.png)

perspective 값이 낮아지면 눈앞에서 기울인것처럼 기울어진게 확실하게 보여진다. 값이 작으면 작을수록 더 가까이서 보는것과 같은 원리이다.

`perspective: 50px;`을 주자. 기울어진 각도는 낮았지만 눈앞에서보니 효과가 크다.

<br>

![](/images/3d9abc1a-e6af-43a1-b6b5-c390c8da2cae-image.png)

`transform: rotateY(45deg);`을 주면 y축으로도 기울수 있다. (Z는 Z축..)

<br>

> 소실점 ( vanishing point )

```html
    <div class="original">
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
        <div class="box"></div>
    </div>
```

```css
        .original {
            display: flex;
            justify-content: space-between;
            width: 1000px;
            height: 200px;
            border: 1px solid black;
            margin: 100px auto;
            perspective: 400px;
        }

        .box {
            width: 200px;
            height: 200px;
            background: red;
            transform: rotateY(45deg);
        }
```

![](/images/cfd898e7-bf32-4457-9020-b6dec3cdd96b-image.png)

현재 box는 rotateY(45deg)을 동일하게 가지고 있다. 하지만 화면에서 보여지는 모습이 각각 전부 다르다.

perspective 속성을 부모에게 주어서 box마다 다른 perspective와 소실점을 가지고 있기 때문이다. 

box에 개별적으로 perspective을 주기 위해서는 `transform: perspective(400px) rotateY(45deg);` 와 같이 사용하면 된다.

또는 perspective-origin을 사용해도 된다. default값은 `perspective-origin: 50% 50%;` 이다. 

[perspective 예제 사이트](https://imjignesh.com/how-css-perspective-works/)를 보며 감을 익히는게 좋을거 같다.

<br>

> perspective 실습

```html
<div class="scene">
  <div class="card">
    <img src="img/카드.jpg" class="item item_front">
    <img src="img/뒷면.jpg" class="item item_back">
  </div>
</div>
```

카드에 마우스를 가져다 대면, 돌면서 앞뒷면이 다르게 보이는 카드를 perspective를 이용하여 설계할 것이다.
[이 링크](https://3dtransforms.desandro.com/card-flip)를 참고했다.

```css
        html, body{
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
        }

        .scene {
            width: 200px;
            height: 260px;
            perspective: 400px;
        }

        .card {
            width: 100%;
            height: 100%;
            position: relative;
            transform-style: preserve-3d;
        }

        .item {
            position: absolute;
            height: 100%;
            width: 100%;
            backface-visibility: hidden;
            transition: 1s;
        }
        .item_front {
            background: red;
            transform: rotateY( 180deg );
        }

        .item_back {
            background: blue;
            transform: rotateY( 0 );
        }

        .scene:hover .item_front{
            transform: rotateY(720deg) scale(2);
        }

        .scene:hover .item_back{
            transform: rotateY(540deg) scale(2);
        }

```

body에 크기를 주었고, flex 와 align-items 으로 보기 편하게 가운데로 정렬을 해주었다.

scene에 카드의 크기를 지정해주었다. perspective값은 400으로 주었다.

card에서는 부모의 크기 그대로 가져가기위해 100%로 설정하고, item들이 absolute하여 겹쳐질 수 있도록 relative를 사용했다. preserve-3d는 perspective를 부모로 부터 받아 자식요소에도 적용되도록 해준다.

item은 absolute가 되면서 카드의 앞면과 뒷면이 합쳐졌다. `backface-visibility: hidden;`는 3D transform에서 뒷면을 숨겨주는 역할을 한다.

처음에 카드의 뒷면을 보여주고, hover시 앞면이 보이도록 설정하기위해 rotateY() 값을 위와 같이 주었다.

<br>

undefined

hover 조건을 충족하면 한바퀴 반 돌면서 앞면을 보여주게 되고, 크기가 커진다.

<br>

> 마무리

perspective는 자세하게 파고들면 매우 어려울것이라고 생각한다. 재밌고 신기한 기능인 만큼 다루기가 까다로운 것 같다. 그래도 시간날때마다 여러가지 기능들을 사용해보며 역량을 늘려나가야겠다.