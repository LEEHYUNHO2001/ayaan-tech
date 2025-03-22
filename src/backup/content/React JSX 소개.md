---
title: "React JSX 소개"
description: "기본이 되는 Hello world를 출력하며 JSX에 대해 알아보자."
date: 2021-11-29T11:52:47.350Z
tags: ["React"]
---
> ## JSX 소개
Hello world

먼저 글을 읽으며 실습을 하고싶은 사람은 [react-create-app](https://velog.io/@leehyunho2001/create-react-app-%EB%9C%AF%EC%96%B4%EB%B3%B4%EA%B8%B0) 을 보고오자.

```html
<!-- HTML -->
<div id="root"></div>
```

```js
//jsx
ReactDOM.render(
  <h1>Hello, world!</h1>,
  document.getElementById('root')
);
```

![](/images/bd83f3e2-ce36-4514-a2ac-5d98247c306f-image.png)

먼저 가장 기본이되는 Hello world 부터 화면에 출력해보자. HTML에서 div의 id값을 root로 주었다. jsx에서 getElementById로 id가 root인 태그를 찾아 h1 태그를 넣어 랜더링 시켜주고 있다.

여기서 JSX란 무엇일까?
`const element = <h1>Hello, world!</h1>;` 가 JSX이고, JavaScript를 확장한 문법이다. XML과 비슷하게 생겼으며, 브라우저에서 실행되기 전에 코드가 번들링되는 과정에서 바벨을 사용하여 일반 자바스크립트 형태의 코드로 변환된다.

<br>

```jsx
const name = 'LEE HYUNHO';
const element = <h1>Hello, {name}</h1>;

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

![](/images/38563002-08d4-4612-a40e-dcad3254e780-image.png)

위와 같이 JavaScript 변수를 선언하여 **중괄호로 감싸** JSX 안에 사용할 수 있다.

<br>

```jsx
function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'LEE',
  lastName: 'HYUNHO'
};

const element = (
  <h1>
    Hello, {formatName(user)}!
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

중괄호 안에 함수를 넣을수도 있다. 결과는 Hello, LEE HYUNHO로 같다.

<br>

```jsx
function getGreeting(user) {
  if (user) {
    return <h1>Hello, {formatName(user)}!</h1>;
  }
  return <h1>Hello, Stranger.</h1>;
}


function formatName(user) {
  return user.firstName + ' ' + user.lastName;
}

const user = {
  firstName: 'LEE',
  lastName: 'HYUNHO'
};

const element = (
  <h1>
    {getGreeting(user)}
  </h1>
);

ReactDOM.render(
  element,
  document.getElementById('root')
);
```

![](/images/79341fcd-4574-4074-82a7-6d6c6f74f29e-image.png)

JSX도 표현식이다. JSX를 if, for 등 안에 사용하고 변수에 할당하고 인자로서 받아들이고 함수로 부터 반환할 수 있다. user가 없다면 위의 결과를 얻을 것이다.

<br>

* **JSX 속성**

  * 문자열 리터럴 정의
  `const element = <div id="root"></div>;`
  " 으로 정의한다.

  * 속성에 JS 표현식 삽입
  `const element = <img src={user.avatarUrl}></img>;`
  중괄호를 이용한다.

  * camelCase
  JSX는 HTML보다 JS에 가깝다. 그래서 HTML 속성 이름 대신 camelCase을 사용한다.
  ex) class="btn" 이 아니라 className="btn" 사용

<br>

* **JSX 자식 정의**

  * 비어있는 태그
  `const element = <img src={user.avatarUrl} />;`
  XML처럼 비어있는 태그는 바로 닫아주자.

  * 자식
  ```jsx
  const element = (
    <div>
      <h1>Hello!</h1>
      <h2>Good to see you here.</h2>
    </div>
  );
  ```
  JSX 태그는 자식을 포함할 수 있다.

<br>

* **XSS 공격 방지**
  ```jsx
  const title = response.potentiallyMaliciousInput;
  // 이것은 안전합니다.
  const element = <h1>{title}</h1>;
  ```
  React DOM은 JSX에 삽입된 모든 값을 렌더링하기 전에 escape 한다. 또한, 모든 항목은 문자열로 변환하기 때문에, 애플리케이션에서 명시적으로 작성되지 않은 내용은 주입되지 않는다. (무슨 의미인지 잘 모르겠다..)

<br>

* **JSX는 객체를 표현**
  ```jsx
  const element = (
    <h1 className="greeting">
      Hello, world!
    </h1>
  );
  ```
  ```jsx
  const element = React.createElement(
    'h1',
    {className: 'greeting'},
    'Hello, world!'
  );
  ```
  이 두 예시는 같다. Babel은 JSX를 `react.createElement()` 호출로 컴파일한다.

  ```jsx
  const element = {
    type: 'h1',
    props: {
      className: 'greeting',
      children: 'Hello, world!'
    }
  };
  ```
  이와같은 객체를 생성하게 되는 것이다. ( = React 엘리먼트)
  React는 이 객체를 읽어 DOM을 구성하고 최신 상태로 유지하는데 사용한다.
  
<br>

> 마무리

JSX > React.Element > Virtual DOM > ReactDOM 랜더링