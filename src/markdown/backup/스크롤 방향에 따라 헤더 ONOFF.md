---
title: "스크롤 방향에 따라 헤더 ON/OFF"
description: "항상 기능을 구현하다 보면 React에서 동작하던 기능이, pre-rendering을 수행하는 Next.js에서는 에러를 발생시킬 수 있다."
date: 2022-08-07T02:45:03.277Z
tags: ["CSS","JavaScript","React","next","typescript"]
---
# Next.js

항상 기능을 구현하다 보면 React에서 더 간단하게 구현할 수 있는 기능이, pre-rendering을 수행하는 Next.js에서는 추가 되야하는 로직들이 있을 수 있다. React에서 구현하던 것처럼 코드를 작성하면 에러를 만나기 때문이다. 이 글은 먼저 React에서 구현하는 방법을 설명하고, 이 코드를 그대로 사용하면 Next.js에서 어떤 에러를 만나는지 살펴보고 최종적으로 효율적인 기능을 구현해볼 것이다.

<br>

## 움직임에 따라 나타나는 헤더

![](/images/23ecaee9-bc8d-40a9-a8f0-6335e0f6f425-image.png)

스크롤을 아래로 내리면 헤더는 사라지고, 스크롤을 위로 올리면 헤더는 다시 나타나는 기능을 구현해볼 것이다. 스크롤을 위로 올린다는 것은 위에 내용을 보거나 다른 곳으로 이동하고 싶다는 의미이기 때문에 UX를 위한 기능이라고 볼 수 있다.

<br>

### 준비

```jsx
// Layout/Header.tsx

interface HeaderProps {
  children: JSX.Element;
}

export const Header = ({ children }: HeaderProps) => (
  <div>
    <HeaderText>헤더</HeaderText>
    {children}
  </div>
);

const HeaderText = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 30px;
  font-size: 20px;
`;
```

헤더를 사용하고 싶은 페이지에 레이아웃으로 끼워넣을 수 있도록 컴포넌트를 생성해주었다.

<br>

```jsx
// pages/index.tsx

const Home: NextPage = () => (
  <Header>
    <Container></Container>
  </Header>
);
const Container = styled.section`
  width: 100vw;
  height: 300vh;
  background-color: palegreen;
`;
```

나는 Home이라는 인덱스 페이지에서 Header라는 레이아웃을 사용하고 있다. 이제 위에 이미지처럼 나타난다. 구현하고싶은 기능을 위한 준비가 된 것이다.

<br>

### window 를 사용하는 방법

#### React 버전

```jsx
// pages/index.tsx

const Home: NextPage = () => {
  const [position, setPosition] = useState(window.pageYOffset);
  const [visible, setVisible] = useState(true);
  
    useEffect(() => {
    const handleScroll = () => {
      const moving = window.pageYOffset;
      setVisible(position > moving);
      setPosition(moving);
  	}
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [position]);
  
  return (
    <Header visible={visible}>
    	<Container></Container>
  	</Header>
  )
}
```

`position`을 현재 스크롤의 scroll y값으로 초기화 시켜 놓는다. `useEffect`가 실행되면 현재의 scroll y값을 구하여 `position`과 비교하여 `visible`값을 변경한다. 만약 `visible`가 `false`면, 스크롤을 숨겨야할 것이다. 이 부분은 `css`로 추후에 처리할 것이다.

그리고 현재 scroll y값을 `position`에 넣는 것으로 `handleScroll`함수가 끝난다. 이제 스크롤이 발생할 때마다 `handleScroll`함수를 실행하고, 끝나면 리턴해주며 클린업과정을 거친다. 마지막으로 `useEffect`에 2번째 인자값으로 `position`값을 넣어 이 값이 변경되면 다시 실행되도록 플로우를 구성했다.

그 결과 스크롤을 위로 올리면 `visible`는 true가 되고, 내리면 false가 된다.

<br>

#### Next 버전

```jsx
// hooks/useWindow.ts

import { useEffect, useState } from 'react';

export const useWindow = () => {
  const [isWindow, setIsWindow] = useState(false);
  
  useEffect(() => {
    if (typeof window !== undefined) {
      setIsWindow(true);
    }
  }, [isWindow]);

  return isWindow;
};
```

일단 next.js는 React에서 구현했던 코드를 그대로 넣어보면 바로 에러가 나타나는것을 확인해볼 수 있다. 그 이유는 pre-rendering에서는 window객체가 없기 때문이다. 여기서 한 가지 꼼수를 넣어줘야 한다. 그 부분을 Custom Hook로 생성할 수 있는데, 여기서는 사용하지 않을 것이다. (어떤 훅인지 맛보기)

<br>

```jsx
// pages/index.tsx
  const [position, setPosition] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [position]);

  const handleScroll = useCallback(() => {
    const moving = window.pageYOffset;
    setVisible(position > moving);
    setPosition(moving);
  }, [position]);
