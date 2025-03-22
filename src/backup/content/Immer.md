---
title: "Immer"
description: "React는 배열이나 객체를 업데이트 할 경우 직접 수정하는것이 아니라 불변성을 지키면서 업데이트 해주어야한다. immer는 React에서 불변성을 유지하는 코드를 쉽게 해주는 라이브러리이다."
date: 2021-08-31T09:24:25.620Z
tags: ["React"]
---
>## immer란??

**React는** 배열이나 객체를 업데이트 할 경우 직접 수정하는것이 아니라 **불변성을 지키면서 업데이트** 해주어야한다. **immer는 React에서 불변성을 유지하는 코드를 쉽게 해주는 라이브러리**이다.

**불변성** : React에서 편하게 상태를 관리하기 위해 객체 타입을 사용하는데, 이는 참조 타입이라 불변성을 유지할 수 없다. 그래서 기존의 주소 값과 다른 **새로운 객체를 생성하여 복사한 뒤 해당 프로퍼티를 바꾸는 작업이 필요**하다.

<br />

<img src="https://media.vlpt.us/images/mnz/post/eca13782-32f3-4312-9a32-32e465f5fddb/%ED%9A%8C%EA%B3%A0-007.png" />

<br />

React는 부모 컴포넌트가 리렌더링을 하면 자식 컴포넌트도 리렌더링한다. 즉, 얕은 비교를 통해 새로운 값인지 아닌지를 판단한 후 새로운 값인 경우 리렌더링을 하게된다. 예를들어 불변성을 지키지 않고 state배열에 직접 접근하여 push로 요소를 추가하면, 새로운 참조값이 아니기 때문에 이전과 같은 값이라고 인식하고 리렌더링을 하지 않는다.
state를 바꾸고 DOM을 다시 만들기 위해서는 새로운객체나 배열을 만들어 새로운 참조값을 만들고, React에게 이 값은 이전과 다른 참조값임을 알려야 하는 것이다.

<br /><br />

> ## 불변성 지키기 VS Immer

```js
//불변성 지키기
const reducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_COMMENT_REQUEST:
            return {
                ...state,
                addCommentLoading: true,
                addCommentDone: false,
                addCommentError: null,
            };
        case ADD_COMMENT_SUCCESS:
            return {
                ...state,
                addCommentDone: true,
                addCommentLoading: false,
            };
        case ADD_COMMENT_FAILURE:
            return{
                ...state,
                addCommentLoading: false,
                addCommentError: action.error,
            };
    }

}
```
간단하게 위의 코드를 설명하겠다. 현재 reducer에서 state를 미리 설정해둔 initialState로 선언해주었다. 댓글 입력란에 댓글을 작성하고 전송하면 ADD_COMMENT_REQUEST로 가는데, 작성되기 전까지 로딩하기위한 addCommentLoading이 true가 되야하고, 아직 작성된것은 아니므로 addCommentDone은 false가 될것이다. 우리가 주목해야 할 점은 **...state** 부분이다.

**state의 값을 바꾸기 위해서 ...state로 state 객체를 얕은복사 하여 불변성을 지켜주고 있다.**

<br />

```js
//immer
const reducer = (state = initialState, action) => produce(state, (draft) => {
    switch(action.type){
        case ADD_COMMENT_REQUEST:
            draft.addCommentLoading = true;
            draft.addCommentDone = false;
            draft.addCommentError = null;
            break;
        case ADD_COMMENT_SUCCESS:{  
            draft.addCommentLoading = false;
            draft.addCommentDone = true;
            break;
        }
        case ADD_COMMENT_FAILURE:
            draft.addCommentLoading = false;
            draft.addCommentError = action.error;
            break;

        default:
            break;
    };
});
```
그렇다면 이번에는 immer를 보자. produce의 첫번째 파라미터는 수정하고싶은 객체 또는 배열이고, 두번째 인자는 첫번째 파라미터에 할당된 객체 또는 배열을 바꾸는 함수이다.

이제 return 형식을 사용하지않고 draft. 으로 사용하고있다. 하지만 직관성이 좋아졌다고해도 불변성을 지키면서 설계한것에 비해 1줄씩밖에 줄어들지 않았다.

immer는 복잡하게 불변성을 지켜야하는 과정에서 매우 효율적이다.

<br />

<img src="https://user-images.githubusercontent.com/31315644/71559915-db46a800-2aa6-11ea-8bee-70436362818c.png" />

<br />

```js
//불변성 지키기
case ADD_COMMENT_SUCCESS:{
      //mainPosts에서 id가 action.data.postId와 같은 인덱스 찾기
      const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
      //mainPosts[postIndex]가 변경될 포스트이므로 얕은복사
      const post = {...state.mainPosts[postIndex]};
      //Comments 얕은복사하면서 댓글 넣어주기
      post.Comments = [dummyComment(action.data.content), ...post.Comments];
      //Comments가 얕은복사되어 새로운 객체가 생겼으니 mainPosts도 새로운 객체로 만듬
      const mainPosts = [...state.mainPosts];
      //원래포스트 있던 자리에 post 넣어줌
      mainPosts[postIndex] = post;

      return {
          ...state,
          //메인포스트 변경된값 추가
          mainPosts,
          addCommentDone: true,
          addCommentLoading: false,
      };
  }
```
불변성을 직접 지켜주면서 설계할경우 return에 ...state만 사용하면 immer는 주목받지 못했을것같다. 하지만 불변성을 지킨다는것은 그렇게 간단한것이 아니다.

state 객체에서 mainPosts배열을 업데이트하기위해 불변성을 지켜주고있다. 주석으로 달아놓은 설명만 봐도 조금 복잡해보인다.

<br />

```js
//immer

case ADD_COMMENT_SUCCESS:{  
  //조건을 만족하는 게시글 index 찾기
  const post = draft.mainPosts.find((v) => v.id === action.data.postId);
  //게시글에 새 댓글 넣어줌
  post.Comments.unshift(dummyComment(action.data.content));
  draft.addCommentLoading = false;
  draft.addCommentDone = true;
  break;
}

```

immer에서는 한눈에봐도 가독성이 증가했다. 그리고 불변성의 복잡한 관계를 생각할 것 없이 입맛에 맞게 사용하면된다.

<br /><br /><br /><br /><br /><br /><br />

[kyounghwan01](https://kyounghwan01.github.io/blog/React/immer-js/#%E1%84%87%E1%85%AE%E1%86%AF%E1%84%87%E1%85%A7%E1%86%AB%E1%84%89%E1%85%A5%E1%86%BC%E1%84%8B%E1%85%B5%E1%84%85%E1%85%A1%E1%86%AB) zerocho