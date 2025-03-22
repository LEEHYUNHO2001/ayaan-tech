---
title: "Input 아직도 useState로 관리 하시는분"
description: "input 하나만 핸들링 해도 모두 리랜더링 되는 현상을 react-hook-form으로 해결해보자"
date: 2022-07-17T12:26:19.530Z
tags: ["JavaScript","React","next","typescript"]
---
# Input 태그와 다양한 Type

<input type="range" />
<input type="text" placeholder="정보를 입력하세요"/>
<input type="checkbox" /.> 체크 박스

우리는 `input` 태그를 사용하여 유저가 입력한 정보를 핸들링한다. 그리고 `form` 태그의 `onSubmit` 에서 핸들링 했던 정보를 원하는 부분에 사용한다.

input에는 다양한 타입이 있다. 일반적으로 많이 사용하는 input 타입인 `text`, 유저가 UI적으로 쉽고 재밌게 값을 조정할 수 있는 `range` 타입, TODO 리스트 프로젝트를 설계해보면 필수적으로 만나는 `checkbox` 타입 등이 있다. [MDN input type]을 확인해보면 이 외에도 여러가지가 있다는 것을 알 수 있다.

<br>

## Controlled Component

### 많은 Input을 다루면서..

나의 프로젝트에서는 유저가 입력한 정보를 몽땅 백엔드에 전송하는 페이지가 있었다. 처음에는 문제가 없었지만, input의 갯수가 늘어나고 다양한 UI을 적용하다 보니 다수의 컴포넌트가 생기며 여러가지 상황을 맞딱드리게 되었다.

<br>

```jsx
// 최상단 컴포넌트

const [range, setRange] = useState({})
const [text, setText] = useState({})

return (
  <form onSubmit={onSubmit}>
    <InputContainer
      range={range}
      setRange={setRange}
      text={text}
      setText={setText}
      />
    <button type="submit">Submit</button>
  </form>
)
```

먼저 나는 input 태그 35개가 필요했다. `range` 타입 input 10개와 `text` 타입 input 25개이다. `range`와 `text` 타입을 하나의 `state`에서 관리하면 가독성이 떨어질 것 같았다. 그래서 `input` 태그의 타입별로 `state`를 나누어서 관리하기로 결정했다. 

`onSubmit` 시에는 두 state에 들어있는 데이터가 모두 필요하다. 그래서 `form` 태그가 있는 최상위 컴포넌트에서 `input`들을 다루게 될 2개의 `state`를 생성하고, 하위 컴포넌트인 `InputContainer` 에 props로 넘겨줘야 했다.

<br>

### Props Drilling

![](/images/aac03253-d7b2-4d06-ab0d-1d4a23106737-image.png)

UI와 기능이 복잡해짐에 따라 관심사 분리를 하다보니 여러가지의 컴포넌트가 생겼다. 그러다 보니 컴포넌트들에게 input의 state와 setState들을 계속 props로 넘겨주는 부분을 피할 수 없었다. **Props Drilling이 되기 시작한 것이다.** 

Props Drilling의 문제점은 다들 알고 있을 것이다. 예를 들어, 서로 의존성이 깊어지다 보니 range라는 state의 변수명을 변경하고 싶은 경우 넘겨주던 모든 부분에 range와 setRange를 수정해야한다. 이 외에도 맨 하위 컴포넌트에서만 사용하는 state를 위해서 어쩔수 없이 위에서 부터 쭉 props로 넘겨주는 경우도 있을 것이다.

