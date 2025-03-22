---
title: "flex의 direction과 justify-content"
description: "이 글부터 이해해야 다음 flex가 고통스럽지 않다.."
date: 2021-11-05T11:56:36.142Z
tags: ["CSS"]
---
>## flex란??

컨텐츠를 정렬하거나 공간을 나눌수 있는 CSS 속성의 집합이다. 레이아웃을 다룰 때 하나의 행 또는 열을 다룬다.(1차원 레이아웃)

그냥 display inline 쓰면 되잖아!!! -> X

~~block: inline을 해버리면 margin-top이나 넓이값을 줄수도 없고 margin-bottom도..~~

<br>

![](/images/59a5b2e6-4ca7-4e7f-90e8-1f2fecbc211e-image.png)

그래서 우리는!!
block: inline-block으로 주어야한다. 이 경우 커스텀하기 쉽다. 근데 이렇게 수평으로 정렬하지는 않는다. 그 이유는 위 사진과 같이 공간이 생기기 때문이다. (inline-block은 div가 3개일때 줄바꿈을 인식하여 공백이 있다.)

![](/images/4ff11512-2ff0-4a53-8ad4-061c3d9db79c-image.png)

하지만 이것도 부모에게 font-size를 0 주면 된다. 공간이 사라진 것을 볼 수 있다. => 하지만... 귀찮다!! 결국 수평정렬할때는 안쓴다. **-> flex 등장** ~~(flex 왕귀요)~~

<br>

>## flex 기본 동작

```html
    <div class="container">
        <div class="box">box1</div>
        <div class="box">box2</div>
        <div class="box">box3</div>
    </div>
```

```css
    body {
        font-family: sans-serif;
        box-sizing: border-box;
        font-weight: 600;
    }

    .container {
        background: #6d84a0;
        border: 2px solid black;
        width: 500px;
        height: 400px;
    }

    .box {
        background-color: red;
        border: 2px solid black;
        width: 100px;
        height: 100px;
        margin: 10px;
        text-align: center;
        line-height: 100px;
    }
```

![](/images/62e81bbe-7cd6-4e04-9788-27cc61261ccc-image.png)

이 상태에서 container class에 `display: flex;` 을 넣어주자.


<br>

![](/images/08f84103-7227-41db-b90e-3779fc0b8c8a-image.png)

**box들이 수평으로 정렬**이 되었다. 개발자 도구로 확인해 보자. 각각 box의 영역과 container의 남은영역, container 밖의 영역으로 구분된다.

또한, flex는 **자신의 직계 자식까지만 영향을 미친다.**

![](/images/94957c39-d2f5-4bb6-8a2d-21d591530b6e-image.png)

width값을 부모에 주지 않으면 **block처럼 영역을 다 차지**한다.

![](/images/8c381cd1-7b49-4936-b4e2-667231ecaab0-image.png)

`display: inline-flex;`을 써주면 부모에 width값을 주지 않아도 block처럼 남은 영역을 모두 차지하지 않는다. **자식들의 넓이만큼만 자신의 넓이**를 잡는다

<br>

> flex가 나오기 전..

![](/images/93829b53-7a50-4bb5-a2c4-514ed7455f79-image.png)

flex 이전에 수직정렬하는데는 이러한 귀찮은 일이 있었다.

![](/images/17804ba8-8264-4b13-a092-7306b83dd525-image.png)

text를 가운데 정렬해주는건데 자식에 inline-block 해줘서 중간이 된것이다.

![](/images/7974bb35-c4bc-4e51-a3e0-b5f7dc61e49c-image.png)

수평정렬, 이방법은 width값 없으면 안먹음

이러한 작업들은 우리는 이제 **flex**로 편안하게 처리하자!!

<br>

> flex-direction


![](/images/2366547f-e96e-446e-b458-547fa50a713e-image.png)

`display: flex;` 을 해주면 어떤 상황이 일어나는지 우리는 위의 예제에서 보았다. flex만 되어있을 경우  `flex-direction: row` 가 기본값으로, main-asix가 ---> 방향이다.

flex-items은 기본적으로 **flex-axis를 기준으로 정렬**된다.

