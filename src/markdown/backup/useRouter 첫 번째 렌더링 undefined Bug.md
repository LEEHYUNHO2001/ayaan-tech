---
title: "useRouter 첫 번째 렌더링 undefined Bug"
description: "Next.js 에서는 query string값을 사용하고 싶다면 useRouter를 이용할 수 있다. 하지만 이 값을 이용하여 데이터를 요청하면 원하던 대로 동작하지 않을 수 있다."
date: 2022-04-26T00:58:31.828Z
tags: ["React","next"]
---
Next.js 에서는 query string값을 사용하고 싶다면 `useRouter`를 이용할 수 있다. 하지만 사용하는 과정에서 에러가 발생해서 나와 같은 상황에 놓인 분들을 위해 벨로그를 작성하게 되었다.

> 사용자가 입력 데이터를 전달하는 방법중의 하나로, url 주소에 미리 협의된 데이터를 파라미터를 통해 넘기는 것을 말한다.

<br>

```jsx
  const router = useRouter();
  const { id } = router.query;

  const getData = async () => {
    try {
        const res = await axios({
          method: 'get' as Method,
          url: '/api/data',
          params: { id: qs },
        });
       //...
    } catch (err) {
      //...
      }
    }
  };

useEffect(() => {
	getData();
}, [])
```

특정 페이지는 `?id=쿼리스트링` 와 같은 query string(qs)값을 가지고 있다. 이 페이지가 렌더링 되면 qs값을 이용하여 데이터를 요청하고 싶다.

next/router에서 제공하는 useRouter을 이용하여 router를 선언하고, qs에는 id라는 이름을 사용할 것이므로 id도 가져와준다.

`https://www.naver.com?id=1234`인 경우에 위의 코드를 작성하면 `1234`가 출력되는 것이 정상일 것이다. 하지만 Next에서 useRouter이 첫 번째 렌더링 값이 undefined가 나타난다.

[qs](https://www.npmjs.com/package/qs)나 [quert-string](https://www.npmjs.com/package/query-string) 라이브러리를 사용해보았지만 결과는 같았다. 그러다 [Stack Overflow](https://stackoverflow.com/questions/61040790/userouter-withrouter-receive-undefined-on-query-in-first-render) 를 찾아보았더니 해결책을 발견할 수 있었다. 첫 번째 렌더링에서 undefined가 나타나는 것이 버그가 아니라 원래 그렇다고 한다.

<br>

```jsx
//useRouterReady.tsx
export const useRouterReady = (getData: () => Promise<void>) => {
  const router = useRouter();
  const { code } = router.query;
  const dispatch = useDispatch();
  const qs = useSelector(({ qsData }: stateProps) => qsData.value);

  useEffect(() => {
    if (!router.isReady) return;
    dispatch(qsDataActions.setQsData(String(code)));
    if (qs) {
      getData();
    }
  }, [router.isReady, qs]);
};
```

나는 아예 Custom Hook을 생성했다. 데이터를 요청하는 부분을 파라미터로 받아와서 qs가 존재할 때, 실행해주도록 하는 것이다.

Redux ToolKit을 사용하고 있어 간략하게 설명하겠다. qs는 전역 상태 관리중인 값을 불러온 것이다. useEffect 내에서 router가 준비된다면 dispatch로 qs값을 변경해준다. 변경이 되어 qs값이 생긴다면 `getData`함수를 실행하게 된다.

router.isReady가 처음에 false이지만, ture가 되면 useEffect의 2번째 배열에 담긴 인자로 인해 다시 실행되기 때문에 위 로직을 사용하면 query string의 첫 렌더링 undefined 문제를 해결할 수 있다.

