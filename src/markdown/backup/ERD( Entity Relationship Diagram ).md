---
title: "ERD( Entity Relationship Diagram )"
description: "Entity Relationship Diagram( 개체-관계 모델 )"
date: 2021-08-20T06:01:28.492Z
tags: ["CS"]
---
> ## ERD란??
Entity Relationship Diagram( 개체-관계 모델 )

프로젝트 규모가 증가하고 다른 개발자들과 협업을 하게되면, 연관된 **DB 테이블들을 시각화**하는 것이 좋다. 해당 테이블을 사용할때마다 머릿속으로 테이블간의 관계를 생각해야하는 번거로움을 피할수 있고, 다른 개발자와 의사소통이 잘 이루어질수 있기 때문이다. **테이블간의 관계를 설명해주는 다이어그램 ERD**의 등장 배경이다.

<br />

<img src="https://lucy-the-marketer.kr/wp-content/uploads/2020/03/cloud-3843352_1920-1024x683.jpg" />

<br />

> ## ERD 표기법

<img src="http://itwiki.kr/images/b/bf/EERD%ED%91%9C%EA%B8%B0%EB%B2%95.jpg" />


<img src="https://media.vlpt.us/images/inyong_pang/post/1ae53490-43cf-4b38-8265-f38875dddb75/image.png" />

ERD는 여러 기호들로 관계를 표현할 수 있다.

A 테이블의 기본키를 B 테이블이 가지고 있다면, A테이블이 부모 테이블이고 B테이블이 자식 테이블이다.

<img src="https://t1.daumcdn.net/cfile/tistory/222281355926EADB37" />

실선은 부모 테이블의 기본키를 자식 테이블이 가지고 있으며 이를 기본키로 사용하는 경우이다.

점선은 부모 테이블의 기본키를 자식테이블이 가지고 있지만 이를 기본키로 사용하지 않을 때 사용한다.

<br />
<br />

<img src="https://m-veloper.github.io/assets/img/database/2020/02/2020-02-16-database-05-05.png" />

실무에서는 IE 표기법을 더 많이 사용한다.

>## 예시

<img src="https://img1.daumcdn.net/thumb/R1280x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2FSldjN%2FbtqLZK4CjsH%2FdK1VXn1MJns6K0TqlYidSK%2Fimg.png" />

* 수강내역 테이블이 학생 테이블의 기본키를 외래키로 가지고있다. 그러므로 수강내역 테이블이 자식 테이블이고, 학생 테이블이 부모 테이블이다.

* 테이블간의 관계를 보면 하나의 학색은 여러개의 수강 내역을 가진다.

* 수강내역 테이블에서 학생 테이블의 기본키를 자신도 기본키로 사용하기 때문에 실선으로 표현되어있다.

<br />
<br />

> ## 직접 ERD 설계
http://erdcloud.com/ : ERD를 그려볼 수 있는 사이트





<br />
<br />
<br />

[hyonee](https://hyonee.tistory.com/117) [IT용어위키](http://seb.kr/w/ER_%EB%8B%A4%EC%9D%B4%EC%96%B4%EA%B7%B8%EB%9E%A8) [mjn5027](https://mjn5027.tistory.com/43)