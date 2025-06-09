---
title: "Velog 구현 프로젝트 SPACE_DEV_CLUB 리팩토링"
description: "기능을 하나씩 알아보면서 리팩토링 과정을 공유하는 글"
date: 2022-10-07T05:53:01.188Z
tags: ["JavaScript","React","next","typescript"]
---
# SPACE_DEV_CLUB

많은 개발자가 사용하고 있는 Velog는 UX를 위해 어떤 노력들을 했는지 궁금했다. 사실 유저 입장에서는 아무 생각없이 사용하고 있던 기능이 개발자 입장에서 많은 공을 들였을 수 있다. 이 점이 궁금했던 나는 5명의 팀원과 함께 **Velog 기반 기술 블로그 프로젝트**를 설계했다. 마침 벨로그에 다크 모드가 없던 시절이여서 해당 기능도 추가했었다.

![](/images/2f798ffe-5e26-4fd7-a54a-51c3bd6b6e7d-image.png)

팀원들과 노션으로 진행 사항이나 여러가지 자료들을 공유하면서 체계적으로 이어나갔다. 구현하다 집단 지성이 필요할 경우에는 스크럼을 열어 함께 해결하기도 했다.

개인적으로 `낙오자는 없다` 라고 적혀있는 저 문구가 정말 마음에 든다.

![](/images/5c6f18b0-2110-49fa-967c-461ea42bf72f-image.png)

하지만 최근에 6개월이라는 시간 동안 근무하던 회사에서 퇴사를 하고, 이 프로젝트를 다시 살펴보는데 깜짝놀랐다. 코드를 보자마자 생각했던 것은 `"어떻게 코드를 이렇게 대충 썻지..?"` 였다. **다양한 상황에서 발생하는 버그**는 물론이고 **관심사의 분리**도 전혀 되어있지 않았다. 과거를 회상해보면 1주일 마다 구현해야 하는 기능들을 결정하고 팀원들과 공유했었다. 이 과정에서 너무 "기능 구현"에만 초첨을 맞추다 보니 **일단 굴러가게 만들었던 것**이다.

오늘은 나의 담당이었던 **상세 페이지**에 구현된 기능들을 알아보고, 리팩토링 하면서 어떤 점을 더 고려하면 좋을지와 고민에 대한 글이다.

## Stack

- FrontEnd
  - Next.js
  - TypeScript
  - SWR
  - ContextAPI
  - Emotion
- Others
  - Strapi
  - Heroku
  - Vercel

### Front Stack

기술 블로그의 경우 유저들을 위한 서비스이고, 검색 했을 경우에도 노출이 잘 되어야 한다. 그래서 메인 스택은 **SSG와 SSR을 쉽게 적용시킬 수 있는 Next.js**로 결정했다. **타입스크립트는 이제 선택 사항이 아닌 필수 요소**라고 생각해서 당연하게 넣었다.

**해당 페이지에서만 사용하는 데이터는 ContextAPI로 관리**하고 있다. 로그인 데이터는 최상단에서 내려주게 된다.

SWR은 캐싱 기능을 활용하기 위해서 결정했었고, 팀원 모두 CSS in JS를 선호해서 Emotion을 선택했다. 사실 Styled-Components도 있지만, Emotion의 번들 사이즈가 더 가볍고 css prop나 ssr시 서버 작업이 필요 없다는 장점들이 있어 Emotion으로 결정했다.

### Back Stack

사실 Front보다 Back Stack을 더 고민했다. 팀원 모두 프론트엔드 개발자인데 이 프로젝트는 백이 무조건 필요했기 때문이다. 처음에는 Firebase를 생각했지만, 테이블의 연관 관계만 미리 구상해놓으면 Strapi에서는 **Strap웹에서 제공하는 UI/UX를 통해 Back을 구현**할 수 있었다. 

![](/images/82454000-c466-427a-8a8c-1b0062104980-image.png)

물론 테이블을 설계하는데 많은 고민을 하고 Strapi 설정에서 삽질도 했지만, 결과적으로 **Rest API**를 쉽게 만들 수 있었다. (PostgreSQL 기반이었다.)

Strapi의 배포는 팀원이 헤로쿠로 배포해주셨고, Next.js는 Vercel을 사용하게 되었다.

**이제 상세 페이지에 존재하는 기능들을 하나씩 살펴보면서 리팩토링할 시간이다!**

<br>

## Detail Navigation (목차 기능)

![](/images/7bf27d99-2a04-4574-814b-d27745d09202-image.png)

