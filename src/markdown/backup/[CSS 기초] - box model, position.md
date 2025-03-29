---
title: "[CSS 기초] - box model, position"
description: "CSS box model은 기본적으로 모든 HTML 요소를 감싸는 상자다. margin, border, padding, content로 구성된다."
date: 2021-09-26T03:33:11.874Z
tags: ["CSS"]
---
>## 잠깐!!

이 velog를 읽고 [position, float 정리](https://velog.io/@leehyunho2001/box-model-position-float) 글을 보는것을 추천한다.

<br>

>## 개념

![](/images/055b5dd4-54fc-41ef-95c3-0b837a429f65-image.png)

margin : box model간의 여백, box 외부에 존재

border : box의 테두리

padding : box와 content사이의 여백, box 내부에 존재

content : 텍스트나 이미지가 들어가는 컨텐츠 영역

위의 box-model은 width와 height가 200px이다.
paddging을 50px, boreder를 20px로 설정하면 box-model의 크기는 340px이다. margin을 **추가해주면 또 그만큼 커진다**.

**box-sizing: border-box** 값을 주면 padding, border값을 유지하며 크기를200px으로 설정할 수 있다. 이 크기에 margin값만 더해주면 box-model 크기가 된다.

<br />

* background-clip

![](/images/88e0613d-9bf1-40e6-9dec-b7b68a13e9a6-image.png)

border의 빈 공간까지 회색이 적용되고있다. 디자인을 변경하고싶다면 [background-clip](https://developer.mozilla.org/en-US/docs/Web/CSS/background-clip)을 수정해주면 된다.

<br />


> margin collapsing

margin에는 **collapsing**이 일어날 수 있다. 
예시들을 통해 알아보자.

<img src="https://media.vlpt.us/images/cmin95/post/f5a21f78-8330-43b6-a1a1-fe48a4feb572/CSS%20box%20model%20-%20margin%E1%84%80%E1%85%A1%E1%86%B9%20%E1%84%90%E1%85%B3%E1%86%A8%E1%84%8C%E1%85%B5%E1%86%BC.png" />

* 인접 형제 박스 간 마진이 겹칠 때

같은 크기의 box-model의 두 margin이 같으면 하나가 됨

위 아래로 있을 경우 더 큰 margin이 적용됨



<br>

![](/images/04c7741b-00d6-4f6a-adeb-f210ad5ca210-image.png)

```html
    <div class="parent">
        <div class="child"></div>
    </div>
```

```css
        div {
            width:100px;
            height:100px;
            border:1px solid black;
        }

        .parent {
            background-color:yellow;
            padding-left: 10px;
        }
        .child {
            width:100px;
            height:100px;
            margin-top:50px;
            background-color:red;
        }
```
* 부모 박스와 첫 번째 자식 박스의 상단 margin이 나란히 겹칠 때 collapsing

* 부모 박스와 마지막 자식 박스의 하단 마진이 나란히 겹칠 때 collapsing

=>  상황에 맞게 부모 박스 상단 또는 하단에 padding 또는 border 값을 주어 벽을 만들어주는 것이 안전하다.

overflow, block:inline-block 으로 해결할 수 도 있다.

~~자식 요소는 부모 요소의 왼쪽 상단부터 차지~~

<br />

![](/images/e4b99e3f-6795-4f97-b105-c9ccad5c714d-image.png)

* 빈 block

근접한 블록이 특정요소( border, padding, inline, height )가 없으면 collapsing



<br />

<br />

> box model style

* margin 과 padding

```css
margin: 20px, 10px;
padding-bottom: 20px;
```
margin을 상하 20px 좌우 10px로 설정하고있다. 상하좌우를 각각 한번에 주고싶은 경우에는 상 - 우 - 하 - 좌 순으로 설정해주면 된다. margin-top을 통해 한 곳만 margin을 줄 수 도 있다.

padding도 사용법은 margin과 유사하다.

<br />


* width, height, margin, padding

px, cm, em 등 크기 단위를 사용할 수 있다.

box model을 포함하고있는 부모 요소를 기준으로 너비나 높이를 %(백분율)로 설정할 수 있다.

auto는 box model의 너비나 높이를 컨텐츠 양에 따라 자동으로 결정한다.

<br />

* border

border-width는 thin, medium, thick로 굵기를 간편하게 설정할 수 있고, 직접 지정도 가능하다.

border-color는 rgb, 16진수 등을 통해 설정 가능하고, transparent(투명)를 설정할 수 있다.

border-radius는 모서리를 둥글게 만들 수 있다. border-top-left-radius 처럼 특정 모서리만 설정할 수도 있다.

box-shadow로 그림자 효과를 사용할 수 있다.

<br />

tip) 200px의 block이 있다. padding 50px를 주면 block의 공간은 150px여야 한다. 하지만 width =200 으로 설정하면 padding 준 만큼 block을 늘려 사용가능공간 유지시킨다. **box-sizing: border-box;**를 사용해보자. padding을 주어도 box사이즈 늘리지 말라는 의미이다.

<br />

> block과 inline

* block

한 줄을 차지한다. 쉽게말해 div, p, h1 등 태그를 이용하여 box를 생성하면, 양 옆에 다른 요소가 올 수 없다.

<br />

* inline

한 줄을 차지하는것이 아닌 컨턴츠의 크기만큼 공간을 차지한다. span, a, img 등 태그를 사용하면 양 옆에 다른 요소가 올 수 있다.

inline 태그가 마크업하고 있는 컨텐츠의 크기 만큼의 공간을 차지하도록 되어 있으므로 width와 height가 무시된다. 

margin과 padding은 좌우 간격만 지정 가능하다.

<br />

<img src="https://res.cloudinary.com/practicaldev/image/fetch/s--lT1mgYzG--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/h0y0cf2fj9m16wpv7y2n.jpg" />

* inline-block

```css
display:inline-block;
```

inline처럼 한 줄에 다른 요소들과 나란히 배치된다. 그리고 inline 엘리먼트에서 불가능하던 width와 height 속성 지정 및 margin과 padding 속성의 상하 간격 지정이 가능하다.

<br />

위에서 요소의 레이아웃 흐름에 영향을 미치는 outer display types를 알아보았다.

자식 요소의 흐름에 영향을 미치는 inner display types도 있다. ( table, flex, grid )

<br /><br />