![](/images/a6440699-c864-4bd0-aca4-fecd4c297092-image.png)

그렇다면 `flex-direction: column;`을 주면 무슨일이 일어날까? main-axios가 위에서 아래 방향으로 변경되고, 실제로 flex-items이 위의 사진처럼 동작한다.

![](/images/fd745db0-e341-4f00-966a-c0eea45c7276-image.png)

`flex-direction: row-reverse;`을 주면 말 그대로 main-axis가 <--- 뱡향이 되므로 flex-items이 역순이 된다.

![](/images/f6057acb-51d1-4d20-89f0-8230715b85b5-image.png)

`flex-direction: column-reverse;`을 주면 main-axis는 아래에서 위 방향이다.

<br>

> justify-content

![](/images/884c10b9-23cc-427f-8032-538e6c938404-image.png)

main-axis가 어떻게 변하는지 알았으니 이제는 flex-items의 정렬이다.

현재 `display:flex;` 값만 주었다고 보자. 여기에 `justify-content: flex-start;`을 준다면 위와 같다. 변한게 없는거 같지만 start지점부터 정렬한다는 의미이다.

![](/images/35f2783a-a566-4831-95fb-be9a83110136-image.png)

`justify-content: flex-end;`는 마지막 지점인 end쪽에 맞춰 정렬하는 것이다.

![](/images/e68ff0c7-533a-4903-ba04-4c8dd54d5cc3-image.png)

`justify-content: center;`는 이름답게 가운데에 정렬한다.

![](/images/794d4403-99ca-4cbe-8aaa-b0e31ea071a1-image.png)

`justify-content: space-between;`는 box1과 box2사이, box2와 box3사이의 공백이 같게 정렬한다.


![](/images/974ecff5-acd6-4766-a3ed-053f5a16ded1-image.png)

`justify-content: space-around;`부터는 자세히 보기 위해 개발자도구를 이용했다. 각각의 flex-item마다 동일하게 왼쪽과 오른쪽 공간을 가지고 있다. 그래서 box1과 box2 겹치는 부분은 조금 더 두꺼운 것을 볼 수 있다.

![](/images/83d987d6-2cd4-444b-bd56-1b7987042389-image.png)

`justify-content: space-evenly;`는 space-around와는 달리 flex-item 사이의 공간이 균등하다.

<br>

> flex-direction과 justify-content

우리는 flex-direction과 justify-content를 알아보았다. 이제는 이 두개를 응용해보자.

<br>

![](/images/b30dc9fa-1395-4ec7-95a5-06128afba20d-image.png)
```
flex-direction: column;
justify-content: flex-end;
```

main-axis가 위에서 아래로 바뀌었다. 그 후 마지막 부분인 end(아래)에 맞춰서 정렬하였다.

![](/images/c086a07d-d752-40ce-b2b2-8f1c3c556a91-image.png)

```
flex-direction: column;
justify-content: center;
```
main-axis가 위에서 아래다. 그 후 가운데 정렬을 해주었다.

이와같이 두 개의 속성을 응용하면, 수 많은 작업을 할 수 있다. 모든 경우의 수를 설명할 수는 없으니 위의 2가지만 간단하게 설명했다.

<br>

> 마무리

![](/images/51a671fa-4c24-4a11-9061-c49cee8e2708-image.png)

```html
    <article>
        <div class="left_side">
          <div class="blue"></div>
          <div class="green"></div>
          <div class="yellow"></div>
        </div>
        <div class="center">
          <div class="blue"></div>
          <div class="yellow"></div>
        </div>
        <div class="right_side">
          <div class="blue"></div>
          <div class="green"></div>
          <div class="yellow"></div>
        </div>
      </article>
```

위의 이미지와 같은 상태인 HTML과 CSS 코드를 받았다.

![](/images/4566dffd-f3c2-4c62-b441-c8a2a670eab1-image.png)

flex, direction, justify-content을 사용하여 위와같이 만드는 과제를 하게 되었다. 간단한 문제였지만 굉장히 좋은 예제라고 생각했다. flex에 대해 더 학습하고 좋은 예제들을 풀어 볼 생각이다.