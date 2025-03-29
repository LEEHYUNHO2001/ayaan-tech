---
title: "SPACE_DEV_CLUB -7"
description: "상세 페이지 UI 리펙토링"
date: 2022-01-16T07:48:05.267Z
tags: ["React","next","typescript"]
---
undefined

전체적인 동작은 위와 같다. 전체적인 UI는 Velog의 상세 페이지와 유사하게 설계해주었다. 이전 및 다음 페이지는 Velog와 다르게 캐러셀로 적용해주었다. 

이번에는 미디어쿼리를 적용하다 어려웠던 점을 말해보려고 한다. 현재 좋아요 및 공유하기라는 왼쪽 `sticky` 부분이 존재하기 때문에 작은 화면에서의 좋아요 버튼을 구현하기 쉽지 않았다.

![](/images/2dfb8a14-74e6-403e-85fc-97efdd3b77ba-image.png)

현재 좋아요 버튼은 sticky 속성이 부여되어있다. 이 부분이 화면의 가로길이가 줄어들게 되면 통계 수정 삭제 밑에 위치되야 한다. 

```jsx
      <MiniHeart onClick={handleHeart}>
        <h3 className="sr-only">미니 좋아요 버튼</h3>
        <MiniContainer
          className={`circleBtn ${!heartClick ? "heartOff" : "heartOn"}`}
        >
          <FavoriteIcon className="miniheart" />
          <MiniHeartCounter>{heartNum}</MiniHeartCounter>
        </MiniContainer>
      </MiniHeart>
```

미디어 쿼리를 이용하여 특정 크기로 변경되면, MiniHeart가 나타나고 원래 있던 좋아요 및 공유하기 버튼은 사라진다.
정 삭제
하지만 MiniHeart도 `sticky` 속성을 가지고 있기 때문에 통계 수정 삭제 밑에 위치하기 애매하다.

```css
const MiniContainer = styled.div`
  display: flex;
  width: 55px;
  height: 24px;
  justify-content: space-around;
  align-items: center;
  border: 1px solid ${PALLETS_LIGHT.BORDER};
  border-radius: 20px;
  padding: 0 5px;
  box-sizing: border-box;
`;
```

먼저 작은 화면에서의 좋아요 버튼 디자인을 해주었다. 이제 위치시켜야한다.

```css
  @media screen and (max-width: 1025px) {
    position: absolute;
    top: -130px;
    right: -380px;
    display: block;

    .miniheart {
      width: 12px;
      height: 12px;
    }
    .heartOn {
      color: ${PALLETS_LIGHT.BACKGROUND};
      border: none;
      background-color: ${PALLETS_LIGHT.MAIN};
    }
    .heartOff {
      color: ${PALLETS_LIGHT.BORDER};
    }
  }
```

MiniHeart에 position 속성을 부여했다. 그리고 화면이 줄었을 때, MiniHeart의 상위에 있는 컨테이너에도 미디어쿼리로 position을 sticky에서 absolute로 변경하여 해결했다.

> 2022-01-16 회의

이제 어느정도 UI를 구현했다. 현재 상세 페이지에서 부족한 부분은 DB에서 글을 불러와 사용자가 작성한 글을 보여주는 부분이다. 

이제 정말 Back단이 필요해지고있다. 이번주에는 strapi 사용법과 DB 연결하는 부분을 학습해보려고 한다.

UI에서 생각해볼 부분은 캐러셀 디자인과 다크모드이다.