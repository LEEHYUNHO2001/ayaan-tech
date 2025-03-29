---
title: "VSCode, 꿀팁, 테이블 태그"
description: "VScode 익스텐션, html 태그 꿀팁, 테이블 태그 정리"
date: 2021-11-03T04:27:57.164Z
tags: []
---
>## VSCode 및 꿀팁

![](/images/d4ed94da-a6c6-4ee1-b0e9-37b72087ea72-image.png)

나의 VSCode에는 꽤 많은 익스텐션이 설치되어있다. 그런데 이번에 **htmltagwrap**는 처음 알게되어 설치했다. 이제 **Alt + w** 를 이용하여 태그를 조금 더 편리하게 작성할 수 있다.

Alt + 더블클릭이나 Alt + Shift로 감싸는 작업도 편하게 해주면 더욱 빨라진다.

<br>

>## 꿀팁

당연한 사실들이지만 프로젝트를 설계하면서 잘 지켜지지 않던 나의 습관들을 돌아볼 수 있는 계기가 되었다.

<br>

<img src="https://media.vlpt.us/images/jun17114/post/75b169da-fe13-4c6f-af5b-05a606fb3120/html.jpg" />

<br>

* **footer안에서는 div로 나누지 말자**
원래 HTML을 설계할때 div를 사용하는것을 좋아하지 않는다. footer안에서는 더욱 그렇다고 볼 수 있다. footer 에서 자주 사용하는 태그들을 익혀두면 좋을 것 같다.
ex) sectio, article, p, address, small 등

* **section 다음에는 h태그 써주자**
h태그가 보이지 않는 부분이라도 왠만하면 써주자. 구분하는 의미와 시각 장애인분들을 위한 작업이 이루어질 수 있다.

* **inline 태그 안에 block 태그 넣지 말자**
block요소는 inline 요소를 받을 수 있음.

<br>

>## 테이블 태그

테이블 태그에 대해서 자세히 짚고 넘어간 적은 없었는데, 이번 기회에 정리를 해보려고 한다.

<img src="https://t1.daumcdn.net/cfile/tistory/240F763A57692DAA16" />

<br>

* **테이블 생성**

```html
<!-- table>(tr>th*3)+(tr>td*3)*3 -->
<table>
    <tr>
        <th>구분</th>
        <th>책 이름</th>
        <th>책 가격</th>
    </tr>
    <tr>
        <td>1</td>
        <td>hello1</td>
        <td>1000</td>
    </tr>
    <tr>
        <td>2</td>
        <td>hello2</td>
        <td>2000</td>
    </tr>
    <tr>
        <td>3</td>
        <td>hello3</td>
        <td>3000</td>
    </tr>
</table>

```

먼저 **emmet**( **table>(tr>th*3)+(tr>td*3)*3** ) 으로 간단한 테이블을 생성하고, 적당한 값을 넣어주었다.

![](/images/92612c94-266a-4c62-9f05-7f9a2ecbad2a-image.png)

```css
        table, tr, th, td{
            border: 1px solid black;
            border-collapse: collapse;
        }
```

**테이블에 선이 표시된 것은 css**로 작업한 것이다.
**행, 열의 머릿말은 th 태그**로 작성해주는 것이 좋다.

<br>

* **테이블의 병합**

```html
    <table>
      <!-- 위의 코드 있다고 가정 -->
      <tr>
        <td colspan="3">총 판매량</td>
        <td>6</td>
      </tr>
    </table>
```

![](/images/01f38bae-8f3f-4b25-a1d2-2a078d8c2ae5-image.png)

총 판매량을 테이블에 넣어주고 싶어 tr을 하나 더 생성해 주었다. 
그렇다면 총 판매량 부분의 셀 병합은 어떻게 할까? 보통은 row가 합치는 것이라고 생각하여 rowspan을 생각한다. 
하지만 데이터로 보았을 때, 각 colunm은 기준으로 합쳐지는 것이다. 그러므로 **3개를 병합하니 colspan="3"**이다.

<br>

* **테이블 각종 태그**

```html
    <table>
        <caption>
            테이블 제목 또는 설명
        </caption>
        <colgroup>
            <col class="구분">
            <col class="이름">
            <col class="가격">
            <col class="판매량">
        </colgroup>
        <thead>
            <tr>
                <th>구분</th>
                <th>책 이름</th>
                <th>책 가격</th>
                <th>책 판매량</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>1</td>
                <td>hello1</td>
                <td>1000</td>
                <td>1</td>
            </tr>
            <tr>
                <td>2</td>
                <td>hello2</td>
                <td>2000</td>
                <td>2</td>
            </tr>
            <tr>
                <td>3</td>
                <td>hello3</td>
                <td>3000</td>
                <td>3</td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td colspan="3">총 판매량</td>
                <td>6</td>
            </tr>
        </tfoot>
    </table>
```

![](/images/401040b3-4236-4d1b-89fa-9f8bd13ed8eb-image.png)

caption : 테이블의 제목 또는 설명

[colgroup](https://developer.mozilla.org/ko/docs/Web/HTML/Element/colgroup) : 서식 지정을 위해 하나 이상의 열을 그룹으로 묶을 때 사용. col을 지정하여 각각 다른 스타일 지정 가능.

thead : 머리글

tbody : 본문

tfoot : 바닥글

scope : th 요소에 scope 속성을 사용해 머리말이 열에 대한 것인지 아니면 행에 대한 것인지 나타낼 수 있음
ex) `th scope="row"`

표 안에서의 요소 정렬도 검색해서 찾아보면 좋을 것 같다.

<br>
<br>
<br>
<br>

[table](https://developer.mozilla.org/ko/docs/Web/HTML/Element/table) MDN 참고
[행 과 열 범위지정](https://developer.mozilla.org/ko/docs/Web/HTML/Element/table#%ED%96%89%EA%B3%BC_%EC%97%B4_%EB%B2%94%EC%9C%84_%EC%A7%80%EC%A0%95)