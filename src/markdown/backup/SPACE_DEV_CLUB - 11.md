---
title: "SPACE_DEV_CLUB - 11"
description: "변경된 스키마 구조에 따른 리팩토링. 포스트에 좋아요 갯수와 댓글을 데이터 받아 UI에 출력."
date: 2022-02-03T14:09:48.005Z
tags: ["React","next","typescript"]
---
## 스키마 구조 변경

스키마 구조가 조금 변경되었다. 이에 맞게 상세 페이지에서 데이터를 받아 UI에 출력하는 부분을 리팩토링 해주었다.

이제 `/api/posts` 의 데이터를 받아오는 것이 아닌 `/api/posts?populate=*` 에서 받아온다. (릴레이션들을 모두 포함됨)

![](/images/b633bbad-8fde-4fc9-a4bd-5329d480a858-image.png)

실제로 Strapi의 Post 데이터를 확인해보면, hashtags나 comments와 같은 릴레이션에 관한 데이터까지 모두 보여진다.

```jsx
  const { data: DetailData, error: DetailError } = useData("posts?populate=*");

  if (!DetailData) return <div>로딩중</div>;
  if (DetailError) return <div>에러</div>;

  DetailData.data.some((details: Post) => {
    if (
      userDetails === details.attributes.url &&
      userName === details.attributes.userid.data.attributes.nickname
    ) {
      postObj = details.attributes;
      console.log(postObj);
      return true;
    }
  });
```

이전에는 url에 포함된 nickname으로 user 테이블에서 id값을 찾고, 이 id값으로 post를 찾아 조건이 맞으면 글을 보여주는 방법을 사용하여 상세 페이지를 구현했었다. 하지만 스키마가 변경되고 이제 map을 한번만 사용해도 된다.

`http://localhost:3000/LEEHYUNHO2001/Strapi` 라는 url이 있다고 해보자. LEEHYUNHO2001라는 nickname을 가진 유저가 Strapi라는 글을 작성한 것이다.

url에 포함된 Strapi로 post의 url에서 글을 찾고, 이 글의 유저의 nickname이 LEEHYUNHO2001가 맞는지 확인하면 된다.

<br>

## 좋아요

![](/images/9676523b-bbd2-4d1c-bc45-9561fc809a64-image.png)

상세 페이지 왼쪽에 좋아요 버튼이 있다. 이 버튼은 현재 해당 Post에 좋아요 누른 사람들의 수를 가지고 있어야 한다. 그래서 likepost를 props로 받아오기로 했다.

```jsx
export const LeftHeader = ({ likepost }: LikePost) => {
  const [heartNum, setHeartNum] = useState(likepost.length);
}
```
원래 코드에서는 heartNum을 0으로 초기화 했었다. 이제 likepost.length로 설정해 주었다. 

![](/images/babf9850-a5a7-490d-8ae3-dec3f34594bb-image.png)

이 글에 좋아요 한 사람은 userid가 1인 사용자 한명이다. 그래서 1로 표시되어 있다. 

![](/images/00ea2458-766b-412c-a50c-d24358015604-image.png)

클릭하면 2가 되면서 클릭한 UI가 반영되는데, 지금은 setState로 숫자만 변경해준 것이다. 추후에 로그인한 유저의 정보를 이 Post의 likepost 에 추가하여 likepost.length가 2가 되도록 해야한다.

<br>

## 댓글

### Comment.tsx

![](/images/25e21865-452d-48b9-8c49-5811caf42e74-image.png)

|userid|postid|comment|depth|order|group|is_deleted|
|---|---|---|---|---|---|---|
|1|1|첫 번째 포스트에 첫 번째 댓글입니다.|0|0|1|false|
|2|1|첫번째 댓글의 첫번째 대댓글 입니다.|1|0|1|false|
|1|1|첫번째 댓글에 두번째 대댓글입니다.|1|1|1|false|
|3|1|두번째 댓글입니다.|0|1|2|true|

DB에 저장된 댓글을 불러오기 위해 먼저 데이터를 생성해주었다. 이제 조회해보자.

```jsx
export const Comment = ({ comments }: Comments) => {}
```

Comment 컴포넌트에서 이제 comments을 props로 받는다. 

