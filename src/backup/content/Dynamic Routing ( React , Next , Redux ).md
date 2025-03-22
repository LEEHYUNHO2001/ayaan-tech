---
title: "Dynamic Routing ( React , Next , Redux )"
description: "동적 라우팅"
date: 2021-09-08T09:27:29.117Z
tags: ["React","next","상태관리"]
---
위의 사진처럼 오픈마켓에 물품들이 분류되어있다. 주소가 openmarket.com이라고 가정하면, 우리가 라면을 구매하기 위해서 식품부분을 클릭했을 경우 주소가 openmarket.com/food 형식으로 될 것이다. 그리고 여기에서 라면을 찾아 클릭하면 상세페이지로 넘어간다. 주소는 openmarket.com/food/24325 의 형식으로 된다.

<br />

```js
//pages/food/24325.js 동적 라우팅 미적용
const example = () => {
    return(
      <div>신라면</div>
    )
}
```

<br />

Dynamic Routing을 사용하지 않는다면 상세페이지 화면의 틀은 비슷해도 수많은 js파일을 만들어야 할 것이다. **Routes의 경로에 특정 값을 넣어 해당 페이지로 이동할 수 있게 Dynamic Routing**을 사용해보자.

<br />

>## React에서 Dynamic Routing(동적 라우팅)

SNS에서도 상세페이지는 사용된다. 예를들어 Twitter에도 다른사람들의 게시글이 리스트로 나열되어있다. 여기서 특정 게시글을 선택하면 해당 게시글로 화면이 넘어가진다. 상세페이지로 넘어가게 되는 것이다.

<br />

<img src="https://jbee.io/static/254132caddb595a97d5410dc9ac53388/a805e/react-ecosystem.png" />

그렇다면 React Next 에서 Dynamic Routing을 사용하여 상세페이지를 만들어보자.

<br />

```js
//components/PostCard.js
const PostCard = ({post}) => {
    return(
        //상세페이지 설계
    );
}
```
components 디렉터리에 상세페이지에서 사용할 파일 PostCard를 생성하여 설계한다.

<br />

```js
//pages/post/[id].js
const Post = () => {
    const router = useRouter();
    const {singlePost} = useSelector((state) => state.post);

    return(
      <PostCard post={singlePost} /> 
    )
}

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    context.store.dispatch({
        type: LOAD_POST_REQUEST,
        data: context.params.id,
    });

    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
});
```
pages/post/[id].js 를 생성한다. singlePost에는 클릭한 게시글의 정보가 들어있다. 이 데이터를 이용하여 화면을 보여줄 수 있도록 PostCard를 설계하면 된다.

getServerSideProps은 Redux, Next환경에서 SSR을 설계할수 있도록 제공되는 메소드이다. 서버에서 먼저 실행되는 함수이다. 접속한 상황에 따라 화면이 바뀌게되는 경우에 사용하면 좋다.

해당 게시글의 id값은 router.query 또는 context.params을 이용하여 받을 수 있다. LOAD_POST_REQUEST을 보내며 id값을 넘겨주고 있다. 이 값은 saga로 간다.

<br />

```js
//sagas/post.js
function loadPostAPI(data){
    return axios.get(`/post/${data}`);
}
```
saga에서 받은 id값을 axios.get 요청을 통해 route로 넘겨주고 있다.

<br />

```js
//routes/post.js
router.get('/:postId', async(req, res, next) => {
    try{
        const post = await Post.findOne({where: {id: req.params.postId}})

        res.status(200).json(post)
    } catch(error){
        console.log(error);
        next(error);
    }
});
```

<br />

saga에서 넘긴 id값을 postId로 받았다. 해당 id로 DB에서 post를 찾아서 return 해주고 있다. post를 찾는 부분에서는 sequelize문법을 사용한것이므로 대충 보고 넘어가자.

```js
//sagas/post.js
function* loadPost(action) {
    try{
        const result = yield call(loadPostAPI, action.data);
        yield put({
            type: LOAD_POST_SUCCESS,
            data: result.data,
        });
    } catch(err){
        console.error(err);
        yield put({
            type: LOAD_POST_FAILURE,
            error: err.response.data,
        });
    }
}
```

routes에서 return 받은 post를 saga의 result에 넣었다. 성공적으로 값이 들어가면 LOAD_POST_SUCCESS요청을 보내고, 데이터를 넘겨주고있다.

이제 이 데이터를 Reducer에서 singlePost에 넣어주면 성공적으로 브라우저가 PostCard를 그려줄 것이다.

다음에는 React환경에서만 Dynamic Routing 하는 방법을 알아보겠다.

<br /><br /><br /><br /><br /><br /><br />

[edie_ko](https://velog.io/@edie_ko/React-%EB%8F%99%EC%A0%81%EB%9D%BC%EC%9A%B0%ED%8C%85-Dynamic-Routing%EC%9C%BC%EB%A1%9C-%EC%83%81%EC%84%B8%ED%8E%98%EC%9D%B4%EC%A7%80-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0) [zerocho]