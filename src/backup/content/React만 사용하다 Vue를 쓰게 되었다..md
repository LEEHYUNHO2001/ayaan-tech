---
title: "React만 사용하다 Vue를 쓰게 되었다."
description: "둘다 꾸준하게 공부해야지..!"
date: 2022-10-22T14:25:07.240Z
tags: ["JavaScript","React","typescript","vue"]
---
# Vue를 사용하게 된 계기

## React야 안녕.. 우린 헤어지는게 아니야

프론트엔드 개발자가 되기 위해서 필수적으로 공부해야 하는 녀석들이 있다. 바로 **HTML, CSS, JavaScript** 이다. 그 이후에는 보통 **React, Vue, Angular** 중 사용해보고 싶은 라이브러리 또는 프레임워크를 결정한다. 혹은 입사하고 싶은 회사가 사용하는 스킬을 선택해서 공부하게 된다. 나는 Vue나 Angular을 사용해보지는 않았다. 한국에서 가장 수요가 많다는 React를 처음 접했었고, 이 라이브러리가 잘 맞고 재미있어 해당 스택을 깊게 공부하게 되었다.

![](/images/f7bea4ac-ae1f-4c52-a9b1-3cde7309bb5c-image.png)

LifeCycle, Hooks, TypeScript, 최적화, 관심사의 분리, 컴포넌트 설계 기법과 같은 React 자체를 잘 사용하기 위한 고민부터 React와 찰떡인 다양한 라이브러리를 사용했다. 더 나아가 React에서 SSR이나 SSG를 쉽게 구현하기 위해 **Next.js**도 사용하며 본격적으로 연마할 스택을 React로 결정했었다. (물론 HTML, CSS, JavaScript 기본기도 탄탄히..!)

<br>

![](/images/026e70bc-c971-45db-9a30-c5c6a6b75ba1-image.png)

그래서 과거에는 메인 스택이 React가 아닌 회사는 지원하지 않았다. 물론 다양한 스택을 사용해보면 **견문이 넓혀져 좋다**는 장점이 있다. 하지만 이것저것 찍먹하다 보면 **깊게 아는것이 없는 상태**가 될 수 있다는 단점이 있어 React만 생각했었다.

실제로 나는 첫 회사를 React를 사용하는 곳으로 입사를 했다. 원래의 목적대로라면 성공한 셈이였다. 하지만 프론트엔드 개발자가 본인 혼자이고, Web Front 업무도 많은 상황이 아니였다. 그러다보니 남는 시간에 "`어떻게 프로젝트들을 설계해야 더 좋은 코드 또는 구조로 리팩토링할 수 있을까?`"에 대한 고민을 많이 했다. **UX를 위한 다양한 고민 및 최적화와 DX를 향상시키기 위한 노력**을 한 것이다.

<br>

![](/images/7c3c58f5-664f-4283-9f44-16c5ee72003b-image.png)

그러다 보니 문득 React는 도구일 뿐이라는 생각이 들었다. 그냥 웹 개발을 잘하는 사람은 프로젝트 디렉터리 구조, 메모리, 최적화, UX와 DX를 고민하는 사람이라고 생각했기 때문이다. 나는 아직 초보 개발자이지만, **React에 대해서 깊게 고민해본 만큼** Vue에도 금방 적응할 것 같아서 이번에는 Vue를 사용하는 회사도 이직 리스트에 넣었다.

![](/images/b40114bb-d852-4384-9a82-bebe797f2a14-image.png)

Vue를 사용한다고 달라질 것은 없다. 이제부터 내가 아는 지식들과 비교해보며 해당 프레임워크에 대해 알아가면 되는 것이다. 또 Vue를 사용하면서 성장한 만큼 다시 React를 사용했을 때, 느끼는 점이 많을 것이다.

이 글을 읽는 개발자분들에게 전달하고 싶었던 말은 **스스로 문을 좁히지 말자**는 이야기였다. React, Vue, Angular중 본인이 깊게 고민해본 스택이 있다면 다른 분야도 금방 적응할 수 있을 것이다.

<br>

## 그래서 Vue를 사용하게된 이유는?

undefined

