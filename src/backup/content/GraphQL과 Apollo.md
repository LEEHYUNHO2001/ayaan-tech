---
title: "GraphQL과 Apollo"
description: "GraphQL과 Apollo에 대한 개념을 알아보고, Back단에서 어떻게 작업해야하는지 정리해보자."
date: 2022-04-07T15:05:39.414Z
tags: ["Backend","React","node.js"]
---
> GraphQL과 Apollo를 공부하기 위한 자료를 찾아보던 도중 쉽게 따라할 수 있는 [얄팍한 코딩사전](https://www.youtube.com/watch?v=9BIXcXHsj0A&t=16s)님의 유튜브도 참고했다.

# GraphQL

'필요한 정보만 받아(**Overfetching**)올 수는 없을까?'에 대한 고민으로 탄생하게 된 것이 GraphQL이다. GraphQL은 유저 테이블의 정보가 있다고 가정했을때, 유저의 이름과 성별에 대한 데이터만 받아올 수 있다. 

또한, GraphQL은 필요한 정보를 한번에 받아(**Underfetching**)올 수 있다. 예를 들어, 유저 테이블과 댓글 테이블이 있을때 A라는 유저의 댓글을 가져오기 위해서 REST API의 경우에는 유저와 댓글에 대한 요청을 각각 보내야 한다. 

이 두가지의 기능으로 인해 데이터를 절약하고 요청을 최소화 하며 하나의 endPoint 에서 모든 요청을 처리할 수 있다.

## GraphQL의 장단점

> [참고한 글](https://choseongho93.tistory.com/320)

- 장점
  - 엄격하게 정의된 데이터 유형은 클라이언트와 서버 간의 통신 오류를 줄여준다.
  - GraphQL은 애플리케이션 API가 기존 쿼리를 중단하지 않고도 진화할 수 있도록 허용한다. (무중단 배포)
  - REST API로 사용할 수 없는 기능을 제공하기 위해 대부분의 오픈소스 GraphQL 확장 기능을 사용할 수 있다.
  - REST API는 Resource 종류별로 요청을 해야하고, 이로인해 요청 횟수가 필요한 Resource의 종류에 비례한다. 
  반면에 GraphQL은 원하는 정보를 하나의 Query에 모두 담아 요청하는 것이 가능하기에 HTTP 응답의 Size를 줄일 수 있다.

<br>

- 단점
  - File 전송 등 Text만으로 하기 힘든 작업들을 처리하기 복잡하다.
  - HTTP와 HTTPs에 의한 Caching이 REST보다 복잡하다.
  - 고정된 요청과 응답만 필요할 경우에는 Query 로 인해 요청의 크기가 RESTful API 의 경우보다 더 커진다.
  - API 유지관리자의 경우 유지 관리 가능한 GraphQL 스키마를 작성하기 위한 추가 태스크를 수행해야 해서 시간이 소요된다. (단, 개발자간의 불필요한 커뮤니케이션 비용절감 가능)
  
<br>

## REST API? GraphQL?

그렇다면 어떤 경우에 REST API와 GraphQL을 선택해서 사용해야 할까?

서로 다른 모양의 다양한 요청들에 대해 응답해야하고, 대부분의 요청이 CRUD에 해당할 때는 GraphQL를 사용하면 좋다.

RESTful는 HTTP 와 HTTPs 에 의한 Caching 사용하고, File 전송 등 단순한 Text 로 처리되지 않는 요청들이 있는 경우에 사용한다. 그리고 요구사항의 변동이 없어 요청의 구조가 명확하게 정해져 있을 때 사용해도 좋을 것이다.

물론 두 가지 모두 사용할 수도 있다. Endpoint를 GraphQL용으로 만들고, 다른 RESTful API용 Endpoint를 만들어서 각각의 효율에 맞게 사용하면 된다.

하지만, 하나의 목표를 위해 2가지 API 구조를 섞어놓는 것은 API의 품질을 떨어트릴 수 있다는 문제를 고려해봐야 한다.

<br>

## Apollo

GraphQL을 왜 사용하고 어떤 경우에 적용하면 효율적일지에 대해 알았다. 이제 이러한 동작들이 어떻게 가능한 것인지 알아야 한다. 백엔드에서는 정보를 제공 및 처리해야하고, 프론트엔드에는 알맞게 요청을 보내면 된다. 이런것들을 쉽게 할 수 있게 도와주는 [솔루션들이](https://graphql.org/code/) 있다. 그 중에서 프론트엔드와 백엔드 모두 지원하고, 쉬운 설정과 다양한 기능을 제공하는 Apollo도 많이 사용한다.

<br>

# 사용법

[Apollo-Server](https://www.apollographql.com/docs/apollo-server/)를 이용한 서버를 구축하고, [Apollo-Client](https://www.apollographql.com/docs/react/)와 React를 이용하여 프론트단을 만들어보자.

<br>

## BackEnd단 설계

### 쿼리 생성 및 요청

```jsx
//Server
const database = require('./database')
const { ApolloServer, gql } = require('apollo-server')

const typeDefs = gql`
    type Query {
        customers: [Customer]
    }
    type Customer {
        id: Int
        gender: String
		name: String
		group : Int
    }
`
const resolvers = {
  Query: {
    customers: () => database.customers
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

server.listen().then(({ url }) => {
console.log(`🚀  Server ready at ${url}`)
})
```
위는 csv를 db파일로 두고 설계한 것이다.

- Query
  - 자료요청에 사용될 쿼리들을 정의
  - 쿼리 명령문마다 반환될 데이터 형태를 지정

- type
  - 반환될 데이터의 형태를 지정

- resolvers
  - resolver의 Query에는 object의 항목들로 데이터를 반환하는 함수 선언
  - DB 조회 코드 (MySQL, PostgreSQL, MongoDB 등)

즉, Customer 타입의 customers 쿼리를 정의한 것이다. customers의 반환값은 Customer값들 (배열로)이라는 뜻이다.

이렇게 생성한 typeDef와 resolvers를 생성자의 인자로 받아서 아폴로 서버를 생성하는 것이다.

<br>

```graphql
query {
    customers {
        id
        gender
        name
        group
    }
}
```

이제 이와 같은 쿼리문으로 프론트단에서 데이터를 불러올 수 있다.

<br>

### 데이터 추가로 받아오기

```jsx
const typeDefs = gql`
    type Query {
        customers: [Customer]
		friends: [Friend]
    }
    type Customer {
        id: Int
        gender: String
		name: String
		group : Int
		friends: [Friend]
    }
    type Friend {
        id: Int
        gender: String
		group : Int
    }
`
const resolvers = {
  Query: {
    customers: () => database.customers
    .map((customer) => {
        customer.friends = database.friends
        .filter((friend) => {
            return friend.group === customer.group
        })
        return customer
    }),
  }
}

```

고객의 친구 성별을 알고 싶다. 그리고 한 번의 요청으로 customers를 조회했을 경우 Friend의 정보도 같이 나오게 하고싶다.

그렇다면 먼저 Friend를 생성하자. 그 후에 resolvers Query의 customers부분을 변경하자. friend의 group와 custom의 group가 같은 것만 찾아 customer에 넣어 리턴한다.

Customer에`friends: [Friend]`을 추가하는것도 잊지 말자.

<br>

```graphql
query {
    customers {
        id
        gender
        name
        group
        friends{
        	id
            gender
            group
        }
    }
}
```

이제 한 번의 요청으로 friends의 정보까지 받아올 수 있게 되었다.

<br>

### 특정 정보만 받아오기

```graphql
type Query {
    ...
    customers(gender: String): [Customers]
}
```

고객 중에서 남자의 정보만 가져오고 싶다. 먼저 쿼리부터 작성하자.

<br>

```graphql
Query: {
    //...
    customers: (parent, args, context, info) => database.teams
        .filter((customer) => {
            return customer.gender === args.gender
        }),
}
```

그 후 resolvers의 쿼리에서 JavaScript 함수로 필터링 해주면 된다.

<br>

```graphql
query {
customers(gender: 'man') {
      id
      gender
      name
      group
  }
}
```

이제 프론트단에서 query로 요청하면 끝이다. 현재 인자를 사용하여 데이터를 받아온 것인데, 이 부분에 대해서 궁금하다면 [얄코 인자와 인풋](https://www.yalco.kr/@graphql-apollo/3-4/)을 참고하자.

<br>

### Mutation(데이터 수정)

resolvers에서 JS 코드를 어떻게 작성하느냐에 따라 데이터를 수정시킬 수 있다. 하지만 REST API에서도 약속을 정해놓는 것처럼 GraphQL에서도 명세가 있다고 보면 된다.

#### 데이터 삭제

```graphql
type Mutation {
    deleteCustomer(id: Int): Customer
}
```

먼저 id값을 받아 해당하는 고객 하나를 제거하는 부분을 만들어보자. 반환값으로는 Customer을 주었는데, true false와 같은 boolean값을 줘도 되고 id값을 주기도 한다.(삭제되면서 받을 반환값을 스타일에 맞게 결정하면 된다.)

<br>

```jsx
Mutation: {
      deleteCustomer: (parent, args, context, info) => {
          const deleted = database.customers
              .filter((customer) => {
                  return customer.id === args.id
              })[0]
          database.customers = database.customers
              .filter((customer) => {
                  return customer.id !== args.id
              })
          return deleted
      }
}
```

삭제될 데이터를 deleted에 저장하고, 실제로 삭제한 후에 deleted를 반환한다.

<br>

```graphql
mutation {
  deleteCustomer(id: 1) {
      id
      gender
      name
      group
  }
}
```

이제 프론트단에서 쿼리와 마찬가지로 요청을 하면 된다.
데이터 추가와 삭제도 쉽게 할 수 있다. [참고 - 얄코 Mutation](https://www.yalco.kr/@graphql-apollo/2-3/)

<br>

### 모듈화

![](/images/cbffcebb-57f7-4c9d-9ded-6e31233785c1-image.png)

서비스가 커지면 쿼리짜는 부분이 매우 커질 것이다. 어떻게 관리해야 가독성이 좋아지고, 유지보수하기 쉬울까? [얄코 모듈화 참고](https://www.yalco.kr/@graphql-apollo/3-1/)

정답은 모듈화이다. 위의 예제에서는 7개의 자바스크립트 파일이 있는데 어떻게 더 추상화할지는 개발자의 마음이다.

간단하게 설명해보자면 `equipment`에서는 `type Equipment`을 선언하고, `typeDefs`와 `resolvers`를 객체로 `module.exports` 한다.
`_queries`에서는 Query를 `_mitations`에서는 Mitation에 대한 코드를 넣는다. `supplies`도 마찬가지다.

```jsx
const { ApolloServer } = require('apollo-server')
const _ = require('lodash')

const queries = require('./typedefs-resolvers/_queries')
const mutations = require('./typedefs-resolvers/_mutations')
const equipments = require('./typedefs-resolvers/equipments')

const typeDefs = [
    queries,
    mutations,
    equipments.typeDefs,
]

const resolvers = [
    equipments.resolvers
]

const server =  new ApolloServer({typeDefs, resolvers})

server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`)
})
```

이제 이것들을 `index`에서 사용해주면 된다.
`dbWork`는 Query나 Mutation에서 상황에 맞게 구현하여 사용할 함수들의 공간이고, `equipment`에서 사용한다.

**GraphQL의 기본 타입과 enum을 이용한 커스텀 타입 선언 및 리스트 타입**에 대해서는 [얄코 타입 참고](https://www.yalco.kr/@graphql-apollo/3-2/)를 보자. 또한, **유니언과 인터페이스**도 어떤식으로 사용하는지 보고 넘어가면 좋다.

<br>

## 마무리

프론트 개발만하고 백단은 많이 해보지 않아서 한번 정리해보았다. 사실 공식문서나 유튜브 강의를 보면 그렇게 어려워보이지는 않는다. 하지만 직접 서비스나 프로젝트를 구현해보면 많은 어려움을 겪을 것 같다. 이번에 팀원과 프로젝트를 GraphQL과 Apollo를 사용하게 되었는데, 개발하다 겪는 어려움과 해결과정들은 추후에 올릴 예정이다.

GraphQL의 프론트단은 공식문서 [Get started with Apollo Client](https://www.apollographql.com/docs/react/get-started/)을 보며 해결하면 될 것 같다.