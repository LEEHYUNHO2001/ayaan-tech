---
title: "create-react-app 뜯어보기"
description: "create-react-app 프로젝트이름 으로 React를 빠르게 작업할 수 있는 패키지를 설치했다. 구성들을 확인해보자."
date: 2021-11-29T23:46:05.979Z
tags: ["React"]
---
`create-react-app 프로젝트이름` 으로 React를 빠르게 작업할 수 있는 패키지를 설치했다. 하지만 구성들을 모두 알아야 마음이 편할 거 같다. ~~개발자 마인드 ㅋㅋㅋ?~~

<br>

![](/images/45bb1e80-2c08-4b1e-851f-ddd8862fef02-image.png)

* 내가 생성한 프로젝트 test의 구성
  * node의 모듈들이 있는 디렉터리
  * public
  * src
  * GitHub에 push할때 제외할 목록을 선언할 .gitignore
  * package-lock.json과 package.json
  * README.md

<br>

> public

![](/images/05d63c79-9b75-4a87-b513-75a09fec36c1-image.png)

![](/images/2bf16b05-9972-4873-94ff-89be139288c4-image.png)

* 브라우저 창에서 아이콘 모양을 위한 **favicon.ico** 파일이다.

<br>

```jsx
<div id="root"></div>
```
* **index.html**에서 HTML 템플릿 및 JavaScript의 컴포넌트를 조합한다. div의 id값을 이용하여 DOM을 출력하고 있다.

<br>

![](/images/c40aed53-cabb-48a0-bcc7-d2ad636c9656-image.png)

**manifest.json**는 앱에 대한 정보를 담고 JSON 파일이다. 웹 개발자들은 웹앱이 어떻게 하면 모바일앱 처럼 보이게 할지 연구해왔다. 애플은 웹앱 에 Native 느낌을 넣으려고 했는데, 위 사진( index.html ) 에 link하나가 적용된 것을 볼 수 있다. 그 후 결국 [manifest](https://joshua1988.github.io/web-development/pwa/webapp-manifest/)가 나타났다.

<br>

* **robots.txt** 는 웹사이트에 웹 크롤러같은 로봇들의 접근을 제어하기 위한 규약이다.

<br>

> src

![](/images/e3edd149-2008-4522-85d2-8596b01e6966-image.png)

이제 여기에는 component, pages 등 원하는 디렉터리를 만들고 본인 스타일에 맞게 코드를 설계하면 된다.

undefined

* **App.js, App.css, App.test.js(테스트)**로 위의 기본 UI 생성하고 있다.

* 설계한 코드들을 **index.js**에서 출력 (DOM render)한다.

![](/images/37f48c0a-cb97-4d09-afe0-6a639b870c84-image.png)

* **reportWebVitals**는 React의 성능을 측정하기 위한 파일이다. 해당 컴포넌트가, 크래쉬 없이 제대로 렌더링이 되었는지 확인한다. `npm test`로 실행할 수 있다.

[유닛테스팅](https://velopert.com/3587)


* **setupTests.js**는 React에서 테스트를 실행하기 위한 설정파일이라고 보면 된다.

<br>

> 마무리

이제 create-react-app 의 구성을 모두 살펴보았다. `npm start`로 실행하여 본격적으로 프로젝트를 설계하거나 실습을 해도 좋을 것이다. 