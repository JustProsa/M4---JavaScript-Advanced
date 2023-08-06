`use strict`;

// https://striveschool-api.herokuapp.com/api/deezer/search?q=

const getArtistAlbum = (artist) => {
  fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${artist}`)
    .then((response) => response.json())
    .then((data) => console.log(data));
};

getArtistAlbum(`hiroyukisawano`);
