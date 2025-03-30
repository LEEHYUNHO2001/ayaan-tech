---
title: "Ant Design"
description: "중국에서 개발한 디자인 개발을 위한 프레임워크이다.완성도 높은 UI 프레임워크이다."
date: 2021-08-09T10:07:58.523Z
tags: ["CSS","React"]
---
> ## antd란??
(React 환경)

* 중국에서 개발한 디자인 개발을 위한 프레임워크이다.
* 완성도 높은 UI 프레임워크이다.
* Bootstrap는 12개의 요소로 구분되어 있지만, antd는 25개의 요소로 구분되어 있다.

> ## 설치

```
npm i antd @types/antd
npm i @ant-design/icons
```

> ## 사용법

공식 사이트 : https://ant.design/components/menu/
![](/images/239415da-acd1-4c35-9414-5cef64653f23-antd.jpg)1. 원하는 디자을 고른다.

![](/images/add8eae1-7cbb-46c5-b094-da33009c6d5e-a.jpg)2. <>버튼을 눌러 코드를 표시한다.

![](/images/09db58d2-d378-47b6-bbb9-20b402bd6c34-api.jpg)3.props들을 확인한다.
```jsx
import {Button, Card, Popover, Avatar, List, Comment} from 'antd';
<Card 
  cover={post.Images[0] && <PostImages images={post.Images} />}
  actions={[
    <RetweetOutlined key="retweet" />,
    liked 
    ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onToggleLike} />
    :<HeartOutlined key="heart" onClick={onToggleLike} />,
    <MessageOutlined key="comment" onClick={onToggleComment} />,
    <Popover key="more" content={(
        <Button.Group>
          {id && post.User.id === id ? (
            <>
              <Button>수정</Button>
              <Button type="danger">삭제</Button>
              </>
          ) : <Button>신고</Button>}
        </Button.Group>
      )}>
      <EllipsisOutlined />
    </Popover>,
  ]}
  >
  <Card.Meta avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
    title={post.User.nickname} description={post.content} />
  <Button></Button>
</Card>
```
4. 설계한다.
antd에서 만든 컴포넌트들을 태그로써 사용하기 때문에 공식문서를 봐야 알맞은 props설정들을 할 수 있다.