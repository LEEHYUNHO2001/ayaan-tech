---
title: "useEffect의 실행 시점과 로딩 처리"
description: "뒤로 갔다가 다시 입장할 경우 로딩창이 나타나지 않고 깜빡거림이 나타나는 문제점"
date: 2022-06-02T02:47:27.997Z
tags: ["React","next"]
---
# 문제점

react-query를 사용하고 있었다. A페이지를 들어갈 때, A페이지에 대한 데이터를 요청한다. 여기서의 로딩 처리는 정상적으로 수행한다. 하지만 뒤로 갔다가 다시 입장할 경우 로딩창이 나타나지 않고 깜빡거림이 나타난다. 데이터를 받아오는 동안의 로딩처리는 해주었지만, 데이터를 상황에 맞게 변환하고 UI에 출력하는 로직을 수행하는 동안의 로딩처리가 안된 것 같았다. 이로인해 아주 잠깐 동안 유저가 UI를 못보는 시간이 생겼고, UI를 아직 못그렸을 경우에 로딩 화면을 보여주고 싶었다.

<br>

## 데이터 로딩 처리

```jsx
//react-query
const { isLoading } = useQuery(queryKey, queryFn);

if(isLoading) return <div>로딩중...</div>

//swr
const { data } = useSWR(endpoint, fetcher)

if (!data) return <div>loading...</div>
```

데이터를 요청하기 위해 라이브러리나 모듈을 사용할 때, 데이터 로딩 처리는 간단하다. react-query의 경우에는 boolean값을 가진 isLoading이란 것을 자체적으로 반환해주고, swr의 경우에는 data가 아직 반환되지 않았을 때 로딩이라고 사용할 수 있다.

<br>

### useEffect

```jsx
useEffect(() => {
	//데이터 변환...
}, [])

if(!데이터변환) return <div>로딩중...</div>
```

useEffect의 실행 시점이 컴포넌트의 렌더링 이후라는것은 알고 있었다. 하지만 위의 코드로 특정 페이지에서는 해결이 되었지만, 여전히 해결이 되지 않는 페이지가 있어 '내가 잘못 알고 있었던 것일까?' 라는 의문이 생겼다.

서치해본 결과 컴포넌트가 렌더링 된 후에 useEffect가 실행되는것은 맞았다. 심지어 콘솔을 찍어본 결과 `데이터변환`이라는 변수가 `undefined` 가 나타났지만 `로딩중...`이 리턴되지 않았다. 여전히 처음에 깜빡거린다.

<br>

```jsx
const [loading, setLoading] = useState(false)

useEffect(() => {
  setLoading(true)
},[])

//...

{loading ? <UI/> : <div>로딩중...</div>}
```

더 확실하게 하기 위해서 아예 state와 useEffect를 사용해서 로딩처리를 해주려고 했지만 이 방법 또한 먹히지 않았다.

<br>

## 해결책

생각의 전환을 해서 react-query에 대해 생각해보았다. useQuery의 장점은 동일한 쿼리키를 사용한다면, 여러 요청에 대해서 한번만 요청한다. 그렇다면 과거에 요청했던 값을 다시 빠르게 가져오는동안에도 시간이 있지 않을까? 공식문서를 확인하자마자 답을 찾을 수 있었다.

```jsx
const { isLoading, isFetching } = useQuery(queryKey, queryFn);

if(isLoading || isFetching) return <div>로딩중...</div>

```

이 방법으로 바로 해결했다.. 정말 쉬운 문제를 어렵게 생각하다 삽질을 했다. 이 방법이 안먹히면 suspense도 사용해보려 했는데(안됐을것 같다.) 해결되서 다행이다!