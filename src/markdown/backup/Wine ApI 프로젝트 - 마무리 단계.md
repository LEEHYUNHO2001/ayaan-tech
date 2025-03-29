---
title: "Wine ApI 프로젝트 - 마무리 단계"
description: "설계하면서 문제점들이 발생하기 시작했다."
date: 2021-12-24T10:51:49.040Z
tags: ["React","next","typescript"]
---
* **wines와 beers 페이지**

현재 프로젝트에서 미완성인 부분들이 있다. 먼저 Beers페이지와 Wines 페이지로 가면 휑~~ 하다. 이 부분들을 먼저 설계해주자.

Beers 페이지에서는 맥주의 종류를, Wines 페이지에서는 와인의 종류를 선택할 수 있게 페이지를 설계해야 할 것이다. Beers와 Wines에 설계 될 코드는 비슷할 것이므로 컴포넌트로 분리해주었다.

```jsx
//components/IndexList.tsx
interface PageName {
  name: string;
  path: string;
}

export const IndexList = ({ name, path }: PageName) => {
  return (
    <div>
      <h1>{name}</h1>
      <Container>
        {ROUTES.filter(
          (routeObject: ROUTE) => routeObject.LABEL === name
        )[0]?.SUBS.map((subRouteObject: SUBS) => {
          return (
            <Item key={`${subRouteObject.LABEL}-list-${subRouteObject.ID}`}>
              <Link href={`${path}${subRouteObject.PATH}`}>
                <a>{subRouteObject.LABEL}</a>
              </Link>
              <Img src={subRouteObject.SRC} alt="" />
            </Item>
          );
        })}
      </Container>
    </div>
  );
};
```

styled-components 부분 설명은 생략하겠다. 먼저 Beers나 Wines에서 props로 name과 path를 받는다. 페이지에 맞는 상세 리스트들을 불러오기 위해 filter와 map을 사용했다. 그리고 SUBS을 생성해주었다.(types 디렉터리)

<br>

```jsx
//pages/wines/index.tsx
const WinesPage: NextPage = () => {
  const name = "Wines";
  const path = "wines";
  return (
    <div>
      <IndexList path={path} name={name} />
    </div>
  );
};
```

![](/images/1c6d93ee-cf85-4d17-b872-2ddc57633706-image.png)

wines의 index이다. 위와 같이 헤더에 사용할 name과 주소 path를 props을 넘겨주면 된다. Beers에서도 위와 비슷하게 사용할 수 있다.

<br>

* **노 이미지 구현**

![](/images/b55481e1-fb83-4da1-a516-2371ac1ba3f8-image.png)

맥주나 와인의 종류를 선택하여 상세 페이지로 넘어갔을 경우, 이미지가 없어 불러와지지 않는 경우가 있다. 대체 이미지를 사용해주고 싶었다.

```jsx
const handleImgError = (e: any) => {
  e.target.src =
    "대체 이미지";
};

export const WineCard = ({ wineData }: WineProps) => {
  const { wine, winery, image, location, rating } = wineData;

  return (
    <Container key={`${wine}-${winery}`}>
      <Img src={image} onError={handleImgError} alt="와인" />
      <h2>
        {wine}
        <Average>{rating.average}</Average>
      </h2>
      <p>
        {winery} - {location}
      </p>
      <p>리뷰 갯수 : {rating.reviews.replace("ratings", "")}</p>
    </Container>
  );
};
```

img 태그에 `onError` 을 다루기 위해 핸들러를 하나 생성해주었다. 현재 e의 타입이 any로 설정되어있는데, 나중에 수정해보려고 한다. 이미지가 불러와지지 않을 경우 대체 이미지를 사용하고 있다.

<br>

> 문제점들

* **첫번째 문제**

![](/images/e8788a54-f322-40aa-94ec-4e3cdefd9a9e-image.png)

Components 디렉터리의 BeerCard와 BeerContainer에서 `import { Beer } from "../types/Beer";` 으로 Beer의 타입 인터페이스를 불러오고 있다. Wine에서도 위와 비슷하다.

분명 잘 동작하고 있는데 Vercel로 배포할때마다 에러가 났다. Beer와 Wine을 찾을수 없다고 설명되어 있었다. ~~분명 잘 돌아가고 빌드도 잘 되었는데..~~

![](/images/6cdff1f1-9d9b-4ea9-9e38-a283fb70a717-image.png)

styled-components 바벨 경고문도 나타나서 일단 모든 스타일을 삭제해주어도 배포를 실패했다.(위와 동일한 이유로) 그렇다면 문제는 Beer와 Wine 인터페이스이다.

```jsx
interface Beer {
  price: string;
  name: string;
  rating: {
    average: number;
    reviews: number;
  };
  image: string;
  id: number;
}
```

그래서 일단 Beer와 Wine 인터페이스를 사용하는곳에 각각 코드를 가져왔다. 이렇게 하니 styled-compontns를 다시 추가해도 배포가 되었다. 분명 파일로 분리했을 때, export도 잘 넣어주었는데 왜 그러는지 이유를 찾지 못했다.

<br>

* **2번째 문제**

![](/images/35ba105c-ce3d-4a0c-a71c-260b73fceab8-image.png)

`yarn dev`로 실행했을 경우, 이미지에 flex 속성과 스타일들이 작 적용되었다.

![](/images/4e00dcbb-0a59-4683-9161-cac0d334e6ef-image.png)

하지만 Vercel에서는 정상적으로 동작하지 않는다. 왜 그럴까.. 내 생각에는 SSR을 안해줘서 그런거같다. 이유를 찾아봐야겠다.

<br>

* **3번째 문제**

```jsx
const handleImgError = (e: any) => {
  e.target.src =
    "대체 이미지";
};
```

빈 이미지를 표시하기 위한 핸들러이다. e의 타입을 모르겠다. 공부하자..