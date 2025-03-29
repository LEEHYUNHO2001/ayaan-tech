---
title: "SPACE_DEV_CLUB - 13"
description: "댓글 조회 완성 및 댓글 생성. ContextAPI 적용. swr mutate 사용."
date: 2022-02-17T04:42:34.758Z
tags: ["React","next","typescript"]
---
## 댓글과 대댓글 마무리

### 댓글과 대댓글 조회

![](/images/73260c00-43f1-47e4-b270-234f95b62bda-image.png)

```jsx
const [commentBtn, setCommentBtn] = useState(false)
```

CommentBtn이라는 state가 존재하고 있었다. 댓글에 달린 대댓글의 갯수를 보여주고 있는 `1개의 답글` 을 클릭하면 대댓글을 보여주기 위한 state이다. 하지만 이렇게 commentBtn를 boolean값으로 두면 `1개의 답글`을 클릭했을 때, 모든 댓글 하위의 대댓글이 열리게 된다. 매우 불편한 상황인 것이다.

<br>

![](/images/e86a9238-c585-443d-883d-687d759f4396-image.png)

newComment에는 group 별로 묶인 데이터가 들어있다.

```jsx
//CommentFormContainer.tsx
  const [commentBtn, setCommentBtn] = useState(
    Array(newComment.length).fill(false)
  );
```

newComment의 길이만큼 false로 채운 배열로 commentBtn을 초기화해주었다. 3개의 댓글이 있다면 [false, false, false] 인 것이다.

```jsx
//CommentFormContainer.tsx
  const onComment = (i: number) => {
    commentBtn[i] = !commentBtn[i];
    setCommentBtn([...commentBtn]);
  };
```

그리고 `1개의 답글` 부분이 클릭되었을 경우에는 배열에서 클릭된 위치의 값을 `!` 으로 반전시켜준다. 그 후 spread operator로 setCommentBtn에 넘겨준다. 만약에 commentBtn만 넘겨주게 되면, **불변성때문에 이 값이 변경된지 인식하지 못하여 리랜더링 하지 않는 문제가 발생**한다.

<br>

```jsx
//CommentFormContainer.tsx
      {newComment.map((group: CommentData[], i: number) => {
        return (
          //...
            {group.length > 1 && commentBtn[i] === false && (
              <OnComment theme={theme} onClick={(e) => onComment(i)}>
                <BorderInnerIcon />
                {group.length - 1}개의 답글
              </OnComment>
            )}
            {commentBtn[i] === true && (
              <ComComForm onComment={onComment} index={i} />
            )}
          </div>
        );
      })}
```

`commentBtn[i] === false` 인 경우에만 `1개의 답글` 버튼이 생성되도록 했고, 클릭되면 ComComForm  컨테이너가 나타날 것이다.

undefined

이렇게 댓글과 대댓글 조회 부분을 완성했다.

<br>

### 댓글 생성

![](/images/8d2a58c5-c119-4f74-ab1d-f39fe97ef2a2-image.png)

댓글을 textarea에 입력하고, 댓글 작성을 누르면 Strapi DB에 들어가야 한다.

```jsx
//CommentForm.tsx
  const ChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentText(e.target.value);
  };
```

먼저 `textarea`에 `onChange` 를 생성했다. state로 관리하고 있는 `commentText`에 입력하는 string을 저장하기 위함이다. 댓글 작성을 클릭했을때, `commentText`가 `content` 로 들어갈 것이다.

```jsx
//CommentForm.tsx
  const SubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await axios({
      method: "post" as Method,
      url: `${API_ENDPOINT}/comments`,
      data: {
        data: {
          userid: loginUserId,
          postid: postid,
          content: commentText,
          depth: 0,
          order: 0,
          group: CommentLen,
          is_deleted: false,
          posts: postid,
        },
      },
    });
  };
```

댓글 작성을 누르면 DB에 댓글이 저장되도록 `form`에 `onSubmit` 을 주었다. 댓글을 생성하는 것은 현재 로그인한 유저이므로 userid는 loginUserId값을 넣었다. postid는 현재 상세 페이지의 id값을 넣고, 댓글을 생성하는 form이므로 depth와 order도 0을 주었다. (depth가 1이면 대댓글) post 스키마와 relation이므로 posts에는 postid 값을 부여했다.

![](/images/37a1aea4-1c07-4647-b409-17554e4c564f-image.png)

#### 문제점

1. 이제 댓글을 입력하고 `댓글 작성` 버튼을 클릭하면 Strapi DB에 생성된다. 하지만 상세 페이지에서 실시간으로 댓글이 생성되지 않고, 새로고침을 해야 보인다. 

