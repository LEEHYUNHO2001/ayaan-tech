---
title: "Mandarin-market - 2"
description: "리팩토링 및 판매 중인 상품 Part"
date: 2022-01-17T02:07:42.370Z
tags: ["React","next","typescript"]
---
## 리팩토링

이전 글에서 점점점을 누르면 모달이 나타나고, 로그아웃을 선택하면 모달이 한개 더 나오도록 구현했다. 

![](/images/a88fd55e-65a0-4f59-9079-3f00837cf530-image.png)

Nav에 `fixed`속성을 주고 아래의 모달에는 Nav 안에서 `absolute`속성을 주어 헤어와 같이 움직이도록 구현했었다. 하지만 기능을 추가함에 따라 컴포넌트로 따로 분리하기도 애매해서 다시 구현해주었다.

```jsx
    <section>
      <Nav>
        <button>
          <ArrowBackIcon className="arrow" />
        </button>
        <button onClick={openMyProfileModal}>
          <MoreVertIcon className="more" />
        </button>
      </Nav>
      <MyProfileInfo />
      <MyProfileInfo />
      <Background
        className={`${myProfileModal}`}
        onClick={closeMyProfileModal}
      ></Background>
      <MyProfileModal
        myProfileModal={myProfileModal}
        openLogoutModal={openLogoutModal}
      />
      {logoutModal && <LogOutModal closeLogoutModal={closeLogoutModal} />}
    </section>
```

Nav 안에 있던 모달들은 이제 밖에서 사용할 수 있게 되었다. 전체적인 동작은 이러하다. 점점점을 누르면 바텀으로 `fixed`되는 모달이 하나 나타나고 화면을 회색으로 가리는 `Background` 가 나타난다. 모달에서 '설정 및 개인정보' 또는 '로그아웃'을 선택하지 않고, 회색 부분을 누르면 모달은 사라지고 회색 배경도 사라지게 된다.

![](/images/4fd68bac-e0e2-4f4f-a017-24163620a642-image.png)

로그아웃을 클릭하면 중앙에 모달창이 하나 더 나타나고 있다. 반응형을 고려하여 설계했어서 화면의 크기에 상관없이 중앙에 잘 위치하고 있다.

<br>

## 오늘의 구현

### 판매중인 상품

다른 사람의 프로필에 들어갔을 때, 그 사용자가 판매하고 있는 상품의 목록들을 보여주는 부분을 구현하려고 한다.

undefined

결과물 먼저 보자. 버튼을 이용하여 사진을 움직이는것 처럼 보이게 Carousel로 설계해주었다.

```js
  const ProData = [
    {
      id: 0,
      src: "https://cdn.pixabay.com/photo/2014/04/07/02/42/clementines-318210_1280.jpg",
      href: "1",
      title: "애월읍 노지 감귤",
      price: "35,000원",
    },
    {
      id: 1,
      src: "https://cdn.pixabay.com/photo/2015/11/24/06/53/hallabong-1059550_1280.jpg",
      href: "2",
      title: "애월읍 한라봉 10kg 당도 최고",
      price: "45,000원",
    },
    {
      id: 2,
      src: "https://cdn.pixabay.com/photo/2018/12/06/21/31/mandarins-3860659_1280.jpg",
      href: "3",
      title: "감귤 파치",
      price: "25,000원",
    },
  ];
```

아직 Back단은 없지만 데이터를 이런식으로 가져올 것 같아 더미 테이터를 미리 생성했다. id는 이 데이터를 이용하여 map 함수를 사용할 때, key값으로 주기위해 넣었다.(DB에는 자동적으로 있을 것)

```jsx
      <CarouselContainer>
        <CarouselItem index={caroucelIndex}>
          {ProData.map((s) => {
            return (
              <div key={`carousel-${s.id}`}>
                <Link href={s.href}>
                  <a>
                    <Img src={s.src} alt="" />
                  </a>
                </Link>
                <CarouselTitle>{s.title}</CarouselTitle>
                <CarouselPrice>{s.price}</CarouselPrice>
              </div>
            );
          })}
        </CarouselItem>
      </CarouselContainer>
```

`CarouselContainer`에 `overflow: hidden;`을 주고, `CarouselItem`에서 transition과 버튼을 클릭하면 위치가 바뀌는 부분인 `${caroucelIndex}`을 넣었다. 

`const [caroucelIndex, setCaroucelIndex] = useState(0);` 을 통해 버튼을 클릭함에 따라 인덱스값을 핸들링하고 있다. 이 값을 이용하여 현재 캐러셀의 위치를 보여주는 부분이 `${caroucelIndex}` 이다.

```jsx
const caroucelIndex = (props: IndexTypeProps) => css`
  transform: translateX(-${150 * props.index}px);
`;
```
이와 같이 `caroucelIndex`는 props를 받아와 css를 적용시키고 있다.

![](/images/6a7fd098-be1a-4abb-91f2-ea056b7587ff-image.png)

```jsx
const CarouselTitle = styled.p`
  font-size: 14px;
  font-weight: 400;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 140px;
  height: 20px;
`;
```

상품의 title이 길어지면 ...으로 표시하기 위해 `text-overflow`속성을 부여했다. 이렇게 캐러셀도 완성했다. 

<br>

#### 문제점

하지만 한가지 문제점이 있다.

undefined

캐러샐이 Nav 위에 위치 해버리는 문제점이다. 

![](/images/928311ae-8f01-4541-a55c-f26bd808a35b-image.png)

모달을 캐러셀을 잘 가려주는데 Nav는 그러지 못하고 있다.

```jsx
const caroucelIndex = (props: IndexTypeProps) => css`
  transform: translateX(-${150 * props.index}px);
`;
```

코드를 분석해본 결과 이 부분이 원인이었다. 혹시 props를 사용하는것이 문제인가 싶어 `transform` 속성을 제거해보았지만 그런것은 아니었다.

`translateX`가 원인인가 싶어 `scale(2)` 로 바꿔보았는데 그냥 `transform`의 문제인것으로 판명났다.

`z-index`를 이용해보려고 했지만 해결되지 않았다.

더 고민해보고 해결해봐야겠다.

