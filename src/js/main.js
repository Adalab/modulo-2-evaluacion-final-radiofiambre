"use strict";

// const { render } = require("sass");

// ELEMENTOS HTML
const input = document.querySelector(".js-input");
const searchButton = document.querySelector(".js-button");
const favList = document.querySelector(".js-favList");
const resultsList = document.querySelector(".js-resultsList");

// ARRAYS VACÍOS
let searchResults = [];
let favShows = [];

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
        <li class="card">
            <img src="${img}" alt="">
            <h3>${title}</h3>
        </li>
        `;
      }
    });
} // OK


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

searchButton.addEventListener("click", getShowFromAPI);

// FUNCIÓN DE FAVORITOS

// solo funciona clicando en lo blanco de la tarjeta!!
// resultsList.addEventListener('click', (event) => {
//   if (event.target.classList.contains('card')) {
//     const showCard = event.target.img;
//     const favImg = event.target.h3;
//     const favTitle = event.target;
//     console.log('Elemento T clicado:', event.target);
//     console.log('Elemento CT clicado:', event.currentTarget);
//     favList.innerHTML += `
//     <li class="card fav">
//         <img src="${favImg}" alt="">
//         <h3>${favTitle}</h3>
//     </li>
//     `;
//   }
// });


// resultsList.addEventListener('click', (event) => {
//     const favImg = event.target.img;
//     const favTitle = event.target.h3;
//     console.log('Elemento T clicado:', event.target);
//     console.log('Elemento CT clicado:', event.currentTarget);
//     console.log(favImg);
//     console.log(favTitle);
//     favList.innerHTML += `
//     <li class="card fav">
//         <img src="${favImg}" alt="">
//         <h3>${favTitle}</h3>
//     </li>
//     `;
// });