Velog의 상세 페이지를 자세히 보면 오른쪽에 목차가 둥둥 떠 다닌다. 이 기능을 구현하기 위해 꽤 고생했던 기억이 있다. 역시나 여러가지 테스트를 해보니 버그 투성이였다. 그래서 리팩토링을 결심하게 되었고, 구현하다보니 중요하다고 생각하는 부분들이 나타나서 설명해보려고 한다.

<br>

### marked로 Viewer를 쉽게 적용하기

 기능을 구현하기 위해 무작정 코드부터 작성하기 보다는 본질을 파악 해야한다. 이 목차는 도대체 어떤 마술을 부려 생성되는 것일까? 다양한 사람들의 Velog 글들을 확인해보면, 각 파트의 주제에 대한 텍스트를 확인해볼 수 있다. 이 텍스트는 다른 텍스트에 비해 폰트가 크고 굵다. 이처럼 글의 헤더같은 이 텍스트를 추출해서 목차를 만드는게 우리의 목표일 것이다.

```jsx
<div dangerouslySetInnerHTML={{ __html: marked(contents) }} />
```

SPACE_DEV_CLUB에서는 mark down 문법으로 작성된 데이터를 `dangerouslySetInnerHTML` 속성과 `marked`라는 라이브러리를 사용하여 UI를 그린다. 

Velog에 글을 작성해본 유저는 알 것이다. `### 제목3`과 같이 특정 문법(Mark Down 문법)을 사용해주면 폰트가 커지면서 굵어지는데 `marked`가 이 역할을 수행해주는 것이다.

<br>

### marked를 뜯어보며 알게된 진실

```jsx
<h2 id="목적에-따라-간단할-수도-있는-로그인">목적에 따라 간단할 수도 있는 로그인!</h2>
```

`## 목적에 따라 간단할 수도 있는 로그인!` 으로 작성했던 소제목을 예시로 가져왔다. mark down으로 작성한 텍스트, 태그, id값, UI에 출력된 텍스트... 차이점들이 명확하게 보인다.

먼저 `#`의 갯수에 따라 태그가 결정되는 것을 알 수 있다. `#`이 1개면 `h1`태그이고, 2개면 `h2`태그인 형식이다. 

그 다음으로 보이는 것이 UI에 출력된 텍스트이다. 앞에서 연속되는 `#`이 제외된 상태로 텍스트가 출력된다. 여기서 주의해야할 부분은 `## ## 샵낚시`와 같이 mark down을 작성했다면, `<h2 id="낚시">## 샵낚시</h2>`가 되야한다는 것이다. 즉, 처음 만나는 공백(`' '`) 이후로 텍스트를 결정하면 된다.

마지막으로 `id`값은 특수문자가 없어야 하고, 공백은 `-`로 대체해줘야 한다.

<br>

### 목차 리스트

![](/images/72077783-893e-47e0-a56f-383317b74610-image.png)

가장 먼저 구현해야할 부분은 목차 리스트를 출력하는 것이다. 현재 상세 페이지에 대한 정보를 `getServerSideProps`에서 받아오고, ContexAPI로 관리하고 있다. 이 데이터가 바로 mark down 형식의 문서이다. 

```jsx
listData = [
"#로그인 뿌시기", 
"## 목적에 따라 간단할 수도 있는 로그인!",
...
]
```

Detail Navigation 컴포넌트에서 정규표현식으로 헤더만 따로 추출해서 `listData` state에 넣어주었다. 

<br>

### 목차의 기능

![](/images/8402a835-fb24-46de-9ff8-891be9f28cfb-image.png)

이제 위에서 설명한 marked를 뜯어보며 알게 된 사실들을 이용해서 3가지의 기능을 추가할 것이다. 

첫 번째는 **목차의 아이템을 클릭할 경우 해당 위치로 스크롤이 이동**하는 기능이다. 스크롤 이동 함수와 각각의 아이템마다 `id`값을 구하는 로직이 필요할 것이다.

두 번째는 목차들을 지나면서 **현재 글을 얼마만큼 읽었는지 보여주기 위한 UI**이다. Velog는 현재 위치와 같거나 아래에 있는 목차 아이템의 텍스트만 강조된다. 하지만 **나는 게이지가 차는 것처럼 읽은 부분은 쭉 표시가 되는 것이 더 깔끔해보였다.**

마지막은 간단한 기능이다. mark down에서 #의 갯수로 헤더의 태그가 결정된다. 목차에도 **더 큰 헤더를 판단하기 위해 UI가 계단식**으로 구현된 것을 볼 수 있다. 이어지는 첫 `#`을 추출하는 것이 필요해 보인다.

<br>

### Detail Navigation 코드

#### listData

```jsx
listData = [
  "#로그인 뿌시기", 
  "## 목적에 따라 간단할 수도 있는 로그인!", 
  ...
]
```

