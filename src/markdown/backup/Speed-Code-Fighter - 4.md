---
title: "Speed-Code-Fighter - 4"
description: "UI 완성 및 여러 문제 해결"
date: 2022-01-02T09:44:56.577Z
tags: ["CSS","JavaScript","html"]
---
![](/images/39bcf040-6ac2-4187-b175-b425e4a42272-image.png)

![](/images/d634c40d-6a56-4b8e-bce1-e49430d5f66c-image.png)

UI 부분이 완성되었다. 타이핑 게임을 시작할 언어를 고르는 Select 박스와 키보드 테마를 고르는 Select 박스를 생성했다. 게임을 다시하기 위한 '다시 시작하기' 버튼도 생성해주었다.

<br>

undefined

Enter입력시 정답과 오답을 표시하는 기능을 추가하고, 페이지의 다른 부분을 클릭해도 타이핑 게임에 포커스가 가도록 설계했다.

기능을 잘 구현하는 도중에 테스트를 수행하다 한 가지 오류를 발견했다. 타이핑 게임은 모든 입력이 정답이 되면 다음 게임으로 넘어간다. 모든 입력이 정답이 아니면서 타이핑을 끝까지 입력했을 경우가 있을 것이다.

![](/images/79a36a7c-a869-4f26-94c5-b8ce80d1be36-image.png)

중간에 오답이 있어 다음 게임으로 넘어가지 못하고 있는 상황이다. 이 때, 입력값을 넣어주면 화면에서는 보이지 않지만 textarea에 계속 입력이 된다.

```js
  if (cursor_late === [...arrayQuote].length - 1) {
    let text = document.querySelector("textarea");
    text.value = text.value.slice(0, 5);
  }
```

cursor_late에는 `quoteDisplayElement.querySelectorAll(".correct, .incorrect")` 의 length 값이 들어있다. 이 값이 타이핑 게임을 수행할 글자배열의 길이와 같다면 뒤에 입력이 있어도 잘라주고 있는 것이다.

<br>

> 마무리

기능을 구현하면서 예상하지 못한 동작을 발견하거나 새로운 기능들이 번뜩 떠올라 추가하며 프로젝트를 설계하고 있다. 이러다 보니 생각보다 프로젝트 기간이 길어지는 것 같다. 

- [ ] 다음 인덱스에 해당하는 문자 키보드에 표시
- [ ] 다시시작하기 버튼
- [ ] 한줄 입력시 Code TextArea 부분 자동 스크롤
- ■ textarea 문제점 해결
- ■ 타이핑 게임에 focus하는 기능
- ■ 프로젝트 UI

위의 기능만 추가하면 이제 Speed-Code-Fighter도 성공적으로 마무리 될 것이다.