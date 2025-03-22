---
title: "Hoisting(호이스팅), 스코프, TDZ"
description: "Hoisting을 완벽하게 이해해보자!"
date: 2021-12-01T12:33:11.242Z
tags: ["CS","JavaScript"]
---
> ## Hoisiting 이란??

![](/images/ed912290-e16e-45e1-8406-ed17b994ce8d-image.png)

**Hoisting이란 var 변수의 선언문 또는 함수선언문 안의 내용물 모두 끌어올려 유효 범위의 최상단에 선언**하는 것이다. 하지만 실제로 끌여올려지는 것은 아니며 메모리에도 변화는 없다.

JavaScript 엔진은 코드를 컴파일에서 인터프리팅의 순으로 처리하는데,
컴파일 단계에서 var name = 'HyunHo'; 라는 코드를 두개의 구문으로 분리하여 본다.

이렇게 설명하면 무슨소린지 이해가 잘 안간다. 개발자 답게 바로 코드로 넘어가자.

<br>

> 변수 호이스팅

* **var - Hoisting**

```js
//실제코드
console.log(name);
var name = 'HyunHo';
```

이 코드의 결과값은 무엇일까? 보통 error가 나타날 것이라고 생각한다. 왜냐하면 변수를 선언하기 전에 사용해버렸으니 말이다.

```js
//호이스팅
var name;
console.log(name);
name = 'HyunHo';
```

하지만 **JavaScript에서 Hoisting** 이라는 것이 등장한다.
var로 선언한 변수는 밑에 있어도, 최상단으로 이동하게 된다.
이제 우리가 생각해볼 수 있는 **결과값은 undefined** 이다.

<br>

```js
// 실제 코드
console.log(str);
if(true) {var str = 'Hoisting'};
console.log(str);
```

그렇다면 위의 코드는 어떻게 동작할까.
var, let, const는 스코프 안에서만 참조가 가능하다. 
하지만 var는 블럭 스코프는 무시하고, 함수스코프는 무시하지 못한다.

```js
// 호이스팅
var str;
console.log(str);
if(true) {str = 'Hoisting'};
console.log(str);
```

Hoisting으로 인해 str이 최상단에서 선언이 된다. 그 후 콘솔을 찍었으므로 **undefined**가 출력된다.
그리고 var의 특성상 블럭 스코프는 무시하므로 if안에서 str에 넣은 값을 사용할 수 있다. 두 번째 콘솔에는 **Hoisting** 이 출력된다.

<br>

> 함수 호이스팅

* **함수 선언문**

```js
//실제 코드
name()

function name(){
    console.log('HyunHo');
}
```

함수를 위와같이 사용하는 것을 함수 선언문이라고 한다.
name()함수를 선언하기 전에 불러오고 있다. 

```js
//호이스팅
function name(){
    console.log('HyunHo');
}

name()
```

이 경우에도 호이스팅이 일어난다. 함수 선언문이 최상위로 올라갔다.
그리고 name()으로 호출하는 것처럼 되어 결과값은 **HyunHo** 가 된다.

<br>

```js
//실제 코드
name()

function name(){
  	console.log(me);
    var me = 'HyunHo';
}
```

우리는 이제 이 코드가 Error가 나지 않을것을 알고 있다.
어떻게 동작하는지 한번 더 보자.

```js
//호이스팅
function name(){
  	var me
  	console.log(me);
    me = 'HyunHo';
}

name()
```

var는 블럭 스코프만 무시하므로 함수 스코프안에서는 꼼짝없이 갇혀있다.
그래도 그 안에서도 Hoisting이 일어난 것을 볼 수 있다.
출력은 **unfined** 이다.

<br>

* **함수 표현식**

```js
//실제 코드
name()

var name = function(){
    console.log('HyunHo');
}
```

이와 같이 변수로 함수를 선언하는 것이 함수 표현식이다.
함수 선언문에서만 Hoisting이 일어난다고 했지만 여기서도 일어나고 있다.
어디에서 일어나고 있는 것일까?

```js
//호이스팅
var name;

name()

name = function(){
    console.log('HyunHo');
}
```

정답은 var다. 위에서 var는 Hoisting이 된다고 했었다.
**출력을 해보면 Error** 이다. name은 Hoisting 되었지만, name에 함수를 할당한 것은 name()으로 호출한 후이기 때문이다.

<br>

> 우선순위

```js
//실제 코드
name()

function name(){
    var me = 'HyunHo';
    console.log(me);
}
```

이쯤되면, 함수와 변수 Hoisting 우선순위가 궁금한 사람이 있을것이다.

```js
//호이스팅
var me;

function name(){
    me = 'HyunHo';
    console.log(me);
}

name()
```

이와같이 **var 다음에 함수선언문**이다.

<br>

> 일시적 사각 지대 - Temporal Dead Zone(TDZ)

* **let, const**

```js
console.log(name1);
console.log(name2);
let name1 = 'HyunHo';
const name2 = 'HyunHo';
```

Hoisting은 var에서만 된다고 했지만, 궁금하니 let, const를 안해볼수가 없다. 실행해보니 역시 바로 **Error**가 나타난다. 사실 변수 선언에는 **선언 단계, 초기화 단계, 할당 단계**가 있다. 

<br>

* **변수 생성**

  **선언 단계** : 변수 객체(Variable Object)에 등록하기 위한 선언만 한다. 이 변수 객체는 스코프가 참조하는 대상이 된다.

  **초기화 단계** : 변수 객체에 등록된 변수를 위한 공간을 메모리에 확보하면서 undefined로 초기화한다.

  **할당 단계** : 초기화된 변수에 실제 값을 할당한다.

<br>

![](/images/ffa3b481-7e57-4484-bf75-adbaaf539b2f-image.png)

var의 경우에는 Hoisting 될 경우 위와 같이 단계가 구성된다.
**var 로 선언된 변수**는 **선언 단계와 초기화 단계를** 한번에 한다.
그래서 Hoisting 시 출력해보면 unfined가 나타나는 것이다.


![](/images/8968e272-1ded-4dc5-ad0d-b3d5665ac3ca-image.png)

하지만 **let, const로 선언한 변수**는 **선언 단계와 초기화 단계를 따로 수행**한다. **사실 let과 const도 Hoisting가 일어나고 있다.** 위의 그림과 같이 선언 let과 const도 선언 단계가 제일 위로 올라가게 된다. 하지만 초기화 되지 않은 상태에서 출력하려고 하면 Temporal Dead Zone(TDZ) 에 걸리게 되는 것이다.

우리는 Temporal Dead Zone에 대해 위에서 알아보았다.
바로 let, const으로 변수를 나중에 선언하고 위에서 먼저 사용할때이다.
변수가 초기화 되기 전에 접근하면 `ReferenceError` 가 나타나며 Temporal Dead Zone에 걸리는 것이다.