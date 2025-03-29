---
title: "Git, GitHub - branch, merge"
description: "이제 브랜치를 사용하며 개발해보자."
date: 2021-12-23T09:03:53.390Z
tags: ["git"]
---
프로젝트를 수행할 때, 브랜치를 나누어서 개발을 한다는 말을 매일 들었던거 같다. 이제 개인프로젝트를 하거나 팀 프로젝트를 할때 그렇게 해보려고 한다.

<br>

* **수행하고 싶은 동작**

1. main 브랜치에 처음에 초기 셋팅을 하기
2. develop 브랜치를 생성하기
3. develop 브랜치에서 기능 및 페이지별로 브렌치를 생성할 계획
4. develop 브랜치에서 메인페이지를 구현하기위한 mainPage 브랜치를생성
5. mainPage에서 작업후 develop 브랜치와 merge
6. develop 브랜치에서 서브페이지를 구현하기위한 subPage 브랜치 생성
7. 또 작업 후 develop 브랜치에 merge
8. 무한 반복하다가 마지막에 main에 develop를 merge

<br>

![](/images/77242a90-5cf3-4ec4-bb82-1ddcaea9e737-image.png)

```bash
git push -u origin main
```

로컬과 깃허브를 연결하고 main 브랜치에서 초기셋팅(여기서는 간단한 리드미 파일만 생성)한 후 push를 날려주었다. main 브랜치를 확인해보니 초기셋팅이 완료된 것을 볼 수 있다.

<br>

>## 본격적인 브랜치~

* **mainPage 브랜치**

```bash
git checkout -b develop
```

![](/images/eb381ec7-a140-4c9f-8b6c-99b3c05a334c-image.png)

이제 개발용 브랜치인 develop 브랜치를 생성하자. develop 브랜치를 생성하면서 이 브랜치로 이동해주었다. `git branch`를 해보면 `develop` 이 선택된것을 볼 수 있다.

<br>

```bash
git checkout -b mainPage
```

![](/images/0f010d43-40d8-4051-a129-de0313888f5b-image.png)

이제 develop 브랜치에서 mainPage 브랜치를 생성하고 이동하자.

우리는 develop 브랜치에서 각 기능 및 페이지 마다 브랜치를 생성하여 작업할 것이다. mainPage 브랜치에서는 간단한 메인페이지를 만들고 develop 브랜치에 merge해줄 예정이다.

여기서도 `git branch` 을 해보면 `mainPage`가 잘 나타난다.

![](/images/3e1b8775-cd24-4f86-8a6a-13fb79429cae-image.png)

main.html 을 생성하고 `git add` 와 `git commit`을 해주었다.
두번째 커밋인 **메인 페이지** 가 정상적으로 수행되었다.

<br>

```bash
git push origin mainPage
```

![](/images/27c57468-a285-4c7d-9f70-d2d4eb80fdfb-image.png)

나의 로컬에서 생성해준 mainPage 브랜치를 GitHub(원격 브랜치)에도 생기게 하려면 push 해줘야 한다.

GitHub 레파지토리를 가보니 이제 pr(pull request)을 날릴 수 있게 되었다. 버튼을 클릭해주자.

![](/images/0d323493-7118-419d-9ade-4d2258d5d951-image.png)

적절한 메세지를 담아서 Create pull request 하면 된다. 위에 base: main이라고 되어있는데 develop로 바꾸어서 해주면 된다.

![](/images/9afb984a-14a5-4c79-bfb3-96d6b2b402d6-image.png)

pr이 정상적으로 생성되었다. 이제 merge 해주자.

![](/images/6fe85775-961e-494d-b094-884f17bbf623-image.png)

성공적으로 merge가 되었다.

![](/images/2d0a2ffc-24d8-4dbb-aabc-9eb7a00e68c3-image.png)

![](/images/fb0bc087-9d51-490d-b402-8ead336ebef1-image.png)

![](/images/ab608fdb-cc3e-41c4-8a95-55db7f2c50a9-image.png)

이제 main 브랜치에 main.html이 생겼다. 원격 브랜치 모양을 소스트리로 확인해 보자.
로컬에서는 아직 merge가 되지 않은 것을 볼 수 있다.

<br>

```bash
git checkout develop
git merge mainPage
```

원격에서 mainPage를 merge 해주었으니 이제 로컬에서도 develop 브랜치에 mainPage를 merge를 해주어야한다. 

develop 브랜치로 가서 mainPage를 merge 했다.

<br>

* **subPage 브랜치**

```bash
git checkout -b subPage
```

![](/images/c266d460-dacd-46c0-a7e5-48026dcb8dee-image.png)

![](/images/b4275e4d-9b5f-4e5a-885a-0499714968a8-image.png)

이제 develop 브린채에서 subPage 브랜치를 만들자. 그리고 sub.html을 생성하고 `git add`와 `git commit` 을 했다.

로컬에서 subPage 브랜치가 생성되었고 커밋까지 잘 들어갔다. 원격 브랜치도 포함해서 확인하면 subPage 브랜치가 생성되어 위와 같은 그래프 모양이 나타났다.

<br>

```bash
git push origin subPage
```

내 로컬 subPage 브랜치를 github(원격 브랜치)에도 생기게 하기 위해 다시 push 해주었다.

<br>

이제 위에서 자세하게 다루었던 pr 날리는 부분을 다시 해주면 된다.

![](/images/a1a8b6a2-5848-4d54-a8b9-0e26028a0991-image.png)

merge를 하면 이제 sub.html 파일도 확인할 수 있다. 브랜치는 현재 main, mainPage, subPage를 push했으므로 3개가 있는것이 확인된다.

<br>

```bash
git checkout develop
git merge subPage
```

그 후 develop 브랜치로 돌아가 subPage를 merge 해주면 된다.

![](/images/bdf25496-5e57-4ccb-81dc-859f5443b862-image.png)

이제 develop 브랜치에 subPage가 merge된것을 볼 수 있다.

![](/images/867e1ec9-30cd-4127-be37-376f15f74191-image.png)

원격도 확인해보면 원하는대로 동작이 되었다.

<br>

* **develop 브랜치**

```bash
git push origin develop
```

현재 우리는 develop 브랜치에 있다. 이제 이 브랜치도 push해주자.

![](/images/d335990b-51cd-4966-9982-b4b85fb45907-image.png)

develop 브랜치까지 push되어 GitHub 레파지토리에 브랜치가 4개가 되었다.

<br>

```bash
git checkout main
git merge develop
```

이제 main 브랜치로 가자. 그리고 main 브랜치에서 develop 브랜치를 merge하면 된다.

![](/images/033b92a2-e6b5-4b1d-b665-64573e026425-image.png)

![](/images/2ac5f268-a0a1-4a95-940c-6422f630d25d-image.png)

main 브랜치에 merge된것을 볼 수 있다.

<br>

```bash
git pull
git push origin main
```

![](/images/04bf7ead-e3b1-47a6-b80f-b848c0ba4cd7-image.png)

`git pull`로 변경된 정보를 받아오자. 그러면 로컬에서도 이제 원격과 같이 그래프모양이 화려하게(?) 변했다.

마지막으로 main을 push해주면 끝이난다.

<br>

> 마무리

여러번 반복하다보면 익숙해질 것 같은 작업이었다. amend, stash 등 더 많은 기능을 능숙하게 사용할 수 있도록 더 연습해야겠다undefinedundefined.