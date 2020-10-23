// 1. Створити сайт використовуючи swapi.dev. вибрати 1 з 6 проперті (films, characters etc..)і зробити запит по них, вибрати одну з перших проперті що отримаєте і витягнувши з неї "url" - отримати конкретну(планету,фільм, персонажа) з всією інформацією про нього. Додати кнопку при натисканні на яку вивести всю наявну інформацію на екран красиво структуровано.


// 2. Використовуючи параметр серч, розробити сайт який буде з допомогою інпута робити пошук за конкретним параметром і виводити дані на сторінку. (якщо 1 знахідка - вивести всю інфу про айтем, якщо більше 1 то вивести список по філду).


let node = null;
let searchNode = null;
let mainUrl = `https://swapi.dev/api/`;
let searchUrl = `https://swapi.dev/api/starships/?search=`;
window.onload = () => {
  node = fetch(mainUrl)
    .then(response => response.json())
    .then(result => node = result)
    .then(function () {
      node = fetch(node.starships)
        .then(response => response.json())
        .then(result => node = result)
    })

}

starships = document.getElementById(`list`);

let showStarships = function () {
  while (starships.firstChild) {
    starships.removeChild(starships.firstChild);
  }

  let result = node.results;

  createList(result);

}


let search = () => {
  while (starships.firstChild) {
    starships.removeChild(starships.firstChild);
  }
  let inputContent = document.getElementById(`starshipsInput`).value;
  searchNode = fetch(`${searchUrl}${inputContent}`)
    .then(response => response.json())
    .then(result => searchNode = result)
    .then(function() {
      console.log(searchNode);
      let result = searchNode.results;
      createList(result);


    })


}


let createList = (result) => {
  for (let i = 0; i < result.length; i++) {
    let li = document.createElement(`li`);
    li.innerText = `${result[i].name}`;
    let button = document.createElement(`button`);
    button.innerText = `More info about starship`;
    button.onclick = function () {
      let listInfo = document.createElement(`ul`);

      for (let key in result[i]) {
        let liInfo = document.createElement(`li`);
        liInfo.innerText = `${key}: ${result[i][key]}`;
        listInfo.appendChild(liInfo);
      }
      let closebtn = document.createElement(`button`);
      closebtn.innerText = `Close`;
      closebtn.onclick = function () {
        listInfo.remove();
      }
      listInfo.appendChild(closebtn);
      li.appendChild(listInfo);
    }
    starships.appendChild(li);
    starships.appendChild(button)
  }
}
