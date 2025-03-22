---
title: "DOM BOM"
description: "window는 창을 컨트롤하고, document는 문서를 컨트롤한다."
date: 2021-11-30T06:16:54.921Z
tags: ["CS","JavaScript"]
---


```js
window.console.log('hello world');
```

window는 창을 컨트롤하고, document는 문서를 컨트롤한다. 

![](/images/dfeda395-e2ad-4da7-a275-1142ca0134df-image.png)

`console.dir(window)` 로 정의된 정보를 확인해 보면, window 객체 안에 document가 있는것을 알 수 있다.



하지만 window는 html요소는 아니기 때문에 getElememtById, children 등의 기능은 없다. window와 document 객체에서는 수용 가능한 eventList가 다르다는 것이다.

window 객체는 브라우저 탭에 존재하는 자바스크립트 전역 최상위 객체이기 때문에, 어디서든 접근이 가능하다. 하지만 SSR인 경우에는 window가 없다는 것을 주의하자.

<br>

이제 본격적으로 DOM, BOM에 대해 알아보자

<br>

> DOM

<img src="https://media.vlpt.us/images/solmii/post/b9b74817-bebb-4f8f-8e7e-cd0ae796761d/image.png" />

**Document Object Model에서 Document가 HTML을 의미**한다. 그렇다고 **DOM이 HTML인것은 아니다.** 브라우저가 공장이라고 하면, HTML은 주문서다. 이 주문서에는 웹 페이지의 요소들과 구조가 설계도처럼 표현되어있다. 브라우저는 이 주문서를 받고 botton 태그를 실제 버튼으로 만드는식의 일을 한다.

DOM은 HTML 코드로 설계된 웹 페이지가 브라우저 안에서 이벤트에 반응하고 값을 입력받는 등 기능들을 수행할 객체들의 실체라고 보면 된다.

**JavaScript를 통해 DOM을 조작**할 수도 있다. 그리고 DOM은 위와 같이 **tree 구조**를 가지고 있고, **node로 구성**되어있다.

**MDN에서는 DOM을 HTML이나 XML문서를 실체로 나타내는 API**라고도 한다.

**CSS도 CSSOM이라는 DOM**으로 따로 만들어진다. 그래서 브라우저는 DOM tree와 CSSOM tree를 융합하여 우리가 보는 화면을 만들어내는 것이다.

```js
document.getElementById("id명")
document.quertSelector("선택자")
document.getElementsByClassName("class명")
document.getElementsByTagName("tag명")
document.quertSelectorAll("선택자")
```

이와 같은 JS 메서드를 통해 DOM에 접근할 수 있는 것이다.
DOM tree 구조에서 노드 9가지 종류에 알고싶다면 [이 글](https://cbw1030.tistory.com/46)을 보자.

<br>

> BOM

브라우저 자체를 다루기 위한 API이다. 
BOM(Browser Object Model)은 웹 브라우저와 관련된 객체들의 집합이다. 객체 모델 종류로 [window(최상위), location, navigator, history, screen, document](https://wickies.tistory.com/26) 가 있다. (DOM도 BOM의 하나인 셈)

<br>

> 마무리

DOM과 BOM에 대해 간략하게 알아보았다. [가상돔에 대한것은 React 글](https://velog.io/@leehyunho2001/React)에 있으므로 한번 보는것도 좋을것같다.