```

`useWindow`도 사용하지 않고 구현하는 방법이다. `position`의 초기화를 `window.pageYOffset`가 아닌 `0`으로 하는 것이다. 그리고 `handleScroll`에서는 현재 scroll y값을 구하여 `position`과 비교한다. 사실 스크롤 위치가 0인 상태에서 스크롤 이벤트가 발생하는 경우는 아래로 스크롤한 경우밖에 없으므로 버그들은 고려하지 않아도 된다.

useCallback을 이용한 이유는 useEffect에서 함수를 떼어놓고 싶어서 사용한 것이다. 이것도 `position`값이 변경될 때만 함수가 새로 선언될 수 있도록 설계해주면 된다. 이제 Next.js에서도 기능이 정상적으로 동작한다.

<br>

![](/images/2d36eb0e-a42f-47ad-88a6-f77b316e2e20-image.png)

하지만 이 방법은 스크롤을 할 때마다 state가 변경되고 useEffect가 실행되며 handleScroll가 다시 선언된다. 실제로 `console.log(position)`을 `handleScroll`에 넣어보면 스크롤시 수 많은 로그들이 찍히는 것을 볼 수 있다.

<br>

### Ref와 loadsh 사용

```jsx
  const [visible, setVisible] = useState(true);
  const beforeScrollY = useRef(0);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = useMemo(
    () =>
      throttle(() => {
        const currentScrollY = window.scrollY;
        if (beforeScrollY.current < currentScrollY) {
          setVisible(false);
        } else {
          setVisible(true);
        }
        beforeScrollY.current = currentScrollY;
      }, 250),
    [beforeScrollY]
  );
```

이제 `useEffect`는 `position`이 변경되어도 다시 실행되지 않는다. 애초에 `position`이라는 state가 사라졌고, ref로 컨트롤하기 때문에 성능이 더 좋아졌다. 마지막으로 `throttle`을 사용함으로써 성능을 증가시켰다. `throttle`이란 함수가 한 번 호출되면 지정된 시간 안에 여러번 실행되지 않도록 해준다.`loadsh`에 있는 메소드이므로 `yarn add lodash`로 설치를 해줘야 한다. (`lodash`는 유용한 메소드들을 제공하는 라이브러리이다.)

<br>

![](/images/36ad08f0-47fc-45c1-96d9-20234cf23cb0-image.png)

스크롤시 눈에 띄게 콘솔이 적게 찍히는 것을 볼 수 있다. `throttle`의 2번째 인자에 1000을 주면 1초동안 같은 함수가 호출되지 않아서 더욱 콘솔이 적게 찍힌다. 하지만 스크롤을 위로 올렸을 경우 헤더가 나타나야 하는데, 1초뒤에 나타난다면 사용자는 매우 답답할 수 있다. 그래서 나는 사용자가 그나마 빠르다고 생각하고, 효율도 증가시키기 위한 합의점을 0.25초로 설정해주었다.

<br>

## 마무리

기능을 직접 구현해보고, 내가 구현한 기능이 효율적인지 고민하며 리팩토링 했다. 그 다음에는 이 리팩토링한 코드가 정말 효율적인지, ref나 observer를 사용하면 더 효율적일 것 같은데 다른사람은 어떻게 구현했는지를 찾아보았다. 결국 throttle까지 적용하면서 나름 효율적인 기능 구현을 할 수 있었다. 역시 가장 좋은 공부가 되는 방법은 내가 생각하기에 가장 효율적인 코드를 작성해본 후에 다른 개발자는 어떻게 구현했는지 찾아보는 것이라고 다시 한번 생각하게 되었다.