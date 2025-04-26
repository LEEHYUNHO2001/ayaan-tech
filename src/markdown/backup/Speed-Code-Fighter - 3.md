---
title: "Speed-Code-Fighter - 3"
description: "프로젝트 진행 사항 및 느낀 점"
date: 2021-12-29T08:35:55.479Z
tags: ["CSS","JavaScript","html"]
---
### 진행사항

프로젝트의 틀을 잡고 팀원들과 회의를 했다. 기능 구현과 디자인에 대해 협의가 되었고 역할 분담을 진행했다.

- 역할 분담
  - 이보리 : HTML/CSS - 디자인
  - 이현호 : JavaScript - 기능 구현
  - 김정민 : JavaScript - 기능 구현

<br>

회의를 하다 보니 프로젝트에 추가해야 할 기능들이 많이 있었고 리스트로 작성해 보았다.

- ■ 카운트를 60초에서 감소시키기
- ■ 1단계 게임 클리어시 2단계 게임 시작 및 현재 단계
- ■ 사용자에게 타이핑 위치를 알려주기 위한 Cursor
- [ ] 다음 인덱스에 해당하는 문자 키보드에 표시
- ■ Enter 입력 시 정답 or 오답 표시
- [ ] 다시시작하기 버튼
- [ ] 한줄 입력시 Code TextArea 부분 자동 스크롤
- [ ] 프로젝트 UI

<br>

위의 기능들을 팀원과 하나씩 구현해나가면서 중간에 더 필요한 기능이 있는지 상의하고 있다. 그리고 디자인에 따라 더 추가될 기능이 있는지에 대해서도 소통하고 있다.


![](/images/251143d9-b157-4a08-9bcc-24f432cd6f16-image.png)

이슈를 생성하여 칸반으로 활동 상황을 나타내며 프로젝트를 진행해보니 매우 편리한 것 같다.

<br>

```js
  const arrayQuote = quoteDisplayElement.querySelectorAll("span");
  const arrayValue = quoteInputElement.value.split("");
  let correct = true;

  let arrayCurrent = quoteDisplayElement.querySelectorAll(
    ".correct, .incorrect"
  );

  let cursor_late = [...arrayCurrent].length - 1;

  [...arrayQuote]
    .filter((element) => element.innerText != "\u00a0")
    .forEach((characterSpan, i) => {
      const character = arrayValue[i];

      if(characterSpan.innerText == "\n"){
        characterSpan.classList.add("enterBox")
      }
      if (character == null) {
        characterSpan.classList.remove("correct");
        characterSpan.classList.remove("incorrect");
        characterSpan.classList.remove("cursor");
        correct = false;
      } else if (character === characterSpan.innerText) {
        characterSpan.classList.add("correct");
        characterSpan.classList.remove("incorrect");
      } else {
        characterSpan.classList.remove("correct");
        characterSpan.classList.add("incorrect");
        correct = false;
      }
    });

  if (correct) {
    level = level + 1;
    renderNewQuote();
  }

  arrayCurrent = quoteDisplayElement.querySelectorAll(".correct, .incorrect");

  let cursor_current = [...arrayCurrent].length - 1;
  console.log(cursor_late, cursor_current);
  if (cursor_late < cursor_current) {
    [...arrayCurrent].forEach((characterSpan, i) => {
      characterSpan.classList.remove("cursor");
      if (i === cursor_current) {
        characterSpan.classList.add("cursor");
      }
    });
  } else {
    [...arrayCurrent][cursor_current].classList.add("cursor");
  }
```

`arrayCurrent`는 class가 `correct` 또는 `incorrect`인 모든 요소를 가져온다. `cursor_late` 에 `arrayCurrent`의 길이를 넣어주었는데 이 부분은 커서를 만드는데 이용될 것이다.

filter와 forEach가 이용된 부분은 타이핑 게임의 핵심이다. 타이핑 게임에 `<p>안녕하세요.</p>`가 나타나면, 모든 문자들이 한글자 한글자 span태그로 이루어져 있다. (다른 함수에서 구현해 놓음)

입력한 문자가 게임의 문자와 동일하면 `correct` class 를 갖게되고, 틀리다면 `incorrect` class를 갖게 될 것이다. Backspace면 두 클래스 모두 삭제된다. 이 과정을 통해 정답과 오답을 분리한다.

위의 과정을 종료하면, 현재 arrayCurrent을 다시 구한다. 그 후 `cursor_current`에 넣어주고, `cursor_late`와 비교한다. 한 글자 입력하면 그 전 span에서는 cursor를 제거하고 다음 span에 추가한다. `cursor_late`의 값이 더 커진다면 Backspace를 누른것이므로 옮겨진 커서에 `cursor` class를 추가해주기만 하면 된다.

<br>

### 동작

![](/images/a9a0842e-5931-4821-96fc-7e98ac0bc792-sdfsdfsdfsdfsdfsdfsddfsfdsfd.gif)

위에서 체크한 기능들이 모두 잘 동작하고 있다.

> 마무리

팀원들과 협업을 하며 의사소통하는데 있어 불편함 없이 프로젝트를 잘 진행하고 있다. 그러다 보니 역할 분배 부터 기능 구현까지 활발하게 의논하며 해결해 나가고 있다. 개발자는 코딩 실력도 중요하지만 팀에 얼마나 잘 녹아들 수 있는지도 매우 중요한 덕목인것 같다.

(그리고 Git과 GitHub에 대한 두려운 감정은 많이 사용하다 보니 사라졌다.)