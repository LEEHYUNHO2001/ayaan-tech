---
title: "객체지향 프로그래밍(OOP)과 TypeScript"
description: "프론트엔드 개발자가 Class기반 객체지향 프로그래밍에 쉽게 다가갈 수 있도록 TypeScript를 이용하여 설명하는 글이다."
date: 2022-05-17T07:21:25.343Z
tags: ["JavaScript","typescript"]
---
# 프론트에서 객체지향 프로그래밍

오늘은 OOP(객체지향 프로그래밍)의 개념에 대해서 살펴보고, TypeScript환경에서 Class 기반으로 OOP를 활용하는 방법을 알아볼 예정이다. 이 글의 목표는 FrontEnd 개발자가 TypeScript 환경에서 OOP하는 것을 넘어서, 추후에 다른 언어를 사용하게 되었을 경우에 객체지향 프로그래밍이 낯설지 않게 만드는것이다. 물론 TypeScript에서만 사용하는 문법들도 있겠지만, 이 글을 이해한다면 다른 언어의 객체지향 프로그래밍 환경도 빠르게 익숙해질 수 있을 것이다.

<br>

## 절차지향과 객체지향

### 절차지향 프로그래밍

프로그램 전체가 유기적으로 연결되도록 만드는 프로그래밍 기법이다. 공장에서 노트북을 절차지향으로 생산한다고 가정해보자. 모니터, 키보드, 본체가 순서대로 만들어져야 한다. 서로 연결되어 있기 때문에 키보드가 고장나더라도 노트북 전체를 살펴봐야 하며, 생산할 때 순서도 꼭 지켜야해서 번거롭다. 물론 일이 능숙해지면 빠르게 만들긴 할것이다.

undefined


하지만 이 외에도 신규 입사자가 절차지향 프로그래밍으로 설계된 프로젝트 코드를 보았을때, 서로 연결된 함수들을 보며 이해하는데 시간이 걸리고, 유지보수의 문제점 등 단점들이 나타났다.

기술이 발전하여 컴퓨너의 성능이 좋아지면서 만드는 속도가 조금 빠른것 보다 유지보수하기 쉬운 코드가 더 중요해졌다. 이렇게 객체지향 프로그래밍에 대한 개념이 나타났다.

<br>

### 객체지향 프로그래밍

객체지향 프로그래밍이란 무엇일까? 간단하게 말하자면 프로그램을 객체 단위로 나누고 이들의 상호작용으로 구현하는 방식이다. 정말 많이 들어보았고, 많은 글들이 존재한다. 특히 JAVA를 사용하는 개발자에게 많이 익숙하다. (이 글에서 알아볼 것은 Class기반 OOP 이다.)

이 말이 JavaScript를 사용하는 FrontEnd 개발자가 Class기반 OOP에 대해서 몰라도 된다는 뜻은 아니다. 꾸준하게 인기가 있을 정도로 좋은 프로그래밍 방법이고, 여러 사람들과 협업을 하며 사용하게 될지도 모르기 때문이다. 그리고 알고 안쓰는 것과 모르고 못쓰는것은 차이가 있으므로 꼭 알고있자.

undefined


