---
title: "SPACE_DEV_CLUB - 16"
description: "페이지 이동시 리랜더링 되지 않는 시리즈 박스 해결 및 정규 표현식으로 헤더 추출"
date: 2022-03-02T14:45:36.191Z
tags: ["React","next","typescript"]
---
### 시리즈 캐러샐 문제 해결

이전 글에서 페이지를 이동해도 상세 페이지 하단의 캐러셀이 현재 페이지에 맞게 이동하지 않는 문제점이 있었다.

먼저 index 페이지에서 ContextAPI로 시리즈 데이터를 받아오던 부분을 삭제했다. 그리고 DetailHeader에서 axios로 받아오기로 했다. 그 이유는 여러 컴포넌트에서 사용하지는 않기 때문이다.

<br>

```jsx
//DetailHeader.tsx
  const GetSeries = async () => {
    const response = await axios({
      method: "get",
      url: `${API_ENDPOINT}/series-boxes?populate=*&filters[userid]=${userId}`,
    });
    console.log(response);
  };
```

![](/images/8447ae33-3a5e-4b9a-848e-059301f46e53-image.png)

시리즈 박스 데이터중에서 현재 상세 페이지의 작성자가 생성한 것을 가져온다. 시리즈가 여러개인 경우에도 처리해주어야 한다.

해당 시리즈에 현재의 글이 있으면 될 것이다.

<br>

```jsx
//DetailHeader.tsx
  const GetSeries = async () => {
    const response = await axios({
      method: "get",
      url: `${API_ENDPOINT}/series-boxes?populate=*&filters[userid]=${userId}&filters[post][id]=${postid}`,
    });
    console.log(response.data.data[0]);
  };
```

![](/images/1072b12d-83f3-4143-81bd-7cfa4f9036f2-image.png)

원하는 데이터가 정상적으로 들어오고 있는것을 볼 수 있다.

<br>

```jsx
//DetailHeader.tsx
  useEffect(() => {
    GetSeries();
    seriesData.post.data.filter((data, i) => {
      if (data.id === postid) {
        setCurrentPost(i + 1);
        return true;
      }
    })[0];
  }, [postid]);

  const GetSeries = async () => {
    const response = await axios({
      method: "get",
      url: `${API_ENDPOINT}/series-boxes?populate=*&filters[userid]=${userId}&filters[post][id]=${postid}`,
    });
    setSeriesData(response.data.data[0].attributes);
  };
```

SeriesBoxPost와 currentPost를 비효율적으로 선언하던 것을 위와 같이 수정해주었다.

<br>

```jsx
//Carousel.tsx
  const [caroucelIndex, setCaroucelIndex] = useState(0);
  useEffect(() => {
    setCaroucelIndex(currentPost! - 1);
  }, [currentPost]);
```

그리고 캐러셀 컴포넌트에서 useEffect를 사용하여 currentPost가 변경되었을 경우 caroucelIndex값을 다시 할당해주었다.

![](/images/60ad835c-8365-4f6c-994f-0c68da999edb-ghghghg.gif)

글을 넘어갈 때, 캐러샐도 잘 움직이는 것을 볼 수 있다.

<br>

### 뷰어 연결

```jsx
//DetailHeader.tsx
<MDviewer contents={postObj.contents} />
```

ContextAPI를 이용하여 현재 상세 페이지에 보여주는 게시글인 postObj을 가져와 MDviewer 컴포넌트에 contents를 props로 넘겨주며 사용해준다.

![](/images/9536bc04-10d8-4d07-a8cd-7e458e4559a6-image.png)

```
## 제목
스트라피는 프론트엔드 개발자가 유용하게 사용할 수 있는 ~~~
### 내용
## 제목
###  내용
```

위의 입력이 상세 페이지에서 뷰어가 적용된 상태로 출력되는것을 볼 수 있다.

<br>

### 우측에 따라다니는 목차

정규표현식을 이용하여 #을 포함한 헤더를 추출해야 한다. https://regexr.com/ 에서 밑에 예시를 두고 정상적으로 추출되도록 정규표현식을 작성해 보자.

![](/images/20701b01-9551-4c0c-a09d-b0023d7c6a1e-image.png)

과거에 정리했던 [정규 표현식에 대한 글](https://velog.io/@leehyunho2001/%EC%A0%95%EA%B7%9C%ED%91%9C%ED%98%84%EC%8B%9D-%EA%B0%9C%EB%85%90) 을 보며 하나씩 값을 넣어줬다. 현재는 정상적으로 추출 되지만 추후에 이상이 있다면 리팩토링 하려고 한다.

<br>

```jsx
//RightHeader.tsx
export const RightHeader = () => {
  const { postid, postObj } = useContext(PostContext);
  const [listData, setListData] = useState(postObj.contents.match(/#+ .*/g)!);
  return (
    <Container>
      <h2 className="sr-only">목차</h2>
      {listData.length !== 0 && (
        <article>
          {listData.map((str) => {
            return (
              <Link key={`Detail-List-${str}`} href="#">
                <a>
                  <List>{str}</List>
                </a>
              </Link>
            );
          })}
        </article>
      )}
    </Container>
  );
};
```

listData state를 이용하여 우측 헤더를 UI에 출력하고 있다.

![](/images/12047b5b-1ebc-4911-91d5-22e25919937c-image.png)

정상적으로 나타난다. 하지만 # 부분은 사라져야 하며, #의 갯수가 많다면 들여쓰기가 된 것처럼 UI에 보여야 한다. 또한, 스크롤 위치에 따라 현재 위치의 헤더는 글씨가 진해져야 하고 클릭 시 해당 위치로 이동해야한다.

그 부분은 다음 글에서 구현하겠다.

