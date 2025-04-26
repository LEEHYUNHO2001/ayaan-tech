---
title: "Recoil은 얼마나 간단할까?"
description: "Recoil을 이용하여 쉽게 상태관리 해보자. atom과 selector의 차이에 대해서도 알아보자."
date: 2022-04-25T01:45:49.054Z
tags: ["React","상태관리"]
---
# Recoil을 알아보기 전에..

전역 상태를 ContextAPI를 통해서 관리하고 있었다. 그러다 문득 회사에서 하고 있는 이 프로젝트가 커질 수 있다는 생각을 했다.

ContextAPI의 Provider 하위에서 context를 구독하는 모든 컴포넌트는 Provider의 value prop가 바뀔 때마다 다시 렌더링 된다. Context API를 사용할 경우 작은 프로젝트에서는 매우 효율적이지만, 프로젝트가 커지면 렌더링이 엄청나게 일어날 것이다.

```jsx
const App = () => {
    return (
      <>
        <Btn />
        <Modal />
      </>
    );
  };

  const Btn = () => {
    const [, setShow] = useContext(ModalContext);
    const onClickBtn = () => {
      setShow((prev) => !prev)
    }
    return <button onClick={onClickBtn}>클릭</button>;
  };

  const Modal = () => {
    const [show] = useContext(ModalContext);
    return show ? <div>모달</div> : null;
  };

```

위의 코드로 예시를 들어보자. 모달을 띄울 수 있는 클릭이라는 버튼이 있고, 이 버튼을 클릭하면 모달이 나타난다. Context.Provider는 value로 저장된 값 show가 변경되면 useContext(Context)를 사용하는 <Btn />도 같이 렌더링이 되는 것이다.

사실 ContextAPI로 이 문제를 해결할 수 있긴 하다. App에서 useContext를 선언하고 하위에 사용할 부분만 props로 넘겨주는 것이다. 이 경우에는 코드량이 많아지고 보일러 플레이트 코드도 많아진다.

> 보일러플레이트란?
컴퓨터 프로그래밍에서 보일러플레이트 또는 보일러플레이트 코드라고 부르는 것은 최소한의 변경으로 여러곳에서 재사용되며, 반복적으로 비슷한 형태를 띄는 코드를 말한다.

**Recoil**은 이 문제를 해결하고, 러닝 커브가 높은 Redux보다 사용하기 쉽다.

<br>

## Recoil

![](/images/27b5c1e3-2bd9-4696-aa3c-2dbffa93ac62-image.png)

페이스북에서 공식적으로 개발하고 있는 전역 상태관리 라이브러리다. 현재 상태관리 생태계는 Redux가 압도적으로 우세하고, Mobx도 많이 사용하지만 Recoil도 올라오고 있는 추세이다.

![](/images/6dc79e51-2b9c-49fe-888f-3cf22b984f8d-image.png)

Redux와 Mobx가 이미 있는데, Recoil을 사용하는 이유는 러닝 커브가 낮아 간단하게 사용할 수 있기 때문이다.(심지어 Boiler Plate 양도 적고, Hooks 문법과 비슷하기도 하다.)

그리고 React 동시성 모드, Suspense 등을 지원하기 때문에 사용자 경험 관점에에서도 좋다.

![](/images/ccb193a1-726e-4b3f-8a8c-5f6fd9726b95-image.jpg)

하지만 역시 단점도 존재하는데, redux dev tool와 같은 개발자 도구가 잘 되어있지 않고 커뮤니티가 적다는 것이다. 또한 모든 API들이 신뢰성이 높은것이 아니다. useGetRecoilValue, useRecoilRefresher 등은 공식문서도 UNSTABLE로 분류하고 있다.

Recoil을 사용하면서 주의해야 할 점은 atom과 selector의 경계가 무너지지 않도록 설계하는 것이다.
 
 <br>

### atoms

```jsx
//app.tsx
import React,{ Suspense } from 'react';
import { RecoilRoot } from 'recoil';

function App({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Suspense fallback={<div>Loading...</div>}>
        <Component {...pageProps} />
      </Suspense>
    </RecoilRoot>
  );
}
```

이제 본격적으로 Recoil에 대해서 알아보자. 위의 단점들이 존재해도 많이 사용하는 이유는 간단하기 때문이다. 먼저 Recoil을 사용하기 위해 최상위인 app에서 RecoilRoot로 감싸주면 준비 완료이다.

`Suspense`는 추후에 selector를 이용하여 비동기 처리를 할 경우, 데이터를 받아오기 전에 로딩화면을 설정해주기 위해 사용한다. 이것은 recoil이 아닌 react에서 지원하는 기능이다.

<br>

```jx
import { useRecoilValueLoadable } from 'recoil';

const Cookies = () => {
  const dataLoadable = useRecoilValueLoadable(getDataLoadable);

  switch(dataLoadable.state){
    case 'hasValue':
      return <Component />
     case 'loading':
  	return <Loading />;
     case 'hasError':
     	throw dataLoadable.contents;
}
```

로딩에 대한것은 Recoil의 Lodable 기능을 사용해도 된다. Loadable은 atom이나 selector의 현재 상태를 갖는 객체다.

<br>

```jsx
//recoil/atoms/dataState.tsx
import { atom } from 'recoil';

import { DataProps } from '@/types/DataProps';

export const DataState = atom<DataProps>({
  key: 'DataState',
  default: {
    title: '',
    description: '',
  },
});
```
 
그리고 atom을 하나 생성한다. atom이란, 상태의 단위로 값이 업데이트되면 값을 구독(subscribe)한 컴포넌트는 다시 렌더링 된다. 타입스크립트를 사용한다면 default에 정의할 구조에 맞게 타입을 생성해서 `atom<타입>`과 같이 사용하면 된다.

