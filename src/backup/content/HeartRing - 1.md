---
title: "HeartRing - 1"
description: "쇼핑몰 프로젝트 시작(요구사항 분석)    "
date: 2022-01-05T08:36:24.845Z
tags: ["React","typescript"]
---
# 쇼핑몰 프로젝트

한 명의 팀원과 함께 쥬얼리 쇼핑몰 프로젝트를 설계하게 되었다. 스택 선정부터 요구사항까지 분석해보았다.

<br>

## Stack

* FrontEnd
  * React(Hooks)
  * Next.js
  * TypeScript
  * Emoton
  * API
    * SWR
    * Axios
* Deploy
  * Vercel
* BackEnd
  * Strapi

요즘 프로젝트를 하며 자주 사용하고 있는 기술들로 골랐다. [SPACE_DEV_CLUB](https://velog.io/@leehyunho2001/series/SPACEDEVCLUB), [Wine](https://velog.io/@leehyunho2001/Wine), [Futurama](https://velog.io/@leehyunho2001/Futurama-API) 에서 왜 이 스택을 사용하는지에 대한 이야기를 작성했으므로 여기서는 생략하겠다.

<br>

## 요구사항

- 상품 등록
    - 특정 권한 (Admin)을 가진 유저는 상품 등록이 가능해야 한다.
    - 상품 등록에는 Editor(CKEditor 등)를 붙인다.
    - 상품을 등록하면 바로 목록에 노출된다.
- 상품 목록 노출
    - 상품은 카테고리별 필터가 가능해야 한다.
        - 상품의 카테고리는 20가지 이상 구성한다.
        - 카테고리를 조합했을 때 조회가 가능해야 한다.
    - 상품은 검색이 가능해야합니다.
        - 검색했을 때, 검색 결과에 맞는 아이템만 보여줘야 한다.
        - 검색어에 맞는 아이템을 강조한다.
    - 상품은 25개씩 한번에 보여주며 페이지네이션 또는 가능하다면 무한 스크롤로 구현한다.
- 상품 상세 노출
- 상품별 댓글 노출
    - 댓글은 25개씩 한번에 보여주며 페이지네이션을 지원한다.
    - 댓글에는 대댓글이 가능하며, 대댓글은 최대 1번까지만 Depth를 지원한다.
    - 댓글에는 이미지 삽입이 가능해야 한다.
- 회원
    - 로그인
    - 로그 아웃
    - 회원가입
    - 회원탈퇴
    - 아이디 찾기
    - 비밀번호 찾기
    - 카카오, 구글, 메타 등 로그인
- 위시리스트
    - 상품 위시리스트가 존재하여 등록할 수 있어야 한다.
    - 위시리스트에 등록 가능한 갯수에 제한은 없다.
- 장바구니
    - 장바구니에 아이템을 25개까지 담을 수 있다.
    - 해당 계정과 장바구니는 연동되어야 한다.
- 결제
    - 주소 등을 입력받아 결제받는 페이지를 구현한다.
        - 주소 검색에는 [주소 검색 API (다음)](https://postcode.map.daum.net/guide)를 사용한다.
    - 지역별로 배송비 주문 로직을 추가한다
        - 일반 배송비는 2,500원
        - 도서산간지방 (제주, 울릉도)은 10,000원
        - 장바구니가 특정 금액 (50,000원)을 넘어서는 경우에는 무료 배송
    - 결제가 이루어지지 않을 경우에는 장바구니를 초기화하지 않는다.
    - 결제 버튼을 눌렀을 때에는 결제에 포함된 데이터만 보여줄 수 있어야 한다.
- (공통) 네비게이션
    - 네비게이션에서는 페이지간 이동, 유저 정보 노출 등이 가능해야한다.
- 기획전
    - 쇼핑몰에서 자주 쓰이는 기획전 페이지를 구현한다.
    - 기획전은 최대 갯수가 존재하지 않으며, 공유하기가 가능해야 한다.
    (카카오톡 공유하기 / 페이스북 공유하기 / 네이버 공유하기 등)
        - 카카오는 API Key 발급이 어려운 경우라면 제외

### 기술 요구사항

- 모든 페이지는 공유하기가 가능
- 로그인은 유저가 브라우저를 종료해도 유지
- 모든 페이지는 반응형을 지원
- 모든 페이지는 접근성을 준수
- 모든 페이지는 검색이 가능 (SEO)
- 모든 Form은 유효성 검사가 되어야 함


## 회의

추상화와 디자인 패턴, 커밋 룰, 컨벤션을 정하고 UI를 결정했다. 먼저 간단한 Card와 메인 및 상세 페이지 등의 UI 구조를 잡아놓는 것으로 결정했다. 그 후 strapi로 백을 구축하고 데이터를 연결할 예정이다.