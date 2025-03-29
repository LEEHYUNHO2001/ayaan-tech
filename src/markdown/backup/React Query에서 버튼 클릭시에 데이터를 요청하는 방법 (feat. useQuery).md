---
title: "React Query에서 버튼 클릭시에 데이터를 요청하는 방법 (feat. useQuery)"
description: "프로젝트를 설계하다가 특정 이벤트를 발생할 경우 데이터를 요청하는 구조가 필요했다.  useQuery를 이용하여 무지성으로 구현하는 방법과 정석으로 구현하는 방법을 알아보자."
date: 2022-06-23T03:16:05.273Z
tags: ["JavaScript","React","next","typescript","상태관리"]
---
# 버튼 클릭시 데이터를 요청하는 예시

프로젝트를 설계하다가 특정 이벤트를 발생할 경우 데이터를 요청하는 구조가 필요했다. 이와 같은 로직이 필요한 경우는 여러 가지가 있다. 검색창을 구현할 때 `input`에 텍스트를 입력을 하고 검색 `button`을 클릭하면 그제서야 데이터를 요청하고, 이 데이터를 이용해서 UI를 그려주어야 하는 상황이 하나의 예시이다. 또 다른 상황으로는 infinite scroll에서 유저가 스크롤을 최하단으로 내리면 새로운 데이터를 받아와야 할 것이다.

React Query의 useQuery를 사용하면서 이런 상황에 마주했을 때, 무지성으로 하다가 정신차리고 더 좋은 상황은 없나 고민을 했다.

<br>

## 무지성 구현

undefined


일단 무지성으로 구현한 부분을 살펴보자. 이게 좋은 방법인지 엄청난 레거시인지는 모른다. 하지만 나는 불필요한 코드가 많이 생성되는 것을 보고 이건 분명 레거시다! 라고 느꼇다.

<br>

### 말은 되는 Component

```jsx
//component.tsx
  const [isClick, setIsClick] = useState(false);

  const { isLoading } = useGetDataAfterClick(isClick, setIsClick);

  const handleBtn = () => {
    setIsClick(true)
  }
  
  if(isLoading) return <div>loding...</div>

  //...

  <button onClick={handleBtn}></button>
```

컴포넌트에서 데이터가 필요하여 `useQuery`로 데이터를 요청하려고 한다. 우리는 당연하게 Custom Hooks로 만들어 줄 것이다. `button` 클릭 시 데이터를 요청하기 위해서 `isClick`이라는 `state`도 하나 생성해주었다. 어디서 사용하는지는 바로 아래에서 알아보자.

<br>

### Custom Hooks

```jsx
//Custom Hook
export const useGetDataAfterClick = (
  isClick: boolean,
  setIsClick: Dispatch<SetStateAction<boolean>>
) =>
	useQuery(
      ['get/dataAfterClick'],
      () => GetFetcher(),
      {
        enabled: isClick,
        onSuccess: () => {
          setIsMore(false);
      }
    );

```

`useQuery`의 인자에는 3가지가 들어간다. 순서대로 `key`, `fetch함수`, `options`이다. 옵션은 당연히 선택사항이다. 나는 여기서 `enabled` 라는 속성을 이용했다. 보통 `useQuery`는 호출되는 순간 데이터를 요청하지만, `enabled`값을 `false`로 주면 이 값이 `true`가 될 때까지 데이터 요청을 하지 않는다. 원래는 어떤 데이터를 불러오고, 이 데이터가 불러와져서 값이 생기면 그 후에 다시 다른 데이터를 요청하기 위해서 사용하기도 한다.

버튼을 클릭하면 `isClick`이 `true`가 되서 데이터 요청을 시도하고, 성공한다면 다시 `enabled`가 `false`로 변경된다. 클릭할 때마다 데이터가 요청될 수 있는 것이다.

<br>

### 구현 후 생각

undefined


