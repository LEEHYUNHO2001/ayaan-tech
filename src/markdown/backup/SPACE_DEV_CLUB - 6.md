---
title: "SPACE_DEV_CLUB - 6"
description: "상세 페이지 리팩토링"
date: 2022-01-10T10:34:59.676Z
tags: ["React","next","typescript"]
---
![](/images/6292c49c-3f28-4e6f-ab5f-f7c7270ff5ef-dh.gif)

이전 글과 달라진 부분이 별로 없어보인다. 하지만 코드로 확인하면 변경된 사항이 꽤 많다. 이번에는 무슨 작업을 한 것인지 작성해보겠다.

![](/images/bd04c86d-538c-4d1c-a11d-cdd0d927aeee-image.png)

먼저 mypage 컴포넌트 디렉터리에서 사용되고 있는 Header 컴포넌트를 가져왔다. 상세 페이지에도 같은 헤더가 사용되기 때문이다. UI 적으로 변경된 부분은 이게 끝이다.

```jsx
export const PALLETS_LIGHT = {
  MAIN: "#6868AD",
  SUB: "#e8e8fa",
  BACKGROUND: "#f8f9fa",
  CARD_BACKGROUND: "#fff",
  MAIN_FONT: "#202124", //rgb(52, 58, 64)
  SUB_FONT: "#495057",
  POINT_FONT: "#868E96",
  ICON: "#868E96",
};

export const PALLETS_DARK = {
  MAIN: "#6868AD",
  SUB: "#e8e8fa",
  BACKGROUND: "#202124",
  CARD_BACKGROUND: "#1e1e1e",
  MAIN_FONT: "rgba(255, 255, 255, 0.87)",
  SUB_FONT: "rgba(255, 255, 255, 0.6)",
  ICON: "#868E96",
};
```

하지만 이것저것 리팩토링 해주었다. 먼저 색상 부분이다. 팀원들이 UI를 설계하면서 컬러를 각자 사용하다 보니 코드가 지저분해지는것 같았다. 그래서 자주 사용하는 컬러는 상수로 저장했다. 또한, 추후에 **다크모드** 를 설계하기 위해 상수를 하나 더 생생해 놓았다.

<br>

![](/images/dd9e4b3c-ae16-4da4-b237-f90ad2adfeb3-image.png)

마지막으로 좌우 헤더 부분이다. 원래 위와 같이 flex를 각각 1, 2, 1을 부여하여 공간을 나눴었다. 

![](/images/ab957952-c002-4988-9e2f-f3d5891a5169-image.png)

이 부분을 위와 같이 UI 형태를 변경해주고, 좌우 헤더는 sticky를 적용해 주었다. 아직 요소와 요소 사이의 공간 같은 것들이 디테일한 부분까지 완성되지 않았다. 미디어 쿼리 작업을 하면서 더 디테일하게 설계할 것이다.

> 마무리

pr을 보냈는데 컨플리트가 발생하여 최신 코드를 pull 받고 작업중인 브랜치에 rebase하여 해결했다. 이제 이런 상황들이 익숙해지고 있는 것 같다. (~~갑자기 왜 눈물이..~~)