그렇다면 대부분의 언어는 하고 있는 것을 FrontEnd 개발자는 왜 Class기반 OOP를 해오지 않았던 걸까? 그 이유는 과거 JavaScript에는 Class라는게 없었기 때문이다. Class로 객체지향 프로그래밍을 안한것이 아니라 못한 것이다 :( 

자바스크립트가 객체지향 프로그래밍 언어인지도 의심이 간다.

undefined

놀라운 점은 자바스크립트도 프로토타입을 기반으로 하는 객체지향 프로그래밍 언어이다. 프로토타입이 무엇인지 궁금하다면 [모던 자바스크립트 튜토리얼](https://ko.javascript.info/)에서 찾아보는것을 추천한다.

시간이 지나 ES6부터 Class 문법이 추가되었지만 이것도 프로토타입 기반 함수일 뿐 자바스크립트가 Class 기반 객체지향 프로그래밍 언어가 된 것은 아니다. 

그래도 Class를 문법의 추가는 매우 좋은 변화를 이끌어냈다고 생각한다. 다른 언어를 사용하던 개발자들이 더 친숙하게 JavaScript 코드를 짤 수 있게 되었고, **TypeScript가 등장하면서 함께 사용할 경우 훨씬 표현력있게 Class를 이용한 OOP를 사용할 수 있게 되었기 때문**이다.;

이제는 객체지향 프로그래밍이 어떤 특성을 가지고 있는지 알아보자.

<br>

#### 객체지향 프로그래밍의 특성

- 캡슐화(Encapsulation)

비슷한 역할을 하는 속성(필드)과 행위(메소드)들을 하나로 묶고 접근 지정자(public, private, protected)를 통해 제어하는 것을 캡슐화라고 부른다. 외부에서 보여질 필요가 없는 데이터를 숨기면서(정보은닉) 외부에는 기능만을 제공하기 위해서도 사용한다.

<br>

- 추상화(Abstraction)

모델화 하는 것으로 데이터의 공통된 성질을 추출하여 슈퍼 클래스를 선정하는 개념이다. 바닥, 창문, 화장실을 청소하는 로봇 청소기가 있다고 가정해보자. 모든 청소 로봇에는 물뿌리기 기능이 있어야한다. 물 뿌리기 기능을 모든 청소 로봇에 다 구현하기 보다는 한 군데에서 구현을 하고, 여러가지 청소 로봇에 이 함수나 클래스를 가져다 사용하는것이 좋을 것 같다. 이것이 추상화이다.

또한, 물 뿌리기 기능을 가져다가 사용하기만 하면 되므로 내부에서 얼마나 복잡한 기능이 구현되어있는지 상관하지 않고 지정된 인터페이스를 통해 사용할 수 있다.

<br>

- 상속(Inheritance)

로봇 공장에 청소하는 로봇을 만들었다고 가정하자. 이 공장에서 청소도하고 빨래까지 하는 로봇을 신상품으로 만들어야한다. 다시 청소하는 로봇부터만들고 빨래기능을 추가하는것보다 청소하는 로봇에 빨래기능을 추가하는것이 훨씬 효율적이다.

이렇게 특정 클래스의 기능을 물려받고, 새로 넣고싶은 기능이 있다면 넣을수 있게 하는것이 상속이다. 물려주는 클래스는 상위 클래스(parent, super, base)라고 부르며, 물려받는 쪽은 하위 클래스(child, sub, derived)이다. 코드를 재활용 할 수 있고 생산성이 높아지며 유지보수하기에 좋다.

<br>

- 다형성(Polymorphism)

상속을 통해 만들어진 클래스들을 `청소()`라는 호출 하나로 어떠한 로봇도 청소하게 만들 수 있다. 다형성은 같은 모양의 함수가 상황에 따라 다르게 동작하는 것을 의미하며 오버로딩과 오버라이딩을 사용할 수 있다.

오버로딩은 `청소(2)`와 같이 함수명은 같지만 파라미터 갯수나 타입 등을 달리하여 다르게 동작하게 만드는것을 의미한다. **하지만 타입스크립트에서는 파라미터 갯수가 같아야 한다.** ~~ 매개변수의 갯수가 같아야 한다는 사실을 뒤늦게 알아서 삽질을 좀 했다. :(~ 이 예시에서는 화장실 청소에 위처럼 오버로딩을 했다면, 뭐 청소를 2번하던가 할 것이다.

오버라이딩은 상위 클래스의 메소드를 하위 클래스에서 똑같은 이름으로 재정의한다. 이름만 같고 함수의 동작은 아예 다를 수 있는 덮어씌우기 같은 것이다. 예를들어, `청소()`에 어떤 로봇은 집안 청소를 넣고 어떤 로봇은 화장실 청소를 넣을 수 있게 된다.

이 외에도 [객체지향 프로그래밍에는 5가지 원칙](https://mangkyu.tistory.com/194#:~:text=SOLID%EB%9E%80%20%EA%B0%9D%EC%B2%B4%20%EC%A7%80%ED%96%A5%20%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D,%EA%B8%80%EC%9E%90%EB%A5%BC%20%EB%94%B0%EC%84%9C%20%EB%A7%8C%EB%93%A4%EC%96%B4%EC%A1%8C%EB%8B%A4.)이 있다.

<br>

## TypeScript

이제 어느정도 객체지향 프로그래밍이 무엇을 뜻하는지 알 것 같다. 하지만 역시 직접 코드를 보고, 사용해보는것이 가장 좋다.

타입스크립트를 이용한 코드를 보며 개념을 이해해보자. 
[TypeScript Playground](https://www.typescriptlang.org/play?#code/Q)에서 직접 실습해볼 수 있다.

### Class 사용

#### 간단한 출력

```jsx
class Person {
  name = '';
  constructor(name: string) {
    this.name = name;
  }
}

const person = new Person('현호');
```
`Person`이라는 클래스를 하나 생성했다. class에서는 변수를 선언 및 초기화할 경우 const, let, var를 사용하지 않는다.

이 클래스를 이용하여 `person`이라는 변수에 new 를 이용하여 새로운 인스턴스를 생성하고, 아규먼트로 `현호`를 넘겨주고 있다. 이것을 클래스의 `constructor`에서 파라미터로 받은 후 `this`를 이용하여 처음에 초기화한 `name`에 `현호`를 넣은 것이다.

<br>

#### static

```jsx
class Person {
  name = '';
  static gender = "male";
  constructor(name: string) {
    this.name = name;
  }
  introduce(){
    console.log(`Name: ${this.name}, gender: ${Person.gender}`);
  }
  static introduceJob(job: string){
    console.log(`저의 직업은 ${job} 입니다.`);
  }
}

Person.introduceJob('프론트엔드 개발자');
```

[JavaScript MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Classes/static)에서 static은 정적 메서드를 정의한다고 되어있다.

> 정적 메서드는 종종 어플리케이션의 유틸리티 함수를 만드는데 사용된다.

유틸리티 함수는 무엇일까? 함수에 static을 붙인 형태인데, 인스턴스의 생성없이 호출 할 수 있는 함수이다. 위에서도 new를 이용하여 인스턴스를 생성 후 introduceJob를 사용하는 것이 아닌 `Person.introduceJob`를 사용하여 **바로 호출**하고 있다. 이것이 유틸리티 함수이다.

```jsx
const me = new Person('현호');
```

하지만 인스턴스를 생성했을 경우 `me.introduceJob('프론트엔드 개발자')`의 형태로는 사용할 수 없다는 특징이 있다.

static은 유틸리티 함수 외에도 **한번 정의되고 변화가 없는 함수나 속성**에서도 사용할 수 있다. 성별이 남자인 사람에 대해서만 소개하는 경우 `static gender = "male";`을 선언하는 것 처럼 말이다.

**static으로 선언한것**은 이제 this가 아닌 **클래스 이름(여기서는 Person)으로 접근**하면 된다.

<br>

#### getter와 setter

사실 getter와 setter는 Class OOP에서만 사용되는 것은 아니다. [모던 자바스크립트 튜토리얼](https://ko.javascript.info/property-accessors)를 확인해보면 많은 예제가 있으니 참고해보면 좋을 것 같다. 특징 중 하나는 함수처럼 선언하지만 사용할 때는 멤버변수처럼 사용이 가능하다는 것이다.(person.introduce 처럼 사용)

<br>

##### getter

```jsx
class Person {
  name: string;
  job : string;
  introduce: string;
  constructor(name: string, job: string) {
      this.name = name;
      this.job = job;
      this.introduce = name + '는' + job;
    }
}

const person = new Person('현호', '개발자');
console.log(person.introduce);
person.job = "선생님";
console.log(person.introduce);
```

개발자를 하다가 직업을 변경했다고 해보자. 마지막 콘솔에는 `현호는선생님`이 출력되야 하지만 `현호는개발자`가 출력된다.

```jsx
class Person {
  name: string;
  job : string;
  get introduce(): string{
      return this.name + '는' + this.job
  }
  constructor(name: string, job: string) {
      this.name = name;
      this.job = job;
  }
}

const person = new Person('현호', '개발자');
console.log(person.introduce);
person.job = "선생님";
console.log(person.introduce);
```

**get**(getter)을 사용함으로써 `introduce`에 접근할 때마다 새로운 값을 할당받아 위의 문제점을 해결할 수 있게 되었다.

<br>

##### setter

```jsx
{
    class Person {
    private admin: string;
    get newAdmin(): string{
      return this.admin;
    }
    set newAdmin(name: string){
        if(name.includes("hyun")){
            this.admin = name;
        }
    }
    constructor(admin: string){
        this.admin = admin;
    }
}
    const person = new Person("hyunho");
    person.newAdmin = "minsu"
    console.log(person)
    person.newAdmin = "hyunsu"
    console.log(person)
}
```

private는 아래에서 설명하겠지만 외부에서 접근하지 못하도록 하는 것이다. 하지만 set을 이용하여 다시 접근할 수 있게 해준다. 이런 의미없는 행위를 왜 할까?

현재 어떤 사업의 주인은 현호지만 현수에게 물려주려고 한다. 현수가 아니라면 안물려줄 것이다. 이 예제처럼 입력을 받아 검사를 하는 등 어떤 로직을 처리하기 위해 setter를 사용할 수 있다.

<br>

### 캡슐화와 추상화

#### 캡슐화를 이용한 추상화

undefined

내부 인터페이스와 외부 인터페이스를 구분하는 것은 객체지향 프로그래밍에서 중요하다. 우리가 스마트폰을 사용할때, 원하는 어플을 클릭해서 사용하는게 중요하지 어플을 클릭했을 경우 어떤 함수들이 동작하여 해당 어플이 동작가능해지는것은 궁금하지 않다. 이것을 **접근 제어 지정자(public, privae, protected)**를 이용하여 캡슐화, 정보은닉 할 수 있다.

<br>

```jsx
{
    class Phone {
    app = ''
    constructor(app: string) {
        this.app = app;
    }
    private searchApp(){
        console.log("대충 스마트폰에서 어플 찾는 로직...");
    }
    clickApp(){
        this.searchApp();
        console.log(`${this.app} 어플이 실행됩니다.`);
    }
}

const phone = new Phone('chrome');
phone.clickApp()
}
```

이렇게 어플을 클릭하면 실행해주는 Class가 있다고 생각해보자. 우리는 click 함수를 실행하기 위해서 `phone.`을 IDE에 입력해보면 사용할 수 있는 함수 목록들이 자동완성 가능하게 나타난다. 목록을 확인해보면 `searchApp`와 `clickApp`이 있다. 사실 우리는 클래스 내부에서 searchApp을 사용하는 것이지 외부에서`phone.searchApp()`와 같은 코드를 사용할 일이 전혀 없어보인다. 근데 외부에서 꼭 보여야 할까? 이 경우에 앞에 **private**를 넣어 해결할 수 있다. (**캡슐화를 통한 추상화라고 볼 수 도 있다.**)

하지만 만약 외부에서는 은닉하고 싶지만, `Phone`을 상속받는 클래스에서 `searchApp` 함수를 불러오고 싶다면 private 대신 **protected** 를 사용하자. 이것은 외부에서는 접근이 불가능하지만 상속 받은 하위 클래스에서는 접근이 가능하도록 해준다.

아무것도 선언하지 않는다면 Default로 **public**이 된다. 어디서든지 불러올 수 있다는 말이다. 접근 제어 지정자는 당연하지만 static과 함께 사용이 가능하고, constructor에도 가능하다.

<br>

```jsx
//따로 작성하기
private company: string;
constructor(company: string){
  this.company = company;
}

//한번에 작성하기
constructor(privae company: string){}
```

마지막으로 단축해서 사용할 수도 있으므로 기억해두자.
(다른 접근 제어 지정자도 마찬가지다.)

<br>

#### interface

##### interface?? type?? 어떤것을 사용할까?

```jsx
interface Friend{
  name: string;
  gender: string;
  age: number;
}

interface Props{
  name: string;
  friends: Friend[];
}
```

이번에는 인터페이스를 통한 추상화를 알아보자. 그 전에 나는 interface를 이미 많이 사용하고 있었다. 바로 Props, 데이터 등의 타입을 지정할 경우에 사용했다. 사실 이 부분은 type 명령어를 사용해도 된다. 상속에서 사용되는 interface에 대한 extends와 class에 대한 implements도 마찬가지다. 그런데 많은 개발자들이 interface를 사용하는 이유는 무엇일까?

undefined


먼저 차이점으로는 interface는 선언 병합이 가능하다. 동일한 이름으로 여러번 선언한 후 컴파일 시점에서 합칠 수 있다는 의미이다.

또한, TypeScript 팀이 가능한 interface를 사용하기를 권장하고, 튜플 타입을 반드시 써야하는 상황이면 type을 사용하도록 추천하고 있다.

[StackOverflow](https://stackoverflow.com/questions/37233735/interfaces-vs-types-in-typescript)에 참고하기 좋은 답변들이 많으므로 확인해보는것을 추천한다. type에서만 가능한것도 있고, interface에서만 가능한것도 있다.

<br>

##### interface를 이용한 추상화

```jsx
    interface Mobile{
        searchApp: () => void;
    }

    class Phone implements Mobile {
    app = ''
    constructor(app: string) {
        this.app = app;
    }
    searchApp(){
        console.log("대충 스마트폰에서 어플 찾는 로직...");
    }
    clickApp(){
        this.searchApp();
        console.log(`${this.app} 어플이 실행됩니다.`);
    }
}

const mobile: Mobile = new Phone('chrome');
// mobile.clickApp(); -> Error
const phone: Phone = new Phone('chrome');
phone.clickApp();
```

캡슐화를 이용해 추상화했던 코드를 변경했다. 먼저 원하는 동작은 특정 변수에서는 `clickApp` 함수를 사용하지 못하게 하고싶다. 

사용하고 싶은 함수만 타입을 지정하여 interface를 선언해준다. 그리고 Class에서 `implements`를 이용하여 미리 추상화 된 인터페이스를 채택하여 사용할 수 있도록 한다.

이제 타입 지정을 `Mobile` interface로 하게 되면 `searchApp`만 사용할 수 있게 된다. `mobile`에 `.`을 눌러 확인해보면 `searchApp()`만 사용할 수 있는 것을 확인해볼 수 있다. `Phone`를 이용하여 생성된 인스턴스는 여전히 2개의 함수 모두 사용할 수 있다.

tip) implements 뒤에 다수의 interface가 올 수도 있다.

개념 설명 파트에서 추상화를 설명할 때, 청소 로봇을 예로 들었는데 이것도 **상속을 이용한 추상화**라고 볼 수 있다. 이렇게 추상화를 할 수 있는 방법은 여러가지이다.

<br>

### 상속

```jsx
    class CleanningRobot{
        battery: number;
            constructor(battery: number) {
            this.battery = battery;
        }
        sprayWater(){
            console.log("청소기가 물을 뿌리는 로직...");
        }
    }

    class FloorCleanningRobot extends CleanningRobot {
        constructor(battery: number) {
            super(battery);
        }

        work(){
            const sprayWater = super.sprayWater();
            sprayWater;
            console.log(`바닥 위에서 ${this.battery}시간 동안 돌아다니며 청소하는 로직...`);
        }
    }

    const robot = new FloorCleanningRobot(10)
    robot.work();
```

청소 로봇이 있다. 청소 로봇 종류에는 화장실 청소 로봇, 바닥 청소 로봇 등이 있다. 모든 청소 로봇에는 물 뿌리기 기능이 들어가 있어야한다. 이런 상황에서 상속은 유용하다. 먼저 청소 로봇 `CleanningRobot` 클래스에서 물 뿌리기 기능을 구현하고, 바닥 청소 로봇인 `FloorCleanningRobot` 클래스를 생성하는 과정에서 `CleanningRobot`을 `extends`하게 되면 상속이 되는 것이다. `super` 명령어를 이용하여 상속받은 함수를 선언한 후 사용하면 된다.


![](/images/09805e89-73a2-40e7-b2a5-db8823024007-image.png)

만약에 상위 클래스에서 `constructor`가 있었다면 하위 클래스의 `constructor`안에서 마찬가지로 `super`를 이용하여 가져와야 한다. (`this.battery`로 사용하고 있는 것을 볼 수 있다.)

<br>

#### 다중상속과 Composition

##### 다중상속

이렇게 상속은 좋은 기능을 제공하지만, 상속을 남발하게 되면 관계가 복잡해지고 상위 클래스에서 변경사항이 있으면 많은 코드를 변경해야하는 문제가 발생할 수 있다. 또한, **TypeScript에서는 상속의 상속이 불가능하다.** Java에서도 다중상속은 지원하지 않는다고 한다. [Java에서 다중상속이 안돼는 이유](https://siyoon210.tistory.com/125)에 대한 글이 있으니 참고해보면 좋을 것 같다.

그렇다면 청소 로봇을 상속 받아 만들어진 바닥 청소 로봇과 창문 청소 로봇이 있다고 가정했을때, 이 두개의 청소 로봇의 특징을 가진 또 하나의 로봇은 상속 없이 어떻게 만들 수 있을까?

<br>

##### Composition

```jsx
    class CleanningRobot{
        sprayWater(){
            console.log("청소기가 물을 뿌리는 로직...");
        }
    }

    interface FloorCleanning {
        sweep(): void;
    }

    interface WindowCleanning{
        wipe(): void;
    }

    class FloorSweep implements FloorCleanning{
        sweep(){
            console.log("빗자루로 바닥을 쓸어담는 로직...")
        }
    }

    class WindowWipe implements WindowCleanning{
        wipe(){
            console.log("걸레로 창문을 닦는 로직...")
        }
    }

    class FloorWindowCleanningRobot extends CleanningRobot {
        constructor(private floor: FloorCleanning, private window: WindowCleanning) {
            super();
        }

        work(){
            const sprayWater = super.sprayWater;
            const sweep = this.floor.sweep();
            const wipe = this.window.wipe();
            sprayWater;
            sweep;
            wipe;
        }
    }

    const robot = new FloorWindowCleanningRobot(new FloorSweep, new WindowWipe)
    robot.work();
```

바닥을 빗자루로 쓸어담는 바닥 청소 로봇과 창문을 걸레로 닦는 창문 청소 로봇이 있었다. 이 두가지 기능을 모두 가진 만능 로봇을 만드려고 한다. (코드가 너무 길어질 것 같아서 바닥 청소 로봇과 창문 청소 로봇은 안만들었다. 있다고 가정하자.)

1. 먼저 추상화하고 싶은 기능(함수)를 인터페이스에 선언한다.
2. 그 후에 class를 이용하여 해당 기능들을 구현한다. 이때 중요한 것은 implements로 방금 선언한 인터페이스를 지정해준다.
3. 만능 청소 로봇도 청소 로봇이므로 extends로 상속을 해준다.(물뿌리기 기능 사용 가능해짐)
4. `constructor`에서 사용하고싶은 변수 명에 그에 맞는 인터페이스를 지정한다. 이제 `this.변수.함수`로 원하는 기능을 사용할 수 있다.
5. `constructor`에서 받아올 수 있도록 `robot`을 선언하는 곳에서 아규먼트로 기능을 담은 클래스를 적절하게 넣어준다.

![](/images/d3bb6b2f-4273-4818-8ac1-bb9077b31e5e-image.png)

FloorWindowCleanningRobot라는 로봇은 이제 두 가지의 일을 모두 할 수 있게 되었다! **Composition을 사용함으로써 코드의 재활용성을 높일 수 있다. **

클래스를 이용하기만 해도 될 것 같은데 굳이 저 인터페이스가 필요할까에 대한 의문이 생기긴 한다.

undefined

인터페이스를 사용해서 얻을 수 있는 효과는 매우 크다. 인터페이스를 연결하지 않고 `Class`를 연결했다면 생기는 문제점이 무엇인지 알아보자.

<br>

```jsx
    class FloorWindowCleanningRobot extends CleanningRobot {
        constructor(private floor: FloorSweep, private window: WindowCleanning) {
            super();
        }

        work(){
            const sprayWater = super.sprayWater;
            const sweep = this.floor.floorClean();
            const wipe = this.window.wipe();
            sprayWater;
            sweep;
            wipe;
        }
    }
```

`FloorSweep`는 빗자루로 바닥을 쓸어담지만 바닥 청소를 청소기로 하는 로봇으로 변경하고 싶다면 어떻게 해야할까? 청소기로 청소하는 클래스를 하나 생성한 후에 `constructor`에서 `floor: FloorVacuum`로 변경해주어야 한다. 그리고 함수를 사용할 때 `this.floor.vacuum`으로 변경해야 한다. 이렇게 인터페이스가 없어 서로 연관성이 깊어지면 하나가 수정될 경우 변경해야 하는 코드가 많아진다. 수 많은 기능에서 이러한 일이 발생했다고 가정하면 막막해진다.

그렇다면 청소기로 청소하는 기능을 인터페이스를 통해 어떻게 구현하는지 알아보자.

<br>

```jsx
    class CleanningRobot{
        sprayWater(){
            console.log("청소기가 물을 뿌리는 로직...");
        }
    }

    interface FloorCleanning {
        floorClean(): void;
    }

    class FloorSweep implements FloorCleanning{
        floorClean(){
            console.log("빗자루로 바닥을 쓸어담는 로직...")
        }
    }

    class FloorVacuum implements FloorCleanning{
        floorClean(){
            console.log("청소기로 바닥을 청소하는 로직...")
        }
    }

    class FloorWindowCleanningRobot extends CleanningRobot {
        constructor(private floor: FloorCleanning) {
            super();
        }

        work(){
            const sprayWater = super.sprayWater;
            const floor = this.floor.floorClean();
            sprayWater;
            floor;
        }
    }

    const old_robot = new FloorWindowCleanningRobot(new FloorSweep, new WindowWipe)
    const new_robot = new FloorWindowCleanningRobot(new FloorVacuum, new WindowWipe)
    old_robot.work();
    new_robot.work();
```

바닥을 청소하는 인터페이스에서 함수 이름을 `floorClean` 으로 해주자. 무엇으로 바닥을 청소하는지 인터페이스에서는 관심이 없다. 클래스에서 결정하게 된다.

빗자루로 청소하는 `FloorSweep` 클래스와 청소기로 청소하는 `FloorVacuum` 클래스를 생성하고, 인터페이스에서 결정한대로 `floorClean` 함수를 사용하자. 여기서 로직을 구현하면 되는 것이다. 이제 `FloorWindowCleanningRobot` 에서는 바닥 청소를 `FloorCleanning` 인터페이스로 고정할 수 있다. 여기에 `FloorSweep` 클래스를 넣었다면 청소기로 청소하는 로봇으로 변경할 경우 `FloorVacuum` 클래스를 넣어야하는데 그럴 필요가 없어진 것이다.

만능 청소 로봇이 동작하는 `work` 함수에서도 어떤 것으로 바닥을 청소하던지 간에 `floorClean` 를 사용하면 되므로 고칠 코드가 없어진다.

이제 사용하는 곳에서 아규먼트로 그에 맞는 클래스만 넣어주면 된다.

![](/images/2777047a-a5c3-419d-b141-30b370c1ad09-image.png)

선언한대로 오래된 버전과 새로운 버전의 만능 청소로봇이 생성된것을 볼 수 있다. **인터페이스를 이용하여 Composition을 함으로써 코드 재사용성을 극대화했고, 서로 연관성을 줄여 유지보수성을 증가시켰다.**

**상속이 정말 필요한 곳이 아니라면 Composition을 이용하는 것이 더 좋을 것 같다.**

<br>

##### abstract

```jsx
    abstract class CleanningRobot{
        protected abstract sprayWater(): void;
    }

    interface WindowCleanning{
        wipe(): void;
    }

    class WindowWipe implements WindowCleanning{
        wipe(){
            console.log("걸레로 창문을 닦는 로직...")
        }
    }


    class FloorWindowCleanningRobot extends CleanningRobot {
        constructor(private window: WindowCleanning) {
            super();
        }

        protected sprayWater(){
            console.log("청소기가 물을 뿌리는 로직...");
        }

        work(){
            this.sprayWater();
            const wipe = this.window.wipe();
            sweep;
            wipe;
        }
    }

    const robot = new FloorWindowCleanningRobot(new WindowWipe)
    robot.work();
```

추상 클래스를 정의하기 위해서는 `class` 앞에 `abstract`를 붙이고, 추상 메서드를 정의하기 위해서는 메서드 이름 앞에 붙이면 된다. **추상 클래스는 인스턴스를 생성하지 않는다**는 특징이 있다. 상위 클래스에 있는 추상 메서드는 이 클래스를 상속받는 하위 클래스에서 이 메서드를 무조건 재정의 해야한다. 그러므로 **추상 메서드**에는 로직이 없어야하고, **상속 받는 하위 클래스마다 해당 메서드를 정의**해주면 된다.

이렇게 함으로써 개발자가 무조건 구현해주어야 하는 기능이 있을 경우 까먹는 실수를 방지해주는 역할로 사용할 수 있다.

<br>

### 다형성

오버로딩과 오버라이딩을 이용하여 같은 이름의 함수로 다양한 기능을 수행할 수 있다. 이 두가지를 알아보며 어떻게 구현하는지에 대해 감을 잡아보자.

우리는 Class에서 상속받은 형태의 오버로딩과 오버라이딩을 알아보는 것이므로 함수만 존재할 때와는 조금 다를 수 있다.

<br>

#### 오버로딩

```jsx
    class CleanningRobot{
        constructor(){}
        sprayWater(num: number){
            console.log(`청소기가 ${num}번 물을 뿌리는 로직...`);
        }
    }

    class FloorCleanningRobot extends CleanningRobot {
        constructor(){
            super();
        }
        sprayWater(num: number): void;
        sprayWater(num: string): void;
        sprayWater(num: number | string): void{
            if(typeof num === "number") console.log(`청소기가 ${num}번 물을 뿌리는 로직...`);
            if(typeof num === "string") console.log(`${num} 바닥 청소기는 물을 뿌리지 않습니다.`);
        }
    }

    class WindowCleanningRobot extends CleanningRobot {

    }

    const robot1 = new CleanningRobot();
    robot1.sprayWater(3);
    const robot2 = new FloorCleanningRobot();
    robot2.sprayWater(5); 
    robot2.sprayWater('신발장');
```

오버로딩은 함수 이름은 같지만 타입을 다르게 함으로써, 같은 함수로 여러가지 기능을 수행할 수 있다. TypeScript의 오버로딩은 함수명과 매개변수의 갯수가 같아야 한다. if문을 사용해서 해당 타입에 맞는 로직을 수행한다.

<br>

#### 오버라이딩

```jsx
    class CleanningRobot{
        constructor(){}
        sprayWater(num: number){
            return num
        }
    }


    class WindowCleanningRobot extends CleanningRobot {
        sprayWater(num: number){
            return num * num
        }
    }

    const robot = new WindowCleanningRobot();
    robot.sprayWater(4)
```

오버라이딩은 상위 클래스의 함수를 하위 클래스에서 재정의 하는 것이다. 매개변수 타입은 상위 클래스와 같거나 상위 타입이여야 한다. 상위 클래스에서는 `num`을 리턴하고 있지만 하위 클래스에서는 다른 로직을 수행하고 있다.

<br>

## 마무리

FrontEnd 개발자가 Class 기반 OOP에 조금 더 친숙하게 다가갈 수 있도록 글을 작성해보았다. 본인이 공부하기 위해서 작성하기도 했지만 누군가 이 글을 보았을때, 조금이나마 도움이 되면 좋겠다는 마음으로 작성한 것 같다.

프로젝트를 Class기반으로 바꿔야 하는지에 대해서는 아직 잘 모르겠다. React Hooks를 사용하다 보니 Class에 익숙하지 않은것도 있지만 생산성도 따져보아야 할 것 같다. 그리고 OOP 개념은 Class에서만 한정되는 것이 아니므로, 함수형에서도 해당 개념을 어느정도 사용할 수 있다. Class하고 잘 맞는 Mobx와 같은 프레임워크 또는 라이브러리가 있다면 사용해도 좋을 것 같다는 생각이다.

확실히 TypeScript로 OOP를 공부하고 코틀린을 보니 이해가 훨씬 잘간다...
