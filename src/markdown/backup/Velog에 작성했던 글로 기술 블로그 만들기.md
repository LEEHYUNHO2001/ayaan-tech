---
title: "Velog에 작성했던 글로 기술 블로그 만들기"
description: "함수형 프로그래밍도 맛보기"
date: 2025-06-09T13:10:56.994Z
tags: ["JavaScript","React","next","typescript"]
---
# 서론

평소에 기술 블로그를 직접 만들어야겠다는 생각을 하고 있었다. 대단한 목표가 있었던 것은 아니고, **가끔 Velog 서버가 터질(?)때마다, 200개가 넘는 게시글들이 사라질까 두려웠기 때문**이다. 나는 처음 개발 공부를 시작했을 무렵부터 Velog에 글을 작성했다 보니, 지금 보면 다소 민망한 글들도 있다. 그럼에도 이 글들은 하나하나가 귀중한 시간을 들여 만들어낸 나의 스토리이다. 그래서 간단하게라도 기술 블로그를 만들기로 결정했다. 앞으로도 Velog를 사용하겠지만, 직접 만든 기술 블로그도 같이 운영할 예정이다.

![](/images/646a7dc5-cee9-458d-86ee-281c66f65318-image.png)

2년정도 전에도 기술 블로그를 만들기 위해 Gatsby기반 프로젝트를 셋팅했었다. 한창 Gatsby로 개인 블로그를 설계하는 것이 유행하던 시기였다. 그래서 나도 새로운 경험을 해볼겸 만들어보려 했던 것이다. 그렇게 블로그의 기능들을 하나하나 붙이다가, 문득 **나의 경험을 더 많은 사람들에게 노출시킬 수 있는 것은 Velog가 더 유리**할 것이라는 생각이 들었다. 이 이유로 기술 블로그 프로젝트는 중단하게 된다.

2년이 지난 지금은 **기록을 영원히 보관**하기 위해 프로젝트를 셋팅하고 있다. 목적이 명확한 만큼 MVP 기능 위주로 만들어, 빠르게 1차로 배포를 하기로 마음먹었다. 이번에는 `Next15`을 선택했는데, 프로젝트를 통해 이루고 싶은 목표가 있었기 때문이다. 그 중 하나는 **서버 컴포넌트의 장점을 체감해보고, 이점을 극대화**하는 것이다. 이미 이론으로는 알고 있지만, 역시 직접 체감해보는게 제일이라고 생각한다.

