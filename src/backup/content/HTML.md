---
title: "HTML"
description: "Hyper Text Markup Language"
date: 2021-11-01T12:57:58.389Z
tags: ["html"]
---
>## HTML이란??
Hyper Text Markup Language

**HyperText 기능을 가진 문서를 만드는 언어이다.** 보통 HTML을 뼈대에 비유한다. CSS를 이용하여 살을 붙이고, JS로 근육을 붙여준다면 동적인 웹 사이트를 만들 수 있다.

<img src="https://t1.daumcdn.net/cfile/tistory/996EB53F5C1B232327" />

사실 HTML 코드는 매우 많다. 하지만 고통스러워하지 않아도 된다. 모두 외우고 있을 필요가 없으며, 자주 사용하는 태그만 눈여겨 보고 필요한 태그는 찾아서 쓰자.

<br />

>## 태그

<img src="https://dasima.xyz/wp-content/uploads/2019/01/HTML-TAG-CLASSIFICATION-2.png" />

자주 사용되는 태그들이다. 태그에 대해서 잘 모른다면 [여기](https://www.w3schools.com/html/default.asp)를 이용하는것도 좋다.

<br />

> ## emmet

HTML를 작성할 때, 모든 부분을 타이핑하게 되면 시간을 많이 잡아먹는다. emmet을 사용하면 반복적인 작업에 대해 시간을 대폭 줄일 수 있다. (Tab키 이용)

```html
<!-- h1 -->
<h1></h1>

<!-- h1{hello word}*2 -->
<h1>hello word</h1>
<h1>hello word</h1>

<!-- h1+p -->
<h1></h1>
<p></p>

<!-- h1#idname -->
<h1 id="idname"></h1>

<!-- h1.classname -->
<h1 class="classname"></h1>

<!-- a[href="www.naver.com"] -->
<a href="www.naver.com"></a>

<!-- lorem -->
Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, aut cupiditate! Sed autem vel incidunt error obcaecati quia excepturi ex saepe? Facere dolores minima laudantium unde? Repellendus excepturi voluptates harum!

<!-- table>(tr>((td*2)))*3 -->
<table>
  <tr>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td></td>
    <td></td>
  </tr>
  <tr>
    <td></td>
    <td></td>
  </tr>
</table>
```

참고로 주석처리는 Ctrl + / 이다.

<br />

>## 간단한 문제

![](/images/c86d9643-59f8-486b-b3e5-f43d5ea9b2aa-image.png)

멋쟁이사자처럼 프론트엔드 1기의 이호준 강사님께서 문제를 내주셨다. 위 사진처럼 HTML만 사용하여 뼈대를 만들어보는 시간이었다. 아이콘은 가져오지 않고 그냥 영어 알파벳으로 대체했다. 오랜만에 해보아서 그런지 재미있었다.

<br />

* 과제.html
```html
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>위니브 홈페이지 HTML 클론</title>
    <link rel="stylesheet" href="과제001.css">
</head>
<body>
    <h1>About 🔥</h1>
    <p class="first_p">"기술의 교육 기회를 누구나 차등없이 받을 수 있게 대중화, 보편화, 시스템화 하는 것"</p>
    <p>우리는 교육 특권의 대중화, 고급 IT 기술의 상용화를 도모합니다. <br>또한 지역적 특성을 극복하고 ICT 지식에 대한 갈급함을 해소할 수 있도록 노력하고 있는 <br> ICT 연구 및 (코딩)교육 기관이며 다양한 사회 공헌 활동을 하고 있습니다.</p>
    <section>
        <div class="about_us">
            <span class="about_icon">-</span>
            <span class="about_us_span">About us</span>
        </div>
        <ul class="company">
            <li class="company_item">
                <img src="http://www.paullab.co.kr/images/logo_paullab.png" alt="바울랩 아이콘">
                <span>바울랩</span>
            </li>
            <li class="company_item">
                <img src="http://www.paullab.co.kr/images/logo_weniv.png" alt="위니브 아이콘">
                <span>위니브</span>
            </li>
            <li class="company_item">
                <img src="http://www.paullab.co.kr/images/logo_jejucodingbasecamp.png" alt="제주 코딩베이스캠프 아이콘">
                <span>제주 코딩베이스 캠프</span>
            </li>
        </ul>
    </section>
    <footer>
        <div class="footer_contents">
            <div class="footer_contents_name">
                <ul class="footer_item_list">
                    <li class="footer_item">Home</li>
                    <li class="footer_item">채용정보</li>
                    <li class="footer_item">캐릭터 소개</li>
                </ul>
                <ul class="footer_item_list">
                    <li class="footer_item">About</li>
                    <li class="footer_item">커리큘럼</li>
                    <li class="footer_item">자료실</li>
                </ul>
            </div>
            <ul class="footer_icon_list">
                <li class="footer_icon">b</li>
                <li class="footer_icon">T</li>
                <li class="footer_icon">F</li>
            </ul>
        </div>
        <div class="footer_informaton">
            <dl>
                <dt>(주)위니브</dt>
                <dd>| 대표 이호준</dd>
                <dd>|사업자번호 46-86-01737</dd>
                <dd>|주소제주도 제주시 수목원길 39-1, 1층</dd>
            </dl>
            <div class="footer_company">
                <span class="footer_company_icon">C</span>
                <span class="footer_company_content">weniv</span>
            </div>
        </div>
    </footer>
</body>
</html>
```

<br />

* 과제.css
```css
h1 {
  font-size: 60px;
  font-weight: bold;
  text-align: center;
}

ul {
  list-style: none;
}

p,
section {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin-bottom: 50px;
}

.first_p {
  font-weight: bold;
}

.about_us {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

.about_icon {
  font-size: 50px;
}

.about_us_span {
  font-size: 30px;
  font-weight: bold;
}

.company {
  display: flex;
  justify-content: center;
}

.company_item {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 10px 50px;
}

img {
  width: 150px;
  height: 150px;
  margin-bottom: 25px;
}

footer {
  position: fixed;
  width: 100%;
  bottom: 0;
  background-color: rgb(224, 224, 224);
}

.footer_contents {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid rgb(0, 0, 0, 0.2);
}

.footer_contents_name {
  display: flex;
}

.footer_icon_list {
  display: flex;
}

.footer_icon {
  font-size: 20px;
  font-weight: bold;
  margin-right: 15px;
  color: aquamarine;
}

.footer_item {
  font-weight: bold;
}

.footer_informaton {
  display: flex;
  justify-content: space-between;
}

dl {
  display: flex;
}

.footer_company {
  font-weight: bold;
}

```

<br />

* 결과

![](/images/46491f19-a72e-4fb5-9a48-6d93fd3202e4-image.png)


div 태그들이 보인다. 사실 만족스러운 코드는 아니다. header, label, figure 등을 더 사용했어야 했다. 다음에 설계 할 때는 태그를 좀더 활용하고, 시맨틱하게 짜보려고 한다.