---
title: "데이터를 Table에 정리, Chart.js"
description: "Chart.js 메인 페이지에 가보면, 디자이너와 개발자를 위한 간단하면서도 유연한 JavaScript 차트 작성이라고 나와있다."
date: 2021-12-07T02:50:01.889Z
tags: ["node.js"]
---
>## Chart.js란?

![](/images/f04611b6-293d-464a-abb6-2ae263f7188b-image.png)



[Chart.js 메인 페이지](https://www.chartjs.org/)에 가보면, 디자이너와 개발자를 위한 간단하면서도 유연한 JavaScript 차트 작성이라고 나와있다.

즉, 이쁜 차트를 손쉽게 구현할수 있게 도와주는 JavaScript 라이브러리이다.
~~데이터 시각화를 위한 [D3](https://d3js.org/)라는 것도 있다.~~

<br>

>## 데이터를 Table에 정리

먼저 차트를 그리기 위해서는 데이터가 있어야한다. 
데이터를 가져오는 기초적인 부분부터 알아보자.
~~이 부분은 chart.js와 관련없음~~

<br>

```js
let data = [
    {
      "_id": "61ad9e21d562f0311e770971",
      "index": 0,
      "picture": "http://placehold.it/32x32",
      "age": 26,
      "eyeColor": "blue",
      "name": "Hines Hampton",
      "gender": "male",
      "company": "BIFLEX",
      "email": "hineshampton@biflex.com",
      "phone": "+1 (922) 584-2106",
      "address": "623 Jerome Street, Evergreen, Puerto Rico, 5308"
    }, 
  //수 많은 데이터들이 더 있을것
  ]
```

먼저 사람의 정보를 나타내는 **데이터의 형식**이 위와 같다.
변수 명을 data로 설정해준것을 기억하고, data.js 파일에 따로 보관하자.

<br>

```html
    <button class="dataCallButton">데이터 호출!</button>
    <table class="table">
        <thead>
            <tr>
                <th>index</th>
                <th>picture</th>
                <th>age</th>
                <th>eyeColor</th>
                <th>name</th>
                <th>gender</th>
                <th>company</th>
                <th>email</th>
                <th>phone</th>
                <th>address</th>
            </tr>
        </thead>
        <tbody></tbody>
    </table>
```

먼저 차트위에 표 형식으로 데이터를 보여주기 위해 table을 구성했다. 데이터에서 `_id`는 앞에 언더바가 있는것을 보니 **보여주기 싫은 정보**이다. 그래서 테이블 목록에서 제외시켰다.

<br>

```html
<script src="data.js"></script>
<script>
  
  // 함수 더 있음. 밑에서 설명
  
  const dataCallButton = document.querySelector('.dataCallButton');
  
  dataCallButton.addEventListener('click', 
  	function(){renderTable(data)}
  );

  function renderTable(data) {
  	let tbodyData = [];
  	for (const iterator of data) {
  		tbodyData.push(`
                    <tr>
                      <td>${iterator.index}</td>
                      <td>${iterator.picture}</td>
                      <td>${iterator.age}</td>
                      <td>${iterator.eyeColor}</td>
                      <td>${iterator.name}</td>
                      <td>${iterator.gender}</td>
                      <td>${iterator.company}</td>
                      <td>${iterator.email}</td>
                      <td>${iterator.phone}</td>
                      <td>${iterator.address}</td>
                    </tr>
  		`)
  	}
  	document.querySelector('.table > tbody').innerHTML = tbodyData.join('');
  }
</script>
```

테이블 헤더에 맞는 바디들을 넣어주기 위해 data.js를 불렀다. 그리고 함수들을 선언하기위해 또 다른 script를 만들었다.

renderTable 함수에 파라미터로 데이터가 들어오고 있다. for문으로 data 배열안의 **데이터 정보 객체 하나씩 가져오고**, 그 안에서 index, picture 등 값들을 td에 넣어주었다.  

이렇게 생성된 tr, td를 tbodyData에 push한다. (**배열로 들어감**)

이제 `<tbody></tbody>` 안에 넣어주면 테이블에 값이 들어갈 것이다. tbodyData는 배열이기 때문에 `join('')`해서 넣어주고 있다.

renderTable 함수를 불러오기만 하면 끝이다. 버튼을 `querySelector`으로 찾고, 클릭하면 renderTable를 실행하도록 동작하고있다.(아규먼트는 data)

<br>

```js
let click = true;
const elems = document.querySelectorAll('tr > th');

elems.forEach(item => {
  item.addEventListener('click', 
                        function(){sortTable(item.textContent)}
                       )
});

function sortTable(key) {
  if (click) {
    click = false;
    data.sort((a, b) => (a[key] < b[key] ? -1 : (a[key] > b[key] ? 1 : 0)));
  } else {
    click = true;
    data.sort((a, b) => (a[key] > b[key] ? -1 : (a[key] < b[key] ? 1 : 0)))
  }
  renderTable(data)
}
```

위에서 주석처리된 함수 더 있음 부분이다. click 변수를 flag로써 사용하기 위해 선언해 주었다. elems는 tr안에 th를 `querySelectorAll` 하고있다.

각각의 th들이 클릭된다면, `sortTable(item.textContent)` 을 하게 된다. age를 클릭하면 item은 `<th>age<th>` 가 되기 때문에, age만 `sortTable`로 넘겨주기 위해  `textContent` 을 사용했다.

`sortTable`함수에서는 data에서 age들을 찾아 오름차순 또는 내림차순 정렬을 수행한 후 `renderTable(data)`를 한다. (age는 예시이고, 모든 th에 대해 위 과정이 동작됨)

undefined

데이터 호출 버튼을 누르고, age 2번 클릭, eyeColor 2번 클릭 해보았다. 정상적으로 동작하는것을 볼 수 있다.
~~위 과정을 코드로 돌리면 Table모양이 조금 다를수있다. 필자는 부트스트랩을 넣어서..~~

<br>

>## Chart.js

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
```

바로 차트를 그려보자. Chart.js를 사용하기위에 헤더부분에 script를 추가해주었다.

<br>

```html
<button class="chartCallButton">나이의 평균!</button>
```

![](/images/aa16d86f-adbd-481d-bd3f-2f3ae59d1cbb-image.png)

데이터 호출 버튼 옆에 나이의 평균! 버튼을 생성해주었다.

<br>

```html
    <div>
        <canvas id="myChart"></canvas>
    </div>
```

`</table>` 뒤에 차트를 불러올 공간을 마련해주었다.

<br>

```js
const chartCallButton = document.querySelector('.chartCallButton');

chartCallButton.addEventListener('click', 
                                 function(){averageAge(data)}
                                );

function averageAge(data) {
  let s = 0;
  let male = data.filter(i => i.gender === 'male').map(i => i.age);
  let female = data.filter(i => i.gender === 'female').map(i => i.age);
  male.forEach(i => s +=i)
  maleAverage = (s / male.length)

  s = 0;
  female.forEach(i => s +=i)
  femaleAverage = (s / female.length)
  chart()
}
```

이번에는 '나이의 평균!' 버튼을 찾아 클릭시 이벤트를 발생시키기 위해 작업을 해주었다.

`averageAge(data)` 함수에서는 data를 파라미터로 받아오고, 남자의 나이는 male변수에 여자의 나이는 female변수에 넣고있다. 그 후 각각 forEach로 합을 구하고 평균을 내서 maleAverage와 femaleAverage에 넣어주었다.

함수의 마지막에는 chart()함수를 호출하고있다.

<br>

```html
<script>
    function chart(){
        const ctx = document.getElementById('myChart').getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['남', '여'],
                datasets: [{
                    label: '# of Votes',
                    data: [maleAverage, femaleAverage],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
</script>
```

위에서 `</table>`뒤에 차트를 넣기위해 div안에 canvas로 공간을 줬었다. getElementById로 그 위치를 찾고, `getContext('2d')`로 2d차트를 그려줄 준비를 하자.

undefined

이제 new Chart으로 그려주면된다. 위의 코드를 보면 대충 무슨소린지 알아볼 수 있을것이다. 차트를 매우 쉽게 그릴수 있게 되었다. 더 사용하고 싶은 옵션이 있다면, [공식 사이트](https://www.chartjs.org/)에서 사용법과 깃허브 주소들이 잘 나와있으므로 참고하자.