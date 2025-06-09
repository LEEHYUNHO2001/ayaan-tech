---
title: "SPACE_DEV_CLUB - 19"
description: "게시글 삭제(댓글과 대댓글 함께..), 목차 클릭시 이동 및 현재 스크롤 위치에 맞는 UI"
date: 2022-03-14T10:39:40.329Z
tags: ["React","next","typescript"]
---
## 게시글 삭제

![](/images/0c40553e-f747-4378-855b-9937b149b415-image.png)

자신이 작성한 게시글의 경우 삭제 버튼이 생성된다. 이제 게시글 삭제 기능을 구현하자.

```jsx
      {isDelete && (
        <Modal
          title="포스트 삭제"
          handleOK={onClickYes}
          check={isDelete}
          handleCancel={onClickNo}
        >
          정말로 삭제하시겠습니까?
        </Modal>
      )}
```

![](/images/da45ee8c-d076-490b-a0be-efbde5cd7949-image.png)

삭제 버튼을 눌렀을 경우 isDelete라는 state는 true가 된다. 그리고 Modal 컴포넌트가 나타난다. 삭제 또는 취소에 따라 수행할 함수들을 넘겨주며 사용할 수 있다. 취소를 누를경우에는 isDelete는 false가 되며 모달창은 사라지게 된다.

<br>

```jsx
  const Delete = async (id: number) => {
    await axios({
      method: "delete" as Method,
      url: `${API_ENDPOINT}/comments/${id}`,
    });
  };

  const onClickYes = async () => {
    const res = await axios({
      method: "get" as Method,
      url: `${API_ENDPOINT}/comments?populate=*&filters[posts][id]=${postid}`,
    });
    res.data.data.forEach((data: CommentData) => Delete(data.id));
    await axios({
      method: "delete" as Method,
      url: `${API_ENDPOINT}/posts/${postid}`,
    });
    router.push("/");
    document.body.style.overflow = "unset";
  };
```

삭제를 눌렀을 경우에 게시글이 삭제되야한다. 그리고 게시글에 달려있던 댓글과 대댓글도 모두 삭제되야한다. 쿼리문으로 현재 게시글의 댓글을 모두 찾은 후에 forEach문과 Delete 함수를 이용하여 댓글을 삭제해준다. 그리고 게시글도 삭제하고 홈으로 리다이렉트를 시켜주면 끝이다.

Strapi를 확인해본 결과 게시글과 게시글에 달려있던 댓글, 대댓글 모두 정상적으로 삭제가 되었다.

<br>

## 오른쪽 헤더(목차)

### 위치 이동

[SPACE_DEV_CLUB - 17](https://velog.io/@leehyunho2001/SPACEDEVCLUB-17#%ED%81%B4%EB%A6%AD-%ED%96%88%EC%9D%84-%EA%B2%BD%EC%9A%B0-%ED%95%B4%EB%8B%B9-%ED%97%A4%EB%8D%94%EB%A1%9C-%EC%9D%B4%EB%8F%99) 글에서 문제점이었던 오른쪽 헤더 부분을 보자. 

![](/images/7b3d478b-860e-4eb3-af27-201b61b05fcc-image.png)

Strapi에서는 `contents` 데이터로 위와 같이 들어가 있다. 뷰어에서는 `marked`를 사용하고 있는데, 이 `contents`를 넘겨주기만 하면 된다.

<br>


![](/images/eaac58cc-961e-459c-9e59-d585ad3c3954-image.png)

특정 갯수의 #으로 시작하는 헤더를 인식하여 뷰어로 보여주고 있다. 그리고 이 헤더를 추출하여 오른쪽 헤더에서 보여주고 있고, 클릭했을 경우 해당 위치로 이동한 뒤 현재 위치에서는 글씨가 진해져야한다.

`content` 데이터에 몽땅 들어가있다보니 오른쪽 헤더에서 `하하`를 선택했을 경우 어떻게 스크롤을 해당 부분으로 옮길 것인지 고민이 되었다.

![](/images/7473ed1b-5489-4e08-a3a7-351266b82a80-image.png)

브라우저에서 확인해 보니 `marked`가 #을 h태그로 바꿔준다.(매우 다행이다 ㅠㅠ)
그리고 자동적으로 id값이 부여된다. 여기서 주의해야할 점은 헤더로 사용하는 목적이 아닌 텍스트로서의 #은 id에서 제외된다. 그리고 띄어쓰기가 있는 경우에는 사이에 `-`을 넣어서 id값을 부여한다.

```jsx
//RightHeader.tsx
const strNum = str.match(/#*/)?.join("").length!;
const originHeader = str
.match(/[^#+][#]*/g)
?.join("")
.trim();
const headerId = originHeader
?.match(/[^#]/g)
?.join("")
  .replace(/\s/g, "-");

return (
  <a key={`Detail-List-${i}`} href={`#${headerId}`}>
    <List strNum={strNum}>{originHeader}</List>
  </a>
);
```

`originHeader`는 `아 무 말`, `히히`, `##하하` 와 같이 `contents` 에서 작성한 헤더들이다. 그리고 `headerId`는 h태그에 부여되는 id값이다. 즉, #이 제거되고 공백은 `-`로 대체된 값이다.

