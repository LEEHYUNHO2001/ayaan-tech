---
title: "SPACE_DEV_CLUB - 12.5"
description: "날짜 기능 수정 및 대댓글 접기"
date: 2022-02-07T12:05:12.907Z
tags: ["React","next","typescript"]
---
## 날짜 기능 추가

```jsx
const handleTime = (day: Date) => {
  const timeDiff = today.getMinutes() - day.getMinutes();
  return timeDiff < 1 ? "방금전" : Math.floor(timeDiff) + "분 전";
};
```

현재 1주일 안에 작성된 글이면 `OO일 전` 이라고 표시된다. 만약 `0일 전`(오늘 생성한 게시글)이면 `OO시간 전` 이라고 표시된다. 여기세 `OO 분 전` 을 추가해주었다.

```jsx
<div theme={theme}>{handleDate(createdAt)}</div>
```

데이터를 받아 createdAt을 뽑아내고, handleDate(createdAt)와 같이 사용해주면 된다. 

![](/images/9b430556-96c5-4dc3-86bd-4a2ce0bf62dd-image.png)

33분전이라고 나타나는것을 볼 수 있다.

<br>

## 대댓글 접기

### 문제 발생

|userid|postid|comment|depth|order|group|is_deleted|
|---|---|---|---|---|---|---|
|1|1|첫 번째 포스트에 첫 번째 댓글입니다.|0|0|1|false|
|2|1|첫번째 댓글의 첫번째 대댓글 입니다.|1|0|1|false|
|1|1|첫번째 댓글에 두번째 대댓글입니다.|1|1|1|false|
|3|1|두번째 댓글입니다.|0|1|2|true|

현재 상위 컴포넌트에서 Comment 스키마 데이터를 정렬한 후 map을 돌려 댓글의 정보를 주고 있다. 이 컴포넌트에서는 댓글과 대댓글이 순서대로 들어올 것이다.

<br>

```jsx
      {depth === 0 && <Comment comments={comments} user={user} />}
      {depth === 1 && <div onClick={onCommentBtn}>접기</div>}
      {depth === 1 && commentBtn === true && (
        <Comment comments={comments} user={user} />
      )}
```

대댓글 접기 기능을 구현하기 위해 depth가 0일 경우 댓글이므로 그대로 보여주고, 1일 경우 대댓글 이므로 `접기`를 보여주도록 했다.

하지만 위의 경우 map을 돌리고 있고 대댓글이 2개이기 때문에 `접기`가 2개 나타난다. `{depth === 1 && order === 1 && <div onClick={onCommentBtn}>접기</div>}` 이렇게하면 접기 1개 나타나지만 첫번째 대댓글만 접고 펴진다. (나머지 대댓글은 사라짐)

왜 이런 현상이 발생하는지 생각해보니, `접기` 를 눌렀을때 동작하는 onCommentBtn의 commentBtn은 order 1의 변수(?) 일 것이다. 한마디로 같은 대댓글이라도 다른 commentBtn을 사용한다는 것이다.

전체적으로 문제가 있다. 일단 `접기`는 한번만 나타나야 하며, 눌렀을 경우 해당 댓글의 대댓글들 모두가 접히고 펼쳐져야한다.

<br>

### 문제 해결 과정

`{댓글 또는 대댓글 데이터}` 와 같은 형태로 데이터가 들어오고 있다. 먼저 상위 컴포넌트에서 어떤 댓글의 대댓글인지 알려주는 Comment 스키마의 group column을 이용하여 묶어주었다.

```jsx
  const [commentBtn, setCommentBtn] = useState(false);
  const onComment = () => {
    setCommentBtn(!commentBtn);
  };
  let newComment: any = [];
  comments.map((comment) => {
    const group = comment.attributes.group;
    if (!newComment[group]) newComment[group] = [comment];
    else newComment[group] = [...newComment[group], comment];
  });
```

그리고 하위 컴포넌트에서 commentBtn을 관리하지 않고, 상위 컴포넌트에서 관리하고 commentBtn값만 하위 컴포넌트로 넘겨주기로 했다.

처음에는 newComment를 객체로 두었지만 react render 부분에서 for문을 사용할 수 없어 배열로 변경했다.

newComment: any 부분은 타입을 도저히 모르겠어서 일단 any로 처리했다.

<br>

```jsx
      {newComment.map((group: [], i: number) => {
        return (
          <div key={`${i + 1}`}>
            {group.map((comments: Comment) => {
              return (
                <div key={`CommentUser-${comments.id}`}>
                  <CommentContainer
                    comments={comments}
                    userData={userData.data}
                    commentBtn={commentBtn}
                  />
                </div>
              );
            })}
            {group.length > 1 && <div onClick={onComment}>접기</div>}
          </div>
        );
      })}
```

이제 newComment로 map을 돌려주자. 대댓글이 있다면 `접기` 버튼이 나타날 것이다.

<br>

```jsx
      {depth === 0 && <Comment comments={comments} user={user} />}
      {depth === 1 && commentBtn === true && (
        <Comment comments={comments} user={user} />
      )}
```
하위 컴포넌트에서는 처음에 depth가 0인것만 보여주고, 1인것은 `commentBtn === true` 일 경우에 보여주면 접기 기능 완성..??

![](/images/846ee8fa-37e9-4ee4-acff-367c3c7aa7f5-ccc.gif)

정상적으로 동작한다. 그러나 위의 동작에서는 보이지 않지만, 첫번째 댓글의 접기를 눌렀을 때 두번째 댓글의 대댓글도 펼쳐진다.

다음 글에서 대댓글 접기 기능을 마저 완성해보겠다.