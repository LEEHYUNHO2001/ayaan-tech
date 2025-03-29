---
title: "Speed-Code-Fighter - 1"
description: "Speed-Code-Fighter : 타자연습하는 프로젝트를 설계하기로 했다."
date: 2021-12-21T08:13:20.693Z
tags: ["CSS","JavaScript","html"]
---
> ## Speed-Code-Fighter 프로젝트

타자연습하는 프로젝트를 팀원 2명과 함께 설계하기로 했다. ( [GitHub 레파지토리 주소] (https://github.com/mutsatopia/Speed-Code-Fighter))

모바일 환경에서 이용하는 이용자보다 태블릿이나 pc 에서 사용하는 이용자가 더 많을 것으로 예상하여 PC 서비스만 구현했다.

GitHub 레파지토리를 하나 생성하였고, Fork Workflow 하기로 결정했다. develop 브랜치에서 각 기능에 대한 브랜치를 생성하여 작업을 한 뒤 pull request를 날리는 형식으로 진행한다.

프로젝트 진행사항을 GitHub에서 한 눈에 볼 수 있도록 이슈와 칸반을 이용할 예정이다.

### 컨벤션

- HTML 클래스 명
    
    기능 - ~에 대한 기능인지 (ex : list-combo)
    
- CSS 띄어쓰기(개행)
    - 기능이 변경되는 부분 (ex : header은 붙여 쓰다가 main에서는 한 칸 띄우기)
    - section의 규모가 커질 경우 기능 부분마다 띄어쓸 수 있음
- CSS 선언 순서 (네이버 기준)
    1. display(표시)
    2. overflow(넘침)
    3. float(흐름)
    4. position(위치)
    5. width/height(크기)
    6. padding/margin(간격)
    7. border(테두리)
    8. background(배경)
    9. color/font(글꼴)
    10. animation
- CSS 디렉터리 구성
    - component.css : header, footer
    - screen 디렉터리
        - main페이지
        - HTML 페이지
        - CSS 페이지
- JS
    - 안 변하는 부분 const, 재할당 되는 부분은 무조건 let ( var 금지 )
    - ES6에 맞게 화살표 함수 사용
    
<br>

### Git commit 메세지 형식 정하기

페이지 or 기능 create (이런 식으로.. 그다음에 gitmoji추가.)
develop 브랜치에서 새 브랜치를 생성하여 작업한 후 Merge하는 방식으로 결정

<br>

### 프로젝트 구조


```
  ├─ css
  │   ├─ style.css
  │   │
  │   ├─ components
  │   │   ├─ header.css
  │   │   ├─ footer.css
  │   │   ├─ reset.css
  │   │   ├─ font.css
  │   │
  │   └─ screen
  │       ├─ mainpage.css
  │       ├─ htmlpage.css
  │       ├─ csspage.css
  │
  ├─ gamePage
  │   ├─ htmlpage.html
  │   ├─ csspage.html
  │
  └─ js
      └─ 미정

  index.html
```


먼저 초기 셋팅을 했다. 프로젝트의 구조를 설계하고 README 파일에 대략적인 설명을 작성했다. 그리고 프로젝트의 진행사항을 효율적으로 확인하기 위한 칸반과 커스텀 이슈 템플릿을 설계했다.

프로젝트의 핵심 기능인 타이핑 연습 부분을 먼저 구현할 계획이다. 그 후 여러 가지 언어들을 타이핑 연습할 수 있도록 페이지를 생성할 것이다.
