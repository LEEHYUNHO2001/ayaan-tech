---
title: "React Query 사용법"
description: "Client State와 Server State를 따로 관리하는 React Query를 완전 정복해보자!"
date: 2022-04-28T05:50:19.686Z
tags: ["React","next","상태관리"]
---
# React Query를 사용한 이유

[react-query 공식문서](https://react-query.tanstack.com/comparison)를 보면 react query가 다른 라이브러리와 비교되고 있는 것을 볼 수 있다. Normalized Caching 만 빨간불이 들어온 것을 보면 확실히 잘 만들었나 보다.

사실 고민하고 있는 것은 RTK Query와 React Query중 어떤 라이브러리를 사용할지에 대해서였다. 그러던 중 [libhunt](https://www.libhunt.com/compare-react-query-vs-rtk-query)를 발견해서 비교해보니 확실히 react-query가 최신 글이 넘쳐났다. 그래서 React Query를 사용하기로 결정했다.

<br>

## 나의 코드에 먼저 적용

### enabled

```jsx
//useRouterReady
  useEffect(() => {
    if (!router.isReady) return;
    dispatch(qsDataActions.setQsData(String(code)));
    if (qs) {
      getData();
    }
  }, [router.isReady, qs]);
```

React Query의 사용법에 대해서 설명하기 전에, 먼저 나의 코드에 적용한것을 간단하게 설명하겠다. [Next에서 useRouter의 첫번째 렌더링 undefined](https://velog.io/@leehyunho2001/useRouter-%EC%B2%AB-%EB%B2%88%EC%A7%B8-%EB%A0%8C%EB%8D%94%EB%A7%81-undefined-Bug) 문제를 해결한 글에서 getData를 Props로 받아와서 qs가 존재할 경우에 실행해주고 있다. 여기서 getData 함수는 데이터를 요청하여 받아오는 비동기 처리 부분이다. 

<br>

```jsx
//useRouterReady
  useEffect(() => {
    if (!router.isReady) return;
    dispatch(qsDataActions.setQsData(String(code)));
  }, [router.isReady, qs]);
```

React Query를 사용한 후에는 `useRouterReady` 훅에는 qs를 결정하는 부분만 있는것이 가능하게 되었다. 관심사의 분리가 된 것이다.

물론 useEffect 하나 추가했어도 관심사의 분리가 가능했지만 더 짧은 코드로 가능하게 되었다..!

<br>

```jsx
//Components
  const { data, isLoading } = useQuery(
    'get/Data',
    () => getFetcherAPI({ url: '/api/data', qs, dispatch }),
    {
      enabled: !!qs,
    }
  );
```

그 이유는 useQuery의 enabled 속성 덕분이다. enabled 는 쿼리가 자동으로 실행되지 않게 설정하는 옵션이다. qs가 존재할 경우에만 실행된다.

<br>

### invalidation

```jsx
  const {
    mutate,
    isLoading,
    isError,
  } = useMutation(() => patchFetcherAPI({ url: `/api/coupon/${resQr?.data.code}`, checkedItems }), {
    onSuccess: () => {
      queryClient.invalidateQueries(['get/QrData', qs]);
    },
  });
```

쿠폰 데이터를 Get으로 받아 성공시 상태관리를 해주고 있었다. 그 이유는 이렇다. 해당 페이지는 쿠폰을 보여주는 페이지이고, 사용하기를 누른다면 EndPoint에 patch 요청을 보낸 후 사용했다는 UI를 보여줘야 한다. 하지만 patch 요청을 보내면 Server State는 변했지만 그게 즉시 적용되는 것이 아니라 UI는 여전히 쿠폰 사용할 수 있는것 처럼 보인다.

React Query를 적용한 후에는 상태관리 하던 부분을 제거할 수 있었다. mutation이 성공하면 `invalidateQueries`를 수행하도록 설계했기 때문이다.

설명없이 나의 코드를 살펴보았다. 대충 감이 잡혔을 수 도 있지만, 그래도 이제 자세하게 알아보자.

<br>

## React Query

### useQuery

```jsx
const results1 = useQuery({'post', () => fetchPost(id) })
const results2 = useQuery({['post', id], () => fetchPost(id) })
```

useQuery는 필수 인자로 Query key와 Query Function을 가진다. 마지막 인자에 옵션을 추가할 수 있다. Query key는 string 또는 array로 넣을 수 있는데, string 으로 넣어도 React Query에서 내부적으로 배열로 바꾼다. **React Query 새로운 버전에서는 string 형태의 key는 못쓰게 되므로 처음부터 배열로 사용하는 습관을 들여놓자.** Query Function은 데이터를 받아오기 위해 API EndPoint에 요청을 보내는 비동기 처리 부분을 넣어주면 된다. 여기서는 return값으로 받은 데이터나 에러를 넣어줘야 한다.

<br>

![](/images/42214ec6-d7f1-4831-9ac1-4cd67a37832b-image.png)

React Query DevTool도 잘 되어있다. 위의 사진 처럼 Query는 fresh, fetching, stale, inactive라는 4개의 상태를 갖는다. useQuery가 반환하는 객체로 어떤 상태인지 파악이 가능한 것이다.

- fresh : 새롭게 추가된 인스턴스. active 상태의 시작.
- fetching : 요청을 수행하는 중인 쿼리
- stale : 인스턴스가 존재하지만 이미 패칭이 완료된 쿼리
  - 특정 쿼리가 stale된 상태에서 같은 쿼리 마운트를 시도한다면 캐싱된 데이터를 반환하면서 리패칭을 시도한다.
- inactive : active 인스턴스가 하나도 없는 쿼리
  - inactive된 이후에도 cacheTime 동안 캐시된 데이터가 유지된다. cacheTime이 지나면 가비지 컬렉션에 수집된다.

**런타임에 stale인 특정 쿼리 인스턴스가 다시 만들어졌을 때 리패칭이 일어난다.**

<br>

#### useQuery의 반환

```jsx
 const {
   data,
   dataUpdatedAt,
   error,
   errorUpdatedAt,
   failureCount,
   isError,
   isFetched,
   isFetchedAfterMount,
   isFetching,
   isIdle,
   isLoading,
   isLoadingError,
   isPlaceholderData,
   isPreviousData,
   isRefetchError,
   isRefetching,
   isStale,
   isSuccess,
   refetch,
   remove,
   status,
 } = useQuery(queryKey, queryFn)
```

useQuery에서 구조분해로 꺼낼 수 있는 반환값들은 이와 같다. 

- data : 마지막으로 응답받은 데이터
- error : 에러시 리턴되는 객체
- isIdle : data가 비었을 경우의 상태를 반환
- isFetching : 요청이 진행중일 경우 true 반환
- status, is가 붙은 것들 : 현재 query의 상태를 반환
- refetch : 해당 query refetch 하는 함수 제공
- remove : 해당 query 캐시에서 remove하는 함수 제공

<br>

#### 옵션

```jsx
useQuery(queryKey, queryFn, {
   cacheTime,
   enabled,
   initialData,
   initialDataUpdatedAt
   isDataEqual,
   keepPreviousData,
   meta,
   notifyOnChangeProps,
   notifyOnChangePropsExclusions,
   onError,
   onSettled,
   onSuccess,
   placeholderData,
   queryKeyHashFn,
   refetchInterval,
   refetchIntervalInBackground,
   refetchOnMount,
   refetchOnReconnect,
   refetchOnWindowFocus,
   retry,
   retryOnMount,
   retryDelay,
   select,
   staleTime,
   structuralSharing,
   suspense,
   useErrorBoundary,
 })
```

- enabled : !!id와 같이 설정하면, 자동으로 쿼리의 요청 함수가 호출되지 않고 id가 있을 경우에만 실행된다.

- onSuccess, onError, onSettled : query fetching 성공 실패 완료에 따른 side Effect 정의하면 된다.

- select : 성공 시 가져온 데이터를 가공해서 전달할 수 있다.

- refetchOnWindowFocus : 기본값으로 해당 브라우저를 다시 포커스 할 때마다 리패칭한다. false를 부여해서 기능을 제거할 수 있다.

- refetchOnReconnect : 네트워크가 다시 연결되었을 때 리패칭 유무이다.

- keepPreviousData : 새롭게 fetching 할 경우 이전의 데이터 유지 여부를 결정한다.

- staleTime : 기본값 0인 경우 fresh 상태에서 호출이 끝나면 바로 stale 상태가 되지만, 값을 부여해주면 해당 시간동안 fresh한 상태가 되어 쿼리가 다시 마운트되도 패칭이 발생하지 않고 기존의 fresh한 값을 반환한다.

- refetchInterval : 주기적으로 refetch하고 싶은 경우 설정한다.

- initialData : 초기값을 설정할 수 있다.

- retry, retryDelay : 요청 실패한 쿼리는 기본값으로 3번 더 요청하며, 이 옵션으로 횟수와 간격을 설정할 수 있다.

<br>

### useQueries

```jsx
const results1 = useQuery({['post', id_one], () => fetchPost(id_one) })
const results2 = useQuery({['post', id_two], () => fetchPost(id_two) })
```

query가 여러개일 경우 위와 같이 설계하면 병렬로 처리되며 잘 동작한다.

<br>

```jsx
const ressult = useQueries([
    {
        ['post', id_one],
        () => fetchPost(id_one),
    },
    {
        ['post', id_two],
        () => fetchPost(id_two),
    }
]);
```

useQueries를 사용하여 묶어줄 수도 있다. 그렇다면 useQueries만 할 수 있는 일은 무엇일까?

<br>

```jsx
const res = useQueries(
  posts.map((post) => {
    return {
      ['post', post.id],
      () => fetchPost(post.id),
    }
  })
)
```

인자로 들어가는 값이 동적으로 변할 경우 이다. posts에서 모든 post에 대한 데이터 요청을 할 것이다. return에서는 `{res.map((post) => return <div>{post.title}</div>)}` 와 같이 사용하면 된다.

이 외에도 useQuery가 다수 있는데, suspense를 사용할 경우에도 공식문서는 useQueries를 추천하고 있다. 이 부분은 [잘 정리된 블로그](https://jforj.tistory.com/245#:~:text=useQueries%EB%9E%80%3F,%EC%9C%BC%EB%A1%9C%20%EB%B3%80%ED%95%98%EB%8A%94%20%EA%B2%83%EC%9D%84%20%EC%9D%98%EB%AF%B8%ED%95%A9%EB%8B%88%EB%8B%A4.)가 있어 가져왔다.

<br>

### useMutation

useQuery는 CRUD에서 데이터를 받는 R(Read)에서 사용한다. useMutation은 C(Create), U(Update), D(Delete)하며 server state에 side Errect를 일으키는 경우에 사용한다.

<br>

```jsx
  const mutate = useMutation(() =>
    patchFetcherAPI(url)
  );
```

useMutation에는 Promise를 반환하는 (비동기 처리해서 데이터 CUD) 부분만 있어도 된다. useQuery 처럼 Query key를 부여하게 되면 DevTool에서 확인할 수 있다.

<br>

#### useMutation의 반환

```jsx
 const {
   data,
   error,
   isError,
   isIdle,
   isLoading,
   isPaused,
   isSuccess,
   mutate,
   mutateAsync,
   reset,
   status,
 } = useMutation(mutationFn)
```

- mutate : mutation을 실행하는 함수
- mutateAsync : mutate와 비슷하지만 Promise를 반환
- reset : mutate 내부 상태를 reset

<br>

#### 옵션

```jsx
useMutation(mutationFn, {
   mutationKey,
   onError,
   onMutate,
   onSettled,
   onSuccess,
   retry,
   retryDelay,
   useErrorBoundary,
   meta,
 })
```

- onMutate : Mutation전에 동작하는 함수. 낙관적 업데이트(optimistic update)에 유리함.

<br>

### invalidation

```jsx
// 캐시가 있는 모든 쿼리
queryClient.invalidateQueries()

// 'todos'로 시작하는 모든 쿼리
queryClient.invalidateQueries('todos')
```

invalidation은 해당 key를 가진 query를 stale 취급하며 폐기한다. mutation으로 server state가 변경되면 이전의 데이터가 필요 없을 경우 폐기해주는 것이다. 그 후 현재 render되고있는 query들은 refetch된다.

<br>

```jsx
 const queryClient = useQueryClient()
 
 const mutation = useMutation(() => patchFetcherAPI(url), {
   onSuccess: () => {
     queryClient.invalidateQueries('todos')
   },
 })
```

mutation에서의 활용으로 CUD가 성공할 경우 invalidation할 수도 있다.

<br>

```jsx
 const mutation = useMutation(() => patchFetcherAPI(url), {
   onSuccess: data => queryClient.setQueryData(['todo', { id: 5 }], data),
 })
```

mutation으로 인해 서버에서 받는 데이터가 새로운 것이라면 setQueryData 메소드를 사용할 수 있다.

<br>

### refetching

refetching을 할 수 있는 경우는 많다. Query Key에 `["TODO", id]` 를 주었는데 id값이 변경되면 다시 fetch된다. 이것 말고도 useQuery의 3번째 인자로 주는 옵션에서도 있었다. 

하지만 내가 자주 사용하는 방법은 mutation하고 이전 데이터가 필요 없을 경우 `onSuccess`함수를 이용하여 `invalidation`을 해주면서 refetch를 하는 것이다.

tip ) useQuery에서 `staleTime: infinity` 인 경우(stale상태로 가지 않도록 설정), invalidate할 경우에만 refetch된다.

> 참고하면 좋은 글 : [darrengwon](https://darrengwon.tistory.com/1517), [우테세](https://www.nashu.dev/content-a-day/20220222/react-query)

<br>

## 마무리

Server State를 따로 관리하기 위해서 React Query를 사용하는데 생각보다 엄청 편하다. 처음에 사용법을 익히고, 어떻게하면 효율적으로 사용할지 고민하는게 어렵지만 알고나면 정말 좋은 것 같다. Client State는 전역관리를 통해 사용하고 있는데 보일러플레이트도 확실히 줄었다. (RTK 사용중)


