---
title: "SPACE_DEV_CLUB - 15"
description: "시리즈 연결 및 접근제어에 대한 작업을 했다.  그리고 리팩토링 시도와 문제점을 발견했다."
date: 2022-02-22T09:33:12.145Z
tags: ["React","next","typescript"]
---
## 시리즈

### 상세 페이지 시리즈 박스

```jsx
//pages/[id]/[details]/index.tsx
let series = [
  {
    id: 0,
    //...
  }
];
    
export const PostContext = createContext({
  postid: postid,
  postObj: postObj,
  series: series,
});

const DetailsIndexPage: NextPage = () => {
	//...
    const { data: SeriesBoxData, error: SeriesBoxError } = useData(
    "series-boxes",
    "populate=*"
  );
  
  if (!DetailData || !SeriesBoxData) return <div>로딩중</div>;
  if (DetailError || SeriesBoxError) return <div>에러</div>;
  
  const series = SeriesBoxData.data;
  //...
  return(
    <PostContext.Provider value={{ postid, postObj, series }}>
    //...
    </PostContext.Provider>
    )
}
```

index에서 post에 대한 데이터를 받아오고 있었다. 이제 시리즈 박스에 대한 데이터도 받아오고, ContextAPI에 series도 추가했다.

<br>

![](/images/3b2f8fca-96cc-45c1-bb95-87e770c4e016-image.png)

구현할 기능들을 먼저 살펴보자. 시리즈 제목인 스트라피를 클릭했을 때, `/유저/series/스트라피` 의 경로로 이동한다. 그리고 시리즈에서 현재 글은 리스트에서 보라색이어야 하며 다른 글을 클릭하면 해당 글로 이동한다.

마지막으로 시리즈에서 글의 총 갯수와 현재 글을 나타내야하고 첫 번째 글이여서 이전 글이 없으면 이전 버튼은 비활성화 되며 마지막 글이여서 다음글이 없으면 다음 버튼이 비활성화 되야 한다.

<br>

```jsx
//SeriesContainer.tsx
  const { postid, postObj, series } = useContext(PostContext);

  const userId = postObj.userid.data.id;
  const seriesBox = series.filter(
    (s) => userId === s.attributes.userid.data.id
  )[0];
  const userName = seriesBox.attributes.userid.data.attributes.userid;
  const SeriesBoxPost = seriesBox.attributes.post.data;
  const currentPost = SeriesBoxPost.map((data, i) => {
    if (data.id === postid) return i + 1;
  }).filter((index) => index)[0];

  const onClickBtn = (type: string) => {
    if (type === "prev" && currentPost !== 1) {
      const link = SeriesBoxPost[currentPost! - 2].attributes.url;
      router.push(`/${userName}/${link}`);
    }
    if (type === "next" && currentPost !== SeriesBoxPost.length) {
      const link = SeriesBoxPost[currentPost!].attributes.url;
      router.push(`/${userName}/${link}`);
    }
  };
```

`seriesBox`는 현재 글의 시리즈 박스가 있다. `currentPost`에는 현재 상세 페이지가 시리즈에서 몇 번째 글인지 값을 넣었다.

onClickBtn은 type으로 이전 버튼인지 다음 버튼인지 구별하며, 위에서 언급한 제한 사항들을 적용해주었다.

<br>

```jsx
//SeriesContainer.tsx
<NextBtn
  onClick={(e) => onClickBtn("next")}
  currentPost={currentPost}
  SeriesBoxPostLength={SeriesBoxPost.length}
  >
  
//opacity: ${({ currentPost }) => (currentPost !== 1 ? 1 : 0.3)};
```

이전 또는 다음 버튼에 제한이 걸리면 UI도 변동이 되므로 css에 값을 넘겨주었다. 이전 글이 없을경우 opacity 속성을 부여했으며 hover나 cursor 들을 제거했다.

<br>

### 하단 시리즈 캐러샐

![](/images/c0c88bf1-b24d-4c05-a7c5-306a44e3e4ea-tt.gif)

이제 하단 캐러샐에 시리즈 데이터들을 연결해보자.

```jsx
//DetailHeader.tsx
export const DetailHeader = ({
  userName,
  userdata,
  loginUserId,
  loginUserName,
}: Props) => {
  const seriesBox = series.filter(
    (s) => userId === s.attributes.userid.data.id
  )[0];
  const SeriesBoxPost = seriesBox.attributes.post.data;

//...
            <SeriesContainer
        seriesBox={seriesBox}
        userName={userName}
        SeriesBoxPost={SeriesBoxPost}
      />
      //...
      <Carousel userName={userName} SeriesBoxPost={SeriesBoxPost} />
}
```

SeriesContainer에서 사용했던 seriesBox 변수는 Carousel 컴포넌트에서도 사용하므로 이제 그의 부모 컴포넌트 DetailHeader에서 생성하기로 했다. seriesBox와 이 안에 relation 되어있는 post의 interface도 DetailHeader에 export로 생성했다. `SeriesBoxPost` 도 마찬가지로 DetailHeader에서 생성하자.

그리고 `const userName = seriesBox.attributes.userid.data.attributes.userid;`으로 글의 주인인 사용자의 닉네임을 가져오고 있었는데, props로 넘겨받던 userName가 있었다. 그래서 저 부분은 제거해주고 이 userName을 사용하기로 했다.

<br>

