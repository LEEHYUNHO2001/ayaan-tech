---
title: "반복되는 Catch 한 번에 처리"
description: "api 통신 로직 분리와 프로젝트 특성상 반복되는 예외 처리에 대한 고민"
date: 2023-03-21T12:20:19.771Z
tags: ["JavaScript","React","typescript","vue"]
---
# 서론

신입 개발자로 일하면서, 여러가지의 트러블 슈팅을 접하고 기능이나 컴포넌트들을 설계하고 있다. 자연스럽게 습득하거나 사수분들로 부터 조언을 듣고 배운 여러 노하우도 있었는데, 시간적 여유가 없다는 핑계로 글을 작성하지 못했었다. 

그래서 오랜만에 직접 코딩하면서 고민했던 부분을 글로 작성하려고 한다. **Api 통신 로직을 분리**하면서 했던 고민과 해결한 방법을 공유하는 글이다. 또한, Api 통신 **로직마다 붙어있는 예외 처리 공통화**를 위해 선택한 방법을 말해보겠다.

<br>

## Store에 붙어 있는 API Request 로직

![](/images/668dc774-d538-4477-af37-681588930ce3-image.png)


현대의 웹 애플리케이션은 더 나은 서비스를 제공하기 위해 다른 출처의 리소스들을 불러오곤 한다. 더 나아가 API를 이용하여 CRUD와 같은 기능을 구현하는 것은 프론트엔드 개발자의 기본 업무중 하나가 되었다. 다른 기업에서 제공하는 API일 수도 있고, 자체적으로 개발한 BackEnd API일 수도 있다. 쉽게 통신을 할 수 있도록 도와주는 비동기 통신 라이브러리인 **Axios**로 예시를 들겠다.

<br>

```jsx
axios.get('https://APIEndPoint')
  .then((result)=>{
    console.log(result.data);
}).catch((error)=>{
    console.log(error);
});
```

