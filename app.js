// let url = 'https://swapi.dev/api/planets/1/'
// axios.get(url)
//     .then(res => {
//         console.log('FIRST PROMISE RESOLVED!!!')
//         console.log(res.data)
//         return axios.get(res.data.residents[0])
//     })
//     .then(res => {
//         console.log('SECOND PROMISE RESOLVED!!!')
//         console.log(res.data)
//         return axios.get(res.data.films[0])
//     })
//     .then(res => {
//         console.log('Third PROMISE RESOLVED!!!')
//         console.log(res.data);})
//     .catch(err => console.log('This did not work!', err))

// function waitThreeSeconds(){
//     return new Promise((resolve, reject) => {
//         setTimeout(resolve, 3000)
//     })
// }
// waitThreeSeconds()
//     .then(() => console.log('ALL DONE'))
//     .catch(() => console.log('ERROR'))

// function changeColor(el, color){
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             el.style.color = color;
//             resolve()
//         },1000)
//     })
// }
// h1 = document.querySelector('h1')

// changeColor(h1, 'red')
//     .then(() => changeColor(h1, 'orange'))
//     .then(() => changeColor(h1, 'yellow'))
//     .then(() => changeColor(h1, 'green'))
//     .then(() => changeColor(h1, 'blue'))
//     .then(() => changeColor(h1, 'purple'))
//     .then(() => changeColor(h1, 'pink'))

// function mockAjaxRequest() {
//   return new Promise(function (reject, resolve) {
//     let probSuccess = 0.5;
//     let requestTime = 1000;
//     setTimeout(function () {
//       let randomNumber = Math.random();
//       if (randomNumber < probSuccess) {
//         let data = 'Here is your data!';
//         resolve(data);
//       } else {
//         reject('Sorry, the request failed');
//       }
//     }, requestTime);
//   });
// }
// mockAjaxRequest()
//   .then((data) => {
//     console.log(data);
//     return mockAjaxRequest();
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => console.log(err));

function get(url) {
  const request = new XMLHttpRequest();
  return new Promise((resolve, reject) => {
    request.onload = function () {
      if (request.readyState !== 4) return;
      //   check status code
      if (request.status >= 200 && request.status < 300) {
        resolve({
          data: JSON.parse(request.response),
          status: request.status,
          request: request,
        });
      } else {
        reject({
          msg: 'Server Error',
          status: request.status,
          request: request,
        });
      }
    };
    request.onerror = function handleError() {
      reject({
        msg: 'Network Error',
      });
    };
    request.open('GET', url);
    request.send();
  });
}
numberDiv = document.querySelector('#numberDiv');

function getRndNum() {
  rndNum = Math.round(Math.random() * 100);
  return rndNum;
}

get(
  `http://numbersapi.com/${getRndNum()},${getRndNum()},${getRndNum()}?json`
).then((res) => {
  for (const key in res.data) {
    if (Object.hasOwnProperty.call(res.data, key)) {
      const element = res.data[key];
      newDiv = document.createElement('div');
      newDiv.innerHTML = element;
      numberDiv.prepend(newDiv);
      console.log(element);
    }
  }
});
// console.log(rndNum);
rndNum = getRndNum();
newHeader = document.createElement('h3');
newHeader.innerText = 'Facts about ' + rndNum;
numberDiv.append(newHeader);
get(`http://numbersapi.com/${rndNum}?json`)
  .then((res) => {
    newDiv = document.createElement('div');
    newDiv.innerHTML = res.data.text;
    numberDiv.append(newDiv);
    return get(`http://numbersapi.com/${rndNum}?json`);
  })
  .then((res) => {
    newDiv = document.createElement('div');
    newDiv.innerHTML = res.data.text;
    numberDiv.append(newDiv);
    return get(`http://numbersapi.com/${rndNum}?json`);
  })
  .then((res) => {
    newDiv = document.createElement('div');
    newDiv.innerHTML = res.data.text;
    numberDiv.append(newDiv);
    return get(`http://numbersapi.com/${rndNum}?json`);
  })
  .then((res) => {
    newDiv = document.createElement('div');
    newDiv.innerHTML = res.data.text;
    numberDiv.append(newDiv);
    return get(`http://numbersapi.com/${rndNum}?json`);
  })
  .catch((err) => console.log(err));
