---
title: "axios, fetch, ajax"
description: "axios, fetch, ajax에 대해 알아보자"
date: 2021-08-21T06:18:02.387Z
tags: ["CS","JavaScript","node.js"]
---
> ## axios란??

기존에 웹에서 어떤 리소스를 비동기로 요청하기 위해 사용되던 XHR(XML HTTP Request)의 단점을 보완하기위해 axios와 fetch가 등장했다. **Node.js와 브라우저를 위한 HTTP 비동기 통신 라이브러리**이다.

<img src="https://media.vlpt.us/images/edie_ko/post/4631c9fc-fa76-47e9-9d77-bc160476c60a/1_mv73TpGPVFXzJqu920m5Og.png" />

axios는 크로스 브라우징에 신경을 많이 쓴 모듈이다. 그래서 **웹 프론트 프레임워크(React, Vue 등)에서는 fetch보다는 axios**를 많이 사용한다. **React-native에서는 fetch**를 많이 사용하는것 같다.

<br />

> **axios 특징**

* 운영 환경에 따라 브라우저의 XHR 객체 또는 Node.js의 HTTP API 사용

* Promise(ES6) API를 사용하여 return값이 promise이기 때문에 response 데이터를 다루기 쉬움

* 요청과 응답 데이터의 변형

* HTTP 요청 취소 가능

* 응답 시간 초과를 설정하는 방법 존재

* HTTP 요청과 응답을 JSON 형태로 자동 변경

* 모듈을 설치해주어야 함


<br /><br />


>**HTTP Methods 개념과 axios**

Client가 Web Server에게 사용자 요청의 목적/종류를 알리는 수단

<img src="https://blog.kakaocdn.net/dn/b9Gy2I/btqUuNsqCSU/CgRvIhWCIHUOlwuMKz22Y0/img.png" />

* **GET**
특정 리소스의 표시를 요청한다. 데이터를 받기만 한다.
웹 사이트 주소창을 보면 querystring이 존재하기 때문에 로그인과 같은 작업에는 적합하지 않다.
```js
axios({
  url:'/others',
  method:'get',
  data:{
    comment:'good'
  }
});
```
axios는 명확하게 method를 분리하여 사용 가능하다.
```js
import axios from 'axios';

axios.get("url주소").then((Response)=>{
    console.log(Response.data);
}).catch((Error)=>{
    console.log(Error);
})
```

<br />

* **POST**
새로운 리소스를 생성할때 사용한다. 사용자가 생성한 파일을 서버에다가 업로드할때 사용하는 것이다. querystring이 남지 않아 GET보다 안전하다.
```js
axios.post("url주소",{
  data객체
},[,config])
```
post 메서드의 두 번째 인자는 본문으로 보낼 데이터를 설정한 객체 리터럴을 전달한다.

<br />

* **Delete**
Delete메서드는 서버에 있는 데이터베이스의 내용을 삭제
하는 것을 주 목적으로 한다.
```js
axios.delete("url주소")
  .then(function(Response){
    console.log(Response);
      }).catch(function(ex){
      throw new Error(ex)
}
```
두 번째 인자는 전달하지 않는다.

* **PUT**
서버에 있는 데이터베이스의 내용을 변경하는 목적으로 사용한다.

이 외에도 patch, head, options등이 있다.

<br /><br />



> ## ajax란??

비동기식 JavaScript와 XML이다. 브라우저가 가지고 있는 **XHR(XML Http Request) 객체를 이용**해서 전체페이지를 새로고침 할 필요없이 **필요한 일부분의 데이터만을 갱신**할 수 있게 도와준다.

<img src="https://media.vlpt.us/images/gparkkii/post/e51b16fa-d821-496a-9895-9c98e376320b/img_ajax_ajax_application.png" />

ajax를 JQuery를 통해 보다 더 쉽게 사용할 수 있기에 우리는 JQuery와 ajax를 함께 묶어서 말할 때가 많다. ajax 프레임워크는 Prototype, Google Web Toolkit 등 더 있다.

```js
//기본 ajax 사용
function reqListener (e) {
    console.log(e.currentTarget.response);
}

var oReq = new XMLHttpRequest();
var serverAddress = "https://LEEHYUNHO.com/posts";

oReq.addEventListener("load", reqListener);
oReq.open("GET", serverAddress);
oReq.send();
```


