---
title: "Next에서 Redux ToolKit 사용하기"
description: "Redux를 적용하려다 Redux ToolKit을 적용하게 되었다."
date: 2022-04-27T01:07:01.062Z
tags: ["React","next","상태관리"]
---
# Redux-toolkit

![](/images/9f71c3e9-6de6-42e8-a795-ee276edae16f-image.png)

최근에 프로젝트의 상태관리를 ContextAPI 에서 Recoil로 변경했었다. 하지만 사용하다 보니 예전에 Redux를 사용했을 때, DevTool을 요긴하게 사용했던 경험과 Recoil의 일부 API들이 신뢰성이 부족하다는 생각이 들어 상태관리를 다시 Recoil에서 Redux로 변경하게 되었다.

<br>

```bash
yarn add redux react-redux next-redux-wrapper @reduxjs/toolkit 

yarn add redux-devtools-extension redux-logger yarn add @types/redux-logger --dev
```

하지만 Redux를 사용하려다 보니 의미없이 늘어나는 코드량이 마음에 걸렸다. 그래서 적용하게 된 것이 Redux ToolKit이다. 즉, Redux의 보일러플레이트를 줄이기 위해 Redux ToolKit를 공부하게 되었다.

먼저 전체적으로 어떻게 동작하는지 프로젝트 셋팅을 해보고 자세하게 알아보자.

<br>

## 프로젝트에 Redux ToolKit 셋팅

### reducer

```jsx
//store/module/index.ts
import { combineReducers } from '@reduxjs/toolkit';
import { Action } from '@/types/state/Action';
import { HYDRATE } from 'next-redux-wrapper';
import { CombinedState } from 'redux';
import A_Data from './A_Data';
import B_Data from './B_Data';

const reducer = (state: CombinedState<any>, action: Action) => {
  if (action.type === HYDRATE) {
    return { ...state, ...action.payload };
  }
  return combineReducers({ A_Data, B_Data })(state, action);
};

export default reducer;
```

