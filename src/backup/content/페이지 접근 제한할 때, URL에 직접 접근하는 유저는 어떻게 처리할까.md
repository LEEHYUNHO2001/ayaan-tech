---
title: "페이지 접근 제한할 때, URL에 직접 접근하는 유저는 어떻게 처리할까?"
description: "Custom Hook을 생성하여 사용 vs getServerSideProps(SSR)를 이용하는 방법"
date: 2022-08-01T00:49:12.748Z
tags: ["JavaScript","React","next","typescript"]
---
# 접근 제한

우리는 웹 프로젝트를 설계하면서 다양한 방식으로 페이지에 대한 접근 제한을 구현한다. 예를 들면, 쇼핑몰같은 이커머스에서는 보통 로그인을 한 유저만 장바구니 페이지에 들어갈 수 있다. 로그인한 경우에만 장바구니UI를 출력할 수도 있지만, 로그인하지 않은 유저가 장바구니UI를 클릭하면 alert나 모달로 "로그인 하세요" 라는 메세지를 띄어줄 수도 있을 것이다.

undefined

또 다른 상황으로는 유료 회원만 접근할 수 있는 페이지, 구매한 유저만 사용 가능한 파일 다운로드 버튼, 회원 등급에 따른 서비스 등 여러가지 상황에서 접근 제한 기능을 구현할 것이다. 오늘 다룰 내용은 **로그인 유저를 위한 페이지에 URL을 통해 직접 접근하는 비로그인 유저**를 접근 제한하기 이다. 

<br>

![](/images/791f2e3a-9607-4be7-81c9-4def2203c004-image.png)

이 주제를 다루며 Next에서 사용되는 4개의 pre-rendering Data Fetching에 대해서도 알아볼 것이다.

<br>

## URL에 직접 접근하는 비로그인 유저 제한

로그인 한 유저만 입장 가능한 `/game` 페이지가 있다고 가정하자. 물론 뒤에 유저의 uuid값을 `/game/sdfasefa1212e1` 처럼 붙일 수도 있다. 하지만 다른 비로그인 유저가 저 URL로 접근한다면 어떻게 막아야 할까?

유저가 UI를 통해 페이지에 들어가는 것이 아니여서 `onClick` 같은 곳에 접근 제한을 할 수 없다. 이 경우에는 페이지에 들어왔을 때, 로그인 정보를 가지고 있지 않은 유저라면 접근을 제한해야 한다.

<br>

### 로그인

로그인을 성공한 유저는 다른 페이지로 이동해도 계속 로그인이 유지 되어야 한다. 로그인에 성공한 유저가 장바구니 페이지에 들어갔는데, 또 로그인을 해야하면 불편하기 때문이다. 이런 로그인 인증(Authentication)과 인가(Authorization) 방식에는 여러가지가 있다. 

undefined

쿠키, 세션, JWT이 각각 어떤 장단점을 갖고 있는지에 대한 설명은 오늘 글의 본질을 흐리지 않기 위해 생략하겠다. 먼저 아무런 이메일을과 패스워드를 입력해도 로그인되고, 쿠키에 이메일 값이 저장되도록 설계해보자.

<br>

```bash
yarn add react-cookie universal-cookie
```

쿠키를 Next.js에서 편리하게 사용하기 위해 설치하자.

<br>

#### 쿠키 사용을 위한 함수

```jsx
// utils/cookie.ts

import { Cookies } from 'react-cookie';
import { CookieGetOptions, CookieSetOptions } from 'universal-cookie';

const index = new Cookies();

export const setCookie = (name: string, value: string, options?: CookieSetOptions) =>
  index.set(name, value, options);
export const getCookie = (name: string, options?: CookieGetOptions) => index.get(name, options);
export const removeCookie = (name: string) => index.remove(name);
```

이와 같이 함수들을 미리 구현해두면 쿠키를 저장할 때는 setCookie, 값을 가져올 때는 getCookie, 쿠키를 제거할 때는 removeCookie를 쉽게 사용할 수 있다.

<br>

#### 로그인 성공시 쿠키 생성

```jsx
// utils/setLoginDataToCookie.ts

  const setLoginDataToCookie = (email: string) => {
    const expires = new Date();
    expires.setHours(expires.getHours() + 20);
    setCookie("login", email, {
      path: '/',
      secure: true,
      sameSite: 'strict',
      expires,
    });
  };
```