또 다른 목표는 **최근 흥미를 갖고 있는 함수형 프로그래밍(FP)**으로 설계하는 것이다. 책과 관련 기술 블로그를 조금 읽은게 전부이지만, 이제는 직접 사용해볼 시기라고 생각했다. 이번 글에서는 함수형 프로그래밍으로 기술 블로그를 만드는 것을 다룬다. 만약 함수형 프로그래밍에 대한 지식이 전무하다면, [함수형 프로그래밍, 입문이라도 해보자](https://velog.io/@leehyunho2001/%ED%95%A8%EC%88%98%ED%98%95-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%B0%8D-%EC%9E%85%EB%AC%B8%EC%9D%B4%EB%9D%BC%EB%8F%84-%ED%95%B4%EB%B3%B4%EC%9E%90) 를 보고 오면 더 이해하기 쉬울 것이다.

## 소중한 게시글 지키기

여러가지 프로젝트를 해보면서 느낀점이 있다. 바로 MVP 개발의 중요성이다. 처음부터 목표가 거대하거나, 구현하려는 기능들이 많아지는 순간 목표에 도달할 가능성이 낮아진다. **"함수형 프로그래밍으로 기술 블로그 만들기"**도 블로그에 필수적인 기능 및 페이지만 1차 범위로 포함시켰다.

> **MVP 기능**
1. 기존의 Velog에 게시한 글들을 마크다운 형식으로 백업
2. 백업된 구조 기반으로 게시글 목록 페이지 구성
3. 백업된 마크다운 파일 기반으로 게시글 상세 페이지 구성

MVP의 주된 목표는 백업된 구조로 목록 및 상세 페이지를 구성하는 것이다. 과거에 Velog를 통해 작성한 글들이 매우 많기 때문에, 앞으로 작성할 글과 과거에 작성한 글이 분리하고 싶었다. **관리 측면에서도 훨씬 수월**하기도 하고, 나의 블로그를 보는 이들에게도 블로그 이사 후 글과 Velog에서 작성했던 글들을 나누어서 보여주고 싶었다.

![](/images/716a29e7-6f7f-48e0-a07f-ec5b5a43e1c2-image.png)


솔직히 처음에는 막막했다. Velog에 작성했던 **210개의 글을 모두 수작업으로 백업하는 상상**을 해보니, '과연 이걸 할 수 있을까?'라는 생각이 들었다. 엄청난 노가다일 것이 분명했기 때문이다. 하지만 우리는 지성인 개발자가 아닌가! 나는 혹시나 하는 마음에 백업해주는 서비스를 구현해준 천재 개발자가 있는지부터 찾아보았다. 그 결과 **마크다운 형식으로 백업하는데 성공**했다. 이제 본격적으로 기술 블로그를 위한 기능들을 구현하면 된다.

---

### 글 목록 페이지

#### 파일 이름 추출하기

Velog와 같은 블로그 서비스는 게시글과 같은 데이터들을 DB에 저장한다. `ayaan`이라는 사람이 작성한 게시글의 목록을 보기 위해서 `/ayaan/post/list` 주소로 접근하면, API에서 받아온 데이터 기반으로 페이지를 출력할 것이다. 게시글 상세 페이지도 마찬가지다. `/ayaan/post/1` 페이지로 들어가면, DB에서 해당하는 게시글의 정보를 받아와 UI/UX를 제공하는 것이다.

![](/images/80161bd9-643d-4f12-838c-1cb5f0ed6e88-image.png)

이번에 만드는 기술 블로그는 성격이 다르다. 게시글이 DB에 저장된 것이 아니라, 실제로 특정 디렉터리 안에 마크다운 파일로 존재한다. 블로그 목록 페이지를 구현하기 위해서는 **백업된 파일들이 모여있는 디렉터리에서 모든 파일을 읽어야 한다.**

```jsx
// 백업 파일들이 보관된 디렉터리의 위치를 가리키기
export const getBlogBackupDirectory = (): string =>
  path.join(process.cwd(), "src", "markdown", "backup");
```

"백업된 파일들이 모여있는 디렉터리에서 모든 파일을 읽기"라는 한 문장의 요구사항처럼, 프로그래밍에서도 하나의 함수로 만들어도 된다. 하지만 이 경우에는 복잡성이 증가하고, 가독성과 유지보수성이 떨어지게 된다. 우리는 단일책임의 원칙을 지키며, **하나의 함수는 한 개의 역할**을 하도록 설계하자.

요구사항을 쪼개보면, 가장 먼저 해야하는 일은 **백업 파일들이 보관된 디렉터리 위치를 가리키는 것**이다. 지금은 백업 디렉터리 자체를 가리키는 함수를 만들었다. 동적으로 디렉터리 찾는 함수를 만들고 싶다면, 파라미터로 인자를 받으면 된다. 그리고 그 함수를 `getBlogBackupDirectory`에서 사용해주면 좋다.

```jsx
// 디렉터리에서 파일들의 이름 가져오기
export const getBlogPostFullNameList = (directory: string): string[] =>
  fs.readdirSync(directory);
```

이제 디렉터리 위치를 알게 되었다. 블로그 게시글 목록을 보여주기 위해서는 게시글의 제목들을 알아야한다. 즉, 디렉터리에서 마크다운 파일명들을 가져와야 한다. 파라미터로 받은 디렉터리 기반으로 **파일들의 풀네임을 가져오는** 함수를 만들었다. 지금은 백업된 디렉터리 기반으로 마크다운 파일들을 가져오겠지만, MVP 이후에는 또 다른 디렉터리에서 새로 작성된 글들의 목록들도 불러와야 할 수 있기 때문에, **확장성을 고려해서 설계**했다.

```jsx
// 확장자 제거
export const removeMarkdownExtension = (fileName: string): string =>
  fileName.replace(/\.md$/, "");

// 완전한 게시글들의 이름 가져오기
export const getBlogPostNameList = (): string[] => {
  const fileNameList = getBlogPostPullNameList();
  return fileNameList.map(removeMarkdownExtension);
};
```

`getBlogPostFullNameList` 함수를 통해 가져온 파일 이름에는 확장자도 포함되어 있다. `removeMarkdownExtension`는 `.md`를 제거하는 역할을 해준다. `getBlogPostNameList` 에서는 두 함수를 이용하여, 게시글 목록으로 출력할 `string[]`을 구하고 있다.

게시글 목록을 구하는 기능을 **순수 함수**들로 구성했다. 잘 짜여진 함수형 프로그래밍인 것 같지만, 아직 FP라고 부르기에는 애매한 부분이 있다. **함수 합성**이 빠져있기 때문이다.

```jsx
import { replace, map, pipe } from "ramda";

// 커링된 replace 함수
const removeMarkdownExtension = replace(/\.md$/, "");

// pipe를 통한 함수 함성
export const getBlogPostNameList = (): string[] =>
  pipe(getBlogPostPullNameList, map(removeMarkdownExtension))();
```

자바스크립트에 내장된 `replace`, `map` 등의 함수들은 `ramda.js`에서도 제공한다. 네이티브 함수와의 차이점은 **커리된(curried) 함수**라는 것이다. **`removeMarkdownExtension`를 단순화하고, `pipe`를 통해 함수 합성**을 해주었다. 이제 블로그의 게시글 목록 페이지를 구성하기 위한 최소한의 준비가 되었다.

> 커링은 다중 인자 함수를 단항 함수로 바꾸는 기법이다. 함수를 더 작은 단위로 나누어, 부분 적용이나 함수 합성을 할 수 있게 하는 것이다.

<br>

#### 모델 고도화

![](/images/49fbef1c-6fdf-4acb-94df-5873374a8270-image.png)

![](/images/a860eafd-88d6-475f-ac17-819d6f67f945-image.png)

게시글 목록 페이지에서 제목만 보여주기다 보니, UI가 단순하고 밋밋했다. Velog에서는 게시글을 출간할 때, `제목`, `설명`, `태그`, `이미지` 등을 첨부하여 유저에게 더 좋은 UI/UX를 제공하고 있다. 나는 왠지 백업된 마크다운 파일에 해당 정보들이 있을 것 같아 다시 확인해보았다. 다행이도 이미지를 제외한 `title`, `description`, `tagList`, `createdAt` 정보가 있었다.

블로그의 게시글 목록 리스트를 구하는 함수인 `getBlogPostNameList`의 리턴 모델은 `string[]` 이었다. 단순하게 마크다운 파일 이름만 정제하여 제목을 추출했기 때문이다. 이제 제목, 설명, 태그, 생성일을 함께 보여주어야 한다. 이전과 다른 점은 **마크다운 파일 하나 하나를 읽어서 데이터를 긁어와야 한다는 것**이다.

```tsx
// 최종 함수
export const getBlogBackupPostList = (): BlogPostMeta[] =>
  pipe(
    getBlogBackupDirectory,
    getBlogPostFullNameList,
    map(getBlogPostMetaData),
    sortPostsByDate
  )();
```

결론부터 말하자면, 글 목록 페이를 위한 최종 모델을 만드는 함수는 `getBlogBackupPostList`이다. 백업된 마크다운 파일이 있는 디렉터리를 가리키고, 디렉터리 안의 파일 이름들을 가져오며, 각 파일에 맞는 모델로 변환한 후, 최신순으로 정렬하고 있다. `pipe` 구조 덕분에 **"데이터가 어떻게 변형되고 있는지" 순차적으로 흐름을 쉽게 이해**할 수 있다.

```tsx
// 최종 모델 만드는 함수
const getBlogPostMetaData = (fileFullName: string): BlogPostMeta => {
  const filePath = path.join(getBlogBackupDirectory(), fileFullName);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const frontMatter = extractFrontMatter(fileContent);

  if (!frontMatter) {
    throw new Error("FrontMatter Not Found");
  }

  const frontMatterModel: MarkdownFrontMatterModel =
    getMarkdownFrontMatterModel(frontMatter);

  return {
    name: removeMarkdownExtension(fileFullName),
    ...frontMatterModel,
    dayjs: dayjs(frontMatterModel.date),
  };
};
```

`getBlogPostMetaData` 함수는 확장자까지 붙은 파일의 이름을 파라미터로 받는다. 이 값을 백업된 디렉터리의 위치 정보와 결합하여 `path`를 구하고, `fs.readFileSync`로 파일의 내용을 읽는다. `extractFrontMatter` 함수를 통해 `---`로 감싸진 부분을 찾으며, 그 안에서 필요한 부분을 추출하여 원하는 모델로 만들기 위해 `getMarkdownFrontMatterModel` 함수를 사용한다.


이렇게 더 알찬 UI를 보여주기 위한`BlogPostMeta` 모델을 만들었다. 마지막에 `sortPostsByDate` 함수로 글을 최신순으로 정렬하여, 블로그 이용자의 피로감을 덜어주고 있다.

---

### 테마 변환

![](/images/a2679e6c-ac7b-4db2-bee6-9ffe74a46bf2-image.png)


테마 변환을 고려하고 있다면, 처음부터 변환할 수 있는 체계를 만들어야 나중에 편하다. MVP에서는 어두운 계열의 테마부터 지원할 예정이어서, 이에 맞는 색상값과 테마 변환을 위한 준비만 해두었다. 그러다 문득 '스위치 UI와 밝은 색상의 색상값만 정의하면 테마 변환 기능을 제공할 수 있는데, 굳이 하지 않을 이유가 있을까?' 라는 생각이 들었다. 

개인적으로 **공수가 많이 들어가지 않는데, 유저에게는 확 체감이 되는 기능**은 왠만하면 하는게 옳은 것 같다는 생각을 한다. 당연한 말이지만, 공수는 많이 들어가는데, 유저가 기뻐할만한 기능도 아니고, 체감도 적다면 그냥 후순위로 미루는게 좋다. 어쨋든 테마 변환 기능도 MVP에 넣기로 결정했다. 

> 테일윈드에서는 테마 변환(다크모드) 기능을 쉽게 구현할 수 있도록, 설정 파일인 config에서 `darkMode: "class"`를 지원하고 있다.

```jsx
// use-theme
export function useTheme(): UseThemeModel {
  const [theme, setTheme] = useState<ThemeType>("light");

  const toggleTheme = (): void => {
    setTheme((prev: ThemeType) => {
      const newTheme: ThemeType = prev === "light" ? "dark" : "light";
      setLocalStorageTheme(newTheme);
      applyThemeClass(newTheme === "dark");
      return newTheme;
    });
  };

  useEffect(() => {
    const storedTheme: StoredThemeType = getLocalStorageTheme();
    const initialTheme: ThemeType = initializedTheme(storedTheme);
    setTheme(initialTheme);
    applyThemeClass(initialTheme === "dark");
  }, []);

  return { theme, toggleTheme };
}
```

테마 변환을 하기 위한 함수들은 `theme-helper`라는 헬퍼로 분리했다. 그리고 이 순수 함수들을 `use-theme`라는 커스텀 훅에서 사용한다. 나름 명확한 이 코드는 함수 합성을 통해 더 깔끔하게 만들 수 있다.

```jsx
// use-theme
export function useTheme(): UseThemeModel {
  const [theme, setTheme] = useState<ThemeType>("light");

  const toggleTheme = (): void => {
    setTheme((prev: ThemeType) => {
      return pipe(
        (): ThemeType => (prev === "light" ? "dark" : "light"),
        tap(setLocalStorageTheme),
        tap(applyThemeClass)
      )();
    });
  };

  useEffect(() => {
    pipe(
      getLocalStorageTheme,
      initializedTheme,
      tap(applyThemeClass),
      tap(setTheme)
    )();
  }, []);

  return { theme, toggleTheme };
}
```

위에서도 몇 번 등장했던 `pipe`가 다시 나왔다. 이번에 눈에 띄는 부분은 `pipe`와 `tap`의 조합이다. 함수형 프로그래밍에서는 모든 함수가 값을 반환해야한다. 그런데 `setLocalStorageTheme` 나 `applyThemeClass` 와 같은 함수는 딱 봐도 리턴 타입이 `void`인 `side effect`를 갖는 함수 이다. 이런 경우에는 어떻게 함수형 프로그래밍을 사용할까? 정답은 바로 `tap`에 있다. `tap`은 **"부수 효과만 실행하고 값은 그대로 넘기기"** 라는 중요한 임무를 수행한다.

`toggleTheme` 함수를 보자. 첫 번째 함수를 통해 얻은 `ThemeType`의 값을 `setLocalStorageTheme` 으로 넘긴다. 이 함수의 리턴 값은 `void`이지만 자신의 역할을 수행하고, 그 뒤의 함수인 `applyThemeClass`에도 첫 번째 함수의 리턴값을 넘기고 있다.

`toggleTheme`의 `applyThemeClass`나 `useEffect`의 `setTheme`처럼 마지막 함수도 리턴 타입이 `void`라면 `tap`을 사용하는게 좋다. 나중에 이 뒤에 어떤 함수가 들어와도 대응할 수 있어야 하기 때문이다.

```tsx
// theme-provider
export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const theme: UseThemeModel = useTheme();

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}
```

이제 테마 변환에 대한 UI가 모든 곳에 반영될 수 있는 방법을 생각하면 된다. 나는 `provider` 패턴을 사용하기로 결정했다. 테마 컨텍스트 생성, 테마 프로바이더, 현재 테마를 알 수 있는 커스텀 훅 등을 만들었다.

```tsx
// layout
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`container relative bg-background pt-[72px] text-foreground ${notoSans.variable}`}
      >
        <ThemeProvider>
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

마지막으로 최상위 레이아웃에 프로바이더를 사용하는 것으로 테마 변환 기능은 마무리 된다.

---

### 상세 페이지

```tsx
// 마크다운 파일을 읽어서 HTML로 변환
export const getBackupMarkdownContentWithoutMatter = async (
  fileName: string
): Promise<MarkdownContentModel> => {
  const filePath = path.join(getBlogBackupDirectory(), `${fileName}.md`);

  if (!fs.existsSync(filePath)) {
    throw new Error("FilePath Not Found");
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const frontMatter = extractFrontMatter(fileContent);

  if (!frontMatter) {
    throw new Error("FrontMatter Not Found");
  }

  const frontMatterModel = getMarkdownFrontMatterModel(frontMatter);

  const markdownBody = pipe(removeMatter, trim)(fileContent);
  const processedContent = await remark()
    .use(remarkGfm) // GitHub Flavored Markdown 지원
    .use(remarkRehype) // 마크다운을 rehype로 변환
    .use(rehypeHighlight) // 코드 하이라이팅
    .use(rehypeStringify) // HTML로 변환
    .process(markdownBody);

  return {
    ...frontMatterModel,
    content: processedContent.toString(),
  };
};
```

상세 페이지는 마크다운 파일을 렌더링하면 된다. 한 가지 주의할 점은 `---`로 감싸진 부분이다. 목록 페이지에서 리스트를 가져올 때, 마크다운 파일의 `---` 부분을 통해 날짜, 태그, 제목, 설명 등의 추가 정보를 얻었었다. 상세 페이지에서는 이 정보들을 없애거나, 커스텀한 UI/UX로 보여주려고 한다. 지금은 단순하게 마크다운에서 `---`로 감싸진 부분을 제거하고 렌더링 시키기 위해 `getBackupMarkdownContentWithoutMatter` 함수를 사용하고 있다. 추후에는 제거된 부분을 친숙한 UI/UX로 제공할 예정이다.

```tsx
  useEffect(() => {
    const style = document.createElement("link");
    style.rel = "stylesheet";
    style.href = isDark
      ? "https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/night-owl.min.css"
      : "https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/github.min.css";

    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [isDark]);
```

사실 상세 페이지는 스타일적인 요소가 더 많았다. 예를 들어 마크다운에서는 제목을 의미하는 `#`, 인용을 의마하는 `>`, 강조를 의미하는 `**` 등을 사용할 수 있다. 현재 사용중인 라이브러리를 통해 렌더링 시켰을 경우, 상황에 맞게 마크업을 구성하며 자동으로 특정 클래스를 붙여주고 있다. 대부분의 작업은 이 클래스에 원하는 스타일을 커스텀하게 넣어준 것이었다. 심지어 코드를 보여주는 UI는 테마에 맞게 색상을 가져오기도 한다.

---

## 마무리

![](/images/71d9117d-b0a5-46d5-91f6-1bbf7f435651-image.jpg)


내가 작성했던 블로그 글도 지키고, 함수형 프로그래밍도 사용해볼겸 나만의 블로그를 만들었다. 사실 코드보다는 블로그의 UI 컨셉이나 소개글 같은 부분에서 시간을 더 잡아먹었던 것 같다. 원래 넉넉하게 잡아서 5월 안에 마무리하려고 했지만, 최근에 새로운 업무를 담당하게 되어 바쁘기도 했고, 스트레스를 해소하기 위해 여기저기 놀러다니다보니 늦어졌다. 앞으로도 내가 원하는 기능을 마음대로 추가도 하고, 기존에 작성했던 코드들도 리팩터링 하면서 함수형 프로그래밍과 Next의 서버 컴포넌트의 장점과 단점들을 몸소 체감해볼 예정이다. 그래도 만들어 놓으니 마음이 편하다.