먼저 store 디렉터리를 생성하고, module 디렉터리에 index.ts 를 설정하자. 프로젝트를 설계하다보면 여러개의 리듀서들이 생기는데, 파일 하나에서 작업하면 코드가 매우 길어져 가독성이 떨어지기 때문에 분리하게 된다. 여기는 분리된 리듀서들을 합쳐주는 공간이다. [만약에 HTDRATE에 대한 개념이 없다면 클릭](https://velog.io/@leehyunho2001/Hydrate)

<br>

### createSlice

```jsx
//store/module/A_DATA.tsx
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { A_DataProps } from '@/types/state/A_DataProps';

const initialState: A_DataProps = {
  title: '',
  description: '',
};

const counterSlice = createSlice({
  name: 'A_DataState',
  initialState,
  reducers: {
    setA_Data: (state, action: PayloadAction<A_dataProps>) => {
      state.title = action.payload.title;
      state.description = action.payload.description;
    },
    setWriteTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
  },
});
export const { setA_Data, setWriteTitle } = counterSlice.actions;
export default counterSlice.reducer;

```

reducer에서 A_Data와 B_Data를 `combineReducers`해주고 있었다. 여기서는 뭐하는지 알아보자.

먼저 Redux ToolKit(RTK)는 특이하게 `createSlice`라는 것을 사용한다. RTK에서 Redux의 보일러플레이트를 줄이기 위해 제공하는 `createAction`, `createReducer` 함수 조차도 작성하지 않아도 되게 해주는 것이 `createSlice`이다. 이에 대해서는 나중에 다루겠다.

상태 관리할 `initialState`을 초기화하고, 나중에 dispatch하면서 함수처럼 사용할 부분을 reducers에서 설계하면 된다. setA_Data는 전체 상태값을 넣고, setWriteTitle는 title만 수정하기 위한 것이다.

<br>

#### dispatch

```jsx
//Component
import { useDispatch, useSelector } from 'react-redux';
import * as A_DataActions from '@/store/modules/A_Data';

const Component = () => {
  const dispatch = useDispatch();
  const A = useSelector(({ A_Data }: stateProps) => A_Data);
}

  const getA_Data = async () => {
    try {
        const res = await axios({
          method: 'get' as Method,
          url: '/api/A_Data',
        });
        dispatch(A_DataActions.setA_Data(res.data));
    } catch (err) {
      console.log(err);
    }
  };
```

위에서 설정한 것들을 컴포넌트에서 어떻게 사용하는지 알아보자. 상태값을 가져올 때는 `useSelector`를 사용하고, dispatch는 `useDispatch`를 사용한다.

API에 get요청을 보내서 받아온 title과 description이 담긴 res.data를 `setA_Data`를 사용하여 dispatch하고 있다.

<br>

### store

```jsx
//store/index.ts
import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import logger from 'redux-logger';
import reducer from './modules';

const makeStore = (context: {}) => {
  console.log(context, 'makeStore');
  return configureStore({
    reducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',
  });
};
export const wrapper = createWrapper(makeStore, { debug: process.env.NODE_ENV !== 'production' });
```

RTK는 Redux의 `createStore`를 추상화한 버전인 `configureStore`를 이용하여 스토어를 생성한다. 

reducer는 `combineReducers`해서 생성했던 `store/module/index.ts` 경로의 reducer를 넣어주고 있다. 그리고 미들웨어에 처음에 설치했던 logger를 추가하고 있는데, 액션이 디스패치될 때마다 개발자 도구 콘솔에 로그를 찍을 수 있다.

이 외에도 스토어의 초기값을 설정할 수 있는 `preloadedState`와 미들웨어보다 먼저 호출해야 할 것들을 정의하는 `enchaners`가 있다.

```jsx
enhancers: (defaultEnhancers) => [reduxBatch, ...defaultEnhancers],
```

보통 배열로써 사용하지만 콜백 함수로도 가능하다.

<br>

### 셋팅 마무리

이렇게 RTK를 사용하는 간단한 셋팅을 해보았다. 간단하게 전체적인 흐름을 본 후에 RTK에서 사용하는 메서드들을 알아보는 것이 이해가 더 잘될 것 같아서 순서를 이렇게 잡았다. 이제 더욱 깊고 자세하게 알아보자.

<br>

## 하나 하나 깊게 알아보기

###  configureStore

```jsx
const preloadedState = {
  todos: [
    {
      text: 'lunch',
      completed: true,
    },
  ],
  visibilityFilter: 'SHOW_COMPLETED',
}

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState,
  enhancers: [reduxBatch],
})
```

Redux에서는 store를 생성할 때 `createStore`를 사용했지만, RTK에서는 `configureStore`를 사용한다. 

미들웨어를 따로 설정하지 않으면 `redux-thunk`를 추가하고, devTools 도 따로 작성하지 않아도 [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)를 개발 환경에서 활성화 해준다.

리덕스에서 미들웨어는 dispatch된 action이 reducer에 도달하기 전에 중간 영역에서 개발자의 입맛에 맞게 기능을 확장할 수 있다. logger도 리듀서에 도달하기 전에 콘솔 로그를 찍고 있는 것이다. 심지어 커스텀 미들웨어도 생성할 수 있다.

<br>

> [redux-batch](https://www.npmjs.com/package/@manaflair/redux-batch)

TODO 프로젝트에 `preloadedState`를 설정함으로써 기본적으로 `lunch` 라는 할일이 체크된 채로 있을 것이다.

<br>

### createReducer

Redux에서 액션에 맞게 상태를 변화시키던 리듀서 부분이다. immer 라이브러리를 사용해서 쉽게 불변성을 지켜주고 코드량도 줄이며 사용했었는데, switch문을 사용하다보니 반복되는 부분이 아직도 많았다.

```jsx
const counterReducer = createReducer(0, {
  increment: (state, action) => state + action.payload,
  decrement: (state, action) => state - action.payload
})
```

RTK에서는 코드가 매우 단순해졌다. `case: 'increment': return ~~~` 하던 부분이 사라진 것이다. 이렇게 작성하는 것을 Map Object 표기법이라고 하는데 JavaScript에서 유효하다고 한다.(TypeScript에서 사용해도 문제는 없었지만..)

<br>

```jsx
const counterReducer = createReducer(initialState, (builder) => {
  builder.addCase(increment, (state) => {state + action.payload})
  builder.addCase(decrement, (state) => {state - action.payload})
})
```

그래도 TypeScript를 사용한다면 여기서 유효하다는 Builder Callback 표기법을 사용하자.

- builder 객체
  - addCase : 액션 타입과 맵핑되는 케이스 리듀서를 추가하여 액션을 처리
  - addMatcher : 새로 들어오는 모든 액션에 대해서 주어진 패턴과 일치하는지 확인하고 리듀서를 실행
  - addDefaultCase : 아무것도 실행 안될경우 기본 케이스 리듀서 실행

**createReducer가 기존 Redux보다 간단하지만 필자는 이것보다 더 간단한 createSlice를 사용한다.** 그래도 TypeScript에서 extraReducers를 사용하면 이와 같이 작성해야하기 때문에 알아두자.

<br>

### createAction

```jsx
function increment(amount: number) {
  return {
    type: INCREMENT,
    payload: amount,
  }
}
```

action도 이제 이렇게 길게 안써도 된다.

```jsx
const increment = createAction('counter/increment')
```

한줄로 끝난다.. `createSlice`에서는 이 액션조차 생성하지 않아도 된다. 하지만 역시 TypeScript에서 extraReducers를 사용하려면 action 생성하는 방법도 알고는 있어야 한다.

<br>

### createSlice

```jsx
const incrementBy = createAction<number>('incrementBy')
const decrementBy = createAction<number>('decrementBy')

const counter = createSlice({
  name: 'counter',
  initialState: 0 as number,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
    multiply: {
      reducer: (state, action: PayloadAction<number>) => state * action.payload,
      prepare: (value?: number) => ({ payload: value || 2 }), // fallback if the payload is a falsy value
    },
  },
  // "builder callback API", recommended for TypeScript users
  extraReducers: (builder) => {
    builder.addCase(incrementBy, (state, action) => {
      return state + action.payload
    })
    builder.addCase(decrementBy, (state, action) => {
      return state - action.payload
    })
  },
})
```

대망의 `createSlice`를 알아보자. 액션도 따로 생성할 필요가 없다. reducer 에서 간단하게 사용하고 싶은 로직들을 넣어주면 된다.

createSlice가 생성한 액션타입 외에 다른 액션에 응답할 수 있게 해주는 extraReducers도 있다. TypeScript의 경우 builder 객체를 사용하는것이 권장되고, extraReducers는 createSlice와는 다르게 액션을 자동으로 생성해주지 않아 따로 createAction 으로 선언해줘야한다.

[RTK 공식문서](https://redux-toolkit.js.org/api/createslice)를 살펴보면 도움이 될 것이다.

<br>

### createAsyncThunk

> 참고 : [화해 기술블로그](http://blog.hwahae.co.kr/all/tech/tech-tech/6946/)

```jsx
import { userAPI } from './userAPI'

const fetchUserById = createAsyncThunk(
  'users/fetchByIdStatus',
  async (userId, thunkAPI) => {
    const response = await userAPI.fetchById(userId)

    return response.data
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState: { entities: [], loading: 'idle' },
  reducers: {},
  // extraReducers에 케이스 리듀서를 추가하면 
  // 프로미스의 진행 상태에 따라서 리듀서를 실행할 수 있습니다.
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {})
      .addCase(fetchUserById.fulfilled, (state, action) => {
	      state.entities.push(action.payload)
      })
      .addCase(fetchUserById.rejected, (state) => {})
  },
})

// 위에서 fetchUserById, 즉 thunk를 작성해두고
// 앱에서 필요한 시점에 디스패치 하여 사용합니다.

// ...

dispatch(fetchUserById(123))
```

Redux에서는 비동기 처리를 thunk, saga, redux-observable 등의 미들웨어를 사용했다. 한 개의 비동기 액션에 대해 pending, success, failure의 상태를 생성하여 처리하던 것을 RTK에서도 위와 같이 할 수 있다.

<br>

## 마무리

RTK 버전 1.6부터는 RTK Query가 패키지에 함께 포함되어 릴리즈 되어 있다. 데이터 패칭이나 캐싱을 위해 `createAsyncThunk`가 아닌 RTK Query나 React Query를 사용하는 방법도 고민해보아야 할 것이다.

[react-query 공식문서](https://react-query.tanstack.com/comparison)를 확인해보면 다양한 라이브러리와 비교되어있는 것을 볼 수 있다. 필자도 여기서 어떤 라이브러리로 비동기 부분을 처리할지 고민중이다.

Redux를 사용하면서 Redux ToolKit을 사용 안할 이유는 딱히 없어보인다. 보일러플레이트를 줄이는데 효과적인 RTK를 꼭 사용해보자.