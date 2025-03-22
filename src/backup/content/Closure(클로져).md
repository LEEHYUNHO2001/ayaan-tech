---
title: "Closure(클로져)"
description: "Closure 를 예제를 통해 알아보자."
date: 2021-12-06T07:02:44.802Z
tags: ["CS","JavaScript"]
---
>## Closure란?

Closure는 사전적 의미로 폐쇠, 포섭을 뜻한다. 

**폐쇠된 공간의 데이터에 접근하기 위함 또는 변수를 가두기 위해 사용한다.**

바로 예제로 알아보자.

<br>

```js
function myFunction(){
    //클로저 공간
    var hi = 'hello';
}
```

Closure는 함수안에 존재한다. hi는 return하지 않으면 밖에서 사용할 방법이 없다.

<br>


```js
function myFunction(){
    //클로저 공간
    var hi = 'hello';
    return { getHi : function(){return hi} }
}

let result = myFunction();
console.log(result);
console.log(result.getHi()); //hello
```

getHi라는 key가 있고, function value가 있는 객체로 리턴하고 있다.

즉, **Closure**는 폐쇠된 공간의 데이터에 접근하기 위한 테크닉이다.

원래 hi는 외부에서 접근하지 못한다. 하지만 Closure를 이용하여 getHi로 hi에 접근할 수 있게 되었다.

폐쇠된 공간에 접근할 권한을 가진 함수는 **Closure 함수**이다. 위에서 `function(){return hi}` 같은 친구들이다.

<br>

```js
const x = 100;

function a() {
  const x = 1;
  b();
}

function b() {
  console.log(x);
}

a(); // 100
b(); // 100
```

함수 내부에서 선언되어야 한다. 호출된 위치는 상관없다.

<br>

```js
const xx = 100;

function a() {
  const xx = 1;
  function b() {
      console.log(xx);
  }
  b();
}
a(); // 1
```

이 경우에 b()는 **Closure 함수가 아니다.** b()는 xx변수에 접근할 수 있지만, 아무런 값도 반환하지 않고 있다. a()안에서 정의되고 실행되었지만, 외부에서 접근을 하지 못하기 때문이다.

<br>

```js
const xx = 100;

function a() {
  const xx = 1;
  return function () {
      return xx;
  }
}

var aa = a();
console.log(aa()); // 1
```

이 경우에는 a()에서 return값으로 함수를 빼주고 있다. 그리고 그 함수에서도 값을 return으로 반환해주고 있다. 외부에서 이 값에 접근이 가능하기때문에 Closure함수이다.

<br>


> 다른 예시

```js
function 제곱(x){
    function 승수(y){
        return y ** x
    }
    return 승수
}

var two = 제곱(2);
console.log(two(10)); //100

var three = 제곱(3);
console.log(three(10)); //1000
```

Closure는 **변수를 보호하기 위해**(변수명 섞이지 않도록)서 사용하기도 한다. (안에 변수를 은닉하면서 함수를 재사용하기 위해서도 사용한다.)

<br>


```js
function 제곱(x){
    return function(y){
        return y ** x
    }
}

var two = 제곱(2);
console.log(two(10)); //100

var three = 제곱(3);
console.log(three(10)); //1000
```

방금 알아본 코드와 동일하다.

<br>