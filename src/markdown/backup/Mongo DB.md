---
title: "Mongo DB"
description: "설치 및 간단한 명령어 입력해보기"
date: 2022-01-06T08:02:36.410Z
tags: ["Backend"]
---
## 설치

> Window 환경

![](/images/d578eae9-d14a-4517-b778-ff3ae8a35d06-image.png)

오늘은 몽고 DB를 사용해보자. 
[몽고 DB 사이트](https://www.mongodb.com/try/download/enterprise)에서 설치파일을 다운로드하고 설치한다.

그리고 C 드라이브에 가서 어디에 설치되어 있는지 확인한다. 

![](/images/2c4cabeb-942a-4715-b27b-8914351b05dc-image.png)

나의 경우에는 위와 같다. bin 폴더까지 들어와 위의 경로를 복사해주자.

![](/images/1a81ed8a-21ab-48b9-b414-cab2fc3c8aec-image.png)

시스템 환경 변수에서 Path에 방금 복사한 경로를 추가해주면 된다.

![](/images/2d2b98a1-2f49-4b02-a165-cbafc7e5d21e-image.png)

이제 브라우저에서 localhost:27017에 가보자. "It looks like you are trying to access MongoDB over HTTP on the native driver port."가 나타나면 준비 완료다.

<br>

## 시작

![](/images/0e7b3453-6b23-444e-81fa-f98972f64bb9-image.png)

```bash
mongo
```
mongo를 입력하면 몽고 DB를 시작한다. 이제 몽고 DB의 명령어들을 입력할 수 있다. 예를들어 `help`를 입력하면 몽고 DB가 가지고 있는 명령어들을 보여준다.

* show dbs : 현재 만들어져 있는 데이터베이스 목록을 확인
  - admin : root 데이터베이스로 admin에 추가된 사용자는 MongoDB내의 모든 데이터베이스에 대하여 모든 권한을 획득할 수 있다. 서버 전역에 걸친 모든 명령어는 admin에서만 실행 가능하다.
  - local : 특정 서버에만 정보를 보관하는 곳으로 복제가 불가능하다.
  - config : MongoDB는 샤딩을 지원하며, config는 샤드 정보를 저장하는데 사용된다.

* cls : 터미널 창을 깨끗하게 청소

* exit : Ctrl + C 와 같은 역할. 종료.

<br>

> 마무리

이제 몽고 DB를 사용할 준비가 되었다. 데이터를 삽입하고 불러오고 이런 로직들은 공식 문서를 보며 공부하는게 좋을 것 같다.