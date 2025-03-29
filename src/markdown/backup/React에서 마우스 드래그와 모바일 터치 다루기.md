---
title: "React에서 마우스 드래그와 모바일 터치 다루기"
description: " 프론트엔드 프로젝트를 설계하다 보면, 마우스로 드래그 하거나 모바일로 터치한 값이 필요한 경우가 있다. 캐러셀을 예시로 드래그 이벤트에 대해 알아보자."
date: 2022-05-30T10:05:04.517Z
tags: ["React","next","typescript"]
---

# 드래그

![](/images/e01922e6-6ac1-4411-8a27-cd74109500cc-image.png)

프론트엔드 프로젝트를 설계하다 보면, 마우스로 드래그 하거나 모바일로 터치한 값이 필요한 경우가 있다. 하나의 예시로는 캐러셀이 있다. 

2번째 이미지를 보기 위해서는 마우스로 우측에서 좌측으로 드래그하여 넘길 수 있다. 이 때, 우측을 클릭한 순간의 위치를 기억하고 드래그 후의 좌측에서 손을 떼었을 경우의 위치를 기억한다. 그리고 이 값을 이용하여  Carousel Index 값을 증가 및 감소 시킬 수 있다.

<br>

## 마우스 드래그 사용하기

```jsx
  const [mouseDownClientX, setMouseDownClientX] = useState(0);
  const [mouseDownClientY, setMouseDownClientY] = useState(0);
  const [mouseUpClientX, setMouseUpClientX] = useState(0);
  const [mouseUpClientY, setMouseUpClientY] = useState(0);
```

마우스를 이용하여 클릭한 순간의 XY좌표와 손을 떼었을 경우의 XY좌표를 저장할 state를 생성한다. 사실 좌우로 캐러셀을 넘기기만을 원한다면 Y좌표는 필요 없지만, Y좌표를 사용하면 오른쪽 아래 대각선으로 드래그 할 경우에는 Carousel Index의 증가 감소를 금지하는 등의 기능을 추가할 수 있다. 개발자 마음대로 특정 값에서 동작을 제어하는 것이다.

<br>

```jsx
  const onMouseDown = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setMouseDownClientX(e.clientX);
    setMouseDownClientY(e.clientY);
  };
  const onMouseUp = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setMouseUpClientX(e.clientX);
    setMouseUpClientY(e.clientY);
  };
  useEffect(() => {
    const dragSpaceX = Math.abs(mouseDownClientX - mouseUpClientX);
    const dragSpaceY = Math.abs(mouseDownClientY - mouseUpClientY);
    const vector = dragSpaceX / dragSpaceY;

    if (mouseDownClientX !== 0 && dragSpaceX > 100 && vector > 2) {
      if (mouseUpClientX < mouseDownClientX) {
        handleNextBtn();
      } else if (mouseUpClientX > mouseDownClientX) {
        handlePrevBtn();
      }
    }
  }, [mouseUpClientX]);
```

handlePrevBtn와 handleNextBtn는 Carousel Index를 감소 및 증가를 시키는 함수라고 하자. 즉 이 함수를 호출하면 이전 또는 다음 화면으로 넘어가지는 것이다.

드래그 할 경우 시작과 끝의 위치를 기억할 함수 `onMouseDown`와 `onMouseUp`를 생성한다. 그리고 `useEffect`에서 `dragSpace` 값을 계산하여 원하는 숫자 이상이면 화면이 전환되도록 한다. 그리고 대각선을 고려한 vector값도 설정해준다.(여기서는 간단하게 했다.)

<br>

```jsx
    <CarouselContainer
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
  //...
  </CarouselContainer>
```

마지막으로 이 이벤트들을 사용할 태그에 속성들을 부여해주면 끝이다.

<br>

## 모바일에서 드래그


```jsx
  const [tochedX, setTochedX] = useState(0);
  const [tochedY, setTochedY] = useState(0);
```

위에서 알아본 것은 Desktop에서 잘 동작한다. 하지만 모바일에서 확인해보면 동작하지 않는다. 그 이유는 모바일은 터치를 이용하고, 이것에 대한 이벤트는 따로 존재하기 때문이다.

<br>

```jsx
  const onTouchStart = (e: React.TouchEvent) => {
    setTochedX(e.changedTouches[0].pageX);
    setTochedY(e.changedTouches[0].pageY);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const distanceX = tochedX - e.changedTouches[0].pageX;
    const distanceY = tochedY - e.changedTouches[0].pageY;
    const vector = Math.abs(distanceX / distanceY);

    if (distanceX > 30 && vector > 2) {
      handleNextBtn();
    } else if (distanceX < -30 && vector > 2) {
      handlePrevBtn();
    }
  };
```

마우스 드래그에서 알아본 것과 같이 모바일 터치도 비슷하다. 

<br>

```jsx
    <CarouselContainer
      onTouchEnd={onTouchEnd}
      onTouchStart={onTouchStart}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
  //...
  </CarouselContainer>
```

캐러셀을 사용하는 (드래그를 사용하는) 부분에 모바일 터치에 관한 함수들도 추가해주면 끝이다.