key는 말 그대로 키 값이며, 보통 변수명과 동일하게 지어준다. default는 초기값을 설정해주면 된다. string, array, object등 사용할 데이터 형식에 맞게 초기화 하자. (promise 객체도 가능하지만 atom에서 바로 비동기 요청은 할 수 없다. -> **selector**)

<br>

### Recoil의 전역 상태 Hooks

우리는 atom을 생성하여 초기값을 설정했다. 이제 DataProps의 default에 값을 넣고 사용하면 상태관리가 성공적으로 된 것이다. Recoil에서는 useState처럼 간단하게 사용할 수 있다.

<br>

```jsx
import { useRecoilState } from 'recoil';

const Example = () => {
  const [dataState, setDataState] = useRecoilState(DataState);
  
  return (
    <Container>
      //...
    </Container>
  );
}
```

useState와 비슷하다. 값을 넣어주려면 `setDataState` 를 사용하면 되고, 값을 사용하기 위해서는 `dataState`를 쓰자.

<br>

```jsx
const dataState = useRecoilValue(DataState);
const setDataState = useSetRecoilState(DataState);
```

하지만 이 둘중의 하나만 사용하고 싶은 컴포넌트도 있을 것이다. 예를들면 정보를 변경하지 않고 값만 사용하려면 `useSetRecoilState`을 사용하자. 그 반대라면 `useRecoilValue` 이다. 이 외에도 `useResetRecoilState`가 있는데, 이것은 전역 상태값을 default값으로 리셋하기 위해서 사용한다.

<br>

### selector

selector는 atom나 다른 selector를 입력으로 받아들이는 순수 함수이다. 

> 순수 함수 : 어떤 함수에 동일한 인자를 주었을 때 항상 같은 값을 리턴하는 함수

atom처럼 컴포넌트가 구독할 수 있고, 상위의 atom 또는 selector가 업데이트되면 하위의 selector 함수도 다시 실행된다.

그리고 selector는 read-only 한 RecoilValueReadOnly 여서 set이 불가능하다.

<br>

```jsx
//selector을 사용하지 않은 비동기 처리
const [dataState, setDataState] = useRecoilState(DataState);

  useEffect(() => {
    (async () => {
        const res = await axios({
          method: 'get' as Method,
          url: 'endpoint',
        });
      setDataState(res.data);
    })();
    setLoading(false);
  }, [setData]);
```

보통 컴포넌트에서 이와 같이 비동기 처리를 해준다. 엔드 포인트에 요청을 보내고, res가 정상적으로 오면 `setDataState(res.data)`를 함으로써 저장 하는 것이다. atom이 변경되면 이를 구독하는 컴포넌트도 리렌더링 되기 때문에 문제는 없지만 selector를 사용하여 비동기 부분을 처리해주면 캐싱 기능을 사용할 수 있다. 이 경우 이미 받아왔던 정보는 받을 필요가 없어 성능이 향상된다.

<br>

```jsx
export const DataState = atom<DataProps>({
  key: 'DataState',
  default: {
    title: '',
    description: '',
  },
});

export const getDataSelector = selector({
  key: "data/get",
  get: async ({ get }) => {
    try{
        const res = await axios({
          method: 'get' as Method,
          url: 'endpoint',
        }); 
      return res.data;
    } catch (err) {
    	throw err;
    }
  },
  set: ({set}, newValue)=> {
    set(DataState, newValue)
  }
});
```

비동기 처리 부분을 selector에서 사용하자. 그 후 res의 data 를 return 해주면 된다. selector은 read-only이므로 `const dataSelector = useRecoilValue(getDataSelector)`와 같이 사용한다.

`const [dataSelector, setDataSelector] = useRecoilValue(getDataSelector)`와 같이 사용할 경우도 있는데, 이것은 selector에 set을 설정했을때 사용한다. 여기서 **set은 자기 자신이 아닌** 다른 atom을 지정하여 새로운 값을 부여하는데 사용된다. 

한마디로 selector는 get으로 비동기 처리하고 로직으로 정제한 데이터를 바탕으로 다른 selector나 atom의 state를 변경하는 것이다.

<br>

#### 캐싱

selector는 atom과 달리 기본적으로 캐싱을 한다. 즉, API요청을 하고 받은 값을 기억하고 있다가 해당 selector가 다시 실행되면 이 값을 그대로 주는 것이다. 다시 요청을 하지 않는다는 큰 장점이 있다.

<br>

### atomFamily와 selectorFamily

```jsx
export const idDataGet = selectorFamily({
  key: "get/idData",
  get: (id) => async () => {
    if (!id) return "";
	const res = await axios({
          method: 'get' as Method,
          url: `endpoint/${id}`,
        });
    return data;
  },
});
```

파라미터를 받아와 이를 반영한 값을 반환하기 위해 사용한다. 해당 엔드포인트에서 id값의 주소로 get요청을 동적으로 받고 있다.

```jsx
  const idData = useRecoilValue(idDataGet(id));
```

컴포넌트에서 사용하는 부분은 이와 같다.

<br>

## 마무리

Recoil은 매우 간단하게 사용할 수 있는 상태 관리인 것 같다. selector을 잘 사용하면 성능도 나쁘지 않을 것 같았다. 하지만 개발자 도구가 미흡하여 [Recoil Snapshot](https://recoiljs.org/docs/api-reference/core/Snapshot/)을 이용하여 스냅샷을 확인하게 되는데 이것도 신뢰성이 부족하다는 단점이 있다.