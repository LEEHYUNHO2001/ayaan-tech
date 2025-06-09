---
title: "객체를 키와 값을 이용하여 동적 생성할 경우 Type 선언"
description: "TypeScript 환경에서 객체(objcet)를 키(key)와 값(value)를 이용하여 동적으로 생성하는 방법을 알아보자."
date: 2022-05-13T01:03:45.521Z
tags: ["JavaScript","React","next","typescript"]
---
# 동적으로 객체 생성

TypeScript 환경에서 객체(objcet)를 키(key)와 값(value)를 이용하여 동적으로 생성하는 방법을 알아보자. 

<br>

## 원하는 동작

그 전에, 먼저 이렇게 해야하는 상황은 언제 나타나는지 알아보자.

![](/images/f7c71188-abb7-4119-87e6-cb8dd6d0386d-image.png)

이 데이터를 보고 나는 type 별로 묶어주고 싶었다.

<br>

![](/images/1100c24d-e191-4ab4-b6ca-a42607e5e15c-image.png)

이렇게 type별 object[] 형식으로 묶어주면 될 것이다. JavaScript에서는 그냥 코드를 쭉 짜면 된다. 하지만 TypeScript에서는 한가지 문제점이 있다.

<br>

## 로직

```jsx
export interface DesignProps {
  id: string;
  name: string;
  type: string;
}

      const arr = [];
      const obj: any = {};
      original?.data.forEach((data: DesignProps) => {
        if (!obj[data.type]) {
          obj[data.type] = [data];
        } else {
          obj[data.type] = [...obj[data.type], data];
        }
      });

      const keys = Object.keys(obj);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = obj[key];
        arr.push({ id: key, select: value });
      }
```

첫 번째 사진에서 보이는 데이터가 original이라는 변수에 있다고 가정하자. forEach로 값을 하나씩 가져오며, 현재 값의 타입으로 객체가 생성된 적이 있는지 체크한다. 만약에 없으면 현재 데이터를 `객체[키] = 값` 형태로 저장해준다. 현재 값의 타입으로 된 객체 데이터가 이미 있다면, spread operator를 사용하여 이전 값을 유지한 채 새로운 값도 넣어준다.

![](/images/721bf89e-1ac8-46f1-aff0-6b6b918e5d29-image.png)

여기까지만 하면 이렇게 obj가 생성된다. 두번째 사진에서 보는것처럼 object[] 형태를 만들기 위해서는 이 객체를 순회돌며 배열에 새로 넣어주는 작업이 필요했다.

여기까지는 JavaScript의 영역이다. TypeScript에서 문제점이 생긴다는것이 어떤 의미일까?

<br>

## 문제점

바로 **obj에 any 처리된 부분**이 문제점이다. obj를 선언하고 그 밑에서 동적으로 값이 생성되기 때문에 타입을 미리 선언해줄 수가 없었다. [StackOverflow](https://stackoverflow.com/questions/71723742/typescript-how-to-return-dynamic-object-key-that-comes-from-dynamic-prop-ke)를 참고해서 해결할 수 있었다.

```jsx
interface DesignObjectProps {
  [key: string]: DesignProps[];
}
```

이렇게 동적으로 타입도 생성될 수 있도록 선언하고, any부분에 DesignObjectProps 을 넣어 해결할 수 있었다.

<br>

## 코드 개선하기

```jsx
interface DesignArrProps {
  id: string;
  select: DesignProps[];
}

interface DesignObjectProps {
  [key: string]: DesignProps[];
}

//...

      const arr: DesignArrProps[] = [];
      const obj: DesignObjectProps = {};
      original?.data.forEach((data: DesignProps) => {
        if (!obj[data.type]) {
          obj[data.type] = [data];
        } else {
          obj[data.type] = [...obj[data.type], data];
        }
      });

      Object.entries(obj).forEach(([key, value]) => {
        arr.push({ id: key, select: value });
      });
```

for문은 왠만하면 사용하지 않는것이 좋다. 그래서 forEach문으로 변경할 수 있도록 코드를 리팩토링 해주었다. 이를 위해서 arr에 타입을 선언해주었다.