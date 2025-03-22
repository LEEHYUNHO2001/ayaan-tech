---
title: "flex - 여러가지 속성"
description: "flex part 2"
date: 2021-11-08T04:22:47.651Z
tags: ["CSS"]
---
![](/images/16272f22-e14c-4c3d-b740-1902fc6e80d4-image.png)

flex를 공부할때는 항상 위의 그림을  머릿속에 그려놓고 생각하자.

<br>

>## align-items

![](/images/13ae1fa8-ddd2-4c5c-b024-e3c7b45fca88-image.png)

기본 속성은 stretch이다. 자식요소의 높이값을 없애면 cross-axis 방향으로 쭉 늘린다.

cross-axis를 기준으로 start는 시작지점, center은 중간, end는 끝 지점으로 간다.

<br>

> flex-wrap

`flex-wrap:wrap;`

자식의 크기가 부모보다 클 경우 조절해주기 위해서 flex-wrap을 사용한다.

<br>

```css
        .container{
            display: flex;
            height: 100vh;
            flex-wrap: wrap-reverse;
        }
        li{
            width: 150px;
            height: 50px;
            border: 1px solid black;
            background-color: chocolate;
        }
```

![](/images/f3b023e7-dd34-4c54-8498-8362ee03c103-image.png)

wrap-reverse은 자식들을 거꾸로 만든다.

화면을 줄이면, 맨 밑에서 넘치는 부분은 가운데로 간다.

<br>

![](/images/c1d524b7-ea7e-49cb-bb7d-ee79d9d73a38-image.png)

더 줄이면 넘치는 부분들은 위에 나타나는 것이다.

<br>

align-content와flex-wrap:wrap;을 동시에 사용해보고, align-items와flex-wrap:wrap; 동시에 사용해보면서 사용법을 익히자.

<br>

> 간단한 align-items 연습

```html
    <ul class="container">
        <li></li>
    </ul>
```

```css
        .container{
            display: flex;
            width: 200px;
            height: 200px;
            background-color: blue;
            justify-content: end;
            align-items: center;
        }
        li{
            
            width: 50px;
            height: 50px;
            background-color: crimson;
            
        }
```

![](/images/95b1d434-d14a-44f2-8912-da686f125ae9-image.png)

붉은 상자를 오른쪽 벽 가운데에 위치시키는 간단한 예제를 수행했다. justify-content와 함께 사용하면 어렵지 않게 해결할 수 있다.

<br>

>flex-basis

flex-basis는 자식요소에 사용한다. axis 방향에 따라 달라지는 크기를 지정한다. 기본값은 auto이고, 이 경우 width, height 값을 사용한다. 그렇지 않다면 width, height 값은 무시된다.

```html
    <div class="container">
        <div class="item"></div>
        <div class="item second">Lorem ipsum dolor sit amet.</div>
        <div class="item"></div>
    </div>
```

```css
        .container{
            display: flex;
        }
        .item{
            flex-basis: 100px;
            background-color: crimson;
        }
```

![](/images/ec54a6a5-2221-42b2-a038-53759cc10e53-image.png)

axis 방향으로 100px씩 적용된 것이 보인다.

<br>

```css
        .container{
            display: flex;
            flex-direction: column;
        }
```

![](/images/2d70ae64-f798-44e6-ab8e-04f9fc89468b-image.png)

container에 flex-direction: column;을 추가해주었다. axis 방향이 위에서 아래로 바뀌었으므로, 이 방향으로 100px가 적용되었다.

<br>

> flex-grow

flex-grow는 자식요소에 사용한다. flex-basis의 값에서 더 늘어나도 되는지 지정하는 값으로, 할당된 값에 따라 자신을 감싸는 컨테이너의 공간을 할당하도록 한다.

![](/images/440a656b-e36e-4f0a-af4b-f0ce2cc1ef69-image.png)

flex-grow  : 0 —> flex-basis 크기만큼 가진다.

![](/images/801d66f1-077e-44b8-8e08-3f1ca76d2b35-image.png)

flex-grow  : 1 —> 자식 요소들이 flex-basis보다 동일한 비율로 커진다. 더 늘어나게 하겠다.

flex-basis보다 더 커진 것을 볼 수 있다. 그리고 item들은 같은 공간을 할당받았다.