mark down에서 추출한 헤더들이 listData에 저장될 수 있도록 구현했다. 이런 구조를 띄어야 **`map`을 사용해서 반복되는 코드 없이 깔끔하게 UI를 출력**할 수 있다. React에서는 뭔가 반복해서 띄울거면 배열 형식으로 만들어주는게 편한 것 같다.

<br>

#### 핵심 코드

```jsx
{listData && (
  <article>
    {listData.map((item) => {
      const strNum = item.match(/#*/)?.join("").length!;
      const title = item.split(/#* /).slice(1).join(" ");
      const deleteSign = reg.test(title) ? title.replace(reg, "") : title;
      const titleId = deleteSign.toLowerCase().split(" ").join("-");

      return (
        <NavigationItem
          key={`RightHeader-listData-${title}`}
          strNum={strNum}
          title={title}
          titleId={titleId}
          handleHeaderScroll={handleHeaderScroll}
          isRead={isRead}
          />
      );
    })}
```

먼저 listData가 있는 경우에 컴포넌트를 UI에 표시한다. 즉, 작성한 게시글에 `## 제목입니다`와 같은 헤더가 하나라도 있다면 Navigation이 나타나는 것이다.

#### 계단식 UI

![](/images/58c75479-920e-4d75-b1d9-a79999df3180-image.png)

**strNum은 이어진 첫 #의 갯수**를 세기 위함이다. `## 제목`과 `## ## 제목`에서 strNum의 값은 2가 된다. 이 값을 이용하여 **Navigation의 계단식 UI**를 구현한다.

<br>

#### 상황에 맞는 텍스트 추출

**title은 말 그대로 UI에 출력할 텍스트**이다. `### 인간미(?) 넘치는 우리의 자바스크립트 ^^`라는 헤더에서 `인간미(?) 넘치는 우리의 자바스크립트 ^^`가 title이 된다.

![](/images/afb5c5a1-9d9e-4758-98e3-4ef85bf9eb13-image.png)


**deleteSign은 title에서 특수 문자들을 제거**한다. 그 이유는 태그가 생성될 때, 특수 문자는 제거되기 때문이다. 즉, **titleId를 위해 deleteSign가 필요**하다.

<br>

#### 제목에 따른 스크롤 이동

```jsx
  const handleHeaderScroll = (titleId: string) => {
    document.getElementById(`${titleId}`)?.scrollIntoView();
  };
```

이제 titleId를 이용하여 유저가 Navigation에서 제목들을 클릭했을 경우 해당 위치로 스크롤이 이동할 수 있도록 `handleHeaderScroll` 함수를 생성해주면 된다.

![](/images/913f7e89-ee2b-4fea-a05c-526444bfd94c-image.gif)

잘 동작하는 것을 보니 id값이 잘 추출된 것 같다.


<br>

#### 헤더 게이지(불만족)

```jsx
  const [scrollY, setScrollY] = useState<number>(0);

  const listener = () => {
    setScrollY(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  });
```

유저가 보고있는 뷰에서 어떤 헤더를 지나쳤는지 알기 위해서는 개발자가 현재 스크롤의 위치를 알고있어야 한다. `NavigationItem` 컴포넌트에 현재 스크롤을 관리할 state와 리스너를 선언했다.

<br>

```jsx
  const isRead = (titleId: string) => {
    const target = document?.getElementById(`${titleId}`)!;
    const targetTop = target?.getBoundingClientRect().top;
    const headerTop = window.pageYOffset + targetTop!;
    const isTrue = scrollY + 1 >= headerTop;
    return isTrue;
  };
```

이제 현재 스크롤 값을 이용하여 게시글에서 각각의 헤더들을 지나쳤는지 체크해야한다. `isRead`함수를 통해 헤더마다 스크롤을 통해 자신이 읽혔는지 확인하고 반환한다.

이제 스크롤이 이동하면서 게시글을 읽으면, 헤더들을 지나쳤는지에 따라 Navigation의 아이템들이 보라색으로 색칠될 것이다.

<br>

![](/images/385785b1-e0e6-48a9-8f8a-1b1d27db9692-image.gif)

리팩토링 하면서 Navigation 기능에 버그를 해결했지만 만족스럽지 못했다. 그 이유는 이와 같이 설계하면, Navigation이 **스크롤을 할때마다 렌더링**을 해버리기 때문이다. 그래서`IntersectionObserver`을 이용한 Custom Hook을 생성해서 처리하려고 했다. 하지만 현재 상황을 생각해보면 나는 Navigation을 설계하고 있는 것이고 DOM은 viewer가 알아서 만들어 버린다. 