뻔한 레파토리다. 이직하는 회사에서 Vue를 사용하기 때문이다. 이 말을 하기 위해 위의 글이 빌드업이라고 생각할 수 있겠지만 실제로 저런 생각을 했기 때문에 Vue를 사용하는 회사도 지원했던 것이다.

![](/images/6e0b4664-26d8-4404-b643-c562b96e128f-image.png)


**React를 공부하지 않겠다는 의미는 아니다.** 나는 React를 매우 사랑한다. 자유도가 높은 만큼 React는 상황에 맞게 더 효율적인 코드를 작성할 수 있다. 게다가 재밌는 내용들도 신속하고 방대하게 추가된다. **예를 들면, React18에서 시도중인 Server Component라던가 UX를 위한 부분적 Hydrate같은 것 말이다.** 나는 React와 Next에 대해서도 꾸준히 학습하면서 실력을 키워나갈 생각이다. (사이드 프로젝트는 모두 React로..)

> **"이 상황에서는 React를 사용했으면 OO식으로 더 효율적으로 작성했을 텐데.. Vue는 조금 아쉽네!"** 
또는
**"React였다면 복잡할 수 있었던 코드를 Vue에서는 간단하게 나타낼 수 있고, 전체적인 효율도 비슷하구나!"**
라는 생각이 가능하도록 React와 Vue 두 스택에 대해 깊이 알게되는 그 날까지..!

<br>

## 글의 목적

서론이 길었지만 이 글의 목적은 React만 사용하다 Vue에 대해 처음 공부해보면서 느낀 점들을 기술해보는 것이다. React코드도 많이 나올 것이다.

> 이 글은 일단 **vue2** 기준이다.
tip ) vue2에서는 TypeScript가 완벽 지원되지 않는다.

<br>

# React와 Vue

React와 마찬가지로 Vue를 이용해서도 SPA(Single Page Application) Wep App을 만들 수 있다. 또한, Virtual DOM(가상돔)도 사용한다.

사실 생태계 자체는 React가 훨씬 크다. 그만큼 프로젝트를 설계하면서 만나는 문제들을 해결하기 위한 지식이나 좋은 라이브러리들이 React가 많다는 의미이다. 그런데도 Vue도 꾸준히 사랑받고 있다. 

> 실제로 우리가 흔히 이야기하는 네카라에서도 Vue를 이용한 프로젝트가 있다.

<br>

## Vue의 특징

### 그냥 쉬움 (feat. 왜 쉽겠어?)

이미 React가 있는 상황에서 Vue를 왜 사용하는 걸까? Vue는 자체적으로 제공하는 문법이 있다. 그리고 **기능들에 대한 문법이 정해져** 있다. 그래서 다들 React보다 러닝 커브가 낮다고 이야기한다.

> **주의**
문법같은게 React에 비해 쉽다는 것이다. 
어려운 기능을 구현하면 당연히 Vue를 사용해도 어렵다.

```jsx
// React 조건부 렌더링

// 방법 1 : &&
return(
  	//...
	{isOpen && <Modal />}
  )

// 방법 2 : 삼항 연산자
return(
  	//...
	{isOpen ? <Modal /> : null}
  )

// 방법 3 : 함수로 대체
const modal = () => {
  if(isOpen){
    return <Modal />
  }
}

return (
	//...
    {modal()}
)
```

"Vue는 쉽다"라는 특징을 이야기할 때, 항상 나오는 예제다. 조건에 따라 렌더링을 수행하는 UI를 구현한다고 가정하자. React의 경우 간단하게 살펴봐도 벌써 3가지가 존재한다.

```jsx
// Vue의 조건부 렌더링
<Modal v-if="isOpen"/>
```

Vue에서는 여기서 제공하는 `v-if`라는 문법을 사용하면 된다. 그냥 이거 하나다. 여기서만 봐도 **자유도가 낮은 단점과 사용하기 쉽다는 장점**을 볼 수 있다.

<br>

### Vue는 양방향 데이터 바인딩! (React는 단방향이라구..?)

데이터 바인딩이란, 화면상에 보여지는 데이터와 브라우저 메모리에 있는 데이터를 묶어서(Binding) 서로 간의 데이터를 동기화 하는 것이다.

<br>

#### 컴포넌트 내 데이터 바인딩

