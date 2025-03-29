---
title: "styled-components"
description: "styled-components는 CSS파일을 밖에두지 않고, 컴포넌트 내부에 넣기 때문에, CSS가 전역으로 중첩되지 않도록 만들어주는 장점이 있다. React 프레임워크를 주요 대상으로 한 라이브러리이다."
date: 2021-08-09T09:06:40.357Z
tags: ["CSS","React"]
---
>## styled-components란 ??

* 동일한 컴포넌트에서 컴포넌트 이름을 쓰듯 스타일을 지정한다.
* CSS파일을 밖에두지 않고, 컴포넌트 내부에 넣기 때문에, CSS가 전역으로 중첩되지 않도록 만들어주는 장점이 있다.
* React 프레임워크를 주요 대상으로 한 라이브러리이다.
<br />

>### 설치

```
npm i styled-components
```

>### 사용법

* **styled components 생성**
const 컴포넌트명 = styled.태그명
```jsx
import styled from 'styled-componets'
const Header = styled.header`
  height: 44px;
  background: white;
  position: relative;
  padding: 0;
  text-align: center;
  & h1{
  margin: 0;
  font-size: 17px;
  color: #333;
  line-height: 44px;
  }
`;
```
  1. Header 컴포넌트를 생성
  2. 해당 컴포넌트의 태그는 header
  3. header 안에 있는 h1태그의 style도 변경할 수 있음. 
  모든 태그를 새로운 컴포넌트로 만들경우 의미에 맞는 이름으로 설정하기 번거롭기 때문에 위와같은 작업으로 대체한다.
 <br />
 
 * **styled-components 사용**
```html
<Header>
	<h1>상세 이미지</h1>
</Header>
```
 <br />
* **다른 파일에서 컴포넌트 import**
```jsx
// Other.jsx
import styled from 'styled-componets'
import { Header } from ".HeaderStyle";

const Other = () => {
  return (
    <Header>
      <h1>다른 제목</h1>
    </Header>);
};
```
<br />

* **Global Style**
```jsx
import styled, {createGlobalStyle} from 'styled-componets'
const Global = createGlobalStyle`
    .slick-slide{
        display: inline-block;
    }
`;
```
위의 경우 slick 라이브러리(이미지를 드래그로 넘기며 볼 수 있음)를 사용하고 있다.
class 이름이 정해져있기 때문에 기본 css를 사용하면 정상적으로 작동하지 않는다.
프로젝트 전역으로 발동하는 createGlobalStyle을 사용하면 해결할 수 있다.
<br />
* **props**
```jsx
const myStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const useStyle = div`
  ${myStyle}
`;
```
자주 사용하는 css 속성을 변수로 담아 사용 가능하다.