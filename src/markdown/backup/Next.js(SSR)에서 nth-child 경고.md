---
title: "Next.js(SSR)에서 nth-child 경고"
description: "nth-child 대신에 nth-of-type을 사용하기"
date: 2022-08-09T08:48:20.548Z
tags: ["CSS","React","next"]
---
# SSR에서 nth-child 경고

평소 처럼 Next.js에서 Emotion을 사용하여 UI 작업을 하고 있었다. nth-child를 이용하면 효율적으로 설계할 수 있는 부분을 발견하여 정말 오랜만에 사용했다. 그 결과 원하는 UI를 출력할 수 있었지만 터미널 창을 확인해본 결과 경고문이 나타나있었다.

<br>

## Warning이 발생하는 이유

> next-0  | The pseudo class ":nth-child" is potentially unsafe when doing server-side rendering. Try changing it to ":nth-of-type".

SSR에서는 nth-child가 안전하지 않을 수 있단다. 왜 그런지 궁금해서 검색을 해보았다. 역시 답은 [stackoverflow](https://stackoverflow.com/questions/63487167/styling-with-emotion-in-react-gives-nth-child-is-potentially-unsafe-when-doin)에서 찾을 수 있었다. 컴포넌트를 SSR할 때, 스타일 요소도 같이 SSR이 되기 때문에 nth-child는 내가 원하는 동작을 하지 않을 수 있다고 한다. [Emotion Issues](https://github.com/emotion-js/emotion/issues/1059#issuecomment-444566635)에도 설명이 나와있다.

## 해결

경고문이 알려준 대로 nth-child를 nth-of-type로 일단 바꿔주었다. 그랬더니 경고는 사라지고 UI도 원래 원하던 UI를 유지하고 있었다. 나는 계속 CSS를 사용했지만, nth-of-type의 존재를 잊고 있었다. 그래서 생각난 김에 정리해보겠다.

<br>

## nth-child

![](/images/2585ddb8-93f6-4665-a5ee-2e5672599236-image.jpg)


nth-child는 쉽게 말해서 모든 자식의 순서에서 지정해준 값을 찾는다. 위의 예시를 보면 3개의 자식이 있는 상태에서 2번째의 b 요소를 찾고 싶어 한다. 3번째 예시에서는 3개의 자식 중에서 2번째를 a 가 차지하고 있으므로 아무것도 찾지 못하게 된다.

<br>

## nth-of-type

![](/images/593739f4-414a-4882-b537-907fb7e2a002-image.jpg)


nth-of-type는 지정된 자식 태그 요소에서의 순서를 찾는다. 첫 번째 예시를 보면, nth-child였을 경우 2번째 자식에 a 태그가 없으므로 아무것도 찾지 못한다. 하지만 nth-of-type는 2번째에 있는 a 태그를 찾기 때문에 3번째 자식인 a 를 찾을 수 있게 된다.

<br>

[이미지 출처](https://nanajeon.com/css-selectors-cheatsheet-details/)