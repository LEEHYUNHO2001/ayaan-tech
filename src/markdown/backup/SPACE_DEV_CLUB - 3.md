---
title: "SPACE_DEV_CLUB - 3"
description: "나는 6명으로 구성된 팀과 Velog와 유사한 기능을 수행하는 프로젝트를 설계하고 있다."
date: 2022-01-04T13:24:41.474Z
tags: ["React","next","typescript"]
---
## 프로젝트 설계 시작

### 역할

나는 6명으로 구성된 팀과 Velog와 유사한 기능을 수행하는 프로젝트를 설계하고 있다. 2번의 회의와 중간에 수 많은 커뮤니케이션으로 스택과 프로젝트 방향을 결정하고 역할 분배를 했다. 나의 역할은 **상세 페이지**이다.

<br>

### Velog 상세 페이지 분석

![](/images/9b48e413-b9cd-461f-b23a-fcfa8d241f1a-image.png)

상세 페이지에 들어가면 가장 먼저 보이는 윗 부분부터 분석해보자.

<br>

![](/images/afb692f7-2dbe-4f24-b7d1-c9ce4898f072-image.png)

상세 페이지 외에도 존재하는 최상위 헤더부터 보자.

* V모양의 아이콘은 Velog의 Home, 계정 부분은 작성자의 게시글 페이지로 보내준다. 

* 돋보기 모양은 작성자 글을 검색하는 페이지로 넘어간다. 실제로 `/search?username=leehyunho2001` 의 주소로 넘어간다.

메인 페이지의 헤더와 살짝 다르다. 그래서 일단 상세 페이지에서 따로 구현하지 않았다. (나중에 메인 페이지의 헤더가 완성되면 거기서 기능 한 두개 제거하면 된다.)

<br>

![](/images/9966d04a-efd3-4688-a97d-391001cf20ed-image.png)

방금 우리가 본 것이 헤더였다면, 나는 이 부분을 상세 페이지의 헤더라고 명시했다. 실제로 모든 상세 페이지의 상단에 존재하고 있기 때문이다.

상세 페이지의 헤더는 flex값을 1, 3, 1을 주어 공간을 나눠주었다.
왼쪽 부터 순서대로 LeftHeader, DetailHeader, RightHeader 컴포넌트이다.

<br>

![](/images/e78b83c9-afaa-4323-9877-78f915c366ed-sdfhs.gif)


**LeftHeader** 와 **RightHeader**부터 보자. 

* **LeftHeader**

하트 모양을 클릭하면 좋아요 숫자도 늘어나고 DB에 저장되는 형태이다. 공유하기 버튼을 누르면 페이스북, 트위터, 클립보드 버튼도 생긴다. 마지막으로 스크롤시 특정 부분부터 `fixed` 되는 것을 볼 수 있다.

* **RightHeader**
상세 페이지에 저장된 데이터(게시글 내용)에서 ### 와 같은 헤더를 사용한 부분을 찾아 목차를 만들어주고 있다. LeftHeader와 마찬가지로 특정 부분에서 fixed된다.

<br>

![](/images/724ad14e-d3e3-475e-aa2b-48d046ad7876-image.png)

**DetailHeader**은 2개의 컴포넌트로 나누어주고 있다.

<br>

![](/images/e91e8341-4fe5-4b12-8328-3dd0717e5dc9-image.png)

위에 있는 컨테이너는 **UDHashContainer**이다. 게시글의 제목, 작성자와 글이 생성된 시간, CRUD에서 UD와 통계, 해시태그가 있다.

작성자를 클릭하면 작성자의 글로 가고, 해시태그를 클릭하면 Velog에서 해당 해시태그로 작성된 글 목록을 보여주는 페이지로 넘어간다.

<br>

![](/images/e00891e7-a41e-4816-ab4f-101a4ecef346-image.png)

아래의 컨테이너는 **SeriesContainer**이다. 말 그대로 시리즈에 관련된 컨테이너이다. 

![](/images/e2d6f484-6cdf-4fa4-abd2-96470b45d5d4-image.png)

목록 보기를 클릭하면 시리즈의 목록을 보여준다. 현재 시리즈의 위치도 나타나있다. 페이지 네이션은 마지막 글이나 첫 글이면 hover와 click이 금지되어야 한다.

<br>

### 구현

![](/images/fc893475-822e-496f-8205-3e865665c754-image.png)

벨로그의 트레이드 마크 색은 초록색이다. 우리가 선정한 색은 보라색(?) 이다. 이제 정말 구현으로 가보자.

<br>

