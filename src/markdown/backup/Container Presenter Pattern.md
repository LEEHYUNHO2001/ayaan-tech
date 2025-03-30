---
title: "Container Presenter Pattern"
description: "React의 디자인 패턴 중 하나"
date: 2021-10-30T13:05:11.935Z
tags: ["React"]
---
React에서 컴포넌트를 만들고 마운트 되었을때, api에서 데이터를 불러오고 랜더링 시켜주는 방식은 프로젝트 규모가 작은 경우에 사용한다.

그렇다면 **프로젝트 규모가 조금 더 커진다면** 어떤 방법이 효율적일까? React의 디자인 패턴 중 하나인 **Container Presenter Pattern**을 사용해보자.

<br/>

<img src="https://media.vlpt.us/images/poiuyy0420/post/9123e752-1436-40ba-b3c1-b97bde07641d/desing.png" />

**container**는 데이터와 상태값(state)를 가지고 api를 불러온다. 그리고 모든 로직들을 처리한다.
**Presenter**는 데이터를 보여주는 역할(UI)에만 신경쓰고, 데이터나 상태값 등은 가지고 있지 않다.
즉, 데이터를 처리하는 부분과 스타일 부분을 분리한 것이다.

<br/>

>## 사용

```js
//Container.js
import user from "user";
import React from "react";
import Presenter from "./Presenter";

export default class extends React.Component{
    state = {
        information: null,
        error: null,
        loading: true,
    };

    async componentDidMount(){
        try{
            const {data: information} = await user.information();
            this.setState({
                information
            })
        } catch{
            this.setState({
                error: "information : X"
            })
        } finally{
            this.setState({
                loading: false
            })
        }
    }

    render() {
        const {information, error, loading} = this.state;
        return <Presenter information={information} 
        error={error} loading={loading}/>
    }
}
```
Container에서는 state를 설정하고, api를 이용하여 데이터를 가져오는 등의 작업을 한 후 Presenter에 render하고 있다.

<br/>

```js
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import Section from "Components/Section";

const Container = styled.div`
    padding: 10px;
`;

const Presenter = ({ information,error,loading}) => loading ? null :
<Container>
    {information && information.length > 0 && 
    <Section title="Information">{information.map(v => v.title)}</Section>}
</Container>;

HomePresenter.propTypes = {
    information:PropTypes.array,
    error:PropTypes.string,
    loading:PropTypes.bool.isRequired,
}

export default Presenter;
```
Presenter.js는 Container.js에서 props를 받아서 UI를 만든다. propTypes를 이용한 처리도 해주면 된다.

<br/>

```js
//index.js
import Container from "./Container";

export default Container;
```
index.js에서 Container를 불러오면 끝이다.