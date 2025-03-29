---
title: "SPACE_DEV_CLUB - 5"
description: "이전 글에서 작성한것 처럼 상세 페이지의 윗 부분을 구현했다. 이제 이와 같이 프로필 부분과 이전 및 다음 페이지, 댓글 폼을 구현해야 한다. "
date: 2022-01-08T05:37:19.520Z
tags: ["CSS","React","next","typescript"]
---
### 진행 사항

현재 나는 Velog의 상세 페이지 부분을 설계하고 있다. [이전 글](https://velog.io/@leehyunho2001/SPACEDEVCLUB-4)에서 작성한것 처럼 상세 페이지의 윗 부분을 구현했다. 

![](/images/0db20b86-c64e-4d30-b186-14547120a8e6-image.png)

이제 이와 같이 프로필 부분과 이전 및 다음 페이지, 댓글 폼을 구현해야 한다. 사실 프로필 부분은 헤더에서 "내 벨로그"를 누르면 상세 페이지의 프로필과 동일한 부분이 사용되고 있다. 내 벨로그 부분 구현을 담당하고 있는 팀원의 컴포넌트를 가져오기로 했다.

이제 이전 및 다음 페이지 구현 차례이다. 원래는 Velog와 동일한 방법으로 구현하려고 했으나 이전 또는 다음 페이지로 가는 것이 아니라 전체 시리즈에서 결정할 수 있다면 사용자에게 더 좋을것이라고 생각했다. 그래서 Carousel로 구현하려고 한다.

<br>

### 구현

![](/images/c2b59c8d-676a-4ce0-8dbb-7316850f010d-image.png)

현재 상세 페이지는 LeftHeader, DetailHeader, Righter로 구성되어 있고 각각 flex값을 1, 2, 1 을 주었다. 

![](/images/b7148bb4-f250-4453-b23a-e6fba279ebac-image.png)

구현하며 생각해보니 상세 페이지의 본문(쉽게 말해 벨로그 글이 보이는 부분)은 DetailHeader 아래에 들어가야 하며 위에서 언급한 구현해야하는 부분들도 여기에 들어가야 한다. 나중에 DetailHeader 컴포넌트의 이름을 바꿔줘야겠다.

```jsx
export const DetailHeader = () => {
  return (
    <Header>
      <h2>글제목</h2>
      <UDHashContainer />
      <SeriesContainer />
      <Intro />
      <Carousel />
    </Header>
  );
};
```

프로필은 Intro 컴포넌트를 가져와 추가해주었고, Carousel은 컴포넌트로 미리 불러왔다. (아직 Carousel 컴포넌트는 안에 내용이 없다.)

```jsx
export const Carousel = () => {
  const src = [
    "https://cdn.pixabay.com/photo/2021/12/12/18/04/mountains-6865752_960_720.jpg",
    "https://cdn.pixabay.com/photo/2021/11/09/15/32/christmas-6781762_960_720.jpg",
    "https://cdn.pixabay.com/photo/2021/12/21/14/47/castle-6885449_960_720.jpg",
  ];
  const href = ["#", "#", "#"];
  const title = ["시리즈1", "시리즈2", "시리즈3"];
  const [caroucelIndex, setCaroucelIndex] = useState(0);
  
	//... (코드는 밑에서 설명)
};
```

먼저 Carousel에 들어올 이미지, 링크, 타이틀의 값을 임의로 설정했다. 이미지만 봐서는 사용자가 무슨 글인지 파악하기 힘들것 같아 타이틀도 받게 되었다. DB에서 데이터를 가져올 것이기 때문에 배열로 넣었다.

```jsx
  return (
      <CarouselContainer>
        <CarouselItem index={caroucelIndex}>
          {src.map((s, i) => {
            return (
              <Link href={href[i]} key={`carousel-${s}`}>
                <a>
                  <p>{title[i]}</p>
                  <Img src={s} alt="" />
                </a>
              </Link>
            );
          })}
        </CarouselItem>
      </CarouselContainer>
  );
```
Carousel의 구조이다. 이미지 src값이 저장된 src변수에서 map을 돌려 Carousel 요소들을 하나하나 생성해주고 있다.

```jsx
const CarouselContainer = styled.article`
  flex: 2;
  width: 400px;
  height: 250px;
  overflow: hidden;
`;
```

먼저 CarouselContainer에 크기를 지정해주고 `overflow: hidden;`값을 주었다. map에서 첫번째로 생성한 Link태그를 가진 이미지만 보이게 된다. 나머지는 이 이미지 밑에있을 것이다.(보이지는 않지만 개발자 도구로 확인해 볼 수 있다.)

```jsx
const CarouselItem = styled.div`
  display: flex;
  ${caroucelIndex}
  transition: all 1s ease-in-out;
`;
```

이제 어떤식으로 Carousel을 설계할지 생각봐야 한다. 이미지가 상하로 움직이도록 할 것인지 또는 좌우로 움직일 것인지 말이다. 역시 좌우가 최고다.

먼저 flex 속성을 부여한다. 현재 이미지가 하나만 보이지만 overflow에 가려져서 그렇지 밑에 차례대로 존재한다. flex를 부여함으로써 수평으로 존재하게 만든다. 그래야 이전 또는 다음 버튼 눌렀을때 이미지가 좌 우로 움직일 것이다.

transition은 부드럽게 이동하라고 넣어주었고, `${caroucelIndex}`은 다음 설명을 보자.

```jsx
import { css } from "@emotion/react";

type IndexTypeProps = {
  index: number;
};

const caroucelIndex = (props: IndexTypeProps) => css`
  transform: translate3d(-${500 * props.index}px, 0, 0);
`;

const Img = styled.img`
  width: 500px;
  height: 500px;
`;
```

이전 또는 다음 버튼을 누름에 따라 이미지가 좌우로 움직여야한다. 다른 방법도 있겠지만 `translate3d` 속성을 사용해보자. 이 속성은 Reflow를 하지 않고, Repaint를 하는 속성이기 때문이다. ([React 가상돔 - reflow, repaint설명 첨부](https://velog.io/@leehyunho2001/React))

좌우로 움직이기 때문에 `translate3d`에서 x축만 사용할 것이. 이전 버튼을 누르면 0이어야 할 것이고, 다음 버튼을 누르면 image의 크기만큼 이동하면 된다.

인덱스에 따라서 값이 변경되어야 하는데, Emotion에서 사용하기 위해서는 위와 같이 사용해야한다. 그리고 caroucelIndex를 CarouselItem을 스타일 하는 부분에서 `${caroucelIndex}`으로 받으면 스타일이 적용된다. render부분에서`<CarouselItem index={caroucelIndex}>` 와 같이 index를 props로 넘겨주면 끝이다.

<br>

undefined

첫 번째 이미지에서는 왼쪽 버튼이 사라지고, 마지막 이미지에서는 오른쪽 버튼이 사라지도록 설계해주었다. 

### 전체 코드
```jsx
import { useState } from "react";
import styled from "@emotion/styled";
import { css } from "@emotion/react";
import Link from "next/link";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { PALLETS } from "../../constants/index";

type IndexTypeProps = {
  index: number;
};

export const Carousel = () => {
  const src = [
    "https://cdn.pixabay.com/photo/2021/12/12/18/04/mountains-6865752_960_720.jpg",
    "https://cdn.pixabay.com/photo/2021/11/09/15/32/christmas-6781762_960_720.jpg",
    "https://cdn.pixabay.com/photo/2021/12/21/14/47/castle-6885449_960_720.jpg",
  ];
  const href = ["#", "#", "#"];
  const title = ["시리즈1", "시리즈2", "시리즈3"];
  const [caroucelIndex, setCaroucelIndex] = useState(0);

  const handlePrevBtn = () => {
    if (caroucelIndex === 0) return;
    setCaroucelIndex(caroucelIndex - 1);
  };
  const handleNextBtn = () => {
    if (caroucelIndex === src.length - 1) return;
    setCaroucelIndex(caroucelIndex + 1);
  };
  console.log(caroucelIndex);

  return (
    <Container>
      <PrevContainer>
        {caroucelIndex === 0 ? (
          <div></div>
        ) : (
          <Btn type="button" onClick={handlePrevBtn}>
            <ArrowBackIcon />
          </Btn>
        )}
      </PrevContainer>
      <CarouselContainer>
        <CarouselItem index={caroucelIndex}>
          {src.map((s, i) => {
            return (
              <Link href={href[i]} key={`carousel-${s}`}>
                <a>
                  <p>{title[i]}</p>
                  <Img src={s} alt="" />
                </a>
              </Link>
            );
          })}
        </CarouselItem>
      </CarouselContainer>
      <NextContainer>
        {caroucelIndex === src.length - 1 ? (
          <div></div>
        ) : (
          <Btn type="button" onClick={handleNextBtn}>
            <ArrowForwardIcon />
          </Btn>
        )}
      </NextContainer>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const CarouselContainer = styled.article`
  flex: 2;
  width: 400px;
  height: 250px;
  overflow: hidden;
`;
const caroucelIndex = (props: IndexTypeProps) => css`
  transform: translate3d(-${500 * props.index}px, 0, 0);
`;
const CarouselItem = styled.div`
  display: flex;
  ${caroucelIndex}
  transition: all 1s ease-in-out;
`;
const Img = styled.img`
  width: 500px;
  height: 500px;
`;
const PrevContainer = styled.div`
  flex: 1;
`;
const NextContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: end;
`;
const Btn = styled.button`
  width: 50px;
  height: 50px;
  color: ${PALLETS.MAIN};
  font-size: 32px;
  border: 1px solid rgb(173, 181, 189);
  border-radius: 50%;
  :hover {
    background-color: ${PALLETS.MAIN};
    color: #fff;
    border: 1px solid ${PALLETS.MAIN};
  }
`;
```

<br>

### 마무리

```jsx
  const detailData = {
    id: 0,
    content: [
      {
        src: "https://cdn.pixabay.com/photo/2021/12/12/18/04/mountains-6865752_960_720.jpg",
        href: "1",
        title: "시리즈1",
      },
      {
        src: "https://cdn.pixabay.com/photo/2021/11/09/15/32/christmas-6781762_960_720.jpg",
        href: "2",
        title: "시리즈2",
      },
      {
        src: "https://cdn.pixabay.com/photo/2021/12/21/14/47/castle-6885449_960_720.jpg",
        href: "3",
        title: "시리즈3",
      },
    ],
  };
```

생각해보니 데이터는 json 형태로 받을 것 같다. 그 부분을 수정했다. 이제 다시 pr날리자..