---
title: "SPACE_DEV_CLUB - 17"
description: "정규표현식, 모달 통일, 에러처리 및 민감한 정보 고려, 해결하지 못한 문제점"
date: 2022-03-06T08:42:45.691Z
tags: ["React","next","typescript"]
---
## 기능 구현

[이전 글](https://velog.io/@leehyunho2001/SPACEDEVCLUB-16-i7fkiydu)에서 말한대로 부족했던 기능을 마저 구현해보겠다.

<br>

### # 추출 및 들여쓰기

```jsx
//RighterHeader.tsx
      {listData.length !== 0 && (
        <article>
          {listData.map((str, i) => {
            const strNum = str.match(/#*/)?.join("").length!;
            const strReg = str.match(/[^#+][#]*/g)?.join("");
            console.log(strReg, strNum);

            return (
              <Link key={`Detail-List-${i}`} href="#">
                <a>
                  <List strNum={strNum}>{strReg}</List>
                </a>
              </Link>
            );
          })}
        </article>
      )}
```

현재 listData에는 ['## 기능구현', '### A기능'] 처럼 #을 가지고 있는 헤더를 추출한다. 여기서 #의 갯수에 따라 UI에서 들여쓰기를 해주려고 한다. 그리고 #을 제외한 헤더들을 뽑아내야 할 것이다. (strNum, strReg을 선언했다.)

```jsx
//RighterHeader.tsx
interface StrNum {
  strNum: number;
}

//...

const List = styled.div<StrNum>`
  margin-left: ${({ strNum }) => strNum * 10}px;
`;
```

strNum에는 #의 갯수가 있다. props로 styled에 넘겨주고, 이 값을 이용하여 들여쓰기 해주기 위해 인터페이스를 하나 생성했다.

그리고 margin-left값을 주었다.

![](/images/0a29ae80-446e-49c4-98bf-c01697f26341-image.png)

원하던 UI가 나타난것을 볼 수 있다.

![](/images/debf41f8-2461-4406-8105-90f7b842da9d-image.png)

헤더 표시 # 외에도 이름으로 #을 사용할 경우의 처리도 해주었다.
(추출의 경우 실제로는 #이 6개인데 들여쓰기가 3개치만 되어있음. 오른쪽 UI에 ### 추출이라고 나타남.)

<br>

## 모달 통일

![](/images/449e54d8-ff83-4555-a5ff-5f732e1406bc-image.png)

댓글을 삭제하려고 삭제버튼을 누를 경우에 나타날 모달을 DeleteModal 컴포넌트에서 구현했다. 그런데 이 모달은 기능이 거의 비슷한 채로 UI만 살짝 다르게 이곳 저곳에서 많이 사용된다. 예를들어, 글을 삭제하는 부분에서도 사용되고 회원 탈퇴하는 곳에서도 사용된다. 그래서 컴포넌트로 따로 빼주었다.

```jsx
//Modal.tsx
export const Modal = ({
  title,
  handleOK,
  handleCancel,
  children,
}: ModalProps) => {
  const { theme } = useContext(ThemeContext)
  document.body.style.overflow = "hidden"
  return (
    <Container theme={theme}>
      <ContContainer theme={theme}>
        <ModalTop theme={theme}>
          <h2>{title}</h2>
          <p>{children}</p>
        </ModalTop>
        <ModalBottom theme={theme}>
          <button type="button" className="btn-cancel" onClick={handleCancel}>
            취소
          </button>
          <button type="button" className="btn-approve" onClick={handleOK}>
            확인
          </button>
        </ModalBottom>
      </ContContainer>
    </Container>
  )
}
```

handleOK 부분에는 확인을 눌렀을 경우 수행될 함수를 넣어주면 된다. 댓글 삭제의 경우에는 handleOK에 댓글인지 대댓글인지 판단하고, 해당 글을 삭제하는 함수를 넣어준다. handleCancel은 말그대로 취소를 클릭했을 경우의 동작할 함수를 넣어주면 된다.

<br>

```jsx
//Comment.tsx
      {isDelete && (
        <Modal
          title="댓글 삭제"
          handleOK={onClickYes}
          check={isDelete}
          handleCancel={onClickNo}
        >
          댓글을 정말로 삭제하시겠습니까?
        </Modal>
      )}
```

이제 Modal 컴포넌트를 사용해주면 된다.

<br>

## 문제 발견

### 댓글 작성

```jsx
//CommentFormContainer.tsx
  useEffect(() => {
    if (newComment.length === 0) {
      setCommentGroup(1);
    } else {
      const groupNum =
        newComment[newComment.length - 1][0].attributes.group + 1;
      setCommentGroup(groupNum);
    }
  }, [newComment]);
```

댓글을 작성할 때, group column이 1로 고정되는 버그를 찾아 해결했다. (commentGroup, setCommentGroup state를 생성)

<br>

### 여러가지 에러 처리

상세 페이지의 글이 시리즈가 없는경우 시리즈 박스 부분과 시리즈 캐러셀, ###와 같은 마크다운에서 사용하는 헤더가 없을 경우의 오른쪽 헤더 UI 등에 대한 에러처리를 추가했다.

![](/images/ff61c0a1-7e56-4e80-ae90-5aa88afb455b-image.png)

이제 시리즈가 없을 경우 시리즈 박스와 캐러셀이 없다. 해당 시리즈의 글 목록 부분을 보여줄 필요가 없기 때문이다. 그리고 마크다운에서 헤더가 없을 경우 오른쪽에 떠 다니던 목차 UI도 없어졌다.

<br>

### 개인 정보

```jsx
//CommentFormContainer.tsx
const { data: userData, error: UserError } = useData("userinfos");
```

userifos 라는 엔드포인트로 모든 유저의 정보를 가져오고 있다. 댓글을 작성한 사용자의 프로필 이미지와 닉네임을 출력하기 위해서 해당 데이터가 필요했다. 하지만 이렇게 가져오는 것보다 쿼리로 아예 댓글 남긴 사용자의 정보만 가져오는 것이 개인 정보 보호차원에서 좋을 것 같다.

<br>

```jsx
//CommentFormContainer.tsx
  const [user, setUser] = useState({
    id: 0,
    attributes: {
      userid: "",
      profileimage: "",
    },
  });

  const getUserData = async () => {
    const response = await axios({
      method: "get",
      url: `${API_ENDPOINT}/userinfos?populate=*&filters[id]=${comment.attributes.userid}`,
    });
    setUser(response.data.data[0]);
  };

  useEffect(() => {
    getUserData();
  }, []);
```

get 요청시 쿼리로 댓글 작성한 유저의 데이터를 받고, user라는 state에 저장한다. 이 데이터를 comment 컴포넌트에 넘겨주면 동작할 것이다.(이렇게 하면 직접 some 함수 돌려 전체 유저에서 댓글 작성한 유저를 찾을 필요가 없다.)

![](/images/317186cb-bd86-4d97-99ec-e1fef33564d3-image.png)

정상적으로 동작한다.

<br>

## 해결되지 않은 문제점

### 클릭 했을 경우 해당 헤더로 이동

```jsx
//RighterHeader.tsx
  const Scrollref = useRef<HTMLDivElement>(null);

  const onClickList = () => {
    Scrollref.current?.scrollIntoView({ behavior: "smooth" });
  };

//...

<List strNum={strNum} onClick={onClickList} ref={Scrollref}>
  {strReg}
</List>
```

ref를 선언하고, List에 ref로 주었다. 그리고 onClick시 이동하게 해놓았는데 생각해보니 이러면 그냥 밑으로 계속 내려갈 뿐이다. 오른쪽에 둥둥 떠다니는 UI에 ref를 주었기 때문이다. 이 값을 왼쪽에 빨간 박스로 감싸준 부분의 헤더들에 줘야할 것이다.

```jsx
marked(contents)
```

하지만 MDViewer 컴포넌트에서 marked를 사용하여 상세 페이지의 내용인 contents를 변환해주고 있다. 그래서 어떻게 해야할지 고민해봐야 할 것 같다. 이 문제가 해결되어야 스크롤시 현재 헤더만 오른쪽UI에서 글씨가 진해지는 기능도 구현할 수 있을 것이다.

어떻게 해결할지 생각하자..
