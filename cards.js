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
cardsDiv = document.querySelector('#cardDeck');

function getRndNum(topNum) {
  rndNum = Math.round(Math.random() * topNum);
  return rndNum;
}

// console.log(rndNum);
// rndNum = getRndNum();
newHeader = document.createElement('h3');
// newHeader.innerText = 'Cards';
cardsDiv.append(newHeader);

get(`https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1`).then(
  (res) => {
    deckID = res.data.deck_id;
  }
);
// position = 0;
function goGetEm() {
  get(`https://deckofcardsapi.com/api/deck/${deckID}/draw/?count=1`)
    .then((res) => {
      newImg = document.createElement('img');
      newImg.id = res.data.remaining;
      randomNum = getRndNum(360);
      newImg.src = res.data.cards[0].image;
      newImg.style.rotate = randomNum + 'deg';
      // console.log(res.data);
      newHeader.innerText = 'Cards left in Deck: ' + res.data.remaining;
      cardsDiv.append(newImg);
    })
    .catch((err) => console.log('Here is your error: ' + err));
}
