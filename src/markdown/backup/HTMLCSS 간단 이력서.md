---
title: "HTML/CSS 간단 이력서"
description: "HTML/CSS을 이용한 간단한 이력서 틀 만들기"
date: 2021-10-29T09:04:27.467Z
tags: ["CSS","html"]
---
HTML/CSS의 기초를 다지기 위해 간단 이력서를 설계해 보았다.


># HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    
</body>
</html>
```

보통 HTML 문서를 작성하게되면 DOCTYPE를 기계적으로 입력해주어야한다. 기본적인 틀을 반복작업하기 귀찮으니 **! + Tab** 으로 해주고있다. **lang만 ko로 바꾸어주자.**


![](/images/22ced875-2d3f-4c8b-8728-54b14027b54e-image.png)

HTML 문서를 편리하게 보기 위해 확장 프로그램을 설치해주었다. HTML 문서에서 우클릭 + Open with Live Server을 클릭하면 된다.


![](/images/142edf4f-3540-4dfc-a72b-202bf13af065-image.png)

head에 title과 body에 h1, p, footer를 추가 한 후 Live Server로 실행해 보았다.

<br />

># CSS

```html
<link rel="stylesheet" href="index.css">
```
이제 HTML을 꾸며주기 위한 css 작업을 해보자.
head 태그 안에 link태그를 이용하여 css파일을 연결해 주었다.

<br />

```css
footer {
  text-align: center;
  background-color: black;
  color: white;
}
```
css에서는 이와 같은 형태로 설계해주면 된다.

![](/images/e11884a6-40f0-479d-9f01-f1c65466b21e-image.png)

footer 태그가 꾸며진 것을 볼 수 있다.

<br />

>## class와 id



```html
<div class="example1">나는 멋쟁이</div>
<div id="example2">나는 멋쟁이</div>
```

같은 태그를 서로 다르게 꾸미기 위해서 class 또는 id값을 HTML 태그에 넣어주자.

```css
.example1{
	color: white;
}
#example2{
	color: black;
}
```
class는 . 을 사용하고, id는 #을 사용하여 css작업을 하면 된다.

<br />

>## Box-model

```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="box_model.css">
</head>
<body>
    <div class="box_1">박스1</div>
    <div class="box_2">박스2</div>
</body>
</html>
```

```css
.box_1 {
  background-color: skyblue;
  width: 100px;
  height: 100px;
  border: 5px solid black;
  padding: 20px;
  margin: 20px;
}
.box_2 {
  background-color: violet;
  width: 100px;
  height: 100px;
  border: 5px solid purple;
}
```
![](/images/c4d19104-9eac-4d1c-8578-785ee87ba7a0-image.png)
잠깐 mox-model에 대해서 살펴보자.
padding으로 인해 박스1은 박스안에서 상하좌우에 공간이 생겼다. margin는 박스1 밖에서 상하좌우로 공간이 생겼다.

Box-model에 대해 조금 더 알고싶은 사람은 먼저 [[CSS 기초] - box model](https://velog.io/@leehyunho2001/CSS-%EA%B8%B0%EC%B4%88-box-model)을 보자.

[시맨틱(Semantic)](https://velog.io/@leehyunho2001/%EC%8B%9C%EB%A7%A8%ED%8B%B1Semantic)에 대한 개념도 알아두면 좋다.

<br/>

>## 이력서 HTML/CSS


```css
  margin-left: auto;
  margin-right: auto;
```
* **박스 자체를 문서 한 가운데로 설정**

<br />

![](/images/a35917af-280f-4d2f-b02d-3f56d6cbac8a-image.png)

```html
        <section>
            <h2>EXPERIENCE</h2>
            <div class="float_wrap">
                <p class="title_text">Awesome Programming Company</p>
                <p class="year_text">2020 - Now</p>
            </div>
            <p class="desc_text">Front-End Web Developer</p>
        </section>
```

```css
.title_text {
  float: left;
}

.year_text {
  float: right;
}

.float_wrap {
  overflow: hidden;
}
```
* **p태그 2개를 한줄에 표시**
* **다음에 오는 p태그가 겹쳐지지 않기 위해 overflow 설정**

<br />

**index.html**
```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>이현호 이력서</title>
    <link rel="stylesheet" href="index.css">
</head>

