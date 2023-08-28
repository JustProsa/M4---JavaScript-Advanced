`use strict`;

const TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0ZTZlZmRmZmI4YjAwMTQ0MTNjZGIiLCJpYXQiOjE2OTI3MjI5NTIsImV4cCI6MTY5MzkzMjU1Mn0.QMuf_cuXeHK6_STKGdvzqeVY2CfS33tOyUpFwdaNGQE`;
const ENDPOINT = `https://striveschool-api.herokuapp.com/api/product/`;

// Seleziona il container dove aggiungere gli elementi
const shopFrontPage = document.querySelector(`main .container`);

// Implementa il passaggio da una pagina all' altra
function backToFront() {
  window.location.href = `main.html`;
}

// Seleziona il button e i campi input del form per l'aggiunta di elementi
const newKatanaBtn = document.getElementById(`new-katana-btn`);
let inputName = document.getElementById(`newprod-name`);
let inputDescription = document.getElementById(`newprod-des`);
let inputBrand = document.getElementById(`newprod-brand`);
let inputPrice = document.getElementById(`newprod-price`);
let inputImage = document.getElementById(`newprod-img`);

// Seleziona i campi input per la modifica degli elementi
let editName = document.getElementById(`editprod-name`);
let editDescription = document.getElementById(`editprod-des`);
let editBrand = document.getElementById(`editprod-brand`);
let editPrice = document.getElementById(`editprod-price`);
let editImage = document.getElementById(`editprod-img`);

// Seleziona gli elementi di testo per la visualizzazione della scheda prodotto
let prodCardName = document.getElementById(`prod-card-title`);
let prodCardDes = document.getElementById(`prod-card-des`);
let prodCardIMG = document.getElementById(`prod-card-img`);
let prodCardPrice = document.getElementById(`prod-card-price`);
let prodCardBrand = document.getElementById(`prod-card-brand`);
let prodCardID = document.getElementById(`prod-card-id`);

