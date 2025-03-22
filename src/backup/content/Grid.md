---
title: "Grid"
description: "그리드를 익혀보자. (신세계...)"
date: 2021-11-08T04:24:43.402Z
tags: ["CSS"]
---
![](/images/42c237c4-bb9f-44aa-8f76-d9e7d8e240bf-image.png)

flex는 1차원 레이아웃에 사용되었다. grid는 2차원 레이아웃을 설정하는데 사용한다.

그리드에 있는 몇가지 개념을 먼저 보고 넘어가자.

<br>

* 그리드 컨테이너 : 그리드의 가장 바깥영역

* 그리드 아이템 : 그리드 컨테이너의 자식 요소들

* 그리드 트랙 : 그리드의 행(row) 또는 열(column)

* 그리드 셀 : 그리드의 한 칸 (개념적인 정의)

* 그리드 라인 : 그리드 셀을 구분하는 선

* 그리드 넘버 : 그리드 라인의 각 번호

* 그리드 갭 : 그리드 셀 사이의 간격

* 그리드 에어리어 : 그리드 셀의 집합



```html
    <div class="container">
        <div class="item">1</div>
        <div class="item">2</div>
        <div class="item">3</div>
        <div class="item">4</div>
        <div class="item">5</div>
        <div class="item">6</div>
        <div class="item">7</div>
    </div>
```

```css
        .container{
            display: grid;
            height: 100vh;
        }
        .item{
            background-color: aquamarine;
            border: 1px solid black;
        }
```

![](/images/d4c22127-1dad-4881-90f6-7414a10109e5-image.png)

grid는 컨테이너 영역을 꽉 채우려고 하는 특징이 있다. 

컨테이너에 display: grid;만 적용해주었는데 width부분을 다 채워버린다.

<br>

> template

```css
        .container{
            display: grid;
            height: 100vh;
            grid-template-columns: 1fr 1fr 1fr;
        }
        .item{
            background-color: aquamarine;
            border: 1px solid black;
        }
```

![](/images/929071cf-2478-4559-9ca5-d058fc2be796-image.png)

grid-template-columns는 열의 갯수, 넓이를 설정한다.

열이 3개가 있는데 1fr이라는 넓이를 차지하고 있다는 의미한다.
( fr : 그리드에만 쓰는 단위 )

**grid-template-columns: repeat(3, 1fr);**
repeat 함수를 사용해도 된다. 위에 사용한것과 같은 의미이다.

<br>

```css
grid-template-rows: 100px 100px 100px;
```

![](/images/7d21a77d-7c58-4237-bdff-9a1b54c9cde3-image.png)

px를 주어도 된다. 이 경우에는 fr로 설정한 것처럼 반응형으로 되진 않을 것이다.

<br>


```css
grid-template-rows: 100px 100px;
```
![](/images/39f12e66-65d2-4ecc-9a42-872c95014038-image.png)

2개의 행에만 적용할 수도 있다.

<br>

> Gap

![](/images/5636dc64-25d5-4f97-a75d-86ac56853a68-image.png)

gap을 10px 20px를 주면 이와같이 동작한다.

grid-template-columns을 %으로 설정하고, gap을 주었을 경우 스크롤이 생기는 점을 주의하자.



<br>

> 각 셀의 영역 지정

```html
    <div class="container">
        <div class="item1">1</div>
        <div class="item">2</div>
        <div class="item">3</div>
        <div class="item">4</div>
        <div class="item">5</div>
        <div class="item">6</div>
        <div class="item">7</div>
    </div>
```

```css
        .container{
            display: grid;
            height: 100vh;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: 100px 100px 100px;
            gap: 10px 20px;
        }
        [class^="item"]{
            background-color: aquamarine;
            border: 1px solid black;
        }
        .item1{
            grid-column-start: 1;
	        grid-column-end: 3;
        }
```
![](/images/70e80131-acb0-4f87-a689-b0d0b4e8b52d-image.png)

**grid-column-start**와 **grid-column-end**를 지정하여 열을 병합할 수 있다. **grid-column : 1 / span 2**와 같은 축약형을 사용해도 된다. span은 칸을 의미한다. 

**grid-column : 1/3;**으로 사용해도 되는데, 1에서 3라인 까지이므로 같은 의미이다. 나는 앞으로 이 방법을 사용할 것이다.

<br>

```css
        .item1{
            grid-row: 1 / 3;
        }
```
![](/images/6d62ba56-9d08-471d-bc63-0d01306c2738-image.png)

행을 병합할 수도 있다.

<br>

> 병합 예제

![](/images/155737b8-547f-4af4-8fb8-8cbc0d051fa1-image.png)

![](/images/69eb313c-68c5-47ce-8953-415262a37dc6-image.png)

선으로 영역을 나누어서 보면 설계하기 편리하다.


```html
    <ul>
        <li class="fir"><img src="./img/grid/1.jpg" alt="노루"></li>
        <li class="sec"><img src="./img/grid/6.jpg" alt="하늘숲"></li>
        <li class="th"><img src="./img/grid/2.jpg" alt="낙하산"></li>
        <li class="fou"><img src="./img/grid/5.webp" alt="react"></li>
        <li class="fif"><img src="./img/grid/3.webp" alt="사과"></li>
        <li class="six"><img src="./img/grid/4.jpg" alt="들판"></li>
    </ul>
```

```css
        ul{
            display: grid;
            height: 100vh;
            grid-template-columns: repeat(5, 1fr);
            gap: 10px;
        }
        li{
            border: 1px solid black;
        }
        li img{
            width: 100%;
            height: 100%;
        }

        .fir{
            grid-column: 1/4;
            grid-row: 1/3;
        }
        .sec{
            grid-column: 4/6;
            grid-row: 1/4;
        }
        .th{
            grid-column: 1/3;
        }
        .fif{
            grid-column: 1/3;
            grid-row: 4/6;
        }
        .six{
            grid-column: 3/6;
            grid-row: 4/6;
        }
```

병합 예제를 통해 어떤식으로 병합해야할지 감을 잡은 것 같다. Grid에 대해서 처음 접해보았는데 신기하고 재밌었다. flex의 부족한 점을 grid에서 모두 채운 느낌이다.

