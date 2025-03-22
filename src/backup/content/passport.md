---
title: "passport"
description: "사용자 인증 절차에 대한 로직을 간단하게 구현할수 있도록 도와주는 Node.js 미들웨어다."
date: 2021-08-24T06:42:55.845Z
tags: ["node.js"]
---
>## passport란??

**사용자 인증 절차**에 대한 로직을 간단하게 구현할수 있도록 도와주는 **Node.js 미들웨어**다. 어느 사이트에 로그인을 하면, 다른페이지로 이동해도 로그인 상태는 유지되어야한다. 우리는 복잡한 **세션과 쿠키**를 구현해야하는데, passport 미들웨어로 안전하고 간단하게 설계할수 있다.

<br />


> 쿠키(Cookie)와 세션(Session)

**HTTP 프로토콜**은 **비연결성**과 **비상태성**이라는 특징이 있다. 이로인해 서버의 자원을 절약할 수 있다. 하지만 **같은 사용자가 요청을 여러번 하더라도 매번 새로운 사용자로 인식하는 단점**이 있다. 이를 보완하기위해 **쿠키와 세션**을 사용하게 되었다.

<img src="https://img1.daumcdn.net/thumb/R800x0/?scode=mtistory2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fvudth%2FbtqETKMso3u%2FnkPuJVxBjm2hF4EMBNTkK0%2Fimg.jpg" />

사용자의 정보를 입력하고 로그인 버튼을 누르면, 브라우저는 HTTP Request를 Server에 보낸다. 

로그인 상태를 유지하기 위해서는 브라우저랑 서버는 같은 정보를 들고있어야한다. 서버에 있는 모든 정보를 Client에 주면 해킹의 위험이 있기때문에 랜덤한 문자열인 **쿠키**를 준다.

서버는 이 쿠키와 사용자의 정보가 연결되어있다는 정보가 필요한데, **세션**이 필요한 이유이다.

홈쇼핑을 예로 들면 사용자의 정보에는 id, email, password, nickname, 장바구니목록들 등이 있을거다. 많은 양의 정보들때문에 Server 메모리에 부담이가게 되는데 **passport는 세션을 id하고만 매칭**시켜놓는다.

<br /><br />

> ## 전략(Strategy)
기본적으로 인증을 하기 위한 전략

passport는 여러가지 전략을 가지고있다. 기본적인 전략은 **local전략**으로 개발자가 현재 서비스 되고 있는 **DB를 이용하여 직접 인증로직을 구현**하는것 이다. 다른 전략은 naver, kakao, facebook, google 등 소셜 API를 이용한 전략이다. passport의 전략부분만 바꿔주면 되므로 유연하게 대처할 수 있다.

<img width="600" src="https://pbs.twimg.com/media/DUVzXBXU0AAxKiY.jpg" />

passport의 전략들을 React환경에서 사용해보자.

<br /><br />

> ## 설치

```js
npm i passport passport-local
npm i passport express-session cookie-parser
```

> ## local 전략 사용
현재 프로젝트는 Front Server과 Back Server가 따로 존재한다.


```js
//app.js
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');

const passportConfig = require('./passport');

passportConfig();

app.use(cookieParser("12341234"));
app.use(session({
    saveUninitialized: false,
    resave: false,
    secret: "12341234",
}));
app.use(passport.initialize()); //초기화
app.use(passport.session()); //세션에서 로그인정보 복구
```
Server의 app.js에 미들웨어들을 선언해준다. passport에 대한 작업은 passport 디렉터리에서 수행하기 때문에 passportConfig를 선언해주었다. secret처럼 예민한 정보의 노출을 최소화하고싶으면 env를 사용하는것을 추천한다.

<br />