```jsx
//Carousel.tsx
export const Carousel = ({ SeriesBoxPost, userName }: Props) => {
  const [caroucelIndex, setCaroucelIndex] = useState(0);

  const handlePrevBtn = () => {
    if (caroucelIndex === 0) return;
    setCaroucelIndex(caroucelIndex - 1);
  };
  const handleNextBtn = () => {
    if (caroucelIndex === SeriesBoxPost.length - 1) return;
    setCaroucelIndex(caroucelIndex + 1);
  };

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
          {SeriesBoxPost.map((post, i) => {
            return (
              <Link
                href={`/${userName}/${post.attributes.url}`}
                key={`carousel-post-${i}`}
                passHref
              >
                <CarouselLink>
                  <CarouselTitle>{post.attributes.title}</CarouselTitle>
                </CarouselLink>
              </Link>
            );
          })}
        </CarouselItem>
      </CarouselContainer>
      <NextContainer>
        {caroucelIndex === SeriesBoxPost.length - 1 ? (
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

const caroucelIndex = (props: IndexTypeProps) => css`
  transform: translate3d(-${370 * props.index}px, 0, 0);
`;
```

저번에 목데이터를 연결하여 구현해놓았던 캐러샐에 데이터 부분만 수정해주었다. 그랬더니 정상적으로 동작했다. 역시 데이터가 있다고 생각하고 미리 잘 구현해놓으면 나중에 편하다.

<br>

### 리팩토링 하다가.. ( Strapi 공식문서 )

```jsx
//pages/[id]/[details]/index.tsx
  DetailData.data.some((details: Post) => {
    if (
      userDetails === details.attributes.url &&
      userName === details.attributes.userid.data.attributes.userid
    ) {
      postid = details.id;
      postObj = details.attributes;
      user = details.attributes.userid.data.attributes;
      return true;
    }
  });
```

원래는 모든 게시글에 대한 populate 값을 DetailData에 가져왔다. 

![](/images/6a162866-9713-4f4a-987d-224321d7fdf8-image.png)

그리고 DetailData 배열 안에서 URL에 입력된 유저의 닉네임과 게시글 이름이 있는 데이터를 some 으로 찾아주었다. 이 부분을 데이터를 받아올 때, 쿼리로 넣으려고 한다. [Strapi 공식문서](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/filtering-locale-publication.html#filtering)를 보면 확인해볼 수 있다.

<br>

```jsx
  const { data: DetailData, error: DetailError } = useData(
    "posts",
    `populate=*&filters[url]=${userDetails}&filters[userid][userid]=${userName}`
  );

  postid = DetailData.data[0].id;
  postObj = DetailData.data[0].attributes;
  user = postObj.userid.data.attributes;
```

이제 필터링된 데이터를 가져온다. 받아온 데이터에서 postid, postObj, user을 저장하고, props로 넘겨주거나 conTextAPI에 넣어주었다.

![](/images/7070e2ae-061c-4582-9d67-7a015a0cb383-image.png)

**하지만 관심 있을 만한 포스트에서 전체 데이터가 필요하다. 그래서 리팩토링 하던것을 멈추었다. ~~리셋... ㅠㅠ~~**

<br>

## 댓글 대댓글 접근 제어

댓글과 대댓글의 수정과 삭제 버튼은 로그인한 유저의 글에서만 보이도록 구현했다. 그런데 생각해보니 댓글 생성은 접근 제어를 안했다.

<br>

```jsx
//CommentForm.tsx
  const SubmitComment = async (
    e: React.FormEvent<HTMLFormElement>,
    type: string
  ) => {
    e.preventDefault();
    if (loginUserId) {
      //저번에 구현한 댓글 및 대댓글 생성 수정 기능
    } else{
      alert("로그인 이후에 이용할 수 있습니다.");
    }
  }
```

그래서 로그인한 유저의 ID가 없으면 생성 및 수정이 불가능하도록 if문을 추가했다. 그리고 일단 로그인이 안되어있으면 alert을 띄우기로 했다.

![](/images/36939f1e-a8e1-42f9-84b2-86a1b3cca7f1-image.png)

정상적으로 동작한다. 나중에 이 alert만 모달로 이쁘게 넣으면 될 것 같다.

<br>

## 문제점

![](/images/40ea57de-6bd9-4274-b270-195f479fa4cd-image.png)

시리즈 박스에서 리스트 목록을 클릭하여 페이지를 이동하거나 우측 하단의 좌우 버튼을 이용하여 페이지를 이동할 때, 좋아요 갯수와 캐러샐이 해당 페이지에 맞게 변경되지 않고있다. 새로고침을 해야 적용이 된다.

* 좋아요
좋아요는 mutate를 안해서 그런가 싶어 해당 게시글의 좋아요 데이터를 API END_POINT로 넣었고, 캐러샐은 해당 post의 엔드 포인트로 mutate를 해보았다. 하지만 여전히 UI 수정이 안돼고 있다.
=> 데이터 불러오는 부분을 userEffect안에 두고, postid를 2번째 파라미터로 넣어주는것으로 해결 되었다.

* 시리즈 박스
시리즈 박스는 index에서 useSWR로 데이터를 받아오고 있고, 변수에 데이터를 저장하여 ContextAPI로 관리하고 있다. ContextAPI로 시리즈 박스에서 현재 게시글의 index를 관리하고, 이것을 사용해보기로 했다. 하지만 이 방법으로는 해결되지 않았다.
=> 다음 글에서 해결해보겠다.



