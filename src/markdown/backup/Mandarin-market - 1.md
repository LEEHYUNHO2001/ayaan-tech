---
title: "Mandarin-market - 1"
description: "모바일 퍼스트로 감귤 마켓 설계하기(React, Next, TypeScript)"
date: 2022-01-13T12:23:29.343Z
tags: ["React","next","typescript"]
---
* FrontEnd
  * React Hooks
  * TypeScript
  * Next.js


감귤 마켓 프로젝트를 2명의 팀원과 설계 되었다. Git/GitHub 부터 컨벤션 및 역할 분담, 프로젝트 설계 방법 등을 팀원들에게 지식을 전파하느라 우여곡절이 많았지만 모두 힘을 모아 프로젝트를 구현해나가고 있다.

<br>

![](/images/aa88e167-a492-40b3-b6f9-1d0b0a25b553-image.png)

UI는 Figma를 보며 설계하고 있고, 아이콘은 mui를 이용하여 넣어주는게 더 가벼울 것 같아 모듈을 추가해주었다.

초기 셋팅이 끝난 후 역할 분담을 하고 UI부터 구현하기로 했다. **UI는 모바일 퍼스트로 구현한다.**

<br>

## 프로젝트 구현

### MyProfile - info

![](/images/149ca17b-211a-49f3-b3e9-99ab4d2d0e28-image.png)

```jsx
export const MyProfileInfo = () => {
  const userData = {
    src: "https://cdn.pixabay.com/photo/2018/05/26/18/06/dog-3431913_960_720.jpg",
    followers: 1111,
    followings: 222,
    nickname: "영등포 빵주먹 이현호",
    email: "dlgusgh200240@gmail.com",
    content: "당근 마켓 유사 프로젝트 진행중..",
  };
  return (
	//생략
  );
};
```

MyProfile에서 나의 정보를 표시해주는 부분 부터 보자. UI만 먼저 설계하고 있지만 추후에 BackEnd가 추가될 것을 고려해야 한다. 그래서 MyProfile에서 사용될 데이터를 임의로 생성해주고, 생략처리한 return 부분에서 사용해주었다. 

<br>

### MyProfile - header

![](/images/533d1015-94d2-455b-b93b-a2cbd3bdb509-image.png)

이번에는 MyProfile의 헤더 부분이다. 사실 여기서 시간을 많이 잡아먹었다. 

![](/images/61ecab2a-36a2-4407-b94e-888cd6441893-image.png)

현재 나의 프로필 정보만 보이지만 밑에는 이와 같이 포스트들이 보이며 그 위에는 작게 캐러셀도 보이는 것 같다. 헤더는 fixed 되어야 하며 오른쪽 끝에 위치한 점점점 모양을 누르면 모달이 생겨야 한다.

```jsx
  const [myProfileModal, setMyProfileModal] = useState(false);
  const openMyProfileModal = () => {
    setMyProfileModal(true);
  };
  const closeMyProfileModal = () => {
    setMyProfileModal(false);
  };
```

모달을 생성하기 위해 점점점을 누르면 myProfileModal값이 true가 되고 모달이 나타날 수 있도록 render부분에 `{myProfileModal && 모달}` 방식으로 구현했다.

undefined

생성된 모달은 스크롤을 내려도 하단에 있어야 한다.

헤더에 `position: fixed;`을 주고, 그 안에 모달 요소를 생성하여 `position: absolute;`을 주었다. 그리고 bottom값을 설정하여 하단에 위치시켰다.

undefined

마지막으로 모달을 띄우고 닫기 위한 방법이다. 모달 외의 스크린을 누르면 모달창이 닫힐 수 있도록 설계했다.

모달창 생성부분 전에 `{myProfileModal && <ModalBackground onClick={closeMyProfileModal} />}` 을 추가해주어 모달창 외의 부분에는 회색 부분이 띄어지도록 했고, 이 부분을 클릭시 모달창이 닫아지도록 구현했다. 이 부분은 모달창 생성부분보다 앞에 있어야 정상적으로 동작한다.(그래야 모달의 모서리 둥근 부분이 잘 표시됨)

