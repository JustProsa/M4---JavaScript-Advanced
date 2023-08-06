`use strict`;

const getBooks = function () {
  const bookStorage = document.querySelector(`#books .row`);
  const bookCards = document.getElementsByClassName(`book-card`);
  const addButtons = document.getElementsByClassName(`addCart`);
  const cartBody = document.querySelector(`#cart-items .row`);

  fetch(`https://striveschool-api.herokuapp.com/books`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.forEach((element) => {
        let bookCard = `
          <div class="col-6 col-md-4 col-lg-3 mb-3 book-card">
            <div class="card" style="width: 18rem">
              <img src="${element.img}" class="card-img-top" alt="..." style="width: 100%; height: 24rem" />
              <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
              </div>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">Price: ${element.price}€</li>
                <li class="list-group-item">Category: ${element.category}</li>
              </ul>
              <div class="card-body">
                <a href="#" class="card-link addCart">Add to cart</a>
                <a href="#" class="card-link">Read some pages</a>
              </div>
            </div>
          </div> `;
        bookStorage.insertAdjacentHTML(`beforeend`, bookCard);
      });

      const addCart = function () {
        const addButtonArray = Array.from(addButtons);

        for (let button of addButtonArray) {
          let cartItem = `
                    <div class="col-3">
                      <img src="${
                        data[addButtonArray.indexOf(button)].img
                      }" alt="" width="100%" style="overflow:hidden" />
                    </div>
                    <div class="col-6">${
                      data[addButtonArray.indexOf(button)].title
                    }</div>
                    <div class="col-3">Prize: ${
                      data[addButtonArray.indexOf(button)].price
                    }€</div>`;

          button.addEventListener(`click`, function () {
            cartBody.insertAdjacentHTML(`beforeend`, cartItem);
          });
        }
      };

      addCart();
    });
};

getBooks();
