---
title: "무한 슬라이드 ( Carousel 심화 )"
description: "무한 캐러샐과 다양한 기능"
date: 2022-01-18T03:21:13.067Z
tags: ["CSS","React","next","typescript"]
---
# 캐러샐 심화

오늘은 캐러샐의 심화이다. 조금 더 쉬운 캐러샐을 구현할 것이라면 [간단한 캐러샐 글](https://velog.io/@leehyunho2001/SPACEDEVCLUB-4-rr3240e2)을 참고하자.

배포 주소 : https://onboarding-sable.vercel.app/

<br>

## 데이터 구조

```jsx
export const carouselData = [
  {
    ID: 0,
    SRC: "https://static.wanted.co.kr/images/banners/1436/e2dd9445.jpg",
    TITLE: "마케터를 위한 데이터",
    SUB: "잘 나가는 마케터는 무엇이 다를까!?",
    PATH: "#",
  },
  {
    ID: 1,
    SRC: "https://static.wanted.co.kr/images/banners/1435/6cdcea85.jpg",
    TITLE: "유저 경험을 설계하라!",
    SUB: "문제를 해결하는 프로덕트 디자인",
    PATH: "#",
  },
  // 이후 생략
];
```

먼저 캐러샐을 만들기 위해서는 이미지가 있어야 하고, 그 이미지를 클릭 했을 경우 링크를 타고 해당 주소로 보내기 위핸 PATH가 있어야 한다. 현재 PATH는 #으로 통일해주었다.

그리고 현재 캐러샐에 대한 설명을 넣어주고 싶다면 TITLE 이나 SUB 와 같이 데이터를 더 생성하면 된다.

<br>

## 구현 시작

### 초기 설정값들

```jsx
export const Carousel = () => {
  const [curIdx, setCurIdx] = useState(0);
  const [isHover, setIsHover] = useState(true);
  const imgSRCLen = carouselData.length;
  //밑에서 설명..
}
```

캐러샐을 위한 컴포넌트를 생성했다. index.tsx에서 불러오기 때문에 export를 const 앞에 붙였다. 캐러샐은 이전 또는 다음 버튼을 클릭함에 따라 보이는 이미지가 다르다. 즉, 현재의 위치를 판단해야한다. 현재 위치를 나타낼 curIdx와 설정값을 usestate로 선언해주었다.

나는 캐러샐이 3초마다 자동으로 (다음 버튼을 클릭한것처럼) 다음 이미지로 넘어가게 구현할 것이다. 하지만 사용자가 캐러샐에 마우스를 올려놓으면, 현재 이미지에 관심이 있다는 의미이다. 그런데 다음 이미지로 넘겨버리면 불편할 것이다. isHover은 캐러샐에 마우스를 올려놓을때, 이미지를 3초마다 다음으로 넘기는 것을 막기 위한 변수이다.

마지막으로 캐러샐에 들어가는 데이터의 수(이미지 SRC의 수)가 많이 사용되어 imgSRCLen 변수에 넣어주었다.

<br>

### 3초마다 넘기기

```jsx
  useLayoutEffect(() => {
    let intervalId: any;
    if (isHover) {
      intervalId = setInterval(() => {
        setCurIdx(curIdx + 1);
      }, 3000);
    }
    return () => clearTimeout(intervalId);
  }, [isHover, setCurIdx, curIdx]);
```

만약에 마우스가 캐러샐위에 있지 않다면, isHover의 기본값은 true이므로 if문 안에 들어가 setInterVal을 한다. 그리고 끝나면 clearTimeout 을 해준다. (setInterVal은 수행하고 clearTimeout을 해줘야한다.)

isHover, setCurIdx, curIdx 이 변경될 때마다 useLayoutEffect가 실행되도록 2번째 배열을 설정해주었다.

```jsx
let intervalId: any;
```

intervalId의 타입이 현재 any로 설정되어있다. 타입스크립트를 사용하는 의미가 사라지는 행동이다. 

하지만 도저히 타입을 모르겠다. setInterval이 함수같아서 () => void를 사용해 보았지만, 밑에 clearTimeout 에서 사용하는 intervalId 변수에서 에러가 나고, number | undifined 를 넣어주면 그 위에 if문에서 사용하는 intervalId에서 에러가 나타났다.

```jsx
  useLayoutEffect(() => {
    if (isHover) {
      var intervalId = setInterval(() => {
        setCurIdx(curIdx + 1);
      }, 3000);
    }
    return () => clearTimeout(intervalId);
  }, [isHover, setCurIdx, curIdx]);
```

그래서 intervalId을 if문 안에서 var로 선언해보았다. let과 다르게 var로 선언한 변수는 if문의 스코프는 무시하기 때문에 외부에서도 사용 가능하다. 그래서 외부에서 `return () => clearTimeout(intervalId);`을 해도 오류가 나지않고 정상적으로 동작하고 있다. 하지만 var를 사용하는것은 임시 방편일 뿐 좋은 방법이 아니다.

```jsx
let intervalId: NodeJS.Timeout;
```

결국 [StackOverflow](https://stackoverflow.com/questions/51376589/typescript-what-type-is-f-e-setinterval) 에서 힌트를 얻었다. `NodeJS.Timeout` 을 타입으로 주면서 해결되었다.

> useLayoutEffect를 사용한 이유는 [useEffect와 useLayoutEffect](https://merrily-code.tistory.com/46) 에서 설명하는 것과 같다.

<br>

### 컨테이너와 버튼

```jsx
  const prevBtn = () => {
    setCurIdx(curIdx - 1);
  };
  const nextBtn = () => {
    setCurIdx(curIdx + 1);
  };

  const onMouseOver = () => {
    setIsHover(false);
  };
  const onMouseOut = () => {
    setIsHover(true);
  };


  return (
    <Container
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
  	//캐러샐 들어가는 부분..
      
      <LeftBtn onClick={prevBtn} aria-label="이전 버튼">
        //이전 이미지
      </LeftBtn>
      <RightBtn onClick={nextBtn} aria-label="다음 버튼">
        //다음 이미지
      </RightBtn>
      
    </Container>
  );


const Container = styled.div`
  position: relative;
  overflow: hidden;
  width: 100%;
`;
```

Container는 캐러샐의 컨테이너이다. 캐러샐에 마우스를 올리냐 안올리냐에 따른 setIsHover을 수행해주고 있다. 이전 및 다음 버튼을 누를 경우 현재의 인덱스값을 설정하는 부분도 구현해주었다.

또한, Emotion을 사용하여 스타일을 넣어주었다. `position: relative;`는 이전 및 다음 버튼에 `absolute`를 주기 위한 속성이고, `overflow: hidden;`은 화면에 넘치는 이미지를 잘라주기 위한 속성이다.

<br>

### 드래그

```jsx
onMouseDown={onMouseDown}
onMouseUp={onMouseUp}
```

Container에 위의 코드는 드래그를 위한 코드이다.

```jsx
  const [mouseDownClientX, setMouseDownClientX] = useState(0);
  const [mouseUpClientX, setMouseUpClientX] = useState(0);

  const onMouseDown = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setMouseDownClientX(e.clientX);
  };
  const onMouseUp = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setMouseUpClientX(e.clientX);
  };

  useEffect(() => {
    const dragSpace = Math.abs(mouseDownClientX - mouseUpClientX);

    if (mouseDownClientX !== 0) {
      if (mouseUpClientX < mouseDownClientX && dragSpace > 100) {
        setCurIdx(curIdx + 1);
      } else if (mouseUpClientX > mouseDownClientX && dragSpace > 100) {
        setCurIdx(curIdx - 1);
      }
    }
  }, [mouseUpClientX]);
```

마우스로 드래그하면 캐러샐이 넘어가도록 구현하기 위해 onMouseDown와 onMouseUp을 설계했다. 만약에 오른쪽에서 왼쪽으로 드래그를 하게 되면, mouseUpClientX가 mouseDownClientX보다 작아지게 된다. 이 경우에는 오른쪽으로 캐러샐이 넘어가야 하므로 `setCurIdx(curIdx + 1);`을 해준 것이다.

![](/images/df838fab-7423-4c23-9e1c-0b0639f47cd7-image.png)

이미지 위에 Card가 하나 떠있는데 CarouselCard라는 컴포넌트로 따로 분리해주고 있다. 이 부분 글씨 드래그를 금지하고, image 부분도 드래그를 금지시켜줬다. 하지만 이미지 부분에서 드래그가 먹히지 않았다.

Card부분과 image의 차이점이 무엇인지 곰곰히 생각해보았다. 혹시나 하는 의미에서 `display: block`를 주었더니 정상적으로 드래그가 된다.

<br>

### 캐러샐

```jsx
  const getStaticIdx = useCallback(
    (newID) => {
      let rest = newID % imgSRCLen;
      if (rest < 0) {
        rest += imgSRCLen;
      }
      return rest;
    },
    [imgSRCLen]
  );


      <CarouselWrapper curIdx={curIdx} imgSRCLen={imgSRCLen}>
        <CarouselContainer curIdx={curIdx}>
          {Array(imgSRCLen * 2 + 1)
            .fill(1)
            .map((_, i) => {
              const newID = curIdx + i - imgSRCLen;
              return {
                staticIdx: getStaticIdx(newID),
                newID,
              };
            })
            .map(({ staticIdx, newID }, i) => {
              return (
                <CarouselItem key={newID}>
                  <Link href={carouselData[staticIdx].PATH}>
                    <a>
                      {curIdx === curIdx - i + 2 ? (
                        <ImgCurrent src={carouselData[staticIdx].SRC} />
                      ) : (
                        <ImgOther src={carouselData[staticIdx].SRC} />
                      )}
                    </a>
                  </Link>
                  {curIdx === curIdx - i + 2 && (
                    <CarouselCard data={carouselData[staticIdx]} />
                  )}
                </CarouselItem>
              );
            })}
        </CarouselContainer>
      </CarouselWrapper>
```

#### CarouselContainer

imgSRCLen에는 캐러샐에 들어갈 데이터의 길이가 들어가 있다. 쉽게 이미지 src값의 갯수가 들어가 있다고 보면 된다.

imgSRCLen값의 2배 + 1 길이 만큼 배열을 만든다. 그리고 현재의 인덱스 curIdx값을 이용하여 newID를 결정하고, 이것으로 캐러셀을 만든다. 

이미지 src가 3개 있으면 캐러셀에 나타나는 이미지는 7개이고, curIdx값이 0이라면 -3 -2 -1 0 1 2 3 의 newID값으로 캐러샐이 구성된다. (이 상태에서 이전 버튼을 누르면 -4 -3 -2 -1 0 1 2 가 된다.)

이런 작업을 해주는 이유는 이미지가 이동할 때, 비어 보이지 않고 부드럽게 이동하기 위해서이다.

#### getStaticIdx

이렇게 생성된 newID를 getStaticIdx에서 어떤 작업을 해주고 리턴값을 staticIdx에 넣고있다.

getStaticIdx에서 newID가 음수일 경우 imgSRCLen만큼 더해서 반환하고 있다.

현재 -3 -2 -1 0 1 2 3의 newID가 존재한다고 하면, -2일경우 imgSRCLen값인 3만큼 더해져 1이 된다. -2는 1과 같은 이미지의 src값을 같게 될 것이다.(뒤에 map에서 처리할 것임)

즉, -3(첫번째) -2(두번째) -1(세번째) 0(첫번째) 1(두번째) 2(세번째) 3(두번째) 의 이미지를 갖고있어 다음 버튼을 계속 누르면 원하는 대로 이미지가 한번 씩 계속 나타난다.


#### 두번쨰 map

이제 map을 한번 더 돌리며 위에서 설정한 newID와 staticIdx를 사용하여 캐러샐을 구현하면 된다. getStaticIdx에서 설명한 바와 같이 이와 같은 동작을 하기 위한 부분을 설계해 주었다.

두번째 인자로 인덱스인 i도 가져오자. `curIdx === curIdx - i + 2`을 사용하고 있는데, 이것은 현재의 인덱스가 아닌경우 CarouselCard 를 보여주지 않고, 이미지의 밝기를 줄이는 부분을 설계해준 것이다.

<br>

> 마무리

### [캐러샐 동작 링크](https://onboarding-sable.vercel.app/)

이렇게 무한 캐러샐, 일정 시간마다 자동으로 넘어가는 캐러샐. 캐러샐, 드래그 등의 다양한 기능을 넣어 캐러샐을 구현했다. 캐러샐을 쉽게 사용할 수 있는 라이브러리를 사용할 수도 있지만 직접 구현하게 되면 커스터마이징이 쉽고 더 가볍다. 한번 쯤 구현해보는 것도 좋은 것 같다.

현재의 문제점은 캐러샐 미디어쿼리이다. 스크린을 줄였을 때, 미디어 쿼리 없이 현재 미이지 외의 양옆의 이미지가 차지하는 공간만 줄어들어야 하는데 그렇게 하지 못하고 있어 미디어 쿼리로 반복적인 작업을 해주고 있다. 추후에 방법을 생각해볼 예정이다.