![](/images/e5e16914-5443-45d4-bf24-b15cb6289171-hkgk.gif)

이제 클릭하면 정상적으로 해당 위치로 스크롤이 이동한다.

```css
      scroll-behavior: smooth;
```

![](/images/5f70f03f-f228-4b9d-9fbf-189289b4249f-klkl.gif)

이제 전역 스타일에 smooth 속성을 부여하여 부드럽게 스크롤이 이동하도록 하자.

<br>

### 위치에 따른 스타일

사실 시간이 조금 걸린 부분이다. StackOverflow와 구글링의 힘을 빌렸다.

```jsx
  const [scrollY, setScrollY] = useState<number>(0);

  const listener = () => {
    setScrollY(window.pageYOffset);
  };

  useEffect(() => {
    window.addEventListener("scroll", listener);
    return () => {
      window.removeEventListener("scroll", listener);
    };
  });
```

현재 스크롤의 위치를 구하며, 스크롤할 때마다 `scrollY` 값을 변경해준다.

<br>

```jsx
        <article>
          {listData.map((str, i) => {
            const strNum = str.match(/#*/)?.join("").length!;
            const originHeader = str
              .match(/[^#+][#]*/g)
              ?.join("")
              .trim();
            const headerId = originHeader
              ?.match(/[^#]/g)
              ?.join("")
              .replace(/\s/g, "-");
            const target = document.getElementById(`${headerId}`);
            const targetTop = target?.getBoundingClientRect().top;
            const headerTop = window.pageYOffset + targetTop!;
            const isTrue = scrollY + 1 >= headerTop;

            return (
              <a key={`Detail-List-${i}`} href={`#${headerId}`}>
                <List strNum={strNum} theme={theme} a={a}>
                  {originHeader}
                </List>
              </a>
            );
          })}
        </article>
```

자동으로 부여되는 id값을 이용하여 해당 태그의 위치를 구한 후, 현재 스크롤값과 비교하며 boolean 값을 구한다.

<br>

```jsx
const List = styled.div<StrNumTheme>`
  font-size: 14px;
  margin-bottom: 5px;
  margin-left: ${({ strNum }) => strNum * 10}px;
  color: ${({ isTrue, theme }) => (isTrue ? theme.MAIN : theme.POINT_FONT)};
  font-weight: ${({ isTrue }) => (isTrue ? 700 : 400)};
  &:hover {
    color: ${({ theme }) => theme.BUTTON_SUB};
    font-weight: 700;
  }
`;
```

boolean값에 맞게 CSS를 스타일링 해주면 된다.

![](/images/44fdac13-5f09-4cac-9df1-6dd8c24e6a58-gsdg.gif)

위치에 맞게 오른쪽 헤더(목차) 부분이 글씨가 진해지는 것을 볼 수 있다.

> 개선할 점

현재 읽고있는 위치만 표시하기 위해서는 어떻게 해야할지 고민해봐야겠다.