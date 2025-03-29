---
title: "Promise"
description: "콜백지옥과 Promise를 알아보자"
date: 2021-12-08T03:14:15.433Z
tags: ["JavaScript"]
---
> 콜백 함수

```js
const 버튼 = document.querySelector('.button');
버튼.addEventListener('click', function(){});

// 버튼.addEventListener('click', '다른 곳에서 짠 함수이름'); // ex('click', helloworld100)
// 버튼.addEventListener('click', ()=>{});
```

콜백 함수는 나중에 실행할 함수이다.

`.`으로 들어가서 사용하는 것은 메소드라고 부르고, function은 함수라고 부른다.

```js
function 함수하나(출력){
    console.log('hello');
    출력('world');
}

let hyunho = console.log;
hyunho('hello world');
```

콜백함수이기에 위와같이 사용할 수 있다. (이렇게 사용하지는 말자. 닌자가 되기 싫다면..)

<br>

* ***콜백 지옥**

```js

```

a조건을 만족할 경우 b조건을 하는데, b조건을 만족하는경우 c를하고..

이런 경우에 위와 같이 코드를 설계한다면, 깊이가 계속 깊어진다. 이것을 콜백 지옥이라고 부른다.

> Promise

이러한 콜백 지옥을 탈출할 수 있게 만들어주는 것이 promise이다. promise는 '언제 내가 널(콜백함수) 다시 불러줄지 모르겠지만, 언젠가 널 다시 불러주겠다' 와 같이 약속하겠다는 뜻이다. 그리고 promise는 성공과 실패만 한다.

(2022년에는 대부분) (promise를 여러개 실행할 수 있는) Promise.all보다는 allSettled(실패한 것만 추려내는 기능이 있음)를사용할 것으로 보인다.

```js
// 모던자바스크립트 예제
let promise = new Promise(function(resolve, reject) {
  // 프라미스가 만들어지면 executor 함수는 자동으로 실행됩니다.

  // 2초 뒤에 일이 성공적으로 끝났다는 신호가 전달되면서 result는 'done'이 됩니다.
  setTimeout(() => resolve("끝남!"), 2000);
});
console.log('hello world');
console.log(promise);
```

![](/images/09b1fd02-b06e-496b-81b4-f1fb72ccef66-image.png)

2초뒤에 `resolve("끝남!")`이 실행된다. 그래서 console.log(promise);를 2초가 되기 전에 찍어보면 pending이 출력된다.

* 대기(pending): 이행하거나 거부되지 않은 초기 상태.
* 이행(fulfilled): 연산이 성공적으로 완료됨.
* 거부(rejected): 연산이 실패함.

그리고 위의 예제에서 비동기의 특징도 살펴볼 수 있다. 우리가 생각하기에는 Promise가 생성이 끝나면, hello world가 찍혀야하는데 그 전에 먼저 찍혀버린다.


<br>

```js
new Promise((resolve, reject) => {...code...})
  .then(...code...)
  .then(...code...)
  .finally(...code...)
  .catch(...code...); // <-- .catch에서 에러 객체를 다룰 수 있음
```
이제 Promise는 이런식으로 사용 된다.

<br>

* **then**

```js
// 모던자바스크립트 예제
let p = new Promise(function(resolve, reject) {

  setTimeout(() => resolve(1), 20000); 

});
console.log('hello world');
let p2 = p.then(function(result) {

  console.log(result); // 1
  return result * 2;

});
console.log('hello world2');
let p3 = p2.then(function(result) { 

  console.log(result); // 2
  return result * 2;

});
console.log('hello world3');
let p4 = p3.then(function(result) {

  console.log(result); // 4
  return result * 2;

});
```

'hello world', 'hello world2', 'hello world3'이 먼저 실행된다. 2초 후에는  `resolve(1)`가 실행되므로, then으로가서 1이 찍히고, 계산후에 다시 then으로가서 2가찍힌다. 그리고 계산을하고 다시 then으로가서 4가 찍히고 마지막 계산을하고 끝이난다.

<br>

* **catch**

```js
// 모던자바스크립트 예제 (살짝 수정)
new Promise(function(resolve, reject) {

  setTimeout(() => reject('error'), 1000); // (*)

}).then(function(result) {

  alert(result + ' : 잘 수행!'); // 1
  return result + 'one';

}).catch(function(result) { 

  alert(result + ' : 애러 발생!'); 
  return result + 'two';

}).then(function(result) {

  alert(result + ' : 잘 수행!'); // 4
  return result + 'three';
});
```

catch에 errorone이 들어가야 맞는 동작이라고 생각할 수 있다.  하지만 에러 발생이 나타났다. 

then은 성공적으로 실행되고 잡으므로 resolve 후에 잡는것이다.

reject는 catch가 잡는다.

<br>

> 문제

```js
// 문제 : 1차 접종자의 퍼센트를 가지고 오세요!
fetch('https://raw.githubusercontent.com/paullabkorea/coronaVaccinationStatus/main/data/data.json')
    .then(function(response) {
        return response.json();
    })
    .then(function(json) {
        console.log(json);
        return json
    })
```

크롬 about:blank에서 위 코드를 넣어보자.

![](/images/12c3c3e0-c063-447a-888e-b03121ec05ac-image.png)

데이터들이 나타나는것을 볼 수 있다.
이제 여기서 1차 접종자의 퍼센트를 구해보자.

```js
    .then(function(json) {
        console.log(json.filter(s => s['시·도별(1)'] === '전국'));
        return
    })
```

이 코드를 넣으면 동작한다.

<br>

> 마무리

```js
// 정리 전

loadScript('1.js', function(error, script) {

    if (error) {
      handleError(error);
    } else {
      // ...
      loadScript('2.js', function(error, script) {
        if (error) {
          handleError(error);
        } else {
          // ...
          loadScript('3.js', function(error, script) {
            if (error) {
              handleError(error);
            } else {
              // 모든 스크립트가 로딩된 후, 실행 흐름이 이어집니다. (*)
            }
          });
  
        }
      })
    }
  });

  // 정리 후
loadScript("/article/promise-chaining/one.js")
  .then(script => loadScript("/article/promise-chaining/two.js"))
  .then(script => loadScript("/article/promise-chaining/three.js"))
  .then(script => {
    // 스크립트를 정상적으로 불러왔기 때문에 스크립트 내의 함수를 호출할 수 있습니다.
    one();
    two();
    three();
  });
```

Promise를 사용해서 콜백지옥이 어느 정도 극복된 것으로 보인다.