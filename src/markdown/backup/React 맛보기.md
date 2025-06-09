---
title: "React 맛보기"
description: "공식문서의 내용을 모두 읽어보기 위해 React Study를 시작해보려고 한다."
date: 2021-11-25T13:57:27.753Z
tags: ["React"]
---
>## React Study

언어, 프레임워크, 라이브러리 등을 공부할때 가장 좋은 방법은 [공식문서](https://ko.reactjs.org/docs/getting-started.html)라고 생각한다.
공식문서의 내용을 모두 읽어보기 위해 React Study를 시작해보려고 한다.

React란 무엇인가와 왜 사용해야하는지는 [React란?](https://velog.io/@leehyunho2001/React) 글을 먼저 보고오는것도 추천한다.

<br>

>## React 시작

* HTML 파일에 DOM 컨테이너 설치

```html
<body>
    <div id="like_button_container"></div>
</body>
```

HTML 파일을 생성한 후, div 태그에 id값을 넣어주었다. 
id와 JS를 이용하여 태그를 찾아 **React 컴포넌트를 표시하기 위한 목적**이다. 

DOM 컨테이너는 원하는 만큼 사용해도 되고, 태그 안에 값은 보통 비워둔다.

<br>

* script 태그 추가

```html
    <!-- React를 실행. -->
    <!-- 주의: 사이트를 배포할 때는 "development.js"를 "production.min.js"로 대체하세요. -->
    <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>

    <!-- 만든 React 컴포넌트를 실행. -->
    <script src="like_button.js"></script>
```

script태그를 `</body>` 직전에 넣어주었다. React를 실행하기 위한 태그 2개와 like_button.js 라는 파일을 실행하기 위한 태그 1개를 추가해 준 것이다.

<br>

* React 컴포넌트 생성

```jsx
const e = React.createElement;

class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false };
  }

  render() {
    if (this.state.liked) {
      return 'You liked this.';
    }

    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );
  }
}


const domContainer = document.querySelector('#like_button_container');
ReactDOM.render(e(LikeButton), domContainer);
```

위에서 like_button.js란 파일을 실행하기 위해 script를 추가해주었으니 이제 생성할 때이다. like_button.js을 만들어서 위의 코드를 넣자. React를 이용하여 화면을 띄어보는 실습이라 위의 코드는 아직 몰라도 되지만.. 나처럼 성격 급한사람을 위해 간단하게 설명하겠다.

React에는 크게 **class**를 사용하는 방법과 **Hooks**를 사용하는 방법이 있다. 위의 경우에는 class를 사용하여`LikeButton` 이라는 컴포넌트를 생성해 주었다. **this.state.liked** 라는 변수가 생겼고 **디폴트 값이 false**라고 이해하면 된다. 

**this.state.liked** 가 **true** 되면, 화면에 `You liked this.`가 나타날 것이다. 그렇다면 어떤 경우에 true가 될까?

맨 위에서 변수 `e`에 태그를 생성하는 `React.createElement` 을 넣어줬다. `e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    );` 는 'button 태그를 만들건데 Like라는 버튼이고, 이 버튼은 클릭하면 **this.state.liked** 가 **true** 된다' 라는 의미다.
    
![](/images/a1e17bce-4ede-4788-bf7f-bb2eff671e6c-react%20bu.gif)
    
결국 버튼 누르면 `You liked this.` 가 나타난다는 소리다.

> **성능을 향상**시키기 위해 node.js에서 js 파일을 압축하는 [JS 압축 방법](https://gist.github.com/gaearon/42a2ffa41b8319948f9be4076286e1f3) 에 대한 글도 있었다.

<br>

>## JSX React 사용해보기

위의 예시에서 React 부분을 설계한 like_button.js는 브라우저가 기본적으로 제공하는 요소들을 이용했다. 이번에는 React의 **JSX**로 설계해보자.

```jsx
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Hello World</title>
    <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>

    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  </head>
  <body>
    <div id="root"></div>
    <script type="text/babel">

      ReactDOM.render(
        <h1>Hello, world!</h1>,
        document.getElementById('root')
      );

    </script>
  </body>
```

![](/images/7581a087-a9ad-4be4-8046-339cc50a010c-image.png)

babel에 관한 script를 하나 추가해주고, body 에서 script의 `type="text/babel`을 설정함으로써 JSX를 사용할 수 있다. babel은 쉽게말해 최신 js 문법을 사용할 수 있게 해주는 컴파일러라고 보면 된다. 하지만 실무에서 이렇게 사용하지는 않는다.