2. `댓글 작성`을 눌렀을 때 textarea 안의 값이 비워지지 않고 있다.

3. 모든 값들을 props로 넘겨주다 보니 매우 힘들다. 드릴링이 되고 있으며, 코드도 가독성이 떨어지고 있다.

<br>

#### SWR 뮤테이션

현재 이 프로젝트에서는 useSWR을 사용하여 API 엔드포인트와 fetcher로 데이터를 요청하고 있다. swr에서 제공하는 mutate를 사용해서 UI에도 실시간으로 반영되도록 하자.

```
//CommentForm.tsx
  const { mutate } = useSWRConfig();
    const SubmitComment = async (e: React.FormEvent<HTMLFormElement>) => {
    //...
        await axios({
      method: "post" as Method,
      url: `${API_ENDPOINT}/comments`,
      data: {
        data: Data,
      },
    });

    mutate(`${API_ENDPOINT}/posts?populate=*`);
    }
```

댓글 작성을 클릭했을때 실행되는 onSubmit 함수에 axios로 Strpai DB에 정보를 넣은 후, mutate하도록 했다.

undefined

댓글을 작성하마자 UI에 나타나는것을 볼 수 있다.

<br>

#### textarea값 비우기 + Enter로 Submit

```jsx
//CommentForm.tsx
        <TextArea
          theme={theme}
          name="댓글 입력"
          value={commentText}
          placeholder="댓글을 작성하세요"
          onChange={ChangeText}
        ></TextArea>
```

<br>

textarea에 value로 commentText를 주는 속성을 추가했다. 그리고 submit 함수에서 `setCommentText("");` 을 추가해 `댓글 작성`을 누르면 `commentText` 이 빈 값이 되도록 했다.

```jsx
//CommentForm.tsx
  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      SubmitComment(e);
    }
  };

//...

<CommentF onSubmit={SubmitComment} onKeyDown={(e) => handleKeyDown(e)}>
```

form 태그에 handleKeyDown 함수도 추가해주었다. 이제 textarea에 글을 입력하고 엔터를 눌러도 댓글 작성이 될 것이다. Shift + 엔터는 한줄 띄어주는것으로 인식한다.

<br>

#### ContextAPI로 드릴링 해결

```jsx
//index.tsx
let postid = 0;
let postObj = {
  title: "",
  contents: "",
  url: "",
  //... 많은 객체들
}

export const PostContext = createContext({
  postid: postid,
  postObj: postObj,
});
```

상세 페이지의 index 페이지에서 Context를 생성해주었다. 상태관리할 postid라는 이름의 변수는 0으로 초기화하고, postObj는 postObj객체로 초기화 했다.

```jsx
//index.tsx
const DetailsIndexPage: NextPage = () => {
  //postid = 구해준 값 넣음
  //postObj도 받아온 데이터 넣어주었음
  
  return (
    <PostContext.Provider value={{ postid, postObj }}>
      //...
    </PostContext.Provider>
  );
}
```

이제 가져온 데이터들을 postid와 postObj에 할당한다. 그리고 이 값들을 모든 컴포넌트에서 바로 불러와 사용하기 위해 `PostContext.Provider` 로 감싸주고, value에 변경된 postid와 postObj를 넣는다. 이제 props로 넘겨주지 않아도 된다.

```jsx
//components/Details/Comment/CommentForm.tsx
const { postid } = useContext(PostContext);
```

이 컴포넌트 같은 경우에는 postid를 사용하기위해 props를 3번이나 넘겨주고 있었다. 타입스크립트까지 사용하고 있기 때문에 늘어나는 전체 코드량을 생각하면 꽤 많다. 그리고 컴포넌트 수가 증가함에 따라 점점 더 코드량은 늘어날 것이다.

ContextAPI를 적용한 후에는 사용하는 컴포넌트에서 useContext로 가져오기만 하면 된다.


### 경고문

![](/images/13fe10e1-ab71-4b87-b8e7-9ad136ca936d-image.png)

콘솔창을 열어보니 언제부턴가 경고문이 나타났다. StackOverflow와 구글링을 한 결과 SSR과 CSR 할때 HTML 구조가 살짝 달라서 발생한다고 한다. 크게 문제가 되지 않으니 무시하자.

<br>

## 마무리

다음 글에서는 대댓글을 생성해보려고 한다. 대댓글에서는 현재의 group과 order 를 알고있어야해서 댓글 생성보다 조금 더 까다로울것이라 예상해본다..