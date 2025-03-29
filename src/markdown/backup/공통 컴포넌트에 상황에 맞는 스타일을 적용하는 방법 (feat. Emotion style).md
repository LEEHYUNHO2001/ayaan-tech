---
title: "공통 컴포넌트에 상황에 맞는 스타일을 적용하는 방법 (feat. Emotion style)"
description: "자세가 동일한 마네킹이 다른 옷만 입고 있다. 이런 경우에는 마네킹을 찍어내는 공장을 만들고 옷만 다르게 입히자."
date: 2022-07-14T01:25:31.947Z
tags: ["CSS","JavaScript","React","next","typescript"]
---
# 공통 컴포넌트에 다른 UI 적용하기

![](/images/b659a43b-ee90-401d-9f2f-2c8d4cadc352-image.png)

프로젝트를 설계하다 보면, 관심사의 분리를 하기 위해 또는 코드가 매우 길어져 특정 부분을 컴포넌트로 따로 뺀다. 특히 같은 구조를 지닌 부분이 반복되는 경우 공통 컴포넌트로 사용하기 위해서 `common` 디렉터리에 설계하게 된다. 어떤 경우에 공통 컴포넌트로 사용하고, 어떻게 구현할 수 있을지 알아보자. 그리고 이 글의 핵심인 **공통 컴포넌트에 다른 UI를 어떻게 적용**할 수 있을지 알아보자.

<br>

## 공통 컴포넌트로 사용할 부분

```jsx
//index.tsx
<form>
  <div>
    <label htmlFor="first_name">First Name</label>
    <input 
      type="text" id="first_name" 
      name="first_name" placeholder="First Name" 
    />
  </div>
  //...
</form>
```

First Name을 입력할 수 있는 UI 코드를 작성해보면 이와 같다.  위 사진처럼 구현하기 위해 form에 input을 모두 채우면 코드는 매우 길어질 것이다. 그리고 유지보수하기에도 나쁘고, 가독성도 떨어진다. 우리는 이것을 공통 컴포넌트로 빼올 것이다.

<br>

### 공통 컴포넌트 만들기

```jsx
//index.tsx
<Input 
  label="First Name" 
  name="first_name" 
  placeholder="First Name" />
```

가장 먼저 생각해야 할 것은 "내가 어떤식으로 저 반복되는 부분을 아름답게 생성할까" 이다. 나는 정말 필요한 부분만 props로 넘겨주기만 하면, label과 input을 감싸는 div가 있는 컴포넌트를 얻고 싶었다.

<br>

```jsx
//common/Input.tsx
export const Input = ({label, name, placeholder}) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <input 
      type="text" id={name} 
      name={name} placeholder={placeholder} 
    />
  </div>
)
```

이제 원하는 대로 Input 컴포넌트를 설계하면 된다. props로는 label, name, placeholder가 넘어올 것이고 이 값을 이용해서 동적으로 컴포넌트가 생성될 수 있도록 구현했다. 

<br>

### 공통 컴포넌트 사용

```jsx
//index.tsx
<form>
  <Input 
    label="First Name" 
    name="first_name" 
    placeholder="First Name" />
  <Input 
    label="Last Name" 
    name="last_name" 
    placeholder="Last Name" />
</form>
//...
```

우리는 공통 컴포넌트를 이용해서 유사한 구조의 컴포넌트를 손쉽게 생성할 수 있게 되었다. 또한, `index.tsx`에서 코드량이 줄어 더 직관적으로 코드를 이해할 수 있게 되었다. 하지만 한 페이지에 이런 `Input`이 100개라면, 그것도 가독성이 좋고 유지보수하기 쉬울까?

<br>

### 데이터 분리

```jsx
//constants/InputData.ts
const InputData = [
  {
    label: "First Name",
    name: "first_name",
    placeholder: "First Name"
  },
  {
    label: "Last Name",
    name: "last_name",
    placeholder: "Last Name"
  },
]
```

데이터를 분리하면, 많은 Input을 한꺼번에 생성하더라도 어느정도 가독성을 유지할 수 있다. 특정 Input의 정보를 수정하고 싶다면 `InputData`를 확인하면 되는 것이다.

<br>

```jsx
//index.tsx
<form>
  {InputData.map(data => {
    const {label, name, placeholder} = InputData;
    return <Input 
      key={`Input-${label}`}
      label={label} 
      name={name} 
      placeholder={placeholder} />
  })}
</form>
```

`InputData`를 map 돌리면서 Input을 생성해주면 끝이다. 이렇게 하면 `index.tsx`에서 Input이 100개여도 코드가 늘어날 일도 없고 직관적이여서 보기 좋다.