사실 이렇게 구현하고 속으로는 나름 잘 구현했다고 생각했다. 하지만 이런 로직 하나당 state를 하나 생성해줘야하고, props drilling이 될 수 있고 드릴링을 피할려고 craeteContext를 사용하거나 상태관리를 하게 되면 또 코드가 늘어난다. 알면서도 외면하고 있었다 :( 그리고 이렇게 사용하다보면 이와 같은 부분이 많아졌을 때, 구조를 파악하는 과정에서 헷갈리기 시작하고 에러가 발생하면 '혹시 이렇게 구현한게 잘못된건가' 라는 생각이 많이 들었다.

(이 방법도 이와 같은 상황 외에 다른 상황에서 사용하면 또 좋게 활용할 수도 있을 것 같다. 물론 그 상황이 무슨 상황일지는 모르겠다.)

<br>

## refetch 이용

### 깔끔해진 Component

```jsx
//component.tsx
  const { isLoading, refetch } = useGetDataAfterClick();

  const handleBtn = () => {
    refetch();
  }
  
  if(isLoading) return <div>loding...</div>

  //...

  <button onClick={handleBtn}></button>
```

벌써부터 refetch의 효과가 보인다. `isClick`으로 관리하던 `state`가 사라졌고, 커스텀 훅인 `useGetDataAfterClick`에 `props`로 내려주던 `state`가 없어 의존성이 감소했다.

<br>

### 깨끗해진 Custom Hook

```jsx
//Custom Hook
export const useGetDataAfterClick = () =>
	useQuery(
      ['get/dataAfterClick'],
      () => GetFetcher(),
      {
        enabled: false,
        onSuccess: () => {
          //Data Transform
      }
    );
```

이제 props로 무언가 안받아와도 되서 깔끔해졌다. `enabled`를 `false`로 두면서, 선언과 동시에 데이터를 `Get`하는 것은 방지했다. 이제 컴포넌트에서 보이는 것처럼 `refetch()`를 통해 특정 이벤트에서 데이터를 요청하도록 할 수 있게 되었다. 이제 `onSuccess`에서도 `GetFetcher`로 원하는 엔드포인트에서 `Get`요청을 하여 반환 받은 데이터를 개발자 입맛에 맞게 변경하는 작업만 해주면 되서 직관적일 것이다. 더이상 여기서 `enabled`를 핸들링하지 않아도 되는 것이다.

<br>

## 문제점인줄 알았던..

undefined

`refetch()` 함수는 자식 컴포넌트에게 `props`로 넘겨줄 수 있을까? 결론 부터 말하면 넘겨줄 수 있다. 근데 나는 넘겼을 때, 정상적으로 동작하지 않아서 안되는 건줄 알았다. 하지만 내 코드의 문제였고, 이에 대해서 삽질한 간단한 헤프닝이 있었다.

<br>

## 모두 다 알고있는 꿀팁

```jsx
const { refetch:btn1Refetch  } = useBtn1();
const { refetch:btn2Refetch } = useBtn2();
const { refetch:btn3Refetch } = useBtn3();
```

만약에 하나의 컴포넌트에 버튼이 매우 많고, 버튼에 따라 요청할 데이터가 다른 경우가 있다. 예를 들어, 이런 버튼이 3개라면 커스텀 훅도 3개일 것이고 `refetch()`도 3개이다. 하지만 같은 이름을 사용하는것은 불가능하다. `:`를 이용해서 새로운 이름을 붙여주면 사용할 준비 완료이다.

<br>

## 교훈

[공식 문서](https://react-query.tanstack.com/reference/useQuery)를 잘 보자. 기능을 구현하기 전에는 공식 문서를 확인해보는 습관이 중요한 것 같다. 최근들어 기능을 일단 구현한 다음에 더 좋은 방법이 있는지 검색하는 경우가 많았다. 물론 공부하는데 좋지만, 좋은 방법을 찾은 경우 이 코드로 리팩토링할 때 너무 힘들다...
