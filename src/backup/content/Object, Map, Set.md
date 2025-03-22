---
title: "Object, Map, Set"
description: "object, Map, Set 헷갈리는 개념에 대해 알아보자."
date: 2021-12-03T04:46:50.936Z
tags: ["JavaScript"]
---
> Object(객체)란?

object는 key와 value로 이루어져 있고, key는 unique하고 하나의 value와 연결되어있다.key를 property로 부르기도 한다. 

<br>

```js
// 리터럴(보이는 그대로 라는 의미) 방식
let obj1 = {}

// 생성자 방식
let obj2 = new Object();
let obj3 = new object();
```

객체는 위와 같이 생성할 수 있다. [Object.create](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Object/create)도 있다.

<br>

```js
let o = {
	a:100,
    b:200
}

//TypeError: o is not iterable
for(let i of o){
	console.log(i)
}

// a, b
for(let i in o){
	console.log(i)
}
```

이미 객체를 위와같이 생성해서 잘 쓰고있는데 Map()이 왜 있을까?

객체는 iterable(반복가능한) 객체가 아니다. for...of로 순회하려고 하면 Error가 나타나고 for...in을 사용하면 key만 뽑고 있다. 

그리고 object.length는 1값을 가진다. Object.keys(o).length으로 length를 구할수 있긴 하다.

tip) `Object.prototype.toString.call(데이터).slice(8, -1);`타입 알기 꼼수가 있다!

<br>

![](/images/5862e714-1c99-4a63-8169-5ef379712f9d-image.png)

사실 JavaScript는 모든것이 객체다.
Object.getOwnPropertyDescriptors('hello'); 해보면, 'hello'라는 string도 객체기 때문에 위의 사진처럼 나타난다.

<br>

> Map이란?

Map 객체는 key-value 쌍을 가지는 객체 자료형의 한 종류이다.
object와 마찬가지로 key는 unique하기때문에 중복이 없다.

<br>

```js
let m = new Map();
//Map m에 값 넣기
m.set('이름', '이현호');
m.set('성별', '남자');
console.log(m); // {'이름' => '이현호', '성별' => '남자'}

//Map m에 접근하기
console.log(m.get('이름')); // 이현호

//Map m에 값이 있는지 확인하기
console.log(m.has('이름')); // true

//Map m의 key, value, 엔트리
console.log(m.keys()); // {'이름', '성별'}
console.log(m.values()); //{'이현호', '남자'}
console.log(m.entries()); // {'이름' => '이현호', '성별' => '남자'}

//Map m에 값을 제거하기
console.log(m.delete('이름')); //true
console.log(m.has('이름')); //false
console.log(m); //{'성별' => '남자'}

//Map m의 크기를 확인하기
console.log(m.size); //1
```

위의 코드와 주석을 보면 이해하기 쉽다.

<br>

```js
let temp = new Map([[1, 10],
[2, 20],
[3, 30],
[4, 40]]);

//{1 => 10, 2 => 20, 3 => 30, 4 => 40}
```
배열을 넣어 초기화할 수도 있다.

<br>

```js
const example = new Map();

example.set('name', 'HyunHo');
example.set('age', 26);

const iterable = example.entries(); // {'name' => 'HyunHo', 'age' => 26}

for (let i of iterable) {
  console.log(i);
}
//['name', 'HyunHo']
//['age', 26]
```

Map()은 순회가 가능한(iterable) 객체이다.(등록한 순서대로 출력)

<br>

> Object와 Map 차이

Object와 Map을 알아보며 조금씩 차이가 있다는것을 보았다. 여기서 조금 더 알아보자!

* Object의 key type은 string,symbols,integer 밖에 안된다.


* Map의 key type은 어떤 것이든 되고 서로 구분된다. (array,object...)

* Map은 데이터의 순서를 보존하는 반면 Object는 그렇지 않다.

* Map은 Object의 인스턴스이지만 Object는 그렇지 않다.

```js
let myMap = new Map();
myMap.set(1, 2);
console.log(myMap instanceof Object); //true
console.log(myMap instanceof Map); //true

let obj = new Object();
console.log(obj instanceof Map); //false
```

[출처](https://velog.io/@proshy/JSSet-Map-Object-%EC%A0%95%EB%A6%AC)

<br>

> Set이란?

Set은 모든 타입의 값을 저장하는 객체자료형의 한 종류이고, 객체 안의 값에 중복을 허용하지 않는다. 그리고 Set은 순서가 없어 index로 접근할 수 없다.

```js
let s = new Set('abcdeeeeeeeee');
console.log(s);  // {'a', 'b', 'c', 'd', 'e'}
console.log(s.size);  // 5

// Set에 값을 추가하기
s.add('f');
console.log(s);  //{'a', 'b', 'c', 'd', 'e', 'f'}

// Set을 순환하기
for (var variable of s) {
  console.log(variable);
}
// a b c d e f 가 한 line마다 출력

// 값이 배열인 경우
let ss = new Set('abcdeeeeeeeee'.split(''));
console.log(ss);  // {'a', 'b', 'c', 'd', 'e'}

// Set의 값을 제거하기
ss.delete('b');
console.log(ss);  // {'a', 'c', 'd', 'e'}

// Set의 값을 확인하기
console.log(ss.has('a'));  // true

// Set의 모든 값을 제거하기 
ss.clear
console.log(ss);  // undefined
```

위의 코드와 출력을 보면 set이 어떤식으로 돌아가는지 알 수 있을 것이다.