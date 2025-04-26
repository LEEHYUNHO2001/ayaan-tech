---
title: "백엔드님! 저도 개발해야하는데 API 좀... (feat. MSW)"
description: "이제 API 없어서 통신 로직 못짠다고 빌빌대지 말자!!"
date: 2022-08-26T05:53:08.480Z
tags: ["JavaScript","React","next","typescript"]
---
# MSW (Mock Service Worker)

## API가 먼저 짜여져 있다면?

FrontEnd 개발을 하다 보면, 데이터를 기반으로 UI를 그리는 경우가 대부분이다. 채팅방 구현을 하나의 예시로 들어보겠다. 유저가 채팅방에 들어가면 친구와 이전에 나누었던 대화를 볼 수 있는 UI가 필요하다. 즉, 대화 목록들이 보여야 한다. 로그인 된 유저의 정보와 해당 채팅방의 uuid값 같은것을 이용해서 채팅 목록에 대한 데이터를 받아올 것이다. 이 때, FrontEnd 개발자는 `axios`와 같은 HTTP 통신 라이브러리를 사용하여 BackEnd API에`GET`요청을 하게 된다.

<br>

![](/images/e1c6d0a8-4a3f-4e80-a92c-da6c90654e28-image.jpg)

API가 미리 만들어져 있다면 우리는 API Endpoint에 요청을 찔러보며 개발을 시작하면 된다.

<br>

```jsx
{
    id: number;
	user: string;
    text: string;
}
```

명세서도 이미 짜여져 있다면 일사천리이다. 어떤 데이터를 어떻게 활용하여 UI를 구현할 것인지 감이 바로바로 잡히게 된다.

<br>

## API가 절실한 프린이의 목 데이터 생성

하지만 백엔드 개발자와 협업하게 되면 위와 같은 이상적인 상황만 있을 수 없다. 회사 상황에 따라 백엔드 개발자에게 다른 일정이 생길 수 있고, 토이 프로젝트 스터디의 경우 백엔드 개발자의 개발 속도가 느릴 수 있다. 이 경우에 생각할 수 있는 것이 `Mock Data`이다.

<br>

```jsx
// constants/chet.ts

export const chetDatas = [
  {
    id: 0,
    user: "프린이",
    text: "API 개발 언제쯤.."
  }
]
```

많이 사용하는 방법 중 하나가 데이터가 이미 들어왔다고 가정하고, **파일 하나 생성해서 임시로 데이터**를 넣는 것이다. API 명세서가 없다면, 백엔드 개발자와 상의 또는 프론트엔드 개발자 스스로 해당 기능에 필요할 것 같은 데이터들을 생각해서 Mock Data를 만들면 된다. 이 방법으로 인해 우리는 **데이터가 필요한 페이지의 UI를 구현**할 수 있게 되었다.

API가 없어도 UI를 미리 구현해 놓을 수 있어 프론트엔드의 개발 생산성을 증가시키게 되었다. 나중에 백엔드 개발자가 API를 구현하면, API에 데이터를 요청하는 부분과 받은 데이터를 저장하는 코드만 작성하면 프로젝트는 완성될 것이다.

<br>

![](/images/7f5ac5e0-adcd-4ed2-98a8-3a67ffaf534e-image.jpg)

상상해보자. 백엔드 개발자가 _"API를 아직 설계하지 못했어요 ㅠㅠ"_ 라며 미안함을 비출 때, _"괜찮아요. Mock Data로 UI는 이미 다 구현해놓았습니다!"_ 라고 안심시켜주면 뿌듯할 것이다! (~~사실 너무 당연한거라 안 뿌듯~~) 

그러면 여기서 더 생산성을 높일 수는 없을까?

<br>

## MSW로 API 요청 부분까지?!

![](/images/2bd2623d-29d7-4ce6-9147-edaf823b6648-image.png)


