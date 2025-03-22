---
title: "PropTypes"
description: "React에서 props를 체크하기 위한 라이브러리"
date: 2021-10-31T08:12:31.649Z
tags: ["React"]
---
>## PropTypes란??

**React에서 prop의 타입을 체크하기 위한 라이브러리다.** 원하는 타입이 아닌 prop를 넘기거나 누락시키면 랜더링이 정상적으로 수행되지 않을 수 있다. 그러므로 PropTypes를 사용하자.
<br />

> 설치

```js
npm i prop-types
```

<br />

>## 사용


```js
//Example.js
import React from 'react';
import Food from './components/Food';

const Example = () => {
  return (
    <Food name="Seafood" />
  );
}

export default Example;
```

```js
//Food.js
import React from 'react';
import PropTypes from 'prop-types';

const Food = ({ name }) => (
  <div>
    This is {name}.
  </div>
);

Food.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Food;
```

Example.js는 Food.js로 prop를 넘겨주고 있다. **타입은 문자열로만 받기 위해서** Food.js에서 PropTypes로 체크를 해주고 있다.

<br />

<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqDXH2007-71Qzo_24tgaKv-Qw1kpjQNa6_g&usqp=CAU" />

<br />

이 외에도 **func, bool, array, number,  object등** props의 타입에 따라 체크해주면 된다. 

**isRequired**를 붙임으로써 반드시 입력되어야 하는 필수 prop를 정의할 수 있다.

<br />

> 마무리

이 방법도 좋지만 TypeScript를 이용하면 더욱 효과적일 거라고 생각한다.