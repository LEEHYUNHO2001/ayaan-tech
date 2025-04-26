---
title: "SPACE_DEV_CLUB - 18"
description: "공유하기 기능 구현 (클립보드 복사, 페이스북, 카카오톡)"
date: 2022-03-08T09:11:44.009Z
tags: ["React","next","typescript"]
---
# 공유하기 기능

## 클립보드에 현재 URL 저장

```bash
yarn add react-copy-to-clipboard
yarn add @types/react-copy-to-clipboard
```

현재 이 프로젝트는 yarn 을 사용하고 있다. 타입스크립트를 사용하고 있기 때문에 이에 관해서도 부가 설치를 해주었다. npm으로 설치하는 방법과 설명이 필요하다면 [react-copy-to-clipboard](https://www.npmjs.com/package/react-copy-to-clipboard) 을 확인해보자.

<br>

```jsx
//LeftHeader.tsx
  const copyURL = () => {
    alert("링크가 복사되었습니다.");
    setShareClick(false);
  };

//...

<CopyToClipboard text={window.location.href}>
  <AttachFileIcon />
</CopyToClipboard>
```

CopyToClipboard로 감싸주며 text에 복사될 텍스트를 넣어주면 된다. 원하는 동작은 버튼을 클릭했을 경우 현재 페이지의 URL이 클립보드에 복사되는것이므로 `window.location.href` 값을 넣어주었다. 그리고 한번 더 감싸주는 `div`의 `onClick` 에 공유하기 버튼을 닫도록 state를 관리하고 alert 로 URL이 복사되었음을 알린다.

![](/images/208555d1-6a3a-48ef-ace3-344a8f775684-ss.gif)

현재 URL이 클립보드에 잘 복사되는것을 볼 수 있다.

<br>

## 페이스북 공유하기

```jsx
//LeftHeader.tsx
  const onClickFacebook = () => {
    const shareUrl = window.location.href;
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}/`);
  };
```

페이스북 아이콘을 감싸는 `div`에 `onClcik` 이벤트로 `onClickFacebook` 을 주었다. 그 후에 페이스북 공유하기 기능을 이용하기 위해 페이스북에서 요구하는 URL로 리다이렉트 하면 된다.

![](/images/9b1026e2-7795-48ec-8002-4723fd709d91-hh.gif)

페이스북 공유하기 기능을 이용하기 위해 아이콘을 클릭했다. 뭔가 오류가 나타났는데 localhost 주소여서 그런것 같다. 배포한 후에 실제 존재하는 웹 사이트가 되었을 때는 오류가 나타나지 않을 것이다.

![](/images/ee53ee7b-f170-44e3-8efd-5d47408c9de9-hjhj.gif)

`${shareUrl}` 부분에 velog 주소를 넣으면 벨로그는 정상적으로 공유가 되기 때문이다.

```html
<meta property="og:url" content="https://www.your-domain.com/your-page.html" />
<meta property="og:type" content="website" />
<meta property="og:title" content="Your Website Title" />
<meta property="og:description" content="Your description" />
<meta property="og:image" content="https://www.your-domain.com/path/image.jpg" />
```

공유할때 title, description, image 등을 꾸미고 싶다면 html파일에 meta 태그를 추가해주면 된다.

<br>

## 카카오톡 공유하기

### 준비

![](/images/4ce33c8b-3bba-41cd-b0fb-f37a78945257-image.png)

[카카오톡 developers](https://developers.kakao.com/) 에서 앱 등록을 한 후에 JavaScript 키를 복사하자.

```jsx
//.env
REACT_APP_KAKAO_KEY=붙여넣기
```

그 후에 .env 파일에 붙여넣으면 된다. 이제 `NEXT_PUBLIC_KAKAO_API_KEY` 라는 이름으로 해당 키를 사용할 수 있다. (공개된 곳에 키를 노출시키지 않기 위한 방법)

<br>

![](/images/753e10b3-1425-4d51-84ef-007f6ea08e6d-image.png)

플랫폼에서 Web 등록을 해주면 된다. 로컬호스트 주소와 배포 주소를 넣었다.

<br>

### 자바스크립트 SDK 추가

```jsx
//_document.tsx
<script
  defer
  src="https://developers.kakao.com/sdk/js/kakao.js"
  ></script>
