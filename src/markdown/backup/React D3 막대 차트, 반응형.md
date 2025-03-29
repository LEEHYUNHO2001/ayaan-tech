---
title: "React D3 막대 차트, 반응형"
description: "React 환경에서 D3를 사용해보고, 반응형으로 차트의 크기를 설정해보자."
date: 2022-05-05T12:29:56.225Z
tags: ["CSS","React","next","typescript"]
---
# D3 (Data Driven Documents)

데이터 시각화에서 D3는 항상 언급된다. 하지만 나는 사용해본 적은 없었다. 그리고 잘 다루게 될 때까지의 시간이 꽤 걸린다고 알고있다. 그렇다면 D3란 무엇일까?

D3란, JavaScript 기반의 라이브러리로 데이터를 이용해서 시각화 규칙을 바탕으로 결과물을 생성한다. SVG를 이용하여 벡터값을 사용하기 때문에 다양한 해상도에서도 깨짐이 없다.

간단한 차트를 위해서는 chart.js를 많이 사용한다. 그렇다면 굳이 더 복잡한 D3는 왜 사용할까? 당연하게 더 세세한 작업이 가능하고, 다양한 기능을 추가할 수 있기 때문이다.

<br>

## JS와 React에서의 D3

사실 바닐라 자바스크립트에서의 D3 사용법과 React에서의 D3사용법에는 차이가 있다. React에서 사용할 경우 훅스와 같이 사용하고, 바닐라의 D3에서 사용하는 enter/update/exit 패턴을 몰라도 된다. 잘 활용하면 매우 긍정적인 효과를 볼 수 있다고 한다.

처음 D3공부를 React 기반으로 하게 되어서 비교적으로 레퍼런스가 적었지만 알게 된 사실들을 정리해보겠다.

<br>

## 설치

```bash
 yarn add d3 @types/d3
```

TypeScript를 사용하지 않는다면 d3만 설치해주자.

<br>


### 막대 차트 그려보기

```jsx
import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';

import { axisBottom, axisRight, scaleBand, scaleLinear, select } from 'd3';

interface Props {
  campaign: {
    date: string;
    people: number;
  }[];
}

export const CampaignChart = ({ campaign }: Props) => {
//...
}
```

먼저 d3에서 사용할 메서드들과 해당 컴포넌트에 Props로 들어오는 campaign의 타입을 정의했다.

차트에는 일반적으로 x축과 y축이 있을 것이다. `axisBottom`은 xAxis를 밑에두려고 사용하고, `axisRight`는 yAxis를 오른쪽에 두려고 불러왔다.

<br>

```jsx
  const svgRef = useRef(null);
```

JavaScript의 경우 특정 DOM을 선택할 경우 querySelector 와 같은 Selector 함수를 사용한다. React 환경에서는 d3와 같은 그래프 라이브러리를 사용하면 특정 DOM에 적용한다. 이 경우에 useRef를 사용한다. useRef로 svg 요소를 넣을 DOM을 생성하자.

<br>

```jsx
  useEffect(() => {
    const svg: any = select(svgRef.current);

    // scale
    const xScale = scaleBand().domain(dayRatesIndex as Iterable<string>).range([0, 280]).padding(0.2);
    const yScale = scaleLinear().domain([0, 50]).range([170, 10]);

    // axis
    const xAxis = axisBottom(xScale)
      .ticks(campaign.length)
      .tickFormat((_, i) => dates[i]);
    svg.select('.x-axis').style('transform', 'translateY(170px)').call(xAxis);

    const yAxis = axisRight(yScale).ticks(7);
    svg.select('.y-axis').style('transform', 'translateX(280px)').call(yAxis);

    svg
      .selectAll('.bar')
      .data(peopleArr)
      .join('rect')
      .attr('class', 'bar')
      .attr('x', (_: number, i: string) => xScale(i))
      .attr('y', yScale)
      .attr('width', xScale.bandwidth())
      .attr('height', (value: number) => 170 - yScale(value));
  }, [campaign]);
```

useEffect를 사용하여 그려주게 된다. 먼저 d3에서 제공하는 select 함수로 방금 생성해준 ref 를 넣어준다.

scale은 수치형 값을 다른 범위의 수치형 값으로 만드는것이다. 무슨 말인지 잘 이해는 되지 않지만, 하나의 예로 느낌은 알 수 있다. 만약 0~100이라는 범위가 있다면 67 이라는 숫자가 여기서 어디에 위치하는지 백분율을 통해 알아내는 작업이다. 우리는 domain, range와 같은 값만 설정해주면 된다.

axis는 x축, y축을 그리기 위한 작업들이 들어가있다.