<br>

undefined

점점점을 누르면 나타나는 모달창에서 로그아웃을 누르면 새로운 모달창이 나타나야 한다. 위에서 생성한 모달과 조금 다르지만 기능 자체가 유사하므로 어렵지 않았다.

하지만 이 모달은 중간에 위치해야 하는데, 이 부분에서 또 헤맸다.

`absolute`가 들어가 있어 `top`과 `left`로 위치를 조정해줘야 하는데, left를 특정 값을 주어 가운데 정렬을 할 경우 반응형이 안된다.

```jsx
          <LogOutModal>
            <LogOutModalContainer>
              <LogoutText>로그아웃하시겠어요?</LogoutText>
              <LogOutBtnContainer>
                <div onClick={closeLogoutModal}>
                  <LogoutCancel>취소</LogoutCancel>
                </div>
                <div>
                  <Logout>로그아웃</Logout>
                </div>
              </LogOutBtnContainer>
            </LogOutModalContainer>
          </LogOutModal>
```

그래서 해결한 방법이 모달을 컨테이너로 한번 더 감싸 주었다.

```jsx
const LogOutModal = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;
const LogOutModalContainer = styled.div`
  width: 100vw;
height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const LogoutText = styled.p`
  text-align: center;
  width: 200px;
  height: 40px;
  background-color: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  font-size: 12px;
  padding: 15px 0;
`;
const LogOutBtnContainer = styled.div`
  border-top: 0.5px solid #dbdbdb;
  width: 200px;
  display: flex;
`;
const LogoutCancel = styled.p`
  text-align: center;
  padding-top: 13px;
  width: 100px;
  height: 40px;
  font-size: 10px;
  border-bottom-left-radius: 10px;
  border-right: 0.5px solid #dbdbdb;
  background-color: #fff;
`;

const Logout = styled.p`
  text-align: center;
  padding-top: 13px;
  width: 100px;
  height: 40px;
  font-size: 10px;
  border-bottom-right-radius: 10px;
  background-color: #fff;
`;

```

감싼 컨테이너에 `width`를 100%로 주고 `flex`를 주어 `justify-content: center;` 로 가운데 정렬 시켜주었다. 물론 그 위에서 absolute의 left값은 0이다. 뭔가 조금 꼼수를 써서 해결한거 같지만 나름 좋은 방법이라고 생각했다.

<br>

### 함수 타입

모달창을 두개 구현하다 보니 코드가 길어졌다. 그래서 추상화를 해주기로 결정했다. 먼저 로그아웃 모달창을 컴포넌트로 빼자. `closeLogoutModal`는 두번 째 모달창에서 취소를 누른다면 로그아웃이 되지 않고 모든 모달창을 닫기 위한 핸들러이다. 그래서 컴포넌트에서 사용해야 하는데, 타입 지정하는데 무엇으로 해줘야할지 모르겠다. 

```jsx
interface CloseLogoutModal {
  closeLogoutModal: () => void;
}

export const LogOutModal = ({ closeLogoutModal }: CloseLogoutModal) => {
  return (
    <Container>
      <LogOutModalContainer>
        <LogoutText>로그아웃하시겠어요?</LogoutText>
        <LogOutBtnContainer>
          <div onClick={closeLogoutModal}>
            <LogoutCancel>취소</LogoutCancel>
          </div>
          <div>
            <Logout>로그아웃</Logout>
          </div>
        </LogOutBtnContainer>
      </LogOutModalContainer>
    </Container>
  );
};
```

StackOverflow를 참고하고 VScode에서 기본적으로 제공하는 오류 코드를 보며 해결했다. (취소와 로그아웃 부분을 button이 아닌 div로 준 이유는 button에 브라우저에서 자동적으로 부여하는 margin, padding 값 때문에 임시적으로 div로 주었다.)

<br>

> 마무리

undefined

UI를 구현하는 실력도 점점 증가하는것 같다.(꼼수도..)