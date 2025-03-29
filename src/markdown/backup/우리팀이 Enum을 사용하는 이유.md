---
title: "우리팀이 Enum을 사용하는 이유"
description: "enum의 특징에 대해서도 간단하게 알아보자."
date: 2024-10-22T14:48:08.107Z
tags: ["JavaScript","typescript"]
---
### 타입스크립트의 Enum

타입스크립트(TypeScript)는 프론트엔드 생태계에서 빠질 수 없는 언어가 되었다. 가끔 처음부터 타입스크립트로 프론트엔드를 접해본 개발자들이 타입스크립트의 특정 문법들을 자바스크립트의 문법으로 착각하는 경우가 있을 정도이다. 그 중 하나인  **`enum`은 관련된 값들의 집합을 정의하는 타입스크립트 고유 문법**이다.

undefined

타입스크립트를 사용하는 개발자들이 `enum`을 사용하고 있지만, '**이 문법이 좋은 문법인가?**'는 또 다른 이야기이다. 아마 `enum`에 대해 조금만 검색해봐도 부정적인 면모가 있다는 것을 알 수 있다.

<br>

#### 1. 트리쉐이킹

```tsx
// enum
enum Colors {
  Red = 'RED',
  Blue = 'BLUE',
  Green = 'GREEN'
}

// 컴파일 후
var Colors;
(function (Colors) {
  Colors["Red"] = "RED";
  Colors["Blue"] = "BLUE";
  Colors["Green"] = "GREEN";
})(Colors || (Colors = {}));

```

트리 쉐이킹은 사용되지 않는 코드를 제거하는 최적화 과정이다. `enum`은 런타임에서 객체로 변환되기 때문에, 사용하지 않는 값도 빌드 결과물에 포함된다. 이는 성능 저하를 야기시키게 된다. 이 부분은 `Enum의 매핑` 파트에서 자세히 알아보자.

> `const enum`은 객체를 생성하지 않고, 컴파일러가 해당 값을 인라인으로 삽입하여 필요한 값만 코드에 포함된다. 즉, 트리 쉐이킹이 된다.

#### 2. 확장 불가능

```typescript
interface Test1 {
  name: string;
}
```

인터페이스 Test1에 몇 가지 사항을을 추가하여, 새로운 인터페이스를 선언하려면 어떻게 해야할까?

```typescript
interface Test2 extends Test1 {
  description: string;
}
```

`extends` 를 이용하여, Test1에 `description`을 추가하여 Test2 인터페이스를 정의했다. 이와 같이, 특정 모델을 이용하여 다른 모델을 선언하는 것은 확장의 한 형태이다.

```typescript
enum Test1 {
  test1 = "test1",
  test2 = "test2",
}
```

이번에는 Test1이라는 이름을 가진 `enum`이 있다. 확장으로 test3이 추가된 `enum`을 선언하기 위해서는 어떻게 해야할까?

```typescript
enum Test2 {
  test1 = "test1",
  test2 = "test2",
  test3 = "test3",
}
```

`enum`은 확장할 수 없기 때문에 방법이 없다. Test1에 있는 값들이 포함된 채로 Test2를 선언하고 싶다면, 그냥 다시 선언하는 방법밖에 존재하지 않는다.

> `const enum`도 확장은 불가능하다.

<br>

### 그럼에도 우리가 Enum을 사용하는 이유

보통은 `enum`의 단점으로 인해, `as const`를 사용하는 것을 추천한다. 하지만 우리 팀에서는 `enum`을 사용하고 있다. 이유가 무엇일까? 우리가 개발할 때의 플로우를 상상해보자. 먼저 프론트엔드와 백엔드 개발자는 어떤 모델을 주고 받을지 협의를 하게 된다. 이렇게 협의된 모델은 문서로 정리하여 공유하는 것이 일반적이다.

![](/images/3813a7cf-c614-43ac-a6b0-0d5df3297cda-image.png)

