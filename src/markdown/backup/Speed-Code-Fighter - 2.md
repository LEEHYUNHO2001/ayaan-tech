---
title: "Speed-Code-Fighter - 2"
description: "Branch 문제 해결. 현재 기능과 구현할 기능."
date: 2021-12-27T10:22:04.927Z
tags: ["CSS","JavaScript","git","html"]
---
## Branch 문제 해결

프로젝트 초기 셋팅을 할 때, organization에서 레파지토리를 생성한것을 Fork하여 풀 리퀘스트를 보내는 방식을 사용했었다. 로컬에서 develop 브랜치를 생성하여 풀 리퀘스트 날렸지만, 원격 저장소를 보면 develop 브랜치는 없다. 그래서 gi clone으로 원격 저장소를 가져와서 아래의 작업을 해주었다.

```bash
git pull
```

먼저 git pull로 업데이트 상황을 받아왔다.

![](/images/0ebdf35e-997c-4027-baa9-8a12a9953093-image.png)

```bash
git branch -r
```

브랜치들을 확인해보니 여러 시도의 흔적(~~못생긴 브랜치~~)이 보인다.

![](/images/e983dcba-e3b1-4f00-9aa1-ab0c555a2a72-image.png)

```bash
git checkout -t upstream/develop
```

develop 브랜치를 생성한 후에 간단한 html 파일을 생성하고 `git add`, `git commit` 하고 push해 주었다.

![](/images/3026dc7b-233f-4fad-9568-4169483b0213-image.png)

정상적으로 organization에서 develop 브랜치가 생성되었다. 이제 Fork Workflow에 맞게 풀 리퀘스틑 보내고, develop 브랜치에 merge 시키면 된다.

`git checkout -b main-function`

`git push origin main-function`

풀 리퀘스트를 보내고 develop에 merge한다.

`git pull upstream develop`

팀원의 풀 리퀘스트를 merge한 후에는 pull 해주자.

![](/images/30a30c20-f793-4dc1-b783-0000c1d9c53d-image.png)

이제 조금씩 사용법을 알게 되는 것 같다.

<br>

* **그 외**

![](/images/9f5046f7-eb5b-45c0-ae45-a916b68ef363-image.png)

설정에서 defualt 브랜치도 develop 으로 변경해주었다.

<br>

![](/images/7e3347c1-e1e1-4793-9862-dfaebc8cdf6f-image.png)

그리고 이슈를 작성하고 칸반으로 보며 프로젝트 진행사항을 한눈에 확인하고 있다.

<br>

## 메인 기능 구현

![](/images/3b6deece-d32c-46c8-a85a-9e7ec04b042c-ffont.gif)

현재 위의 기능까지 구현이 되었다. 시간초를 1부터 카운팅 하는것이 아닌 60부터 감소하는 형태로 바꾸려고 한다. 그래서 시간 안에 코드를 타이핑 하면 다음 단계가 나타날 수 있도록 설계할 것이다.

주어진 코드의 양이 많으면 박스를 넘어오고 있는데 안에 스크롤을 만들고 코드 한줄을 입력하면 스크롤을 자동으로 한줄 내려주도록 기능을 추가해주려고 한다.

그 외에도 현재 위치를 커서로 나타내도록 하고, 다음 인덱스에 해당하는 키보드 자판을 표시하는 등의 기능 구현들을 추가할 것이다.