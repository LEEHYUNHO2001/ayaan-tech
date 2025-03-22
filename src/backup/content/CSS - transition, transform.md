---
title: "CSS - transition, transform"
description: "transition와 transform을 알아보자!"
date: 2021-11-09T12:03:23.719Z
tags: ["CSS"]
---
> ## transition

![](/images/044b80a3-ff23-418c-845e-0c45ec201521-image.png)

CSS 속성값이 변할 때, 값의 변화가 일정 시간에 걸쳐 일어나도록 하는 것을 말한다.

<br>

**transition 속성**
* delay
```
    div:hover{
        background: blue;
    }
``` 
말 그대로 딜레이를 주는 것이다. hover로 box가 파란 box로 변하도록 설계했다. 이 때 `transition-delay: 2s;`을 주면, **2초 뒤에 파란 box로 변한다.**

<br>

* duration
위의 예제에서 `transition-duration: 2s;`을 주었다고 생각하자. 이번에는 **2초에 걸쳐서 파란box로 변하게 되는데, 이것이 duration**이다.

<br>

* property
어떤 속성에 transition을 부여할지 결정한다. 
all : 모든속성에게 부여
none : 특정 속성을 부여받지 못하게 하기 위해 사용
property : transition 효과를 적용하고 싶은 css 속성을 설정
initial : 속성의 기본값으로 설정
inherit : 부모 요소의 속성값을 상속받음

<br>

* transition - timing - function
이것은 [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/transition-timing-function)을 먼저 보면 이해가 빠르다. 
속성값은 ease, linear, ease-in, ease-out, ease-in-out, step-start, step-end, steps(int, start|end), cubic-bezier(n, n, n, n), initial, inherit가 있다.

보통 transition 은 `transition : all 2s;`와 같이 한번에 사용한다.

<br>

>## transfrom

<img src="https://vuejsexamples.com/content/images/2018/09/VueJS-Free-Transform-Tool.png" />

transition과 함께 사용하면 수많은 동작들을 만들 수 있는 속성이다. 크기, 위치 등을 변환시키는 역할을 한다.

<br>

transform 속성
* scale
가운데를 중심으로 크기를 키운다. 1은 100%를 뜻하고, 2를 입력하면 2배만큼 커진다. hover, transition와 함께 사용하면 마우스를 댈 경우 자연스럽게 크기가 커지는것을 볼 수 있다.

<br>

* rotate
회전을 시켜주는 속성으로 `rotate(90deg)` 와 같이 사용한다.

<br>

* translate
x, y축 지점을 이동시키는 속성인 만큼 `translate(x축, y축)` 으로 사용한다. 기준점은 scale과 마찬가지로 가운데이다.

<br>

* skew
비틀거나 외곡을 주어 형태를 변형시킨다. rotate와 마찬가지로 deg로 표현한다.

<br>

* [transform-origin](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin)
object의 기준점을 변경할때 사용한다. 위의 속성 설명에서 본 것처럼 기준점은 가운데이다. 이 기준점을 바꾸고 싶다면 `transform-origin:0, 0;`와 같이 사용한다. x축은 0, y축도 0이라는 의미이다. left, right, top, bottom, center 문자를 이용해 위치를 설정할 수도 있다.

<br>

> 마무리

translate로도 position의 역할을 수행할 수 있어보인다. 하지만 역시 괜히 만들어 놓은게 아니다. 정적 사이트에서 단순 배치 할 경우에는 position을 이용하지만, animation이나 동적으로 요소 위치를 이동하는 경우에 translate를 사용한다. 

css를 통해 레이아웃이 바뀌는 animation을 구현하면, 브라우저는 매 프레임마다 reflow와 repaint를 수행한다. 이를 방지하기 위한 것이 transform인 것이다.
~~결국 성능 문제~~