---
title: "JS 내장함수 정리"
description: "여러가지 내장함수들을 알아보자."
date: 2021-11-30T05:10:39.025Z
tags: ["JavaScript"]
---
># 목차

* for...of와 for...in
* forEach
* filter
* map
* reduce
* concat과 join
* every와 some
* find와 findIndex
* includes, startsWith, endsWith, indexOf, search
* splice
* slice, substr, substring
* replace

<br>

>## for...of와 for...in

```js
let arr = [10, 20, 30, 40, 50];

for(let v of arr){
	console.log(v)
} // 10 20 30 40 50

for(let v in arr){
	console.log(v)
} // 0 1 2  3 4
```
for...of 는 arr 요소의 값을 가져온다.
for...in 은 arr 요소의 인덱스 값을 가져온다.

<br>

>## forEach

```js
const items = ['item1', 'item2', 'item3'];
const copy = [];

// for문
for (let i=0; i<items.length; i++) {
  copy.push(items[i]);
}

//fotEach로도 가능
items.forEach(function(item){
  copy.push(item);
});

//화살표 함수로 표현 가능
items.forEach(item => copy.push(item));
```
주어진 함수를 배열 요소 각각에 대해 실행한다.

items의 요소들을 copy에 push해주는 같은 동작을 한다.

<br>

```js
function Counter() {
  this.sum = 0
  this.count = 0
}
Counter.prototype.add = function(array) {
  array.forEach( v => {
    this.sum += v
    ++this.count
  }, this)
  // ^---- 주의
}

const obj = new Counter()
obj.add([2, 5, 9])
obj.count
// 3
obj.sum
// 16
```
thisArg를 사용하는 예제이다. add() 메소드는 새로운 요소에 추가 [Set](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Set) 오브젝트이다.

Counter의 add에는 인자를 받는 함수가 들어간다. [2, 5, 9].forEach를 하게 될 것이다. `{}` 뒤에 `, this` 을 넣어주어 this에 접근할 수 있게 되었다. (callback은 전달받은 this의 값을 자신의 this 값으로 사용할 수 있다.)

그 결과 obj.count와 obj.sum이 우리가 원하던 값을 가질 수 있는 것이다.

<br>

```js
let words = ['one', 'two', 'three', 'four']
words.forEach(function(word) {
  console.log(word)
  if (word === 'two') {
    words.shift()
  }
})
// one
// two
// four
```
if문과 shift를 이용해서 특정 부분을 생략할수도 있다.

그 외에 fotEach로도 평탄화를 할 수 있지만 [flat()을 사용](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)하는것이 좋아 보인다.(직관성)

<br>

>## filter

```js
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words.filter(word => word.length > 6);

console.log(result);
// Array ["exuberant", "destruction", "present"]
```

주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환한다. (어떤 요소도 통과하지 못하면 빈 배열 반환)

<br>

>## map

```js
const array1 = [1, 4, 9, 16];

// pass a function to map
const map1 = array1.map(x => x * 2);

console.log(map1);
// expected output: Array [2, 8, 18, 32]
```

배열 내의 모든 요소 각각에 대하여 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환한다.

map을 실행하는 배열과 결과로 나오는 배열이 다른 객체이기 때문에 기존 배열을 수정하지 않고 새로운 배열을 만들어 낸다.

<br>

>## reduce

```js
배열.reduce((누적값, 현잿값, 인덱스, 요소) => { return 결과 }, 초깃값);
```

