---
title: "@next/bundle-analyzer"
description: "빌드된 파일을 트리맵 형식으로 종류와 크기를 한눈에 보여준다."
date: 2021-09-15T02:25:13.166Z
tags: ["React","next"]
---
웹 프로젝트를 완성했다면 배포를 할 것이다. 하지만 우리는 배포하기전에 빌드라는 과정을 거쳐야한다. 먼저 컴파일, 빌드, 배포에 대해서 간략하게 알아보자.

**컴파일**은 사용자가 작성한 코드를 컴퓨터가 이해할 수 있는 언어로 번역하는 일이다. 예를들어 React프로젝트를 시작할때, 코드를 작성하고 실행하는것도 컴파일이다. **빌드**는 컴파일된 코드를 실제 실행할 수 있는 상태로 만드는 일이다. **배포**는 빌드가 완성된 실행 가능한 파일을 사용자가 접근할 수 있는 환경에 배치시키는 일이다.


<br/>

>## bundle-analyzer란??

**bundle-analyzer**는 빌드된 파일을 트리맵 형식으로 종류와 크기를 효과적으로 보여주는 플러그인이다.

next.js에서 제공하는 bundle-analyzer를 사용하면 SSR시에 대한 번들까지 분석해준다.

<br/>


> ~~무지성~~ 빌드

![](/images/d2954df9-a533-403a-99c7-41c24afb8b10-image.png)

프로젝트는 프론트 서버와 백 서버로 나누어져있다. **백 서버를 동작시키고, npm run build 로 빌드**를 해보자. 페이지들의 대략적인 크기를 파악할 수 있다. 하지만 **무엇이 얼마만큼 용량을 차지하는지는 모른다.** 

(참고로 pages에 [404.js, 500.js](https://nextjs.org/docs/advanced-features/custom-error-page#404-page)을 만들어서 커스터마이징도 가능하다.)

<br/>

> 설치

```
npm i @next/bundle-analyzer
npm i cross-env
```
이제 next-bundle-analyzer를 사용하기위해 설치해보자. cross-env는 아래에서 설명하겠다.

<br/>

>## 커스텀 웹팩

bundle-analyzer를 사용하기 위해서는 [Webpack을 커스터마이징](https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config) 해주어야한다. next는 기본적으로 Webpack을 포함하고 있기때문에, React에서 Webpack 설정하듯이 하면 안된다. config를 통해 설정을 바꾸어주자.

프론트 서버 디렉터리에 [next.config.js](https://nextjs.org/docs/api-reference/next.config.js/introduction) 를 생성한다. Webpack 커스터마이징 뿐만 아니라 next설정도 여기서 모두 바꾸어줄 수 있다.

<img src="https://raw.githubusercontent.com/webpack/media/master/logo/logo-on-white-bg.png" />

<br/>

```js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
    compress: true,
    webpack(config, {webpack}){
        const prod = process.env.NODE_ENV === 'production';
        const plugins = [...config.plugins];
        return{
            ...config,
            mode: prod ? 'producton' : 'development',
            devtool: prod ? 'hidden-source-map' : 'eval',
            plugins,
        };
    },
});
```

module.exports는 withBundleAnalyzer로 감싸주었다. 이것은 process.env.ANALYZE === true 되면 실행된다.

Webpack에서 module 를 변경하려면 불변성을 지켜주며 해야한다. immer을 사용해도된다.

> compress'Next.js는 렌더링된 콘텐츠와 정적 파일을 압축하기 위해 gzip 압축을 제공 합니다.'

공식 문서를 보며 compress 설정을 했다. 브라우저는 알아서 gzip을 풀어서 제공하므로 왠만하면 압축해주자. 이 작업으로 인해 용량이 많이 줄어든다.

hidden-source-map 를 추가하지 않으면 배포과정에서 소스코드가 모두 노출되므로 적용해주었다. 

<br/>

>## cross-env

우리는 process.env.ANALYZE를 언제 true로 주어야 하는지 생각해보자. 빌드를 수행할때 적용시키면 된다. 

<img src="https://ww.namu.la/s/5d33900e796bf7549d0382b696d61405773f0521c8b056517a19ce1bedd99598e84808b970c0b3decaaf040b1d0510af4ba5f049c818c84bbed5f7f24fb4a40ef14ddd5b154fb7ad2669c22138c020fb" />

```js
  "scripts": {
    "dev": "next -p 3000",
    "build": "cross-env ANALYZE=true NODE_ENV=production next build"
  },
```

package.json파일에서 build 설정하는곳에 ANALYZE=true와 NODE_ENV=production를 해준다. 사실 이 코드는 윈도우에서는 동작하지 않는다. 그래서 cross-env를 설치해주었고, 위에 추가해준 것이다.

<br/>

>## bundle-analyzer 빌드

이제 드디어 bundle-analyzer 사용할 수 있도록 준비를 마쳤다. 백 서버를 켜준 상태로 다시 npm run build를 해보자.

![](/images/6232da61-867c-4281-a352-e28ee377f136-image.png).next의 analyze 디렉터리에 html파일 두개가 생성되었다.

![](/images/ed841490-8700-4d94-8f0a-1fa8d522aa49-image.png) server.html가 브라우저에서 실행되었다. 어떤식으로 구성되어있는지 확인하고 넘어가자.

![](/images/d04808bb-2728-4060-8e28-439c95221d88-image.png) client.html도 브라우저에서 실행되었다. 클라이언트는 사용자에게 전달되는것이기 때문에 용량이 크면 느려진다. bundle-analyzer으로 한눈에 보면서 용량을 줄여나가자.

용량이 큰것을 어떻게 줄일 수 있을지 고민해봐야 한다. **concatenated**이라고 되어있는것들은 용량을 줄이기 어렵다. 오른쪽의 polyfills.js와 같이 크기가 **큰 박스**로 되어있는것들은 꼭 필요한 것인지, 대체할 수 있는것은 없는지 생각해보면 된다. 

이제 왼쪽 위에 주황색으로 된 부분을 보자. **moment안에 작은 박스**들이 보인다. moment.js는 기본적으로 다국어를 지원하는데 ru.js(러시아어) 등 사용하지 않는 부분은 없애주면 된다. moment locale **tree shaking** 을 검색하면 된다.

![](/images/a521d6cb-97ba-46a3-9042-4e54f111d6d4-image.png)

그러면 위와같이 추천을 많이 받은 해결방법들이 있을것이다.

<br/>

```js
//front/next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
    compress: true,
    webpack(config, {webpack}){
        const prod = process.env.NODE_ENV === 'production';
        const plugins = [
            ...config.plugins,
            new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /^\.\/ko$/),
        ];
        return{
            ...config,
            mode: prod ? 'production' : 'development',
            devtool: prod ? 'hidden-source-map' : 'eval',
            plugins,
        };
    },
});
```
이처럼 해결방법을 찾아 사용해주면 된다. 이제 다시 빌드해보자.

![](/images/f9bb4bfd-e48e-407a-ac64-bba996a13a87-image.png)
moment.js의 locale 부분이 사라졌다. 그리고 박스 크기가 작았던 것들이 상대적으로 커진것을 볼 수 있다.

![](/images/11191a96-2722-4ff3-a4c3-c4438ecd27cc-image.png)

실제 용량도 최적화하기 전보다 줄어들었다.


<br/><br/><br/><br/><br/><br/><br/>

zerocho
