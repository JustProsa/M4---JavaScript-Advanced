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

//ESERCIZI EXTRA

console.log("Esercizi Extra");

// 1. Partendo da una stringa (passata come parametro), ritorna il carattere più usato nella stringa stessa.
// 2. Controlla che due stringhe passate come parametri siano gli anagrammi l’una dell’altra. Ignora punteggiatura e spazi e ricordate di rendere la stringa tutta in minuscolo. Se le due parole sono anagrammi, ritorna true , altrimenti ritorna `false`.

const stringa1 = "cartine";
const stringa2 = "incerta";

function anagrammi(stringa1, stringa2) {
  // Rimuove la punteggiatura e gli spazi, e converge le stringhe in minuscolo
  const cleanedString1 = stringa1.replace(/[^\w]/g, "").toLowerCase();
  const cleanedString2 = stringa2.replace(/[^\w]/g, "").toLowerCase();

  if (cleanedString1.length !== cleanedString2.length) {
    // Se le lunghezze delle due stringhe dopo la pulizia sono diverse, non possono essere anagrammi
    return false;
  }

  // Converte le stringhe pulite in array
  const stringa1Array = cleanedString1.split("");
  const stringa2Array = cleanedString2.split("");

  // Ordina gli array per confrontarli facilmente
  stringa1Array.sort();
  stringa2Array.sort();

  // Confronta i due array
  for (let i = 0; i < stringa1Array.length; i++) {
    if (stringa1Array[i] !== stringa2Array[i]) {
      return false;
    }
  }

  return true;
}

console.log(anagrammi(stringa1, stringa2)); // Stampa true

// 3. Partendo da una lista di possibili anagrammi e da una parola (entrambi passati come parametri), ritorna un nuovo array contenente tutti gli anagrammi corretti della parola data.
// Per esempio, partendo da “cartine” e [”carenti”, “incerta”, “espatrio”], il valore ritornato deve essere [”carenti”, “incerta”].

const parola = "cartine";
const paroleAnagrammi = ["carenti", "incerta", "espatrio"];

function forseAnagrammi(parola, paroleAnagrammi) {
  let sonoAnagrammi = [];
  let cleanedString1 = parola.replace(/[^\w]/g, "").toLowerCase();

  for (let el of paroleAnagrammi) {
    let cleanedString2 = el.replace(/[^\w]/g, "").toLowerCase();

    let array1 = cleanedString1.split("").sort();
    let array2 = cleanedString2.split("").sort();

    if (array1.join("") === array2.join("")) {
      sonoAnagrammi.push(el);
    }
  }

  return sonoAnagrammi;
}

console.log(forseAnagrammi(parola, paroleAnagrammi));

// 4. Partendo da una stringa passata come parametro, ritorna `true` se la stringa è palindroma o `false` se non lo è.

const palindroma = "anna";

function parolaPalindroma(palindroma) {
  let palindromaReverse = palindroma.split("").reverse().join("");

  return palindroma === palindromaReverse;
}

console.log(parolaPalindroma(palindroma));

// 5. Partendo da un numero intero (dai parametri) ritorna un numero che contenga le stesse cifre, ma in ordine contrario. Es. 189 ⇒ 981

const number = 971;

function numberReverse(num) {
  return parseInt(num.toString().split("").reverse().join(""));
}

console.log(numberReverse(number));

// 6. Scrivi una funzione che accetti un numero positivo X come parametro. La funzione dovrebbe stampare a console una “scala” creata con il carattere “#” e avente X scalini.

const numeroScalini = 7;

function scala(x) {
  for (let i = 1; i <= x; i++) {
    let asterischi = "#".repeat(i);
    console.log(asterischi);
  }
}

scala(numeroScalini);

// 7. Crea una funzione che, data una stringa come parametro, ritorni la stessa stringa, ma al contrario. Es. “Ciao” ****⇒ “oaiC”

const word = "Ciao";

function parolaAlContrario(parola) {
  wordReverse = parola.split("").reverse().join("");
  console.log(wordReverse);
}

parolaAlContrario(word);

//8. Crea una funzione che accetti un array e un numero Y come parametro. Dividi l’array in sotto-array aventi lunghezza Y.
// Es. array: [1, 2, 3, 4], y: 2 ⇒ [[ 1, 2], [3, 4]]
// array: [1, 2, 3, 4, 5], y: 4 ⇒ [[ 1, 2, 3, 4], [5]]

const numeriAcaso = [7, 5, 9, 12, 27, 3, 13, 975, 17];

function arraySlicer(array, y) {
  const newArray = [];
  for (let i = 0; i < array.length; i += y) {
    newArray.push(array.slice(i, i + y));
  }

  console.log(newArray);
}

arraySlicer(numeriAcaso, 6);