```jsx
//pages/details/index.tsx
const DetailsIndexPage: NextPage = () => {
  return (
    <DetailContainer>
      <LeftHeader />
      <DetailHeader />
      <RightHeader />
    </DetailContainer>
  );
};
```

상세 페이지의 디렉터리를 생성해주고 index.tsx에서 컴포넌트들을 관리하고 있다. 상세 페이지의 윗 부분 말고 본문과 하단에도 많은 기능들이 있어 이렇게 관리해야 유지보수가 쉬워질 것이다.

<br>

#### LeftHeader

```jsx
export const LeftHeader = () => {
  const [heartNum, setHeartNum] = useState(0);
  const [heartClick, setHeartClick] = useState(false);
  const [shareClick, setShareClick] = useState(false);

  const handleHeart = () => {
    let num = heartNum;

    setHeartClick(!heartClick);
    !heartClick ? (num += 1) : (num -= 1);
    setHeartNum(num);
 };

  const handleShare = () => {
    setShareClick(!shareClick);
  };

  return (
    <Container>
      <article>
        <div onClick={handleHeart}
          className={`circleBtn ${!heartClick ? "heartOff" : "heartOn"}`}>
          {/* 하트 svg */}
        </div>
        <p className="heartCounter">{heartNum}</p>
        <div className="circleBtn" onClick={handleShare}>
          {/* 공유하기 svg */}
        </div>
        <div className={`circleBtn ShareItem ${
            !shareClick ? "ShareOff" : "ShareItem1"}`}>
          <Link href="#">
            <a>
              {/* 메타 svg */}
            </a>
          </Link>
        </div>
        <div className={`circleBtn ShareItem ${
            !shareClick ? "ShareOff" : "ShareItem2"}`}>
          <Link href="#">
            <a>
              {/* 트위터 svg */}
            </a>
          </Link>
        </div>
        <div className={`circleBtn ShareItem ${
            !shareClick ? "ShareOff" : "ShareItem3"}`}>
          <Link href="#">
            <a>
              {/* 클립보드 svg */}
            </a>
          </Link>
        </div>
      </article>
    </Container>
  );
};
```

좋아요 기능과 공유하기 기능이 있는 LeftHeader 이다. 좋아요를 누르면 좋아요 숫자가 올라가야한다. 현재는 `setHeartClick(!heartClick);
    !heartClick ? (num += 1) : (num -= 1);` 으로 처리되어있는데 한 사람이 좋아요를 계속 누르지 못하게 한 것이다. 아직 로그인을 구현하지 않았기때문에 0과 1에서만 움직인다. 추후에 다른 아이디로 로그인된 유저들이 좋아요 버튼은 누를 수 있도록 구현해야 할 것이다.

그리고 `heartClick`에 따라 좋아요 버튼은 다른 디자인을 갖게 된다. (className을 보면 이해가 갈 것이다.)

이제 공유하기 버튼이다. 공유하기 버튼을 클릭하면 페이스북, 트위터, 클립보드 이미지가 등장한다. 좋아요 버튼과 비슷하게 클릭을 할경우 `onClick 이벤트`에 가서 `shareClick`값이 결정된다.

```css
const Container = styled.section`
  flex: 1;
  display: flex;
  justify-content: end;

  article {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    background-color: #f8f9fa;
    border-radius: 40px;
    width: 70px;
    height: 150px;
    margin: 220px 80px 0 0;
  }

  /* 스크롤 어느정도 내려올 경우 leftOn 클래스 add 해야함 -> 아직 미구현*/

  .circleBtn {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #adb5bd;
    border: 1px solid #adb5bd;
    background-color: none;
    border-radius: 50%;
    cursor: pointer;
  }
  a {
    color: #adb5bd;
  }
  .circleBtn:hover > a {
    color: #000;
  }
  .circleBtn:hover {
    color: #000;
    border: 1px solid #000;
  }

  .heartOn {
    color: #fff;
    border: none;
    background-color: ${PALLETS.MAIN};
  }
  .heartOn:hover {
    color: #fff;
    border: none;
    opacity: 0.8;
  }
  .heartOff {
    color: rgb(173, 181, 189);
    border: 1px solid rgb(173, 181, 189);
    background-color: none;
  }

  .heartCounter {
    color: #495057;
    font-size: 12px;
    font-weight: 700;
  }

  .ShareOff {
    position: absolute;
    transform: translateX(0px) translateY(40px);
    transition: all 0.5s ease-in-out;
    display: flex;
    z-index: -1;
  }
  .ShareItem {
    position: absolute;
    transition: all 0.5s ease-in-out;
  }
  .ShareItem1 {
    transform: translateX(60px) translateY(-10px);
  }
  .ShareItem2 {
    transform: translateX(90px) translateY(40px);
  }
  .ShareItem3 {
    transform: translateX(60px) translateY(90px);
  }
