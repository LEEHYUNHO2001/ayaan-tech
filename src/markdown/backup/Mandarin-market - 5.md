---
title: "Mandarin-market - 5"
description: "회원가입 구현을 끝내보자! 이미지 미리보기와 이미지 서버에 이미지 등록 후 응답 받은 데이터로 회원가입."
date: 2022-02-25T04:06:17.363Z
tags: ["React","next","typescript"]
---
## 회원 가입

이전 글에서 next-auth로 로그인을 구현해보았다. 이번에는 회원가입을 구현해보려고 한다. API 명세서가 있기 때문에 요청을 잘 보내면 알맞은 응답이 돌아올 것이다.

<br>

### 이메일 체크

![](/images/38ccbce3-d270-4cc7-b84d-e23b36ef9551-h.gif)

먼저 회원가입시 이메일을 입력했을 때, 이미 가입한 이메일인지 체크해야한다.

```jsx
//SinUp.tsx
  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (isEmail && isPassword) {
        try {
          const isSignUp = await axios.post(`${API_ENDPOINT}user/emailvalid`, {
            user: { email: email },
          });

          if (isSignUp.data.message === "사용 가능한 이메일 입니다.") {
            setSignUp({ email: email, password: password });
          } else {
            alert(isSignUp.data.message);
          }
        } catch (err) {
          alert("잘못된 접근입니다.");
        }
      }
    },
    [email, password, router]
  );
```

다음을 클릭했을 경우 onSubmit 함수가 실행된다. 이메일과 패스워드에 대한 유효성 체크를 해주고, 알맞게 들어왔을 경우 axios 요청을 보낸다.

응답 받은 데이터에서`사용 가능한 이메일 입니다.` 라는 메세지가 올 경우 `setSignUp` 으로 state를 변경하여 프로필을 입력하는 UI로 넘어가고, 아닌 경우에는 alert로 이미 가입되어 있다는 메세지를 띄운다. 에러가 나는 경우도 try catch문으로 처리했다.

그리고 함수가 리랜더링 될 때마다 새로 생성되지 않도록 useCallback을 사용했다. 사실 메모리적으로 엄청난 부하를 주는것은 아니지만 그래도 조금이라도 재사용하는 것이 중요하다. ~~극한의 이득충~~

<br>

### 정보 입력 후 회원 가입

![](/images/b957b8d2-636f-43fe-bec7-29fd395f2ce4-image.png)

회원 가입을 입력하는 Form이다. 유효성 검사에 맞게 정보를 입력하면 시작하기 버튼이 활성화된다.

<br>

```jsx
//ProfileForm
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
            image: `${API_ENDPOINT}Ellipse.png`,
          },
        }),
      });
      alert("회원가입에 성공했습니다.");
      router.push("/");
    } catch (err) {
      alert("알맞은 정보를 입력해주세요.");
    }
  };
```

버튼이 활성화되면, 회원 가입에 대한 요청을 보내야한다. 명시되어 있는 조건에 맞게 header에 값을 넣어 보내주고 있다. 그리고 user 객체를 보낼 때, JSON문자열로 변환하기 위해 JSON.stringify을 사용해주고 있다. 
이제 정상적으로 회원가입이 된다.

<br>

### 프로필 이미지 업로드

```jsx
//ProfileForm.tsx
        <ImgInput
          type="file"
          id="upload"
          accept="image/*"
          onChange={handleImgInput}
        ></ImgInput>
      </ImgLabel>
```

![](/images/acb5bb75-693f-486f-b2d9-663a52411a72-image.png)

이미지를 등록하는 input이 있어야 한다. 
선택한 이미지는 handleImgInput 에서 다룰 것이다.

<br>

