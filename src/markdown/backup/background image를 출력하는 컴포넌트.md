---
title: "background image를 출력하는 컴포넌트"
description: "이미지를 출력하는 방법 중 좋은 방법?"
date: 2023-10-08T06:29:20.336Z
tags: ["CSS","JavaScript","React","html","next","typescript"]
---
## 이미지를 출력하기 위한 방법들

오늘의 주제인 **props로 background image 받는법**을 알아보기 전에, 먼저 `CSS`의 `background image`를 사용하면서 평소에 들었던 생각을 공유하겠다.

보통 이미지나 아이콘을 출력할 때, `img` 혹은 `i` 태그를 이용한다. 이렇게 `HTML` 태그를 이용하여 출력하는 방법 외에 `CSS`의 `background-image` 를 사용할 수도 있다. 그렇다면 어떤 경우에 무슨 방법을 사용하는 것이 좋을까?

![](/images/c735e848-efa4-4afd-b630-5d041b2f21f9-image.jpg)

백그라운드 이미지의 성격을 가진 UI가 필요한 상황이라면, 굳이 `img` 태그를 사용하지 않고 CSS를 이용하는 편이다. 그 이유는 **스크린 리더에 읽힐 이유가 없기 때문**이다.

보통 `img` 태그를 사용하는 경우 `alt`를 넣어준다. 이미지가 정상적으로 로딩되지 않았을 경우 `alt`로 설정한 텍스트가 출력되기 위함이기도 하지만, 눈이 불편한 사람들을 위해 올바른 스크린 리더를 제공하고, 검색 엔진에 최적화 되기 위함이다. 하지만 보통 백그라운드 이미지의 경우 이와 같은 특징들이 필요하지 않기 때문에, 나는 백그라운드의 성격을 가진 이미지는 태그를 사용하지 않는다.

![](/images/1d098fe3-30b1-44f8-813e-badf6d8c5cdc-image.png)

이 외에도 태그를 사용할지 CSS의 속성을 사용할지는 개발하는 관점에 따라 선택하면 된다. 예를 들어, 소셜 로그인이 있다고 가정하자. `'네이버 로그인'` 이라는 버튼 좌측에 `네이버 로고 N`이 있다. 이 경우 `네이버 로고 N`은 `CSS`의 `background image` 속성을 이용하여 출력해도 좋다고 생각한다. 어차피 네이버 로그인이라는 텍스트가 존재하기 때문에, **좌측 로고 이미지에 `img` 태그를 이용한다고 해서 `SEO`에 더 유리할 것 같지 않다.**

![](/images/4176876a-8b33-424c-81f4-d29e04d6f8e3-image.jpg)

그리고 스크린 리더에 해당 로고에 대한 정보가 표시되지 않더라도, `네이버 로그인` 텍스트 존재로 인해, 시각 장애인 분들이 웹 서비스를 이용하는데 **불편함을 느끼지 않을 것**이라고 생각한다. **오히려 `img` 태그로 이루어져 있다면, `네이버 로고, 네이버 로그인` 과 같이 읽혀 불편할 수**도 있다.

<br>

## 백그라운드 이미지에만 속성 추가

```jsx
// 1. B에 background-image
<A>
  <B />
  ...
</A>

// 2. A에 바인딩된 클래스 가상요소에 background-image
<A>
  ...
</A>

```

보통 태그에 바인딩 된 클래스에 `background-image` 속성을 부여해서 백그라운드 이미지를 설정한다. 하지만 나는 위의 2가지 패턴을 주로 사용한다. 그 이유는 아래와 같다.

`A` 태그에 `background-image`로 배경 이미지를 출력했다고 가정하자. 그런데 갑자기 **백그라운드 이미지에만 opacity 살짝 넣어주세요** 라는 요청이 온다면 어떻게 하겠는가? 일차원 적인 생각으로 `A` 태그에 바인딩된 클래스 자체에 `opacity` 속성을 부여하면, 안에 있는 요소들까지 함께 투명해질 것이다.

![](/images/1de1f320-aaa2-4479-a30a-18f6b4eb4ca1-image.png)

해결 방법은 `A` 태그의 가상요소를 이용하던가, `B`라는 태그를 만들어 `background-image`를 설정하고, `A`태그 영역만큼 크기를 주면 된다.

## 가상 요소 선택자

```css
.header {
    position: relative;
    width: 100%;
    height: 200px;
    &::before {
        content: "";
        z-index: -1;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        opacity: 1;
        background-image: url('...');
        background-size: cover;
        background-repeat: no-repeat;
    }
}

```

나는 위에서 제안한 방법 중 2번째 방법을 많이 사용한다. **백그라운드 이미지만을 위한 태그를 만드는 것이 좋은 방법은 아니**라고 생각하기 때문이다. 그래서 가상 요소 선택자를 이용한 백그라운드 설정을 했었다. 가상 요소 선택자를 이용하면, 하나의 태그에서 백그라운드 이미지 자체 속성 관리까지 할 수 있다. (위에서는 SCSS를 사용하고 있지만, emotion과 같은 라이브러리에서도 동일 혹은 유사하게 사용할 수 있다.)

