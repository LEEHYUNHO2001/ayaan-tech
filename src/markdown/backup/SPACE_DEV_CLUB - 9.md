---
title: "SPACE_DEV_CLUB - 9"
description: "UI 수정과 상세 페이지 스키마"
date: 2022-01-24T02:00:31.807Z
tags: ["React","next","typescript"]
---
<img src="https://cdn.pixabay.com/photo/2021/11/26/20/45/lantern-6826698_960_720.jpg">

## 오늘의 할일

### UI 수정

![](/images/bfcbc1d0-2bc2-464e-90fd-b29b79a6b91a-image.png)

통계 수정 삭제 부분은 내가 작성한 글일 경우에 보인다. 다른 사람의 글이면 없어야 하는 부분이므로 코드를 수정해줘야 한다. 그리고 글 작성자 닉네임 옆에 빨간 밑줄 부분에 글의 작성 날짜가 있어야한다.

<br>

### 날짜 기능

![](/images/b67636b9-88e1-414d-bd87-aa3725956b39-image.png)

댓글에서도 사용되는 기능이다. 작성한지 오래된 글이나 댓글 같은 경우에는 'OO전' 이 아니라 '2021-01-02' 와 같이 표시된다. 이 경우도 생각 해야겠다. ~~6시간 전 이런것도 있던데...~~

```ts
//utils/dateLogic.ts
let today = new Date();
let todayDay = today.getDay();

export const handleDate = (createdAt: string) => {
  let day = new Date(createdAt);
  day.setDate(day.getDate() + 7);
  if (today.getTime() > day.getTime()) {
    day.setDate(day.getDate() - 7);
    return (
      day.getFullYear() +
      "년 " +
      (day.getMonth() + 1) +
      "월 " +
      day.getDay() +
      1 +
      "일"
    );
  } else {
    console.log(day.getDay(), todayDay);

    return day.getDay() - todayDay === 0
      ? "오늘"
      : Math.abs(day.getDay() - todayDay) + "일전";
  }
};


```

날짜 기능의 경우 댓글과 상세 페이지에서 뿐만 아니라, 홈의 카드 컴포넌트나 관심있는 포스트 등등에서 사용된다. 공통으로 사용되는 함수이므로 utils에 배치했다.

handleDate함수는 DB에서 받아온 createdAt을 props로 받는다. 7일전까지의 글은 'OO전' 형식으로 보여주고, 그 외는 날짜로 표시하였다.

```jsx
import { handleDate } from "../../utils/dateLogic";

<div>{handleDate(createdAt)}</div>
```

사용할 때는 handleDate 함수를 불러와 createdAt 정보만 넘겨주면 된다.

![](/images/53582cd7-e804-4f97-a7c0-13cc2c7f39db-image.png)

![](/images/4b52b6dd-0445-478c-8be8-01d059e92c49-image.png)

잘 적용된것을 볼 수 있다.

