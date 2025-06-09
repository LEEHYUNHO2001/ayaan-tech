---
title: "Hydrate(Next, React 18)"
description: "CSR과 SS에 대해 알아보고 Hydrate에 대한 개념을 살펴보자. 그리고 React 18에서 추가된 Suspense의 강력한 기능과 Hydrate를 알아보자."
date: 2022-04-04T08:27:38.579Z
tags: ["React","React18","next"]
---
## CSR과 SSR

Hydrate를 이해하기 위해서는 CSR과 SSR에 대한 지식이 있어야한다. 간단하게 알아보자.

<br>

### CSR (Client Side Rendering)

![](/images/eee60c9d-c0e5-43da-9ce0-a39b150e9329-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-03-30%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%204.50.26.png)

렌더링이 클라이언트에서 일어나는 방법으로 **React와 같은 SPA**에서 사용한다. 서버는 요청을 받으면 빈 HTML과 JS를 클라이언트에 넘겨주고, 클라이언트는 이를 바탕으로 렌더링을 한다. 처음에 빈 HTML파일을 받기 때문에 SEO에 적합하지 않고, HTML CSS 스크립트를 한 번에 불러와 첫 로딩 속도가 느려 유저는 빈 화면을 긴 시간동안 봐야하는 단점이 있다. 첫 로딩 이후에 발생하는 페이지 이동에 대해서는 로딩이 짧고, 서버에는 부하가 없다는 장점이 있다. 어드민 페이지의 경우 SEO를 고려할 필요 없으니 CSR으로 설계해도 좋을 것 같다.

<br>

### SSR (Server Side Rendering)

![](/images/210f23c8-4993-44be-81ca-5636de244f2b-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-03-30%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%204.50.11.png)

렌더링이 서버에서 일어나는 방법으로 React에서는 **Next.js**를 사용함으로써 쉽게 설계할 수 있다. 서버는 완성된 HTML을 클라이언트에게 전송하고, 유저는 빈 화면이 아닌 UI컨텐츠를 볼 수 있다. 하지만 사용자 조작은 할 수 없는 상태인데, 버튼 클릭 등의 조작했다면 동작을 기억해두었다가 JS까지 컴파일 되면 기억하고 있던 사용자 조작이 실행된다. 이후에 페이지 이동할 경우에도 서버에 요청을하기 때문에 CSR보다 로딩 속도가 느릴 수 있다.

<br>

## Hydrate

### 개념

