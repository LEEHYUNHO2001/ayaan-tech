---
title: "React와 Next.js의 Cors 에러 해결 (Proxy) "
description: "BackEnd Developer가 설계한 API에 요청을 보내려다 보니 CORS 가 발생했다. React Next 환경에서 Proxy를 이용하여 해결해보자."
date: 2022-04-21T09:33:39.050Z
tags: ["React","next"]
---
## 이슈

BackEnd Developer가 설계한 API에 요청을 보내려다 보니 CORS 가 발생했다. CORS 개념에 대해 부족하다면 [CORS 이란?](https://velog.io/@leehyunho2001/CORS) 글을 먼저 보고오자.

서버 개발자분이 배포된 주소에는 허용을 해주었지만, 내가 개발하는 환경은 `localhost`이므로 당연하게 CORS다. 해결하기 위해서 가장 편한 방법은 서버 개발자가 `access-control-allow-origin` 을 전체 허용해주는 것이다. Open API라면 이렇게 해도 상관 없지만, 회사에서 사용하는것이라 불가능했다.

<br>

### React

```jsx
  // webpack
  devServer: {
  
    ...
    
    proxy: {
      "/api": {
        target: "https://api.sampleapis.com/futurama",
        pathRewrite: {"/api": "/"}, 
      }
    }
  },
```

먼저 웹팩에서 proxy 부분을 추가해준다. 설정은 이렇다.
`/api`로 시작하는 경로는 실제로 `https://api.sampleapis.com/futurama`의 경로라는 것이다. 그리고 pathRewrite를 이용하여 `/api`를 `/`로 바꿔준다.

<br>

```jsx
const res = await axios.get('https://api.sampleapis.com/futurama/info');

const res = await axios.get('/api/info');
```

이제 위의 방법으로 요청하던 코드를 아래로 변경할 수 있다.

<br>

### Next.js


> [Next.js 공식 문서](https://nextjs.org/docs/api-reference/next.config.js/rewrites)

하지만 나는 Next.js를 사용하고 있었으므로 위의 방법으로 해결하지는 않았다.

<br>

```jsx
//next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `API주소/:path*`,
      },
    ];
  },
};

module.exports = nextConfig;

```
먼저 React에서 webpack-dev-server에서 해준것 처럼 비슷하게 설정을 해주면 된다.

<br>

```jsx
    try {
      const res = await axios({
        method: 'patch' as Method,
        url: `/api/coupon/${code}`,
        data: { status: 'USED', selection: checkedItems },
      });
      setQrData(prev => ({
        ...prev,
        status: 'USED',
      }));
      console.log(res);
    } catch (err) {
      console.log(err);
    }
```

그리고 `/api/coupon/${code}` 와 같이 사용해주면된다.
(위의 코드에서는 그냥 url부분만 어떻게 쓰는지 보고 넘어가면 된다.)