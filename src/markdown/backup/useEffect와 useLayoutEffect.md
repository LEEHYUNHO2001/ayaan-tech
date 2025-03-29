---
title: "useEffect와 useLayoutEffect"
description: "useEffect와 useLayoutEffect의 차이를 알아보고 next.js환경에서 무슨일이 일어나는지 확인해보자."
date: 2022-03-30T06:17:42.423Z
tags: ["React","next"]
---
# 함수형 컴포넌트

React를 이용하여 프로젝트를 설계할 때, 클래스형 컴포넌트와 함수형 컴포넌트를 사용할 수 있다. 과거에는 클래스형 컴포넌트를 사용했지만 시간이 흐르면서 함수형 컴포넌트를 많이 사용하는 것 같다. 그 이유는 클래스형에서는 constructor을 사용하여 state를 초기화하는 반면에 **함수형에서는 useState를 사용하여 코드의 길이가 줄어들고 가독성도 좋다.** 클래스형에서만 사용 가능한 라이프 사이클도 **Hook이 등장하면서 해결**되었다. 심지어 실제 **메모리 자원도 함수형이 덜 사용**한다.

그렇다면 클래스형 컴포넌트는 알 필요가 없을까? 당연히 아니다. 레거시 코드는 모두 클래스형으로 되어있고, 프로젝트 설계하다가 Stackoverflow 보면 참고할 자료들도 클래스형인 경우도 많다. 그리고 클래스형을 알고있다면 React에 대한 새로운 지식이 들어올 때, 조금 더 쉽게 이해할 수 있는것 같다.

<br>

## useEffect/useLayoutEffect

> [사진 출처](https://pubudu2013101.medium.com/what-is-the-real-difference-between-react-useeffect-and-uselayouteffect-51723096dc19)

### useEffect

![](/images/869a0e53-3d4f-4adb-b136-361995027b94-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-03-30%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%2012.01.06.png)

먼저 useEffect는 **비동기적**으로 실행된다. 즉, 위에서부터 아래로 코드가 있을 경우에 위의 코드의 결과값을 받기 전에 아래의 코드를 수행할 수 있다는 의미이다. 또한 컴포넌트들이 render 되고, 해당 컴포넌트가 paint되면 그때 useEffect가 실행된다. 

간단하게 브라우저 렌더링 과정을 살펴보면 HTML을 파싱하여 DOM Tree를 구성하고, CSS로 CSSOM Tree를 생성한다. 이 두개의 Tree 정보를 이용하여 실제로 브라우저의 화면에 노출되어야 하는 노드들에 대한 정보 Render Tree를 생성한다. 그 후에 reflow와 repaint 단계를 수행한다.

![](/images/1728ef91-cc59-423e-878d-9f53830451be-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-03-30%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%2012.27.33.png)

생성된 DOM 노드의 레이아웃 수치(너비, 높이, 위치 등) 변경 시 영향 받은 모든 노드의(부모, 자식 등) 수치를 다시 계산하여 렌더 트리를 재생성하는 과정을 reflow라고 한다. Reflow 과정이 끝난 후 재 생성된 렌더 트리를 다시 그리는 것을 repaint라고 한다.

보통 DOM을 조작할때마다 reflow와 repaint를 하기때문에 브라우저에서 성능 저하가 발생한다. virtual DOM을 사용하는 react의 경우에는 reflow와 repaint를 최소화 한다는 장점을 갖고 있다.

<br>

어쨋든 render와 paint가 이런것인데, useEffect는 paint 후에 실행되기 때문에 DOM에 영향을 미치는 코드가 있다면 다시 그리므로 화면 깜빡임이 발생한다.

<br>

### useLayoutEffect

![](/images/7fa5109d-0b98-4f60-9397-75c5324bd53f-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-03-30%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%2012.31.07.png)

useLayoutEffect는 동기적으로 동작하며 paint하기 전에 실행된다. 화면에 그리기 전에 수행되므로 useLayoutEffect에 DOM에 영향을 미치는 코드를 넣어도 화면 깜빡임이 발생하지 않는다. 렌더링 이전에 하고 싶은 동작이나 렌더링할 상태가 Effect 내에서 초기화 하는 경우에 활용할 수 있다.

하지만 동기적인 동작에서 발생하는 단점을 가지고 있다. 만약에 위의 코드가 데이터를 불러오는 부분인데 10초가 걸린다고 가정하면 유저는 10초동안 빈 화면을 보게 되는 것이다.

useEffect를 사용하여 설계하다가 뭔가 깜빡임에 문제가 있다면 useLayoutEffect를 사용하는것이 바람직하다. 애초에 공식문서에도 그렇게 권하고 있다. (잘 섞어쓰면 좋은것 같다..)

<br>

### 더 나아가..

![](/images/4660aab3-2f26-488d-8c36-81b5c1dbd636-%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA%202022-03-30%20%E1%84%8B%E1%85%A9%E1%84%92%E1%85%AE%2012.40.15.png)

useEffect가 paint 전에 발생하는 상황도 있다. 
useLayoutEffect에서 state 변경에 의한 re-render이다.

<br>

### useLayoutEffect 문제점

> Warning: useLayoutEffect does nothing on the server, because its effect cannot be encoded into the server renderer’s output format. This will lead to a mismatch between the initial, non-hydrated UI and the intended UI. To avoid this, useLayoutEffect should only be used in components that render exclusively on the client

Next.js에서 사용해보면 바로 에러를 만난다. CSR에서만 사용할 것을 권장하는데 SSR을 사용하기 때문이다. 하지만 SSR에서도 사용하고 싶은 경우가 있을 것이다. (사실 이 에러를 만나서 Velog를 작성하기 시작했다..)

```jsx
//@hooks/useIsomorphicEffect
import { useEffect, useLayoutEffect } from 'react'

export const useIsomorphicEffect = () => {
  return typeof window !== 'undefined' ? useLayoutEffect : useEffect
}

```

렌더링이 되어 window 객체가 생기는지에 따라 useEffect를 사용할지 useLayoutEffect를 사용할지 결정하면 된다. 커스텀 훅으로 만들어 놓자.

```jsx
import React, { useEffect, useLayoutEffect } from 'react'
import { useIsomorphicEffect } from './useIsomorphicEffect'

const App = () => {
  const isomorphicEffect = useIsomorphicEffect()
  
  isomorphicEffect(() => {
    // do something you want
  }, [])
  
  return (
    <div>
      Hellow world
    </div>
  )
}
```

그리고 사용할 부분에서 useIsomorphicEffect을 Effect로 사용하면 된다.



