---
title: "position와 float 추가 설명, stiky"
description: "position과 float의 개념이 있다면 클릭! 재밌는 기능 stiky에 대해 궁금하면 클릭!"
date: 2021-11-05T03:53:49.348Z
tags: ["CSS"]
---

box-model, position, float에 대해 아직 개념이 잡히지 않았다면, [이전 글](https://velog.io/@leehyunho2001/box-model-position-float)을 먼저 보고오는 것을 추천한다.

<br>

> position absolute 활용

![](/images/8f0d4c95-f5de-45ca-9619-144a6b2bb2f1-image.png)

위 사진은 네이버의 뉴스 매칭 부분이다. 개발자도구로 코드를 확인해 보면 **제목 - 부제목 - 뉴스 - 뉴스 - ... - 더보기 버튼** 순으로 되어있다. 더보기 버튼은 요소의 마지막에 있고 **position을 absolute**으로 해주어 맨위에 올린 것이다.

요소를 앞쪽에 주어 inline-blcok을 한 후에 margin값을 부여하여 옮기거나 float를 써도 됐을 것이다. 굳이 position absolute로 한 이유를 생각해보아야 한다.

스크린 리더는 요소를 순서대로 읽는다. 만약에 '오전9시~오전 10시까지 집계한 결과입니다' 부분 다음에 더보기 버튼을 넣는다면, 시각장애인분들은 무엇을 더보는 것인지 헷갈릴 수 있다. 이러한 문제점을 해결하기 위해서도 absolute는 사용된다.

![](/images/319e16a2-6fb9-4df1-b91e-dfcc99579c40-image.png)

이 사진은 네이버 로그인 부분을 한번 만들어 본 것이다. 조금 다른 얘기지만, 위의 빨간 동그라미 친 부분을 img 태그를 사용할 경우 alt값은 필요 할까?

스크린 리더는 alt값이 있으면 읽는다. 값이 존재하지 않으면 이 이미지는 굳이 설명이 필요없다고 느끼고 다음 요소로 넘어간다. 그래서 `<img src="위치" alt="">` 처럼 **alt 를 넣어주고 값은 비워준다.** 

alt 속성 조차 넣지 않으면 이 이미지의 경로를 읽어버리기 때문에 비효율적이 될 것이다.

**이런 아이콘은 사실 가상요소로 추가하는것이 가장 좋다.**

<br>

> float

```html
    <ul>
        <li></li>
        <li class="s"></li>
        <li class="t"></li>
    </ul>

```

```css

        li{
            height: 100px;
            background-color: pink;
        }
        .s{
            float: left;
            background-color: black;
        }
```

![](/images/c2c07725-c507-48b5-b992-89b24c9880c4-image.png)

li는 3개인데 하나가 없다. -> float의 특징 중 하나인데, 부모의 크기가 자식에서는 사라진다. 다시 설정해주어야 한다.

<br>

```css
        li{
            height: 100px;
            background-color: pink;
        }
        .s{
            width: 100%;
            float: left;
            background-color: black;
        }
```
![](/images/58fde5ee-c987-45ab-8054-8e2863a82c73-image.png)

width=100%으로 크기를 주었다. 2번째 li는 잘 나타나게 된거 같은데, 3번째 li가 사라진것 같다. 이것은 2번째 li가 float를 가지게 되면서 **nomal-flow를 벗어나서 3번째 li가 이를 인식하지 못하고** 2번째 li자리에 겹쳐져 있기 때문이다.

<br>

```css
        li{
            height: 100px;
            background-color: pink;
        }
        .s{
            width: 100%;
            float: left;
            background-color: black;
        }
        .t{
            clear: left;
        }
```

![](/images/072c6e92-88f2-40f8-a0a6-2da7e270ee4a-image.png)

이러한 특성은 clear로 해결할 수 있다. 3번째 li에 형제가 있다고 알려주는 것이다.

<br>

```html
    <ul class="clear-fix">
        <li></li>
        <li class="s"></li>
        <li class="t"></li>
    </ul>
```

```css
        li{
            float: left;
            width: 300px;
            height: 100px;
            background-color: pink;
        }
```

![](/images/e2c3fb1e-8f6a-416a-ba3d-6b273dd251e7-image.png)

이번에는 자식(li)가 모두 float 특성이 같는다. 개발자 도구로 확인해보니 부모(ul)는 자식을 못알아보고 있다. 이러한 문제점을 해결하는 방법은 여러가지가 있다.

<br>

1. 부모에 overflow hidden을 주면 된다. 

2. display:inline-block을 부모에게 줘서 사용하면 된다. ~~하지만 요소의 넓이는 block과는 다르니까.. 값을 따로 줘서 사용하자..~~

3. clear-fix
```css
        ul::after{
            display: block;
            content: '';
            clear: both;
        }
        li{
            float: left;
            width: 300px;
            height: 100px;
            background-color: pink;
        }
```

부모 요소에 float을 가상요소 추가하는 방법이다. 새로운 요소를 만들지 않고 가상의 자식을 만들기 때문에 **처리 시간과 비용이 절약**된다. 만약 가상요소를 쓰지 않으면 li를 하나 더만들어서 여기에 적용해주어야 할 것이다.

참고로 가상요소를 사용할 경우 content는 무조건 넣어주자!

![](/images/54532c4d-e645-40d9-b2c9-86a6a990a5a2-image.png)

위의 3가지 방법을 사용하면, 이렇게 ul의 범위가 개발자 도구에 제대로 나타난다.

<br>
<br>

>## stiky

```css
        section{
            height: 1000px;
            border: 3px solid black;
        }
        h2{
            position: -webkit-sticky;
            position: sticky;
            top: 0;
            background-color: greenyellow;
        }
```

<br>



스크롤을 내리면서 동작을 확인하기 위해 HTML은 lorem으로 채워주었다. stiky는 fixed와 비슷한 개념이다.

static처럼 top:100px 줘도 안움직인다. 하지만
자신의 위치 임계점을 읽을 때 top값이 존재한다. 즉, top에서 100px만큼 떨어지는 시점에서 적용되는 것이다.

undefined


fixed와의 차이점을 확연하게 보여준다. fixed처럼 고정되에 헤더가 내려오고 있지만, 2번째 stiky 헤더를 만나는 순간 2번째 헤더가 고정되어 내려온다. 신기한 기능인거 같다.

<br>

> 마무리

![](/images/d7841a29-b68f-416f-a7e0-ab1754ed5b4c-image.png)

float를 이용하여 레이아웃을 만들어 보는 실습을 했다. flex가 추세라고 하지만 아직 float를 사용하는 곳이 많다고 하니 알아두면 좋을 것 같다. ~~어차피 사용해보고 싶었다...(오히려 좋아..!)~~

오늘 교육을 들으며 뭔가를 감싸는 부모는 높이를 설정해 주지 않는 것이 좋다는 것을 알게 되었다.

<br>