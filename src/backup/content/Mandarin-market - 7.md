---
title: "Mandarin-market - 7"
description: "프로필 수정 기능 구현 및 로그인 세션에서 문제점 발견"
date: 2022-03-11T05:20:12.598Z
tags: ["React","next","typescript"]
---
## 프로필 수정

![](/images/2a8051ea-f06d-4e98-828a-b81c1863eef4-image.png)

프로필 수정하는 부분을 설계해보겠다. 사실 프로필 수정 부분은 회원 가입에서 사용되는 UI와 거의 비슷하다.

![](/images/c72d6505-6c1e-432e-a04f-a62cf1ffce42-image.png)

```jsx
//ProfileForm.tsx
<Form onSubmit={(e) => onSubmit(e, btnLabel)}>
  {btnLabel === "감귤마켓 시작하기" && (
    <Button disabled={!(isName && isMyId && isIntro)}>{btnLabel}</Button>
  )}
  {btnLabel === "저장" && (
    <SaveBtn disabled={!(isName && isMyId && isIntro)}>저장</SaveBtn>
  )}
</Form>
```

그래서 props로 넘겨주는 btnLabel 값에 따라 Form 안에서 다른 버튼을 생성하고 있다.

그리고 onSubmit 에도 btnLabel을 파라미터로 넘겨주며, 이 값에 따라 다른 요청을 보낼 것이다.

<br>

```jsx
//ProfileForm.tsx
  const onSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    btnLabel: string
  ) => {
    e.preventDefault();
    let imgUrl = await imgUpload();
    if (imgUrl === `${API_ENDPOINT}undefined`) {
      imgUrl = `${API_ENDPOINT}Ellipse.png`;
    }
    if (btnLabel !== "저장") {
      try {
        await axios(`${API_ENDPOINT}user`, {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          data: JSON.stringify({
            user: {
              username: name,
              email: signUp.email,
              password: signUp.password,
              accountname: myId,
              intro: intro,
              image: imgUrl,
            },
          }),
        });
        alert("회원가입에 성공했습니다.");
        router.push("/");
      } catch (err) {
        alert("알맞은 정보를 입력해주세요.");
      }
    } else {
      try {
        await axios(`${API_ENDPOINT}user`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-type": "application/json",
          },
          data: JSON.stringify({
            user: {
              username: name,
              accountname: myId,
              intro: intro,
              image: imgUrl,
            },
          }),
        });
        alert("프로필 변경에 성공했습니다.");
        router.push("/myprofile");
      } catch (err) {
        alert("알맞은 정보를 입력해주세요.");
      }
    }
  };
```

회원가입 파트에서는 버튼을 클릭했을 경우 정상적으로 회원가입에 대한 요청이 수행되도록 설계하고, 프로필 수정 부분에서는 프로필 수정에 대한 요청을 할 수 있도록 구현했다.

![](/images/0313393b-72d1-4668-b240-c8590d541159-image.png)

### 문제점 발견

현재 나의 프로필이다. 여기서 프로필 수정을 누르면 edit 페이지로 넘어간다.

<br>


![](/images/3c696440-469b-49c1-8864-964c37de6ac9-image.png)

이미지, 사용자 이름, 계정 ID, 소개를 수정하여 저장 버튼을 눌러보자. 요청이 성공해서 이 계정의 정보(프로필)가 수정된다.

![](/images/4d42abe6-6a2f-4e59-bca8-e8f38647460f-image.png)

저장을 누르면 프로필 수정 요청을 보내, 성공하면 alert를 띄운 후 다시 myprofile 페이지로 리다이렉트한다.

![](/images/377d9e0c-417f-49b3-b5e8-06e55ddf7fee-image.png)

하지만 오류가 나타나고 있다.

![](/images/14352e83-6df9-47c2-a31e-2ec2a83c3969-image.png)

에러 내용을 살펴보니 알 것 같다. 프로필 수정 전 계정 ID가 testho 였다. 지금은 hohoho로 변경한 상태이다. 하지만 로그인시 저장되었던 세션에서는 아직도 계정 ID가 testho인 것이다.

세션에는 현재 token, accountname, image 3개의 정보만 들어있다. 그 이유는 next-auth에서 추가적인 값을 넣을 수 없기 때문이다. 그래서 이메일과 패스워드 주소로 다시 요청을 보내서 세션에 유저의 데이터를 변경할 수 없다.

```jsx
//ProfileForm.tsx
await signOut({ callbackUrl: `${window.location.origin}` });
```

유저의 데이터를 모두 가져와 프로필 바뀐 유저를 filter로 찾고, 이 유저의 이메일 패스워드 데이터로 다시 로그인 시키는 방법도 보안적으로 좋지 않은 방법인 것 같아 로그아웃만 시켰다. signOut 함수는 [next-auth (사용법)](https://velog.io/@leehyunho2001/Mandarin-market-4)에서 지원한다. 
