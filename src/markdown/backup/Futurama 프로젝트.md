---
title: "Futurama 프로젝트"
description: "Sample APIs에 있는 Futurama API를 사용하여 데이터를 읽어 화면에 노출시키는 프로젝트를 설계해보았다. (Next.js, TypeScript, Emotion)"
date: 2021-12-28T01:10:33.050Z
tags: ["React","next","typescript"]
---
[Sample APIs](https://sampleapis.com/)에 있는 [Futurama API](https://sampleapis.com/api-list/futurama)를 사용하여 데이터를 읽어 화면에 노출시키는 프로젝트를 설계해보았다. [Wine 프로젝트로 먼저 연습](https://velog.io/@leehyunho2001/Wine)을 해본 후에 설계하게 되었다.

Futurama -> [서비스 링크](https://futurama-eta.vercel.app/)

![](/images/f3767bff-a8c0-4628-a21b-14f53c7254e4-image.png)

Futurama API를 확인해 보면 6개의 엔드포인트가 있다. 이를 바탕으로 웹 사이트를 구성할 것이다.

<br>

<img src="https://flxt.tmsimg.com/assets/p9932851_b_h8_ab.jpg" />

<br>

### STACK

* Front-End
  * SWR
  * Next.js
  * TypeScript
  * Emotion(styled)
* Deploy
  * Vercel

<br>

```bash
yarn create next-app 프로젝트이름 --typescript
yarn add axios swr @emotion/react @emotion/styled
```

필요한 것들을 설치해 주고, src 디렉터리를 만들어서 pages와 styles 디렉터리를 안에 넣어주었다.

Styled-components는 바벨 설정 등의 여러 가지 작업들을 해줘야하고 Next.js에서 맞지 않은 부분들이 있어 emotion을 사용하기로 했다.

이번 프로젝트는 꾸준하게 최적화를 하는데 초점을 맞춰보려고 한다.

<br>

![](/images/26d5b71b-4c1c-417b-9b41-182f9b774894-image.png)

6개의 엔드포인트중 charactor의 데이터 형식이다. 캐릭터의 정보들이 리스트 형식으로 나열되어있다. 이런 경우에는 상세 페이지를 만들지 말지에 관한 고려를 해야한다. (동적 라우팅)

<br>


## 프로젝트 시작

### API에서 데이터 받고, 출력

```jsx
//types/charactors.ts
export interface CharactorData {
  age: string;
  gender: string;
  homePlanet: string;
  id: number;
  species: string;
  images: {
    headShot: string;
    main: string;
  };
  name: {
    first: string;
    middle: string;
    last: string;
  };
  occupation: string;
  saying: [string];
}
```

먼저 캐틱터들의 정보부터 불러와보자.

데이터를 보고 타입을 먼저 선언했다. 타입 선언하는 ts파일들은 types 디렉터리에서 관리한다.

```jsx
//constants/index.ts
export const API_ENDPOINT = "https://api.sampleapis.com/futurama/";
```

useSWR을 사용하여 엔드포인트에 접근하고, 데이터를 받아오려고 한다. 주소/info, 주소/charactors 와 같이 사용하기 때문에 이런 반복되는 상수는 constants 디렉터리에서 관리하자.

```jsx
//hooks/useCharactorData.tsx
export const useCharactorData = () => {
  return useSWR(`${API_ENDPOINT}/characters`, fetcher);
};
```

useSWR을 사용하는 커스텀 훅을 생성했다. 

```jsx
//utils/fetcher.ts
export const fetcher = (url: string) => axios(url).then((res) => res.data);
```

fetcher는 엔드포인트에서 axios로 데이터를 받아오는 부분이다. 많은 곳에서 사용되기 때문에 utils 디렉터리에 위치시켰다.

```jsx
export const CharactorCardContainer = () => {
  const { data, error } = useCharactorData();
  if (error) return <div>Error...</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <div>
      <Container>
        {data.map((charactor: CharactorData) => {
          return (
            <CharactorCard
              charactorData={charactor}
              key={`futurama-charactor-${charactor.id}`}
            />
          );
        })}
      </Container>
    </div>
  );
};
```

이제 본격적으로 사용해보자. useSWR을 사용한 CharactorData을 가져와 data와 error을 받아 상황에 맞게 처리를 해주고있다. 그리고 map을 이용하여 데이터를 모두 가져오고 있다. 화면에 출력하는 부분은 다시 Card로 컴포넌트화 했다. (key는 부모에서 관리)

```jsx
//conponents/CharactorCard.tsx
interface CharactorCardProps {
  charactorData: CharactorData;
}

export const CharactorCard = ({ charactorData }: CharactorCardProps) => {
  const { images, name } = charactorData;
  return (
    <Card>
      <Profile src={images.main} alt={name.first} />
      <h1>
        {name.first} {name.middle} {name.last}
      </h1>
    </Card>
  );
};
```

드디어 charactorData에서 가져오고 싶은 props들을 가져와 화면에 출력할 수 있다. 스타일도 이 컴포넌트에서 진행해주면 될 것이다.

```jsx
//pages/charactors/index.tsx
const CharactorsIndexPage: NextPage = () => {
  return (
    <div>
      <h1>Futurama Charactors List</h1>
      <CharactorCardContainer />
    </div>
  );
};
```

이제 charactors의 index에서는 `<CharactorCardContainer />` 를 가져오는 것으로 캐릭터들의 리스트를 출력할 수 있다. 결국 `CharactorCardContainer` 에서 index의 코드를 모두 가져가서 이 추상화의 의미를 모를수 있다.

index에 다른 리스트나 정보들을 추가할 수 있다. 추가한 코드도 모두 추상화하면 `<CharactorCardContainer />`와 같은 형태가 되는데, 많은 기능을 담고있음에도 불구하고 index의 가독성은 높고 유지보수가 쉬워질 것이다.

![](/images/ef24bcd0-c55e-41dc-af35-58c4da1eb89e-image.png)

이와 비슷한 방법으로 나머지 엔드포인트의 페이지들을 만들었다. 데이터를 모두 잘 받아오고 있다.

<br>

### layout

![](/images/7340117f-c69b-4b43-aa8e-87b3a8edadca-image.png)

모든 페이지에 헤더가 있어야할 것 같아 레이아웃을 만들었다. 레이아웃은 components 디렉터리 안에 layout 디렉터리에서 설계해줄 것이다.

<br>

```jsx
//pages/_app.jsx
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
```

먼저 _app.jsx의 Component를 Layout 컴포넌트로 감싸주었다. 이제 모든 페이지에 지금부터 설계할 헤더가 나타날 것이다.

<br>

```jsx
//layout/Layout.tsx
export const Layout: React.FC = ({ children }) => {
  return (
    <Container>
      <MobileNav />
      <Navigation />
      <Main>{children}</Main>
    </Container>
  );
};
```

Layout.tsx는 모든 레이아웃을 포함하고 있는 메인이라고 보면 된다. 모바일용 헤더와 PC용 헤더 두개를 만들어 주었다. 그리고 Main으로 children을 감싸주어 모든 페이지에 헤더가 적용되도록 만들었다. (Main에서 m이 대문자인 이유는 스타일 한 것이다.)

PC용 헤더인 Navigation에 대해서만 설명해 보겠다.

<br>

```jsx
//Navigation.tsx
export const Navigation = () => {
  return (
    <Container>
      <Link href="/">
        <a>
          <H1>Futurama</H1>
        </a>
      </Link>
      <nav>
        <ItemContainer>
          {ROUTES.map((routeObject: ROUTESDATA) => {
            return (
              <Item key={routeObject.ID}>
                <Link href={routeObject.PATH}>
                  <a>{routeObject.LABEL}</a>
                </Link>
              </Item>
            );
          })}
        </ItemContainer>
      </nav>
    </Container>
  );
};
```

헤더는 보통 ul li a 태그를 사용하여 nav를 설계한다. 일일이 href로 경로를 설정해주고 헤더에 대한 정보들을 입력한다면 유지보수하기 힘들 것이다. 

```jsx
//constants/index.ts
export const ROUTES = [
  {
    ID: 0,
    PATH: "/info",
    LABEL: "INFO",
  },
  {
    ID: 1,
    PATH: "/characters",
    LABEL: "CHARACTERS",
  },
  {
    ID: 2,
    PATH: "/cast",
    LABEL: "CAST",
  },
  {
    ID: 3,
    PATH: "/episodes",
    LABEL: "EPISODES",
  },
  {
    ID: 4,
    PATH: "/questions",
    LABEL: "QUESTIONS",
  },
  {
    ID: 5,
    PATH: "/inventory",
    LABEL: "INVENTORY",
  },
];
```

constants 디렉터리의 index.ts에서 ROUTES를 생성하고 types 디렉터리의 route.ts 에 데이터 타입을 선언했다. 그 후 Navigation 파일에서 불러와 사용한 것이다.(map을 돌림. 가독성과 유지보수성 증가.)

<br>

```jsx
//layout/index.ts
export * from "./Layout";
export * from "./Navigation";
export * from "./MobileNav";
```

마지막으로 layout 디렉터리에서 위와 같이 index.ts를 구성해주면 된다.

<br>

### 동적 라우팅

![](/images/92c3c64b-76f6-4f32-9d20-0faca803d0e0-image.png)

characters 디렉터리에 `[id].tsx` 파일을 생성했다.

```jsx
//hooks/useCharacterData.tsx
const CharacterDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { data, error } = useData("characters", id);
  if (error) return <Error />;
  if (!data) return <Loading />;
  console.log(data);

  const { images, name } = data;

  return (
    <div>
      <h3>Character</h3>
      <img src={images.main} alt="캐릭터" />
    </div>
  );
};
```

이제 /characters/1 의 형식으로 주소에 들어가면 useRouter로 id값을 받아올 수 있다. 이 값을 useData에 넣어주어 해당 주소로 useSWR하면 된다.

```jsx
export const useData = (name: string, path: string | string[] | undefined) => {
  let str;
  if (path === "") {
    str = `${API_ENDPOINT}/${name}`;
  } else {
    str = `${API_ENDPOINT}/${name}/${path}`;
  }
  return useSWR(str, fetcher);
};
```

데이터를 받아오던 커스텀 훅을 조금 수정했다. path가 들어오는지 아닌지에 따라 동적 라우팅 여부를 결정한다. str을 선언해준 이유는 if, else에 useSWR을 상황에 맞게 넣으면 빨간 밑줄이 생겨서.. 위와 같이 설계해 주었다.

<br>

> 마무리

여러 페이지를 설계하고 React Hooks을 사용하여 기능을 추가하고 있다. 반응형 웹에 대한 처리도 하며 꾸준하게 추상화도 진행해주고 있다. 이제 공통으로 사용되는 스타일들을 어떻게 추상화 할지 더 고민해봐야 겠다.