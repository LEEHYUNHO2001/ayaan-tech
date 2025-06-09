---
title: "npm 에러 해결"
description: "  어제부터 갑자기 npm에 오류가 발생하기 시작했다."
date: 2021-12-16T01:54:26.939Z
tags: []
---
![](/images/22c611b2-05b0-4cf8-a7a3-7f6faf2a8832-image.png)

어제부터 갑자기 npm에 오류가 발생하기 시작했다. 뭔가를 설치하려고 하면 위의 오류가 나타는줄 알았다. 하지만 프로젝트를 실행하려고 `npm run dev` 해주어도 위의 오류는 나타난 채로 프로젝트가 실행되었다. 뭔가 단단히 잘못되었다..

현재 나는 window를 사용하고 있다. node.js를 다시 설치해주려고 [node.js 공식 사이트](https://nodejs.org/ko/)에서 노드를 재설치 해주었다. 하지만 해결되지 않았다.

<br>

![](/images/975ae213-5f3c-4402-be91-86d89e2c83e5-image.png)

npm은 글로벌하게 설치하면 위와 같은 경로에 노드모듈 디렉터리안에 설치된다는데 확인해보니 나는 그 디렉터리조차 없다. 정말 뭔가 잘못되었다.

<br>

![](/images/a1593e82-e3f9-4b34-b590-da76b79a51ba-image.png)

https://github.com/zkat/npx/issues/146 를 확인해보니 config 문제일 수 있어 `npm config set cache C:\tmp\nodejs\npm-cache --global`로 해결할 수 있다고 한다. 바로 시도했다. 하지만 나는 이걸로도 해결되지 않았다. ~~슬슬 뭔가 불안하다.~~

<br>

[StackOver Flow](https://stackoverflow.com/questions/20711240/how-to-completely-remove-node-js-from-windows/20711410#20711410)에 node와 npm 둘다 모두 삭제를 한 후에 node를 재설치하면 가능하다는 의견이 있었다. 각 step에 맞게 node와 npm을 삭제해주었다. 그리고 node를 설치했다.

<br>

![](/images/6129beb2-23ba-49d7-857f-ac3c2b4ac051-image.png)

이제 드디어 npm 으로 무언가를 수행할 때 에러가 나타나지 않는다.
드디어 해결..?

<br>

![](/images/fe3cde70-43f2-4fc4-9823-4f7093e3131d-image.png)

어림도 없지 `yarn -v` 하는 순간 바로 또 에러나타난다. yarn이 설치는 된건가?

<br>

![](/images/be8804b5-6d07-4f43-884e-56ed31de2620-image.png)

`npm list -g`로 설치는 된건지 확인해보았다. 설치는 되어있다. 
경로를 못찾는건가?

<br>

![](/images/7863887e-5ffd-400a-bf59-47f10c3a545f-image.png)

그래서 cmder로 확인해보았다. 여기서는 또 `yarn -v` 하면 경로를 잘 찾아 버전을 확인해준다. 경로문제가 아닌거같다.

<br>

![](/images/4b3a4f6b-93bc-4630-baa8-af55c54f29d6-image.png)

VScode에게 관리자 권한이 없어서 정상적으로 동작하지 않는것 같다.
윈도우 PowerShell을 관리자 권한으로 열어주었다. 
`Set-ExecutionPolicy RemoteSigned`을 입력해주고 Y를 입력하자.

![](/images/84fb5236-f349-4417-90f9-95008108d8b9-image.png)

그리고`get-ExecutionPolicy`으로 확인해보자. 잘 적용 되었다.
이제 재부팅하고 기도하자..

<br>

<img src="https://www.urbanbrush.net/web/wp-content/uploads/edd/2019/08/urbanbrush-20190813065733271006.png" width="300px">

![](/images/99c288da-72be-4dc5-8973-ff45abbd961c-image.png)

드디어 해결되었다. 이틀에 걸쳐서 4시간은 삽질한거 같은데 해결되니 너무 행복하다. vscode가 잘 돌아가는것에 감사하며 살자.

