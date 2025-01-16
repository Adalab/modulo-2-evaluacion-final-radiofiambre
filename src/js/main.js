"use strict";

// const { render } = require("sass");



// ELEMENTOS HTML
const input = document.querySelector(".js-input");
const searchButton = document.querySelector(".js-btnSearch");
let favsList = document.querySelector(".js-favList");
let resultsList = document.querySelector(".js-resultsList");
const buttonEmptyFavs = document.querySelector(".js-btnRemoveAll");
const resetButton = document.querySelector(".js-btnReset");


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
      manageFavClassInResultsList(); // debe ir dentro del for porque está trabando en asíncrono
    });
}

searchButton.addEventListener("click", getShowFromAPI);

// FUNCIÓN RENDERIZAR EN FAVSLIST

function updateFavList() {
  favsList.innerHTML = '';
  favShowsArray.forEach((favShow) => 
  favsList.innerHTML += `
    <li class="card fav">
        <button class="btnX">&#10006;</button>
        <img src="${favShow.img}" alt="">
        <h3>${favShow.title}</h3>
    </li>
    `)
}



// Añadir o quitar clase favResult de resultsList

function manageFavClassInResultsList() {
  // cogerlo del array searchResults, no del DOM
  const resultsListShowsTitles = resultsList.querySelectorAll('h3');
  resultsListShowsTitles.forEach((resultsListShowTitle) => {
    // Coger texto del título
    const showTitleText = resultsListShowTitle.textContent;
    const exists = favShowsArray.find(
      (favShow) => favShow.title === showTitleText
    );
    if (exists) {
      resultsListShowTitle.parentElement.classList.add('favResult');
    } else {
      resultsListShowTitle.parentElement.classList.remove('favResult');
    }
  });
}



// FUNCIÓN CACHEAR FAVORITOS DESDE EL ARRAY
function setFavsInLocalStorage() {
  localStorage.setItem('Favorite Shows:', JSON.stringify(favShowsArray)); 
}



// FUNCIÓN ACTUALIZAR ARRAY DE FAVORITOS
function selectFavShow(event) {
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
    favShowsArray.push(favShow);
    updateFavList();
    setFavsInLocalStorage();
    manageFavClassInResultsList();
  }
}

resultsList.addEventListener('click', selectFavShow);



// FUNCIÓN RENDERIZAR FAVS
function loadLocalStorage() {
  const savedFavShows = localStorage.getItem('Favorite Shows:');
  if(savedFavShows) {
    favShowsArray = JSON.parse(savedFavShows);
    updateFavList();
  }
}

// Cargar el LS siempre que se abra la página
loadLocalStorage();



// BONUS: BORRAR FAVORITOS

// De un show favorito, eliminar la clase, quitar del array y actualizar LS
function removeFavShow(noFavShow) {
  // Quitar clase .fav
  noFavShow.classList.remove('fav');  
  // Eliminar del array
  const noFavShowTitle = noFavShow.querySelector('h3').textContent;
  const noFavShowIndex = favShowsArray.findIndex((favShow) => favShow.title === noFavShowTitle);
  favShowsArray.splice(noFavShowIndex, 1);
  // Actualizar listado favs
  updateFavList();
  // Actualizar ls
  setFavsInLocalStorage();
  // Actualizar favs de resultsList
  manageFavClassInResultsList();
}


// Eliminar un solo show favorito
function removeOneFavShow(event) {
    const noFavShow = event.target.parentElement;
    removeFavShow(noFavShow);
}

// Si el botón es dinámico (generado tras una acción como un fetch), usa delegación de eventos:
document.body.addEventListener("click", (event) => {
  if (event.target.classList.contains("btnX")) {
    removeOneFavShow(event);
  }
})



// BOTÓN ELIMINAR TODOS LOS FAVORITOS

// Eliminar para todos los shows favoritos
function removeAllFavShows() {
    const noFavShows = document.querySelectorAll('.fav');
    noFavShows.forEach((noFavShow) => {
      removeFavShow(noFavShow);
    });
}

buttonEmptyFavs.addEventListener('click', removeAllFavShows);


// BOTÓN RESET

function resetAll() {
  // actualice el array de favoritos
  // se eliminen todos los favoritos
  // se elimine de localstorage
  // quite la clase de favoritos
  removeAllFavShows();
  // se eliminen los resultados de búsqueda
  resultsList = '';
  // se limpie el texto del input
  input.value = '';
}

resetButton.addEventListener('click', resetAll);