```

기능을 사용하기 위해 자바스크립트 SDK를 `document` 파일에 추가해주자. `script` 태그를 사용하므로 `Head` 태그 안에 넣어주면 된다. 보통은 `defer` 속성 없이도 에러가 나타나지 않지만, next의 경우에는 `defer`가 있어야하는 것 같다.

<br>

### 상세 페이지에서 Kakao init

```jsx
//[id]/[details]/index.tsx
  useEffect(() => {
    window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_API_KEY)
  }, [])
```

이제 env에 저장한 JavaScrip 키 값을 사용해 Kakao.init을 해보자.

![](/images/0add6a3a-08f3-4e27-b3c6-9ce79ad2617d-image.png)

하지만 Window에 Kakao가 없다고 오류가 나타난다. 타입스크립트 에러이다.

```jsx
//_app.tsx
declare global {
  interface Window {
    Kakao: any;
  }
}
```

그래서 interface 를 선언해주었다.

만약 **kakao.init: App key must be provided** 와 같은 에러가 콘솔에 찍힌다면, .env 파일에 JavaScript 키를 저장해둔 것에서 문제가 있는 것이다. string 으로 저장되었는지 확인해보고, 서버도 껐다가 다시 켜보자.

<br>

### 카카오톡 공유!


```jsx
//LeftHeader.tsx
  const onClickKakao = () => {
    const { Kakao, location } = window;
    Kakao.Link.sendScrap({ requestUrl: location.href });
  };
```

![](/images/274d94c7-4d95-4b40-bec8-5b3825c8046e-image.png)

[sendScrap](https://developers.kakao.com/sdk/reference/js/release/Kakao.Link.html#.sendScrap) 에 관한 내용을 여기를 참고하자. 상세 페이지의 URL을 requestUrl에 넘겨주어 해당 사이트의 메타 정보를 토대로 링크를 생성한다. 이제 버튼을 클릭하면 카카오톡 공유 기능도 수행한다.

#### 문제점 발견 및 해결


![](/images/8f0e88a1-4a8c-478c-8601-83dc31c500f6-image.png)

공유하기 아이콘을 선택하면 공유는 된다. 하지만 들어가보면 메인 페이지가 들어가진다. `location.href`을 콘솔로 찍어보면 현재 페이지의 주소가 잘 찍히는데 `sendScrap({ requestUrl: location.href })` 을 수행하면 왜 메인 페이지로만 공유되는지 이유는 모르겠다. (문서에 적힌대로 한건데..)

그래서 다른 방법을 사용하기로 했다.

<br>

```jsx
//Share.tsx
    Kakao.Link.sendDefault({
      objectType: "feed",
      content: {
        title: postObj.title,
        description: postObj.contents.substring(0, 8),
        imageUrl:
          "https://cdn.pixabay.com/photo/2022/03/06/05/30/clouds-7050884_960_720.jpg",
        link: {
          mobileWebUrl: location.href,
          webUrl: location.href,
        },
      },
      social: {
        likeCount: 10,
        commentCount: 5,
        sharedCount: 2,
      },
      buttons: [
        {
          title: "웹으로 보기",
          link: {
            mobileWebUrl: location.href,
            webUrl: location.href,
          },
        },
        {
          title: "앱으로 보기",
          link: {
            mobileWebUrl: location.href,
            webUrl: location.href,
          },
        },
      ],
    });
```

sendDefault 메서드를 사용하여 title, contents, url 등을 직접 설정해주고 있다.

![](/images/58d1558d-f0ae-4377-9db4-06aaebcfe52f-image.png)

카카오톡 공유시 이전보다 꾸며진 것을 볼 수 있고, 클릭하면 공유한 상세 페이지로 넘어가진다. 그리고 좋아요, 댓글의 수, 공유한 수를 보여주고 싶다면 social을 넣어주면 된다. 나는 사용하지 않을 것이기 때문에 제거해주었다.