---
title: "React"
description: "React란?? "
date: 2021-08-13T07:24:20.806Z
tags: ["CS","React"]
---
> ## React란??

**웹/앱**의 MVC 패턴에서 **V(View)**를 개발할 수 있도록 도와주는 JavaScript 라이브러리이다. HTML, CSS, JavaScript를 이용해서 웹 페이지를 만드는것 보다 **동적인 UI**를 쉽게 만들 수 있다. 
React는 SPA(Single Page Application)이고, 여기에서 UI를 개발하다보니 페이지 전환 기능은 제공하지 않는다. React를 사용하여 페이지 전환을 하기 위해서는 react-route와 같은 추가적인 라이브러리를 사용해야한다.

<img src="https://blog.kakaocdn.net/dn/R00jm/btqEHwUUZx8/W4bCxawh5UaJcV63Aijsqk/img.png" />

<br />

> ## React 특징

* **컴포넌트 및 재사용성**
React에서 웹 서비스를 개발할 때, UI를 **작은 컴포넌트로 쪼개서 설계**한다. 예를들어 쇼핑몰 웹 서비스를 설계하는데 로그인 상태가 표시되는 UI부분을 생성했다고 가정하자. 어느 페이지를 들어가도 로그인 상태는 존재해야한다. 페이지는 총 100개이고, 로그인 상태를 나타내는 코드는 20줄이면, 모든 페이지에 추가했을경우 벌써 2천줄이다. 여기서 로그인 상태에 아이콘 하나를 추가해야한다면, 일일이 작업을 해주어야한다.

```js
//NicknameTrans.js
import React from 'react';

const NicknameTrans = () => {
    return(
        <form>
            <input placeholder="닉네임" />
        </form>
    );

};

export default NicknameTrans;
```

위와같이 컴포넌트화 한다면, 불러올때는 파일을 import해주고 `<NicknameTrans />` 으로 가져오면 된다. 수정해야할 경우에는 해당 파일만 작업해주면 된다.

<br /><br />


* **단방향 데이터 바인딩**
<img src="https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F2344D53E57820DE70A" />
React는 데이터의 흐름이 한 방향으로 흐르는 단방향 데이터 흐름을 가진다. 양방향 데이터 바인딩은 규모가 커지면 데이터의 흐름을 추적하기가 힘들고 복잡해진다. 그에 비해 **React는 복잡한 앱에서도 데이터 흐름에서 일어나는 변화를 보다 예측 가능하다.**

<br /><br />

* **JSX**

JSX는 JavaScript와 HTML을 동시에 사용한다.
**JS의 변수를 HTML에서 바로 사용**할 수 있다.

```jsx
const App = () => {
  const hello = 'Hello world!';
  return <div>{hello}</div>;
};
```

<br /><br />


* **Virtual DOM(가상돔)**
<img src="https://velopert.com/wp-content/uploads/2017/03/wvbwscn7oadykroobdd3.png" />

먼저 DOM에 대한 개념이 없다면 [DOM, BOM](https://velog.io/@leehyunho2001/DOM-BOM)을 보고오자. 

**Virtual DOM은 DOM의 구조만 간결히 흉내낸 JavaScript 객체**이다. DOM이 HTML이라는 주문서를가지고 브라우저란 공장들이 실제 웹 페이지로 만들어낸게 DOM이다. **Virtual DOM은 JavaScript로 DOM을 조작할 때, 필요한 것들만 움직이게 시물레이션하고 실제로 움직이게 하여 가성비 있게(?) DOM에 변화를 가하는 방식**이다.

사용자가 작성한 React 전용 코드를 브라우저가 Virtual DOM으로 해석해서 메모리에서 먼저 구현한 다음 최종적으로 실제 DOM에 적용한다. DOM변경을 가장 빠르게는 아니지만 사용자가 불펴하지 않을만큼 빠르게가 목적이다.

(React는 사용자가 사이트를 접속했을때, 라이브러리를 로드해서 브라우저에서 가상 DOM을 써서 하는 최적화 작업을 Svelte는 안해도 되어서 용량절약과 속도가 빠르다고 한다.)

* HTML과 CSS가 Rendering 되는 과정을 먼저 살펴보자.
  1. 웹 브라우저가 네트워크를 통해 HTML을 전달 받으면 브라우저의 렌더링 엔진은 HTML을 parsing하고 DOM Node로 이루어진 트리를 만든다. 

  2. CSS 파일과 HTML의 Element들의 inline style을 parsing하여 스타일 정보를 가진 스타일 트리도 만든다.

  3. 렌더 트리가 완성되면 브라우저는 Attachment 과정을 통해 스타일 정보를 계산한다. 렌더 트리로 생성된 모든 Node들은 attach라는 함수를 가지고 있는데, 이 과정에서 호출이 되고 계산 후에 결과값을 객체 형태로 반환한다. 이때 계산 과정은 모두 동기적으로 동작하고, 렌더 트리에 새로운 Node가 추가되면 해당 Node의 attach메소드가 실행되어 계산과정을 거친다.

  4. Layout 과정에서 브라우저가 렌더 트리의 각 Node들에 좌표를 부여하고 정확히 어디에 어떻게 표시되는지 결정한다.

  5. 브라우저는 Painting 과정에서 각 Node들에 paint함수를 호출하여 렌더링된 Element들에 색상을 입힌다.

위와같이 동작하기 때문에 HTML을 자바스크립트를 사용하여 DOM을 조작하게 되면 각 노드의 좌표를 계산하기 위해 레이아웃 과정이 다시 실행되고, 그 이후 색상을 입히기 위한 페인팅 과정이 다시 진행되게 된다. 이 과정이 많이 수행될수록 웹 서비스의 성능이 저하된다. 하지만 **React는 이 모든 과정을 가상돔에서 수행하여 DOM이 자주 갱신되는 SPA의 Reflow와 Repaint를 최소화**한다.

<br /><br />


* **State와 Props**

<img src="https://media.vlpt.us/images/chloeee/post/bddc986a-3b10-4d98-971c-5e9a54858838/KakaoTalk_Photo_2020-10-17-12-56-49.jpeg"/>

React는 내부적으로 state와 props를 가진다.

1. State
동적인 데이터를 다룰 때 사용한다.
클래스형 컴포넌트 내부에서 선언한다.
state는 독립적이다.

2. Props
부모 컴포넌트에서 자식 컴포넌트로 전달해주는 데이터이다.
자식 컴포넌트에서 받은 props는 변경이 불가능하다.
전달해주는 단계가 너무 많아지면 ContextAPI 또는 Redux를 사용하면된다.

<br /><br />

* **선언형 프로그래밍**

```jsx
const arr = [1, 2, 3, 4, 5];
return (
  <ul>
    {arr.map((v) => (
      <li>{v}</li>
    ))}
  </ul>
);
```

명령형 프로그래밍은 과정을 중심으로 프로그래밍한다.
위의 선언형 프로그래밍을 보면 map이 어떤식으로 동작하는지는 신경쓰지 않고 결과에 집중한다. 라이브러리나 프레임워크 등을 사용하여 비선언형적인 부분을 캡슐화함으로써 명령형 프로그래밍 언어로 선언형 프로그래밍이 가능한 것이다.







<br />
<br />
<br />
<br />

[DeKu](https://dev-yakuza.posstree.com/ko/react/create-react-app/react/) zerocho