```js
//passport/local.js
const passport = require('passport');
const {Strategy : LocalStrategy} = require('passport-local');
const {User} = require('../models');
const bcrypt = require('bcrypt');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
    }, async (email, password, done) => {
        try{
            const user = await User.findOne({
                where:{email}
            });
            if(!user){
                return done(null, false, {reason : '존재하지 않는 사용자입니다.'});
            }
            const result = await bcrypt.compare(password, user.password);
            if(result){
                return done(null, user);
            }
            return done(null, false, {reason: '비밀번호가 일치하지 않습니다.'})
        } catch(error){
            console.error(error);
            return done(error)
        }
    }));
};
```
전략을 사용하는 부분이다. 나중에 다른 전략을 사용하기위해 Strategy를 LocalStrategy의 변수명으로 사용하도록 했다. **Strategy의 첫번째 인자는 객체이고, 두번째 인자는 함수**이다. 

현재 Back Server에 req.body.email의 형태로 email에 대한 정보가 들어가있는데, 객체에 usernameField: 'email'와 같이 선언해준다.

sequelize를 사용하고 있어 findOne함수를 사용했다. 입력받은 email이 DB에 있는지 조사하여 user에 넣어준다. bcrypt는 password를 암호화하기위해 사용한것이다.
우리가 집중해야할 부분은 **done()** 이다. **첫번째 인자는 서버에러**, **두번째 인자는 성공 여부**, **세번째 인자는 클라이언트 에러**이다.

<br />

```js
//passport/index.js
const passport = require('passport');

const local = require('./local');
const {User} = require('../models');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try{
            const user = await User.findOne({where:{id}});
            done(null, user);
        } catch(error){
            console.error(error);
            done(error);
        }
    });

    local();
};
```
전략을 설계한 local을 불러와준다. **serializeUser**는 Back server 메모리를 위해 사용자의 모든 정보가 아닌 user.id만 따로 저장한다. id를 통해 복원하기 위해서 **deserializeUser**는 id값으로 유저 찾아서 연결해준다. 이 값은 req.user에 들어가도록 되어있다.

<br />

```js
//routes/user.js

//server error, 성공한경우 유저정보, reason(client error)
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if(err){
            console.log(err);
            return next(err);
        }
        if(info){
            //로그인 잘못되면 401로 많이한다.(허가되지않음)
            return res.status(401).send(info.reason);
        }
        return req.login(user, async(loginErr) => {
            if(loginErr){
                return next(loginErr);
            }
            const UserWithPost = await User.findOne({
                where: {id: user.id},
                include:[{
                    model: Post,
                }]
            });
            //사용자 정보 Front Server로 넘겨줌
            return res.status(200).json(UserWithPost);
        });
    })(req, res, next);
});
```

전략과 serializeUser, deserializeUser을 설계했으니 **passport.authenticate**로 사용해주자.

~~passport.authenticate의 사용법 때문에 req, res, next을 사용할수 없어서 미들웨어를 확장하는 방식을 선택했다. 여기에서 next는 무시하자.~~

authenticate의 인자에는 전략 방식과 done()의 인자 3개를 받는다.

req.login는 passport의 로그인 함수이다. return res.json(user);으로 사용자의 정보를 Front server로 넘겨주고있다. 
작성한 게시글까지 넘겨주고싶으면 다른 DB테이블이므로 findOne해서 관련된 글 찾고 include해줘야 한다.

그리고 passport는 req.login할때 내부적으로 res.setHeader('쿠키', '세션') 을 넘겨주게된다.

<br />

> * local 전략의 전체적인 동작
1. 브라우저에서 사용자가 로그인폼에 email과 password를 입력하고 전송하면, 해당 데이터가 dispatch가 된다.
2. 데이터를 받아서 /user/login으로 넘긴다. (Back Server req.body에 들어감)
3. user.js에서 authenticate local이 실행이된다.
4. local.js가 실행되어 상황에 맞게 done을 return 한다.
5. authenticate에서 에러가 없으면 req.login(passport 로그인)을 시도한다.
	req.login하는 동시에 index.js의 serializeUser을 한다.
6. 문제없으면 프론트로 사용자의 정보를 넘겨준다. 그리고 세션에 정보를 저장한다.

<br /><br /><br /><br /><br /><br /><br />

[zerocho]