![](/images/b8c970ba-feac-4e3b-8c7a-d73366e6024c-image.png)

이런 태그마다 `ref`값을 부여해야 하는데 DOM을 Viewer가 그려서 이 작업이 불가능한 것이다. `querySelector`으로 태그를 찾아 `setAttribute`로 해결해보려고 했지만 이 역시 동작하지 않았다.

#### 헤더 게이지(만족!!!)

![](/images/ac102b2e-4cea-47e7-88a9-eed480cabe09-image.png)

그러다 문득 **lodash의 throttle**이 떠올랐다. Throttle 는 여러번 발생하는 이벤트를 일정 시간 동안, 한번만 실행 될 수 있도록 도와준다.

<br>

```jsx
const beforeScrollY = useRef(0);
const [isReadHeader, setIsReadHeader] = useState(false);

const handleHideHeader = useMemo(
  () =>
  throttle(() => {
    beforeScrollY.current = window.pageYOffset;
    setIsReadHeader(isRead(titleId, beforeScrollY.current));
  }, 250),
  [beforeScrollY]
);

useEffect(() => {
  window.addEventListener("scroll", handleHideHeader);
  return () => {
    window.removeEventListener("scroll", handleHideHeader);
  };
}, []);
```

Navigation의 아이템(헤더)마다 현재 읽혔는지에 대한 상태인 `isReadHeader`를 추가했다. 그리고 현재 스크롤값은 `ref`값을 이용하며 `isRead`함수 상태를 체크한다. throttle의 2번째 인자인 250은 0.25초를 의미한다. 이 핸들러를 리스너의 함수로 넣어주면 끝이다.

![](/images/c6da2546-448b-40ee-b3c7-9f8f37a628d6-image.gif)

이제 0.25초라는 시간 안에서 스크롤을 아무리 많이 해도 스크롤 감지는 한 번만 하게 된다. **throttle에 useMemo를 사용하여 조금 더 효율성을 추구했고, 이전과 달리 ref값을 사용하기 때문에 re-render도 대폭 줄었다.**

<br>

## Like (좋아요)

좋아요 버튼.. 구현하기 전까지는 아주 단순한 녀석이라고 생각했다. 그런데 생각보다 고려해야할 부분들이 많았다. 먼저 `Space Log`의 **좋아요 스키마**에 관한 내용을 알아보고, **기능별 고려한 부분**은 아래에서 차례대로 설명하겠다.

![](/images/5a1c525e-b33f-4e86-add9-66bc4fe4c8f8-image.png)

처음에는 게시글 좋아요 기능을 생각했을 때, post 스키마에 like column을 하나 만들면 된다고 생각했다. 유저가 누르면 현재 이 post like값을 가져와서 +1 해주면 끝이라면서 말이다. 

하지만 우리는 어떤 유저가 좋아요를 클릭했는지도 알아야한다. 좋아요를 계속 누른다고 숫자가 올라가게 되면, 게시글의 좋아요는 의미가 없어지기 때문이다. 그래서 유저와 게시글이 M:N으로 상호작용할 수 있도록 Likepost 테이블을 생성했다.

<br>

### 로직 단순화

이전에는 요청한 데이터에서 사용하고 싶은 데이터를 직접 Transform하는 로직을 구현하며 가공했다. 하지만 **Strapi는 Endpoint에 filter옵션**을 사용하면 알맞는 데이터를 반환해준다. 편리한 기능이 있는데 굳이 데이터를 몽땅 가져와서 Front단에서 다시 transform하는 것은 비효율적이므로 리팩토링을 결심했다. (아까운 내 코드..)

```jsx
// 이전 로직
    const response = await axios({
      method: "get",
      url: `${API_ENDPOINT}/likeposts?populate=*&filters[userid][userid]=${loginUserName}`,
    });
    const handleOverlap = response.data.data.some((post: ILikePost) => {
      if (post.attributes.postid.data !== null) {
        if (post.attributes.postid.data.id === postid) {
          setPutId(post.id);
          return true;
        }
      }
    });
```

유저가 좋아요를 한 글의 목록을 가져오고 있다. 이 목록 중 현재 게시글의 id와 일치하는 값을`handleOverlap`에서 찾고 있는다. 

Strapi 특성상 depth가 좀 깊다보니 코드가 더 길어보인다. 또한, 복잡해보기이도 하고 가독성도 떨어진다.

<br>

```jsx
// 리팩토링 후 로직
    const res = await axios({
      method: "get",
      url: `${API_ENDPOINT}/likeposts?populate=*
            &filters[userid][id]=${loginUserId}
            &filters[postid][id]=${postid}`,
    });
```

