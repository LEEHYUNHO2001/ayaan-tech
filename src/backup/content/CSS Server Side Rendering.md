---
title: "CSS Server Side Rendering"
description: "Next.js를 사용해 SSR을 설계했었는데, CSS도 SSR을 해줘야 한다는 사실을 알게되었다."
date: 2021-09-27T09:05:26.898Z
tags: ["CSS","React","next"]
---
![](/images/c3ee17ed-2968-47df-ab88-2b8d72ada053-image.png)

React 프로젝트를 진행하던 중 Warning이 발생했다. styled-component로 작성한 CSS도 적용되지 않았다. Next.js를 사용해 SSR을 설계했었는데, CSS도 SSR을 해줘야 한다는 사실을 알게되었다.

<br />

```js
npm i babel-plugin-styled-components
```

먼저 babel-plugin-styled-components을 설치하고, .babelrc 파일을 생성해주었다. Next.js는 내부적으로 webpack과 babel이 돌아가는데, 우리는 이것을 커스터마이징 해주면 된다.

<br />

```js
//.babelrc
{
    "presets": ["next/babel"],
    "plugins": [
        ["babel-plugin-styled-components", {
            "ssr": true,
            "displayName": true
        }]
    ]
}
```
Server Side Rendering을 true로 해준다. 
displayName을 true로 하면 개발자도구에서 코드보기 편하다.

<br />

<img src="https://blog.kakaocdn.net/dn/czaFFD/btqAWcKNmbF/HCsYrgCKYpJmKmhB9VfIh0/img.png" />

**Next.js는 pages라는 디렉터리**를 생성하여, 페이지들을 관리한다. 현재 pages 디렉터리에 **_app.js**가 존재한다. 서버로 요청이 들어왔을 때, 가장 먼저 실행되는 컴포넌트이다. 모든 페이지들의 상위 페이지이며, 페이지에 적용할 공통 레이아웃이다. 

이제 pages 디렉터리에 **.document.js**를 생성하자.
.document는 _app 다음에 실행되며, 공통적으로 활용할 head (Ex. 메타 태그)나 body 태그 안에 들어갈 내용들을 커스텀할때 사용한다.

```js
//pages/.document.js
import React from 'react';
import Document, {Html, Head, Main, NextScript} from 'next/document';

export default class MyDocument extends Document{
    static async getInitialProps(ctx){
        const initialProps = await Document.getInitialProps(ctx);
        return {
            ...initialProps
        };
    }

    render(){
        <Html>
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    }
}
```
이것이 .document.js의 기본 꼴이다. _app.js가 document로 감싸지면서 Html Head body등 모두 수정 가능하다. getInitialProps은 _app.js 또는 .document.js에서만 사용하는 특수한 서버 사이드 렌더링 메소드이다.

<br />

![](/images/41ddcf28-34e0-433e-be3d-53aa47acfec6-image.png)

babel-polyfill 패키지 쓰기에는 너무 무거우므로, 사이트들어가서 사용에 맞게 체크박스 선택후 URL을 복사하자.(최신 함수 등을 사용하기 위함)

```js
//pages/.document.js
import React from 'react';
import Document, {Html, Head, Main, NextScript} from 'next/document';
import {ServerStyleSheet} from 'styled-components';

export default class MyDocument extends Document{
    static async getInitialProps(ctx){
        const sheet = new ServerStyleSheet();
        const originalRenderPage = ctx.renderPage;
        
        try{
            ctx.renderPage = () => originalRenderPage({
                enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />)
            });
            const initialProps = await Document.getInitialProps(ctx);
            return {
                ...initialProps,
                styles: (
                    <>
                        {initialProps.styles}
                        {sheet.getStyleElement()}
                    </>
                )
            };
        } catch(error){
            console.error(error)
        } finally{
            sheet.seal();
        }

    }

    render(){
        <Html>
            <Head />
            <body>
                <script src="https://polyfill.io/v3/polyfill.min.js?features=default%2Ces2015%2Ces2016%2Ces2017%2Ces2018%2Ces2019"/>
                <Main />
                <NextScript />
            </body>
        </Html>
    }
}
```
원래 document 기능 앱에다가 styled-components를 서버사이드랜더링가능하게 해주었다.

<br />

_document와 _app 은 [chamming2](https://merrily-code.tistory.com/154) 블로그를 참고하여 사용법을 다시한번 확인하였다.

<br /><br /><br /><br /><br /><br /><br />
zerocho