---
title: "REST, RESTAPI, RESTful의미"
description: "먼저 REST( Representational State Transfer )에 대해 알아보자. REST는 자원의 이름(자원의 표현)으로 구분하여 해당 자원의 상태(정보)를 주고받는 모든것을 의미한다. "
date: 2021-08-19T06:02:29.440Z
tags: ["CS"]
---
> ## REST란??
먼저 REST( Representational State Transfer )에 대해 알아보자.

자원의 이름(자원의 표현)으로 구분하여 해당 자원의 상태(정보)를 주고받는 모든것을 의미한다. 즉, **자원의 표현에 의한 상태 전달**이다.

* 자원의 표현
자원 : 해당 소프트웨어가 포함하는 모든 것
자원의 표현 : 그 자원을 표현하기 위한 이름

* 상태 전달
데이터가 요청되어지는 시점에서 자원의 상태를 전달
보통 JSON 또는 XML을 통해 데이터를 주고 받는다.

<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Sz7JBJzfp_PNBmNxn584DOH-gmAbXwpHuw&usqp=CAU" width="500px" />

REST는 기본적으로 웹의 기존 기술과 HTTP 프로토콜을 그대로 활용하기 때문에 **웹의 장점을 최대한 활용할 수 있는 아키텍처 스타**일이다.

**HTTP URI(Uniform Resource Identifier)를 통해 자원(Resource)을 명시**하고, **HTTP Method(POST, GET, PUT, DELETE)를 통해** 해당 자원에 대한 **CRUD Operation을 적용**하는 것을 의미한다.

* CRUD Operation
post : Create(생성)
get : Read(조회)
put : Update(수정)
delete : DELETE(삭제)
head : HEAD(header 정보 조회)

<br />
<br />

> ## REST 구성요소

* 자원(Resource): URI
모든 자원에 고유한 ID 존재하고, 이 자원은 Server에 존재한다.
자원을 구별하는 ID는 HTTP URI이다.
Client는 URI를 이용해서 자원을 지정하고 해당 자원의 상태에 대한 조작을 Server에 요청한다.

* 행위(Verb): HTTP Method
HTTP 프로토콜의 Method를 사용한다.(post, get 등)

* 표현(Representation of Resource)
Client가 자원의 상태에 대한 조작을 요청하면 Server는 이에 적절한 응답을 보낸다.
REST에서 하나의 자원은 JSON, XML 등으로 나타내어질 수 있다.

<br />
<br />

> ## REST 특징

1. Server-Client 구조
Server : 자원이 있음
Client : 자원을 요청

2. Stateless(무상태)
Client의 context를 Server에 저장하지 않는다.
Server는 각각의 요청을 완전히 별개의 것으로 인식하고 처리힌다.

3. Cacheable(캐시 처리 가능)
웹 표준 HTTP 프로토콜을 그대로 사용하므로 웹에서 사용하는 기존의 인프라를 그대로 활용할 수 있다.

4. Layerd System(계층화)
Client는 REST API Server만 호출한다.
PROXY, 게이트웨이 같은 네트워크 기반의 중간 매체를 사용할 수 있다.

5. Code-On-Demane(optional)
Server로부터 스크립트를 받아서 Client에서 실행한다.

6. Uniform Interface(인터페이스 일관성)

<br />
<br />

> ## REST API
REST를 기반으로 만들어진 API

기본 규칙
* 도큐먼트 : 객체 인스턴스나 데이터베이스 레코드와 유사한 개념
* 컬렉션 : 서버에서 관리하는 디렉터리라는 리소스
* 스토어 : 클라이언트에서 관리하는 리소스 저장소

  * URI의 정보는 자원을 표현
자원은 동사보다는 명사를 사용하고, 대문자보다는 소문자를 사용한다.
자원의 도큐먼트 이름으로는 단수 명사를 사용한다.
자원의 컬렉션 이름으로는 복수 명사를 사용해야 한다.
자원의 스토어 이름으로는 복수 명사를 사용해야 한다.

  * 자원에 대한 행위는 HTTP Method로 표현
URI에는 HTTP Method가 들어가면 안된다.
URI에 행위에 대한 동사 표현이 들어가면 안된다.
경로 부분 중 변하는 부분은 유일한 값으로 대체한다.(id는 하나의 특정 자원을 나타내는 고유값)

<br />

<img src="https://api.zestard.com/wp-content/uploads/2015/12/What-is-Rest-API-02-1.jpg" />

<br />

설계 규칙
* 슬래시 구분자(/)는 계층 관계를 나타내는데 사용한다.

* URI 마지막에 문자로 슬래시(/)를 포함하지 않는다.

* 하이픈(-)은 URI 가독성을 높이는데 사용한다.

* 밑줄(_)은 URI에 사용하지 않는다.

* URI 경로에는 소문자를 사용한다.

* 파일확장자는 URI에 포함하지 않는다.

* 리소스 간에는 연관 관계가 있는경우 '/리소스명/리소스ID/관계가 있는 다른 리소스명'으로 표현한다.

<br />
<br />

> ## RESTful
REST의 원리를 따르는 시스템

<img src="https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Ft1.daumcdn.net%2Fcfile%2Ftistory%2F2132EE45567A5FCC25" />

REST API의 설계 규칙을 올바르게 지킨 시스템을 RESTful하다고 한다. 
REST를 사용했어도 RESTful하지 못할 수 있다는 뜻이다.

<br /><br /><br /><br /><br /><br /><br />

[gmlwjd9405](https://gmlwjd9405.github.io/2018/09/21/rest-and-restful.html)