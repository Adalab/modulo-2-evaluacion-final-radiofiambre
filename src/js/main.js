"use strict";

// const { render } = require("sass");

// ELEMENTOS HTML
const input = document.querySelector(".js-input");
const searchButton = document.querySelector(".js-button");
const favsList = document.querySelector(".js-favList");
const resultsList = document.querySelector(".js-resultsList");
const buttonEmptyFavs = document.querySelector(".btnRemoveAll");

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
        const noImg = 'https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png';
        const newImg = 'https://placehold.co/225?text=Sin+imagen&font=roboto.png';
        if (img === noImg) {
          resultsList.innerHTML += `
            <li class="card">
                <img src="${newImg}" alt="">
                <h3>${title}</h3>
            </li>
            `;
        } else {
          resultsList.innerHTML += `
            <li class="card">
                <img src="${img}" alt="">
                <h3>${title}</h3>
            </li>
            `;
        }
      }
    });
} // OK

searchButton.addEventListener("click", getShowFromAPI);



// FUNCIÓN CACHEAR AVORITOS

function setFavsInLocalStorage() {
  localStorage.setItem('Favorite Shows:', JSON.stringify(favShowsArray)); 
}



// FUNCIÓN AÑADIR A FAVORITOS Y RENDERIZAR: EVENT LISTENER EN UL

function renderFavs() {
  favsList.innerHTML = '';
  favShowsArray.forEach((favShow) =>
  favsList.innerHTML += `
  <li class="card fav">
      <button class="btnX">x</button>
      <img src="${favShow.img}" alt="">
      <h3>${favShow.title}</h3>
  </li>
  `) // DECIR QUE NO AÑADA SI YA EXISTE EN EL ARRAY
}



// FUNCIÓN CACHEAR FAVORITOS
function setFavsInLocalStorage() {
  localStorage.setItem('Favorite Shows:', JSON.stringify(favShowsArray)); 
} // OK


// FUNCIÓN ACTUALIZAR ARRAY DE FAVORITOS
function updatefavShowsArray(event) {
  // Encontrar el <li> más cercano al elemento clicado
  const clickedShow = event.target.closest('li');
  // Verificar que el clic ocurrió dentro de un <li> y que no ha pulsado la renderlist
  if (clickedShow !== resultsList) {
    const clickedShowImg = clickedShow.querySelector('img').src;
    const clickedShowTitle = clickedShow.querySelector('h3').textContent;
    const favShow = {
      img: clickedShowImg,
      title: clickedShowTitle,
    }
    favShowsArray.push(favShow); // se añade con otra busqueda :)
    console.log('Array de favoritos:', favShowsArray); // OK
    renderFavs();
    setFavsInLocalStorage(); // OK
  }
}


// EJECUTAR FUNCIÓN DE ACTUALIZAR FAVORITOS (ARRAY, CLASE, MOSTRAR Y CACHEAR)
resultsList.addEventListener('click', updatefavShowsArray);



// FUNCIÓN RENDERIZAR FAVS
function loadLocalStorage() {
  const savedFavShows = localStorage.getItem('Favorite Shows:');
  if(savedFavShows) {
    favShowsArray = JSON.parse(savedFavShows);
    console.log('Datos en LS:', favShowsArray)
    favShowsArray.forEach((favShow) =>
      favsList.innerHTML += `
      <li class="card fav">
          <button class="btnX">&#10006;</button>
          <img src="${favShow.img}" alt="">
          <h3>${favShow.title}</h3>
      </li>
      `)
  } else {
    console.log('No hay datos en LS');
  }
} // OK

loadLocalStorage(); // OK



// BONUS: BORRAR FAVORITOS
function removeFavShow(event) {
    // Eliminar clase fav  // OK
    const noFavShow = event.target.parentElement;
    noFavShow.classList.remove('fav');
    // Eliminar del array
    const noFavShowTitle = noFavShow.querySelector('h3').textContent;
    console.log(noFavShowTitle);
    const noFavShowIndex = favShowsArray.findIndex((favShow) => favShow.title === noFavShowTitle);
    console.log(noFavShowIndex);
    console.log(favShowsArray);
    favShowsArray.splice(noFavShowIndex, 1);
    console.log(favShowsArray);
    // Actualizar listado favs
    renderFavs();
    // Actualizar ls
    setFavsInLocalStorage();

}

// Si el botón es dinámico (generado tras una acción como un fetch), usa delegación de eventos:
document.body.addEventListener("click", (event) => {
  if (event.target.classList.contains("btnX")) {
    removeFavShow(event);
  }
});



// BOTÓN ELIMINAR TODOS LOS FAVORITOS
function removeAllFavs() {
    console.log('He clicado en Vaciar'); // OK
    const noFavShows = document.querySelectorAll('.fav');
    noFavShows.forEach((noFavShow) => {
    noFavShow.classList.remove('fav');
    console.log(noFavShows);
    const noFavShowTitle = noFavShow.querySelector('h3').textContent;
    console.log(noFavShowTitle);
    const noFavShowIndex = favShowsArray.findIndex((favShow) => favShow.title === noFavShowTitle);
    console.log(noFavShowIndex);
    console.log(favShowsArray);
    favShowsArray.splice(noFavShowIndex, 1);
    console.log(favShowsArray);
    });

    // Actualizar listado favs
    renderFavs();
    // Actualizar ls
    setFavsInLocalStorage();
}

buttonEmptyFavs.addEventListener('click', removeAllFavs);