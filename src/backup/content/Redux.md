---
title: "Redux"
description: "상태의 중앙 관리를 위한 상태 관리 도구이다. "
date: 2021-08-12T07:23:44.980Z
tags: ["React","상태관리"]
---
> ## Redux란??

상태의 중앙 관리를 위한 **상태 관리 도구**이다. React외에도 Angular, Vue, JQuery 등에서도 사용 가능한 라이브러리다.

<img src="https://ichi.pro/assets/images/max/724/0*_N4nKDnGqOAsz2Pc.jpg" />

React프로젝트를 진행하다보면, 컴포넌트들을 쪼개서 관리하게 된다. 
그리고 각각의 컴포넌트들은 state를 가지고있다.

**app.js** ---sweet---> **apple.js**
단순한 구조에서 apple.js는 sweet라는 props를 간단하게 전달받을 수 있다.


**app.js** ---sweet---> **fruites.js** ---sweet---> **apple.js**
중간에 컴포넌트가 하나 더 생기게 되면, app.js에서 props를 물려주고, friutes에서 한번 더 물려주게 된다. 만약에 **컴포넌트가 100개라면** 중간에서 사용하지도 않는 props를 하위 컴포넌트에서 사용하기 위해 **100번 물려주어야 하는 것**이다.

이와같은 단점을 보완하기 위해, Flux에서 영감을 받아 Redux가 개발되었다.

<br />

> ## 설치

```
npm i redux react-redux
```

<br />

> ## 개념과 사용법

undefined원하는 부분에서 action을 보내면, reducer가 data state값을 리턴한다.

```js
//store 정의
import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import { Provider } from 'react-redux';

import App from './App';
import reducer from '../reducers';

const store = createStore(reducer);

ReactDOM.render(
  <Provider store={store}>
  	<App />
  </Provider>,
  document.getElementById('root')
);

```
* **store**
Redux는 하나의 store를 통해 상태를 한 곳에서 관리한다.
state를 reducer를 통해 쉽게 저장하고 불러올 수 있다. 

<br />
<br />
<br />

```js
//reducer 사용
const reducer = (state = initialState, action) => {
    switch(action.type){
        case LOGIN:
            return {
                ...state,
              	loginState: true,
            }
        case LOGOUT:
            return {
                ...state,
		loginState: false,
            };
        default:
            return state;
    }

}
```
* **reducer**
저장소에 유일하게 접근할 수 있는 객체이다. **action**에 따라 행동하기 때문에 **주로 switch문을 사용**한다. 상태를 변화시키는 부분에서 우리는 **불변성**을 지켜야한다. action이 들어오면 해당하는 case가 실행된다. return값에 **...state**으로 **불변성을 지켜**주고, **바뀌는 부분인 loginState의 값을 설정**해주면 된다.



**불변성** : React에서 편하게 상태를 관리하기 위해 객체 타입을 사용하는데, 이는 참조 타입이라 불변성을 유지할 수 없다. 그래서 기존의 주소 값과 다른 **새로운 객체를 생성하여 복사한 뒤 해당 프로퍼티를 바꾸는 작업**이 필요하다.

<br />
<br />
<br />

```js
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

```

* **action**
상태 변경을 설명하는 정보이다.

<br />
<br />
<br />

```js
store.subscribe(render);
const unsubscribe = store.subscribe(() => console.log(`상태 변경 감지: ${store.getState()}`));
unsubscribe(); // 구독 취소

```

* **subscription**
애플리이션 상태 변경을 구독(subscribe, 감지)하여 상태가 업데이트 되면 등록된 listener를 실행시킨다. .subscribe() 함수는 구독을 취소할 수 있는 unscribe 함수를 반환한다. unsubscribe 함수를 실행하면 상태가 업데이트 되어도 UI를 업데이트하지 않는다.

<br />


> ## ContextAPI와 다른점?

**ContextAPI**는 Redux와 마찬가지로 **상태의 중앙 관리**를 위한 상태 관리 도구이다. Context API는 크게 **전역 상태가 저장되는 context**, **전역 상태를 제공하는 Provider**, 그리고 **전역 상태를 받아 사용하는 Consumer**로 나뉘어져 있다.

<img src="https://media.vlpt.us/images/devgosunman/post/996398b7-bd5d-4054-81bd-6df78ac819f5/react%20Context.jpg" />

ContextAPI는 Redux와 달리 **React에서만 사용**가능하고, **저장소가 여러개 존재**할 수 있다.
Redux는 전역 관리 상태 외에 **다양한 기능**을 제공하는점이 ContextAPI와 차이점이다. 또한, Context API는 high-frequency updates에 좋지 않은 성능을 보이지만 Redux는 그렇지 않다.

<br />

**Redux 기능**
* 로컬 스토리지에 상태를 영속적으로 저장하고 시작할 때 다시 불러오는데 뛰어나다.
* 상태를 Server에서 미리 채워서 HTML에 담아 Client로 보내고 앱을 시작할 때 다시 불러오는데 뛰어나다.
* 사용자의 action을 직렬화해서 상태와 함께 자동으로 버그 리포트에 첨부할 수 있다.(에러처리 가능)
* action 객체를 네트워크를 통해 보내면 코드를 크게 바꾸지 않고도 협업 환경 구현할 수 있다.
* 실행취소 내역의 관리나 optimistic mutations을 코드를 크게 바꾸지 않고 구현 가능하다.
* 개발할 때 상태 내역 사이를 오가고 action 내역에서 현재 상태를 다시 계산하는 일을 TDD 스타일로 할 수 있다.
* 개발자 도구에게 완전한 조사와 제어를 가능하게 해서 개발자들이 자신의 앱을 위한 도구를 직접 만들 수 있다.
* 비지니스 로직 대부분을 재사용하면서 UI를 변경할 수 있다.


<br />
<br />
<br />

참고 : [cada](https://velog.io/@cada/React-Redux-vs-Context-API) [estaid.dev](https://estaid.dev/reasons-to-maintain-immutability-with-react/) [야무](https://xn--xy1bk56a.run/react-master/lecture/rd-redux.html#%E1%84%85%E1%85%B5%E1%84%83%E1%85%B2%E1%84%89%E1%85%A5) zerocho