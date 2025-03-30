---
title: "SPACE_DEV_CLUB - 12"
description: "댓글과 대댓글 정렬, 해시태그, 관심 있는 포스트"
date: 2022-02-14T12:34:26.771Z
tags: ["React","next","typescript"]
---
## 댓글과 대댓글 정렬

```jsx
//CommentFormContainer.tsx
  comments
    .sort((a, b) => a.attributes.order - b.attributes.order)
    .sort((a, b) => a.attributes.depth - b.attributes.depth)
    .sort((a, b) => a.attributes.group - b.attributes.group);
```

목 데이터를 변경해주었다. 그러다 보니 서버에서 전달해줄 때, 순서도 변경되었다. 원래 group에 대해서만 정렬을 해주고 있었는데 이제 group, depth, order에 따라 정렬을 해줘야 된다. 이제 댓글 데이터 순서가 막 들어와도 정상적으로 출력 될 것이다.

![](/images/764c5752-6950-481f-a694-b03d44aa6914-jjjj.gif)

접기 기능에는 몇개의 대댓글이 있는지 알려주고, 없다면 그냥 댓글 남기기 라는 버튼이 생긴다. `2개의 답글` 을 누르면 대댓글이 나타나며 답글을 작성할 것인지에 대한 버튼이 생기고, 누르면 입력 폼이 등장하도록 구현했다.

<br>

## 해시태그

* Hashtags

|name|description|image|
|---|---|---|
|react|react입니다|image|

해시태그를 Common 디렉터리의 Tag 컴포넌트를 사용하는 것으로 변경했다. Strapi에는 Hashtags 스키마를 위와 같이 셋팅하고, Posts와 relation 했다.

![](/images/25731f23-0478-4709-b9a2-5923b5c10018-y.gif)

이제 해시태그를 클릭하면, 전체 포스트에서 해당 해시태그를 달아준 포스트들을 모두 가져오게 된다.

<br>

## 관심있는 포스트

![](/images/59bc2d7a-ad6f-47ea-89ab-0340e6e614bf-image.png)

Velog에는 상세 페이지의 하단에 관심 있을 만한 포스트를 추천해준다. 분석해본 결과 현재 게시글에 있는 해시태그가 하나라도 있는 글을 추천해주는 것 같다.

상세 페이지에 대한 index.tsx 파일에서 DetailData 에는 모든 게시물에 대한 데이터를 받아오고 있다. 그리고 postObj에는 상세 페이지에 대한 데이터가 저장되어 있다. 이 둘을 이용하여 관심있는 포스트 데이터를 생성하고, 컴포넌트로 데이터를 넘겨줄 것이다.

```jsx
//pages/[id]/[details]/index.tsx
  const interested = DetailData.data.filter((details: Post) => {
    const hashtagArr = details.attributes.hashtags.data.map(
      (data) => data.attributes.name
    );
    const isInclude = postObj.hashtags.data.filter((data) =>
      hashtagArr.includes(data.attributes.name)
    );
    return isInclude.length > 0;
  });
```

DetailData에서 게시글 데이터 하나씩 details로 가져와 해시태그만 뽑은 후 hashtagArr 변수에 넣는다. 여기에 현재 게시글의 해시태그가 하나라도 있다면 `isInclude.length > 0 `이 될 것이다. 이 게시물들을 interested에 담아주면 된다.

<br>

```jsx
//pages/[id]/[details]/index.tsx
  function shuffle(arr: Post[]) {
    return arr.sort(() => Math.random() - 0.5);
  }
  const random_interested =
    interested.length >= 10
      ? shuffle(interested).slice(0, 10)
      : shuffle(interested);

//...

<DetailCard interested={random_interested} />
```

이제 interested 배열에서 랜덤으로 10개를 뽑자.(10개 이하면 랜덤으로 섞기만 하자)
그 후 컴포넌트에 넘겨주면 된다.

<br>

```jsx
//components/DetailCard.tsx
        {interested.map((data: Post, index: number) => {
          // 게시글에 유저가 없는게 말이 안돼지만 일단 에러처리 해놓음
          if (data.attributes.userid.data === null) var username = "null";
          else username = data.attributes.userid.data.attributes.userid;

          return (
            <PostCard
              key={`${data}_${index}`}
              // imageUrl={data.attributes.imageUrl}
              title={data.attributes.title}
              contents={data.attributes.contents}
              comments={data.attributes.comments.data.length}
              username={username}
              // count={data.attributes.count}
              publishedAt={data.attributes.publishedAt}
            />
          );
        })}tu
```

이제 props로 받은 interested을 map 돌리며 PostCard 컴포넌트를 사용해주면 된다. 

![](/images/bdd162b0-9f92-4a94-979b-5a302c9c72d8-image.png)

새로고침 할때마다 관심 있을 만한 포스트의 위치가 랜덤으로 변경된다. 그리고 해시태그에 따라 포스트를 추천해주고 있다.
