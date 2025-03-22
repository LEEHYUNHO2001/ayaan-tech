---
title: "OOP"
description: "TDD에서 아래와 같은 방법들을 많이 사용한다."
date: 2021-12-13T01:20:18.823Z
tags: ["JavaScript"]
---
[클로저](https://velog.io/@leehyunho2001/Closure%ED%81%B4%EB%A1%9C%EC%A0%B8)에 대해 먼저 보고오면 아래의 글이 더 이해하기 쉬울 것이다.

[TDD](https://velog.io/@leehyunho2001/TDD)에서 아래와 같은 방법들을 많이 사용한다.

<br>

> 모듈 패턴

```js
function Person() {
  let age = 35;

  return {
    getAge: () => {
      return age;
    },
    setAge: (data) => {
      age = data;
    },
  };
}
```

age는 클로저 공간에 있어 함수 밖에서는 안으로 접글할 수 없지만 안에서는 모두 접근이 가능하다. getAge와 setAge로 age에 접근하고 있다. (클로저)
**값을 은닉하기위해 사용한다.**

<br>

> 사용자 정의 타입 패턴

```js
function PersonType() {
  this.age = 35;
}

PersonType.prototype.getAge = function () {
  return this.age + 1;
};

const instancePerson = new PersonType();
//this.age에 접근이 가능하다. (은닉되지 않음)
console.log(instancePerson.age);
console.log(instancePerson.getAge());

//이렇게 하는것과 사용자 정의 타입 패턴은 어떤 차이가 있을까?
//사용자 정의 타입 패턴은 재사용이 가능하다. (메모리 효율적)
// const instancePerson1 = new PersonType();
// const instancePerson2 = new PersonType();
// const instancePerson3 = new PersonType();
let person2 = { age: 35 };
console.log(person2.age);
```

인스턴스를 만들기 위한 함수이다. 생성자 함수안에있는 함수나 prototype으로 선언된 함수들을 new 키워드를 사용하여 선언한다. 이렇게 하여 **생성자 함수에 쓰인 this는 인스턴스를 가리키게된다.** 값이 은닉되지 않는다.

<br>

> 모듈 + 사용자 정의 패턴

```js
function PersonType2() {
  let age = 25;

  function innerPersonType() {}

  innerPersonType.prototype.getAge = function () {
    return age;
  };

  return innerPersonType;
}

const Person3 = PersonType2();
const person3 = new Person3();
console.log(person3.getAge());
```

`innerPersonType`함수는 `age`에 접근할 수 있는 클로저 함수이다. `innerPersonType` 을 리턴해주어 위와 같이 사용할 수 있게 되었다.
**메모리 효율적으로 사용하면서 값을 은닉할 수 있다.**

<br>

```js
// IIFE 패턴으로 만들어보기
const PersonType3 = (function () {
  let age = 25;

  function innerPersonType() {}

  innerPersonType.prototype.getAge = function () {
    return age;
  };

  return innerPersonType;
})();

const personType3 = new PersonType3();
console.log(personType3.getAge());
```

즉시 실행 함수로 만들수도 있다. 