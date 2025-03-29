---
title: "Mandarin-market - 3"
description: "각종 버그 해결 및 채팅 목록 UI 구현"
date: 2022-01-19T15:03:01.189Z
tags: ["CSS","React","next","typescript"]
---
### UI 구현

### 헤더와 캐러샐 버그

undefined

이전 글에서 캐러샐이 헤더위에 오는 순간 헤더 위에 위치하는 버그가 발생했었다. 이 부분을 해결하기 위해 헤더와 레이아웃의 statusBar에 `z-index`값을 주어 해결했다.

### 마진 병합 현상

```jsx
export const ProfileUpate = () => {
  return (
    <Container>
      <h2 className="sr-only"></h2>
      <Nav>
        <button>
          <ArrowBackIcon className="arrow" />
        </button>
        <button className="more">저장</button>
      </Nav>
      <ProfileFormContainer>
        <ProfileForm btnLabel="저장" />
      </ProfileFormContainer>
    </Container>
  );
};
```

프로필을 수정하는 부분을 구현하고 있었다. Nav가 fixed 속성을 가지고 있는데, 프로필 사진 부분부터 시작되는 컴포넌트에 margin-top을 주었더니 아래와 같이 원하던 동작이 나오지 않았다.

![](/images/d44883a4-4562-4cda-ba2e-d3ee11c61f56-image.png)

곰곰히 생각해보니 마진 병합 현상이 일어난 것 같다. 빈 테이블 태그로 해결을 하려다 그냥 부모 태그에 overflow hidden을 주어 해결했다.

<br>

### 컴포넌트 분리

![](/images/2e6d2e30-b7ce-4246-aa28-c4e818e46a2d-image.png)

회원가입 후 프로필 설정하는 UI와 프로필 수정을 눌러 프로필을 다시 설정하는 부분의 UI는 일치하는 부분이 꽤 많았다. 그래서 ProfileForm라는 컴포넌트로 분리했다.

그리고 상황에 맞게 사용해주었다.

```jsx
      {btnLabel === "감귤마켓 시작하기" && (
        <Button disabled={!(isName && isMyId && isIntro)}>{btnLabel}</Button>
      )}
      {btnLabel === "저장" && (
        <SaveBtn disabled={!(isName && isMyId && isIntro)}>저장</SaveBtn>
      )}
```

왼쪽의 경우와 오른쪽의 경우 버튼의 모양이 다르다. 하지만 이 버튼들은 Form안에 있어야한다.(정보들을 제출하기 위해)

그래서 ProfileForm 컴포넌트를 사용할 때 btnLabel이라는 값을 넘겨주기로 하고, 이에 맞게 버튼을 생성하고 있다.

<br>

### 채팅 목록 페이지

![](/images/6861ec07-89f2-45ad-ac91-d5821bba0cd0-image.png)

이번에는 채팅 목록 페이지를 만들어보려고 한다.

```js
const chatData = [
  {
    id: 0,
    src: "",
    name: "김정희",
    content: "리엑트 너무 쉽다~~",
    createdAt: "2022.01.19",
    read: true,
  },
  //생략...
  ]
```

먼저 데이터 구조는 이렇다. src가 비어있으면 기본 이미지를 주고, 비어있지 않으면 그에 해당하는 이미지를 보여줄 예정이다. read는 메세지를 읽지 않았을 경우에 동그라미 표시를 남기기 위한 데이터 항목이다. id는 key값을 부여하기 위해서도 필요하고, 동적 라우팅을 위해서도 필요하다. 채팅 목록의 경우 여기서 하나를 선택해 클릭한다면 해당 채팅방으로 넘어가져야 한다. 이 부분을 동적 라우팅으로 구현하면 좋을 것 같다는 생각을 하며 데이터 구조를 만들었다.

```jsx
        <ChatLists>
          {chatData.map((chat) => {
            const { id, src, name, content, createdAt, read } = chat;
            return (
              <Link href={`/chats/${id}`} key={`chatItem-${id}`}>
                <a>
                  <ChatItem>
                    <ImgContainer>
                      {src === "" ? (
                        <Img
                          src="./images/ellipse-profile.svg"
                          alt="프로필 이미지"
                        />
                      ) : (
                        <Img src={src} alt="빈 프로필 이미지" />
                      )}
                      {!read && <Read />}
                    </ImgContainer>
                    <ChatTextContainer>
                      <Name>{name}</Name>
                      <Content>{content}</Content>
                    </ChatTextContainer>
                    <CreatedAt>{createdAt}</CreatedAt>
                  </ChatItem>
                </a>
              </Link>
            );
          })}
        </ChatLists>
```

레이아웃 구조는 이와 같다. Content의 경우에 `text-overflow: ellipsis;` 을 줘서 어느정도 글자 길이가 길어지면 `...`으로 표시할 수 있도록 했다.

위에서 설명한대로 빈 이미지와 이미지를 src에 따라 가져오고 있고, read값을 이용하여 읽음 처리 표시도 하고 있다.

그리고 채팅 목록 하나하나 마다 Link를 걸어주고 있는데 `href={`/chats/${id}`}`을 주며 동적 라우팅을 고려하고 있다.