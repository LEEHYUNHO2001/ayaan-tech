---
title: "Redux-saga"
description: "Redux의 미들웨어 역할. 비동기 처리를 쉽게 하기 위해 사용한다."
date: 2021-08-11T10:23:24.858Z
tags: ["React","상태관리"]
---
> ## Redux-saga란?>

React는 MVC패턴에서 View만 담당하기 때문에 다른 SPA(Single Page Application) 프레임워크(뷰, 앵귤러)에 구축되어 있는 개발 환경을 직접 해주어야 한다. 프로젝트 규모가 커지면서 데이터 관리를 별도로 하기 위해 Redux, MobX 등의 라이브러리가 생겼다.
점점 복잡해지는 프로젝트 때문에 **비동기 처리**를 해야하는 코드는 증가해서 Redux의 미들웨어 역할을 하는 **Redux-saga**가 등장하였다.

비동기 처리에는 thunk도 있지만, Effect들을 직접 구현해야한다. 그러므로 Redux-saga를 사용하는것을 추천한다.
	
<img src="https://blog.kakaocdn.net/dn/bkm6tC/btq329TKK26/uKA9v6j1sEx2D3XRHMkFBK/img.png" />


<br />

> ## 설치

```
npm i redux-saga
```

<br />

> ## Generator 함수

Redux-saga를 알기 위해서는 generator함수는 필수이다. function에 *이 붙는 형식으로 사용한다.
```js
const gen = funcion* () {
	console.log('A');
	yield;
	console.log('B');
	yield;
	console.log('C');
	yield 'END';
}
gen().next();
gen().next();
gen().next();
gen().next();
```
함수를 실행하기 위해서는 .next()를 붙여주어야 한다. 

* 처음 함수를 실행하면 A가 출력되고, {value: undefined, done:false} 값을 가지며 종료된다.

* 함수를 한번 더 실행하면 B가 출력되고, {value: undefined, done:false} 값을 가지며 종료된다.

* 한번 더 실행하면 C가 출력되고, {value: 'END', done:false} 값을 가지며 종료된다.

* 마지막으로 한번 더 실행하면 {value: undefined, done:true} 값을 가진다.

이와같이 generator 함수는 실행하면 객체를 반환하고, 모든 코드를 한번에 실행하지 않는다.

<img src="https://media.vlpt.us/post-images/rohkorea86/1c94ac40-3b87-11e9-acdf-65f3de62394c/IMG0287.jpg" />

또 다른 특징은 while(true) 문을 사용이 가능하다.
```js
let i = 0;
const gen = function*() {
	 while(true){
		yield i++;
	}
}
```

일반 함수에서는 오류가 나는 코드이지만, generator 함수에서는 호출할때마다 i가 증가하는 효과를 가져온다. 이 특징을 사용하여 이벤트 리스너같은 역할을 만들 수 있다.

<br />

> ## Effect

effect는 이벤트를 처리할 내용을 담고 있는데, Redux-saga에서 yield를 이용하여 호출하고 수행된 내용을 다시 돌려 받아 그 다음 action들을 수행한다. next로 한줄한줄 실행하며 테스트하기에도 편리하다.

<br />

effect 예 )

* fork : 비동기 함수 호출

* call : 동기 함수 호출

* all : 배열을 받음

* put : dispatch와 비슷한 역할

* take : action을 기다렸다가, action이 오면 실행(일회성)

* takeEvery : take의 일회성을 보완한 effect. take와 달리 비동기.

* takeLatest : takeEvery에서 마지막 응답만 가져오는 기능 추가됨. 예를들어, 마우스 클릭이 2번되어도 Back에서 오는 이전 값은 무시하게된다. 하지만 Front 요청이 2번 들어간 것까지는 취소하지 못해서 서버에는 데이터가 2번 저장되는 결함이 존재.(서버에서 검사를 해주어야한다.)

* throttle : 요청 보내는 것까지 시간 제한을 주어 컨트롤 할 수 있다.

[쓰로틀링 디바운싱 차이](https://www.zerocho.com/category/JavaScript/post/59a8e9cb15ac0000182794fa)

<br />

> ## 이벤트 리스너로 사용

```js
import {all, fork, call, put, take,takeEvery, takeLatest, takeLeading} from 'redux-saga/effects';
import axios from 'axios';

function logInAPI(data){
    return axios.post('/api/login', data);
}

function* logIn(action) {
    try{
        const result = yield call(logInAPI, action.data);
        yield put({
            type: 'LOG_IN_SUCCESS',
            data: result.data,
        });
    } catch(err){
        yield put({
            type: 'LOG_IN_FAILURE',
            data: err.response.data,
        });
    }
}

//이벤트 리스너같은 역할
function* watchLogIn(){
    yield takeLatest('LOG_IN_REQUEST', logIn);
}

export default function* rootSaga() {
    yield all([
        fork(watchLogIn),
    ]);
}
```
* rootSaga에서 watchLogIn이 실행된다.

* watchLogIn에서 LOG_IN_REQUEST를 기다리다가 요청이 오면 logIn 함수를 실행한다.

* logIn 에서 인자로 action을 받는다. action.type에는 LOG_IN_REQUEST가 들어있고 action.data에는 로그인 정보가 들어가있게 된다.

* logInAPI을 call 할때 action.data를 넘겨주고 성공 실패 결과에 따라 put을 해준다. 

<br />
<br />
<br />

참고 : [oyg0420](https://oyg0420.tistory.com/entry/Redux-Saga-%EB%9E%80) [UZILOG](https://uzihoon.com/post/181be130-63a7-11ea-a51b-d348fee141c4) zerocho