> scale과 axis는 참고하기 좋은 [d3 축그리기](https://www.bsidesoft.com/2382)글이 있어 가져왔다.

axis로 축을 정의하면 svg에 그려주고, 이것 저것 설정을 해주면서 차트를 그리면 된다.

<br>

```jsx
  return (
    <Container>
      <SVG ref={svgRef}>
        <G className="x-axis" />
        <G className="y-axis" />
      </SVG>
    </Container>
  );
```

마지막으로 svg, g 를 이용하여 차트를 그리면 되는데, 나는 Emotion으로 CSS작업을 해주었다.

![](/images/497df66c-b736-431a-9df7-58bb6256d622-image.png)

확인해보면 그래프가 정상적으로 그려진것을 볼 수 있다.

<br>

### 반응형으로 Width가 커지는 차트

D3를 처음 사용해보면서 차트를 그려보았는데, 크기가 고정값이라는 부분이 마음에 들지 않았다. 그래서 첫번재로 시도했던 것은 window객체에서 화면의 크기를 가져와 이 값을 차트의 width값으로 설정했다. 하지만 새로고침을 해서 다시 랜더시켜야한 적용이 되었다.

그래서 다른 방법을 사용했는데, ref값과 커스텀 훅을 생성했다.

<br>

```bash
yarn add lodash @types/lodash
```

먼저 커스텀 훅에서 사용할 로데쉬부터 설치하자.

<br>

```jsx
//hooks/useResize
import debounce from 'lodash/debounce';
import { RefObject, useEffect, useState } from 'react';

export const useResize = (ref: RefObject<HTMLDivElement>) => {
  const [state, setState] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const getSize = debounce(() => {
      if (!ref || !ref.current) {
        return;
      }
      const width = ref.current.offsetWidth;
      const height = ref.current.offsetHeight;
      setState({
        width,
        height,
      });
    }, 300);

    window.addEventListener('resize', getSize);
    getSize();
    return () => window.removeEventListener('resize', getSize);
  }, [ref]);
  return state;
};
```

ref값을 파라미터로 받아오는 것으로 시작한다. 그 후 화면에 변화가 있으면 ref에 새로운 width와 height값을 넣어준다. (지금 width만 사용하고 있지만, 추후에 height값도 반응형을 고려할 수 있어 이 부분도 넣어줬다.)

debounce에서 2번째 인자에 1000 을 넣어주면 1초인데, 현재 나는 300을 넣었다. 숫자가 낮을수록 차트가 부드럽게 반응형이 되지만 그만큼 무리가 갈 수 있다는 점을 명심하자.

<br>

```jsx
export const CampaignChart = ({ campaign }: Props) => {
  const svgRef = useRef(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const size = useResize(rootRef);
  const PADDING = 30;

  useEffect(() => {
    if (!size || !campaign) {
      return;
    }
    const { width } = size;

    const svg: any = select(svgRef.current);
    const dayRatesIndex = campaign.map((_: object, index: number) => index);
    const dates = campaign.map(v => v.date.substring(5).split('-').join('/'));
    const conversionRates = campaign.map(v => v.conversionRate);

    // scale
    const xScale = scaleBand()
      .domain(dayRatesIndex as Iterable<string>)
      .range([0, width - PADDING])
      .padding(0.2);
    const yScale = scaleLinear().domain([0, 50]).range([170, 10]);

    // axis
    const xAxis = axisBottom(xScale)
      .ticks(campaign.length)
      .tickFormat((_, i) => dates[i]);
    svg.select('.x-axis').style('transform', 'translateY(170px)').call(xAxis);

    const yAxis = axisRight(yScale).ticks(7);
    svg
      .select('.y-axis')
      .style('transform', `translateX(${width - PADDING}px)`)
      .call(yAxis);

    svg
      .selectAll('.bar')
      .data(conversionRates)
      .join('rect')
      .attr('class', 'bar')
      .attr('x', (_: number, i: string) => xScale(i))
      .attr('y', yScale)
      .attr('width', xScale.bandwidth())
      .attr('height', (value: number) => 170 - yScale(value));
  }, [campaign, size]);

  return (
    <div ref={rootRef}>
      {size && (
        <SVG ref={svgRef} width={size.width} height={size.height}>
          <G className="x-axis" />
          <G className="y-axis" />
        </SVG>
      )}
    </div>
  );
};
```

rootRef라는 useRef가 하나 추가된 것을 볼 수 있다. 크기를 감지해서 차트를 다시 그리기 위한 것이다. 차트를 다시 그리는 행위는 size나 데이터인 campaign이 변할때만 가능하도록 useEffect를 사용하고 있다.

이제 프로젝트를 확인해보면 차트가 width가 줄어들고 커짐에 따라 크기가 변동되는 것을 볼 수 있다.

[반응형 그래프 참고 - 곡선 그래프](https://www.rajeeshcv.com/2020/04/04/react-d3-responsive-chart/)
