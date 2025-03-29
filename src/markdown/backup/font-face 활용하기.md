---
title: "font-face 활용하기"
description: "font-face를 이용하면 하나의 font-fmaily 이름으로 한글과 영문에 다른 폰트를 적용할 수 있다..?! 심지어 폰트 굵기마다 다른 폰트도 가능하다."
date: 2022-03-28T09:07:23.448Z
tags: ["CSS","React"]
---
## 웹 폰트

웹사이트를 설계할 때, 우리는 마음에 드는 폰트를 적용시킨다. 보통 link태그나 @import를 이용하여 적용한다. 하지만 한글, 영문, 숫자 등 다른 폰트를 적용시키는 커스텀을 수행하고 싶거나 사용자 컴퓨터에 설치되지 않은 글꼴을 서버에서 받아 사용하고 싶다면 이 글을 참고해보자.

<br>

### 확장자

#### ttf (True Type Font) / otf (Open Type Font)

pc에 설치하여 사용하는 폰트로, 웹 뿐만아니라 워드나 전자 출판에도 사용할 수 있다. 윈도우 전용 느낌인 ttf를 보완한 otf는 화면용과 인쇄용 글꼴 정보가 하나의 글꼴 파일 안에 들어있어 더 보기좋은 화면 출력을 보장해준다.

지원 : IE9, 최신 버전의 IE, 크롬, 파이어폭스, 사파리, 오페라, iOS 사파리(4.2+), 블랙베리 브라우저

<br>

#### woff (Web Open Font Format)

OTF/TTF 를 이용한 구조의 압축된 버전으로 웹에서 사용할 목적으로 개발되었다. 다른 글꼴 형식보다 빠르게 로드된다는 장점이 있고, 글꼴 파일 안에 metadata나 license 정보도 포함할 수 있다.

지원 : Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+  FF Mobile(Gecko) 5, Opera Mobile11

이 외에 svg, eot 확장자 등이 있다.

<br>


## font-face

이제 link나 @import 사용하는 방법이 아닌 font-face로 폰트를 적용해보자.

직접 사용해보고 싶으면 [CodeSandBox](https://codesandbox.io/s/css-font-face-unicode-range-forked-e25t33?file=/src/styles.css)을 보자.

<br>

```css
@font-face {
  font-family: "NotoSansKR";
  src: url("./asset/NotoSans-Regular.woff") format("woff");
  font-style: normal;
}
@font-face {
  font-family: "NotoSansKR";
  src: url("./asset/OpenSans-Regular.woff") format("woff");
  unicode-range: U+0020-007E;
  font-style: normal;
}
```

font-face의 선언은 @를 붙이면 된다. 그 후에는 취향에 맞게 font-face 속성들을 사용하자.

- font-family : 적용시킬 폰트의 이름을 정해주면 된다. 나중에 font-family 속성을 부여할 때, 여기서 적용시킨 이름을 사용한다. 가독성과 유지보수성을 생각해서 지어주면 된다.

- font-style: 폰트 스타일을 정한다. 예를들어 italic이면 우리가 아는 그 기울어진 그거다..

- src : 적용시킬 폰트를 정하고, 포맷이 있는경우 format값을 넣어준다. 로컬에 설치된 폰트는 local을 사용하고, 웹폰트를 다운로드할 경우에는 url을 사용한다. 또한, `,`를 사용하여 많은 폰트를 적용할 수 있고 브라우저는 적용할 수 있는 폰트를 찾을 때까지 선언한 순서대로 본다.

```
특수문자 범위: U+0020-002F, U+003A-0040, U+005B-0060, U+007B-007E
영문 범위: U+0041-005A(대문자), U+0061-007A(소문자)
숫자 범위: U+0030-0039

전체 U+0020-007E
```

- unicode-range : 폰트를 적용시킬 문자를 유니코드로 정할 수 있다. 이 속성으로 영문과 한글의 폰트를 따로 설정할 수 있는 것이다. 그 외에 다국어를 지원해주는 사이트에서 해당 나라의 언어에 대한 폰트만 다운받도록 하여 용량을 줄일 수도 있다. unicode-range에는 단일코드`,`, 범위코드`-`, 와일드 카드`?`를 사용할 수 있다.

<br>

```css
@font-face {
  font-family: 'NotoSansKR';
  src: url('https://s3주소')
    format('woff');
  font-weight: 300;
  font-style: normal;
  unicode-range: U+AC00-D7AF;
}
```

- font-weight : 폰트 굵기를 설정하는 속성이다. 굵기마다 font-family를 설정할 수 있는 더욱 세세한 커스텀이 가능하게 된다.

s3에 올려놓은 폰트를 적용시키고 싶은 경우에는 주소만 잘 적어주면 된다.

<br>

```css
body {
  font-family: "NotoSansKR", sans-serif;
}
```

나만의 font-fmaily를 생성했으므로 이제 사용하면 끝이다.