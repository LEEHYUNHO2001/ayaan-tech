---
title: "Next.js 환경에서 현재 페이지 Image, PDF로 저장"
description: "현재 보여지는 페이지를 Image로 출력해보고, PDF로도 출력해보자."
date: 2022-05-09T07:07:58.383Z
tags: ["React","next"]
---
## PDF가 출력이 되긴 하는데..

```bash
yarn add html-pdf @types/html-pdf
```

React 환경에서는 `@react-pdf/renderer` 를 이용하여 pdf로 출력시킬 수 있고, `react-pdf`으로 viewer 를 구현할 수 있다. 하지만 문제는 Next.js 환경에서 이다.

<br>

```jsx
export const getServerSideProps = async ({ res, req, query }) =>  {
  //...
  const exportPDF = query.exportPDF === 'true';
  const isServer = !!req;

  if (isServer && exportPDF) {
    const buffer = await componentToPDFBuffer(<Reports />);

    res.setHeader('Content-disposition', 'attachment; filename="article.pdf');
    res.setHeader('Content-Type', 'application/pdf');
    res.end(buffer);
  }

  return { };
};
```

자료를 계속 찾아보니 방법이 있긴 했다. 먼저 PDF를 출력할 페이지에서 SSR을 하는 부분에서 이와 같이 작업해주자.

<br>

```jsx
import pdf, { CreateOptions } from 'html-pdf';
import { renderToStaticMarkup } from 'react-dom/server';

export const componentToPDFBuffer = (component) => {
  return new Promise((resolve, reject) => {
    const html = renderToStaticMarkup(component);

    const options = {
      format: 'A4',
      orientation: 'portrait',
      border: '10mm',
      footer: {
        height: '10mm',
      },
      type: 'pdf',
      timeout: 30000,
    };

    pdf.create(html, options as CreateOptions).toBuffer((err, buffer) => {
      if (err) {
        return reject(err);
      }

      return resolve(buffer);
    });
  });
};
```

그리고 componentToPDFBuffer라는 함수를 생성해준다. 엔트포인트에 `/?exportPDF=true` 를 하면 출력되는 구조이다.

하지만 이렇게 하니 동적인 데이터들에 대한 것은 출력되지 않았다. 이 문제점은 해당 데이터도 SSR하여 해결했지만, D3로 구현한 차트가 나타나지 않았다. 이 문제점은 해결방법을 찾을 수 없었다.

이 방법을 나중에 좀더 보완해서 사용할 수 있도록 해보아야 겠다. 다른 방법으로 PDF로 뽑는것을 성공했지만 문제점이 있다. 이 부분은 밑에서 설명하겠다.

<br>

## 일단 Image 출력은 성공

위의 방법도 많은 시간을 투자했는데.. 나가리였다. 일단 이미지라도 출력해보자는 마음에 다시 래퍼런스를 찾기 시작했다.

<br>

```bash
yarn add html2canvas
```

그러다 괜찮은 라이브러리를 찾았다. 대부분 바닐라에 대한 정보만 있어서 React에 맞게 사용해보았다.

<br>

```jsx
  const handleBtn = () => {
    PngExport('capture');
  };
```

버튼의 onClick 이벤트에 넣어 사용하기 쉽게 함수로 만들었다. 이제 PngExport 함수를 보자.

<br>

```jsx
import html2canvas from 'html2canvas';

const clickLink = (link: HTMLAnchorElement) => {
  link.click();
};

const accountForBrowser = (click: (link: HTMLAnchorElement) => void, link: HTMLAnchorElement) => {
  document.body.appendChild(link);
  click(link);
  document.body.removeChild(link);
};

const simulateDownload = (uri: string, filename: string) => {
  const link = document.createElement('a');
  if (typeof link.download !== 'string') {
    window.open(uri);
  } else {
    link.href = uri;
    link.download = filename;
    accountForBrowser(clickLink, link);
  }
};

export const PngExport = async (id: string) => {
  if (document) {
    html2canvas(document.querySelector(`#${id}`)!).then(canvas => {
      simulateDownload(canvas.toDataURL(), 'file-name.png');
    });
  }
};
```

[codepen](https://codepen.io/hchiam/pen/ZEzjrNY)에서 어떤 식으로 html2canvas를 사용하는지 참고했다. 함수로 나눈것이 복잡하다면 합쳐주어도 된다.

선택된 영역을 canvas로 변경하여 image를 출력하는 형식이다. a태그를 생성하여, download 속성을 부여하면 된다.

<br>

## 위와 다른 방법으로 PDF 추출

```bash
yarn add jspdf @types/jspdf
```

html2canvas와 jspdf를 이용하는 방법이다. 감이 좋은 분들은 눈치를 챘겠지만 이 방법은 image로 변환한 후 pdf로 출력할 수 있게 해주는 것이다. 화질 문제와 이미지이기 때문에 text를 따로 드래그가 불가능하다는 단점때문에 첫 방법을 보완하여 사용하고 싶었던 이유이다. 그래도 일단 PDF로 추출해보자.

<br>

```jsx
  const handlePdf = () => {
    PdfExport('capture');
  };
```

PDF출력 이라는 버튼 onClick 이벤트에 PdfExport라는 함수를 넣어주었다. 이제 이 함수를 구현하자.

<br>

```jsx
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const PdfExport = async (id: string) => {
  if (document) {
    html2canvas(document.querySelector(`#${id}`)!).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const imgWidth = 210;
      const pageHeight = imgWidth * 1.414;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;
      heightLeft -= pageHeight;

      // eslint-disable-next-line new-cap
      const doc = new jsPDF('p', 'mm', 'A4');
      let position = 0;
      doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);

      while (heightLeft >= 20) {
        position = heightLeft - imgHeight;
        doc.addPage();
        doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }
      doc.save('Reports.pdf');
    });
  }
};
```

위의 코드는 가장 기본적인 모습은 아니다. 기초적인 설정만 했을 경우 pdf에 보여지는 부분이 짤리는 문제점이 발생하여 while문으로 크기들을 조정해준 것이다. [html2canvas와 pdf](https://wedul.site/406) 글을 참고했다.

<br>

## 마무리

D3는 이미지로 출력되도 상관없지만, 그 외에 text들은 글씨가 드래그 될 수 있도록 텍스트로써 pdf 출력이 되야한다고 생각한다. 하지만 아직 그 방법을 찾지 못했다. html2canvas, jspdf, html-pdf 를 모두 사용하여 특정 부분만 이미지로 뽑고 나머지는 html로 pdf를 생성하고 싶었지만 나는 원하는 결과를 얻지 못했다. 추후에 더 시도해볼 예정이다.