---
title: "Form"
description: "Form, 제어 컴포넌트, 다중 입력 제어"
date: 2022-01-01T09:35:59.543Z
tags: []
---
React의 다른 DOM 요소와 다르게 From 요소는 From 요소 자체가 내부 상태를 가진다. 보통 JavaScript 함수로 폼의 제출을 처리하고 사용자가 폼에 입력한 데이터에 접근하는 **제어 컴포넌트** 방식으로 사용한다.

<br>

### 제어 컴포넌트

```jsx
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

ReactDOM.render(
  <>
    <NameForm />
  </>,
  document.getElementById("root")
);
```

undefined

모든 키 입력에서 `handleChange`가 동작하여 value값을 받는다. 받은 value의 값(this.state.value)은 input의 value에 props로 주고 있다. Submit을 클릭하면 `handleSubmit` 가 동작하여 입력했던 value 값으로 alert가 나타나는 것이다. 이렇게 **React에 의해 값이 제어되는 입력 Form 요소** 를 제어 컴포넌트라고 한다.

<br>

```jsx
<input type="file" />
```
하나 이상의 파일을 저장소에서 서버로 업로드하거나 [File API](https://developer.mozilla.org/en-US/docs/Web/API/File/Using_files_from_web_applications)를 통해 JS로 조작할 수 있다. 값이 읽기 전용이므로 비제어 컴포넌트이다.

<br>

```jsx
class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "coconut" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    alert("Your favorite flavor is: " + this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick your favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

undefined

select 박스도 input 예시와 비슷하게 동작한다. select 태그에 multiple 은 value에 배열을 전달할 수 있다.

### 다중 입력 제어

여러 input 요소를 제어해야할 경우, name 속성을 추가하고 event.target.name 값을 통해 핸들러가 어떤 작업을 할 지 선택할 수 있게 해준다.

undefined

`target.type`으로 삼항 연산자를 통해 checkbox input인지 value를 사용하는 input인지 판단한다. 그리고 name을 가져오고 value값을 넣어준다. 다중 입력 제어가 가능해진 것이다.

<br>

`ReactDOM.render(<input value="hi" />, mountNode);`

value값은 지정해주면 의도하지 않는 한 사용자가 변경할 수 없다. (수정 가능 하다면 value는 undifined나 null일 수 있다.)

<br>

> 마무리

유효성 검사, 방문한 필드 추적 및 폼 제출 처리와 같은 작업은 [Formik](https://formik.org/)으로 해결할 수 있다.