---
title: "Axios에서 HTTP request를 이용하여 에러 처리"
description: "Network 탭의 Response 값 가져오기"
date: 2022-04-26T09:50:29.954Z
tags: ["JavaScript","React","typescript"]
---
> _"Forbidden 인 경우에 에러 메세지를 확인하고 그에 맞는 UI를 출력해주시면 될 것 같아요"_

BackEnd Developer와 협업을 하는 도중에 이와 같은 요청이 있었다. Back단에서 API를 설계할 때, 상태에 따라 HTTP 에러를 내려주고 그에 맞는 메세지를 출력해줄 수 있도록 하고 있다.

Forbidden은 HTTP 상태 코드중에 하나인데 개념이 부족하다면 [HTTP 상태코드 위키백과](https://ko.wikipedia.org/wiki/HTTP_%EC%83%81%ED%83%9C_%EC%BD%94%EB%93%9C) 를 확인해 보자.

<br>

```jsx
    try {
        const res = await axios({
          method: 'get' as Method,
          url: '/api/data',
        });
      //...
    } catch (error) {
            console.log(error);
      }
    }
```

데이터를 요청하는 부분을 try...catch 사용해서 에러가 나타날 경우 로그를 찍어보았다.

<br>

![](/images/7b8f7aa8-f69f-43d9-810d-c787ee2fd985-image.png)

그 전에 먼저 Network의 Response탭을 실제로 확인해보니 에러인 경우에 status, message 등을 출력해주고 있다.

<br>

![](/images/f500e508-b462-41d9-a3f8-a19c6465a5ff-image.png)

하지만 console.log로 에러를 찍은 부분에서는 403 이라는 정보 외에는 찍히지 않았다. `error.message` 와 같은 형식으로 메세지만 빼서 메세지에 맞게 UI를 출력해주고 싶은데 그럴 수 없는 것이다.

<br>

```jsx
catch (error) {
      const err = error as AxiosError;
      if (err.response) {
        setDataError({ status: err.response.status, message: err.response.data.message });
      }
    }
```

> [참고](https://www.codegrepper.com/code-examples/javascript/how+to+catch+network+error+in+axios)

아무리 생각해도 저 값을 못 뽑아낼리가 없었다. 그래서 검색해본 결과 해답을 찾을 수 있었다.

나는 status와 message값만 필요해서 이것만 뽑아내 state에 저장하고 있다. 이제 `dataError.message.includes('used')`와 같은 형식으로 이용할 수 있다. true이면 "이미 사용했습니다" 와 같은 UI를 출력해주는 것이다.

[HTTP 상태코드](https://ko.wikipedia.org/wiki/HTTP_%EC%83%81%ED%83%9C_%EC%BD%94%EB%93%9C) 의 종류도 참고해보자.