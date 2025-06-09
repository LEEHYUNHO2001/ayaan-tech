---
title: "SPACE_DEV_CLUB - 20"
description: "SSR 에러 해결, 게시글 수정 기능 구현, 스켈레톤 로딩"
date: 2022-04-03T05:10:14.220Z
tags: ["React","next","typescript"]
---
## SSR 하던 중 에러 발견

![](/images/0b3680db-16b5-4a85-a06d-8d2cf88fab0c-image.png)

구현했던 기능에서 갑자기 에러가 나타났다. 위의 기능은 [게시글과 함께 댓글과 대댓글 삭제, 오른쪽 목차](https://velog.io/@leehyunho2001/SPACEDEVCLUB-19-o6vyjxs3) 글에서 오른쪽 목차 구현한 부분이다.

이 에러는 뭔가 [React-responsive](https://velog.io/@leehyunho2001/React-responsive) 글에서 만났던 오류와 비슷한 느낌이 들었다.

<br>

```jsx
//pages/[id][details]/inde.tsx
  useEffect(() => {
    if (typeof document !== "undefined") {
      setIsClient(true);
    }
  }, []);

  if (!isClient)
    return (
      <SkeletonContainer>
        <SkeletonLoading />
      </SkeletonContainer>
    );
```

그래서 조금 변환하여 적용해보았더니 역시 SSR 하면서 생기는 문제점이였다. SSR은 build시 HTML을 생성하는데, document를 사용하려다 보니 에러가 나타난 것이다. 그래서 document를 사용하기 전에 index에서 한번 체크해주었다.

![](/images/1989d481-1fe5-4500-94c3-9d966fcd6d68-image.png)

이제 다시 정상적으로 상세 페이지가 나타나는것을 볼 수 있다.

<br>

## 게시글 수정

![](/images/b42ac498-fd94-430e-bd0a-0a28b437c8be-image.png)

현재 게시글을 작성하는 에디터와 뷰어는 write 디렉터리의 index에 위치하고 있다. 나는 게시글의 수정부분을 write에서 동적라우팅을 하며 들어가도록 위치를 잡았다.
ex ) write/오늘뭐먹지?  ->  오늘뭐먹지? 라는 페이지의 수정 페이지

<br>

```jsx
//write/[update]/inde.tsx
  const userCookieData = Cookies.get("user");
  const loginUserName =
    userCookieData && JSON.parse(userCookieData!).attributes.userid;
  const router = useRouter();

  const { data: PublishedData, error: PublishedDataError } = useData(
    "posts",
    `populate=*&filters[userid][userid]=${loginUserName}&filters[url]=${router.query.update}`
  );

  const { data: UnPublishedData, error: UnPublishedDataError } = useData(
    "posts",
    `populate=*&publicationState=preview&filters[publishedAt][$null]=true&filters[userid][userid]=${loginUserName}&filters[url]=${router.query.update}`
  );

  if (!PublishedData || !UnPublishedData) return <div>Loding</div>;
  if (!userCookieData || PublishedDataError || UnPublishedDataError)
    return <ErrorPage />;
  if (PublishedData.data.length === 0 && UnPublishedData.data.length === 0)
    return <ErrorPage />;
  const DetailData =
    PublishedData.data.length === 0
      ? UnPublishedData.data[0]
      : PublishedData.data[0];

  return (
    <Container>
      <h1 className="sr-only">EditorUpdate</h1>
      <EditorContainer DetailData={DetailData} />
    </Container>
  );
};
```

게시글에는 공개글과 비공개글이 있다. private의 boolean값에 따라 결정되는데, [Strapi 공식문서](https://docs.strapi.io/developer-docs/latest/developer-resources/database-apis-reference/rest/filtering-locale-publication.html#publication-state)를 보면 어떻게 비공개글을 불러올 수 있는지 알 수 있따. 현재 로그인한 유저에게 `오늘뭐먹지?` 라는 `url`을 가진 `post`가(공개 또는 비공개글) 있다면 수정 페이지로 넘어가게 하기 위한 코드를 설계했다.

<br>

```jsx
//write/inde.tsx
<EditorContainer DetailData={null} />
```

`EditorContainer` 컴포넌트는 게시글 작성에서는 `DetailData`를 사용하지 않기 때문에 null값을 넘겨주도록 했다.

<br>

```jsx
//EditorContainer.tsx
  const update = async (
    postTitle: string,
    postContents: string,
    postUrl: string,
    postPublicStatus: Boolean,
    postDescription: string
  ) => {
    await axios({
      method: "put" as Method,
      url: `${API_ENDPOINT}/posts/${DetailData?.id}`,
      data: {
        data: {
          title: postTitle,
          contents: postContents,
          url: postUrl,
          private: postPublicStatus,
          description: postDescription,
          hastags: listTagDatas,
        },
      },
    });
    document.location.href = `/${DetailData?.attributes.userid.data.attributes.velogtitle}/${DetailData?.attributes.url}`;
  };
```

그리고 `EditorContainer` 컴포넌트에 `update` 를 하기위한 함수를 하나 생성했다. 

```jsx
//EditorContainer.tsx
  const [title, setTitle] = useState<string>(
    DetailData === null ? "" : DetailData?.attributes.title!
  );
  const [contents, setContents] = useState<string>(
    DetailData === null ? "" : DetailData?.attributes.contents!
  );
  const [listTagDatas, setListTagDatas] = useState<Array<string>>(
    DetailData === null
      ? []
      : DetailData?.attributes.hashtags.data.map(
          (data) => data.attributes.name
        )!
  );
```

또한, DetailData 데이터가 있는 경우에는 에디터에 해당 데이터가 들어가 있어야 하므로 초기화도 해주었다.

```jsx
//EditorContainer.tsx
  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    DetailData === null
      ? write(title, contents, writeUrl, isPrivate, infoPost)
      : update(title, contents, writeUrl, isPrivate, infoPost);
  };
```

마지막으로 `handleSubmit` 하는 곳에서 DetailData 유무에 따라 게시글 작성 혹은 게시글 수정을 수행하도록 했다.

![](/images/96c7d037-59ae-4520-8d93-3294c04421e6-ggggg.gif)

<br>

### 상세 페이지 비공개 Post

```jsx
//pages/[id]/[details]/index.tsx
export const getServerSideProps = async (context: any) => {
  const id = context.query.id;
  const detail = qs.stringify({ v: context.query.details }).substring(2);
  const userid = qs.stringify({ v: id }).substring(2);
  const PublishedData = await axios.get(
    `${API_ENDPOINT}/posts?populate=*&filters[userid][userid]=${userid}&filters[url]=${detail}`
  );

  const UnPublishedData = await axios.get(
    `${API_ENDPOINT}/posts?populate=*&publicationState=preview&filters[userid][userid]=${userid}&filters[url]=${detail}`
  );

  const detailRes = await axios.get(`${API_ENDPOINT}/posts?populate=*`);

  let data =
    PublishedData.data.data.length === 0
      ? UnPublishedData.data.data[0]
      : PublishedData.data.data[0];
  if (!data) data = { attributes: {} };
  const allDatas = detailRes.data.data;

  return {
    props: {
      data,
      id,
      allDatas,
    },
  };
};
```

상세 페이지는 현재 공개 페이지만 들어 갈 수 있다. 비공개 페이지도 들어갈 수 있도록 코드를 리팩토링했다. 그리고 data에 어떠한 페이지 값도 들어가있지 않으면, SSR 에러가 나타난다. 그래서 초기화는 해주었다.

```jsx
//pages/[id]/[details]/index.tsx
  if (postObj.private && loginUserId !== postObj.userid.data.id)
    return <ErrorPage />;
```

![](/images/0380a8dc-6946-4209-a8a5-9a660d20832c-image.png)

상세 페이지가 비공개인 경우에 로그인한 유저와 Post를 작성한 유저가 불일치할 경우 에러 페이지로 넘어가도록 했다.

<br>

## 스켈레톤 로딩

### 사용

```jsx
//[id]/[details]/index.tsx
  const { data: DetailData, error: DetailError } = useData(
    "posts",
    "populate=*"
  );

  if (!DetailData) return <SkeletonLoading />;
  if (DetailError) return <ErrorPage />;
```

DetailData이 없을 경우 로딩중이라는 글자만 UI에 출력하고 있었다. 이제 스켈레톤 로딩을 적용해보려고 한다. 스켈레톤 로딩 UI 컴포넌트를 위와 같이 사용해주면 된다.

<br>

### 동작

![](/images/392198cf-2519-4e5b-9018-cdbac0c1a175-jjj.gif)

로딩이 진행중이라는 듯이 구조가 잡힌 UI가 흐려졌다 진해졌다를 반복한다.

![](/images/70c2cb91-983e-4e85-9cdd-6d2101124bf5-image.png)

빨간 박스 부분을 보면 사각형이 5개 있다. 이것은 배열로 둘 것이다.

<br>

### 구현

```jsx
//SkeletonLoading.tsx
const TOP: number[] = [235, 78, 195, 79, 167]

//...

<TopCont theme={theme}>
  {TOP.map((item, index) => (
    <li key={`${item}_${index}`} style={{ width: item }}></li>
  ))}
    </TopCont>
  
//...
  
  const fade = keyframes`
  from{
    opacity : 100%;
  }
  50%{
    opacity : 30%
  }
  to{
    opacity : 100%;
  }
`
  
  const TopCont = styled.ul<ThemeProps>`
  display: flex;
  margin-bottom: 32px;
  margin-top: 32px;
  li {
    width: 100%;
    border-radius: 5px;
    height: 60px;
    margin-right: 8px;
    background: ${({ theme }) => theme.TOGGLE_BACKGROUND};
    animation: ${fade} 2s infinite;
  }
`
```

위에서 본 빨간박스 부분의 배열이다. 이 배열을 map 돌리며 값을 width로 주며 크기를 결정하고 있다.

그리고 fade라는 애니메이션을 만들고 CSS에서 사용해주면 끝이다. 스켈레톤 로딩의 다른 UI 부분도 위와 유사한 방식으로 설계하면 된다.

<br>