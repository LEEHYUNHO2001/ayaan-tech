---
title: "useRef의 파라미터에서 타입"
description: "TypeScript 환경에서 useRef를 사용하고 있었다. 그리고 이 ref값을 함수나 훅스에 넘겨주는 과정에서 문제가 생겼다."
date: 2022-05-04T02:02:23.568Z
tags: ["React","next","typescript"]
---
```jsx
  const rootRef = useRef(null);
  const size = useResize(rootRef);

  return <div ref={rootRef}></div>
```

TypeScript 환경에서 useRef를 사용하고 있었다. 그리고 이 ref값을 함수나 훅스에 넘겨주는 과정에서 문제가 생겼다.

<br>

```jsx
export const useResize = (ref: any) => {
  //...
}
```

파라미터의 타입을 알 수가 없었던 것이다. 에러를 확인해보면 `MutableRefObject`를 사용하라는데 나는 이걸로 해결이 안되었다.

[Stack Overflow](https://stackoverflow.com/questions/58017215/what-typescript-type-do-i-use-with-useref-hook-when-setting-current-manually)를 참고한 결과 이 경우에는 `RefObject`를 사용하면 된다고 한다.


<br>

```jsx
  const rootRef = useRef<HTMLDivElement>(null);
  const size = useResize(rootRef);

  return <div ref={rootRef}></div>
```

먼저 useRef 자체에도 타입을 선언해준다.

<br>

```jsx
export const useResize = (ref: RefObject<HTMLDivElement>) => {
  //...
}
```

그 후에 파라미터에서는 이와 같이 넣어주면 된다. 나는 현재 div에 ref값을 넣어주어 HTMLDivElement를 사용했지만, 다른 경우에는 다른 타입을 넣어주면 된다.