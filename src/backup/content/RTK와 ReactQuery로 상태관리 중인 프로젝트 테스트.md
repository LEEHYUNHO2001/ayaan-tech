---
title: "RTK와 ReactQuery로 상태관리 중인 프로젝트 테스트"
description: "상태 관리 프로젝트에 맞는 테스트 요깃지!! (testing library)"
date: 2022-07-04T01:00:17.867Z
tags: ["JavaScript","React","TDD","next","test","typescript","상태관리"]
---
# 글을 작성하게된 계기

처음에는 테스트 코드를 작성한다는 것에 대한 두려움이 매우 컸다. 프론트의 테스트에는 단위, 통합, E2E 3종류가 있는데 왜 이렇게 종류가 나뉘었는지도 모르겠고 각각의 테스트 종류마다 사용하는 라이브러리가 다양하기 때문이었다. 

프론트를 공부하면서 테스트는 어려운 것이라는 생각이 자리잡고 있었기 때문에 공부를 하려고 마음먹고 글 조금읽다가도 다른 공부로 넘어간 경우가 많았다. 그러다 결국 [테스트를 처음 공부하는 프론트엔드 개발자의 개념 다지기](https://velog.io/@leehyunho2001/%ED%85%8C%EC%8A%A4%ED%8A%B8%EB%A5%BC-%EC%B2%98%EC%9D%8C-%EA%B3%B5%EB%B6%80%ED%95%98%EB%8A%94-%ED%94%84%EB%A1%A0%ED%8A%B8%EC%97%94%EB%93%9C-%EA%B0%9C%EB%B0%9C%EC%9E%90%EC%9D%98-%EA%B0%9C%EB%85%90-%EB%8B%A4%EC%A7%80%EA%B8%B0) 글을 작성하기로 마음을 먹으면서 테스트에 대해 제대로 공부하게 되었다. 결정적으로 [Jest + react-testing-library 환경에서 TODO 프로젝트 TDD로 설계하기](https://velog.io/@leehyunho2001/Jest-react-testing-library-%ED%99%98%EA%B2%BD%EC%97%90%EC%84%9C-TODO-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-TDD%EB%A1%9C-%EC%84%A4%EA%B3%84%ED%95%98%EA%B8%B0) 글을 작성하면서 생각보다 테스트 코드를 작성하는것이 어렵지 않을 것 같다는 생각을 했다. 그래.. TODO가 아닌 조금 더 복잡한 환경에 있는 프로젝트를 테스트하기 전까지는..

![](/images/ba8730d3-a62a-4e16-8052-543cff7fd5cc-image.png)

오늘은 눈물 없이 보지 못할 **"테린이의 RTK 프로젝트 테스트 환경 만들어보기"** 이다. 이 글은 [전역 상태 관리를 RTK](https://velog.io/@leehyunho2001/Next%EC%97%90%EC%84%9C-redux-toolkit-%EC%82%AC%EC%9A%A9%ED%95%98%EA%B8%B0)를 사용하고 있지만, 다른 상태관리 라이브러리(Recoil, React Query 등)를 사용하는 개발자도 이 글이 분명 도움이 될 것이다.

<br>

## 테스트 대상

![](/images/f5d66bdd-72e4-40d7-8d24-22bc46e5657e-image.png)

일단 진행하던 프로젝트에 간단한 input창을 테스트 하려고 했다. 구글에 무언가를 검색할때 사용하는 검색바같은것 말이다.

<br>

```jsx
// useSearchInput
export const useSearchInput = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setInputValue(value);
    },
    [inputValue]
  );

  return {
    inputValue,
    setInputValue,
    handleInputValue,
  };
};

// SearchForm.tsx
<Input
  type="text"
  value={inputValue}
  onChange={handleInputValue}
  placeholder="텍스트를 입력하세요."
  />
```

구글의 검색창을 만들기 위해서는 일단 텍스트를 입력할 `input`태그가 필요하다. `SearchForm` 컴포넌트에서 검색창 UI를 생성한다. 그리고 이 `input` 태그를 다룰 `useSearchInput`이라는 커스텀 훅을 생성했다. 이제 `input`에 텍스트를 입력하면 실시간으로 입력되는 UI가 확인되고, `inputValue`에 해당 텍스트가 담길 것이다.

검색 버튼을 누르면, `form` 태그의 `onSubmit`에서 `inputValue`으로 데이터를 요청하면 검색창 완성이다. 구글에 치킨을 입력하면 치킨 사진이 나오는 것처럼 말이다.

<br>

## 아니.. 이개 외않되??

```jsx
//SearchForm.test.tsx
import { fireEvent, render, screen } from '@testing-library/react';

import { SearchForm } from '@/components';

describe('<SearchForm />', () => {
  const setup = () => {
    const handleInputValue = jest.fn();
    const utils = render(
      <SearchForm handleInputValue={handleInputValue} />
    );
    const input = screen.getByPlaceholderText('텍스트를 입력하세요.');
    const submit = screen.getByText('검색');
    return {
      ...utils,
      input,
      handleInputValue,
      submit,
    };
  };

  it('input handle test', () => {
    const { input } = setup();
    fireEvent.change(input, {
      target: {
        value: 'a man',
      },
    });
    expect(input).toHaveAttribute('value', 'a man');
  });
});
```

TODO 프로젝트에서 했던것 처럼 간단하게 `input` 태그를 핸들링하는 부분부터 테스틑 하려고 했다. 

![](/images/1474cd94-9159-4dc7-beb6-cf4f1dd6d840-image.png)

하지만 TODO 프로젝트와 나의 프로젝트에는 많은 차이점이 있었다. 가벼운 마음으로 시도했던 과거의 나를 보면 마음이 아프다.

<br>

## 첫 번째 에러와 6시간 데이트

![](/images/8f5d4323-c371-43ae-b646-114b8d9532a9-image.png)

사실 위에서 설명하지는 않았지만, `SearchForm`에는 Redux에서 사용하는 `dispatch`를 사용하고 있었다. `onSubmit`이 되는 순간 입력했던 텍스트를 이용하여 데이터를 요청하는데, 해당 데이터중에 전역으로 관리할 부분이 있었기 때문이다.

하지만 간단한 `input` 테스트를 하고 있어 dispatch를 선언해주지 않아도 전혀 문제가 없는데 왜 여기서 테스트 실패를 하는 걸까?

<br>

> could not find react-redux context value; please ensure the component is wrapped in a `<Provider>`

에러 메세지를 확인해보니 무슨 말인지는 알겠다. 

<br>

```jsx
//_app.tsx
const App = ({ Component, pageProps }: AppProps) => (
  <QueryClientProvider client={queryClient}>
    <Component {...pageProps} />
  </QueryClientProvider>
);

export default wrapper.withRedux(App);
```

Redux를 사용하기 위해서는 `_app.tsx`에서 `wrapper.withRedux(App)`와 같이 감싸줘야 한다. 이것은 다른 상태관리도 비슷하다. recoil도 RecoilRoot로 감싸고, react-query도 `QueryClientProvider`로 감싼다.

우리는 테스트 할때 `render`를 사용하여 컴포넌트를 렌더링 하게 된다. 이것도 실제 프로젝트에 셋팅되어 있는것 처럼 Provider들을 감싸주라는 에러 메세지인 것이다. 이제 상황 파악은 확실하게 했지만, 막막했던 부분은 그래서 **그걸 어떻게 하는데?** 라는 생각이었다.

<br>

### 테스트에도 Provider 설정하자!

![](/images/7b9edfa1-016f-4d86-8011-eb5e32fb673f-image.png)

테스트에도 Provider를 셋팅하여 에러를 해결해주기 위해서 우리는 2개의 파일을 생성할 것이다. 여기서 부터는 Redux ToolKit(RTK)의 내용이 들어간다. RTK가 아닌 [Redux를 이용한 testing library](https://github-wiki-see.page/m/boostcamp-2020/Project15-C-Client-Based-Formula-Editor/wiki/jest----@react-testing-library-%EB%A1%9C-Redux-%EC%82%AC%EC%9A%A9%ED%95%98%EB%8A%94-%EC%BB%B4%ED%8F%AC%EB%84%8C%ED%8A%B8-%ED%85%8C%EC%8A%A4%ED%8A%B8%ED%95%98%EA%B8%B0)가 보고 싶은 경우 해당 블로그를 참고하자.

<br>

#### reducer와 store

```jsx
//store/modules/search.ts
const initialState = { searchInput: ''};

const searchSlice = createSlice({
  name: 'searchData',
  initialState,
  reducers: {
    setSearchData: (state, action: PayloadAction<SearchActionPayload>) => {
      state.searchInput = action.payload.searchInput;
    },
  },
});

export const { setSearchData } = searchSlice.actions;
export default searchSlice.reducer;
```

RTK에서 전역 상태 관리를 사용하기 위해서는 `createSlice`를 이용하여 `reducer`를 생성하게 된다. 나는 `searchSlice`라는 최근 검색어를 저장하는 `reducer`를 만들었다.

그리고 이 외에도 여러개의 `reducer`를 생성한다면, `store`에서 이 `reducer`들을 `combineReducers`로 묶어줄 수 있다. 이것을 이용하여 `configureStore`로 스토어를 생성한다. 이 부분을 테스트 store에서도 구현해야 한다.

<br>

#### 테스트 store

```jsx
//tests/store.ts
import type { PreloadedState } from '@reduxjs/toolkit';
import { combineReducers, configureStore } from '@reduxjs/toolkit';

import otherSlice from '@/store/modules/other';
import searchSlice from '@/store/modules/search';

const rootReducer = combineReducers({
  other: otherSlice,
  search: searchSlice,
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
```

테스트의 store에서도 여러개의 `reducer`들을 `combineReducers`로 묶고, `configureStore`로 스토어를 생성하고 있다. 초기값이 있다면 설정할 수 있도록 `preloadedState`도 넣어주었다. `RootState, AppStore, AppDispatch`는 `testUtils.ts`에서 사용할 타입들이다.

<br>

#### store를 이용하여 Provider로 감싸기

```jsx
//tests/testUtils.ts
import type { PreloadedState } from '@reduxjs/toolkit';
import type { RenderOptions } from '@testing-library/react';
import { render as rtlRender } from '@testing-library/react';
import { PropsWithChildren } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Provider } from 'react-redux';

import { AppStore, RootState, setupStore } from './store';

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>;
  store?: AppStore;
}

const render = (
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return (
      <Provider store={store}>
        {children}
      </Provider>
    );
  }

  return { store, ...rtlRender(ui, { wrapper: Wrapper, ...renderOptions }) };
};

export * from '@testing-library/react';
export { render };
```

Provider로 감싸주었다. 여러가지 글을 참고하면서 에러를 해결했지만 [CodeSandBox](https://codesandbox.io/s/testing-react-redux-useselector-j3ynk?file=/src/test-rtl/test-utils.tsx)와  [Redux 공식 문서](https://redux.js.org/usage/writing-tests)에서 정말 많은 도움을 받았다. CodeSandBox는 확인해보면 뭔가 더 어렵다.. 아직 나의 수준으로는 전부 이해하기는 힘들어서 공식 문서의 방법을 사용했다. (저거 보다가 시간이 더 걸렸다.)

<br>

#### No QueryClient set

![](/images/d2c2adec-2265-457e-b572-5505878b1869-image.png)

Provider는 아직 한발 남았다.

> No QueryClient set, use QueryClientProvider to set one

처음에 언급한 `_app.tsx`를 보면, React Query도 사용하고 있으므로 이것 또한 Provider 작업을 해주자.

<br>

```jsx
//tests/testUtils.ts

function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </Provider>
  );
}
```

이제 쉽게 에러를 해결할 수 있다. `testUtils.ts`의  `Wrapper`에 `QueryClientProvider`만 추가하자. 

<br>

#### test 파일에서의 적용

```jsx
import { fireEvent, render, screen } from './testUtils';
```

원래 `render`와 같은 메소드는 `testing-library`에서 가져왔었다. 이제는 `testUtils`에서 가져오면 된다. 이 파일에서 `render`에 대한 모두 설정해줬기 때문이다. 이렇게 **Provider에 대한 문제는 해결**할 수 있었다.

<br>

## 이번에는 useSelector 에러

![](/images/a690f617-7f41-48c5-b983-9b814388e352-image.png)

암담 했다. 많은 서치와 다양한 코드를 적용해보며 `Provider`문제를 해결했는데, `dispatch`의 바로 다음줄에서 또 에러가 발생한 것이다. 마치 군대에서 다양한 일과로 3일은 지난 느낌인데, 자고 일어나니 하루 지난 기분이다.

<br>

![](/images/a131f9ed-168f-452e-b6ed-caf5a5d3067b-image.png)

useSelector를 사용한 부분에서 에러가 발생한 것이다. 프로젝트에서는 정상적으로 잘 돌아가는데, 테스트에서만 실패하므로 당연히 [useSelector를 mocking](https://stackoverflow.com/questions/56827300/how-to-test-a-component-using-react-redux-hooks) 해야하는줄 알았다. "나는 그냥 input handle만 테스트하려고 하는건데, 왜 useSelector를 mocking 해줘야 할까?" 라는 생각을 하면서도 시도했다. 하지만 역시 실패했다.

<br>

### useSelector의 구조 분해 할당

> TypeError: Cannot destructure property 'searchUrl' of '(0 , _reactRedux).useSelector(...)' as it is undefined.

```jsx
// SearchForm.tsx
// X
const {searchData} = useSelector(({ searchData }: SearchUrlData) => searchData)

// O
const search = useSelector(({ searchData }: SearchUrlData) => searchData);
```

에러 메세지에 집중해보았다. 프로젝트에서 useSelector에 구조 분해 할당을 사용한 부분을 리팩토링 했다.

<br>

#### 구조 분해 할당 문제점

프로젝트에서는 잘 돌아가다가 왜 테스트에서 막히는 걸까? 다른 부분에서 구조 분해 할당을 사용하면 당연히 에러가 발생하지 않는다. 하지만 useSelector에서 구조 분해 할당을 하면 에러가 발생하므로, 여기에 문제가 있다고 보는것이 맞다.

<br>

```jsx
//예시
const { a , b } = useSelector((state) => state)

const a = useSelector((state) => state.a);
const b = useSelector((state) => state.b );
```

실제로 위의 코드와 아래의 코드는 차이점이 있다. 구조 분해 할당으로 값을 가져오면 state 전체 변화에 따라 리렌더링이 발생한다. state에서 a와 b를 제외한 다른 값이 변경되도 state는 변경되므로 리렌더링이 발생한다는 것이다. 이 문제점 때문에 테스트에서 막아준 것이 아닐까? 덕분에 새로운 사실을 알게 되었다^^ (정~~~~말 고맙다~~~)

<br>

#### useSelector 여러줄 사용하기 싫은데?

useSelector의 최적화를 고려해보면, 구조 분해 할당으로 state를 받아오면 안된다는 것을 알았다. 하지만 여러 줄의 코드를 입력해서 각각 받아오기도 싫다. 이 경우에 `shallowEqual`를 사용해주면 된다.

```jsx
const { searchUrl } = useSelector(({ searchData }: SearchUrlData) => searchData, shallowEqual);
```

이렇게 구조 분해 할당을 useSelector에서 사용해도 최적화에 문제가 되지 않는다. 하지만... 다시 처음에 useSelector에서 발생했던 에러가 나타났다.

<br>

#### 테스트에서 구조 분해 할당 문제 해결

```jsx
  const { searchUrl } = useSelector(
    ({ searchData }: SearchUrlData) => searchData || {},
    shallowEqual
  );
```

> provide a default value in the selector or after the selector. [freecodecamp](https://forum.freecodecamp.org/t/typeerror-cannot-destructure-property-product-of-productdetails-as-it-is-undefined/416353/2)

결국 방법을 찾았다. 우리는 보통 데이터가 없을 경우 옵셔널 체이닝(`?.`)을 사용한다. 이와 비슷하게 useSelector에서도 데이터를 받아올 때, 데이터가 없을 경우를 생각하여 초기값을 부여해야 하는 것이다. 사실 간단하게 생각할 수 있는 문제지만 테스트에만 집중하다보니 계속 어렵게 돌아간 것 같다.

<br>

### 드디어 모든 에러 해결

```jsx
// SearchForm.test.tsx
describe('<SearchForm />', () => {
  const setup = () => {
    const handleInputValue = jest.fn();
    const utils = render(
      <SearchForm handleInputValue={handleInputValue} />
    );
    const input = screen.getByPlaceholderText('텍스트를 입력하세요.');
    const submit = screen.getByText('검색');
    return {
      ...utils,
      input,
      handleInputValue,
      submit,
    };
  };

  it('input handle test', () => {
    const { input } = setup();
    fireEvent.change(input, {
      target: {
        value: 'a man',
      },
    });
    expect(input).toHaveAttribute('value', 'a man');
  });
});
```

드디어 테스트가 성공했다. 겨우 `input` 하나 handle하는 테스트 코드를 작성했을 뿐인데.. 판도라 상자를 만진 기분이다. (아직도 엄청난 것들이 기다리고만 있을 것 같다.)

<br>

## 이번에는 경고

```jsx
// SearchForm.test.tsx
  it('button click test', async () => {
    const { input, button, store } = setup();
    fireEvent.change(input, {
      target: {
        value: 'cookie',
      },
    });
    fireEvent.click(button);
    expect(store.getState().search.searchInput).toEqual('cookie');
  });
```

`input`을 다루는 테스트는 통과했다. 이제 한 걸음 더 나아가 `onSubmit`버튼을 눌렀을 때, 실제로 `searchSlice reducer`의 전역 상태 변수인 `searchInput`에 값이 들어가는지 확인하고 싶었다. (실제 검색창에 텍스트를 입력하고 검색 버튼을 누르면, inputValue가 전역 상태 관리가 될 수 있도록 searchInput에 dispatch가 되도록 설계했다.)

<br>

위의 테스트는 `input`에 `cookie`를 입력한 후 버튼을 누르면 `store`의 `searchInput`에 정상적으로 저장되는지 확인하는 테스트이다.

![](/images/df1ede78-abc0-4fd9-a51e-4d1607d641a4-image.png)
![](/images/0fa469e8-98b9-42f0-9272-584081e3523b-image.png)

테스트가 통과했다. 하지만 문제가 있는지 경고를 해주고 있었다. 개발자라면 빨간색 경고 글씨는 그냥 넘어갈 수 없다 :(

<br>

### 비동기를 이용하여 해결하기

`act`를 사용하라는 것은 알겠는데, fireEvent를 act안에 넣어도 해결이 되지 않았다. 먼저 act란 무엇인지 부터 알아보자.

<br>

#### act

```jsx
test('act test', () => {
  act(() => {
    // DOM에 반영하고 싶은 코드
  });
  // act안의 코드가 DOM에 반영되었다고 가정하고 테스트할 코드
});
```

act는 인자로 받은 함수를 실행시켜서 가상 DOM에 적용시킨다. React가 브라우저에서 실행될 때와 비슷한 환경에서 테스트할 수 있게 도와주는 메소드인 것이다. [미디움글 참고](https://flyingsquirrel.medium.com/testing-library-react%EC%9D%98-act%EB%8A%94-%EC%96%B8%EC%A0%9C-%EC%8D%A8%EC%95%BC%ED%95%A0%EA%B9%8C-c6036a8cd4b3)

보통 userEvent, render 등의 메소드들은 이미 act로 감싸져 있다고 한다.

<br>

#### waitFor로 해결?

먼저 **not wrapped in act warning** 에러는 컴포넌트에서 `setTimeout`과 같은 함수를 사용하는 경우 발생할 수 있다. 이 경우는 Fake Timer를 사용하여 해결할 수 있다.

이 에러가 발생하는 또 다른 원인은 **비동기로 API를 호출하거나, 렌더링이나 업데이트를 하기 전에 테스트가 종료**되면 이와 같은 현상이 발생한다. 이 경우 보통 `waitFor` 메소드를 사용하여 쉽게 해결할 수 있다.

<br>

```jsx
await waitFor(() => expect(...))
```

하지만 나의 경우 이 방법으로는 해결되지 않았다. 그래서 `fireEvent`도 한번 `waitFor`로 감싸보았다.

<br>

```jsx
await waitFor(() => fireEvent.click(button));
```

이제 테스트를 수행할 경우 빨간색 경고가 나타나지 않는다.

![](/images/58e085f0-49cb-4533-ac19-31da21e91f74-image.png)

하지만 설정해준 eslint에서 걸렸다. 이 방법은 피하는게 좋은 코드인가 보다.

<br>

#### act, async/await, promise로 해결

```jsx
  it('button click test', async () => {
    const promise = Promise.resolve();
    const { input, button, store } = setup();
    fireEvent.change(input, {
      target: {
        value: 'cookie',
      },
    });
    fireEvent.click(button);
	expect(store.getState().search.searchInput).toEqual('cookie');
    await promise
  });
```

결국 현재 이 에러가 발생하는 이유는 비동기적으로 상태가 업데이트 되기 전에 테스트가 종료되기 때문이다. 테스트를 전부 수행하여 테스트가 종료되기 전에 promise를 기다리도록 해주었다. 하지만 React는 이 사실을 모르기 때문에 여전히 경고는 발생하고 있다.

<br>

```jsx
  it('button click test', async () => {
    const promise = Promise.resolve();
    const { input, button, store } = setup();
    fireEvent.change(input, {
      target: {
        value: 'cookie',
      },
    });
    fireEvent.click(button);
	expect(store.getState().search.searchInput).toEqual('cookie');
    await act(() => promise)
  });
```

act를 사용하여 React가 이 사실을 알게 해주었다. React는 promise가 실행되는 동안 발생하는 모든 상태 업데이트들을 일괄처리하게 된다. 드디어 해결한 것이다. [egghead.io 참고](https://egghead.io/lessons/jest-fix-the-not-wrapped-in-act-warning)

<br>

### waitForElementToBeRemoved

```jsx
await waitForElementToBeRemoved(()=> screen.getByTest)
```

DOM에서 요소가 제거되는 것을 기다리고 싶다면 `waitForElementToBeRemoved`를 사용할 수도 있다. 

<br>

## 마무리

![](/images/4ccfbf97-cc41-4fa2-89e2-95e963591a16-image.png)

역시 코딩은 실전이다. 아직도 나는 테스트 코드에 대해 빙산의 일각정도만 알고 있다. Custom Hooks과 다양한 비동기 함수를 테스트 하는 방법, 좋은 테스트란 무엇인가? 와 같은 주제로 더 공부해볼 예정이다.

