---
title: "Jungle Cinema"
description: "작은 프로젝트에도 심혈을 기울이자."
date: 2021-11-06T15:10:30.511Z
tags: ["CSS","html"]
---
![](/images/a91f9bd0-1db9-4190-872a-510d8a82dc2c-__1_(1).png) 

HTML/CSS를 이용하여 위의 사진처럼 결과물을 만드는 과제를 하나 수행하게 되었다.

HTML 구조에 신경쓰고 div를 최대한 사용하지않으며 시맨틱하게 짜려고 많은 고민을 했다. 그리고 유지보수성을 생각하여 class도 의미있게 이름을 지어주려고 노력했다. 그 결과 HTML을 설계하는데도 한시간은 걸린거같다.

![](/images/c3cb951c-6373-4161-bc6b-8cc6b546f604-image.png)

```html
<h1 class="sr-only">정글 시네마</h1>
<section class="jungle_cinema">
  <header class="jungle_header">
    <h2 class="jungle_h1">정글 시네마 영화 목록</h2>
    <nav class="jungle_menu">
      <h3 class="sr-only">영화 정보 목록</h3>
      <a href="#" class="menu_current">현재상영영화</a>
      <a href="#" class="menu_intended">개봉예정영화</a>
      <a href="#" class="menu_boxoffice">박스오피스</a>
    </nav>
  </header>
```

header의 구조는 이와 같다. h1과 h3는 구조상 작성해준 헤더이다. 나중에 CSS에서 보이지 않도록 처리할 것이다. 

"정글 시네마 영화 목록"은 h1태그로 감싸주었다. 

만약 이 서비스가 시행된다면 "현재상영영화", "개봉예정영화", "박스오피스" 부분은 클릭하여 이용할 것이다. 그러므로 a태그를 이용하여 설계하였고, CSS에서 flex로 정렬하기 위함과 가독성을 위해 nav태그로 감싸주었다.

이렇게 완성된 header는 jungle_cinema라는 section에 감싸져있다. 이는 전체 박스의 속성을 담당할 친구이다.

![](/images/7425fdda-0b1a-4318-85a9-b3892f38c393-image.png)

```html
  <section class="movie_section">
    <h3 class="sr-only">현재 상영 영화 목록</h3>
    <ul class="movie_list">
      <!-- 나중에 li 8개가 될것임-->
      <li class="movie_list_item">
        <article class="movie_art">...
        </article>
      </li>
    </ul>
  </section>
</section>
```

header와 형제인 movie_section을 보자. 여기에는 영화의 사진, 제목, 개요, 평점 등이 들어가있는 UI가 각각의 article로 들어가 있다. 영화가 8개이므로, article도 8개가 될 것이다. 설계할때는 먼저 1개만 만들면서 작업했다.

```html
<article class="movie_art">
  <h4 class="sr-only">영화 상세 정보</h4>
  <figure class="movie_fig">
    <img src="./img/영화목록페이지/포스터_위니브월드.png" 
         alt="위니브월드_poster" class="movie_poster">
    <figcaption class="movie_name">위니브 월드: 새로운 시대</figcaption>
  </figure>

  <div class="information">
    <div class="genre_star">
      <div class="genre_div">
        <span class="genre">개요</span>
        <span class="genre_name">판타지</span>
      </div>
      <div class="star_div">
        <span class="star">평점</span>
        <img src="./img/별점/별점이미지.png" alt="star" class="star_img">
        <span class="star_num">9.05</span>
      </div>
    </div>
    <div class="release_div">
      <span class="release">개봉</span>
      <span class="release_num">2021.03.27</span>
    </div>
    <div class="actor_div">
      <span class="actor">출연</span>
      <span class="actor_name">라이캣, 소울곰, 개리씨</span>
    </div>
    <div class="atc_btn">                       
      <a href="#" class="reservation">예매하기</a>
      <a href="#" class="trailer">
        <img src="./img/영화목록페이지/아이콘_재생.png" alt="play" class="play_icon">
        예고편</a>
    </div>
  </div>
</article>
```

![](/images/e822e3a1-0760-4c63-b5e3-7c55d9ecfa76-image.png)

article 안을 살펴보자. 먼저 h4는 구조상 작성해준 헤더이고, CSS에서 가려줄 것이다. 사진을 보면 포스터와 영화 제목이 있다. 이것은 figure태그 안에 img와 figcaption을 이용했다. 

나머지는 방금 설명한 figure와 형제이고, information이라는 class의 div로 감싸주었다. 개요, 평점, 개봉 등이 있을 부분이다.

위의 사진처럼 box들을 분리했다. HTML을 모두 설계 한 후에 다시 코드를  보니 역시나.. div태그가 있었다. 더 노력해야겠다는 생각을 다시한번 하면서 CSS 작업에 들어갔다.
 
![](/images/8846e26a-98dc-412d-8f3c-9642afbf4cf1-image.png)
 
CSS는 수월하게 진행되었다. ~~HTML 설계보다 당연히 시간은 오래걸렸지만..~~

