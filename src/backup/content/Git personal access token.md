---
title: "Git personal access token"
description: "평소처럼 git push를 하는데 에러가 발생했다. 에러의 원인은 2021년 8월 13일부터 패스워드 기반 인증을 지원하지 않기 때문이다."
date: 2021-08-17T06:15:14.322Z
tags: ["git","github"]
---
> ## Git push Error

undefined

평소처럼 **git push**를 하는데 **에러**가 발생했다. 에러의 원인은 2021년 8월 13일부터 **패스워드 기반 인증을 지원하지 않기 때문**이다. 깃 토큰 인증을 통해 이 문제를 해결했다.

> ## 깃 토큰 인증

undefined

1. 깃허브 로그인 후 **우측 상단 프로필의 Settings**로 들어간다. 그 후 좌측 메뉴에서 **Developer settings**을 클릭하자.

<br />

undefined

2. 좌측 메뉴 **personal access token**에서 **Generate new token**을 눌러 토큰을 생성한다. 설정들이 있는데 본인은 **repo만 선택**해 주었다.

<br />

3. 토큰 정보는 처음에 한번만 보여주기 때문에 복사해서 저장해야한다.

<br />

undefined

4. 이제 vscode 터미널창에서 다시 push를 해준다. Password 입력란에는 ctrl + shift + v 단축키를 누르고 엔터를 입력하면 토큰이 입력된다.

push할때마다 토큰을 입력해주기 번거롭다고 생각되면 ssh인증을 해주면 된다.