```jsx
// React 컴포넌트 안의 단방향 데이터 바인딩
interface BtnProps{
	isClick: boolean;
}

const Component = () => {
	const [isClick, setIsClick] = useState(false);
  
  	const handleClick = () => {
        setIsClick(prev => !prev)
    }
    
    return <Btn 
             onClick={handleClick}
             isClick={isClick}
             >
      			{isClick}
    		</Btn>
}

const Btn = styled.button<BtnProps>`
	${({isClick}) => isClick && color: 'red'};
`;
```

**React의 단방향 바인딩**부터 알아보자. 첫 렌더링시 UI에는 `false`가 나타난다. `button`을 클릭하면 `isClick`이라는 `state`가 변경되고, HTML에서 데이터 바인딩되어 UI에는 `true`가 출력된다.

![](/images/30e6089c-4185-41a0-b417-e104ce2c49ff-image.png)

CSS 스타일도 마찬가지로 데이터 바인딩을 한다. 처음에는 기본값인 `black` 색의 폰트를 출력하지만, 버튼을 클릭하면 `state`가 `true`가 된다. `red`색의 폰트가 적용될 수 있도록 HTML에서 데이터 바인딩을 하게 된다.

그림으로 표현하자면 위와 같은 것이다. 단방향 바인딩은 **적절한 Event(onClick, onSubmit 등)를 통해서만 JavaScript가 실행되고, HTML에서 바인딩되어 알맞은 UI가 출력**된다.

단방향 데이터 바인딩의 경우 흐름이 단순하기 때문에 이해하기 쉽다. 또한, 데이터 추적과 디버깅이 수월하다.

```jsx
// Vue 컴포넌트 안의 단방향 데이터 바인딩
<div id="app">
  <button :value="isClick" @click="handleClick">
    {{ isClick }}
  </button>
</div>
<script>
  new Vue({
    el: "#app",
      data: {
        isClick: false,
      },
        methods: {
          handleClick(e) {
            this.isClick = !e.target.value;
          },
        },
      });
</script>
```

undefined

물론 Vue에서도 문법은 조금 다르지만 단방향 데이터 바인딩이 가능하다. `@click`을 클릭 핸들러와 연결해서 사용했더니 정상적으로 동작했다. 이 방법은 클래스 바인딩에도 유용하게 사용된다.

> v-bind는 `:`로 축약 가능
v-on은 `@`로 축약 가능
이벤트 내부에 [이벤트 수식어](https://v2.vuejs.org/v2/guide/events.html#Event-Modifiers)를 사용할 수도 있음
ex) e,preventDefault()는 .stop() 으로 사용 가능

![](/images/effd1474-abe8-4dd4-9e23-18009079f44b-image.png)

하지만 **Vue의 경우 컴포넌트 안에서 양방향 데이터 바인딩이 가능**하다. Controller를 통해 Model을 변경시키는 JavaScript와 View 담당인 HTML 사이에 ViewModel이 존재한다. **둘 중 하나가 변경되면 양쪽의 데이터를 일치시키는 역할을 ViewModel**이 해준다.

웹 애플리케이션이 복잡도가 증가할수록 양방향 바인딩의 장점이 나타난다. React에 비해 코드량이 줄어들고, 그 만큼 유지보수도 쉬워지기 때문이다. 변경된 데이터에 따라 DOM 객체 전체를 렌더링할 수 있으므로 성능 감소에는 주의 해야한다.

```jsx
// Vue 컴포넌트 안의 양방향 데이터 바인딩
<div id="app">
  <input v-model="name" />
  <p>{{ name }}</p>
</div>
<script>
  new Vue({
    el: "#app",
      data: {
        name: "Ayaan",
      },
  });
</script>
```

React 관점에서 보면 `이게 동작해?` 라는 생각이 절로 드는 코드다. 왜냐하면 `input`에서 입력한 값을 통해 `name`값을 부여하도록 도와주는 핸들링 함수가 존재하지 않기 때문이다.

undefined

하지만 너무 잘 동작한다. `p`태그 안에서 사용된 `name`이 `input`에 입력한 대로 잘 변경된다. 

