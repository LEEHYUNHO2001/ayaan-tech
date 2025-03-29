---
title: "Postman"
description: "API 개발을 빠르고 쉽게 개발할 수 있도록 도와주는 플랫폼"
date: 2022-01-03T10:04:42.627Z
tags: ["JavaScript","node.js"]
---
## Postman이란?

![](/images/275eff80-217f-44fb-8fef-58735aea5876-image.png)

API 개발을 빠르고 쉽게 개발할 수 있도록 도와주는 플랫폼이다.
개발된 API를 테스트하여 문서화 또는 공유 할 수 있도록 도와준다.
[Postman의 특징](https://incheol-jung.gitbook.io/docs/q-and-a/infra/2018-01-03-how-to-use-postman)

<br>

### 사용

어떻게 개발을 빨리할 수 있도록 도와준다는 것일까? [REST API](https://velog.io/@leehyunho2001/REST-RESTAPI-RESTful%EC%9D%98%EB%AF%B8)를 표현할 수 있다.

```js
const express = require("express");

const app = express();
// json으로 데이터 받기
app.use(express.json());

app.get("/", (req, res, next) => {
  res.send("get 요청");
  console.log(req.body);
});

app.post("/", (req, res, next) => {
  res.send("post 요청");
  console.log(req.body);
});
app.listen(8080);
```

간단한 express 코드 예시이다. get요청과 post요청에 따라 살짝다르게 동작한다. (send만 다름..)

listen을 8080포트로 설정한것을 잊지 말자.

```bash
nodemon 파일이름
```

노드몬으로 실행해주고있다.(그래야 Postman 사용 가능)

![](/images/43d6d709-bad8-43b7-95d2-c2ad414ae80f-image.png)

Postman에서 주소를 적는 공간에 8080포트로 넣어준다. 그리고 get요청을 보낼 것인지 post요청을 보낼 것인지 선택한다.(요청은 위의 두개 말고도 더 많다.)

데이터도 Json 형식으로 임의로 넣어준다. Select 박스에 기본으로 Text라고 되어있는데 Json으로 바꿔야한다.
이제 Send를 누르자. **postman에서 `post 요청`이 나타난다.**

![](/images/1c29fc64-5887-445d-a901-3dc022efcbba-image.png)

그리고 VScode 터미널에서 Json으로 데이터가 잘 받아졌다.

만약에 Postman이 없었다면 이러한 부분을 다 코드로 설계해야하는 것이다. 이런 작업을 Postman 덕분에 안하게 되어 개발 속도가 증가하고 간단해지는 것이다.