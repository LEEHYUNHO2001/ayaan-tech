---
title: "SWR"
description: "Data fetch할때 사용하는 swr 모듈??"
date: 2021-09-13T03:12:42.061Z
tags: ["React","상태관리"]
---
>## React에서 상태관리

React로 개발하다보면 컴포넌트간 상태관리는 필수이다. Context API에서 더 나아가 우리는 Redux나 Mobx 등을 사용하여 불편함을 줄이며 상태관리를 하게된다. Redux에서 immer를 사용하여 불변성까지 쉽게 처리하고있다.

<br />

* Redux 문제점

![](/images/02dc0a74-c5fd-440e-b41d-b2737e94402e-%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202021-09-13%20105004.jpg)

하지만 위의 경우만 봐도 기능을 구현하기 위한 Request 하나에 성공, 실패까지 액션을 만들면 3개다. state도 3개 만들어주고, switch에서 case도 3개만들어주어야 한다. 

![](/images/ba8c2dc6-cd67-4673-8df9-78e0f8bb952b-%ED%99%94%EB%A9%B4%20%EC%BA%A1%EC%B2%98%202021-09-13%20105435.jpg)

비동기 처리를 위해 saga를 사용하면 제너레이터 함수와 그에 맞는 API들도 생성해주어야한다. 이렇게 생성한 로그아웃 기능을 사용할 컴포넌트에서 dispatch하면된다.

이처럼 **기능이 증가함에 따라서 코드는 점점 길어지고 반복적인 작업은 증가**할 것이다.

<br />

```js
useEffect(() => {
  fetch('/user').then(data => {
    store.dispatch({type: 'INIT', data})  
  })
}, [])
```
**상태 초기화**를 위한 고민도 해야한다. user 상태는 초기값으로 서버의 데이터를 사용한다고 가정하자. A, B, C 페이지에서는 user 상태가 필요하고, D 페이지에서는 필요하지 않을경우 app.js 전역 컴포넌트에서 선언한다면 효율이 좋지않다. 위의 코드를 A, B, C 파일에 추가를 해줘야한다. **코드가 반복**되고있다.

<br />

마지막으로 **상태 동기화 문제**가있다. user 상태가 1분 단위로 변경이 발생하는 데이터이기 때문에 초소 1분 주기로 상태도 함께 갱신해야한다고 가정하자. 각 화면에 setInterval이나 웹 소켓을 이용해 데이터를 실시간으로 동기화해주는 로직을 추가하면 되지만 점점 복잡해진다.



<br /><br />

>## SWR이란??
Stale-While-Revalidate

원격 데이터 fetch를 위한 모듈이다. 
원격서버의 상태를 가져와서 React 컴포넌트에 준다.

<br />

```jsx
import useSWR from 'swr'

function Point(){
  const {data, error} = useSWR('/api/points', url => {
    return fetch(url).then(res => res.json())
  })
  
  if(error){
    return <div>failed to load</div>
  }
  if(!data){
    return <div>Loading..</div>
  }
  return <div>{data}</div>
}
```
* useSWR 은 첫번째 인자로 원격상태에 대한 key 를, 두번째 인자로 데이터 fetch 함수를 받는다.

* 첫번째 인자는 두번째 fetch 함수의 첫번째 인자로 전달된다.

* fetch 함수가 데이터를 로드하면 해당 응답이 data 로 세팅되고 오류 발생시 해당 오류가 error 에 세팅된다.

* 컴포넌트에서는 data 와 error 상태에 따라 알맞게 결과를 렌더링 해주면 된다.


<br />

```jsx
import useSWR from 'swr'

const Profile = () => {
    const fetcher = (url) => axios.get(url).then((result) => result.data);
    const {data:followersData, error:followerError} = useSWR(
        `/user/followers`, fetcher);
    const {data:followingsData, error:followingError} = useSWR(
        `/user/followings`, fetcher);

    if(followerError || followingError){
        console.error(followerError || followingError);
        return '팔로잉/팔로워 로딩 중 에러가 발생했습니다.';
    }

    return(
        <>
            <Head>
                <title>내 프로필</title>
            </Head>
            <AppLayout>
                <NicknameEditForm />
                <FollowList header="팔로잉" data={followingsData} 
                loading={!followingsData && !followingError}/>
                <FollowList header="팔로워" data={followersData} 
                loading={!followersData && !followerError}/>
            </AppLayout>
        </>
    );
};
}
```
이와같이 사용하면서 Redux를 대체할 수 있다. (로컬상태를 다루듯이 사용가능)

 * useSWR은 첫번째 인자로 원격상태에 대한 key를, 두번째 인자로 fetcher을 넣어주었다. 
 
* fetcher는 이 주소를 어떻게 실제로 가져올지에 대한것을 적어준다.
 
* fetcher를 어떻게 커스터마이징 하느냐에 따라 graphql도 쓸 수 있다.

* data와 error 둘다 없으면 로딩중, 둘중에 하나라도 있으면 성공 또는 실패다.

* data와 error 이름이 겹치므로 위 코드에서는 바꾸어주었다.

* 변경된 즉시 데이터가 보여져야 한다면 mutate함수나 mutation을 사용할 수 있다.

<br />

```jsx
import useSWR from 'swr'

function useCounter(){
  const {data, mutate} = useSWR('state', () => window.count)
  return {data, mutate: (count) => {
    window.count = count
    return mutate()
  }}
}

function Counter(){
  const {data, mutate} = useCounter()
  
  const handleInc = () => mutate(data + 1)
  const handleDec = () => mutate(data - 1)

  return (
      <div>
        <span>count: {data}</span>
        <button onClick={handleInc}>inc</button>
        <button onClick={handleDec}>dec</button>
      </div>
  )
}
```
 동기적 상황만을 고려하는 카운터를 Redux 없이 SWR만을 이용하면 위와 같이 구현할 수 있다.

<br /><br /><br /><br /><br /><br /><br />

[min9nim](https://min9nim.vercel.app/2020-09-04-react-swr/) [Hyosik](https://velog.io/@gytlr01/SWR-%EC%A0%95%EB%A6%AC) [jaeseokim](https://jaeseokim.tistory.com/113) zerocho