// Funzioni di ricerca e modifica prodotti
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

    // Aggiunta prodotti alla pagina
    for (el of data) {
      shopFrontPage.insertAdjacentHTML(
        "beforeend",
        `
      <div class="row" id="${el._id}">
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
                  <h5 class="card-title" id="${el._id}-title">${el.name}</h5>
                  <p class="card-text card-description" id="${el._id}-description">
                    ${el.description}
                  </p>
                  <p class="card-text">
                    <p class="text-body-secondary card-price" id="${el._id}-price">€${el.price}</p>
                    <button type="button" class="btn btn-danger open-card-btn" data-id="${el._id}" data-bs-toggle="modal" data-bs-target="#productCardModal">Visualizza prodotto</button>
                  </p>
                  <div class="card-buttons">
                    <button class="btn-delete" data-id="${el._id}"><ion-icon name="trash"></ion-icon></button>
                    <button class="btn-edit" data-id="${el._id}" data-bs-toggle="modal" data-bs-target="#editProductModal"><ion-icon name="create"></ion-icon></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
`
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

    // Implementazione di modifica dei prodotti
    const editKatanaBtn = document.getElementById(`edit-katana-btn`);
    const cardEditButtons = document.querySelectorAll(`.btn-edit`);
    cardEditButtons.forEach((button) => {
      button.addEventListener(`click`, () => {
        const productId = button.getAttribute("data-id");
        console.log(button);

        async function editProductForm(id) {
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

            console.log("Oggetto ottenuto:", data);

            //Riempie i campi del form di modifica con i valori del prodotto selezionato
            editName.value = data.name;
            editDescription.value = data.description;
            editBrand.value = data.brand;
            editImage.value = data.imageUrl;
            editPrice.value = data.price;

            // Funzione di modifica dei prodotti
            async function editProduct(productId) {
              try {
                const response = await fetch(
                  `https://striveschool-api.herokuapp.com/api/product/${productId}`,
                  {
                    method: "PUT",
                    headers: {
                      Authorization: `Bearer ${TOKEN}`,
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      name: `${editName.value}`,
                      description: `${editDescription.value}`,
                      imageUrl: `${editImage.value}`,
                      brand: `${editBrand.value}`,
                      price: editPrice.value,
                    }),
                  }
                );

                const data = await response.json();

                //Modifica della card prodotto
                let editProdName = document.getElementById(
                  `${productId}-title`
                );
                let editProdDes = document.getElementById(
                  `${productId}-description`
                );
                let editProdPrice = document.getElementById(
                  `${productId}-price`
                );
                editProdName.textContent = data.name;
                editProdDes.textContent = data.description;
                editProdPrice.textContent = `€${data.price}`;

                console.log(
                  `Prodotto ${productId} modificato con successo:`,
                  data
                );
              } catch (error) {
                console.error(
                  "Si è verificato un errore durante la chiamata PUT:",
                  error
                );
              }
            }

            editKatanaBtn.addEventListener("click", () => {
              const productId = button.getAttribute("data-id");
              editProduct(productId);
              // location.reload();
            });
          } catch (error) {
            console.error("Errore:", error);
          }
        }

        editProductForm(productId);
      });
    });

    // Implementazione cancellazione prodotti tramite button DELETE
    const deleteButtons = document.querySelectorAll(".btn-delete");
    async function deleteProduct(productId) {
      try {
        const response = await fetch(
          `https://striveschool-api.herokuapp.com/api/product/${productId}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          }
        );

        if (response.ok) {
          console.log(`Prodotto con ID ${productId} eliminato con successo`);
        } else {
          console.error(
            `Errore durante l'eliminazione del prodotto con ID ${productId}`
          );
        }
      } catch (error) {
        console.error(
          "Si è verificato un errore durante la richiesta DELETE:",
          error
        );
      }
    }

    // Rimozione della card dalla scheda
    function removeCard(productId) {
      const card = document.getElementById(productId);
      if (card) {
        card.remove();
        console.log(`Card con ID ${productId} rimossa dalla pagina`);
      } else {
        console.warn(`Impossibile trovare la card con ID ${productId}`);
      }
    }

    // for (let button of deleteButtons) {
    //   const attr = button.getAttribute("data-id");
    //   console.log(button);
    //   console.log(attr);
    // }

    deleteButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const productId = button.getAttribute("data-id");
        deleteProduct(productId);
        removeCard(productId);
      });
    });
  } catch (error) {
    console.error("Si è verificato un errore durante la chiamata GET:", error);
  }
}

// Implementazione funzionalità creazione prodotti
async function createProduct() {
  try {
    const response = await fetch(
      "https://striveschool-api.herokuapp.com/api/product/",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${inputName.value}`,
          description: `${inputDescription.value}`,
          imageUrl: `${inputImage.value}`,
          brand: `${inputBrand.value}`,
          price: inputPrice.value,
        }),
      }
    );

    const data = await response.json();
    console.log("Dati inviati con successo:", data);

    shopFrontPage.insertAdjacentHTML(
      "beforeend",
      `
      <div class="row" id="${data._id}">
        <div class="col-12">
          <div class="card mb-3 shadow" style="min-width: 100%">
            <div class="row g-0">
              <div class="col-md-4">
                <img
                  src="${data.imageUrl}"
                  class="img-fluid rounded-start"
                  alt="..."
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title" id="${data._id}-title">${data.name}</h5>
                  <p class="card-text card-description" id="${data._id}-description">
                    ${data.description}
                  </p>
                  <p class="card-text">
                    <p class="text-body-secondary card-price" id="${data._id}-price">€${data.price}</p>
                    <button type="button" class="btn btn-danger open-card-btn" data-id="${data._id}" data-bs-toggle="modal" data-bs-target="#productCardModal">Visualizza prodotto</button>
                  </p>
                  <div class="card-buttons">
                    <button class="btn-delete" data-id="${data._id}"><ion-icon name="trash"></ion-icon></button>
                    <button class="btn-edit" data-id="${data._id}" data-bs-toggle="modal" data-bs-target="#editProductModal"><ion-icon name="create"></ion-icon></button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
`
    );
  } catch (error) {
    console.error("Si è verificato un errore durante la chiamata POST:", error);
  }
}

newKatanaBtn.addEventListener(`click`, () => {
  createProduct();
});

fetchProducts();