<br>

```css
        .container{
            display: flex;
        }
        .item{
            flex-basis: 100px;
            height: 100px;
            flex-grow: 1;
            background-color: crimson;
            border: 1px solid black;
        }
        .second{
            flex-grow: 2;
        }
```

```css
        .second{
            flex-grow: 2;
        }
```

![](/images/f102caed-3f7a-487b-bf5e-1eab5fb997d5-image.png)

flex-grow  : 2 —>  특정한 하나의 자식에게만 줄 경우 다른 자식요소보다 두배의 공간을 할당받는다.

화면 크기에 따라 container도 커지고 있다. second만 flex-grow: 2; 이므로, 다른 item보다 2배의 공간을 할당받는다.

<br>

> flex-shrink

flex-shrink는 자식요소에 사용한다. flex-grow에 반대되는 개념으로 flex-basis의 값에서 더 줄어들어도 되는지 지정하는 값이다.

```css
        .second{
        	flex-grow: 0;
            flex-shrink: 0;
        }
```

![](/images/470bbb40-0b41-4fae-894e-5463c0e1c120-image.png)

위의 예제에서 2번째 item에 flex-shrink: 0;을 주었다. 아무리 줄여도 이 부분을 줄어들지 않는다.

<br>

축약해서도 사용할 수 있다.
```css
/*flex: flex-grow, flex-shrink, flex-basis */
flex :1; /* flex-grow:1; flex-shrink:1; flex-basis:0; */
flex :1 1 300px; /* flex-grow:1; flex-shrink:1; flex-basis:300px;
```

<br>

> 그 외

* **align-self**

```html
    <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li class="fif">5</li>
        <li>6</li>
        <li>7</li>
        <li>8</li>
    </ul>
```
```css
        ul{
            display: flex;
            height: 100vh;
            align-items: flex-end;
        }
        li{
            width: 50px;
            height: 50px;
            background-color: crimson;
            border: 1px solid black;
        }
        .fif{
            align-self: flex-start;
        }
```

![](/images/3123f265-27df-4b2e-a765-7795ab9023b2-image.png)

align-self은 부모의 align-items 속성을 덮어버린다. item 에게 개별적인 align-items 속성을 부여할 수 있다.
 
<br>

* **order** 

```html
    <ul>
        <li class="fir">1</li>
        <li class="sec">2</li>
        <li class="th">3</li>
        <li class="fou">4</li>
        <li class="fif">5</li>
    </ul>
```
```css
        .fir{
            order: 5;
        }
        .sec{
            order: 4;
        }
        .th{
            order: 3;
        }
        .fou{
            order: 2;
        }
        .fif{
            order: 1;
        }
```

![](/images/d396d261-7e4e-4b90-9b51-a7082516a69b-image.png)

item의 order값을 주면 순서를 바꿀 수 있다.

```css
        .fir{
            order: 2;
        }
```

![](/images/b5971879-135f-45cf-a5eb-632eb01e20eb-image.png)

첫번째 item만 order을 주었다. order값이 없는 item은 자신의 자리를 지킨다. fir은 order값이 2이므로, 우선순위가 처리된 후에 적용된다. 음수값도 줄 수 있다.

<br>

> 마무리

![](/images/919f9c58-9e96-4a2c-910d-d359768cdd22-image.png)

[개구리 게임](https://flexboxfroggy.com/#ko)을 통해 flex를 연습해 보았다. 마지막 문제까지 수월하게 해결할 수 있었다.

* justify-content
* align-items
* flex-direction
* order
* align-self
* flex-wrap
* flex-flow
* align-content

flex에 대해 복습할 수 있는 좋은 시간이었다. 나도 처음 CSS를 접하는 사람들에게 도움이 될 수 있는 좋은 웹 사이트를 만들어보고 싶다는 생각을 하게 되었다.

flex 정리의 부족한 부분은 반응형 웹 part에서 다시 한번 정리해보려고 한다.

<br>

* 그 외 팁

flex 컨테이너 안에서 float는 먹히지 않는다.
posiition: absolute 하면 block이긴한데, 자기 공간만 차지하는 block이 된다.
padding 값에 %를 주면 부모의 width값에 영향을 받는다.