HTML을 작성하면서 어떻게 CSS를 설계할 것인지 미리 생각하면서 했기때문에 막힘없이 했던거 같다.

 ![](/images/1fa2b3e6-839e-4322-bd51-5007446cac60-image.png)

 font-family는 정글에 어울리는 귀여운 폰트로 골랐다. 결과물만 보면 아주 완벽해보인다. 실제로도 만들고나서 5분동안 뿌듯했다.
 
하지만 나는 보면 볼수록 마음에 들지 않았다. UI를 보고, 나의 코드를 보다보니 불만들이 생기기 시작했다.
 
 <br>

1. **메뉴버튼 **

메뉴 항목을 누를때마다 화면이 전환되고 검은색글씨 회색글씨가 바뀌길 원했다. 

 ![](/images/c99ca0b9-37b2-4fea-8abc-1c6ff3dc6eaf-%EC%A0%95%EA%B8%80.gif)
 
```html
<!-- 현재상영영화의 html파일 -->
<a href="#" class="menu_current">현재상영영화</a>
<a href="./레이아웃2.html" class="menu_intended">개봉예정영</a>

<!-- 개봉예정영화의 html파일 -->
<a href="./과제003_레이아웃_.html" class="menu_intended">현재상영영화</a>
<a href="#" class="menu_current">개봉예정영화</a>
```

html파일을 하나 더 만들었다. 그리고 두개의 html파일에서 a태그의 class값을 반대로 주어서 검은굵은 글씨와 회색투명 글씨가 반대로 적용되도록 했다. 그 결과 같은 CSS파일을 적용해주어도 동작을 잘 하게 되었다. 
~~js없이 최대한 효율적으로 도전..~~
 
 <br>

 2. **비효율적인 코드..**

'현재상영영화'와 '개봉예정영화'는 같은 구조를 가진 html을 사용하고 있다. 하지만 다른 파일로 존재한다. 또한, '현재상영영화'에서 구조가 똑같은 article이 반복되고있다. 만약에 article이 10,000개면 코드가 몇줄일까..? 

 <img src="https://media.vlpt.us/images/gbsjms/post/8b6573c8-3558-4a24-a709-1f33e2e15a18/js.jpeg" />
 
비슷한 구조는 템플릿으로 사용하고, 영화를 담고 있는 article은 컴포넌트로 분리해주고 싶다. 매우 효율적인 코드로 변할것이라고 생각한다. 하지만 여기서 HTML과 CSS의 한계점이 보인다. JS없이는 힘들어보인다.
 
<br>

3. **ellipsis**

'눈떠보니 코딩테스트 전날'의 영화를 보면, 글자가 길어서 ... 처리 되었다. 나는 텍스트로 ...을 입력해주었다. 근데 아무리 생각해도 마음에 들지 않았다.

![](/images/8edcbea3-5150-4c9d-be71-0b38eafb19ae-image.png)

```css
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
```

이제 영화의 이름이 길면 자동으로 ...처리가 될 것이다. 점점 마음에 드는 작품이 되어가고 있는 느낌이다.

<br>

4. **반성해야 할 무지성 설계**

* **예매하기, 예고편 버튼**

예매하기 예고편 버튼을 너무 무지성으로 설계했다. 픽셀이 조금만 어긋나도 모양이 흐트러질 것이다.

![](/images/3ef55b17-b1d9-44cd-a261-fbcb7ec2aa2c-image.png)


 그래서 그 전보다는 효율적으로 설계하기위해 많은 생각을 했다. 결론은 가상요소 선택자였다. 
~~위의 사진을 보면 이해가 갈 것이다.~~
 
 <br>

* **반응형**

article끼리의 간격도 margin으로 주고있었다. 반응형으로는 동작하지 않고, 한줄에 항상 4개의 영화만 보여줄 것이다. 

![](/images/7ecd6687-ea1e-4e49-9008-0ac72ca12420-image.png)

flex로 했을 경우, 화면에 영화의 갯수가 꽉 채워지면 문제없지만 위의 사진과 같이 그렇지 않다면 문제가 생긴다.

이것을 해결하는것이 grid라고 한다. 나중에는 이 부분을 grid로 바꾸어 반응형으로 처리해보겠다.
 
 <br>


> 마무리


![](/images/1c129ed1-5f2a-49ab-976e-decb9629aadb-%EC%A0%95%EA%B8%80%EC%8B%9C%EB%84%A4%EB%A7%88.jpg)
단순하게 과제하는것이 아니라, 효율적으로 설계하기 위한 고민과 여러가지 도전을 해본 경험이 되었다. 쉬운 작업임에도 불구하고 꽤 많은 시간을 들이게 되었는데 정말 시간가는줄 모르고 한거같다.

글자에 margin, padding 보다는 line-height를 많이 사용한다는 것을 새로 알게 되었다.
 
>HTML을 잘 설계했는지 확인하기 위해 크롬에서 HeadingsMap을 사용해보면 좋다.
 