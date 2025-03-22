---
title: "Moment.js, Day.js"
description: "Moment.js도 좋지만 Day.js 사용하자!"
date: 2021-09-14T09:37:21.717Z
tags: ["node.js"]
---
>## moment.js란??

게시판, SNS, 오픈마켓 사이트 등을 설계할때 날짜/시간 관련된 기능은 필수이다. new Data()를 사용하여 설계할 수 있지만, 이 경우에 코드의 양이 많아지고 YYYY년 MM월 DD일 형식으로 날짜를 표현하려면 직접 함수를 만들어 처리해야한다. **moment.js를 사용한다면 위의 단점들이 해결된다**. 하지만 **용량이 크다**는 단점을 가지고 있다.

<br />

>설치

```
npm i moment
```



<img src="https://media.vlpt.us/images/ppohee/post/9541f0fb-af21-44a9-9de9-000244cad1b1/momentjs.png?w=768" />

<br />

>사용법

```js
<div>{moment()}</div>
```
moment( ) 는 현재 시간을 나타낸다. 화면에 현재 날짜가 표시된다.

<br />

```js
<div>{moment(post.createdAt)}</div>
```
post는 누군가 작성한 게시글이라고 가정하면, 게시글 작성한 날짜가 표시된다.

<br />

```js
<div>{moment().format('YYYY.MM.DD')}</div>
```
현재의 날짜가 2021.09.14 형식으로 나타난다.
이 외에도 많은 사용법들이 있다. [momentjs](https://momentjs.com/) 에서 확인 가능하다. [mavl](https://blog.martinwork.co.kr/javascript/2018/04/01/date-library-moment.html) 자주 사용하는 메소드를 정리해논 블로그도 참고하자.

<br /><br />

>## Day.js란??

moment.js 의 용량은 크다. **day.js는 moment.js와 호환되는 API를 가진 경량 라이브러리**이다. moment.js API 형식이 유사하므로 기존 사용자들은 쉽게 사용할 수 있다. 

<br />

> 설치

```
npm i dayjs
```

<br />

<img src="https://logos.textgiraffe.com/logos/logo-name/Day-designstyle-candy-m.png" />

<br />

>사용법

```js
import moment from 'moment'

const momentDate = moment('2019-03-01') // 2021-09-14일자 moment 객체 할당
momentDate.add(1, 'day') // 1일 추가
console.log(momentDate.format('YYYY-MM-DD')) // '2021-09-15'
```

<br />

```js
import dayjs from 'dayjs'

let dayjsDate = dayjs('2019-03-01') // 2021-09-14일자 dayjs 객체 할당
dayjsDate.add(1, 'day') // 1일 추가시도
console.log(dayjsDate.format('YYYY-MM-DD')) //'2021-09-14'
dayjsDate = dayjsDate.add(1, 'day') // 1일 추가
console.log(dayjsDate.format('YYYY-MM-DD')) // '2021-09-15'
```
하지만 day.js는 변경 불가능(immutable)하기 때문에 이미 변수에 할당된 day.js 객체의 날짜를 add, subtract와 같은 메소드를 사용해서 변경할 시 다시 변수에 할당해주어야한다.

API는 moment.js와 동일하다. format은 [day.js format](https://github.com/iamkun/dayjs/blob/dev/docs/ko/API-reference.md#format-formatstringwithtokens-string)을 참고하자.

<br />

```js
import dayjs from 'dayjs'

let date = dayjs('2019-03-01T18:00:00+09:00')
date = date
  .set('year', 2022) // 연도를 2022으로 변경
  .set('month', 10) // 월을 10월로 변경
  .set('date', 15) // 일을 15일로 변경
console.log(date.format('YYYY년 MM월 DD일')) // '2020년 11일 11일'
date = date
  .subtract(1, 'year') // 연도 1년 빼기
  .add(1, 'month') // 월 1개월 더하기
  .add(1, 'date') // 일 1일 더하기
console.log(date.format('YYYY년 MM월 DD일')) // '2019년 12일 12일'
```
set메소드를 사용해서 날짜를 변경할 수 있다. add, subtract 메소드로 기존 날짜를 더하거나 뺄 수 있다. set 메소드의 첫 인자는 [day.js set](https://github.com/iamkun/dayjs/blob/dev/docs/ko/API-reference.md#list-of-all-available-units)을 참고하자.

<br />

```js
import dayjs from 'dayjs'
import 'dayjs/locale/ko'

dayjs.locale('ko') // global로 한국어 locale 사용
const date = dayjs('2019-03-01')
console.log(date.format('ddd')) // '금요일'
const date2 = dayjs('2019-03-01').locale('en') // 해당 인스턴스에서만 영어 locale사용
console.log(date2.format('ddd')) // 'Fri'
```
moment.js와 마찬가지로 locale을 설정할 수 있다.

<br /><br /><br /><br /><br /><br />

[john](https://john015.netlify.app/moment-js%EB%A5%BC-day-js%EB%A1%9C-%EB%8C%80%EC%B2%B4%ED%95%98%EA%B8%B0)