`;

```

![](/images/fd0a425d-66a6-4621-9804-bda0f8a075d7-share.gif)

아직 기능부분은 DB연결이 안되어 있어 부족하지만 UI는 거의 완성된 LeftHeader이다. 사실 위에서 쉽게 얘기했지만 구현하는데 꽤 시간이 걸렸다.

<br>

#### DetailHeader

```jsx
//components/Details/DetailHeader.tsx
export const DetailHeader = () => {
  return (
    <Header>
      <h2>글제목</h2>
      <UDHashContainer />
      <SeriesContainer />
    </Header>
  );
};

const Header = styled.section`
  display: flex;
  flex: 2;
  flex-direction: column;
  margin-top: 32px;
  h2 {
    font-size: 48px;
    margin-bottom: 32px;
  }
`;
```

`DetailHeader`는 글 제목, `UDHashContainer`, `SeriesContainer` 컴포넌트로 나누어져 있다.

<br>

* **UDHashContainer**

```jsx
export const UDHashContainer = () => {
  return (
    <Container>
      <UDContainer>
        <a href="#" className="velog-nickname">
          velog닉네임
        </a>
        <div>
          <a href="#">통계</a>
          <a href="#">수정</a>
          <a href="#">삭제</a>
        </div>
      </UDContainer>
      <ul>
        <li>
          <a href="#">태그입니다1</a>
        </li>
        <li>
          <a href="#">태그입니다2</a>
        </li>
      </ul>
    </Container>
  );
};

const Container = styled.article`
  ul {
    display: flex;
    margin: 16px 0;
  }
  ul > li {
    background-color: #f1f3f5;
    border-radius: 25px;
    padding: 5px 15px;
  }
  ul > li:not(:last-child) {
    margin-right: 15px;
  }
  ul > li:hover {
    background-color: #f8f9fa;
  }
  ul > li > a {
    color: ${PALLETS.MAIN};
  }
`;
const UDContainer = styled.div`
  display: flex;
  justify-content: space-between;
  .velog-nickname {
    font-weight: 700;
  }
  .velog-nickname:hover {
    text-decoration: underline;
  }
  div > a {
    color: #868e96;
    font-weight: 500;
  }
  div > a:not(:last-child) {
    margin-right: 8px;
  }
  div > a:hover {
    color: #000;
  }
`;
```

![](/images/ec39564f-d5c3-490d-a977-ac6be5651a45-jdg.gif)

어렵지 않은 UI이기 때문에 설명은 생략한다. 태그를 클릭하면 Velog에서 해당 태그를 사용한 게시글을 불러오는 것과 같은 기능들은 다음에 구현하도록 한다.

<br>

* **SeriesContainer**

```jsx
export const SeriesContainer = () => {
  const [select, setSelect] = useState(false);
  const handleSeries = () => {
    setSelect(!select);
  };
  return (
    <Container>
      <h3>
        <a href="#">시리즈제목</a>
      </h3>
      <SeriesSVG
        width="32"
        height="48"
        fill="none"
        viewBox="0 0 32 48"
        className="series-corner-image"
        >
        <path
          fill={`${PALLETS.MAIN}`}
          d="M32 0H0v48h.163l16-16L32 47.836V0z"
          ></path>
      </SeriesSVG>
      {select && (
        <ol>
          <li className="aaaa">
            <a href="#">시리즈1</a>
          </li>
          <li className="aaaa">
            <a href="#" className="on">
              시리즈2
            </a>
          </li>
          <li className="aaaa">
            <a href="#">시리즈3</a>
          </li>
        </ol>
      )}
      <SPContainer>
        <SelectBox onClick={handleSeries}>
          {select ? (
            {/* 아래쪽 토글 svg */}
          ) : (
            {/* 위쪽 토글 svg */}
          )}
          <span>{select ? "숨기기" : "목록 보기"}</span>
        </SelectBox>
        <Pagination>
          <span>2/3</span>
          <div>
            <button>
              {/* 왼쪽 토글 svg */}
            </button>
            <button>
              {/* 오른쪽 토글 svg */}
            </button>
          </div>
        </Pagination>
      </SPContainer>
    </Container>
  );
};
```
시리즈에 관련된 내용이 있는 컴포넌트다. pagination기능도 있고 시리즈의 목록도 보여야 한다. 일단 버튼과 Select Box 부분을 설계해주었다.

