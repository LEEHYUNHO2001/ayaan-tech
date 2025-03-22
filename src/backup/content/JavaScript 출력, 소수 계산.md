---
title: "JavaScript 출력, 소수 계산"
description: "JavaScript의 기본 지식"
date: 2021-11-29T05:49:41.106Z
tags: ["JavaScript"]
---
> JS의 4가지 출력 방법 및 기본 지식

```js
window.console.log('hello world');
document.write('hello world');

//one이라는 id를 찾아 HTML을 hello world로 채움
document.getElementById('one').innerHTML = 'hello world';
//hello world alet창 나타남
window.alert('hello world');
```

JS를 사용하며 밥먹듯이 사용하는 console.log는 window의 속성이였다. window는 전역으로 선언되어 있기 때문에 생략할 수 있고 property 이름으로 접근할 수 있다. 그리고 **`.`** 를(멤버 접근 연산자) 통해서 사용할 수 있다.

window, document 에 대해 궁금하다면 [DOM, BOM](https://velog.io/@leehyunho2001/DOM-BOM) 글을 보고 오는것을 추천한다.


![](/images/bfa67c3c-1a56-4d09-921c-eff0f11a2c31-image.png)

무수히 많은 기능들이 있는데, console.table() 에 json을(객체) 넣어주면 테이블도 출력 할 수 있다.

<br>

> 소수점 계산

![](/images/db03b65a-2d6d-4a05-8f4b-c8d6e3da34a0-image.png)

왜 이런 결과가 나올까? 0.1과 0.2를 2진수로 바꿔 더한 후에 10진수로 바꾸다보니 그렇다. 이런 문제점에 대해서는 항상 생각하면서 설계하자. 

```js
console.log(+(a + b).toFixed(1));
console.log(Math.round((a + b) * 10) / 10); 
```

위의 문제점은 이와같이 toFixed나 Math에서 소수를 다루는 함수로 해결할 수 있다.

![](/images/04b4181b-9131-43e4-85f8-98383c891ed0-image.png)

소수점에서만 일어나는 문제는 아니다.

<br>
<br>
<br>
<br>

참고하면 좋은 문서 : https://ko.javascript.info/