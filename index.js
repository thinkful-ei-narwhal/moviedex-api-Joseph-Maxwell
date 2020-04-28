'use strict';

const express = require('express');
const app = express();

const morgan = require('morgan');
const cors = require('cors');
const movieDataSmall = require('./movie-data-small');


app.get('/movies', (request, response) => {
    const {genre, country, averageVote} = request.query;
    let correctGenres = [];
    if(genre){
    movieDataSmall.map(movie => {
        if (genre.toLowerCase() === movie.genre.toLowerCase()){ return correctGenres.push(movie)};
        });
        return genre;
    }
    response.json({correctGenres});
});
// q ? genre, country, average vote
app.listen(8080, () => console.log('Server listening on port 8080...'));