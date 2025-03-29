---
title: "JavaScript sort와 Object 함수"
description: "(parameter와 Argument도 알아보자..)"
date: 2021-12-01T06:21:56.262Z
tags: ["JavaScript"]
---
> sort와 reverse

sort() 는 정렬해주는 함수이다. 하지만 각 요소의 문자열 변환에 따라 각 문자의 유니 코드 코드 포인트 값에 따라 정렬을 해버린다.

```js
[111, 30, 20, 14, 4, 55].sort()
// [111, 14, 20, 30, 4, 55]
```

정렬함수를 사용해도 원하는 결과와는 멀어보인다.

```js
[111, 30, 20, 14, 4, 55].sort((a, b) => a - b) 
// 오름차순 [4, 14, 20, 30, 55, 111]

[111, 30, 20, 14, 4, 55].sort((a, b) => b - a) 
// 내림차순 [111, 55, 30, 20, 14, 4]
```
그러므로 위와같이 사용하자.

<br>

```js
[111, 30, 20, 14, 4, 55].reverse()
// [55, 4, 14, 20, 30, 111]

[111, 30, 20, 14, 4, 55].sort((a, b) => b - a) .reverse() 
//[4, 14, 20, 30, 55, 111]
```
reverse를 사용하고 싶다면 sort를 오름차순이나 내림차순으로 먼저 정렬해주고 사용하자.

<br>

> key 와 value

```js
let person = {
  //key: value
  name: '이현호',
  age: 10,
  height : 30,
  weight : 40,
  이력 : {'첫번째직장' : '하나', '두번째직장' : '둘'}
}

let k = Object.keys(person);
console.log(k) // ['name', 'age', 'height', 'weight', '이력']

let v = Object.values(person);
console.log(v) // ['이현호', 10, 30, 40, {…}]

let e = Object.entries(person);
console.log(e) // [Array(2), Array(2), Array(2), Array(2), Array(2)]
```

* Object.keys()
* Object.values()
* Object.entries()

위의 동작을 보면 이 함수들이 무슨 역할을 하는지 감이 온다.

<br>

```js
for (let i of e) {
    console.log(i[0], i[1]);
}

for (let i of e) {
    console.log(i[0], i[1]);
}
```

e는 위에서 `let e = Object.entries(person);` 으로 선언해 주었다. 출력은 아래와 같다.

**출력**
`name 이현호`
`age 10`
`height 30`
`weight 40`
`이력 {첫번째직장: '하나', 두번째직장: '둘'}`

<br>

```js
for (let [i, j] of [[1, 2], [3, 4]]) {
    console.log(i, j);
}
//1 2
//3 4
```

이와같이 사용할 수도 있다.

<br>

> 마무리

parameter와 argument를 혼동해서 사용하는 경우가 많았다. 그래서 간단하게 개념을 잡고 가려고한다.

```js
function add(a, b){
	return a + b;
}

add(10, 20)
```
parameter는 a, b 으로 변수다.
argument는 10, 20 으로 값이다.