```jsx
//ProfileForm.tsx
  const [img, setImg] = useState<File[]>([]);
  const [formData, setFormData] = useState<FormData>();

  const handleImgInput = ({
    currentTarget: { files },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (files && files.length) {
      const formData = new FormData();
      formData.append("image", files[0]);
      setFormData(formData);
      setImg((existing) => existing.concat(Array.from(files)));
    }
  };
```
e.target.files값을 setImg로 img에 할당하기 위해 여러 시도를 하다가 결국 구글링을 했다. [StackOverflow](https://stackoverflow.com/questions/63501087/react-typescript-how-to-set-multiple-files-to-state) 에서 해결 방법을 찾을 수 있었다.

API에 요청을 보낼 때, `key: "image" value: 이미지 파일` 형식으로 보내라고 명시되어있다. 그래서 formData에 대한 state를 하나 더 생성해주었다.

<br>

```jsx
//ProfileForm.tsx
  const imgUpload = async () => {
    try {
      const res = await axios(`${API_ENDPOINT}image/uploadfile`, {
        method: "POST",
        data: formData,
      });
      return `${API_ENDPOINT}${res.data.filename}`;
    } catch (err) {
      alert("잘못된 접근입니다.");
    }
  };
```

엔드 포인트에 요청을 보내 이미지를 업로드 하고있다.

<br>

```jsx
//ProfileForm.tsx
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let imgUrl = await imgUpload();
    if (imgUrl === `${API_ENDPOINT}undefined`) {
      imgUrl = `${API_ENDPOINT}Ellipse.png`;
    }
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
  };
```

이 함수를 회원 가입 submit에서 사용하는 것이다. imgUrl을 가져오고, 만약에 없다면 기본 이미지를 사용하기 위해 `imgUrl = `${API_ENDPOINT}Ellipse.png`;` 값을 부여했다.

회원가입 할 때, 이제 image에 imgUrl값을 넣어주면 된다.

![](/images/094282f7-4d35-407d-94a5-40f1627e7f2e-image.png)

이미지를 업로드 요청을 하고, 응답받은 새로운 filename을 이용하여 회원가입시에 image 값으로 사용했다. 이제 이미지는 이 주소로 불러오면 적용될 것이다.

<br>

```jsx
<img src="http://146.56.183.55:5050/1645749502372.png" alt="" />
```

![](/images/5a18f874-5119-4803-afef-9c71c01f6d83-image.png)

그냥 이 주소를 사용하여 img 태그 src에 부여해보자. 예시로 올렸던 사진이 정상적으로 나타나고 있다. 이미지 서버에 정상적으로 업로드 되고, 그에 맞게 주소를 반환받은 것이다.

<br>

### 프로필 이미지 미리보기

```jsx
//ProfileForm.tsx
  const [pre, setPre] = useState(`${API_ENDPOINT}Ellipse.png`);

  const preview = (file: Blob) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => setPre(`${reader.result}`);
  };
```

`handleImgInput` 에서 `preview(files[0]);` 을 해주었다. preview 함수에서 파라미터로 잘 받아오고 있다. 이제 pre를 이미지 주소로 주면 미리보기가 완료된다.

현재 우리의 코드는 background에서 url로 이미지를 주고 있었다. 하지만 여기에 인코딩된 image 값을 넣으니 정상적으로 나타나지 않았다. 뭔가 CSS적인 문제였던거 같은데 그냥 HTML 구조랑 CSS값을 바꿔서 img태그를 추가했다.

```jsx
//ProfileForm.tsx
      <ImgContainer>
        <ProfileImg src={pre} alt="프로필 이미지 미리보기" />
        <ImgInput
          type="file"
          id="upload"
          accept="image/*"
          onChange={handleImgInput}
        ></ImgInput>
      </ImgContainer>
```

![](/images/2fe810c0-bd0f-4603-88c9-959b0516e176-image.png)

이미지 미리보기가 정상적으로 동작한다. 설계하고 보니 `setImg((existing) => existing.concat(Array.from(files)));` 부분은 필요없어서 제거해주었다.

이렇게 회원 가입 기능까지 구현해보았다. 자잘한 에러나 예상치 못한 잘못된 요청으로 인해 조금 헤매기도 했지만 구현하고 보니 정말 별거 아니였다...