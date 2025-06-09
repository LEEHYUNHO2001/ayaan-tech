---
title: "Babel 개념과 Webpack에서 사용"
description: "babel은 javascript로 결과물을 만들어주는 컴파일러이다."
date: 2021-08-09T10:41:00.992Z
tags: ["React"]
---
> ## Babel이란??
JavaScript compiler

<img src="https://miro.medium.com/max/1400/1*NAWXthxz56l_hxBU1Or--Q.png" />

* babel은 javascript로 결과물을 만들어주는 컴파일러이다.

* 2015년 발표된 ES6이후의 버전(ESNext)의 새로운 문법을 기존 브라우저에서 사용하기 위해서는 babel을 사용해아 한다.

* babel을 이용하여 JSX(React), 정적타입언어(TypeScript), 코드압축, 제안 단계(proposal) 문법 등을 사용할 수 있다.



<br />

> ## 설치

```
npm i -D @babel/core
npm i -D @babel/cli
npm i -D @babel/preset-env 
npm i -D @babel/preset-react
```

**@babel/core** : babel의 핵심 기능이 있는 필수 패키지

**@babel/cli** : 터미널에서 babel 명령어를 사용할 수 있게 도와줌

**@babel/preset-env** : 코드 구문 변환 설정을 도와줌(지원 브라우저 점유율, 호환성 설정 등)

**@babel/preset-react** : JSX파일을 컴파일 하기 위한 react preset

<br />

```
npm i -D webpack webpack-cli webpack-dev-server
npm i -D babel-loader css-loader file-loader
npm i -D html-webpack-plugin mini-css-extract-plugin
npm i -D sass sass-loader
```
webpack과 사용할 경우

**webpack**: 웹팩 모듈

**webpack-cli**: 터미널에서 웹팩 명령어를 사용할 수 있게 도와줌

**webpack-dev-server**: nodemon과 같이 웹팩 환경에서 개발서버를 생성

**babel-loader**: 웹팩과 바벨을 연동

**css-loader**: 웹팩이 css파일을 읽을 수 있도록 도와줌

**file-loader**: 웹팩이 파일을 로딩할 수 있도록 도와줌 (이미지를 로딩하는데 사용)

**html-webpack-plugin**: 번들링된 html파일에 css와 js파일들을 추가해줌

**mini-css-extract-plugin**: style-loader를 대체하며 html내의 style태그 대신 별도의 css파일로 생성해줌

**sass-loader**: 웹팩이 sass파일을 읽을 수 있도록 도와줌

이 외에도 여러가지를 설치하여 사용할 수 있다.

<br /><br />

> ## webpack 설정

babel은 실행하는 방법이 여러가지있다.
예를들어 @babel/cli로 실행하거나 @babel/core를 직접 실행할수도있고, @babel/register로 실행할 수 있다. 우리는 **webpack**에서 **babel-loader**로 실행하는 방법을 알아보자.

```js
const path = require('path');
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

module.exports = {
    name: 'word-relay-setting',
    mode: 'development',  //실서비스 : production
    devtool: 'eval',
    resolve:{
        extensions:['.js', '.jsx', '.css']
    },
    entry: {
        app:['./client'],
    },
    module: {
        rules:[{
            test:/\.jsx?$/,
            loader:'babel-loader',
            options:{
                presets:[
                    ['@babel/preset-env', {
                        targets:{
                            browsers:['> 1% in KR'],
                        },
                        debug: true,
                    }],
                     '@babel/preset-react'],
                plugins:[
                    //babel이 최신문법을 옛날것으로 바꿀때, 핫 리로딩까지 추가.
                    'react-refresh/babel',
            ],
            },
        }],
    },

    plugins:[
        new RefreshWebpackPlugin(),
    ],

    //출력
    output:{
        //현재 폴터와 dist 경로 합쳐줌.
        path:path.join(__dirname, 'dist'),
        filename:'app.js',
        publicPath:'/dist/',
    },

    //서버설정
    devServer:{
        publicPath:'/dist/',
        hot: true,
    },
};
```

path는 node.js의 핵심 모듈이며, 경로 관련해서 다양한 기능을 제공한다.

현재 목표는 client.jsx와 wordrelay.jsx를 합쳐서 app.js에서 실행하는것이다.

1. **entry는 번들링할 모듈의 진입점** 되는 파일이다. 현재 client.jsx에서 	wordrelay를 불러오고있다. 그래서 entry의 app에는 client만 넣어주면 된다.

2. **module은 entry파일 읽고 모듈을 적용해서 output**에 준다. module의 rules에는 배열형태로 되어있다. **test에는 정규표현식으로 대상이 되는 파일의 형식을 지정**한다. **loader**는 babel 룰을 적용하는것인데, 대상파일에 적용할 **loader를 적용**한다. 
**options**에서는 **bable의 옵션**을 설정할 수 있다. presets은 수많은 플러그인을 뭉쳐논것인데, @babel/preset-env와 @babel/preset-react을 사용하고있다.

3. **output은 번들링 후 출력할 파일의 경로와 파일이름을 지정**하면 된다.

<br /><br />

> ## Babel-polyfill

<img src="https://blog.kakaocdn.net/dn/BLg1R/btqZqo95DUR/m5en8DS594dVdbdATMarc0/img.png" />

* poliyfill은 브라우저에서 지원하지 않는 기능들에 대한 호환성 작업을 채워넣는것을 의미한다.

* bable은 문법을 변환해주는 역할만 수행한다.

* 최신 함수를 사용하기 위해서는 babel-polyfill를 사용해야한다.

즉, babel은 컴파일시 실행되고 babel-polyfill은 런타임(브라우저에서 실행)에 실행된다. 런타임에 필요한 기능을 추가하는것이다.

```js
['@babel/preset-env', 
 {
   targets:{
     //한국에서 점유율 5%이상인 브라우저 지원
     //'last 5 chrome versions' -> 크롬 최신에서 5버전 전까지만 지원
     browsers:['> 1% in KR'],
   },
   debug: true,
 }],
```
위에서 보았던 코드에서 이 부분이 **polyfill을 추가**한 부분이다.
@babel/preset-env는 적당한 번들파일 크기를 유지해주면서 폴리필을 하나씩 추가하는 부담을 줄여준다. -> [targets 작성문법](https://github.com/browserslist/browserslist#full-list)

<br /><br /><br /><br /><br /><br />

[chanyeong](https://chanyeong.com/blog/post/27)