![](/images/723ed48b-24a1-4b16-b55a-03d0a2af9291-image.png)

여기서는 comments를 정렬해주려고 한다. 정렬하지 않고 데이터를 그대로 사용하려고 하니 순서가 뒤죽박죽될 것 같았다.

```jsx
  comments.sort((a, b) => {
    return a.attributes.group < b.attributes.group
      ? -1
      : a.attributes.group > b.attributes.group
      ? 1
      : 0;
  });
```

attributes.group 에는 댓글의 그룹 column에 관한 데이터가 있다. 이 column은 첫번째 댓글이면 1이고, 이 댓글의 대댓글이여도 1이다. 말 그대로 그룹으로 묶어준 것이다. 이 값을 이용하여 정렬을 진행했다.

![](/images/928a82ed-5691-4dce-a384-cda741890d92-image.png)

정렬이 정상적으로 된 것을 볼 수 있다. 이제 정렬된 comments 데이터를 사용하여 댓글 UI를 출력하면 된다.

<br>

```jsx
const { data: userData, error: UserError } = useData("userinfos");
```

comments 에는 userid 라는 값이 있다. 어떤 유저가 댓글을 남겼는지 알기위한 column이다. userinfos 를 엔드 포인트에 추가시켜 useData로 userData 를 받아왔다. userData와 comments의 userid로 댓글 주인의 정보를 가져오자.

```jsx
//Comment.tsx
      {comments.map((comments) => {
        return (
          <CommentUser
            key={`CommentUser-${comments.id}`}
            comments={comments}
            userData={userData.data}
          />
        );
      })}
```

이 작업들은 CommentUser 컴포넌트에서 진행 할 것이다.

<br>

### CommentUser.tsx

```jsx
export const CommentUser = ({ comments, userData }: Comments) => {}
```

Comment 컴포넌트에서 comments와 userData 넘겨준 것을 CommentUser 컴포넌트에서 props로 받았다. (comments는 map으로 돌리고 있는 것을 받기 때문에 [{ },{ }, { }, { }]에서 {}를 하나하나 받고있다.)

```jsx
  userData.some((data) => {
    if (data.id === comments.attributes.userid) {
      user = data;
      return true;
    }
  });
```

그리고 위에서 언급한 것처럼 해당 댓글의 주인을 찾았다.

```jsx
      <ProfileContainer>
        <Link href={user.attributes.nickname}>
          <a>
            <UserProfile
              src={user.attributes.profileimage}
              alt={`${user.attributes.nickname}프로필 사진`}
            />
          </a>
        </Link>
        <ProfileData>
          <Profile>
            <UserNickname>
              <Link href={user.attributes.nickname} passHref>
                <User theme={theme}>{user.attributes.nickname}</User>
              </Link>
            </UserNickname>
            {comments.attributes.userid === loginUserID && (
              <UDContainer>
                <Link href="#" passHref>
                  <UDItem theme={theme}>수정</UDItem>
                </Link>
                <Link href="#" passHref>
                  <UDItem theme={theme}>삭제</UDItem>
                </Link>
              </UDContainer>
            )}
          </Profile>
          <CreatedAt theme={theme}>
            {handleDate(comments.attributes.createdAt)}
          </CreatedAt>
        </ProfileData>
      </ProfileContainer>
      <CommentText>{comments.attributes.content}</CommentText>
```

이것을 바탕으로 UI를 출력하고 있다. `comments.attributes.userid === loginUserID` 부분은 로그인되어 있는 유저의 id값이 댓글의 id값과 같으면 수정 및 삭제 버튼이 보이도록 한 것이다. (loginUserID는 로그인이 미구현인 관계로 값을 1로 임의로 부여했다.)

![](/images/53fa095a-dc67-4198-a677-1fb3c53bd537-image.png)

데이터를 받아 UI를 정상적으로 출력하고 있다. 하지만 대댓글은 댓글에 비해 들여쓰기가 되어있어야 하고, 접는 기능도 가능 해야한다. 다음 글에서 구현해 보겠다.

(데이터 초기화나 타입에 대해서는 리팩토링하고 설명하기위해 이 글에서는 생략하고 있다.)