로그인 데이터를 입력하고, 로그인 버튼을 누를 경우 `setLoginDataToCookie`함수가 실행된다. 유효기간은 20시간으로 두었고, 쿠키에 email 정보도 같이 넣었다. `sameSite: 'strict'`은 다른 곳에 쿠키 공유가 불가능하도록 설정해준 것이다. 이제 우리는 로그인 성공시 `login`이라는 이름의 쿠키가 생성되는 것을 볼 수 있다.

<br>

### Custom Hook으로 접근 제한

이제 로그인이 성공하면 `login`이라는 이름의 쿠키가 생성되므로, `/game` 페이지에 유저가 입장하면 해당 쿠키가 있는지 검사하면 된다. 원래는 보안적으로 더 훌륭한 방법들을 사용하지만 여기서는 login이라는 쿠키가 있는지만 검사할 것이다.

<br>

#### Custom Hooks

```jsx
export const useAuth = () => {
  const router = useRouter();
  const isLogin = getCookie('login');


  useEffect(() => {
    if (!isLogin) {
      router.push('/');
    }
  }, [expiredAt]);
  return expiredAt;
};
```

먼저 생각한 방법은 커스텀 훅이다. 로그인을 성공한 유저라면 `isLogin`에 값이 들어있을 것이다. `/game` 페이지에서 `isLogin` 값이 존재하지 않는다면 홈(`/`)으로 redirect 시켜버린다.

undefined

이제 접근 제한하고 싶은 페이지에서 이 Hook을 사용해주기만 하면 된다. 유용하게 사용할 수 있는 훅이지만 나의 경우 한 가지 아쉬운 점이 있었다. `/game` 페이지의 UI가 아주 잠깐 보였다가 홈으로 redirect되는 것이다. 

쿠키를 가져오기 전에 `/game` UI를 뿌려주고, 쿠키를 가져오자마자 `router.push('/')`가 실행되어 redirect하는 것이다.

<br>

### Next의 장점을 이용한 접근 제한

