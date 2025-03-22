---
title: "nginx 프로젝트 배포"
description: "구름 IDE를 이용"
date: 2021-11-23T08:42:38.496Z
tags: ["Backend"]
---
>## 구름 IDE 이용

![](/images/141170c2-4b36-4fc9-be93-b7bbf4980202-image.png)

[구름 IDE](https://ide.goorm.io/)에 회원가입을 하고 컨테이너를 생성해주기 위해 위의 화면으로 왔다. 
( 구름 IDE는 [IaaS](https://www.redhat.com/ko/topics/cloud-computing/iaas-vs-paas-vs-saas)를 제공한다. )

![](/images/df66ffee-4a7a-4376-9db7-3f2d23dd7a9f-image.png)

컨테이너를 생성하면 VScode와 비슷한 UI가 나타난다. 이제 CLI로 작업을 해보자.

`git clone https://github.com/paullabkorea/10000hour.git`

이 명령어로 GitHub에서 간단한 프로젝트 하나를 Clone했다.

`sudo apt-get install nginx`

nginx가 설치되어있지 않을 수 있어 설치해주었다.

![](/images/f354b6f5-6949-4e97-b6cf-9e8b9ef4601c-image.png)

`vi /etc/nginx/sites-available/default`

명령어를 작성하고, root 값을 나타내는곳에 빨간 동그라미와 같이 작성해준다. (Clone한거 있는 디렉터리 경로)

![](/images/d3a1a9d0-4c55-4b35-9360-90ded61ca8b6-image.png)

`sudo service nginx start`

이제 서비스를 시작해보자. 위의 명령어를 입력해주면, Starting nginx nginx ...done. 가 나타난다. 정상적으로 작동한 것이다.

![](/images/17d47d91-a6ee-4f9f-a6dc-d85d30564f62-image.png)

이제 프로젝트 창의 실행 URL과 포트를 선택하고 나오는 주소로 들어가자.

![](/images/f9dfe760-84a0-4a47-a1a4-153305ca23c3-image.png)

서비스가 정상적으로 동작하는것이 보인다.
GitHub 정적 Page 배포랑 역할이 비슷한 것 같다. 
~~하지만 이건 DB도 다룰 수 있고..~~ 

![](/images/fb6eabec-4d73-42a8-bf19-55bd58eb55c6-image.png)

프로세스를 보기 위해 `ps` 와 `ps aux`를 입력해 주었다.

`sudo service nginx stop` 으로 서비스하던 것을 중지할 수 있다.

<br>

> 간단한 Linux 문제

1. ls 명령 시 숨김 파일도 모두 출력되도록 alias를 설정하세요.
답) **alias ls='ls -a'**
2. 위에서 설정한 alias를 해제하세요.
답) **unalias ls**
3. 긴 명령어를 쳤는데 오타가 났다. 기존에 명령어를 불러와 수정하는 방법은 무엇인가요?
답) **위 방향키**
4. 자동완성 키는 무엇인가요?
답) **Tap**
5. 현재 폴더에 다음과 같이 폴더와 파일을 만들고 tree 명령어를 이용해 이를 아래와 같이 출력하세요.
    1. tree는 기본 설치가 안되어 있습니다. 인터넷을 통해 tree설치 명령어를 알아내세요.
    답) **`apt-get install tree`** 설치
    2. 폴더 트리
        
        ```bash
        
        .
        ├── README.md
        ├── a
        │   ├── one.txt
        │   └── two.txt
        └── b
            ├── c
            │   └── four.txt
            └── three.txt
        
        ```
        
6. 현재 폴더 기준으로 확장자가 .js 파일을 모두 출력하세요.
답) **find . -name '*.js'**
7. 현재 폴더 기준으로 확장자가 .js 파일인 것을 result.txt에 저장하세요.
답) **find . -name '*.js' > result.txt**
8. 현재 경로를 표시해보세요.
답) **pwd**
9. a 폴더에 있는 one.txt를 change.txt로 이름 변경을 해보세요.
답) **mv one.txt change.txt**
10. change.txt를 b폴더에 옮겨놓으세요.
답) **mv one.txt ../b/change.txt**

* 그 외
chmod 700 test.py
chmod(Change Mode)
파일의 종류 / 소유자 / 그룹 사용자 / 기타 사용자
rwx - 읽기(4), 쓰기(2), 실행(1)

> 마무리

![](/images/76f774bd-360e-4fe4-83b8-e36d1dadc0d0-image.png)

vmware에 Ubuntu를 설치하여 사용해본 경험이 있어 명령어들을 사실 어렵지 않았다. 그래서 쉽게 따라해볼 수 있었는데, 구름 IDE 정말 편리한거같다.
