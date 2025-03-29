---
title: "Vue의 라이프 사이클 (React와는 다른 맛!)"
description: "코드로 알아보는 Vue의 라이프 사이클"
date: 2022-11-06T08:45:30.772Z
tags: ["JavaScript","React","vue"]
---
# Vue 라이프 사이클?

새로운 라이브러리나 프레임워크를 학습하는 방법은 사람마다 다르다. 나는 React에 대한 공부를 막 시작했을 때, 인터넷 강의를 보면서 사용법을 익혔다.

undefined


그리고 자신이 보유한 배경 지식에 따라서도 학습 방법은 달라진다. 나는 Vue를 처음 공부할 때, 처음 React를 공부할 때와는 다르게 인터넷 강의를 봐야겠다는 생각은 하지 않았다. 공식문서를 읽으며 직접 이것저것 만들어보는게 Best라는 것을 알고있기 때문이다. Vue를 사용하기로 결정하면서 가장 먼저 들었던 생각은 **"React는 라이프 사이클이 있어 참 편했는데 당연히 Vue에도 있겠지?"** 이었다. 당연하게 Vue의 라이프 사이클도 존재했고, 이 외의 기능들을 하나하나 찾아보니 역시 React나 Vue는 프론트엔드 개발자에게 도구일 뿐이라는 사실을 다시 한 번 깨달았다. (JS와 TS 공부를 열심히 하자..!)

어쨋든!! 새로운 스킬에 라이프 사이클이 존재한다면, 모두 꼼꼼하게 살펴보는 것을 추천한다. 그래야 상황에 맞는 라이프 사이클 훅을 사용하여 버그를 방지하거나 효율적인 선택을 할 수 있기 때문이다.

<br>

## 공식 문서를 항상 확인하자

![](/images/6ecc9f0b-64ed-42fa-8b3f-c6b0c8c39472-image.png)


[vue.js 공식 문서](https://vuejs.org/guide/essentials/lifecycle.html#lifecycle-diagram)를 보면 그림으로 한 번에 정리를 해주고 있다. 사실 너무 잘 나와있어서 설명할게 없지만 우리는 개발자답게 코드로 알아보자. 라이프 사이클에 관련된 훅들을 살펴보면서 이 그림과 비교해보면 이해가 더 수월할 것이다.

> tip) React의 라이프 사이클을 공부해보면 class 형을 가장 먼저 보게 될 것이다. 그리고 훅(useEffect)을 이용해서 대체할 수 있고, React 생태계에서는 훅 기반을 많이 사용하고 있다. 이런 것처럼 vue도 최신 문법에서는 라이프 사이클 훅의 네이밍이 조금 다르다는 것을 인지하자.

<br>

### 기본 틀

```vue
<template>
  <div class="life-cycle">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  data(){
    return{
      msg: "A"
    }
  },
  // 라이프 사이클 훅들을 추가할 예정...
}
</script>
```

vue 컴포넌트의 가장 기본적인 틀을 이용해서  라이프 사이클을 알아볼 것이다.

![](/images/8996d98c-2640-40d7-8a55-401b72bc4cb7-image.png)

UI에는 현재 A가 출력되고 있다.

<br>

### beforeCreate

```js
  beforeCreate() {
    console.log("beforeCreate");
    this.msg = "B";
  },
```

`beforeCreate`는 vue 인스턴스가 초기화 되고, 가장 먼저 실행되는 훅이다. 아직은 data나 methods 속성이 인스턴스에 저장되어 있지 않으므로 여기서는 접근할 수 없다. `this.msg = "B"`로 `data`로 선언한 `state`를 변경하는 코드를 작성했다. 

UI를 확인해보면 그대로 `A`가 출력되는 것을 볼 수 있다. 콘솔을 확인해보면 `beforeCreate`가 출력되고, 에러가 발생하지는 않았다. 즉, 그냥 `msg state`에 접근이 안된 것이다.

<br>

### created

```js
  beforeCreate() {
    // ...
  },
  created() {
    console.log("created");
    this.msg = "B";
  },
```

라이프 사이클 훅들을 설명하면서 위와 같이 훅들을 쭉 붙여 나갈 것이다. 이번에는`created`훅을 알아보자. 여기 부터는 data의 변화에 따라 대응할 수 있게 반응형으로 추적할 수 있게 된다. 그리고 methods, computed, watch 등에 접근할 수 있다. 

![](/images/dcf4eb3c-d1ec-49b8-a590-41d7ffebd395-image.png)

`msg state`를 변경할 수 있어 UI는 `B`를 출력하게 된다. 아직 인스턴스가 화면에 부착되기 전 이므로 `template`속성에 정의된 `DOM Element`로는 접근할 수 없다. **보통 API Endpoint에서 데이터를 받아 `state`에 초기화하는 경우나 이벤트 리스너를 등록할 때** 많이 사용하는 라이프 사이클 훅이다.

<br>

### beforeMount

```js
  beforeMount() {
    console.log("beforeMount");
    this.msg = "B";
  },
```

`render()`함수가 호출되기 직전(DOM에 인스턴스가 부착하기 직전)에 추가하고 싶은 로직이 있다면 이 훅에서 작성하면 된다. (Virtual DOM이 생성되어 있지만 실제 DOM에 부착하지 않은 상태)