백엔드팀에서는 설계한 API 기반으로, 문서화를 간편하게 작성할 수 있도록 도와주는 스웨거를 채택했다. 간단한 서비스의 경우에는 노션과 같은 문서로 정리할 수도 있겠지만, 사실 이건 지속적으로 관리하기가 쉽지 않다. 백엔드에서 변경사항을 꾸준히 업데이트하는 것도 비효율적이지만, 프론트엔드에서 해당 사항들을 확인하며 추적하는것도 쉽지 않은 작업이기 때문이다.

undefined

지금부터는 프론트엔드의 입장만 생각하보자. 스웨거를 통해 API와 모델들을 공유받고 있다. API를 연동하기 위해 `response` 및 `request` 모델들을 정의 해야하는 단계이다.

이 모델들을 개발자가 직접 하나 하나 정의하는 것은 엄청난 노동이다. 개발해야하는 피쳐의 규모가 클 수록 정의해야 하는 모델은 많아지고, 서비스의 규모가 클 수록 모델이 변경되는 경우 추적이 쉽지 않다. 커다란 리스크를 품고 가야하는 것이다.

또한, 개발자는 기계가 아닌 사람이다. `member`를 `members`와 같이 작성한다거나의 휴먼 에러도 분명 있을 것이다. 한 마디로, 이 방법은 **시간도 아깝고, 버그도 발생**한다는 것이다.

undefined