여기서 등장하는 것이 [MSW](https://mswjs.io/docs/)이다. 데이터를 요청하는 부분까지 미리 구현하면, API가 완성되었을 경우 연결만 시켜주면 나의 프로젝트가 정상적으로 돌아갈 것이다. 즉, UI뿐만 아니라 비동기 통신 로직까지 미리 구현할 수 있는 것이다.

<br>

![](/images/3fdb107d-8e37-42fc-8aa8-56866c5b3e08-image.jpg)

_"데이터 받아오는 것 쯤이야 API만들어지고 하지 뭐!"_ 라는 생각을 하기에는 비동기 통신에 생각해야 할 점들이 많다. 데이터를 받아오는 fetch 함수 구현, TanStarck Query를 사용하는 경우에는 Custom Hooks 설계, 채팅 입력했을 경우 나의 채팅도 대화 목록에 추가되도록 기능 연결... 3가지만 말했는데 벌써 디렉터리 구성부터 작성할 코드까지 산더미다.

<br>

## 상황 설명충 퇴장. MSW 설명충 등장

```jsx
await axios.get("https://endpoint", ...);
```

MSW는 API가 없어도 프론트엔드에서 HTTP 비동기 통신을 그대로 사용할 수 있게 Mocks Service Worker를 제공한다. 사용법을 알아보기 전에 어떻게 MSW는 이와 같은 일을 할 수 있는지 알아보자. (API를 찌르는 건데 중간에 가로채는 방법이 신기하니까..)

<br>

### MSW의 차별점

MSW 말고도 실제 서버를 대체하는 모킹 서버를 이용할 수도 있다. 하지만 여러가지 버그가 있다고 한다. 

또 다른 방법으로는 네트워크 요청을 가로채기 위해 네이티브 http, https, XMLHttpRequest 모듈을 스텁하는 것이다. 이 방법도 모킹을 하지 않은 실제 환경과 차이를 만들어내기 때문에 E2E테스트에 문제가 생길 수 있다.

MSW는 위의 두 방법을 사용하지 않는다. 그리고 다른 모킹 라이브러리와 달리 애플리케이션 레벨이 아닌 네트워크 레벨에서 Request를 가로채서 응답을 보내기 때문에 별도의 설정 없이도 axios, TanStack Query등 모든 종류의 네트워크 요청 라이브러리와 네이티브 fetch API를 사용할 수 있다는 장점이 있다.

<br>

### MSW와 서비스 워커

> [Service Worker](https://developer.mozilla.org/ko/docs/Web/API/Service_Worker_API) : 서비스 워커는 웹 응용 프로그램, 브라우저, 그리고 (사용 가능한 경우) 네트워크 사이의 프록시 서버 역할을 합니다. 서비스 워커의 개발 의도는 여러가지가 있지만, 그 중에서도 효과적인 오프라인 경험을 생성하고, 네트워크 요청을 가로채서 네트워크 사용 가능 여부에 따라 적절한 행동을 취하고, 서버의 자산을 업데이트할 수 있습니다. 또한 푸시 알림과 백그라운드 동기화 API로의 접근도 제공합니다.

MSW는 서비스 워커를 이용하여 API를 모킹하는 라이브러리다. 그런데 **서비스 워커는 브라우저 환경에서만 동작**한다는 문제점이 있다. 일단 개발하는데는 문제가 없다. 하지만 만약 모킹 핸들러를 테스트하고 싶은 경우는 어떨까? 

다행히 MSW는 node-request-interceptor로 네이티브 http, https, XMLHttpRequest 모듈을 확장(extending)하여 **노드 환경을 지원**한다. 테스트가 가능하고, 노드 환경을 위한 코드를 따로 작성할 필요가 없다.

<br>

### MSW 동작 원리

![](/images/a5439620-9a71-4ed6-a890-8b420e084c79-image.png)

1. 브라우저에서 fetch를 하면 request가 발생한다. 서비스 워커는 이 request를 감지한다.
2. 해당 request는 실제 서버가 아닌 MSW에 보낸다.
3. MSW는 개발자가 설계한 handlers대로 response를 만든다.
4. MSW가 생성한 response를 서비스 워커로 보낸다.
5. 서비스 워커는 브라우저에 response를 보내며 동작이 완료된다.

<br>

![](/images/61bd0b30-9c5d-47e0-9e91-b09debdcc81d-image.jpg)

MSW의 장점과 여러가지 개념들을 살펴보니 동작하는 원리가 어렵게 느껴지지 않는다! "마지막으로 설명 하나만 더.." 하지 않고, 사용법으로 넘어가겠다.

<br>

## 이제 진짜 MSW 사용해보기

### Fetch 함수

```jsx
// utils/fetchUser.tsx
  const FetchUser = async (email: string) => {
    try {
      const res = await axios({
        method: 'get' as Method,
        url: 'https://example.com',
        params: {
          id: email,
        },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };
```

우리는 HTTP 비동기 통신을 하기 위해 fetch를 수행하는 함수를 먼저 하나 만들어줘야 한다. msw를 사용할 것이므로 url은 아무거나 편한걸로 정해주면 된다.

이 패치함수는 특정 id값을 가진 유저의 이메일 정보를 얻을 수 있다.

### Handlers

<br>

```jsx
// mocks/handlers.ts

import { rest } from 'msw';

export const handlers = [
  rest.get('https://example.com', (req, res, ctx) => {
    const email = req.url.searchParams.get('email');
    const users = [
      {
        email: 'user1@velog.com',
      },
      {
        email: 'user2@velog.com',
      },
    ];

    const user = users.filter(data => data.email === email)[0];

    return res(ctx.json(product));
  }),
];
```

이제 msw에서 제공하는 rest메소드를 사용해서 해당 Endpoint에 API가 존재하는 것 처럼 할 수 있다. rest 들이 모인, 즉 가짜 API들이 모인 곳이 handlers이다.

<br>

### browser 그리고 server파일

```jsx
// mocks/brower.ts

import { setupWorker, SetupWorkerApi } from 'msw';

import { handlers } from './handlers';

export const worker: SetupWorkerApi = setupWorker(...handlers);


// mocks/server.ts

import { setupServer, SetupServerApi } from 'msw/node';

import { handlers } from './handlers';

export const server: SetupServerApi = setupServer(...handlers);

```
browser.ts는 msw에서 제공하는 서비스워커를 가져와서 handlers를 인자로 넘겨준다.

server.ts는 서비스워커가 없는 노드 환경에서도 동작할 수 있도록 도와준다.

<br>

### mocks의 index

```jsx
//mocks/index.ts

if (typeof window === 'undefined') {
  const server = import('./server');
  server.then(s => s.server.listen({ onUnhandledRequest: 'bypass' }));
} else {
  const worker = import('./browser');
  worker.then(w => w.worker.start({ onUnhandledRequest: 'bypass' }));
}

export {};
```

node환경에서 실행하는지 웹 브라우저 환경에서 실행하는지 확인하는 과정을 mocks의 index.ts에서 수행한다.

<br>

### _app.tsx 설정

```jsx
//_app.tsx

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  import('@/mocks');
}

const MyApp = ({ Component, pageProps }: AppProps) => (
  //...
);
```

마지막으로 _app.tsx에서 환경 변수를 이용하여 이 값에 따라 msw의 사용 여부를 결정한다.

```
//.env

NEXT_PUBLIC_API_MOCKING=enabled
```

환경 변수도 추가해주면 끝이다.

<br>

### 에러

이제 실제로 동작시켜보면 잘 될 것이다. 하지만 만약에 오류가 나타났다면 아래의 방법을 사용해보자.

<br>

> handlers is not iterable

handlers가 이터러블 하지 않다는 에러로 1시간 넘게 해맸다. msw를 지웠다 다시 깔아보고, 모듈이 꼬였나 싶어 모듈 전체 지웠다가 설치해봐도 에러는 그대로였다. 

원인은 허무하게도 빌드가 꼬인 거였다. `.next` 파일을 지우고 다시 실행시켜보자. **나와 같은 에러 이외에도 뭔가 계속 에러가나서 실행이 안된다면 빌드 파일을 삭제해보기를 추천**한다.

<br>

## 더 나아가

msw는 REST API 뿐만 아니라 GraphQL도 지원한다. 우리가 처음에 했던 fetch 함수를 만들었던 것 처럼 GraphQL에서도 query나 mutation을 먼저 만들고, msw에서 제공하는 `graphql` 메소드를 사용하면 된다. GraphQL을 사용해봤다면, [공식 문서](https://mswjs.io/docs/api/graphql)도 쉽게 이해갈 것이다!

<br>

![](/images/4054d38e-7b78-40d1-9708-d9d51e92d142-image.jpg)


이렇게 우리는 msw까지 사용해서 프론트엔드 개발 생산성을 늘렸다. url의 `https://example.com`만 나중에 배포된 백엔드의 Endpoint로 설정해준다면 모든 기능은 정상적으로 동작할 것이다..!!