간단하게 `axios`를 이용하여 데이터 패치 로직을 작성했다. `axios`에서 제공하는 [create](https://yamoo9.github.io/axios/guide/api.html#%EC%9D%B8%EC%8A%A4%ED%84%B4%EC%8A%A4-%EC%83%9D%EC%84%B1)를 이용하여 더 효율적인 데이터 패치 로직을 구성한다거나, `try/catch` 와 `async/await`를 왜 사용하지 않는지에 집중하지 말자.

이와 같이 특정 `API EndPoint`에 `GET` 요청을 하여 데이터를 받았다고 가정하자. 이와 같이 `response`를 받으면, 어디에 사용할지에 따라 특정 컴포넌트의 `state` 또는 `전역 상태 관리` 에 저장한다.

물론 React에서는 [React-Query](https://tanstack.com/query/latest)(지금은 Tanstack-Query)나 [SWR](https://swr.vercel.app/ko/docs/getting-started)과 같은 서버 상태 개념을 다루는 것을 도와주는 라이브러리를 사용하기도 하지만 오늘은 이 두가지도 잊자.

<br>

```jsx
// React

export const Example() => {
  const [result, setResult] = useState<Result>([]);
  
  const getAPIEndPoint() {
    axios.get('https://APIEndPoint')
      .then((res)=>{
        setResult(res.data);
    }).catch((err)=>{
        console.log(err);
    });
  }
  
  useEffect(() => {
  	getAPIEndPoint();
  }, []);
}
```

React에서 특정 페이지나 컴포넌트에서만 사용하는 `state`를 위해 데이터 패칭 로직을 작성한다면, 이와 유사한 형태가 될 것이다. 

하지만 Response에 대한 데이터가 프로젝트의 많은 부분에서 사용될 수 있다면 어떻게 해야할까? 간단하게 `전역 state`에 할당하면 될 것이다. 여기서 더 나아가 Api 통신하는 해당 함수에서 **데이터 가공, 자체적인 로딩처리, 다른 상태에 대한 변화 처리 등의 작업**을 한다면 어떨까? 해당 **함수를 전역에서 사용**할 수 있도록 설계하면 된다.

이제부터는 회사에서 사용하는 스택인 Vue를 예시로 들겠다.

<br>

```jsx
@Action
fetchExample(param1) {
  // 데이터 가공, isLoading = true 등 작업
  axios.get('https://APIEndPoint', config)
    .then((res) => {
    // 성공하면 전역 상태 관리에 저장
    // isLoading = false 등 작업
  }).catch((err) => {
  	// 실패
  })
}
```

위는 Vue의 전역 상태 관리 도구인 Vuex를 사용하는 방법 중 하나다. 간단하게 말하면 이제 `fetchExample`를 호출하면 데이터 가공과 같은 필요한 작업들을 수행하고, 로딩 처리를 한다. 그리고 실제로 Api 통신인 `axios get`을 하는 등의 작업을 하게 된다.

이제 해당 로직(`fetchExample`)은 무조건 가공된 데이터를 사용하고, 로딩처리를 하며, 리턴 받은 데이터를 전역 상태 관리의 State에 무조건 저장한다. 즉, `https://APIEndPoint`에 `get`요청을 하는 경우에는 무조건 위의 플로우를 따른다는 것이다. 회사 내부에서 이런 룰을 세우며 Vuex에서 관리하게 되었다. 회사에서 사용하는 하나의 패턴이 된 것이다. 초기에는 괜찮았을지도 모르지만 **규모가 커지면서** 문제가 생기기 시작한다.

![](/images/a5b47fef-894b-4ccf-94af-75d69086c3aa-image.jpg)

세상에 무조건은 없다. 그리고 '딱히 문제가 없을 것 같은데?' 라는 생각이 들면, 나중에 문제가 생기는 법이다. 예를 들면, `fetchExample` 함수를 호출하는데, 로딩 처리를 하고 싶지 않다던가 굳이 데이터를 가공하여 넘기고 싶지 않은 경우다. 또한, 어떤 경우에는 데이터 패칭 로직을 수행한 후 전역으로 관리하는 State에 할당하지 않아도 되는 상황들이 생겼다.

![](/images/1f142165-8bcf-4cd0-b810-fdd2424e8dfb-image.png)


엎친데 덮친격으로 위의 상황이 비효율적으로 처리되어 있었다. 이미 있는 함수를 이용하지 못하기 때문에, 같은 엔드포인트와 메소드(get, post 등)를 사용하는 또 다른 함수를 만들어 사용한 것이다. 

'고쳐야 하는데~' 하면서 안 고친 이유는 당연히 시간적 여유가 없다는 것이었다. 하지만 이런 부분들은 시간이 지날수록 우리의 숨통을 조여왔다. 그리고 **테스트의 절실함**을 깨달으면서 더욱 분리가 필요하다고 생각했다.

<br>

## 아.. 이쁘게 만들고 싶다..

```jsx
@Action
fetchExample(param1) {
  // 데이터 가공, isLoading = true 등 작업
  데이터패칭함수({ config })
    .then((res) => {
    // 성공하면 전역 상태 관리에 저장
    // isLoading = false 등 작업
  }).catch((err) => {
  	실패토스트(errData);
  })
}
```

가장 먼저 한 작업은 `axios get`과 같이 데이터를 패칭하는 함수 부분을 `services` 디렉터리에 따로 분리한 것이다. 이 한줄로 표현했지만 시간이 엄청 걸렸다. 그리고 본격적으로 고민한 부분은 따로 있다.

![](/images/dd31c684-847b-4790-8e66-aa648c958447-image.jpg)


그것은 바로 반복되는 `catch`문이다. 현재 회사의 서비스에서는 API요청에서 에러가 발생하면, 에러 메세지에 따라 Toast UI를 사용자에게 보여준다. 에러가 난 상황을 Title로 간단하게 보여주고, 자세한 사항은 Description으로 알려주는 것이다. 이 말은 즉, **정말 대부분의 데이터 패칭 로직의 `catch`문에 Toast를 출력하는 코드를 작성하고 있다**는 것이다. 
(물론 중간에 다른 페이지 이동한다던가의 상황에서 익셉션이 뜨는 경우는 Toaust를 띄우지 않는다.)

![](/images/fd658650-18fc-486f-ab39-56916413ed54-image.jpg)

여기서 고민거리는 2가지다.

**1. 개발자의 접근성이 용이하도록 Fetch로직 분리해보기**
프로젝트의 규모가 크다 보니 데이터 패칭 로직을 모두 분리해보면, 정~~~말 많을 것이다. 특정 카테고리마다 관리되지 않으면, 사용하는 측에서 혼란이 올 수 있다. 마크업에서 `BEM`을 사용한다고 가정하자. `velog-layout__detail-header`와 같이 "아! 벨로그에서 상세 페이지의 헤더에 관한 클래스구나!" 알아볼 수 있도록 만들고 싶었다.

**2. 데이터를 패치하는 함수에 모두 비슷한 catch를 효율적으로 붙이는 것**
반복되는 예외 처리 `catch`부분을 모든 데이터 패칭 로직에 붙이면, 매번 비슷한 코드를 데이터 패칭 로직에 붙이지 않아도 된다. 물론 일반적인 패턴은 아니지만 회사의 서비스에서는 효율적인 방법일 수 있다.

**3. 위의 패턴을 무시하는 경우도 고려하여 설계할 것**
물론 대부분의 데이터 패칭 로직은 위에서 붙인 예외 처리 부분을 사용하겠지만, 항상 예외 케이스도 생각해야한다. 해당 패턴은 무효화할 수 있는 분기 처리를 위한 것도 추가해주자.

<br>

## 개발자가 접근하기 쉽게 분리해보기

```jsx
// index.ts
export namespace Service.Api {
  export const ExamplePage1 = ServiceApiExamplePage1;
  export class Config {
    public static initConfig = {
      // 데이터 패칭시 공통으로 사용할 속성들
    };
  }
}

// examplePage1/index.ts
export namespace ServiceApiExamplePage1 {
  export const 기능1 = ServiceApiGrowthAction기능1;
  export const 기능2 = ServiceApiGrowthAction기능2;
  export const 기능3 = ServiceApiGrowthAction기능3;
  export const 기능4 = ServiceApiGrowthAction기능4;
}
```

함수형으로 분리할까 생각도 했지만, 해당 함수를 호출하는 사용자 측에서 쉽게 이해할 수 있도록 `class`형으로 작성하는 것이 좋겠다는 시니어 개발자의 조언을 들었다. 그래서 먼저 위와 같이 분리했다. `namespace`를 최상단에 두고, 페이지 별로 한번 더 `namespace`를 하위에 둔다. 그리고 하위 `namespace`에서는 기능별 또는 목적별로 카테고리화 하여 class를 두고, 여기서 데이터 패칭 함수들을 관리한다.

```jsx
export class ServiceApiGrowthAction기능1 {
	static getUser(
     config?: Config,
     disabledErrorHandler: boolean = false,
   	 ...) {
    	// 데이터 패칭(axios) 로직..
    }
}
```

이제 밖에서 사용할 때, `Service.Api.ExamplePage1.기능1.getUser` 로 상황과 목적에 맞는 Api 통신 로직을 사용할 수 있다. 단순하게 함수의 이름만 가져오는 것이 아니여서 **어느 카테고리의 어떤 기능의 함수인지 명확**해진다. 물론 이 방법이 정답이고 가장 효율적인 방법은 아닐 것이지만, 이 구조의 가독성이 좋은 점을 장점으로 삼아 사용하게 되었다.

<br>

## 반복되는 예외 처리? 

### 데이터 패칭 로직에 catch 붙여서 반환

```jsx
static getUser(
  config?: Config,
  disabledErrorHandler: boolean = false,
  ...,
) {
  	ApiWithErrorHandler(axios 로직, disabledErrorHandler, ...)
  }


static ApiWithErrorHandler(
  promise: Promise<Response>,
  disabledErrorHandler: boolean,
  ...,
) {
	return promise.catch((err) => {
    	// 대충 예외 처리 공통 로직
      	토스트(err);
      	return Promise.reject(err)
    });
}
```

가장 먼저 생각한 방법은 단순했다. 데이터 패칭 로직에 그냥 catch를 붙여서 반환해주는 것이다. 하지만 이 방법은 매번 `ApiWithErrorHandler`라는 함수로 감싸주어야 했다. 모든 데이터 패칭 로직을 저걸 감싸줘야 할까..? 라는 생각이 들었고, 그 생각을 하지 말껄 그랬다.

> 파라미터에서 ... 처리 된 부분은 실제 예제에서는 더 많은 parameter를 받지만 예시에서 생략한 것이다.

<br>

### _.forEach 로 처리해버리지 뭐~

새롭게 나온 아이디어는 "[Loadsh의 _.forEach](https://www.geeksforgeeks.org/lodash-_-foreach-method/) 문법(반복문)을 사용해서 모든 데이터 패칭 로직에 예외 처리를 부여해버리자!" 였다. 가능하기만 하다면, 모두 감싸주지 않아도 반복문 하나로 퉁 칠 수 있어서 좋다고 생각했다.

```jsx
function setErrorHandler(apiClass, className: string) {
  _.forEach(apiClass, (func: (config?: any, disableErrorHandler?: boolean, ...) =>
    Promise<any>, name) => {
    const originalFunc = func;
    apiClass[name] = (
      params?: any,
      disableErrorHandler: boolean,
      ...,
    ) => originalFunc(params, disableErrorHandler, toastOptions)
      .then((result) => result)
      .catch((err) => {
      	// 대충 예외 처리 공통 로직
        토스트(err);
        return Promise.reject(err);
      });
  });
}

setErrorHandler(Service.Api.ExamplePage1.기능1, '기능1');
```

살짝 기괴한 구조이다. `Service.Api.ExamplePage1.기능1` 자체를 `_.forEach`로 반복문을 돌리면서, 선언한 모든 함수에 접근한다. 그리고 함수의 이름(`getUser` 같은 것)을 `name`으로 받아와 **해당 함수의 파라미터를 가져와** `originalFunc`에 넣고 `catch`를 붙여 리턴한다. 즉, 모든 함수에 `catch`를 붙이고 있는 것이다. 하지만 위의 전제에는 잘못된 가정이 있다. 

바로 해당 함수의 파리미터를 가져온다는 부분이다. 일단 이 자체가 틀렸다. 저것은 해당 함수의 파라미터를 가져오는 것이 아니라 재정의 하게 된다. 예를 들어, `getUser`라는 함수는 `disableErrorHandler`를 `false`로 초기화 했지만 실제로 `setErrorHandler` 함수에 사용된 `catch`부분에서 출력해보면 `undifined`이다.

하지만 실제로 `getUser`를 사용하는 측에서 `true` 또는 `false`를 아규먼트로 넣어준다면, 그 값이 찍히긴 한다. **즉, 문제점은 함수를 선언할 때 파라미터에 초기화를 해준 경우 해당 값을 `catch`에 하나도 사용할 수 없다는 것이다**.

```jsx
function setErrorHandler(toastOptions?: ToastOptions = { ... }) {
	// ...
}
```

이 문제는 난감한 상황들을 야기했다. 예를 들면, api마다 토스트에 대한 옵션이 다른데 외부에서 토스트에 대한 옵션을 커스텀하게 보낼 경우도 고려한 경우이다. 꼭 이런 경우가 아니더라도 파라미터에 초기값이 필요한 경우는 다 문제가 될 것이다.

```jsx
const funcString = myFunc.toString(); // 함수 객체를 문자열로 변환합니다.
const defaultB = funcString.match(/b\s*\=\s*(\d+)/)?.[1]; // "b" 파라미터의 기본값을 가져옵니다.
const defaultC = funcString.match(/c\s*\=\s*(\d+)/)?.[1]; // "c" 파라미터의 기본값을 가져옵니다.
```

결국 원래 함수의 파라미터 값들을 가져오는 방법을 찾아보았지만 해결책은 딱히 없었다. **stack overflow**에서도 함수를 string으로 인식하고 정규표현식을 사용해서 파라미터 값을 가져오는 말도 안되는 방법을 제시하고 있었다. 그리고 생각에 잠겼다. **그럼 지금 내가 하는 방법은 말이 되는건가?**

![](/images/d4cbb284-ae26-4017-8103-f371396c3c96-image.png)

그래도 혹시나 방법이 있을까 싶어 요즘 핫한 [Chat GPT](https://openai.com/blog/chatgpt)에도 물어봤다. 몇 번의 시도는 있었지만 그래도 나의 질문을 잘 이해하고 원하는 쪽으로 코드를 제시해주었다. 여기서 나는 `Proxy 객체` 라는 것이 JavaScript에 존재하고 있다는 것을 처음 알기도 했다. 그래서 신나게 해당 문법에 대해 공부했지만 결국 이것도 위의 문제점을 해결해주지는 못했다. 그래도 새로운 지식 하나 배운 셈으로 쳤다 ^-^. 실제로 어떤 부분에서 효율적으로 [Proxy 객체와 Reflect](https://ko.javascript.info/proxy)를 사용하는지 궁금해서 다음에 한 번 찾아볼 예정이다.

<br>

### 다시 돌아와서.. 함수 생성

다시 첫 번째 방법을 생각해보았다. 과연 `ApiWithErrorHandler` 와 같이 `catch` 를 붙여주는 함수를 만들어서 사용하는 것이 나쁜 패턴일까? 생각해보면 꺼려졌던 이유는 모든 데이터 패칭 로직에 `ApiWithErrorHandler`으로 계속 감싸주는 부분이었다. 보기에도 불편하고, 데이터 패칭 로직 하나를 추가할 때 매번 감싸줘야 하는게 귀찮았다.

```jsx
// index.ts

export interface RequestModel<T> {
  config?: AxiosRequestConfig;
  requestModel?: T;
  disableErrorHandler?: boolean;
  toastOptions?: ToastOptions;
}

export function get<T>({ config, disableErrorHandler, ..., }: ApiGetOptions): Promise<T> {
  return get<T>(url, config)
    .catch((err) => {
      // 대충 예외 처리 공통 로직
      토스트(err);
      return Promise.reject(err);
  });
}
```

그래서 사수분과 함께 생각한 방법은 `get`에 대한 함수를 만드는 것이었다.

```jsx
  static getUser({
    config,
    disableErrorHandler = false,
    ...,
  }: RequestModel<ExampleRequest>): Promise<ExampleResponse> {
    return get<ExampleResponse>({,
      config,
      disableErrorHandler,
      ...,
    });
  }
```

이제 그냥 `catch`가 붙어 있는 `get`요청을 그냥 `get`이라고 선언하여 사용할 수 있게 되었다.

<br>

### 하지만 이게 좋은 패턴인가?

위의 방식으로 리팩토링을 쭉 진행했다. 하지만 막상 다 하고 보니, `getUser` 함수는 토스트를 띄우는 로직과 밀접하게 연관되어 버렸다. `getUser`가 정상적으로 동작하는지 확인하기 위해 테스트 코드를 작성하게 되면, 예외처리에서 토스트를 띄우는 부분 때문에 코드가 추가될 것이다. 그리고 api 통신하는 함수는 api 통신만 담당하는게 맞는 것 같다. 하지만 현재 프로젝트에서는 95% 정도 예외처리로 토스트ui를 띄어주고 있어서.. 고민이 된다.

![](/images/d5712aee-ad34-46f1-967e-16960db8e4d4-image.jpg)

아니면 차라리 예외 처리를 붙이는 `withErrorHandler`와 같은 함수를 하나 만들고, 모든 함수를 감싸주는 것이 나았을까? 라는 생각도 든다. 이 방법을 사용하면 정말 하나의 목적을 수행하는 api 통신 함수 하나, `getUserWithErrorHandler` 처럼 에러 핸들러를 동반한 함수 하나가 만들어진다. 이러면 95%의 api 통신 로직은 `WithErrorHandler`로 감싸는 함수가 하나 더 만들어진다.

## 마무리

이미 리팩토링을 진행했지만, 정말 아직도 많은 고민이 된다. '그럴거면 확실히 정하고 하지 왜 리팩토링했어?' 라고 할 수 있지만, 많은 시간은 투자하여 1차로 리팩토링한 것이 의미가 없진 않다. 리팩토링 작업을 하면서 이것저것 관심사 분리를 했기 때문에, 위의 고민에서 좋은 방법이 있어 다시 리팩토링 하게 되면,  훨씬 수월하게 진행할 수 있을 것이다.