Endpoint에 Filter 옵션을 사용하니 너무 편안해졌다. 이 좋은 기능을 과거에는 왜 사용하지 않았을까.. 분명 데이터를 쓰기 좋게 만들기 위해서 transform하는 과정에서 과거에 삽질도 했던거 같은데..

![](/images/e0bb79a5-b25f-46f5-9fb1-b170933a11f5-image.jpg)

그래도 그때의 경험이 있기에 지금이 있는게 아닐까?!

<br>

### 게시글의 좋아요 갯수

상세 페이지에 들어오면 해당 게시글이 좋아요를 몇개 받았는지 표시되야 한다. 단순히 데이터를 받아오는 패치 로직이 필요한 것이므로 useSWR을 사용할 수 있다.

```jsx
export const useData = (path: string, query: string = "") => {
  return useSWR(`${API_ENDPOINT}/${path}?${query}`, fetcher, {
    revalidateIfStale: true,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });
};
```

path와 query에 따라서 데이터를 받아올 수 있도록 Custom Hook을 만들어서 사용하고 있다. 사실 이 단순 패치로직을 설명하는 이유는 커스텀 훅을 이런식으로 만들어서 사용하면 편리하다는 것을 공유하기 위함이다. 이제 게시글에 좋아요 수를 가져오는 부분을 이 커스텀 훅을 이용해서 구현하면 된다.

```jsx
export const useGetLikeData = async (
  handleHeartNum: (currentHeartNum: number) => void,
  postid: number
) => {
  const path = "likeposts";
  const query = `populate=*&filters[postid][id]=${postid}`;
  const { data: likepost } = useData(path, query);

  useEffect(() => {
    if (likepost) {
      handleHeartNum(likepost.data.length);
    }
  }, [likepost]);
};
```

`useData`를 사용해서 좋아요의 갯수를 가져오고 있다. 사실 `useData`의 경우는 어디서나 사용할 수 있는 커스텀 훅이기 때문에 `src` 바로 하위인 `hooks` 디렉터리에 위치시켰다. 하지만 `useGetLikeData`는 상세 페이지에서만 사용해서 어디에서 관리할지 고민이 되었다. 결국 상세 페이지를 관리하는 컴포넌트인 `Detail`에서 좋아요를 위한 컴포넌트 하위에 `helper`라는 디렉터리를 두게 되었다. **`helper`에는 해당 컴포넌트에서만 사용하는 함수나 커스텀 훅을 관리**하기로 했다.

### 좋아요를 누른 유저

![](/images/1130c806-00a4-4a43-b942-a1719a3f7d2a-image.png)

로그인 된 유저중에 좋아요를 누르거나 이전에 좋아요를 눌렀던 유저면 위와 같은 색칠된 하트 모양을 보여주기 위한 기능도 구현했다.

### postLike와 deleteLike

![](/images/c8f1bddd-29f2-4558-ba2f-c54d127b809f-image.gif)

좋아요를 누르지 않았던 유저가 좋아요를 클릭할 경우 숫자가 1증가하고 색칠된 하트로 UI가 변경되야 한다. 좋아요를 눌렀던 유저라면 숫자가 1감소하고 색칠되지 않은 하트 UI로 변경되야 한다. 이 두개의 함수를 **swr의 mutate**를 이용하여 구현했다.

<br>

### 광클하는 유저 잘못이 아니다

자~ 이제 좋아요 기능도 모두 구현했다. 하지만 마지막으로 고려해야할 부분이 있다. 바로 좋아요 광클이다... 좋아요 버튼을 눌렀을 경우 색이 반전되다보니, 생각보다 이런 버튼을 광클해보는 사람들이 많다. 

![](/images/bd056c3e-3862-41f6-843b-57e195fbefae-image.png)

광클하는 유저가 거의 없다고 하더라도 이 UX로 인해 버그가 발생한다면 문제가 된다. 그리고 알면서도 처리하지 않는다면 그것은 개발자의 잘못이다. 

실제로 나의 코드에서 좋아요 버튼을 광클하면 post와 delete 요청을 계속 하다가 버그가 걸린다. 404에러는 물론이고, 좋아요 DB도 확인해보면 숫자가 증가해버린다.

<br>

#### 두 가지 접근법

당장 떠오르는 방법은 2가지였다. 

첫 번째 방법은 loading을 관리하는 state를 하나 생성하는 것이다. postLike(좋아요 버튼 클릭) 또는 deleteLike(좋아요 버튼 해제)를 수행하고 있으면 `로딩중`이라는 alert를 띄어주는 것이다. 