Next는 React와 다르게 [pre-rendering](https://velog.io/@leehyunho2001/Hydrate)을 한다. 프리 랜더링 하는 두가지 방식(SSG, SSR)을 위한 `getInitialProps`, `getStaticProps`, `getStaticPaths`, `getServerSideProps` 메소드들이 존재한다. 사실 여기부터 이 글의 본론이라고 할 수 있다.

어떻게 URL 직접 접근을 막았는지만 궁금한 사람들은 아래 내용은 생략하고 **getServerSideProps으로 URL 직접 접근 제어** 부분만 보는 것을 추천한다.

<br>

#### getInitialProps

```jsx
// _app.tsx (망상편)

App.getInitialProps = (context: NextPageContext) => {
  const { pathname } = context;
  if(쿠키없음){
    if(pathname === '/game1'){
         홈으로 보내기
       } else if(pathname === '/game2') {
         홈으로 보내기
       }
    //...
  }

  return {};
};
```

나의 망상은 이랬다. `_app.tsx` 에서 `getInitialProps`을 사용함으로써 `getInitialProps`을 사용할 필요 없이 접근 제한을 컨트롤 하는 것이었다. 로그인 정보가 포함된 쿠키가 없는데, `/game1`이나 `/game2` 페이지로 넘어갈 경우 홈으로 redirect하는 것이다. 하지만 `/game1` 페이지에 들어간다고해서 `pathname`이 `/game1`이 되는 것이 아니라 undefined가 나타났다. 그래서 `_app.tsx`가 아닌 `game.tsx`에서 위와 같은 코드를 작성했더니 `pathname`이 내가 원하던 대로 잘 찍혔다.

`getInitialProps`에는 재밌는 사실이 있다. 한 페이지에 하나의 `getInitialProps`만 실행된다는 것이다. `_app.tsx`에서 사용하면 그 하위에 오는 페이지들에서는 사용할 수 없다는 것이다. 그래도 이 문제점을 해결할 수 있는 방법도 있긴하다. [참고 Velog](https://velog.io/@cyranocoding/Next-js-%EA%B5%AC%EB%8F%99%EB%B0%A9%EC%8B%9D-%EA%B3%BC-getInitialProps)

<br>

![](/images/5eb40a4d-ec1e-4c2a-a897-b3a7746fa636-image.png)

그러나 **Next 9.3 이후부터 getInitialProps는 권장하지 않는다**고 한다. 그래서 내가 선택한 방법은 `getServerSideProps`이다.

사실 `getServerSideProps`을 사용하기 전에 `getStaticProps`, `getStaticPaths`도 생각했었다. 하지만 [Next.js GitHub Discussions](https://github.com/vercel/next.js/discussions/11734#discussioncomment-3993)을 보면, **이 두개의 메소드에서는 쿠키를 얻을 수 없다**고 한다. 그래도 이 두 메소드도 알아보자!

<br>

#### getStaticProps

```jsx
export const getStaticProps: GetStaticProps = async (context) => {
    const res = await axios(캐릭터/1 정보 있는 엔드포인트);
    return {
        props: {
            data: res,
        },
    }
}
```

`getStaticProps`은 빌드시에 데이터를 패치한다. 만화 futurama에서 [Philip Jay Fry](https://futurama-eta.vercel.app/characters/1)라는 캐릭터의 설명이 있는 페이지를 확인해보자. 링크를 타고 들어가 보면 `characters/1`라는 엔드포인트를 확인할 수 있고, 목적에 맞는 페이지가 출력되는 것을 볼 수 있다. CSR을 이용하여 데이터를 가져와 UI를 출력할 수도 있지만, Next의 UX개선과 SEO 장점을 살리고 싶다면 `getStaticProps`를 사용하자. 이와 같이 페이지의 콘텐츠가 외부 데이터를 이용하여 만들어질 경우 사용하면 된다.

(엄밀하게 말하면 캐릭터 하나에 대한 설명이므로 엔드포인트가 `s`가 빠진 `character/1`이여야 하는데 과거의 나는 그것 까지 생각하지 못했나 보다.)

<br>

#### getStaticPaths

```jsx
// characters/[id].tsx (동적 라우팅 페이지)

    <Section>
      <H2>Character Detail</H2>
      <img src={images.main} alt="캐릭터" />
      <TextContainer>
        <p>
          <strong>Name :</strong> {name.first} {name.middle} {name.last}
        </p>
        <p>
          <strong>age :</strong> {age}
        </p>
        //...
      </TextContainer>
    </Section>
```

만약 동적 라우팅으로 페이지를 구현했다면 어떻게 해야할까? 그 전에 동적 라우팅이 무엇인지 간략하게 알아보자. Futurama 만화에는 다양한 캐릭터들이 존재한다. 그렇다면 캐릭터 수만큼 캐릭터를 설명하는 페이지가 존재해야 한다. 하지만 캐릭터를 설명하는 UI는 같고 데이터 부분만 다르다. 이 경우에 동적 라우팅을 사용한다.

**동적 라우팅으로 구현된 페이지에서 pre-rendering시 데이터를 가져올 때, `getStaticPaths`와 `getStaticProps` 를 사용**하면 좋다. 단, **요청이 들어와도 데이터의 변화가 없을 경우에 사용**해야 한다.


<br>


```jsx
export const getStaticPaths: GetStaticPaths = async () => {
    const res = await axios(캐릭터들의 정보 있는 엔드포인트);
  	const paths = res.map(character => ({
    	params: {id: character.id}
    }))
    return {
      paths,
      fallback: false,
    }
}
```

캐릭터들의 정보가 있는 엔드포인트에 데이터를 요청하고, `map` 돌리며 `id`만 뽑아 `params`에 넣어준다. 이 `params`는 `getStaticProps` 에서 이용할 것이다. velog는 url에 글 제목이 들어가는데 이 경우에는 `id`가 아닌 `title` 같은 것을 뽑으면 될 것이다.

<br>

undefined

`getStaticPaths` 는 `fallback` 키가 반드시 필요하다. 보통 미리 렌더링할 페이지 또는 업데이트가 적을 경우에 `false`값을 사용한다. 사전에 빌드하지 않은 path에 대해서는 404 페이지를 반환한다.

`fallback`이 `true`인 경우, 사전에 빌드하지 않은 path에 요청이 들어오면 `getStaticProps`를 호출한다. 새로운 페이지가 만들어지면 빌드된 path 리스트에 추가하고, 만들어지는 동안에는 로딩 처리를 해줄 수 있다. 동적 라우팅을 통해 미리 렌더링을 할 페이지가 많은 경우에 사용하면 좋다. 자세한 사용법은 [getStaticPaths 공식 문서](https://nextjs.org/docs/api-reference/data-fetching/get-static-paths)를 확인해보자.

<br>

```jsx
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await axios(`캐릭터 엔드포인트/${params.id}`);
  return {
    props: {
      res,
    }
  }
}
```

`getStaticPaths`에서 생성한 params로 `getStaticProps`에서 데이터를 요청 후 반환하면, 현재 페이지에 맞는 데이터를 UI에 뿌려주기만 하면 완성이다.

물론 CSR에서 useRouter를 통해 path값을 가져와 이에 맞는 데이터를 요청할 수도 있지만, 위에서 언급한바와 같이 UX와 SEO를 고려한 측면에서 이 방법이 더 좋다고 할 수 있다. 

<br>

#### getServerSideProps

이것도 pre-rendering에 사용되는 메소드이다. 빌드시에 데이터를 요청하는 `getStaticProps`와는 다르게 페이지가 요청될 때마다 실행 된다. 

```jsx
export const getStaticProps: GetStaticProps = async () => {
  const random = Math.floor(Math.random() * 3)
  const backgroundArr = ["black", "red", "blue"]
  const res = await axios('원하는 데이터 가져옴')

  return {
    props: {
      res,
      backgroundArr[random],
    },
  }
}
```

예를 들어, 페이지에 입장할 때마다 랜덤으로 배경색이 결정되는 로직이 있다고 가정하자. 컴포넌트에서 이에 맞게 배경색을 변경하하는 코드만 작성되어 있다면, `getServerSideProps`를 사용하는 경우 페이지에 들어갈 때마다 배경색이 변경될 것이다. 하지만 `getStaticProps`은 빌드 시점에만 실행되기 때문에 같은 코드를 작성해 보아도 계속 동일한 배경색을 유지할 것이다. 

SSR에서 사용하는 `getServerSideProps`은 CDN에 캐싱되지 않기 때문에 SSG에 사용되는 `getStaticPaths`와 `getStaticProps`보다는 느리다. 그래도 동적인 무언가가 가능하다. 그래도 꼭 사용해야 하는 경우가 아니면 CSR을 고려하는 것도 좋은 선택일 것이다.

<br>

#### getServerSideProps으로 URL 직접 접근 제어

```jsx
export const getServerSideProps: GetServerSideProps = async context => {
  const {
    req: { cookies },
  } = context;

  const isLogin = cookies['login'];

  if (!isLogin) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: { cookies },
  };
};
```

본론으로 돌아와서 나는 `getServerSideProps`가 꼭 필요했다. 그 이유는 위에서 언급한 것과 같이 이 메소드만 cookie값을 가져올 수 있기 때문이다. `login`이라는 쿠키가 있는지 확인하고, 만약에 없다면 `/`으로 redirect한다. 이 방법을 이용하면 깜빡임이 전혀 없다. `getServerSideProps`는 요청 시 데이터를 가져와야 하는 페이지를 사전 렌더링 해야 하는 경우에 사용하기도 한다.

getInitialProps와 다르게 나머지 3개의 메소드는 `_app.tsx`에서 사용이 불가능 하다는 것도 주의하자. 접근 제한할 페이지마다 이와 같은 로직을 사용해줘야할 것 같다. 

더 좋은 방법이 있다면 공유해주시면 감사하겠습니다!

<br>


```jsx
  if (!isLogin && res) {
    res.writeHead(302, {
      Location: '/',
    });
    res.end();
  }
```

redirect시키는 부분을 이와 같이 사용할 수도 있으나, 공식 문서에서 위의 코드를 추천하고 나의 생각에도 직관적인거 같아서 이 코드로 사용하지는 않았다.

<br>

```
  const cookies1 = req.headers.cookie;
  const cookies2 = req.cookies;
```

쿠키를 얻는데도 2가지 방법이 있었다. cookies1과 같이 가져오면 모든 쿠키가 string형식으로 내려오는 것 같다. 특정 쿠키가 있는지 확인하기 위해서는 cookies2와 같은 방법으로 사용하되 뒤에 키값을 붙이면 될 것 같다.

<br>

## 마무리

URL에 직접 접근하는 유저를 컨트롤하기 위해 Custom Hooks를 만들었다가 깜빡이는 문제점을 발견했다. 그래서 SSG와 SSR을 이용하면 좋겠다는 아이디어가 번뜩 떠올라 시도하며 복습한 이론들을 정리하게 되었다. 막상 정리하다 보니 새로 알게된 사실들도 있고, 여러가지 꿀팁들도 많이 마주쳤던것 같다.