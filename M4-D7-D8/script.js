`use strict`;

const TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0ZTZlZmRmZmI4YjAwMTQ0MTNjZGIiLCJpYXQiOjE2OTI3MjI5NTIsImV4cCI6MTY5MzkzMjU1Mn0.QMuf_cuXeHK6_STKGdvzqeVY2CfS33tOyUpFwdaNGQE`;
const ENDPOINT = `https://striveschool-api.herokuapp.com/api/product/`;

const shopFrontPage = document.querySelector(`main .container`);
const backOfficeBtn = document.getElementById(`backoffice-btn`);

const frontToBack = () => {
  window.location.href = `backoffice.html`;
};

const backToFront = () => {
  window.location.href = `main.html`
}

// backOfficeBtn.addEventListener(`click`, frontToBack());

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
      shopFrontPage.insertAdjacentHTML("beforeend",
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
                      <small class="text-body-secondary">€${el.price}</small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>`)
    }
  } catch (error) {
    console.error("Si è verificato un errore durante la chiamata GET:", error);
  }
}

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
          name: `Ô-KATANA LIMITED EDITION`,
          description: `IAITO KATANA DI GRANDI DIMENSIONI TIPICA DEL PERIODO NANBOKUCHO ( 1334 - 1389 ) ADATTA ALLA PRATICA DI IAIDO, KENJUTSU E NINJUTSU`,
          imageUrl: `https://i.imgur.com/VdKj9u4.jpg`,
          brand: `Kimetsu no yaiba`,
          price: 387.0,
        }),
      }
    );

    const data = await response.json();
    console.log("Dati inviati con successo:", data);
  } catch (error) {
    console.error("Si è verificato un errore durante la chiamata POST:", error);
  }
}

async function deleteElementById(id) {
  const url = `https://striveschool-api.herokuapp.com/api/product/${id}`;

  try {
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      console.log(`Elemento con ID ${id} eliminato con successo`);
    } else {
      console.error(`Errore durante l'eliminazione dell'elemento con ID ${id}`);
    }
  } catch (error) {
    console.error("Si è verificato un errore:", error);
  }
}

fetchProducts();
// createProduct();
// deleteElementById(`64e7816cc034ff001403f416`);
