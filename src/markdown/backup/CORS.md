---
title: "CORS"
description: "Cross-Origin Resource Sharing"
date: 2021-08-23T08:48:10.253Z
tags: ["CS"]
---
> ## CORS란??
Cross-Origin Resource Sharing

**추가적인 HTTP Header를 사용하여 애플리케이션이 다른 origin의 리소스에 접근할 수 있도록 하는 메커니즘**이다. 다른 origin에서 내 리소스에 함부로 접근하지 못하게 하기 위해 사용된다. 

<br/><br/>

그렇다면 **origin**이란 무엇일까?

<img src="https://hanseul-lee.github.io/2020/12/24/20-12-24-URL/0.png" />

**protocol에서 port까지**를 **origin**이라고 한다.

undefined

브라우저 개발자 도구의 console창에 **locaton.origin**을 입력하면 origin 확인이 가능하다.

서버에서 서버로 API를 호출하거나 Postman으로 API를 테스트를 할때는 CORS 에러가 나타나지 않는다. 하지만 **브라우저가 다른 origin의 리소스를 접근하려고하면 CORS에러**가 나타난다. 이것이 **SOP(Same-Origin Policy)** 이다.

<br/><br/>

> ## CORS 동작원리

CORS의 동작 방식은 단순 요청(**simple request**), 예비 요청(**preflight request**), 인증정보를 포함하는 요청(**credentialed request**)이 있다.

* **simple request**

서버에게 바로 요청을 보낸다.

<img src="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/simple-req-updated.png" />

단순요청은 서버에 API를 요청하고, 서버는 Access-Control-Allow-Origin 헤더를 포함한 응답을 브라우저에게 보낸다. 브라우저는 Access-Control-Allow-Origin 헤더를 확인해서 CORS 동작을 수행할지 판단한다.

<br/>

**조건**

1. 요청의 메소드는 **GET, POST, HEAD**중 하나여야 한다.

2. 헤더는 **Accept, Accept-Language, Content-Language, Content-Type, DPR, Downlink, Save-Data, Viewport-Width, Width**만 사용해야한다.
사용자 인증에 사용되는 Authorization 헤더도 포함되지 않아 까다로운 조건이다.

3. **Content-Type** 헤더는 **application/x-www-form-urlencoded, multipart/form-data, text/plain** 중에 사용해야한다.
많은 REST API들이 Content-Type으로 application/json을 사용하기 때문에 지켜지기 어렵다.

<br/>

* **prefligth request**

서버에 예비 요청을 보내서 안전한지 판단한 후 본 요청을 보내는 방법이다.

<img src="https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS/preflight_correct.png" />

**OPTIONS** 메서드로 서버에 예비 요청을 먼저 보내고, 서버는 이 예비 요청에 대한 응답으로 Access-Control-Allow-Origin 헤더를 포함한 응답을 브라우저에 보낸다. 브라우저는 단순 요청과 동일하게 Access-Control-Allow-Origin 헤더를 확인해서 CORS 동작을 수행할지 판단한다.

undefined

GET, POST, PUT, DELETE 등의 메서드로 API를 요청했는데, 크롬 개발자도구의 Network 탭에 OPTIONS 메서드로 요청이 보내어진 경험이 있다. 이것이 CORS이다.

<br/>

* **credentialed request**

다른 출처 간 통신의 좀 더 보안을 강화하고자 할 때 사용한다. 브라우저가 제공하는 비동기 리소스 요청 API인 XMLHttpRequest 객체나 fetch API는 별도의 옵션 없이 브라우저의 쿠키 정보나 인증과 관련된 헤더를 함부로 요청에 담지 않는다. 이때 요청에 인증과 관련된 정보를 담을 수 있게 해주는 옵션이다.

<br /><br />

>## 요청 헤더 목록

* Access-Control-Request-Method
preflight request할 때 실제 요청에서 어떤 메서드를 사용할 것인지 서버에게 알리기 위해 사용된다.

* Access-Control-Request-Headers
preflight request할 때 실제 요청에서 어던 header를 사용할 것인지 서버에게 알리기 위해 사용된다.

* Access-Control-Allow-Origin
브라우저가 해당 origin이 자원에 접근할 수 있도록 허용한다.

* Access-Control-Expose-Headers
브라우저가 엑세스할 수 있는 서버 화이트리스트 헤더를 허용한다.

* Access-Control-Max-Age
얼마나 오랫동안 preflight request이 캐싱 될 수 있는지 나타낸다.

* Access-Control-Allow-Credentials
Credentials가 true 일 때 요청에 대한 응답이 노출될 수 있는지를 나타낸다.
preflight request에 대한 응답의 일부로 사용되는 경우 실제 자격 증명을 사용하여 실제 요청을 수행 할 수 있는지를 나타낸다.
간단한 GET 요청은 preflight되지 않으므로 자격 증명이 있는 리소스를 요청하면 헤더가 리소스와 함께 반환되지 않으면 브라우저에서 응답을 무시하고 웹 콘텐츠로 반환하지 않는다.

* Access-Control-Allow-Methods
preflight request에 대한 응답으로 허용되는 메서드들을 나타낸다.

* Access-Control-Allow-Headers
preflight request에 대한 응답으로 실제 요청시 사용할 수 있는 HTTP헤더를 나타낸다.




<br/><br/>

> ## CORS 해결

undefined

현재 React 프로젝트 Client, Front(Next), Back(Express), DB(MySQL)가 위와같이 구성되어있다. 회원가입 기능을 구현하는 도중에 CORS 에러가 나타났다.

![](/images/62237296-b497-4a3c-b10a-edde641193de-Untitled.png)

에러 메세지를 보면 Access-Control-Allow-Origin 헤더가 requested resource에 없다고 나온다.

![](/images/607878d4-543d-4344-b41c-f368e50f08d9-Untitlsdfed.png)

크롬 개발자도구의 Network에서 실제로 헤더를 확인해보니 Access-Control-Allow-Origin가 없다.

현재 브라우저는 3000이고, Back Server는 3065이다. 다른 도메인으로 요청을 보내면 브라우저가 차단해버리는데 이것을 허용해주어야 한다.

<br/><br/>

**CORS 해결방법**

* Proxy

  서버에서 서버로 요청을 보내는 경우에는 CORS 에러가 생기지 않는다. 이를 이용하여, 브라우저에서 Front Server에 요청을 보낸 후 Front Server에서 Back Server로 요청을 보내준다. 응답도 Back Server -> Front Server -> Client로 해주는 것이다.
  
  <br/>
  <br/>
  
* Back Server에서 Access-Control-Allow-Origin 헤더를 허용


```js
res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
```

직접 Back Server에서 CORS 문제를 해결한다.

<br/>
<br/>

* npm i cors

  cors를 설치한 뒤에 Back Server의 app.js에서 작업
  
```js
  app.use(cors({
      origin: true,
      credentials: false,
  }));
```

 위 방식중 하나를 선택하여 에러를 해결했다.
 해결방법을 위한 블로그는 [여기](https://blog.naver.com/chldntjr8036/221724824277)를 참고하자.

<br/><br/><br/><br/><br/><br/>

[mozilla](https://developer.mozilla.org/ko/docs/Web/HTTP/CORS) [beomy](https://beomy.github.io/tech/browser/cors/) [pyeong](https://blog.naver.com/dnvld1/222039760747) [hannut91](https://hannut91.github.io/blogs/infra/cors) [zerocho] 