배열의 각 요소에 대해 주어진 리듀서(reducer) 함수를 실행하고, 하나의 결과값을 반환한다. reduce는 [제로초](https://www.zerocho.com/category/JavaScript/post/5acafb05f24445001b8d796d)님의 글로 설명하겠다.

```js
const oneTwoThree = [1, 2, 3];
result = oneTwoThree.reduce((acc, cur, i) => {
  console.log(acc, cur, i);
  return acc + cur;
}, 0);
// acc cur i
// 0   1   0
// 1   2   1
// 3   3   2

```
초기값 0부터 시작하고 있다. acc는 누적값이기 때문에 result는 6이 된다. 초기값을 적지 않으면 0부터 시작해서 `acc cur i가 1 2 1` 부터 시작한다. 결과값은 동일하게 6이다.

<br>

```js
result = oneTwoThree.reduceRight((acc, cur, i) => {
  console.log(acc, cur, i);
  return acc + cur;
}, 0);
// 0 3 2
// 3 2 1
// 5 1 0
result; // 6
```

reduceRight는 oneTwoThree배열 요소의 오른쪽부서 순회한다.

<br>

```js
//reduce로 map 구현
result = oneTwoThree.reduce((acc, cur) => {
  acc.push(cur % 2 ? '홀수' : '짝수');
  return acc;
}, []);
result; // ['홀수', '짝수', '홀수']

//reduce로 filter 구현
result = oneTwoThree.reduce((acc, cur) => {
  if (cur % 2) acc.push(cur);
  return acc;
}, []);
result; // [1, 3]
```

reduce함수는 매우 강력하다. reduce로 map, filter, sort, every, some, find, findIndex, includes 등을 구현할 수 있다.

<br>

```js
const promiseFactory = (time) => {
  return new Promise((resolve, reject) => {
    console.log(time); 
    setTimeout(resolve, time);
  });
};
[1000, 2000, 3000, 4000].reduce((acc, cur) => {
  return acc.then(() => promiseFactory(cur));
}, Promise.resolve());
// 바로 1000
// 1초 후 2000
// 2초 후 3000
// 3초 후 4000
```

또한, reduce는 비동기 프로그래밍에도 유용하다.
초깃값을 [Promise.resolve()](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve)로 한 후에, return된 프로미스에 then을 붙여 다음 누적값으로 넘기면 된다. 프로미스가 순차적으로 실행됨을 보장할 수 있다.

이 개념은 모른다면 그런다보다 하고 나중에 찾아보자.

<br>

>## concat과 join

* **concat**

```js
const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2);

console.log(array3);
// Array ["a", "b", "c", "d", "e", "f"]
```

인자로 주어진 배열이나 값들을 기존 배열에 합쳐서 새 배열을 반환한다. 

<br>

* **join**

```js
const elements = ['Fire', 'Air', 'Water'];

console.log(elements.join());
// "Fire,Air,Water"

console.log(elements.join(''));
// "FireAirWater"

console.log(elements.join('-'));
// "Fire-Air-Water"
```

배열의 모든 요소를 연결해 하나의 문자열로 만든다.

<br>

>## every와 some

* **every**

```js
function isBigEnough(element, index, array) {
  return element >= 10;
}
[12, 5, 8, 130, 44].every(isBigEnough);   // false
[12, 54, 18, 130, 44].every(isBigEnough); // true
```
배열 안의 모든 요소가 주어진 판별 함수를 통과하는지 테스트한다.

모든 요소가 10보다 더 큰지 테스트하고있다.

<br>

```js
[12, 5, 8, 130, 44].every(elem => elem >= 10); // false
[12, 54, 18, 130, 44].every(elem => elem >= 10); // true
```
화살표 함수를 이용할수도 있다.

<br>

* **some**

```js
function isBiggerThan10(element, index, array) {
  return element > 10;
}
[2, 5, 8, 1, 4].some(isBiggerThan10);  // false
[12, 5, 8, 1, 4].some(isBiggerThan10); // true
```
배열 안의 요소가 하나라도 주어진 판별 함수를 통과하는지 테스트한다.

<br>

```js
var fruits = ['apple', 'banana', 'mango', 'guava'];

function checkAvailability(arr, val) {
    return arr.some(arrVal => val === arrVal);
}

checkAvailability(fruits, 'kela'); //false
checkAvailability(fruits, 'banana'); //true
```
화살표 함수도 가능하다. fruits에서 특정 요소가 있는지 some으로 확인하고 있다.

<br>

> ## find와 findIndex

* **find**

```js
const array1 = [5, 12, 8, 130, 44];

const found = array1.find(element => element > 10);

console.log(found);
// expected output: 12
```

주어진 판별 함수를 만족하는 첫 번째 요소의 값을 반환한다. 

<br>



<br>

* **findIndex**

```js
const array1 = [5, 12, 8, 130, 44];

const isLargeNumber = (element) => element > 13;

console.log(array1.findIndex(isLargeNumber));
// expected output: 3
```

주어진 판별 함수를 만족하는 배열의 첫 번째 요소에 대한 인덱스를 반환한다.

<br>

>## 문자열 내장 함수

* includes : 특정 요소를 포함하고 있는지 판별한다.

* startsWith : 문자열이 특정 문자열로 시작하는지 확인하는 메서드이다.

* endsWith : 특정 문자열로 끝나는지를 확인한다.

* indexOf : 배열에서 지정된 요소를 찾을 수 있는 첫 번째 인덱스를 반환하고 존재하지 않으면 -1을 반환한다. 시작값을 설정할수도 있다.

* [search](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/String/search) : 검색된 문자열의 위치값을 반환한다. 주로 정규표현식과 함께 사용한다.

<br>

>## slice, splice, substr, substring

* **slice**

```js
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console.log(animals.slice(2));
// Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// Array ["camel", "duck"]

console.log(animals.slice(2, -1));
// Array ["camel", "duck"]
```

어떤 배열의 begin부터 end까지(end 미포함)에 대한 얕은 복사본을 새로운 배열 객체로 반환한다. 즉, 원본 배열은 수정되지 않는다.

<br>

* **splice**

```js
const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb');
console.log(months);
// Array ["Jan", "Feb", "March", "April", "June"]

months.splice(4, 1, 'May');
console.log(months);
// Array ["Jan", "Feb", "March", "April", "May"]
```

splice() 메소드는 배열의 기존 요소를 삭제 또는 교체하거나 새 요소를 추가하여 배열의 내용을 변경한다. 이 메소드는 원본 배열 자체를 수정한다.

`months.splice(1, 0, 'Feb')`는 months 배열에서 1번째 index의 위치에 Feb를 넣겠다는 의미이다. 0은 삭제할 요소는 없다는 의미이다. 이제 months 배열은 ["Jan", "Feb", "March", "April", "June"]가 되었다.

`months.splice(4, 1, 'May')`은 4번째 index의 위치(June)에서 May를 추가하는데 삭제할 요소가 1개 있다는 의미이다. 그래서 June는 사라지고 May가 추가되는 것이다.

<br>

* **substr**

```js
const str = 'Mozilla';

console.log(str.substr(1, 2));
// "oz"

console.log(str.substr(2));
// "zilla"
```

문자열에서 특정 위치에서 시작하여 특정 문자 수 만큼의 문자들을 반환한다.
`str.substr(시작 인덱스, 추출 갯수)` 이다. 
첫 번째 인자에 1이상의 값을 주고, 두 번째 인자를 음수값을 주면 0으로 인식하여 값이 나타나지 않는다.

<br>

* **substring**

```js
const str = 'Mozilla';

console.log(str.substring(1, 3));
// "oz"

console.log(str.substring(2));
// "zilla"
```
 string 객체의 시작 인덱스로 부터 종료 인덱스 전 까지 문자열의 부분 문자열을 반환한다.
`str.substring(시작 인덱스번호, 끝 인덱스번호)`이다.
첫 번째 인자에 1이상의 값을 주고, 두 번째 인자를 음수값을 주면 0으로 인식하여 값이 나타나지 않는다.

<br>

> ## replace

```js
const p = 'The quick brown fox jumps over the lazy dog. If the dog reacted, was it really lazy?';

console.log(p.replace('dog', 'monkey'));
// "The quick brown fox jumps over the lazy monkey. If the dog reacted, was it really lazy?"

const regex = /Dog/gi;
console.log(p.replace(regex, 'monkey'));
// "The quick brown fox jumps over the lazy monkey. If the monkey reacted, was it really lazy?"

```

어떤 패턴에 일치하는 일부 또는 모든 부분이 교체된 새로운 문자열을 반환한다. 패턴에는 정규식이 사용될 수 있다.

replace를 사용하여 첫 번째 dog를 찾아 monkey로 바꾸고 있다. 

정규표현식을 사용한 부분에는 `gi` 를 주어 모든 dog 에 대해서 monkey로 바꾸고 있다.

<br>

> 마무리

모든 내장 함수를 완벽하게 알고있을 필요는없다. 어떠한 함수가 존재하는지 알아놓고 필요할때 검색해서 사용하면 된다. 위의 정리도 완벽한 정리가 절대 아니다. 더 자세하게 파고들면 더욱 효과적으로 사용할 수 있다. **그때 그때 찾아서 사용하자.**

MDN을 읽다가 **polyfill** 이라는 단어가 많이 나와 찾아보았다. polyfill은 브라우저에서 지원하지 않는 코드를 사용가능한 코드 조각이나 플러그인(추가기능)을 의미한다. babel만으로는 **Map, Promise, Set** 등을 번역해 줄 수 없어 사용한다고 한다.