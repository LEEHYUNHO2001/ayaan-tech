---
title: "Next.js + useSWR + Pre-Rendering"
description: "Next에서 swr을 사용하는 경우 pre-Rendering 하는 방법을 알아보자."
date: 2022-02-15T16:26:50.744Z
tags: ["React","next","typescript"]
---
## 개요

[원티드 프리온보딩 기프티콘 쇼핑](https://velog.io/@leehyunho2001/%EA%B8%B0%ED%94%84%ED%8B%B0%EC%BD%98-%EC%87%BC%ED%95%91) 에서 useSWR를 사용해서 데이터를 받아와 UI를 설계했었다. Next는 React에서 SSG 또는 SSR을 쉽게 하기 위해 나온것으로 알고있다. 그렇다면 저 방법은 SSG나 SSR을 사용하고 있는 것일까?

<br>

### 사용하고 있던 방법

```jsx
//pages/contacts
const { data: QnATypeData, error: QnATypeError } = useSWR(`${API_ENDPOINT}/qa-types`, fetcher);

if (!QnATypeData) return <div>로딩</div>;
if (QnATypeError) return <div>에러</div>;

return <QnAContainer QnATypeData={QnATypeData.qaTypes}/>
```

useSWR에서 fetcher와 API 엔드포인트를 이용하여 데이터를 요청했다.

![](/images/39c50980-624f-4fc2-a3fe-3408161b4712-image.png)

데이터는 이와 같은 형태로 res 되었다. 받은 데이터는 QnATypeData 라는 이름으로 props를 넘겨주어 컴포넌트 UI를 설계 했었다.

<br>

### Pre-Rendering( SSR or SSG ) 확인 방법

그럼 위의 방법이 어떤 Rendering 인지 확인해보자.

![](/images/ae5b4c4a-1cfa-496b-a779-f12c6e2a44ed-image.png)

`Settings > Preferences > Debugger > Disable JavaScript`

크롬 브라우저에서 Disable JavaScript를 체크했다. 

![](/images/e219ec12-8c48-432f-b609-57858c5d2b36-image.png)

이제 새로 고침을 눌러주자. 데이터와 상관 없는 UI 외에는 화면에 나타나지 않고 있다. Pre-Rendering은 수행되고 있지 않다.

<br>

### 잠깐!! SSG, SSR, CSR 이란?


#### SSG

SSG는 빌드 시점에 온전한 페이지의 HTML이 생성되어 서버에서 물리적으로 HTML파일을 모두 갖고 있는 상태이다. 페이지를 요청할 때 서버에서 갖고 있던 해당 페이지의 HTML을 응답한다. 한번 응답한 후에는 CDN(content delivery network)이 파일을 기억하여 응답하기 때문에 화면을 그리는 속도가 빠르며 불필요한 서버 요청이 줄어든다.

하지만 정적생성이 필요한 페이지는 따로 있다는것을 기억하자. 빌드시점에서 HTML을 생성하기 때문에 유동적으로 데이터를 받아와야 하는 페이지에서는 사용하면 안될 것이다. 회사 소개페이지, 개인정보처리 방침 같은 설명 페이지, 정적 블로그 페이지 등에서 사용하면 된다.

getStaticProps, getStaticPaths 메서드를 사용하면 된다.

#### SSR

SSG는 데이터가 포함된 HTML 파일이 존재하는 것이다. SSR은 페이지 요청이 있으면 서버에서 API를 호출하고 데이터를 응답받아 서버측에서 HTML을 완성시켜 클라이언트에 전달한다. 초기 렌더링 속도가 빠르다는 장점이 있고, 요청할때마다 서버에서 HTML을 완성하여 오래걸릴 수 있다는 단점도 있다. 

getInitialProps나 getServerSideProps 메서드를 사용하면 된다.

#### CSR

CSR은 초기렌더링이 느리지만, 그 외에 페이지 이동은 막힘이 없다. 그렇다면 Next에서 CSR은 어떤 경우에 사용할까. SEO가 필요없는 마이페이지, 관리자페이지 등은 클라이언트 측에서 데이터를 호출해도 될 것이다. 라이프사이클에서는 componentDidMount에서 데이터를 요청하고, 훅스에서는 useEffect에서 요청한다. useSWR을 사용하는 경우에는 그냥 이것만 사용해도 된다.

#### Next

Next는 간단하게 말하자면 SSR과 CSR의 장점을 가지고 있다. 초기 렌더링은 SSR을 이용하여 빠르고, 이후 페이지 이동에는 CSR을 한다. SEO를 위한다면 SSR을 해주는 것도 방법일 것이다.

<br>

### Pre-Rendering 사용

#### SSG 사용

[Next.js과 useSWR](https://swr.vercel.app/docs/with-nextjs)을 사용하는 경우에 SSG 사용법을 알아보자.

```jsx
//pages/contacts.tsx
export const getStaticProps: GetStaticProps = async () => {
  const QnATypeData = await fetcher(`${API_ENDPOINT}/qa-types`);
  return {
    props: {
      fallback: {
        [`${API_ENDPOINT}/qa-types`]: QnATypeData,
      },
    },
  };
};
```

내 생각에는 QnA에서 구매와 판매라는 QnA 타입에 대한 데이터는 유동적으로 변할 것 같지 않다. 그래서 SSG를 적용해주기로 했다.

먼저 getStaticProps를 사용하기 위해 타입 지정을 해주고, 기본적인 틀을 만들었다. fetcher는 `export const fetcher = (url: string) => axios.get(url).then(res => res.data);` 로 설정되어 있다. 그리고 QnA 타입에 대한 데이터는 `${API_ENDPOINT}/qa-types` 에 담겨 있다.

서버에서 API 요청을 보내고, 받은 데이터를 빌드시에 HTML 페이지를 만들고 클라이언트에 보낸다.

```jsx
//pages/contacts.tsx
function QnAType() {
  const { data: QnATypeData, error: QnATypeError } = useSWR(
    `${API_ENDPOINT}/qa-types`
  );
  if (!QnATypeData) return <div>로딩</div>;
  if (QnATypeError) return <div>에러</div>;
  return <QnAContainer QnATypeData={QnATypeData.qaTypes} />;
}

const ContactsPage: NextPage = ({ fallback }: any) => {
  return (
    <SWRConfig value={{ fallback }}>
      <QnAType />
    </SWRConfig>
  );
};
```

데이터를 QnAContainer 컴포넌트에 보내서 SSG 된 것에 대해 UI를 설계하도록 하자.

<br>

```jsx
//components/QnA/QnAContainer.tsx
export const QnAContainer = ({ QnATypeData }: QTDProps) => {
  return (
    <section>
      <h1 className="sr-only">고객 상담 페이지</h1>
      <OneOnOne />
      <OftenQnA QnATypeData={QnATypeData} />
    </section>
  );
};
```

QnATypeData는 OftenQnA 컴포넌트에서 사용한다.

<br>

```jsx
//components/QnA/OftenQnA.tsx
    <div>
      <Container>
        <Title>자주 묻는 질문</Title>
        <ToggleContainer>
          <BuyBtn type="button" toggle={toggle} onClick={handleBuyBtn}>
            {QnATypeData[0].name}
          </BuyBtn>
          <SellBtn type="button" toggle={toggle} onClick={handleSellBtn}>
            {QnATypeData[1].name}
          </SellBtn>
        </ToggleContainer>
      </Container>
      <QnAContent name={QnATypeData[toggle - 1].name} toggle={toggle} />
    </div>
```

`QnATypeData[0].name`과 `QnATypeData[1].name` 으로 UI를 구현하고 있다. SSG가 정상적으로 동작하고 있는지 확인해보자.

![](/images/8316f801-8894-44d7-a876-5e27b7b9cab7-image.png)

Disable JavaScript가 된 상태에서 QnA의 타입인 **구매와 판매** 버튼이 나타난 것을 볼 수 있다. 정상적으로 SSG가 적용된 것이다. 구매나 판매에 대한 QnA 목록들은 유동적으로 변경될 수 있기 때문에 SSG로 구현하지 않아 로딩중이 뜨고 있다. 이제 Disable JavaScript 체크박스를 해제해보자.

undefined

체크 해제 후 새로고침 해보니 구매와 판매에 대한 QnA 목록들도 CSR 으로 데이터를 잘 받아오게 되었다.

<br>

#### SSR 사용

QnA 목록들도 SEO가 적용된다면, 고객 유입이 조금이라도 더 될 것이라고 생각했다. 그래서 질문과 답변 부분은 SSR을 적용해보려고 했다. 하지만 공식문서 읽어보니 pages 내부에서만 사용 가능하다고 나와있다. 그래서 컴포넌트에서는 CSR을 하기로 했다.