사파리에서는 new Date() 를 사용했을 때, 다르게 보일 수 있다. 문제가 발생한다면 [다음에 이 글을](https://tom-dlog.tistory.com/entry/JS-Safari%EC%97%90%EC%84%9C-new-Date-%EA%B0%9D%EC%B2%B4-Invalid-Date-%EB%A6%AC%ED%84%B4-%EB%B0%9B%EB%8A%94-%EA%B2%BD%EC%9A%B0) 보면서 해결해야겠다.

### user에 따른 UI

상세 페이지의 글이 나의 글이거나 댓글이 나의 댓글이면 수정 또는 삭제가 가능해야 한다. user에 따라 설정해주면 된다. 아직 Back단 연결이 안되어있으므로 user의 데이터가 없으면 보여주지 말자.

![](/images/21bef60c-8627-42bd-ae63-104972997014-image.png)

나의 글이 아니면 통계, 수정, 삭제가 안보이도록 한다.

![](/images/c5e2bcc0-97d3-4e68-bc3b-9c2ef59c10d1-image.png)

댓글을 작성한 사람의 id값과 로그인한 유저의 id값이 일치한다면 수정 삭제가 가능하도록 구조를 잡아주고 UI를 설계했다.

<br>

### 데이터 구조

#### 상세 페이지

Back단은 strapi를 사용할 것이고 배포는 헤로쿠로 되어있다.(셋팅은 이미 완료)
이제 상페 페이지의 데이터 구조에 대해 파악을 하고, 스키마를 생성한 후에 데이터를 넣어 테스트 해보면 된다. 오늘은 데이터 구조를 파악해보려고 한다.

![](/images/1dd48f5f-e489-4772-80ee-8b5a9a18bf03-image.png)


* **Post 스키마**
Velog의 상세 페이지를 들어가면 처음으로 보이는 곳부터 분석하자.
1. 글을 생성할 때, 작성하는 제목이 보인다. **postTitle**이라는 colunm이 존재해야 한다.

2. 글 작성자의 닉네임이 있어야하고, 클릭하면 해당 사용자의 velog 페이지로 넘어가야 한다. **userId** 를 넣어주고, 닉네임은 이 column을 이용하여 찾아내면 된다. 작성 날짜에 대한 것은 **createdAt**에 있다. 데이터를 생성하면 postgreSQL에서 자동으로 생성 시간을 넣어준다. (해시태그는 따로 스키마 존재)

3. 글의 좋아요 넘버를 표시할 like도 필요하다. 이것은 **LikePost** 스키마에서 가져올 것이다. 이 스키마에는 **postId**와 **userId**가 있다.

4. 어느 시리즈에 속해 있는지에 대한 **seriesid**와 시리즈에서의 순서인 **seriesIdx** 가 있다. ~~시리즈에 대한 스키마는 아직 고민중이다.~~

5. 글의 본문 부분을 모두 **postDesc** 에 넣으면 된다. 참고로 데이터는 `## strapi` 와 같이 마크 다운 형식으로 들어간다. 불러올 때, viewer로 변환해주는 것이다.

6.  postDesc 에서 헤드 태그만 뽑아서 오른쪽 헤더에 놓을 것이다.(이 부분은 따로 column이 필요 없을 것 같다.)

7. 임시 저장이 되었을 경우에는 글이 출시되면 안된다. 하지만 DB에는 데이터가 저장되야 한다. **published** 의 `true`, `false` 에 따라 판단할 것이다.

8. postgreSQL에서 자동적으로 **id**를 부여한다.

* **Post**

|id|userId|title|desc|published|url|
|---|---|---|---|---|---|
|1|3|Strapi|풀 스택 프로젝트에서 ~|true|주소|

id값이 3인 user가 "Strapi"라는 제목의 글을 작성했고, 풀 스택 프로젝트에서 ~라는 내용을 담고있다. published가 true가 되면 글이 출시가 된 것이다. (false면 임시저장으로 출시는 안된 상태)
게시글 수정시 url도 수정할 수 있다. 그것을 위한 url column이다.
상세 페이지를 들어갈 경우 `닉네임/글url` 이므로 동적 라우팅을 구현할 예정이다.

* **LikePost**

|postId|userId|
|---|---|
|4|1|

좋아요 같은 경우에는 한 글에 여러 사용자가 누를 수 있다. **1:N 관계**이다. 좋아요를 눌렀던 유저가 다시 누르면 취소되어야 하는 기능까지 구현해야 할 것이다.

1의 id값을 가진 user가 id 4값의 게시글을 좋아요하고 있다.

<br>

* 해시태그

Post 스키마에 해시태그에 대한 column을 문자열로 넣어줄 수 있다.
ex) #react#redux
이 방법은 해시태그를 추가/수정이 간단하지만, 해시태그를 이용한 Post 검색이 어렵다. 그래서 아래의 방법을 사용하기로 했다.

**posthashtag**

|postId|tagId|
|---|---|
|3|2|

id값이 3인 게시글은 id값이 2인 해시태그 데이터를 보고있다.

**hashtag**

|id|name|description|
|---|---|---|
|2|react|리엑트입니다.|

id값이 2인 hashtag 스키마에는 react라는 이름이 들어있다. description에는 해당 태그의 설명을 넣으면 된다. (태그를 설명하는 페이지도 있다..)

즉, id값이 3인 게시글에 react라는 해시태그가 달려있다는 것을 알 수 있다. 

이 구조를 사용하여 해시태그가 생성될 때의 전체적인 동작을 설명해보겠다. Post에 react 해시태그를 등록하면, 먼저 hashtag 스키마에서 react라는 name의 데이터가 있는지 찾는다. 없으면 생성하고 있으면 생성하지 않는다. 

