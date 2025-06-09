---
title: "타입스크립트에서 Object의 대괄호 표기법 허용하기"
description: "bracket notation property access (TypeScript)"
date: 2022-07-12T05:26:12.898Z
tags: ["JavaScript","next","typescript"]
---
# Dot vs Bracket

```jsx
const test = {
	number: 5,
  	string: "스트링"
}
```

JavaSrcipt에서는 Object의 key를 이용하여 value에 접근할 수 있다.

`test.number` 은 dot Notation이고, `test[string]`은 Bracket Notation이다. 둘 중 어떤것을 사용해도 성능 이슈가 없지만, dot 하나 사용하는게 가독성은 좋아보인다. 그렇다면 Bracket 방식은 필요가 없을까?

변수를 활용해 key 에 해당하는 값을 찾고 싶은 경우에는 필요하다.

<br>

## 문제점 발견

```jsx
const [object, setObject] = useState({
	A: "text1",
    B: "text2",
    C: "text3",
  	D: 1000,
    E: 2000
})
```

먼저 useState로 관리하는 data 객체가 있다. 

> 여러개의 input을 객체 형태로 다룰때, 위와 같이 많이 설계 한다.

A~C는 StrComponent에서 출력할 것이고, D와 E는 NumComponent에서 출력하도록 설계해 볼 것이다.

<br>

```jsx
const StrArr = [
  {
    name: 'A',
    desc: "string desc1"
  },
  {
    name: 'B',
    desc: "string desc2"
  },
  {
    name: 'C',
    desc: "string desc3"
  }
];

const NumArr = {
  {
    name: 'D',
    desc: "number desc1"
  },
  {
    name: 'E',
    desc: "number desc2"
  },
}
```

데이터들이 모여 있는 배열을 가진 Arr변수가 있다. name에는 object의 key값을 넣는다. 이제 Arr을 이용해서 각각의 데이터에 맞는 컴포넌트를 출력해보자.

<br>

```jsx
return <div>
  {StrArr.map(data => {
  const { name, desc } = data;
  return (
    <StrComponent
      name={name}
      desc={desc}
      value={object[name]}
      />
  );
})}
  {NumArr.map(data => {
  const { name, desc } = data;
  return (
    <NumComponent
      name={name}
      desc={desc}
      value={object[name]}
      />
  );
})}
</div>
```

map을 돌리면서, Arr에서 하나씩 data를 받고 있고 해당 데이터에 맞는 컴포넌트를 출력한다. 여기서 value에 `object[name]`를 해주자. name이 A면 value에 `text1`이 props로 넘어간다. `NumArr`에서 map 돌 때, name D라면 `1000`이 넘어가는 것이다. 

<br>

![](/images/2c33ac18-6faf-46e6-8948-87a16ff07d60-image.png)

하지만 타입스크립트에서 이렇게 사용하면 바로 `value={object[name]}`에 빨간 밑줄이 생긴다.

<br>

## 문제 해결

![](/images/11271798-19ae-47cf-9258-3f43f71badf7-image.png)

[Stak Overflow](https://stackoverflow.com/questions/34727936/typescript-bracket-notation-property-access)를 보면 동적 타입 선언 처럼 한 후에 `any`처리를 하란다. 하지만 any는 타입스크립트를 사용하는 프론트엔드 개발자라면 모두 기피하다보니 꺼려진다.

나는 다른 방법을 찾았고, 그래도 위의 글이 참고가 되었다.

<br>

### interface

```jsx
interface ObjectType{
	A: string;
    B: string;
    C: string;
  	D: number;
  	E: number;
}
```

먼저 object state에 맞는 인터페이스를 하나 선언해준다.

<br>

```jsx
interface ObjectIndexable extends ObjectType{
	[key: string]: string | number;
}
```

그리고 extends를 사용해서 ObjectType 인터페이스를 확장한 ObjectIndexable를 생성한다. 여기서는 동적인 타입을 생성해주는데, ObjectType에서 사용했던 타입들을 `|` 을 사용해서 모두 넣어주는것이 포인트다.

<br>

### render

```jsx
return <div>
  {StrArr.map(data => {
  const { name, desc } = data;
  return (
    <StrComponent
      name={name}
      desc={desc}
      value={(object as ObjectIndexable)[name]}
      />
  );
})}
  {NumArr.map(data => {
  const { name, desc } = data;
  return (
    <NumComponent
      name={name}
      desc={desc}
      value={(object as ObjectIndexable)[name]}
      />
  );
})}
</div>
```

이제 props를 넘겨주는 부분에서 `as`를 사용하여 object에 ObjectIndexable 타입을 부여하자. 이제 `{(object as ObjectIndexable)[name]}`에 있던 빨간 밑줄 경고는 해결되었다. 하지만 `value`의 빨간 밑줄은 사리지지 않는다.

<br>

### 개발자가 생각하고 있는 value의 타입

```jsx
return <div>
  {StrArr.map(data => {
  const { name, desc } = data;
  return (
    <StrComponent
      name={name}
      desc={desc}
      value={(object as ObjectIndexable)[name] as string}
      />
  );
})}
  {NumArr.map(data => {
  const { name, desc } = data;
  return (
    <NumComponent
      name={name}
      desc={desc}
      value={(object as ObjectIndexable)[name] as number}
      />
  );
})}
</div>
```

말 그대로 개발자가 생각하고 있는 value의 타입을 as처리 하면 된다. 이제 정말로 해결되었다. (만약에 더 좋은 방법이 있다면 공유해주시면 감사하겠습니다!)