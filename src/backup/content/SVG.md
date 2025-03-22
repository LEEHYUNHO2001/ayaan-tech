---
title: "SVG"
description: "확장 가능한 벡터 그래픽으로 XML 기반의 2차원 그래픽이다."
date: 2021-11-09T07:13:17.717Z
tags: ["CSS"]
---
>## SVG란??

확장 가능한 벡터 그래픽(scalable vector graphics)으로 XML 기반의 2차원 그래픽이다.

벡터기반이기 때문에 아무리 **확대를 해도 이미지가 깨지지 않고**, **이미지의 크기를 키워도 용량이 늘어나지 않는다는 장점**이 있다.

HTML 태그의 집합으로 이루어져 있어서 **css와 javascript로 컨트롤이 가능**하다.

**단순한 모양일수록 효율이 좋다.** 그렇기 때문에 주로 단순한 아이콘, 로고, 도형 등을 구현할 때 많이 사용한다. 

**복잡한 모양을 구현하면, Path가 많아지게 되어 기존이미지 포멧들보다 용량이 커질 수가 있다**.

이러한 단점을 보완하기 위해서 **SVG Optimizing을 위한 툴**도 존재한다.


<br>

> 사용


![](/images/7cec5c85-ef6b-4dad-b1c4-fc89e486a996-image.png)

```html
<img src="frog.svg" alt="frog">
```

img태그를 사용하여 svg파일을 불러올 수 있다.

<br>

![](/images/aa3ba647-d432-475d-a6c0-f1917a827140-image.png)

![](/images/22bd8744-4511-40fe-a58e-cf49328144b3-image.png)

또는 이와같이 path를 받아 불러올 수도 있다. svg는 svg 태그로 감싸져있는것을 볼 수 있다.

![](/images/76a19f44-309b-481e-ba2d-a88d12c820fa-image.png)

모양 변경, 채색, 애니메이션 등 적용이 가능하다.
~~안경(?) 벗으니 뭔가 더 귀여운데..~~

![](/images/92a75958-b39f-40b3-8785-63f4c586b19d-image.png)

svg의 원래 선에는 background-color가 아닌 fill로 설정해줘야 색이 적용된다.
~~FE 개발자 개구리~~

[png -> svg 변환 사이트](https://convertio.co/kr/png-svg/)도 있으니 참고하자.

<br>

> 그 외

rect, circle, eclipse, line, polygon, polyline 등의 태그들은 svg에서 사용할 수 있다.

svg의 viewbox 속성은 실제 svg 영역 중에 보여줄 기준점을 정하는 속성이다.




