---
title: "State와 LifeCycle(생명주기)"
description: "간단하게 라이프사이클과 State에 대해 알아보자."
date: 2021-12-09T11:52:38.824Z
tags: ["React"]
---
>## class 변환


```jsx
function tick() {
  const element = (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {new Date().toLocaleTimeString()}.</h2>
    </div>
  );
  ReactDOM.render(element, document.getElementById('root'));
}

setInterval(tick, 1000);
```

undefined

이전 글에서 tick 함수에 JSX 문법으로 엘리먼트를 생성했었다. 그리고 여기서 ReactDom.render 해주었다.

이번에는 **시계 기능만 캡슐화** 해볼 것이다.

<br>

```jsx
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

function tick() {
  ReactDOM.render(
    <Clock date={new Date()} />,
    document.getElementById('root')
  );
}

setInterval(tick, 1000);
```

Clock부분을 **Class Component**로 만들었다. 현재 `<Clock date={new Date()} />` 와 같이 Clock Component를 사용하고 있고, props를 사용하기 위해 date를 넘겨주고 있다. 캡슐화는 정보 은닉이 핵심인데, 이 경우에는 props의 데이터가 사용자에게 노출될 수 있다.

~~render 메서드는 업데이트가 발생할 때마다 호출되지만, 같은 DOM 노드로 <Clock />을 렌더링하는 경우 Clock 클래스의 단일 인스턴스만 사용됩니다. 이것은 로컬 state와 생명주기 메서드와 같은 부가적인 기능을 사용할 수 있게 해줍니다.~~

<br>

>## class에 로컬 State 추가하기

먼저 state가 무엇인지 부터 알아보자.

State는 props처럼 데이터를 갖고있는 객체이다. 위에서 props는 `date={new Date()}` 와 같이 전달하고 있었다.

state는 함수 안에서 선언된 변수처럼 컴포넌트 안에서 관리된다는 차이가 있다. 이러한 캡슐화로 정보은닉을 하고, 사용하는 부분과 구현하는 부분을 명확하게 나눌 수 있다.

<br>

* **class에 로컬 State 추가**

그럼 이제 date를 props에서 state로 바꿔보자.

```jsx
class Clock extends React.Component {
    constructor(props){
    super(props);
    this.state = {date: new Date()};
  }
  
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

Clock의 `render()`의 변수 가져오는 부분을 `this.props`에서 `this.state`으로 바꿔주었다.

그리고 component의 생성자 메소드인 constructor을 사용했다. Component를 초기화 시켜주는 작업이다. (state를 사용하기 위해)

<br>

```jsx
ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

`<Clock />`와 같이 사용할수 있게 되어 date prop를 빼주었다.

![](/images/c3d5d8e6-ccb4-4a4f-9658-6784f06e3441-image.png)

실행해보니 시간이 멈춰버렸다. `setInterval(tick, 1000);` 부분을 없애버렸기 때문이다. 

이제 Clock이 매초 스스로 업데이트하도록 만들기만 하면 완성이다.

<br>

>## LifeCycle 메서드 추가

Clock이 처음 DOM에 렌더링 될 때마다 타이머를 설정하려고 한다. 이것을 **'Mount'** 라고 한다. React에서 `componentDidMount()` 을 사용한다.

그리고 Clock에 의해 생성된 DOM이 삭제될 때마다 타이머를 해제해야한다. 이것은 **'UnMount'** 라고 한다. React에서 `componentWillUnmount()` 을 사용한다.

이런 것들이 바로 **LifeCycle(생명주기) 메소드** 이다.

<br>

```jsx
  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }
```

`componentDidMount()` 메서드는 Component 출력물이 DOM에 렌더링 된 후에 실행된다. 즉, 이 메서드가 호출되는 시점은 우리의 컴포넌트가 화면에 나타난 상태이다.

`this.props` 의경우 `this.props.date` 와 같이 타고 내려가며 사용했다. `this.state`도 이와 유사하게 사용되지만, 타이머처럼 데이터 흐름 안에 포함되지 않는 항목을 보관할 경우에는 class에 자유롭게 추가해도 된다. `this.timerID`가 그 예시이다.

**DOM에 직접 이벤트를 등록하는것이 아닌 외부 라이브러리 연동, 데이터요청(axios나 fetch로 ajax 요청)에도 사용한다.** 

<br>

```jsx
  componentWillUnmount() {
    clearInterval(this.timerID);
  }
```

`componentWillUnmount()`는 Component가 화면에서 사라지기 직전에 호출된다. **DOM에 직접 등록했었던 이벤트를 제거하는 작업을 해줘야한다.** (setInterval을 사용했으므로 clearInterval로 해제하자.)

**외부 라이브러리를 사용했을 경우, dispose 기능이 있는 라이브러리는 여기서 호출하자.**

<br>

```jsx
  tick() {
    this.setState({
      date: new Date()
    });
  }
```

`constructor`에서 this.state의 date에 new Date() 넣어줬었다. 지금의 시간을 바로 출력해준 것이다.

그리고 1초마다 tick() 함수로 불러주기 위해 `componentDidMount()` 을 사용했고, `componentWillUnmount()`로 clearInterval 하고있다.

이제 tick()에서는 this.state의 date에 new Date()를 넣어준다면, 1초마다 new Date() 불러와 시계처럼 작동할 것이다.

state를 변경하기 위해서는 **this.setState**를 사용한다.

<br>

```jsx
//전체 코드
class Clock extends React.Component {
  constructor(props){
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

ReactDOM.render(
  <Clock />,
  document.getElementById('root')
);
```

undefined

이제 실행해보면 시계가 동작한다.

시간이 변경될때마다 푸른 선으로 깜빡거리고 있다. 이것은 렌더링을 시키고 있다는 의미이다.

`Hello, world!`부분도 **계속 렌더링을 시켜줘야할까?** 좋아보이지는 않는다.

<br>

```jsx
ReactDOM.render(
  <>
    <h1>Hello, world!</h1>
    <Clock />
  </>
  ,
  document.getElementById('root')
);
```

undefined

Clock Component에 있던 h1태그를 빼주었다. 이제 시간이 바뀔 때, 해당 부분만 렌더링되는것을 볼 수 있다.

<br>

> ## State 올바르게 사용하기

```jsx
// this.state.comment = 'Hello'; 잘못된 방법

this.setState({comment: 'Hello'});
```

State값을 직접 변경할 수 있는곳은 constructor 뿐이다. 나머지 부분에서는 **setState**를 사용하자.

<br>

```jsx
this.setState((state, props) => ({
  counter: state.counter + props.increment
}));
```
state와 props의 값을 이용해서 counter의 값을 변경해주고 있다. 여기서는 state와 props 앞에 this를 붙이면 안된다. this.props와 this.state는 비동기적으로 업데이트될 수 있기 때문이다.

화살표 함수말고 일반 함수로도 사용 가능하다.