<br>

## 공통 컴포넌트 UI

이제 우리는 `Input`컴포넌트를 통해 label과 input이 연결된 구조를 쉽고 가독성 좋게 생성할 수 있다. 하지만 이 공통 컴포넌트에 다른 UI를 적용하고 싶다면 어떻게 할까?

![](/images/fd794013-9b34-4bf3-93dd-f9882d6e4921-image.png)

예를 들면, 지금은 First Name 아래에 input 태그가 존재한다. 하지만, 다른 컴포넌트에서는 `Input` 컴포넌트를 사용해서 First Name 옆에 input 태그가 존재하도록 UI를 설계하고 싶은 것이다.

<br>

### 일단 원래 원하던 UI 구현

```jsx
import styled from '@emotion/styled'

export const Input = ({label, name, placeholder}) => (
  <div>
    <label htmlFor={name}>{label}</label>
    <input 
      type="text" id={name} 
      name={name} placeholder={placeholder} 
    />
  </div>
)

const Container = styled.div`
	display: flex;
	flex-direction: column;
`;
```

일단 간단하게 UI를 만들어보자. flex와 direction을 이용해서 label과 input을 위아래로 위치시켰다. 그렇다면 위에서 언급한 부분은 어떻게 설계 해야할까?

<br>

### 일반적인 조건부 스타일링 문제점

```jsx
<Input 
  key={`Input-${label}`}
  label={label} 
  name={name} 
  placeholder={placeholder} 
  component="index"
/>
```

처음에 선택한 방법은 `Input`컴포넌트를 생성할 때, 현재 어느 컴포넌트에서 사용하는지 알려주는 것이다.

<br>

```jsx
import styled from '@emotion/styled'

interface ComponentProps{
	component: string;
}

export const Input = ({label, name, placeholder, component}) => (
  <Container component={component}>
    <label htmlFor={name}>{label}</label>
    <input 
      type="text" id={name} 
      name={name} placeholder={placeholder} 
    />
  </Container>
)

const Container = styled.div<ComponentProps>`
	display: flex;
	${({component}) => component === "index" && 'flex-direction: column;'}
`;
```

그 후 `Input` 컴포넌트에서 `component`를 `Container`에 props로 넘겨 조건부로 스타일을 입히는 것이다. 이렇게 히면 `index` 컴포넌트에서 `Input`을 생성했을 경우에만 label과 input이 위아래로 위치된다.

<br>

```jsx
const Container = styled.div<ComponentProps>`
	display: flex;
	${({component}) => component === "index" && 'flex-direction: column;'}
	${({component}) => component === "index" && 'color: red;'}
	${({component}) => component === "index" && 'font-size: 16px;'}
	${({component}) => component === "index" && 'background-color: black;'}
`;
```

하지만 이 방법도 문제가 있다. 만약에 매우 많은 컴포넌트에서 `Input`을 생성하고, 이 경우마다 다른 UI를 가지면 CSS를 유지보수하는데 매우 힘들 것이다. 또한, 이렇게 스타일이 1개일리가 없다. 여러개의 스타일이 있는 경우 가독성은 더 안좋아진다.

<br>

### 나의 방법

```jsx
import { css } from '@emotion/react'

const IndexInput = css`
	flex-direction: column;
    color: red;
    font-size: 16px;
    background-color: black;
`;

const Container = styled.div<ComponentProps>`
	display: flex;
	${({component}) => component === "index" && IndexInput}
`;
```

여기서 부터는 내가 적용한 방법이다. (더 좋은 방법이 있다면 댓글로 알려주시면 감사하겠습니다.)

emotion에서 제공하는 css 메소드(?)를 이용하는 것이다. 사실 캐러셀을 설계할 때, 많이 사용했었는데 까먹고 있었다. 공통으로 사용될 스타일은 `Container` 자체에 넣어주고, 특정 컴포넌트에서 공통 컴포넌트를 사용할 경우 필요한 UI는 emotion의 `css`를 이용해서 정의한다. 그 후 `IndexInput`와 같이 정의된 `css`를 조건부 스타일링 해주면 된다.

<br>

## 마무리

공통 컴포넌트에 상황에 맞는 UI를 적용시키는 방법을 알아보았다. 많은 고민은 한 결과 emotion의 `css` 이용하는 방법을 생각해냈지만, 이게 효율적이고 확실한 정답인지는 모르겠다. 그래도 어느정도 가독성과 유지보수성을 증가시켰다. 더 좋은 방법이 있는지 추후에 알아보려고 한다.