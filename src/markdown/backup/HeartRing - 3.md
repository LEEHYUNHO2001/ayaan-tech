---
title: "HeartRing - 3"
description: "유지 보수를 고려한 헤더 설계 (feat. 캐러샐)"
date: 2022-02-02T08:15:49.711Z
tags: ["React","typescript"]
---
### Home 헤더

![](/images/4bfae208-563d-4efb-9e06-af491405a1d8-image.png)

이제 헤더(네비게이션)를 구현해보자.

Heart Ring 로고를 클릭하면 Home으로 이동하도록 사용자 편의를 고려했다.

<br>

```jsx
export const CategoryData = [
  {
    name: '세트상품',
    path: '#',
    submenu: [],
  },
  
  // ... 생략
  
  {
    name: '더보기',
    path: '#',
    submenu: [
      {
        name: '공지사항',
        path: '#',
      },
      {
        name: 'Q & A',
        path: '#',
      },
    ],
  },
];

```

카테고리는 데이터로 구성하고, 사용하는 곳에서는 map을 돌려 구현했다. 가독성이 증가했고 유지보수성도 좋아졌다.

<br>

![](/images/ab277d98-2c8a-416d-b698-1c8c44bb17b0-image.png)

submenu는 데이터가 있다면 서브 메뉴를 보여주기 위한 것이다.

<br>

```jsx
    <CategoryContainer>
      <CategoryList>
        {CategoryData.map((data) => {
          const { name, path, submenu } = data;
          return (
            <CategoryItem key={`Category-${name}`}>
              <Link href={path}>{name}</Link>
              {submenu && (
                <SubMenuList className={`subMenu-${name}`}>
                  {submenu.map((submenuData) => {
                    return (
                      <SubMenuItem>
                        <Link href={submenuData.path}>{submenuData.name}</Link>
                      </SubMenuItem>
                    );
                  })}
                </SubMenuList>
              )}
            </CategoryItem>
          );
        })}
      </CategoryList>
    </CategoryContainer>
```

CategoryData를 가져와 map을 돌리고있다. 링크의 href는 CategoryData의 path를 가져오고있고, name으로 목록의 이름을 보여준다. 

submenu가 있다면, submenu도 map 돌려준다. 

<br>

```css
    .subMenu-더보기 {
      display: block;
      font-weight: 400;
      color: #000;
    }
```

class값으로 SubMenuList 에 `subMenu-${name}` 을 넣어준 이유는 hover 했을 경우 그 아이템에 해당하는 서브 메뉴를 보여주기 위함이다. 현재 "더보기"에만 서브 메뉴가 있지만 추후에 다른 목록에도 서브 메뉴가 생길 수 있어 이와 같이 구현했다.

<br>


![](/images/4f3c47eb-c229-4ed1-b7c2-110753b25698-image.png)

```jsx
Logined.map((data) => {
              const { name, path } = data;
              return (
                <AppHeaderMenuList key={`AppHeaderMenuList-${name}`}>
                  <Link href={path}>{name}</Link>
                </AppHeaderMenuList>
              );
            })
```

로그인 정보를 불러오는 fixed된 헤더도 map으로 돌려주고 있다. (위와 비슷한 방법이므로 데이터 부분 설명은 생략)

### 캐러샐

![](/images/3179fef0-057d-4bd7-ae38-e1028152e4b0-gdfg.gif)

Home에 캐러샐을 넣었다. [캐러샐 심화](https://velog.io/@leehyunho2001/Carousel-%EC%8B%AC%ED%99%94) 에서 잘 설명되어 있다. (무한 캐러샐, 자동 넘기기, 드래그 넘기기)

디자인 부분은 조금 더 고민해봐야겠다.
