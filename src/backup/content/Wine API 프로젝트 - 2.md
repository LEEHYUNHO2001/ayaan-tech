---
title: "Wine API 프로젝트 - 2"
description: "와인 샘플 API을 이용하여 데이터를 받아오는 부분을 설계해보자."
date: 2021-12-21T13:15:56.256Z
tags: ["React","next","typescript"]
---
[와인 샘플 API](https://sampleapis.com/api-list/wines)을 이용하여 데이터를 받아오는 부분을 설계해보자.

src 디렉터리 구조이다.

<br>

```js
{
  "winery":"Maselva",
  "wine":"Emporda 2012",
  "rating":{
    "average":"4.9",
    "reviews":"88 ratings"
  },
  "location":"Spain\n·\nEmpordà",
  "image":"https://images.vivino.com/thumbs/ApnIiXjcT5Kc33OHgNb9dA_375x500.jpg",
  "id":1
}
```

먼저 우리가 받아올 데이터 구조를 확인하기 위해 wine 데이터를 확인해보자.

TypeScript를 사용하기 때문에 데이터들의 타입을 선언해주어야 한다. **types 디렉터리**에 **wine.ts 라는 파일**을 생성해주었다.

<br>

```ts
//types/wine.ts
export interface Wine {
  winery: string;
  wine: string;
  rating: {
    average: string;
    reviews: string;
  };
  location: string;
  image: string;
  id: number;
}
```
각각의 데이터 타입들을 선언해주었다. Wine 인터페이스를 이용하여 데이터 선언을 해줄 것이므로 export해주었다.

<br>

```jsx
import type { NextPage } from "next";
import axios from "axios";
import useSWR from "swr";
import { Wine } from "../../types/wine";

// 한번 불러오고 다시 불러오지 않아도 될 녀석들.. ssr 해보자..
const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const PortPage: NextPage = () => {
  const { data, error } = useSWR(
    "https://api.sampleapis.com/wines/port",
    fetcher
  );
  if (error) return <div>Faild to Loading...</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <div>
      <h1>port</h1>
      <main>
        {data.map((wineData: Wine) => {
          const { id, wine, winery } = wineData;
          return (
            <div key={`port-wine-list-${id}`}>
              <h1>{wine}</h1>
              <p>{winery}</p>
            </div>
          );
        })}
      </main>
    </div>
  );
};

export default PortPage;
```

우리는 **useSWR**을 사용해볼 것이다. 그래서 fetcher을 먼저 선언했다. url만 가져와서 사용하기 때문에 fetcher에 url의 타입을 string으로 선언했다.

useSWR은 data와 error을 받고, `useSWR(
    "데이터받을주소",
    fetcher
  );` 와 같이 useSWR을 사용하면 된다.

error인 경우는 로딩 실패 메세지를 띄어주고, data가 없는 경우는 로딩 메세지를 띄어주고 있다.

<br>

```jsx
        {data.map((wineData: Wine) => {
          const { id, wine, winery } = wineData;
          return (
            <div key={`port-wine-list-${id}`}>
              <h1>{wine}</h1>
              <p>{winery}</p>
            </div>
          );
        })}
```

받아온 데이터는 이제 사용하기위해 return부분에서 `{}`을 이용하여 맵핑해주자. 객체 하나 하나를 wineData로 받아오고 있는데, 우리가 먼저 types/wine.ts에서 선언해준 **Wine 인터페이스**를 사용해서 wineData의 타입을 선언해준다.

![](/images/1136a352-83ef-4b28-af10-07c1c388ed8e-image.png)

이와 같이 wines/port 페이지에 와인 API에서의 port정보가 가져와진것을 볼 수 있다. 이제 리팩토링 해보자.

<br>

>## 추상화 리팩토링

```jsx
//utils/fetcher.ts
import axios from "axios";

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);
```
현재 우리는 와인의 한 종류인 port의 데이터를 불러와서 작업하고 있다. 위의 fetcher의 경우에는 **모든 wines디렉터리의 페이지에서 사용될 것**이다.

**utils 디렉터리**에 **fetcher.ts**를 생성해주었다.
여기에 fetcher을 따로 빼주었다.

<br>

```jsx
//constants/index.ts
export const WINE_API_ENDPOINT = "https://api.sampleapis.com/wines/";
```

우리는 `https://api.sampleapis.com/wines/port`으로 port 와인을 가져왔다. 만약에 화이트 와인의 데이터를 가져오려면`https://api.sampleapis.com/wines/whites`를 사용해야한다. 딱 봐도 반복되는 부분이 보인다. **constants의 index.ts**에 와인 API의 엔드포인트 값을 변수로 저장해주었다.

<br>

```jsx
//hooks/useWindData.ts
import useSWR from "swr";
import { fetcher } from "../utils/fetcher";
import { WINE_API_ENDPOINT } from "../constants";

export const useWineData = (path: string) => {
  return useSWR(`${WINE_API_ENDPOINT}${path}`, fetcher);
};
```

이제 useSWR을 커스텀하기 위해 **hooks 디렉터리**에 **useWindData.ts**을 생성하자. **커스텀 훅을 생성해주는 것인데, use라는 이름으로 파일명이 시작**된다. 위에서 분리해둔 fetcher를 가져와서 사용하고, WINE_API_ENDPOINT도 가져와서 사용하자.

useWineData("port") 의 형식으로 사용할 것이다. path인자를 받아올 것인데 string이기 때문에 타입을 위와같이 선언했다.

<br>

```js
//components/Error.tsx
export const Error = () => {
  return <div>Faild to Loading...</div>;
};
```
에러 메세지를 리턴해주는 컴포넌트 

<br>

```js
//components/Loading.tsx
export const Loading = () => {
  return <div>Loading...</div>;
};
```
데이터가 없을 경우 로딩 메세지를 리턴해주는 컴포넌트 

<br>

```js
//components/WineCard.tsx
import { Wine } from "../types/wine";

interface WineProps {
  wineData: Wine;
}

export const WineCard = ({ wineData }: WineProps) => {
  const { wine, winery } = wineData;

  return (
    <div>
      <h1>{wine}</h1>
      <p>{winery}</p>
    </div>
  );
};

```
데이터를 출력해서 리턴해주는 컴포넌트 ( 비슷한 동작이기 때문에 컴포넌트로 나누어줌 )

<br>

```jsx
//components/index.tsx
export * from "./Error";
export * from "./Loading";
export * from "./WineCard";
```

컴포넌트 디렉터리 index.tsx를 생성해주었다. 위와 같이 코드를 작성해주면 `import { Error, Loading, WineCard } from "../../conponents";` 와 같이 사용할 수있다.

<br>

```jsx
//pages/wines/port.tsx
import type { NextPage } from "next";

import { Wine } from "../../types/wine";
import { useWineData } from "../../hooks/useWindData";
import { Error, Loading, WineCard } from "../../conponents";

const PortPage: NextPage = () => {
  const name = "port";
  const { data, error } = useWineData(name);
  if (error) return <Error />;
  if (!data) return <Loading />;
  return (
    <div>
      <h1>port</h1>
      <main>
        {data.map((wineData: Wine) => {
          return (
            <WineCard
              key={`${name}-wine-list-${wineData.id}`}
              wineData={wineData}
            />
          );
        })}
      </main>
    </div>
  );
};
export default PortPage;
```

이제 port.tsx 파일을 위와 같이 사용하면 된다.