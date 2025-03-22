---
title: "SPACE_DEV_CLUB - 10"
description: "동적 라우팅을 적용하고, user와 post 데이터를 통해 조건에 맞는 상세 페이지를 랜더링 해보자."
date: 2022-01-26T14:21:43.022Z
tags: ["React","next","typescript"]
---
### 디렉터리 구조 수정

![](/images/c279006a-6f2d-4821-bee2-cab9cdaf3700-image.png)

벨로그의 상세 페이지로 왔을 경우의 URL을 확인해보자. `velog/닉네임/상세페이지URL` 의 형식으로 되어있다.

![](/images/f79770c7-5a2d-4678-82c0-99b1f2ccc141-image.png)

`velog/닉네임` 은 해당 사용자의 벨로그 페이지일 것이다. 

![](/images/48dd25b5-a9b2-4302-af90-e67c7e9c8b3f-image.png)

그래서 pages에서 [id] 디렉터리의 [details]에 작업공간을 옮겨주었다. 이렇게 되면 `localhost:3000` 은 홈이 될 것이고, `localhost:3000/닉네임` 은 해당 닉네임을 가진 사용자의 페이지로 동적 라우팅 될 것이며 `localhost:3000/닉네임/상세페이지` 는 다시 상세페이지로 동적 라우팅이 될 것이다.

<br>

### [details]/index.tsx

아직 Back단 연결은 안했지만, 목 데이터로 상세 페이지 UI를 구현했다. 이제 데이터도 연결하며 동적 라우팅에 맞게 동작하도록 설정해보자.

```jsx
  const router = useRouter();
  const userName = router.query.id;
  const userDetails = router.query.details;
```

먼저 useRouter를 이용하자. `localhost:3000/닉네임/상세페이지` 에서 userName은 닉네임을, userDetails에는 상세페이지를 URL에서 값을 불러와 넣는다.

```jsx
  const { data: userData, error: userError } = useData("users");
  const { data: postData, error: postError } = useData("posts");

  if (!userData || !postData) return <div>로딩중</div>;
  if (userError || postError) return <div>상세 페이지 에러</div>;
```

strapi에 짜놓은 스키마 구조에 데이터를 생성한다. 그리고 useData를 통해 해당 엔드포인트에서 데이터를 가져온다. 

```jsx
//hooks/useData.ts
export const useData = (path: string) => {
  return useSWR(`${API_ENDPOINT}/${path}`, fetcher)
}
```

useData는 useSWR을 사용하여 엔드포인트에서 데이터를 받아오는 커스텀 훅이다.

![](/images/9b6ece13-5f20-44db-8045-9195884097ef-image.png)

예를들어 posts로 useData를 해주고 있는 곳은 위와 같이 데이터를 주고 있다.


```jsx
  userData.some((user: User) => {
    if (user.username === userName) {
      userId = user.id;
      return true;
    }
  });
```

userData에서 username이라는 column을 가져와 userName과 비교하고, 조건이 참일 경우 `userId = user.id`을 한다. 해당 유저의 해당 상세 페이지일 경우 글을 보여주기 위해 `userId` 먼저 구해주는 것이다.

```jsx
  postData.data.some((post: Post) => {
    if (
      userId === post.attributes.userid &&
      post.attributes.url === userDetails
    ) {
      postObj = post.attributes;
      return true;
    }
  });
```

방금 구한 userId와 일치하는 post를 찾고, url column안에 있는 데이터와 userDetails이 같을 경우 `postObj = post.attributes`을 한다.

* user

|id|username|email|...|
|---|---|---|---|
|2|happy|dlgusgh2001@naver.com|...|

<br>

* post

|userid|title|contents|desc|published|url|
|---|---|---|---|---|---|
|2|Strapi|Strapi|풀 스택 프로젝트에서 ~|true|Strapi|

user와 post에 데이터가 위와 같이 있다.

URL에 `localhost:3000/happy/Strapi` 입력해보자.

URL에서 happy를 가져와 DB의 user에서 id값을 찾는다. 그 후 Strapi를 가져와 DB에서 post를 가져오고, post에서의 userid와 방금 찾은 id가 같으며 post의 url과 Strapi가 같을 경우 postObj에 post의 데이터를 넣는 것이다.

```jsx
{postObj.title && 랜더부분}
```

이제 postObj를 사용하여 값을 받아올 경우 상세 페에지를 랜더링 해준다.

`localhost:3000/happy/Str` 는 happy라는 닉네임의 사용자가 Str이라는 url을 가진 post를 작성한 적이 없으므로, 아무 값이 안뜰 것이다. 하지만 `localhost:3000/happy/Strapi` 으로 가면 상세 페이지가 정상적으로 나타난다.


<br>

