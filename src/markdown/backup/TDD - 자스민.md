---
title: "TDD - 자스민"
description: "Test Driven Development"
date: 2021-12-13T00:15:17.089Z
tags: ["JavaScript"]
---
>## TDD란?
Test Driven Development

테스트를 통한 기능의 구현이다. 구현하고자 하는 기능에 대한 높은 분석을 요구하기 때문에 코드의 품질을 우선시하게 된다. 보통 유틸성 코드에서 작성한다.


이번 글에서는 단위 테스트(Unit Test)를 다룬다.

#### Unit Test

특정 조건에서 함수(Unit)가 어떻게 작동해야 하는지 정의하고, 그러한 정의대로 함수가 잘 작동하는지 확인하는 방법론이다.

단위 테스트 중에서도 [Jasmine](https://jasmine.github.io/) 라이브러리를 사용해보자.

<br>

#### TDD의 단계

![](/images/98daa40e-b101-4ae4-bac6-6b23b44ccdaf-image.png)

테스트 코드를 먼저 작성하는 것이 TDD이다.

1. 적색 단계 : 성공하기 위해 테스트에 실패하는 단계
2. 녹색 단계 : 테스트에 성공한 단계
3. 리팩터 단계 : 테스트에 성공한 코드를 기반으로 코드의 품질을 높이는 단계 (refactoring)

위의 단계를 반복하는게 핵심이다.

<br>

>## 코드 보기

[jasmine 다운](https://github.com/jasmine/jasmine/releases)에서 jasmine-standalone-3.10.1.zip 파일을 다운로드 했다.

그리고 VSCode로 실행해보았다.

<br>

![](/images/6b21e0e7-a9e0-41cf-a8bb-8107d5d3b3f1-image.png)

연습하기 위한 디렉터리를 생성해주었다. 
나중에 테스트용 코드는 배포를 하지 않는다.

```js
//tddTest.js
function plusOne(num){
    return num + 1;
}
```
숫자에 1을 더해주는 함수를 tddTest.js 파일에 만들었다.

<br>

```js
//tddTest.spec.js
//테스트 유닛들의 모음
describe('자스민 테스트 입니다', () => {
    //테스트 유닛
    it('덧셈을 하는 함수입니다.', () => {
        let num = 10;

        //expect : 실행할 함수의 결과값을 인수로 전달합니다.
        //toBe : 내가 기대한 결과가 일치하는지 판단하는 함수입니다.
        expect(plusOne(num)).toBe(11)
    })
})
```

함수를 테스트하기 위한 tddTest.spec.js 파일을 만들었다. 10이 들어가면 11이 나와야 할 것이다.

<br>

```html
<!-- TDD.spec.html -->
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
    <style></style>
    <link rel="shortcut icon" type="image/png" href="../lib/jasmine-3.10.1/jasmine_favicon.png">
    <link rel="stylesheet" href="../lib/jasmine-3.10.1/jasmine.css">
  
    <script src="../lib/jasmine-3.10.1/jasmine.js"></script>
    <script src="../lib/jasmine-3.10.1/jasmine-html.js"></script>
    <script src="../lib/jasmine-3.10.1/boot0.js"></script>
    <!-- optional: include a file here that configures the Jasmine env -->
    <script src="../lib/jasmine-3.10.1/boot1.js"></script>
</head>
<body>
    <script src="tddTest.spec.js"></script>
    <script src="tddTest.js"></script>
</body>
</html>
```

![](/images/e4343f45-24bb-4e90-bd5d-b0cb1fdcdebd-image.png)

이제 TDD.spec.html 을 통해서 테스트 결과를 출력한다. 테스트를 통과하면 위와같은 화면이 보인다. (자스민을 이용하고 있기때문에 스크립트와 링크들을 연결해주자.)

tddTest.spec.js 와 tddTest.js도 연결해주어야한다. (함수도 사용하고 테스트도 한 후 결과를 도출하므로..)

<br>

```html
<!-- TDD.html -->
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
</head>
<body>
    <script src="tddTest.js"></script>
</body>
</html>
```

배포될 파일은 TDD.html과 tddTest.js이다. 
테스트를 통과했으므로 여기서는 그냥 사용하면 된다.

<br>

>## OOP를 이용한 TDD 설계

[OOP](https://velog.io/@leehyunho2001/OOP)에 대해 잘 모른다면 이 글을 먼저 보고오자.

undefined

우리는 위와 같이 동작하는 간단한 기능을 TDD로 구현해보자.

![](/images/464eae54-6540-4fce-b635-5c5e4c27bc6e-image.png)

디렉터리 구조이다.

### index.spec.html

```html
  <body>
    <!-- 데이터 관리 객체 :  은닉하고 있다가 필요할때 다른 객체에 전달 혹은 수정 -->
    <script src="textManager.js"></script>
    <script src="textManager.spec.js"></script>
    <script src="viewManager.js"></script>
    <script src="viewManager.spec.js"></script>
    <!-- 뷰어 객체 (데이터, 인풋, 버튼, 뷰어를 연결하는 객체) -->
  </body>
```

자스민을 불러오는 스크립트는 위에서 설명했으므로 생략한다. 각 기능을 수행할 js파일과 테스트를 수행할 js파일을 테스트 index파일에서 불러오고있다.

<br>

### **textManager**

```js
// textManager.spec.js
// describe는 유닛의 묶음
describe("텍스트 관리자 입니다.", () => {
  it("텍스트 값을 전달합니다.", () => {
    const textManager = new TextManager();
    const initValue = textManager.getValue();
    //이것이 증명되면 getValue 함수가 잘 작동하는것
    expect(textManager.getValue()).toBe(initValue);
  });
});
```

먼저 테스트를 수행할 코드를 작성했다. textManager.js에서 getValue함수 가져와 리턴값을 initValue에 넣어주었다. expect와 toBe로 잘 작동하는지 테스트하자.

<br>

```js
// textManager.js
const TextManager = (() => {
  let value = { data: "Hello Lions!" };

  function innerTextManager() {}

  innerTextManager.prototype.getValue = function () {
    return value.data;
  };
  return innerTextManager;
})();

const myInstance = new TextManager();
```

생성자 함수 `TextManager`을 설계했다. 

value를 객체 자료형으로 선언하지 않는 이유가 있다. 자료형과 같이 원시타입으로 설정해주면 값의 위치를 참조하는게 아니라 값을 복사해버린다. 그렇게되면 인스턴스들은 값을 공유하는것이 아닌 새로 복사하는것이다. 그러므로 객체로 선언하자.

![](/images/dbbc0b35-6c26-48e0-a94a-380c6c64a719-image.png)

테스트가 통과된것을 볼 수 있다.

<br>

```js
// textManager.js
  innerTextManager.prototype.setValue = function (newValue) {
    value = newValue;
  };
```

이제 값을 수정하는것도 되는지 테스트해보자. js파일에 setValue함수를 생성해주었다.

```js
// textManager.spec.js
  it("텍스트 값을 수정합니다.", () => {
    const textManager = new TextManager();
    const newText = { data: "Hello HyunHo!" };
    textManager.setValue(newText);
    expect(textManager.getValue()).toBe(newText.data);
  });
```

setValue함수를 이용하여 값이 제대로 변하고있는지 테스트하고있다.

![](/images/2a050ee9-3740-421e-a6c9-55cda1b10ab2-image.png)

테스트가 통과되었다.

<br>

```js
// textManager.spec.js
describe("텍스트 관리자 입니다.", () => {
  let textManager;

  beforeEach(() => {
    textManager = new TextManager();
  });

  it("텍스트 값을 전달합니다.", () => {
    const initValue = textManager.getValue();
    expect(textManager.getValue()).toBe(initValue);
  });

  it("텍스트 값을 수정합니다.", () => {
    const newText = { data: "Hello HyunHo!" };
    textManager.setValue(newText);
    expect(textManager.getValue()).toBe(newText.data);
  });
});
```

테스트를 수행하는 textManager.spec.js 파일에서 `const textManager = new TextManager();`가 반복되고 있다. **`beforeEach`** 을 사용하여 리팩토링 해주자.


이제 데이터 관리 객체는 설계가 완료되었다.

<br>

### **viewManager**

```js
// viewManager.spec.js
describe("클릭이번트처리 및 뷰를 담당하는 함수입니다.", () => {
  //dependency injection(의존 주입)
  it("viewManager에 인자가 잘 전달됐는지 확인합니다.", () => {
    const textManager = null;
    const btnEl = null;
    const viewerEl = null;
    const inpTxt = null;

    // 인자가 절달되는지 확인하는 함수
    const actual = () =>
      new ViewManager(textManager, {
        btnEl,
        viewerEl,
        inpTxt,
      });
    // 다 널이여서 실행이 안되는 상황일때 toThrowError으로 확인하자
    expect(actual).toThrowError();
  });
});
```

인자가 전달되는지 테스트하기위해 spec.js 파일을 생성해주었다.

```js
// viewManager.js
function ViewManager(textManager, options) {
  if (!textManager || !options.btnEl || !options.viewerEl || !options.inpTxt) {
    // throw : 사용자 정의 예외를 만들고 프로그램을 종료합니다.
    throw Error("전달인자중에 빈값이 존재합니다.");
  }
}
```

viewManager.js 파일에서 ViewManager함수의 인자에 하나라도 null값이 있는경우 에러를 던져주고있다.

![](/images/f25a182e-f271-424e-acd9-59eac6526fe3-image.png)

정상적으로 동작한다.

<br>

```js
// viewManager.spec.js
describe("클릭이번트처리 및 뷰를 담당하는 함수입니다.", () => {
  //dependency injection(의존 주입)
  let textManager, btnEl, viewerEl, inpTxt, viewManager;
  beforeEach(() => {
    textManager = new TextManager();
    viewerEl = document.createElement("strong");
    btnEl = document.createElement("button");
    inpTxt = document.createElement("input");

    viewManager = new ViewManager(textManager, { viewerEl, btnEl, inpTxt });
  });

  it("viewManager에 인자가 잘 전달됐는지 확인합니다.", () => {
    const textManager = null;
    const btnEl = null;
    const viewerEl = null;
    const inpTxt = null;

    // 인자가 절달되는지 확인하는 함수
    const actual = () =>
      new ViewManager(textManager, {
        btnEl,
        viewerEl,
        inpTxt,
      });
    // 다 널이여서 실행이 안되는 상황일때 toThrowError으로 확인하자
    expect(actual).toThrowError();
  });

  it("click 이벤트가 발생했을 경우 changeValue 함수를 실행합니다.", () => {
    spyOn(viewManager, "changeValue");
    btnEl.click();
    expect(viewManager.changeValue).toHaveBeenCalled();
  });
});

```

이제 클릭이벤트가 정상적으로 동작하는지 테스트하기위해 코드를 작성해주었다.

spyOn는 특정한 모듈의 함수를 감시한다.
toHaveBeenCalled는 함수가 호출이 된적이 있는지 판별한다.

즉, viewManager의 changeValue함수를 감시하고 호출되면 확인하고 판별한다.

<br>

```js
// viewManager.js
function ViewManager(textManager, options) {
  if (!textManager || !options.btnEl || !options.viewerEl || !options.inpTxt) {
    // throw : 사용자 정의 예외를 만들고 프로그램을 종료합니다.
    throw Error("전달인자중에 빈값이 존재합니다.");
  }
  this.inpTxt = options.inpTxt;
  this.viewerEl = options.viewerEl;
  this.textManager = textManager;

  options.btnEl.addEventListener("click", () => {
    this.changeValue();
  });
}

ViewManager.prototype.changeValue = function () {};

```

클릭했을 경우 changeValue()함수가 실행되도록 설계해주었다.


![](/images/a4d3cfa5-7095-4819-a15c-dfe6c16adef8-image.png)

버튼을 클릭했을때 changeValue함수가 호출되었는지 판별한 결과 정상적으로 동작했다는것을 알 수 있다.

<br>

```js
// viewManager.spec.js
  it("updateView 함수를 실행합니다.", () => {
    spyOn(viewManager, "updateView");
    viewManager.changeValue();
    expect(viewManager.updateView).toHaveBeenCalled();
  });
```

이번에는 viewManager의 changeValue함수가 실행되면 updateView함수를 감시하다 판별한다.

<br>

```js
// viewManager.js
ViewManager.prototype.changeValue = function () {
  // input값을 가져와서 textManager에서 만들어준 setValue으로 값을 변경
  this.textManager.setValue({ data: this.inpTxt.value });
  this.updateView();
};

ViewManager.prototype.updateView = function () {
  this.viewerEl.textContent = this.textManager.getValue();
};
```

viewManager.js파일에 changeValue 가 실행되면 updateView도 실행되도록 설계하고, updateView함수를 설계해주었다.

![](/images/4238406e-58fd-463c-b1f1-46929976af1e-image.png)

테스트가 모두 정상적으로 동작한다. 이제 index.html 파일에서 통과한 함수들을 본격적으로 사용해보자.

<br>

### index.html

```html
<!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title></title>
    <style>
      article {
        display: inline-block;
        border: 3px solid black;
        border-radius: 10px;
        padding: 10px;
      }

      .viewer {
        display: block;
        font-size: 24px;
        color: gray;
        margin: 50px 0 50px;
        text-align: center;
      }
    </style>
  </head>
  <body>
    <article>
      <strong class="viewer"></strong>
      <input type="text" class="inp-txt" />
      <button class="btn-push">적용</button>
    </article>

    <script src="textManager.js"></script>
    <script src="viewManager.js"></script>

    <script>
      const viewerEl = document.querySelector(".viewer");
      const inpTxt = document.querySelector(".inp-txt");
      const btnEl = document.querySelector(".btn-push");

      const textManager = new TextManager();
      const viewManager = new ViewManager(textManager, {
        viewerEl,
        inpTxt,
        btnEl,
      });
      viewManager.updateView();
    </script>
  </body>
</html>

```

테스트 js파일은 여기서는 필요없다. textManager.js와 viewManager.js 스크립트만 불러와주자.

스크립트 마지막에 `viewManager.updateView();`을 불러와준 이유는 초기값인 `let value = { data: "Hello Lions!" };`의 data값을 가져오기 위해서다. 그리고 input에 값을 입력하고 버튼을 클릭하면 data가 변경될 것이다.

undefined

입력한 값에 맞게 data가 변경되었다.