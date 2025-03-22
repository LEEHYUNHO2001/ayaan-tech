---
title: "ContextAPI에서 useState로 관리하는 값을 Provider로 내려주기"
description: "오늘은 간단하게 To fix this consider wrapping it in a useMemo hook 에러를 해결하는 방법을 알아보자."
date: 2022-06-28T09:53:17.451Z
tags: ["JavaScript","React","next","typescript","상태관리"]
---
![](/images/63480bee-6faa-4952-8e94-07413a69814f-image.png)

ContextAPI를 오랜만에 사용하려는데 경고가 나타난다. 아마 `useState`로 관리하는 값을 `Provider`에 `value`로 넘겨주다보니 렌더링을 너무 많이 해서 그런 것 같다. [Stack Over Flow](https://stackoverflow.com/questions/71233273/the-object-passed-as-the-value-prop-to-the-context-provider-changes-every-render)에서 힌트를 찾을 수 있었다.

<br>

```jsx
  const [ inputValue, setInputValue ] = useState('');

  const UserSearchProvider = useMemo(
    () => ({  inputValue }),
    [ inputValue ]
  );

  <UserSearch.Provider value={UserSearchProvider}>
    //...
  </UserSearch.Provider>
```

`useMemo`를 사용하면 쉽게 해결할 수 있다.


