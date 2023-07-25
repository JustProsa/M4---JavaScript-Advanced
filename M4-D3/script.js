// JavaScript (script.js)
const apiKey = "yaYYLMq0va8Q9HSZvJqpdJ0oaVEbIbyNmhMKrhj1cw7D0Nk9cy1GJlyc";
const apiUrl = "https://api.pexels.com/v1/search?query=";

const searchBar = document.getElementById("search-bar");
const searchButton = document.getElementById("search-button");
const imgsAlbum = document.getElementById("imgs-album");
let searchText = searchBar.textContent.toLowerCase();

function fetchAndAddPhotos(query) {
  fetch(apiUrl + query, {
    headers: {
      Authorization: apiKey,
    },
  })
    .then((raw) => {
      if (!raw.ok) {
        throw new Error("Errore durante la richiesta: " + raw.status);
      }
      return raw.json();
    })
    .then((data) => {
      console.log(data);
      imgsAlbum.innerHTML = data.photos
        .map((photo) => {
          return `
        <div class="col-12 col-md-4">
            <div class="card" style="width: 100%; height: 100%">
              <div class="card-container">
                <img src="${photo.src.large}" class="card-img-top" alt="..." />
              </div>
            </div>
        </div>
        `;
        })
        .join("");
    })
    .catch((error) => {
      console.error("Si è verificato un errore durante la fetch:", error);
    });
}

fetchAndAddPhotos("wolves");
