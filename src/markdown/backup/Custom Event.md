---
title: "Custom Event"
description: "사용자 정의 이벤트를 생성하고 사용해보자."
date: 2022-01-02T02:41:46.372Z
tags: ["JavaScript"]
---
![](/images/01a7c66e-8bcf-452a-bbf0-b8c7fc9630a1-cus.gif)

사용자 정의 이벤트를 생성할 수 있다. 평소에 클릭 이벤트시 특정 동작을 해주기 위해 `addEventListener` 을 사용하여 'click' 을 인자로 사용하는데 이와 같은 것을 직접 만들 수 있다.

<br>

### prepend

```html
<article>안녕하세요</article>
<script>
  const div = document.createElement("div");
  document.querySelector("article").prepend(div);
</script>
```

예제에서 prepend를 사용하므로 먼저 개념을 익혀보자. article 태그 안에서 앞에 div를 붙이고 있다.

![](/images/3a00a7b6-e042-4139-a177-5837a4ac80e5-image.png)

개발자도구로 요소를 확인해본 결과 `안녕하세요` 라는 텍스트는 밀리고 그 위에 `div` 태그가 붙었다.

<br>

```js
      const preDiv = document.createElement("div");
      const preSpan = document.createElement("span");
      const preP = document.createElement("p");
      document.querySelector("article").prepend(preDiv, preSpan, preP);
```

![](/images/a7afa1fd-d2f2-493e-90c0-d6ec4eccc39d-image.png)

이렇게 prepend를 이용하여 여러개의 태그를 article안에 붙일 수도 있다. argument에 들어간 순서대로 태그가 생성된 것을 볼 수 있다.

<br>

### Custom Event

```html
    <script>
      const myEvent = new CustomEvent("hey", {
      bubbles: true,
      detail: {
          say: "hey man!",
        },
      });

      const myDiv = document.createElement("div");

      myDiv.addEventListener("hey", (e) => {
        console.log(e.detail.say);
      });

      myDiv.dispatchEvent(myEvent);
    </script>
```

이제 Custom Event을 사용해보자.

`new CustomEvent`로 Custom Event를 사용하기 위한 객체를 생성할 수 있다. 인자는 이벤트의 이름과 옵션을 전달하는데, `hey`라는 이름을 가진 이벤트와 데이터 객체를 가진 `detail`을 전달하고 있다.

`bubbles`은 이벤트의 [버블링](https://velog.io/@leehyunho2001/%EC%9D%B4%EB%B2%A4%ED%8A%B8-%ED%9D%90%EB%A6%84%EC%BA%A1%EC%B2%98%EB%A7%81-%EB%B2%84%EB%B8%94%EB%A7%81) 여부를 나타내는 boolean값이다. 기본값은 false이다.

생성한 Custom Event를 `dispatchEvent`에 전달해주면 끝이다.


![](/images/c1cc5bdb-220c-4326-881a-3702a68098bf-image.png)

hey라는 Custom Event가 사용되었다.

<br>

### Custom Event 활용

```html
<script>
      function buildAlert(title, message) {
        const alert = document.createElement("div");
        const id = Math.ceil(Math.random() * 1000);

        alert.className = "alert";
        alert.innerHTML = `
                <span class="close">&times;</span>
                <h3>${title}</h3>
                <p>${message}</p>
                `;

        alert.id = id;
        alert.querySelector("span.close").addEventListener("click", (e) => {
          const closeEvt = new CustomEvent("close", {
            bubbles: true,
            detail: { id, message },
          });

          alert.dispatchEvent(closeEvt);
          alert.remove();
        });

        document.body.prepend(alert);
        return alert;
      }

      document.getElementById("order-btn").addEventListener("click", (e) => {
        const alertEl = buildAlert("에러", "로그인을 해주세요");
        alertEl.addEventListener("close", (e) => {
          console.log(e.detail);
          console.log("error 창을 닫습니다.");
        });
      });
    </script>
```

본격적으로 Custom Event를 활용해보자.

`buildAlert` 함수에서 class가 `alert`인 `div`태그를 생성하고, `id`값을 랜덤으로 생성한다. `innerHTML`으로 방금 생성한 div 안에 class가 `close`인 span과 인자로 받아와 사용할 title과 message를 넣어주었다.

close를 가진 span을 클릭시 Custom Event를 생성하여 `closeEvt`에 넣고, `dispatchEvent` 으로 사용한 뒤 `remove()` 해준다.

![](/images/01a7c66e-8bcf-452a-bbf0-b8c7fc9630a1-cus.gif)

주문하기를 누루면 title과 message에 맞는 "에러"와 "로그인을 해주세요"가 나타나고 있다. 그리고 x 표시가 나타나는데, 이것이 class가 close인 span이다. 이 부분을 클릭하면 close 이벤트가 발생하여 console이 찍히고, remove될 것이다.

<br>

### 왜 사용할까?

자바스크립트에서 기본적으로 제공되는 이벤트를 사용하면 detail에는 어떤 이벤트가 발생해도 1이 찍힌다.

하지만 커스텀 이벤트를 사용하면 detail의 이벤트 정보를 수정할 수 있다. (원하는 정보를 전달할 수 있음)

음.. 매력적인 기능인것은 분명하다..

<br>
<br>
<br>
<br>

예제 참고 : 초보자를 위한 JavaScript 200제