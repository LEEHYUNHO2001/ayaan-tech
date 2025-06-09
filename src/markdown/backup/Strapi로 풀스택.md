---
title: "Strapi로 풀스택"
description: "백엔드는 strapi를 사용하고 프론트엔드는 React를 사용해보자. (프로젝트 시작 전 연습)"
date: 2021-12-28T09:50:39.245Z
tags: ["Backend","React","next","typescript"]
---
## Strapi

풀 스택 프로젝트에서 백 엔드 부분을 간단하게 구현하기 위해 strapi를 사용해보자. [가이드](https://docs.strapi.io/developer-docs/latest/getting-started/quick-start.html#_1-install-strapi-and-create-a-new-project)도 잘 나와있으니 쉽게 사용할 수 있다.


```bash
yarn create strapi-app backend --quickstart
```

코드 수정할 일이 없어서 타입스크립트를 추가하지 않아도 될 것 같다.
위의 명령어로 strapi 설치를 마쳤다. strapi를 설치하며 사실 PostgreSQL도 설치 된 것이다.

![](/images/51308b97-f13a-4151-ab09-1b2a3cfb813d-image.png)

설치가 완료되고 위의 창이 나타나면 성공이다. 정보를 입력하고 시작하자.

<br>

![](/images/b874ec71-f3ea-4935-adcb-261568e19082-image.png)

Post DB 테이블을 생성해보자.

<br>

![](/images/2fd49712-edc1-4428-b5bf-c86ba59cc902-image.png)


![](/images/2ad39e85-a2bf-43d3-a19a-468b1981964a-image.png)

이름과 타입을 설정해주었다. Author은 short, Contents는 long, Profile은 single media로 생성했다.

<br>

![](/images/a4a37596-03fb-41a8-bc29-404bd163d11a-image.png)

Create를 눌러 값을 넣어보자.

<br>

![](/images/35534ba0-5cb6-4c7b-a96f-4645ca516e71-image.png)

값을 넣어주고 저장 및 publish 하면 된다.

<br>

![](/images/f8f0feff-6ab7-4314-9a30-6d6fa0ee03ae-image.png)

![](/images/9b14b62e-98b9-4fc0-be87-f32b29187d92-image.png)

그리고 설정에서 find와 findOne 권한을 부여하자.

<br>

![](/images/a24bc0e8-e644-4e07-b0e1-7b26932bda8b-image.png)

http://localhost:1337/api/posts 로 가보면 위에서 넣어준 데이터가 잘 들어간 것을 볼 수 있다.

<br>

![](/images/42f7babb-1a24-4358-ae7f-7a5ec64b80ac-image.png)

![](/images/3be86346-0b4e-43a5-a870-2ae0b040566f-image.png)

이제 Postman에서 http://localhost:1337/api/posts 으로 리퀘스트를 보내보자. 데이터가 잘 받아와 진다.

<br>

> Front-End와 연동해보자

## Front-End

### API 연동


```bash
yarn create next-app frontend --typescript
yarn add swr axios
```

Front-End 프로젝트를 생성했다. src 디렉터리를 하나 생성하여 안에 pages를 넣고 작업을 시작하자.

현재 Back-End 포트는 1337, Front-End는 3000이다.

<br>

* **에디터**

```jsx
//pages/write/index.tsx
const WritePage: NextPage = () => {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPost(e.target.value);
  };

  return (
    <div>
      <h1>글 작성</h1>
      <form>
        <input type="text" onChange={handleTitleChange} value={title} />
        <textarea onChange={handleTextAreaChange} value={post}></textarea>
        <button type="submit">제출</button>
      </form>
    </div>
  );
};
```

![](/images/167034c6-be22-4774-adbd-29d98a1f16c0-ed.gif)

간단한 에디터를 구현했다. 뷰어도 구현해보자.

<br>

* **뷰어**

```bash
yarn add marked
yarn add @types/marked
```

마크다운을 받아와 처리해주기 위한 패키지를 설치했다.


```jsx
//components/MDViewer.tsx
export const MDViewer = ({ title, contents }: MDViewerProps) => {
  return (
    <article>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: marked(contents) }} />
    </article>
  );
};

//pages/posts/index.tsx
const PostPage: NextPage = () => {
  return (
    <div>
      <MDViewer title="하이" contents="<h1>나는 이현호</h1>" />
    </div>
  );
};
```

![](/images/213f58a2-4cab-4f18-92c6-5424a62b9b3d-image.png)

그 후에 MDViewer 를 컴포넌트로 만들어 주었고, 호출해본 결과 정삭적으로 동작하는 것을 볼 수 있었다.

<br>

```bash
npm run develop
```

이제 strapi를 실행해서 DB에 title를 추가해주자.~~develop로 실행안하고 수정하려해서 고생좀 했다.~~

![](/images/addec3e3-f712-4695-b2eb-d8fa649e4cde-image.png)

![](/images/a41caabd-7841-4c06-9ad9-e0701f73aa4b-image.png)

title에 `하이`라고 값도 넣었다.

<br>

```jsx
//utils/fetcher.ts
import axios from "axios";

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);
```
useSWR을 이용해 데이터를 받아올 것이므로 fetcher부분을 설계해 주었다. 반복되는 친구이니 utils 디렉터리에 넣도록 하자.

```jsx
//pages/posts/index.tsx
const PostPage: NextPage = () => {
  const { data, error } = useSWR("http://localhost:1337/api/posts/", fetcher);
  if (error) return <div>Error</div>;
  if (!data) return <div>Loading...</div>;
  return (
    <div>
      {data.data.map((postdata: PostData) => {
        const { id, attributes } = postdata;
        return (
          <MDViewer
            key={`posts-${id}`}
            author={attributes.Author}
            title={attributes.title}
            contents={attributes.Contents}
          />
        );
      })}
    </div>
  );
};
```

```jsx
//types/Post.ts
export interface PostData {
  id: number;
  attributes: {
    Author: string;
    Contents: string;
    createdAt: string;
    publishedAt: string;
    title: string;
    updatedAt: string;
  };
}
```

![](/images/029ae9f7-a07f-46bf-97a3-f1746fa71fd1-image.png)

strapi로 설계해준 백엔드에서 데이터를 받아올 수 있도록 설계해주었다. 바로 console을 찍어보자. (data아래에 data라는 이름으로 데이터가 존재하고 있다.)
types 디렉터리에 Post.ts를 하나 생성해주어 타입 선언을 했다.
그 후에 map으로 데이터를 모두 뽑아내면 된다. (데이터 하나밖에 안만들었지만..)

![](/images/44b7c41c-d75e-4c32-bfc6-4c59223ec417-image.png)

드디어 데이터 베이스에 저장되어있던것을 받아와 화면에 출력했다. API 연동이 된 것이다.

<br>

### 글쓰기

![](/images/a8ca9b7f-98bd-4a85-9827-47e0aabbd1a8-image.png)

글쓰기를 구현하기위해 Post에서 create도 권한을 부여했다.

![](/images/3f175816-2b1d-4095-82af-783a0dae7e23-image.png)

그리고 Postman으로 데이터를 보내보자. 정상적으로 데이터가 생성되었다. 

![](/images/27e675be-b7b5-4f0c-899d-84a9954159a6-image.png)

방금 Postman으로 생성한 데이터도 이제 화면에 출력된다. 이제 이런 작업을 구현하는 것이다.

<br>

```jsx
//pages/write/index.tsx
const write = (author: string, title: string, post: string) => {
  axios
    .post("http://localhost:1337/api/posts/", {
      data: {
        author: author,
        title: title,
        contents: post,
      },
    })
    .then((res) => {
      console.log(res);
    });
};

const WritePage: NextPage = () => {
  const [title, setTitle] = useState("");
  const [post, setPost] = useState("");
  const [author, setAuthor] = useState("");

  const handleAuthorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthor(e.target.value);
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };
  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPost(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    write(author, title, post);
  };

  return (
    <div>
      <h1>글 작성</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleAuthorChange} value={author} />
        <input type="text" onChange={handleTitleChange} value={title} />
        <textarea onChange={handleTextAreaChange} value={post}></textarea>
        <button type="submit">제출</button>
      </form>
    </div>
  );
};
```

![](/images/a9509f88-1a79-4bcd-be4f-1b95e9050fd3-image.png)

폼을 작성하고 submit 버튼을 누르면 데이터가 생성되도록 설계했다. 콘솔을 확인해보면 데이터가 잘 들어간것을 볼 수 있다. 

![](/images/0fe2b461-60eb-4db0-b0d7-78ea62c7a5e9-image.png)

/posts 로 가면 방금 생성한 데이터도 화면에 출력되고 있다.

![](/images/21e5a328-e35c-4ed6-af03-908ec1641b7c-image.png)

DB에도 잘 저장되고 있다.



