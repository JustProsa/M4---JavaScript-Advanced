`use strict`

const TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGU0ZTZlZmRmZmI4YjAwMTQ0MTNjZGIiLCJpYXQiOjE2OTI3MjI5NTIsImV4cCI6MTY5MzkzMjU1Mn0.QMuf_cuXeHK6_STKGdvzqeVY2CfS33tOyUpFwdaNGQE`;
const ENDPOINT = `https://striveschool-api.herokuapp.com/api/product/`;

const shopFrontPage = document.querySelector(`main .container`);

function backToFront() {
    window.location.href = `main.html`
}

const newKatanaBtn = document.getElementById(`new-katana-btn`)

let inputName = document.getElementById(`newprod-name`)
let inputDescription = document.getElementById(`newprod-des`)
let inputBrand = document.getElementById(`newprod-brand`)
let inputPrice = document.getElementById(`newprod-price`)
let inputImage = document.getElementById(`newprod-img`)

const editKatanaBtn = document.getElementById(`edit-katana-btn`)
const cardEditButtons = document.querySelectorAll(`.btn-edit`)

let editName = document.getElementById(`editprod-name`)
let editDescription = document.getElementById(`editprod-des`)
let editBrand = document.getElementById(`editprod-brand`)
let editPrice = document.getElementById(`editprod-price`)
let editImage = document.getElementById(`editprod-img`)


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
                  <h5 class="card-title">${el.name}</h5>
                  <p class="card-text">
                    ${el.description}
                  </p>
                  <p class="card-text">
                    <p class="text-body-secondary">€${el.price}</p>
                    <button type="button" class="btn btn-danger">Visualizza prodotto</button>
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
`)
      }

      const deleteButtons = document.querySelectorAll('.btn-delete');

      async function deleteProduct(productId) {
        try {
          const response = await fetch(`https://striveschool-api.herokuapp.com/api/product/${productId}`, {
            method: 'DELETE',
            headers: {
              Authorization: `Bearer ${TOKEN}`,
            },
          });
      
          if (response.ok) {
            console.log(`Prodotto con ID ${productId} eliminato con successo`);
          } else {
            console.error(`Errore durante l'eliminazione del prodotto con ID ${productId}`);
          }
        } catch (error) {
          console.error('Si è verificato un errore durante la richiesta DELETE:', error);
        }
      }
      
      function removeCard(productId) {
        const card = document.getElementById(productId);
        if (card) {
          card.remove();
          console.log(`Card con ID ${productId} rimossa dalla pagina`);
        } else {
          console.warn(`Impossibile trovare la card con ID ${productId}`);
        }
      }

      for (let button of deleteButtons) {
        const attr = button.getAttribute("data-id")
        console.log(button)
        console.log(attr)
      }
      
      deleteButtons.forEach(button => {
        button.addEventListener('click', () => {
          const productId = button.getAttribute('data-id');
          deleteProduct(productId);
          removeCard(productId);
        });
      });

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
  } catch (error) {
    console.error("Si è verificato un errore durante la chiamata POST:", error);
  }
}

// cardEditButtons.forEach(button => {
//   button.addEventListener(`click`, () => {
//     const productId = button.getAttribute('data-id');

//     async function getProductById(id) {
//       try {
//         const response = await fetch(
//           `https://striveschool-api.herokuapp.com/api/product/${id}`,
//           {
//             headers: {
//               Authorization: `Bearer ${TOKEN}`,
//             },
//           });

//         const data = await response.json();

//         console.log("Oggetto ottenuto:", data);

//         editName.value = data.name;
//         editDescription.value = data.description;
//         editBrand.value = data.brand;
//         editImage.value = data.imageUrl;
//         editPrice.value = data.price;

//         async function editProduct(productId) {
//           try {
//             const response = await fetch(
//               `https://striveschool-api.herokuapp.com/api/product/${productId}`,
//               {
//                 method: "PUT",
//                 headers: {
//                   Authorization: `Bearer ${TOKEN}`,
//                   "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                   name: `${editName.value}`,
//                   description: `${editDescription.value}`,
//                   imageUrl: `${editImage.value}`,
//                   brand: `${editBrand.value}`,
//                   price: editPrice.value,
//                 }),
//               }
//             );
        
//             const data = await response.json();
//             console.log(`Prodotto ${productId} modificato con successo:`, data);
//           } catch (error) {
//             console.error("Si è verificato un errore durante la chiamata PUT:", error);
//           }
        
//         }

//         editKatanaBtn.addEventListener('click', () => {
//           const productId = button.getAttribute('data-id');
//           editProduct(productId);
//           fetchProducts()
//         });

//       } catch (error) {
//         console.error("Errore:", error);
//       }
//     }
    
//     getProductById(productId);
//   })
// })

newKatanaBtn.addEventListener(`click`, () => {
  createProduct()
})

fetchProducts()