> [참고한 자료](https://helloinyong.tistory.com/315#:~:text=Next.js%EC%9D%98%20%EC%9B%B9%20%ED%8E%98%EC%9D%B4%EC%A7%80,%EB%A5%BC%20%ED%81%B4%EB%9D%BC%EC%9D%B4%EC%96%B8%ED%8A%B8%EC%97%90%EA%B2%8C%20%EC%A0%84%EC%86%A1%ED%95%9C%EB%8B%A4)

Hydrate는 SSR에서 사용되는 개념이다. SSR의 경우 pre-rendering를 통해 완성된 HTML을 클라이언트에게 전달한다고 언급했다. 이렇게 **서버에서 렌더링된 정적 페이지**를 클라이언트에게 보내고, **react는 번들링된 JavaScript 코드를 클라이언트에게 보낸다.** 클라이언트는 전달받은 **HTML과 JS코드를 매칭하는 Hydrate를 수행**한다. Hydrate란 전송받은 JavaScript들이 이전에 보내진 HTML DOM 요소 위에서 **한번 더 렌더링** 하게 되면서 각각 자기 자리를 찾아가며 매칭되는 것이다. Hydrate 후에는 클릭과 같은 이벤트나 모듈들이 적용되어 사용자 조작이 가능해진다.

즉, Hydrate는 클라이언트 측 JavaScript가 정적 호스팅 또는 서버 측 렌더링을 통해 전달되는 정적 HTML 요소에 이벤트 핸들러를 첨부하여 동적 웹 페이지로 변환하는 기술이다.

SSR 덕분에 사용자는 UI를 먼저 볼 수 있고, Hydrate 덕분에 JS코드가 매칭되어 추후에 사용자 조작이 가능한 것이다.

#### 여기서 잠깐!! TTV와 TTI에 대해 알아보자!!

![](/images/84518e76-d5bd-4ecd-8501-e11a0c27ee61-image.png)


**TTV(Time To View)는 사용자가 브라우저의 내용을 볼 수 있는 시점이다.** 그리고 TTI(Time To Interact)는 사용자가 브라우저를 인터랙션 할 수 있는 시점이다. 우리는 이미 이 두가지를 Hydrate를 이해하면서 배웠다. **Next.js는 SSR이므로 pre-render가 되면 TTV가 가능해지고, Hydrate가 끝나면 TTI가 가능**하다. 하지만 **React(CSR)의 경우 HTML로딩과 JS로딩이 끝나야 UI가 나타나므로 TTV, TTI는 모두 완료되어야 가능**한 것이다.

<br>

### React의 Hydrate

Hydrate는 Next.js에서만 사용하는것은 아니다. React를 보면 render 함수 외에도 hydtate가 있다.

```jsx
const element = <h1>Hello!</h1>;
ReactDOM.render(element, container, [callback])
```

element : 화면에 그려질 react의 element
container : 리엑트 element를 container DOM에 연결
callback : 렌더링 후에 반환되는 값을 돌려주는 콜백함수

즉, ReactDOM.render는 두번째 파라미터인 지정된 DOM 요소에 하위로 주입하여 렌더링한다.

<br>

```jsx
const element = <h1>Hello!</h1>;
ReactDOM.hydrate(element, container, [callback])
```

렌더링을 통해 새로운 웹페이지를 구성하지 않고, 기존 DOM Tree에서 해당되는 DOM 요소를 찾아 정해진 자바스크립트 속성들만 적용시키는 Hydrate를 수행한다.

<br>

## React 18

### SSR과 Hydrate 문제점

우리는 CSR, SSR, Hydrate에 대해 알아보았다. SSR은 SEO에 좋고 유저에게 처음에 빈 화면이 아닌 껍데기(?)를 보여주며 사용자 경험을 좋게 만들 수 있다. 그리고 Hydrate를 이용하여 껍데기에 JavaScript로 이벤트 헨들러를 붙여 동적으로 동작할 수 있게한다.

2번 렌더링 하는것이 비효율적으로 보일 수 있다. 하지만 **JavaScript가 빠진 UI를 유저에게 빠르게 로딩시켜주는 장점이 있고, 2번째 렌더에서는 Hydrate만 수행하고 UI Paint는 하지 않기** 때문에 SSR이 매우 좋아보인다.

> [내용 참고](https://immigration9.github.io/react/2021/06/13/new-suspense-ssr-architecture.html)


하지만 자세하게 들어가면 SSR과 Hydrate에도 문제점이 있다. 

**1. 보여주기 전에 서버에 다 가져와야 하는 문제***
API에서 데이터를 받아 UI를 설계한 부분인 Main Page의 댓글을 사용자에게 빠르게 보여주고 싶다. CSR은 JavaScript가 완벽히 불러와지기 전까지 빈 화면을 보여주기 때문에 SSR을 해야한다. 이 경우 **HTML에 렌더할 때 서버상에서 컴포넌트에 필요한 데이터를 모두 다 준비**해놔야 한다. 결국 댓글 위한 데이터를 불러오고 렌더하기 까지 나머지 HTML을 전송하는 것을 지연시키게 된다.

**2. 하이드레이션을 하기 위해서는 모두 불러와야 하는 문제**
Main Page에는 댓글 외에도 네비게이션바, 사이드바 등에 사용된 JavaScript코드가 있을 것이다. **댓글에 대한 코드가 불러와지기 전까지 다른 부분들도 하이드레이션을 할 수 없다.**

**3. 상호작용 하기 전에 모두 하이드레이션을 해야하는 문제**
한 번 하이드레이션이 시작되면 **전체 트리가 완전히 하이드레이션 되기 전까지 유저는 네비게이션 바, 사이드바, 포스팅 본문과 상호작용할 수 없다.** 특히나 네비게이션의 경우 유저가 이 페이지 자체에서 떠나고 싶지만 현재 클라이언트에서 열심히 하이드레이션을 진행하고 있기 때문에 더 이상 보고 싶지 않은 페이지에 남아 있어야 하는 굉장히 안좋은 케이스다.

결국 데이터를 사용한 UI를 SSR로 빨리 보여주면 다른 작업을 지연시켜 UX를 훼손하고, 나중에 보여주면 그것도 시간낭비로 인해 UX를 훼손한다. ~~어쩌라는 건지..~~

<br>

### HTML 스트리밍과 선택적 하이드레이션

![](/images/4fd5a6d1-3abd-47c7-9e30-cd8e147a6c03-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-04-04%20%E1%84%8B%E1%85%A9%E1%84%8C%E1%85%A5%E1%86%AB%2011.15.16.png)

> [사진 출처](https://www.angularminds.com/blog/article/react-version-18-update.html) 

위의 문제점을 해결하기 위해 **React18에서 Suspense**가 업그레이드 되어 나왔다. 

데이터 가져오기 (서버) -> HTML로 렌더링 (서버) -> 코드 불러오기 (클라이언트) -> 하이드레이션 (클라이언트) 과정에서 그 어떤 단계도 이전 단계가 전체 애플리케이션에 대하여 끝나기 전까진 시작되지 못한다. 이것이 위의 3가지 문제점을 유발하는 원인이다. 해결책은 작업을 쪼개 전체 애플리케이션이 아닌 각각의 부분들에 대해 이 단계들을 수행할 수 있게 하는 것이다.

<br>

#### 보여주기 전에 서버에 다 가져와야 하는 문제 해결

```jsx
<Layout>
  <NavBar />
  <Sidebar />
  <RightPane>
    <Post />
    <Suspense fallback={<Spinner />}>
      <Comments />
    </Suspense>
  </RightPane>
</Layout>
```

![](/images/e3c392f6-f73c-43d9-a0a8-b5518d1b8591-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-04-04%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%204.16.16.png)

댓글 부분인 `Comment` 컴포넌트를 `Suspense` 으로 감싸주어 React는 댓글 부분을 기다리지 않고 나머지 페이지에 대해 HTML을 스트리밍 하도록 할 수 있다. `Comments` 컴포넌트 대신 React는 placeholder에 해당하는 `Spinner` 컴포넌트를 보내준다.

<br>

```jsx
<main>
  <nav>
    <!--NavBar -->
    <a href="/">Home</a>
  </nav>
  <aside>
    <!-- Sidebar -->
    <a href="/profile">Profile</a>
  </aside>
  <article>
    <!-- Post -->
    <p>Hello world</p>
  </article>
  <section id="comments-spinner">
    <!-- Spinner -->
    <img width="400" src="spinner.gif" alt="Loading..." />
  </section>
</main>
```

최초의 HTML은 이와 같은 모습이다. `Comment` 컴포넌트에 대한 HTML 코드는 없는 것을 볼 수 있다.

<br>

```jsx
<div hidden id="comments">
  <!-- Comments -->
  <p>First comment</p>
  <p>Second comment</p>
</div>
<script>
  // This implementation is slightly simplified
  document
    .getElementById("sections-spinner")
    .replaceChildren(document.getElementById("comments"));
</script>
```

서버단에서 댓글에 해당되는 데이터가 준비되면, React는 동일한 스트림에 추가되는 HTML과 해당 HTML을 “올바른 장소”에 위치시키기 위한 작은 인라인 `script` 태그를 보내준다.

결과적으로 클라이언트에서 React 자체가 불러와지기도 전에 늦게 도착한 댓글 부분의 HTML이 “들어오게”된다.

![](/images/8861a43a-8057-451b-945a-2a3784a4b236-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-04-04%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%204.30.42.png)

더 이상 모든 HTML을 지연시킬 것인지, 해당 파트를 SSR을 하지 않기로 결정하여 HTML에서 제외할 것인지 선택할 필요가 없다. 이제 하이드레이션 문제점을 해결하면 된다.

<br>

#### 하이드레이션을 하기 위해서는 모두 불러와야 하는 문제 해결

```jsx
import { lazy } from "react";

const Comments = lazy(() => import("./Comments.js"));

// ...

<Suspense fallback={<Spinner />}>
  <Comments />
</Suspense>;
```

댓글 위젯을 위한 JavaScript 코드가 로딩되기 전에, 클라이언트상에서 애플리케이션을 하이드레이션할 수 없는 문제점을 **코드 스플릿팅**으로 해결할 수 있다. 큰 번들 사이즈를 피하기 위해 특정 코드의 부분이 동기적으로 로드될 필요 없다 명시해주는 것이다. 그러면 번들러가 별도의 `script` 태그로 분리해준다.`lazy`를 사용하여 메인 번들에서 분리시킬 수 있다.

![](/images/d46c5619-2921-4436-b48f-38953c072e8b-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-04-04%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%204.48.33.png)

이제 댓글에 해당하는 코드가 아직 불러와지지 않아도 다른 부분들은 먼저 하이드레이션 된다. 그 후 `Comment` 컴포넌트도 하이드레이션이 될 것이다.

<br>

#### HTML이 모두 스트리밍 되기 전에 하이드레이션

![](/images/f411ad2b-0801-4e45-bba8-212506f282f4-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-04-04%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%204.52.18.png)

JavaScript 코드가 전체 HTML 보다도 일찍 불러와져도 하이드레이션을 먼저 수행할 수 있다. 댓글에 대한 UI가 아직 보이지 않아도 다른 부분의 이벤트들을 사용할 수 있는 것이다. (ex: 네비게이션 바의 목록 버튼 등)

댓글에 해당하는 HTML이 불러와지면, 아직 그 부분은 JS가 불러와지지 않았기 때문에 상호작용이 불가능한 상태이고 하이드레이션까지 되면 끝이다.

<br>

#### 상호작용 하기 전에 모두 하이드레이션을 해야하는 문제 해결

이제 모든 컴포넌트가 하이드레이션되기 전 페이지상 상호작용을 할 수 있다.

```jsx
<Layout>
  <NavBar />
  <Suspense fallback={<Spinner />}>
    <Sidebar />
  </Suspense>
  <RightPane>
    <Post />
    <Suspense fallback={<Spinner />}>
      <Comments />
    </Suspense>
  </RightPane>
</Layout>
```

이번에는 `Sidebar`와 `Comments` 를 `Suspense`로 감싸보자.

<br>

![](/images/c39ddaab-6110-4d00-8d73-0f2399dad3b7-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-04-04%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%205.01.51.png)

`NavBar`와 `Post` 컴포넌트는 Hydrate가 되었고, `Sidebar`와 `Comments` 컴포넌트는 HTML 스트리밍만 된 상태라고 가정하자.

이제 사이드바와 댓글 코드를 가지고 있는 번들이 불러와진다. React는 둘 모두를 하이드레이션을 하는데, 트리상에서 더 먼저 발견되는 사이드바 부터 시작한다. 

하지만 이때 유저가 댓글부분을 클릭한다면, React는 해당 클릭을 기록한 후 댓글 항목에 대한 하이드레이션에 우선순위를 부여한다.

![](/images/1aa0c54d-105e-495e-abbd-39c2a8a528ca-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-04-04%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%205.20.55.png)

먼저 수행하려 했던 사이드바의 하이드레이션을 하지 않고, 댓글에 대한 하이드레이션을 한다.

**이제 React는 최대한 빨리 모든 것을 하이드레이션 할 것이고, 유저의 상호작용을 기반으로 화면상에서 가장 급한 부분에 우선순위를 분여할 것이다.**

<br>

### 결론

> React 18은 SSR에 있어 두 개의 주요한 기능들을 제공한다:

HTML 스트리밍은 가장 빠른 시점에서부터 HTML을 생성할 수 있도록 해주고, 추가적인 컨텐츠는 해당 장소에 컨텐츠가 갈 수 있도록 해주는 `<script>` 태그와 함께 스트리밍 형태로 보낼 수 있게 해준다.
선택적 하이드레이션은 애플리케이션의 나머지 HTML과 JavaScript가 완전히 다운로드되기 전에 하이드레이션을 최대한 빨리 시작할 수 있게 해준다. 또한 유저가 상호작용하는 부분에 대한 하이드레이션에 우선순위를 제공하여 마치 즉각적으로 하이드레이션이 이뤄지는 것 같은 착각을 불러일으킨다.
이 기능들은 React의 SSR이 오랜 기간 동안 가지고 있는 세 개의 문제를 해결한다.

서버 상에서 HTML을 보내기 전에 더 이상 모든 데이터가 불러와지기를 기다리지 않아도 된다. 대신, 애플리케이션의 껍데기를 보여줄만큼 준비가 되면 HTML을 보내기 시작하고 나머지 HTML은 준비되었을 때 스트리밍해줄 수 있다.
하이드레이션을 시작하기 위해 모든 JavaScript가 불러와지기를 기다리지 않아도 된다. 대신, 서버 렌더링과 코드 스플리팅을 같이 사용할 수 있다. 서버 HTML은 보존되고, React는 관련 코드가 불러와지면 하이드레이션을 한다.
페이지상의 상호작용을 위해 모든 컴포넌트가 하이드레이션되기를 기다리지 않아도 된다. 대신, 선택적 하이드레이션을 통해 유저가 상호작용하고 있는 컴포넌트에 우선순위를 부여하고 먼저 하이드레이션 해줄 수 있다.
`<Suspense>` 컴포넌트는 이 모든 기능들을 참여시키는 역할을 한다. 개선점들 자체는 React 내부에서 자동으로 이뤄지고 이미 기존에 있는 대부분의 React 코드와 동작할 것이 기대된다. 이것은 로딩 상태를 선언적으로 표현하는 것의 힘을 보여준다. if (isLoading)을 `<Suspense>`로 바꾸는 것은 큰 변화가 아닌 것 같지만, 이 과정은 위 모든 개선점들을 가능하게 해준다.
