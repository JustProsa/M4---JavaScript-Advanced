`use strict`;

const TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0ZTZlZmRmZmI4YjAwMTQ0MTNjZGIiLCJpYXQiOjE2OTI3MjI5NTIsImV4cCI6MTY5MzkzMjU1Mn0.QMuf_cuXeHK6_STKGdvzqeVY2CfS33tOyUpFwdaNGQE`;
const ENDPOINT = `https://striveschool-api.herokuapp.com/api/product/`;

// Seleziona container elementi e button per il cambio pagina
const shopFrontPage = document.querySelector(`main .container`);
const backOfficeBtn = document.getElementById(`backoffice-btn`);

// SEleziona gli elementi per la creazione delle card dei prodotti
let prodCardName = document.getElementById(`prod-card-title`);
let prodCardDes = document.getElementById(`prod-card-des`);
let prodCardIMG = document.getElementById(`prod-card-img`);
let prodCardPrice = document.getElementById(`prod-card-price`);
let prodCardBrand = document.getElementById(`prod-card-brand`);
let prodCardID = document.getElementById(`prod-card-id`);

// Implementa il cambio pagina
function frontToBack() {
  console.log(`ciao!`);
  window.location.href = `backoffice.html`;
}
// backOfficeBtn.addEventListener(`click`, frontToBack());

//Implementa ricerca prodotti e creazione delle card
async function fetchProducts() {
  try {
    const response = await fetch(
      "https://striveschool-api.herokuapp.com/api/product/",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );
    const data = await response.json();
    console.log("Dati ottenuti:", data);

    for (el of data) {
      shopFrontPage.insertAdjacentHTML(
        "beforeend",
        `<div class="row" id="${el._id}">
          <div class="col-12">
            <div class="card mb-3 shadow" style="min-width: 100%">
              <div class="row g-0">
                <div class="col-md-4">
                  <img
                    src="${el.imageUrl}"
                    class="img-fluid rounded-start"
                    alt="..."
                  />
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">${el.name}</h5>
                    <p class="card-text">
                      ${el.description}
                    </p>
                    <p class="card-text">
                      <p class="text-body-secondary">€${el.price}</p>
                      <button type="button" class="btn btn-danger open-card-btn" data-id="${el._id}" data-bs-toggle="modal" data-bs-target="#productCardModal">Visualizza prodotto</button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`
      );
    }

    // Apertura e crezione scheda prodotto selezionato
    const openCardBtns = document.querySelectorAll(`.open-card-btn`);
    openCardBtns.forEach((btn) => {
      let prodID = btn.getAttribute("data-id");
      btn.addEventListener(`click`, () => {
        async function openProductCard(id) {
          try {
            const response = await fetch(
              `https://striveschool-api.herokuapp.com/api/product/${id}`,
              {
                headers: {
                  Authorization: `Bearer ${TOKEN}`,
                },
              }
            );

            const data = await response.json();

            console.log(`E' stato selezionato il prodotto ${prodID}`, data);

            prodCardIMG.src = `${data.imageUrl}`;
            prodCardName.textContent = `${data.name}`;
            prodCardDes.textContent = `${data.description}`;
            prodCardPrice.textContent = `€${data.price}`;
            prodCardBrand.textContent = `${data.brand}`;
            prodCardID.textContent = `ID: ${data._id}`;
          } catch (error) {
            console.error(`Si è verificato un errore:`, error);
          }
        }

        openProductCard(prodID);
      });
    });
  } catch (error) {
    console.error("Si è verificato un errore durante la chiamata GET:", error);
  }
}

fetchProducts();