그래서 우리는 스웨거에 정의된 모델을 기반으로 타입스크립트 모델을 추출 할 수 있는 [swagger-typescript-api](https://github.com/acacode/swagger-typescript-api)를 사용하고 있다. 서비스를 구성하는 모든 API의 `request` 및 `response` 모델을 변환할 수 있고, 백엔드에서 정의한 `enum` 마저도 타입스크립트로 추출할 수 있다.

물론 해당 라이브러리를 통해 스웨거 모델을 타입스크립트 모델을 변환할 때, 커스텀한 함수를 설계하여 다른 형태로 바꿀 수도 있다. 그럼에도 enum을 그대로 사용하는 이유는 `enum`이 일으키는 성능 저하는 미미하다고 판단했고, **백엔드에서 선언한 `enum`을 프론트에서 확장할 일은 없어야 한다**고 생각했기 때문이다.

즉, **우리는 백엔드에서 정의한 `enum`을 타입스크립트로 변환하여 사용하고 있고, 대신에 프론트에서 `enum`을 따로 선언하는 것은 지양**하고 있다.

<br>

### Enum의 단방향 / 양방향 매핑

글을 마무리하기 전에, `enum`의 특이 사항 하나만 더 소개하겠다.

#### 단방향 매핑

```tsx
enum ResponseStatus {
  NotFound = 'not_found',
  ServerError = 'server_error',
  Success = 'success'
}

console.log(ResponseStatus);
```

위의 코드는 타입스크립트 컴파일러(TSC)를 통해 자바스크립트 코드로 변환된다. `enum`의 경우에는 자바스크립트의 객체처럼 동작하도록 변환하여, 런타임 시점에서 사용할 수 있게 해준다. 그렇다면 어떤 방식을 사용하여 객체로 둔갑시키는 것일까?

```tsx
"use strict";
var ResponseStatus;
(function (ResponseStatus) {
    ResponseStatus["NotFound"] = "not_found";
    ResponseStatus["ServerError"] = "server_error";
    ResponseStatus["Success"] = "success";
})(ResponseStatus || (ResponseStatus = {}));
```
`ResponseStatus`가 컴파일된 상태이다. 익명 함수이자 즉시 실행 함수 `IIFE`(Immediately Invoked Function Expression)에서는 매개변수로 받은 객체에  값(value)을 키(key)와 연결하고 있다. 이와 같은 방식으로 `enum`을 객체로 반환하는 것이다.

`ResponseStatus["NotFound"] = "not_found";`와 같은 형태는 컴파일 과정에서 **단방향 매핑**을 한 결과이다. `enum 멤버`의 값이 모두 문자열(`string`)이었기 때문에, `enum 멤버`는 모두 단방향 매핑을 하게 된다.

```tsx
console.log(ResponseStatus.NotFound); // 'NotFound'
console.log(ResponseStatus['not_found']); // undefined
```

단방향 매핑에 대해 더 쉽게 이해하는 방법은 로그를 출력해보는 것이다. 자바스크립트는 객체에서 키로 값을 참조하는 것이 가능하다. 하지만 객체에서 값에서의 키를 참조하는 역참조가 불가능하다. `not_found`로는 `ResponseStatus` 키를 역으로 찾을 수 없어 `undefined`가 출력되는것을 단방향 매핑이라고 한다.

```tsx
// console.log(ResponseStatus) 결과
{
  NotFound: "NotFound",
  ServerError: "ServerError",
  Success: "Success"
} 
```

이제 `enum`이었던 `ResponseStatus`는 런타임에서 객체로 둔갑하여, 로그를 출력해볼 수 있게 되었다.


#### 양방향 매핑

```tsx
enum ResponseCode {
  NotFound = 404,
  ServerError = 500,
  Success = 200
}
```

이번에는 `ResponseCode`를 선언했다. 이전과 다른점은 값에 `number` 타입을 바인딩했다는 사실이다. 이번에는 로그를 출력했을 때, 어떤 값이 나올지 예상해보자.

```tsx
// console.log(ResponseCode) 결과
{
  200: "Success",
  404: "NotFound",
  500: "ServerError",
  NotFound: 404,
  ServerError: 500,
  Success: 200,
}
```

키와 `number`타입의 값이 매칭된 객체를 예상했다. 하지만, **`enum 멤버`의 값이 키가 되고, 키는 값이 되는 형태도** 추가적으로 들어간다. 이는 매핑 방식과 관련있다.


```tsx
"use strict";
var ResponseCode;
(function (ResponseCode) {
    ResponseCode[ResponseCode["NotFound"] = 404] = "NotFound";
    ResponseCode[ResponseCode["ServerError"] = 500] = "ServerError";
    ResponseCode[ResponseCode["Success"] = 200] = "Success";
})(ResponseCode || (ResponseCode = {}));
```

TSC는 `enum 멤버`의 값이 `string`인 경우와는 다르게, `number`인 경우 양방향 매핑을 한다. 

```tsx
console.log(ResponseCode[404]);  // 'NotFound'
console.log(ResponseCode["NotFound"]);  // 404
```

`enum 멤버`가 `number`인 경우에는 참조와 역참조가 가능하다는 것을 알 수 있다.

#### 뇌피셜

```tsx
enum Test {
  Test1, // 0
  Test2, // 1
  Test3 // 2
}

console.log(Test[0]);  // 'Test1'
console.log(Test["Test1"]);  // 0
```

`enum 멤버`는 키만 선언할 수도 있는데, 이 경우에 `index`를 기반으로 값을 부여하고, 양방향 매핑을 한다. 그래서 값이 `number`인 경우 양방향 매핑을 하는 이유는, 성능이나 기술적 요구사항이라기보다 `enum` 값을 직관적으로 사용하라는 타입스크립트의 설계 방식 때문인 것 같다. 

<br>

## 마무리

undefined

최근에 업무 후 지친 몸을 달래기 위해, 개발과 무관한 취미 생활도 많이 하고, 개발적인 아티클이나 서적들도 읽으면서 시간을 보냈다. 그러다 문득 '이제 다시 기술 블로그를 시작해볼까?' 라는 생각이 들었고, 마침 가벼운 주제가 있어 소개하게 되었다. 앞으로도 재밌는 주제나 개발했던 경험들을 글을 이어나갈 예정이다.