두 번째는 좋아요 버튼을 클릭하면 `n`초 뒤에 수행되도록 하고, `n`초 전에 다시 클릭하면 요청은 안하는 것이다. 즉, `n`초 전에는 버튼을 클릭해도 UI만 바뀔 뿐 실제로 Back단으로 데이터는 요청하지 않는 것이다. 최신 요청이 들어오면 `n`초 카운트 다운 하던 것을 다시 초기화 해주는 것이 좋을 것 같다.(최신을 기점으로 `n`초)

이 두가지 방법을 모두 적용한다면 UX를 지킨채로 버그를 해결할 수 있을 것이다.

<br>

#### 일단은 첫 번째 방법으로만..

```jsx
  const handleHeart = () => {
    if (!loginUserId) return alert("로그인이 필요합니다.");
    if (loading) return alert("로딩중입니다. 잠시만 기다려주세요.");

    const num = heartClick ? heartNum - 1 : heartNum + 1;
    heartClick
      ? deleteLike(loggedUserLikepostId, handleLoading)
      : postLike(loginUserId, postid, handleLoggedUserLikepost, handleLoading);
    setHeartClick(!heartClick);
    handleHeartNum(num);
  };
```

이와 같은 로딩 처리만 하게 되면, 유저가 광클을 시도할 경우 `로딩중`이라는 alert를 띄운다. 광클 본능을 막아버려서 UX적으로는 부족할 수 있지만 가장 간단하게 해결할 수 있어서 일단은 첫 번째 방법만 적용했다. 추 후에 두 번째 방법 또는 더 좋은 해결책을 찾아 적용해볼 예정이다.

<br>

## 공유하기

### 클립보드에 복사

```jsx
  const copyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("링크가 복사되었습니다.");
    setShareClick(false);
  };
```

**링크 복사 버튼을 클릭할 경우** `copyUrl` 함수가 실행된다. 클립보드에 현재 URL이 복사될 수 있도록 코드를 작성했다. 사실 `execCommand`을 사용하는 방법도 있었지만 deprecated라고 한다.

![](/images/f17b5858-206b-4d9b-a50a-51c6042b79e4-image.png)

실제로 클립 보드 버튼을 클릭하면 URL이 정상적으로 복사되고 있다.

<br>

#### 카카오, 페이스북 공유하기

```jsx
  const onClickFacebook = () => {
    const shareUrl = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}/`);
  };
```

페이스북 공유하기 경우에는 무척 간단하다. 특정 Endpoint에 공유할 URL만 추가하면 된다. 참고로 localhost에서는 동작하지 않으니 주의하자. [Meta 공유하기 문서 참고](https://developers.facebook.com/docs/plugins/share-button?locale=ko_KR)

카카오 공유하기는 [SPACEDEVCLUB-18](https://velog.io/@leehyunho2001/SPACEDEVCLUB-18) 글을 확인해보자.

<br>

## 게시글의 시리즈

![](/images/4f32fae8-17c8-4a6b-afeb-17c595f41d07-image.png)

Velog에는 게시글마다 시리즈(카테고리?)로 묶을 수 있다. 지금 이 글은 SPACE_DEV_CLUB 시리즈에 있는 것처럼 말이다. 우리는 이 기능을 위해 **Series-Box 스키마**를 하나 만들었다. 간단하게 어떤 기능을 구현했는지 알아보고, 리팩토링한 부분만 코드로 설명하겠다.

### 시리즈 박스 UI

![](/images/6440d52b-08c6-4d60-9b41-a52a62f83e9f-image.png)

Velog를 보면 게시글의 상단에 시리즈를 나타내는 UI가 있다. 시리즈에서 `현재 글의 인덱스 / 전체 글 갯수` 를 표시하는 UI와 이전 다음에 대한 버튼이 있다. 첫 번째 글에서는 이전 버튼이 마지막 글에서는 다음 버튼이 비활성화 된다. 

![](/images/cd94f539-be54-449c-adca-ee2975f87ced-image.png)


게시글이 끝나는 지점에도 시리즈에 대한 다른 글을 볼 수 있는 UI가 하나 더 있다.

<br>

![](/images/6cf48e4f-ca16-4b67-904c-66ee3ca8d51b-image.gif)

목록 보기를 눌렀을 때, 숨기기 버튼으로 UI가 변경되며 시리즈의 글 목록을 확인할 수 있다. 현재 글의 위치도 표시된다.

### useGetSeriesData

```jsx
export const useGetSeriesData = () => {
  const path = "series-boxes";
  const query = `
    populate=*
    &filters[userid][id]=${postUserId}
    &filters[post][id]=${postid}
  `;
  const { data: series } = useData(path, query);
  //...
}
```

이와 같은 UI를 설계하기 위해서는 데이터를 먼저 받아와야 한다. 위에서 사용했었던 useData 커스텀 훅을 사용해서 시리즈에 대한 데이터를 받았다. **query**는 시리즈 데이터에서 현재 게시글의 작성자가 만든 시리즈를 찾고, 거기서 현재 글이 포함된 시리즈를 찾는 것이다. 즉, **현재 글이 포함된 시리즈**를 찾는다.

<br>

#### 리팩토링 전 플로우

```jsx
// useGetSeriesData를 사용하는 컴포넌트
const handleSeriesData = (seriesData: SeriesBox) => {
  if (seriesData) {
    setSeriesData(seriesData);
  }
};