그래도 여기 까지는 외면할 수 있었다. "나중에 state를 관리하는 Custom Hook 만든 다음에 ContextAPI로 넘겨주지 뭐~" 라는 생각을 가지고 있었기 때문이다. [state를 ContextAPI의 Provider로 넘기기](https://velog.io/@leehyunho2001/Temp-Title) 글처럼 말이다.

<br>

### 비효율적인 리랜더링

![](/images/5a8adb69-c8b4-4403-82fb-0f7ef6aea446-image.png)

하지만 결국 전체적으로 리팩토링을 하게 되었다. 결정적인 이유는 리랜더링 문제때문이었다. 하나의 input을 핸들링해도 모든 컴포넌트의 input들에 리랜더링이 일어난다.

<br>

```jsx
const [state, setState] = useState('')

<input type="text" onChange={(e) => setState(e.target.value)}
```

input의 onChange를 useState로 핸들링 하게 되면, 글자 하나를 입력할 때마다 state의 값이 변경되므로 리랜더링이 일어나게 된다. `range` 타입의 경우에는 범위를 좌우로 움직일 때마다 리랜더링이 발생할 것이다.

`form`태그가 있는 최상위 디렉터리에서 `useState`로 관리하는 `state`가 있었다. 하위 디렉터리에서 이 `input`을 핸들링해도 최상위의 `state`가 변경되기 때문에 모든 컴포넌트가 리랜더링 되는것이다. 이 프로젝트를 리팩토링 하지 않고 서비스 한다면, 35개의 input을 입력받는 동안 과연 몇 백번의 리렌더링이 일어날까? 최적화 측면에서 매우 안좋다는 것을 알 수 있다.

<br>

지금까지 내가 사용했던 input을 핸들링하는 방법은 **Controlled Component** 이었다. 뭔가 단점만 얘기한 것 같지만, `onChange`마다 무언가 수행되는 로직이 있다면 이 방법도 유용할 수 있다.이번에는 리랜더링을 최소화 할 수 있는 **Uncontrolled Component**를 알아보자.

<br>

## Uncontrolled Component

Controlled Component에서 useState를 이용하여 input을 state로 핸들링 했다면, Uncontrolled Component는 ref를 이용한다. 직접 구현해도 되지만, 여러가지 편리한 기능까지 탑재한 react-hook-form이 있기 때문에 오늘은 이것을 사용해볼 것이다. (ref의 개념이 없다면 [공식 문서](https://ko.reactjs.org/docs/refs-and-the-dom.html)를 확인해보자.)

<br>

### react-hook-form 기초

```jsx
// types
export interface InputType{
	email: string;
  	password: string;
}

// constants
export const inputInit = {
	email: '',
  	password: '',
}

// Component
  const { register } = useForm<InputType>({
    defaultValues: inputInit,
  });

const onSubmit: SubmitHandler<InputType> = data => {
	console.log(data)
}

return (
	<form onSubmit={handleSubmit(onSubmit)}>
    	<input {...register("email")} placeholder="email"/>
    	<input {...register("password")} placeholder="password"/>
    	<button type="submit">로그인</button>
    </form>
)
```

react-hook-form의 가장 기초적인 사용법을 확인해보자. 필요한 input들을 초기화 하는 `inputInit`라는 객체를 생성하고, 이에 맞는 타입을 선언해주었다. 그리고 `useForm`을 사용하여 `defaultValues`를 초기화했다. 그리고 `input`에  `register`를 전개 연산자를 이용하여 속성을 부여해주면, 로그인 버튼을 클릭했을 경우 `data`에 입력된 정보가 들어간다. 이제 이메일과 패스워드를 입력하는 곳에 **텍스트를 입력해도 리랜더링이 발생하지 않는다.**

<br>

### Props Drilling 해결

```jsx
// 최상단 컴포넌트

  const methods = useForm<InputType>({
    defaultValues: inputInit,
  });

return (
  <FormProvider {...methods}>
    <form onSubmit={methods.handleSubmit(onSubmit)}>
      <InputContainer
        range={range}
        setRange={setRange}
        text={text}
        setText={setText}
        />
      <button type="submit">Submit</button>
    </form>
  </FormProvider>
)
```

이제 리랜더링 문제점은 해결된 것 같다. 하지만 props가 drilling 되는 것은 아직 해결하지 못했다. 나는 ContextAPI를 사용하려다가 왠지 react-hook-form이 이 문제점을 파악하지 못했을리 없다고 생각하고 [공식 문서](https://react-hook-form.com/api/useformcontext)를 더 찾아보았다.

역시나 `useFormContext`라는 것이 있었다. ContextAPI의 Provider와 비슷하게 하위 컴포넌트에서 사용할 것들을 `FormProvider`로 넘겨주면 된다. `register` 외에 여러가지를 사용할 수 있어 통채로 넘겨주기로 결정했다.

<br>

```jsx
const {  register } = useFormContext();
```

하위 컴포넌트에서 `register`를 사용하고 싶다면 `useFormContext`를 이용하자.

<br>

### input range 현재 값 출력하기

<input type="range" />

`input range`의 경우 현재 값을 UI에 출력해야 UX적으로 좋다. 만약에 현재 값이 UI에 나타나지 않는다면, 현재 어떤 값인지 알 수 없고 대략적으로 많다 또는 적다만 알 수 있기 때문이다. 하지만 우리가 사용하는 것은 `state`가 아닌 `ref`이다. 어떻게 변경되는 값을 감지하여 UI에 출력해 줄 수 있을까?

<br>

#### 조금 비효율적인 방법

```jsx
const { register, watch, getValues } = useFormContext();
const watchNumRange = watch("num", false);

useEffect(() => {
    const subscription = watch((value:number) => console.log(value));
    return () => subscription.unsubscribe();
  }, [watch]);

{watchNumRange && (
  <div>
    <label htmlFor={name}>
      <p>{label}</p>
      <p>{getValues("num")}</p>
    </label>
    <Input
      {...register('num', { valueAsNumber: true })}
      type="range"
      min={0}
      max={10}
      step={1}
      />
  </div>
)}
```

첫 번째로 `watch`와 `getValues`를 이용하는 방법이다. `num`이라는 이름을 가진 `ref`를 `watch`로 지켜보게 하고, 현재 값을 `getValues`로 출력한다. 그리고 `useEffect`로 `watch`에 변화가 있으면 로그를 출력하도록 했다.(이렇게만 해도 리랜더링은 발생하므로..)

이제 현재의 범위를 좌우로 움직여도 현재 값이 UI에 변동되면서 잘 보인다. 그런데 나의 경우 문제점이 발생했다. `range` 타입의 `input`이 10개가 있는데, **하나의 `input`을 건드려도 나머지 9개의 `input`이 리랜더링** 된 것이다. `text`타입의 `input`은 리랜더링이 발생하지 않았지만 `range`타입의 `input`에서만 리랜더링이 발생한 것을 보아 문제가 있어보인다.

<br>

#### 효율적인 방법

```jsx
  const { control, register } = useFormContext();
  const watchValue = useWatch({ control, "num" });

  return (
  <div>
    <label htmlFor={name}>
      <p>{label}</p>
      <p>{getValues("num")}</p>
    </label>
    <Input
      {...register('num', { valueAsNumber: true })}
      type="range"
      min={0}
      max={10}
      step={1}
      />
  </div>
  );

```

`useWatch`라는 API를 사용하면 된다. 이제 `input`의 범위를 좌우로 움직여 설정해도 현재 `input`과 `label`에만 리랜더링이 발생한다. 내가 프로젝트에서 원했던 최고의 동작이다. 

<br>

## 마무리

range input과 text input을 쉽게 생성할 수 있는 공통 컴포넌트를 설계하고, constants에 생성할 input에 대한 데이터를 `object[]` 형태로 선언하여 컴포넌트에서 map을 돌려 사용하고 있다. 여기에 react-hook-form까지 곁들이니 코드가 매우 깔끔해지고, 최적화도 잘 되었다. 만족스러운 결과를 얻어서 다행이다.

또 하나 느낀 점은 바쁘다고 공식 문서를 대충 읽지 말고, 이미 구현된 기능이 많이 있을 수 있으니 꼼꼼하게 읽어야 한다는 것이다. react-hook-form에는 [여기서 설명되지 않은 API](https://react-hook-form.com/api)나 [고급 사용서](https://react-hook-form.com/advanced-usage)가 있다. 필요한 부분이 이미 사용하기 쉽게 구현되어 있을 수 있으니 꼼꼼하게 읽어보자.