사실 비동기로 데이터를 요청하는 부분은 `beforeCreate`, `created`, `beforeMount`에서 가능하다. 어치피 `mounted` 이후에 실제 비동기 요청이 처리되기 때문이다. 하지만 대부분의 글을 보면 `created`에서 비동기 요청 로직을 작성한다. 그 이유는 웹 프로젝트의 특성때문이라고 생각한다. 데이터를 요청하고, 그 값을 `state`에 초기화 하는 경우에 `created`를 사용한다고 했다. 이에 반해 `beforeMount`에서 데이터 요청을 하는 경우는 데이터를 직접 주입하는 상황이다. 웹 프로젝트를 설계하다보면 state에 초기화하는 경우가 매우 많아서 `created`에 대한 글이 압도적으로 많은 것 같다. 실제로 각각의 상황에 맞게 알맞은 훅을 사용했을 때 효율이 가장 좋다고 한다.

이 외에 `beforeMount` 훅을 잘 사용하는 예제를 제시하는 [Stackoverflow](https://stackoverflow.com/questions/57077104/when-to-use-the-lifecycle-method-beforemount-in-vue-js) 글이 있도 있다.

<br>

### mounted

```js
  mounted() {
    console.log("mounted");
    this.msg = "B";
  },
```

인스턴스가 mount된 후. 즉, 가상 DOM의 내용이 실제 DOM에 부착된 후에 실행된다. `this.$el`부터 data, methods 등에 접근 가능 하다. 

beforeMount에서도 `this.$el`에 접근이 가능하긴 하지만 여기서의 `this.$el`과 조금 다르다. (위에서 첨부했던 [Stackoverflow](https://stackoverflow.com/questions/57077104/when-to-use-the-lifecycle-method-beforemount-in-vue-js))

![](/images/e1bcd459-3135-44f3-b09b-7b4dc2956b34-image.png)

> 그림 출처 : [지그재그 블로그](https://wormwlrm.github.io/2018/12/29/Understanding-Vue-Lifecycle-hooks.html)

부모 컴포넌트와 자식 컴포넌드가 있는 경우, 부모가 `created`되고 자식이 `created부터 mounted`되어야 부모가 `mounted`가 된다. 

```js
mounted() {
  this.$nextTick(function() {
    // 모든 화면이 렌더링된 후 실행
  })
}
```

하지만 자식 컴포넌트가 서버에서 비동기도 데이터를 받아오는 경우에 부모의 `mounted`훅이 모든 자식 컴포넌트가 마운트트된 상태를 보장하지 않는다. 이 경우에는 `this.$nextTick`을 이용해서 처리할 수 있다.

또, 이 훅에서는 재밌는 사실이 있다. `this.msg = "B"`는 data를 변경하여 DOM에도 그 변화를 적용하고 있다. `mounted`훅에서 이 코드를 넣으면 `update`에 연관된 훅을 호출할 수 있다. 바로 알아보자.

<br>

### beforeUpdate

```js
  beforeUpdate() {
    this.msg = "C";
    console.log("beforeUpdate");
  },
```

`updated`훅을 실행하기 전에 `beforeUpdate`를 수행한다. 컴포넌트에서 사용하는 데이터의 변경이 감지되면, 변화 직전에 호출되는 것이다. 실제로 `mounted` 이전의 훅에서 `msg`를 변경하는 코드를 작성하면 UI에는 `B`가 출력되지만, `beforeUpdate`훅이 호출되지는 않는다.

![](/images/21d09981-ab20-4e3d-b7ab-17cfd66d0619-image.png)

또한, 여기서에서는 변경되는 값에 대해 추가적으로 다시 변화시켜도 update관련 라이프 사이클훅을 호출하지 않는다. `msg` 값을 `mounted`에서 `B`로 변경시켜서 `beforeUpdate`훅이 호출되었다. 그리고 여기서 다시 `msg`값을 `C`로 변경시켜 UI는 `C`가 출력되었다. 그리고 콘솔에서는 `beforeUpdate`가 한 번 출력되었으므로 재호출 하지 않았다는 것을 알 수 있다.

<br>

### updated

```js
  updated() {
    console.log("updated");
  },
```

변경된 데이터가 적용된 가상 DOM을 실제 DOM에 적용된 이후에 호출되는 훅이다. 여기서 데이터를 변경하면 무한 루프가 발생할 수 있으므로 해당 로직이 필요한 경우에는 `computed`나 `watch`를 이용하자.(왠만하면 그냥 `beforeUpdate`에서 처리) 그리고 mounted와 마찬가지로 모든 화면이 update된 후를 보장받으려면 this.$nextTick를 사용할 수 있다.

<br>

### beforeDestroy

```js
  beforeDestroy() {
    console.log("beforeDestroy");
  },
```

인스턴스가 해체되기 직전에 호출된다. 아직은 모든 요소에 접근 가능하다. 이벤트 리스너 해제 등의 작업을 해주면 된다. (메모리를 위해..!)

[codepen](https://codepen.io/beomy/pen/oaypYy?editors=0012)에 예시도 있으니 확인해보자. `isDelete` 값이 `false`가 되면, 조건부 렌더링이 해제되고 `beforeDestroy`가 호출 된다.

<br>

### destroyed

```js
  destroyed() {
    console.log("destroyed");
  },
};
```

vue 인스턴스가 해체되고 난 이후에 호출된다.

<br>

### 이 외의 라이프 사이클 훅들

우리는 공식 문서 그림에 나와있는 라이프 사이클 훅들에 대해 알아보았다. 하지만 이 외에도 조금 더 있다. 실제로 React도 라이프 사이클에 대해 자세히 보면 많은 훅들이 있는것을 알 수 있다. Vue도 그런 것이다. [공식 문서](https://v3.ko.vuejs.org/api/options-lifecycle-hooks.html)를 확인해보면 `activated`, `deactivated`, `beforeUnmount`, `unmounted`, `errorCaptured`, `renderTracked`, `renderTriggered` 라는 훅들이 있다. 이 훅들에 대해서도 알아두어야 찰떡인 상황이 오면 사용할 수 있다. 다음 글에서 알아보자!