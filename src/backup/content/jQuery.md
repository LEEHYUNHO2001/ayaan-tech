---
title: "jQuery"
description: "jQuery는 빠르고, 작고, feature-rich한 자바스크립트 라이브러리이다."
date: 2021-12-09T04:07:30.250Z
tags: ["CSS","JavaScript","html","node.js"]
---
>## jQuery란?

jQuery는 빠르고, 작고, feature-rich한 자바스크립트 라이브러리이다. 엘리먼트를 선택하는 강력한 방법과 선택된 엘리먼트를 효율적으로 제어할 수 있는 다양한 수단을 제공한다.

* jQuery 참고 사이트
[http://jquery.com/](http://jquery.com/)
[http://www.jqueryrain.com/](http://www.jqueryrain.com/)

물론 요즘 프로젝트에서는 jQuery를 걷어내는 작업을 하는 경우도 있지만, 모두 걷어내지는 못하는것이 현실이다.


<br>

>## jQuery 준비하기

먼저 가장 최신의 cdn을 찾기 위해 https://code.jquery.com/ 에 들어갔다.

![](/images/d2f842c0-92cc-4e6a-b461-8f8a3c91cadf-image.png)

버전3의 minified를 사용해보기로 했다.

jquery-1.x : 구형 브라우저 대부분 지원, 가장 안정적인 버전, 최신 버전과 호완문제가 있어 migrate를 함께 넣어주어야 한다.

jquery-2.x : 익스플로러 8버전 버림, 따라서 파일 크기 감소. 9버전 이상을 호환할 것이라면 2.x를 사용하자.

jquery-3.x : Promises와 ajax, when, data 등 여러 최신 플러그인과 HTML5 호환된다.

![](/images/455f629a-a6d9-4367-a31d-14d76a5e4cfe-image.png)

```js
<script
  src="https://code.jquery.com/jquery-3.6.0.min.js"
  integrity="sha256-/xUj+3OJU5yExlq6GSYGSHk7tPXikynS7ogEvDej/m4="
  crossorigin="anonymous"></script>
```

위의 스크립트를 HTML 헤더에 넣어주면 사용할 준비가 끝난다.

<br>

>## jQuery 기본 실습

```html
    <h1 id="one">jQuery 실습</h1>
    <p class="hide">hello</p>
    <button class="btn1">클릭해</button>
    <p class="ex1">jQuery 실습중</p>
    <img>
    
    <script>
        // document.getElementById('one').innerHTML = '!!!';
        $('#one').text('hello jQuery')
        $('.hide').hide();
        $('.btn1').click(function(){
            alert('클릭했네요?');
        })
        $('.ex1').html('<strong>실습중입니다.</strong');
        $('.ex1').css('color', 'red').css('backgroundColor', 'blue');
        $('img').attr('src', 'logo.jpg');
        $('img').attr('data-name', '프로필');
    </script>
```

![](/images/e24ff33c-e8df-4557-9e86-405518e2b8c7-image.png)

보면 대충 어떤느낌으로 사용하는지 느껴질 것이다.

카멜 표기법을 따르기 때문에 `background-color`이 아닌 `backgroundColor`이다.

```html
    <h1 id="one">jQuery 실습</h1>

    <textarea name="메모장" id="메모장" cols="30" rows="10"></textarea>
    <button class="btn2">메모장 내용 경고창으로 출력</button>

    <script>
        $('.btn2').click(function(){
            let 메모장값 = $('#메모장').val();
            $('#메모장').val('값을 입력하세요.');
            alert(메모장값);
        });
    </script>
```

undefined

**html()**은 선택한 요소의 html코드를 설정하거나 받아온다.
**text()**는 선택한 요소의 텍스트 내용을 받아온다.
**val()**은 from요소의 값을 설정하거나 받아온다.

<br>

>## 필터

- eq - equal ( = )
- ne - not equal ( <> )
- lt - little ( < )
- le - little or equal ( <= )
- gt - greater ( > )
- ge - greater or equal ( >= )

* **기본 필터**
  index는 음수 가능
  - :eq(index) `$("li").eq(3).css("color", "red" );`
  - :even
  - :odd
  - :first
  - :last
  - :gt(index) - 큰 숫자 선택 `$("li:gt(2)").css( "backgroundColor", "yellow");`
  - :lt(index) - 작은 숫자 선택 `$("li:lt(2)").css( "backgroundColor", "yellow");`
  - :not(filter) - `$("input:not(:checked)+span").css( "background-color", "yellow" );`

* **속성 필터**
  - :attributeContains - input[name*='man’]
  - :attributeEquals - input[name='newsletter’]

* **차일드 필터**
  - :first-child, :last-child
  - :nth-child(2)
  - :nth-child(even), :nth-child(odd)
  - :nth-child(3n)

* **컨텐츠 필터**
  - :contains(text)
  - :empty
  - :has(selector)

<br>

>## 문제

```html
    <!-- 
    1. items 부모를 찾아 background-color를 파란색으로 바꿔주세요.
    2. items 2번째 color를 빨간색으로 바꿔주세요
    3. ul2의 자식인 li요소를 선택하여 1번부터 3번까지 color를 녹색으로 바꿔주세요.
    4. ul2의 자식인 li요소를 선택하여 7번부터 10번까지 color를 파란색, background-color를 빨간색으로 바꿔주세요. 
-->

    <div class="wrapper">
        <h1 class="title">TITLE</h1>
        <ul>
            <li class="items">item 1</li>
            <li class="items">item 2</li>
            <li class="items">item 3</li>
        </ul>
    </div>
    <ul class="ul2">
        <li>hello</li>
        <li>hello</li>
        <li>hello</li>
        <li>hello</li>
        <li>hello</li>
        <li>hello</li>
        <li>hello</li>
        <li>hello</li>
        <li>hello</li>
        <li>hello</li>
    </ul>
```

간단한 문제를 풀어보자.

```html
    <script>
        $(".items").parent().css("backgroundColor", "blue");
        $(".items").eq(1).css('color', 'red');
        $(".ul2").children('li:lt(3)').css('color', 'green');
        $(".ul2").children('li:gt(5)').css('color', 'red');
    </script>
```

![](/images/a813da0a-fadd-4bb3-9f5d-7142a26e1c9b-image.png)

제대로 동작하는것을 볼 수 있다.

> 다른 기능

```js
        $(".ul2").append('<li>hello end</li>');
        $(".ul2").prepend('<li>hello start</li>');
```

append는 ul2 자식의 마지막에 prepend는 첫부분에 무언가를 추가한다.

**after**와 **before**는 자식이아닌 해당 태그 뒤와 앞에 오게할 수 있다.

<br>

```html
<body>
<h1 class="title">TITLE</h1>

<div id="div1">나는 삭제된다.</div>
<div class="one blue">hello world</div>
<div class="two blue">hello world</div>
<p class="blue">hello world</p>

<div class="three">3번째 div</div>
<div class="three blue">3번째 div</div>

    <script>
        $("#div1").remove();
        $(".one").addClass("add");
        $(".one, .two, p").removeClass('blue');
    </script>
</body>
```

![](/images/c8d60529-f6be-4754-acb2-505139eec2c2-image.png)

**remove**는 요소를 삭제한다.
**addClas**s는 클래스를 요소에 추가한다. (**removeClass**는 제거)

<br>

그 외에 show(), toggle(), fadeIn(), fadeOut(), fadeToggle() 등 여러가지 기능이 더 있다.

<br>

>## 이벤트

웹 페이지에서 사용자는 버튼을 클릭하거나, 마우스를 스크롤 하거나, 필드의 내용을 바꾸는 등의 행동(action)을 합니다. 웹 페이지는 이러한 사용자의 행동에 대해 상호작용을 하여 이벤트를 발생시킵니다.

예제들을 통해 알아보자.

<br>

```css
/*CSS*/
.box {
  width: 100px;
  height: 100px;
  background-color: red;
  display : none;
}
```

```html
<!-- HTML -->
<body>

    <p id="text"></p>
    <div id="divOne" class="box">클릭해보세요</div>
    <p class="textTwo"></p>
    <h1></h1>

    <script>
        $('#text').text('Hello');
        $('#divOne').fadeIn(3000);
        $('.textTwo').text('안녕하세요');
        $('h1').text('WOW');

        // div 클릭했을 때 안 보이게 하기
        // dom이 준비되면 실행해라!
        $(function(){
            $("div").click(function(){
            $(this).hide();
            });
        });
    </script>
</body>
```

undefined

DOM이 준비되면 함수가 실행된다. `div`태그를 클릭하면 `hide()`해주고 있다.