Post에 글을 추가하면, 이 글의 id값을 구해 posthashtag 스키마에 넣는다. 그리고 이 데이터에 해당 게시글에 들어있는 tagId(해시태그들)값들이 들어간다.

위의 예시에서 hashtag 스키마에 id값이 2이고 name이 redux일 경우 id값이 3인 게시글에는 react와 redux라는 해시태그가 들어가 있는 것이다.

글과 해시태그를 수정할 경우 사용하는 해시태그와 새로 추가 및 삭제된 해시태그를 주의하자.

글을 삭제할 경우에는 posthashtag와 Post의 관계 설정시 `ON DELETE CASCADE`을 사용하자.

[참고](https://velog.io/@juna-dev/%ED%95%B4%EC%8B%9C%ED%83%9C%EA%B7%B8-%EA%B5%AC%ED%98%84%ED%95%98%EA%B8%B0-9ak4xocihh)

<br>

#### 대댓글

댓글 또는 대댓글이 생성되면 자동으로 값이 1씩 증가하는 **id**값이 있다. 그리고 내용에 관한 **comment** column도 있다.

어느 사용자가 남겼는지 프리필과 닉네임을 가져오기위해 **userId** 가 필요하고, 어느 게시글에 작성했는지 알아야 하므로 **postId**도 있어야한다.

A가 댓글을 작성한 후 B가 댓글을 작성했다. C가 A의 댓글에 대댓글을 남겼다면, A B C 순서대로 글이 보이는것이 아니라 A C B로 보여야한다. 이 부분은 **depth**를 이용할 것이다. 0이면 부모이고 1이면 자식이다.

**order**는 댓글 또는 대댓글의 순서이다. 페이지 처리 부분에서 정렬할 필요가 없어 효율적인 코드를 만들어 준다.

**group**은 어느 댓글에 어떤 대댓글이 달렸는지 판단하기 위한 column이다. 대댓글은 댓글의 id값을 가질 것이다.

마지막으로 댓글이나 대댓글을 삭제했을 경우이다. boolean의 **is_deleted** column을 사용하여 true일 경우 "삭제된 댓글입니다."를 보여주려고 한다.

|id|comment|postId|userId|depth|order|group|is_deleted|
|---|---|---|---|---|---|---|---|
|1|좋은 글이네요|3|2|0|0|1|false|
|2|그러게요 ㅋㅋ|3|5|1|0|1|false|
|3|저는 별로입니다|3|3|0|1|2|false|
|4|정말 좋아요!!|3|4|1|1|1|true|

1. 댓글로 `좋은 글이네요` 가 달렸다. 이 댓글은 id가 3인 게시글에 달렸고, id가 2인 사용자가 달았다. 깊이는 0이므로 댓글이다.

2.  `그러게요 ㅋㅋ` 라는 글이 달렸다. id값이 5인 사용자가 작성하였고, 깊이가 1이므로 대댓글이다. 그룹이 1인걸로 보아 `좋은 글이네요`의 대댓글이다.

3. `저는 별로입니다`라는 글은 깊이가 0이므로 댓글이고, 그룹이 2이다.

4. 마지막에 `정말 좋아요!!` 글이 생성되었고 깊이가 1로 대댓글이다. order와 그룹이 1이므로 `그러게요ㅋㅋ` 다음에 오는 `좋은 글이네요`의 대댓글이 된다. 하지만 마지막에 is_deleted이 true가 되어 "삭제된 댓글입니다."가 나타날 것이다.

![](/images/bcff340c-8c63-4dbe-9a21-0179923bb461-image.png)

즉, 위와 같이 나올것이다.

### 나중에 도전해볼 것

#### 조회수

![](/images/6c169e96-9409-4841-9bd2-40324de938f0-image.png)

통계를 누르게 되면 게시글의 조회수를 통해 그래프가 나타나게 된다.

![](/images/15972508-10e6-4a8e-b401-c68c90b35b33-image.png)

React에서 사용하는 차트에 대한 라이브러리에는 Nivo.rocks, Recharts, React Vis, Apexcharts, Victory, Chartjs 등이 있다. 조회수에 대한 그래프는 위의 라이브러리중 하나를 사용할 것 같다.

<br>