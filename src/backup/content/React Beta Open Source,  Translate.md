---
title: "React Beta Open Source,  Translate"
description: "React의 새로운 공식문서 Beta가 공개되었다. 번역이 가능한 단계가 되었는지 사람을 모집하는 GitHub을 보았다."
date: 2021-12-08T15:01:53.109Z
tags: ["React"]
---
>## React Beta?

![](/images/965e830e-216c-467f-bd7c-c3ff59025634-image.png)

React의 새로운 공식문서 Beta가 공개되었다. 
번역이 가능한 단계가 되었는지 [사람을 모집하는 GitHub](https://github.com/reactjs/ko.reactjs.org/issues/374) 글을 보았다.

<br>

![](/images/5d2e1ad5-5a7c-491d-88a7-e519b69a8400-image.png)

나는 대학교를 졸업한지 3달째가 되었는데, 번역에 많은 시니어 개발자분들이 지원하셨다. 조금 쭈굴.. 해졌지만 걱정반 기대반인 기분으로 지원했다.

<br>

![](/images/4d0086eb-cf26-44cd-92a9-50abd6b93957-image.png)

그렇게 1시간 후, 답변이왔다. 배정이 되었다!!!

이제 기쁜 마음으로 [Add React to a Website](https://beta.reactjs.org/learn/add-react-to-a-website) 부분을 번역하면 된다.

<br>

>## Beta 번역 준비

생각해보니 번역을 막하면 안될것이다. 어떤식으로 번역을 해야할까?

[React 공식 사이트](https://reactjs.org/) 와 [번역시 참고 - 단어들](https://github.com/reactjs/ko.reactjs.org/wiki/Translate-Glossary) 을 참고하여 번역해야한다. 그리고 오타를 잡기위해 마지막에 [맞춤법 검사기](http://speller.cs.pusan.ac.kr/) 를 이용하자.


![](/images/69c15b31-df28-46a8-beb4-b82e5f2db123-image.png)


번역한 후에 pr(pull request) 하라고 되어있다. 

<br>

>## pull request 방법


이제 [Forking Workflow](https://gmlwjd9405.github.io/2017/10/28/how-to-collaborate-on-GitHub-2.html) 를 알아보자. (여기 걸려있는 링크를 먼저 읽고오는것을 추천한다.)

<br>

![](/images/fd5bc18b-b8b3-4d66-a048-b64b4d1f58eb-image.png)

먼저 번역작업을 수행할 레파지토리에서 Fork를 클릭한다.

<br>

![](/images/41380d74-5553-4e26-84ad-699d5bcaa045-image.png)

Fork가 완료되었다. 나의 계정에 새로운 레파지토리가 생긴것을 볼 수 있다.
이제 초록색 버튼 Code를 누르고, 주소를 복사하자.

<br>

```
git clone https://github.com/LEEHYUNHO2001/ko.reactjs.org.git
```

자신의 터미널에서 원하는 디렉터리로 간다. 그리고 복사했던 주소를 붙여넣기 하자. 나의 디렉터리(로컬 저장소)에 프로젝트를 복제하는 것이다.

<br>

```
git remote add real-blog https://github.com/reactjs/blog.github.io.git
```

이제 복제된 디렉터리로 가자. 그 후 위의 코드를 작성하는데, **real-blog는 내 마음대로 별명**을 지어준 것이며 **reactjs는 원본저장소**이다. 나의 저장소가 아니라는것을 명심하자.

<br>

```
git remote -v
```

![](/images/05a493a4-222a-47cc-b882-ba9ae310ec52-image.png)

Fork한 프로젝트는 origin이라는 이름으로 이미 있다.
우리가 해주었던 작업은 원본 프로젝트 저장소에 대한 것이었다.

<br>

```
git branch
git checkout -b translate
```

현재 브랜치를 확인해보니 main이다. 나의 로컬에서 작업을 하는 경우에는 새로운 브랜치를 생성해줘야한다. translate라는 브랜치를 생성하면서 여기로 이동해주었다.

<br>

```
git add
git commit
git push origin translate
```

이제 번역을 한 후에 commit까지 완료해준다. 그리고 translate 브랜치의 수정내역을 origin으로 으로 push한다.

![](/images/a2af9bb4-5d43-4fb7-b0fc-dd30cc37077d-image.png)

push가 완료되면 나의 GitHub의 해당 레파지토리에 들어가보자. Compare & pull request 버튼이 생성된다. 누르면 메세지를 생성하는 공간이 나온다. 

<br>

![](/images/6ff36293-daf8-461e-b9f4-52d44a261aaf-image.png)

이제 PR을 보내면 된다. 적절한 제목을 사용하자.

<br>

![](/images/c4ced24c-d0d4-407d-9fb1-90c43afdcee3-image.png)

ko.reactjs.org의 Pull request에 가보니 내가 보낸 pull request가 정상적으로 간 것을 알 수 있다.

<br>

```
git pull real-blog main
git branch -d translate
```

이제 프로젝트 관리자는 변경된 사항을 보고 merge할지말지 결정한다. 원격저장소에 merge가 되었다면, 원격저장소와 로컬저장소를 동기화해야한다. 그 후 브랜치를 삭제해주자.

**추가로 작업해야할것이 있다면 브랜치 생성부터 삭제까지 다시 진행하면 된다.**

<br>

>## pull request 후

![](/images/3f923381-fda2-4dc9-af36-79998990f94c-image.png)

다음날 pull request 보낸곳에 들어가보니 **needs author response** 라고 되어있었다. 이게 뭐지..?

<br>

![](/images/b21d6abd-1483-489d-84ec-e2cd4c00ddcb-image.png)

아.. 저기 체크박스를 내가 체크해야하는데 생각을 못했다. 그래서 바로 체크해주었다. 그리고 댓글도 호다닥 남겼다.

![](/images/e22e2d00-2a2e-40d6-a421-a44872738337-image.png)

이제 **needs review**로 바뀌었다. 피드백을 원하면서도 너무 많은 피드백은 나의 실수가 많다는 소리니까 무섭다...

![](/images/7c85da1c-7eb7-49ad-b3d4-b69820a9af64-image.png)

시간이 지난 후에 리뷰가 달렸다. 괜찮다고 생각하는 리뷰들은 반영을 했다. 근데 여기서 또 문제가 생겼다. 파일을 수정한 후에 어떻게 여기에 올리지..?

혹시나 푸시나 pull request를 잘못보내면 큰일날까봐 구글링으로 이것저것 알아봤다. 정답은 그냥 `git push origin translate`를 해주는 것이었다.

그리고 다시 pull request를 날리기위해 나의 레파지토리로 들어갔다. 그런데 pull request 버튼이 사라졌다. ~~하...~~

![](/images/37fe9527-e8e8-47bb-9183-c22eee28b761-image.png)

혹시나 하고 리뷰가 달렸던 곳에 들어가보니 바로 반영이 되어있다. 우여곡절이 많았지만 해결되었다. 위에 리뷰가 달린 대화창에서 해결한 부분은 Resolve conversation을 누르면 된다.

![](/images/99657b9d-11c8-44c6-bb5b-1dc99910afc3-image.png)

리뷰를 모두 반영했다. 배정받았던 메인 README에 무언가 추가된게 보인다.

![](/images/fc605dcb-5c97-44ed-875c-c4aa182a57fc-image.png)

이 부분도 승인되고 있다고 표시되는것 같다.

<br>

![](/images/39308a8d-27f6-4227-b118-66ca58931634-image.png)

며칠후에 들어가보니 merge를 준비하고 있는 것 같다.

![](/images/388d646d-3d28-47a4-aedc-9194ac8f94b6-image.png)

merge가 된 것까지 확인했다. ~~감동~~

<br>

>## 어디서 번역을 했을까?

복제한 프로젝트 디렉터리에서 무슨 파일을 봐야하는지초자 몰라서 사실 textlint 디렉터리를 들어갔다가 살짝 멘붕이왔었다. 

![](/images/e5cf06c7-79af-488e-a512-337b797bcb51-image.png)

textlint 문서를 조금씩 보다가 아무리 생각해도 이것을 하는게 아닌거 같다는 생각이 들었다.

![](/images/c966d463-8b12-48a1-9786-9192269d6ff7-image.png)

Beta 디렉터리에서 이것저것 보면서 재미를 느끼던 도중 learn 디렉터리를 발견하게 되었고, 여기를 수정하는것이라는 사실을 알게되었다. 왜냐하면 모두 md파일로 작성되어 있었기 때문이다. ~~캬캬캬~~

<br>

>## 번역하며 지켜야할것

[공통 스타일 가이드](https://github.com/reactjs/ko.reactjs.org/blob/main/UNIVERSAL-STYLE-GUIDE.md), [모범사례](https://github.com/reactjs/ko.reactjs.org/wiki/Best-practices-for-translation), [용어](https://github.com/reactjs/ko.reactjs.org/wiki/Translate-Glossary), [맞춤법 검사](http://speller.cs.pusan.ac.kr/) 를 강조하고 있다. 여기에는 번역 해야할것과 하지 말아야할것, 가독성을 위해 지켜야할것 등이 명시되어있다. 

![](/images/a62f17ac-a503-40ea-b365-20e84504ca0d-image.png)

인상깊었던 점은 위의 사진이다. '이렇게 번역하는사람이 있을까?' 라고 생각하며 헛웃음이 나왔다.

<br>

>## 본격적으로 번역 시작
Add React to a Website 페이지

---
title: 웹사이트에 React 추가
---

<Intro>

React는 처음부터 점진적인 도입을 위해 설계되었으며, 필요한 만큼 React를 사용할 수 있습니다. 마이크로 프론트 엔드, 기존 시스템 혹은 단순히 React 사용 여부와 관계없이 몇 줄의 코드만으로 HTML 페이지에 인터렉티브한 React 컴포넌트를 추가할 수 있습니다. 빌드 도구 없이 말이죠!

</Intro>

## 1분 안에 React 추가 {/*add-react-in-one-minute*/}

1분 안에 기존 HTML 페이지에 React 컴포넌트를 추가할 수 있습니다. 자신의 웹 사이트나 [빈 HTML 파일](https://gist.github.com/rachelnabors/7b33305bf33776354797a2e3c1445186/archive/859eac2f7079c9e1f0a6eb818a9684a464064d80.zip)에 시도해 보세요. 인터넷 연결과 메모장(또는 VSCode—[설정 방법](/learn/editor-setup/)에 대한 가이드를 확인하세요.) 같은 텍스트 편집기만 있으면 됩니다. 

### 1단계: HTML에 엘리먼트 추가 {/*step-1-add-an-element-to-the-html*/}

편집하려는 HTML 페이지에서 빈 `<div>` 태그와 같은 HTML 엘리먼트에 고유 id를 추가하여 React로 무언가 표시하고 싶은 지점에 추가합니다.

`div` 와 같은 "컨테이너" 엘리먼트는 `<body>` 태그 내부의 아무 곳에나 배치할 수 있습니다. React는 HTML 엘리먼트 내의 기존 콘텐츠를 대체하므로 보통 비어 있습니다. 한 페이지에 이러한 HTML 엘리먼트를 필요한 만큼 가질 수 있습니다.

```html {3}
<!-- ... 기존 HTML ... -->

<div id="component-goes-here"></div>

<!-- ... 기존 HTML ... -->
```

### 2단계: 스크립트 태그 추가 {/*step-2-add-the-script-tags*/}

HTML 페이지에서 닫는 `</body>` 태그 바로 앞에 다음 파일에 대한 3개의 `<script>` 태그를 추가 합니다.

- [**react.development.js**](https://unpkg.com/react@17/umd/react.development.js) 는 React의 핵심을 로드합니다.
- [**react-dom.development.js**](https://unpkg.com/react-dom@17/umd/react-dom.development.js) 로 React는 HTML 엘리먼트를 [DOM](https://developer.mozilla.org/docs/Web/API/Document_Object_Model)에 렌더링할 수 있습니다.
- **like_button.js** 는 3단계에서 컴포넌트를 작성하는 곳입니다!

<Gotcha>

배포할 때 "development.js"를 "production.min.js"로 바꾸세요.

</Gotcha>

```html
  <!-- 페이지 끝 -->
  <script src="https://unpkg.com/react@17/umd/react.development.js" crossorigin></script>
  <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js" crossorigin></script>
  <script src="like_button.js"></script>
</body>
```

### 3단계: React 컴포넌트 만들기 {/*step-3-create-a-react-component*/}

HTML 페이지 옆에 **like_button.js** 파일을 생성하여 다음의 코드를 조각을 넣고 저장합니다. 이 코드는 `LikeButton` 이라는 React 컴포넌트를 정의합니다. [가이드에서 컴포넌트를 만드는 자세한 방법을 알아볼 수 있습니다.](/learn/your-first-component)

```js
'use strict';

function LikeButton() {
  const [liked, setLiked] = React.useState(false);

  if (liked) {
    return 'You liked this!';
  }

  return React.createElement(
    'button',
    {
      onClick: () => setLiked(true),
    },
    'Like'
  );
}
```

### 4단계: 페이지에 React 컴포넌트 추가 {/*step-4-add-your-react-component-to-the-page*/}

마지막으로 **like_button.js** 하단에 두 줄을 추가합니다. 이 두 줄의 코드는  1단계에서 HTML에 추가한 `<div>`를 찾은 다음 그 안에 React 컴포넌트 "Like" 버튼을 추가합니다.

```js
const domContainer = document.getElementById('component-goes-here');
ReactDOM.render(React.createElement(LikeButton), domContainer);
```

**축하합니다! 웹사이트에 첫 번째 React 컴포넌트를 렌더링했습니다!**

- [예제 전체 소스 코드 보기](https://gist.github.com/rachelnabors/c64b3aeace8a191cf5ea6fb5202e66c9)
- [예제 전체 다운로드 (2KB 압축)](https://gist.github.com/rachelnabors/c64b3aeace8a191cf5ea6fb5202e66c9/archive/7b41a88cb1027c9b5d8c6aff5212ecd3d0493504.zip)

#### 컴포넌트를 재사용할 수 있습니다! {/*you-can-reuse-components*/}

동일한 HTML 페이지 여러 위치에 React 컴포넌트를 추가할 수 있습니다. React기반 페이지가 서로 분리되어 있는 동안 가장 유용합니다. `ReactDOM.render()` 를 여러 번 호출함으로써 여러 개의 컨테이너 엘리먼트를 사용할 수 있습니다.

1. **index.html**에서 `<div id="component-goes-here-too"></div>` 컨테이너 엘리먼트를 추가합니다.
2. 새 컨테이너 엘리먼트를 위해 **like_button.js**에서  `ReactDOM.render()` 를 추가합니다.

```js {6,7,8,9}
ReactDOM.render(
  React.createElement(LikeButton),
  document.getElementById('component-goes-here')
);

ReactDOM.render(
  React.createElement(LikeButton),
  document.getElementById('component-goes-here-too')
);
```

Check out ["Like" 버튼을 세 번 추가하고 일부 데이터를 전달하는 예시](https://gist.github.com/rachelnabors/c0ea05cc33fbe75ad9bbf78e9044d7f8)를 확인하세요!

### 5단계: 프로덕션용 JavaScript 코드 경량화 {/*step-5-minify-javascript-for-production*/}

코드 경량화가 되지 않은 JavaScript는 사용자의 페이지 로딩 속도를 늦출 수 있습니다. 웹사이트를 프로덕션에 배포하기 전에 스크립트를 경량화하는 것이 좋습니다.

- 스크립트에 **코드 경량화 단계가 없는 경우** [한 가지 설정 방법](https://gist.github.com/gaearon/42a2ffa41b8319948f9be4076286e1f3)이 있습니다.
- 애플리케이션 스크립트를 **이미 코드 경량화한 경우** 배포된 HTML이 다음과 같이 `production.min.js`로 끝나는 React 버전을 로드해야만 사이트가 프로덕션 할 준비가 됩니다.

```html
<script src="https://unpkg.com/react@17/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js" crossorigin></script>
```

## JSX로 React 사용하기 {/*try-react-with-jsx*/}

위의 예시는 브라우저에서 기본적으로 지원하는 기능에 의존합니다. 이것이 **like_button.js** 가 자바스크립트 함수 호출을 사용하여 추가할 내용을 React에 알리는 이유입니다.

```js
return React.createElement('button', {onClick: () => setLiked(true)}, 'Like');
```

하지만 React는 HTML과 유사한 자바스크립트 문법인 [JSX](/learn/writing-markup-with-jsx)를 사용하는 옵션도 제공합니다.

```jsx
return <button onClick={() => setLiked(true)}>Like</button>;
```

위에 두 코드 조각은 동일한 동작을 합니다. JSX는 자바스크립트에서 마크업을 설명하는데 널리 사용되고 있는 문법입니다. 많은 사람이 React와 다른 라이브러리에서 UI 코드 작성에 익숙하고 유용하다고 생각합니다. 다른 프로젝트에서 "자바스크립트 전체에 흩어져 있는 마크업"을 볼 수 있을지도 모릅니다!

> [온라인 변환기](https://babeljs.io/en/repl#?babili=false&browsers=&build=&builtIns=false&spec=false&loose=false&code_lz=DwIwrgLhD2B2AEcDCAbAlgYwNYF4DeAFAJTw4B88EAFmgM4B0tAphAMoQCGETBe86WJgBMAXJQBOYJvAC-RGWQBQ8FfAAyaQYuAB6cFDhkgA&debug=false&forceAllTransforms=false&shippedProposals=false&circleciRepo=&evaluate=false&fileSize=false&timeTravel=false&sourceType=module&lineWrap=true&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=7.4.3)에서 HTML 마크업을 JSX로 변환할 수 있습니다.

### JSX 사용하기 {/*try-jsx*/}

프로젝트에서 JSX를 시도하는 가장 빠른 방법은 페이지 `<head>`에 Babel 컴파일러를 React 및 ReactDOM과 같이 추가하는 것입니다.

```html {6}
<!-- ... 나머지 <head> ... -->

<script src="https://unpkg.com/react@17/umd/react.production.min.js" crossorigin></script>
<script src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js" crossorigin></script>

<script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

</head>
<!-- ... 나머지 <body> ... -->
```

이제 `<script>` 태그에 `type="text/babel"` 을 추가해서 JSX를 사용할 수 있습니다. 예를 들어

```jsx {1}
<script type="text/babel">
  ReactDOM.render(
  <h1>Hello, world!</h1>, document.getElementById('root') );
</script>
```

JSX 사용을 위해 **like_button.js**를 변환하려면

1. **like_button.js**에서 아래의 코드를 

```js
return React.createElement(
  'button',
  {
    onClick: () => setLiked(true),
  },
  'Like'
);
```

다음 코드로 교체합니다.

```jsx
return <button onClick={() => setLiked(true)}>Like</button>;
```

2. **index.html**의 "Like" 버튼 스크립트 태그에 `type="text/babel"`을 추가합니다.

```html
<script src="like_button.js" type="text/babel"></script>
```

다운로드하고 사용할 수 있는 [JSX가 있는 HTML 파일 예시](https://raw.githubusercontent.com/reactjs/reactjs.org/main/static/html/single-file-example.html)가 있습니다.

간단한 데모나 학습을 위해 사용하기 좋은 접근법입니다. 하지만 웹사이트가 느려지고 **프로덕션에는 적합하지 않습니다.** 앞으로 나아갈 준비가 되면 새 `<script>` 태그와 `type="text/babel"` 을 추가한 속성을 제거하세요. 대신 다음 섹션에서는 모든 `<script>` 태그를 자동으로 변환하도록 JSX 전처리기를 설정합니다. 

### 프로젝트에 JSX 추가하기 {/*add-jsx-to-a-project*/}

프로젝트에 JSX를 추가하는 것은 [번들러](/learn/start-a-new-react-project#custom-toolchains)나 개발 서버와 같은 복잡한 도구가 필요 없습니다. JSX 전처리기를 추가하는 것은 CSS 전처리기를 추가하는 것과 매우 비슷합니다.

터미널에서 프로젝트 폴더에 들어가서 두 명령어를 붙여넣으세요. (**[Node.js](https://nodejs.org/)가 설치되어있는지 확인하세요!**)

1. `npm init -y` (실패하면, [여기에 수정 사항이 있습니다.](https://gist.github.com/gaearon/246f6380610e262f8a648e3e51cad40d))
2. `npm install babel-cli@6 babel-preset-react-app@3`

JSX 전처리기를 설치하려면 npm만 있으면 됩니다. 다른 용도로는 필요하지 않습니다. React와 애플리케이션 코드는 모두 변경 없이 `<script>` 태그로 유지될 수 있습니다.

축하합니다! 프로젝트에 **프로덕션 준비 JSX 설정**을 추가했습니다.

### JSX 전처리기 실행하기 {/*run-the-jsx-preprocessor*/}

JSX가 포함된 파일을 저장할 때마다 변환이 다시 실행되어 JSX 파일을 새로운 일반 자바스크립트 파일로 변환하도록 JSX를 전처리할 수 있습니다.

1. **src** 폴더를 생성합니다.
2. 터미널에서 다음 명령어를 실행합니다. `npx babel --watch src --out-dir . --presets react-app/prod ` (완료될 때까지 기다리지 마세요! 이 명령어는 JSX를 위한 자동화된 감시자를 작동시킵니다.)
3. JSX로 통합된 **like_button.js** 를 새 **src** 폴더로 이동합니다. (또는 [JSX 시작 코드](https://gist.githubusercontent.com/rachelnabors/ffbc9a0e33665a58d4cfdd1676f05453/raw/652003ff54d2dab8a1a1e5cb3bb1e28ff207c1a6/like_button.js)를 포함하는 **like_button.js**를 생성합니다.)

이 감시자는 브라우저에 적합한 일반 자바스크립트 코드로 사전처리된 **like_button.js** 를 생성합니다.

<Gotcha>

"`babel` 패키지를 잘못 설치했습니다"라는 오류 메시지가 나타나면 [이전 단계](#add-jsx-to-a-project)를 놓쳤을지도 모릅니다. 동일한 폴더에서 수행한 후 다시 시도하세요.

</Gotcha>

추가로 모던 자바스크립트의 클래스 같은 최신 문법은 오래된 브라우저가 깨지는 것에 대해 걱정 없이 사용할 수 있습니다. 방금 사용한 도구는 Babel이라고 하며 [설명서](https://babeljs.io/docs/en/babel-cli/)에서 자세히 알아볼 수 있습니다.

빌드 도구에 익숙해지고 더 많은 작업을 원하는 경우 [여기에서 가장 인기 있고 접근하기 쉬운 툴 체인을 다루세요](/learn/start-a-new-react-project).

<DeepDive title="React without JSX">

원래 JSX는 React로 컴포넌트를 작성하는 것이 HTML을 작성하는 것만큼 친숙하게 느껴지도록 하기 위해 도입되었습니다. 그 이후로 이 문법이 널리 퍼졌습니다. 그러나 JSX를 사용하고 싶지 않거나 사용할 수 없는 경우가 있을 수도 있습니다. 두 가지 옵션이 있습니다.

- [htm](https://github.com/developit/htm)과 같이 컴파일러를 사용하지 않는 JSX 대안을 사용하세요.—자바스크립트의 기본 태그가 지정된 템플릿을 사용합니다.
- 아래에서 설명하는 특별한 구조를 가진 [`React.createElement()`](/reference/createelement)을 사용하세요.

JSX를 사용하면 다음과 같이 컴포넌트를 작성할 수 있습니다.

```jsx
function Hello(props) {
  return <div>Hello {props.toWhat}</div>;
}

ReactDOM.render(<Hello toWhat="World" />, document.getElementById('root'));
```

`React.createElement()`를 사용하면 다음과 같이 작성할 수 있습니다.

```js
function Hello(props) {
  return React.createElement('div', null, `Hello ${props.toWhat}`);
}

ReactDOM.render(
  React.createElement(Hello, {toWhat: 'World'}, null),
  document.getElementById('root')
);
```

`React.createElement(component, props, children)`는 세 가지 인수를 허용합니다. 작동 방식은 다음과 같습니다.

1. HTML 엘리먼트 또는 함수 컴포넌트를 나타내는 문자열일 수 있는 **컴포넌트**
2. [전달하려는 모든 **props**](/learn/passing-props-to-a-component)의 객체
3. 텍스트 문자열과 같이 컴포넌트가 가질 수 있는 모든 **자식** 객체

`React.createElement()`를 입력하는 것이 지루하다면 한 가지 일반적인 패턴은 축약어를 지정하는 것입니다.

```js
const e = React.createElement;

ReactDOM.render(e('div', null, 'Hello World'), document.getElementById('root'));
```

`React.createElement()`에 축약어를 사용 한다면 JSX 없이 React를 사용하는 것처럼 편리할 것입니다.

</DeepDive>