useGetSeriesData(handleSeriesData)
```

이 데이터가 state에 저장되어야 UI를 그릴 수 있다. 그래서 사실 `useGetSeriesData` 에서 데이터만 받고, 커스텀 훅을 사용하는 컴포넌트에서 setState하는 부분을 handleState와 같은 함수로 만들어서 커스텀 훅에 props로 넘겨주려고 했다.

하지만 그렇게 설계할 경우 컴포넌트에서 커스텀 훅 위에 view를 Controll하는 함수가 위에 위치해야 했다. **`Custom Hook`이나 DOM에 영향을 끼치는 `useEffect`같은 훅은 컴포넌트에서 상단에 위치**하고 있어야 가독성이 올라간다고 생각하여 리팩토링했다.

#### 리팩토링 후 플로우

```jsx
// useGetSeriesData를 사용하는 컴포넌트
const { seriesData, currentPost } = useGetSeriesData();
```

리팩토링 후에는 이제 이 **커스텀 훅은 상단에 위치**할 수 있다. 또한, **해당 컴포넌트에서 관리하던 state가 커스텀 훅으로 가서 가독성도 증가**했다.

<br>

```jsx
export const useGetSeriesData = () => {
  const [seriesData, setSeriesData] = useState(seriesInit);
  const [currentPost, setCurrentPost] = useState(0);
  const { postid, postObj } = useContext(PostStore);
  const { id: postUserId } = postObj.userid.data;
  
  // useData로 데이터 요청하던 부분..

  const handleCurrentPost = (seriesData: SeriesBox) => {
    if (seriesData.title) {
      seriesData.post.data.some((data, i) => {
        if (data.id === postid) {
          setCurrentPost(i + 1);
          return true;
        }
      });
    }
  };

  useEffect(() => {
    if (series && series.data.length > 0) {
      const seriesData = series.data[0].attributes;
      handleSeriesData(seriesData);
      handleCurrentPost(seriesData);
    }
  }, [series]);

  return { seriesData, currentPost };
};
```

이제 `useGetSeriesData` 에서 시리즈 데이터에 대한 것을 모두 처리하고 있다. state도 이 커스텀 훅에서 관리하고, UI에 필요한 데이터로 Transform하는 부분도 책임지고 있다. **관심사의 분리**가 이루어졌다. 

커스텀 훅 이름이 지금은 단순히 데이터를 받는 역할밖에 안하는 것처럼 되어 있다. 더 좋은 **네이밍**을 생각해봐야겠다.

<br>

## 관심 있는 포스트 추천

![](/images/1412d0f1-7bfc-48b0-9ae1-37d94d444d46-image.png)


게시글의 최하단을 확인해보면 `관심 있을 만한 포스트`를 추천해주는 UI가 있다. 이 부분은 나의 마음대로 기능을 구현했다. 

![](/images/9c27d8f9-9753-4e8e-9792-82b73480e987-image.png)

게시글 최상단을 보면 해시태그들이 보인다. 나는 이 해시태그들을 이용했다. Space Log에 존재하는 Post중 현재 Post에 있는 해시태그 중 하나라도 있는 Post를 10개 랜덤으로 뽑아 추천하고 있다. 사실 이 부분은 최적화를 더 고려해야한다. (모든 글에서 찾다보면 로딩이 길어질 수 있음)

<br>

## 댓글과 대댓글

드디어 오늘의 글에서 마지막으로 파트인 댓글과 대댓글이다. 사실 리팩토링하기 가장 무서운 부분이었다. 과거에 정말 돌아가게만 구현했었기 때문이다...

일단 무슨 기능을 할지 모르겠는 변수명과 함수명부터 한 함수에서 여러 기능을 하고 있어 코드를 이해하기 쉽지 않았다. 그래서 이번에 리팩토링하면서 주석도 조금 달아보았다.

UI를 위한 데이터를 Transform하는 함수들을 살펴보면서 구현한 기능에 대해 간단하게 알아보자.

### Comment 구조

![](/images/839260a1-87a6-410a-829c-6a60aa914ff5-image.png)

Strapi Endpoint로 댓글에 대한 데이터를 요청하면 `[{댓글},{댓글},{댓글},...]` 형식으로 내려줄 것이다. 나는 이 배열안에 있는 객체들이 댓글인지 대댓글인지, 어떤 대댓글이 어떤 댓글의 대댓글인지, 이에 맞는 순서를 알기 위한 값들도 필요해서 스키마에 이에 맞는 column들을 추가한 것이다.

### 댓글 데이터 Transform

```jsx
  useEffect(() => {
    const sortCommetnsData = sortComments(postObj.comments.data);
    const newComment = groupByComments(sortCommetnsData, handleCommentDatas);
    currentCommentGroup(newComment, handleCurrentCommentGroup);
    commentMoreBtnInit(newComment);
  }, []);
