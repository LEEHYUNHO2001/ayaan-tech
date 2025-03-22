---
title: "Recoil - Duplicate atom key ~~~ 에러 해결"
description: "Recoil에서 발생한 Duplicate atom key 문제를 해결해보자."
date: 2022-04-20T09:51:20.882Z
tags: ["React","next","상태관리"]
---
![](/images/e48654da-e6d8-4c95-b5d0-e1a0defe9406-image.png)

Recoil을 사용하던 도중 에러를 만났다. 

동작 상황은 이렇다. 유저가 쿼리스트링이 포함된 링크를 타고 웹에 접근하는데, 만약 로그인이 되어있지 않다면 해당 쿼리스트링 값을 기억한채로 로그인 화면으로 간다. 그리고 로그인을 하게되면 기억했던 쿼리스트링 값을 이용하여 처음에 원했던 URL로 가는 로직이다.

이 과정에서 `setState` 부분에 쿼리스트링을 뽑아서 넣었는데 에러를 만나게 된 것이다.

빌드가 안될 것 같아서 해결하고 넘어가기 위해 stack over flow를 서치했다.

[stack over flow](https://github.com/facebookexperimental/Recoil/issues/733)를 보면 많은 사람들이 이 문제에 대해서 언급하고있다. intercept-stdout 라는 라이브러리를 이용하여 경고 메세지를 안전하게 무시하는 방법을 발견했다.

```jsx
import { atom } from 'recoil';
import { v1 } from 'uuid';

export const qsCodeState = atom<string | string[] | undefined>({
  key: `qsCodeState/${v1()}`,
  default: '',
});
```

하지만 나는 나의 상황에 맞는 간단한 방법을 찾아 해결했다. uuid를 이용하여 난수를 생성하고, 이것을 키에 사용하는 것이다.