/* TIMEOUT */

/* console.log('INIZIO DEL PROGRAMMA');

setTimeout( function() {
  saluta('Mario')
}, 1000)

saluta('Antonio')

console.log('PROGRAMMA IN ESECUZIONE');


console.log('FINE DEL PROGRAMMA');


function saluta(param) {
  console.log(`CIAO A ${param}`);
} */


/* TIMEOUT CON CALLBACK */
/* function delay(time, callback) {
  setTimeout(callback, time)
}

delay(3000, function() {
  console.log('FINE');
}) */

/* AJAX */

/* console.log('INIZIO DEL PROGRAMMA');


const xhr = new XMLHttpRequest();
const url = 'https://jsonplaceholder.typicode.com/posts' */

// Funzione di callback che verrà eseguita quando riceveremo la risposta dal server

/* xhr.onload = function() {
  if (xhr.status === 200) {
    console.log(xhr)
    const response = JSON.parse(xhr.responseText)
    console.log(response);
  } else {
    console.log('Errore durante la richiesta');
  }
}

xhr.onerror = function() {
  console.log('Errore di rete');
}

// Invia la richiesta al server
xhr.open("GET", url);
xhr.send();

console.log('FINE DEL PROGRAMMA'); */


/* AJAX con callback */
function makeGetAjaxCall(url, callback) {
  
  const xhr = new XMLHttpRequest();
  
  xhr.open("GET", url);

  xhr.onload = function() {
    if (xhr.status === 200) {
      callback(null, xhr.response)
    } else {
      callback('Errore durante la richiesta')
    }
  }

  xhr.onerror = function() {
    callback('Errore di rete')
  }

  xhr.send()

}

/* makeGetAjaxCall('https://jsonplaceholder.typicode.com/todos/1', function(err, response) {
  if (err) console.log(err);
  else console.log(JSON.parse(response));
})

makeGetAjaxCall('https://jsonplaceholder.typicode.com/users/2', function(err, response) {
  if (err) console.log(err);
  else console.log(JSON.parse(response));
}) */


/* Callback multiple */
/* function getUserDetails(userId, cb) {
  makeGetAjaxCall(`https://jsonplaceholder.typicode.com/users/${userId}`, cb)
}

function getUserPosts(userId, cb) {
  makeGetAjaxCall(`https://jsonplaceholder.typicode.com/todos/${userId}`, cb)
}


console.log('INIZIO');
getUserDetails(1, function(err, userDetails) {
  
  if (err) return err
  const user = JSON.parse(userDetails)
  console.log(user);
  console.log('FINE PRIMA CHIAMATA');

  getUserPosts(user.id, function(err, userPost) {

    if (err) console.log('errore', err);
    else {
      const allUserPosts = JSON.parse(userPost)
      console.log('TUTTI I POST: ', allUserPosts);
    }

    console.log('FINE');
  })


}) */

/* Promise */
const promise = new Promise(function(res, rej) {

  setTimeout(function() {
    
    const randomValue = Math.random();
    
    if (randomValue > 0.5) {
      res(randomValue)
    } else {
      rej(new Error('Valore troppo basso'))
    }

  }, 1000)
  
});

promise
  .then( res => console.log('res: ', res))
  .catch( err => console.log('err', err))



/* Ajax con promise */
function makeRequest(url) {
  return new Promise(function(resolve, reject) {
    
    const xhr = new XMLHttpRequest();
  
    xhr.open("GET", url);

    xhr.onload = function() {
      if (xhr.status === 200) {
        resolve(xhr.response)
      } else {
        reject(new Error('Errore durante la richiesta'))
      }
    }

    xhr.onerror = function() {
      reject(new Error('Errore di rete'))
    }

    xhr.send()
    
  })
}

/* makeRequest('https://jsonplaceholder.typicode.com/users/1')
  .then( function(www) {
    console.log(JSON.parse(www));
  })
  .catch( function(err) {
    console.log(err);
  })
 */

/* PROMISE MULTIPLE */
const url1 = 'https://jsonplaceholder.typicode.com/users/1'

makeRequest(url1)
  .then(function(response) {
    const res1 = JSON.parse(response)
    console.log('res 1: ', res1);
    const url2 = `https://jsonplaceholder.typicode.com/users/${res1.id}/comments`
    return makeRequest(url2)          

  })
  .then(function(response2) {
    const res2 = JSON.parse(response2)
    console.log('res 2: ', res2);
    const url3 = `https://jsonplaceholder.typicode.com/posts`
    return makeRequest(url3)          

  })
  .then( function(response3) {
    const res3 = JSON.parse(response3)
    console.log('res 3: ', res3);
  })
  
  .catch(function(error) {
    console.log('errore: ', error);
  })