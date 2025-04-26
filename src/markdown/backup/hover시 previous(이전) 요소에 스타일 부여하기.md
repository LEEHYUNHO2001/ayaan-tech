---
title: "hover시 previous(이전) 요소에 스타일 부여하기"
description: "Element를 hover할 경우 다음(Next) Element도 hover한 효과를 구현하는 것은 css를 이용하여 쉽게 할 수 있다. 하지만 이전(previous) Element들에게도 hover 효과를 넣는 것은 다른 문제다..."
date: 2022-08-17T09:58:41.207Z
tags: ["CSS","JavaScript","React","next","typescript"]
---
# hover시 이전 요소에도 hover 기능 넣어보기

- Stack
  - Next.js
  - Typescript
  - Emotion.js

> :hover란? CSS 의사 클래스는 사용자가 포인팅 장치를 사용해 상호작용 중인 요소를 선택


먼저 이 글의 핵심 내용들을 알아보기 전에, 특정 요소에 hover시 다음 요소도 hover한 효과가 나타나는 것은 어떻게 구현할 수 있을지 생각해보자.

같은 부모를 공유하는 자식이 있다고 가정해보자. 예를 들면, `ul` 태그 아래에 `li`태그가 3개 존재하는 것이다. Element를 hover할 경우 **다음(Next) Element도 hover한 효과**를 구현하는 것은 **CSS**를 이용하여 쉽게 할 수 있다. 바로 결합자들 중에서 **일반 형제 결합자(~)** 또는 **인접 형제 결합자(+)** 를 사용하는 방법이다.

하지만 **Element를 hover할 경우 이전(previous) Element들에게도 hover 효과**를 넣어주기 위해서는 생각이 조금 필요하다. 나도 정말 별거 아닌 기능이라고 생각했다가 상당히 애먹었다.

<br>

## 애먹은 이유

> Unfortunately not possible with only CSS

그 이유는 [stackoverflow](https://stackoverflow.com/questions/25203608/change-previous-element-on-hover)에서 볼 수 있듯이 css만 사용해서는 구현할 수 없기 때문이다. 처음에 나는 CSS만을 이용해서 할 수 있는 방법이 있지는 않을까 라는 생각으로 선택자와 결합자를 계속 고민했었다. 결국 포기하고 다른사람은 어떻게 구현했을지 궁금하여 검색해보았지만 역시 CSS만을 이용해서는 불가능했던 것이다.

jQuery를 이용해서는 `prev()`와 같은 것들을 사용하여 구현할 수 있었다. 하지만 나는 Next.js를 사용하고 있었고, 어떻게 구현할 수 있을지.. 다시 생각에 잠기게 되었다. 일단 어떤 상황인지 개발자답게 코드로 알아보자.

<br>

### 상황 설명

```jsx
export const Component = () => {
  const data = [
    {name: "카드"},
    {name: "카드"},
    {name: "카드"}
  ];
  
  return (
    <ul>
      {data.map((card, index) => <Card key={index}>카드</Card>)}
    </ul>
  )
}
```

카드를 생성하기 위한 객체 배열 `data`가 존재하고, 이 데이터로 `map`을 돌리며 UI를 출력한다. (key는 index를 넣으면 좋지 않지만 여기서는 넘어가자..) CSS코드를 굳이 볼 필요는 없을 것 같아 Card에 적당한 디자인을 한 상태라고 가정하겠다.

<br>

![](/images/bb423e9d-e54d-4007-b0c9-f90d4331679b-image.png)

브라우저를 확인해보면 3개의 카드가 출력된 것을 볼 수 있다. 카드에 마우스를 올리면(hover), `background-color: red`가 될 수 있도록 구현하고 싶다. 하지만 여기서 끝이 아니라 2번째 카드에 hover시 첫 번째 카드도 hover된 효과가 나타나야 하며, 3번째 카드에 hover하면 첫 번째와 두 번째 카드도 hover되어야 한다.

<br>

### onMouseEnter와 onMouseLeave

```jsx
  <Container
    onMouseEnter={함수}
    onMouseLeave={함수}
  >
  //...
  </Container>
```

React에는 특정 요소에 마우스를 올리는 이벤트가 발생했을 경우 특정 액션을 취해줄 수 있는 `onMouseEnter`가 있다. 그리고 마우스가 해당 요소에서 벗어날 경우에는 `onMouseLeave`를 사용해줄 수 있다.

<br>

### 부모 컴포넌트

```jsx
// Component.tsx
export const Component = () => {
  const [hover, setHover] = useState(-1);
  
  const onMouseEnter = useCallback((index: number) => {
    setHover(index);
  }, []);

  const onMouseLeave = useCallback(() => {
    setHover(-1);
  }, []);
  
  return (
    <ul>
      {data.map((card, index) => <Card key={index} 
                                   onMouseEnter={onMouseEnter}
                                   onMouseLeave={onMouseLeave}
                                   isHover={index <= hover}
                                   />)}
    </ul>
  )
}
```

이제 Card는 따로 컴포넌트로 만들었다고 가정한다. 그리고 자식 컴포넌트에서 사용할 onMouseEnter와 onMouseLeave에 대한 함수를 부모 컴포넌트에서 생성했다.

호버할 경우 몇 번째 인덱스가 호버 되었는지 알 수 있도록 `hover`라는 `state`를 생성했다. 그리고 호버하면 해당 인덱스값을 저장하기 위해 `onMouseEnter` 함수도 선언해주었다. 카드가 3개이므로 첫 번째 카드에 호버하면 `hover`는 `0`이 되는 것이다. 마우스가 Element에서 벗어나면 `hover`는 `-1`이 되도록 `onMouseLeave`함수도 구현했다.

<br>

![](/images/8ef530cd-a0c5-48b5-9921-5b2159aa33b2-image.jpg)

마지막으로 포인트는 **isHover**이다. 자신만의 index를 가진 Card 컴포넌트가 `hover`보다 작거나 같은지 비교한다. `isHover`가 `true`면 모두 호버된 것처럼 효과를 넣어주기 위해서이다. 예를 들어 두 번째 카드를 호버했다고 가정하자. `hover`은 `1`이 되고, `Card` 요소에서 `index`가 `1`보다 작거나 같은 첫 번째와 두 번째 카드의 `isHover`가 `true`가 되는 것이다.

<br>

### 자식 컴포넌트

```jsx
// Card.tsx

interface Props{
  isHover: boolean;
  onMouseEnter: (index: number) => void;
  onMouseLeave: () => void;
}

interface IsHoverStyled {
  isHover: boolean;
}

export const Card = ({onMouseEnter, onMouseLeave, isHover }:Props) =>
<Card
  onMouseEnter={onMouseEnter}
  onMouseLeave={onMouseLeave}
  isHover={isHover}
  >
  카드
</Card>

const Card = styled.div<IsHoverStyled>`
  background-color: ${({ isHover }) => (isHover ? 'red' : 'blue')};
`;
```

이제 부모로 부터 받은 함수와 isHover를 Card 컴포넌트에서 사용해주면 된다.

<br>

## 마무리

CSS만 이용해서 설계할 수 있는 기능이라고 단정하고 기능을 구현하다보니 어려움이 있었다. 모든 기능을 스스로 구현해보는 것도 좋지만 검색 한번 해보는 것도 좋을 것 같다.

사실 이 기능은 검색해서 CSS만으로 구현 안된다는 힌트만 얻었고, 구현은 결국 직접 했지만 그 힌트를 얻은게 어디인가 싶다..