```css
/* 시리즈 제목과 svg 컨테이너 */
const Container = styled.article`
  margin-top: 32px;
  padding: 32px 24px;
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: #f8f9fa;
  h3 {
    padding-bottom: 32px;
    font-size: 24px;
  }
  h3 > a:hover {
    color: #868296;
    text-decoration: underline;
  }
  div {
    display: flex;
    justify-content: space-between;
  }

  ol {
    margin-bottom: 60px;
    counter-reset: item 0;
  }
  ol > li > a {
    color: #495057;
    line-height: 30px;
  }
  /* 현재 상세 페이지가 해당 시리즈의 글일 경우 */
  ol > li > a.on {
    color: ${PALLETS.MAIN};
    font-weight: 700;
  }
  ol li::before {
    counter-increment: item;
    content: counter(item) ". ";

    color: rgb(173, 181, 189);
    font-style: italic;
    margin-right: 5px;
  }
  ol > li > a:hover {
    text-decoration: underline;
  }
`;
const SeriesSVG = styled.svg`
  position: absolute;
  top: 0;
  right: 30px;
`;
// 시리즈 목록 보기 select 박스 부분과 다음 이전 버튼 컨테이너
const SPContainer = styled.div``;
const SelectBox = styled.div`
  cursor: pointer;
`;
const Pagination = styled.div`
  /*  현재 글/시리즈 글 갯수 */
  span {
    margin-right: 20px;
    color: #adb5bd;
  }
  /* 마지막 페이지면 넘어가기 호버 및 클릭 막기 */
  button {
    color: ${PALLETS.MAIN};
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    border: 1px solid rgb(241, 243, 245);
    border-radius: 50%;
    font-size: 20px;
  }
  button:hover {
    background-color: ${PALLETS.MAIN};
    color: #fff;
  }
`;
```

![](/images/9a36b4b8-e1f9-4d89-8087-04567122e184-series.gif)

`select` 상태를 이용하여 `목록 보기`와 `숨기기`를 구현했다. `{select ? "숨기기" : "목록 보기"}` 와 같이 말이다.

그리고 목록 보기를 클릭했을 경우 시리즈 목록들이 나오는데, 옆에 번호가 매겨져있다. Velog에서 이 번호가 스타일이 되어있었다. ol 태그의 번호 카운트를 어떻게 스타일 할 수 있을지 구글링해보았다.

![](/images/9442adcf-c94a-44f2-a418-344f5ce61d9b-image.png)

**before 가상요소**로 해결할 수 있다. Velog도 before 가상요소로 번호를 추가해주고 있다.


ol 태그에 먼저 `counter-reset: item 0;`를 넣어준다. item 변수를 사용하는데 리셋해주는 것이다. 그 후 li의 가상요소에 `    counter-increment: item;`, `content: counter(item) ". ";` 을 넣어주면 카운트 된다. 이제 스타일만 하면 끝이다.

<br>

#### RightHeader

```jsx
import styled from "@emotion/styled";
import { useState } from "react";

export const RightHeader = () => {
  const [listData, setListData] = useState(["프로젝트 설계 시작", "역할"]);
  return (
    <Container>
      <h2 className="sr-only">목차</h2>
      {listData.length === 0 ? (
        <div></div>
      ) : (
        <article>
          {listData.map((str) => {
            return <div key={`Detail-List-${str}`}>{str}</div>;
          })}
        </article>
      )}
    </Container>
  );
};

const Container = styled.section`
  flex: 1;
  padding: 20px 0 0 50px;
  article {
    padding: 8px 10px;
    border-left: 2px solid rgb(233, 236, 239);
  }
  div {
    font-size: 14px;
    color: #868e96;
  }
  div:not(:last-child) {
    margin-bottom: 5px;
  }
  div.h4 {
    margin-left: 12px;
  }
`;

```

마지막으로 Velog 상세 페이지에서 오른쪽에 목차가 나타나는 부분이다. 본문에서 ####과 같은 헤더를 사용해야 나타나기 때문에 그 부분 데이터를 받아와야한다. 받아온 데이터를 map을 이용하여 출력해주고 있다.(아직 실제로 받아오지는 않았음) 
그리고 데이터가 있을 경우에만 RightHeader는 존재한다.

<br>

### PR

![](/images/3afc57f8-4926-4c2c-ba0a-c8e19e6e020d-image.png)

pull request를 날렸다. 컨플리트 없이 잘 merge 되었다.

> 마무리

오늘은 상세 페이지의 상단 부분만 설계해보았다. 본문 내용은 DB에서 데이터를 받아와 뿌려주면 될 것 같다. 

![](/images/94cff828-e048-4b42-b311-b35e03b7c7af-image.png)

![](/images/ed4f78b0-1b14-431b-aa49-d1e42e9fa44e-image.png)

하지만 하단에 뭐가 잔뜩 있어 아직도 할게 많다...