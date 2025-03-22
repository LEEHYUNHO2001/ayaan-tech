---
title: "카테고리별로 복수 선택이 불가능한 React CheckBox"
description: "카테고리마다 체크박스가 2개씩 있다고 가정하자. 복수 선택이 불가능하도록 설계하고, 체크한 아이템들을 마지막에 form onSubmit 할 때 넘겨주도록 구현하자."
date: 2022-05-11T05:54:28.063Z
tags: ["JavaScript","React","next","typescript"]
---
# CheckBox

카테고리와 해당 카테고리에 대한 아이템들이 있는 데이터를 받아 체크박스를 동적으로 생성했다. 이 상황에서 어떻게 이벤트를 추가하고 체크박스를 설계해야 카테고리별로 복수 선택이 불가능한 체크박스를 만들고, 마지막에 form태그에서 onSubmit할 경우 여태 선택했던 아이템들을 Back단에 넘겨줄 수 있을지에 대해 설명하겠다.

<br>

## 카테고리 별로 하나만 선택 가능한 체크박스

![](/images/de0d853c-7efd-4131-9125-48a44c2ebf6f-image.png)

타코를 주문할 때, 추가 사항을 선택하는 부분을 설계하면서 체크박스를 사용했었다. 여기에서는 카테고리별로 체크박스들이 있고, 해당 카테고리에서 1개만 선택 가능하며 데이터를 제출할 form에서는 여태 선택했던 것들을 제출해주어야 한다.

<br>

![](/images/6fc30679-669c-44ef-a76c-b1685c6cc367-image.png)

데이터가 이렇게 들어온다고 가정하자. 혹시 데이터가 이렇게 들어오지 않더라도 입맛에 맞게 필터링 해서 직접 생성해줘도 좋은 것 같다.

<br>

```jsx
const [checkedItems, setCheckedItems] = useState<DesignProps[]>([]);
//...
      <form onSubmit={onSubmitTaco}>
        {design.map(data => (
          <div key={`design-${data.id}`}>
            <DesignCategory>{data.id}</DesignCategory>
            <ul>
              <Checkbox
                select={data.select}
                checkedItems={checkedItems}
                setCheckedItems={setCheckedItems}
              />
            </ul>
          </div>
        ))}
        <button type="submit">선택 완료</button>
      </form>
```

어쨋든 이 데이터가 design이라는 변수에 담겨있다고 하면 map을 돌리면서 카테고리 이름을 출력하고, 한번 더 map을 돌려 체크박스를 생성할 것이다. Checkbox라는 컴포넌트를 하나 생성해서 여기서 한번 더 map을 돌리는 작업을 수행하게 된다.

checkedItems은 카테고리에서 선택한 데이터들을 저장할 state이고, form 태그에서 onSubmit에 사용하게 되므로 부모 컴포넌트에서 선언해주자.

<br>

```jsx
export interface DesignProps {
  id: string;
  name: string;
  type: string;
}
```

DesignProps는 types 디렉터리에 design.ts 라는 파일을 하나 생성하여 관리해주고 있다.

<br>

```jsx
  return (
    <>
      {select.map(data => (
        <li key={`design-select-${data.id}`}>
          <input
            type="checkbox"
            id={data.name}
            name="subscribe"
            checked={isChecked.includes(data.name) || false}
            onChange={e => onChangeCheck(e, data.id, data.name, data.type)}
          />
          <Label htmlFor={data.name}>{data.name}</Label>
        </li>
      ))}
    </>
  );
```

이제 Checkbox 컴포넌트를 살펴보자. 먼저 return 부분이다. props로 받아온 select에는 체크박스에 추가할 데이터들이 [{}, {}, {}] 형태로 저장되어 있다. map을 사용하여 하나 하나의 객체에 접근하게 되는데, 이것을 이용하여 체크박스를 생성하고, input의 id와 label의 htmlFor을 연결하여 카테고리에서 하나의 박스만 체크될 수 있도록 관리한다.

그리고 UI에 체크된 상태도 보여야 하기 때문에 checked에는 isChecked라는 배열에서 현재 데이터의 이름이 있다면 체크된 것으로 간주한다.

<br>

```jsx
  const [isChecked, setIsChecked] = useState<string[]>([]);

  const onChangeCheck = (
    e: ChangeEvent<HTMLInputElement>,
    id: string,
    name: string,
    type: string
  ) => {
    if (e.currentTarget.checked) {
      setIsChecked([name]);
      const filterdItems = checkedItems.filter(el => el.type !== type);
      setCheckedItems([...filterdItems, { id, name, type }]);
    } else {
      const filterdItem = isChecked.filter(el => el !== name);
      const filterdItems = checkedItems.filter(el => el.type !== type);
      setIsChecked(filterdItem);
      setCheckedItems(filterdItems);
    }
  };
```

이제 isChecked 배열을 어떻게 관리할지 보자. 우리는 map을 두번 돌려서 UI를 출력하고 있다. 첫 map 돌리는 부분의 안에서 Checkbox라는 컴포넌트를 생성하고 있고, 현재 이 컴포넌트를 우리는 구현하고 있다. 여기에서 state를 생성했기 때문에 이 state는 카테고리 별로 생성된다. 즉, 체다와 살라를 선택했을 경우 ["체다", "살라"] 가 아닌 ["체다"] ["살라"] 가 각각 존재한다는 의미이다.

onChange 이벤트에서 배열에 어떤것을 넣어줄지에 대한 로직만 짜면 끝난다. 먼저 체크되면 isChecked에는 해당 데이터만 넣으면 된다. 만약 복수 선택이 가능했다면 `setIsChecked([name]);` 부분이 달라졌을 것이다. 체크된 박스를 다시한번 클릭하게 되면 else로 넘어가게 되는데 이때는 isChecked 배열에서 현재 클릭한 것 뺀 것들을 filter 함수로 구하고, 넣어주면 끝이다.

이제 많은 고민이 필요했던 checkedItems 이다. 먼저 체크되었을 경우  checkedItems에서 현재 카테고리가 다른 데이터들만 뽑아내는 `filterdItems` 를 생성한다. 그리고 checkedItems에 filterdItems를 넣고, 새로 체크된 데이터 객체도 넣어주면 된다. 체크 해제할 때는 앞서 설명한 바와 비슷하다.
