"use strict";

// const { render } = require("sass");

// ELEMENTOS HTML
const input = document.querySelector(".js-input");
const searchButton = document.querySelector(".js-button");
const favList = document.querySelector(".js-favList");
const resultsList = document.querySelector(".js-resultsList");

// ARRAYS VACÍOS
let searchResults = [];
let favShowsArray = [];

// FUNCIÓN DE BÚSQUEDA

function getShowFromAPI(event) {
  event.preventDefault();
  const search = input.value.toLowerCase();
  const apiURL = `https://api.jikan.moe/v4/anime?q=${search}`;
  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => {
      searchResults = data.data;
      resultsList.innerHTML = '';
      for (const show of searchResults) {
        const img = show.images.jpg.image_url;
        const title = show.title;
        resultsList.innerHTML += `
        <li class="card .js-card">
            <img src="${img}" alt="">
            <h3>${title}</h3>
        </li>
        `;
      }
    });
} // OK

searchButton.addEventListener("click", getShowFromAPI);

// FUNCIÓN SUSTITUIR IMAGEN ROTA
// const apiURL = `https://api.jikan.moe/v4/anime`;
// const noIMG = 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png';

// function getNoImgShow() {
//   fetch(apiURL)
//     .then(response => response.json())
//     .then(data => {
//       const searchResults = data.data;
//       for (const show of searchResults) {
//         const img = show.images.jpg.image_url;

//         // Verificar si la URL de la imagen contiene la cadena específica
//         if (img.includes('apple-touch-icon-256')) {
//           console.log(`Anime sin imagen válida:`, show.title);
//         }
//       }
//     })
//     .catch(error => console.error("Error al obtener datos:", error));
// }

// button.addEventListener("click", getNoImgShow);


// FUNCIÓN DE FAVORITOS: EVENT LISTENER EN UL

resultsList.addEventListener('click', (event) => {
  // Encontrar el <li> más cercano al elemento clicado
  const clickedShow = event.target.closest('li');
  // Verificar que el clic ocurrió dentro de un <li> y que no ha pulsado la renderlist
  if (clickedShow !== resultsList) {
    clickedShow.classList.add('fav'); // añadimos la clase fav
    const clickedShowImg = clickedShow.querySelector('img').src; // extraigo la img
    const clickedShowTitle = clickedShow.querySelector('h3').textContent;  // extraigo el título
    console.log(clickedShowImg);
    console.dir(clickedShowTitle);
    const favShow = {
      img: clickedShowImg,
      title: clickedShowTitle,
    }
    favShowsArray.push(favShow); // se añade con otra busqueda :)
    console.log('Array de favoritos:', favShowsArray);
  }
});