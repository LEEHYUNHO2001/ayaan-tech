---
title: "NEXT.js"
description: "React는 CSR(Client Side Rendering)가 가능한 SPA(Single Page Application)이다."
date: 2021-08-10T05:18:14.715Z
tags: ["React","next"]
---
> ## NEXT.js란??
[공식문서](https://nextjs.org/)

Brower에서 보여지는 화면이 어디에서 만들어지는지에 따라 **CSR(Client Side Rendering)**과 **SSR(Server Side Rendering)**로 나누어진다. **React는 CSR이 가능한 SPA(Single Page Application)이다.** 당연하게 SSR과 CSR은 장단점이 있다. **NEXT.js**는 React에서 CSR과 SSR의 장점만을 가져오기 위해 사용한다.

React도 SSR로 구현이 가능하지만 복잡하다. **Next.js**는 **React에서 SSR(Server Side Rendering)**을 쉽게 구현할 수 있도록 도와주는 프레임워크이다.

<br /><br />

> ## SSR vs CSR
 **SPA** : 1개의 페이지에서 여러 동작이 이루어진다. 브라우저에 최초에 한번 페이지 전체를 로드하고, 이후부터는 url이 변경되면 특정부분만 데이터를 바인딩한다.


<br />



<br />

<img src="https://www.sarah-note.com/static/862e8950181629369ee391b5e4a11578/d9c39/p1_ssr.jpg" /> 전통적인 방법의 **SSR**

* **서버에서 데이터까지 포함하여 완전하게 만들어진 HTML파일을 받아오고 Rendering**한다.

* 요청이 있을경우 불필요한(ex : 화면이 바뀌지 않음) 부분까지 렌더링을 한다.



<br />

<img src="https://www.sarah-note.com/static/2b2c814f10a5726eac67db95d5d625e9/d9c39/p1_csr.jpg" /> **CSR** ( SPA에서 사용 )

* **처음**에 웹서버에 요청할 때 **데이터가 없는 문서를 프론트 서버에서 반환**한다. **클라이언트의 요청이 발생하면 필요한 데이터만 백엔드 서버에 요청하여 받아온다.**

* 요청한 데이터만 반환하기 때문에 서버 부하가 덜하다.

*  데이터를 제외한 코드들은 js파일에 한번에 번들된 후 반환되어 프로젝트 규모가 커지면 **첫 로딩속도가 느려진다.**

* 초기에 html에 데이터가 없다보니 검색 봇이 해당페이지를 빈페이지로 착각하여 **SEO**(Search Engine Optimization) 검색엔진 최적화에 취약하다.

<br /><br />

<img src="https://www.falandodeviagem.com.br/imagens21/nextdigital.png" />

**NEXT.js**에서 SSR은 요청에 대해서 SSR을 하는 것이 아니라, **초기 렌더링**만 해당한다. SPA의 단점인 초기 렌더링 시간을 줄일 수 있고, 첫 페이지는 서버에서 렌더링하기 때문에 데이터가 있어서 SEO문제를 해결한다.



<br />

> ## 장점

* 직관적인 페이지 기반 라우팅 시스템(동적 경로 지원)

* 가능한 경우 자동으로 페이지 최적화

* 서버측 렌더링 및 차단 데이터 요구 사항

* 빠른 페이지 로드를 위해 자동 코드 분할

* 최적화된 페이지 프리페치를 사용한 클라이언트 측 라우팅

* CSS 지원 및 모든 CSS-in-JS 라이브러리 지원

* HMR(Hot Module Replacement)을 지원하는 웹 팩 기반 개발 환경

* 페이지에 사용되는 것과 동일한 간단한 라우터를 사용하여 서버 없는 기능으로 API를 구축하기 위한 API 경로

* 커뮤니티 플러그인과 고유한 Babel 및 Webpack 구성으로 사용자 지정 가능

<br />

> ## 핵심기능 - 코드 스플릿팅

<img src="https://blog.kakaocdn.net/dn/bdjGZv/btqNBeX4MO2/T8tPAwz9wTqx9nU8FaIno1/img.png" />

코드 스플릿팅은 파일을 분리하는 작업이다. 예를 들어 페이지가 /main, /about, /post 이렇게 세 가지 페이지로 이루어진 SPA를 개발한다고 할 때 /main 페이지를 들어가는 동안 /about이나 /post 페이지 정보는 사용자에게 필요하지 않을 확률이 높다. 그러한 **파일들을 분리**하여 지금 사용자에게 필요한 파일만 불러올 수가 있다면 로딩도 빠르게 이루어지고 트래픽도 줄어 **사용자 경험이 좋아질 수가 있다.** 이와 같이 더 나은 사용자 경험을 위해 코드를 비동기적으로 로딩하는 방법이 있는데 **바로 코드 스플리팅**이다.
대신에 한번에 받는것이아니라 부분적으로 받아오기 때문에 프론트 서버랑 잠깐씩 요청이 있다.

<br />

> ## 설치

```js
npm i -D next
npm i next-redux-wrapper react-redux

//package.json
  "scripts": {
    "dev": "next -p 3000",
    "build": "next build"
  },
```
**메인 디렉토리에 pages라는 디렉토리를 만들어어야한다. 이 디렉토리 이름은 고정으로 모든 페이지에 관련된 js는 pages라는 디렉토리에 넣어주면 된다.**

React에는 단 하나의 Redux Store가 존재하기 때문에 사용이 어렵지 않다. 하지만 Next를 사용하는 순간 Redux도 Store가 여러개가 될 수 있다. **Next.js는 유저가 요청할때마다 Redux Store를 새로 생성**하고, getInitialProps, getServerSideProps등에서 리덕스 스토어에 접근할 수 있어야 한다.**next-redux-wrapper**가 있어야 가능하다.

<br />

> ## SSR(Next + Redux) 해보기

```js
//store/configureStore.js
import {createWrapper} from 'next-redux-wrapper';
import {applyMiddleware, createStore, compose} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';

import reducer from '../reducers';

const loggerMiddleware = ({dispatch, getState}) => (next) => (action) => {
    console.log(action);
    return next(action);
};

const configureStore = () => {
    const middlewares = [];
    const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(...middlewares)) 
    : composeWithDevTools(applyMiddleware(...middlewares))

    const store = createStore(reducer, enhancer);
    return store;
};

const wrapper = createWrapper(configureStore, 
    {debug:process.env.NODE_ENV === 'development'});

export default wrapper;
```
Next에서 SSR을 위한 메소드들을 제공한다. 하지만 Redux와 함께 사용하다보면 여러가지 문제점을 만나게 된다. 이 문제점의 해결방안이 **next-redux-wrapper**이다.

현재 store 변수에는 state와 reducer이 포함되어있다.
wrapper은 Next를 사용하기 위해 next-redux-wrapper을 통해 만들었었다.
next-redux-wrapper는 유저가 페이지를 요청할때마다 Redux Store를 생성해야 하기 때문에 정의해준 configureStore을 createWrapper에 넣어준다.

이후에 **wrapper로 개별 페이지들의 SSR**을 할 것이다.


<br />

```js
//pages/_app.js
import React from 'react';
import Head from 'next/head';

import wrapper from '../store/configureStore';

const Example = ({Component}) => {
    return(
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>Example</title>
            </Head>
      	    <Component />
        </>
    );
};

export default wrapper.withRedux(Example);
```

_app.js에서 Example컴포넌트를 wrapper.withRedux으로 감싸준다.
그럼 이제 각 페이지에서 getInitialProps, getServerSideProps, getStaticProps 등의 메소드를 사용하여 Redux store에 접근이 가능해진다.

(_app.js에서 커스텀 getInitialProps를 정의하면 안된다. 확장하는 순간 next.js의 페이지 최적화 기능을 무효화 시키기 때문이다.)

<br />

```js
//pages/index.js
const Home = () => {

    return(
        <AppLayout>
            
        </AppLayout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    context.store.dispatch({
        type: LOAD_POSTS_REQUEST,
    });
    context.store.dispatch(END);
    //sagaTack는 store에서 설정했음
    await context.store.sagaTask.toPromise();
});
```
index 페이지의 return 값은 _app.js 의 Component로 간다.

Home 컴포넌트는 브라우저와 프론트 서버 동시에 실행된다. 
하지만 getServerSideProps와 같은 메소드는 서버에서 먼저 실행된다.

Redux Server Side Rendering 원리는 INIT 에서는 초기상태 그대로 있지만, getServerSideProps가 실행되고 나서는 이 결과를 HYDRATE로 보내준다. 이 정보들은 Reducers에서 HYDRATE action이 실행되면서  받는다. SSR이 완료될때 호출되는 액션이 HYDRATE이다.

<br />

<img src="https://www.thequench.com/wp-content/uploads/2016/08/Hydrate-1030x579.png" />

```js
const rootReducer = (state, action) => {
    switch(action.type){
        case HYDRATE:
            console.log('HYDRATE', action);
            return action.payload;
        default:{
            const combineReducer = combineReducers({
                user,
                post,
            });
            return combineReducer(state, action)
        }
    }
};
```

Next.js에서 생성한 Redux Store와 Client에서 생성한 Redux Store는 다르기 때문에 이 둘을 합쳐주어야 한다. 서버에서 생성한 스토어의 상태는 HYDRATE라는 action을 통해서 클라이언트에 합쳐주는 작업이 필요하다. action.payload에는 서버에서 생성한 스토어의 상태가 담겨있다. 이 둘을 합쳐 새로운 클라이언트의 리덕스 스토어의 상태를 만든다.

<br />

```js
import React from 'react';
import Link from 'next/link';

const PostCardContent = ({postData}) => (
    <div>
        {postData.split(/(#[^\s#]+)/g).map((v, i) => {
            if(v.match(/(#[^\s#]+)/g)){
                //slice는 앞의 #을 빼준것.
                return <Link href={`/hashtag/${v.slice(1)}`} key={i} ><a>{v}</a></Link>;
            }
            return v;
        })}
    </div>
);

export default PostCardContent;
```
페이지들을 pages 디렉토리에 있어야한다. 필요한 기능들은 컴포넌트로 분리하여 다른 디렉토리에 존재해도 된다.

link 태그를 사용하기 위해서는 기존의 태그가 아닌 next에서 import 해준 후에 Link태그를 사용하면 된다. href는 a태그가 아닌 Link에서 이루어져야 한다. next의 태그를 사용하는 이유는 다양한 SEO 스킬을 적용하기 위해서이다.

<br />
<br />

참고 : [moonsj](https://medium.com/@msj9121/next-js-%EC%A0%9C%EB%8C%80%EB%A1%9C-%EC%95%8C%EA%B3%A0-%EC%93%B0%EC%9E%90-8727f76614c9) [namezin](https://velog.io/@namezin/CSR-SSR) [minji](https://velog.io/@bbio3o/Next.js%EB%9E%80) [devOwen](https://devowen.com/342) [심재철](https://simsimjae.medium.com/next-redux-wrapper%EA%B0%80-%ED%95%84%EC%9A%94%ED%95%9C-%EC%9D%B4%EC%9C%A0-5d0176209d14) zerocho