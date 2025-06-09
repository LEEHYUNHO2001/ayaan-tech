---
title: "Spring Boot로 데이터 리턴 후  Next.js에서 Get 요청해보기"
description: "프론트엔드 개발자의 백엔드 공부 도전..!"
date: 2022-05-12T07:06:44.986Z
tags: ["Backend","React","next","typescript"]
---
# Spring In Action

## 스프링을 공부하게 된 계기

Front-End 개발자가 되었지만 평소에 Back-End에도 관심이 있었던 나는 Express를 사용했었다. 노드 환경에서 하다보니 스프링은 어떨지에 대해 호기심이 갔다. 그리고 mobx와 모양이 비슷한거 같아서 더 궁금해졌다. [스프링 인 액션](http://www.kyobobook.co.kr/product/detailViewKor.laf?mallGb=KOR&ejkGb=KOR&barcode=9791190665186)이라는 책으로 첫 스프링 공부를 하게 되었다. 아직 JAVA 문법과 추상화 하는 방법 등이 많이 부족하지만 벨로그 시리즈에 글이 쌓이면서 성장하는 모습이 보이면 좋겠다. 코틀린을 이용한 API를 자유롭게 설계하는 것이 목표이고, 이를 위해 JAVA 공부도 할 예정이다.

**책에서는 스프링 안에서 웹을 구성하지만 나는 Next.js 프로젝트를 생성해서 연결하는 방향을 결정했다.**

마지막으로 여기서는 Maven을 다루는데, 요즘은 Gradle을 많이 사용하는 것 같다. 만약에 차이가 궁금하다면 잘 정리된 [Maven과 Gradle](https://hyojun123.github.io/2019/04/18/gradleAndMaven/)글이 있으니 참고하자. (본인도 이글을 참고함..)

<br>

## BackEnd(Spring Boot)

Dependencies 를 추가하는 곳에서 `Spring Boot Dev Tools`, `Lombok`, `Spring Web`을 넣자. 만약에 스프링에서 웹을 구성하고 싶다면 `Thymeleaf`를 사용하자. 하지만 intellij 환경이라면 버그가 좀 있으므로 [Stack Overflow](https://stackoverflow.com/questions/38710585/spring-boot-thymeleaf-in-intellij-cannot-resolve-vars)를 확인해보자. 타코를 주문할 수 있는 타코 페이지에 대한 프로젝트이므로, 이름은 taco-cloud로 해주었다.

<br>

### 프로젝트 생성 시 확인되는 것들

프로젝트를 생성하면 여러가지 파일들이 생기는 것을 볼 수 있다.

- mvnw, mvnw.cmd : maven 래퍼 스크립트로, 각 컴퓨터에 메이븐이 설치되어 있지 않아도 프로젝트를 빌드할 수 있도록 도와준다.

- pom.xml : maven 빌드 명세를 지정한 파일이다.
```java
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
```

이와 같이 추가했던 디팬던시들에 대한 코드들이 있는것을 볼 수 있다.

- TacoCloudApplication.java : 프로젝트 이름에 영향을 받아 자동으로 생성되는 스프링 부트 메일 클래스이다.

- application.properties : 구성 속성을 개발자가 직접 정의한다. `application.yml`를 사용하기도 한다.

- static : 브라우저에 제공할 정적인 콘텐츠를 둘 수 있는 디렉터리이다.

- templates : 브라우저에 콘텐츠를 보여주는 템플릿 파일을 두는 디렉터리이다. (Thymeleaf를 사용할 경우 여기에 html 파일을 설계하는것이다.)

- TacoCloudApplicationTests.java : 스프링 애플리케이션이 성공적으로 로드되는지 확인하는 테스트로, 백엔드에서는 여러가지 테스트를 추가하는 TDD를 하게 된다. 프론트는 TDD를 하기가 힘들다고 하는데, 백엔드에서 해보니 쪼금 더 할만 한것 같다.

<br>

### BackEnd 에서 데이터 리턴하기

![](/images/2cecc407-41c4-4855-bc53-ea7b4f2663b1-image.png)

오늘 다룰 프로젝트 구조이다. 먼저 핵심인 TacoCloudApplication.java부터 확인해보자.

<br>

#### TacoCloudApplication

```java
package tacos;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TacoCloudApplication {

    public static void main(String[] args) {
        SpringApplication.run(TacoCloudApplication.class, args);
    }

}
```

자바 클래스 파일은 기본적으로 맨 위에 package를 명시해준다. 그리고 어노테이션이라는 것을 사용하는데, 사용하고 싶은 어노테이션을 import 해주어야 한다. 이 import 해주는 것은 intellij에서 쉽게 지원하는 것 같다. 

또한 다른 파일에서 클래스나 변수 등을 import 할 경우, 해당 파일에서 특정 갯수 이상 import 하면 wildcard 가 되도록 intellij에서 설정할 수도 있다.

SpringBootApplication 어노테이션은 당연하지만 스프링 부트 애플리케이션임을 나타내는 것이다. 사실은 SpringBootConfiguration, EnableAutoConfiguration, ComponentScan 이라는 3개의 어노테이션이 결합한 형태라고 한다.

<br>

- 접근 제한자
  - public : 모든 곳에서 접근 가능
  - private : 자기 자신 클래스에서만 접근 가능
  - protected : 자기 자신 클래스와 상속된 클래스에서 접근 가능

- 메모리 할당
  - static : 프로그램이 실행되는 순간 할당. 메모리 정리 대상이 아님
  - heap : 연산이 실행되는 순간 할당. Carbage Colletor에 의해 정리

- return
  - void : 함수가 끝날 때, 리턴값이 없을 경우 사용.
  main은 void로 선언되어야 한다. 그 이유는 리턴이 있으면 프로그램이 종료되기 때문이다.
  
- main
  - String[] args : 문자열을 배열로 사용하겠다는 의미로, main에서 꼭 있어야함.

자바스크립트만 공부하다보니 void, static 등 오랜만에 보는 친구들이 있다. 신기했던 것은 자바스크립트에만 가비지 컬렉션이 있는줄 알았는데 자바에도 있었다.

<br>

#### TacoCloudApplicationTests

```java
package tacos;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class TacoCloudApplicationTests {

    @Test
    void contextLoads() {
    }

}
```

BackEnd를 구현할 때는 항상 테스트 코드를 짜게 된다. 흔히 말하는 TDD이다. 프로젝트를 생성하면 기본적으로 제공하는 애플리케이션 테스트이다. 코드는 빈약하지만 애플리케이션 컨텍스트가 성공적으로 로드될 수 있는지 확인하는 기본적인 검사를 수행한다.

추후에 서비스나 컨트롤러를 구현하면 이에 맞는 테스트는 직접 설계해주면 된다.

<br>

#### Ingredient

```java
package tacos;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@RequiredArgsConstructor
public class Ingredient {
    private final String id;
    private final String name;
    private final Type type;

    public static enum Type{
        WRAP, PROTEIN, VEGGIES, CHEESE, SAUCE
    }
}
```

타코를 주문할 때, 재료를 선택해야한다. 재료마다 id, name, type가 부여될 예정이다. 이를 위한 자바 도메인 클래스를 하나 생성해준다. final 속성들을 초기화 하는 생성자를 사용하고 있는데, getter과 setter 메소드 등이 정의되지 않았다. 이는 Lombok (RequiredArgsConstructor 어노테이션 ) 덕분이다.

타코 주문시 추가 사항 카테고리에 관한 것은 enum으로 선언해주고 있다. 이름이 Type이므로 속성을 초기화 할때 `private final Type type;` 을 해주고 있다.

<br>

#### Taco

```java
package tacos;

import lombok.Data;

import java.util.Date;
import java.util.List;

@Data
public class Taco {
    private Long id;
    private Date createdAt;
    private String name;
    private List<Ingredient> ingredients;
}
```
유저가 체크박스에서 선택하여 제출한 데이터를 담을 공간이 필요하다. 주문을 한 시간을 알기 위해 Date도 추가해준다.

<br>

#### DesignController

```java
@Slf4j
@RestController
@RequestMapping("/design")
public class DesignTacoController {

    private final IngredientRepository ingredientRepo;
    private TacoRepository tacoRepo;

    @Autowired
    public  DesignTacoController(IngredientRepository ingredientRepo, TacoRepository tacoRepo){
        this.ingredientRepo = ingredientRepo;
        this.tacoRepo = tacoRepo;
    }

    @GetMapping
    public List<Ingredient> showDesignForm(){
        List<Ingredient> ingredients = Arrays.asList(
                new Ingredient("FLTO", "Flour Tortilla", Type.WRAP),
                new Ingredient("COTO", "Corn Tortilla", Type.WRAP),
                new Ingredient("GRBF", "Ground Beef", Type.PROTEIN),
                new Ingredient("CARN", "Carnitas", Type.PROTEIN),
                new Ingredient("TMTO", "Diced Tomatoes", Type.VEGGIES),
                new Ingredient("LETC", "Lettuce", Type.VEGGIES),
                new Ingredient("CHED", "Cheddar", Type.CHEESE),
                new Ingredient("JACK", "Monterrey Jack", Type.CHEESE),
                new Ingredient("SLSA", "Salsa", Type.SAUCE),
                new Ingredient("SRCR", "Sour Cream", Type.SAUCE)
        );

        return ingredients;
    }
}
```

여기부터는 package와 import 부분은 생략하겠다. 가장 먼저 보이는 @Slf4j는 컴파일시 Lombok에 제공되며 자동으로 Logger를 생성한다. Logger을 사용하고 싶다면 넣으면 된다.

@RestController는 @Controller와 @ResponseBody를 합친 어노테이션이다. RestAPI를 짤 경우에 넣어주면 된다. 그리고 design이라는 엔드포인트를 명시하는 @RequestMapping("/design")도 넣어주자.


먼저 design 엔드포인트에 get 요청을 할 경우 Ingredient에 대한 정보를 반환해주어야 한다. @GetMapping은 get 요청일 경우에 수행하는 어노테이션이다. 지금은 Ingredient 객체를 저장하는 List에 직접 값을 넣어주고 있다. (이 부분은 나중에 DB에서 불러오는것으로 대체할 것이다.)

이제 Front 프로젝트를 하나 생성해서 design 엔드포인트에 get 요청을 보내보면 ingredients 정보를 줄 것이다.

Taco 클래스는 생성만 해주고 아직 사용을 안했다. 추후에 Front단에서 추가 사항 UI를 보며 타코에 치즈를 추가한다고 가정하면, 이런 정보를 post로 넘겨 받아 DB에 저장하는데 사용할 것이다. (이때는 @GetMapping이 아닌 @PostMapping 어노테이션을 사용하게 될 것이다.)

<br>

#### 스프링 프로젝트 Run

이제 프로젝트를 Run 해주어야 Front 단에서 해당 엔드포인트로 요청을 보내던가 할 것이다.

![](/images/055ab3c1-e1b5-455e-8937-e0f0a9be7517-image.png)

하지만 초록색 삼각형 모양(Run)을 눌러도 안되었다.

```bash
lsof -nP -iTCP:8080 | grep LISTEN
```

8080 포트가 이미 열려 있을 경우 이와 같은 상황이 발생할 수 있다. 터미널에서 위의 명령어를 입력해보자. 만약 열려 있다면 그냥 다른 포트 사용하자. (꺼도된다.)

application.properties에 `server.port=9090` 만 추가해주면 9090 포트로 Run하게 된다.

<br>

## FrontEnd 에서 Back 데이터 받아 UI 구현하기

Next.js + typescript 프로젝트로 설계하기로 했다. 전역 상태관리가 필요할지는 아직 의문이지만 일단 RTK를 넣었고, React-Query를 사용한다. 프로젝트 전체가 궁금하다면 [깃허브](https://github.com/LEEHYUNHO2001/taco-client-server)를 참고하자.

<br>

```jsx
export const getData = async (endpoint = '') => {
  try {
    const res = await axios({
      method: 'get' as Method,
      url: `/api/${endpoint}`,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
```

design 엔드포인트 경로로 요청을 보내는 부분이다. `getData('design')` 으로 이 함수를 사용해주면 데이터를 요청하게 된다. Back단에서 return 했던 ingredients 가 받아와지는 것이다.

<br>

```jsx
 const { isLoading } = useQuery(['get/design'], () => getData('design'), {
    onSuccess: original => {
      //...
    },
  });
```
]
getData함수를 사용하는 React-Query 부분이다. 리엑트 쿼리에 대해 궁금하다면 [React-Query 사용볍(https://velog.io/@leehyunho2001/React-Query-uuj3rjo7) 글을 참고하자.

<br>

아마 get 요청을 하게 되면 cors 문제가 발생할 것이다. 여러가지 해결 방법이 있지만 [proxy로 cors 해결하기](https://velog.io/@leehyunho2001/Next.js-Cors-%EC%97%90%EB%9F%AC-%ED%95%B4%EA%B2%B0-Proxy) 방법이 보안 이슈 없이 좋다고 생각한다.

<br>

![](/images/ff4eefa1-e9af-48d7-b2f4-6c0248d67e70-image.png)

이제 받은 데이터를 이용해서 UI를 구현하자. 사실 이 체크박스 구현하는데 응근히 애를 먹었는데, 그 이유는 해당 카테고리마다 1개만 선택이 가능해야하고 post 요청으로 데이터를 Back단에 보낼때는 선택된 것들을 모두 보내야하기 때문이다. 또한, 현재 이 카테고리와 체크박스들은 map 메서드를 2번 돌리면서 구현한 것이다. 그래서 로직을 생각하는데 시간이 조금 걸렸던 것 같다. 궁금하다면 [카테고리별로 복수 선택이 불가능한 체크 박스](https://velog.io/@leehyunho2001/%EB%8B%A4%EC%96%91%ED%95%9C-%EC%83%81%ED%99%A9%EC%97%90%EC%84%9C-React-CheckBox%EB%A5%BC-%EC%82%AC%EC%9A%A9%ED%95%B4%EB%B3%B4%EA%B8%B0) 를 참고해보자.

<br>

## BackEnd - DB 사용해보기

### JDBC를 이용한 DB 생성

```java
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-jdbc</artifactId>
            <version>2.6.7</version>
        </dependency>
```

jdbc는 db에 접근할 수 있도록 자바에서 제공하는 API이다. 이 jdbc를 이용해서 DB를 생성해보자. 먼저 pom.xml 디펜던시를 추가해주어야 한다. 사실.. 디펜던시 코드를 추가하고 spring-boot-starter-jdbc 부분에 빨간글씨가 나타나 적용이 안되서 헤맸다. 근데 그냥 다시 빌드를 해주면 되는것이었다. 오른쪽 위에 버튼이 하나 생성되는데 그것을 누르면 된다.

jdbc는 jpa와 많이 비교되고는 하는데 궁금하다면 한번 찾아보는 것을 추천한다.

<br>

```java
    <properties>
        //...
        <h2.version>1.4.196</h2.version>
    </properties>
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <scope>runtime</scope>
        </dependency>
```

db를 확인하기 위한 h2라는 것도 추가해주자. pgAdmin, mysql 워크밴치 같은거라고 생각하면 된다.

<br>

### schema.sql

```sql
create table if not exists Ingredient (
    id varchar(4) not null,
    name varchar(25) not null,
    type varchar(10) not null
    );

create table if not exists Taco (
    id identity,
    name varchar(50) not null,
    createdAt timestamp not null
    );

create table if not exists Taco_Ingredients (
    taco bigint not null,
    ingredient varchar(4) not null
    );

alter table Taco_Ingredients
    add foreign key (taco) references Taco(id);

alter table Taco_Ingredients
    add foreign key (ingredient) references Ingredient(id);
```

Ingredient와 Taco 테이블, 그리고 연관 관계에 대한 Taco_Ingredients 등을 설계해준다. (이 글에서는 Order에 대해서 다루지 않는다.)

<br>

### data.sql

```sql
delete from Taco_Ingredients;
delete from Taco;

delete from Ingredient;
insert into Ingredient (id, name, type)
values ('FLTO', 'Flour Tortilla', 'WRAP');
insert into Ingredient (id, name, type)
values ('COTO', 'Corn Tortilla', 'WRAP');
insert into Ingredient (id, name, type)
values ('GRBF', 'Ground Beef', 'PROTEIN');
insert into Ingredient (id, name, type)
values ('CARN', 'Carnitas', 'PROTEIN');
insert into Ingredient (id, name, type)
values ('TMTO', 'Diced Tomatoes', 'VEGGIES');
insert into Ingredient (id, name, type)
values ('LETC', 'Lettuce', 'VEGGIES');
insert into Ingredient (id, name, type)
values ('CHED', 'Cheddar', 'CHEESE');
insert into Ingredient (id, name, type)
values ('JACK', 'Monterrey Jack', 'CHEESE');
insert into Ingredient (id, name, type)
values ('SLSA', 'Salsa', 'SAUCE');
insert into Ingredient (id, name, type)
values ('SRCR', 'Sour Cream', 'SAUCE');
```

생성한 테이블에 정보를 넣어주어야 우리가 Front 단에서 정보를 받아 카테고리마다 체크박스를 생성할 것이다. DB에 데이터를 미리 넣어주는 작업이다.

<br>

### IngredientRepository

```java
public interface IngredientRepository {
    Iterable<Ingredient> findAll();
    Ingredient findById(String id);
    Ingredient save(Ingredient ingredient);
}
```

H2를 사용해서 방금 생성한 DB에서 식자재 데이터를 가져오고 저장하는 레파지토리 클래스가 필요하다. Ingredient를 위한 레파지토리 하나를 생성하자. 

DB에서 모든 식자재 데이터를 쿼리하여 Ingredient 객체에 넣는다. 그리고 id를 통해 하나의 Ingredient를 쿼리해야한다. 마지막으로 Ingredient 객체를 DB에 저장해야 한다.

<br>

### JdbcIngredientRepository

```java
@Repository
public class JdbcIngredientRepository implements IngredientRepository {
    private JdbcTemplate jdbc;

    @Autowired
    public JdbcIngredientRepository(JdbcTemplate jdbc){
        this.jdbc = jdbc;
    }

    @Override
    public Iterable<Ingredient> findAll(){
        return jdbc.query("select id, name, type from Ingredient", this::mapRowToIngredient);
    }

    @Override
    public Ingredient findById(String id){
        return jdbc.queryForObject("select id, name, type from Ingredient where id=?", this::mapRowToIngredient, id);
    }

    private Ingredient mapRowToIngredient(ResultSet rs, int rowNum)
        throws SQLException{
        return new Ingredient(
                rs.getString("id"),
                rs.getString("name"),
                Ingredient.Type.valueOf(rs.getString("type")));
    }

    @Override
    public Ingredient save(Ingredient ingredient){
        jdbc.update(
                "insert into Ingredient (id, name, type) value (?, ?, ?)",
                ingredient.getId(),
                ingredient.getName(),
                ingredient.getType().toString());
        return ingredient;
    }
}
```

IngredientRepository에서 Ingredient 레파지토리가 할 일을 정의 했으므로 JdbcTemplate를 이용하여 DB 쿼리에 사용할 수 있도록 인터페이서를 구현해야 한다.

query() 메서드는 JdbcTemplate에서 제공하는 것으로, 첫 번째 인자는 쿼리를 수행하는 SQL이고 두번째 인자는 스프링의 RowMapper 인터페이스를 우리가 구현한 mapRowToIngredient 메서드이다. 쿼리에서 요구하는 매개변수를 세번째 인자로 사용할 수도 있다.

<br>

### TacoRepository

```java
public interface TacoRepository {
    Taco save(Taco design);
}
```

IngredientRepository는 저장된 타코 카테고리를 불러오기 위한 저장소였다. 이번에는 Front단에서 post 요청으로 전달해주는 Taco 데이터를 받을 Taco 레파지토리를 생성하자.

<br>

### JdbcTacoRepository

```java
@Repository
public class JdbcTacoRepository implements TacoRepository {

    private JdbcTemplate jdbc;

    public JdbcTacoRepository(JdbcTemplate jdbc) {
        this.jdbc = jdbc;
    }

    @Override
    public Taco save(Taco taco) {
        long tacoId = saveTacoInfo(taco);
        taco.setId(tacoId);
        for (Ingredient ingredient : taco.getIngredients()) {
            saveIngredientToTaco(ingredient, tacoId);
        }
        return taco;
    }

    private long saveTacoInfo(Taco taco) {
        taco.setCreatedAt(new Date());
        PreparedStatementCreatorFactory preparedStatementCreatorFactory = new PreparedStatementCreatorFactory(
                "insert into Taco (name, createdAt) values (?, ?)",
                Types.VARCHAR, Types.TIMESTAMP
        );
        preparedStatementCreatorFactory.setReturnGeneratedKeys(true);
        PreparedStatementCreator psc =
                preparedStatementCreatorFactory.newPreparedStatementCreator(
                        Arrays.asList(
                                taco.getName(),
                                new Timestamp(taco.getCreatedAt().getTime())));

        KeyHolder keyHolder = new GeneratedKeyHolder();
        jdbc.update(psc, keyHolder);

        return keyHolder.getKey().longValue();
    }

    private void saveIngredientToTaco(Ingredient ingredient, long tacoId) {
        jdbc.update("insert into Taco_Ingredients (taco, ingredient) " + "values (?, ?)", tacoId, ingredient.getId());
    }
}
```

Ingredient보다는 조금더 복잡하다. Front단에서 사용자가 식자재를 선택하여 생성한 타코 디자인을 저장하기 위해서는 타코와 연관된 식자재 데이터도 Taco_Ingredient 테이블에 저장해야하기 때문이다. 이렇게 해야 어떤 식자재를 어떤 타코에 넣을지 알 수 있다.

<br>

### IngredientByIdConverter

```jsva
@Component
public class IngredientByIdConverter implements Converter<String, Ingredient> {

    private IngredientRepository ingredientRepo;

    @Autowired
    public IngredientByIdConverter(IngredientRepository ingredientRepo) {
        this.ingredientRepo = ingredientRepo;
    }

    @Override
    public Ingredient convert(String id) {
        return ingredientRepo.findById(id);
    }
}
```

String 타입의 식자재를 ID를 사용해서 DB에 저장된 특정 식자재 데이터를 읽은 후 Ingredient 객체로 변환하기 위해 컨버터도 생성해주어야 한다.

<br>

### DesignTacoController

```java
@Slf4j
@RestController
@RequestMapping("/design")
public class DesignTacoController {
    private final IngredientRepository ingredientRepo;
    private TacoRepository tacoRepo;

    @Autowired
    public  DesignTacoController(IngredientRepository ingredientRepo, TacoRepository tacoRepo){
        this.ingredientRepo = ingredientRepo;
        this.tacoRepo = tacoRepo;
    }

    @GetMapping
    public List<Ingredient> showDesignForm(){
        List<Ingredient> ingredients = new ArrayList<>();
        ingredientRepo.findAll().forEach(i -> ingredients.add(i));
        return ingredients;
    }

    @PostMapping
    public Taco processDesign(@RequestBody Taco design,  @ModelAttribute Order order){
        Taco saved = tacoRepo.save(design);
        order.addDesign(saved);
        return design;
    }
}
```

DesignTacoController에서 데이터를 생성해서 리턴했었다. 이 부분을 이제 db에서 가져와 리턴하는 방법으로 변경해주었다.

그리고 Front단에서 post요청으로 데이터를 전달하면 design에 들어오게 된다. design은 Taco 클래스라는 것을 명시해준 것이고 인자로 들어왔다고 보면 된다. 이제 들어온 design(데이터)를 실제 db에 저장까지 해주면 끝이다.

<br>

![](/images/ff6aaca0-eb7e-43ef-8a52-454cd458614c-image.png)

![](/images/02c0499a-473b-44c6-9c7f-e8828ccb6996-image.png)


9090/h2-console 주소로 가보면 db를 확인해볼 수 있는 UI가 나타난다. 만약에 connect할 수 있는 화면이 나타나지 않는다면 application.properties를 수정해줘야 한다.

```
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
spring.datasource.url=jdbc:h2:mem:testdb;
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.H2Dialect
```

이 코드를 추가해주고 connect할 때, url 부분에 jdbc:h2:mem:testdb 를 넣어주면 정상적으로 동작할 것이다.

<br>

## 마무리

스프링 부트와 자바에 대해 살짝 맛만 보았다. 모르는 개념이 너무 많고 사용하는 API에 따라 방법도 다르다. 그런데 생각해보면 Front도 그렇다. 많이 해보고 익숙해지는 것이 중요한 것 같다. 사실 코틀린을 사용하기 위해서는 JAVA와 Spring에 대해 어느정도 알아야 하고, 레퍼런스도 자바로 되어있는것이 많다고 해서 사용해보았다.

또한, 자주 사용하던 Front 스택과 처음 해보는 Spring Back단을 연결해보며 힘든점도 있었지만 성공했을때 너무 재밌었던것 같다.

이제 RestAPI를 구현하는 방법을 중점적으로 공부할 예정이고, 코틀린을 사용해볼 것이다.
~~프론트도 해야하는데 할게 너무 많다..~~