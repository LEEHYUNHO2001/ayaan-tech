---
title: "Mandarin-market - 4"
description: "next-auth 를 이용한 커스터 로그인 기능 구현. 쿠키 세션 저장"
date: 2022-02-11T05:22:09.470Z
tags: ["React","next","typescript"]
---
# next-auth

[next-auth 라이브러리](https://next-auth.js.org/getting-started/example)를 사용하여 로그인 기능을 구현해보려고 한다. SNS 로그인(카카오톡, 페이스북 등)을 사용하는 경우에 유용하다고 알고 있다. 

API에 로그인 요청을 보내서 DB에 일치하는 유저가 있다면 user 데이터를 반환되고 있다. 여기서는 SNS 로그인이 아닌 커스텀 로그인에 대해서 다루어보겠다.

<br>

## next-auth 설치

```bash
npm install --save next-auth
npm install -D @types/next-auth
```

next-auth 라이브러리를 설치하고, 타입스크립트에서도 사용 가능하도록 추가로 설치한다. 이제 본격적으로 **next-auth** 라이브러리를 사용해보자.

![](/images/1303d959-6276-48c9-8b01-986260c7a772-image.png)

경로에 맞게 `pages/api/auth/[...nextauth].ts ` 을 생성한다. 디렉터리나 파일명은 변경하지 말자.

<br>

## [...nextauth].ts

```jsx
//pages/api/auth/[...nextauth].ts

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "email-password-credential",
      name: "Credentials",
      credentials: {
        // email: { label: "Email", email: "text", placeholder: "이메일 입력" },
        // password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any, req: any) {
		const {email, password} = credentials;
        const loginDate = {
          user: {
            email: email,
            password: password,
          },
        };
        const res = await axios.post(API_ENDPOINT + "user/login/", loginDate);
        if (res.data.user) {
          const user = {
            name: res.data.user.token,
            email: res.data.user.email,
            image: res.data.user.image,
          };
          return user;
        }
        throw new Error("아이디 혹은 패스워드가 틀립니다.");
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        // token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // session.accessToken = token.accessToken;
      return session;
    },
  },
});
```

**providers**는 이메일 인증 방식에 대한 배열이다. 그 중에 **CredentialsProvider**는 email과 password로 인증하기 위한 것이다. 

**id**는 말 그대로 이 인증의 id값이다. 나중에 로그인 인증하는 Front단에서 `email-password-credential`으로 CredentialsProvider을 불러올 것이다.

**credentials**은 설정하면 nextAuth에서 자동으로 Form을 생성한다. 하지만 나는 이미 만들어놓은 UI가 있기 때문에 사용하지 않는다.

이제 **authorize()**에서 인증을 진행하면 된다. `email, password` 에 input에 입력한 데이터가 잘 들어갈 것이다.(나중에 다른 컴포넌트에서 설명)
이 `email, password` 데이터를 가지고 `aixos`로 API에 로그인 요청을 보낸다. 회원가입된 유저를 모아논 DB에 방금 요청한 유저가 있다면 로그인이 성공하여 res.data.user을 반환하기 때문에, if문을 넣어 성공한 경우에만 `return user` 를 한다.
로그인 실패하면 `throw new Error("아이디 혹은 패스워드가 틀립니다.");` 을 반환할 것이다.

그 후 반환된 user를 이용하여 **jwt()** 에서 **token** 을 생성한다. 여기서 반환하는 token으로는 **session()** 에서 session을 생성한다. 이제 이 session을 return 해주면 세션이 생기는 것이다. jwt에서 token에 새로운 항목을 생성하여 session에 넣을수도 있다. 주석처리된 부분을 해제하면 user에 대한 정보 외에도 accessToken에 대한 정보도 session에 담긴다.

**pages** 는 signIn 함수를 사용할 경우 /login 경로로 이동한다는 의미이다. 이제 Front 코드를 확인해보자.

<br>

## 사전 작업

```jsx
//_app.tsx

import { SessionProvider } from "next-auth/react";

function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
```

애플리케이션의 최상위에서 `SessionProvider`로 감싸주면, 브라우저 탭과 창 간에 세션을 업데이트하고 동기화하도록 관리한다. 그리고 useSession을 어디서든지 사용할 수 있다.

## 로그인

![](/images/12c7162e-919f-4899-9f63-57ea6e6ff1fa-image.png)

최상단 경로에서 이메일 로그인을 클릭하면, email과 password를 입력하는 UI가 나타나야 한다.

```jsx
//components/login/Main.tsx

import { signIn } from "next-auth/react";
<button onClick={() => signIn()}>이메일로 로그인</button>
```

`이메일로 로그인` 을 클릭할 경우 signIn 함수가 실행되고, `[...nextauth].ts`에서 설정해준 `pages`의 `siginIn: /login` 에 따라 login 경로로 간다.

<br>

![](/images/b11c28f2-e0aa-4b83-8996-be6757df9b08-image.png)

/login으로 이동되어 email과 password를 입력하는 UI가 나타났다.

<br>

```jsx
//components/login/Email
  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res: any = await signIn("email-password-credential", {
      email,
      password,
      redirect: false,
      callbackUrl: "http://localhost:3000/home",
    });

    const data = await getSession();
    if (data) await router.push(res.url);
  };
```

email과 password 를 입력하는 input을 감싼 form 태그에 `onChage={login}`을 해주고 있다. 로그인을 클릭했을 때, 로그인 인증을 해주면 된다. signIn 함수를 사용하며 `email-password-credential` 라는 id값으로 구현해놓은 인증 방식을 선택한다. 그리고 email과 password 값을 넘기며 성공할 경우 돌려받을 url 주소를 넣어준다. 로그인이 성공하면 /home로 이동할 것이다.

로그인이 성공하면 `[...nextauth].ts`에서 res.data.user가 생기며 user를 리턴하고 token을 리턴하며 session을 리턴하게 된다. 세션이 생성되는 것이다.

![](/images/322be5f3-7f69-4286-b5d0-4a9d7f161680-g.gif)

로그인이 성공하여 home으로 이동하고있다.

![](/images/4b07c985-9993-44f8-8a60-333e7efba733-image.png)

그리고 **Cookies에 next-auth.session-token이 생성**된다.

<br>

## 세션 데이터 불러오기

```jsx
//index.tsx
import { useSession, signOut } from "next-auth/react";

const HomePage: NextPage = () => {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
      </>
    );
  }
};
```

먼저 페이지에서 위와같이 session에 대한 정보를 가져올 수 있다. 로그인한 상태로 index.tsx가 위치한 url로 가면 로그인한 유저의 이메일이 나타날 것이다. 아직 이것을 사용한 UI는 만들지 않았다.

<br>

```jsx
//components/home/Main
  const [user, setUser] = useState<Session | null>();
  const session = async () => {
    const data = await getSession();
    return data;
  };

  useEffect(() => {
    session().then((data: Session | null) => setUser(data));
  }, []);
```

`getSession` 으로도 저장된 세션의 데이터를 가져올 수 있다.

![](/images/73d9b6aa-1e4f-4db2-814d-fab9f4ac6b92-image.png)

콘솔을 찍어보면 잘 받아와진 것을 볼 수 있다. name에는 `[...nextauth].ts`에서 로그인 성공시 user에 부여되는 토큰을 넣어줘서 영문 값이 들어간 것이다.

**expires**는 세션이 만들어지면서 생성되는 만료값이다.

<br>

## 로그아웃

```jsx
<Logout
  onClick={() =>
  signOut({ callbackUrl: `${window.location.origin}` })
          }
  >로그아웃
</Logout>
```

로그아웃을 하는 부분이다. 사실 여기도 `[...nextauth].ts` pages에 `signOut: /`으로 최상단으로 이동시켜야한다. 하지만 다른곳은 정상적으로 모두 이동하는데 `/`만 이동하지 못하고 있다. 그래서 callbackUrl을 줘서 이동시켜줬다. 로그아웃이 성공하면 최상단으로 이동하며, **Cookies에서 next-auth.session-token**이 삭제된다.

<br>

> 마무리

이제 로그인이 유지되고 있는 동안에는 세션을 가져와서 사용하면 될 것이다.

<br>

* next-auth의 아쉬운점
https://vizzuality.github.io/devismos/docs/researches/next-auth/ 을 확인해보면 next-auth는 API에서 인코딩된 원본 토큰에 액세스할 수 없다. (어쩐지..) 

![](/images/b1dd38e1-e0a4-48b5-9e88-5c4d308e5f47-image.png)

그 외에도 return ueser할 때, 3개의 정보만 넘길 수 있다는것도 너무 아쉽다. 그래서 나는 name에 토큰값을 넣어버린것이다.

* any
`components/login/Email` 에서 res와 `pages/api/auth/[...nextauth].ts`에서 any를 사용한 곳이 조금 있다. 많은 시도 끝에도 정확한 타입을 찾지 못해 에러가 발생하여, 이 부분의 타입을 추후에 수정해보려고 한다.