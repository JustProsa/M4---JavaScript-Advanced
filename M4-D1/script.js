// Esercizio 1. Crea una funzione che controlli su due numeri interi e ritorni true se uno di essi è uguale a 50 o se la loro somma è 50, se no ritorna false

const numero1 = 24;
const numero2 = 26;

function isFifty(numero1, numero2) {
  return numero1 === 50 || numero2 === 50 || numero1 + numero2 === 50;
}

console.log(isFifty(numero1, numero2));

//Esercizio 2. Crea una funzione che rimuova un carattere ad una posizione specifica da una stringa. Passa la stringa e la posizione come parametri e ritorna la stringa modificata

const stringa = "Buongiorno!";
const posizione = 4;

function removeCharacterFromString(string, position) {
  return position < 0 || position > string.length
    ? string
    : string.slice(0, position - 1) + string.slice(position);
}

console.log(removeCharacterFromString(stringa, posizione));

//Esercizio 3. Crea una funzione che controlli se due numeri sono compresi tra 40 e 60 o tra 70 e 100, quindi ritorna true, altrimenti ritorna false

const num = 70;
const num2 = 80;

function numeriCompresi(num, num2) {
  return (
    (num >= 40 && num <= 60 && num2 >= 40 && num2 <= 60) ||
    (num >= 70 && num <= 100 && num2 >= 70 && num2 <= 100)
  );
}

console.log(numeriCompresi(num, num2));

//Esercizio 4. Scrivi una funzione che prenda come parametro il nome di una città e lo ritorni se inizia con "Los" o con "New", e che se no ritorni false

const city = "Los Angeles";

function losOrNew(city) {
  let cityLow = city.toLowerCase();
  let cityBeginning = cityLow.slice(0, 3);

  return cityBeginning === "los" || cityBeginning === "new" ? city : false;
}

console.log(losOrNew(city));

//Esercizio 5. Crea una funzione che calcoli la somma di tutti gli elementi di un array e la ritorni. L'array deve essere passato come parametro

const gruppo = [7, 5, 8, 9, 10, 18, 27];

function sommaArray(array) {
  let somma = 0;
  for (let i = 0; i < array.length; i++) {
    somma += array[i];
  }

  return somma;
}

console.log(sommaArray(gruppo));

//Esercizio 6. Scrivi una funzione che controlli che un array NON contenga i numeri 1 e 3. Se non li contiene ritorna true, altrimenti false

const gruppoDiNumeri = [7, 4, 9, 8, 16, 2];

function containsOneOrThree(array) {
  return array.includes(1) || array.includes(3) ? false : true;
}

console.log(containsOneOrThree(gruppoDiNumeri));

//Esercizio 7. Crea una funzione che ritorni il tipo di angolo i cui gradi sono passati come parametri. x < 90 ritorna "acuto", 90 < x < 180 ritorna "ottuso", x === 90 ritorna "retto", x === 10 ritorna

const gradi = 18;

function tipoDiAngolo(x) {
  return x < 90
    ? "acuto"
    : x > 90 && x < 180
    ? "ottuso"
    : x > 180 && x < 360
    ? "concavo"
    : x === 90
    ? "retto"
    : x === 180
    ? "piatto"
    : x === 360
    ? "giro"
    : "Che cavolo di angolo è?";
}

console.log(tipoDiAngolo(gradi));

//Esercizio 8. Crea una funzioni che crei un acronimo a partire da una frase. Ad esempio "Fabbrica Italiana Automobili Torino" deve ritornare "FIAT"

const frase = "fabbrica italiana automobili torino";

function acronimo(frase) {
  let fraseArray = frase.split(" ");
  let acronimoArray = [];

  for (let i = 0; i < fraseArray.length; i++) {
    fraseArray[i] = fraseArray[i].toUpperCase();
    acronimoArray.push(fraseArray[i][0]);
  }

  return acronimoArray.join("");
}

console.log(acronimo(frase));
