---
title: "JavaScript 변수와 자료형, 연산자"
description: "웹브라우저가 해석해서 실행할수 있는 유일한 프로그래밍 언어이다."
date: 2021-11-26T07:33:26.322Z
tags: ["JavaScript"]
---
>##JavaScript란?

웹브라우저가 해석해서 실행할수 있는 유일한 프로그래밍 언어이다. HTML을 프로그래밍으로 제어할 수 있다.

```html
    <button type="button"
    onclick="document.getElementById('demoOne').innerHTML = Date()">
    Click me (One)</button>
    
    <button type="button"
    onclick="document.getElementById('demoTwo').innerHTML = 'hello world'">
    Click me (Two)</button>
    
    
    <p id="demoOne"></p>
    <p id="demoTwo"></p>
```

![](/images/51f59b01-2412-468e-b5f3-53244cd6dd9f-js%20s.gif)

어떤 동작들이 가능한지 먼저 맛보기로 사용해보자.

첫번째 버튼은 클릭했을 때, demoOne 이라는 id를 가진 태그를 찾아 안에 Date()를 넣어준다.

두번째 버튼은 클릭했을 때, demoTwo 라는 id를 가진 태그를 찾아 안에 hello world를 넣어준다.

JavaScript를 이용하면 이렇게 동적으로 설계할 수 있는 것이다.

<br>

> 변수

변수란, 변할 수 있는 수를 뜻한다.

- 변수이름은 $, _ 를 제외한 공백, 특수문자, 구두점(글의 여러 가지 경계를 구분하기 위해 사용되는 반점(,), 온점(.), 물음표(?) 등등…)을 사용할 수 없음

- 첫 글자는 숫자가 될 수 없음

- 대소문자 구별

- 예약어(var, function 등)가 쓰일 수 없음

- 유니코드 문자도 사용 가능

변수 생성 방식에는 var, let, const가 있다.

```js
var a = 'ab';
var a = 'cd';
a = 'ef';
```
var는 재선언, 재할당 될 수 있다.
`var a = 10;`을 하면 메모리에 10을 할당하고, a가 10을 가리키게 된다.

<br>

```js
let a = 'ab';
let a = 'cd';
a = 'ef';
```
let은 재할당만 될 수 있다. 위의 경우 console.log 찍어보면 `Uncaught SyntaxError: Identifier 'a' has already been declared` 에러나 나타나는것을 볼 수 있다.

<br>

```js
const a = 'ab';
const a = 'cd';
a = 'ef';
```

const는 재선언, 재할당 모두 할 수 없다. 위의 코드는 2번 에러가 날 것이다.

<br>

> 자료형

* Boolean : 논리적인 요소 (true, false)
* undefined : 값을 할당하지 않은 변수가 가지는 값
* Number : 숫자형으로 정수와 부동 소수점, 무한대 및 NaN(숫자가 아님)값을 포함
* String : 문자열
* null : 빈 값

```js
typeof ''              // -> "string"
typeof 1               // -> "number"
typeof NaN             // -> "number"
typeof true            // -> "boolean"
typeof undefined       // -> "undefined"
typeof Symbol()        // -> "symbol"
typeof null            // -> "object", 심각
typeof []              // -> "object", 심각, array라고 나와야지!
typeof {}              // -> "object"
typeof new Date()      // -> "object"
typeof /test/gi        // -> "object"
typeof function () {}  // -> "function"
```

123을 string으로 변환할때, `toString(123)` 보다는 `123 + ''` 을 실무에서 더 많이 사용한다고 한다.

'123' 문자열을 number으로 변환할때, `Number(123) `, `parseInd('123', 10)`,  `+'123'` 중에 사용한다.

> 연산자

![](/images/b33669ef-3fe7-471d-bdc8-5606064c8075-image.png)

![](/images/2bc536e5-9079-4b96-9e50-b023b2c98aa4-image.png)

```js
// 논리연산
// and, or, not
// && = 논리곱
// || = 논리합
// ! = 부정
// true = 1
// false = 0
```

![](/images/3a7a9f28-ad4f-4001-a1b3-5efbcef90ef9-image.png)

헷갈리는 경우는 방지하기 위해 true를 뽑아내고 싶을 경우에는 `!!true`, `!!false` 처럼 !!을 사용하자.