```js
// jQuery의 .get 메소드 사용
var serverAddress = 'https://LEEHYUNHO.com/posts';

$.ajax({
    url: ,
    type: 'GET',
    success: function onData (data) {
        console.log(data);
    },
    error: function onError (error) {
        console.error(error);
    }
});
```

>**ajax 특징**

**ajax 장점**

* 서버의 처리가 완료 될때까지 기다리지 않고 처리 가능

* 웹 페이지 전체를 다시 로딩하지 않고도, 웹 페이지의 일부분만 갱신 가능

* XHR을 통해 필요로하는 일부 데이터만 JSON이나 XML 형태로 갱신하여 시간과 자원 절약

* 각각의 페이지마다 html코드를 가지고 있을 필요가 없고 서버에서 Data만 전송하여 전체적인 코드 양 줄어듬

* 웹 페이지가 로드된 후에 서버로 데이터 요청을 보내고 받을 수 있음

* 다양한 UI 설계 가능

<br />

**ajax 단점**

* Client가 Server에 데이터를 요청하여 사용하므로 서버 푸시 방식의 실시간 서비스는 만들 수 없음

* ajax로는 바이너리 데이터를 보내거나 받을 수 없음

* ajax 스크립트가 포함된 서버가 아닌 다른 서버로 ajax 요청을 보낼 수 없음

* HTTP 클라이언트 기능이 한정됨

* 연속적으로 데이터를 요청하면 서버 부하가 증가

* 페이지 이동없는 통신으로 인한 보안상 문제

* 히스토리 관리가 어려움

<br /><br />

>**ajax 개념**


ajax에서는 데이터 전송형식이 크게 CSV, JSON, XML이 있다.
* CSV : ,로 데이터 속성을 나누고 줄바꿈으로 데이터를 나눈다. 용량이 적지만 가독성이 떨어진다.

* XML : 속성과 데이터를 구분한다. CSV에 비해 가독성이 좋지만, 용량이 크며 데이터가 많아지면 분석력이 떨어진다.

* JSON : JavaScript 객체 형태로 데이터를 전송한다. 가독성이 적고 용량도 적다. 하지만 데이터가 많아지면 당연하게 분석 속도가 떨어진다.

데이터 전송 방식은 위에서 설명한 CRUD와 유사하다.

<br /><br />

> ## fetch란??

ajax에 대표적으로 사용되는 API는 XHR, Fetch가 있으며, 이전에는 XHR이 사용되다가 불편함과 호환성을 이유로 jQuery 내에서 ajax를 사용한다. 이후에 fetch API가 ES2015 표준이 되면서 별도의 import가 필요 없는 fetch API가 쓰이는 상황이다.

**promise기반**으로 만들어졌기에 Axios와 마찬가지로 데이터를 **다루기 쉽고** 내장 라이브러리이기 때문에 **편리**하다.

<img src="https://media.vlpt.us/post-images/adam2/f4bca6d0-26e2-11ea-a22c-0b4b59784bae/1-yw3mCIfvJotovxiydYa1w.jpeg" />

>fetch 특징 및 사용

* 내장 라이브러리여서 import 하지 않고 사용할수 있다.

* 라이브러리의 업데이트에 따른 에러 방지가 가능하다.
(React native는 에러나는 경우 빈번)

* 네트워크 에러가 발생하면 기다려야한다.
(response timeout API 제공하지 않음)

```js
//fetch에서 post
fetch("url주소",{
  method:'POST',
  body
}).then(response => console.log(response))
```



<br /><br /><br /><br /><br /><br /><br />

[kysung95](https://velog.io/@kysung95/%EA%B0%9C%EB%B0%9C%EC%83%81%EC%8B%9D-Ajax%EC%99%80-Axios-%EA%B7%B8%EB%A6%AC%EA%B3%A0-fetch), [lily-im](https://lily-im.tistory.com/15), [zofqofhtltm8015](https://velog.io/@zofqofhtltm8015/Axios-%EC%82%AC%EC%9A%A9%EB%B2%95-%EC%84%9C%EB%B2%84-%ED%86%B5%EC%8B%A0-%ED%95%B4%EB%B3%B4%EA%B8%B0)