```

#### sortComments

댓글 데이터를 **`sortComments`로 정렬**부터 해준다. 이 때, 3가지 조건에 맞게 정렬을 하는데 `group`, `depth`, `order` 순이다. 사실 strapi에서 내려주는 데이터로는 정렬이 필요없었지만, Back단을 연결하기 전에 Mock데이터를 사용하다 보니 **순서가 꼬이면 버그가 발생해서 에러처리** 느낌으로 추가했다.

#### groupByComments

![](/images/3149e7ed-9f03-47e7-9275-b9e3b519c2d5-image.png)

**`groupByComments`는 group별로 댓글 데이터를 묶어** 주었다. **댓글마다 대댓글의 유무와 대댓글의 갯수를 구하기 위해**서이다.

UI를 출력할 때 이 그룹핑된 데이터를 사용한다.`map`으로 댓글 UI를 그리고, **대댓글이 있는경우에 대댓글을 위한 UI가 적용되도록 구현**했다. (대댓글을 위한 UI는 아래에서 더 설명하겠다.)

#### currentCommentGroup

![](/images/bcafbac7-b3ce-4c7a-8354-6ff7b3362ddb-image.png)

**`currentCommentGroup`은 현재 게시글에 달린 댓글의 수**를 구한다.(대댓글이 아니라 댓글!!) 이 값은 **공통 컴포넌트인 댓글 입력 컴포넌트**에서 사용된다. 현재 작성하는 댓글이 게시글에서 몇 번째 댓글(group)인지에 대한 값을 받아 Back단에 요청하여 댓글을 생성하는 것이다. 

사실 이 기능은 **대댓글에서 유용**하다. 대댓글의 입력 컴포넌트도 위에서 언급한 공통 컴포넌트를 사용한다. comment 스키마에 어느 댓글과 대댓글이 연결되어 있는지 알기위해 group를 부여하고 있었다. 그렇다면 **현재 입력 어떤 댓글의 대댓글에서 입력 폼을 사용하는지 인지 알아야 공통 컴포넌트에 넘겨줄 것이다.** 대댓글 컴포넌트에서는 `currentCommentGroup`를 응용하여 구현해주었다.

#### commentMoreBtnInit

![](/images/c154f0da-ee8e-47de-91bd-533fc28df73b-image.gif)

마지막으로 `commentMoreBtnInit`이다. `groupByComments`에서 언급했던 대댓글을 위한 UI가 여기서 이어진다. 첫 번재 댓글의 대댓글만 보고 싶은데, 첫 번째 댓글의 대댓글을 펼치는 경우 다른 댓글의 대댓글도 펼쳐진다면 UX가 좋지 않다. 이 함수는 **댓글에서 대댓글을 펼칠지에 대한 boolean값**을 배열로 가지고 있다.

### 그 외 Comment 파트

위에서 언급한 기능들 외에도 고려해야할 부분이 몇 가지 더 있었다. 자신의 댓글 또는 대댓글만 수정 및 삭제가 가능해야 한다. 그리고 댓글 삭제시 안에 있는 대댓글도 모두 삭제하는 기능도 추가했다. 마지막으로 댓글 또는 대댓글 CRUD시 mutation 하는 부분에서도 많은 고민을 했던 것 같다.

## 마무리

사실 아직 부족한 부분은 많다. 각 기능마다의 로딩 처리라던가, 모든게 준비되면 해당 페이지로 넘어갈 수 있게끔 SSR을 하는 것들 말이다. 이 외에도 코드의 가독성을 위해 고쳐야할 부분도 많다. 기회가 된다면 추후에 모든 부분에 대해 리팩토링을 해보려고 한다.

만약에 기능을 구현했을 당시의 고민들을 보고싶다면 SPACE_DEV_CLUB 시리즈를 확인해보면 될 것이다.