`{{ name }}`은 단방향 데이터 바인딩이다. Vue 인스턴스가 가지고 있는 정보를 보여주는 역할만 한다. 그런데 이 `name`은 `input`값을 변경하니 바로 적용되었다. `input`태그의 **`v-model`이라는 지시문(Directive)을 통해 Vue의 data인 `name`에 직접 데이터를 수정할 수 있는 양방향 데이터 바인딩**이 구현된 것이다.

> v-model은 input, textarea, select 요소에 양뱡향 데이터 바인딩이 가능하게 해준다.

하지만 v-model을 이용해서 input을 양방향 데이터 바인딩 할 경우, 한글입력에 버그가 생긴다. v-bind(:)와 v-on(@)을 이용하여 양방향 데이터 바인딩을 이용하면 해결된다고 한다.

<br>

#### 컴포넌트 외부 데이터 바인딩

<p><image src="https://velog.velcdn.com/images/leehyunho2001/post/a8ec2238-bdf6-4af3-9a84-9634331ee760/image.png" width="700"/></p>

React는 컴포넌트 외부에서도 단방향 데이터 바인딩만 가능하다는 특징이 있다. 부모 컴포넌트에서 자식 컴포넌트로 props를 내려주며 데이터를 전달한다.

```jsx
// React 컴포넌트간 단방향 데이터 바인딩

// 부모 컴포넌트
const 부모 = () => {
	const [isClick, setIsClick] = useState(false);
  
    const handleClick = () => {
        setIsClick(prev => !prev)
    }
    
    return <자식 handleClick={handleClick} />
}

// 자식 컴포넌트
const 자식 = ({ handleClick }:Props) => (
	<button onClick={handleClick}>클릭</button>
)
```

물론 React도 함수를 props로 넘겨주면서 자식 컴포넌트에서 데이터를 부모로 넘겨줄 수 있다.

<br>

![](/images/7e396879-d388-4473-9002-c38a4539b004-image.png)

Vue와 같이 컴포넌트 간에서 **양뱡향 데이터 바인딩**을 하게 되면, 부모 컴포넌트에서 자식 컴포넌트로는 props를 통해 데이터를 전달하는 것은 단방향 데이터 바인딩과 같다. 하지만 **자식 컴포넌트에서 부모 컴포넌트로 Emit Event를 통해 데이터를 전달**한다는 것이 다르다.

```vue
// Vue 컴포넌트간 양방향 데이터 바인딩

// 부모 컴포넌트
<template>
  <div class="parent">
    <Child :isClick="isClick" @handle-click="handleClick" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Child from "@/components/Child.vue";

@Component({
  components: {
    Child,
  },
})
export default class HomeView extends Vue {
  isClick = false;

  handleClick() {
    this.isClick = !this.isClick;
  }
}
</script>
----------------------------------------------------
// 자식 컴포넌트
<template>
  <div class="child">
    <button @click="handleClick">{{ isClick }}</button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
  @Prop() private isClick?: boolean;
  @Emit("handle-click")
  handleClick() {}
}
</script>
```

부모 컴포넌트에서 `isClick`이라는 `state`와 `handleClick`이라는 핸들링 함수를 가진다. `isClick`은 `props`로 넘기고, 핸들링 함수는 자식 컴포넌트에서 `Emit`이벤트로 부모에게 데이터를 전달하고 있다.

undefined

정상적으로 동작한다.
(ts를 사용하다보니 일반적인 vue2레퍼런스와 코드가 다를 수 있다.)

<br>

## 더 나아가..

아직 Vue에 대해서는 완전 초보다. 손쉽게 최신의 리액트 앱을 설정할 수 있도록 도와주는 CRA처럼 Vue도 비슷한게 있다는 것을 오늘 알았다. Vue도 다를게 없었다. Typescript 설정을 위한 tsconfig 파일도 생기고, eslint나 prettier도 쉽게 설정할 수 있었다. React에서 고민했던 프로젝트 디렉터리 구조도 Vue에서 유사하게 적용할 수 있을것으로 예상된다. 하지만 Vue에게 맞는 디자인 패턴이라던가 렌더링 최적화를 위한 코드는 직접 사용해보면서 몸소 느껴야할 것 같다. 다음 글은 React와 Vue의 Todo 프로젝트를 설계해보고 차이점을 알아보려고 한다. 

React와 Vue 모두 파이팅!!!

