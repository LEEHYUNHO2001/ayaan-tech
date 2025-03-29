---
title: "React Life-Cycle"
description: "React는 Component 기반의 View를 중심으로한 라이브러리이다. 그래서 React는 Component의 생성부터 소멸에 이르는 Life-Cycle을 가지고있다."
date: 2021-08-17T09:21:35.349Z
tags: ["React"]
---
> ## 리엑트 라이프 사이클이란??

React는 Component 기반의 View를 중심으로한 라이브러리이다. 그래서 React는 Component의 **생성부터 소멸**에 이르는 Life-Cycle을 가지고있다.

<br /><br />

> ## [Class Component] VS [Hooks]

![](/images/2881219d-fdff-4cd9-bc05-91ac970298ff-image.png)

위 사진은 React 공식문서에 있다. 
박스 하나씩 클릭해보며 설명을 볼 수 있으니, [여기를 참고](https://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)하자.

**1. constructor**

```jsx
//Class
class User extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          nickname: LEEHYUNHO,
        };
}
  
//Hooks
const User = () => {
    const [nickname,setNickname] = useState('');
}
```

컴포넌트가 처음 만들어질때 실행할 코드들을 작성한다.
**초기 State를 설정**할 수 있다.

<br />

**2. getDerivedStateFromProps**

리액트 16에서 추가된 라이프사이클이다. props가 바뀌면 그에 따라 state도 같이 바꿔준다. 실무에서 자주 사용하지는 않는것 같다. -> <a href="https://ko.reactjs.org/docs/react-component.html#static-getderivedstatefromprops">사용법</a>

<br />

**3. shouldComponentUpdate**

이 메서드를 사용하면 **변경된 값만 렌더링** 되도록 할수 있다. 즉, props 또는 state를 변경했을때 리렌더링을 할지 말지 결정하는 함수이다. PureComponent보다 더 커스터마이징하게 사용할 수 있다.
Hooks에서는 **memo와 useMemo**를 사용한다.

```jsx
shouldComponentUpdate(nextProps, nextState, nextContext) { 
  if (this.state.page) !== nextState.page) 
  	return true;
  return false; 
}
```
함수 안에서 리렌더링하게 되는 경우에 대해서만 반환값으로 true를 주고, 다른 경우에는 false를 반환하도록 하면 된다. 위의 경우 this.state.page가 변경되면 true가 되어 Component가 업데이트 될 것이다.

<img src="https://media.vlpt.us/images/gcback/post/dfadc256-2c5c-4a51-a7ef-6be3f82da0b2/mve37at43zl83h1nbu4r.png" />

<br />

**4. render**

```jsx
// Class
class Index extends React.Component {
  render() {
    return (
      <div>
        <User />
      </div>
    );
  }
}

// Hooks
const Index = () => {
  return (
    <div>
      <User />
    </div>
  );
}
```

Component를 렌더링할 때 필요한 메서드이다. return 뒤에 (  );은 보기 쉽게 해준것이다. 

<br />

**5. getSnapshotBeforeUpdate**

이 메서드는 사용예가 많지 않다. 채팅 화면처럼 스크롤 위치를 따로 처리하는 작업이 필요한 UI 등에서 사용한다. Hooks에서는 이 기능을 대체할게 없다.

<br />

**6. componentDidMount **

컴포넌트가 **첫 랜더링된 후 실행**된다. 여기에 비동기 요청을 많이한다.
```jsx
// Class
class game extends React.Component {
    componentDidMount() {
        ...
    }
}

// Hooks
const game = () => {
    useEffect(() => {
        ...
    }, []);
}
```
**Hooks에서는 useEffect** 함수로 사용가능하다. **[ ]가 빈 배열이면 componentDidMount와 같은 역할** 수행한다. 변경되는 값이 없으므로 재실행하지 않는 것이다.

<br />

**7. ComponentDidUpdate**

**props가 업데이트**될 때의 과정이다. **리렌더링을 완료한 후 실행**된다. 

```jsx
// Class
class game extends React.Component {
    componentDidUpdate(prevProps, prevState) {
        ...
    }
}

// Hooks
const game = () => {
    useEffect(() => {
        ...
    }, [변경되는값]);
}
```

**useEffect는 [ ] 에 요소가 있으면 componentDidMount와 componentDidUpdate 모두 수행**한다. [ ]안의 요소가 변경될때마다 useEffect가 실행된다.

만약에 Component가 리렌더링 될 때마다 실행되게 하려면 어떻게 해야할까? 두번째 배열을 아예 안 넣으면 된다. useEffect(() => {...});

componentDidUpdate의 역할만 수행할 수도 있다. useEffect는 기본적으로 componentDidMount와 componentDidUpdate의 역할을 동시에 수행하므로 componentDidMount의 역할을 제거(또는 무시)해야 한다. 이를 위해서는 useRef라는 훅이 필요하다.

<br />

**8. componentWillUnmount**

**컴포넌트가 제거되기 직전 실행**된다. 부모가 없앴을 경우에도 실행된다. 비동기 요청 정리하는 과정이다.

```jsx
// Class
class game extends React.Component {
    coomponentWillUnmount() {
        ...
    }
}

// Hooks
const game = () => {
    useEffect(() => {
        return () => {
            ...
        }
    }, []);
}
```
**Hooks에서는 return( ) => { } **을 사용하여 구현한다.

<br /><br />

**More**

**useEffect를 여러번 사용할 수 있다. class의 경우 componentDidMount나 componentDidUpdate는 모든 state를 조건문으로 분기처리한다.**



<br /><br /><br /><br />

[zerocho](https://www.zerocho.com/category/React/post/579b5ec26958781500ed9955) [kyun2da.dev](https://kyun2da.dev/react/%EB%A6%AC%EC%95%A1%ED%8A%B8-%EB%9D%BC%EC%9D%B4%ED%94%84%EC%82%AC%EC%9D%B4%ED%81%B4%EC%9D%98-%EC%9D%B4%ED%95%B4/)