하지만 내가 원하는 컴포넌트를 만들기 위해서는 첫 번째 방법을 사용해야 했다. 그 이유는 설계한 컴포넌트를 같이 확인해보면서 설명하겠다.

<br>

## page content header

### 설계 계획

![](/images/f386c8f4-a57e-4abd-a65b-f5f29988d3f5-image.png)

![](/images/07aaf6fe-c2da-4393-8cb6-86ec94499094-image.png)

백그라운드 이미지가 포함된 UI가 여러 군데에서 사용되는 것을 확인했다. 크기나 패딩과 같이 다양한 부분에서 동일한 속성을 갖고, 페이지의 최상단에 위치하고 있다는 특징이 있어 `page content header`라는 이름으로 컴포넌트를 생성했다.

컴포넌트를 사용하는 곳마다 `bakground image`가 달랐다. 그리고 해당 컴포넌트가 담고 있는 컨텐츠도 상이했다. 위에서는 `badge, title, description`이 있는 타입과 `title, description, button`가 있는 타입인 2개 유형의 `page content header`가 소개 되어 있다. 하지만 추후에 이 컴포넌트를 사용하는 측에서 어떤 형태의 컨텐츠를 담고 싶을지는 미지수다. 그래서 **백그라운드로 사용할 이미지와 `children`을 `props`를 받도록 설계 계획**을 세웠다.

### 효율적인 방법 찾기

```css
.header {
	&.a::before {
    	background-image: url(...);
    }
    
    &.b::before {
    	background-image: url(...);
    }
    
    ...
}
```

출력하고 싶은 이미지 마다 클래스를 지정하고, 특정 클래스를 가졌을 경우 알맞은 `background image` `url`을 설정하는 방법을 사용할 수 있다. 하지만 이 방법은 비효율적이다. 컴포넌트를 사용하는 곳에서, **새로운 백그라운드 이미지가 필요할 때마다 `css` 코드에 새로운 `class`와 그 안에 `background-image` 관련 설정**을 해주어야 하기 때문이다. 유지 보수하기 좋은 컴포넌트가 아니라는 말이다. 그러므로 `style`에 `background image` 속성을 직접 설정하는 것이 좋겠다.

### 계획대로 되고 있..?

```html
<header style={{ ::before: { background-image: url(...) } }}>
	...
</header>
```

이렇게 컴포넌트를 설계하던 중, 한 가지 문제점을 발견했다. 나의 상상 속으로는 위와 같은 형태로 스타일을 설정해주면 된다고 생각했다. 하지만 `inline style`에서는 가상 요소 선택자를 사용할 수 없다는 사실을 알게 되었다. [stack over flow](https://stackoverflow.com/questions/14141374/using-css-before-and-after-pseudo-elements-with-inline-css)를 보면, 이유를 알 수 있다.

> 가상 요소인 `::before`와 `::after`는 HTML 요소의 일부가 아닌, 해당 요소의 내용을 가상으로 생성하는 CSS의 기능이다. 이것들은 HTML 문서 구조로 표현할 수 없는 추상적인 선택자다.


### 완성된 page content header

```tsx
import React from 'react';

import styles from './PageContentHeader.module.scss';
import { PageContentHeaderProps } from './type';

const PageContentHeader = ({ children, backgroundImage }: PageContentHeaderProps) => (
  <header className={styles.header}>
    <div
      className={styles.headerBackground}
      style={{ backgroundImage: `url(${backgroundImage.src})` }}
    />
    <div className={styles.headerContents}>{children}</div>
  </header>
);

export default PageContentHeader;
```

결론적으로 `page content header` 컴포넌트를 위와 같이 설계했다. 이제 `backgroundImage`를 넘겨받기만 하면, 정상적으로 백그라운드 이미지를 출력하는 컴포넌트 역할을 하게 될 것이다. `header` 클래스에서 `relative` 속성을 주고, `headerBackground` 클래스에서 `absolute` 속성을 부여하면서 스타일을 하면 원하던 UI를 만들 수 있다.

여기서 한 가지 주의해야 할 점은, **넘겨 받은 `backgroundImage`의 타입은 `StaticImageData`** 라는 것이다. `backgroundImage.src`를 사용해야 한다.

### StaticImageData

```jsx
import ExampleImage from '...';
```

**Next.js**에서는 이미지를 가져오면, Image Optimization 기능을 사용하면서 생성된 이미지들의 정보를 담고 있는 StaticImageData 타입의 데이터를 준다.

- src: 이미지 실제 파일 경로
- height: 이미지 높이
- width: 이미지 너비
- placeholder: 이미지 로딩 중에 보여질 이미지의 경로

이 외에도 다양한 메타 데이터가 포함되어 있고, 이미지의 최적화된 버전도 제공하여 사용자 화면 크기와 해상도에 맞게 조정된다.

## 마무리

소개한 방법 외에 더 효율적이고, 가독성 좋은 방법이 있을 것이라 생각한다. 자신이 가장 좋다고 생각하는 패턴만 고집하고, 같은 패턴으로만 개발한다면 도태될 수 있으므로 , 항상 더 좋은 방법을 생각하면서 코딩하자.