---
title: "CSS 사용 방법 종류, 선택자"
description: "선택자 정리"
date: 2021-11-03T11:32:12.073Z
tags: ["CSS"]
---
>## 인라인 ,내부, 외부 CSS


* **인라인 CSS**
```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>css 기초</title>
</head>
<body>
    <h1 style="color: red;">Hello world</h1>
</body>
</html>
```

<br>

* **내부 CSS**
```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>css - study</title>
    <style>
        h1 {
            color: red;
        }
    </style>
</head>
<body>
    <h1>Hello world</h1>
</body>
</html>
```

<br>

* **외부 CSS**
```html
<!-- html -->
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="016_외부.css">
  <!-- <style>@import url("016_외부.css");</style> -->
    <title>css 기초</title>
</head>
<body>
    <h1>Hello world</h1>
</body>
</html>
```

<br>

```css
/* css */
h1 {
  color: red;
}
```

![](/images/b5e57606-b04c-4d2f-a9ae-cd6fff2a1033-image.png)
결과는 모두 붉은색 Hello world가 출력된다.

html에서 css 사용할 경우 위와 같이 **외부**로 빼서 사용하는 것이 좋다. **레이아웃이 되는 css 하나 만들고 각 컴포넌트나 스크린마다 css파일을 만들어 @import로 참조하여 사용하는 것이다.** (상황에 맞게 reset.css도...)

<br>

<img src="https://cdn.inflearn.com/public/courses/326905/cover/739f7b4b-1a9f-478f-a6a8-1a13bf58cae3/326905-eng.png" />

**React**를 사용하는 나의 입장에서 보면, 요즘은 **styled components**가 좋은것 같다. css 파일을 밖에 두지 않고, 컴포넌트 내부에 넣기 때문에, css가 전역으로 중첩되지 않도록 만들어주고, 관리도 쉬운 것 같다.

<br>

>## 선택자 정리

선택자의 종류와 사용 방법을 대략적으로만 알고있어서 이번 기회에 제대로 정리해보려고 한다.

<br>

* 전체 선택자
```css
* {
    font-family: 'Courier New', Courier, monospace;
}
```
모든 HTML 요소에 접근을 한다. reset할때 많이 사용한다.

<br>

* 태그 선택자
```css
span {
    color: red;
}
```
선택한 태그에 css를적용한다.

<br>

* class, id
```css
.classname{
	font-size: 10px;
 }
 #idname{
 	font-size: 20px;
 }
```
태그의 class값, id값을 이용하여 css값을여한다.

<br>

* 하위 선택자
```css
ul li {
    margin-rigth: 10px;
}
```
공백을 사용하여 나타낸다. ul태그 안에 있는 모든 li 태그에 css가 적용된다. ul 의 div 안에있는 li에도 적용이 된다.

<br>

* 자식 선택자
```css
ul > li {
	margin-right: 10px;
}
```
ul태그 바로 뒤에오는 li태그에 css가 적용된다.


<br>

* 인접 형제 선택자
```css
h1 + ul {
    color: red;
}
```
`+`를 기준으로 앞 요소 직후에 나오는 뒤 요소에 css가 적용된다. 즉, ul의 color가 red이다.

<br>

* 일반 형제 선택자
```css
h1 ~ ul {
    color: red;
}
```
`~`을 기준으로 앞 요소 이후에 나오는 모든 뒤 요소를 선택한다.

<br>

* 속성 선택자
```css
a[href] {
	font-size: 5px;
}

a[href="http://www.naver.com"]
    font-size: 10px;
}

a[href~="nav"] {
    font-size: 15px;
}

a[href^="http"] {
    font-size: 20px;
}

a[href$="kr"]{
    font-size: 25px;
}

a[href*="paul"] {
	  font-size: 30px;
}

a[href|="http"]{
    font-size: 35px;
}
```
Test Case
하이픈, 언더바, 공백, 합성어
value_1, value-1, value 1, values


a[href] : a태그에 href 속성이 있는 경우

a[href="value"] : a태그의 href값이 value인 경우만 됨.

a[href~="value"] : a태그의 href값에 value가 있으면 됨. 공백만 가능.

a[href^="value"] : a태그의 href가 value로 시작하면 됨.

a[href$="value"] : a태그의 href가 value로 끝나면 됨.

a[href*="value"] : a태그의 href값에 value가 있으면 됨. 하이픈, 언더바, 공백, 합성어 가능.

a[href|="value"] : a태그의 href가 value로 시작하면 됨. 하이픈만 가능.

<br>

* 가상 클래스 선택자
```css
.foo:hover{
   color: blue;


.foo:nth-child(odd) {
   color:red;
}
```
class가 foo인 태그위에 마우스를 올려놓으면 color는 blue가 된다. 그리고 홀수번째만 red가 된다.

가상 클래스 선택자에는 **link, hover, visited, active, focus, first, last, first-child, last-child, nth-child** 등이 있다.

<br>

* 가상 요소 선택자
```css
p::after {
    content: 'cm'
}
```
p태그에 30이라는 값이 있었다면 브라우저에 30cm로 표시된다. cm는 드래그 해봐도 긁히지 않는다. html을 작성하지 않고 css로 꾸미기 위한 용도로도 사용된다.

<br>

>우선순위

id > class > tag

- id : id 선택자는 100점의 가중치
- class, 가상클래스 선택자 : class, 가상클래스 선택자는 10점의 가중치
- 요소, 가상요소 선택자 : 요소, 가상요소 선택자는 1점의 가중치