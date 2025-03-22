---
title: "SPACE_DEV_CLUB - 4"
description: "rebase로 문제 해결하기"
date: 2022-01-05T16:49:00.314Z
tags: ["git"]
---
## Git rebase

프로젝트는 main 브랜치가 있고 개발을 진행할 develop 브랜치가 있다. 나는 develop 브랜치에서 상세 페이지의 헤더를 구현하는 details/header 브랜치를 생성하여 설계하고 있었다.

그런데 중간에 팀원들과 새로운 모듈을 사용하기로 결정이 났다. 나는 작업하던 브랜치에 모듈을 설치하고 상세 페이지를 마저 설계하고 있었다.

몇분 뒤 모듈이 적용된 브랜치가 원격에 merge 되었다. 나는 이미 따로 설치했는데.. 음.. 일단 풀 받아보자.

```bash
git checkout develop
```

![](/images/14cba9a5-6a7f-4096-98a4-e1c0920fac05-image.png)

나는 develop 브랜치로 돌아가 `git pull upstream develop`으로 풀을 받으려고 했지만 오류가 나타났다. 변경사항이 있다는 의미인거 같다.

다시 작업하던 브랜치로 가서 설계하던 부분을 마무리하고 commit 해주었다. 그리고 다시 develop 브랜치가서 풀 해보니 받아졌다. 이제 develop에 풀 받은 모듈을 details/header 브랜치에서 어떻게 사용할까.

```bash
git rebase -i develop
```

**details/header** 브랜치에 가서 develop과 rebase해준다. 

![](/images/35a9d819-eca2-4b25-b9eb-80d2a3992c40-image.png)

rebase 후에 `git log`로 확인해보면 details/header 브랜치에서 rebase하기 전에 분명 commit했었는데 사라졌다. 대신에 원격의 최신 커밋이 생겼다.

![](/images/7df664c6-b33c-4e63-a3cd-9067f213b2cd-image.png)

그리고 `git status`로 확인해본 결과 커밋햇던 파일들은 add가 되어있었고 package.json과 yarn.lock 파일이 수정되었다고 나타난다. 모듈을 받은 원격의 브랜치를 풀 받았으니 당연한 것이다. 저 두개도 add 하고, commit을 해보았다. 그랬더니 내가 details/header에서 날렸던 커밋 메세지가 그대로 적용되어 있었고 추가 수정이 가능했다.

![](/images/875bedae-bb28-4421-aece-d56ad5877b37-image.png)

그렇게 commit을 하고 log를 찍어보니 내가 원하던 결과로 되었다. 

```bash
yarn dev
```

![](/images/00567c8d-4d60-4b02-9940-6b2293fab492-image.png)

이제 프로젝트를 실행해보자. 후.. 이건 또 무슨 에러인가.

![](/images/fde1d000-9116-44c9-a2a3-4c422a37a825-image.png)

package.json에서 내가 설치한 모듈과 원격에서 pull 받아온 모듈이 같은 모듈이지만 충돌한것 같다.

근데 자세히 보니 충돌이라고 할 것도 없었다. 초록부분과 파란부분 지워버리고 다시 `yarn dev` 했다.

undefined

드디어 정상적으로 동작한다. 이전 글에서와 UI가 달라진 부분은 svg를 사용하지 않고 material을 사용하게 되었다는 것이다. 이제 잠을 잘 수 있겠다. ( --편안-- )

아 정말 마지막으로 `git rebase --continue` 해주자. rebase하고 컨플리트 해결하면 입력해줘야 한다.

<br>

> 마무리

## 2022-01-05 회의

* 폰트 및 아이콘을 통일
1. 프리텐다드 [https://cactus.tistory.com/306](https://cactus.tistory.com/306)
2. 노토 산스 [https://fonts.google.com/noto/specimen/Noto+Sans+KR](https://fonts.google.com/noto/specimen/Noto+Sans+KR)
3. 아이콘참고: [https://www.daleseo.com/material-ui-icons/](https://www.daleseo.com/material-ui-icons/)

* 브랜치명에 대한 스타일
editor / feature
( 컴포넌트 / 기능 )

* 미디어 쿼리
constants 디렉터리에 값 정함

* 이슈 및 프로젝트 칸반 사용
![](/images/bdb6f72e-e6e8-4719-89c7-f420e1522220-image.png)
라벨은 커스텀으로 생성한 라벨 사용