<body>
    <div class="main_box">
        <div class="title_box">
            <h1>이현호</h1>
            <p class="name_text">Front-End 개발자</p>
        </div>

        <section>
            <h2>About Me</h2>
            <p class="about_me_text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
        </section>

        <section>
            <h2>EXPERIENCE</h2>

            <div class="float_wrap">
                <p class="title_text">Awesome Programming Company</p>
                <p class="year_text">2020 - Now</p>
            </div>
            <p class="desc_text">Front-End Web Developer</p>
            <p class="desc_subtext">HTML/CSS,JS,React,...</p>

            <div class="float_wrap">
                <p class="title_text">Ministry of Health</p>
                <p class="year_text">2015 - 2018</p>
            </div>
            <p class="desc_text">UI/UX Designer</p>
            <p class="desc_subtext">Web desi</p>

            <div class="float_wrap">
                <p class="title_text">Freelance Work</p>
                <p class="year_text">2011 - 2015</p>
            </div>
            <p class="desc_text">Graphic Designer</p>
            <p class="desc_subtext">Graphic Design, Editorial Design</p>
        </section>
    </section>

    <section>
        <h2>ACTIVITIES</h2>

        <div class="float_wrap">
            <p class="title_text">Front-End Volunteer</p>
            <p class="year_text">2019 - 2020</p>
        </div>
    </section>

    <section>
        <h2>EDUCATION</h2>

        <div class="float_wrap">
            <p class="title_text">University</p>
            <p class="year_text">2015 - 2021</p>
        </div>
    </section>

    <section>
        <h2>AWARDS</h2>

    </section>

        <div class="sns_wrap">
            <a href="https://twitter.com/?lang=ko"><img class="sns_img" src="images/1.jpg"/></a>
            <a href="https://www.instagram.com/"><img class="sns_img" src="images/2.jpg"/></a>
        </div>
    </div>
    <footer>
        <p>이메일 : dlgusgh2001@likelion.org</p>
    </footer>
</body>
</html>
```

<br />
<br />

**index.css**
```css
@import url("https://fonts.googleapis.com/css?family=Montserrat:100,200,300,400,500,600,700,800&display=swap");

* {
  font-family: "Montserrat";
}

body,
h1,
h2 {
  margin: 0px;
  padding: 0px;
}

body {
  min-width: fit-content;
}

h1 {
  font-size: 36px;
  font-weight: bold;
  font-style: italic;
}

h2 {
  font-size: 20px;
  font-weight: lighter;
  color: #282828;
  border-bottom: 1px solid #ebebeb;
  margin-bottom: 16px;
  padding-bottom: 5px;
}

.name_text {
  font-size: 17px;
  color: #7c7c7c;
  font-weight: bold;
}

.main_box {
  border: 1px solid #7c7a7a;
  width: 610px;
  margin-left: auto;
  margin-right: auto;
  padding: 30px;
  margin: 30px;
  box-shadow: 0 1px 20px 0 rgba(0, 0, 0, 0.2);
}

footer {
  text-align: center;
  background-color: #1e1e1e;
  color: #919191;
  font-size: 12px;
  padding: 20px;
}

section {
  margin-bottom: 24px;
}

.name_text {
  font-size: 16px;
  color: #7c7c7c;
  font-weight: bold;
}

.about_me_text {
  font-size: 10px;
  line-height: 16px;
}

.title_text {
  font-size: 11px;
  font-weight: bold;
  color: #282828;
  float: left;
}

.year_text {
  font-size: 11px;
  font-weight: bold;
  color: #282828;
  float: right;
}

.float_wrap {
  overflow: hidden;
}

.desc_text {
  font-size: 9px;
}

.desc_subtext {
  font-size: 9px;
  color: #282828;
  padding-left: 16px;
}

.title_box {
  text-align: right;
}

.sns_img {
  width: 12px;
  height: 12px;
}

.sns_wrap {
  text-align: right;
}

```
<img src="https://user-images.githubusercontent.com/78518132/139407428-199ea228-86f5-4e5c-be21-6e22397509cc.jpg" />

이로써 이력서의 틀을 HTML/CSS를 이용하여 설계하였다. 안에 내용은 사실과 상관없이 막 쓴 것이다.

<br />

># 마무리

CSS에서 자주 사용되는 속성들은 공부하되 모두 알 필요는 없다. [공식문서](https://developer.mozilla.org/ko/docs/Web/CSS/Reference)를 보면서 필요한 태그들을 그때그때 사용하자.