---
title: "Google Analytics를 Production과 Development 에서 따로 사용하기(Next, Vercel)"
description: "구글에서 무료로 제공하고 있는 웹분석 서비스이다. vercel을 이용하여 키 값을 관리하는 방법과 Production, Development 에서 GA를 따로 사용하는 방법을 알아보자."
date: 2022-04-13T07:39:05.556Z
tags: ["React","next"]
---
# Google Analytics란

> 구글에서 무료로 제공하고 있는 웹분석 서비스이다. 웹분석이란 웹사이트 이용 현황을 이해하고 사용자 경험을 최적화하기 위해 웹 데이터를 측정, 수집, 분석 및 보고하는 것이다. 어떤 사용자들이 우리 웹사이트를 방문하는지(잠재고객에 관한 정보), 어떤 경로를 통해서 방문하는지(유입출처에 관한 정보), 웹사이트에 도착한 후 어떤 행동을 보이는지(방문형태에 관한 정보)에 관한 데이터를 분석하여 마케팅 채널별 효과와 방문자의 웹사이트 경험을 개선하고 궁극적으로 비즈니스를 개선하는 데 활용할 수 있다.
[Google Analytics란](https://analyticsmarketing.co.kr/digital-analytics/google-analytics/265/)

<br>

## Google Analytics 사용의 일반적인 경우

```jsx
//.env
NEXT_PUBLIC_GOOGLE_ANALYTICS=<Your_tracking_ID>
```

키 값은 .env 파일에서 관리하도록 하자.

<br>

```jsx
//_app.tsx
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
              page_path: window.location.pathname,
            });
          `,
            }}
          />
```

그 후 최상단에서 Head태그 안에 script를 넣어주면 된다. 이제 적용이 되었을 것이다.

<br>

## Production과 Development 에서 따로 사용

### Vercel cli

```bash
npm i -g vercel
```

.env파일이 아닌 vercel에 키 값을 가지고 있도록 해보자. 먼저 [vercel cli](https://vercel.com/docs/cli)를 설치한다.

<br>

```bash
echo "export PATH=$PATH:$(npm get prefix)/bin" >> ~/.zshrc
source ~/.zshrc
```

vercel 명령어를 찾을 수 없다고 나타나면 위의 명령어를 터미널에 입력하자.

<br>

```bash
vercel env add NEXT_PUBLIC_GOOGLE_ANALYTICS
```

vercel에 env로 NEXT_PUBLIC_GOOGLE_ANALYTICS 라는 것을 추가한다는 의미이다. 이 명령어를 입력하면 키 값을 입력하는 부분이 나타나므로 입력해주자.

![](/images/302e26c1-d375-48f2-a622-9a308cb330e8-image.png)

env를 추가할 곳을 선택하는 부분이 나타나면 원하는곳에 가서 스페이스바 누르고 엔터 누르면 된다. Development에서 하면 여기의 NEXT_PUBLIC_GOOGLE_ANALYTICS값이 추가 되는 것이다.

```bash
vercel env pull .env
```

NEXT_PUBLIC_GOOGLE_ANALYTICS값을 vercel에 등록했지만, 빌드할 경우에 이 값이 필요할 수 있다. 그 경우네는 위의 명령어를 입력하면 vercel에 입력된 값들이 env 파일에 덮어씌워진다.

<br>

### Vercel

![](/images/29a76c8f-5693-4c22-9ad1-867dd44782c9-image.png)

Vercel의 Environment Variables 에서 직접 등록할 수 도 있다. 이렇게 총 2개의 GA(Google Analytics)가 등록된 것을 볼 수 있다.

특정 이벤트 기록이나 페이지뷰 기록 등이 궁금하다면 [Next GA](https://mariestarck.com/add-google-analytics-to-your-next-js-application-in-5-easy-steps/)을 보는 것을 추천한다.